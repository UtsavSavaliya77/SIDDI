import { Scroll01 } from "@/components/ui/scroll-01";

const values = {
  items: [
    {
      title: "Build faster",
      description: "Create interfaces quickly using reusable blocks.",
      media: "/brass-door-handle.jpg",
    },
    {
      title: "Customize easily",
      description: "Adapt everything to your design system.",
      media: "/bathroom-accessory-kit.jpg",
    },
    {
      title: "Stay consistent",
      description: "Keep layouts balanced with a clear visual rhythm.",
      media: "/Handles.jpg",
    },
    {
      title: "Guide attention",
      description: "Highlight the right content without adding noise.",
      media: "/Knobs.jpg",
    },
    {
      title: "Scale calmly",
      description: "Expand your pages with patterns that stay elegant.",
      media: "/bathroom-kit.jpg",
    },
  ],
};

export default function Scroll01Demo() {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="h-10" />
      <Scroll01 items={values.items} />
      <div className="h-32" />
    </div>
  );
}
