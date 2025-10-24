import Navigation from "./Navigation";
import TokenExpirationWarning from "./TokenExpirationWarning";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <TokenExpirationWarning />
            <main>{children}</main>
        </div>
    );
}

export default Layout;