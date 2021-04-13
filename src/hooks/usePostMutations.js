import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation((values) => axios.post("/posts", values).then((res) => res.data), {
    onSuccess: () => queryClient.refetchQueries(["posts"], { active: true }),
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (values) => axios.patch(`/posts/${values.id}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        const previousPost = queryClient.getQueryData(["post", values.id])

        queryClient.setQueryData(["post", values.id], (old) => ({
          ...old,
          ...values,
        }))

        return () => queryClient.setQueryData(["post", values.id], previousPost)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: async (values) => {
        queryClient.refetchQueries("posts")
        await queryClient.refetchQueries(["post", values.id])
      },
    }
  )
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation((postId) => axios.delete(`/posts/${postId}`).then((res) => res.data), {
    onSuccess: () => queryClient.refetchQueries("posts"),
  })
}
