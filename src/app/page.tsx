"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const COLORS = {
  sage: "#5B8A6E",
  sageLight: "#E8F2EC",
  sageMid: "#9DC0AC",
  teal: "#2B7A77",
  tealLight: "#E0F0EF",
  amber: "#D4845A",
  amberLight: "#FBF0E8",
  navy: "#1E3A5F",
  lavender: "#7B6FA0",
  lavenderLight: "#EEE9F9",
  cream: "#FAF8F4",
  white: "#FFFFFF",
  text: "#1A1A2E",
  textMid: "#4A5568",
  textLight: "#8A9BB0",
  border: "rgba(30,58,95,0.1)",
};

// ─────────────────────────────────────────────────────────────────
//  VIDEO LIBRARY — paste your Vimeo or YouTube URL into videoUrl
//  Vimeo embed:   https://player.vimeo.com/video/YOUR_VIDEO_ID
//  YouTube embed: https://www.youtube.com/embed/YOUR_VIDEO_ID
//  Leave videoUrl as "" until you've uploaded that video.
// ─────────────────────────────────────────────────────────────────
const sessions = [
  // ── MOVE (Beginner) ──────────────────────────────────────────
  { id: 1,  title: "Morning Baduanjin Flow",          pillar: "Move",  duration: 15, level: "Beginner",     completed: true,  videoUrl: "" },
  { id: 2,  title: "Eight Brocades — Introduction",   pillar: "Move",  duration: 12, level: "Beginner",     completed: true,  videoUrl: "" },
  { id: 3,  title: "Standing Posture & Root",         pillar: "Move",  duration: 10, level: "Beginner",     completed: false, videoUrl: "" },
  { id: 4,  title: "Chair-Assisted Baduanjin",        pillar: "Move",  duration: 15, level: "Beginner",     completed: false, videoUrl: "" },
  { id: 5,  title: "PMR Evening Wind-Down",           pillar: "Move",  duration: 15, level: "Beginner",     completed: false, videoUrl: "" },
  { id: 6,  title: "Gentle Joint Warm-Up",            pillar: "Move",  duration: 10, level: "Beginner",     completed: false, videoUrl: "" },
  // ── MOVE (Intermediate) ───────────────────────────────────────
  { id: 7,  title: "Eight Brocades — Full Sequence",  pillar: "Move",  duration: 20, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 8,  title: "Balance & Steady Stance",         pillar: "Move",  duration: 18, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 9,  title: "Baduanjin Flow + Breathwork",     pillar: "Move",  duration: 22, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 10, title: "PMR Deep Muscle Release",         pillar: "Move",  duration: 20, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 11, title: "Spinal Mobility Sequence",        pillar: "Move",  duration: 15, level: "Intermediate", completed: false, videoUrl: "" },
  // ── MOVE (Advanced) ───────────────────────────────────────────
  { id: 12, title: "Baduanjin Master Flow",           pillar: "Move",  duration: 30, level: "Advanced",     completed: false, videoUrl: "" },
  { id: 13, title: "Dynamic Balance Challenge",       pillar: "Move",  duration: 25, level: "Advanced",     completed: false, videoUrl: "" },
  // ── CALM (Beginner) ───────────────────────────────────────────
  { id: 14, title: "Acupressure Calm Reset",          pillar: "Calm",  duration: 10, level: "Beginner",     completed: true,  videoUrl: "" },
  { id: 15, title: "Hand Meridian Sequence",          pillar: "Calm",  duration: 8,  level: "Beginner",     completed: false, videoUrl: "" },
  { id: 16, title: "Ear Acupressure for Sleep",       pillar: "Calm",  duration: 8,  level: "Beginner",     completed: false, videoUrl: "" },
  { id: 17, title: "4-7-8 Breathing Reset",           pillar: "Calm",  duration: 8,  level: "Beginner",     completed: false, videoUrl: "" },
  { id: 18, title: "Foot Reflexology Basics",         pillar: "Calm",  duration: 10, level: "Beginner",     completed: false, videoUrl: "" },
  { id: 19, title: "Morning Nervous System Wake-Up",  pillar: "Calm",  duration: 8,  level: "Beginner",     completed: false, videoUrl: "" },
  // ── CALM (Intermediate) ───────────────────────────────────────
  { id: 20, title: "Breath & Pressure Points",        pillar: "Calm",  duration: 12, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 21, title: "Full Acupressure Body Scan",      pillar: "Calm",  duration: 18, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 22, title: "Cortisol Reset Protocol",         pillar: "Calm",  duration: 15, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 23, title: "Parasympathetic Activation",      pillar: "Calm",  duration: 12, level: "Intermediate", completed: false, videoUrl: "" },
  // ── CALM (Advanced) ───────────────────────────────────────────
  { id: 24, title: "Deep Meridian Flow Session",      pillar: "Calm",  duration: 25, level: "Advanced",     completed: false, videoUrl: "" },
  { id: 25, title: "HRV Coherence Breathing",         pillar: "Calm",  duration: 20, level: "Advanced",     completed: false, videoUrl: "" },
  // ── THINK (Beginner) ──────────────────────────────────────────
  { id: 26, title: "Memory Pattern Challenge",        pillar: "Think", duration: 15, level: "Beginner",     completed: false, videoUrl: "" },
  { id: 27, title: "Name & Face Recall",              pillar: "Think", duration: 12, level: "Beginner",     completed: false, videoUrl: "" },
  { id: 28, title: "Visual Pattern Matching",         pillar: "Think", duration: 10, level: "Beginner",     completed: false, videoUrl: "" },
  { id: 29, title: "Word Association Starter",        pillar: "Think", duration: 10, level: "Beginner",     completed: false, videoUrl: "" },
  { id: 30, title: "Focus & Attention Builder",       pillar: "Think", duration: 12, level: "Beginner",     completed: false, videoUrl: "" },
  // ── THINK (Intermediate) ──────────────────────────────────────
  { id: 31, title: "Working Memory Sprint",           pillar: "Think", duration: 18, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 32, title: "Dual-Task Coordination",          pillar: "Think", duration: 20, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 33, title: "Number Sequence Challenge",       pillar: "Think", duration: 15, level: "Intermediate", completed: false, videoUrl: "" },
  { id: 34, title: "Cognitive Flexibility Drill",     pillar: "Think", duration: 18, level: "Intermediate", completed: false, videoUrl: "" },
  // ── THINK (Advanced) ──────────────────────────────────────────
  { id: 35, title: "Pattern Recognition Boost",       pillar: "Think", duration: 20, level: "Advanced",     completed: false, videoUrl: "" },
  { id: 36, title: "Processing Speed Master Class",   pillar: "Think", duration: 25, level: "Advanced",     completed: false, videoUrl: "" },
];

const wisdomPosts = [
  { id: 1, author: "Margaret, 72", avatar: "M", location: "Portland, OR", content: "After 6 weeks I noticed I could remember names at my book club again. Slow and steady—that's my advice. Don't skip the calm section, it changed my sleep completely.", likes: 47, type: "wisdom" },
  { id: 2, author: "Robert, 68", avatar: "R", location: "Austin, TX", content: "The Eight Brocades felt awkward at first. By week three I was doing it in my backyard at sunrise. Now my grandkids try to copy me.", likes: 83, type: "story" },
  { id: 3, author: "Sylvia, 65", avatar: "S", location: "Tampa, FL", content: "I was skeptical about acupressure. My doctor had nothing to offer for my anxiety. Four weeks in and I sleep through the night. The ear points are magic.", likes: 61, type: "wisdom" },
  { id: 4, author: "James, 74", avatar: "J", location: "Seattle, WA", content: "Tip for newcomers: do the movement section by a chair for balance support until you feel confident. No shame in it—I did it for 2 months.", likes: 39, type: "tip" },
];

const healthMetrics = [
  { label: "Mood", value: 7.5, max: 10, unit: "/10", color: COLORS.sage },
  { label: "Sleep Quality", value: 6.8, max: 10, unit: "/10", color: COLORS.teal },
  { label: "Stress Level", value: 3.2, max: 10, unit: "/10", color: COLORS.lavender, inverted: true },
  { label: "Energy", value: 7.1, max: 10, unit: "/10", color: COLORS.amber },
];

const brainGames = [
  { id: 1, name: "Memory Grid", description: "Match pairs — tests short-term recall", icon: "🧩", difficulty: "Easy", plays: 142 },
  { id: 2, name: "Word Association", description: "Connect words to their meaning quickly", icon: "💬", difficulty: "Medium", plays: 87 },
  { id: 3, name: "Number Sequence", description: "Identify the next number in each series", icon: "🔢", difficulty: "Medium", plays: 64 },
  { id: 4, name: "Visual Pattern", description: "Spot the odd shape in each grid", icon: "👁", difficulty: "Hard", plays: 31 },
];

// Converts any Vimeo or YouTube URL to a clean embed URL
function getEmbedUrl(url) {
  if (!url) return null;
  // Already an embed URL — return as-is
  if (url.includes("player.vimeo.com") || url.includes("youtube.com/embed")) return url;
  // Vimeo watch URL: vimeo.com/123456789
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0&color=5B8A6E`;
  // YouTube watch URL: youtube.com/watch?v=ID or youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
  return url;
}

const pillarColors = { Move: COLORS.sage, Calm: COLORS.teal, Think: COLORS.lavender };
const pillarBg = { Move: COLORS.sageLight, Calm: COLORS.tealLight, Think: COLORS.lavenderLight };

export default function BrainThrive() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPillar, setSelectedPillar] = useState("All");
  const [gameActive, setGameActive] = useState(null);
  const [gameGrid, setGameGrid] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [reportMetrics, setReportMetrics] = useState(healthMetrics.map(m => ({ ...m, today: m.value })));
  const [reportSaved, setReportSaved] = useState(false);
  const [wisdom, setWisdom] = useState("");
  const [wisdomType, setWisdomType] = useState("wisdom");
  const [wisdomPosted, setWisdomPosted] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [sessionActive, setSessionActive] = useState(null);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [poseMsg, setPoseMsg] = useState("");
  const [playlistPrompt, setPlaylistPrompt] = useState("");
  const [playlistResult, setPlaylistResult] = useState(null);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [playlistError, setPlaylistError] = useState("");
  const [showPlaylistBuilder, setShowPlaylistBuilder] = useState(false);
  const timerRef = useRef(null);
  const poseRef = useRef(null);

  const poseFeedback = [
    "Your arms could be a little higher — try lifting them to shoulder height",
    "Great posture! Keep your spine tall and shoulders relaxed",
    "Bend your knees slightly — this protects your joints during the movement",
    "Breathe with the movement — exhale as you extend, inhale as you return",
    "Your balance looks steady — well done on maintaining that stance",
  ];

  useEffect(() => {
    if (sessionActive) {
      timerRef.current = setInterval(() => setSessionTimer(t => t + 1), 1000);
      if (cameraOn) {
        poseRef.current = setInterval(() => {
          setPoseMsg(poseFeedback[Math.floor(Math.random() * poseFeedback.length)]);
        }, 5000);
        setPoseMsg(poseFeedback[0]);
      }
    } else {
      clearInterval(timerRef.current);
      clearInterval(poseRef.current);
      setPoseMsg("");
      setSessionTimer(0);
    }
    return () => { clearInterval(timerRef.current); clearInterval(poseRef.current); };
  }, [sessionActive, cameraOn]);

  function startMemoryGame() {
    const emojis = ["🌿", "🧠", "💧", "🌸", "⭐", "🍃"];
    const doubled = [...emojis, ...emojis].sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, emoji: e }));
    setGameGrid(doubled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameActive("memory");
  }

  async function generatePlaylist() {
    if (!playlistPrompt.trim()) return;
    setPlaylistLoading(true);
    setPlaylistError("");
    setPlaylistResult(null);
    const systemPrompt = `You are Sage, the AI wellness companion for BrainThrive — a senior-focused mind-body platform. 
The platform has 3 pillars: Move (Baduanjin qigong, PMR), Calm (acupressure, breathing), Think (brain games, cognitive exercises).
Available sessions: Morning Baduanjin Flow (Move, 15min, Beginner), Acupressure Calm Reset (Calm, 10min, Beginner), Memory Pattern Challenge (Think, 15min, Beginner), Eight Brocades Full Sequence (Move, 20min, Intermediate), Breath & Pressure Points (Calm, 12min, Intermediate), Working Memory Sprint (Think, 18min, Intermediate), PMR Evening Wind-Down (Move, 15min, Beginner), Hand Meridian Sequence (Calm, 8min, Beginner), Pattern Recognition Boost (Think, 20min, Advanced).
Based on the user's description of how they feel or what they need, create a personalized playlist of 2–4 sessions.
Respond ONLY with valid JSON in exactly this format, no markdown, no preamble:
{"playlistName":"...", "rationale":"1-2 warm sentences explaining why this sequence fits them", "totalMinutes": number, "sessions":[{"title":"...","pillar":"Move|Calm|Think","duration":number,"reason":"short phrase why this session"}]}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: playlistPrompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setPlaylistResult(parsed);
    } catch (e) {
      setPlaylistError("Couldn't generate playlist right now. Try again in a moment.");
    }
    setPlaylistLoading(false);
  }

  function flipCard(id) {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(idx => gameGrid[idx]);
      if (a.emoji === b.emoji) {
        setMatched(m => [...m, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  }

  const fmtTime = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const tabs = [
    { id: "dashboard", label: "Home" },
    { id: "sessions", label: "Sessions" },
    { id: "games", label: "Brain Games" },
    { id: "health", label: "Health Log" },
    { id: "wisdom", label: "Wisdom Wall" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: COLORS.cream, minHeight: "100vh", color: COLORS.text }}>
      {/* Header */}
      <header style={{ background: COLORS.navy, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: COLORS.sage, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>B</span>
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold", letterSpacing: "0.5px" }}>BrainThrive</div>
            <div style={{ color: COLORS.sageMid, fontSize: 11 }}>Your Daily Ritual</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: COLORS.amber, color: "#fff", fontSize: 12, padding: "4px 10px", borderRadius: 20 }}>🔥 7-day streak</div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: COLORS.sage, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>E</div>
        </div>
      </header>

      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: `1px solid ${COLORS.border}`, display: "flex", overflowX: "auto", padding: "0 12px" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ padding: "13px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif", color: activeTab === t.id ? COLORS.teal : COLORS.textMid, borderBottom: activeTab === t.id ? `2.5px solid ${COLORS.teal}` : "2.5px solid transparent", fontWeight: activeTab === t.id ? "bold" : "normal", whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {t.label}
          </button>
        ))}
      </nav>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 26, margin: "0 0 4px", color: COLORS.navy }}>Good morning, Eleanor 🌿</h1>
              <p style={{ color: COLORS.textMid, margin: 0, fontSize: 15 }}>Your daily ritual awaits. 2 of 3 pillars complete today.</p>
            </div>

            {/* Daily Progress */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 20, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 13, color: COLORS.textLight, marginBottom: 14, textTransform: "uppercase", letterSpacing: "1px" }}>Today's Ritual — 25 min</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[{p:"Move",t:"Baduanjin Flow",d:"~15 min",done:true},{p:"Calm",t:"Acupressure Reset",d:"~10 min",done:true},{p:"Think",t:"Memory Challenge",d:"~15 min",done:false}].map(item => (
                  <div key={item.p} onClick={() => { setSessionActive(item); setActiveTab("sessions"); }}
                    style={{ background: item.done ? pillarBg[item.p] : "#f9f9f9", border: `1px solid ${item.done ? pillarColors[item.p] + "40" : COLORS.border}`, borderRadius: 12, padding: "14px 12px", cursor: "pointer", opacity: item.done ? 1 : 0.85, transition: "transform 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                    <div style={{ fontSize: 11, color: pillarColors[item.p], fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 4 }}>{item.p}</div>
                    <div style={{ fontSize: 14, fontWeight: "bold", color: COLORS.navy, marginBottom: 2 }}>{item.t}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMid }}>{item.d}</div>
                    {item.done && <div style={{ marginTop: 8, fontSize: 11, color: pillarColors[item.p] }}>✓ Complete</div>}
                    {!item.done && <div style={{ marginTop: 8, fontSize: 11, color: COLORS.amber }}>→ Start now</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
              {[{label:"Sessions",val:"48",sub:"total"},{label:"Streak",val:"7",sub:"days"},{label:"Minutes",val:"312",sub:"this month"},{label:"Score",val:"84",sub:"cognitive avg"}].map(s => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "14px 12px", border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: "bold", color: COLORS.navy }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: COLORS.sageMid }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* AI Playlist Builder */}
            <div style={{ background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.navy})`, borderRadius: 16, padding: 20, marginBottom: 20, color: "#fff" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1px", opacity: 0.8, marginBottom: 6 }}>🤖 AI Playlist — Powered by Sage</div>

              {!showPlaylistBuilder && !playlistResult && (
                <div>
                  <div style={{ fontSize: 17, fontWeight: "bold", marginBottom: 6 }}>Build Your Personalized Playlist</div>
                  <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 14 }}>Tell Sage how you're feeling or what you need — she'll pick the perfect session sequence from our library.</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                    {["I'm feeling stressed and can't sleep","I want a gentle morning wake-up","My balance feels off today","I need a quick 20-minute focus boost","I feel anxious and overwhelmed"].map(hint => (
                      <button key={hint} onClick={() => { setPlaylistPrompt(hint); setShowPlaylistBuilder(true); }}
                        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "6px 12px", borderRadius: 16, cursor: "pointer", fontSize: 12, fontFamily: "Georgia, serif", textAlign: "left" }}>
                        {hint}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setShowPlaylistBuilder(true)}
                    style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "8px 18px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>
                    Write your own prompt →
                  </button>
                </div>
              )}

              {showPlaylistBuilder && !playlistResult && (
                <div>
                  <div style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>How are you feeling today?</div>
                  <textarea
                    value={playlistPrompt}
                    onChange={e => setPlaylistPrompt(e.target.value)}
                    rows={3}
                    placeholder="e.g. 'I slept badly and my lower back aches — I need something gentle that calms my nerves and gets blood flowing without too much balance work...'"
                    style={{ width: "100%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 13, fontFamily: "Georgia, serif", boxSizing: "border-box", resize: "vertical" }}
                  />
                  <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 12, marginTop: 4 }}>Sage reads your health history, today's log, and your streak to personalize further.</div>
                  {playlistError && <div style={{ background: "rgba(255,100,100,0.2)", borderRadius: 8, padding: "8px 12px", fontSize: 13, marginBottom: 10 }}>{playlistError}</div>}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={generatePlaylist} disabled={playlistLoading || !playlistPrompt.trim()}
                      style={{ background: playlistLoading ? "rgba(255,255,255,0.1)" : COLORS.sage, color: "#fff", border: "none", padding: "9px 22px", borderRadius: 20, cursor: playlistLoading ? "not-allowed" : "pointer", fontSize: 14, fontFamily: "Georgia, serif", opacity: playlistLoading ? 0.7 : 1 }}>
                      {playlistLoading ? "Sage is thinking..." : "Generate My Playlist ✨"}
                    </button>
                    <button onClick={() => { setShowPlaylistBuilder(false); setPlaylistPrompt(""); setPlaylistError(""); }}
                      style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "9px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {playlistResult && (
                <div>
                  <div style={{ fontSize: 17, fontWeight: "bold", marginBottom: 4 }}>{playlistResult.playlistName}</div>
                  <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 14 }}>{playlistResult.rationale}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                    {playlistResult.sessions?.map((s, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: pillarColors[s.pillar] || COLORS.sage, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: "bold", flexShrink: 0 }}>{i+1}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: "bold" }}>{s.title}</div>
                          <div style={{ fontSize: 11, opacity: 0.75 }}>{s.pillar} · {s.duration} min — {s.reason}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>Total: {playlistResult.totalMinutes} min</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setActiveTab("sessions")}
                      style={{ background: COLORS.sage, color: "#fff", border: "none", padding: "9px 22px", borderRadius: 20, cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif" }}>
                      Start Playlist →
                    </button>
                    <button onClick={() => { setPlaylistResult(null); setShowPlaylistBuilder(true); }}
                      style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "9px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>
                      Try a different prompt
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wisdom Wall Teaser */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 16, fontWeight: "bold", color: COLORS.navy }}>From the Wisdom Wall</div>
                <button onClick={() => setActiveTab("wisdom")} style={{ background: "none", border: "none", color: COLORS.teal, cursor: "pointer", fontSize: 13 }}>View all →</button>
              </div>
              <div style={{ borderLeft: `3px solid ${COLORS.sage}`, paddingLeft: 14 }}>
                <div style={{ fontSize: 14, color: COLORS.text, fontStyle: "italic", marginBottom: 6 }}>"{wisdomPosts[0].content.substring(0, 120)}..."</div>
                <div style={{ fontSize: 12, color: COLORS.textMid }}>— {wisdomPosts[0].author}, {wisdomPosts[0].location}</div>
              </div>
            </div>
          </div>
        )}

        {/* SESSIONS */}
        {activeTab === "sessions" && (
          <div>
            {sessionActive ? (
              <div>
                <button onClick={() => { setSessionActive(null); setCameraOn(false); }} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.teal, fontSize: 14, marginBottom: 16 }}>← Back to sessions</button>
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ background: pillarBg[sessionActive.p || sessionActive.pillar], color: pillarColors[sessionActive.p || sessionActive.pillar], padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>{sessionActive.p || sessionActive.pillar}</div>
                    <div style={{ fontSize: 20, fontWeight: "bold", color: COLORS.navy }}>{sessionActive.t || sessionActive.title}</div>
                  </div>

                  {/* Video Player */}
                  {(() => {
                    const embedUrl = getEmbedUrl(sessionActive.videoUrl);
                    return embedUrl ? (
                      <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", marginBottom: 16, background: "#000", aspectRatio: "16/9" }}>
                        <iframe
                          src={embedUrl}
                          title={sessionActive.title}
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                        />
                        {poseMsg && (
                          <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, background: "rgba(91,138,110,0.93)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, pointerEvents: "none" }}>
                            🤖 AI Coach: {poseMsg}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ background: COLORS.navy, borderRadius: 12, aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
                        <div style={{ fontSize: 36, marginBottom: 10 }}>🎬</div>
                        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: "bold", marginBottom: 6 }}>Video coming soon</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textAlign: "center", maxWidth: 260 }}>Upload this session to Vimeo or YouTube and paste the URL into the sessions list to activate.</div>
                        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.12)", padding: "4px 10px", borderRadius: 8, color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{sessionActive.duration} min</div>
                        {poseMsg && (
                          <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, background: "rgba(91,138,110,0.9)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13 }}>
                            🤖 AI Coach: {poseMsg}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Controls */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                    {!timerRef.current?._idleTimeout && sessionTimer === 0 ? (
                      <button onClick={() => setSessionActive({ ...sessionActive, running: true })} style={{ background: COLORS.sage, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 25, cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif" }}>
                        Begin Session
                      </button>
                    ) : (
                      <button onClick={() => setSessionActive(null)} style={{ background: COLORS.sage, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 25, cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif" }}>
                        Complete Session ✓
                      </button>
                    )}
                    <button onClick={() => setCameraOn(c => !c)} style={{ background: cameraOn ? COLORS.teal : "#f0f0f0", color: cameraOn ? "#fff" : COLORS.textMid, border: "none", padding: "10px 18px", borderRadius: 25, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>
                      {cameraOn ? "📷 Camera On (AI Coaching active)" : "📷 Enable Camera for AI Coaching"}
                    </button>
                  </div>

                  {cameraOn && (
                    <div style={{ background: COLORS.sageLight, borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13, color: COLORS.teal }}>
                      <strong>AI Pose Coaching active.</strong> Your camera is being analyzed locally to provide general alignment feedback. No video is stored or transmitted.
                    </div>
                  )}

                  {/* Notes */}
                  <div style={{ fontSize: 14, color: COLORS.textMid, marginTop: 10 }}>
                    <strong>About this session:</strong> The Baduanjin Eight Brocades is an 800-year-old movement sequence validated by clinical research to improve balance, circulation, and neuroplasticity. Each movement coordinates breath with motion for a full mind-body activation.
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 style={{ fontSize: 22, color: COLORS.navy, marginBottom: 4 }}>Session Library</h2>
                <p style={{ color: COLORS.textMid, marginBottom: 16 }}>{sessions.length} sessions across three pillars · {sessions.filter(s => s.videoUrl).length} videos live · {sessions.filter(s => !s.videoUrl).length} uploading soon</p>

                {/* Filters */}
                <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                  {["All", "Move", "Calm", "Think"].map(p => (
                    <button key={p} onClick={() => setSelectedPillar(p)} style={{ padding: "7px 18px", borderRadius: 20, border: `1px solid ${selectedPillar === p ? pillarColors[p] || COLORS.teal : COLORS.border}`, background: selectedPillar === p ? (pillarBg[p] || COLORS.tealLight) : "#fff", color: selectedPillar === p ? (pillarColors[p] || COLORS.teal) : COLORS.textMid, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>
                      {p}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {sessions.filter(s => selectedPillar === "All" || s.pillar === selectedPillar).map(s => (
                    <div key={s.id} onClick={() => setSessionActive(s)}
                      style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", border: `1px solid ${COLORS.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "box-shadow 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: pillarBg[s.pillar], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
                          <span style={{ fontSize: 18 }}>{s.pillar === "Move" ? "🧘" : s.pillar === "Calm" ? "🌊" : "🧠"}</span>
                          {s.videoUrl && <div style={{ position: "absolute", bottom: -3, right: -3, width: 14, height: 14, borderRadius: "50%", background: COLORS.sage, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 7, color: "#fff" }}>▶</span></div>}
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: "bold", color: COLORS.navy, marginBottom: 2 }}>{s.title}</div>
                          <div style={{ fontSize: 12, color: COLORS.textMid }}>{s.pillar} · {s.duration} min · {s.level}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {s.completed && <span style={{ fontSize: 11, color: COLORS.sage, background: COLORS.sageLight, padding: "3px 8px", borderRadius: 10 }}>✓ Done</span>}
                        {!s.videoUrl && <span style={{ fontSize: 10, color: COLORS.amber, background: COLORS.amberLight, padding: "2px 7px", borderRadius: 8 }}>Soon</span>}
                        <span style={{ color: COLORS.teal, fontSize: 18 }}>›</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* BRAIN GAMES */}
        {activeTab === "games" && (
          <div>
            <h2 style={{ fontSize: 22, color: COLORS.navy, marginBottom: 4 }}>Brain Games</h2>
            <p style={{ color: COLORS.textMid, marginBottom: 20 }}>Targeted cognitive exercises with adaptive difficulty</p>

            {gameActive === "memory" ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: "bold", color: COLORS.navy }}>Memory Grid — {moves} moves</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={startMemoryGame} style={{ background: COLORS.tealLight, color: COLORS.teal, border: "none", padding: "7px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13 }}>Restart</button>
                    <button onClick={() => setGameActive(null)} style={{ background: "#f0f0f0", color: COLORS.textMid, border: "none", padding: "7px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13 }}>← Back</button>
                  </div>
                </div>
                {matched.length === gameGrid.length && gameGrid.length > 0 && (
                  <div style={{ background: COLORS.sageLight, borderRadius: 12, padding: 16, marginBottom: 16, textAlign: "center", color: COLORS.sage, fontWeight: "bold", fontSize: 16 }}>
                    🎉 Excellent! Completed in {moves} moves.
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {gameGrid.map((card, i) => {
                    const isFlipped = flipped.includes(i) || matched.includes(i);
                    return (
                      <div key={i} onClick={() => flipCard(i)}
                        style={{ height: 72, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, cursor: "pointer", background: isFlipped ? COLORS.sageLight : COLORS.navy, border: `2px solid ${isFlipped ? COLORS.sage : COLORS.teal}`, transition: "all 0.3s", transform: isFlipped ? "scale(1.03)" : "scale(1)" }}>
                        {isFlipped ? card.emoji : ""}
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 16, background: COLORS.lavenderLight, borderRadius: 10, padding: 12, fontSize: 13, color: COLORS.lavender }}>
                  <strong>Cognitive Target:</strong> Short-term working memory, pattern recognition, processing speed. Adaptive difficulty increases as your scores improve.
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                  {brainGames.map(g => (
                    <div key={g.id} onClick={() => g.id === 1 ? startMemoryGame() : null}
                      style={{ background: "#fff", borderRadius: 14, padding: 18, border: `1px solid ${COLORS.border}`, cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{g.icon}</div>
                      <div style={{ fontSize: 16, fontWeight: "bold", color: COLORS.navy, marginBottom: 4 }}>{g.name}</div>
                      <div style={{ fontSize: 13, color: COLORS.textMid, marginBottom: 10 }}>{g.description}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, background: COLORS.lavenderLight, color: COLORS.lavender, padding: "3px 8px", borderRadius: 8 }}>{g.difficulty}</span>
                        <span style={{ fontSize: 11, color: COLORS.textLight }}>{g.plays} plays</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cognitive Score */}
                <div style={{ background: "#fff", borderRadius: 14, padding: 18, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 15, fontWeight: "bold", color: COLORS.navy, marginBottom: 14 }}>Your Cognitive Progress</div>
                  <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                    {[{label:"Working Memory",val:82},{label:"Processing Speed",val:78},{label:"Pattern Recognition",val:88}].map(m => (
                      <div key={m.label} style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontSize: 24, fontWeight: "bold", color: COLORS.teal }}>{m.val}</div>
                        <div style={{ fontSize: 11, color: COLORS.textLight, textAlign: "center" }}>{m.label}</div>
                        <div style={{ background: COLORS.tealLight, borderRadius: 4, height: 6, marginTop: 6 }}>
                          <div style={{ background: COLORS.teal, borderRadius: 4, height: 6, width: `${m.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.textMid, fontStyle: "italic" }}>Scores are calibrated for your age group (65–75). Adaptive difficulty adjusts to your performance each session.</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HEALTH LOG */}
        {activeTab === "health" && (
          <div>
            <h2 style={{ fontSize: 22, color: COLORS.navy, marginBottom: 4 }}>Daily Health Log</h2>
            <p style={{ color: COLORS.textMid, marginBottom: 20 }}>Track your cognitive, stress, sleep, and activity metrics</p>

            {reportSaved && (
              <div style={{ background: COLORS.sageLight, borderRadius: 10, padding: 12, marginBottom: 16, color: COLORS.sage, fontSize: 14 }}>
                ✓ Today's health log saved. Great work tracking your wellness!
              </div>
            )}

            <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 20, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 15, fontWeight: "bold", color: COLORS.navy, marginBottom: 16 }}>Today's Self-Report</div>
              {reportMetrics.map((m, i) => (
                <div key={m.label} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <label style={{ fontSize: 14, color: COLORS.textMid }}>{m.label} {m.inverted ? "(lower is better)" : ""}</label>
                    <span style={{ fontSize: 16, fontWeight: "bold", color: m.color }}>{m.today.toFixed(1)}/10</span>
                  </div>
                  <input type="range" min="1" max="10" step="0.5" value={m.today}
                    onChange={e => setReportMetrics(r => r.map((x, j) => j === i ? { ...x, today: parseFloat(e.target.value) } : x))}
                    style={{ width: "100%", accentColor: m.color }} />
                </div>
              ))}

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 14, color: COLORS.textMid, display: "block", marginBottom: 6 }}>Sleep last night (hours)</label>
                <input type="number" min="0" max="12" step="0.5" defaultValue="7" style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 14, width: 100 }} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 14, color: COLORS.textMid, display: "block", marginBottom: 6 }}>Activity today</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Walk", "Swim", "Yoga", "Gardening", "Light stretching", "Rest day"].map(a => (
                    <button key={a} style={{ padding: "6px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 16, background: "#f9f9f9", color: COLORS.textMid, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>{a}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 14, color: COLORS.textMid, display: "block", marginBottom: 6 }}>Notes (optional)</label>
                <textarea rows={2} placeholder="Any physical sensations, energy observations, or thoughts..." style={{ width: "100%", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, fontFamily: "Georgia, serif", boxSizing: "border-box", resize: "vertical" }} />
              </div>

              <button onClick={() => setReportSaved(true)} style={{ background: COLORS.sage, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 24, cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif" }}>
                Save Today's Log
              </button>
            </div>

            {/* Weekly Trend */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 18, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 15, fontWeight: "bold", color: COLORS.navy, marginBottom: 14 }}>7-Day Trend</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 14 }}>
                {["M","T","W","T","F","S","S"].map((d, i) => {
                  const h = [6.5,7,5.5,7.5,7,8,6][i];
                  return (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ background: COLORS.teal, borderRadius: 4, height: `${h * 8}px`, marginBottom: 4, opacity: 0.7 + i * 0.04 }} />
                      <div style={{ fontSize: 10, color: COLORS.textLight }}>{d}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMid }}>Sleep quality trend — avg 6.8 hrs · Improving ↑</div>
            </div>
          </div>
        )}

        {/* WISDOM WALL */}
        {activeTab === "wisdom" && (
          <div>
            {/* Section Headers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[{icon:"🏛️",title:"Wisdom Wall",desc:"Featured stories & life wisdom"},{icon:"💬",title:"Peer Discussion",desc:"Program tips & encouragement"},{icon:"🌍",title:"Share Wisdom",desc:"Post your own story"},{icon:"📢",title:"Platform Feedback",desc:"Help us build better"}].map(s => (
                <div key={s.title} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: COLORS.navy }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMid }}>{s.desc}</div>
                </div>
              ))}
            </div>

            {/* Wisdom Posts */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, fontWeight: "bold", color: COLORS.navy, marginBottom: 14 }}>🏛️ Featured Wisdom</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {wisdomPosts.map(post => (
                  <div key={post.id} style={{ background: "#fff", borderRadius: 14, padding: 18, border: `1px solid ${COLORS.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.sageLight, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.sage, fontWeight: "bold", flexShrink: 0 }}>{post.avatar}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: "bold", color: COLORS.navy }}>{post.author}</div>
                        <div style={{ fontSize: 12, color: COLORS.textLight }}>{post.location}</div>
                      </div>
                      <span style={{ marginLeft: "auto", fontSize: 11, background: COLORS.amberLight, color: COLORS.amber, padding: "3px 8px", borderRadius: 8, textTransform: "capitalize" }}>{post.type}</span>
                    </div>
                    <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, margin: "0 0 12px", fontStyle: "italic" }}>"{post.content}"</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <button style={{ background: "none", border: `1px solid ${COLORS.border}`, padding: "4px 12px", borderRadius: 16, cursor: "pointer", fontSize: 12, color: COLORS.textMid, fontFamily: "Georgia, serif" }}>♡ {post.likes}</button>
                      <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: COLORS.teal, fontFamily: "Georgia, serif" }}>Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Wisdom */}
            <div style={{ background: COLORS.navy, borderRadius: 16, padding: 20, color: "#fff" }}>
              <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>🌍 Share Your Wisdom</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>Your story could inspire thousands of seniors worldwide.</div>

              {wisdomPosted ? (
                <div style={{ background: "rgba(91,138,110,0.3)", borderRadius: 10, padding: 14, color: COLORS.sageMid, textAlign: "center" }}>
                  ✓ Your wisdom has been shared. Thank you, Eleanor!
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                    {["wisdom","story","tip"].map(t => (
                      <button key={t} onClick={() => setWisdomType(t)} style={{ padding: "5px 14px", borderRadius: 16, border: `1px solid ${wisdomType === t ? COLORS.sageMid : "rgba(255,255,255,0.2)"}`, background: wisdomType === t ? COLORS.sage : "transparent", color: "#fff", cursor: "pointer", fontSize: 12, textTransform: "capitalize", fontFamily: "Georgia, serif" }}>{t}</button>
                    ))}
                  </div>
                  <textarea rows={3} value={wisdom} onChange={e => setWisdom(e.target.value)} placeholder="Share a piece of wisdom, a story from your journey, or a practical tip for others..." style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, fontFamily: "Georgia, serif", boxSizing: "border-box", resize: "vertical" }} />
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>🎥 Record Video</button>
                    <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>🎙 Record Audio</button>
                    <button onClick={() => { if (wisdom.trim()) setWisdomPosted(true); }} style={{ background: COLORS.sage, color: "#fff", border: "none", padding: "8px 20px", borderRadius: 20, cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif", marginLeft: "auto" }}>Post →</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div>
            <h2 style={{ fontSize: 22, color: COLORS.navy, marginBottom: 20 }}>Your Profile</h2>

            <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.sageLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: COLORS.sage, fontWeight: "bold", flexShrink: 0 }}>E</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: "bold", color: COLORS.navy }}>Eleanor M.</div>
                <div style={{ fontSize: 14, color: COLORS.textMid }}>Age 68 · Portland, OR · Member since Jan 2025</div>
                <div style={{ fontSize: 13, color: COLORS.sage, marginTop: 4 }}>🔥 7-day streak · Level: Intermediate</div>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, padding: 18, marginBottom: 14, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 15, fontWeight: "bold", color: COLORS.navy, marginBottom: 14 }}>Community</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 120, background: COLORS.sageLight, borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: COLORS.sage }}>3</div>
                  <div style={{ fontSize: 12, color: COLORS.textMid }}>Wisdom posts</div>
                </div>
                <div style={{ flex: 1, minWidth: 120, background: COLORS.tealLight, borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: COLORS.teal }}>127</div>
                  <div style={{ fontSize: 12, color: COLORS.textMid }}>Likes received</div>
                </div>
                <div style={{ flex: 1, minWidth: 120, background: COLORS.lavenderLight, borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: COLORS.lavender }}>18</div>
                  <div style={{ fontSize: 12, color: COLORS.textMid }}>Replies given</div>
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, padding: 18, marginBottom: 14, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 15, fontWeight: "bold", color: COLORS.navy, marginBottom: 14 }}>Digital Companion</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.lavender}, ${COLORS.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🌿</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: COLORS.navy }}>Sage — Your AI Companion</div>
                  <div style={{ fontSize: 13, color: COLORS.textMid, marginBottom: 6 }}>Here to encourage, remind, and celebrate your progress</div>
                  <div style={{ fontSize: 13, color: COLORS.lavender, fontStyle: "italic" }}>"You've practiced 48 sessions together. Your consistency is remarkable, Eleanor."</div>
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, padding: 18, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 15, fontWeight: "bold", color: COLORS.navy, marginBottom: 14 }}>Accessibility Settings</div>
              {[["Large text mode","Enabled"],["High contrast","Off"],["Chair-assisted movement options","Enabled"],["Audio narration","Off"],["Camera for AI coaching","Optional — you choose per session"]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 14 }}>
                  <span style={{ color: COLORS.textMid }}>{k}</span>
                  <span style={{ color: v === "Enabled" || v.startsWith("Optional") ? COLORS.sage : COLORS.textLight }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer Nav (Mobile-style) */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 10px", zIndex: 100 }}>
        {[{id:"dashboard",icon:"🏠"},{id:"sessions",icon:"▶️"},{id:"games",icon:"🧠"},{id:"health",icon:"📊"},{id:"wisdom",icon:"🌍"},{id:"profile",icon:"👤"}].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <span style={{ fontSize: 9, color: activeTab === t.id ? COLORS.teal : COLORS.textLight, textTransform: "capitalize" }}>{t.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
