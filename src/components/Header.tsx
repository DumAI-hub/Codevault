
"use client";

import Link from "next/link";
import { Archive, Plus, User, LogOut, Loader2, UserCircle, Settings } from "lucide-react";
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
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, profile, loading, logout } = useAuth();
  
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Archive className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">CodeVault</h1>
        </Link>
        <div className="flex items-center gap-4">
            <Button asChild>
                <Link href="/submit">
                    <Plus className="-ml-1 h-4 w-4" />
                    Submit Project
                </Link>
            </Button>

            {loading ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : user ? (
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
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button variant="outline" asChild>
                    <Link href="/login">
                        <User className="mr-2 h-4 w-4" />
                        Login
                    </Link>
                </Button>
            )}
        </div>
      </div>
    </header>
  );
}
