/**
 * Storyblok "FAQItem" block component
 *
 * This is a leaf block (usually rendered inside FAQSection).
 * We'll keep it minimal for now—just enough to satisfy imports
 * and make Visual Editor click-mapping work.
 */

import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

type FAQItemBlok = SbBlokData & {
  question?: string;
  answer?: string;
};

export default function FAQItem({ blok }: { blok: FAQItemBlok }) {
  return (
    <div {...storyblokEditable(blok)} style={{ padding: 12 }}>
      <div style={{ fontWeight: 600 }}>{blok.question ?? "FAQ Question"}</div>
      <div style={{ marginTop: 6 }}>{blok.answer ?? "FAQ Answer"}</div>
    </div>
  );
}
