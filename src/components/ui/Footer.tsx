import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className='bg-brand-black text-brand-white py-16'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
          {/* Brand Column */}
          <div className='col-span-1 md:col-span-1'>
            <Link href='/' className='inline-block mb-6'>
              <Image
                src='/logo-white.svg'
                alt='Ghost Savvy Studios'
                width={150}
                height={40}
                className='h-10 w-auto'
              />
            </Link>
            <p className='text-brand-white/70 text-sm leading-relaxed mb-6'>
              We build innovative products and provide development services that
              inspire and create impact.
            </p>
            <div className='flex space-x-4'>
              <a
                href='https://twitter.com/ghostsavvy'
                target='_blank'
                rel='noreferrer'
                className='text-brand-white/60 hover:text-brand-sage transition-colors'
                aria-label='Twitter'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                </svg>
              </a>
              <a
                href='https://github.com/ghostsavvy'
                target='_blank'
                rel='noreferrer'
                className='text-brand-white/60 hover:text-brand-sage transition-colors'
                aria-label='GitHub'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </a>
              <a
                href='https://linkedin.com/company/ghostsavvy'
                target='_blank'
                rel='noreferrer'
                className='text-brand-white/60 hover:text-brand-sage transition-colors'
                aria-label='LinkedIn'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className='text-lg font-medium mb-4 tracking-[-0.5px]'>
              Company
            </h3>
            <nav className='flex flex-col space-y-3'>
              <Link
                href='/about'
                className='text-brand-white/70 hover:text-brand-sage transition-colors'
              >
                About Us
              </Link>
              <Link
                href='/careers'
                className='text-brand-white/70 hover:text-brand-sage transition-colors'
              >
                Careers
              </Link>
              <Link
                href='/start-project'
                className='text-brand-white/70 hover:text-brand-sage transition-colors'
              >
                Start a Project
              </Link>
              <Link
                href='/contact'
                className='text-brand-white/70 hover:text-brand-sage transition-colors'
              >
                Contact
              </Link>
              <Link
                href='/blog'
                className='text-brand-white/70 hover:text-brand-sage transition-colors'
              >
                Blog
              </Link>
            </nav>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-4 tracking-[-0.5px]'>
              Products
            </h3>
            <nav className='flex flex-col space-y-3'>
              <Link
                href='/products#featured'
                className='text-brand-white/70 hover:text-brand-sage transition-colors'
              >
                Featured Products
              </Link>
              <Link
                href='/products#community'
                className='text-brand-white/70 hover:text-brand-sage transition-colors'
              >
                Community Tools
              </Link>
              <Link
                href='/products#enterprise'
                className='text-brand-white/70 hover:text-brand-sage transition-colors'
              >
                Enterprise Solutions
              </Link>
              <Link
                href='/products#upcoming'
                className='text-brand-white/70 hover:text-brand-sage transition-colors'
              >
                Coming Soon
              </Link>
            </nav>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className='text-lg font-medium mb-4 tracking-[-0.5px]'>
              Stay Updated
            </h3>
            <p className='text-brand-white/70 text-sm mb-4'>
              Subscribe to our newsletter for product updates and industry
              insights.
            </p>
            <form className='flex flex-col space-y-3'>
              <input
                type='email'
                placeholder='Your email address'
                className='px-4 py-2 bg-brand-white/10 rounded-[4px] text-brand-white border border-brand-white/20 focus:outline-none focus:border-brand-sage'
                required
              />
              <button
                type='submit'
                className='px-4 py-2 bg-brand-sage hover:bg-brand-sage/90 rounded-[4px] text-brand-white font-medium transition-colors w-full text-sm'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='mt-16 pt-8 border-t border-brand-white/10 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-brand-white/50 text-sm'>
            © {new Date().getFullYear()} Ghost Savvy Studios. All rights
            reserved.
          </p>
          <div className='mt-4 md:mt-0'>
            <nav className='flex space-x-6'>
              <Link
                href='/privacy'
                className='text-brand-white/50 text-sm hover:text-brand-sage transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-brand-white/50 text-sm hover:text-brand-sage transition-colors'
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
