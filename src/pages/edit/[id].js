import { SamplePostForm } from "@/components/SamplePostForm"
import { useRouter } from "next/router"
import { usePost } from "@/hooks/usePostQueries"
import { Text } from "@chakra-ui/react"

export const getServerSideProps = async (context) => {
  console.log(context)
  return {
    props: { test: 123 },
  }
}

const Edit = ({ test }) => {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, isError, error } = usePost(id)

  console.log(test)

  return (
    <>
      {isError && <Text size="xl">{error.message}</Text>}
      {isLoading && <Text size="xl">Loading...</Text>}
      {data && <SamplePostForm post={data} />}
    </>
  )
}

export default Edit
