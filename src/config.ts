export const ROOT_URL =
  process.env.NODE_ENV === "production"
    ? "https://api-riverdi.itiswise.com"
    : "http://localhost:3090";

export const headers = {
  authorization: localStorage.getItem("token") || "no token",
};
