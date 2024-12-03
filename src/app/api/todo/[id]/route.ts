import { NextResponse } from "next/server";
import { arr} from "../route"

export async function GET(request : Request, {params} : {params: Promise<{id: string}>}) {
    const id = (await params).id
    return NextResponse.json({Heelo : id});
}

export async function PATCH(request : Request, {params} : {params: Promise<{id: string}>}) {
    const id = (await params).id
    const idnumber = Number(id); // const idnumver = parseInt(id)
    const body = await request.json();
    const index = arr.findIndex((item) => item.id === idnumber);
    arr[index] = {...arr[index], title : body.title ? body.title : arr[index].title , completed : body.completed}

    console.log(arr)
    return NextResponse.json("Success");

    
}

export async function DELETE(request : Request, {params} : {params: Promise<{id: string}>}) {
    const id = (await params).id
    const idnumber = Number(id); // const idnumver = parseInt(id)
  const index = arr.findIndex((item) => item.id === idnumber)

  arr.splice(index ,1)
    return NextResponse.json("Suscess");

    
}