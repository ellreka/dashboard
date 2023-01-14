import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css";
import type { LoaderArgsWithCtx } from "./types";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const isAuthorized = (
  request: Request,
  auth: {
    username: string;
    password: string;
  }
) => {
  const header = request.headers.get("Authorization");
  if (!header) return false;

  const base64 = header.replace("Basic ", "");
  const [username, password] = new TextDecoder()
    .decode(Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)))
    .toString()
    .split(":");

  return username === auth.username && password === auth.password;
};

export const loader = async ({ request, context }: LoaderArgsWithCtx) => {
  if (
    !isAuthorized(request, {
      username: context.env.BASIC_AUTH_USERNAME,
      password: context.env.BASIC_AUTH_PASSWORD,
    })
  ) {
    return json({ authorized: false }, { status: 401 });
  }
  return json({
    authorized: true,
  });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
