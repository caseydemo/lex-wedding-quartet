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
		url?: string; // sometimes used depending on link type
	};
};

export default function Hero({ blok }: { blok: HeroBlok }) {
	const href =
		blok.cta_link?.url ||
		(blok.cta_link?.cached_url ? `/${blok.cta_link.cached_url}` : "#");

	return (
		<section {...storyblokEditable(blok)}>
			<div style={{ paddingTop: 64, paddingBottom: 24 }}>
				<div
					style={{
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						fontSize: 12,
						opacity: 0.7,
						marginBottom: 14,
					}}
				>
					Wedding Music
				</div>

				<h1
					style={{
						fontSize: 44,
						lineHeight: 1.05,
						margin: 0,
						maxWidth: 900,
					}}
				>
					{blok.headline ?? "Wedding Quartet"}
				</h1>

				<p
					style={{
						marginTop: 16,
						fontSize: 18,
						lineHeight: 1.6,
						maxWidth: 720,
						opacity: 0.9,
					}}
				>
					{blok.subheadline ??
						"Elegant live music for your ceremony and cocktail hour."}
				</p>

				<div style={{ marginTop: 22 }}>
					<a
						href={href}
						style={{
							display: "inline-block",
							padding: "12px 16px",
							border: "1px solid currentColor",
							borderRadius: 12,
							textDecoration: "none",
							fontWeight: 600,
						}}
					>
						{blok.cta_label ?? "Check availability"}
					</a>
				</div>
			</div>
		</section>
	);
}
