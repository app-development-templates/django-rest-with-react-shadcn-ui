import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUsernameChange = (e) => {
        if (error) setError(null);
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        if (error) setError(null);
        setPassword(e.target.value);
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await api.post("/api/token/", { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data) {
                const { detail } = error.response.data;
                setError(detail || "Unable to sign in. Please try again.");
            } else {
                setError("Unable to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                                {error}
                            </div>
                        )}
                        {loading && (
                            <div className="flex justify-center">
                                <Spinner />
                            </div>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Login"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Don't have an account?
                        </p>
                        <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => navigate("/register")}
                        >
                            Sign Up
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;