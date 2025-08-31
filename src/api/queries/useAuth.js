import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LOCALSTORAGE_KEY } from "../../constant/Key";
import { saveTokenToLocalStorage } from "../../utils/getToken";
import { saveDetailsToLocalStorage } from "../../utils/getUserDetails";
import { customAxiosPost } from "../axios/customAxiosRequest";
const useAuth = () => {
  const navigate = useNavigate();
  //  define signup query
  const useSignupQuery = (uniqueBrowserId) => {
    return useMutation({
      mutationFn: (payload) => customAxiosPost("/register", payload),
      onError: (error) => {
        console.log("signup error", error);
        toast.error(error.response.data.error);
      },
      onSuccess: (data) => {
        // now save this token in localStorage which have same uniqueBrowserId

        const tokens = data?.user?.tokens;
        const token = tokens?.find(
          (token) => token?.uniqueBrowserId === uniqueBrowserId
        );
        saveTokenToLocalStorage(token?.token);
        saveDetailsToLocalStorage(data?.user);
        navigate("/");
      },
    });
  };

  // define signin query
  const useSigninQuery = (uniqueBrowserId) => {
    return useMutation({
      mutationFn: (payload) => customAxiosPost("/login", payload),
      onError: (error) => {
        console.log("login error", error);
        toast.error(error.response.data.error);
      },
      onSuccess: (data) => {
        // now save this token in localStorage which have same uniqueBrowserId
        console.log(data);
        const tokens = data?.user?.tokens;
        const token = tokens?.find(
          (token) => token?.uniqueBrowserId === uniqueBrowserId
        );
        saveTokenToLocalStorage(token?.token);
        saveDetailsToLocalStorage(data?.user);
        navigate("/");
      },
    });
  };

  // logout
  const useLogoutQuery = () => {
    return useMutation({
      mutationFn: () => customAxiosPost("/logout"),
      onSuccess: () => {
        localStorage.removeItem(LOCALSTORAGE_KEY.TOKEN);
        localStorage.removeItem(LOCALSTORAGE_KEY.USER_DETAILS);
        navigate("/signin");
      },
      onError: (error) => {
        console.log("logout error", error);
        toast.error(error.response.data.error);
      },
    });
  };
  return {
    useSignupQuery,
    useSigninQuery,
    useLogoutQuery,
  };
};

export default useAuth;
