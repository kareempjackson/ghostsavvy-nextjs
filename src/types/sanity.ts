export interface CaseStudy {
  projectTitle: string;
  projectSubtitle: string;
  slug: {
    current: string;
  };
  projectLogo: {
    asset: {
      _ref: string;
    };
  };
  themeFonts: {
    titleFont: string;
    bodyFont: string;
    accentFont: string;
  };
  themeColors: {
    primaryBackground: string;
    secondaryBackground: string;
    textColor: string;
    accentColor: string;
    footerBackground: string;
    footerTextColor: string;
  };
  heroImageOrVideo: {
    asset: {
      _ref: string;
    };
  };
  heroHeading: string;
  heroSubheading: string;
  storyChapters: Array<{
    chapterTitle: string;
    introText: string;
    visuals: Array<{
      imageOrVideo: {
        asset: {
          _ref: string;
        };
      };
      caption?: string;
    }>;
    optionalTestimonial?: {
      quote: string;
      name: string;
    };
  }>;
  finalClosingQuote: string;
  finalVisualImage: {
    asset: {
      _ref: string;
    };
  };
  ctaHeading: string;
  ctaSubheading: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

declare module "@/types/sanity" {
  export interface CaseStudy {
    projectTitle: string;
    projectSubtitle: string;
    slug: {
      current: string;
    };
    projectLogo: {
      asset: {
        _ref: string;
      };
    };
    themeFonts: {
      titleFont: string;
      bodyFont: string;
      accentFont: string;
    };
    themeColors: {
      primaryBackground: string;
      secondaryBackground: string;
      textColor: string;
      accentColor: string;
      footerBackground: string;
      footerTextColor: string;
    };
    heroImageOrVideo: {
      asset: {
        _ref: string;
      };
    };
    heroHeading: string;
    heroSubheading: string;
    storyChapters: Array<{
      chapterTitle: string;
      introText: string;
      visuals: Array<{
        imageOrVideo: {
          asset: {
            _ref: string;
          };
        };
        caption?: string;
      }>;
      optionalTestimonial?: {
        quote: string;
        name: string;
      };
    }>;
    finalClosingQuote: string;
    finalVisualImage: {
      asset: {
        _ref: string;
      };
    };
    ctaHeading: string;
    ctaSubheading: string;
    ctaButtonText: string;
    ctaButtonUrl: string;
  }
}
