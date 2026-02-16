"use client";

/**
 * This component runs in the browser (client component).
 *
 * Why we need it:
 * - The Storyblok “Bridge” (live preview updates while you type in the Visual Editor)
 *   only exists in the browser.
 * - Storyblok’s <StoryblokStory /> is built to keep story state reactive + render blocks.
 *
 * Docs:
 * - `StoryblokStory` maintains story state and renders blocks dynamically. :contentReference[oaicite:0]{index=0}
 */
import { StoryblokStory } from "@storyblok/react/rsc";

export default function StoryblokStoryClient({ story }: { story: any }) {
  return <StoryblokStory story={story} />;
}
