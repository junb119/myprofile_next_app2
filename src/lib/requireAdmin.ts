import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== "emfowkd@gmail.com") {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { authorized: true, session };
}
