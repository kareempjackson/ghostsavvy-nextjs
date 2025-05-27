"use client";

import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "cards", label: "Cards" },
  { id: "alerts", label: "Alerts" },
  { id: "badges", label: "Badges" },
  { id: "motion", label: "Motion" },
];

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className='bg-brand-ivory rounded-md p-4 text-sm overflow-x-auto mb-4 border border-brand-lime/40'>
      <code>{children}</code>
    </pre>
  );
}

function SectionContent({ section }: { section: string }) {
  switch (section) {
    case "overview":
      return (
        <div>
          <h1 className='text-3xl font-bold text-brand-deep mb-4'>
            Ghost Savvy Brand Guide & UI Kit
          </h1>
          <p className='text-lg text-brand-deep/80 mb-6 max-w-2xl'>
            This guide provides the foundational design system for Ghost Savvy
            Studios. Use these components, colors, and patterns to ensure a
            consistent, premium experience across all digital products.
          </p>
          <ul className='list-disc pl-6 text-brand-deep/70 space-y-1'>
            <li>Brand colors and usage</li>
            <li>Typography scale and font usage</li>
            <li>Spacing, grid, and layout</li>
            <li>Reusable UI components</li>
            <li>Motion and interaction patterns</li>
          </ul>
        </div>
      );
    case "colors":
      return (
        <div>
          <h2 className='text-2xl font-bold text-brand-deep mb-4'>
            Brand Colors
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8'>
            {[
              { name: "Deep", var: "brand-deep", hex: "#233531" },
              { name: "Indigo", var: "brand-indigo", hex: "#3F4697" },
              { name: "Lime", var: "brand-lime", hex: "#CFF39E" },
              { name: "Ivory", var: "brand-ivory", hex: "#F4EBE0" },
            ].map((c) => (
              <div key={c.var} className='flex flex-col items-center'>
                <div
                  className={`w-16 h-16 rounded-lg mb-2 border border-brand-ivory shadow-sm`}
                  style={{ background: c.hex }}
                />
                <div className='font-semibold text-brand-deep'>{c.name}</div>
                <div className='text-xs text-brand-indigo'>.{c.var}</div>
                <div className='text-xs text-brand-deep/60'>{c.hex}</div>
              </div>
            ))}
          </div>
          <CodeBlock>{`// tailwind.config.js
colors: {
  brand: {
    deep: "#233531",      // Deep Green/Charcoal
    indigo: "#3F4697",   // Indigo/Blue
    lime: "#CFF39E",     // Lime/Sage
    ivory: "#F4EBE0",    // Ivory/Light
    black: "#141414",
    white: "#FAFAFA",
  },
}`}</CodeBlock>
        </div>
      );
    case "typography":
      return (
        <div>
          <h2 className='text-2xl font-bold text-brand-deep mb-4'>
            Typography
          </h2>
          <div className='space-y-2 mb-8'>
            <h1 className='text-5xl font-bold text-brand-deep'>Heading 1</h1>
            <h2 className='text-4xl font-bold text-brand-deep'>Heading 2</h2>
            <h3 className='text-3xl font-semibold text-brand-deep'>
              Heading 3
            </h3>
            <h4 className='text-2xl font-semibold text-brand-deep'>
              Heading 4
            </h4>
            <h5 className='text-xl font-medium text-brand-deep'>Heading 5</h5>
            <h6 className='text-lg font-medium text-brand-deep'>Heading 6</h6>
            <p className='text-base text-brand-deep/90'>
              Body text example. Use for paragraphs and general content.
            </p>
            <p className='text-sm text-brand-deep/60'>
              Caption or small text example.
            </p>
            <a href='#' className='text-brand-indigo underline'>
              Link example
            </a>
          </div>
          <CodeBlock>{`<h1 className="text-5xl font-bold text-brand-deep">Heading 1</h1>
<p className="text-base text-brand-deep">Body text</p>
<a className="text-brand-indigo underline">Link</a>`}</CodeBlock>
        </div>
      );
    case "spacing":
      return (
        <div>
          <h2 className='text-2xl font-bold text-brand-deep mb-4'>
            Spacing & Grid
          </h2>
          <div className='flex flex-wrap gap-4 mb-8'>
            {[4, 8, 16, 24, 32, 40, 64].map((s) => (
              <div key={s} className='flex flex-col items-center'>
                <div
                  className='bg-brand-lime rounded w-8'
                  style={{ height: s }}
                />
                <div className='text-xs text-brand-deep mt-1'>{s}px</div>
              </div>
            ))}
          </div>
          <div className='mb-8'>
            <div className='grid grid-cols-4 gap-4'>
              <div className='bg-brand-indigo/10 h-12 rounded flex items-center justify-center'>
                1
              </div>
              <div className='bg-brand-indigo/10 h-12 rounded flex items-center justify-center'>
                2
              </div>
              <div className='bg-brand-indigo/10 h-12 rounded flex items-center justify-center'>
                3
              </div>
              <div className='bg-brand-indigo/10 h-12 rounded flex items-center justify-center'>
                4
              </div>
            </div>
          </div>
          <CodeBlock>{`<div className="mb-8">Margin bottom 2rem (32px)</div>
<div className="grid grid-cols-4 gap-4">...</div>`}</CodeBlock>
        </div>
      );
    case "buttons":
      return (
        <div>
          <h2 className='text-2xl font-bold text-brand-deep mb-4'>Buttons</h2>
          <div className='flex flex-wrap gap-4 mb-8'>
            <button className='px-6 py-2 bg-brand-indigo text-brand-ivory rounded font-semibold shadow hover:bg-brand-indigo/90'>
              Primary
            </button>
            <button className='px-6 py-2 bg-brand-deep text-brand-ivory rounded font-semibold shadow hover:bg-brand-deep/90'>
              Secondary
            </button>
            <button className='px-6 py-2 border border-brand-indigo text-brand-indigo rounded font-semibold hover:bg-brand-indigo/10'>
              Ghost
            </button>
            <button
              className='px-6 py-2 bg-brand-indigo text-brand-ivory rounded font-semibold opacity-50 cursor-not-allowed'
              disabled
            >
              Disabled
            </button>
            <button className='px-6 py-2 bg-brand-indigo text-brand-ivory rounded font-semibold flex items-center gap-2'>
              <span className='animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-brand-ivory rounded-full'></span>
              Loading
            </button>
          </div>
          <CodeBlock>{`<button className="px-6 py-2 bg-brand-indigo text-brand-ivory rounded font-semibold">Primary</button>
<button className="px-6 py-2 bg-brand-deep text-brand-ivory rounded font-semibold">Secondary</button>
<button className="px-6 py-2 border border-brand-indigo text-brand-indigo rounded font-semibold">Ghost</button>`}</CodeBlock>
        </div>
      );
    case "inputs":
      return (
        <div>
          <h2 className='text-2xl font-bold text-brand-deep mb-4'>
            Inputs & Forms
          </h2>
          <div className='space-y-4 mb-8'>
            <input
              className='w-full px-4 py-2 border border-brand-indigo rounded focus:ring-2 focus:ring-brand-indigo outline-none bg-brand-ivory text-brand-deep'
              placeholder='Text input'
            />
            <select className='w-full px-4 py-2 border border-brand-indigo rounded focus:ring-2 focus:ring-brand-indigo outline-none bg-brand-ivory text-brand-deep'>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <label className='flex items-center gap-2'>
              <input type='checkbox' className='accent-brand-indigo' /> Checkbox
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='radio'
                className='accent-brand-indigo'
              />{" "}
              Radio
            </label>
            <input type='range' className='accent-brand-indigo w-full' />
          </div>
          <CodeBlock>{`<input className="px-4 py-2 border border-brand-indigo rounded bg-brand-ivory text-brand-deep" placeholder="Text input" />
<select className="px-4 py-2 border border-brand-indigo rounded bg-brand-ivory text-brand-deep">
  <option>Option 1</option>
</select>
<input type="checkbox" className="accent-brand-indigo" />`}</CodeBlock>
        </div>
      );
    case "cards":
      return (
        <div>
          <h2 className='text-2xl font-bold text-brand-deep mb-4'>
            Cards & Surfaces
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
            <div className='bg-brand-ivory rounded-xl shadow p-6 border border-brand-lime/40'>
              <h3 className='font-bold text-brand-deep mb-2'>Card Title</h3>
              <p className='text-brand-deep/80 mb-4'>
                This is a card. Use for content blocks, tool previews, etc.
              </p>
              <button className='px-4 py-2 bg-brand-indigo text-brand-ivory rounded font-semibold'>
                Action
              </button>
            </div>
            <div className='bg-brand-lime/20 rounded-xl shadow p-6 border border-brand-lime/40'>
              <h3 className='font-bold text-brand-deep mb-2'>
                Surface Example
              </h3>
              <p className='text-brand-deep/80'>
                Use surfaces for modals, popovers, and overlays.
              </p>
            </div>
          </div>
          <CodeBlock>{`<div className="bg-brand-ivory rounded-xl shadow p-6 border border-brand-lime/40">...</div>`}</CodeBlock>
        </div>
      );
    case "alerts":
      return (
        <div>
          <h2 className='text-2xl font-bold text-brand-deep mb-4'>Alerts</h2>
          <div className='space-y-4 mb-8'>
            <div className='p-4 rounded bg-brand-indigo/10 text-brand-indigo border-l-4 border-brand-indigo font-medium'>
              Info: This is an info alert.
            </div>
            <div className='p-4 rounded bg-brand-lime/30 text-brand-deep border-l-4 border-brand-lime font-medium'>
              Success: This is a success alert.
            </div>
            <div className='p-4 rounded bg-yellow-100 text-yellow-900 border-l-4 border-yellow-400 font-medium'>
              Warning: This is a warning alert.
            </div>
            <div className='p-4 rounded bg-red-100 text-red-900 border-l-4 border-red-400 font-medium'>
              Error: This is an error alert.
            </div>
          </div>
          <CodeBlock>{`<div className="p-4 rounded bg-brand-indigo/10 text-brand-indigo border-l-4 border-brand-indigo">Info</div>
<div className="p-4 rounded bg-brand-lime/30 text-brand-deep border-l-4 border-brand-lime">Success</div>`}</CodeBlock>
        </div>
      );
    case "badges":
      return (
        <div>
          <h2 className='text-2xl font-bold text-brand-deep mb-4'>Badges</h2>
          <div className='flex flex-wrap gap-3 mb-8'>
            <span className='px-3 py-1 rounded-full bg-brand-indigo text-brand-ivory text-xs font-semibold'>
              Primary
            </span>
            <span className='px-3 py-1 rounded-full bg-brand-lime text-brand-deep text-xs font-semibold'>
              Success
            </span>
            <span className='px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 text-xs font-semibold'>
              Warning
            </span>
            <span className='px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-semibold'>
              Error
            </span>
            <span className='px-3 py-1 rounded-full bg-brand-deep text-brand-ivory text-xs font-semibold'>
              Dark
            </span>
          </div>
          <CodeBlock>{`<span className="px-3 py-1 rounded-full bg-brand-indigo text-brand-ivory text-xs font-semibold">Primary</span>`}</CodeBlock>
        </div>
      );
    case "motion":
      return (
        <div>
          <h2 className='text-2xl font-bold text-brand-deep mb-4'>
            Motion & Animation
          </h2>
          <div className='flex flex-wrap gap-6 mb-8'>
            <div className='w-32 h-16 bg-brand-indigo/10 rounded flex items-center justify-center'>
              <div className='w-8 h-8 bg-brand-indigo rounded-full animate-bounce' />
            </div>
            <div className='w-32 h-16 bg-brand-indigo/10 rounded flex items-center justify-center'>
              <div className='w-8 h-8 bg-brand-indigo rounded-full animate-spin' />
            </div>
            <div className='w-32 h-16 bg-brand-indigo/10 rounded flex items-center justify-center'>
              <div className='w-8 h-8 bg-brand-indigo rounded-full animate-pulse' />
            </div>
          </div>
          <CodeBlock>{`<div className="animate-bounce" />
<div className="animate-spin" />
<div className="animate-pulse" />`}</CodeBlock>
          <p className='text-brand-deep/70 text-sm'>
            For advanced motion, use{" "}
            <span className='font-mono'>framer-motion</span> and see the
            codebase for animation patterns.
          </p>
        </div>
      );
    default:
      return (
        <div className='text-brand-deep/50 italic'>Section coming soon...</div>
      );
  }
}

export default function ComponentsGuidePage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className='min-h-screen flex bg-brand-ivory'>
      {/* Sidebar */}
      <aside className='w-64 bg-brand-ivory text-brand-deep flex-shrink-0 flex flex-col py-10 px-6 border-r border-brand-lime/40'>
        <div className='mb-10'>
          <span className='text-xl font-bold tracking-tight text-brand-indigo'>
            GS UI Kit
          </span>
        </div>
        <nav className='flex flex-col gap-2'>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`text-left px-3 py-2 rounded-md transition-all font-medium ${
                activeSection === s.id
                  ? "bg-brand-indigo text-brand-ivory shadow"
                  : "hover:bg-brand-lime/30 hover:text-brand-indigo"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className='flex-1 px-8 py-12 max-w-4xl mx-auto'>
        <SectionContent section={activeSection} />
      </main>
    </div>
  );
}
