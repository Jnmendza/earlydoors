import { NextResponse } from "next/server";
import { uploadImageToStorage } from "@/actions/upload-img-to-storage";
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Get original filename and extension
    const originalName = file.name.split(".").slice(0, -1).join(".");
    const originalExtension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";
    const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif"];

    if (!allowedExtensions.includes(originalExtension)) {
      return NextResponse.json(
        { error: "Unsupported file format" },
        { status: 400 }
      );
    }

    // Process and upload image
    const result = await uploadImageToStorage({
      file,
      folder: folder || undefined, // Pass undefined if no folder specified
      originalName, // Pass the original filename
      compressOptions: {
        quality: 80,
        format: originalExtension as "webp" | "jpeg" | "png",
        width: 1200,
      },
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      url: result.url,
      path: result.path,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
