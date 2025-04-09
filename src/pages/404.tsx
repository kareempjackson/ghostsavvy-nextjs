import Link from "next/link";

export default function Custom404() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#111827] text-white px-4'>
      <h1 className='text-6xl font-bold mb-6'>404</h1>
      <h2 className='text-2xl font-medium mb-8'>Page Not Found</h2>
      <p className='text-lg text-white/70 mb-10 text-center max-w-lg'>
        We couldn&apos;t find the page you were looking for. The page might have
        been removed or the URL might be incorrect.
      </p>
      <Link
        href='/'
        className='px-8 py-4 bg-[#CFF39E] text-black font-medium hover:bg-[#CFF39E]/90 transition-all duration-300'
      >
        Back to Home
      </Link>
    </div>
  );
}
