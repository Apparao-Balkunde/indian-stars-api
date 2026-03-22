import { useState, useEffect } from "react";

// ============================================================
// DATA
// ============================================================
const STARS_DATA = [
  { id: 1, name: "Sunny Leone", wikiTitle: "Sunny_Leone", realName: "Karenjit Kaur Vohra", born: "May 13, 1981", age: 43, birthplace: "Sarnia, Canada", nationality: "Canadian-Indian", active: "2001–present", category: "Actress / Model / Entrepreneur", bio: "Sunny Leone is one of the most recognized names in Indian entertainment. She transitioned to Bollywood after Bigg Boss Season 5 (2011). Films: Jism 2, Ragini MMS 2. She runs cosmetics brand Star Struck.", achievements: ["Bigg Boss Season 5", "Jism 2, Ragini MMS 2", "Star Struck cosmetics", "MTV Splitsvilla host"], tags: ["Bollywood", "Model", "Entrepreneur"], instagram: "@sunnyleone", twitter: "@SunnyLeone", color: "#e74c3c", youtube: "https://www.youtube.com/results?search_query=Sunny+Leone", popularity: 98 },
  { id: 2, name: "Sherlyn Chopra", wikiTitle: "Sherlyn_Chopra", realName: "Mona Chopra", born: "Feb 11, 1984", age: 40, birthplace: "Hyderabad, India", nationality: "Indian", active: "2002–present", category: "Actress / Model", bio: "Sherlyn Chopra became the first Indian woman to pose for Playboy magazine in 2012. She has appeared in Telugu and Hindi films.", achievements: ["First Indian in Playboy (2012)", "Telugu & Hindi films", "Bollywood item numbers"], tags: ["Playboy", "Bollywood", "Model"], instagram: "@sherlynchopra", twitter: "@SherlynChopra", color: "#9b59b6", youtube: "https://www.youtube.com/results?search_query=Sherlyn+Chopra", popularity: 82 },
  { id: 3, name: "Poonam Pandey", wikiTitle: "Poonam_Pandey", realName: "Poonam Pandey", born: "Mar 11, 1991", age: 33, birthplace: "Delhi, India", nationality: "Indian", active: "2012–present", category: "Model / Actress", bio: "Poonam Pandey rose to fame via social media. Bollywood debut Nasha (2013). Appeared on Lock Upp (2022).", achievements: ["Nasha (2013)", "Playboy India cover", "Lock Upp 2022"], tags: ["Social Media", "Bollywood", "Model"], instagram: "@poonampandeyreal", twitter: "@iPoonampandey", color: "#e67e22", youtube: "https://www.youtube.com/results?search_query=Poonam+Pandey", popularity: 79 },
  { id: 4, name: "Gehana Vasisth", wikiTitle: "Gehana_Vasisth", realName: "Gehana Vasisth", born: "Nov 30, 1989", age: 35, birthplace: "Delhi, India", nationality: "Indian", active: "2010–present", category: "Actress / Producer", bio: "Gehana Vasisth is an actress and producer known for bold web series and being a vocal advocate for the adult content industry in India.", achievements: ["Hindi films & web series", "Independent producer", "Industry advocate"], tags: ["Web Series", "Producer", "Digital"], instagram: "@gehanavasisth", twitter: "@GehanaVasisth", color: "#1abc9c", youtube: "https://www.youtube.com/results?search_query=Gehana+Vasisth", popularity: 65 },
  { id: 5, name: "Sapna Sappu", wikiTitle: "Sapna_Sappu", realName: "Sapna Sappu", born: "1985", age: 39, birthplace: "Mumbai, India", nationality: "Indian", active: "2005–present", category: "Actress / Model", bio: "Sapna Sappu is a Mumbai-based actress active in bold entertainment, B-grade Bollywood films and web series.", achievements: ["B-grade films", "Web series", "Music videos"], tags: ["B-Grade", "Web Series", "Mumbai"], instagram: "@sapnasappu_official", twitter: "@SapnaSappu", color: "#3498db", youtube: "https://www.youtube.com/results?search_query=Sapna+Sappu", popularity: 60 },
  { id: 6, name: "Naina Ganguly", wikiTitle: "Naina_Ganguly", realName: "Naina Ganguly", born: "1993", age: 31, birthplace: "Kolkata, India", nationality: "Indian", active: "2014–present", category: "Actress / Model", bio: "Naina Ganguly is a Kolkata-born actress in Bengali and Hindi entertainment, known for bold roles in web series.", achievements: ["Bengali & Hindi films", "Web series", "Digital content"], tags: ["Bengali", "Web Series", "Kolkata"], instagram: "@nainaganguly_official", twitter: "@NainaGanguly", color: "#27ae60", youtube: "https://www.youtube.com/results?search_query=Naina+Ganguly", popularity: 55 },
];

const NEWS_DATA = [
  { id: 1, title: "Sunny Leone नवीन Bollywood Film मध्ये!", summary: "Sunny Leone एका मोठ्या Bollywood production मध्ये lead role साठी sign झाल्या आहेत.", time: "2 तासांपूर्वी", tag: "Bollywood", color: "#e74c3c", starId: 1 },
  { id: 2, title: "Sherlyn Chopra ची नवीन Web Series", summary: "Sherlyn Chopra एका popular OTT platform वर नवीन web series मध्ये दिसणार आहेत.", time: "5 तासांपूर्वी", tag: "Web Series", color: "#9b59b6", starId: 2 },
  { id: 3, title: "Poonam Pandey Social Media Record", summary: "Poonam Pandey ने Instagram वर 10 million followers चा milestone गाठला!", time: "1 दिवसापूर्वी", tag: "Social Media", color: "#e67e22", starId: 3 },
  { id: 4, title: "IndianStars App Launch!", summary: "appsla.online वर आता सगळ्या Indian entertainment stars ची माहिती एकाच ठिकाणी!", time: "आत्ताच", tag: "Update", color: "#f39c12", starId: null },
];

const AGE_RANGES = ["All Ages", "Under 30", "30-35", "35-40", "40+"];

// ============================================================
// HELPERS
// ============================================================
const getStorage = (key, def) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } };
const setStorage = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

// ============================================================
// WIKIPEDIA PHOTO HOOK
// ============================================================
const useWikiPhoto = (wikiTitle) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wikiTitle) { setLoading(false); return; }
    const cached = getStorage(`wiki_photo_${wikiTitle}`, null);
    if (cached) { setPhoto(cached); setLoading(false); return; }

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`)
      .then(r => r.json())
      .then(data => {
        const url = data?.thumbnail?.source || data?.originalimage?.source || null;
        if (url) { setStorage(`wiki_photo_${wikiTitle}`, url); setPhoto(url); }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [wikiTitle]);

  return { photo, loading };
};

// ============================================================
// STAR PHOTO COMPONENT
// ============================================================
const StarPhoto = ({ star, size = 56, borderRadius = "50%" }) => {
  const { photo, loading } = useWikiPhoto(star.wikiTitle);
  if (loading) return (
    <div style={{ width: size, height: size, borderRadius, background: `linear-gradient(135deg,${star.color}44,${star.color}22)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animation: "pulse 1.5s infinite" }}>
      <div style={{ width: size * 0.3, height: size * 0.3, borderRadius: "50%", border: `2px solid ${star.color}`, borderTopColor: "transparent", animation: "spin 1s linear infinite" }} />
    </div>
  );
  if (photo) return (
    <img src={photo} alt={star.name} style={{ width: size, height: size, borderRadius, objectFit: "cover", border: `2px solid ${star.color}44`, flexShrink: 0 }} onError={e => { e.target.style.display="none"; }} />
  );
  return (
    <div style={{ width: size, height: size, borderRadius, background: `linear-gradient(135deg,${star.color},${star.color}66)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.4, fontWeight: "900", color: "white", fontFamily: "Georgia,serif", flexShrink: 0 }}>{star.name[0]}</div>
  );
};

// ============================================================
// STAR RATING
// ============================================================
const StarRating = ({ value, onChange, readonly }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} onClick={() => !readonly && onChange && onChange(i)}
        style={{ fontSize: readonly ? "13px" : "20px", cursor: readonly ? "default" : "pointer", color: i <= value ? "#f1c40f" : "#333", transition: "transform 0.1s" }}
        onMouseEnter={e => { if (!readonly) e.target.style.transform = "scale(1.3)"; }}
        onMouseLeave={e => { if (!readonly) e.target.style.transform = "scale(1)"; }}>★</span>
    ))}
  </div>
);

// ============================================================
// NOTIFICATION BELL
// ============================================================
const NotificationBell = ({ notifications, onClear }) => {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ background: "transparent", border: "1px solid #2a2a4a", color: "white", borderRadius: "8px", padding: "7px 10px", cursor: "pointer", fontSize: "16px", position: "relative" }}>
        🔔
        {unread > 0 && <span style={{ position: "absolute", top: "-4px", right: "-4px", background: "#e74c3c", color: "white", borderRadius: "50%", width: "16px", height: "16px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>{unread}</span>}
      </button>
      {open && (
        <div style={{ position: "absolute", right: 0, top: "44px", width: "280px", background: "#1a1a35", border: "1px solid #2a2a4a", borderRadius: "12px", zIndex: 500, boxShadow: "0 10px 40px rgba(0,0,0,0.5)", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #2a2a4a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "white", fontWeight: "700", fontSize: "13px" }}>🔔 Notifications</div>
            <button onClick={onClear} style={{ background: "transparent", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: "11px" }}>Clear</button>
          </div>
          <div style={{ maxHeight: "260px", overflowY: "auto" }}>
            {notifications.length === 0 && <div style={{ padding: "20px", color: "#555", textAlign: "center", fontSize: "12px" }}>कोणतीही notification नाही</div>}
            {notifications.map((n, i) => (
              <div key={i} style={{ padding: "10px 16px", borderBottom: "1px solid #1a1a2e", background: n.read ? "transparent" : "#ffffff05" }}>
                <div style={{ color: n.read ? "#555" : "white", fontSize: "12px", fontWeight: n.read ? "400" : "600" }}>{n.title}</div>
                <div style={{ color: "#444", fontSize: "10px", marginTop: "2px" }}>{n.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// STAR CARD
// ============================================================
const StarCard = ({ star, onClick, isFav, avgRating, commentCount }) => (
  <div onClick={() => onClick(star)} style={{ background: "linear-gradient(145deg,#141428,#1a1a35)", border: `1px solid ${star.color}33`, borderRadius: "16px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s", position: "relative" }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${star.color}22`; e.currentTarget.style.borderColor = `${star.color}66`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = `${star.color}33`; }}>

    {/* Photo Banner */}
    <div style={{ width: "100%", height: "160px", background: `linear-gradient(135deg,${star.color}22,${star.color}11)`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <StarPhoto star={star} size={140} borderRadius="8px" />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 50%, #141428 100%)` }} />
      {isFav && <div style={{ position: "absolute", top: "10px", right: "10px", fontSize: "18px" }}>❤️</div>}
      <div style={{ position: "absolute", top: "10px", left: "10px", background: `${star.color}`, color: "white", borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontWeight: "700" }}>{star.popularity}% 🔥</div>
    </div>

    <div style={{ padding: "14px" }}>
      <div style={{ color: "white", fontWeight: "800", fontSize: "15px", fontFamily: "Georgia,serif", marginBottom: "2px" }}>{star.name}</div>
      <div style={{ color: "#777", fontSize: "11px", marginBottom: "8px" }}>{star.category}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
        <StarRating value={Math.round(parseFloat(avgRating))} readonly />
        <span style={{ color: "#555", fontSize: "11px" }}>{avgRating} • 💬{commentCount}</span>
      </div>
      <div style={{ color: "#aaa", fontSize: "12px", lineHeight: "1.6", marginBottom: "10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{star.bio}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {star.tags.slice(0, 2).map(t => (
            <span key={t} style={{ background: `${star.color}22`, color: star.color, border: `1px solid ${star.color}44`, borderRadius: "20px", padding: "2px 8px", fontSize: "10px", fontWeight: "600" }}>{t}</span>
          ))}
        </div>
        <span style={{ color: "#444", fontSize: "11px" }}>Age: {star.age}</span>
      </div>
    </div>
  </div>
);

// ============================================================
// STAR MODAL
// ============================================================
const StarModal = ({ star, user, ratings, setRatings, comments, setComments, favorites, toggleFavorite, onClose, addNotification }) => {
  const [comment, setComment] = useState("");
  const [myRating, setMyRating] = useState(0);
  if (!star) return null;
  const avgRating = ratings[star.id] ? (ratings[star.id].reduce((a, b) => a + b, 0) / ratings[star.id].length).toFixed(1) : "0.0";
  const starComments = comments[star.id] || [];
  const isFav = favorites.includes(star.id);

  const submitComment = () => {
    if (!comment.trim()) return;
    if (!user) { alert("Comment करण्यासाठी Login करा!"); return; }
    const nc = { user: user.name, text: comment, time: new Date().toLocaleString("mr-IN"), rating: myRating };
    const updated = { ...comments, [star.id]: [nc, ...(comments[star.id] || [])] };
    setComments(updated); setStorage("comments", updated);
    addNotification(`${user.name} ने ${star.name} वर comment केला`);
    setComment(""); setMyRating(0);
  };

  const shareOnWhatsApp = () => {
    const text = `🌟 ${star.name}\n📍 ${star.birthplace}\n🎬 ${star.category}\n⭐ ${avgRating}/5\n\n${star.bio}\n\n🔗 appsla.online`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", backdropFilter: "blur(8px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(145deg,#0f0f22,#141430)", border: `1px solid ${star.color}44`, borderRadius: "20px", maxWidth: "620px", width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: `0 24px 80px ${star.color}33` }}>

        {/* Big Photo Header */}
        <div style={{ position: "relative", height: "220px", background: `linear-gradient(135deg,${star.color}33,${star.color}11)`, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
          <StarPhoto star={star} size={180} borderRadius="12px" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #0f0f22 100%)" }} />
          <div style={{ position: "absolute", top: "14px", right: "14px", display: "flex", gap: "8px" }}>
            <button onClick={() => toggleFavorite(star.id)} style={{ background: isFav ? "#e74c3c22" : "rgba(0,0,0,0.5)", border: `1px solid ${isFav ? "#e74c3c" : "#444"}`, color: isFav ? "#e74c3c" : "white", borderRadius: "8px", padding: "6px 10px", cursor: "pointer" }}>{isFav ? "❤️" : "🤍"}</button>
            <button onClick={shareOnWhatsApp} style={{ background: "rgba(0,0,0,0.5)", border: "1px solid #25d36644", color: "#25d366", borderRadius: "8px", padding: "6px 10px", cursor: "pointer" }}>📲</button>
            <a href={star.youtube} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ background: "rgba(0,0,0,0.5)", border: "1px solid #ff000044", color: "#ff4444", borderRadius: "8px", padding: "6px 10px", textDecoration: "none" }}>▶️</a>
            <button onClick={onClose} style={{ background: "rgba(0,0,0,0.5)", border: "1px solid #444", color: "white", borderRadius: "8px", padding: "6px 10px", cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ position: "absolute", bottom: "14px", left: "20px" }}>
            <div style={{ color: "white", fontSize: "22px", fontWeight: "900", fontFamily: "Georgia,serif", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>{star.name}</div>
            <div style={{ color: star.color, fontSize: "12px", fontWeight: "600" }}>{star.category}</div>
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <StarRating value={Math.round(parseFloat(avgRating))} readonly />
            <span style={{ color: "#aaa", fontSize: "13px" }}>{avgRating}/5 ({(ratings[star.id] || []).length} ratings)</span>
            <span style={{ color: "#555", fontSize: "12px" }}>• 🔥 {star.popularity}%</span>
          </div>

          {/* Info Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "18px" }}>
            {[["जन्म", star.born], ["वय", `${star.age} वर्षे`], ["जन्मस्थान", star.birthplace], ["Active", star.active]].map(([label, val]) => (
              <div key={label} style={{ background: "#ffffff08", borderRadius: "10px", padding: "10px 12px" }}>
                <div style={{ color: "#555", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
                <div style={{ color: "white", fontSize: "12px", fontWeight: "500", marginTop: "2px" }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ color: star.color, fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px" }}>Biography</div>
            <div style={{ color: "#ccc", fontSize: "13px", lineHeight: "1.8" }}>{star.bio}</div>
          </div>

          {/* Achievements */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ color: star.color, fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px" }}>Achievements</div>
            {star.achievements.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", color: "#ddd", fontSize: "12px", marginBottom: "5px" }}>
                <span style={{ color: star.color }}>◆</span>{a}
              </div>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            <a href={star.youtube} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ background: "#ff000022", border: "1px solid #ff000044", borderRadius: "8px", padding: "8px 14px", color: "#ff4444", fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>▶️ YouTube</a>
            <div style={{ background: `${star.color}22`, border: `1px solid ${star.color}44`, borderRadius: "8px", padding: "8px 14px", color: star.color, fontSize: "12px" }}>📸 {star.instagram}</div>
            <div style={{ background: `${star.color}22`, border: `1px solid ${star.color}44`, borderRadius: "8px", padding: "8px 14px", color: star.color, fontSize: "12px" }}>🐦 {star.twitter}</div>
          </div>

          {/* WhatsApp */}
          <button onClick={shareOnWhatsApp} style={{ width: "100%", background: "linear-gradient(90deg,#25d366,#128c7e)", border: "none", color: "white", borderRadius: "12px", padding: "12px", fontSize: "13px", fontWeight: "700", cursor: "pointer", marginBottom: "16px" }}>
            📲 WhatsApp वर Share करा
          </button>

          {/* Give Rating */}
          <div style={{ background: "#ffffff06", borderRadius: "12px", padding: "14px", marginBottom: "16px" }}>
            <div style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>⭐ तुमची Rating द्या</div>
            <StarRating value={myRating} onChange={r => {
              setMyRating(r);
              if (!user) { alert("Rating साठी Login करा!"); return; }
              const updated = { ...ratings, [star.id]: [...(ratings[star.id] || []), r] };
              setRatings(updated); setStorage("ratings", updated);
              addNotification(`तुम्ही ${star.name} ला ${r}⭐ दिली!`);
            }} />
          </div>

          {/* Comments */}
          <div>
            <div style={{ color: star.color, fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>💬 Comments ({starComments.length})</div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment लिहा..." onKeyDown={e => e.key === "Enter" && submitComment()}
                style={{ flex: 1, background: "#ffffff0a", border: "1px solid #2a2a4a", borderRadius: "10px", padding: "10px 12px", color: "white", fontSize: "12px", outline: "none" }} />
              <button onClick={submitComment} style={{ background: star.color, border: "none", color: "white", borderRadius: "10px", padding: "10px 14px", cursor: "pointer", fontWeight: "700", fontSize: "12px" }}>Post</button>
            </div>
            <div style={{ maxHeight: "180px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
              {starComments.length === 0 && <div style={{ color: "#333", fontSize: "12px", textAlign: "center", padding: "16px" }}>अजून comment नाही!</div>}
              {starComments.map((c, i) => (
                <div key={i} style={{ background: "#ffffff08", borderRadius: "10px", padding: "10px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <div style={{ color: star.color, fontSize: "12px", fontWeight: "700" }}>👤 {c.user}</div>
                    <div style={{ color: "#333", fontSize: "10px" }}>{c.time}</div>
                  </div>
                  {c.rating > 0 && <StarRating value={c.rating} readonly />}
                  <div style={{ color: "#ccc", fontSize: "12px", marginTop: "4px" }}>{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// LOGIN MODAL
// ============================================================
const LoginModal = ({ onLogin, onClose }) => {
  const [isReg, setIsReg] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.email || !form.password) { alert("Email आणि Password आवश्यक!"); return; }
    if (isReg && !form.name) { alert("नाव आवश्यक!"); return; }
    const users = getStorage("users", []);
    if (isReg) {
      if (users.find(u => u.email === form.email)) { alert("Email आधीच registered!"); return; }
      const nu = { name: form.name, email: form.email, password: form.password, isAdmin: users.length === 0 };
      setStorage("users", [...users, nu]); onLogin(nu);
    } else {
      const u = users.find(u => u.email === form.email && u.password === form.password);
      if (!u) { alert("Email किंवा Password चुकीचा!"); return; }
      onLogin(u);
    }
    onClose();
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", backdropFilter: "blur(8px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(145deg,#0f0f22,#141430)", border: "1px solid #e74c3c44", borderRadius: "20px", padding: "28px", maxWidth: "360px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "28px", marginBottom: "6px" }}>🎬</div>
          <div style={{ color: "white", fontSize: "20px", fontWeight: "800", fontFamily: "Georgia,serif" }}>{isReg ? "Register" : "Login"}</div>
          <div style={{ color: "#444", fontSize: "11px" }}>IndianStars.info</div>
        </div>
        {isReg && <div style={{ marginBottom: "12px" }}><div style={{ color: "#666", fontSize: "11px", marginBottom: "3px" }}>नाव</div><input value={form.name} onChange={e => set("name", e.target.value)} style={{ width: "100%", boxSizing: "border-box", background: "#ffffff0a", border: "1px solid #2a2a4a", borderRadius: "8px", padding: "10px 12px", color: "white", fontSize: "13px", outline: "none" }} /></div>}
        <div style={{ marginBottom: "12px" }}><div style={{ color: "#666", fontSize: "11px", marginBottom: "3px" }}>Email</div><input value={form.email} onChange={e => set("email", e.target.value)} type="email" style={{ width: "100%", boxSizing: "border-box", background: "#ffffff0a", border: "1px solid #2a2a4a", borderRadius: "8px", padding: "10px 12px", color: "white", fontSize: "13px", outline: "none" }} /></div>
        <div style={{ marginBottom: "20px" }}><div style={{ color: "#666", fontSize: "11px", marginBottom: "3px" }}>Password</div><input value={form.password} onChange={e => set("password", e.target.value)} type="password" style={{ width: "100%", boxSizing: "border-box", background: "#ffffff0a", border: "1px solid #2a2a4a", borderRadius: "8px", padding: "10px 12px", color: "white", fontSize: "13px", outline: "none" }} /></div>
        <button onClick={submit} style={{ width: "100%", background: "linear-gradient(90deg,#e74c3c,#c0392b)", border: "none", color: "white", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: "700", cursor: "pointer", marginBottom: "12px" }}>{isReg ? "✅ Register" : "🔐 Login"}</button>
        <div style={{ textAlign: "center", color: "#444", fontSize: "12px" }}>{isReg ? "Account आहे?" : "नवीन account?"}{" "}<span onClick={() => setIsReg(!isReg)} style={{ color: "#e74c3c", cursor: "pointer", fontWeight: "600" }}>{isReg ? "Login" : "Register"}</span></div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [filterAge, setFilterAge] = useState("All Ages");
  const [activeTab, setActiveTab] = useState("home");
  const [selected, setSelected] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(() => getStorage("currentUser", null));
  const [favorites, setFavorites] = useState(() => getStorage("favorites", []));
  const [ratings, setRatings] = useState(() => getStorage("ratings", {}));
  const [comments, setComments] = useState(() => getStorage("comments", {}));
  const [notifications, setNotifications] = useState(() => getStorage("notifications", []));

  const allTags = ["All", ...Array.from(new Set(STARS_DATA.flatMap(s => s.tags)))];
  const addNotification = (title) => { const n = { title, time: "आत्ताच", read: false }; const u = [n, ...notifications].slice(0, 20); setNotifications(u); setStorage("notifications", u); };
  const clearNotifications = () => { const u = notifications.map(n => ({ ...n, read: true })); setNotifications(u); setStorage("notifications", u); };
  const toggleFavorite = (id) => { const u = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id]; setFavorites(u); setStorage("favorites", u); };
  const handleLogin = (u) => { setUser(u); setStorage("currentUser", u); addNotification(`Welcome, ${u.name}! 🎉`); };
  const handleLogout = () => { setUser(null); setStorage("currentUser", null); };
  const getAvgRating = (id) => { const r = ratings[id]; if (!r || r.length === 0) return "0.0"; return (r.reduce((a, b) => a + b, 0) / r.length).toFixed(1); };

  const popularStars = [...STARS_DATA].sort((a, b) => b.popularity - a.popularity);

  const filtered = STARS_DATA.filter(s => {
    const ms = s.name.toLowerCase().includes(search.toLowerCase()) || s.bio.toLowerCase().includes(search.toLowerCase());
    const mt = filterTag === "All" || s.tags.includes(filterTag);
    const ma = filterAge === "All Ages" || (filterAge === "Under 30" && s.age < 30) || (filterAge === "30-35" && s.age >= 30 && s.age <= 35) || (filterAge === "35-40" && s.age > 35 && s.age <= 40) || (filterAge === "40+" && s.age > 40);
    const mf = activeTab === "favorites" ? favorites.includes(s.id) : true;
    return ms && mt && ma && mf;
  });

  const tabs = [["home", "🏠 Stars"], ["popular", "🔥 Popular"], ["news", "📰 News"], ["favorites", "❤️ Favorites"]];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#080814,#0d0d1e,#080814)", fontFamily: "'Segoe UI',Tahoma,sans-serif", color: "white" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(90deg,#0a0a1e,#0f0f28)", borderBottom: "1px solid #ffffff0a", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div>
          <div style={{ fontSize: "20px", fontWeight: "900", fontFamily: "Georgia,serif", background: "linear-gradient(90deg,#e74c3c,#ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🎬 IndianStars</div>
          <div style={{ color: "#333", fontSize: "10px" }}>appsla.online</div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <NotificationBell notifications={notifications} onClear={clearNotifications} />
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#e74c3c", fontSize: "12px", fontWeight: "600" }}>👤 {user.name}</span>
              <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #2a2a4a", color: "#555", borderRadius: "8px", padding: "5px 8px", cursor: "pointer", fontSize: "11px" }}>Out</button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} style={{ background: "linear-gradient(90deg,#e74c3c,#c0392b)", border: "none", color: "white", borderRadius: "8px", padding: "7px 12px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}>🔐 Login</button>
          )}
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", borderBottom: "1px solid #1a1a2e", background: "#080814", overflowX: "auto" }}>
        {tabs.map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: "transparent", border: "none", borderBottom: activeTab === tab ? "2px solid #e74c3c" : "2px solid transparent", color: activeTab === tab ? "#e74c3c" : "#444", padding: "12px 16px", cursor: "pointer", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", transition: "all 0.2s" }}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 14px" }}>

        {/* POPULAR TAB */}
        {activeTab === "popular" && (
          <div>
            <div style={{ color: "white", fontSize: "18px", fontWeight: "800", fontFamily: "Georgia,serif", marginBottom: "20px" }}>🔥 Most Popular Stars</div>
            {popularStars.map((star, i) => (
              <div key={star.id} onClick={() => setSelected(star)} style={{ background: "linear-gradient(135deg,#141428,#1a1a35)", border: `1px solid ${star.color}33`, borderRadius: "14px", padding: "14px", marginBottom: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${star.color}66`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${star.color}33`}>
                <div style={{ fontSize: "22px", minWidth: "32px", textAlign: "center" }}>{i < 3 ? ["🥇", "🥈", "🥉"][i] : `#${i + 1}`}</div>
                <StarPhoto star={star} size={44} borderRadius="50%" />
                <div style={{ flex: 1 }}>
                  <div style={{ color: "white", fontWeight: "700", fontSize: "14px" }}>{star.name}</div>
                  <div style={{ color: "#666", fontSize: "11px", marginBottom: "5px" }}>{star.category}</div>
                  <div style={{ background: "#ffffff0a", borderRadius: "4px", height: "4px" }}>
                    <div style={{ background: `linear-gradient(90deg,${star.color},${star.color}88)`, borderRadius: "4px", height: "4px", width: `${star.popularity}%`, transition: "width 1s" }} />
                  </div>
                </div>
                <div style={{ color: star.color, fontSize: "18px", fontWeight: "900" }}>{star.popularity}%</div>
              </div>
            ))}
          </div>
        )}

        {/* NEWS TAB */}
        {activeTab === "news" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ color: "white", fontSize: "18px", fontWeight: "800", fontFamily: "Georgia,serif" }}>📰 News & Updates</div>
              <span style={{ background: "#e74c3c22", color: "#e74c3c", border: "1px solid #e74c3c44", borderRadius: "20px", padding: "3px 10px", fontSize: "10px", fontWeight: "700" }}>● LIVE</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {NEWS_DATA.map(news => (
                <div key={news.id} onClick={() => { if (news.starId) setSelected(STARS_DATA.find(s => s.id === news.starId)); }} style={{ background: "linear-gradient(135deg,#141428,#1a1a35)", border: `1px solid ${news.color}33`, borderRadius: "12px", padding: "16px", cursor: news.starId ? "pointer" : "default", transition: "all 0.2s" }}
                  onMouseEnter={e => { if (news.starId) e.currentTarget.style.borderColor = `${news.color}66`; }}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${news.color}33`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{ background: `${news.color}22`, color: news.color, border: `1px solid ${news.color}44`, borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontWeight: "700" }}>{news.tag}</span>
                    <span style={{ color: "#444", fontSize: "10px" }}>{news.time}</span>
                  </div>
                  <div style={{ color: "white", fontWeight: "700", fontSize: "14px", marginBottom: "6px", fontFamily: "Georgia,serif" }}>{news.title}</div>
                  <div style={{ color: "#888", fontSize: "12px", lineHeight: "1.6" }}>{news.summary}</div>
                  {news.starId && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
                      <StarPhoto star={STARS_DATA.find(s => s.id === news.starId)} size={28} borderRadius="50%" />
                      <span style={{ color: news.color, fontSize: "12px", fontWeight: "600" }}>Profile पाहा →</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOME + FAVORITES */}
        {(activeTab === "home" || activeTab === "favorites") && (
          <>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Stars search करा..."
              style={{ width: "100%", boxSizing: "border-box", background: "#0f0f22", border: "1px solid #2a2a4a", borderRadius: "12px", padding: "12px 16px", color: "white", fontSize: "13px", outline: "none", marginBottom: "12px" }}
              onFocus={e => e.target.style.borderColor = "#e74c3c"}
              onBlur={e => e.target.style.borderColor = "#2a2a4a"} />

            <div style={{ marginBottom: "10px" }}>
              <div style={{ color: "#444", fontSize: "10px", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>वयानुसार</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {AGE_RANGES.map(range => (
                  <button key={range} onClick={() => setFilterAge(range)} style={{ background: filterAge === range ? "#e74c3c" : "#0f0f22", border: `1px solid ${filterAge === range ? "#e74c3c" : "#2a2a4a"}`, color: filterAge === range ? "white" : "#666", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}>{range}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
              {allTags.map(tag => (
                <button key={tag} onClick={() => setFilterTag(tag)} style={{ background: filterTag === tag ? "#e74c3c" : "#0f0f22", border: `1px solid ${filterTag === tag ? "#e74c3c" : "#2a2a4a"}`, color: filterTag === tag ? "white" : "#555", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}>{tag}</button>
              ))}
            </div>

            <div style={{ color: "#2a2a4a", fontSize: "11px", marginBottom: "14px" }}>{filtered.length} profiles</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "16px" }}>
              {filtered.map(star => (
                <StarCard key={star.id} star={star} onClick={setSelected} isFav={favorites.includes(star.id)} avgRating={getAvgRating(star.id)} commentCount={(comments[star.id] || []).length} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", color: "#2a2a4a", padding: "50px", fontSize: "15px" }}>
                {activeTab === "favorites" ? "❤️ अजून favorites नाहीत!" : "काही सापडलं नाही 🔍"}
              </div>
            )}
          </>
        )}
      </div>

      {selected && <StarModal star={selected} user={user} ratings={ratings} setRatings={setRatings} comments={comments} setComments={setComments} favorites={favorites} toggleFavorite={toggleFavorite} onClose={() => setSelected(null)} addNotification={addNotification} />}
      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
    </div>
  );
}
