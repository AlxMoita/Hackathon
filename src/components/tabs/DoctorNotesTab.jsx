import { Card, Button } from 'antd';
import { Stethoscope, FileHeart, Video, PhoneCall, CheckCircle } from 'lucide-react';

export default function DoctorNotesTab({ hasRedFlag }) {

    if (hasRedFlag) {
        return (
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-[70vh] gap-6 animate-fade-in">
                <div className="flex items-center justify-center gap-3 w-full mb-2">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-800 text-center">Important Message</h2>
                </div>

                <Card className="rounded-[32px] border border-muted/30 shadow-portal-card bg-cream w-full" styles={{ body: { padding: '48px' } }}>
                    <div className="text-center mb-10">
                        <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                            <img src="https://ui-avatars.com/api/?name=Dr+Smith&background=98A6B7&color=fff&size=64" alt="Dr Smith" className="rounded-full w-20 h-20" />
                        </div>
                        <h3 className="text-2xl font-bold font-serif text-slate-800 mb-4">Message from Dr. Smith</h3>
                        <p className="text-slate-600 text-lg max-w-lg mx-auto leading-relaxed">
                            "Based on your recent safety journal entries, I noticed some symptoms that we should discuss to ensure you and baby are feeling your best."
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            type="primary"
                            className="bg-muted hover:!bg-slate-400 !text-white !border-none rounded-full h-14 px-8 text-lg font-bold shadow-soft flex items-center gap-2"
                        >
                            <Video className="w-5 h-5" />
                            Book Follow-up Appointment
                        </Button>
                        <Button
                            className="bg-white hover:!bg-slate-50 text-slate-600 border border-slate-200 rounded-full h-14 px-8 text-lg font-bold shadow-sm flex items-center gap-2"
                        >
                            <FileHeart className="w-5 h-5" />
                            View Clinical Notes
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    // Default "All Clear" state
    return (
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-[70vh] text-center gap-6 animate-fade-in">
            <div className="bg-sage/10 p-6 rounded-full shadow-sm mb-4">
                <CheckCircle className="w-16 h-16 text-sage" />
            </div>
            <h2 className="text-4xl font-bold font-serif text-slate-800">You're all set!</h2>
            <p className="text-xl text-muted max-w-md leading-relaxed">
                Your journal entries look great and there are no new notifications from Dr. Smith.
            </p>
            <Button
                className="mt-6 rounded-full h-14 px-8 text-lg font-bold flex items-center gap-2 text-sage border-sage hover:!text-sage hover:!border-sage-btn shadow-sm"
            >
                <Stethoscope className="w-5 h-5" />
                View Past Reports
            </Button>
        </div>
    );
}
