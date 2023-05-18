/** @format */

import { ISuggestion } from "../types";

type SuggestionFormat = "ASC" | "DESC";

export const suggestionToString = (suggestion: ISuggestion, format?: SuggestionFormat) => {
  if (!suggestion.country) return "";
  switch (format) {
    case "ASC": {
      const suggestionString = suggestion.name.concat(
        `${
          suggestion.state
            ? `, ${suggestion.state}, ${suggestion.country}`
            : `, ${suggestion.country}`
        }`,
      );

      return suggestionString;
    }

    default: {
      const suggestionString = suggestion.country.concat(
        `${suggestion.state ? `, ${suggestion.state}` : ""}, ${suggestion.name}`,
      );

      return suggestionString;
    }
  }
};
