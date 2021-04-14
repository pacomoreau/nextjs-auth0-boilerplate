import { DefaultLayout } from "@/layouts/DefaultLayout"
import { usePosts } from "@/hooks/usePostQueries"
import { Link as ChakraLink, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"

const Index = () => {
  const { data, isLoading, isError, error } = usePosts()
  const posts = data ? data.slice(0, 10) : []

  return (
    <Stack spacing={2}>
      {isError && <Text size="xl">{error.message}</Text>}
      {isLoading && <Text size="xl">Loading...</Text>}
      {posts.map((post) => (
        <Link key={post.id} href={`/edit/${post.id}`} passHref>
          <ChakraLink>{post.title}</ChakraLink>
        </Link>
      ))}
      <Link href="/create" passHref>
        <ChakraLink>Create</ChakraLink>
      </Link>
    </Stack>
  )
}

Index.layout = DefaultLayout // optional, DefaultLayout by default
Index.authenticaed = true // optional, true by default

export default Index
