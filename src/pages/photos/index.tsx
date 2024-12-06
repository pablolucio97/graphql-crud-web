import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import PhotoCard from "../../components/PhotoCard";
import { useListPhotosQuery } from "../../generated/graphql";

const PhotosScreen: React.FC = () => {
  const {
    data: photosData,
    loading: photosLoading,
    error: photosError,
  } = useListPhotosQuery();

  const isLoading = photosLoading;
  const error = photosError;

  if (isLoading) <p>Loading...</p>;
  if (error) <p>Something went wrong</p>;

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col p-8">
      <h1 className="text-gray-900 text-3xl font-bold">Photos</h1>
      <div className="my-5">
        <Button label="Go back users page" onClick={handleNavigateBack} />
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
                  onDelete={() => {}}
                  onGet={() => {}}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotosScreen;
