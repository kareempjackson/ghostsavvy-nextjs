"use client";

import Link from "next/link";

export default function NotFound() {
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: colors.black,
        fontFamily: "var(--font-aloevera), sans-serif",
        color: colors.white,
        padding: "0 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          fontWeight: 500,
        }}
      >
        404 - Studio Page Not Found
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "30px",
          maxWidth: "600px",
          color: colors.white + "cc", // Adding transparency
        }}
      >
        The Sanity Studio page you&apos;re looking for doesn&apos;t exist or may
        have been moved.
      </p>
      <Link
        href='/studio'
        style={{
          backgroundColor: colors.forest,
          color: colors.white,
          padding: "14px 28px",
          borderRadius: "4px",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "1rem",
          letterSpacing: "0.5px",
          transition: "all 0.2s ease-in-out",
          border: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = colors.sage;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = colors.forest;
        }}
      >
        Return to Studio Home
      </Link>
    </div>
  );
}
