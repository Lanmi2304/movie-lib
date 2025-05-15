import Link from "next/link";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOutItem } from "./sidebar/_components/logut-dropdown-item";
import { type User } from "better-auth";

export function Header({ user }: { user?: User }) {
  return (
    <header className="bg-background/90 sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b px-4 backdrop-blur-md">
      <SidebarTrigger />
      {!user ? (
        <Button asChild size="sm" variant="secondary">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar className="size-8 rounded-full">
              {user?.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : null}
              <AvatarFallback className="rounded-full">
                {user.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-full">
                  {user.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : null}
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <LogOutItem />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
