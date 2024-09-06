import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismaConfig";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    const { email, name , password } = await request.json()

    const session = await auth()
    try{
        if(!session){

            if( (email === null || undefined) || (name === null || undefined) || (password === null || undefined) ) return NextResponse.json({ok: false, msg: "Empty Field", status: "ERROR"})

            const user = await prisma.user.create({
                data:{
               
                    email: email,
                    name: name,
                    password: password,
                    type: "password"
                }
            })

            if(user){
                return NextResponse.json({ok: true, msg: "Successfulyy Registered!", status: "GOOD"})
            }else{
                return NextResponse.json({ok: false, msg: "Failed To Register", status: "ERROR"})
            }

        }else{
            return NextResponse.json({ok: false, msg: "UNAUTHORIZED", status: "UNAUTHORIZED"})
        }
    }catch(err){
        console.log(err)
        return NextResponse.json({ok: false, status: "ERROR"})
    }
}
