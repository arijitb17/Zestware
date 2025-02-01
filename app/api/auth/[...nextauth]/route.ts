import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
      
          credentials: {
            username: { label: "Username", type: "text", placeholder: "zestware" },
            email:{label:"email",type:"email",placeholder:"zestwear@gmail.com"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
           
            const username = credentials?.username;
            const email = credentials?.email;
            const password = credentials?.password;
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          }),
          AppleProvider({
            clientId: process.env.APPLE_ID as string,
            clientSecret: process.env.APPLE_SECRET as string
          })
          
      ],
      secret:process.env.NEXTAUTH_SECRET
            
})

export { handler as GET, handler as POST }