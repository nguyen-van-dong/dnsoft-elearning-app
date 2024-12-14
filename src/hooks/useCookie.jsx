import cookieService from "../services/cookie.service";

const useCookie = () => {
  const token = cookieService.get('token');
  if (token) {
    return true;
  }
  return false;
}

export default useCookie;
