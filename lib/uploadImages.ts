import axios from "axios";

interface UploadAuthParams {
  signature: string;
  expire: string;
  token: string;
}

export async function uploadImagesToImageKit(files: File[]): Promise<string[]> {
  if (!files.length) return [];

  const { data: auth } = await axios.get<UploadAuthParams>("/api/upload-auth");

  const uploads = files.map(async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("fileName", file.name);
    form.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "");
    form.append("signature", auth.signature);
    form.append("expire", auth.expire);
    form.append("token", auth.token);
    form.append("folder", "/homedecor/products");

    const res = await axios.post("https://upload.imagekit.io/api/v1/files/upload", form);
    return res.data.url as string;
  });

  return Promise.all(uploads);
}