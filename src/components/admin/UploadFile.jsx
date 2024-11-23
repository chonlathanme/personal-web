import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/ProductApi";
import useUserStore from "../../stores/userStore";
import { LoaderCircle } from "lucide-react";

const UploadFile = (props) => {
  const { input, setInput } = props;
  const [isLoading, setIsLoading] = useState(false);
  const token = useUserStore((state) => state.token);

  const hdlDelete = async (public_id) => {
    try {
      await removeFiles(token, public_id);
      const updatedImages = input.images.filter((item) => item.public_id !== public_id);
      setInput({ ...input, images: updatedImages });
      toast.success("Delete success");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const hdlChange = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    setIsLoading(true);
    const uploadPromises = Array.from(files).map((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload only images");
        return Promise.resolve(); // Skip invalid files
      }

      return new Promise((resolve) => {
        Resize.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          async (data) => {
            try {
              const res = await uploadFiles(token, data);
              resolve(res.data);
            } catch (err) {
              console.error(err);
              resolve(null); // Resolve with null on error
            }
          },
          "base64"
        );
      });
    });

    Promise.all(uploadPromises).then((results) => {
      const newImages = results.filter((image) => image !== null);
      setInput((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages], // Append new images to existing ones
      }));
      toast.success("Upload success");
      setIsLoading(false);
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center m-4">
        {isLoading && <LoaderCircle className="w-6 h-6 animate-spin" />}
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {input.images.map((item, index) => (
          <div key={index} className="relative">
            <img src={item.url} alt={`Uploaded preview ${index}`} className="h-auto w-auto object-cover" />
            <button
              type="button"
              className="btn btn-sm btn-circle bg-gray-200 absolute top-0 right-0"
              onClick={() => hdlDelete(item.public_id)}
            >
              <p className="text-black">✕</p>
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" name="images" onChange={hdlChange} multiple accept="image/*" />
      </div>
    </div>
  );
};

export default UploadFile;
