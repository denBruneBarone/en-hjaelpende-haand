const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // Serve index.html
    if (url.pathname === "/") {
      return new Response(Bun.file("public/index.html"), {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (url.pathname === "/ping") {
      return new Response("pong");
    }

    // Serve static files like dist/index.js or other assets
    const filePath = url.pathname.startsWith("/dist/")
      ? `.${url.pathname}`
      : url.pathname.startsWith("/public/")
        ? `.${url.pathname}`
        : null;

    if (filePath) {
      try {
        const file = Bun.file(filePath);
        if (await file.exists()) {
          return new Response(file);
        }
      } catch (e) {
        return new Response("Not found", { status: 404 });
      }
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
