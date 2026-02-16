/**
 * Page
 *
 * This is the top-level block that corresponds
 * to your Storyblok Content Type: "Page".
 *
 * In Storyblok, this probably contains:
 *  - body (a list of nested blocks like Hero, Section, FAQSection, etc.)
 *
 * This component does NOT render content directly.
 * It simply loops over nested blocks and delegates
 * rendering to StoryblokComponent.
 */

import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";
import { StoryblokComponent } from "@storyblok/react";

type PageBlok = SbBlokData & {
  body?: SbBlokData[]; // nested blocks
};

export default function Page({ blok }: { blok: PageBlok }) {
  const body = blok.body ?? [];

  return (
    <main {...storyblokEditable(blok)}>
      {body.map((nestedBlok) => (
        <StoryblokComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
        />
      ))}
    </main>
  );
}
