import { useQuery } from "react-query"
import axios from "axios"

export const usePost = (postId) => {
  return useQuery(postId && ["post", postId], (key, postId) =>
    axios.get(`/posts/${postId}`).then((res) => res.data)
  )
}

export const usePosts = () => {
  return useQuery("posts", () => axios.get("/posts").then((res) => res.data))
}
