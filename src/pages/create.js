import { SamplePostForm } from "@/components/SamplePostForm"
import { useCreatePost } from "@/hooks/usePostMutations"

const Create = () => {
  const { mutate, status } = useCreatePost()

  return <SamplePostForm mode="create" onSubmit={mutate} submitStatus={status} />
}

export default Create
