import { SamplePostForm } from "@/components/SamplePostForm"
import { useRouter } from "next/router"
import { usePost } from "@/hooks/usePostQueries"
import { Text } from "@chakra-ui/react"

const Edit = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, isError, error } = usePost(id)

  return (
    <>
      {isError && <Text size="xl">{error.message}</Text>}
      {isLoading && <Text size="xl">Loading...</Text>}
      {data && <SamplePostForm post={data} />}
    </>
  )
}

export default Edit
