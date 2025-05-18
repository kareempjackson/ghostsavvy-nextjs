"use client";

import { useState, useEffect } from "react";

// Define a more specific type for the StudioComponent
type StudioComponentType = React.ComponentType<Record<string, unknown>>;

export default function Studio() {
  const [StudioComponent, setStudioComponent] =
    useState<StudioComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudio = async () => {
      try {
        // Dynamically import Sanity components
        const { NextStudio } = await import("next-sanity/studio");
        const config = await import("../../sanity.config");

        // Create a wrapped component with the imported modules
        const WrappedStudio: StudioComponentType = () => (
          <NextStudio config={config.default} />
        );
        setStudioComponent(() => WrappedStudio);
      } catch (err) {
        console.error("Failed to load Sanity Studio:", err);
        setError(
          "Failed to load Sanity Studio. Please check console for details."
        );
      }
    };

    loadStudio();
  }, []);

  if (error) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center p-5 text-center'>
        <h1 className='text-xl font-semibold text-red-500 mb-4'>
          Studio Error
        </h1>
        <p className='text-gray-700'>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 bg-brand-sage text-brand-forest rounded-md'
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!StudioComponent) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-sage'></div>
        <p className='mt-4 text-gray-600'>Loading Studio...</p>
      </div>
    );
  }

  return <StudioComponent />;
}
