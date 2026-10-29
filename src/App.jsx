import { useState, useEffect, useRef } from 'react';
import { VEH, Q } from './data.js';
import { Veh } from './Icons.jsx';

function Home({ onStart }) {
  return (
    <div className="home">
      <div className="siren s1" /><div className="siren s2" />
      <div className="kicker">שבוע הזהירות בדרכים</div>
      <h1 className="title">מתאוריה<br />לפרקטיקה</h1>
      <p className="tag">שנייה אחת של חוסר תשומת לב מספיקה כדי לשנות הכול</p>
      <svg className="hero" viewBox="0 0 1080 760">
        <defs>
          <radialGradient id="hl"><stop offset="0" stopColor="#fff7c2" stopOpacity=".95" /><stop offset="1" stopColor="#fff7c2" stopOpacity="0" /></radialGradient>
        </defs>
        <polygon points="440,0 640,0 1080,760 0,760" fill="#14171d" />
        <line x1="540" y1="0" x2="540" y2="760" stroke="#e9e9e9" strokeWidth="10" strokeDasharray="34 46" className="dash" />
        <circle cx="250" cy="640" r="300" fill="url(#hl)" className="pulse" /><circle cx="830" cy="640" r="300" fill="url(#hl)" className="pulse" />
        <g fill="#05070a"><circle cx="540" cy="330" r="30" /><rect x="500" y="362" width="80" height="150" rx="34" /><rect x="506" y="500" width="26" height="110" rx="10" /><rect x="548" y="500" width="26" height="110" rx="10" /></g>
        <circle cx="540" cy="460" r="60" fill="none" stroke="#ff3b3b" strokeWidth="6" className="ring" />
      </svg>
      <button className="cta" onClick={onStart}>התחלה</button>
    </div>
  );
}

function Pick({ onPick, onBack }) {
  return (
    <div className="pick">
      <h2 className="h2">בחרו כלי רכב</h2>
      <p className="sub">לכל כלי רכב חמש שאלות תאוריה. טעות אחת נגמרת בהתנגשות.</p>
      {Object.entries(VEH).map(([k, v]) => (
        <button key={k} className="card" style={{ '--k': v.color }} onClick={() => onPick(k)}>
          <div className="cardIcon"><Veh t={k === 'car' ? 'car' : k} c={v.color} /></div>
          <div className="cardTxt"><div className="h3">{v.name}</div><div className="small">5 שאלות</div></div>
        </button>
      ))}
      <button className="ghost" onClick={onBack}>חזרה</button>
    </div>
  );
}

function Scene({ q, vk, ph }) {
  const go = ph === 'drive' || ph === 'ok';
  return (
    <div className={`scene ${ph} ${go ? 'go' : ''}`}>
      <div className={`road ${go ? 'go' : ''}`} />
      {q.night && <div className="night" />}
      <div className="it p prop" style={{ '--x': '10%' }}>{q.prop}</div>
      {q.zebra && <div className="it p z" style={{ '--x': '50%' }} />}
      {q.acts.map((a, i) => (
        <div key={i} className={`it ${a.m}`} style={{ '--x': a.x || '50%', '--r': a.r + 'deg' }}><Veh t={a.t} c={a.c} /></div>
      ))}
      <div className="me"><Veh t={vk} c={VEH[vk].color} /></div>
      {ph === 'crash' && <><div className="boom">💥</div><div className="flash" /></>}
      <div className="cap">{q.cap}</div>
      {ph === 'ok' && <div className="ban g">נכון! +20 נקודות</div>}
      {ph === 'crash' && <div className="ban r">התנגשות! המשחק נגמר</div>}
    </div>
  );
}

export default function App() {
  const [s, setS] = useState(1), [scr, setScr] = useState('home'), [vk, setVk] = useState('car');
  const [i, setI] = useState(0), [ph, setPh] = useState('drive'), [pick, setPick] = useState(null), [sc, setSc] = useState(0);
  const idle = useRef();

  useEffect(() => {
    const f = () => setS(Math.min(innerWidth / 1080, innerHeight / 1920));
    f(); addEventListener('resize', f); return () => removeEventListener('resize', f);
  }, []);
  // מסך טוטם: חזרה למסך הבית לאחר 90 שניות ללא מגע
  const bump = () => { clearTimeout(idle.current); if (scr !== 'home') idle.current = setTimeout(() => setScr('home'), 90000); };
  useEffect(() => { bump(); }, [scr, i, ph]);
  useEffect(() => {
    if (scr !== 'play' || ph !== 'drive') return;
    const t = setTimeout(() => setPh('ask'), 2400);
    return () => clearTimeout(t);
  }, [scr, ph, i]);

  const start = k => { setVk(k); setI(0); setSc(0); setPick(null); setPh('drive'); setScr('play'); };
  const qs = Q[vk], q = qs[i];
  const answer = k => {
    if (ph !== 'ask') return;
    const ok = k === q.c;
    setPick(k); setPh(ok ? 'ok' : 'crash');
    if (ok) setSc(x => x + 20);
    setTimeout(() => {
      if (!ok || i + 1 >= qs.length) setScr('end');
      else { setI(i + 1); setPick(null); setPh('drive'); }
    }, ok ? 2200 : 3400);
  };
  const win = ph === 'ok';

  return (
    <div className="wrap" onPointerDown={bump}>
      <div className="stage" style={{ transform: `translate(-50%,-50%) scale(${s})` }}>
        {scr === 'home' && <Home onStart={() => setScr('pick')} />}
        {scr === 'pick' && <Pick onPick={start} onBack={() => setScr('home')} />}
        {scr === 'play' && (
          <>
            <Scene key={i + vk} q={q} vk={vk} ph={ph} />
            <div className="hud"><span>{VEH[vk].name}</span><span>שאלה {i + 1} מתוך {qs.length}</span><span>{sc} נק׳</span></div>
            <div className="panel">
              {ph === 'drive' ? <div className="driving">נוסעים... שימו לב לדרך</div> : (
                <>
                  <div className="q">{q.q}</div>
                  {q.a.map((t, k) => (
                    <button key={k} disabled={ph !== 'ask'}
                      className={`ans ${pick !== null && k === q.c ? 'right' : ''} ${pick === k && k !== q.c ? 'wrong' : ''}`}
                      onClick={() => answer(k)}>{t}</button>
                  ))}
                </>
              )}
            </div>
          </>
        )}
        {scr === 'end' && (
          <div className="end">
            <div className="bigE">{win ? '🏁' : '💥'}</div>
            <h2 className="h2">{win ? 'הגעתם ליעד בשלום' : 'הפעם זה נגמר בהתנגשות'}</h2>
            <div className="score">{sc}<small> נקודות</small></div>
            <p className="sub">{win ? 'ידע בתאוריה הוא ההגנה הראשונה שלכם בכביש.' : 'בכביש האמיתי אין הזדמנות שנייה. לפני שנוסעים, לומדים.'}</p>
            <button className="cta" onClick={() => start(vk)}>שחקו שוב</button>
            <button className="ghost" onClick={() => setScr('pick')}>בחירת כלי רכב אחר</button>
            <button className="ghost" onClick={() => setScr('home')}>למסך הראשי</button>
          </div>
        )}
      </div>
    </div>
  );
}
