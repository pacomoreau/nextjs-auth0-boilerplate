import { DefaultLayout } from "@/layouts/DefaultLayout"
import { Link as ChakraLink } from "@chakra-ui/react"
import Link from "next/link"

const Index = () => (
  <>
    <Link href="/create" passHref>
      <ChakraLink>Create</ChakraLink>
    </Link>
  </>
)

Index.layout = DefaultLayout // optional, DefaultLayout by default
Index.authenticaed = true // optional, true by default

export default Index
