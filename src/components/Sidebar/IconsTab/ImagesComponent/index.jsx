import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CloudUpload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { storage } from "../../../../firebase/config";

const ImagesComponent = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  // preview + upload
  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // firebase upload
    const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.error("Upload error:", error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
      }
    );

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Upload button */}
      <button
        onClick={handleClick}
        className="flex w-full bg-purple-600 rounded-xl cursor-pointer items-center justify-center text-white gap-2 px-4 py-2 border"
      >
        <CloudUpload />
        Upload a file
      </button>

      {/* Preview box */}
      {preview && (
        <div className="relative w-full max-w-md max-h-48 rounded-xl overflow-hidden">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-contain"
          />

          {/* Gradient progress bar */}
          {progress < 100 && (
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Uploaded image URL */}
      {downloadURL && (
        <p className="text-sm text-green-600 break-all">
          Uploaded! URL: {downloadURL}
        </p>
      )}
    </div>
  );
};

export default ImagesComponent;
