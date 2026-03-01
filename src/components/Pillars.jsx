import { Card } from 'antd';
import { CalendarHeart, MessageCircleHeart, UsersRound } from 'lucide-react';

export default function Pillars() {
    const pillars = [
        {
            title: "Smart Timeline",
            description: "A week-by-week guide to your baby's growth and your body's changes. Know exactly what to expect.",
            icon: <CalendarHeart className="w-8 h-8 text-sakura" />,
            color: "bg-sakura/10"
        },
        {
            title: "AI Safety Journal",
            description: "A private diary that uses AI to detect and flag potential health risks or emotional distress.",
            icon: <MessageCircleHeart className="w-8 h-8 text-mint" />,
            color: "bg-mint/30"
        },
        {
            title: "Community & Care",
            description: "Connection points for when you need a little extra support from professionals and other mamas.",
            icon: <UsersRound className="w-8 h-8 text-sakura" />,
            color: "bg-sakura/10"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-800 mb-4">Three Pillars of Support</h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">Everything you need to feel confident and cared for throughout your pregnancy journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <Card
                            key={index}
                            hoverable
                            className="border-none shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-2 m-4"
                            styles={{ body: { padding: '40px' } }}
                            style={{ borderRadius: '32px', background: '#FFFDFD' }}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${pillar.color}`}>
                                {pillar.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-800 tracking-tight">{pillar.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {pillar.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
