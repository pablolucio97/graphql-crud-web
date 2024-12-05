import { useQuery } from "@apollo/client";
import { GET_USERS_QUERY } from "../graphql/queries/users";

const UsersScreen: React.FC = () => {
  const { data, loading, error } = useQuery(GET_USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-col p-8">
      <h1 className="text-gray-900 text-3xl font-bold">Users</h1>

      <ul>
        {data.getUsers.map(
          (user: { id: string; name: string; email: string }) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default UsersScreen;
