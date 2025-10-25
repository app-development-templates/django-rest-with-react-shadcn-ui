import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";


function PublicOnlyRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const { evaluateAuthorization } = useAuthGuard();

    useEffect(() => {
        let isMounted = true;

        evaluateAuthorization()
            .then((authorized) => {
                if (isMounted) {
                    setIsAuthorized(authorized);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setIsAuthorized(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [evaluateAuthorization]);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? <Navigate to="/" /> : children;
}

export default PublicOnlyRoute;