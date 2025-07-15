
"use client";

import Link from "next/link";
import { Loader2, UserCircle, ChevronDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, profile, loading, logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">CodeVault</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
           <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
           <Link href="/#projects" className="hover:text-slate-900 transition-colors">Projects</Link>
        </nav>
        <div className="flex items-center gap-2">
            {loading ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : user ? (
              <>
                <Button variant="ghost" asChild>
                    <Link href="/submit">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Submit Project
                    </Link>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? "User"} />
                                <AvatarFallback><UserCircle className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{profile?.name || user.displayName || 'User'}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/profile">
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
                <>
                    <Button variant="ghost" asChild>
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                    <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                        <Link href="/signup">
                            Sign Up
                        </Link>
                    </Button>
                </>
            )}
        </div>
      </div>
    </header>
  );
}
