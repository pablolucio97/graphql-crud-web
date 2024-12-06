import { useCallback, useState } from "react";
import { Button } from "../components/Button";
import { useGetUserLazyQuery, useGetUsersQuery } from "../generated/graphql";

const UsersScreen: React.FC = () => {
  const [, setUserId] = useState("");

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useGetUsersQuery();
  const [
    getUser,
    { data: userData, loading: userLoading, error: userError, called },
  ] = useGetUserLazyQuery();

  const loading = usersLoading || userLoading;
  const error = usersError || userError;

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-col p-8">
      <h1 className="text-gray-900 text-3xl font-bold">Users</h1>
      <span className="my-3 text-xl font-bold">List of users</span>
      <ul className="mb-4">
        {usersData && usersData.getUsers &&
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
  );
};

export default UsersScreen;
