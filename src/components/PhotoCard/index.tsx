import { Button } from "../Button";

interface PhotoCardProps {
  id: string;
  url: string;
  likes: number;
  isPrivate: boolean;
  onDelete: (photoId: string) => void;
  onGet: (photoId: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  id,
  url,
  likes,
  isPrivate,
  onDelete,
  onGet,
}) => {
  return (
    <li className="flex items-center mb-2" key={id}>
      <p className="mr-3">{url}</p>
      <p className="mx-3">{likes}</p>
      <p className="mx-3">Private: {isPrivate ? "Yes" : "No"}</p>
      <Button label="Get Photo" onClick={() => onGet(id)} />
      <Button
        label="Delete Photo"
        className="bg-red-200 rounded-md px-4 h-[3rem] ml-2"
        onClick={() => onDelete(id)}
      />
    </li>
  );
};

export default PhotoCard;
