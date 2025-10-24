import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Home() {
    return (
        <div className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Welcome Home</CardTitle>
                        <CardDescription>
                            This is your main dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Home page content will be implemented here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Home;