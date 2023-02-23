import "../styles/globals.css";
import type { AppProps } from "next/app";

import "@tindtechnologies/tind-components/styles.css";
import "@tindtechnologies/tind-components/theme.css";
import "primeicons/primeicons.css"; //icons
import "primereact/resources/primereact.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
