import Router from "next/router"
import { Auth0Provider } from "@auth0/auth0-react"
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import { DefaultLayout } from "@/layouts/DefaultLayout"
import { AuthenticatedComponent } from "@/components/AuthenticatedComponent"
import "nprogress/nprogress.css" //styles of nprogress
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { initAxios } from "../../axios.config"
import NProgress from "nprogress"
import theme from "../theme"
import _ from "lodash"

initAxios()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error?.response?.status === 404 || error?.response?.status >= 500) {
          return false // no retry for some error codes
        }
        return 3
      },
    },
  },
})

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

const MyApp = ({ Component, pageProps }) => {
  // if no layout, use DefaultLayout
  const Layout = Component.layout || DefaultLayout
  // if authenticated not defined, authenticated by default
  const authenticated = _.isUndefined(Component.authenticated) ? true : Component.authenticated

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECTURI}
    >
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider options={{ useSystemColorMode: false }}>
          <QueryClientProvider client={queryClient}>
            <Layout>
              {authenticated && (
                <AuthenticatedComponent>
                  <Component {...pageProps} />
                </AuthenticatedComponent>
              )}
              {!authenticated && <Component {...pageProps} />}
              <ReactQueryDevtools />
            </Layout>
          </QueryClientProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </Auth0Provider>
  )
}

export default MyApp
