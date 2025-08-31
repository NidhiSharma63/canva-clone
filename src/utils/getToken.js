import { LOCALSTORAGE_KEY } from "../constant/Key";

const getToken = () => {
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_KEY.TOKEN);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Invalid token in localStorage", err);
    return null;
  }
};

export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem(LOCALSTORAGE_KEY.TOKEN, JSON.stringify(token));
};

export default getToken;
