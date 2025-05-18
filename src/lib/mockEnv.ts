/**
 * Mock environment variables for Sanity
 * This allows existing code to still reference these values without errors
 */

export const apiVersion = "2025-04-01";
export const dataset = "production";
export const projectId = "mock-project-id";
export const token = "mock-token";

// Mock the assertValue function for compatibility
export function assertValue<T>(v: T): T {
  return v;
}
