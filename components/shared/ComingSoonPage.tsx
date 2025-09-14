'use client';

import { Card } from '@/components/ui/card';
import { Clock, Sparkles } from 'lucide-react';

interface ComingSoonPageProps {
    pageName: string;
    description?: string;
    width?: string
}

export default function ComingSoonPage({
    pageName,
    description = "We're working hard to bring you this amazing feature. Stay tuned for updates!",
    width = '3/4'
}: ComingSoonPageProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted/20">
            <Card className="max-w-2xl w-full p-8 text-center space-y-6">
                <div className="space-y-4">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                <Clock className="w-10 h-10 text-primary" />
                            </div>
                            <div className="absolute -top-1 -right-1">
                                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            {pageName}
                        </h1>
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-24"></div>
                            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                                Coming Soon
                            </span>
                            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-24"></div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                        {description}
                    </p>

                    {/* Progress indicator */}
                    <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">Development Progress</div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full animate-pulse"
                                style={{ width: width.includes('/') ? `calc(${width.split('/')[0]} / ${width.split('/')[1]} * 100%)` : width }}
                            ></div>
                        </div>
                    </div>

                    {/* Feature highlights */}
                    <div className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Advanced Calculations</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Interactive Charts</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>Export Reports</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                        Want to be notified when this feature is ready?{' '}
                        <span className="text-primary hover:underline cursor-pointer">
                            Subscribe to updates
                        </span>
                    </p>
                </div>
            </Card>
        </div>
    );
}