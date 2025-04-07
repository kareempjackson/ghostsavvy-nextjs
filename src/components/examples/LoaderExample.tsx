"use client";

import { useState, useEffect } from "react";
import { GhostLoader } from "@/components/ui";

export default function LoaderExample() {
  const [loading, setLoading] = useState(true);

  // Simulate a page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Show loader for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Loader with prop control */}
      <GhostLoader
        isLoading={loading}
        onLoadingComplete={() => console.log("Loading complete!")}
      />

      <div className='container mx-auto px-4 py-24'>
        <h1 className='text-4xl font-display font-medium mb-8'>
          Loader Example
        </h1>
        <p className='mb-6'>The Ghost Savvy loader demonstration.</p>

        {/* Button to show loader again */}
        <button
          onClick={() => setLoading(true)}
          className='px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'
        >
          Show Loader Again
        </button>

        <div className='mt-12 bg-white rounded-lg p-8 shadow-sm'>
          <h2 className='text-2xl font-display mb-4'>Usage Instructions</h2>
          <div className='prose'>
            <p>The GhostLoader component can be used in two ways:</p>

            <h3 className='text-xl mt-6 mb-3'>
              1. Automatic Timing (Page Transitions)
            </h3>
            <pre className='bg-gray-100 p-4 rounded-md overflow-x-auto'>
              {"<GhostLoader />"}
            </pre>
            <p>
              When used without props, it will display for a minimum duration
              and then fade out automatically.
            </p>

            <h3 className='text-xl mt-6 mb-3'>
              2. Controlled Mode (API Loading States)
            </h3>
            <pre className='bg-gray-100 p-4 rounded-md overflow-x-auto'>
              {
                '<GhostLoader\n  isLoading={isDataLoading}\n  onLoadingComplete={() => console.log("Done!")}\n/>'
              }
            </pre>
            <p>
              When provided with an isLoading prop, you control when the loader
              disappears.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
