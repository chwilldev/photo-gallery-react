import React, { useState, useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";

function ImagePopupViewer(props: {
  photos: string[];
  popupViewerStatus: { status: boolean; index: number };
  setPopupViewerStatus: (statusObject: {
    status: boolean;
    index: number;
  }) => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    setCurrentImage(props.popupViewerStatus.index);
    setIsViewerOpen(props.popupViewerStatus.status);
  }, [props.popupViewerStatus.status, props.popupViewerStatus.index]);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div>
      {isViewerOpen && (
        <ImageViewer
          src={props.photos}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}

export default ImagePopupViewer;
