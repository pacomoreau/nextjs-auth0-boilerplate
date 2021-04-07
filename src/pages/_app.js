import { Auth0Provider } from "@auth0/auth0-react"
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import { DefaultLayout } from "@/layouts/DefaultLayout"
import { AuthenticatedComponent } from "@/components/AuthenticatedComponent"
import theme from "../theme"
import _ from "lodash"

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
          <Layout>
            {authenticated && (
              <AuthenticatedComponent>
                <Component {...pageProps} />
              </AuthenticatedComponent>
            )}
            {!authenticated && <Component {...pageProps} />}
          </Layout>
        </ColorModeProvider>
      </ChakraProvider>
    </Auth0Provider>
  )
}

export default MyApp
