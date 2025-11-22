import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { ac, orgAdmin, member, owner } from "./auth/permissions";
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    organizationClient({
      ac,
      roles: {
        owner,
        orgAdmin,
        member,
      },
      teams: {
        enabled: true,
      },
    }),
  ],
});
