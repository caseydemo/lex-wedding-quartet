/**
 * FAQSection
 *
 * This represents a Storyblok block of type "FAQSection".
 *
 * In Storyblok, this block likely contains:
 *  - a title (string field)
 *  - a list of nested blocks (FAQItem blocks)
 *
 * When Storyblok sends data to Next.js, it sends JSON like:
 *
 * {
 *   component: "FAQSection",
 *   title: "Common Questions",
 *   items: [
 *     { component: "FAQItem", question: "...", answer: "...", _uid: "abc123" },
 *     ...
 *   ]
 * }
 *
 * Our job:
 * 1. Render the section wrapper
 * 2. Render each nested FAQItem block
 */

import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";
import { StoryblokComponent } from "@storyblok/react";

/**
 * SbBlokData
 *
 * This is a base TypeScript type provided by Storyblok.
 * It ensures we have:
 *  - _uid (unique id per block instance)
 *  - component (the block name)
 *  - other internal metadata
 *
 * We extend it with the custom fields
 * defined in our Storyblok block.
 */
type FAQSectionBlok = SbBlokData & {
  title?: string;
  items?: SbBlokData[]; // nested blocks
};

export default function FAQSection({ blok }: { blok: FAQSectionBlok }) {
  /**
   * Defensive default:
   * If Storyblok doesn’t send items,
   * avoid crashing by defaulting to an empty array.
   */
  const items = blok.items ?? [];

  return (
    /**
     * storyblokEditable(blok)
     *
     * This adds special data attributes to the DOM.
     *
     * WHY?
     * So the Storyblok Visual Editor can:
     *  - detect this block
     *  - highlight it
     *  - allow click-to-edit
     *
     * It does NOTHING visually.
     * It just adds metadata attributes like:
     *   data-blok-c="..."
     */
    <section {...storyblokEditable(blok)} >
      
      {/* Render section title if provided */}
      <h2 style={{ marginBottom: 12 }}>
        {blok.title ?? "FAQ"}
      </h2>

      <div style={{ display: "grid", gap: 12 }}>
        {/**
         * StoryblokComponent
         *
         * This is the dynamic renderer.
         *
         * It looks at nestedBlok.component
         * (for example: "FAQItem")
         *
         * Then it finds the matching React component
         * in the registry we defined in storyblok.ts.
         *
         * That is how JSON turns into real React UI.
         */}
        {items.map((nestedBlok) => (
          <StoryblokComponent
            blok={nestedBlok}
            key={nestedBlok._uid}
          />
        ))}
      </div>
    </section>
  );
}
