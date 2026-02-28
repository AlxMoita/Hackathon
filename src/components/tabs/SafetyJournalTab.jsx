import { useState } from 'react';
import { Card, Input, Button } from 'antd';
import { BookHeart, Sparkles, CheckCircle, AlertCircle, Loader2, Calendar, ChevronRight } from 'lucide-react';

const { TextArea } = Input;

export default function SafetyJournalTab({ onScanResult }) {
    const [text, setText] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);

    const pastEntries = [
        { id: 1, date: "Monday, Oct 12", preview: "Feeling really good today, joined a prenatal yoga..." },
        { id: 2, date: "Friday, Oct 2", preview: "Baby was kicking so much last night! So happy..." },
        { id: 3, date: "Wednesday, Sep 23", preview: "A little tired from work but got some rest..." },
    ];

    const handleScan = () => {
        if (!text.trim()) return;

        setIsScanning(true);
        setScanResult(null);

        setTimeout(() => {
            setIsScanning(false);
            const lowerText = text.toLowerCase();

            const redFlags = ['pain', 'dizzy', 'dizziness', 'headache', 'anxiety', 'severe cramping', 'bleeding', 'cramps', 'vision spots'];
            const hasFlag = redFlags.some(flag => lowerText.includes(flag));

            if (hasFlag) {
                setScanResult('flagged');
                onScanResult(true);
            } else {
                setScanResult('clean');
                onScanResult(false);
            }
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start animate-fade-in">

            {/* Editor Main Content */}
            <div className="flex-1 w-full flex flex-col gap-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-cream p-3 rounded-full shadow-sm text-sage">
                        <BookHeart className="w-6 h-6 border-2 border-sage rounded-md p-0.5" />
                    </div>
                    <h2 className="text-3xl font-bold font-serif text-slate-800">Your Private Space</h2>
                </div>

                <Card className="rounded-[32px] border-none shadow-portal-card overflow-hidden bg-white" styles={{ body: { padding: '0px' } }}>
                    <div className="p-8">
                        <div className="mb-4 text-slate-400 font-medium">Today's Check-in</div>
                        <TextArea
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                                setScanResult(null);
                            }}
                            placeholder="Write whatever is on your mind today, Mama... without judgement. Any physical symptoms?"
                            className="border-none hover:border-transparent focus:border-transparent focus:shadow-none resize-none text-xl p-0 placeholder:text-slate-300 text-slate-700 min-h-[300px] leading-relaxed"
                        />
                    </div>

                    <div className="bg-cream border-t border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1 w-full">
                            {scanResult === 'clean' && (
                                <div className="flex items-center gap-2 text-sage bg-sage/10 px-4 py-2 rounded-full w-max">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-semibold">Wellness Confirmed</span>
                                </div>
                            )}
                            {scanResult === 'flagged' && (
                                <div className="flex items-center gap-2 text-slate-700 bg-muted/20 px-4 py-2 rounded-full w-max border border-muted/30">
                                    <AlertCircle className="w-5 h-5 text-muted" />
                                    <span className="font-semibold">Noted. Please check Doctor Notes.</span>
                                </div>
                            )}
                            {!scanResult && !isScanning && (
                                <p className="text-muted text-sm font-medium">Your entries are private and analyzed securely.</p>
                            )}
                        </div>

                        <Button
                            type="primary"
                            size="large"
                            disabled={!text.trim() || isScanning}
                            onClick={handleScan}
                            className="bg-sage hover:!bg-sage-btn !text-white !border-none rounded-full px-12 h-14 text-lg font-bold shadow-soft hover:shadow-soft-hover w-full md:w-auto"
                        >
                            {isScanning ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                            {isScanning ? 'Analyzing...' : 'Submit'}
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Past Diaries Sidebar */}
            <div className="w-full lg:w-80 flex flex-col shrink-0 gap-4 mt-10 lg:mt-0">
                <h3 className="text-xl font-bold font-serif text-slate-800 mb-2">Past Diaries</h3>

                <div className="flex flex-col gap-3">
                    {pastEntries.map(entry => (
                        <div key={entry.id} className="bg-white p-4 rounded-[24px] shadow-sm border border-slate-100 hover:shadow-portal-card transition-all cursor-pointer group flex items-start gap-3">
                            <div className="bg-cream p-2 rounded-full shrink-0 text-sage group-hover:bg-sage/10 transition-colors">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-700 text-sm mb-1">{entry.date}</h4>
                                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{entry.preview}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 mt-2 shrink-0 group-hover:text-sage transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
