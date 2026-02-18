// app/[[...slug]]/page.tsx
import StoryblokPreview from "../components/StoryblokPreview";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getStoryblokApi,
	StoryblokServerComponent,
} from "@storyblok/react/rsc";
import PreviewStory from "../components/PreviewStory";

/**
 * ============================================================
 * Storyblok + Next.js (App Router) Catch-all Route (RSC)
 * ============================================================
 *
 * This file is the "integration seam" between:
 *   1) Next.js routing (URLs like /faq, /contact, /services/ceremony)
 *   2) Storyblok stories (slugs like "faq", "contact", "services/ceremony")
 *   3) Storyblok blocks -> React components (via storyblokInit registry)
 *
 * Key ideas to understand:
 * - [[...slug]] means "catch-all optional":
 *     "/"         -> params.slug is undefined
 *     "/faq"      -> params.slug is ["faq"]
 *     "/a/b"      -> params.slug is ["a","b"]
 *
 * - Storyblok stories are fetched by slug:
 *     "home" is commonly the homepage story in Storyblok
 *     "faq" is the FAQ page story
 *
 * - RSC (React Server Components):
 *     This file runs on the server.
 *     It's allowed to talk to Storyblok directly.
 *     It returns JSX (server-rendered output) with no client hydration
 *     required for the content blocks.
 */

/**
 * ISR (Incremental Static Regeneration) for the whole route.
 *
 * This does NOT mean "refetch every request".
 * It means:
 *   - Next can serve a cached version of the page
 *   - After 60 seconds, the next request will trigger a background rebuild
 *     (depending on cache state)
 *
 * For a marketing site POC, this is a great default:
 *   - fast like static
 *   - updates without redeploy
 */
export const revalidate = 60;

/**
 * Next passes route params into your page and metadata functions.
 * With [[...slug]] the slug is optional and becomes string[].
 */
type PageProps = {
	params: Promise<{ slug?: string[] }>;
	searchParams?: Record<string, string | string[] | undefined>;
};

/**
 * Helper: convert Next catch-all params into a Storyblok slug.
 *
 * Next gives: ["services", "ceremony"]
 * Storyblok expects: "services/ceremony"
 *
 * For the homepage:
 *   - URL "/" has no params.slug
 *   - We map that to Storyblok story "home"
 *
 * If your Storyblok homepage slug is not "home",
 * change the fallback here.
 */
function toStoryblokSlug(resolvedParams: { slug?: string[] }) {
	return resolvedParams.slug?.join("/") || "home";
}

/**
 * Helper: choose which Storyblok version to fetch.
 *
 * - In development: use "draft" so you can iterate without publishing.
 * - In production: use "published" so only approved content is shown.
 *
 * This is the exact issue you ran into earlier (404 in published).
 */
function getStoryblokVersion(): "draft" | "published" {
	return process.env.NODE_ENV === "development" ? "draft" : "published";
}

/**
 * ============================================================
 * generateMetadata()
 * ============================================================
 *
 * This is the App Router replacement for older "head" patterns.
 * Next calls this on the server to build <title>, meta description, etc.
 *
 * Why this matters in a CMS site:
 * - Metadata should come from content (Storyblok), not hardcoded per route.
 * - It proves the integration is "real", not just rendering blocks.
 *
 * Important: This function must be fast & safe.
 * - If Storyblok errors, we return a reasonable fallback.
 * - We do NOT want metadata generation to crash the page.
 */
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const resolvedParams = await params; // ✅ unwrap Promise
	const slug = toStoryblokSlug(resolvedParams); // ✅ safe
	const version = getStoryblokVersion();
	const sbApi = getStoryblokApi();

	try {
		/**
		 * We fetch the same story that the page itself will render.
		 * That gives us access to:
		 * - story.name (Storyblok story name)
		 * - story.content (where SEO fields could live)
		 *
		 * NOTE: This is a second request unless your fetching strategy dedupes.
		 * For a POC: totally fine.
		 * For a larger site: you might centralize fetching in a cached helper.
		 */
		const { data } = await sbApi.get(`cdn/stories/${slug}`, { version });

		const story = data?.story;

		/**
		 * Minimal metadata strategy (POC-friendly):
		 * - Use Storyblok story name for the page title
		 * - Use a default description unless you add SEO fields later
		 *
		 * If you later add fields like `seo_title` or `seo_description`
		 * to your "page" content type, you can swap them in here.
		 */
		const baseSiteName = "Wedding Quartet";
		const title = story?.name
			? `${story.name} | ${baseSiteName}`
			: baseSiteName;

		// If you don't have an SEO field yet, keep a stable default:
		const description =
			story?.content?.seo_description ||
			"Elegant live music for wedding ceremonies and cocktail hours.";

		return {
			title,
			description,
			// You can add openGraph/twitter later if needed,
			// but keep POC minimal.
		};
	} catch {
		/**
		 * If Storyblok fails (missing story, network, etc),
		 * return safe metadata so Next can still render something.
		 */
		return {
			title: "Wedding Quartet",
			description:
				"Elegant live music for wedding ceremonies and cocktail hours.",
		};
	}
}

/**
 * ============================================================
 * Default export Page Component
 * ============================================================
 *
 * This is the actual route handler for all pages.
 * Next expects the default export of page.tsx to be a React component.
 * (You hit the error earlier when this wasn’t a component.)
 */
export default async function RoutePage({ params, searchParams }: PageProps) {
	const resolvedParams = await params; // ✅ unwrap Promise
	const slug = toStoryblokSlug(resolvedParams); // ✅ safe
	const version = getStoryblokVersion();
	const sbApi = getStoryblokApi();

	try {
		/**
		 * Fetch the Storyblok story for this slug.
		 *
		 * resolve_links: "url"
		 * - makes Storyblok Link fields easier to use in components
		 * - converts internal "story" links into URL-like values
		 */
		const { data } = await sbApi.get(`cdn/stories/${slug}`, {
			version,
			resolve_links: "url",
		});

		const story = data?.story;

		/**
		 * If Storyblok returns nothing usable, show a Next 404 page.
		 * This keeps "missing story" behavior consistent with standard Next routing.
		 */
		if (!story?.content) notFound();

		// TEMP: force client preview path for all draft mode
		if (version === "draft") {
			return <PreviewStory story={story} />;
		}

		/**
		 * Core CMS rendering moment:
		 *
		 * story.content is a "blok" object whose `component` field is the root component.
		 * Example:
		 *   story.content.component === "page"
		 *
		 * StoryblokServerComponent:
		 * - Looks up the matching React component from your registry
		 *   (the registry is configured in storyblokInit in app/layout.tsx)
		 * - Renders that component (server-side)
		 * - That component can render nested blocks (body, section.blocks, etc)
		 */
		return (
			<>
				{version === "draft" && <StoryblokPreview storyId={story.id} />}
				<StoryblokServerComponent blok={story.content} />
			</>
		);
	} catch {
		/**
		 * Most common reason: story not found in selected version (draft vs published),
		 * or slug doesn't exist.
		 *
		 * Treat as 404 for a marketing site POC.
		 */
		notFound();
	}
}
