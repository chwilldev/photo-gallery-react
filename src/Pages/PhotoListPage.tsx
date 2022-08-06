import React, { useEffect, useState } from "react";
import { PhotoAlbum } from "react-photo-album";

import { fetchPhotosFromServer } from "../Api/photos";
import { pickPhotoUrlFromOriginPhotoObject, Image } from "../Helper";
import ImagePopupViewer from "../Components/ImagePopupViewer";
import "./Home.css";

function PhotoListPage() {
  const [photos, setImages] = useState<Image[]>([]);

  const [popupStatus, setPopupStatus] = useState({
    status: false,
    index: 0,
  });

  const fetchPhotos = async () => {
    setImages(pickPhotoUrlFromOriginPhotoObject(await fetchPhotosFromServer()));
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const setPopupViewerStatus = (statusObject: {
    status: boolean;
    index: number;
  }) => {
    setPopupStatus({ ...statusObject });
  };

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        onClick={(event, photo, index) => {
          setPopupStatus({
            status: true,
            index,
          });
        }}
      />
      <ImagePopupViewer
        photos={photos.map((image) => image.src)}
        popupViewerStatus={popupStatus}
        setPopupViewerStatus={setPopupViewerStatus}
      />
    </>
  );
}

export default PhotoListPage;
