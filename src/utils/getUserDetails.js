import { LOCALSTORAGE_KEY } from "../constant/Key";

const getUserDetails = () => {
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_KEY.USER_DETAILS);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Invalid user details in localStorage", err);
    return null;
  }
};

export const saveDetailsToLocalStorage = (userDetails) => {
  localStorage.setItem(
    LOCALSTORAGE_KEY.USER_DETAILS,
    JSON.stringify(userDetails)
  );
};

export default getUserDetails;
