import React, { useState } from "react";
import { Upload, Modal, Button, Image, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";

export const MediaPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageFileList, setImageFileList] = useState<RcFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<RcFile[]>([]);

  const handlePreview = (url: string) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  const handleCancelPreview = () => setPreviewVisible(false);

  const handleImageUpload = async () => {
    try {
      const newImages = imageFileList.map((file) => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
      setImageFileList([]);
      message.success("Images uploaded successfully!");
    } catch (err) {
      message.error("Failed to upload images.");
    }
  };

  const handleVideoUpload = async () => {
    try {
      const newVideos = videoFileList.map((file) => URL.createObjectURL(file));
      setVideos([...videos, ...newVideos]);
      setVideoFileList([]);
      message.success("Videos uploaded successfully!");
    } catch (err) {
      message.error("Failed to upload videos.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Event Gallery</h1>

      {/* Images Section */}
      <div className="mb-10">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload Photos
          </h2>
          <Upload
            multiple
            fileList={imageFileList}
            beforeUpload={(file) => {
              setImageFileList((prev) => [...prev, file]);
              return false;
            }}
            onRemove={(file) =>
              setImageFileList((prev) =>
                prev.filter((item) => item.uid !== file.uid)
              )
            }
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Select Images</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleImageUpload}
            disabled={!imageFileList.length}
            className="mt-4"
          >
            Upload
          </Button>
        </div>

        {/* Display Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((url, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Image
                src={url}
                className="object-cover w-full h-48"
                preview={false}
                onClick={() => handlePreview(url)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload Videos
          </h2>
          <Upload
            multiple
            fileList={videoFileList}
            beforeUpload={(file) => {
              setVideoFileList((prev) => [...prev, file]);
              return false;
            }}
            onRemove={(file) =>
              setVideoFileList((prev) =>
                prev.filter((item) => item.uid !== file.uid)
              )
            }
            accept="video/*"
          >
            <Button icon={<UploadOutlined />}>Select Videos</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleVideoUpload}
            disabled={!videoFileList.length}
            className="mt-4"
          >
            Upload
          </Button>
        </div>

        {/* Display Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((url, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <video
                src={url}
                controls
                className="w-full h-48 object-cover"
              ></video>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default MediaPage;
