
import { NextResponse } from "next/server";

export const arr = [
    {id: 1,
    title:"Pipo",
    completed: true,
},
{
    id: 2,
    title : "Ping",
    completed : false
}
]
export async function GET() {
  
    return NextResponse.json(arr);
}


export async function POST(request: Request) {
    const body = await request.json();
    arr.push({ id: arr.length + 1 , title: body.title , completed: false});
    return NextResponse.json(body);
}

