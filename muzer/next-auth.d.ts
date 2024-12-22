import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: DefaultSession["user"] & {
            id?: string; // Add the `id` property
        };
    }

    interface User {
        id: string; // Add the `id` property to the User type as well
    }
}
