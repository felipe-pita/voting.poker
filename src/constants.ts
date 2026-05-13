export const isDev =
  typeof global === "undefined"
    ? import.meta.env?.DEV ?? false
    : process && process.env.NODE_ENV === "development";

const isBrowser = typeof location !== "undefined";

export const siteHost = isBrowser
  ? location.host
  : isDev
    ? "localhost:3000"
    : "voting.poker";

export const BASE_URL = isBrowser
  ? `${location.protocol}//${location.host}`
  : isDev
    ? `http://${siteHost}`
    : `https://${siteHost}`;

export const ablyKey =
  "KFbzIQ.hA8SsQ:h4P2SGxtFt3I-6sB2vbLbmeHycJIs5wDMKaWk23dWAw";

export const giphyKey = "0cPLUIIRYsiq91sNjp48iyhp6dEWPF0R";
