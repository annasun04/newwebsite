import { mkdir, writeFile } from "node:fs/promises";

const worker = `const INDEX_PATH = "/index.html";

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (
      response.status !== 404 ||
      request.method !== "GET" ||
      !request.headers.get("accept")?.includes("text/html")
    ) {
      return response;
    }

    return env.ASSETS.fetch(
      new Request(new URL(INDEX_PATH, request.url), request),
    );
  },
};
`;

await mkdir(new URL("../dist/server/", import.meta.url), { recursive: true });
await writeFile(new URL("../dist/server/index.js", import.meta.url), worker);
