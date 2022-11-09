import { Provider } from "next-auth/client";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 60, // Re-fetch session if cache is older than 60 seconds
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
