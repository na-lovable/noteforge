'use server';

import { auth } from "@/lib/auth";

export async function signInUser({
    email,
    password
}: {
    email: string,
    password: string,
}): Promise<{
    success: Boolean,
    message: string,
}> {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }, 
        });
        return { success: true, message: "Signed in successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to sign in" };
    }
};

export async function signUpUser({
    name,
    email,
    password
}: {
    name: string,
    email: string,
    password: string,
}): Promise<{
    success: boolean,
    message: string,
}> {
    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        });
        return { success: true, message: "Signed up successfully, please verify your email" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to sign up" };
    }
};

export async function requestForPasswordReset({
    email,
    redirectURL,
}: {
    email: string,
    redirectURL: string,
}): Promise<{
    success: boolean,
    message: string,
}> {
    try {
        await auth.api.requestPasswordReset({
            body: {
                email: email,
                redirectTo: redirectURL,
            }
        });
        return { 
            success: true, 
            message: "Please check your email for password reset link" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to send password reset link" };
    }
};

export async function serverResetPassword({
    newPassword,
    token,
}: {
    newPassword: string,
    token: string,
}): Promise<{
    success: boolean,
    message: string,
}> {
    try {
        await auth.api.resetPassword({
            body: {
                newPassword: newPassword,
                token: token,
            }
        });
        return { 
            success: true, 
            message: "Password was reset successfully" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to reset password" };
    }
};