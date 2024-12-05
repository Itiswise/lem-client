export const ROOT_URL =
    process.env.REACT_APP_ENV === "production"
        ? "https://api-riverdi.itiswise.com" :
        process.env.REACT_APP_ENV === "staging" ?
            "https://staging-api-riverdi.itiswise.com"
    : "http://localhost:3090";

export const headers = {
  authorization: localStorage.getItem("token") || "no token",
};

export const itemsPerPage = 20;
