import axios, { AxiosError } from "axios";

export default function handleApiError(err: AxiosError) {
  if (!axios.isAxiosError(err)) {
    console.error(err);
    return;
  }

  if (err.response) {
    console.error("Response Error: ", err.response.data);
    return err.response.data;
  }

  if (err.request) {
    console.error("Request Error: ", err.request.responseText);
    return err.request.responseText;
  }

  console.error("Error:", err.message);
  return err.message;
}
