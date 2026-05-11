import { useState, useEffect } from "react"
import { Brain, Zap, Target, Sparkles, BarChart3, Trophy, Home, BookOpen, Calculator, List, Bot } from "lucide-react"
import "./App.css"

const FLASHCARDS = [
{ id: 1, term: "Amortization", definition: "The process of paying off a debt over time through regular payments that cover both principal and interest." },
{ id: 2, term: "Appraisal", definition: "A professional estimate of a property's market value, typically required by lenders before approving a mortgage." },
{ id: 3, term: "Assessed Value", definition: "The dollar value assigned to a property by a public tax assessor for the purpose of taxation." },
{ id: 4, term: "Buyer's Agent", definition: "A real estate agent who represents the buyer in a transaction, with a fiduciary duty to act in the buyer's best interest." },
{ id: 5, term: "Chain of Title", definition: "A chronological record of all historical transfers of ownership of a property." },
{ id: 6, term: "Closing Costs", definition: "Fees and expenses paid at the closing of a real estate transaction, typically 2-5% of the loan amount." },
{ id: 7, term: "Comparative Market Analysis (CMA)", definition: "An evaluation of similar recently sold properties used to determine a home's market value." },
{ id: 8, term: "Contingency", definition: "A condition that must be met before a real estate contract becomes binding." },
{ id: 9, term: "Deed", definition: "A legal document that transfers ownership of real property from one party to another." },
{ id: 10, term: "Earnest Money", definition: "A deposit made by the buyer to show serious intent to purchase a property." },
{ id: 11, term: "Easement", definition: "The right to use another person's land for a specific purpose." },
{ id: 12, term: "Equity", definition: "The difference between a property's market value and the outstanding mortgage balance." },
{ id: 13, term: "Escrow", definition: "A neutral third party that holds funds and documents until all conditions of a real estate transaction are met." },
{ id: 14, term: "Fee Simple", definition: "The most complete form of ownership — the owner has full control and can sell or pass it to heirs." },
{ id: 15, term: "Fiduciary Duty", definition: "A legal obligation to act in the best interest of the client — includes loyalty, disclosure, confidentiality, and care." },
{ id: 16, term: "Listing Agreement", definition: "A contract between a property owner and a real estate broker authorizing the broker to find a buyer." },
{ id: 17, term: "LTV (Loan-to-Value)", definition: "A ratio comparing the mortgage loan amount to the appraised value of the property." },
{ id: 18, term: "MLS (Multiple Listing Service)", definition: "A shared database used by real estate agents to list and find properties for sale." },
{ id: 19, term: "Mortgage", definition: "A loan used to purchase real estate where the property itself serves as collateral." },
{ id: 20, term: "Title Insurance", definition: "Insurance that protects buyers and lenders against losses from title defects or disputes." },
]

const QUIZ_QUESTIONS = [
{ question: "What is the term for the right to use another person's land for a specific purpose?", options: ["Encumbrance", "Easement", "Lien", "Covenant"], answer: 1, explanation: "An easement is the right to use another's land for a specific purpose, like a utility company running power lines." },
{ question: "Which type of ownership gives the most complete property rights?", options: ["Leasehold", "Life Estate", "Fee Simple", "Joint Tenancy"], answer: 2, explanation: "Fee Simple is the most complete form of ownership — full control, can sell or pass to heirs with no restrictions." },
{ question: "What does CMA stand for?", options: ["Commercial Market Assessment", "Comparative Market Analysis", "Current Mortgage Amount", "Certified Market Agent"], answer: 1, explanation: "CMA = Comparative Market Analysis — used to estimate a home's value by comparing similar recently sold homes." },
{ question: "Earnest money is paid by the:", options: ["Seller to the agent", "Buyer to show intent", "Lender to the title company", "Appraiser to the county"], answer: 1, explanation: "The buyer pays earnest money as a deposit to demonstrate serious intent to purchase the property." },
{ question: "What is amortization?", options: ["Calculating property taxes", "Paying off a debt over time through regular payments", "Transferring a title", "Inspecting a property"], answer: 1, explanation: "Amortization is the process of gradually paying off a loan through scheduled payments covering principal + interest." },
{ question: "A real estate agent's fiduciary duty includes all EXCEPT:", options: ["Loyalty", "Disclosure", "Profit maximization", "Confidentiality"], answer: 2, explanation: "Fiduciary duties are loyalty, disclosure, confidentiality, obedience, reasonable care, and accounting — NOT profit maximization." },
{ question: "What is equity in real estate?", options: ["The tax rate on property", "The appraised minus assessed value", "Market value minus outstanding mortgage", "The down payment amount"], answer: 2, explanation: "Equity = Property Market Value − Outstanding Mortgage Balance." },
{ question: "An escrow account is held by:", options: ["The buyer's bank", "A neutral third party", "The listing agent", "The county recorder"], answer: 1, explanation: "Escrow is held by a neutral third party until all conditions of the transaction are met." },
{ question: "Which document legally transfers property ownership?", options: ["Mortgage", "Title Insurance", "Deed", "Listing Agreement"], answer: 2, explanation: "A deed is the legal document that transfers ownership of real property from seller to buyer." },
{ question: "LTV stands for:", options: ["Listing Terms Value", "Loan-to-Value", "Licensed Transaction Verification", "Land Transfer Value"], answer: 1, explanation: "LTV = Loan-to-Value ratio. It compares your loan amount to the appraised value of the property." },
]

const FORMULAS = [
{ name: "Commission", formula: "Sale Price × Commission Rate", example: "$300,000 × 6% = $18,000", color: "blue" },
{ name: "Loan-to-Value (LTV)", formula: "Loan Amount ÷ Appraised Value × 100", example: "$240,000 ÷ $300,000 × 100 = 80%", color: "emerald" },
{ name: "Down Payment", formula: "Purchase Price × Down Payment %", example: "$300,000 × 20% = $60,000", color: "red" },
{ name: "Gross Rent Multiplier", formula: "Property Price ÷ Annual Gross Rent", example: "$300,000 ÷ $24,000 = 12.5", color: "blue" },
{ name: "Cap Rate", formula: "Net Operating Income ÷ Property Value × 100", example: "$18,000 ÷ $300,000 × 100 = 6%", color: "emerald" },
{ name: "Net Operating Income", formula: "Gross Income − Operating Expenses", example: "$30,000 − $12,000 = $18,000", color: "red" },
{ name: "Depreciation (Residential)", formula: "Property Value ÷ 27.5 years", example: "$275,000 ÷ 27.5 = $10,000/yr", color: "blue" },
{ name: "Property Tax", formula: "Assessed Value × Tax Rate", example: "$200,000 × 1.5% = $3,000", color: "emerald" },
{ name: "Proration (Daily Rate)", formula: "Annual Amount ÷ 365 days", example: "$3,650 ÷ 365 = $10/day", color: "red" },
{ name: "Break-Even Ratio", formula: "(Expenses + Debt Service) ÷ Gross Income", example: "($12,000 + $15,000) ÷ $30,000 = 90%", color: "blue" },
]

const ACHIEVEMENTS = [
{ id: "first_card", name: "First Flip!", icon: "🃏", desc: "Study your first flashcard", xp: 10 },
{ id: "quiz_start", name: "Quiz Taker", icon: "📝", desc: "Complete your first quiz", xp: 25 },
{ id: "perfect_quiz", name: "Perfect Score!", icon: "🌟", desc: "Get 100% on a quiz", xp: 50 },
{ id: "streak_3", name: "On Fire!", icon: "🔥", desc: "3-day streak", xp: 30 },
{ id: "cards_10", name: "Flashcard Fan", icon: "📚", desc: "Study 10 flashcards", xp: 20 },
{ id: "formula_master", name: "Math Wizard", icon: "🧮", desc: "View all formulas", xp: 20 },
]

export default function App() {
const [tab, setTab] = useState("dashboard")
const [xp, setXp] = useState(() => parseInt(localStorage.getItem("xp") || "0"))
const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("streak") || "0"))
const [achievements, setAchievements] = useState(() => JSON.parse(localStorage.getItem("achievements") || "[]"))
const [newAchievement, setNewAchievement] = useState(null)
const [cardsStudied, setCardsStudied] = useState(() => parseInt(localStorage.getItem("cardsStudied") || "0"))
const [formulasViewed, setFormulasViewed] = useState(() => parseInt(localStorage.getItem("formulasViewed") || "0"))

useEffect(() => {
localStorage.setItem("xp", xp)
localStorage.setItem("streak", streak)
localStorage.setItem("achievements", JSON.stringify(achievements))
localStorage.setItem("cardsStudied", cardsStudied)
localStorage.setItem("formulasViewed", formulasViewed)
}, [xp, streak, achievements, cardsStudied, formulasViewed])

const addXP = (amount) => setXp(prev => prev + amount)

const unlockAchievement = (id) => {
if (!achievements.includes(id)) {
const ach = ACHIEVEMENTS.find(a => a.id === id)
setAchievements(prev => [...prev, id])
addXP(ach.xp)
setNewAchievement(ach)
setTimeout(() => setNewAchievement(null), 3000)
}
}

const level = Math.floor(xp / 100) + 1
const xpForLevel = xp % 100

const navItems = [
{ id: "dashboard", icon: <Home size={16} />, label: "Home" },
{ id: "flashcards", icon: <Zap size={16} />, label: "Flashcards" },
{ id: "quiz", icon: <Target size={16} />, label: "Quiz" },
{ id: "formulas", icon: <Calculator size={16} />, label: "Formulas" },
{ id: "terms", icon: <List size={16} />, label: "Key Terms" },
{ id: "tutor", icon: <Bot size={16} />, label: "AI Tutor" },
]

return (
<div className="app">
{/* Notebook background */}
<div className="notebook-bg" />
<div className="dark-overlay" />
{/* Gradient orbs */}
<div className="orb orb-blue" />
<div className="orb orb-emerald" />

{/* Achievement Toast */}
{newAchievement && (
<div className="achievement-toast">
<span>{newAchievement.icon}</span>
<div><strong>Achievement Unlocked!</strong><p>{newAchievement.name} +{newAchievement.xp} XP</p></div>
</div>
)}

{/* Header */}
<header className="header">
<div className="logo">
<div className="logo-icon">RE</div>
<div>
<div className="logo-name">RealPrep</div>
<div className="logo-sub">Ace Your Exam</div>
</div>
</div>
<div className="header-stats">
<div className="stat-pill">⚡ {xp} XP</div>
<div className="stat-pill">🔥 {streak} streak</div>
<div className="stat-pill emerald">🏆 Level {level}</div>
</div>
</header>

{/* XP Bar */}
<div className="xp-bar-container">
<div className="xp-bar" style={{ width: `${xpForLevel}%` }} />
</div>

{/* Nav */}
<nav className="nav">
{navItems.map(t => (
<button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
{t.icon}<span>{t.label}</span>
</button>
))}
</nav>

{/* Content */}
<main className="main">
{tab === "dashboard" && <Dashboard xp={xp} streak={streak} level={level} xpForLevel={xpForLevel} achievements={achievements} cardsStudied={cardsStudied} />}
{tab === "flashcards" && <Flashcards addXP={addXP} unlockAchievement={unlockAchievement} cardsStudied={cardsStudied} setCardsStudied={setCardsStudied} />}
{tab === "quiz" && <Quiz addXP={addXP} unlockAchievement={unlockAchievement} />}
{tab === "formulas" && <Formulas unlockAchievement={unlockAchievement} formulasViewed={formulasViewed} setFormulasViewed={setFormulasViewed} />}
{tab === "terms" && <KeyTerms />}
{tab === "tutor" && <AITutor />}
</main>
</div>
)
}

function Dashboard({ xp, streak, level, xpForLevel, achievements, cardsStudied }) {
return (
<div className="dashboard">
<div className="welcome-card">
<div className="welcome-badge"><span className="pulse-dot" />Study Session Active</div>
<h1 className="gradient-text">Welcome back, Megan!</h1>
<p className="welcome-sub">You're on your way to passing that real estate exam. Keep going!</p>
</div>

<div className="stats-grid">
<div className="stat-card blue"><div className="stat-icon-wrap blue">⚡</div><div className="stat-val">{xp}</div><div className="stat-lbl">Total XP</div></div>
<div className="stat-card emerald"><div className="stat-icon-wrap emerald">🏆</div><div className="stat-val">{level}</div><div className="stat-lbl">Level</div></div>
<div className="stat-card red"><div className="stat-icon-wrap red">🔥</div><div className="stat-val">{streak}</div><div className="stat-lbl">Day Streak</div></div>
<div className="stat-card blue"><div className="stat-icon-wrap blue">🃏</div><div className="stat-val">{cardsStudied}</div><div className="stat-lbl">Cards Studied</div></div>
</div>

<div className="dark-card">
<div className="card-header"><span className="card-title">Level Progress</span><span className="emerald-text">{xpForLevel}/100 XP</span></div>
<div className="level-bar"><div className="level-fill" style={{ width: `${xpForLevel}%` }} /></div>
<p className="muted-text">Level {level} → Level {level + 1}</p>
</div>

<div className="dark-card">
<div className="card-title mb16">🏅 Achievements</div>
<div className="achievements-grid">
{ACHIEVEMENTS.map(ach => (
<div key={ach.id} className={`ach-card ${achievements.includes(ach.id) ? "unlocked" : "locked"}`}>
<div className="ach-icon">{achievements.includes(ach.id) ? ach.icon : "🔒"}</div>
<div className="ach-name">{ach.name}</div>
<div className="ach-desc">{ach.desc}</div>
<div className="ach-xp">+{ach.xp} XP</div>
</div>
))}
</div>
</div>
</div>
)
}

function Flashcards({ addXP, unlockAchievement, cardsStudied, setCardsStudied }) {
const [index, setIndex] = useState(0)
const [flipped, setFlipped] = useState(false)
const [studied, setStudied] = useState(new Set())
const card = FLASHCARDS[index]

const handleFlip = () => {
if (!flipped) {
setFlipped(true)
if (!studied.has(index)) {
setStudied(prev => new Set([...prev, index]))
addXP(5)
const n = cardsStudied + 1
setCardsStudied(n)
if (n === 1) unlockAchievement("first_card")
if (n >= 10) unlockAchievement("cards_10")
}
} else setFlipped(false)
}

const next = () => { setIndex((index + 1) % FLASHCARDS.length); setFlipped(false) }
const prev = () => { setIndex((index - 1 + FLASHCARDS.length) % FLASHCARDS.length); setFlipped(false) }

return (
<div className="section">
<div className="section-header">
<h2 className="gradient-text">Smart Flashcards</h2>
<p className="muted-text">{studied.size}/{FLASHCARDS.length} studied • +5 XP per new card</p>
</div>
<div className={`flip-card ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
<div className="flip-inner">
<div className="flip-front">
<div className="card-badge blue-badge">TERM</div>
<div className="card-term">{card.term}</div>
<div className="muted-text mt8">Tap to reveal definition</div>
</div>
<div className="flip-back">
<div className="card-badge emerald-badge">DEFINITION</div>
<div className="card-def">{card.definition}</div>
</div>
</div>
</div>
<div className="card-controls">
<button className="btn btn-ghost" onClick={prev}>← Prev</button>
<span className="muted-text">{index + 1} / {FLASHCARDS.length}</span>
<button className="btn btn-gradient" onClick={next}>Next →</button>
</div>
</div>
)
}

function Quiz({ addXP, unlockAchievement }) {
const [qIndex, setQIndex] = useState(0)
const [selected, setSelected] = useState(null)
const [score, setScore] = useState(0)
const [done, setDone] = useState(false)
const [started, setStarted] = useState(false)
const q = QUIZ_QUESTIONS[qIndex]

const handleAnswer = (i) => {
if (selected !== null) return
setSelected(i)
if (i === q.answer) { addXP(10); setScore(p => p + 1) }
}

const handleNext = () => {
if (qIndex + 1 >= QUIZ_QUESTIONS.length) {
setDone(true)
unlockAchievement("quiz_start")
if (score + (selected === q.answer ? 1 : 0) === QUIZ_QUESTIONS.length) unlockAchievement("perfect_quiz")
} else { setQIndex(qIndex + 1); setSelected(null) }
}

const restart = () => { setQIndex(0); setSelected(null); setScore(0); setDone(false); setStarted(false) }

if (!started) return (
<div className="section center-section">
<h2 className="gradient-text">Practice Exam</h2>
<p className="muted-text">{QUIZ_QUESTIONS.length} questions • +10 XP per correct answer</p>
<button className="btn btn-gradient btn-big" onClick={() => setStarted(true)}>Start Quiz 🚀</button>
</div>
)

if (done) {
const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100)
return (
<div className="section center-section">
<div className="score-ring"><div className="score-pct">{pct}%</div><div className="score-lbl">Score</div></div>
<h2 className="gradient-text">{pct >= 80 ? "Outstanding!" : pct >= 60 ? "Nice Work!" : "Keep Studying!"}</h2>
<p className="muted-text">{score}/{QUIZ_QUESTIONS.length} correct • {score * 10} XP earned</p>
<button className="btn btn-gradient" onClick={restart}>Try Again</button>
</div>
)
}

return (
<div className="section">
<div className="quiz-header-row">
<span className="muted-text">Question {qIndex + 1}/{QUIZ_QUESTIONS.length}</span>
<span className="emerald-text font-bold">Score: {score}</span>
</div>
<div className="progress-bar"><div className="progress-fill" style={{ width: `${(qIndex / QUIZ_QUESTIONS.length) * 100}%` }} /></div>
<div className="dark-card">
<h3 className="question-text">{q.question}</h3>
<div className="options">
{q.options.map((opt, i) => (
<button key={i} className={`option ${selected !== null ? (i === q.answer ? "correct" : i === selected ? "wrong" : "") : ""}`} onClick={() => handleAnswer(i)}>
<span className="option-letter">{["A","B","C","D"][i]}</span>{opt}
</button>
))}
</div>
{selected !== null && (
<div className={`explanation ${selected === q.answer ? "correct-exp" : "wrong-exp"}`}>
<strong>{selected === q.answer ? "✅ Correct!" : "❌ Not quite!"}</strong>
<p>{q.explanation}</p>
</div>
)}
</div>
{selected !== null && (
<button className="btn btn-gradient" onClick={handleNext}>
{qIndex + 1 >= QUIZ_QUESTIONS.length ? "See Results 🎉" : "Next Question →"}
</button>
)}
</div>
)
}

function Formulas({ unlockAchievement, formulasViewed, setFormulasViewed }) {
const [viewed, setViewed] = useState(new Set())
const handleView = (i) => {
if (!viewed.has(i)) {
const n = new Set([...viewed, i])
setViewed(n)
const c = formulasViewed + 1
setFormulasViewed(c)
if (c >= FORMULAS.length) unlockAchievement("formula_master")
}
}
return (
<div className="section">
<div className="section-header">
<h2 className="gradient-text">Formulas</h2>
<p className="muted-text">Tap to expand • {viewed.size}/{FORMULAS.length} reviewed</p>
</div>
<div className="formulas-grid">
{FORMULAS.map((f, i) => <FormulaCard key={i} formula={f} onView={() => handleView(i)} />)}
</div>
</div>
)
}

function FormulaCard({ formula, onView }) {
const [open, setOpen] = useState(false)
return (
<div className={`formula-card ${formula.color} ${open ? "open" : ""}`} onClick={() => { setOpen(!open); if (!open) onView() }}>
<div className="formula-name">{formula.name}</div>
{open && <div className="formula-body"><div className="formula-eq">{formula.formula}</div><div className="formula-ex">📌 {formula.example}</div></div>}
</div>
)
}

function KeyTerms() {
const [search, setSearch] = useState("")
const filtered = FLASHCARDS.filter(c => c.term.toLowerCase().includes(search.toLowerCase()) || c.definition.toLowerCase().includes(search.toLowerCase()))
return (
<div className="section">
<div className="section-header">
<h2 className="gradient-text">Key Terms Glossary</h2>
<p className="muted-text">{FLASHCARDS.length} terms</p>
</div>
<input className="search-input" placeholder="🔍 Search terms..." value={search} onChange={e => setSearch(e.target.value)} />
<div className="terms-list">
{filtered.map(card => (
<div key={card.id} className="term-item">
<div className="term-name">{card.term}</div>
<div className="term-def">{card.definition}</div>
</div>
))}
</div>
</div>
)
}

function AITutor() {
const [messages, setMessages] = useState([{ role: "assistant", text: "Hey! I'm your AI real estate tutor 🏠 Ask me anything about concepts, formulas, or exam topics!" }])
const [input, setInput] = useState("")
const [loading, setLoading] = useState(false)
const [apiKey, setApiKey] = useState(() => localStorage.getItem("geminiKey") || "")
const [showKey, setShowKey] = useState(!localStorage.getItem("geminiKey"))

const saveKey = () => { localStorage.setItem("geminiKey", apiKey); setShowKey(false) }

const send = async () => {
if (!input.trim() || loading) return
const msg = input.trim(); setInput("")
setMessages(p => [...p, { role: "user", text: msg }]); setLoading(true)
try {
const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
method: "POST", headers: { "Content-Type": "application/json" },
body: JSON.stringify({ contents: [{ parts: [{ text: `You are a friendly real estate exam prep tutor. Be concise and helpful. Student asks: ${msg}` }] }] })
})
const data = await res.json()
const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Try again!"
setMessages(p => [...p, { role: "assistant", text: reply }])
} catch { setMessages(p => [...p, { role: "assistant", text: "Error — check your API key." }]) }
setLoading(false)
}

if (showKey) return (
<div className="section">
<h2 className="gradient-text">AI Tutor Setup</h2>
<div className="dark-card">
<p className="muted-text mb16">Enter your Google Gemini API key to enable the AI tutor.</p>
<p className="muted-text mb16">Get a free key at <strong className="emerald-text">aistudio.google.com</strong></p>
<input className="search-input" type="password" placeholder="AIza..." value={apiKey} onChange={e => setApiKey(e.target.value)} />
<button className="btn btn-gradient mt16" onClick={saveKey}>Save & Enable Tutor</button>
</div>
</div>
)

return (
<div className="section tutor-section">
<div className="tutor-header-row">
<h2 className="gradient-text">AI Tutor</h2>
<button className="btn-ghost-sm" onClick={() => setShowKey(true)}>Change Key</button>
</div>
<div className="messages">
{messages.map((m, i) => (
<div key={i} className={`message ${m.role}`}><div className="bubble">{m.text}</div></div>
))}
{loading && <div className="message assistant"><div className="bubble loading">Thinking...</div></div>}
</div>
<div className="chat-row">
<input className="chat-input" placeholder="Ask anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
<button className="btn btn-gradient" onClick={send} disabled={loading}>Send</button>
</div>
</div>
)
}

