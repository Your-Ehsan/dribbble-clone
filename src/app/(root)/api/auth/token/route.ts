import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  const secret: string | undefined = process.env.NEXTAUTH_SECRET || "",
    token = await getToken({
      req: req,
      raw: true,
      secret: secret,
    });

  return NextResponse.json({ token }, { status: 200 });
};
export { GET };
