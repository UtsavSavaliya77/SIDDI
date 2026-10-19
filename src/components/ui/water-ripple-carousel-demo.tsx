"use client"

import WaterRippleCarousel from "@/components/ui/water-ripple-carousel"

export default function DemoPhotos() {
  return (
    <WaterRippleCarousel
      slides={[
        { image: "/brass-door-handle.jpg", title: "Solid Forged Brass", caption: "Precision knurled solid brass lever." },
        { image: "/Handles.jpg", title: "Architectural Levers", caption: "Balanced return torque and silent throw." },
        { image: "/Knobs.jpg", title: "Precision Turn Knobs", caption: "CNC lathe turned solid billet knobs." },
        { image: "/bathroom-accessory-kit.jpg", title: "Sanitary Hardware", caption: "Moisture-sealed marine stainless kit." },
        { image: "/Brushed Gold Basin Faucet.jpg", title: "Basin Fittings", caption: "High-vacuum brushed gold finish." },
        { image: "/Matte Black Faucet.jpg", title: "Matte Black Series", caption: "Oleophobic carbon sputtered PVD." },
        { image: "/Flush Button.jpg", title: "Sanitary Actuators", caption: "Architectural flush dual-actuation." },
        { image: "/Handle.jpg", title: "Passage Hardware", caption: "Ergonomic throw with low-profile rose." },
      ]}
    />
  )
}
