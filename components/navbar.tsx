"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LogOut, MessageSquare, Users, Compass, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const routes = [
    {
      href: "/feed",
      label: "Feed",
      icon: MessageSquare,
      active: pathname === "/feed",
      public: false,
    },
    {
      href: "/communities",
      label: "Communities",
      icon: Users,
      active: pathname === "/communities" || pathname.startsWith("/communities/"),
      public: true,
    },
    {
      href: "/discover",
      label: "Discover",
      icon: Compass,
      active: pathname === "/discover",
      public: true,
    },
  ]

  // Filter routes based on authentication status
  const filteredRoutes = routes.filter((route) => (user ? true : route.public))

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href={user ? "/feed" : "/"} className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="inline-block font-bold">LearnHub</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {filteredRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile" className="w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings" className="w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <div className="px-7">
                  <Link href={user ? "/feed" : "/"} className="flex items-center" onClick={() => setIsOpen(false)}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary mr-2">
                      <BookOpen className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold">LearnHub</span>
                  </Link>
                  <nav className="mt-8 flex flex-col gap-4">
                    {filteredRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "flex items-center text-sm font-medium transition-colors hover:text-primary",
                          route.active ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <route.icon className="mr-2 h-4 w-4" />
                        {route.label}
                      </Link>
                    ))}

                    {user ? (
                      <>
                        <Link
                          href="/profile"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            logout()
                            setIsOpen(false)
                          }}
                          className="flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}
