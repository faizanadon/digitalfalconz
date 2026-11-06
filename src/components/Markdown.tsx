import React from "react";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

let inlineKey = 0;

/**
 * Recursive inline parser: **bold**, *italic* and [label](href) may nest
 * in any combination — notably **[label](/href)** (bold link) and
 * [**bold label**](/href) (link with bold label). The old regex parser
 * treated `**[label](href)**` as one bold token and leaked raw markdown
 * (`[Start a project](/contact)`) onto the page. This parser never does:
 * every token is consumed as HTML, plain text is escaped.
 */
function inline(text: string): React.ReactNode[] {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const parse = (s: string): React.ReactNode[] => {
    const out: React.ReactNode[] = [];
    let i = 0;
    while (i < s.length) {
      // Bold **...**
      if (s.startsWith("**", i)) {
        const end = s.indexOf("**", i + 2);
        if (end > i + 2) {
          out.push(<strong key={inlineKey++}>{parse(s.slice(i + 2, end))}</strong>);
          i = end + 2;
          continue;
        }
      }
      // Italic *...*
      if (s[i] === "*" && s[i + 1] !== "*") {
        const end = s.indexOf("*", i + 1);
        if (end > i + 1) {
          out.push(<em key={inlineKey++}>{parse(s.slice(i + 1, end))}</em>);
          i = end + 1;
          continue;
        }
      }
      // Link [label](href) — label may itself contain **bold** / *italic*.
      if (s[i] === "[") {
        const closeBracket = findCloseBracket(s, i);
        if (closeBracket > i && s[closeBracket + 1] === "(") {
          const closeParen = s.indexOf(")", closeBracket + 2);
          if (closeParen > closeBracket + 2) {
            const href = s.slice(closeBracket + 2, closeParen);
            out.push(<a key={inlineKey++} href={href}>{parse(s.slice(i + 1, closeBracket))}</a>);
            i = closeParen + 1;
            continue;
          }
        }
      }
      // Plain text up to the next special token.
      let j = i + 1;
      while (j < s.length && !s.startsWith("**", j) && s[j] !== "*" && s[j] !== "[") j++;
      out.push(<span key={inlineKey++} dangerouslySetInnerHTML={{ __html: esc(s.slice(i, j)) }} />);
      i = j;
    }
    return out;
  };
  return parse(text);
}

/** Find the `]` matching the `[` at `open`, skipping nested `[...]` pairs. */
function findCloseBracket(s: string, open: number): number {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    if (s[i] === "[") depth++;
    else if (s[i] === "]") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function renderList(lines: string[], ordered: boolean, key: string) {
  const items = lines.map((l) => l.replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, ""));
  if (ordered) {
    return (
      <ol key={key} className="steps-list">
        {items.map((it, i) => <li key={i}>{inline(it)}</li>)}
      </ol>
    );
  }
  return (
    <ul key={key}>
      {items.map((it, i) => <li key={i}>{inline(it)}</li>)}
    </ul>
  );
}

/** Tiny markdown renderer for headings, paragraphs, bold/italic, links, lists, hr, blockquote.
    Used so the supplied copy is rendered verbatim. */
export default function Markdown({ text, className }: { text: string; className?: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const out: React.ReactNode[] = [];
  let i = 0, key = 0;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) { i++; continue; }
    if (t === "---" || t === "***") { out.push(<hr key={key++} />); i++; continue; }
    const h = /^(#{1,4})\s+(.*)$/.exec(t);
    if (h) {
      const lvl = h[1].length;
      const body = h[2].replace(/\s*\{#.*\}\s*$/, "");
      const id = slugify(body.replace(/[*_`]/g, ""));
      if (lvl === 2) out.push(<h2 key={key++} id={id}>{inline(body)}</h2>);
      else if (lvl === 3) out.push(<h3 key={key++} id={id}>{inline(body)}</h3>);
      else if (lvl === 4) out.push(<h4 key={key++} id={id}>{inline(body)}</h4>);
      else out.push(<h2 key={key++} id={id}>{inline(body)}</h2>);
      i++; continue;
    }
    if (/^>\s?/.test(t)) {
      out.push(<blockquote key={key++}>{inline(t.replace(/^>\s?/, ""))}</blockquote>);
      i++; continue;
    }
    if (/^[-*]\s+/.test(t)) {
      const buf: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) { buf.push(lines[i].trim()); i++; }
      out.push(renderList(buf, false, `ul-${key++}`));
      continue;
    }
    if (/^\d+\.\s+/.test(t)) {
      const buf: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) { buf.push(lines[i].trim()); i++; }
      out.push(renderList(buf, true, `ol-${key++}`));
      continue;
    }
    // Paragraph: gather consecutive plain lines
    const buf: string[] = [t];
    i++;
    while (i < lines.length) {
      const nt = lines[i].trim();
      if (!nt || /^(#{1,4}\s|[-*]\s|\d+\.\s|>\s?|---$)/.test(nt)) break;
      buf.push(nt);
      i++;
    }
    out.push(<p key={key++}>{inline(buf.join(" "))}</p>);
  }
  return <div className={className ?? "md"}>{out}</div>;
}
