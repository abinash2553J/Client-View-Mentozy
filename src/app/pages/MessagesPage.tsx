import { MessageSquare } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

export function MessagesPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-12 h-12 text-blue-600" />
                </div>
                <div className="max-w-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Messages</h1>
                    <p className="text-gray-500 text-lg">
                        Direct messaging with mentors and peers is on its way.
                        Stay tuned for seamless communication!
                    </p>
                </div>
                <div className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-lg border border-blue-200">
                    Feature Coming Soon
                </div>
            </div>
        </DashboardLayout>
    );
}
