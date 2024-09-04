import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google";

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

        async signIn({user, credentials}){
            try{
                
                if(!user){
                    return false
                }
                return true
            }catch(err: any){
                console.error("Error Signing In: ", err.msg)
                return false
            }
        },

        async redirect({ url, baseUrl }) {
        if(url.includes('error=OAuthCallbackError')) {
            return baseUrl;
        }

          return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },

    
})

