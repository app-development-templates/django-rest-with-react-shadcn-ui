import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ACCESS_TOKEN_KEY } from "../constants";

function Settings() {
    const [tokenData, setTokenData] = useState(null);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(() => Date.now() / 1000);

    useEffect(() => {
        const getTokenData = () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN_KEY);
                if (!token) {
                    setError("No access token found");
                    return;
                }

                const decoded = jwtDecode(token);
                setTokenData(decoded);
                setError(null);
            } catch (err) {
                setError("Error decoding token: " + err.message);
                setTokenData(null);
            }
        };

        getTokenData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now() / 1000);
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "N/A";
        return new Date(timestamp * 1000).toLocaleString();
    };

    const getTimeRemaining = useCallback((expTimestamp) => {
        if (!expTimestamp) return "N/A";
        const secondsLeft = expTimestamp - currentTime;
        
        if (secondsLeft <= 0) return "Expired";
        
        const days = Math.floor(secondsLeft / (24 * 60 * 60));
        const hours = Math.floor((secondsLeft % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
        
        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }, [currentTime]);

    const tokenIsValid = tokenData?.exp ? tokenData.exp > currentTime : false;

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">User Settings</CardTitle>
                        <CardDescription>
                            Manage your account settings and preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-4">Access Token Information</h3>
                            
                            {error ? (
                                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4">
                                    <p className="text-destructive">{error}</p>
                                </div>
                            ) : tokenData ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="rounded-md border bg-card p-4">
                                            <h4 className="mb-2 font-medium text-foreground">Token Status</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Status:</span>
                                                    <span className={`font-medium ${
                                                        tokenIsValid 
                                                            ? 'text-green-600' 
                                                            : 'text-red-600'
                                                    }`}>
                                                        {tokenIsValid ? 'Valid' : 'Expired'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Time Remaining:</span>
                                                    <span className="font-medium">{getTimeRemaining(tokenData.exp)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-md border bg-card p-4">
                                            <h4 className="mb-2 font-medium text-foreground">User Information</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">User ID:</span>
                                                    <span className="font-medium">{tokenData.user_id || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Username:</span>
                                                    <span className="font-medium">{tokenData.username || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-md border bg-card p-4">
                                            <h4 className="mb-2 font-medium text-foreground">Token Timestamps</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Issued At:</span>
                                                    <span className="font-medium">{formatTimestamp(tokenData.iat)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Expires At:</span>
                                                    <span className="font-medium">{formatTimestamp(tokenData.exp)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-md border bg-card p-4">
                                            <h4 className="mb-2 font-medium text-foreground">Token Details</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Token Type:</span>
                                                    <span className="font-medium">{tokenData.token_type || 'access'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">JTI:</span>
                                                    <span className="font-medium font-mono text-xs">{tokenData.jti || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-md border bg-muted p-4">
                                        <h4 className="mb-2 font-medium text-foreground">Raw Token Data</h4>
                                        <pre className="overflow-x-auto rounded border bg-card p-3 text-xs">
                                            {JSON.stringify(tokenData, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-md border border-border bg-muted p-4">
                                    <p className="text-muted-foreground">Loading token data...</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Settings;