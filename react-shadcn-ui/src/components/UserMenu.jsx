import { forwardRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const UserMenu = forwardRef(function UserMenu(
    {
        align = "end",
        collapsed = false,
        logoutItemClassName,
        onLogout,
        onSettings,
        open,
        onOpenChange,
        triggerVariant = "ghost",
    },
    ref
) {
    const user = useCurrentUser();
    const email = user?.email || "user@example.com";
    const displayName = user?.displayName || user?.username || "Current User";
    const avatarFallback = (displayName?.[0] || "U").toUpperCase();

    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button
                    ref={ref}
                    variant={triggerVariant}
                    className={cn(
                        "h-10 w-full rounded-md transition-all",
                        collapsed ? "justify-center px-0" : "justify-start gap-3 px-3",
                    )}
                    aria-label="Open user menu"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage alt="User" />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    {collapsed ? (
                        <span className="sr-only">{displayName} ({email})</span>
                    ) : (
                        <span className="flex flex-col items-start text-left">
                            <span className="text-sm font-medium leading-none">{displayName}</span>
                            <span className="text-xs text-muted-foreground">{email}</span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align={align} forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSettings}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={onLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

export default UserMenu;
