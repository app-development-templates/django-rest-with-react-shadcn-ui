import Navigation from "./Navigation";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
            <Navigation />
            <main className="flex-1 bg-background">{children}</main>
        </div>
    );
}

export default Layout;