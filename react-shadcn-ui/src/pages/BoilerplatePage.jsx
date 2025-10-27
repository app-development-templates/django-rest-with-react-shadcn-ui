import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function BoilerplatePage() {
    return (
        <div className="min-h-full bg-background py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Boilerplate Page</CardTitle>
                        <CardDescription>
                            This is a boilerplate template page for new features.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Boilerplate page content will be implemented here. This serves as a template for creating new pages.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default BoilerplatePage;