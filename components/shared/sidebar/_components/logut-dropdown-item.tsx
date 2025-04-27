"use client";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogOutItem() {
  const router = useRouter();
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={async () =>
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/sign-in");
              router.refresh(); // redirect to login page
            },
          },
        })
      }
    >
      <LogOut />
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
