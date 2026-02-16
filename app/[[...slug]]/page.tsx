/**
 * Next.js ROUTE FILE (App Router)
 *
 * This file is responsible for:
 * 1) Taking a URL like /, /faq, /pricing, etc
 * 2) Turning that into a Storyblok "slug"
 * 3) Fetching the Storyblok story JSON
 * 4) Rendering the Storyblok root block via <StoryblokComponent />
 *
 * This is NOT your Storyblok "Page" component.
 * This is your Next route handler.
 */

import { StoryblokComponent } from "@storyblok/react";
import { getStoryblokApi } from "@storyblok/react/rsc";

// IMPORTANT: this import path assumes you have initStoryblok()
// called somewhere global (usually app/layout.tsx).
// If you haven't done that yet, we'll do it next.
import "../lib/storyblok"; // <-- if this annoys you, we can remove it next step

type PageProps = {
  params: { slug?: string[] };
};

export default async function RoutePage({ params }: PageProps) {
  /**
   * Next.js gives us `params.slug` as an array for catch-all routes.
   *
   * Examples:
   *  - /            => params.slug is undefined
   *  - /about       => ["about"]
   *  - /weddings/ny => ["weddings", "ny"]
   *
   * Storyblok wants a single string slug:
   *  - "home"
   *  - "about"
   *  - "weddings/ny"
   */
  const slug = params.slug?.join("/") || "home";

  /**
   * Storyblok "version":
   * - "draft" lets you see unpublished changes (needed for the Visual Editor)
   * - "published" is what real users should see
   *
   * For now (learning/dev) we’ll always fetch draft.
   * Later we’ll wire this to Next Draft Mode so it switches automatically.
   */
  const version = "draft";

  /**
   * getStoryblokApi() comes from the Storyblok RSC integration.
   * It gives you an API client (already configured by storyblokInit()).
   */
  const storyblokApi = getStoryblokApi();

  /**
   * Fetch one story by slug.
   * This returns an object like: { data: { story: {...} } }
   */
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version,
  });

  const story = data?.story;

  if (!story?.content) {
    // Basic guard: don't crash if the slug isn't found.
    return <div style={{ padding: 24 }}>Story not found: {slug}</div>;
  }

  /**
   * story.content is the ROOT block, typically { component: "Page", body: [...] }
   * StoryblokComponent will:
   *  - look at story.content.component ("Page")
   *  - find your registered React component for "Page"
   *  - render it, and any nested blocks inside it
   */
  return <StoryblokComponent blok={story.content} />;
}
