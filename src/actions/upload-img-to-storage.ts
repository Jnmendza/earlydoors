import sharp from "sharp";
import { createAdminClient } from "@/utils/supabase/admin";

export type IMAGE_TYPE = "clubs" | "venues" | "groups";

type UploadImageProps = {
  file: File | Buffer;
  folder?: string;
  originalName?: string;
  bucket?: string;
  compressOptions?: {
    quality?: number;
    format?: "webp" | "jpeg" | "png";
    width?: number;
  };
};

export const uploadImageToStorage = async ({
  file,
  folder,
  originalName,
  bucket = "ed-public",
  compressOptions = { quality: 80 },
}: UploadImageProps) => {
  try {
    // Convert File to Buffer
    const buffer =
      file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;

    if (!buffer || buffer.length === 0) {
      throw new Error("Invalid image file");
    }

    // Determine output format
    const format = compressOptions.format || "jpeg";

    // Process image
    const processedBuffer = await sharp(buffer)
      .resize(compressOptions.width)
      .toFormat(format, {
        quality: compressOptions.quality,
        mozjpeg: true,
        progressive: true,
      })
      .toBuffer();

    // Sanitize filename (remove special characters)
    const sanitizedName = originalName
      ? originalName.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase()
      : "image";

    // Generate filename (use sanitized original name + timestamp)
    const timestamp = Date.now();
    const fileName = `${
      folder ? `${folder}/` : ""
    }${sanitizedName}_${timestamp}.${format}`;

    // Upload to Supabase
    const supabase = createAdminClient();
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, processedBuffer, {
        contentType: `image/${format}`,
        upsert: false,
        cacheControl: "3600",
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return {
      success: true,
      path: fileName,
      url: publicUrl,
    };
  } catch (error) {
    console.error("Upload failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
};
