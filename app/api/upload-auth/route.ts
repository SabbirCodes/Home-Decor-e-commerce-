import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

    if (!privateKey) {
      return Response.json(
        {
          error: "IMAGEKIT_PRIVATE_KEY is missing",
        },
        { status: 500 }
      );
    }

    if (!publicKey) {
      return Response.json(
        {
          error: "NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is missing",
        },
        { status: 500 }
      );
    }

    const { token, expire, signature } = getUploadAuthParams({
      privateKey,
      publicKey,
    });

    return Response.json({
      token,
      expire,
      signature,
      publicKey,
    });
  } catch (error) {
    console.error("ImageKit authentication error:", error);

    return Response.json(
      {
        error: "Failed to generate ImageKit authentication.",
      },
      { status: 500 }
    );
  }
}