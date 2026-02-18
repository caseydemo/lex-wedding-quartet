import { StoryblokServerComponent, type SbBlokData } from "@storyblok/react/rsc";

export default function Blocks({ blocks }: { blocks?: SbBlokData[] }) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((blok) => (
        <StoryblokServerComponent key={blok._uid} blok={blok} />
      ))}
    </>
  );
}
