import { notfound } from "next/navigation";
import { StoryblokComponent } from "@storyblok/react";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { StoryblokServerComponent } from "@storyblok/react/rsc";


type PageProps = { params: { slug?: string[] } };

export default async function RoutePage({ params }: PageProps) {
	const slug = params.slug?.join("/") || "home";
	const storyblokApi = getStoryblokApi();

    const version = process.env.VERSION || "published";

	const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
		version: version as any,
	});

	const story = data?.story;

	console.log(story.content.body.map((b: any) => b.component));

	if (!story?.content) {
		notfound();
	}

	return <StoryblokServerComponent blok={story.content} />;

}
