import { useState, useRef } from 'react';
import { X, Loader2, CheckCircle2, Link, FileText, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface AcceptSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentName: string;
    onConfirm: (meetingLink: string, note: string, paymentImage: File | null) => Promise<boolean>;
}

export function AcceptSessionModal({ isOpen, onClose, studentName, onConfirm }: AcceptSessionModalProps) {
    const [meetingLink, setMeetingLink] = useState('');
    const [note, setNote] = useState('');
    const [paymentImage, setPaymentImage] = useState<File | null>(null);
    const [paymentImagePreview, setPaymentImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset state when opening (optional, but good practice if not controlled by parent fully)
    // For now, we rely on parent to mount/unmount or we just keep state. 
    // Usually simpler to just let it persist or reset on success.

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPaymentImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPaymentImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        // Validation
        if (!meetingLink.trim()) {
            toast.error("Please provide a meeting link (Google Meet, Zoom, etc.)");
            return;
        }

        // URL basic validation
        try {
            new URL(meetingLink);
        } catch (_) {
            toast.error("Please enter a valid URL (e.g., https://meet.google.com/...)");
            return;
        }

        setLoading(true);
        try {
            const success = await onConfirm(meetingLink, note, paymentImage);
            if (success) {
                onClose();
                // Reset form
                setMeetingLink('');
                setNote('');
                setPaymentImage(null);
                setPaymentImagePreview(null);
            }
        } catch (error) {
            console.error("Error in modal submit:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>

                    <h2 className="text-xl font-bold mb-1">Accept Session</h2>
                    <p className="text-blue-100 text-sm">Review details for <span className="text-white font-semibold">{studentName}</span></p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Meeting Link Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Link className="w-4 h-4 text-blue-600" />
                            Meeting Link <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            value={meetingLink}
                            onChange={(e) => setMeetingLink(e.target.value)}
                            placeholder="https://meet.google.com/..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                        <p className="text-xs text-gray-400">Google Meet, Zoom, or Teams link for the session.</p>
                    </div>

                    {/* Payment Scanner Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-emerald-600" />
                            Payment Scanner / QR Code
                        </label>

                        <div
                            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${paymentImage ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                            {paymentImagePreview ? (
                                <div className="relative">
                                    <img
                                        src={paymentImagePreview}
                                        alt="Preview"
                                        className="h-32 mx-auto rounded-lg object-contain"
                                    />
                                    <p className="mt-2 text-xs text-emerald-700 font-semibold truncate px-4">
                                        {paymentImage?.name} (Click to change)
                                    </p>
                                </div>
                            ) : (
                                <div className="py-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Click to upload QR Code image</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Personal Note */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-amber-500" />
                            Note to Student <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Any specific instructions or topics to prepare..."
                            className="w-full h-24 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 font-medium resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                            Confirm Acceptance
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
