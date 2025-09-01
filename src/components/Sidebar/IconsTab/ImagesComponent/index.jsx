import useImageHook from "@/components/Sidebar/IconsTab/ImagesComponent/hook";
import { CloudUpload, Loader } from "lucide-react";

const ImagesComponent = () => {
  const {
    inputRef,
    setFile,
    preview,
    progress,
    data,
    isPending,
    handleClick,
    handleDragStart,
  } = useImageHook();
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

      {isPending && <Loader className="animate-spin w-full" />}
      {/* show all images */}
      <div className="flex flex-wrap overflow-y-auto h-[500px] w-full">
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
        {data && !isPending && (
          <div className="flex flex-wrap gap-4">
            {data.map((image) => (
              <div
                className="relative w-full max-w-md max-h-48 rounded-xl overflow-hidden"
                onDragStart={(e) => handleDragStart(e, "image", image)}
              >
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesComponent;
