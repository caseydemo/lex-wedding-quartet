/**
 * Hero
 *
 * This block is your top-of-page “first impression” section.
 * It should be clean and wedding-elegant, but for now we’ll keep styling minimal
 * and focus on the Storyblok concepts.
 *
 * Key concepts used here:
 * - storyblokEditable(blok): lets Storyblok Visual Editor map clicks to this block
 * - typed blok fields: documents what you expect Storyblok to send
 */

import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

type HeroBlok = SbBlokData & {
  headline?: string;
  subheadline?: string;
  cta_label?: string;
  cta_link?: {
    cached_url?: string; // Storyblok commonly provides this for links
    url?: string;        // sometimes used depending on link type
  };
};

export default function Hero({ blok }: { blok: HeroBlok }) {
  const href = blok.cta_link?.cached_url || blok.cta_link?.url || "#";

  return (
    <section {...storyblokEditable(blok)} style={{ padding: 48 }}>
      <h1 style={{ fontSize: 40, margin: 0 }}>
        {blok.headline ?? "Wedding Quartet"}
      </h1>

      <p style={{ marginTop: 12, fontSize: 18, maxWidth: 640 }}>
        {blok.subheadline ?? "Elegant live music for your ceremony and cocktail hour."}
      </p>

      <div style={{ marginTop: 20 }}>
        <a
          href={href}
          style={{
            display: "inline-block",
            padding: "12px 16px",
            border: "1px solid currentColor",
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          {blok.cta_label ?? "Check availability"}
        </a>
      </div>
    </section>
  );
}
