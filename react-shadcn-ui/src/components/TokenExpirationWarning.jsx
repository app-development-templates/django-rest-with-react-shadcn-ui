import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from '../constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function TokenExpirationWarning() {
    const [showWarning, setShowWarning] = useState(false);
    const [daysUntilExpiry, setDaysUntilExpiry] = useState(0);

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) return;

            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;
                const daysLeft = Math.ceil((decoded.exp - now) / (24 * 60 * 60));
                
                setDaysUntilExpiry(daysLeft);
                
                // Show warning if less than 2 days remaining
                if (daysLeft <= 2 && daysLeft > 0) {
                    setShowWarning(true);
                }
            } catch (error) {
                console.error('Error checking token expiration:', error);
            }
        };

        checkTokenExpiration();
        
        // Check every hour
        const interval = setInterval(checkTokenExpiration, 60 * 60 * 1000);
        
        return () => clearInterval(interval);
    }, []);

    const handleDismiss = () => {
        setShowWarning(false);
    };

    const handleExtendSession = () => {
        // Redirect to login to get a new 7-day token
        window.location.href = '/login';
    };

    if (!showWarning) return null;

    return (
        <div className="fixed top-4 right-4 z-50 w-80">
            <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader className="pb-3">
                    <CardTitle className="text-yellow-800 text-sm">
                        Session Expiring Soon
                    </CardTitle>
                    <CardDescription className="text-yellow-700">
                        Your session will expire in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex gap-2">
                        <Button 
                            size="sm" 
                            onClick={handleExtendSession}
                            className="bg-yellow-600 hover:bg-yellow-700"
                        >
                            Extend Session
                        </Button>
                        <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={handleDismiss}
                            className="text-yellow-800 border-yellow-300 hover:bg-yellow-100"
                        >
                            Dismiss
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default TokenExpirationWarning;