import { useState } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Loader2, Upload, X } from 'lucide-react';
import { uploadPaymentScanner, updateBookingWithDetails } from '../../../lib/api';
import { toast } from 'sonner';

interface AcceptBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: string;
    studentName: string;
    onSuccess: () => void;
}

export function AcceptBookingModal({ isOpen, onClose, bookingId, studentName, onSuccess }: AcceptBookingModalProps) {
    const [meetingLink, setMeetingLink] = useState('');
    const [mentorNotes, setMentorNotes] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!meetingLink) {
            toast.error("Please provide a meeting link");
            return;
        }
        if (!file) {
            toast.error("Please upload a payment scanner image");
            return;
        }

        setUploading(true);
        try {
            console.log("Starting upload for file:", {
                name: file.name,
                size: file.size,
                type: file.type
            });
            // 1. Upload Image
            const { url: imageUrl, error: uploadError } = await uploadPaymentScanner(file, bookingId);
            if (uploadError) throw new Error(`Upload failed: ${uploadError}`);
            if (!imageUrl) throw new Error("Image upload failed: No URL returned");

            // 2. Update Booking
            const success = await updateBookingWithDetails(bookingId, {
                meeting_link: meetingLink,
                mentor_notes: mentorNotes,
                payment_scanner_url: imageUrl
            });

            if (success) {
                toast.success("Session accepted successfully!");
                onSuccess();
                onClose();
            } else {
                throw new Error("Failed to update session details");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "An error occurred");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Accept Session Request</DialogTitle>
                    <DialogDescription>
                        Fill in the details for your session with {studentName}.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="meetLink">Google Meet Link</Label>
                        <Input
                            id="meetLink"
                            placeholder="https://meet.google.com/..."
                            value={meetingLink}
                            onChange={(e) => setMeetingLink(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Personal Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            placeholder="e.g. Please bring your project files..."
                            value={mentorNotes}
                            onChange={(e) => setMentorNotes(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Payment Scanner Image</Label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors">
                            <div className="space-y-1 text-center">
                                {file ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{file.name}</span>
                                            <button type="button" onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-50 border border-gray-100">
                                            <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={uploading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={uploading} className="bg-blue-600 hover:bg-blue-700 text-white">
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Confirm Acceptance
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
