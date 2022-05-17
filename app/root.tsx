import type { MetaFunction } from "remix";

import React, { createContext, useState } from "react";
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import { VStack, Heading, Text, ChakraProvider } from "@chakra-ui/react";
import { withEmotionCache } from "@emotion/react";

import styles from "../styles/app.css";

import { ServerStyleContext, ClientStyleContext } from "./context";
import { IWeatherThemeContextProps } from "./types";
import { defaultTheme } from "./themes";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return { title: "Weatheria" };
};

export const WeatherThemeContext = createContext<IWeatherThemeContextProps>({
  theme: defaultTheme,
  setTheme: () => {},
} as IWeatherThemeContextProps);

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<{
    condition?: string;
    theme: any;
  }>(defaultTheme);

  return (
    <Document>
      <WeatherThemeContext.Provider value={{ theme: currentTheme, setTheme: setCurrentTheme }}>
        <ChakraProvider theme={currentTheme.theme}>
          <Outlet />
        </ChakraProvider>
      </WeatherThemeContext.Provider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <VStack h="100vh" justify="center">
        <Heading>There was an error</Heading>
        <Text>{error.message}</Text>
        <hr />
        <Text>Hey, developer, you should replace this with what you want your users to see.</Text>
      </VStack>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();
  let message;

  switch (caught.status) {
    case 401:
      message = (
        <Text>Oops! Looks like you tried to visit a page that you do not have access to.</Text>
      );
      break;
    case 404:
      message = <Text>Oops! Looks like you tried to visit a page that does not exist.</Text>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document>
      <VStack h="100vh" justify="center">
        <Heading>
          {caught.status}: {caught.statusText}
        </Heading>
        {message}
      </VStack>
    </Document>
  );
}

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
  const serverSyleData = React.useContext(ServerStyleContext);
  const clientStyleData = React.useContext(ClientStyleContext);

  // Only executed on client
  React.useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;

    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData?.reset();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstaticom" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
        {serverSyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            dangerouslySetInnerHTML={{ __html: css }}
            data-emotion={`${key} ${ids.join(" ")}`}
          />
        ))}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
});
