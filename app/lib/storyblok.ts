/**
 * STORYBLOK INITIALIZATION FILE
 *
 * This file does ONE thing:
 * It connects Storyblok to our Next.js app
 * and registers our Storyblok components.
 *
 * Think of this as the "bridge" between
 * Storyblok CMS and our React components.
 */

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

/**
 * These are React components we will build.
 * Storyblok sends us JSON that contains a `component` name.
 * Example:
 *
 * {
 *   component: "Hero",
 *   headline: "Elegant Wedding Music"
 * }
 *
 * StoryblokComponent looks at "Hero"
 * and finds the matching React component below.
 *
 * So the names MUST match exactly
 * the component names inside Storyblok.
 */
import Page from "../components/storyblok/Page";
import Hero from "../components/storyblok/Hero";
import Section from "../components/storyblok/Section";
import FAQSection from "../components/storyblok/FAQSection";
import FAQItem from "../components/storyblok/FAQItem";
import TestimonialSection from "../components/TestimonialSection";
import Testimonial from "../components/Testimonial";

/**
 * This function initializes Storyblok.
 *
 * We call this ONCE in layout.tsx.
 *
 * Why only once?
 * Because Storyblok needs to set up its internal system.
 * If we call it multiple times, weird things happen.
 */
export function initStoryblok() {
	storyblokInit({
		/**
		 * accessToken:
		 * This comes from your .env.local file.
		 *
		 * Right now we're using the PREVIEW token.
		 * That allows us to see draft content.
		 */
		accessToken: process.env.STORYBLOK_TOKEN_PREVIEW,

		/**
		 * apiPlugin:
		 * This enables the Storyblok API client.
		 * Without this, we can't fetch stories.
		 */
		use: [apiPlugin],

		/**
		 * components:
		 *
		 * This is the IMPORTANT PART.
		 *
		 * We map Storyblok block names → React components.
		 *
		 * The key MUST match the block name inside Storyblok.
		 * The value is the React component file.
		 */
		components: {
			page: Page,
			hero: Hero,
			section: Section,
			faqsection: FAQSection,
			faqitem: FAQItem,
			testimonialsection: TestimonialSection,
			testimonial: Testimonial,
		},
	});
}
