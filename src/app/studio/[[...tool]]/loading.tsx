"use client";

export default function Loading() {
  // Ghost Savvy brand colors
  const colors = {
    black: "#141414",
    forest: "#1A3C34",
    sage: "#739E82",
    white: "#FAFAFA",
    ivory: "#F5F3EF",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: colors.black,
        fontFamily: "var(--font-aloevera), sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        {/* Brand logo or loading spinner */}
        <div
          style={{
            display: "inline-block",
            width: "60px",
            height: "60px",
            border: `3px solid ${colors.forest}40`, // Using hex alpha for transparency
            borderRadius: "50%",
            borderTopColor: colors.sage,
            borderRightColor: colors.sage,
          }}
          className='loading-spinner'
        ></div>

        <h2
          style={{
            fontFamily: "var(--font-aloevera), sans-serif",
            color: colors.white,
            marginTop: "20px",
            fontWeight: 500,
            letterSpacing: "0.5px",
          }}
        >
          Loading Ghost Savvy Studio...
        </h2>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .loading-spinner {
          animation: spin 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
