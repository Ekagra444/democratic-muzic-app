import prismaClient from "@/app/lib/db";
import { StreamType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {string, z} from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api"

//regex work 
// const YT_REGEX = new RegExp("/^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/");
// const YT_REGEX = new RegExp("^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$");
const YT_REGEX = /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/;
const SPOTIFY_REGEX = /^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+$/;


//zod veryfication for stream add request made by the user 
const CreateStreamSchema=z.object({
    creatorId:string(),
    url:z.string().url().refine(
      (url) => url.includes("youtube") || url.includes("spotify"),
      {
        message: "The URL must be from YouTube or Spotify.",
      }
    )
})

//endpoint for adding the stream 
export async function POST(req:NextRequest){
    try {
       
        const data = CreateStreamSchema.parse(await req.json());

        //testing whether url is of the format expected 
        //supported stream's source is youtube and spotify (might add others in future😑)
        const isYt = YT_REGEX.test(data.url);
        const isSpotify = SPOTIFY_REGEX.test(data.url);
        
        //early return 
        if (!isYt && !isSpotify) {
            return NextResponse.json({
                message: "Invalid URL. Only YouTube or Spotify URLs are allowed.",
            }, {
                status: 411,
            });
        }
        
        //extracting required data to be pushed into db
        let extractedId: string | null = null;
        let type: StreamType|null= null;
    
        if (isYt) {
            extractedId = data.url.split("?v=")[1];
            type = StreamType.Youtube;
            
            //extracting yt video information
            const res= await youtubesearchapi.GetVideoDetails(extractedId);
            //extracting thumbnail of video 
            const thumbnails=res.thumbnail.thumbnails||[];
            // console.log(res);
            //sorting 3,4,2=> 2,3,4         
/*            In the Array.sort() method:
 When you use the sort() function, the return value is used to determine the order of elements:

 -1 (negative number): Indicates that the first element (a) should come before the second element (b).
 1 (positive number): Indicates that the first element (a) should come after the second element (b).
// 0: Indicates that a and b are equal in terms of the sorting criteria.   */
            thumbnails.sort((a:{width:number},b:{width:number})=>
                a.width<b.width?-1:1)
//            console.log(res.title);

            await prismaClient.stream.create({
                data: {
                    userId: data.creatorId,
                    url: data.url,
                    extractedId,
                    type,
                    title:res.title??"eee",
                    bigImage:thumbnails[thumbnails.length-1].url,
                    smallImage:thumbnails[thumbnails.length-2].url
                },
            });

            return NextResponse.json({
                message: "Stream added successfully!",
            }, {
                status: 201,
            });

            
        } else if (isSpotify) {
            extractedId = data.url.split("/track/")[1];
            type = StreamType.Spotify;
            await prismaClient.stream.create({
                data: {
                    userId: data.creatorId,
                    url: data.url,
                    extractedId,
                    type, // Now uses the enum
                },
            });
            //just success message for spotify 
            return NextResponse.json({
                message: "Stream added successfully!",
            }, {
                status: 201,
            });
        }
        
        //adding...
      
    
        // return NextResponse.json({
        //     message: "Stream added successfully!",
        // }, {
        //     status: 201,
        // });
    
    } catch (e) {
    
        return NextResponse.json({
            message: "Error while adding a stream.",
        
        }, {
            status: 500,
        });
    }
    
}

export async function GET(req:NextRequest) {
    const creatorId= req.nextUrl.searchParams.get("creatorId");
    const streams= await prismaClient.stream.findMany({
        where:{
            userId:creatorId??""
        }
    })
    return NextResponse.json({
        streams
    });
} 