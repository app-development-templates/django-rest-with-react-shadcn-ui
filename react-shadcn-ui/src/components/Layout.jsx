import Navigation from "./Navigation";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main>{children}</main>
        </div>
    );
}

export default Layout;