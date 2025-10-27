import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function Home() {
    const user = useCurrentUser();
    const greetingName = user?.firstName || user?.username || "there";

    return (
        <div className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Welcome back, {greetingName}!</CardTitle>
                        <CardDescription>
                            Here is a snapshot of your account details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-md border bg-card p-4">
                                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">Username</h3>
                                    <p className="text-lg font-semibold text-foreground">{user.username || "—"}</p>
                                </div>
                                <div className="rounded-md border bg-card p-4">
                                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">Email</h3>
                                    <p className="text-lg font-semibold text-foreground">{user.email || "—"}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                Sign in to view personalized information.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Home;