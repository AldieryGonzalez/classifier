import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";
import Layout from "../components/Layout";
import { AlertProvider } from "../contexts/AlertContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AlertProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AlertProvider>
  );
};

export default MyApp;
