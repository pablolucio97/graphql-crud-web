import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import PhotoCard from "../../components/PhotoCard";
import UserCard from "../../components/UserCard";
import {
  useCreatePhotoMutation,
  useGetUsersQuery,
  useListPhotosQuery,
} from "../../generated/graphql";

interface User {
  id: string;
  name: string;
  email: string;
}

const PhotosScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const photoUrl = "https://via.placeholder.com/600/24f355";

  const randomLikes = useMemo(() => {
    return Math.random() * 99;
  }, []);

  const randomPrivate = useMemo(() => {
    const numberRef = Math.floor(Math.random() * 99);
    return numberRef > 50 ? true : false;
  }, []);

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useGetUsersQuery();

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.getUsers);
    }
  }, [usersData]);

  const {
    data: photosData,
    loading: photosLoading,
    error: photosError,
    refetch: refetchPhotos,
  } = useListPhotosQuery();

  const [
    createPhoto,
    {
      data: createPhotoData,
      loading: createPhotoLoading,
      error: createPhotoError,
    },
  ] = useCreatePhotoMutation();

  const handleCreatePhoto = () => {
    createPhoto({
      variables: {
        data: {
          url: photoUrl,
          likes: randomLikes,
          isPrivate: randomPrivate,
          userId: selectedUser!.id,
        },
      },
      onCompleted: () => {
        console.log(createPhotoData);
        refetchPhotos();
      },
    });
  };

  const isLoading = photosLoading || createPhotoLoading || usersLoading;
  const error = photosError || createPhotoError || usersError;

  if (isLoading) <p>Loading...</p>;
  if (error) <p>Something went wrong</p>;

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col p-8">
      <h1 className="text-gray-900 text-3xl font-bold">Photos</h1>
      <div className="my-2">
        <Button label="Go back users page" onClick={handleNavigateBack} />
      </div>

      {/* Create user form */}
      <div className="flex flex-col border-r-2 mb-2">
        <h2 className="my-3 text-xl font-bold">Create user</h2>
        <form onSubmit={handleCreatePhoto}>
          <Button
            label="Create photo for active user"
            type="submit"
            disabled={!selectedUser}
          />
        </form>
      </div>

      <div className="flex flex-row">
        {/* List and get photos */}
        <div className="flex flex-col border-r-2 pr-8">
          <h2 className="my-3 text-xl font-bold">List of photos</h2>
          <ul className="mb-4">
            {photosData &&
              photosData.listPhotos &&
              photosData.listPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  id={photo.id}
                  url={photo.url}
                  likes={photo.likes}
                  isPrivate={photo.isPrivate}
                  onDelete={() => {}}
                  onGet={() => {}}
                />
              ))}
          </ul>
        </div>

        {/* List users */}
        <div className="flex flex-col border-r-2 pr-8 ml-3">
          <h2 className="my-3 text-xl font-bold">List of photos</h2>
          <ul className="mb-4">
            {users &&
              users.map((user) => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  onDelete={() => {}}
                  onGet={() => setSelectedUser(user)}
                  type="get-user-photos"
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotosScreen;
