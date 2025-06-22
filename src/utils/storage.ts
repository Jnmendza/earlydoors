import { createAdminClient } from "./supabase/admin";

interface LatLng {
  lat: number;
  lng: number;
}
export function extractLatLng(url: string): LatLng | null {
  const preciseMatch = url.match(/!3d([\d.-]+)!4d([\d.-]+)/);
  if (preciseMatch) {
    return {
      lat: parseFloat(preciseMatch[1]),
      lng: parseFloat(preciseMatch[2]),
    };
  }

  const approxMatch = url.match(/@([\d.-]+),([\d.-]+)/);
  if (approxMatch) {
    return {
      lat: parseFloat(approxMatch[1]),
      lng: parseFloat(approxMatch[2]),
    };
  }

  return null;
}

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });

  return file;
}

export const imageCleanUp = async (imageUrl: string) => {
  try {
    const supabase = createAdminClient();

    // Extract the path after 'ed-public/'
    const url = new URL(imageUrl);
    const pathname = url.pathname;

    // The path should look like: /storage/v1/object/public/ed-public/venues/filename.jpg
    const pathPrefix = "/storage/v1/object/public/ed-public/";
    if (!pathname.startsWith(pathPrefix)) {
      return {
        success: false,
        error: "Invalid image URL format",
      };
    }

    // Get the full path including 'venues/' folder
    const fullPath = pathname.slice(pathPrefix.length);

    const { error } = await supabase.storage
      .from("ed-public")
      .remove([fullPath]);

    return {
      success: !error,
      error: error?.message,
    };
  } catch (error) {
    console.error("Delete failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
};
