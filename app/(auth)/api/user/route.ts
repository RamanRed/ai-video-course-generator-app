import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  //if user already exists in DB
  const users = await db
    .select()
    .from(usersTable)
    .where(
      eq(usersTable.email, user?.primaryEmailAddress?.emailAddress as string)
    );

  //if not then create new user in DB
  if (users?.length == 0) {
    const newUser = await db
      .insert(usersTable)
      .values({
        email: user?.primaryEmailAddress?.emailAddress as string,
        name: user?.fullName as string,
      })
      .returning();

    return NextResponse.json(newUser[0]);
  }
  return NextResponse.json(users[0]);
}
