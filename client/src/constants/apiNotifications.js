export const API_NOTIFICATIONS = {
  loading: {
    title: "loading...",
    message: "Please wait!, Requested data is being loaded",
  },
  success: {
    title: "Success",
    message: "Requested data loaded successfully",
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occured while fetching response from the server, please try again later",
  },
  requestFailure: {
    title: "Error",
    message: "Error occured in parsing requested data",
  },
  networkError: {
    title: "Error",
    message:
      "Unable to connect to the server, check your internet connectivity and try again later",
  },
};

export const SERVICE_URLs = {
  userSignUp: {
    url: "/signup",
    method: "POST",
  },
};
