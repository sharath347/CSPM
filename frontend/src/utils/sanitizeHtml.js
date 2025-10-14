// Lightweight HTML sanitizer tailored for rendering trusted report fragments.
// Whitelists a safe subset of tags/attributes; strips everything else.

const ALLOWED_TAGS = new Set([
  "b",
  "strong",
  "i",
  "em",
  "u",
  "br",
  "p",
  "ul",
  "ol",
  "li",
  "a",
  "samp",
  "code",
  "pre",
  "small",
  "span",
]);

const ALLOWED_ATTRS = {
  a: new Set(["href", "title", "target", "rel"]),
  span: new Set(["class"]),
};

function sanitizeAttributes(tagName, attrs) {
  const allowed = ALLOWED_ATTRS[tagName] || new Set();
  const out = [];
  for (const [name, value] of attrs) {
    if (allowed.has(name)) {
      if (tagName === "a" && name === "href") {
        try {
          const url = new URL(value, typeof window !== "undefined" ? window.location.origin : "https://example.com");
          // Disallow javascript: and data: except data:image for safety
          if (
            url.protocol === "javascript:" ||
            (url.protocol === "data:" && !/^data:image\//.test(value))
          ) {
            continue;
          }
        } catch (_) {
          continue;
        }
      }
      out.push(`${name}="${String(value).replace(/"/g, "&quot;")}`);
    }
  }
  return out.length ? " " + out.join(" ") : "";
}

export function sanitizeHtml(dirtyHtml) {
  if (!dirtyHtml || typeof dirtyHtml !== "string") return "";

  // Very small tokenizer to parse tags; for anything complex, consider DOMPurify.
  return dirtyHtml
    .replace(/</g, "<&") // temporarily escape to avoid accidental parsing
    .replace(/<&\/(\w+)[^>]*>/g, (m, tag) => {
      const t = tag.toLowerCase();
      return ALLOWED_TAGS.has(t) ? `</${t}>` : "";
    })
    .replace(/<&(\w+)([^>]*)>/g, (m, tag, rawAttrs) => {
      const t = tag.toLowerCase();
      if (!ALLOWED_TAGS.has(t)) return "";

      // parse attrs as key="value"
      const attrs = [];
      const attrRe = /(\w+)(\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
      let match;
      while ((match = attrRe.exec(rawAttrs))) {
        const name = match[1];
        const value = match[4] || match[5] || match[6] || "";
        attrs.push([name, value]);
      }
      const safeAttrs = sanitizeAttributes(t, attrs);
      return `<${t}${safeAttrs}>`;
    })
    // finally unescape the temporary marker for non-tags
    .replace(/<&/g, "<");
}

export default sanitizeHtml;


