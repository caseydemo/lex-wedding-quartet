/**
 * Storyblok "Section" block component
 *
 * For now this is a simple placeholder so the build succeeds.
 * We'll expand it later to render nested blocks, content, styling, etc.
 */

import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

type SectionBlok = SbBlokData & {
  // We'll add real fields later (headline, body, etc.)
};

export default function Section({ blok }: { blok: SectionBlok }) {
  return (
    <section {...storyblokEditable(blok)}>
      {/* Placeholder output so you can see it's rendering */}
      <div style={{ padding: 24 }}>
        <strong>Section</strong>
      </div>
    </section>
  );
}
