import { useState } from "react";

const milestones = [
  {
    week: 4,
    trimester: 1,
    title: "Pregnancy Confirmed",
    emoji: "🌱",
    description: "Your baby is the size of a poppy seed. The embryo is implanting into the uterine wall.",
    checkins: ["Schedule your first prenatal appointment", "Start prenatal vitamins with folic acid", "Avoid alcohol, smoking, and certain medications"],
    babySize: "Poppy seed (1mm)",
    color: "#F9A8D4",
  },
  {
    week: 8,
    trimester: 1,
    title: "Heartbeat Detected",
    emoji: "💓",
    description: "Baby's heart is beating! Tiny fingers and toes are forming. Morning sickness may peak.",
    checkins: ["First ultrasound (transvaginal)", "Discuss genetic screening options", "Blood tests & Rh factor check"],
    babySize: "Raspberry (1.6cm)",
    color: "#FDA4AF",
  },
  {
    week: 12,
    trimester: 1,
    title: "End of First Trimester",
    emoji: "🌸",
    description: "Risk of miscarriage drops significantly. Baby can make facial expressions and has fingernails!",
    checkins: ["Nuchal translucency ultrasound", "First trimester screening bloodwork", "Share your news if you feel ready"],
    babySize: "Lime (5.4cm)",
    color: "#F87171",
  },
  {
    week: 16,
    trimester: 2,
    title: "Feeling More Energized",
    emoji: "✨",
    description: "You may feel baby's first movements soon (quickening). Baby can hear your voice!",
    checkins: ["Quad screen blood test (15-20 weeks)", "Discuss birth plan ideas", "Consider childbirth classes"],
    babySize: "Avocado (11.6cm)",
    color: "#86EFAC",
  },
  {
    week: 20,
    trimester: 2,
    title: "Anatomy Scan",
    emoji: "👶",
    description: "The big milestone ultrasound! Baby's organs are all forming. You're halfway there!",
    checkins: ["Anatomy ultrasound (level 2)", "Option to learn baby's sex", "Check placenta position"],
    babySize: "Banana (16.4cm)",
    color: "#6EE7B7",
  },
  {
    week: 24,
    trimester: 2,
    title: "Viability Milestone",
    emoji: "🌟",
    description: "Baby reaches viability — could survive outside the womb with medical support. Baby's face is fully formed!",
    checkins: ["Glucose challenge test (24-28 weeks)", "Discuss preterm labor signs", "Start kick counts"],
    babySize: "Corn (30cm)",
    color: "#34D399",
  },
  {
    week: 28,
    trimester: 3,
    title: "Third Trimester Begins",
    emoji: "🌙",
    description: "Baby's brain is developing rapidly. Eyes can open and close. You may feel Braxton Hicks contractions.",
    checkins: ["Glucose tolerance test", "RhoGAM shot if Rh-negative", "Begin kick count tracking daily"],
    babySize: "Eggplant (37cm)",
    color: "#A78BFA",
  },
  {
    week: 32,
    trimester: 3,
    title: "Baby Positioning",
    emoji: "🤰",
    description: "Baby is likely head-down now. Lungs continue maturing. You may feel more shortness of breath.",
    checkins: ["Group B Strep test (35-37 weeks)", "Finalize birth plan", "Tour birthing center / hospital"],
    babySize: "Squash (42cm)",
    color: "#818CF8",
  },
  {
    week: 36,
    trimester: 3,
    title: "Almost Full Term",
    emoji: "🏠",
    description: "Baby is considered early term at 37 weeks. Most organs are fully developed. Pack your hospital bag!",
    checkins: ["Weekly prenatal visits begin", "Group B Strep test results", "Install infant car seat"],
    babySize: "Honeydew (47cm)",
    color: "#60A5FA",
  },
  {
    week: 40,
    trimester: 3,
    title: "Due Date! 🎉",
    emoji: "🎀",
    description: "Full term! Baby is ready to meet the world. Most babies arrive between weeks 38-42.",
    checkins: ["Discuss induction options if overdue", "Watch for labor signs", "Rest and stay hydrated"],
    babySize: "Watermelon (51cm)",
    color: "#F472B6",
  },
];

const trimesterColors = {
  1: { bg: "rgba(254,205,211,0.15)", label: "First Trimester", accent: "#FB7185" },
  2: { bg: "rgba(167,243,208,0.15)", label: "Second Trimester", accent: "#34D399" },
  3: { bg: "rgba(167,139,250,0.15)", label: "Third Trimester", accent: "#A78BFA" },
};

export default function PregnancyTimeline() {
  const [selected, setSelected] = useState(milestones[0]);
  const [hoveredWeek, setHoveredWeek] = useState(null);

  const progress = ((selected.week - 4) / (40 - 4)) * 100;

  return (
    <div style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      background: "linear-gradient(135deg, #FFF5F7 0%, #FFF0FB 50%, #F0F4FF 100%)",
      minHeight: "100vh",
      padding: "2rem 1rem",
      color: "#2D2535",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .milestone-btn {
          cursor: pointer;
          border: none;
          background: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .milestone-btn:hover { transform: translateY(-4px); }
        .milestone-btn.active { transform: translateY(-6px); }

        .checkin-item {
          animation: fadeSlide 0.4s ease forwards;
          opacity: 0;
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .checkin-item:nth-child(1) { animation-delay: 0.05s; }
        .checkin-item:nth-child(2) { animation-delay: 0.15s; }
        .checkin-item:nth-child(3) { animation-delay: 0.25s; }

        .detail-card {
          animation: cardIn 0.35s ease;
        }
        @keyframes cardIn {
          from { opacity: 0.4; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        .progress-fill {
          transition: width 0.6s cubic-bezier(.34,1.56,.64,1);
        }

        @media (max-width: 700px) {
          .layout { flex-direction: column !important; }
          .sidebar { min-width: unset !important; width: 100% !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, letterSpacing: "0.25em", fontSize: "0.75rem", color: "#B06E8A", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Your Journey
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, fontStyle: "italic", color: "#2D2535", lineHeight: 1.1 }}>
          Pregnancy Milestones
        </h1>
        <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "1rem", color: "#7A5C72", marginTop: "0.5rem" }}>
          40 weeks of wonder — track every precious moment
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ maxWidth: 700, margin: "0 auto 2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Lato',sans-serif", fontSize: "0.72rem", color: "#B06E8A", marginBottom: "0.4rem" }}>
          <span>Week 4</span>
          <span style={{ fontWeight: 700, color: selected.color }}>Week {selected.week} — {Math.round(progress)}% complete</span>
          <span>Week 40</span>
        </div>
        <div style={{ height: 10, background: "#F3D9E4", borderRadius: 99, overflow: "hidden" }}>
          <div className="progress-fill" style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, #FDA4AF, ${selected.color})`, borderRadius: 99 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          {[1,2,3].map(t => (
            <span key={t} style={{ fontFamily: "'Lato',sans-serif", fontSize: "0.7rem", color: trimesterColors[t].accent, fontWeight: 700, letterSpacing: "0.05em" }}>
              {trimesterColors[t].label}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline Dots */}
      <div style={{ maxWidth: 800, margin: "0 auto 2.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end", minWidth: "max-content", padding: "0.5rem 1rem" }}>
          {milestones.map((m) => {
            const isActive = selected.week === m.week;
            const isHovered = hoveredWeek === m.week;
            return (
              <button
                key={m.week}
                className={`milestone-btn${isActive ? " active" : ""}`}
                onClick={() => setSelected(m)}
                onMouseEnter={() => setHoveredWeek(m.week)}
                onMouseLeave={() => setHoveredWeek(null)}
                title={`Week ${m.week}: ${m.title}`}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}
              >
                <div style={{
                  width: isActive ? 60 : isHovered ? 52 : 44,
                  height: isActive ? 60 : isHovered ? 52 : 44,
                  borderRadius: "50%",
                  background: isActive ? `radial-gradient(circle at 35% 35%, white, ${m.color})` : "white",
                  border: `3px solid ${isActive ? m.color : "#F3D9E4"}`,
                  boxShadow: isActive ? `0 0 0 4px ${m.color}33, 0 8px 20px ${m.color}55` : isHovered ? `0 4px 12px ${m.color}44` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isActive ? "1.6rem" : "1.2rem",
                  transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
                }}>
                  {m.emoji}
                </div>
                <span style={{
                  fontFamily: "'Lato',sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? m.color : "#B06E8A",
                  letterSpacing: "0.03em",
                  transition: "color 0.2s",
                }}>
                  W{m.week}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Card */}
      <div key={selected.week} className="detail-card" style={{
        maxWidth: 800,
        margin: "0 auto",
        background: "white",
        borderRadius: 24,
        boxShadow: `0 4px 40px ${selected.color}33`,
        border: `1.5px solid ${selected.color}44`,
        overflow: "hidden",
      }}>
        {/* Card Header */}
        <div style={{
          background: `linear-gradient(135deg, ${selected.color}22, ${selected.color}44)`,
          padding: "2rem 2.5rem 1.5rem",
          borderBottom: `1.5px solid ${selected.color}33`,
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, white, ${selected.color})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2.5rem",
            boxShadow: `0 6px 20px ${selected.color}66`,
            flexShrink: 0,
          }}>
            {selected.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
              <span style={{
                fontFamily: "'Lato',sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "white",
                background: selected.color,
                padding: "0.2rem 0.7rem",
                borderRadius: 99,
              }}>
                Week {selected.week}
              </span>
              <span style={{
                fontFamily: "'Lato',sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: selected.color,
                background: `${selected.color}22`,
                border: `1px solid ${selected.color}55`,
                padding: "0.2rem 0.7rem",
                borderRadius: 99,
              }}>
                {trimesterColors[selected.trimester].label}
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 700, color: "#2D2535" }}>
              {selected.title}
            </h2>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "0.8rem", color: "#B06E8A", marginTop: "0.15rem" }}>
              🍼 Baby's size: <strong>{selected.babySize}</strong>
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="layout" style={{ display: "flex", gap: 0 }}>
          {/* Description */}
          <div style={{ flex: 1, padding: "2rem 2.5rem" }}>
            <h3 style={{ fontSize: "0.7rem", fontFamily: "'Lato',sans-serif", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C084A8", marginBottom: "0.75rem" }}>
              What's Happening
            </h3>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "#4A3A55" }}>
              {selected.description}
            </p>

            {/* Navigation */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
              <button
                onClick={() => { const i = milestones.findIndex(m => m.week === selected.week); if (i > 0) setSelected(milestones[i-1]); }}
                disabled={milestones[0].week === selected.week}
                style={{
                  flex: 1, padding: "0.65rem", borderRadius: 12, border: `1.5px solid ${selected.color}55`,
                  background: "transparent", cursor: "pointer", fontFamily: "'Lato',sans-serif",
                  fontSize: "0.85rem", color: "#B06E8A", transition: "all 0.2s",
                  opacity: milestones[0].week === selected.week ? 0.35 : 1,
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() => { const i = milestones.findIndex(m => m.week === selected.week); if (i < milestones.length-1) setSelected(milestones[i+1]); }}
                disabled={milestones[milestones.length-1].week === selected.week}
                style={{
                  flex: 1, padding: "0.65rem", borderRadius: 12, border: "none",
                  background: selected.color, cursor: "pointer", fontFamily: "'Lato',sans-serif",
                  fontSize: "0.85rem", color: "white", fontWeight: 700, transition: "all 0.2s",
                  opacity: milestones[milestones.length-1].week === selected.week ? 0.35 : 1,
                  boxShadow: `0 4px 12px ${selected.color}66`,
                }}
              >
                Next →
              </button>
            </div>
          </div>

          {/* Checkins */}
          <div className="sidebar" style={{
            minWidth: 260, background: `${selected.color}11`,
            borderLeft: `1.5px solid ${selected.color}33`,
            padding: "2rem",
          }}>
            <h3 style={{ fontSize: "0.7rem", fontFamily: "'Lato',sans-serif", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C084A8", marginBottom: "1rem" }}>
              ✓ Check-ins & Actions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {selected.checkins.map((item, i) => (
                <div key={i} className="checkin-item" style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: selected.color, color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.65rem", fontWeight: 700, flexShrink: 0,
                    fontFamily: "'Lato',sans-serif", marginTop: 2,
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "0.88rem", lineHeight: 1.5, color: "#4A3A55" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p style={{ textAlign: "center", fontFamily: "'Lato',sans-serif", fontSize: "0.72rem", color: "#C4A0B4", marginTop: "2rem", fontStyle: "italic" }}>
        Always consult your healthcare provider for personalized medical advice.
      </p>
    </div>
  );
}
