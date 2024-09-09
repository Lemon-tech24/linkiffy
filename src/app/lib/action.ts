"use server"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import { prisma } from "./prisma";

export async function createUser(){
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  try{
    
  if(user){
    const existing = await prisma.user.findUnique({
      where: {
        email: user.email as string
      }
    })

    if(!existing){
      const createNew = await prisma.user.create({
        data:{
          name: `${user.given_name} ${user.family_name}`,
          email: user.email as string,
        }
      })
      if(createNew){
        return {ok: true, msg: "created successfully"}
      }else{
        return { ok:false, msg: "failed to create"}
      }
    }

    return {ok: true, msg:"User Already Exist"}
  }


  }catch(err){
    return {ok: false, msg: "error occurred"}
  }

}