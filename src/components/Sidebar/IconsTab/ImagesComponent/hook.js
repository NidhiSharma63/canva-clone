import useImage from "@/api/queries/useImage";
import getToken from "@/utils/getToken";
import getUserDetails from "@/utils/getUserDetails";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const useImageHook = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const { useAddImageQuery, useGetAllImagesQuery } = useImage();
  const { data, isPending } = useGetAllImagesQuery();
  const { mutateAsync } = useAddImageQuery();

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const uploadFile = async (file) => {
      try {
        const userId = getUserDetails()?._id;
        const token = getToken();

        // Convert file to base64 to send to backend
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64Data = reader.result.split(",")[1]; // get only data

          // Send file to backend for upload
          const { publicUrl } = await axios
            .post(
              `${import.meta.env.VITE_BASE_URL}/upload-file-direct`,
              { fileName: file.name, fileBase64: base64Data, userId },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (progressEvent) => {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setProgress(percentCompleted);
                },
              }
            )
            .then((res) => res.data);

          // Preview + store in DB
          setPreview(URL.createObjectURL(file));
          await mutateAsync({ fileName: file.name, url: publicUrl });
          setPreview("");
        };
      } catch (err) {
        toast.error("Error uploading file");
        console.error("Upload error:", err.message);
      }
    };

    uploadFile(file);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file, mutateAsync]);

  const handleDragStart = useCallback((e, elementType, data = {}) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        type: elementType,
        data, // {id, url, name} aayega
      })
    );
  }, []);

  return {
    inputRef,
    file,
    setFile,
    preview,
    progress,
    setProgress,
    handleClick,
    data,
    isPending,
    handleDragStart,
  };
};

export default useImageHook;
