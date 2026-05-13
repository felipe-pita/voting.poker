import { type ObservableInput, from, of, switchMap } from "rxjs";

import { GiphyFetch } from "@giphy/js-fetch-api";
import { valueToColor } from "@/helpers/valueColorScale";
import { isNaN as isNaNLodash } from "lodash";
import { giphyKey } from "@/constants";

export type CardBackgroundData = {
  value: string;
  background: string;
  height: number;
  isImage?: boolean;
};

const displayPercentage = (
  value: number
): ObservableInput<CardBackgroundData> => {
  const { percentage: height, color } = valueToColor(value);

  return of({
    value: value.toString(),
    background: color,
    height: height * 250,
  });
};

const valueToSearchKey = (value: string) => {
  switch (value) {
    case "?":
      return "idk";
    case "null":
      return "shrug";
    case "épica":
      return "epic";
    default:
      return value;
  }
};

const STATIC_BACKGROUNDS: Record<string, string> = {
  "épica": "https://media1.tenor.com/m/7zg2nZnGU-QAAAAC/the-office-the.gif",
  "?": "https://media1.tenor.com/m/5oSHzEzELUgAAAAC/the-office.gif",
};

const displayGif = async (value: string): Promise<CardBackgroundData> => {
  const staticUrl = STATIC_BACKGROUNDS[value];
  if (staticUrl) {
    return {
      value,
      background: staticUrl,
      height: 250,
      isImage: true,
    };
  }

  const gf = new GiphyFetch(giphyKey ?? "");

  const { data } = await gf.search(valueToSearchKey(value));

  return {
    value,
    background: data[0].images.original.url,
    height: 250,
    isImage: true,
  };
};

export const cardBackgroundObservable = (value: string) =>
  of({ value }).pipe(
    switchMap(({ value }) => {
      const size = Number(value);

      if (isNaNLodash(size)) {
        return from(displayGif(value));
      }

      return displayPercentage(size);
    })
  );
