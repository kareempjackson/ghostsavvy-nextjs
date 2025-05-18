export const metadata = {
  title: "Sanity Studio",
  description: "Content management system for GhostSavvy",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ghost Savvy brand colors
  const colors = {
    black: "#141414",
    forest: "#1A3C34",
    sage: "#739E82",
    white: "#FAFAFA",
  };

  return (
    <div
      className='sanity-studio-container'
      data-sanity-route='true'
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: colors.black,
        color: colors.white,
        overflow: "auto",
        padding: "0",
        fontFamily: "var(--font-aloevera), sans-serif",
      }}
    >
      {/* Brand bar at the top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(to right, ${colors.forest}, ${colors.sage})`,
          zIndex: 101,
        }}
      />

      {children}
    </div>
  );
}
