import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";
import Blocks from "./Blocks";

/**
 * Social proof block: a section that contains testimonial items.
 * Storyblok fields:
 * - headline (Text)
 * - items (Blocks, only "testimonial" allowed)
 */
type TestimonialSectionBlok = SbBlokData & {
  headline?: string;
  items?: SbBlokData[];
};

export default function TestimonialSection({ blok }: { blok: TestimonialSectionBlok }) {
  return (
    <section {...storyblokEditable(blok)} style={{ padding: "36px 0" }}>
      {blok.headline ? <h2 style={{ margin: 0, marginBottom: 14 }}>{blok.headline}</h2> : null}
      <div style={{ display: "grid", gap: 14 }}>
        <Blocks blocks={blok.items} />
      </div>
    </section>
  );
}
