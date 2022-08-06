export type originImage = {
  urls: { full: string };
  width: number;
  height: number;
};

export const fetchPhotosFromServer = async (): Promise<originImage[]> => {
  const res = await fetch("https://api.unsplash.com/photos/?per-page=15", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Client-ID qvdzVp0MsKqAuSjoHFv9qBbanYKqJ3VkbPdvolwuvoA",
    },
  });
  return res.json();
};
