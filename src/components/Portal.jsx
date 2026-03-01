import { useState } from 'react';
import { Building2,Baby, Map, BookHeart, Presentation, Stethoscope, LogOut } from 'lucide-react';
import MyJourneyTab from './tabs/MyJourneyTab';
import SafetyJournalTab from './tabs/SafetyJournalTab';
import BabyLibraryTab from './tabs/BabyLibraryTab';
import DoctorNotesTab from './tabs/DoctorNotesTab';
import HospitalCostsTab from './tabs/HospitalCostsTab'; 


export default function Portal({ userProfile }) {
    const [activeTab, setActiveTab] = useState('journey');
    const [hasRedFlag, setHasRedFlag] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'journey':
                return <MyJourneyTab userProfile={userProfile} />;
            case 'journal':
                return <SafetyJournalTab onScanResult={setHasRedFlag} />;
            case 'library':
                return <BabyLibraryTab />;
            case 'doctor':
                return <DoctorNotesTab hasRedFlag={hasRedFlag} />;
            case 'hospital':
                return <HospitalCostsTab />; 
            default:
                return <MyJourneyTab userProfile={userProfile} />;
        }
    };

    const getNavClass = (tabName) => {
        const base = "flex items-center gap-3 p-4 rounded-[32px] font-semibold transition-all w-full ";
        if (activeTab === tabName) {
            return base + "bg-white text-teal-800 shadow-sm";
        }
        return base + "text-slate-600 hover:bg-white/50";
    };

    return (
        <div className="flex min-h-screen bg-[#F9F5FF]/80 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-mint/40 p-6 flex flex-col border-r border-[#E0F2F1]">
                <div className="text-2xl font-bold text-slate-800 tracking-tight mb-12 flex items-center gap-2">
                    <Baby className="w-8 h-8 text-teal-600" />
                    Mama Circle
                </div>

                <nav className="flex flex-col gap-2 flex-grow">
                    <button onClick={() => setActiveTab('journey')} className={getNavClass('journey')}>
                        <Map className={`w-5 h-5 ${activeTab === 'journey' ? 'text-sakura' : ''}`} />
                        My Journey
                    </button>

                    <button onClick={() => setActiveTab('journal')} className={getNavClass('journal')}>
                        <BookHeart className={`w-5 h-5 ${activeTab === 'journal' ? 'text-emerald-500' : ''}`} />
                        Safety Journal
                    </button>

                    <button onClick={() => setActiveTab('library')} className={getNavClass('library')}>
                        <Presentation className={`w-5 h-5 ${activeTab === 'library' ? 'text-purple-500' : ''}`} />
                        Baby Library
                    </button>
                    <button onClick={() => setActiveTab('hospital')} className={getNavClass('hospital')}>
                        <Building2 className={`w-5 h-5 ${activeTab === 'hospital' ? 'text-teal-600' : ''}`} />
                        hospital
                    </button>
                    
                    

                    <div className="relative">
                        <button onClick={() => setActiveTab('doctor')} className={getNavClass('doctor')}>
                            <Stethoscope className={`w-5 h-5 ${activeTab === 'doctor' ? 'text-rose-500' : ''}`} />
                            Doctor Notes
                        </button>
                        {hasRedFlag && (
                            <span className="absolute top-4 right-4 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                        )}
                    </div>
                </nav>

                {/* Bottom actions could go here */}
                <button className="flex items-center gap-3 p-4 rounded-[32px] text-slate-500 font-medium hover:bg-white/30 transition-all mt-auto w-full">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-10 max-w-6xl mx-auto h-full flex flex-col">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
