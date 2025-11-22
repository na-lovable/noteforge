import { betterAuth } from "better-auth";
import { organization, admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from "@/components/emails/verification-email";
import PasswordResetEmail from "@/components/emails/reset-email";
import { ac, orgAdmin, member, owner } from "./auth/permissions";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Naveen <welcome@learn.barrierenvelope.com>",
        to: [user.email],
        subject: "Reset your password",
        react: PasswordResetEmail({ userName: user.name, resetUrl: url }),
      });
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  requireEmailVerification: true,
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Naveen <welcome@learn.barrierenvelope.com>",
        to: [user.email],
        subject: "Verify your email address",
        react: VerificationEmail({ userName: user.name, verificationUrl: url }),
      });
    },
    sendOnSignUp: true,
  },
  plugins: [
    organization({
      ac,
      roles: {
        owner,
        orgAdmin,
        member,
      },
      teams: {
        enabled: true,
        maximumTeams: 10, // Optional: limit teams per organization
        allowRemovingAllTeams: false, // Optional: prevent removing the last team
      },
      schema: {
        organization: {
          modelName: "organizations", //map the organization table to organizations
          fields: {
            name: "title", //map the name field to title
          },
          additionalFields: {
            // Add a new field to the organization table
            myCustomField: {
              type: "string",
              input: true,
              required: false,
            },
          },
        },
        teamMember: {
          modelName: "teamMembers",
          additionalFields: {
            teamRole: {
              type: "string",
              input: true,
              required: false,
            },
          },
        },
        team: {
          modelName: "teams",
          additionalFields: {
            teamRole: {
              type: "string",
              input: true,
              required: false,
            },
          },
        },
      },
    }),
    admin(),
    nextCookies(),
  ], // make sure this is the last plugin in the array
});
