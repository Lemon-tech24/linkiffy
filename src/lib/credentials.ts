import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'keyboard cat';

export const generateToken = (data:any)=>{

    const token = jwt.sign(data, SECRET_KEY, {expiresIn: '1h'})

    cookies().set("access_token", token, {maxAge: 60 * 60 * 3})

    if(!token) return null

    return {ok: true}
}


export const verify =(token :any)=>{
    try{
        return jwt.verify(token, SECRET_KEY)
    }catch(err){
        return null
    }

}


export const logout = ()=>{
  cookies().delete('access_token')
  return
}