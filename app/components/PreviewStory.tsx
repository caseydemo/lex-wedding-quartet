"use client";

import "../lib/storyblokClientInit";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";

export default function PreviewStory({ story }: { story: any }) {
  const liveStory = useStoryblokState(story);
  return liveStory ? <StoryblokComponent blok={liveStory.content} /> : null;
}
