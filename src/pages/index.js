import { DefaultLayout } from "@/layouts/DefaultLayout"

const Index = () => (
  <div>index : todo</div>
)

Index.layout = DefaultLayout // optional, DefaultLayout by default
Index.authenticaed = true // optional, true by default

export default Index
