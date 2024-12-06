import { useCallback, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserLazyQuery,
  useGetUsersQuery,
} from "../generated/graphql";

const UsersScreen: React.FC = () => {
  const [, setUserId] = useState("");
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
      handleSelectUser(userId);
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
    [deleteUser, deleteUserData, handleSelectUser, refetchUsers]
  );

  const loading =
    usersLoading || userLoading || createUserLoading || deleteUserLoading;
  const error = usersError || userError || createdUserError || deleteUserError;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-col p-8">
      <h1 className="text-gray-900 text-3xl font-bold">Users</h1>
      <div className="flex flex-row">
        {/* List and get users */}
        <div className="flex flex-col border-r-2 pr-8">
          <h2 className="my-3 text-xl font-bold">List of users</h2>
          <ul className="mb-4">
            {usersData &&
              usersData.getUsers &&
              usersData.getUsers.map(
                (user: { id: string; name: string; email: string }) => (
                  <li className="flex items-center mb-2" key={user.id}>
                    <p className="mx-3">{user.name}</p>
                    <p className="mr-3">{user.email}</p>
                    <Button
                      label="Get User"
                      onClick={() => handleFetchUser(user.id)}
                    />
                    <Button
                      label="Delete User"
                      className="bg-red-200 rounded-md px-4 h-[3rem] ml-2"
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  </li>
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
            onClick={handleCreateUser}
            disabled={!email || !name}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersScreen;
