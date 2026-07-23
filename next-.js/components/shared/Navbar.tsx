"use client"

import Link from "next/link"
import { Boxes, LayoutDashboard, LogOut, Settings, User, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/service/logout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "News", href: "/news" },
  { label: "Premimum", href: "/premimum" },
]

const userMenuItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
]


type IUser =  {
    success: boolean;
    message: string;
    data: {
        profile: {
            id: string;
            name: string;
            email: string;
            activeStatus: string;
            role: string;
            createdAt: string;
            updatedAt: string;
            profile: {
                id: string;
                profilePhoto: string;
                bio: string | null;
                createdAt: string;
                updatedAt: string;
                userId: string;
            }
        }
    }
}

type NavbarProps = {
  user: IUser
}

export function Navbar({user}: NavbarProps) {
  const router = useRouter();
 
  // hande logout function
  const handleUserMenuAction = async(action: string) => {
    if(action === "logout") {
      await logout();
      toast.success("user log out successfully");
      router.push("/login");
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Boxes className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Next.ja press</span>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User dropdown */}
        {
          user.success ? (
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
                <AvatarFallback>{user.data?.profile.name || "name"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{user.data?.profile.name || "name"}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user.data?.profile.email || "email"}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userMenuItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="cursor-pointer">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={async() => {
                handleUserMenuAction("logout")
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          ) : 
          <Link href={"/login"}>
            Login
          </Link>
        }
      </nav>
    </header>
  )
}
