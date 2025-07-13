"use client";

import Link from "next/link";
import { Archive, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
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
        </div>
      </div>
    </header>
  );
}
