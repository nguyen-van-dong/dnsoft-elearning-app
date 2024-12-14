import reqAxios from './request';

const register = (data) => {
  return reqAxios().post('/register', data);
};

const login = (data) => {
  return reqAxios().post('/login', data);
};

const verifyPassword = (data) => {
  return reqAxios().post('/validatePassword', data);
};

const forgotPassword = (data) => {
  return reqAxios().post('/forgotPassword', data);
};

const resetPassword = (data) => {
  return reqAxios().post('/resetPassword', data);
};

const putChangePassword = (token, data) => {
  return reqAxios().put(`/change-password/${token}`, data);
};

const logout = () => {
  return reqAxios().post(`/logout`);
};

const verify = (data) => {
  return reqAxios().post(`/verify`, data);
}

const handleSocialAuthenticate = (data) => {
  return reqAxios().post(`/handle-social-login`, data);
};

const authService = {
  register,
  login,
  forgotPassword,
  putChangePassword,
  logout,
  verifyPassword,
  resetPassword,
  verify,
  handleSocialAuthenticate,
};

export default authService;
