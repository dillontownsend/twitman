import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";

export default NextAuth({
    providers: [
        Twitter({
            clientId: process.env.TWITTER_CONSUMER_KEY,
            clientSecret: process.env.TWITTER_CONSUMER_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.oauth_token = account.oauth_token;
                token.oauth_token_secret = account.oauth_token_secret;
                token.providerAccountId = account.providerAccountId
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.oauth_token = token.oauth_token;
            session.oauth_token_secret = token.oauth_token_secret;
            session.providerAccountId = token.providerAccountId
            return session;
        },
    },
});
