"use client";

import { useEffect } from "react";
import { useStoryblokBridge } from "@storyblok/react";
import "../lib/storyblokClientInit";

/**
 * This component activates Storyblok's Visual Editor live preview.
 *
 * It:
 * - Listens for changes in the Storyblok editor
 * - Reloads the page content when content is updated
 *
 * This is ONLY needed for draft/preview mode.
 */
export default function StoryblokPreview({ storyId }: { storyId: number }) {
  useEffect(() => {
    useStoryblokBridge(storyId, () => {
      location.reload();
    });
  }, [storyId]);

  return null;
}
