import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { QUERY_KEY } from "../../constant/Key";
import { queryClient } from "../../main.jsx";
import { customAxiosGet, customAxiosPost } from "../axios/customAxiosRequest";

const useImage = () => {
  const useGetAllImagesQuery = () => {
    return useQuery({
      queryFn: () => customAxiosGet("/allImages"),
      queryKey: [QUERY_KEY.Image],
    });
  };

  const useGetSingleImagesQuery = (id) => {
    return useQuery({
      queryFn: () => customAxiosGet(`/singleImage`, { ImageId: id }),
      queryKey: [QUERY_KEY.Image],
    });
  };

  const useAddImageQuery = () => {
    return useMutation({
      mutationFn: (payload) => customAxiosPost("/addImage", payload),
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.Image]);
      },
      onError: (error) => {
        console.log("create Image error", error);
        toast.error(error.response.data.error);
      },
    });
  };

  const useDeleteImageQuery = () => {
    return useMutation({
      mutationFn: (payload) => customAxiosPost("/deleteImage", payload),
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.Image]);
      },
      onError: (error) => {
        console.log("update Image error", error);
        toast.error(error.response.data.error);
      },
    });
  };
  return {
    useGetAllImagesQuery,
    useGetSingleImagesQuery,
    useAddImageQuery,
    useDeleteImageQuery,
  };
};

export default useImage;
