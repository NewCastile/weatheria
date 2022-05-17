import { extendTheme } from "@chakra-ui/react";

export const baseTheme = {
  fonts: {
    body: "Poppins, sans-serif",
  },
};

export const defaultTheme = {
  condition: "default",
  theme: extendTheme({
    ...baseTheme,
    colors: {
      primary: "#fff",
      accent: "#b5b5b5",
      hero: "#fff",
      secondary: "#f0f0f0",
    },
  }),
};

export const clearTheme = {
  condition: "clear",
  theme: extendTheme({
    ...baseTheme,
    colors: {
      primary: "#eaebc5",
      accent: "#61ba96",
      hero: "#eb8e7c",
      secondary: "#aee6e8",
    },
  }),
};

export const thunderstormTheme = {
  condition: "thunderstorm",
  theme: extendTheme({
    ...baseTheme,
    colors: {
      primary: "#8361c9",
      accent: "#414166",
      hero: "#6e4eaf",
      secondary: "#cbabf5",
    },
  }),
};

export const rainTheme = {
  condition: "rain",
  theme: extendTheme({
    ...baseTheme,
    colors: {
      primary: "#e8c9c3",
      accent: "#76b5c5",
      hero: "#e3b956",
      secondary: "#c3effa",
    },
  }),
};

export const snowTheme = {
  condition: "snow",
  theme: extendTheme({
    ...baseTheme,
    colors: {
      primary: "#97baf0",
      accent: "#3b5882",
      hero: "#465bfa",
      secondary: "#c3d9f7",
    },
  }),
};

export const cloudsTheme = {
  condition: "clouds",
  theme: extendTheme({
    ...baseTheme,
    colors: {
      primary: "#6d838f",
      accent: "#32424a",
      hero: "#32424a",
      secondary: "#9fb0c4",
    },
  }),
};

export const themes = [clearTheme, thunderstormTheme, cloudsTheme, rainTheme, snowTheme];
