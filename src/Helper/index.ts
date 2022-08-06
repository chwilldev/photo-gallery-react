import { originImage } from "../Api/photos";

export type Image = {
  src: string;
  width: number;
  height: number;
};

export const pickPhotoUrlFromOriginPhotoObject = (
  originImageData: originImage[]
): Image[] =>
  originImageData.map((data: originImage) => ({
    src: data.urls.full,
    width: data.width,
    height: data.height,
  }));
