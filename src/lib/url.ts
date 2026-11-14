/** Extract a display hostname without a leading `www.` prefix. */
export function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Anchor attributes for links that open in a new tab safely. */
export function externalLinkProps(external?: boolean) {
  return external ? { target: "_blank" as const, rel: "noreferrer" } : {};
}
