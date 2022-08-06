import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { PhotoAlbum } from "react-photo-album";

import { fetchPhotosFromServer } from "../Api/photos";
import { pickPhotoUrlFromOriginPhotoObject, Photo } from "../Helper";
import ImagePopupViewer from "../Components/ImagePopupViewer";
import "./Home.css";

function PhotoListPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const photosRef = useRef(photos);

  photosRef.current = photos;

  const [popupStatus, setPopupStatus] = useState({
    status: false,
    index: 0,
  });

  const [pageNumber, setPageNumber] = useState(0);

  const fetchPhotos = useCallback(
    async (pageNumber: number) => {
      setPhotos([
        ...photosRef.current,
        ...pickPhotoUrlFromOriginPhotoObject(
          await fetchPhotosFromServer(pageNumber)
        ),
      ]);
    },
    [photosRef]
  );

  function handleScroll() {
    const { documentElement } = document;
    var winScroll = documentElement.scrollTop;
    var height = documentElement.scrollHeight - documentElement.clientHeight;
    if (winScroll === height) {
      setPageNumber((number) => number + 1);
    }
  }

  useEffect(() => {
    fetchPhotos(pageNumber);
  }, [pageNumber, fetchPhotos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return window.removeEventListener("scroll", handleScroll);
  }, []);

  const setPopupViewerStatus = (statusObject: {
    status: boolean;
    index: number;
  }) => {
    setPopupStatus({ ...statusObject });
  };

  const photoUrls = useMemo(() => {
    return photos.map((photo) => photo.full_src as string);
  }, [photos]);

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
        photos={photoUrls}
        popupViewerStatus={popupStatus}
        setPopupViewerStatus={setPopupViewerStatus}
      />
    </>
  );
}

export default PhotoListPage;
