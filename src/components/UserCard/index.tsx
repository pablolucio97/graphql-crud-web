import { Button } from "../Button";

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  onDelete: (photoId: string) => void;
  onGet: (photoId: string) => void;
  type?: "get-user" | "get-user-photos";
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  email,
  name,
  onDelete,
  onGet,
  type,
}) => {
  return (
    <li className="flex items-center mb-2" key={id}>
      <p className="mx-3">{name}</p>
      <p className="mr-3">{email}</p>
      <Button
        label={type === "get-user" ? "Get user" : "Get photos by user"}
        onClick={() => onGet(id)}
      />
      <Button
        label="Delete User"
        className="bg-red-200 rounded-md px-4 h-[3rem] ml-2"
        onClick={() => onDelete(id)}
      />
    </li>
  );
};

export default UserCard;
