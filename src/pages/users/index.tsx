import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import UserCard from "../../components/UserCard";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserLazyQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../generated/graphql";

const UsersScreen: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useGetUsersQuery();
  const [
    getUser,
    { data: userData, loading: userLoading, error: userError, called },
  ] = useGetUserLazyQuery();

  const handleSelectUser = useCallback((userId: string) => {
    setUserId(userId);
  }, []);

  const handleFetchUser = useCallback(
    (userId: string) => {
      handleSelectUser(userId);
      getUser({
        variables: {
          data: {
            id: userId,
          },
        },
      });
    },
    [getUser, handleSelectUser]
  );

  const [
    createUser,
    {
      data: createUserData,
      loading: createUserLoading,
      error: createdUserError,
    },
  ] = useCreateUserMutation();

  const handleCreateUser = () => {
    createUser({
      variables: {
        data: {
          name,
          email,
        },
      },
      onCompleted: () => {
        console.log("User created successfully!", createUserData);
        refetchUsers();
      },
      onError: (error) => {
        console.log("Error at trying to create user: ", error);
      },
    });
  };

  const [
    deleteUser,
    {
      data: deleteUserData,
      error: deleteUserError,
      loading: deleteUserLoading,
    },
  ] = useDeleteUserMutation();

  const handleDeleteUser = useCallback(
    (userId: string) => {
      deleteUser({
        variables: {
          data: {
            id: userId,
          },
        },
        onCompleted: () => {
          console.log("User deleted successfully!", deleteUserData);
          refetchUsers();
        },
        onError: (error) => {
          console.log("Error at trying to create user: ", error);
        },
      });
    },
    [deleteUser, deleteUserData, refetchUsers]
  );

  const [
    updateUser,
    { data: updatedUser, error: updateUserError, loading: updateUserLoading },
  ] = useUpdateUserMutation();

  const loading =
    usersLoading ||
    userLoading ||
    createUserLoading ||
    deleteUserLoading ||
    updateUserLoading;
  const error =
    usersError ||
    userError ||
    createdUserError ||
    deleteUserError ||
    updateUserError;

  const handleUpdateUser = useCallback(() => {
    updateUser({
      variables: {
        data: {
          id: userId,
          name,
        },
      },
      onCompleted: () => {
        console.log("User updated successfully!", updatedUser);
      },
      onError: (error) => {
        console.log("Error at trying to create user: ", error);
      },
    });
  }, [name, updateUser, updatedUser, userId]);

  const navigate = useNavigate();

  const handleNavigatePhotos = () => {
    navigate("/photos");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-col p-8">
      <h1 className="text-gray-900 text-3xl font-bold">Users</h1>
      <div className="my-5">
        <Button label="Go to photos page" onClick={handleNavigatePhotos} />
      </div>
      <div className="flex flex-row">
        {/* List and get users */}
        <div className="flex flex-col border-r-2 pr-8">
          <h2 className="my-3 text-xl font-bold">List of users</h2>
          <ul className="mb-4">
            {usersData &&
              usersData.getUsers &&
              usersData.getUsers.map(
                (user: { id: string; name: string; email: string }) => (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    onDelete={() => handleDeleteUser(user.id)}
                    onGet={() => handleFetchUser(user.id)}
                    type="get-user"
                  />
                )
              )}
          </ul>

          {called && userData && userData.getUser && (
            <>
              <span className="my-3 text-xl font-bold">Single user</span>
              <div className="flex items-center">
                <p className="ml-3">{userData.getUser.name}</p>
                <p className="mx-3">{userData.getUser.email}</p>
              </div>
            </>
          )}
        </div>

        {/* Create user form */}
        <div className="flex flex-col border-r-2 px-8">
          <h2 className="my-3 text-xl font-bold">Create user</h2>
          <form onSubmit={handleCreateUser}>
            <div className="mb-2">
              <Input
                label="Name"
                value={name}
                onChange={(val) => setName(val.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Email"
                value={email}
                onChange={(val) => setEmail(val.target.value)}
              />
            </div>
            <Button
              label="Create user"
              type="submit"
              disabled={!email || !name}
            />
          </form>
        </div>

        {/* Update user form */}
        {userId && (
          <div className="flex flex-col px-8">
            <h2 className="my-3 text-xl font-bold">Update user</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <Input
                  label="Name"
                  value={name}
                  onChange={(val) => setName(val.target.value)}
                />
              </div>

              <Button label="Update user" type="submit" disabled={!name} />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersScreen;
