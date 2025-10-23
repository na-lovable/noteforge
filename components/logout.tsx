'use client';

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logout() {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const handleLogout = async () => {
        try {
            setIsSigningOut(true);
            await authClient.signOut();
            router.push("/");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSigningOut(false);
        }
    };
    return (
        <div className="w-20">
            <Button className="font-medium w-full" variant={"outline"} onClick={handleLogout} disabled={isSigningOut}>
                {isSigningOut ? <Loader2 className="size-4 animate-spin" /> : "Logout"}
            </Button >
        </div>
    );
};