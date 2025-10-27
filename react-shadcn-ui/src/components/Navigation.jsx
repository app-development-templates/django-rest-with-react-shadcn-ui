import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import {
    FileText as FileTextIcon,
    Home as HomeIcon,
    Menu,
    PanelLeft,
    PanelRight,
    X,
} from "lucide-react";

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
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
        { to: "/", label: "Home", icon: HomeIcon },
        { to: "/boilerplate", label: "Boilerplate", icon: FileTextIcon },
    ];

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        navigate("/login");
        setIsMobileNavOpen(false);
    };

    return (
        <SidebarProvider>
            <DesktopSidebar
                navLinks={navLinks}
                activePath={location.pathname}
                onNavigate={navigate}
                onLogout={handleLogout}
            />

            <header className="flex justify-end border-b border-border bg-background px-4 py-4 md:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileNavOpen(true)}
                    aria-label="Open navigation menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </header>

            {isMobileNavOpen ? (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileNavOpen(false)}
                >
                    <SidebarProvider defaultCollapsed={false}>
                        <Sidebar
                            collapsible="none"
                            className="relative h-full w-72 max-w-full border-0 bg-sidebar text-sidebar-foreground shadow-lg"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
                                <Link
                                    to="/"
                                    className="text-xl font-bold text-sidebar-foreground"
                                    onClick={() => setIsMobileNavOpen(false)}
                                >
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
                            </SidebarHeader>
                            <SidebarContent className="px-4 py-6">
                                <SidebarMenu className="space-y-2 text-sidebar-foreground">
                                    {navLinks.map(({ to, label, icon: Icon }) => (
                                        <SidebarMenuItem key={to}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={location.pathname === to}
                                                className="gap-3 px-3 py-3 text-base"
                                                onClick={() => setIsMobileNavOpen(false)}
                                            >
                                                <Link to={to}>
                                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                                    <span>{label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarContent>
                            <SidebarFooter className="border-t px-4 py-4">
                                <div className="flex flex-col gap-3">
                                    <ThemeToggle />
                                    <UserMenu
                                        open={isMobileUserMenuOpen}
                                        onOpenChange={setIsMobileUserMenuOpen}
                                        onSettings={() => {
                                            setIsMobileNavOpen(false);
                                            navigate("/settings");
                                        }}
                                        onLogout={() => {
                                            handleLogout();
                                        }}
                                        align="end"
                                        triggerVariant="ghost"
                                    />
                                </div>
                            </SidebarFooter>
                        </Sidebar>
                    </SidebarProvider>
                </div>
            ) : null}
        </SidebarProvider>
    );
}

function DesktopSidebar({ navLinks, activePath, onNavigate, onLogout }) {
    const { isCollapsed } = useSidebar();

    return (
        <Sidebar
            collapsible="icon"
            className="hidden md:sticky md:top-0 md:flex md:h-screen md:flex-none md:bg-sidebar md:text-sidebar-foreground md:shadow-sm"
        >
            <SidebarHeader className={cn("border-b border-sidebar-border", isCollapsed ? "px-3" : "px-6")}
            >
                <div className="flex w-full items-center gap-3">
                    <SidebarTrigger
                        className="h-10 w-10 rounded-md border border-border bg-muted text-foreground transition-colors hover:bg-muted/80"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        aria-pressed={isCollapsed}
                    >
                        {isCollapsed ? <PanelRight className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
                    </SidebarTrigger>
                    {!isCollapsed && (
                        <Link to="/" className="text-xl font-bold text-sidebar-foreground" aria-label="MyApp">
                            MyApp
                        </Link>
                    )}
                </div>
            </SidebarHeader>
            <SidebarContent className={cn("py-6", isCollapsed ? "px-2" : "px-4")}
            >
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navLinks.map(({ to, label, icon: Icon }) => (
                                <SidebarMenuItem key={to}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={activePath === to}
                                        className={cn(isCollapsed ? "justify-center" : "justify-start")}
                                    >
                                        <Link to={to} className="flex items-center gap-2" title={label}>
                                            <Icon className="h-4 w-4" aria-hidden="true" />
                                            <span className={cn(isCollapsed ? "sr-only" : "")}>{label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className={cn("flex flex-col gap-3", isCollapsed ? "px-2" : "px-4")}
            >
                <ThemeToggle collapsed={isCollapsed} />
                <UserMenu
                    collapsed={isCollapsed}
                    onSettings={() => onNavigate("/settings")}
                    onLogout={onLogout}
                />
            </SidebarFooter>
        </Sidebar>
    );
}

export default Navigation;