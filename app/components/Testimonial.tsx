import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

/**
 * Single testimonial item.
 * Storyblok fields:
 * - quote (Textarea)
 * - name (Text)
 * - meta (Text) optional: "Bride, Keeneland / Oct 2025"
 */
type TestimonialBlok = SbBlokData & {
  quote?: string;
  name?: string;
  meta?: string;
};

export default function Testimonial({ blok }: { blok: TestimonialBlok }) {
  return (
    <figure
      {...storyblokEditable(blok)}
      style={{
        margin: 0,
        padding: 16,
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 14,
      }}
    >
      <blockquote style={{ margin: 0, lineHeight: 1.6, opacity: 0.9 }}>
        “{blok.quote ?? "They sounded incredible and made the whole evening feel elevated."}”
      </blockquote>
      <figcaption style={{ marginTop: 10, fontSize: 14, opacity: 0.75 }}>
        <strong style={{ opacity: 0.9 }}>{blok.name ?? "Client Name"}</strong>
        {blok.meta ? ` · ${blok.meta}` : null}
      </figcaption>
    </figure>
  );
}
