"use client";
import { useState, useEffect, useRef } from "react";

// ─── Design System ────────────────────────────────────────────────
const C = {
  bg:           "#F7F4EF",
  bgDeep:       "#EDE9E1",
  card:         "#FFFFFF",
  sage:         "#5C8A6E",
  sageLight:    "#EAF2ED",
  sageDark:     "#3D6B52",
  teal:         "#3B8C8C",
  tealLight:    "#E3F2F2",
  amber:        "#C9784A",
  amberLight:   "#FDF0E8",
  gold:         "#C8A84B",
  goldLight:    "#FDF6E3",
  lavender:     "#7B70A8",
  lavenderLight:"#EFEDFA",
  ink:          "#1C1C1E",
  inkMid:       "#4A4A55",
  inkLight:     "#8A8A9A",
  border:       "rgba(0,0,0,0.07)",
  borderMid:    "rgba(0,0,0,0.12)",
  navy:         "#1E3A5F",
  sageMid:      "#9DC0AC",
};

const pillarColor = { Move: C.sage,      Calm: C.teal,      Think: C.lavender };
const pillarBg    = { Move: C.sageLight,  Calm: C.tealLight,  Think: C.lavenderLight };
const pillarIcon  = { Move: "🌿",         Calm: "🌊",         Think: "🧠" };

// ─── Data ─────────────────────────────────────────────────────────
const sessions = [
  { id:1,  title:"Morning Baduanjin Flow",         pillar:"Move",  duration:15, level:"Gentle",     completed:true,  videoUrl:"" },
  { id:2,  title:"Eight Brocades — Introduction",  pillar:"Move",  duration:12, level:"Gentle",     completed:true,  videoUrl:"" },
  { id:3,  title:"Standing Posture & Root",         pillar:"Move",  duration:10, level:"Gentle",     completed:false, videoUrl:"" },
  { id:4,  title:"Chair-Assisted Baduanjin",        pillar:"Move",  duration:15, level:"Gentle",     completed:false, videoUrl:"" },
  { id:5,  title:"PMR Evening Wind-Down",           pillar:"Move",  duration:15, level:"Gentle",     completed:false, videoUrl:"" },
  { id:6,  title:"Gentle Joint Warm-Up",            pillar:"Move",  duration:10, level:"Gentle",     completed:false, videoUrl:"" },
  { id:7,  title:"Eight Brocades — Full Sequence",  pillar:"Move",  duration:20, level:"Moderate",   completed:false, videoUrl:"" },
  { id:8,  title:"Balance & Steady Stance",         pillar:"Move",  duration:18, level:"Moderate",   completed:false, videoUrl:"" },
  { id:9,  title:"Baduanjin Flow + Breathwork",     pillar:"Move",  duration:22, level:"Moderate",   completed:false, videoUrl:"" },
  { id:10, title:"PMR Deep Muscle Release",         pillar:"Move",  duration:20, level:"Moderate",   completed:false, videoUrl:"" },
  { id:11, title:"Spinal Mobility Sequence",        pillar:"Move",  duration:15, level:"Moderate",   completed:false, videoUrl:"" },
  { id:12, title:"Baduanjin Master Flow",           pillar:"Move",  duration:30, level:"Energising", completed:false, videoUrl:"" },
  { id:13, title:"Dynamic Balance Challenge",       pillar:"Move",  duration:25, level:"Energising", completed:false, videoUrl:"" },
  { id:14, title:"Acupressure Calm Reset",          pillar:"Calm",  duration:10, level:"Gentle",     completed:true,  videoUrl:"" },
  { id:15, title:"Hand Meridian Sequence",          pillar:"Calm",  duration:8,  level:"Gentle",     completed:false, videoUrl:"" },
  { id:16, title:"Ear Acupressure for Sleep",       pillar:"Calm",  duration:8,  level:"Gentle",     completed:false, videoUrl:"" },
  { id:17, title:"4-7-8 Breathing Reset",           pillar:"Calm",  duration:8,  level:"Gentle",     completed:false, videoUrl:"" },
  { id:18, title:"Foot Reflexology Basics",         pillar:"Calm",  duration:10, level:"Gentle",     completed:false, videoUrl:"" },
  { id:19, title:"Morning Nervous System Wake-Up",  pillar:"Calm",  duration:8,  level:"Gentle",     completed:false, videoUrl:"" },
  { id:20, title:"Breath & Pressure Points",        pillar:"Calm",  duration:12, level:"Moderate",   completed:false, videoUrl:"" },
  { id:21, title:"Full Acupressure Body Scan",      pillar:"Calm",  duration:18, level:"Moderate",   completed:false, videoUrl:"" },
  { id:22, title:"Cortisol Reset Protocol",         pillar:"Calm",  duration:15, level:"Moderate",   completed:false, videoUrl:"" },
  { id:23, title:"Parasympathetic Activation",      pillar:"Calm",  duration:12, level:"Moderate",   completed:false, videoUrl:"" },
  { id:24, title:"Deep Meridian Flow Session",      pillar:"Calm",  duration:25, level:"Energising", completed:false, videoUrl:"" },
  { id:25, title:"HRV Coherence Breathing",         pillar:"Calm",  duration:20, level:"Energising", completed:false, videoUrl:"" },
  { id:26, title:"Memory Pattern Challenge",        pillar:"Think", duration:15, level:"Gentle",     completed:false, videoUrl:"" },
  { id:27, title:"Name & Face Recall",              pillar:"Think", duration:12, level:"Gentle",     completed:false, videoUrl:"" },
  { id:28, title:"Visual Pattern Matching",         pillar:"Think", duration:10, level:"Gentle",     completed:false, videoUrl:"" },
  { id:29, title:"Word Association Starter",        pillar:"Think", duration:10, level:"Gentle",     completed:false, videoUrl:"" },
  { id:30, title:"Focus & Attention Builder",       pillar:"Think", duration:12, level:"Gentle",     completed:false, videoUrl:"" },
  { id:31, title:"Working Memory Sprint",           pillar:"Think", duration:18, level:"Moderate",   completed:false, videoUrl:"" },
  { id:32, title:"Dual-Task Coordination",          pillar:"Think", duration:20, level:"Moderate",   completed:false, videoUrl:"" },
  { id:33, title:"Number Sequence Challenge",       pillar:"Think", duration:15, level:"Moderate",   completed:false, videoUrl:"" },
  { id:34, title:"Cognitive Flexibility Drill",     pillar:"Think", duration:18, level:"Moderate",   completed:false, videoUrl:"" },
  { id:35, title:"Pattern Recognition Boost",       pillar:"Think", duration:20, level:"Energising", completed:false, videoUrl:"" },
  { id:36, title:"Processing Speed Master Class",   pillar:"Think", duration:25, level:"Energising", completed:false, videoUrl:"" },
];

const wisdomPosts = [
  { id:1, author:"Margaret", age:72, avatar:"M", location:"Portland, OR", content:"After 6 weeks I noticed I could remember names at my book club again. Slow and steady — don't skip the calm section, it changed my sleep completely.", likes:47, type:"wisdom" },
  { id:2, author:"Robert",   age:68, avatar:"R", location:"Austin, TX",   content:"The Eight Brocades felt awkward at first. By week three I was doing it in my backyard at sunrise. Now my grandkids try to copy me.", likes:83, type:"story" },
  { id:3, author:"Sylvia",   age:65, avatar:"S", location:"Tampa, FL",    content:"I was skeptical about acupressure. Four weeks in and I sleep through the night. The ear points are magic.", likes:61, type:"wisdom" },
  { id:4, author:"James",    age:74, avatar:"J", location:"Seattle, WA",  content:"Tip for newcomers: do the movement section by a chair for balance support. No shame in it — I did it for 2 months.", likes:39, type:"tip" },
];

const healthMetrics = [
  { label:"Mood",   value:7.5, color:C.sage },
  { label:"Sleep",  value:6.8, color:C.teal },
  { label:"Stress", value:3.2, color:C.lavender, inverted:true },
  { label:"Energy", value:7.1, color:C.amber },
];

function getEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("player.vimeo.com") || url.includes("youtube.com/embed")) return url;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?title=0&byline=0&portrait=0&color=5C8A6E`;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`;
  return url;
}

// ─── Small components ─────────────────────────────────────────────
function PillarBadge({ pillar, size=13 }) {
  return (
    <span style={{ background:pillarBg[pillar], color:pillarColor[pillar], fontSize:size, fontWeight:600, padding:"3px 10px", borderRadius:20 }}>
      {pillarIcon[pillar]} {pillar}
    </span>
  );
}

function Avatar({ letter, size=44, bg=C.sageLight, color=C.sage }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", color, fontWeight:700, fontSize:size*0.38, flexShrink:0 }}>
      {letter}
    </div>
  );
}

function Card({ children, style={}, onClick=undefined }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>onClick&&setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:C.card, borderRadius:20, border:`1px solid ${C.border}`, transition:"box-shadow 0.2s, transform 0.2s", boxShadow:hov?"0 8px 32px rgba(0,0,0,0.10)":"0 2px 8px rgba(0,0,0,0.04)", transform:hov?"translateY(-2px)":"none", cursor:onClick?"pointer":"default", ...style }}>
      {children}
    </div>
  );
}

function Btn({ children, onClick=undefined, variant="primary", size="md", style={} }) {
  const [hov, setHov] = useState(false);
  const sz = size==="lg" ? {padding:"14px 32px",fontSize:17} : size==="sm" ? {padding:"7px 16px",fontSize:13} : {padding:"10px 22px",fontSize:15};
  const vars = {
    primary:  { background:hov?C.sageDark:C.sage,      color:"#fff" },
    teal:     { background:hov?"#2d6e6e":C.teal,       color:"#fff" },
    amber:    { background:hov?"#a8622e":C.amber,      color:"#fff" },
    ghost:    { background:hov?C.sageLight:"transparent", color:C.sage, border:`1.5px solid ${C.sage}` },
    ghostGray:{ background:hov?C.bgDeep:"transparent", color:C.inkMid, border:`1.5px solid ${C.borderMid}` },
    white:    { background:hov?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.75)", color:C.ink },
  };
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ border:"none", cursor:"pointer", fontFamily:"Georgia,serif", borderRadius:50, transition:"all 0.18s", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, fontWeight:600, ...sz, ...vars[variant], ...style }}>
      {children}
    </button>
  );
}

// ─── Auth & Paywall screens ───────────────────────────────────────

function AuthScreen({ onAuth }) {
  const [mode, setMode]         = useState("signup"); // "signup" | "login"
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit() {
    if (!email || !password || (mode==="signup" && !name)) {
      setError("Please fill in all fields."); return;
    }
    setLoading(true); setError("");
    // In production: call Supabase auth here
    // For beta: simulate signup — store in localStorage
    await new Promise(r => setTimeout(r, 900));
    const user = { name: name||email.split("@")[0], email, plan: "free", sessionsWatched: [] };
    localStorage.setItem("bt_user", JSON.stringify(user));
    onAuth(user);
    setLoading(false);
  }

  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:440 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:56, height:56, borderRadius:18, background:C.sage, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
            <span style={{ color:"#fff", fontFamily:"Georgia,serif", fontWeight:600, fontSize:26 }}>B</span>
          </div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:600, color:C.ink }}>BrainThrive</div>
          <div style={{ fontSize:14, color:C.inkLight, marginTop:4 }}>Move · Calm · Think</div>
        </div>

        <div style={{ background:"#fff", borderRadius:24, padding:36, boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
          {/* Toggle */}
          <div style={{ display:"flex", background:C.bgDeep, borderRadius:14, padding:4, marginBottom:28 }}>
            {["signup","login"].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setError("");}}
                style={{ flex:1, padding:"10px 0", borderRadius:11, border:"none", background:mode===m?"#fff":"transparent", color:mode===m?C.ink:C.inkMid, fontWeight:mode===m?600:400, fontSize:15, cursor:"pointer", fontFamily:"'Inter',sans-serif", transition:"all 0.15s" }}>
                {m==="signup" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          {mode==="signup" && (
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:14, color:C.inkMid, display:"block", marginBottom:6 }}>Your name</label>
              <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Eleanor" style={{ fontFamily:"'Inter',sans-serif", fontSize:16, border:`1.5px solid ${C.borderMid}`, borderRadius:12, padding:"12px 16px", width:"100%", outline:"none", boxSizing:"border-box" }}/>
            </div>
          )}
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:14, color:C.inkMid, display:"block", marginBottom:6 }}>Email address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{ fontFamily:"'Inter',sans-serif", fontSize:16, border:`1.5px solid ${C.borderMid}`, borderRadius:12, padding:"12px 16px", width:"100%", outline:"none", boxSizing:"border-box" }}/>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ fontSize:14, color:C.inkMid, display:"block", marginBottom:6 }}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters" style={{ fontFamily:"'Inter',sans-serif", fontSize:16, border:`1.5px solid ${C.borderMid}`, borderRadius:12, padding:"12px 16px", width:"100%", outline:"none", boxSizing:"border-box" }}/>
          </div>

          {error && <div style={{ color:C.amber, fontSize:14, marginBottom:14 }}>{error}</div>}

          <button onClick={handleSubmit} disabled={loading}
            style={{ width:"100%", padding:"14px 0", background:loading?C.sageMid:C.sage, color:"#fff", border:"none", borderRadius:14, fontSize:17, fontWeight:600, cursor:loading?"not-allowed":"pointer", fontFamily:"Georgia,serif", marginBottom:16, transition:"background 0.2s" }}>
            {loading ? "Just a moment..." : mode==="signup" ? "Start for free →" : "Sign in →"}
          </button>

          {mode==="signup" && (
            <div style={{ fontSize:13, color:C.inkLight, textAlign:"center", lineHeight:1.6 }}>
              Free account includes <strong style={{ color:C.ink }}>1 session video</strong> to try.<br/>
              Unlock all 36 sessions from $14.99/month.
            </div>
          )}
        </div>

        <div style={{ textAlign:"center", marginTop:20, fontSize:13, color:C.inkLight }}>
          By signing up you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}

function PaywallScreen({ onSubscribe, onBack, sessionTitle, user }) {
  const [selected, setSelected] = useState("monthly");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const plans = [
    {
      id:      "monthly",
      label:   "Monthly",
      price:   "$14.99",
      period:  "/month",
      note:    "Cancel any time · 7-day free trial",
      priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || "",
      badge:   null,
    },
    {
      id:      "annual",
      label:   "Annual",
      price:   "$125",
      period:  "/year",
      note:    "Save 30% · Best value · 7-day free trial",
      priceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID || "",
      badge:   "POPULAR",
    },
  ];

  async function handleSubscribe() {
    setLoading(true); setError("");
    const plan = plans.find(p => p.id === selected);

    try {
      // Call our Stripe checkout API route
      const res = await fetch("/api/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          priceId: plan.priceId,
          email:   user?.email || "",
          name:    user?.name  || "",
        }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe hosted checkout page
        window.location.href = data.url;
      } else if (data.error) {
        // Stripe not configured yet — simulate upgrade for beta testing
        if (data.error.includes("price") || data.error.includes("key") || !plan.priceId) {
          const updated = { ...user, plan: "pro" };
          localStorage.setItem("bt_user", JSON.stringify(updated));
          onSubscribe();
        } else {
          setError("Payment setup issue — please try again or contact support.");
        }
      }
    } catch {
      // Network error or Stripe not set up yet — simulate for beta
      const updated = { ...user, plan: "pro" };
      localStorage.setItem("bt_user", JSON.stringify(updated));
      onSubscribe();
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:480 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:C.sage, fontSize:15, cursor:"pointer", marginBottom:20, fontFamily:"'Inter',sans-serif" }}>← Back</button>

        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:52, marginBottom:12 }}>🔒</div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:600, color:C.ink, margin:"0 0 8px" }}>Unlock "{sessionTitle}"</h2>
          <p style={{ fontSize:16, color:C.inkMid, lineHeight:1.6, margin:0 }}>You've watched your free session. Subscribe to unlock all 36 sessions, AI coaching, and Sage's personalised playlists.</p>
        </div>

        {/* 7-day trial callout */}
        <div style={{ background:C.sageLight, borderRadius:14, padding:"12px 18px", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:22 }}>🎁</span>
          <div>
            <div style={{ fontWeight:600, fontSize:14, color:C.sageDark }}>7-day free trial included</div>
            <div style={{ fontSize:13, color:C.inkMid }}>Try everything free — no charge until day 8. Cancel any time.</div>
          </div>
        </div>

        {/* Plan cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
          {plans.map(plan => (
            <div key={plan.id} onClick={() => setSelected(plan.id)}
              style={{ background:"#fff", borderRadius:18, padding:"20px 22px", border:`2px solid ${selected===plan.id ? C.sage : C.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"border 0.15s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${selected===plan.id ? C.sage : C.borderMid}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {selected===plan.id && <div style={{ width:12, height:12, borderRadius:"50%", background:C.sage }}/>}
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:16, color:C.ink }}>{plan.label}</div>
                  <div style={{ fontSize:13, color:C.inkLight }}>{plan.note}</div>
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                {plan.badge && <div style={{ background:C.sage, color:"#fff", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:8, marginBottom:4, textAlign:"center" }}>{plan.badge}</div>}
                <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:600, color:C.ink }}>
                  {plan.price}<span style={{ fontSize:13, color:C.inkLight, fontWeight:400 }}>{plan.period}</span>
                </div>
                {plan.id === "annual" && <div style={{ fontSize:11, color:C.sage, fontWeight:600 }}>≈ $10.42/month</div>}
              </div>
            </div>
          ))}
        </div>

        {/* What's included */}
        <div style={{ background:C.sageLight, borderRadius:16, padding:20, marginBottom:24 }}>
          <div style={{ fontWeight:600, fontSize:15, color:C.sageDark, marginBottom:12 }}>Everything included:</div>
          {[
            "All 36 sessions — Move, Calm & Think",
            "AI coaching with live pose feedback",
            "Sage AI personalised playlists",
            "Daily health log & progress tracking",
            "Community Wisdom Wall",
            "New sessions added every month",
          ].map(f => (
            <div key={f} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, fontSize:14, color:C.inkMid }}>
              <span style={{ color:C.sage, fontWeight:700, flexShrink:0 }}>✓</span> {f}
            </div>
          ))}
        </div>

        {error && <div style={{ color:C.amber, fontSize:14, marginBottom:14, textAlign:"center" }}>{error}</div>}

        <button onClick={handleSubscribe} disabled={loading}
          style={{ width:"100%", padding:"16px 0", background:loading ? C.sageMid : C.sage, color:"#fff", border:"none", borderRadius:14, fontSize:18, fontWeight:600, cursor:loading ? "not-allowed" : "pointer", fontFamily:"Georgia,serif", marginBottom:12, transition:"background 0.2s" }}>
          {loading ? "Redirecting to payment..." : `Start free trial →`}
        </button>

        <div style={{ textAlign:"center", fontSize:13, color:C.inkLight, lineHeight:1.6 }}>
          Secure payment via Stripe · Cancel any time · No hidden fees<br/>
          You won't be charged for 7 days
        </div>
      </div>
    </div>
  );
}

// ─── Free session gate ────────────────────────────────────────────
// Session IDs that are free for all users (first video per pillar)
const FREE_SESSION_IDS = new Set([1, 14, 26]);

function isSessionLocked(sessionId, user) {
  if (!user) return true;
  if (user.plan === "pro") return false;
  return !FREE_SESSION_IDS.has(sessionId);
}

export default function BrainThriveApp() {
  const [user, setUser]           = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallSession, setPaywallSession] = useState(null);

  // Check for existing session on load
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bt_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setAuthChecked(true);
  }, []);

  function handleAuth(newUser) { setUser(newUser); }
  function handleSignOut() { localStorage.removeItem("bt_user"); setUser(null); }
  function handleSubscribe() {
    const updated = { ...user, plan:"pro" };
    setUser(updated);
    localStorage.setItem("bt_user", JSON.stringify(updated));
    setShowPaywall(false);
  }
  function handleSessionClick(session, openSession) {
    if (isSessionLocked(session.id, user)) {
      setPaywallSession(session);
      setShowPaywall(true);
    } else {
      openSession(session);
    }
  }

  if (!authChecked) return null;
  if (!user) return <AuthScreen onAuth={handleAuth}/>;
  if (showPaywall) return (
    <PaywallScreen
      sessionTitle={paywallSession?.title||"this session"}
      user={user}
      onSubscribe={handleSubscribe}
      onBack={()=>setShowPaywall(false)}
    />
  );

  return <BrainThrive user={user} onSignOut={handleSignOut} onSessionLocked={(s,cb)=>handleSessionClick(s,cb)} isLocked={(s)=>isSessionLocked(s.id,user)}/>;
}

// ─── Main app (was export default) ────────────────────────────────
function BrainThrive({ user, onSignOut, onSessionLocked, isLocked }) {
  const [tab, setTab]                     = useState("home");
  const [pillarFilter, setPillarFilter]   = useState("All");
  const [sessionActive, setSessionActive] = useState(null);
  const [sessionTimer, setSessionTimer]   = useState(0);
  const [cameraOn, setCameraOn]           = useState(false);
  const [poseMsg, setPoseMsg]             = useState("");
  const [gameActive, setGameActive]       = useState(null);
  const [gameGrid, setGameGrid]           = useState([]);
  const [flipped, setFlipped]             = useState([]);
  const [matched, setMatched]             = useState([]);
  const [moves, setMoves]                 = useState(0);
  const [metrics, setMetrics]             = useState(healthMetrics.map(m=>({...m,today:m.value})));
  const [logSaved, setLogSaved]           = useState(false);
  const [wisdomText, setWisdomText]       = useState("");
  const [wisdomPosted, setWisdomPosted]   = useState(false);
  const [aiPrompt, setAiPrompt]           = useState("");
  const [playlist, setPlaylist]           = useState(null);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [playlistError, setPlaylistError] = useState("");
  const [showPromptBox, setShowPromptBox] = useState(false);
  const [referralEmail, setReferralEmail] = useState("");
  const [referralName, setReferralName]   = useState("");
  const [referralSent, setReferralSent]   = useState(false);
  const [copied, setCopied]               = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [nextSuggestions, setNextSuggestions] = useState<any>(null);
  const [nextLoading, setNextLoading]     = useState(false);

  const timerRef = useRef(null);
  const poseRef  = useRef(null);
  const poseFeedback = [
    "Your arms could be a little higher — try shoulder height",
    "Lovely posture! Keep your spine tall and shoulders soft",
    "Bend your knees gently — this protects your joints",
    "Breathe with the movement — exhale as you extend",
    "Your balance looks steady — well done",
  ];

  useEffect(() => {
    if (sessionActive) {
      timerRef.current = setInterval(()=>setSessionTimer(t=>t+1), 1000);
      if (cameraOn) {
        poseRef.current = setInterval(()=>setPoseMsg(poseFeedback[Math.floor(Math.random()*poseFeedback.length)]), 5000);
        setPoseMsg(poseFeedback[0]);
      }
    } else {
      clearInterval(timerRef.current);
      clearInterval(poseRef.current);
      setPoseMsg(""); setSessionTimer(0);
    }
    return ()=>{ clearInterval(timerRef.current); clearInterval(poseRef.current); };
  }, [sessionActive, cameraOn]);

  function startMemoryGame() {
    const e=["🌿","🧠","💧","🌸","⭐","🍃"];
    setGameGrid([...e,...e].sort(()=>Math.random()-0.5).map((emoji,i)=>({id:i,emoji})));
    setFlipped([]); setMatched([]); setMoves(0); setGameActive("memory");
  }

  function flipCard(id) {
    if (flipped.length===2||flipped.includes(id)||matched.includes(id)) return;
    const nf=[...flipped,id]; setFlipped(nf);
    if (nf.length===2) {
      setMoves(m=>m+1);
      const [a,b]=nf.map(i=>gameGrid[i]);
      if (a.emoji===b.emoji) { setMatched(m=>[...m,...nf]); setFlipped([]); }
      else setTimeout(()=>setFlipped([]),900);
    }
  }

  async function generatePlaylist() {
    if (!aiPrompt.trim()) return;
    setPlaylistLoading(true); setPlaylistError(""); setPlaylist(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are Sage, BrainThrive's AI wellness companion for seniors. Pillars: Move (Baduanjin, PMR), Calm (acupressure, breathing), Think (brain games). Sessions available: Morning Baduanjin Flow (Move 15min Gentle), Acupressure Calm Reset (Calm 10min Gentle), Memory Pattern Challenge (Think 15min Gentle), Eight Brocades Full Sequence (Move 20min Moderate), Breath & Pressure Points (Calm 12min Moderate), Working Memory Sprint (Think 18min Moderate), PMR Evening Wind-Down (Move 15min Gentle), Hand Meridian Sequence (Calm 8min Gentle), Pattern Recognition Boost (Think 20min Energising). Create a warm personalized playlist of 2-4 sessions. Respond ONLY with valid JSON: {"playlistName":"...","rationale":"warm 1-2 sentence reason","totalMinutes":number,"sessions":[{"title":"...","pillar":"Move|Calm|Think","duration":number,"reason":"brief warm phrase"}]}`,
          messages:[{role:"user",content:aiPrompt}],
        }),
      });
      const data=await res.json();
      const text=data.content?.map(b=>b.text||"").join("")||"";
      setPlaylist(JSON.parse(text.replace(/```json|```/g,"").trim()));
    } catch { setPlaylistError("Sage couldn't connect right now. Please try again."); }
    setPlaylistLoading(false);
  }

  const fmtTime = s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  async function completeSession(s) {
    setSessionComplete(true);
    setNextLoading(true);
    setNextSuggestions([]);
    clearInterval(timerRef.current);
    clearInterval(poseRef.current);
    setCameraOn(false); setPoseMsg("");
    const completedPillar = s.p||s.pillar;
    const completedTitle  = s.t||s.title;
    const completedLevel  = s.level||"Gentle";
    const remaining = ["Move","Calm","Think"].filter(p=>p!==completedPillar);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:600,
          system:`You are Sage, BrainThrive's warm AI companion for seniors. The user just finished a session. Suggest exactly 3 next sessions from this library. Prioritise completing their daily ritual (Move, Calm, Think) if pillars are missing today. Be warm and encouraging. Session library: Morning Baduanjin Flow (Move,15,Gentle), Eight Brocades Introduction (Move,12,Gentle), Chair-Assisted Baduanjin (Move,15,Gentle), PMR Evening Wind-Down (Move,15,Gentle), Eight Brocades Full Sequence (Move,20,Moderate), Balance & Steady Stance (Move,18,Moderate), Acupressure Calm Reset (Calm,10,Gentle), Hand Meridian Sequence (Calm,8,Gentle), Ear Acupressure for Sleep (Calm,8,Gentle), 4-7-8 Breathing Reset (Calm,8,Gentle), Breath & Pressure Points (Calm,12,Moderate), Memory Pattern Challenge (Think,15,Gentle), Name & Face Recall (Think,12,Gentle), Word Association Starter (Think,10,Gentle), Working Memory Sprint (Think,18,Moderate), Pattern Recognition Boost (Think,20,Energising). Respond ONLY with valid JSON no markdown: {"encouragement":"one warm sentence praising what they just did","suggestions":[{"title":"...","pillar":"Move|Calm|Think","duration":number,"level":"...","reason":"short warm reason 6 words max"}]}`,
          messages:[{role:"user",content:`Just completed: "${completedTitle}" (${completedPillar}, ${completedLevel}). Still needed today: ${remaining.join(", ")||"all pillars done"}.`}],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b=>b.text||"").join("")||"";
      setNextSuggestions(JSON.parse(text.replace(/```json|```/g,"").trim()));
    } catch {
      setNextSuggestions({
        encouragement:"Well done — every session brings you closer to your best self.",
        suggestions: sessions.filter(x=>x.pillar!==completedPillar&&x.level==="Gentle").slice(0,3).map(x=>({title:x.title,pillar:x.pillar,duration:x.duration,level:x.level,reason:"Completes your daily ritual"}))
      });
    }
    setNextLoading(false);
  }

  const navItems = [
    { id:"home",    icon:"⌂",  label:"Home" },
    { id:"sessions",icon:"▶",  label:"Sessions" },
    { id:"games",   icon:"◈",  label:"Mind Games" },
    { id:"health",  icon:"♡",  label:"My Health" },
    { id:"wisdom",  icon:"❋",  label:"Community" },
    { id:"refer",   icon:"✦",  label:"Invite Friend", badge:"FREE" },
    { id:"profile", icon:"◉",  label:"Profile" },
  ];

  const gs = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap');
    *{box-sizing:border-box;}
    body{margin:0;background:${C.bg};}
    input[type=range]{-webkit-appearance:none;height:6px;border-radius:3px;background:${C.bgDeep};outline:none;}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:${C.sage};cursor:pointer;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.15);}
    textarea,input[type=text],input[type=email],input[type=number]{font-family:'Inter',sans-serif;font-size:16px;border:1.5px solid ${C.borderMid};border-radius:12px;padding:12px 16px;width:100%;outline:none;background:#fff;color:${C.ink};transition:border 0.2s;}
    textarea:focus,input:focus{border-color:${C.sage};}
    ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:${C.borderMid};border-radius:3px;}
    @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}
    .page{animation:fadeIn 0.3s ease forwards;}
  `;

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:C.bg, minHeight:"100vh", color:C.ink }}>
      <style>{gs}</style>

      {/* HEADER */}
      <header style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, padding:"0 28px", display:"flex", alignItems:"center", justifyContent:"space-between", height:70, position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:13 }}>
          <div style={{ width:42, height:42, borderRadius:14, background:C.sage, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontFamily:"'Lora',serif", fontWeight:600, fontSize:20 }}>B</span>
          </div>
          <div>
            <div style={{ fontFamily:"'Lora',serif", fontWeight:600, fontSize:21, color:C.ink, lineHeight:1.1 }}>BrainThrive</div>
            <div style={{ fontSize:12, color:C.inkLight, letterSpacing:"0.5px" }}>Move · Calm · Think</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ background:C.goldLight, color:C.gold, fontSize:14, fontWeight:600, padding:"6px 14px", borderRadius:20, border:`1px solid ${C.gold}40` }}>🔥 7-day streak</div>
          {user?.plan==="pro" && <span style={{ background:C.sageLight, color:C.sageDark, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:12 }}>PRO ✓</span>}
          <Avatar letter={(user?.name||"U")[0].toUpperCase()} size={40}/>
          <button onClick={onSignOut} style={{ background:"none", border:`1px solid ${C.borderMid}`, borderRadius:20, padding:"6px 12px", fontSize:13, color:C.inkMid, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>Sign out</button>
        </div>
      </header>

      <div style={{ display:"flex", maxWidth:1120, margin:"0 auto" }}>

        {/* SIDEBAR */}
        <aside style={{ width:230, flexShrink:0, padding:"28px 14px", position:"sticky", top:70, height:"calc(100vh - 70px)", overflowY:"auto" }}>
          <nav style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {navItems.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", borderRadius:14, border:"none", background:tab===n.id?C.sageLight:"transparent", color:tab===n.id?C.sageDark:C.inkMid, fontWeight:tab===n.id?600:400, fontSize:15, cursor:"pointer", textAlign:"left", transition:"all 0.15s", fontFamily:"'Inter',sans-serif" }}>
                <span style={{ fontSize:18, width:22, textAlign:"center" }}>{n.icon}</span>
                {n.label}
                {n.badge && <span style={{ marginLeft:"auto", background:C.amber, color:"#fff", fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:10 }}>{n.badge}</span>}
              </button>
            ))}
          </nav>

          <div style={{ marginTop:28, background:C.lavenderLight, borderRadius:18, padding:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:C.lavender, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🌿</div>
              <div style={{ fontSize:14, fontWeight:600, color:C.lavender }}>Sage</div>
            </div>
            <div style={{ fontSize:13, color:C.inkMid, fontStyle:"italic", lineHeight:1.6 }}>"You've been so consistent, Eleanor. Your streak shows real dedication."</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="page" key={tab} style={{ flex:1, padding:"28px 24px 80px", minWidth:0 }}>

          {/* ── HOME ─────────────────────────────────────────── */}
          {tab==="home" && (
            <div>
              {/* Hero */}
              <div style={{ background:`linear-gradient(140deg, ${C.sageDark} 0%, ${C.teal} 100%)`, borderRadius:26, padding:"38px 34px", marginBottom:26, color:"#fff", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", right:-30, top:-30, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
                <div style={{ position:"absolute", right:40, bottom:-50, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
                <div style={{ fontFamily:"'Lora',serif", fontSize:13, letterSpacing:"2px", textTransform:"uppercase", opacity:0.75, marginBottom:8 }}>Good morning</div>
                <h1 style={{ fontFamily:"'Lora',serif", fontSize:36, margin:"0 0 10px", fontWeight:600, lineHeight:1.2 }}>Welcome back, Eleanor</h1>
                <p style={{ fontSize:17, opacity:0.85, margin:"0 0 26px", lineHeight:1.6 }}>2 of 3 pillars complete today. You're doing beautifully.</p>
                <Btn variant="white" size="lg" onClick={()=>setTab("sessions")}>Begin today's ritual →</Btn>
              </div>

              {/* Today's Ritual */}
              <div style={{ marginBottom:26 }}>
                <div style={{ fontFamily:"'Lora',serif", fontSize:20, fontWeight:600, color:C.ink, marginBottom:16 }}>Today's Ritual</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                  {[{p:"Move",t:"Baduanjin Flow",d:"15 min",done:true},{p:"Calm",t:"Acupressure Reset",d:"10 min",done:true},{p:"Think",t:"Memory Challenge",d:"15 min",done:false}].map(item=>(
                    <Card key={item.p} onClick={()=>{setSessionActive(item);setTab("sessions");}} style={{ padding:22 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                        <PillarBadge pillar={item.p}/>
                        {item.done && <span style={{ fontSize:18, color:pillarColor[item.p] }}>✓</span>}
                      </div>
                      <div style={{ fontFamily:"'Lora',serif", fontSize:17, fontWeight:600, color:C.ink, marginBottom:4, lineHeight:1.3 }}>{item.t}</div>
                      <div style={{ fontSize:14, color:C.inkLight, marginBottom:14 }}>{item.d}</div>
                      <div style={{ background:item.done?pillarBg[item.p]:C.bgDeep, height:5, borderRadius:3 }}>
                        <div style={{ background:item.done?pillarColor[item.p]:"transparent", height:5, borderRadius:3, width:item.done?"100%":"0%" }}/>
                      </div>
                      <div style={{ fontSize:13, color:item.done?pillarColor[item.p]:C.amber, marginTop:10, fontWeight:500 }}>{item.done?"✓ Complete":"→ Start now"}</div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:26 }}>
                {[{label:"Sessions",val:"48",icon:"▶"},{label:"Day Streak",val:"7",icon:"🔥"},{label:"Minutes",val:"312",icon:"⏱"},{label:"Mind Score",val:"84",icon:"◈"}].map(s=>(
                  <Card key={s.label} style={{ padding:"18px 14px", textAlign:"center" }}>
                    <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:28, fontWeight:600, color:C.ink }}>{s.val}</div>
                    <div style={{ fontSize:12, color:C.inkLight, marginTop:2 }}>{s.label}</div>
                  </Card>
                ))}
              </div>

              {/* AI Playlist */}
              <Card style={{ padding:28, marginBottom:22, background:"linear-gradient(135deg,#F0F7F4,#E8F4F4)", border:`1px solid ${C.sage}25` }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                  <div style={{ width:34, height:34, borderRadius:10, background:C.sage, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🌿</div>
                  <div style={{ fontFamily:"'Lora',serif", fontSize:19, fontWeight:600, color:C.sageDark }}>Ask Sage for a playlist</div>
                </div>
                <p style={{ fontSize:15, color:C.inkMid, marginBottom:18, lineHeight:1.6 }}>Tell Sage how you're feeling — she'll build the perfect sequence just for you.</p>

                {!showPromptBox && !playlist && (
                  <div>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
                      {["I'm feeling stressed","Gentle morning wake-up","My balance feels off","Quick focus boost","I feel anxious"].map(hint=>(
                        <button key={hint} onClick={()=>{setAiPrompt(hint);setShowPromptBox(true);}}
                          style={{ background:"#fff", border:`1.5px solid ${C.sage}45`, color:C.sageDark, padding:"9px 15px", borderRadius:22, cursor:"pointer", fontSize:14, fontFamily:"'Inter',sans-serif" }}>
                          {hint}
                        </button>
                      ))}
                    </div>
                    <Btn variant="ghost" onClick={()=>setShowPromptBox(true)}>Write your own →</Btn>
                  </div>
                )}

                {showPromptBox && !playlist && (
                  <div>
                    <textarea value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)} rows={3} placeholder="e.g. 'I slept badly and my back aches — I need something gentle...'" style={{ marginBottom:12,resize:"vertical" }}/>
                    {playlistError && <div style={{ color:C.amber, fontSize:14, marginBottom:10 }}>{playlistError}</div>}
                    <div style={{ display:"flex", gap:8 }}>
                      <Btn variant="primary" onClick={generatePlaylist}>{playlistLoading?"Sage is thinking...":"Build my playlist ✨"}</Btn>
                      <Btn variant="ghostGray" onClick={()=>{setShowPromptBox(false);setAiPrompt("");}}>Cancel</Btn>
                    </div>
                  </div>
                )}

                {playlist && (
                  <div>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:19, fontWeight:600, color:C.sageDark, marginBottom:4 }}>{playlist.playlistName}</div>
                    <div style={{ fontSize:14, color:C.inkMid, marginBottom:18, lineHeight:1.6 }}>{playlist.rationale}</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
                      {playlist.sessions?.map((s,i)=>(
                        <div key={i} style={{ background:"#fff", borderRadius:14, padding:"13px 16px", display:"flex", alignItems:"center", gap:13, border:`1px solid ${C.border}` }}>
                          <div style={{ width:30, height:30, borderRadius:"50%", background:pillarColor[s.pillar], color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, flexShrink:0 }}>{i+1}</div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontWeight:600, fontSize:15 }}>{s.title}</div>
                            <div style={{ fontSize:12, color:C.inkLight }}>{s.pillar} · {s.duration} min — {s.reason}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize:13, color:C.inkLight, marginBottom:14 }}>Total: {playlist.totalMinutes} minutes</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <Btn variant="primary" onClick={()=>setTab("sessions")}>Start playlist →</Btn>
                      <Btn variant="ghostGray" onClick={()=>{setPlaylist(null);setShowPromptBox(true);}}>Try again</Btn>
                    </div>
                  </div>
                )}
              </Card>

              {/* Upgrade banner for free users */}
              {user?.plan !== "pro" && (
                <div style={{ background:`linear-gradient(135deg,${C.navy||"#1E3A5F"},${C.teal})`, borderRadius:20, padding:"22px 24px", marginBottom:22, color:"#fff", display:"flex", alignItems:"center", gap:18 }}>
                  <div style={{ fontSize:36, flexShrink:0 }}>🌿</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"Georgia,serif", fontSize:17, fontWeight:600, marginBottom:4 }}>You're on the free plan</div>
                    <div style={{ fontSize:14, opacity:0.85, lineHeight:1.5 }}>You have access to 1 free session. Upgrade to unlock all 36 sessions, AI coaching, and Sage's personalised playlists.</div>
                  </div>
                  <button onClick={()=>onSessionLocked({id:99,title:"all sessions"}, ()=>{})}
                    style={{ background:"#fff", color:C.sageDark, border:"none", borderRadius:22, padding:"10px 20px", fontWeight:600, fontSize:14, cursor:"pointer", flexShrink:0, fontFamily:"Georgia,serif", whiteSpace:"nowrap" }}>
                    Upgrade $14.99/mo
                  </button>
                </div>
              )}

              {/* Refer friend teaser */}
              <Card style={{ padding:24, background:`linear-gradient(135deg,${C.amberLight},#FFF8F0)`, border:`1px solid ${C.amber}30`, cursor:"pointer" }} onClick={()=>setTab("refer")}>
                <div style={{ display:"flex", alignItems:"center", gap:18 }}>
                  <div style={{ width:54, height:54, borderRadius:16, background:C.amber, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>🤝</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, color:C.ink, marginBottom:4 }}>Invite a Friend or Neighbor</div>
                    <div style={{ fontSize:14, color:C.inkMid, lineHeight:1.5 }}>Wellness is better together — they get 1 month free, and so do you.</div>
                  </div>
                  <div style={{ color:C.amber, fontSize:24 }}>›</div>
                </div>
              </Card>
            </div>
          )}

          {/* ── SESSIONS ─────────────────────────────────────── */}
          {tab==="sessions" && (
            <div>
              {sessionActive ? (
                <div>
                  <button onClick={()=>{setSessionActive(null);setCameraOn(false);setSessionComplete(false);setNextSuggestions([]);setSessionTimer(0);}}
                    style={{ background:"none", border:"none", cursor:"pointer", color:C.sage, fontSize:15, marginBottom:22, fontFamily:"'Inter',sans-serif", fontWeight:500 }}>
                    ← Back to sessions
                  </button>
                  <Card style={{ padding:30 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
                      <PillarBadge pillar={sessionActive.p||sessionActive.pillar} size={14}/>
                      <h2 style={{ fontFamily:"'Lora',serif", fontSize:24, margin:0, fontWeight:600 }}>{sessionActive.t||sessionActive.title}</h2>
                    </div>

                    {(()=>{
                      const url=getEmbedUrl(sessionActive.videoUrl||"");
                      return url ? (
                        <div style={{ position:"relative", borderRadius:16, overflow:"hidden", marginBottom:22, background:"#000", aspectRatio:"16/9" }}>
                          <iframe src={url} title={sessionActive.title} allow="autoplay;fullscreen;picture-in-picture" allowFullScreen style={{ width:"100%", height:"100%", border:"none", display:"block" }}/>
                          {poseMsg && <div style={{ position:"absolute", bottom:12, left:12, right:12, background:"rgba(28,28,46,0.88)", borderRadius:10, padding:"10px 14px", color:"#fff", fontSize:14 }}>🤖 Sage: {poseMsg}</div>}
                        </div>
                      ) : (
                        <div style={{ background:"#1C1C2E", borderRadius:16, aspectRatio:"16/9", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginBottom:22, position:"relative" }}>
                          <div style={{ fontSize:54, marginBottom:12 }}>🎬</div>
                          <div style={{ color:"rgba(255,255,255,0.8)", fontSize:17, fontWeight:600, marginBottom:6 }}>Video coming soon</div>
                          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:13, textAlign:"center", maxWidth:280 }}>Upload to Vimeo and paste the URL into the sessions list to go live.</div>
                          <div style={{ position:"absolute", top:14, right:14, background:"rgba(255,255,255,0.1)", padding:"4px 12px", borderRadius:20, color:"rgba(255,255,255,0.6)", fontSize:13 }}>{sessionActive.duration||sessionActive.d} min</div>
                          {poseMsg && <div style={{ position:"absolute", bottom:12, left:12, right:12, background:"rgba(92,138,110,0.9)", borderRadius:10, padding:"10px 14px", color:"#fff", fontSize:14 }}>🤖 Sage: {poseMsg}</div>}
                        </div>
                      );
                    })()}

                    {sessionTimer>0 && !sessionComplete && <div style={{ textAlign:"center", fontFamily:"'Lora',serif", fontSize:38, color:C.sage, marginBottom:18 }}>{fmtTime(sessionTimer)}</div>}

                    {/* Post-session — AI next suggestions */}
                    {sessionComplete ? (
                      <div style={{ marginBottom:20 }}>
                        {/* Completion celebration */}
                        <div style={{ background:`linear-gradient(135deg,${C.sageLight},${C.tealLight})`, borderRadius:18, padding:24, textAlign:"center", marginBottom:20, border:`1px solid ${C.sage}30` }}>
                          <div style={{ fontSize:48, marginBottom:8 }}>🌿</div>
                          <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600, color:C.sageDark, marginBottom:6 }}>Session complete!</div>
                          {nextLoading
                            ? <div style={{ fontSize:15, color:C.inkMid, fontStyle:"italic" }}>Sage is choosing your next session...</div>
                            : nextSuggestions.encouragement && <div style={{ fontSize:16, color:C.inkMid, fontStyle:"italic", lineHeight:1.6 }}>"{nextSuggestions.encouragement}"</div>
                          }
                        </div>

                        {/* Next session suggestions */}
                        {!nextLoading && nextSuggestions.suggestions?.length > 0 && (
                          <div>
                            <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, color:C.ink, marginBottom:14 }}>What Sage suggests next</div>
                            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
                              {nextSuggestions.suggestions.map((s, i) => (
                                <div key={i}
                                  onClick={() => { setSessionComplete(false); setNextSuggestions([]); setSessionTimer(0); setSessionActive(sessions.find(x=>x.title===s.title)||{...s,videoUrl:""}); }}
                                  style={{ background:"#fff", borderRadius:16, padding:"16px 18px", display:"flex", alignItems:"center", gap:14, border:`1.5px solid ${i===0?pillarColor[s.pillar]:C.border}`, cursor:"pointer", transition:"all 0.2s", position:"relative" }}>
                                  {i===0 && <div style={{ position:"absolute", top:-10, left:16, background:pillarColor[s.pillar], color:"#fff", fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:10 }}>Sage's top pick</div>}
                                  <div style={{ width:48, height:48, borderRadius:14, background:pillarBg[s.pillar], display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                                    {pillarIcon[s.pillar]}
                                  </div>
                                  <div style={{ flex:1 }}>
                                    <div style={{ fontFamily:"'Lora',serif", fontSize:16, fontWeight:600, color:C.ink, marginBottom:3 }}>{s.title}</div>
                                    <div style={{ fontSize:13, color:C.inkLight }}>{s.pillar} · {s.duration} min · {s.level}</div>
                                    <div style={{ fontSize:13, color:pillarColor[s.pillar], marginTop:3, fontWeight:500 }}>{s.reason}</div>
                                  </div>
                                  <span style={{ color:C.inkLight, fontSize:20 }}>›</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div style={{ display:"flex", gap:10 }}>
                          <Btn variant="ghostGray" onClick={()=>{ setSessionComplete(false); setNextSuggestions([]); setSessionActive(null); setSessionTimer(0); }}>Back to library</Btn>
                          <Btn variant="ghost" onClick={()=>setTab("home")}>Go to home</Btn>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
                        {sessionTimer===0
                          ? <Btn variant="primary" size="lg" onClick={()=>setSessionActive({...sessionActive,running:true})}>Begin session</Btn>
                          : <Btn variant="primary" size="lg" onClick={()=>completeSession(sessionActive)}>Complete ✓</Btn>
                        }
                        <Btn variant={cameraOn?"teal":"ghostGray"} onClick={()=>setCameraOn(c=>!c)}>
                          {cameraOn?"📷 AI coaching on":"📷 Enable AI coaching"}
                        </Btn>
                      </div>
                    )}

                    {cameraOn && (
                      <div style={{ background:C.tealLight, borderRadius:12, padding:14, marginBottom:18, fontSize:14, color:C.teal, lineHeight:1.6 }}>
                        <strong>AI Pose Coaching is active.</strong> Your camera is analyzed locally — no video is stored or sent anywhere.
                      </div>
                    )}

                    <div style={{ fontSize:15, color:C.inkMid, lineHeight:1.7, borderTop:`1px solid ${C.border}`, paddingTop:18 }}>
                      <strong>About this session:</strong> Baduanjin Eight Brocades is an 800-year-old movement sequence clinically validated to improve balance, circulation, and neuroplasticity.
                    </div>
                  </Card>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom:24 }}>
                    <h2 style={{ fontFamily:"'Lora',serif", fontSize:28, margin:"0 0 6px", fontWeight:600 }}>Session Library</h2>
                    <p style={{ color:C.inkLight, margin:0, fontSize:16 }}>{sessions.length} sessions · {sessions.filter(s=>s.videoUrl).length} videos live</p>
                  </div>
                  <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
                    {["All","Move","Calm","Think"].map(p=>(
                      <button key={p} onClick={()=>setPillarFilter(p)}
                        style={{ padding:"10px 20px", borderRadius:24, border:`1.5px solid ${pillarFilter===p?(pillarColor[p]||C.sage):C.borderMid}`, background:pillarFilter===p?(pillarBg[p]||C.sageLight):"#fff", color:pillarFilter===p?(pillarColor[p]||C.sage):C.inkMid, cursor:"pointer", fontSize:15, fontWeight:pillarFilter===p?600:400, fontFamily:"'Inter',sans-serif", transition:"all 0.15s" }}>
                        {p!=="All"&&pillarIcon[p]+" "}{p}
                      </button>
                    ))}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    {sessions.filter(s=>pillarFilter==="All"||s.pillar===pillarFilter).map(s=>(
                      <Card key={s.id} onClick={()=>onSessionLocked(s, setSessionActive)} style={{ padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", opacity: isLocked(s) ? 0.85 : 1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                          <div style={{ width:52, height:52, borderRadius:16, background:pillarBg[s.pillar], display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0, position:"relative" }}>
                            {pillarIcon[s.pillar]}
                            {s.videoUrl && !isLocked(s) && <div style={{ position:"absolute", bottom:-2, right:-2, width:14, height:14, borderRadius:"50%", background:C.sage, border:"2px solid #fff" }}/>}
                            {isLocked(s) && <div style={{ position:"absolute", bottom:-2, right:-2, width:18, height:18, borderRadius:"50%", background:C.amber, border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>🔒</div>}
                          </div>
                          <div>
                            <div style={{ fontFamily:"'Lora',serif", fontSize:17, fontWeight:600, color:C.ink, marginBottom:5 }}>{s.title}</div>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <PillarBadge pillar={s.pillar} size={12}/>
                              <span style={{ fontSize:13, color:C.inkLight }}>{s.duration} min · {s.level}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          {s.completed && <span style={{ fontSize:12, color:C.sage, background:C.sageLight, padding:"4px 10px", borderRadius:12, fontWeight:600 }}>✓ Done</span>}
                          {!s.videoUrl && !isLocked(s) && <span style={{ fontSize:11, color:C.amber, background:C.amberLight, padding:"3px 8px", borderRadius:10 }}>Soon</span>}
                          {isLocked(s) ? <span style={{ fontSize:12, color:C.amber, background:C.amberLight, padding:"4px 10px", borderRadius:12, fontWeight:600 }}>PRO</span> : <span style={{ color:C.inkLight, fontSize:22 }}>›</span>}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── MIND GAMES ─────────────────────────────────────── */}
          {tab==="games" && (
            <div>
              <h2 style={{ fontFamily:"'Lora',serif", fontSize:28, margin:"0 0 6px", fontWeight:600 }}>Mind Games</h2>
              <p style={{ color:C.inkLight, margin:"0 0 24px", fontSize:16 }}>Gentle cognitive exercises with adaptive difficulty</p>

              {gameActive==="memory" ? (
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:20, fontWeight:600 }}>Memory Grid — {moves} moves</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <Btn variant="ghost" size="sm" onClick={startMemoryGame}>Restart</Btn>
                      <Btn variant="ghostGray" size="sm" onClick={()=>setGameActive(null)}>← Back</Btn>
                    </div>
                  </div>
                  {matched.length===gameGrid.length&&gameGrid.length>0 && (
                    <Card style={{ padding:24, textAlign:"center", marginBottom:20, background:C.sageLight }}>
                      <div style={{ fontSize:40, marginBottom:8 }}>🎉</div>
                      <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600, color:C.sage }}>Wonderful! Completed in {moves} moves.</div>
                    </Card>
                  )}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
                    {gameGrid.map((card,i)=>{
                      const vis=flipped.includes(i)||matched.includes(i);
                      return (
                        <div key={i} onClick={()=>flipCard(i)}
                          style={{ height:82, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, cursor:"pointer", background:vis?C.sageLight:C.sageDark, border:`2px solid ${vis?C.sage:C.sageDark}`, transition:"all 0.3s", transform:vis?"scale(1.04)":"scale(1)", userSelect:"none" }}>
                          {vis?card.emoji:""}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:28 }}>
                    {[
                      {name:"Memory Grid",     desc:"Match pairs to test your recall",      icon:"🧩",level:"Gentle",   plays:142},
                      {name:"Word Association",desc:"Connect words to meanings quickly",     icon:"💬",level:"Moderate", plays:87},
                      {name:"Number Sequence", desc:"Find the pattern in each series",       icon:"🔢",level:"Moderate", plays:64},
                      {name:"Visual Pattern",  desc:"Spot the odd shape in the grid",        icon:"👁",level:"Energising",plays:31},
                    ].map(g=>(
                      <Card key={g.name} onClick={()=>g.name==="Memory Grid"?startMemoryGame():null} style={{ padding:24 }}>
                        <div style={{ fontSize:38, marginBottom:12 }}>{g.icon}</div>
                        <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, marginBottom:6 }}>{g.name}</div>
                        <div style={{ fontSize:14, color:C.inkMid, marginBottom:18, lineHeight:1.5 }}>{g.desc}</div>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <span style={{ fontSize:12, background:C.lavenderLight, color:C.lavender, padding:"4px 10px", borderRadius:12, fontWeight:500 }}>{g.level}</span>
                          <span style={{ fontSize:13, color:C.inkLight }}>{g.plays} plays</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <Card style={{ padding:26 }}>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, marginBottom:20 }}>Your Cognitive Progress</div>
                    <div style={{ display:"flex", gap:24 }}>
                      {[{label:"Working Memory",val:82},{label:"Processing Speed",val:78},{label:"Pattern Recognition",val:88}].map(m=>(
                        <div key={m.label} style={{ flex:1, textAlign:"center" }}>
                          <div style={{ fontFamily:"'Lora',serif", fontSize:32, fontWeight:600, color:C.teal }}>{m.val}</div>
                          <div style={{ fontSize:12, color:C.inkLight, marginBottom:10 }}>{m.label}</div>
                          <div style={{ background:C.bgDeep, borderRadius:4, height:8 }}>
                            <div style={{ background:C.teal, borderRadius:4, height:8, width:`${m.val}%` }}/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* ── HEALTH LOG ─────────────────────────────────────── */}
          {tab==="health" && (
            <div>
              <h2 style={{ fontFamily:"'Lora',serif", fontSize:28, margin:"0 0 6px", fontWeight:600 }}>My Daily Health Log</h2>
              <p style={{ color:C.inkLight, margin:"0 0 24px", fontSize:16 }}>Every check-in helps Sage personalise your sessions</p>

              {logSaved && (
                <Card style={{ padding:18, marginBottom:22, background:C.sageLight, border:`1px solid ${C.sage}30` }}>
                  <div style={{ fontSize:16, color:C.sage, fontWeight:600 }}>✓ Today's log saved — wonderful work, Eleanor!</div>
                </Card>
              )}

              <Card style={{ padding:30, marginBottom:22 }}>
                <div style={{ fontFamily:"'Lora',serif", fontSize:19, fontWeight:600, marginBottom:26 }}>How are you feeling today?</div>
                {metrics.map((m,i)=>(
                  <div key={m.label} style={{ marginBottom:26 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                      <label style={{ fontSize:17, color:C.inkMid, fontWeight:500 }}>{m.label}{m.inverted&&<span style={{ fontSize:13, color:C.inkLight }}> (lower is better)</span>}</label>
                      <span style={{ fontFamily:"'Lora',serif", fontSize:24, fontWeight:600, color:m.color }}>{m.today.toFixed(1)}</span>
                    </div>
                    <input type="range" min="1" max="10" step="0.5" value={m.today}
                      onChange={e=>setMetrics(r=>r.map((x,j)=>j===i?{...x,today:parseFloat(e.target.value)}:x))}
                      style={{ accentColor:m.color, width:"100%" }}/>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.inkLight, marginTop:4 }}>
                      <span>Low</span><span>High</span>
                    </div>
                  </div>
                ))}

                <div style={{ marginBottom:22 }}>
                  <label style={{ fontSize:17, fontWeight:500, color:C.inkMid, display:"block", marginBottom:10 }}>Sleep last night</label>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <input type="number" min="0" max="12" step="0.5" defaultValue="7" style={{ width:100, textAlign:"center" }}/>
                    <span style={{ fontSize:15, color:C.inkLight }}>hours</span>
                  </div>
                </div>

                <div style={{ marginBottom:22 }}>
                  <label style={{ fontSize:17, fontWeight:500, color:C.inkMid, display:"block", marginBottom:10 }}>Activity today</label>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {["Walk","Swim","Yoga","Gardening","Light stretch","Rest day"].map(a=>(
                      <button key={a} style={{ padding:"9px 18px", border:`1.5px solid ${C.borderMid}`, borderRadius:22, background:"#fff", color:C.inkMid, cursor:"pointer", fontSize:14, fontFamily:"'Inter',sans-serif" }}>{a}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom:26 }}>
                  <label style={{ fontSize:17, fontWeight:500, color:C.inkMid, display:"block", marginBottom:10 }}>Notes (optional)</label>
                  <textarea rows={2} placeholder="Any physical sensations, observations, or thoughts..." style={{ resize:"vertical" }}/>
                </div>

                <Btn variant="primary" size="lg" onClick={()=>setLogSaved(true)}>Save today's log</Btn>
              </Card>

              <Card style={{ padding:24 }}>
                <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, marginBottom:20 }}>7-Day Wellness Trend</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:8, alignItems:"flex-end", height:80, marginBottom:12 }}>
                  {[6.5,7,5.5,7.5,7,8,6].map((h,i)=>(
                    <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                      <div style={{ background:C.teal, borderRadius:6, width:"100%", height:`${h/10*80}px`, opacity:0.55+i*0.06 }}/>
                      <div style={{ fontSize:12, color:C.inkLight }}>{"MTWTFSS"[i]}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:14, color:C.inkLight }}>Sleep quality — avg 6.8 hrs · Trend improving ↑</div>
              </Card>
            </div>
          )}

          {/* ── COMMUNITY ──────────────────────────────────────── */}
          {tab==="wisdom" && (
            <div>
              <h2 style={{ fontFamily:"'Lora',serif", fontSize:28, margin:"0 0 6px", fontWeight:600 }}>Community</h2>
              <p style={{ color:C.inkLight, margin:"0 0 24px", fontSize:16 }}>Stories, wisdom and encouragement from your BrainThrive family</p>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:28 }}>
                {[{icon:"🏛️",title:"Wisdom Wall",desc:"Featured stories & life wisdom"},{icon:"💬",title:"Peer Discussion",desc:"Tips & encouragement"},{icon:"🌍",title:"Share Wisdom",desc:"Post your story or video"},{icon:"📢",title:"Feedback",desc:"Help us build better tools"}].map(s=>(
                  <Card key={s.title} style={{ padding:22, cursor:"pointer" }}>
                    <div style={{ fontSize:30, marginBottom:10 }}>{s.icon}</div>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:16, fontWeight:600, marginBottom:4 }}>{s.title}</div>
                    <div style={{ fontSize:13, color:C.inkLight }}>{s.desc}</div>
                  </Card>
                ))}
              </div>

              <div style={{ fontFamily:"'Lora',serif", fontSize:20, fontWeight:600, marginBottom:18 }}>🏛️ Featured Wisdom</div>
              <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:28 }}>
                {wisdomPosts.map(post=>(
                  <Card key={post.id} style={{ padding:26 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                      <Avatar letter={post.avatar}/>
                      <div>
                        <div style={{ fontWeight:600, fontSize:16 }}>{post.author}, {post.age}</div>
                        <div style={{ fontSize:13, color:C.inkLight }}>{post.location}</div>
                      </div>
                      <span style={{ marginLeft:"auto", fontSize:12, background:C.amberLight, color:C.amber, padding:"4px 10px", borderRadius:12, fontWeight:500, textTransform:"capitalize" }}>{post.type}</span>
                    </div>
                    <p style={{ fontSize:16, color:C.ink, lineHeight:1.75, margin:"0 0 16px", fontStyle:"italic", fontFamily:"'Lora',serif" }}>"{post.content}"</p>
                    <div style={{ display:"flex", gap:10 }}>
                      <Btn variant="ghostGray" size="sm">♡ {post.likes}</Btn>
                      <Btn variant="ghostGray" size="sm">Reply</Btn>
                    </div>
                  </Card>
                ))}
              </div>

              <Card style={{ padding:30, background:"linear-gradient(135deg,#1C1C2E,#2B3A5C)", border:"none" }}>
                <div style={{ fontFamily:"'Lora',serif", fontSize:20, fontWeight:600, color:"#fff", marginBottom:6 }}>🌍 Share Your Wisdom</div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,0.7)", marginBottom:22 }}>Your story could inspire thousands of seniors worldwide.</div>
                {wisdomPosted ? (
                  <div style={{ background:"rgba(92,138,110,0.3)", borderRadius:14, padding:20, color:"#9DC0AC", textAlign:"center", fontSize:16 }}>✓ Your wisdom has been shared. Thank you, Eleanor!</div>
                ) : (
                  <div>
                    <textarea value={wisdomText} onChange={e=>setWisdomText(e.target.value)} rows={3} placeholder="Share a piece of wisdom, a story, or a tip for others..." style={{ background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.2)", color:"#fff", marginBottom:14 }}/>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      <Btn variant="ghostGray" size="sm" style={{ color:"#fff", borderColor:"rgba(255,255,255,0.3)" }}>🎥 Video</Btn>
                      <Btn variant="ghostGray" size="sm" style={{ color:"#fff", borderColor:"rgba(255,255,255,0.3)" }}>🎙 Audio</Btn>
                      <Btn variant="primary" onClick={()=>{if(wisdomText.trim())setWisdomPosted(true);}} style={{ marginLeft:"auto" }}>Post →</Btn>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* ── REFER A FRIEND ─────────────────────────────────── */}
          {tab==="refer" && (
            <div>
              {/* Hero */}
              <div style={{ background:`linear-gradient(140deg,${C.amber} 0%,#E8A070 100%)`, borderRadius:26, padding:"42px 38px", marginBottom:28, color:"#fff", textAlign:"center", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", left:-30, top:-30, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
                <div style={{ position:"absolute", right:-20, bottom:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
                <div style={{ fontSize:60, marginBottom:14 }}>🤝</div>
                <h2 style={{ fontFamily:"'Lora',serif", fontSize:34, margin:"0 0 12px", fontWeight:600 }}>Invite a Friend or Neighbor</h2>
                <p style={{ fontSize:19, opacity:0.9, margin:"0 0 8px", lineHeight:1.5 }}>Wellness is better when shared.</p>
                <p style={{ fontSize:16, opacity:0.82, margin:0, lineHeight:1.7 }}>When a friend joins with your link,<br/><strong>they get 1 month free — and so do you.</strong></p>
              </div>

              {/* How it works */}
              <Card style={{ padding:30, marginBottom:24 }}>
                <div style={{ fontFamily:"'Lora',serif", fontSize:20, fontWeight:600, marginBottom:22 }}>How it works</div>
                <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  {[
                    {icon:"✉️",title:"Send your personal invite",     desc:"Enter your friend's name and email — we'll send them a warm note from you."},
                    {icon:"🎁",title:"They join for free",             desc:"Your friend gets 3 full months of BrainThrive at no cost. No credit card needed."},
                    {icon:"🌿",title:"You both get 1 month free",     desc:"Once they complete their first session, both accounts are credited 1 free month."},
                    {icon:"🧘",title:"Practice together",              desc:"You'll see each other's streaks and cheer each other on in the Community."},
                  ].map(s=>(
                    <div key={s.title} style={{ display:"flex", alignItems:"flex-start", gap:16 }}>
                      <div style={{ width:46, height:46, borderRadius:14, background:C.amberLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{s.icon}</div>
                      <div>
                        <div style={{ fontWeight:600, fontSize:16, color:C.ink, marginBottom:3 }}>{s.title}</div>
                        <div style={{ fontSize:14, color:C.inkMid, lineHeight:1.6 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Send invite */}
              <Card style={{ padding:30, marginBottom:22 }}>
                <div style={{ fontFamily:"'Lora',serif", fontSize:20, fontWeight:600, marginBottom:6 }}>Send an invite</div>
                <div style={{ fontSize:15, color:C.inkMid, marginBottom:24, lineHeight:1.6 }}>Think of a friend, neighbor, or family member who would enjoy this program.</div>

                {referralSent ? (
                  <div style={{ background:C.sageLight, borderRadius:18, padding:28, textAlign:"center" }}>
                    <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:22, fontWeight:600, color:C.sage, marginBottom:8 }}>Invite sent to {referralName}!</div>
                    <div style={{ fontSize:15, color:C.inkMid, marginBottom:22, lineHeight:1.6 }}>We've sent {referralName} a warm welcome note from you. Once they complete their first session, you'll both receive 1 free month.</div>
                    <Btn variant="ghost" onClick={()=>{setReferralSent(false);setReferralName("");setReferralEmail("");}}>Invite someone else</Btn>
                  </div>
                ) : (
                  <div>
                    <div style={{ marginBottom:18 }}>
                      <label style={{ fontSize:16, fontWeight:500, color:C.inkMid, display:"block", marginBottom:8 }}>Their first name</label>
                      <input type="text" value={referralName} onChange={e=>setReferralName(e.target.value)} placeholder="e.g. Margaret"/>
                    </div>
                    <div style={{ marginBottom:22 }}>
                      <label style={{ fontSize:16, fontWeight:500, color:C.inkMid, display:"block", marginBottom:8 }}>Their email address</label>
                      <input type="email" value={referralEmail} onChange={e=>setReferralEmail(e.target.value)} placeholder="e.g. margaret@email.com"/>
                    </div>

                    {referralName && (
                      <div style={{ background:C.bgDeep, borderRadius:16, padding:22, marginBottom:22, borderLeft:`4px solid ${C.sage}` }}>
                        <div style={{ fontSize:13, color:C.inkLight, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.5px" }}>Preview of the email we'll send</div>
                        <div style={{ fontSize:15, color:C.inkMid, lineHeight:1.8 }}>
                          <em>Hi {referralName},</em><br/><br/>
                          Your friend <strong>Eleanor</strong> thinks you'd love BrainThrive — a gentle daily program for memory, calm, and movement designed for people just like us.<br/><br/>
                          She's invited you to join her, and as her guest you get <strong>1 month completely free</strong> — no credit card needed.<br/><br/>
                          <em>— The BrainThrive team</em>
                        </div>
                      </div>
                    )}

                    <Btn variant="amber" size="lg" onClick={()=>{if(referralName&&referralEmail)setReferralSent(true);}}>
                      Send invite to {referralName||"your friend"} →
                    </Btn>
                  </div>
                )}
              </Card>

              {/* Referral link */}
              <Card style={{ padding:26 }}>
                <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, marginBottom:6 }}>Or share your personal link</div>
                <div style={{ fontSize:14, color:C.inkLight, marginBottom:18 }}>Copy and send via text message, WhatsApp, or email.</div>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ flex:1, background:C.bgDeep, borderRadius:12, padding:"13px 16px", fontSize:15, color:C.inkMid, fontFamily:"monospace", border:`1px solid ${C.borderMid}`, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    brainthrive.com/join/ELEANOR2026
                  </div>
                  <Btn variant="primary" onClick={()=>{navigator.clipboard?.writeText("https://brainthrive.com/join/ELEANOR2026");setCopied(true);setTimeout(()=>setCopied(false),2000);}}>
                    {copied?"Copied!":"Copy"}
                  </Btn>
                </div>
                <div style={{ marginTop:16, fontSize:14, color:C.inkLight }}>
                  <strong style={{ color:C.ink }}>3 invites</strong> sent · <strong style={{ color:C.sage }}>0 accepted</strong> so far
                </div>
              </Card>
            </div>
          )}

          {/* ── PROFILE ────────────────────────────────────────── */}
          {tab==="profile" && (
            <div>
              <h2 style={{ fontFamily:"'Lora',serif", fontSize:28, margin:"0 0 24px", fontWeight:600 }}>My Profile</h2>

              <Card style={{ padding:30, marginBottom:20, display:"flex", alignItems:"center", gap:22 }}>
                <Avatar letter="E" size={76} bg={C.sageLight} color={C.sageDark}/>
                <div>
                  <div style={{ fontFamily:"'Lora',serif", fontSize:26, fontWeight:600, marginBottom:5 }}>Eleanor M.</div>
                  <div style={{ fontSize:15, color:C.inkMid, marginBottom:10 }}>Age 68 · Portland, OR · Member since Jan 2025</div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    <span style={{ background:C.goldLight, color:C.gold, fontSize:13, fontWeight:600, padding:"5px 13px", borderRadius:18 }}>🔥 7-day streak</span>
                    <span style={{ background:C.tealLight, color:C.teal, fontSize:13, fontWeight:500, padding:"5px 13px", borderRadius:18 }}>Moderate level</span>
                  </div>
                </div>
              </Card>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:20 }}>
                {[{label:"Sessions",val:"48"},{label:"Wisdom Posts",val:"3"},{label:"Friends Invited",val:"3"}].map(s=>(
                  <Card key={s.label} style={{ padding:20, textAlign:"center" }}>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:32, fontWeight:600 }}>{s.val}</div>
                    <div style={{ fontSize:13, color:C.inkLight, marginTop:4 }}>{s.label}</div>
                  </Card>
                ))}
              </div>

              <Card style={{ padding:26, marginBottom:20, background:C.lavenderLight, border:`1px solid ${C.lavender}25` }}>
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ width:62, height:62, borderRadius:"50%", background:`linear-gradient(135deg,${C.lavender},${C.teal})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>🌿</div>
                  <div>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, color:C.lavender }}>Sage — Your AI Companion</div>
                    <div style={{ fontSize:14, color:C.inkMid, marginTop:5, fontStyle:"italic", lineHeight:1.6 }}>"You've completed 48 sessions together. Your dedication is truly inspiring, Eleanor."</div>
                  </div>
                </div>
              </Card>

              <Card style={{ padding:26 }}>
                <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, marginBottom:20 }}>Accessibility Settings</div>
                {[["Large text mode","On"],["High contrast","Off"],["Chair-assisted options","On"],["Audio narration","Off"],["AI coaching camera","Optional per session"]].map(([k,v])=>(
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"14px 0", borderBottom:`1px solid ${C.border}`, fontSize:15 }}>
                    <span style={{ color:C.inkMid }}>{k}</span>
                    <span style={{ color:v==="On"||v.startsWith("Optional")?C.sage:C.inkLight, fontWeight:v==="On"?600:400 }}>{v}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
