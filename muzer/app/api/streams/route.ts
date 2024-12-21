import prismaClient from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {string, z} from "zod";
const CreateStreamSchema=z.object({
    creatorId:string(),
    url:z.string().url().refine(
      (url) => url.includes("youtube") || url.includes("spotify"),
      {
        message: "The URL must be from YouTube or Spotify.",
      }
    )
})


export async function POST(req:NextRequest){
    try {
        const data= CreateStreamSchema.parse(await req.json());
        prismaClient.stream.create({
            userId:data.creatorId,
        })
    } catch (e) {
        return NextResponse.json({
            message:"error while adding a stream"
        },{
            status:411
        })
    }
}