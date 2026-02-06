import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabase } from '../../lib/supabase';
import { getUserProfile } from '../../lib/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function AuthCallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const supabase = getSupabase();
            if (!supabase) {
                navigate('/login');
                return;
            }

            // The session might already be available via onAuthStateChange in AuthContext,
            // but we want to ensure we handle the redirection logic correctly here.
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error || !session) {
                console.error("Auth callback error:", error);
                navigate('/login');
                return;
            }

            try {
                const profile = await getUserProfile(session.user.id);
                const role = profile?.role || session.user.user_metadata?.role || 'student';

                console.log("AUTH CALLBACK: Detected Role:", role);

                if (role === 'mentor' || role === 'teacher') {
                    navigate('/mentor-dashboard');
                    toast.success("Welcome back, Mentor!");
                } else {
                    navigate('/student-dashboard');
                    toast.success("Successfully logged in!");
                }
            } catch (err) {
                console.error("Error in auth callback profile check:", err);
                navigate('/student-dashboard'); // Fallback
            }
        };

        handleAuthCallback();
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center space-y-4">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto" />
                <h2 className="text-xl font-bold text-gray-900">Completing login...</h2>
                <p className="text-gray-500">Redirecting you to your dashboard.</p>
            </div>
        </div>
    );
}

export default AuthCallbackPage;
