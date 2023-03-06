import "../styles/globals.css";
import type { AppProps } from "next/app";

import "@tindtechnologies/tind-components/styles.css";
import "@tindtechnologies/tind-components/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; //icons

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
