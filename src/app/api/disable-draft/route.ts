import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// This route handler disables draft mode
export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  // Get the path from the query string if provided
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/savvy-lab";

  redirect(path);
}
