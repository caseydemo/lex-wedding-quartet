/**
 * Section
 *
 * A simple content section block for marketing pages.
 * Storyblok fields:
 * - headline (Text)
 * - content (Textarea)
 *
 * storyblokEditable(blok) adds invisible attributes so the Visual Editor can
 * highlight/click this exact block in the editor.
 */

import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

type SectionBlok = SbBlokData & {
  headline?: string;
  content?: string;
};

export default function Section({ blok }: { blok: SectionBlok }) {
  return (
    <section {...storyblokEditable(blok)}>
      {blok.headline ? (
        <h2 style={{ margin: 0, marginBottom: 10 }}>{blok.headline}</h2>
      ) : null}

      {blok.content ? (
        <p style={{ margin: 0, maxWidth: 760, lineHeight: 1.6 }}>
          {blok.content}
        </p>
      ) : null}
    </section>
  );
}
