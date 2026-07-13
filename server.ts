import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
import { extname } from "path";
import { transform } from "esbuild";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
};

async function handler(req: IncomingMessage, res: ServerResponse) {
  console.log(`${req.method} ${req.url}`);

  let filePath: string;

  if (req.url === "/printing") {
    filePath = "src/pages/printing.html";
  } else if (req.url === "/") {
    filePath = "index.html";
  } else {
    filePath = req.url!.slice(1);
  }

  const ext = extname(filePath);

  try {
    if (ext === ".ts") {
      const source = await readFile(filePath, "utf-8");
      const { code } = await transform(source, { loader: "ts", format: "esm" });
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(code);
      return;
    }

    const content = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream",
    });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}

const port = 5173;
const server = createServer(handler);
server.listen(port, () => console.log("Server running"));
