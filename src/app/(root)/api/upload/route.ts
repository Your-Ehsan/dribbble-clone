import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const POST = async (request: Request) => {
  const { path } = await request.json();

  if (!path) {
    return NextResponse.json(
      { message: "Please provide a valid Image" },
      { status: 400 },
    );
  }
  try {
    return NextResponse.json(
      await cloudinary.uploader.upload(path, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        transformation: [{ width: 1000, height: 752, crop: "scale" }],
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export { POST };
