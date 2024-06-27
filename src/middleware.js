import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";
import roles from "@/core/roles";
import {jwtDecode} from "jwt-decode";

export default withAuth(
    function middleware(req) {
        console.log("middleware");
        var decoded = jwtDecode(req.nextauth.token.token);
        let isEmployee = decoded?.roles.some(role => role.authority === roles.EMPLOYEE);
        let isAdministrator = decoded?.roles.some(role => role.authority === roles.ADMINISTRATOR);
        //console.log(req.nextauth);
        //console.log(decoded);
        if (req.nextUrl.pathname.startsWith("/user") && !isAdministrator)
            return NextResponse.rewrite(
                new URL("/api/auth/signin?message=You Are Not Authorized!", req.url)
            );
        if (req.nextUrl.pathname.startsWith("/popis") && !isEmployee)
            return NextResponse.rewrite(
                new URL("/api/auth/signin?message=You Are Not Authorized!", req.url)
            );
    },
    {
        callbacks: {
            authorized: ({token}) => !!token,
        },
    }
);

export const config = {
    //matcher: ["/user/:path*", "/popis/:path*"]
    matcher: ["/user/:path*", "/popis/:path*"]
};