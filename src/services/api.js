// src/services/api.js

const DEV_API = "http://localhost:8787";

export const API_URL = import.meta.env.DEV
  ? DEV_API
  : `${window.location.origin}/api`;
