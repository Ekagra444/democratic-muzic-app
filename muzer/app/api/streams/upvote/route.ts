import prismaClient from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
    streamId: z.string(),
});

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session || !session.user?.id) {
        return NextResponse.json(
            { message: "Unauthenticated" },
            { status: 403 }
        );
    }

    try {
        const data = UpvoteSchema.parse(await req.json());
        await prismaClient.upvote.create({
            data: {
                userId: session.user.id,
                streamID: data.streamId,
            },
        });

        return NextResponse.json({ message: "Upvoted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error while upvoting" },
            { status: 500 }
        );
    }
}