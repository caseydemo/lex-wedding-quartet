import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";
import Blocks from "../Blocks";

type PageBlok = SbBlokData & {
  body?: SbBlokData[];
};

export default function Page({ blok }: { blok: PageBlok }) {
  return (
    <main {...storyblokEditable(blok)} style={{ display: "grid", gap: 32 }}>
      <Blocks blocks={blok.body} />
    </main>
  );
}
