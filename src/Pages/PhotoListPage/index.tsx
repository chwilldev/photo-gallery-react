import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { PhotoAlbum } from "react-photo-album";

import { fetchPhotosFromServer } from "./api/photos";
import { pickPhotoUrlFromOriginPhotoObject, Photo } from "./utils";
import ImagePopupViewer from "../../Components/ImagePopupViewer";

function PhotoListPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [popupStatus, setPopupStatus] = useState({
    status: false,
    index: 0,
  });
  const [pageNumber, setPageNumber] = useState(0);

  const photosRef = useRef(photos);

  photosRef.current = photos;

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

  const photoUrls = useMemo(() => {
    return photos.map((photo) => photo.full_src as string);
  }, [photos]);

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        onClick={(event, photo, index) => {
          setPopupStatus({ index, status: true });
        }}
      />
      <ImagePopupViewer
        photos={photoUrls}
        popupViewerStatus={popupStatus}
        setPopupViewerStatus={setPopupStatus}
      />
    </>
  );
}

export default PhotoListPage;
