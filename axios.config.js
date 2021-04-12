import axios from "axios"

export const initAxios = () => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASEURL
  // todo: axios.defaults.headers.common["Authorization"] = "AUTH TOKEN"
  axios.defaults.headers.post["Content-Type"] = "application/json"
}
