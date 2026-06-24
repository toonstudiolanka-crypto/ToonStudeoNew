/* Hostinger entry file — do not pass port/hostname to next(), only to listen() */
const { createServer } = require("http");
const { parse } = require("url");
const path = require("path");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = "0.0.0.0";
const appDir = __dirname;

const app = next({ dev: false, dir: appDir });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        await handle(req, res, parse(req.url, true));
      } catch (err) {
        console.error("Request error:", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    }).listen(port, hostname, () => {
      console.log(`Toon Studio ready on http://${hostname}:${port} (dir: ${appDir})`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js:", err);
    process.exit(1);
  });
