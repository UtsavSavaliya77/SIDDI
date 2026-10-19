"use client"

import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel"

export default function DemoPhotos() {
  return (
    <PolaroidLineCarousel
      slides={[
        { image: "/brass-door-handle.jpg", title: "Forged Brass Levers", caption: "Solid hot-forged brass with diamond knurl." },
        { image: "/Handles.jpg", title: "Architectural Levers", caption: "Dual high-tensile return springs." },
        { image: "/Knobs.jpg", title: "Precision Turn Knobs", caption: "Monolithic CNC lathe turned billets." },
        { image: "/bathroom-accessory-kit.jpg", title: "Sanitary Systems", caption: "Marine-grade stainless accessories." },
        { image: "/Brushed Gold Basin Faucet.jpg", title: "Basin Fittings", caption: "High-vacuum brushed gold finish." },
        { image: "/Matte Black Faucet.jpg", title: "Matte Black Series", caption: "Oleophobic carbon sputtered PVD." },
      ]}
    />
  )
}
