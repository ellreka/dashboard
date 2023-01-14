import { json } from "@remix-run/cloudflare";
import type { LoaderArgsWithCtx } from "~/types";

export const action = async ({ context }: LoaderArgsWithCtx) => {
  try {
    const kv = context.env.CACHE_KV;
    await kv.delete("cache");
    return json({ status: 200 });
  } catch (error) {
    console.error(error);
    return json({ status: 500 });
  }
};
