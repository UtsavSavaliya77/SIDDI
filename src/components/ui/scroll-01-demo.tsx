import { Scroll01 } from "@/components/ui/scroll-01";

const values = {
  items: [
    {
      title: "Build faster",
      description: "Create interfaces quickly using reusable blocks.",
      media:
        "https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Customize easily",
      description: "Adapt everything to your design system.",
      media:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Stay consistent",
      description: "Keep layouts balanced with a clear visual rhythm.",
      media:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Guide attention",
      description: "Highlight the right content without adding noise.",
      media:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Scale calmly",
      description: "Expand your pages with patterns that stay elegant.",
      media:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
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
