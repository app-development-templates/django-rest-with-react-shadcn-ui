import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";
import { ChevronsUpDown, Menu, X } from "lucide-react";

function Navigation() {
    const navigate = useNavigate();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);

    useEffect(() => {
        if (!isMobileNavOpen) {
            setIsMobileUserMenuOpen(false);
            document.body.style.removeProperty("overflow");
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMobileNavOpen(false);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.removeProperty("overflow");
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMobileNavOpen]);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/settings", label: "Settings" },
        { to: "/boilerplate", label: "Boilerplate" },
    ];

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        navigate("/login");
        setIsMobileNavOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Logo/Brand */}
                        <Link to="/" className="text-xl font-bold text-gray-900">
                            MyApp
                        </Link>
                        
                        {/* Navigation Menu */}
                        <div className="ml-10 hidden md:flex items-baseline space-x-4">
                            {navLinks.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User Dropdown */}
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            className="mr-2 md:hidden"
                            onClick={() => setIsMobileNavOpen(true)}
                            aria-label="Open navigation menu"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="hidden md:block">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage alt="User" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">Current User</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                user@example.com
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileNavOpen ? (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileNavOpen(false)}
                >
                    <div
                        className="relative flex h-full w-72 max-w-full flex-col bg-white shadow-lg"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-4 py-4 border-b">
                            <Link to="/" className="text-xl font-bold text-gray-900" onClick={() => setIsMobileNavOpen(false)}>
                                MyApp
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMobileNavOpen(false)}
                                aria-label="Close navigation menu"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex flex-1 flex-col px-4 py-6 space-y-4 overflow-y-auto">
                            {navLinks.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsMobileNavOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 px-4 py-4">
                            <DropdownMenu open={isMobileUserMenuOpen} onOpenChange={setIsMobileUserMenuOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-between px-3"
                                        aria-expanded={isMobileUserMenuOpen}
                                    >
                                        <span className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage alt="User" />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <span className="text-left">
                                                <span className="block text-sm font-medium leading-none">Current User</span>
                                                <span className="block text-xs text-muted-foreground">user@example.com</span>
                                            </span>
                                        </span>
                                        <ChevronsUpDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-64"
                                    side="top"
                                    align="end"
                                    sideOffset={12}
                                >
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage alt="User" />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium leading-none">Current User</p>
                                                <p className="text-xs text-muted-foreground">user@example.com</p>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onSelect={() => {
                                            setIsMobileNavOpen(false);
                                            navigate("/settings");
                                        }}
                                    >
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onSelect={() => {
                                            handleLogout();
                                        }}
                                        className="text-red-600 focus:text-red-600"
                                    >
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            ) : null}
        </nav>
    );
}

export default Navigation;