import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setErrors({}); // Clear previous errors

        try {
            await api.post("/api/user/register/", { username, password });
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data) {
                // Handle validation errors from Django REST Framework
                setErrors(error.response.data);
            } else {
                // Handle other types of errors
                alert("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
                    <CardDescription className="text-center">
                        Create a new account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {errors.non_field_errors && (
                        <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 p-3">
                            <p className="text-sm text-destructive">
                                {Array.isArray(errors.non_field_errors) ? errors.non_field_errors[0] : errors.non_field_errors}
                            </p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose a username"
                                required
                                autoComplete="off"
                                className={errors.username ? "border-destructive" : ""}
                            />
                            {errors.username && (
                                <p className="text-sm text-destructive">
                                    {Array.isArray(errors.username) ? errors.username[0] : errors.username}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Choose a secure password"
                                required
                                autoComplete="new-password"
                                className={errors.password ? "border-destructive" : ""}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {Array.isArray(errors.password) ? errors.password[0] : errors.password}
                                </p>
                            )}
                        </div>
                        {loading && (
                            <div className="flex justify-center">
                                <Spinner />
                            </div>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating account..." : "Register"}
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        <Button variant="link" asChild>
                            <Link to="/login">Back to login</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Register;