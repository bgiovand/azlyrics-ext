<h1 align="center">AZLyrics Extractor 🎶</h1>

## 🤔 Whats is this?

Just a simple AZLyrics.com scraper.

## 💻 Installation

```
npm install azlyrics-ext
```

## ⚙️ Usage

```js
const AZLyrics = require("azlyrics-ext");
import * from AZLyrics from "azlyrics-ext";
```

## 📎 Links

-   [Documentation](https://azlyrics-ext.js.org)
-   [NPM](https://npmjs.com/azlyrics-ext)
-   [GitHub](https://github.com/zyrouge/azlyrics-ext)

## ✏️ Examples

### Searching

```js
const songs = await AZLyrics.search("faded");

console.log(songs);
```

### Searching and fetching lyrics

```js
const songs = await AZLyrics.search("faded");

const { title, lyrics } = await AZLyrics.getTrack(songs[0].url);
console.log(`Lyrics of ${title}`);
console.log(lyrics);
```
