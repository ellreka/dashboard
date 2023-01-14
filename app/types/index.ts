import type { LoaderArgs } from "@remix-run/cloudflare";

export type LoaderArgsWithCtx = LoaderArgs & {
  context: {
    env: Env;
  };
};
