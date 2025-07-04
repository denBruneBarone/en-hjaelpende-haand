import { writeFile, readFile } from "node:fs/promises";
import crypto from "crypto";

const SUBMISSIONS_FILE = "./submissions.json";
const sessions = new Map(); // sessionId -> user info

const PORT = process.env.PORT || 3000;

const ADMIN_USER = {
  username: "admin",
  password: "admin", // TODO: hash kode, gem kode, 
};

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    cookies[name] = rest.join("=");
  });
  return cookies;
}

function createSession() {
  return crypto.randomBytes(16).toString("hex");
}

async function saveSubmission(data) {
  try {
    // Read existing submissions or start with empty array
    let submissions = [];
    try {
      const fileData = await readFile(SUBMISSIONS_FILE, "utf-8");
      submissions = JSON.parse(fileData);
    } catch {
      // File might not exist yet — ignore
    }

    submissions.push({
      ...data,
      timestamp: new Date().toISOString(),
    });

    await writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
  } catch (err) {
    console.error("Failed to save submission:", err);
  }
}

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const cookies = parseCookies(req.headers.get("cookie"));
    const sessionId = cookies.sessionId;
    const user = sessions.get(sessionId);

    // login TODO: timeout or retry limits!
    if (url.pathname === "/api/login" && req.method === "POST") {
      const { username, password } = await req.json();

      if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        const newSessionId = createSession();
        sessions.set(newSessionId, { username });

        return new Response(
          JSON.stringify({ success: true }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": `sessionId=${newSessionId}; HttpOnly; Path=/; SameSite=Strict`,
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid credentials" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // api endpoints
    if (url.pathname === "/api/kontakt" && req.method === "POST") {
      console.log("/api/kontakt hit")
      try {
        const data = await req.json();
        console.log("data:")
        console.log(data);

        await saveSubmission(data);

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // 401 to non-admins
    if (url.pathname === "/api/submissions" && req.method === "GET") {
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }

      try {
        const fileData = await readFile(SUBMISSIONS_FILE, "utf-8");
        return new Response(fileData, {
          headers: { "Content-Type": "application/json" },
        });
      } catch {
        return new Response("[]", {
          headers: { "Content-Type": "application/json" },
        });
      }
    }


    // Serve static assets
    if (url.pathname.startsWith("/dist/")) {
      try {
        const file = Bun.file(`.${url.pathname}`);
        if (await file.exists()) {
          return new Response(file);
        }
      } catch { }
    }

    // Serve index.html for all other routes (to enable SPA routing)
    return new Response(Bun.file("public/index.html"), {
      headers: { "Content-Type": "text/html" },
    });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
