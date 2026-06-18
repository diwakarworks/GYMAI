import { Link, Navigate } from "react-router-dom";
import { Zap, Target, Calendar, ArrowRight, Sparkles, Clock, Brain, Dumbbell } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

const planDays = [
  { label: "MON", name: "Push — Chest / Shoulders", pct: 90, sets: "18 sets" },
  { label: "TUE", name: "Pull — Back / Biceps",     pct: 85, sets: "16 sets" },
  { label: "WED", name: "Rest / Active recovery",   pct: 0,  sets: "—"       },
  { label: "THU", name: "Legs — Quad focus",         pct: 95, sets: "20 sets" },
  { label: "FRI", name: "Arms + Core",               pct: 70, sets: "14 sets" },
];

const steps = [
  { num: "01", icon: Zap,      title: "Tell us about yourself",  desc: "Your goal, fitness level, days per week, and available equipment." },
  { num: "02", icon: Brain,    title: "AI builds your program",  desc: "Our model creates a periodized plan optimized for your exact inputs." },
  { num: "03", icon: Dumbbell, title: "Train and adapt",         desc: "Log sessions. The plan adapts weekly — progressive overload automated." },
];

const features = [
  { tag: "AI-powered",  icon: Sparkles, title: "Not a template. A real program.",          desc: "GymAI generates unique training logic based on your body, goals, and time — down to set counts, rest periods, and exercise order." },
  { tag: "Progressive", icon: Target,   title: "Overload built into every week",           desc: "Volume and intensity increase week-over-week using periodization principles — the same science elite athletes use." },
  { tag: "Adaptive",    icon: Calendar, title: "Missed a session? The plan adjusts.",      desc: "Life happens. GymAI recalculates your remaining week and keeps you on track without burning you out." },
  { tag: "Any goal",    icon: Clock,    title: "Hypertrophy, strength, fat loss, endurance", desc: "Distinct training approaches per goal — not a one-size plan with a label swapped." },
];

const testimonials = [
  { initials: "RK", quote: "I've tried Fitbod, JEFIT, even hired a PT. Nothing stuck like GymAI. The plan actually feels like it was written for me — because it was.", author: "Rahul K. · Gained 8kg in 16 weeks" },
  { initials: "SM", quote: "Went from not knowing what to do at the gym to having a full program in under a minute. The progressive overload feature alone is worth it.", author: "Sneha M. · Lost 12kg, kept the muscle" },
  { initials: "AP", quote: "I train 3 days a week with a home gym. Most apps assume a full commercial gym. GymAI actually works with what I have.", author: "Arjun P. · Home gym athlete" },
];

const stats = [
  { num: "47,000+", label: "Plans generated" },
  { num: "4.9★",   label: "Avg rating"       },
  { num: "8s",      label: "To your first plan" },
  { num: "100%",    label: "Personalized"     },
];

export default function Home() {
  const { user, isLoading } = useAuth();
  if (!isLoading && user) return <Navigate to="/profile" replace />;

  return (
    <div style={{ background: "var(--color-background)", color: "var(--color-foreground)", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>

      {/* ── NAV ── */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2rem", borderBottom: "1px solid var(--color-border)", maxWidth: 1100, margin: "0 auto" }}>
        <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: 1 }}>
          GYM<span style={{ color: "var(--color-accent)" }}>AI</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <a href="#how"      style={{ color: "var(--color-muted)", fontSize: 13, textDecoration: "none" }}>How it works</a>
          <a href="#features" style={{ color: "var(--color-muted)", fontSize: 13, textDecoration: "none" }}>Features</a>
          <Link to="/onboarding"><Button size="sm">Start free</Button></Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem 4rem" }}>

        {/* left */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--color-card)", border: "1px solid var(--color-border)", padding: "6px 14px", fontSize: 12, color: "var(--color-muted)", marginBottom: "1.5rem", borderRadius: 4 }}>
            <span style={{ width: 6, height: 6, background: "var(--color-accent)", borderRadius: "50%", display: "inline-block" }} />
            AI plans generating live
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 68, lineHeight: 0.95, letterSpacing: -2, marginBottom: "1.5rem" }}>
            TRAIN<br />SMARTER<br />
            <span style={{ color: "var(--color-accent)" }}>NOT HARDER</span>
          </h1>
          <p style={{ color: "var(--color-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: "2rem", maxWidth: 420 }}>
            GymAI builds your exact training program in seconds — tailored to your goal, schedule, and fitness level. No templates. No guesswork.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/onboarding">
              <Button size="lg">
                Build my plan <ArrowRight style={{ width: 16, height: 16, marginLeft: 6 }} />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button variant="secondary" size="lg">See a sample</Button>
            </Link>
          </div>
        </div>

        {/* right — plan preview */}
        <div style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{ fontSize: 11, color: "var(--color-muted)", letterSpacing: 1, textTransform: "uppercase" }}>
            Your AI plan — generated in 8s
          </span>

          <div style={{ background: "var(--color-background)", border: "1px solid var(--color-border)", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Hypertrophy · 4 days/week</span>
              <span style={{ background: "var(--color-card)", color: "var(--color-accent)", fontSize: 10, padding: "3px 8px", border: "1px solid var(--color-border)", letterSpacing: 0.5 }}>
                Intermediate
              </span>
            </div>

            {planDays.map((d, i) => (
              <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < planDays.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                <span style={{ fontSize: 10, color: "var(--color-muted)", width: 28, textTransform: "uppercase", letterSpacing: 0.5 }}>{d.label}</span>
                <span style={{ fontSize: 13, color: d.pct === 0 ? "var(--color-muted)" : "var(--color-foreground)", flex: 1 }}>{d.name}</span>
                <div style={{ height: 3, background: "var(--color-border)", width: 80, borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${d.pct}%`, background: d.pct === 0 ? "var(--color-border)" : "var(--color-accent)", borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 11, color: "var(--color-muted)", width: 40, textAlign: "right" }}>{d.sets}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "var(--color-border)" }}>
            {[["68", "sets/week"], ["55m", "avg session"], ["12w", "program"]].map(([num, lbl]) => (
              <div key={lbl} style={{ background: "var(--color-background)", padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "var(--color-accent)", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 10, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{ background: "var(--color-card)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "1.25rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: "3rem", justifyContent: "space-between", flexWrap: "wrap" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "var(--color-accent)" }}>{s.num}</span>
              <span style={{ fontSize: 12, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ fontSize: 11, color: "var(--color-accent)", letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>How it works</div>
        <h2 style={{ fontWeight: 900, fontSize: 44, lineHeight: 1, marginBottom: "3rem" }}>THREE STEPS.<br />ONE PERFECT PLAN.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--color-border)" }}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} style={{ background: "var(--color-background)", padding: "2rem" }}>
                <div style={{ fontSize: 56, fontWeight: 900, color: "var(--color-border)", lineHeight: 1, marginBottom: "1rem" }}>{step.num}</div>
                <div style={{ width: 40, height: 40, background: "var(--color-card)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", borderRadius: 4 }}>
                  <Icon style={{ width: 18, height: 18, color: "var(--color-accent)" }} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.7 }}>{step.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div style={{ height: 1, background: "var(--color-border)", margin: "0 2rem" }} />

      {/* ── FEATURES ── */}
      <section id="features" style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ fontSize: 11, color: "var(--color-accent)", letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>Why GymAI</div>
        <h2 style={{ fontWeight: 900, fontSize: 44, lineHeight: 1, marginBottom: "0.75rem" }}>BUILT FOR<br />REAL ATHLETES.</h2>
        <p style={{ color: "var(--color-muted)", fontSize: 15, maxWidth: 500, lineHeight: 1.7, marginBottom: "3rem" }}>
          Every feature exists to get you stronger, leaner, and more consistent.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "var(--color-border)" }}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.tag} variant="bordered" style={{ borderRadius: 0, border: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                  <div style={{ width: 32, height: 32, background: "var(--color-background)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}>
                    <Icon style={{ width: 15, height: 15, color: "var(--color-accent)" }} />
                  </div>
                  <span style={{ background: "var(--color-background)", color: "var(--color-accent)", fontSize: 10, padding: "3px 10px", letterSpacing: 1, textTransform: "uppercase", border: "1px solid var(--color-border)" }}>
                    {f.tag}
                  </span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.7 }}>{f.desc}</div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <div style={{ background: "var(--color-card)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "3rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", maxWidth: 1100, margin: "0 auto" }}>
          {testimonials.map((t) => (
            <div key={t.initials}>
              <p style={{ fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "1rem" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, background: "var(--color-border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "var(--color-accent)" }}>
                  {t.initials}
                </div>
                <span style={{ fontSize: 12, color: "var(--color-muted)" }}>{t.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ textAlign: "center", padding: "5rem 2rem 4rem", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontSize: 11, color: "var(--color-accent)", letterSpacing: 2, textTransform: "uppercase", marginBottom: "1.5rem" }}>Start today · free forever</div>
        <h2 style={{ fontWeight: 900, fontSize: 56, lineHeight: 0.95, marginBottom: "1.5rem" }}>
          STOP WASTING<br />TIME AT THE GYM.
        </h2>
        <p style={{ color: "var(--color-muted)", fontSize: 15, marginBottom: "2.5rem", lineHeight: 1.7 }}>
          You don't need a personal trainer at ₹5,000/month. You need a smarter plan. Get yours in 8 seconds.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/onboarding">
            <Button size="lg">
              Build my free plan <ArrowRight style={{ width: 16, height: 16, marginLeft: 6 }} />
            </Button>
          </Link>
          <Link to="/onboarding">
            <Button variant="secondary" size="lg">See how it works</Button>
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: "1px solid var(--color-border)", padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
        <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: 1 }}>
          GYM<span style={{ color: "var(--color-accent)" }}>AI</span>
        </span>
        <span style={{ fontSize: 12, color: "var(--color-muted)" }}>Built with AI · For athletes</span>
      </div>

    </div>
  );
}