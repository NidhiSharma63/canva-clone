import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { QUERY_KEY } from "../../constant/Key";
import { queryClient } from "../../main.jsx";
import { customAxiosGet, customAxiosPost } from "../axios/customAxiosRequest";

const useTemplate = () => {
  const useGetAllTemplatesQuery = () => {
    return useQuery({
      queryFn: () => customAxiosGet("/allTemplate"),
      queryKey: [QUERY_KEY.TEMPLATE],
    });
  };

  const useGetSingleTemplatesQuery = (id) => {
    return useQuery({
      queryFn: () => customAxiosGet(`/singleTemplate`, { templateId: id }),
      queryKey: [QUERY_KEY.TEMPLATE],
    });
  };

  const useCreateTemplateQuery = () => {
    return useMutation({
      mutationFn: (payload) => customAxiosPost("/createTemplate", payload),
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.TEMPLATE]);
      },
      onError: (error) => {
        console.log("create template error", error);
        toast.error(error.response.data.error);
      },
    });
  };

  const useUpdateTemplateQuery = () => {
    return useMutation({
      mutationFn: (payload) => customAxiosPost("/updateTemplate", payload),
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.TEMPLATE]);
      },
      onError: (error) => {
        console.log("update template error", error);
        toast.error(error.response.data.error);
      },
    });
  };
  return {
    useGetAllTemplatesQuery,
    useGetSingleTemplatesQuery,
    useCreateTemplateQuery,
    useUpdateTemplateQuery,
  };
};

export default useTemplate;
