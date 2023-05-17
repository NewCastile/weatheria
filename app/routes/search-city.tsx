import { LoaderFunction } from "@remix-run/server-runtime";

import { ISuggestion } from "../types";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const city = url.searchParams.get("q");

  try {
    const suggestions: Array<ISuggestion> = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${
        process.env.WEATHER_API_KEY as string
      }`,
    )
      .then((response) => response.json())
      .catch((reason) => {
        throw new Error(reason);
      });

    return suggestions;
  } catch (err) {
    return null;
  }
};
