import {
  getAssetFromKV,
  MethodNotAllowedError,
  NotFoundError,
} from "@cloudflare/kv-asset-handler";
import type { AppLoadContext } from "@remix-run/cloudflare";
import { createRequestHandler } from "@remix-run/cloudflare";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

import * as build from "../build";

const assetManifest = JSON.parse(manifestJSON);
const handleRemixRequest = createRequestHandler(build, process.env.NODE_ENV);

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    if (request.method === "GET" || request.method === "HEAD") {
      try {
        const url = new URL(request.url);
        const ttl = url.pathname.startsWith("/build/")
          ? 60 * 60 * 24 * 365 // 1 year
          : 60 * 5; // 5 minutes
        return await getAssetFromKV(
          {
            request,
            waitUntil(promise) {
              return ctx.waitUntil(promise);
            },
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: assetManifest,
            cacheControl: {
              browserTTL: ttl,
              edgeTTL: ttl,
            },
          }
        );
      } catch (error) {
        if (error instanceof MethodNotAllowedError) {
          return new Response("Method not allowed", { status: 405 });
        } else if (!(error instanceof NotFoundError)) {
          return new Response("An unexpected error occurred", { status: 500 });
        }
      }
    }

    try {
      const loadContext: AppLoadContext = { env };
      return await handleRemixRequest(request, loadContext);
    } catch (error) {
      console.log(error);
      return new Response("An unexpected error occurred", { status: 500 });
    }
  },
};
