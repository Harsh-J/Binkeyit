import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImageClodinary = async (image) => {
  if (!image || (!image.buffer && !image.arrayBuffer)) {
    throw new Error("Invalid image input");
  }

  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer().catch(() => {
    throw new Error("Failed to create image buffer");
  }));

  const uploadImage = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "binkeyit" },
      (error, uploadResult) => {
        if (error) {
          return reject(error);
        }
        if (!uploadResult) {
          return reject(new Error("No upload result returned"));
        }
        return resolve(uploadResult);
      }
    );
    stream.end(buffer);
  });

  return uploadImage;
};
export default uploadImageClodinary;
