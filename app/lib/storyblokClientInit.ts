import { storyblokInit, apiPlugin } from "@storyblok/react";
import Page from "../components/storyblok/Page";
import Hero from "../components/storyblok/Hero";
import Section from "../components/storyblok/Section";
import FAQSection from "../components/storyblok/FAQSection";
import FAQItem from "../components/storyblok/FAQItem";
import TestimonialSection from "../components/TestimonialSection";
import Testimonial from "../components/Testimonial";


// IMPORTANT: token must be public for client preview
const accessToken = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
console.log("Initializing Storyblok with token:", accessToken);

storyblokInit({
  accessToken,
  use: [apiPlugin],
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
