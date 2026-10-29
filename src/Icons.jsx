// איורי מבט-על קלים (SVG) – כולם "פונים" כלפי מעלה
export function Veh({ t, c = '#e53935' }) {
  const p = { width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid meet' };
  if (t === 'car') return (
    <svg viewBox="0 0 80 160" {...p}>
      <rect x="4" y="22" width="9" height="30" rx="4" fill="#111"/><rect x="67" y="22" width="9" height="30" rx="4" fill="#111"/>
      <rect x="4" y="108" width="9" height="30" rx="4" fill="#111"/><rect x="67" y="108" width="9" height="30" rx="4" fill="#111"/>
      <rect x="9" y="4" width="62" height="152" rx="26" fill={c}/>
      <rect x="16" y="38" width="48" height="26" rx="8" fill="#16222e"/><rect x="16" y="102" width="48" height="20" rx="7" fill="#16222e"/>
      <rect x="18" y="66" width="44" height="34" rx="6" fill="#000" opacity=".22"/>
      <circle cx="20" cy="10" r="5" fill="#fff6b0"/><circle cx="60" cy="10" r="5" fill="#fff6b0"/>
      <rect x="16" y="148" width="14" height="4" fill="#ff2020"/><rect x="50" y="148" width="14" height="4" fill="#ff2020"/>
    </svg>);
  if (t === 'ped') return (
    <svg viewBox="0 0 60 60" {...p}><ellipse cx="30" cy="34" rx="22" ry="11" fill="#ff7043"/><circle cx="30" cy="30" r="10" fill="#f1c9a5"/><circle cx="30" cy="27" r="9" fill="#3e2723"/></svg>);
  if (t === 'blk') return (
    <svg viewBox="0 0 160 60" {...p}><rect x="4" y="12" width="152" height="36" rx="6" fill="#fff"/>
      {[0, 1, 2, 3, 4].map(i => <polygon key={i} points={`${14 + i * 30},48 ${34 + i * 30},12 ${48 + i * 30},12 ${28 + i * 30},48`} fill="#ff5a1f"/>)}</svg>);
  const bike = t === 'bike';
  return (
    <svg viewBox="0 0 60 140" {...p}>
      <rect x={bike ? 25 : 23} y="2" width={bike ? 10 : 14} height="38" rx="6" fill="#111"/>
      <rect x={bike ? 25 : 23} y="100" width={bike ? 10 : 14} height="38" rx="6" fill="#111"/>
      <rect x="26" y="30" width="8" height="84" rx="4" fill={bike ? '#18c4a0' : c}/>
      {!bike && <ellipse cx="30" cy="66" rx="13" ry="24" fill={c}/>}
      <rect x="4" y="34" width="52" height="6" rx="3" fill="#cfd8dc"/>
      <ellipse cx="30" cy="78" rx="17" ry="11" fill="#263238"/><circle cx="30" cy="68" r="10" fill={bike ? '#ffd54f' : '#eceff1'}/>
      {bike && <path d="M33 86 l-8 14 h6 l-4 12 12-16 h-7z" fill="#ffe14d"/>}
    </svg>);
}
