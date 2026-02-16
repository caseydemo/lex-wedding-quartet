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

import {
	storyblokEditable,
	StoryblokServerComponent,
	type SbBlokData,
} from "@storyblok/react/rsc";

type PageBlok = SbBlokData & {
	body?: SbBlokData[]; // nested blocks
};

export default function Page({ blok }: { blok: PageBlok }) {
	const body = blok.body ?? [];

	return (
		<main {...storyblokEditable(blok)}>
			<div
				style={{
					maxWidth: 1100,
					margin: "0 auto",
					padding: "0 24px",
					display: "grid",
					gap: 48,
				}}
			>
				{body.map((nestedBlok) => (
					<StoryblokServerComponent
						blok={nestedBlok}
						key={nestedBlok._uid}
					/>
				))}
			</div>
		</main>
	);
}
