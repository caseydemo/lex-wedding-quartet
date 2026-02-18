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
import Blocks from "../Blocks";

type SectionBlok = SbBlokData & {
	headline?: string;
	content?: string;
};

export default function Section({ blok }: { blok: SectionBlok }) {
	return (
		<section {...storyblokEditable(blok)}>
			<Blocks blocks={blok.blocks} />
		</section>
	);
}
