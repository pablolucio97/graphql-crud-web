import { useCallback, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import {
  useCreateUserMutation,
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

  const selectAndFetchUser = useCallback(
    (userId: string) => {
      setUserId(userId);
      getUser({
        variables: {
          data: {
            id: userId,
          },
        },
      });
    },
    [getUser]
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
        console.log("User created successfully!");
        refetchUsers();
      },
      onError: (error) => {
        console.log("Error at trying to create user: ", error);
      },
    });
    console.log(createUserData);
  };

  const loading = usersLoading || userLoading || createUserLoading;
  const error = usersError || userError || createdUserError;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-col p-8">
      <h1 className="text-gray-900 text-3xl font-bold">Users</h1>
      <div className="flex flex-row">
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
                      onClick={() => selectAndFetchUser(user.id)}
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
