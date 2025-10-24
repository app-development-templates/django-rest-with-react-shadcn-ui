import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader className="space-y-4">
                    <div className="text-6xl font-bold text-gray-400">404</div>
                    <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
                    <CardDescription className="text-gray-600">
                        The page you're looking for doesn't exist or has been moved.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button onClick={handleGoHome} className="w-full sm:w-auto">
                            Go Home
                        </Button>
                        <Button onClick={handleGoBack} variant="outline" className="w-full sm:w-auto">
                            Go Back
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default NotFound;