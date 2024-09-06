import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/lib/prismaConfig"
import bcrypt from 'bcryptjs';

export const { handlers, auth } = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,

        authorization:{
            params: {
                prompt: 'consent',
                access_type:"offline",
                response_type: "code"
                
            }
        },

        async profile(profile, token){
           const { sub: id, name, email, picture: image } = profile;
            const baseData = { id, name, email, image };
            try {
                return { ...baseData, error: undefined};
            } catch(error : any) {
                return { ...baseData, error: error.message}
            }
        }
    }),

    CredentialsProvider({
        credentials: {
            email: {},
            password: {},
        },

        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) throw new Error("Missing email or password")
            

            try {
            
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string}
                })

                if (!user) return null
            
                const isPasswordMatch = bcrypt.compareSync(credentials.password as string, user.password as string)

                if (!isPasswordMatch) return null
                

            
                return user

            } catch (err: any) {
                console.error("Error in authorize function:", err.message)
                throw new Error(err.message || "An error occurred during authentication");
            }
        }
    })

],

    secret: process.env.NEXT_AUTH_SECRET,
        session: {
            maxAge: 60* 60 * 24,
            strategy: "jwt"
    },
    pages:{
        signIn: "/",
    },
    callbacks:{
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
            },
        }),

       async signIn({user, account}){
        if(!user && account?.provider === "google") return false

        if(account?.provider === "google"){
            const existing = await prisma.user.findUnique({
                where:{
                    email: user.email as string
                }
            })

            if(!existing){
                await prisma.user.create({
                    data:{
                        id: user.id as string,
                        name: user.name as string,
                        email: user.email as string,
                        type: "social",
                    }
                }) 
            }

          
        }

        return true
       }
    },

    
})

