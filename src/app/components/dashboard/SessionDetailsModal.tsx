import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Calendar, Clock, Link as LinkIcon, FileText, ImageIcon } from 'lucide-react';
import { Booking } from '../../../lib/api';

interface SessionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking;
}

export function SessionDetailsModal({ isOpen, onClose, booking }: SessionDetailsModalProps) {
    if (!booking) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Session Details</DialogTitle>
                    <DialogDescription>
                        Details for your upcoming session with {booking.mentors?.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            <span>{new Date(booking.scheduled_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            <span>{new Date(booking.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-bold flex items-center gap-2">
                            <LinkIcon className="w-4 h-4 text-blue-500" /> Google Meet Link
                        </h4>
                        {booking.meeting_link ? (
                            <a
                                href={booking.meeting_link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-blue-600 hover:underline break-all block p-3 bg-blue-50 rounded-xl border border-blue-100"
                            >
                                {booking.meeting_link}
                            </a>
                        ) : (
                            <p className="text-sm text-gray-400 italic">Not provided yet.</p>
                        )}
                    </div>

                    {booking.mentor_notes && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-bold flex items-center gap-2">
                                <FileText className="w-4 h-4 text-amber-500" /> Mentor Notes
                            </h4>
                            <p className="text-sm text-gray-600 p-3 bg-amber-50 rounded-xl border border-amber-100 leading-relaxed">
                                {booking.mentor_notes}
                            </p>
                        </div>
                    )}

                    {booking.payment_scanner_url && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-bold flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-emerald-500" /> Payment Scanner
                            </h4>
                            <div className="rounded-xl overflow-hidden border border-gray-200">
                                <img
                                    src={booking.payment_scanner_url}
                                    alt="Payment Scanner"
                                    className="w-full h-auto object-contain max-h-[300px]"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={onClose} className="bg-gray-900 text-white hover:bg-gray-800">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
