import { originPhoto } from "../api/photos";

export type Photo = {
  src: string;
  width: number;
  height: number;
  full_src?: string;
};

export const pickPhotoUrlFromOriginPhotoObject = (
  originImageData: originPhoto[]
): Photo[] =>
  originImageData.map((data: originPhoto) => ({
    src: data.urls.thumb,
    width: data.width,
    height: data.height,
    key: Math.random(),
    full_src: data.urls.full,
  }));