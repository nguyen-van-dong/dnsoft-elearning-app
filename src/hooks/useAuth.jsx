import React from "react";
import { AUTHORIZATION } from "../const/common";

const useAuth = () => {
  const authorizeInfo = localStorage.getItem(AUTHORIZATION);
  if (authorizeInfo) {
    return JSON.parse(authorizeInfo);
  }
  return null;
}

export default useAuth;
