declare module "__STATIC_CONTENT_MANIFEST" {
  const manifestJSON: string;
  export default manifestJSON;
}

interface Env {
  __STATIC_CONTENT: KVNamespace;

  CACHE_KV: KVNamespace;
  TODOIST_API_KEY: string;
  BASIC_AUTH_USERNAME: string;
  BASIC_AUTH_PASSWORD: string;
}
