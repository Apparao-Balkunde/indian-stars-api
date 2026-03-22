import { useState, useEffect } from "react";

// ============================================================
// SAMPLE DATA
// ============================================================
const STARS_DATA = [
  { id: 1, name: "Sunny Leone", realName: "Karenjit Kaur Vohra", born: "May 13, 1981", birthplace: "Sarnia, Canada", nationality: "Canadian-Indian", active: "2001–present", category: "Actress / Model / Entrepreneur", bio: "Sunny Leone is one of the most recognized names in Indian entertainment. She transitioned to Bollywood after Bigg Boss Season 5 (2011). Films: Jism 2, Ragini MMS 2. She runs cosmetics brand Star Struck.", achievements: ["Bigg Boss Season 5", "Jism 2, Ragini MMS 2", "Star Struck cosmetics", "MTV Splitsvilla host"], tags: ["Bollywood", "Model", "Entrepreneur"], instagram: "@sunnyleone", twitter: "@SunnyLeone", color: "#e74c3c", photos: ["https://picsum.photos/seed/sunny1/400/300","https://picsum.photos/seed/sunny2/400/300","https://picsum.photos/seed/sunny3/400/300"] },
  { id: 2, name: "Sherlyn Chopra", realName: "Mona Chopra", born: "Feb 11, 1984", birthplace: "Hyderabad, India", nationality: "Indian", active: "2002–present", category: "Actress / Model", bio: "Sherlyn Chopra became the first Indian woman to pose for Playboy magazine in 2012. She has appeared in Telugu and Hindi films and item numbers.", achievements: ["First Indian in Playboy (2012)", "Telugu & Hindi films", "Bollywood item numbers"], tags: ["Playboy", "Bollywood", "Model"], instagram: "@sherlynchopra", twitter: "@SherlynChopra", color: "#9b59b6", photos: ["https://picsum.photos/seed/sherlyn1/400/300","https://picsum.photos/seed/sherlyn2/400/300","https://picsum.photos/seed/sherlyn3/400/300"] },
  { id: 3, name: "Poonam Pandey", realName: "Poonam Pandey", born: "Mar 11, 1991", birthplace: "Delhi, India", nationality: "Indian", active: "2012–present", category: "Model / Actress", bio: "Poonam Pandey rose to fame via social media. Bollywood debut Nasha (2013). Appeared on Lock Upp (2022).", achievements: ["Nasha (2013)", "Playboy India cover", "Lock Upp 2022"], tags: ["Social Media", "Bollywood", "Model"], instagram: "@poonampandeyreal", twitter: "@iPoonampandey", color: "#e67e22", photos: ["https://picsum.photos/seed/poonam1/400/300","https://picsum.photos/seed/poonam2/400/300","https://picsum.photos/seed/poonam3/400/300"] },
  { id: 4, name: "Gehana Vasisth", realName: "Gehana Vasisth", born: "Nov 30, 1989", birthplace: "Delhi, India", nationality: "Indian", active: "2010–present", category: "Actress / Producer", bio: "Gehana Vasisth is an actress and producer known for bold web series and being a vocal advocate for the adult content industry in India.", achievements: ["Hindi films & web series", "Independent producer", "Industry advocate"], tags: ["Web Series", "Producer", "Digital"], instagram: "@gehanavasisth", twitter: "@GehanaVasisth", color: "#1abc9c", photos: ["https://picsum.photos/seed/gehana1/400/300","https://picsum.photos/seed/gehana2/400/300","https://picsum.photos/seed/gehana3/400/300"] },
  { id: 5, name: "Sapna Sappu", realName: "Sapna Sappu", born: "1985", birthplace: "Mumbai, India", nationality: "Indian", active: "2005–present", category: "Actress / Model", bio: "Sapna Sappu is a Mumbai-based actress active in bold entertainment, B-grade Bollywood films and web series.", achievements: ["B-grade films", "Web series", "Music videos"], tags: ["B-Grade", "Web Series", "Mumbai"], instagram: "@sapnasappu_official", twitter: "@SapnaSappu", color: "#3498db", photos: ["https://picsum.photos/seed/sapna1/400/300","https://picsum.photos/seed/sapna2/400/300","https://picsum.photos/seed/sapna3/400/300"] },
  { id: 6, name: "Naina Ganguly", realName: "Naina Ganguly", born: "1993", birthplace: "Kolkata, India", nationality: "Indian", active: "2014–present", category: "Actress / Model", bio: "Naina Ganguly is a Kolkata-born actress in Bengali and Hindi entertainment, known for bold roles in web series.", achievements: ["Bengali & Hindi films", "Web series", "Digital content"], tags: ["Bengali", "Web Series", "Kolkata"], instagram: "@nainaganguly_official", twitter: "@NainaGanguly", color: "#27ae60", photos: ["https://picsum.photos/seed/naina1/400/300","https://picsum.photos/seed/naina2/400/300","https://picsum.photos/seed/naina3/400/300"] },
];

const ALL_TAGS = ["All", ...Array.from(new Set(STARS_DATA.flatMap(s => s.tags)))];

// ============================================================
// STORAGE HELPERS
// ============================================================
const getStorage = (key, def) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } };
const setStorage = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

// ============================================================
// STAR RATING COMPONENT
// ============================================================
const StarRating = ({ value, onChange, readonly }) => (
  <div style={{ display: "flex", gap: "4px" }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} onClick={() => !readonly && onChange && onChange(i)}
        style={{ fontSize: readonly ? "14px" : "20px", cursor: readonly ? "default" : "pointer", color: i <= value ? "#f1c40f" : "#444", transition: "transform 0.1s" }}
        onMouseEnter={e => { if(!readonly) e.target.style.transform="scale(1.3)"; }}
        onMouseLeave={e => { if(!readonly) e.target.style.transform="scale(1)"; }}>★</span>
    ))}
  </div>
);

// ============================================================
// PHOTO GALLERY MODAL
// ============================================================
const GalleryModal = ({ star, onClose }) => {
  const [current, setCurrent] = useState(0);
  if (!star) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.95)", zIndex:2000, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div onClick={e=>e.stopPropagation()} style={{ maxWidth:"600px", width:"100%" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
          <div style={{ color:"white", fontWeight:"700", fontSize:"18px" }}>📸 {star.name} — Gallery</div>
          <button onClick={onClose} style={{ background:"transparent", border:"1px solid #555", color:"white", borderRadius:"8px", padding:"6px 12px", cursor:"pointer" }}>✕</button>
        </div>
        <img src={star.photos[current]} alt={star.name} style={{ width:"100%", borderRadius:"12px", objectFit:"cover", maxHeight:"350px" }} />
        <div style={{ display:"flex", gap:"10px", marginTop:"12px", justifyContent:"center" }}>
          {star.photos.map((p,i) => (
            <img key={i} src={p} alt="" onClick={()=>setCurrent(i)} style={{ width:"70px", height:"50px", borderRadius:"6px", objectFit:"cover", cursor:"pointer", border: i===current ? `2px solid ${star.color}` : "2px solid transparent", opacity: i===current ? 1 : 0.6, transition:"all 0.2s" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// STAR DETAIL MODAL
// ============================================================
const StarModal = ({ star, user, ratings, setRatings, comments, setComments, favorites, toggleFavorite, onGallery, onClose }) => {
  const [comment, setComment] = useState("");
  const [myRating, setMyRating] = useState(0);
  if (!star) return null;

  const avgRating = ratings[star.id] ? (ratings[star.id].reduce((a,b)=>a+b,0) / ratings[star.id].length).toFixed(1) : "0.0";
  const starComments = comments[star.id] || [];
  const isFav = favorites.includes(star.id);

  const submitComment = () => {
    if (!comment.trim()) return;
    if (!user) { alert("Comment करण्यासाठी Login करा!"); return; }
    const newComment = { user: user.name, text: comment, time: new Date().toLocaleString("mr-IN"), rating: myRating };
    const updated = { ...comments, [star.id]: [newComment, ...(comments[star.id]||[])] };
    setComments(updated);
    setStorage("comments", updated);
    setComment(""); setMyRating(0);
  };

  const submitRating = (val) => {
    if (!user) { alert("Rating देण्यासाठी Login करा!"); return; }
    const updated = { ...ratings, [star.id]: [...(ratings[star.id]||[]), val] };
    setRatings(updated);
    setStorage("ratings", updated);
  };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", backdropFilter:"blur(6px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"linear-gradient(145deg,#141428,#1a1a35)", border:`1px solid ${star.color}44`, borderRadius:"20px", padding:"28px", maxWidth:"660px", width:"100%", maxHeight:"88vh", overflowY:"auto", boxShadow:`0 20px 60px ${star.color}22` }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
          <div style={{ display:"flex", gap:"14px", alignItems:"center" }}>
            <div style={{ width:"60px", height:"60px", borderRadius:"50%", background:`linear-gradient(135deg,${star.color},${star.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", fontWeight:"900", color:"white", fontFamily:"Georgia,serif", flexShrink:0 }}>{star.name[0]}</div>
            <div>
              <div style={{ color:"white", fontSize:"22px", fontWeight:"800", fontFamily:"Georgia,serif" }}>{star.name}</div>
              <div style={{ color:star.color, fontSize:"13px", fontWeight:"600" }}>{star.category}</div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginTop:"4px" }}>
                <StarRating value={Math.round(parseFloat(avgRating))} readonly />
                <span style={{ color:"#aaa", fontSize:"12px" }}>{avgRating} ({(ratings[star.id]||[]).length} ratings)</span>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:"8px" }}>
            <button onClick={()=>toggleFavorite(star.id)} style={{ background: isFav ? "#e74c3c22" : "transparent", border:`1px solid ${isFav?"#e74c3c":"#444"}`, color: isFav?"#e74c3c":"#888", borderRadius:"8px", padding:"6px 10px", cursor:"pointer", fontSize:"16px" }}>{isFav?"❤️":"🤍"}</button>
            <button onClick={()=>onGallery(star)} style={{ background:"transparent", border:"1px solid #444", color:"#aaa", borderRadius:"8px", padding:"6px 10px", cursor:"pointer" }}>📸</button>
            <button onClick={onClose} style={{ background:"transparent", border:"1px solid #444", color:"#aaa", borderRadius:"8px", padding:"6px 12px", cursor:"pointer" }}>✕</button>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"20px" }}>
          {[["जन्म","born"],["जन्मस्थान","birthplace"],["राष्ट्रीयत्व","nationality"],["Active","active"]].map(([label,key])=>(
            <div key={key} style={{ background:"#ffffff08", borderRadius:"10px", padding:"10px 14px" }}>
              <div style={{ color:"#666", fontSize:"11px", textTransform:"uppercase", letterSpacing:"1px" }}>{label}</div>
              <div style={{ color:"white", fontSize:"13px", fontWeight:"500", marginTop:"3px" }}>{star[key]}</div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div style={{ marginBottom:"20px" }}>
          <div style={{ color:star.color, fontSize:"11px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"8px" }}>Biography</div>
          <div style={{ color:"#ccc", fontSize:"14px", lineHeight:"1.8" }}>{star.bio}</div>
        </div>

        {/* Achievements */}
        <div style={{ marginBottom:"20px" }}>
          <div style={{ color:star.color, fontSize:"11px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"10px" }}>Achievements</div>
          {star.achievements.map((a,i)=>(
            <div key={i} style={{ display:"flex", gap:"8px", color:"#ddd", fontSize:"13px", marginBottom:"6px" }}>
              <span style={{ color:star.color }}>◆</span>{a}
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div style={{ marginBottom:"24px" }}>
          <div style={{ color:star.color, fontSize:"11px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"10px" }}>Social Media</div>
          <div style={{ display:"flex", gap:"10px" }}>
            <div style={{ background:`${star.color}22`, border:`1px solid ${star.color}44`, borderRadius:"8px", padding:"8px 14px", color:star.color, fontSize:"13px" }}>📸 {star.instagram}</div>
            <div style={{ background:`${star.color}22`, border:`1px solid ${star.color}44`, borderRadius:"8px", padding:"8px 14px", color:star.color, fontSize:"13px" }}>🐦 {star.twitter}</div>
          </div>
        </div>

        {/* Rating */}
        <div style={{ background:"#ffffff06", borderRadius:"12px", padding:"16px", marginBottom:"20px" }}>
          <div style={{ color:"white", fontSize:"14px", fontWeight:"600", marginBottom:"10px" }}>⭐ Rating द्या</div>
          <StarRating value={myRating} onChange={submitRating} />
          <div style={{ color:"#666", fontSize:"12px", marginTop:"6px" }}>Click करून rating द्या</div>
        </div>

        {/* Comments */}
        <div>
          <div style={{ color:star.color, fontSize:"11px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:"12px" }}>💬 Comments ({starComments.length})</div>
          <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
            <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Comment लिहा..." onKeyDown={e=>e.key==="Enter"&&submitComment()}
              style={{ flex:1, background:"#ffffff0a", border:"1px solid #333", borderRadius:"10px", padding:"10px 14px", color:"white", fontSize:"13px", outline:"none" }} />
            <button onClick={submitComment} style={{ background:star.color, border:"none", color:"white", borderRadius:"10px", padding:"10px 16px", cursor:"pointer", fontWeight:"700" }}>Post</button>
          </div>
          <div style={{ maxHeight:"200px", overflowY:"auto", display:"flex", flexDirection:"column", gap:"10px" }}>
            {starComments.length === 0 && <div style={{ color:"#555", fontSize:"13px", textAlign:"center", padding:"20px" }}>अजून comment नाही — पहिला comment करा!</div>}
            {starComments.map((c,i)=>(
              <div key={i} style={{ background:"#ffffff08", borderRadius:"10px", padding:"12px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <div style={{ color:star.color, fontSize:"13px", fontWeight:"700" }}>👤 {c.user}</div>
                  <div style={{ color:"#555", fontSize:"11px" }}>{c.time}</div>
                </div>
                {c.rating > 0 && <StarRating value={c.rating} readonly />}
                <div style={{ color:"#ccc", fontSize:"13px", marginTop:"6px" }}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ADD STAR MODAL (Admin)
// ============================================================
const AddStarModal = ({ onAdd, onClose }) => {
  const [form, setForm] = useState({ name:"", realName:"", born:"", birthplace:"", nationality:"Indian", active:"", category:"", bio:"", instagram:"", twitter:"", color:"#e74c3c" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const submit = () => {
    if (!form.name || !form.bio) { alert("Name आणि Bio आवश्यक आहे!"); return; }
    onAdd({ ...form, id: Date.now(), tags:["New"], achievements:[], photos:["https://picsum.photos/seed/"+form.name+"/400/300"] });
    onClose();
  };
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", backdropFilter:"blur(6px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"linear-gradient(145deg,#141428,#1a1a35)", border:"1px solid #e74c3c44", borderRadius:"20px", padding:"28px", maxWidth:"500px", width:"100%", maxHeight:"88vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
          <div style={{ color:"white", fontSize:"20px", fontWeight:"800", fontFamily:"Georgia,serif" }}>➕ नवीन Star Add करा</div>
          <button onClick={onClose} style={{ background:"transparent", border:"1px solid #444", color:"#aaa", borderRadius:"8px", padding:"6px 12px", cursor:"pointer" }}>✕</button>
        </div>
        {[["name","नाव *"],["realName","खरं नाव"],["born","जन्मतारीख"],["birthplace","जन्मस्थान"],["nationality","राष्ट्रीयत्व"],["active","Active Since"],["category","Category"],["instagram","Instagram"],["twitter","Twitter"]].map(([k,label])=>(
          <div key={k} style={{ marginBottom:"12px" }}>
            <div style={{ color:"#888", fontSize:"12px", marginBottom:"4px" }}>{label}</div>
            <input value={form[k]} onChange={e=>set(k,e.target.value)} style={{ width:"100%", boxSizing:"border-box", background:"#ffffff0a", border:"1px solid #333", borderRadius:"8px", padding:"10px 12px", color:"white", fontSize:"13px", outline:"none" }} />
          </div>
        ))}
        <div style={{ marginBottom:"12px" }}>
          <div style={{ color:"#888", fontSize:"12px", marginBottom:"4px" }}>Bio *</div>
          <textarea value={form.bio} onChange={e=>set("bio",e.target.value)} rows={3} style={{ width:"100%", boxSizing:"border-box", background:"#ffffff0a", border:"1px solid #333", borderRadius:"8px", padding:"10px 12px", color:"white", fontSize:"13px", outline:"none", resize:"vertical" }} />
        </div>
        <div style={{ marginBottom:"20px" }}>
          <div style={{ color:"#888", fontSize:"12px", marginBottom:"4px" }}>Color</div>
          <input type="color" value={form.color} onChange={e=>set("color",e.target.value)} style={{ width:"60px", height:"36px", borderRadius:"8px", border:"none", cursor:"pointer" }} />
        </div>
        <button onClick={submit} style={{ width:"100%", background:"linear-gradient(90deg,#e74c3c,#c0392b)", border:"none", color:"white", borderRadius:"12px", padding:"14px", fontSize:"15px", fontWeight:"700", cursor:"pointer" }}>✅ Star Add करा</button>
      </div>
    </div>
  );
};

// ============================================================
// LOGIN MODAL
// ============================================================
const LoginModal = ({ onLogin, onClose }) => {
  const [isReg, setIsReg] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = () => {
    if (!form.email || !form.password) { alert("Email आणि Password आवश्यक आहे!"); return; }
    if (isReg && !form.name) { alert("नाव आवश्यक आहे!"); return; }
    const users = getStorage("users", []);
    if (isReg) {
      if (users.find(u=>u.email===form.email)) { alert("Email आधीच registered आहे!"); return; }
      const newUser = { name: form.name, email: form.email, password: form.password, isAdmin: users.length === 0 };
      setStorage("users", [...users, newUser]);
      onLogin(newUser);
    } else {
      const user = users.find(u=>u.email===form.email && u.password===form.password);
      if (!user) { alert("Email किंवा Password चुकीचा आहे!"); return; }
      onLogin(user);
    }
    onClose();
  };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", backdropFilter:"blur(6px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"linear-gradient(145deg,#141428,#1a1a35)", border:"1px solid #e74c3c44", borderRadius:"20px", padding:"32px", maxWidth:"400px", width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:"24px" }}>
          <div style={{ fontSize:"32px", marginBottom:"8px" }}>🎬</div>
          <div style={{ color:"white", fontSize:"22px", fontWeight:"800", fontFamily:"Georgia,serif" }}>{isReg ? "Register करा" : "Login करा"}</div>
          <div style={{ color:"#666", fontSize:"13px", marginTop:"4px" }}>IndianStars.info</div>
        </div>
        {isReg && (
          <div style={{ marginBottom:"14px" }}>
            <div style={{ color:"#888", fontSize:"12px", marginBottom:"4px" }}>नाव</div>
            <input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="तुमचं नाव" style={{ width:"100%", boxSizing:"border-box", background:"#ffffff0a", border:"1px solid #333", borderRadius:"10px", padding:"12px 14px", color:"white", fontSize:"14px", outline:"none" }} />
          </div>
        )}
        <div style={{ marginBottom:"14px" }}>
          <div style={{ color:"#888", fontSize:"12px", marginBottom:"4px" }}>Email</div>
          <input value={form.email} onChange={e=>set("email",e.target.value)} placeholder="email@example.com" type="email" style={{ width:"100%", boxSizing:"border-box", background:"#ffffff0a", border:"1px solid #333", borderRadius:"10px", padding:"12px 14px", color:"white", fontSize:"14px", outline:"none" }} />
        </div>
        <div style={{ marginBottom:"24px" }}>
          <div style={{ color:"#888", fontSize:"12px", marginBottom:"4px" }}>Password</div>
          <input value={form.password} onChange={e=>set("password",e.target.value)} placeholder="••••••••" type="password" style={{ width:"100%", boxSizing:"border-box", background:"#ffffff0a", border:"1px solid #333", borderRadius:"10px", padding:"12px 14px", color:"white", fontSize:"14px", outline:"none" }} />
        </div>
        <button onClick={submit} style={{ width:"100%", background:"linear-gradient(90deg,#e74c3c,#c0392b)", border:"none", color:"white", borderRadius:"12px", padding:"14px", fontSize:"15px", fontWeight:"700", cursor:"pointer", marginBottom:"14px" }}>
          {isReg ? "✅ Register करा" : "🔐 Login करा"}
        </button>
        <div style={{ textAlign:"center", color:"#666", fontSize:"13px" }}>
          {isReg ? "आधीच account आहे?" : "नवीन account बनवायचे?"}{" "}
          <span onClick={()=>setIsReg(!isReg)} style={{ color:"#e74c3c", cursor:"pointer", fontWeight:"600" }}>{isReg?"Login करा":"Register करा"}</span>
        </div>
        {!isReg && <div style={{ textAlign:"center", color:"#555", fontSize:"11px", marginTop:"10px" }}>💡 पहिला registered user Admin बनतो!</div>}
      </div>
    </div>
  );
};

// ============================================================
// STAR CARD
// ============================================================
const StarCard = ({ star, onClick, isFav, avgRating, commentCount }) => (
  <div onClick={()=>onClick(star)} style={{ background:"linear-gradient(145deg,#141428,#1a1a35)", border:`1px solid ${star.color}33`, borderRadius:"16px", padding:"20px", cursor:"pointer", transition:"all 0.3s", position:"relative", overflow:"hidden" }}
    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 40px ${star.color}33`; e.currentTarget.style.borderColor=`${star.color}66`; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor=`${star.color}33`; }}>
    {isFav && <div style={{ position:"absolute", top:"12px", right:"12px", fontSize:"16px" }}>❤️</div>}
    <div style={{ display:"flex", gap:"12px", alignItems:"center", marginBottom:"12px" }}>
      <div style={{ width:"50px", height:"50px", borderRadius:"50%", background:`linear-gradient(135deg,${star.color},${star.color}66)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", fontWeight:"900", color:"white", fontFamily:"Georgia,serif", flexShrink:0 }}>{star.name[0]}</div>
      <div>
        <div style={{ color:"white", fontWeight:"700", fontSize:"16px", fontFamily:"Georgia,serif" }}>{star.name}</div>
        <div style={{ color:"#888", fontSize:"12px" }}>{star.category}</div>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginTop:"3px" }}>
          <StarRating value={Math.round(parseFloat(avgRating))} readonly />
          <span style={{ color:"#666", fontSize:"11px" }}>{avgRating}</span>
          <span style={{ color:"#555", fontSize:"11px" }}>• 💬 {commentCount}</span>
        </div>
      </div>
    </div>
    <div style={{ color:"#bbb", fontSize:"12px", lineHeight:"1.6", marginBottom:"12px", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{star.bio}</div>
    <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
      {star.tags.map(t=>(
        <span key={t} style={{ background:`${star.color}22`, color:star.color, border:`1px solid ${star.color}44`, borderRadius:"20px", padding:"2px 10px", fontSize:"11px", fontWeight:"600" }}>{t}</span>
      ))}
    </div>
  </div>
);

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [stars, setStars] = useState(() => {
    const saved = getStorage("customStars", []);
    return [...STARS_DATA, ...saved];
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("home"); // home | favorites
  const [selected, setSelected] = useState(null);
  const [gallerystar, setGallerystar] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddStar, setShowAddStar] = useState(false);
  const [user, setUser] = useState(() => getStorage("currentUser", null));
  const [favorites, setFavorites] = useState(() => getStorage("favorites", []));
  const [ratings, setRatings] = useState(() => getStorage("ratings", {}));
  const [comments, setComments] = useState(() => getStorage("comments", {}));

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id) ? favorites.filter(f=>f!==id) : [...favorites, id];
    setFavorites(updated);
    setStorage("favorites", updated);
  };

  const handleLogin = (u) => { setUser(u); setStorage("currentUser", u); };
  const handleLogout = () => { setUser(null); setStorage("currentUser", null); };

  const handleAddStar = (star) => {
    const updated = [...stars, star];
    setStars(updated);
    const customOnly = updated.filter(s => s.id > 100);
    setStorage("customStars", customOnly);
  };

  const getAvgRating = (id) => {
    const r = ratings[id];
    if (!r || r.length === 0) return "0.0";
    return (r.reduce((a,b)=>a+b,0)/r.length).toFixed(1);
  };

  const allTags = ["All", ...Array.from(new Set(stars.flatMap(s=>s.tags)))];

  const filtered = stars.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.bio.toLowerCase().includes(search.toLowerCase()) || s.tags.some(t=>t.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "All" || s.tags.includes(filter);
    const matchTab = activeTab === "favorites" ? favorites.includes(s.id) : true;
    return matchSearch && matchFilter && matchTab;
  });

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0a0a1a,#0d0d20,#0a0a1a)", fontFamily:"'Segoe UI',Tahoma,sans-serif", color:"white" }}>

      {/* HEADER */}
      <div style={{ background:"linear-gradient(90deg,#141428,#1a1a35)", borderBottom:"1px solid #ffffff0f", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div>
          <div style={{ fontSize:"22px", fontWeight:"900", fontFamily:"Georgia,serif", background:"linear-gradient(90deg,#e74c3c,#c0392b)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>🎬 IndianStars</div>
          <div style={{ color:"#555", fontSize:"11px" }}>Entertainment Profiles</div>
        </div>
        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          {user?.isAdmin && (
            <button onClick={()=>setShowAddStar(true)} style={{ background:"linear-gradient(90deg,#e74c3c,#c0392b)", border:"none", color:"white", borderRadius:"8px", padding:"7px 12px", cursor:"pointer", fontSize:"12px", fontWeight:"700" }}>➕ Add Star</button>
          )}
          {user ? (
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ color:"#e74c3c", fontSize:"13px", fontWeight:"600" }}>👤 {user.name}</div>
              <button onClick={handleLogout} style={{ background:"transparent", border:"1px solid #444", color:"#888", borderRadius:"8px", padding:"6px 10px", cursor:"pointer", fontSize:"12px" }}>Logout</button>
            </div>
          ) : (
            <button onClick={()=>setShowLogin(true)} style={{ background:"linear-gradient(90deg,#e74c3c,#c0392b)", border:"none", color:"white", borderRadius:"8px", padding:"8px 14px", cursor:"pointer", fontSize:"13px", fontWeight:"700" }}>🔐 Login</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"24px 16px" }}>

        {/* TABS */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"20px" }}>
          {[["home","🏠 All Stars"],["favorites","❤️ Favorites"]].map(([tab,label])=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{ background: activeTab===tab ? "linear-gradient(90deg,#e74c3c,#c0392b)" : "#1a1a35", border: activeTab===tab ? "none" : "1px solid #333", color:"white", borderRadius:"10px", padding:"8px 16px", cursor:"pointer", fontSize:"13px", fontWeight:"600" }}>{label}</button>
          ))}
        </div>

        {/* SEARCH */}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search stars, tags..."
          style={{ width:"100%", boxSizing:"border-box", background:"#1a1a35", border:"1px solid #2a2a4a", borderRadius:"12px", padding:"13px 18px", color:"white", fontSize:"14px", outline:"none", marginBottom:"16px" }}
          onFocus={e=>e.target.style.borderColor="#e74c3c"}
          onBlur={e=>e.target.style.borderColor="#2a2a4a"} />

        {/* FILTER TAGS */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"7px", marginBottom:"24px" }}>
          {allTags.map(tag=>(
            <button key={tag} onClick={()=>setFilter(tag)} style={{ background: filter===tag ? "#e74c3c" : "#1a1a35", border:`1px solid ${filter===tag?"#e74c3c":"#2a2a4a"}`, color: filter===tag?"white":"#999", borderRadius:"20px", padding:"5px 14px", fontSize:"12px", cursor:"pointer", fontWeight:"600", transition:"all 0.2s" }}>{tag}</button>
          ))}
        </div>

        {/* RESULTS COUNT */}
        <div style={{ color:"#444", fontSize:"12px", marginBottom:"16px" }}>
          {filtered.length} profiles • {stars.length} total
          {activeTab==="favorites" && <span style={{ color:"#e74c3c" }}> • ❤️ Favorites</span>}
        </div>

        {/* GRID */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"16px" }}>
          {filtered.map(star=>(
            <StarCard key={star.id} star={star} onClick={setSelected} isFav={favorites.includes(star.id)} avgRating={getAvgRating(star.id)} commentCount={(comments[star.id]||[]).length} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", color:"#444", padding:"60px", fontSize:"16px" }}>
            {activeTab==="favorites" ? "❤️ अजून कोणताही star favorite केला नाही!" : `"${search}" साठी काही सापडलं नाही`}
          </div>
        )}
      </div>

      {/* MODALS */}
      {selected && <StarModal star={selected} user={user} ratings={ratings} setRatings={setRatings} comments={comments} setComments={setComments} favorites={favorites} toggleFavorite={toggleFavorite} onGallery={s=>{setGallerystar(s); setSelected(null);}} onClose={()=>setSelected(null)} />}
      {gallerystar && <GalleryModal star={gallerystar} onClose={()=>setGallerystar(null)} />}
      {showLogin && <LoginModal onLogin={handleLogin} onClose={()=>setShowLogin(false)} />}
      {showAddStar && <AddStarModal onAdd={handleAddStar} onClose={()=>setShowAddStar(false)} />}
    </div>
  );
}
