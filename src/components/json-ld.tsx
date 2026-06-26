import Script from "next/script";

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data, id }: { data: JsonLdValue; id: string }) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
