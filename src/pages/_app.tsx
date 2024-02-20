import "../../styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/form";
import "@mantine/dates";
import "@mantine/nprogress";
import "@mantine/modals";
import "@mantine/code-highlight";

import { SWRConfig } from "swr";

import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <SWRConfig value={{ refreshInterval: 30000, revalidateOnFocus: false }}>
        <Component {...pageProps} />;
      </SWRConfig>
    </MantineProvider>
  );
}

export default MyApp;
