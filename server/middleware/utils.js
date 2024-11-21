const stream = require('stream')

function ImageuploadBuffer(data){
  const bufferStream = new stream.PassThrough();
  bufferStream.end(data.buffer);
  return bufferStream
}

const ImageKit = require("imagekit");
const dotenv = require("dotenv");

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

/**
 * Helper to delete an image by fileId in ImageKit
 * @param {string} fileId - The ID of the file to delete in ImageKit
 * @returns {Promise<void>}
 */
const deleteImageByURL = async (fileUrl) => {
  try {
    const files = await imagekit.listFiles({
      url: fileUrl,
    });
    if (files.length === 0) {
      throw new Error("File not found for the provided URL.");
    }

    const fileId = files[0].fileId;

    return new Promise((resolve, reject) => {
      imagekit.deleteFile(fileId, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    throw new Error(error.message || "Failed to delete image by URL");
  }
};

/**
 * Uploads a file to ImageKit.
 * @param {Buffer} fileBuffer - The file buffer (from multer).
 * @param {string} fileName - The name of the file to be uploaded.
 * @returns {Promise<string>} - Returns a promise that resolves to the file URL.
 */
const uploadImage = async (fileBuffer, fileName, existingFileUrl = null) => {
  try {
    if (existingFileUrl) {
      await deleteImageByURL(existingFileUrl);
    }
    const uniqueFilename = generateUniqueFilename(fileName);
    return new Promise((resolve, reject) => {
      const file = ImageuploadBuffer(fileBuffer); 
      imagekit.upload(
        {
          file: file,
          fileName: uniqueFilename,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.url); 
          }
        }
      );
    });
  } catch (error) {
    throw new Error(error.message || "Image upload failed");
  }
};

/**
 * Generate a unique filename by appending a timestamp to the original filename.
 * @param {string} originalName - The original file name.
 * @returns {string} - The unique filename.
 */
const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now(); // Get the current timestamp
  return `${timestamp}_${originalName}`;
};




module.exports = {ImageuploadBuffer,uploadImage,deleteImageByURL,generateUniqueFilename};
