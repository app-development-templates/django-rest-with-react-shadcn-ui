import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SidebarContext = React.createContext(null);

function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}

function SidebarProvider({ defaultCollapsed = false, children }) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const toggleCollapsed = React.useCallback(() => {
        setIsCollapsed((prev) => !prev);
    }, []);

    const value = React.useMemo(
        () => ({ isCollapsed, toggleCollapsed }),
        [isCollapsed, toggleCollapsed]
    );

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

const Sidebar = React.forwardRef(function Sidebar(
    { className, collapsible = "icon", ...props },
    ref
) {
    const { isCollapsed } = useSidebar();

    return (
        <aside
            ref={ref}
            data-collapsible={collapsible}
            data-collapsed={isCollapsed ? "true" : undefined}
            className={cn(
                "group flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground text-sm transition-[width] duration-200 ease-in-out",
                collapsible === "icon" ? (isCollapsed ? "w-20" : "w-64") : "w-64",
                className
            )}
            {...props}
        />
    );
});

const SidebarHeader = React.forwardRef(function SidebarHeader({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn("flex items-center justify-between gap-3 px-4 py-4", className)}
            {...props}
        />
    );
});

const SidebarContent = React.forwardRef(function SidebarContent({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn("flex-1 overflow-y-auto px-2 py-6 text-sidebar-foreground", className)}
            {...props}
        />
    );
});

const SidebarFooter = React.forwardRef(function SidebarFooter({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn("border-t border-sidebar-border px-2 py-4", className)}
            {...props}
        />
    );
});

const SidebarGroup = React.forwardRef(function SidebarGroup({ className, ...props }, ref) {
    return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});

const SidebarGroupLabel = React.forwardRef(function SidebarGroupLabel({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn("px-2 text-xs font-semibold uppercase text-muted-foreground", className)}
            {...props}
        />
    );
});

const SidebarGroupContent = React.forwardRef(function SidebarGroupContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("space-y-1", className)} {...props} />;
});

const SidebarMenu = React.forwardRef(function SidebarMenu({ className, ...props }, ref) {
    return <ul ref={ref} className={cn("grid gap-1", className)} {...props} />;
});

const SidebarMenuItem = React.forwardRef(function SidebarMenuItem({ className, ...props }, ref) {
    return <li ref={ref} className={cn("list-none", className)} {...props} />;
});

const SidebarMenuButton = React.forwardRef(function SidebarMenuButton(
    { asChild = false, className, isActive, ...props },
    ref
) {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            ref={ref}
            className={cn(
                "flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive ? "bg-muted" : undefined,
                className
            )}
            {...props}
        />
    );
});

const SidebarTrigger = React.forwardRef(function SidebarTrigger(
    { className, children, onClick, ...props },
    ref
) {
    const { toggleCollapsed } = useSidebar();

    return (
        <Button
            ref={ref}
            size="icon"
            variant="ghost"
            className={cn("h-9 w-9", className)}
            onClick={(event) => {
                toggleCollapsed();
                if (typeof onClick === "function") {
                    onClick(event);
                }
            }}
            {...props}
        >
            {children}
        </Button>
    );
});

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
};
