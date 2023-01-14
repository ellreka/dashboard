import { json } from "@remix-run/cloudflare";
import type { LoaderArgsWithCtx } from "~/types";

export const loader = async ({ context }: LoaderArgsWithCtx) => {
  const kv = context.env.CACHE_KV;
  const cache = await kv.get("cache", "json");
  if (cache) {
    return json(cache);
  } else {
    const response = await fetch("https://api.todoist.com/rest/v2/tasks", {
      headers: {
        Authorization: `Bearer ${context.env.TODOIST_API_KEY}`,
      },
    });
    const data = await response.json();
    console.log(data);
    await kv.put("cache", JSON.stringify(data), { expirationTtl: 300 });
    return json(data);
  }
};
