import { CheckCircle, ArrowRight, BookOpen, User } from 'lucide-react';
import type { Page } from '../App';

interface StudentDashboardProps {
    onNavigate: (page: Page) => void;
}

export function StudentDashboardPage({ onNavigate }: StudentDashboardProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 animate-in zoom-in duration-500">
                    <CheckCircle className="w-10 h-10" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Mentozy!</h1>
                <p className="text-lg text-gray-600 mb-10">
                    Your student account has been successfully created. You're now ready to start your learning journey.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-10">
                    <button className="p-6 border border-gray-200 rounded-2xl hover:border-amber-300 hover:bg-amber-50/50 transition-all group text-left">
                        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Browse Tracks</h3>
                        <p className="text-sm text-gray-500">Explore learning paths</p>
                    </button>

                    <button className="p-6 border border-gray-200 rounded-2xl hover:border-amber-300 hover:bg-amber-50/50 transition-all group text-left">
                        <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-4">
                            <User className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Complete Profile</h3>
                        <p className="text-sm text-gray-500">Add photo & bio</p>
                    </button>
                </div>

                <button
                    onClick={() => onNavigate('home')}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                    Go to Homepage Dashboard <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}