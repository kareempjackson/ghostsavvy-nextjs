import { buildLegacyTheme } from "sanity";

// Ghost Savvy Brand Colors from tailwind config
const ghostSavvyColors = {
  forest: "#1A3C34",
  sage: "#739E82",
  black: "#141414",
  white: "#FAFAFA",
  ivory: "#F5F3EF",
  purple: "#5c46fd", // Original accent color used
};

// Color props for Sanity theme
const props = {
  "--black": ghostSavvyColors.black,
  "--white": ghostSavvyColors.white,
  "--gray": "#666",
  "--gray-base": "#666",

  "--component-bg": ghostSavvyColors.black,
  "--component-text-color": ghostSavvyColors.white,

  "--brand-primary": ghostSavvyColors.forest, // Main brand color
  "--accent-color": ghostSavvyColors.sage, // Secondary color

  // UI colors
  "--focus-color": ghostSavvyColors.sage,
  "--intent-success-color": "#0f9d58", // Green
  "--intent-warning-color": "#ffbd28", // Yellow
  "--intent-danger-color": "#db4437", // Red
};

export const myTheme = buildLegacyTheme({
  // Base theme colors
  "--black": props["--black"],
  "--white": props["--white"],
  "--gray": props["--gray"],
  "--gray-base": props["--gray-base"],

  // Dark theme background and text
  "--component-bg": props["--component-bg"],
  "--component-text-color": props["--component-text-color"],

  // Brand colors
  "--brand-primary": props["--brand-primary"],

  // Default button colors
  "--default-button-color": props["--gray"],
  "--default-button-primary-color": ghostSavvyColors.sage,
  "--default-button-success-color": props["--intent-success-color"],
  "--default-button-warning-color": props["--intent-warning-color"],
  "--default-button-danger-color": props["--intent-danger-color"],

  // State colors
  "--state-info-color": ghostSavvyColors.sage,
  "--state-success-color": props["--intent-success-color"],
  "--state-warning-color": props["--intent-warning-color"],
  "--state-danger-color": props["--intent-danger-color"],

  // Navigation colors - for dark theme
  "--main-navigation-color": ghostSavvyColors.black,
  "--main-navigation-color--inverted": ghostSavvyColors.white,

  "--focus-color": props["--focus-color"],
});
