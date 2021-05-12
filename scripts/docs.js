const fs = require("fs").promises;
const path = require("path");

const URL = "azlyrics-ext.js.org";

const start = async () => {
    const cnamedir = path.resolve(__dirname, "..", "docs", "CNAME");
    await fs.writeFile(cnamedir, URL);
    console.log(`Wrote CNAME file to ${cnamedir} pointing to '${URL}'`);
};

start();
