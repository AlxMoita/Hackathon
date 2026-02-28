import { useState } from 'react';
import { Button, Input, DatePicker, Switch, Checkbox, Modal, message, Select } from 'antd';
import { ArrowLeft, ArrowRight, Check, HeartHandshake, Calendar as CalendarIcon, User, Info, Activity, Loader2 } from 'lucide-react';
import { saveUserProfile } from '../lib/firebase';

export default function OnboardingFlow({ onComplete }) {
    const [step, setStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [isLmpModalOpen, setIsLmpModalOpen] = useState(false);

    // Initial State mapping
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        lmpDate: '', // ISO string e.g. "2026-03-12"
        isFirstPregnancy: true,
        pregnancyCount: 1,
        hasConditions: false,
        conditions: [],
        otherCondition: '',
        supportSystem: []
    });

    const conditionOptions = [
        'Gestational Diabetes', 'High Blood Pressure', 'Thyroid',
        'PCOS', 'Anxiety/Depression', 'Other'
    ];

    const supportOptions = [
        'Partner', 'Family', 'Friends', 'Doula/Midwife', 'Solo'
    ];

    const handleNext = () => setStep(s => Math.min(s + 1, 5));
    const handleBack = () => setStep(s => Math.max(s - 1, 1));

    const updateForm = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

    const toggleArrayItem = (arrayName, item) => {
        setFormData(prev => {
            const array = prev[arrayName];
            if (array.includes(item)) {
                return { ...prev, [arrayName]: array.filter(i => i !== item) };
            } else {
                return { ...prev, [arrayName]: [...array, item] };
            }
        });
    };

    const handleFinalSubmit = async () => {
        setIsSaving(true);
        try {
            // Mock a UID for the scope of onboarding without full Firebase Auth login
            const mockUid = `user-${Date.now()}`;
            await saveUserProfile(mockUid, formData);

            message.success('Profile Created Successfully!');
            setTimeout(() => {
                onComplete(formData);
                setIsSaving(false);
            }, 800);
        } catch (error) {
            message.error('Failed to save profile. Please try again.');
            setIsSaving(false);
        }
    };

    const renderStepIndicators = () => (
        <div className="flex justify-center gap-2 mb-12">
            {[1, 2, 3, 4, 5].map(i => (
                <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-12 bg-sage' : i < step ? 'w-8 bg-sage/40' : 'w-8 bg-slate-200'
                        }`}
                />
            ))}
        </div>
    );

    const PillInput = ({ ...props }) => (
        <Input
            {...props}
            size="large"
            className="rounded-full px-6 py-4 text-lg border-slate-200 hover:border-sage focus:border-sage shadow-sm"
        />
    );

    const Step1 = () => (
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-center gap-3 mb-8">
                <User className="w-8 h-8 text-sage" />
                <h2 className="text-4xl font-bold font-serif text-slate-800 text-center">Let's get to know you</h2>
            </div>
            <div className="space-y-4 max-w-md mx-auto">
                <PillInput
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => updateForm('firstName', e.target.value)}
                />
                <PillInput
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => updateForm('lastName', e.target.value)}
                />
                <PillInput
                    placeholder="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                />
            </div>
            <div className="flex justify-end max-w-md mx-auto mt-10">
                <Button
                    type="primary"
                    className="bg-sage hover:!bg-sage-btn !border-none rounded-full h-14 px-8 text-lg font-bold w-full sm:w-auto shadow-soft flex items-center justify-center"
                    onClick={handleNext}
                    disabled={!formData.firstName || !formData.email}
                >
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </div>
    );

    const Step2 = () => {
        // Safe UI formatting for the picked ISO string
        let formattedDisplayDate = "Select a date";
        if (formData.lmpDate) {
            try {
                // Parse "YYYY-MM-DD" reliably adjusting for local timezones
                const lmpStr = formData.lmpDate.split('-');
                const localDateObj = new Date(lmpStr[0], lmpStr[1] - 1, lmpStr[2]);
                formattedDisplayDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(localDateObj);
            } catch (e) {
                formattedDisplayDate = formData.lmpDate;
            }
        }

        return (
            <div className="animate-fade-in space-y-6">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <CalendarIcon className="w-8 h-8 text-sage" />
                    <h2 className="text-4xl font-bold font-serif text-slate-800 text-center">When did your journey begin?</h2>
                </div>

                <div className="max-w-md mx-auto bg-white p-8 rounded-[32px] shadow-portal-card border border-slate-100 flex flex-col items-center gap-6">
                    <label className="text-slate-600 font-medium text-lg text-center">Select your Last Menstrual Period (LMP)</label>

                    {formData.lmpDate && (
                        <div className="bg-sage/10 text-sage px-6 py-2 rounded-full font-bold text-lg mb-2">
                            {formattedDisplayDate}
                        </div>
                    )}

                    {/* The Calendar Fix: explicitly forcing IS0 8601 formatting */}
                    <DatePicker
                        className="rounded-full px-6 py-4 w-full text-lg border-slate-200 hover:border-sage focus:border-sage shadow-sm"
                        format="MMMM D, YYYY"
                        onChange={(date) => {
                            if (date) {
                                const isoString = date.format('YYYY-MM-DD');
                                updateForm('lmpDate', isoString);
                            } else {
                                updateForm('lmpDate', '');
                            }
                        }}
                        size="large"
                    />

                    <button
                        className="text-sage font-semibold flex items-center gap-1 hover:text-sage-btn transition-colors mt-2 underline underline-offset-4 decoration-sage/30"
                        onClick={() => setIsLmpModalOpen(true)}
                    >
                        <Info className="w-4 h-4" /> Why do we need this?
                    </button>

                    <Modal
                        open={isLmpModalOpen}
                        onCancel={() => setIsLmpModalOpen(false)}
                        footer={null}
                        centered
                        className="rounded-[32px]"
                    >
                        <div className="text-center py-6">
                            <div className="bg-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-sage">
                                <CalendarIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold font-serif text-slate-800 mb-2">Calculating Your Timeline</h3>
                            <p className="text-slate-600 text-lg">
                                LMP stands for the first day of your last period. Medical professionals globally use this specific date to accurately calculate your gestational age, due date, and upcoming baby milestones!
                            </p>
                            <Button
                                className="mt-6 bg-sage hover:!bg-sage-btn text-white rounded-full px-8 h-12 font-bold border-none"
                                onClick={() => setIsLmpModalOpen(false)}
                            >
                                Got it!
                            </Button>
                        </div>
                    </Modal>

                </div>

                <div className="flex justify-between max-w-md mx-auto mt-10">
                    <Button onClick={handleBack} className="rounded-full h-14 px-8 text-lg font-semibold border-slate-200 text-slate-500 hover:!text-sage hover:!border-sage shadow-sm flex items-center justify-center">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                    </Button>
                    <Button
                        type="primary"
                        className="bg-sage hover:!bg-sage-btn !border-none rounded-full h-14 px-8 text-lg font-bold shadow-soft flex items-center justify-center"
                        onClick={handleNext}
                        disabled={!formData.lmpDate}
                    >
                        Continue <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        )
    };

    const Step3 = () => (
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-center gap-3 mb-8">
                <Activity className="w-8 h-8 text-sage" />
                <h2 className="text-4xl font-bold font-serif text-slate-800 text-center">History & Experience</h2>
            </div>

            <div className="max-w-md mx-auto space-y-8">
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-700">Is this your first pregnancy?</span>
                    <Switch
                        checked={formData.isFirstPregnancy}
                        onChange={(checked) => updateForm('isFirstPregnancy', checked)}
                        className={`${formData.isFirstPregnancy ? 'bg-sage' : 'bg-slate-300'}`}
                    />
                </div>

                {!formData.isFirstPregnancy && (
                    <div className="bg-white p-8 rounded-[32px] shadow-portal-card border border-slate-100 animate-fade-in text-center flex flex-col items-center">
                        <span className="text-lg font-bold text-slate-700 block mb-4">How many previous pregnancies?</span>

                        {/* Custom Select Wheel equivalent designed with Cream/Sage aesthetic */}
                        <Select
                            value={formData.pregnancyCount}
                            onChange={(val) => updateForm('pregnancyCount', val)}
                            size="large"
                            popupClassName="rounded-[24px] shadow-portal-card border-slate-100"
                            className="w-32 text-center text-xl font-bold"
                            style={{
                                '--ant-color-border': '#e2e8f0',
                                '--ant-color-primary': '#A3B18A',
                                '--ant-color-primary-hover': '#A3B18A',
                                '--ant-border-radius-base': '32px'
                            }}
                            options={Array.from({ length: 10 }, (_, i) => ({
                                value: i + 1,
                                label: <span className="font-bold text-lg">{i + 1}</span>,
                            }))}
                        />
                        <p className="text-sm text-slate-400 mt-4">Required to personalize health screening timelines.</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between max-w-md mx-auto mt-10">
                <Button onClick={handleBack} className="rounded-full h-14 px-8 text-lg font-semibold border-slate-200 text-slate-500 hover:!text-sage hover:!border-sage shadow-sm flex items-center justify-center">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                    type="primary"
                    className="bg-sage hover:!bg-sage-btn !border-none rounded-full h-14 px-8 text-lg font-bold shadow-soft flex items-center justify-center"
                    onClick={handleNext}
                >
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </div>
    );

    const Step4 = () => (
        <div className="animate-fade-in space-y-6">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
                <h2 className="text-4xl font-bold font-serif text-slate-800 text-center">Health & Wellness</h2>
                <p className="text-slate-500 text-lg">We use this to customize your tips and alerts.</p>
            </div>

            <div className="max-w-lg mx-auto space-y-6">
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-sage transition-colors"
                    onClick={() => updateForm('hasConditions', !formData.hasConditions)}>
                    <Checkbox checked={formData.hasConditions} className="scale-125" />
                    <span className="text-lg font-bold text-slate-700 select-none">I have pre-existing health conditions I'd like to track.</span>
                </div>

                {formData.hasConditions && (
                    <div className="bg-white p-8 rounded-[32px] shadow-portal-card border border-slate-100 animate-fade-in">
                        <span className="text-slate-500 font-medium mb-4 block">Select all that apply:</span>
                        <div className="flex flex-wrap gap-3">
                            {conditionOptions.map(cond => (
                                <button
                                    key={cond}
                                    onClick={() => toggleArrayItem('conditions', cond)}
                                    className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-200 border ${formData.conditions.includes(cond)
                                            ? 'bg-sage/10 border-sage text-sage'
                                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-sage/50'
                                        }`}
                                >
                                    {cond}
                                </button>
                            ))}
                        </div>

                        {formData.conditions.includes('Other') && (
                            <div className="mt-6 animate-fade-in">
                                <PillInput
                                    placeholder="Please specify..."
                                    value={formData.otherCondition}
                                    onChange={(e) => updateForm('otherCondition', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex justify-between max-w-lg mx-auto mt-10">
                <Button onClick={handleBack} className="rounded-full h-14 px-8 text-lg font-semibold border-slate-200 text-slate-500 hover:!text-sage hover:!border-sage shadow-sm flex items-center justify-center">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                    type="primary"
                    className="bg-sage hover:!bg-sage-btn !border-none rounded-full h-14 px-8 text-lg font-bold shadow-soft flex items-center justify-center"
                    onClick={handleNext}
                >
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </div>
    );

    const Step5 = () => (
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-center gap-3 mb-8">
                <HeartHandshake className="w-8 h-8 text-sage" />
                <h2 className="text-4xl font-bold font-serif text-slate-800 text-center">Your Village</h2>
            </div>

            <div className="max-w-lg mx-auto bg-white p-8 rounded-[32px] shadow-portal-card border border-slate-100 flex flex-col items-center gap-6 text-center">
                <label className="text-slate-600 font-medium text-lg">Who is walking this path with you?</label>

                <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {supportOptions.map(opt => (
                        <button
                            key={opt}
                            onClick={() => toggleArrayItem('supportSystem', opt)}
                            className={`px-6 py-3 rounded-full font-bold transition-all duration-200 border-2 text-lg disabled:opacity-50 ${formData.supportSystem.includes(opt)
                                    ? 'bg-sage border-sage text-white shadow-soft transform scale-105'
                                    : 'bg-white border-slate-200 text-slate-500 hover:border-sage'
                                }`}
                            disabled={isSaving}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-between max-w-lg mx-auto mt-10">
                <Button onClick={handleBack} className="rounded-full h-14 px-8 text-lg font-semibold border-slate-200 text-slate-500 hover:!text-sage hover:!border-sage shadow-sm flex items-center justify-center" disabled={isSaving}>
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                    type="primary"
                    className="bg-sage hover:!bg-sage-btn !border-none rounded-full h-14 px-10 text-xl font-bold shadow-soft flex items-center justify-center gap-2"
                    onClick={handleFinalSubmit}
                    disabled={formData.supportSystem.length === 0 || isSaving}
                >
                    {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Check className="w-6 h-6" />}
                    {isSaving ? "Saving..." : "Begin My Journey"}
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                {renderStepIndicators()}

                <div className="min-h-[400px]">
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                    {step === 5 && <Step5 />}
                </div>
            </div>
        </div>
    );
}
