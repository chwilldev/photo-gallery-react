import { originImage } from "../Api/photos";

export type Photo = {
  src: string;
  width: number;
  height: number;
  full_src?: string;
};

export const pickPhotoUrlFromOriginPhotoObject = (
  originImageData: originImage[]
): Photo[] =>
  originImageData.map((data: originImage) => ({
    src: data.urls.thumb,
    width: data.width,
    height: data.height,
    key: Math.random(),
    full_src: data.urls.full,
  }));
