import { useEffect, useRef, useState } from 'react';
import { Card, Progress } from 'antd';
import { Sparkles, CheckCircle2, Lock, Heart, Cloud, CalendarDays, Activity, FileText, Pill, Baby, User } from 'lucide-react';

export default function MyJourneyTab({ userProfile }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const currentWeekRef = useRef(null);

    // Dynamic Current week logic based on LMP length
    let currentWeek = 20; // Default fallback
    if (userProfile?.lmpDate) {
        // Parse the YYYY-MM-DD string safely adjusting for local timezone offset
        const lmpStr = userProfile.lmpDate.split('-');
        const lmpDate = new Date(lmpStr[0], lmpStr[1] - 1, lmpStr[2]);
        const now = new Date();
        const diffInTime = now.getTime() - lmpDate.getTime();
        const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
        currentWeek = Math.floor(diffInDays / 7);
        // Clamp between 0 and 42 weeks
        if (currentWeek < 0) currentWeek = 0;
        if (currentWeek > 42) currentWeek = 42;
    }
    const progressPercent = Math.round((currentWeek / 40) * 100);

    const milestones = [
        { week: 6, title: "First Scan", category: "Ultrasound", trimester: '1', status: 'past', tip: "Have questions ready for your first OB appointment.", icon: <Activity className="w-5 h-5 text-sage" /> },
        { week: 10, title: "NIPT Test", category: "Test", trimester: '1', status: 'past', tip: "Drink plenty of water before your blood draw.", icon: <FileText className="w-5 h-5 text-muted" /> },
        { week: 16, title: "Gender Reveal/Movement", category: "Milestone", trimester: '2', status: 'past', tip: "Start paying attention to 'flutters'—that's baby!", icon: <Baby className="w-5 h-5 text-orange-400" /> },
        { week: 20, title: "Anatomy Scan", category: "Ultrasound", trimester: '2', status: 'current', tip: "The big ultrasound! Try eating something sweet beforehand if baby is sleepy.", icon: <Sparkles className="w-5 h-5 text-rose-400" /> },
        { week: 24, title: "Glucose Test", category: "Test", trimester: '2', status: 'upcoming', tip: "Schedule your test early in the morning.", icon: <Pill className="w-5 h-5 text-slate-400" /> },
        { week: 30, title: "Birth Plan", category: "Check-in", trimester: '3', status: 'upcoming', tip: "Discuss pain management options with your partner.", icon: <FileText className="w-5 h-5 text-slate-400" /> },
        { week: 36, title: "Hospital Bag", category: "Milestone", trimester: '3', status: 'upcoming', tip: "Pack a comfortable robe and cozy socks.", icon: <Heart className="w-5 h-5 text-slate-400" /> },
        { week: 40, title: "Delivery", category: "Milestone", trimester: '3', status: 'upcoming', tip: "Rest as much as you can. It's almost time!", icon: <User className="w-5 h-5 text-slate-400" /> },
    ];

    useEffect(() => {
        // Auto-scroll to current week on mount
        if (currentWeekRef.current) {
            setTimeout(() => {
                currentWeekRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [activeFilter]);

    const filteredMilestones = milestones.filter(m => activeFilter === 'all' || m.trimester === activeFilter);

    const FilterPill = ({ label, value }) => (
        <button
            onClick={() => setActiveFilter(value)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeFilter === value
                ? 'bg-sage text-white shadow-soft'
                : 'bg-white text-slate-500 hover:bg-cream border border-slate-200'
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {/* Elegant Hero Countdown */}
            <Card className="rounded-[32px] border-none shadow-portal-card overflow-hidden bg-white" styles={{ body: { padding: '40px' } }}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left flex-1">
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-800 mb-2 tracking-tight">Forty Weeks of Wonder</h2>
                        <p className="text-xl font-medium text-muted mb-6">You are {progressPercent}% of the way there.</p>

                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-sm font-bold text-slate-400">Week 0</span>
                            <Progress percent={progressPercent} showInfo={false} strokeColor="#A3B18A" trailColor="#F9F7F2" strokeWidth={12} className="flex-1" />
                            <span className="text-sm font-bold text-slate-400">Week 40</span>
                        </div>
                    </div>
                    <div className="bg-cream border-2 border-sage/30 px-8 py-6 rounded-[32px] text-center shrink-0 shadow-sm relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-sage text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Current</div>
                        <span className="block text-4xl font-bold font-serif text-slate-800">Week {currentWeek}</span>
                        <span className="block text-sage font-semibold mt-1">
                            {userProfile?.firstName ? `${userProfile.firstName}'s Journey` : 'Milestone Track'}
                        </span>
                    </div>
                </div>
            </Card>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <FilterPill label="All Timeline" value="all" />
                <FilterPill label="Trimester 1" value="1" />
                <FilterPill label="Trimester 2" value="2" />
                <FilterPill label="Trimester 3" value="3" />
            </div>

            {/* Custom Timeline Cards */}
            <div className="flex flex-col gap-6 mb-10">
                {filteredMilestones.map((m) => (
                    <div
                        key={m.week}
                        ref={m.status === 'current' ? currentWeekRef : null}
                        className={`flex gap-6 relative animate-fade-in group ${m.status === 'upcoming' ? 'opacity-70 grayscale-[50%]' : ''}`}
                    >
                        {/* Left Axis Line & Icon */}
                        <div className="flex flex-col items-center">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 z-10 ${m.status === 'past' ? 'bg-cream border-2 border-sage text-sage' :
                                m.status === 'current' ? 'bg-sage text-white shadow-soft ring-4 ring-cream' :
                                    'bg-slate-100 border-2 border-slate-200'
                                }`}>
                                {m.status === 'current' ? <Sparkles className="w-6 h-6" /> : m.icon}
                            </div>
                            <div className="w-1 bg-slate-200 flex-1 my-2 rounded-full opacity-50 group-last:hidden"></div>
                        </div>

                        {/* Content Card */}
                        <Card
                            className={`flex-1 rounded-[24px] border-none shadow-portal-card transition-all ${m.status === 'current' ? 'ring-2 ring-sage shadow-soft-hover scale-[1.01]' : 'hover:shadow-md'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold font-serif text-slate-800">Week {m.week}: {m.title}</h3>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold w-max ${m.status === 'current' ? 'bg-sage/10 text-sage' :
                                    'bg-slate-100 text-muted'
                                    }`}>
                                    {m.category}
                                </span>
                            </div>

                            <div className="bg-cream/50 p-4 rounded-xl flex items-start gap-3">
                                <CalendarDays className="w-5 h-5 text-muted mt-0.5 shrink-0" />
                                <div>
                                    <strong className="text-slate-700 block mb-1">Daily Suggestion</strong>
                                    <p className="text-slate-600">{m.tip}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
