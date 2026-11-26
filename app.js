/* =========================================================
   DISCIPLINE — app logic
   Dữ liệu lưu trong localStorage (key: discipline-v1)
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------- ICONS ---------------- */
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    bars: '<rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevL: '<path d="m15 18-6-6 6-6"/>',
    chevR: '<path d="m9 18 6-6-6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="m7.5 12.2 3 3 6-6.2" stroke="#06281a" stroke-width="2.6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z" fill="currentColor"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2a5 5 0 0 1 6 4.8"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    upload: '<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    sprout: '<path d="M12 21v-9"/><path d="M12 12C12 7 8 5 4 5c0 4 3 7 8 7zM12 10c0-4 3-6 8-6 0 4-3 6-8 6z" fill="currentColor"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
    flame: '<path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-7 0 2 1 3 2 3 0-3 0-5 1-8z"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15.5-6.3L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.3L3 16M3 21v-5h5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 3 2 21h20z"/><path d="M12 10v4M12 17h.01"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    dot: '<circle cx="12" cy="12" r="4" fill="currentColor"/>',
  };
  const icon = (name, cls = '') =>
    `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  const hydrateIcons = (root = document) =>
    $$('i[data-icon]', root).forEach((el) => {
      const tmp = document.createElement('div');
      tmp.innerHTML = icon(el.dataset.icon, el.className);
      el.replaceWith(tmp.firstElementChild);
    });

  /* ---------------- DATE HELPERS ---------------- */
  const pad = (n) => String(n).padStart(2, '0');
  const keyOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseKey = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const todayKey = () => keyOf(today());
  const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const fmtDate = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  const fmtShort = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
  const fmtTime = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const fmtDateTime = (ts) => { const d = new Date(ts); return `${fmtDate(d)} ${fmtTime(d)}`; };
  const startOfWeek = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); const wd = (x.getDay() + 6) % 7; return addDays(x, -wd); };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const r1 = (n) => Math.round(n * 10) / 10;
  const uid = () => Math.random().toString(36).slice(2, 9);

  /* ---------------- CONSTANTS ---------------- */
  const STORE_KEY = 'discipline-v2';
  const LEGACY_KEY = 'discipline-v1'; // bản cũ có dữ liệu mẫu tự sinh — chỉ giữ lại cài đặt
  const DEFAULT_TASKS = [
    { id: 'wake', name: 'Thức dậy đúng giờ', emoji: '⏰' },
    { id: 'study', name: 'Học tập ≥ 4h', emoji: '📚' },
    { id: 'gym', name: 'Tập thể dục', emoji: '💪' },
    { id: 'eat', name: 'Ăn uống lành mạnh', emoji: '🥗' },
    { id: 'sleep', name: 'Đi ngủ sớm', emoji: '🌙' },
  ];
  const DEFAULT_ROUTINE = [
    { id: 'r1', time: '05:30', title: 'Thức dậy, uống nước, vươn vai' },
    { id: 'r2', time: '06:00', title: 'Tập thể dục 45 phút' },
    { id: 'r3', time: '07:30', title: 'Ăn sáng lành mạnh' },
    { id: 'r4', time: '08:00', title: 'Học tập — phiên sáng (2h)' },
    { id: 'r5', time: '14:00', title: 'Học tập — phiên chiều (2h)' },
    { id: 'r6', time: '18:30', title: 'Ăn tối & nghỉ ngơi' },
    { id: 'r7', time: '20:30', title: 'Ôn tập & điểm danh cuối ngày' },
    { id: 'r8', time: '22:30', title: 'Đi ngủ' },
  ];
  const QUOTES = [
    ['Discipline is not about being perfect, but about never giving up.', 'Unknown'],
    ['We are what we repeatedly do. Excellence, then, is not an act, but a habit.', 'Will Durant'],
    ['Discipline is choosing between what you want now and what you want most.', 'Augusta F. Kantra'],
    ['Discipline is the bridge between goals and accomplishment.', 'Jim Rohn'],
    ['Small daily improvements are the key to staggering long-term results.', 'Robin Sharma'],
    ['Kỷ luật hôm nay, tự do ngày mai.', 'Discipline'],
  ];
  const MOTIVATION = ['Tiếp tục cố gắng, {name}! 💪', 'Đừng phá chuỗi, {name}! 🔥', 'Một ngày nữa, một bước tiến nữa 🚀', 'Hôm nay chăm chỉ, ngày mai tự do 🌱'];
  const MILESTONES = [
    { id: 's3', type: 'streak', value: 3, title: 'Khởi động', desc: 'Chuỗi 3 ngày liên tiếp', emoji: '🌱' },
    { id: 's7', type: 'streak', value: 7, title: 'Một tuần thép', desc: 'Chuỗi 7 ngày liên tiếp', emoji: '⚡' },
    { id: 's14', type: 'streak', value: 14, title: 'Hai tuần bền bỉ', desc: 'Chuỗi 14 ngày liên tiếp', emoji: '🔥' },
    { id: 's21', type: 'streak', value: 21, title: 'Hình thành thói quen', desc: 'Chuỗi 21 ngày liên tiếp', emoji: '🧠' },
    { id: 's30', type: 'streak', value: 30, title: 'Chiến binh tháng', desc: 'Chuỗi 30 ngày liên tiếp', emoji: '🛡️' },
    { id: 's50', type: 'streak', value: 50, title: 'Nửa trăm', desc: 'Chuỗi 50 ngày liên tiếp', emoji: '💎' },
    { id: 's100', type: 'streak', value: 100, title: 'Huyền thoại', desc: 'Chuỗi 100 ngày liên tiếp', emoji: '👑' },
    { id: 'c30', type: 'checkins', value: 30, title: 'Chăm chỉ', desc: '30 lần điểm danh', emoji: '✅' },
    { id: 'c100', type: 'checkins', value: 100, title: 'Trăm ngày kỷ luật', desc: '100 lần điểm danh', emoji: '🏅' },
    { id: 'h100', type: 'hours', value: 100, title: 'Mọt sách', desc: 'Tổng 100 giờ học', emoji: '📚' },
    { id: 'h300', type: 'hours', value: 300, title: 'Học giả', desc: 'Tổng 300 giờ học', emoji: '🎓' },
    { id: 'p10', type: 'perfect', value: 10, title: 'Hoàn hảo', desc: '10 ngày hoàn thành 100%', emoji: '⭐' },
    { id: 'p30', type: 'perfect', value: 30, title: 'Bất khả chiến bại', desc: '30 ngày hoàn thành 100%', emoji: '🏆' },
  ];

  /* ---------------- STATE ---------------- */
  let state;
  const ui = {
    route: 'overview',
    miniCal: new Date(today().getFullYear(), today().getMonth(), 1),
    bigCal: new Date(today().getFullYear(), today().getMonth(), 1),
    schedDate: todayKey(),
    weekStart: startOfWeek(today()),
    quickRange: '7',
    actFilter: 'all',
    quoteIdx: 0,
  };

  function seedState() {
    let s = 20251124;
    const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
    const tasks = DEFAULT_TASKS.map((t) => ({ ...t }));
    const days = {};
    const activities = [];
    const t0 = today();

    for (let i = 130; i >= 1; i--) {
      const d = addDays(t0, -i);
      const k = keyOf(d);
      let checked;
      if (i <= 27) checked = true;              // chuỗi hiện tại
      else if (i === 28 || i === 61) checked = false; // ngắt chuỗi
      else if (i >= 62 && i <= 106) checked = true;   // kỷ lục 45 ngày
      else checked = rnd() > 0.25;
      if (!checked && rnd() < 0.4) continue;
      let done = tasks.filter(() => rnd() > (checked ? 0.15 : 0.6)).map((t) => t.id);
      if (checked && !done.includes('wake')) done.push('wake');
      const study = r1(checked ? 3 + rnd() * 4.5 : rnd() * 3);
      if (study >= 4 && !done.includes('study')) done.push('study');
      if (study < 4) done = done.filter((x) => x !== 'study');
      const at = new Date(d); at.setHours(20 + Math.floor(rnd() * 3), Math.floor(rnd() * 60));
      days[k] = { done, study, checkedIn: checked, checkedAt: checked ? at.getTime() : null, note: '' };
      if (checked && i <= 6) {
        const tName = tasks.find((t) => done.includes(t.id) && t.id !== 'wake') || tasks[0];
        activities.push({ id: uid(), ts: at.getTime() - 3600e3 * (1 + rnd()), type: 'task', text: `Hoàn thành mục: ${tName.name} ${tName.emoji}` });
        activities.push({ id: uid(), ts: at.getTime(), type: 'checkin', text: `Đã điểm danh thành công ngày ${fmtShort(d)}!` });
      }
    }
    // hôm nay
    const now = Date.now();
    days[todayKey()] = { done: ['wake', 'study', 'gym'], study: 4.5, checkedIn: false, checkedAt: null, note: '' };
    ['wake', 'study', 'gym'].forEach((id, i) => {
      const t = tasks.find((x) => x.id === id);
      activities.push({ id: uid(), ts: Math.max(t0.getTime() + 60e3, now - (3 - i) * 35 * 60e3), type: 'task', text: `Hoàn thành mục: ${t.name} ${t.emoji}` });
    });
    activities.sort((a, b) => b.ts - a.ts);

    const missions = {};
    missions[todayKey()] = [
      { id: uid(), time: '09:00', title: 'Hoàn thành bài tập chương 3', done: true },
      { id: uid(), time: '15:00', title: 'Đọc 30 trang sách', done: false },
      { id: uid(), time: '19:00', title: 'Chạy bộ 5km', done: false },
    ];

    return {
      version: 1,
      settings: { name: 'bro', theme: 'dark', studyGoal: 4, autoStudyTask: true },
      tasks,
      days,
      activities,
      routine: DEFAULT_ROUTINE.map((r) => ({ ...r })),
      missions,
      unlocked: [],
    };
  }

  // Trạng thái trống: chưa có ngày nào, chuỗi = 0
  function freshState(prev) {
    return {
      version: 2,
      settings: { name: 'bro', theme: 'dark', studyGoal: 4, autoStudyTask: true, ...((prev && prev.settings) || {}) },
      tasks: prev && Array.isArray(prev.tasks) && prev.tasks.length ? prev.tasks : DEFAULT_TASKS.map((t) => ({ ...t })),
      days: {},
      activities: [{ id: uid(), ts: Date.now(), type: 'system', text: 'Bắt đầu hành trình kỷ luật 🚀' }],
      routine: prev && Array.isArray(prev.routine) ? prev.routine : DEFAULT_ROUTINE.map((r) => ({ ...r })),
      missions: {},
      unlocked: [],
      streakResetAt: null,
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.tasks && parsed.days) return normalize(parsed);
      }
      // Bản cũ (v1) tự sinh dữ liệu giả → bỏ dữ liệu ngày, giữ tên/mục/lịch sinh hoạt
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        const old = JSON.parse(legacy);
        localStorage.removeItem(LEGACY_KEY);
        return freshState(old);
      }
    } catch (e) { console.warn('Không đọc được dữ liệu, bắt đầu mới.', e); }
    return freshState();
  }
  function normalize(s) {
    const base = freshState();
    return {
      ...base,
      ...s,
      settings: { ...base.settings, ...(s.settings || {}) },
      activities: s.activities || [],
      routine: s.routine || [],
      missions: s.missions || {},
      unlocked: s.unlocked || [],
    };
  }
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { console.warn(e); } };

  /* ---------------- COMPUTATIONS ---------------- */
  const validDone = (st, k) => { const d = st.days[k]; if (!d) return []; return d.done.filter((id) => st.tasks.some((t) => t.id === id)); };
  const dayRate = (k, st = state) => (st.tasks.length ? validDone(st, k).length / st.tasks.length : 0);
  const isChecked = (k, st = state) => !!(st.days[k] && st.days[k].checkedIn);
  const dayPoints = (k, st = state) => {
    const d = st.days[k]; if (!d) return 0;
    return validDone(st, k).length * 2 + (d.checkedIn ? 2 : 0) + (dayRate(k, st) === 1 ? 3 : 0);
  };

  // Ngày được tính vào chuỗi: đã điểm danh và điểm danh sau lần reset chuỗi gần nhất
  const countsForStreak = (k, st = state) =>
    isChecked(k, st) && (!st.streakResetAt || (st.days[k].checkedAt || 0) > st.streakResetAt);
  function currentStreak(st = state) {
    let d = today();
    if (!countsForStreak(keyOf(d), st)) d = addDays(d, -1);
    let n = 0;
    while (countsForStreak(keyOf(d), st)) { n++; d = addDays(d, -1); }
    return n;
  }
  function bestStreak(st = state) {
    const keys = Object.keys(st.days).filter((k) => countsForStreak(k, st)).sort();
    let best = 0, run = 0, prev = null;
    for (const k of keys) {
      run = prev && keyOf(addDays(parseKey(prev), 1)) === k ? run + 1 : 1;
      best = Math.max(best, run);
      prev = k;
    }
    return best;
  }
  const totals = (st = state) => {
    let checkins = 0, hours = 0, perfect = 0, tasksDone = 0;
    for (const k of Object.keys(st.days)) {
      const d = st.days[k];
      if (d.checkedIn) checkins++;
      hours += +d.study || 0;
      if (st.tasks.length && dayRate(k, st) === 1) perfect++;
      tasksDone += validDone(st, k).length;
    }
    return { checkins, hours: r1(hours), perfect, tasksDone };
  };
  function milestoneValue(m, st = state) {
    const t = totals(st);
    if (m.type === 'streak') return bestStreak(st);
    if (m.type === 'checkins') return t.checkins;
    if (m.type === 'hours') return t.hours;
    if (m.type === 'perfect') return t.perfect;
    return 0;
  }
  const computeUnlocked = (st) => MILESTONES.filter((m) => milestoneValue(m, st) >= m.value);

  function rangeKeys(range) {
    const t = today();
    let start;
    if (range === 'month') start = new Date(t.getFullYear(), t.getMonth(), 1);
    else start = addDays(t, -(Number(range) - 1));
    const keys = [];
    for (let d = new Date(start); d <= t; d = addDays(d, 1)) keys.push(keyOf(d));
    return keys;
  }
  function rangeStats(range) {
    const keys = rangeKeys(range);
    const checked = keys.filter((k) => isChecked(k)).length;
    const studyDays = keys.filter((k) => state.days[k] && state.days[k].study > 0);
    const avgStudy = studyDays.length ? studyDays.reduce((a, k) => a + (+state.days[k].study || 0), 0) / studyDays.length : 0;
    const rate = keys.length ? (keys.reduce((a, k) => a + dayRate(k), 0) / keys.length) * 100 : 0;
    const pts = keys.reduce((a, k) => a + dayPoints(k), 0);
    return { keys, checked, avgStudy: r1(avgStudy), rate: Math.round(rate), pts };
  }

  /* ---------------- MUTATIONS ---------------- */
  const ensureDay = (k) => (state.days[k] ||= { done: [], study: 0, checkedIn: false, checkedAt: null, note: '' });
  function log(type, text) {
    state.activities.unshift({ id: uid(), ts: Date.now(), type, text });
    if (state.activities.length > 400) state.activities.length = 400;
  }
  function checkAchievements() {
    const now = computeUnlocked(state).map((m) => m.id);
    const fresh = now.filter((id) => !state.unlocked.includes(id));
    fresh.forEach((id) => {
      const m = MILESTONES.find((x) => x.id === id);
      log('achievement', `Mở khóa thành tựu: ${m.title} ${m.emoji}`);
      toast(`Thành tựu mới: ${m.title} ${m.emoji}`, 'success', 'trophy');
    });
    state.unlocked = now;
  }
  function toggleTask(k, id) {
    if (parseKey(k) > today()) return toast('Không thể đánh dấu cho ngày trong tương lai', 'warn', 'alert');
    const d = ensureDay(k);
    const t = state.tasks.find((x) => x.id === id);
    if (!t) return;
    if (d.done.includes(id)) d.done = d.done.filter((x) => x !== id);
    else {
      d.done.push(id);
      log('task', `Hoàn thành mục: ${t.name}${k !== todayKey() ? ` (ngày ${fmtShort(parseKey(k))})` : ''} ${t.emoji || ''}`.trim());
      if (dayRate(k) === 1) toast('Tuyệt vời! Hoàn thành 100% nhiệm vụ 🎉', 'success', 'star');
    }
    checkAchievements();
    commit();
  }
  const commit = () => { save(); render(); };

  /* ---------------- TOAST / MODAL ---------------- */
  function toast(msg, type = 'info', ic) {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `${icon(ic || (type === 'success' ? 'check' : type === 'warn' ? 'alert' : 'info'))}<span>${esc(msg)}</span>`;
    $('#toasts').appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 3200);
  }
  function openModal(html) {
    $('#modalBox').innerHTML = html;
    $('#modal').classList.add('open');
    $('#modal').setAttribute('aria-hidden', 'false');
    const f = $('#modalBox input:not([type=checkbox]), #modalBox textarea');
    if (f) setTimeout(() => f.focus(), 50);
  }
  function closeModal() {
    $('#modal').classList.remove('open');
    $('#modal').setAttribute('aria-hidden', 'true');
  }

  function openCheckin(k = todayKey()) {
    const date = parseKey(k);
    if (date > today()) return toast('Không thể điểm danh cho ngày trong tương lai', 'warn');
    const d = state.days[k] || { done: [], study: 0, checkedIn: false, note: '' };
    const isToday = k === todayKey();
    openModal(`
      <div class="modal-head">
        <div><h3>${d.checkedIn ? 'Cập nhật điểm danh' : 'Điểm danh'}${isToday ? ' hôm nay' : ''}</h3>
        <p>${WEEKDAYS[date.getDay()]}, ${fmtDate(date)}</p></div>
        <button class="icon-btn" data-action="modal-close" aria-label="Đóng">${icon('x')}</button>
      </div>
      ${d.checkedIn ? `<div class="day-pts"><span class="chip green">${icon('check')} Đã điểm danh${d.checkedAt ? ' lúc ' + fmtTime(new Date(d.checkedAt)) : ''}</span><span class="chip">${icon('star')} ${dayPoints(k)} điểm</span></div>` : ''}
      <form class="modal-form" data-form="checkin" data-date="${k}">
        <div class="ci-tasks">
          ${state.tasks.length ? state.tasks.map((t) => `
            <label class="ci-task"><input type="checkbox" name="task" value="${t.id}" ${d.done.includes(t.id) ? 'checked' : ''}>
              <span class="box">${icon('check')}</span><span>${esc(t.emoji || '')} ${esc(t.name)}</span></label>`).join('') : '<p class="empty-hint">Chưa có mục kỷ luật nào — thêm trong Cài đặt.</p>'}
        </div>
        <label class="field"><span>Số giờ học tập</span>
          <input type="number" name="study" min="0" max="24" step="0.5" value="${d.study || 0}"></label>
        <label class="field"><span>Ghi chú</span>
          <textarea name="note" rows="2" placeholder="Hôm nay bạn cảm thấy thế nào?">${esc(d.note || '')}</textarea></label>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-action="modal-close">Hủy</button>
          <button type="submit" class="btn btn-primary">${icon('check')} ${d.checkedIn ? 'Cập nhật' : 'Điểm danh'}</button>
        </div>
      </form>`);
  }

  /* ---------------- CHARTS ---------------- */
  function smoothPath(pts) {
    if (!pts.length) return '';
    let d = `M${r1(pts[0][0])},${r1(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2, t = 0.18;
      const c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t];
      const c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
      d += ` C${r1(c1[0])},${r1(c1[1])} ${r1(c2[0])},${r1(c2[1])} ${r1(p2[0])},${r1(p2[1])}`;
    }
    return d;
  }
  function lineChart(el, values, labels, opt = {}) {
    if (!el) return;
    const { max = 100, height = 120, color = '#8b5cf6', suffix = '%', tips = labels } = opt;
    const w = Math.max(el.clientWidth, 220), h = height, padX = 14, padTop = 12, padBot = 24;
    const n = values.length;
    const x = (i) => (n === 1 ? w / 2 : padX + (i * (w - 2 * padX)) / (n - 1));
    const y = (v) => padTop + (1 - Math.min(v, max) / max) * (h - padTop - padBot);
    const pts = values.map((v, i) => [x(i), y(v)]);
    const line = smoothPath(pts);
    const area = `${line} L${r1(x(n - 1))},${h - padBot} L${r1(x(0))},${h - padBot} Z`;
    const id = 'g' + uid();
    const every = Math.ceil(n / 8);
    el.innerHTML = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".38"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
      <path d="${area}" fill="url(#${id})"/>
      <path class="line" d="${line}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      ${n <= 31 ? pts.map((p, i) => `<circle class="dot" cx="${r1(p[0])}" cy="${r1(p[1])}" r="${n > 14 ? 3 : 4.5}"><title>${esc(tips[i])}: ${values[i]}${suffix}</title></circle>`).join('') : ''}
      ${labels.map((l, i) => (i % every === 0 ? `<text class="axis" x="${r1(x(i))}" y="${h - 5}" text-anchor="middle">${esc(l)}</text>` : '')).join('')}
    </svg>`;
  }
  function barChart(el, values, labels, opt = {}) {
    if (!el) return;
    const { height = 200, goal = null, suffix = 'h', tips = labels } = opt;
    const max = Math.max(opt.max || 0, ...values, goal || 0, 1) * 1.15;
    const w = Math.max(el.clientWidth, 260), h = height, padL = 30, padR = 8, padTop = 14, padBot = 24;
    const n = values.length;
    const slot = (w - padL - padR) / n;
    const bw = Math.min(28, slot * 0.6);
    const y = (v) => padTop + (1 - v / max) * (h - padTop - padBot);
    const id = 'b' + uid();
    const ticks = [0, max / 2, max].map((v) => Math.round(v));
    el.innerHTML = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#5b21b6"/></linearGradient></defs>
      ${ticks.map((t) => `<line class="grid-line" x1="${padL}" x2="${w - padR}" y1="${r1(y(t))}" y2="${r1(y(t))}"/><text class="axis" x="${padL - 8}" y="${r1(y(t)) + 4}" text-anchor="end">${t}</text>`).join('')}
      ${values.map((v, i) => {
        const bx = padL + slot * i + (slot - bw) / 2, by = y(v), bh = Math.max(h - padBot - by, v > 0 ? 2 : 0);
        const fill = goal != null && v >= goal ? `url(#${id})` : 'rgba(139,92,246,.35)';
        return `<rect class="bar" x="${r1(bx)}" y="${r1(h - padBot - bh)}" width="${r1(bw)}" height="${r1(bh)}" rx="6" fill="${fill}"><title>${esc(tips[i])}: ${v}${suffix}</title></rect>`;
      }).join('')}
      ${goal != null ? `<line class="goal-line" x1="${padL}" x2="${w - padR}" y1="${r1(y(goal))}" y2="${r1(y(goal))}"/>` : ''}
      ${labels.map((l, i) => (n <= 16 || i % 2 === 0 ? `<text class="axis" x="${r1(padL + slot * i + slot / 2)}" y="${h - 5}" text-anchor="middle">${esc(l)}</text>` : '')).join('')}
    </svg>`;
  }

  /* ---------------- CALENDAR ---------------- */
  function calendarHTML(month, calId, big = false) {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const start = startOfWeek(first);
    const last = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const end = addDays(startOfWeek(last), 6);
    const tKey = todayKey();
    const t = today();
    let html = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => `<div class="cal-dow">${d}</div>`).join('');
    for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
      const k = keyOf(d);
      const cls = ['cal-day'];
      const other = d.getMonth() !== month.getMonth();
      if (other) cls.push('other');
      else {
        if (isChecked(k)) { cls.push('checked'); if (dayRate(k) === 1) cls.push('full'); }
        else if (d < t && state.days[k]) cls.push('missed');
        if (d > t) cls.push('future');
      }
      if (k === tKey) cls.push('today');
      if (big && k === ui.schedDate) cls.push('selected');
      const rate = Math.round(dayRate(k) * 100);
      const hasMission = big && (state.missions[k] || []).length > 0;
      const title = `${WEEKDAYS[d.getDay()]}, ${fmtDate(d)}${state.days[k] ? ` — ${rate}% hoàn thành${isChecked(k) ? ', đã điểm danh' : ''}` : ''}`;
      html += `<button class="${cls.join(' ')}" data-action="cal-day" data-cal="${calId}" data-date="${k}" title="${title}">
        ${d.getDate()}${big && !other && state.days[k] ? `<small>${rate}%</small>` : ''}${hasMission ? '<span class="mdot"></span>' : ''}</button>`;
    }
    return html;
  }

  /* ================= RENDER: OVERVIEW ================= */
  function renderTopbar() {
    const t = today();
    $('#todayLabel').textContent = `${WEEKDAYS[t.getDay()]}, ${fmtDate(t)}`;
    $('#greeting').textContent = `Chào mừng trở lại, ${state.settings.name || 'bro'}! 👋`;
    $('#avatar').textContent = (state.settings.name || 'V').trim().charAt(0).toUpperCase() || 'V';
    $('#themeBtn').innerHTML = icon(state.settings.theme === 'dark' ? 'sun' : 'moon');
    document.documentElement.dataset.theme = state.settings.theme;
  }

  function renderOverview() {
    const tk = todayKey();
    const td = state.days[tk];
    // Progress
    const pct = Math.round(dayRate(tk) * 100);
    $('#ringPct').textContent = pct + '%';
    $('#ringFg').style.strokeDashoffset = 314.16 * (1 - pct / 100);
    $('#todayTasks').innerHTML = state.tasks.length
      ? state.tasks.map((t) => {
        const done = td && td.done.includes(t.id);
        return `<li><button class="check-item ${done ? 'done' : ''}" data-action="toggle-task" data-date="${tk}" data-id="${t.id}">
          <span class="cbox">${icon('check')}</span><span class="name">${esc(t.name)}</span></button></li>`;
      }).join('')
      : '<li class="empty-hint">Chưa có mục nào. Thêm trong <a href="#settings" style="color:var(--primary-3)">Cài đặt</a>.</li>';

    // Streak
    const cs = currentStreak();
    $('#streakNum').textContent = cs;
    $('#bestStreak').textContent = Math.max(bestStreak(), cs);
    $('#streakDelta').classList.toggle('hidden', !countsForStreak(tk));
    $('#streakQuote').textContent = '“ ' + MOTIVATION[cs % MOTIVATION.length].replace('{name}', state.settings.name || 'bro');
    const heroBtn = $('#heroBtn');
    heroBtn.classList.toggle('done', isChecked(tk));
    heroBtn.querySelector('span').textContent = isChecked(tk) ? 'Đã điểm danh hôm nay' : 'Bắt đầu điểm danh';

    // Mini calendar
    $('#miniCalTitle').textContent = `Lịch trình tháng ${ui.miniCal.getMonth() + 1}${ui.miniCal.getFullYear() !== today().getFullYear() ? '/' + ui.miniCal.getFullYear() : ''}`;
    $('#miniCal').innerHTML = calendarHTML(ui.miniCal, 'mini');

    // Recent activity
    const recent = state.activities.slice(0, 3);
    $('#recentActivity').innerHTML = recent.length ? recent.map(activityItem).join('') : '<li class="empty-hint">Chưa có hoạt động nào.</li>';

    // Quick stats
    $$('#quickSeg button').forEach((b) => b.classList.toggle('active', b.dataset.range === ui.quickRange));
    const st = rangeStats(ui.quickRange);
    $('#quickStats').innerHTML = `
      <div class="qs"><div class="qs-ic" style="color:var(--accent)">${icon('checkCircle')}</div><b>${st.checked}/${st.keys.length}</b><span>Ngày hoàn thành</span></div>
      <div class="qs"><div class="qs-ic">${icon('clock')}</div><b>${st.avgStudy}h</b><span>Thời gian học TB</span></div>
      <div class="qs"><div class="qs-ic" style="color:var(--accent)">${icon('bars')}</div><b>${st.rate}%</b><span>Tỷ lệ hoàn thành</span></div>
      <div class="qs"><div class="qs-ic" style="color:var(--gold)">${icon('star')}</div><b>+${st.pts}</b><span>Điểm kỷ luật</span></div>`;
    const vals = st.keys.map((k) => Math.round(dayRate(k) * 100));
    const labels = st.keys.map((k) => { const d = parseKey(k); return ui.quickRange === '7' ? SHORT[d.getDay()] : String(d.getDate()); });
    const tips = st.keys.map((k) => fmtShort(parseKey(k)));
    lineChart($('#quickChart'), vals, labels, { height: 110, tips });

    // Quote
    const [q, a] = QUOTES[ui.quoteIdx % QUOTES.length];
    $('#quoteText').textContent = `“${q}”`;
    $('#quoteAuthor').textContent = `— ${a}`;
  }

  function activityItem(a) {
    const ic = { checkin: 'check', task: 'trophy', achievement: 'star', system: 'dot', mission: 'list' }[a.type] || 'dot';
    return `<li class="tl-item"><span class="tl-dot ${a.type}">${icon(ic)}</span>
      <div><div class="tl-time">${fmtDateTime(a.ts)}</div><div class="tl-text">${esc(a.text)}</div></div></li>`;
  }

  /* ================= RENDER: SCHEDULE ================= */
  function renderSchedule() {
    const sel = parseKey(ui.schedDate);
    const sd = state.days[ui.schedDate];
    const missions = state.missions[ui.schedDate] || [];
    const isPast = sel <= today();
    const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
    const routine = [...state.routine].sort((a, b) => a.time.localeCompare(b.time));
    let nowIdx = -1;
    routine.forEach((r, i) => { const [h, m] = r.time.split(':').map(Number); if (h * 60 + m <= nowMin) nowIdx = i; });
    const ws = ui.weekStart;
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(ws, i));

    $('#page-schedule').innerHTML = `
      <div class="page-head"><h2>Lịch trình</h2><p>Lịch sinh hoạt hằng ngày, nhiệm vụ và lịch điểm danh theo tháng.</p></div>
      <div class="grid sched-grid">
        <article class="card">
          <header class="card-head">
            <h3>${icon('calendar', 'head-ic')}Tháng ${ui.bigCal.getMonth() + 1}/${ui.bigCal.getFullYear()}</h3>
            <div class="cal-nav">
              <button class="btn btn-ghost btn-sm" data-action="cal-today" data-cal="big">Hôm nay</button>
              <button class="round-btn" data-action="cal-prev" data-cal="big">${icon('chevL')}</button>
              <button class="round-btn" data-action="cal-next" data-cal="big">${icon('chevR')}</button>
            </div>
          </header>
          <div class="calendar big">${calendarHTML(ui.bigCal, 'big', true)}</div>
          <div class="cal-legend">
            <span><i style="background:#7c3aed"></i>Đã điểm danh</span>
            <span><i style="background:linear-gradient(135deg,#8b5cf6,#6d28d9);box-shadow:0 0 6px #8b5cf6"></i>Hoàn thành 100%</span>
            <span><i style="box-shadow:inset 0 0 0 2px #4ef0a6"></i>Hôm nay</span>
            <span><i style="box-shadow:inset 0 0 0 1.5px #f43f5e"></i>Bỏ lỡ</span>
            <span><i style="background:#fbbf24;border-radius:50%;width:8px;height:8px"></i>Có nhiệm vụ</span>
          </div>
        </article>

        <div class="sched-side">
          <article class="card">
            <header class="card-head">
              <h3>${icon('target', 'head-ic')}Nhiệm vụ · ${WEEKDAYS[sel.getDay()]}, ${fmtShort(sel)}</h3>
              ${isPast ? `<button class="btn btn-primary btn-sm" data-action="open-checkin" data-date="${ui.schedDate}">${isChecked(ui.schedDate) ? 'Sửa điểm danh' : 'Điểm danh'}</button>` : ''}
            </header>
            <div class="day-summary">
              ${isChecked(ui.schedDate) ? `<span class="chip green">${icon('check')} Đã điểm danh</span>` : isPast && ui.schedDate !== todayKey() ? `<span class="chip red">${icon('x')} Chưa điểm danh</span>` : `<span class="chip">${icon('clock')} Chưa điểm danh</span>`}
              <span class="chip">${icon('bars')} ${Math.round(dayRate(ui.schedDate) * 100)}% mục kỷ luật</span>
              <span class="chip">${icon('book')} ${sd ? sd.study : 0}h học</span>
            </div>
            <ul class="list">
              ${missions.length ? [...missions].sort((a, b) => (a.time || '99').localeCompare(b.time || '99')).map((m) => `
                <li class="list-item ${m.done ? 'done' : ''}">
                  <button class="tick ${m.done ? 'on' : ''}" data-action="toggle-mission" data-id="${m.id}" aria-label="Đánh dấu">${icon('check')}</button>
                  <span class="time">${esc(m.time || '--:--')}</span><span class="title">${esc(m.title)}</span>
                  <button class="mini-btn" data-action="del-mission" data-id="${m.id}" aria-label="Xóa">${icon('trash')}</button>
                </li>`).join('') : '<li class="empty-hint">Chưa có nhiệm vụ cho ngày này.</li>'}
            </ul>
            <form class="inline-form" data-form="mission" style="margin-top:14px">
              <input class="input" type="time" name="time">
              <input class="input" name="title" placeholder="Thêm nhiệm vụ mới..." required maxlength="120">
              <button class="btn btn-primary btn-sm" type="submit">${icon('plus')}</button>
            </form>
          </article>

          <article class="card">
            <header class="card-head"><h3>${icon('clock', 'head-ic')}Lịch sinh hoạt hằng ngày</h3></header>
            <ul class="list">
              ${routine.length ? routine.map((r, i) => `
                <li class="list-item ${i === nowIdx && ui.schedDate === todayKey() ? 'now' : ''}">
                  <span class="time">${esc(r.time)}</span><span class="title">${esc(r.title)}</span>
                  ${i === nowIdx && ui.schedDate === todayKey() ? '<span class="now-tag">Hiện tại</span>' : ''}
                  <button class="mini-btn" data-action="del-routine" data-id="${r.id}" aria-label="Xóa">${icon('trash')}</button>
                </li>`).join('') : '<li class="empty-hint">Chưa có lịch sinh hoạt.</li>'}
            </ul>
            <form class="inline-form" data-form="routine" style="margin-top:14px">
              <input class="input" type="time" name="time" required>
              <input class="input" name="title" placeholder="Hoạt động..." required maxlength="120">
              <button class="btn btn-primary btn-sm" type="submit">${icon('plus')}</button>
            </form>
          </article>
        </div>
      </div>

      <article class="card">
        <header class="card-head">
          <h3>${icon('list', 'head-ic')}Bảng thói quen tuần · ${fmtShort(weekDays[0])} – ${fmtShort(weekDays[6])}</h3>
          <div class="cal-nav">
            <button class="btn btn-ghost btn-sm" data-action="week-today">Tuần này</button>
            <button class="round-btn" data-action="week-prev">${icon('chevL')}</button>
            <button class="round-btn" data-action="week-next">${icon('chevR')}</button>
          </div>
        </header>
        <div class="habit-wrap">
          <table class="habit-table">
            <thead><tr><th>Mục kỷ luật</th>${weekDays.map((d) => `<th class="${keyOf(d) === todayKey() ? 'is-today' : ''}">${SHORT[d.getDay()]}<span class="dnum">${d.getDate()}</span></th>`).join('')}</tr></thead>
            <tbody>
              ${state.tasks.map((t) => {
                const cnt = weekDays.filter((d) => state.days[keyOf(d)] && state.days[keyOf(d)].done.includes(t.id)).length;
                return `<tr><td><div class="habit-name"><span class="hic">${esc(t.emoji || '•')}</span><div><b>${esc(t.name)}</b><small>${cnt}/7</small></div></div></td>
                  ${weekDays.map((d) => {
                    const k = keyOf(d);
                    const on = state.days[k] && state.days[k].done.includes(t.id);
                    return `<td><button class="hcell ${on ? 'on' : ''}" data-action="toggle-task" data-date="${k}" data-id="${t.id}" ${d > today() ? 'disabled' : ''} title="${t.name} — ${fmtDate(d)}">${icon('check')}</button></td>`;
                  }).join('')}</tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </article>`;
  }

  /* ================= RENDER: STATS ================= */
  function renderStats() {
    const t = totals();
    const s30 = rangeStats('30');
    const year = today().getFullYear();
    $('#page-stats').innerHTML = `
      <div class="page-head"><h2>Thống kê</h2><p>Biểu đồ thời gian học, tỷ lệ hoàn thành và mức độ đều đặn của bạn.</p></div>
      <div class="kpi-row">
        <div class="card kpi"><span class="kpi-ic ic-green">${icon('check')}</span><div><b>${t.checkins}</b><span>Tổng ngày điểm danh</span></div></div>
        <div class="card kpi"><span class="kpi-ic ic-purple">${icon('clock')}</span><div><b>${t.hours}h</b><span>Tổng giờ học tập</span></div></div>
        <div class="card kpi"><span class="kpi-ic ic-gold">${icon('target')}</span><div><b>${t.tasksDone}</b><span>Nhiệm vụ đã hoàn thành</span></div></div>
        <div class="card kpi"><span class="kpi-ic ic-orange">${icon('bars')}</span><div><b>${s30.rate}%</b><span>Tỷ lệ hoàn thành 30 ngày</span></div></div>
      </div>

      <article class="card">
        <header class="card-head">
          <h3>${icon('calendar', 'head-ic')}Hoạt động năm ${year}</h3>
          <div class="hm-legend">Ít <span class="hm-cell"></span><span class="hm-cell l1"></span><span class="hm-cell l2"></span><span class="hm-cell l3"></span><span class="hm-cell l4"></span> Nhiều</div>
        </header>
        <div class="heatmap-wrap">${heatmapHTML(year)}</div>
      </article>

      <div class="grid stats-grid">
        <article class="card">
          <header class="card-head"><h3>${icon('clock', 'head-ic')}Giờ học 14 ngày qua</h3><div class="day-summary"><span class="chip green">Mục tiêu ${state.settings.studyGoal}h</span><span class="chip">TB ${rangeStats('14').avgStudy}h/ngày</span></div></header>
          <div class="chart" id="studyChart"></div>
        </article>
        <article class="card">
          <header class="card-head"><h3>${icon('target', 'head-ic')}Tỷ lệ theo mục (30 ngày)</h3></header>
          <div class="task-rates">
            ${state.tasks.map((tk) => {
              const keys = s30.keys;
              const r = keys.length ? Math.round((keys.filter((k) => state.days[k] && state.days[k].done.includes(tk.id)).length / keys.length) * 100) : 0;
              return `<div class="tr-row"><div class="tr-top"><span>${esc(tk.emoji || '')} ${esc(tk.name)}</span><b>${r}%</b></div><div class="bar-track"><div class="bar-fill" style="width:${r}%"></div></div></div>`;
            }).join('') || '<p class="empty-hint">Chưa có mục kỷ luật.</p>'}
          </div>
        </article>
      </div>

      <article class="card" style="margin-top:22px">
        <header class="card-head"><h3>${icon('bars', 'head-ic')}Tỷ lệ hoàn thành 30 ngày</h3><span class="chip green">${s30.checked}/30 ngày điểm danh</span></header>
        <div class="chart" id="rateChart"></div>
      </article>`;

    const k14 = rangeKeys('14');
    barChart($('#studyChart'), k14.map((k) => (state.days[k] ? +state.days[k].study || 0 : 0)), k14.map((k) => SHORT[parseKey(k).getDay()]), {
      goal: +state.settings.studyGoal || null, tips: k14.map((k) => fmtShort(parseKey(k))), height: 220,
    });
    lineChart($('#rateChart'), s30.keys.map((k) => Math.round(dayRate(k) * 100)), s30.keys.map((k) => fmtShort(parseKey(k))), { height: 170 });
  }

  function heatmapHTML(year) {
    const jan1 = new Date(year, 0, 1);
    const start = startOfWeek(jan1);
    const dec31 = new Date(year, 11, 31);
    const t = today();
    const tk = todayKey();
    let cells = '', weeks = 0, months = '', lastMonth = -1;
    for (let ws = new Date(start); ws <= dec31; ws = addDays(ws, 7)) {
      weeks++;
      const firstInYear = ws < jan1 ? jan1 : ws;
      if (firstInYear.getMonth() !== lastMonth && firstInYear.getDate() <= 7) {
        lastMonth = firstInYear.getMonth();
        months += `<span style="grid-column:${weeks}">Th${lastMonth + 1}</span>`;
      }
      for (let i = 0; i < 7; i++) {
        const d = addDays(ws, i);
        if (d.getFullYear() !== year) { cells += '<span class="hm-cell empty"></span>'; continue; }
        const k = keyOf(d);
        let lvl = '';
        if (state.days[k]) {
          const r = dayRate(k);
          lvl = r >= 1 ? 'l4' : r >= 0.7 ? 'l3' : r >= 0.4 ? 'l2' : r > 0 ? 'l1' : '';
        }
        cells += `<span class="hm-cell ${lvl} ${d > t ? 'future' : ''} ${k === tk ? 'today' : ''}" title="${fmtDate(d)}: ${state.days[k] ? Math.round(dayRate(k) * 100) + '%' : 'không có dữ liệu'}"></span>`;
      }
    }
    return `<div class="heatmap-inner" style="--weeks:${weeks}">
      <div class="hm-months" style="grid-template-columns:repeat(${weeks},minmax(0,1fr))">${months}</div>
      <div class="hm-days">${['T2', '', 'T4', '', 'T6', '', 'CN'].map((d) => `<span>${d}</span>`).join('')}</div>
      <div class="heatmap" style="grid-template-columns:repeat(${weeks},minmax(0,1fr))">${cells}</div></div>`;
  }

  /* ================= RENDER: ACHIEVEMENTS ================= */
  function renderAchievements() {
    const cs = currentStreak();
    const best = Math.max(bestStreak(), cs);
    const t = totals();
    const nextStreak = MILESTONES.filter((m) => m.type === 'streak').find((m) => m.value > cs);
    const unlockedCount = MILESTONES.filter((m) => milestoneValue(m) >= m.value).length;
    $('#page-achievements').innerHTML = `
      <div class="page-head"><h2>Thành tựu</h2><p>Chuỗi ngày kỷ luật và các cột mốc bạn đã chinh phục.</p></div>
      <div class="ach-hero">
        <div class="card ach-main">
          <span class="fire">🔥</span>
          <div style="flex:1;min-width:0">
            <div class="lbl">Chuỗi hiện tại</div>
            <div class="big">${cs}</div>
            <div class="lbl">ngày liên tiếp</div>
            ${nextStreak ? `<div class="next-ms"><small>Còn ${nextStreak.value - cs} ngày để đạt "${nextStreak.title}" ${nextStreak.emoji}</small>
              <div class="bar-track"><div class="bar-fill" style="width:${Math.round((cs / nextStreak.value) * 100)}%"></div></div></div>` : '<div class="next-ms"><small>Bạn đã chinh phục mọi cột mốc chuỗi! 👑</small></div>'}
          </div>
        </div>
        <div class="card kpi"><span class="kpi-ic ic-gold">${icon('trophy')}</span><div><b>${best} ngày</b><span>Kỷ lục cá nhân</span></div></div>
        <div class="card kpi"><span class="kpi-ic ic-green">${icon('check')}</span><div><b>${t.perfect}</b><span>Ngày hoàn hảo (100%)</span></div></div>
        <div class="card kpi"><span class="kpi-ic ic-purple">${icon('star')}</span><div><b>${unlockedCount}/${MILESTONES.length}</b><span>Huy hiệu đã mở khóa</span></div></div>
      </div>
      <div class="toolbar"><h3 class="section-title" style="margin:0 0 0 4px">${icon('trophy')}Cột mốc</h3><span class="spacer"></span>
        <button class="btn btn-danger btn-sm" data-action="reset-streak">${icon('refresh')} Reset chuỗi</button></div>
      <div class="badges">
        ${MILESTONES.map((m) => {
          const v = milestoneValue(m);
          const ok = v >= m.value;
          const p = Math.min(100, Math.round((v / m.value) * 100));
          return `<div class="badge ${ok ? 'unlocked' : 'locked'}">
            <div class="b-ic">${m.emoji}</div><b>${esc(m.title)}</b><p>${esc(m.desc)}</p>
            <div class="b-prog"><div class="bar-track"><div class="bar-fill" style="width:${p}%"></div></div><small>${Math.min(v, m.value)}/${m.value}</small></div>
          </div>`;
        }).join('')}
      </div>`;
  }

  /* ================= RENDER: ACTIVITY ================= */
  function renderActivity() {
    const f = ui.actFilter;
    const list = state.activities.filter((a) => f === 'all' || a.type === f);
    const groups = {};
    list.forEach((a) => { const k = keyOf(new Date(a.ts)); (groups[k] ||= []).push(a); });
    const label = (k) => {
      if (k === todayKey()) return 'Hôm nay';
      if (k === keyOf(addDays(today(), -1))) return 'Hôm qua';
      const d = parseKey(k); return `${WEEKDAYS[d.getDay()]}, ${fmtDate(d)}`;
    };
    const filters = [['all', 'Tất cả'], ['checkin', 'Điểm danh'], ['task', 'Mục kỷ luật'], ['mission', 'Nhiệm vụ'], ['achievement', 'Thành tựu'], ['system', 'Hệ thống']];
    const ic = { checkin: 'check', task: 'trophy', achievement: 'star', system: 'dot', mission: 'list' };
    $('#page-activity').innerHTML = `
      <div class="page-head"><h2>Hoạt động gần đây</h2><p>Lịch sử điểm danh và mọi thay đổi của bạn.</p></div>
      <div class="toolbar">
        ${filters.map(([v, l]) => `<button class="filter-chip ${f === v ? 'active' : ''}" data-action="act-filter" data-filter="${v}">${l}</button>`).join('')}
        <span class="spacer"></span>
        <button class="btn btn-danger btn-sm" data-action="clear-activity">${icon('trash')} Xóa lịch sử</button>
      </div>
      <article class="card">
        ${Object.keys(groups).length ? Object.keys(groups).sort().reverse().map((k) => `
          <div class="act-group"><h4>${label(k)}</h4>
            ${groups[k].map((a) => `<div class="act-row"><span class="tl-dot ${a.type}">${icon(ic[a.type] || 'dot')}</span>
              <div class="tl-text">${esc(a.text)}</div><span class="tl-time">${fmtTime(new Date(a.ts))}</span></div>`).join('')}
          </div>`).join('') : `<div class="empty">${icon('history')}Chưa có hoạt động nào.</div>`}
      </article>`;
  }

  /* ================= RENDER: SETTINGS ================= */
  function renderSettings() {
    const s = state.settings;
    $('#page-settings').innerHTML = `
      <div class="page-head"><h2>Cài đặt</h2><p>Tùy chỉnh hồ sơ, mục kỷ luật và dữ liệu hệ thống.</p></div>
      <div class="grid settings-grid">
        <div class="sched-side">
          <article class="card">
            <header class="card-head"><h3>${icon('users', 'head-ic')}Hồ sơ & giao diện</h3></header>
            <form data-form="profile">
              <div class="set-row"><div class="txt"><b>Tên hiển thị</b><small>Dùng trong lời chào</small></div>
                <input class="input" name="name" value="${esc(s.name)}" maxlength="30"></div>
              <div class="set-row"><div class="txt"><b>Mục tiêu học mỗi ngày</b><small>Số giờ (dùng cho biểu đồ & tự tick mục học tập)</small></div>
                <input class="input" type="number" name="studyGoal" min="0" max="24" step="0.5" value="${s.studyGoal}"></div>
              <div class="set-row"><div class="txt"><b>Tự động tick "Học tập"</b><small>Khi số giờ học đạt mục tiêu</small></div>
                <button type="button" class="switch ${s.autoStudyTask ? 'on' : ''}" data-action="toggle-setting" data-key="autoStudyTask" aria-label="Bật/tắt"></button></div>
              <div class="set-row"><div class="txt"><b>Giao diện tối</b><small>Chuyển giữa chế độ sáng và tối</small></div>
                <button type="button" class="switch ${s.theme === 'dark' ? 'on' : ''}" data-action="toggle-theme" aria-label="Bật/tắt"></button></div>
              <div class="btn-row"><button class="btn btn-primary btn-sm" type="submit">${icon('check')} Lưu thay đổi</button></div>
            </form>
          </article>
          <article class="card">
            <header class="card-head"><h3>${icon('refresh', 'head-ic')}Dữ liệu</h3></header>
            <p class="empty-hint" style="padding-top:0">Dữ liệu được lưu trên trình duyệt (localStorage). Hãy xuất file để sao lưu.</p>
            <div class="btn-row">
              <button class="btn btn-ghost btn-sm" data-action="export">${icon('download')} Xuất JSON</button>
              <button class="btn btn-ghost btn-sm" data-action="import">${icon('upload')} Nhập JSON</button>
              <button class="btn btn-ghost btn-sm" data-action="reset-streak">${icon('flame')} Reset chuỗi</button>
              <button class="btn btn-ghost btn-sm" data-action="reset-sample">${icon('refresh')} Dữ liệu mẫu</button>
              <button class="btn btn-danger btn-sm" data-action="clear-all">${icon('trash')} Xóa toàn bộ</button>
            </div>
          </article>
        </div>
        <article class="card">
          <header class="card-head"><h3>${icon('list', 'head-ic')}Mục kỷ luật hằng ngày</h3><span class="chip">${state.tasks.length} mục</span></header>
          <form data-form="tasks">
            ${state.tasks.map((t) => `
              <div class="task-edit">
                <button type="button" class="input emoji-in" data-action="emoji-pick" data-task-id="${t.id}" title="Chọn emoji">${esc(t.emoji || '➕')}</button>
                <input type="hidden" name="emoji-${t.id}" value="${esc(t.emoji || '')}">
                <input class="input" name="name-${t.id}" value="${esc(t.name)}" maxlength="60" required>
                <button type="button" class="mini-btn" data-action="del-task" data-id="${t.id}" aria-label="Xóa">${icon('trash')}</button>
              </div>`).join('')}
            ${state.tasks.length ? `<div class="btn-row" style="margin-bottom:18px"><button class="btn btn-primary btn-sm" type="submit">${icon('check')} Lưu tên mục</button></div>` : ''}
          </form>
          <form class="inline-form" data-form="add-task">
            <button type="button" class="input emoji-in" data-action="emoji-pick" title="Chọn emoji">🎯</button>
            <input type="hidden" name="emoji" value="🎯">
            <input class="input" name="name" placeholder="Thêm mục kỷ luật mới..." required maxlength="60">
            <button class="btn btn-primary btn-sm" type="submit">${icon('plus')} Thêm</button>
          </form>
        </article>
      </div>`;
  }

  /* ================= MAIN RENDER ================= */
  const PAGES = { overview: renderOverview, schedule: renderSchedule, stats: renderStats, achievements: renderAchievements, activity: renderActivity, settings: renderSettings };
  function render() {
    renderTopbar();
    PAGES[ui.route]();
  }
  function route() {
    const r = location.hash.slice(1);
    ui.route = PAGES[r] ? r : 'overview';
    $$('.page').forEach((p) => p.classList.toggle('active', p.dataset.page === ui.route));
    $$('#nav a').forEach((a) => a.classList.toggle('active', a.dataset.route === ui.route));
    $('#sidebar').classList.remove('open');
    $('#backdrop').classList.remove('show');
    render();
    window.scrollTo({ top: 0 });
  }

  /* ================= ACTIONS ================= */
  const ACTIONS = {
    'open-checkin': (el) => openCheckin(el.dataset.date || todayKey()),
    'modal-close': closeModal,
    'emoji-pick': (el) => picker.toggle(el),
    'toggle-task': (el) => toggleTask(el.dataset.date, el.dataset.id),
    'toggle-theme': () => { state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark'; commit(); },
    'toggle-setting': (el) => { state.settings[el.dataset.key] = !state.settings[el.dataset.key]; commit(); },
    'cal-prev': (el) => { const c = el.dataset.cal === 'big' ? 'bigCal' : 'miniCal'; ui[c] = new Date(ui[c].getFullYear(), ui[c].getMonth() - 1, 1); render(); },
    'cal-next': (el) => { const c = el.dataset.cal === 'big' ? 'bigCal' : 'miniCal'; ui[c] = new Date(ui[c].getFullYear(), ui[c].getMonth() + 1, 1); render(); },
    'cal-today': () => { const t = today(); ui.bigCal = new Date(t.getFullYear(), t.getMonth(), 1); ui.schedDate = todayKey(); render(); },
    'cal-day': (el) => {
      const k = el.dataset.date;
      if (el.dataset.cal === 'big') {
        ui.schedDate = k;
        const d = parseKey(k);
        if (d.getMonth() !== ui.bigCal.getMonth()) ui.bigCal = new Date(d.getFullYear(), d.getMonth(), 1);
        ui.weekStart = startOfWeek(d);
        render();
      } else if (parseKey(k) > today()) {
        ui.schedDate = k; ui.bigCal = new Date(parseKey(k).getFullYear(), parseKey(k).getMonth(), 1); ui.weekStart = startOfWeek(parseKey(k));
        location.hash = '#schedule';
      } else openCheckin(k);
    },
    'quick-range': (el) => { ui.quickRange = el.dataset.range; render(); },
    'week-prev': () => { ui.weekStart = addDays(ui.weekStart, -7); render(); },
    'week-next': () => { ui.weekStart = addDays(ui.weekStart, 7); render(); },
    'week-today': () => { ui.weekStart = startOfWeek(today()); render(); },
    'toggle-mission': (el) => {
      const m = (state.missions[ui.schedDate] || []).find((x) => x.id === el.dataset.id);
      if (!m) return;
      m.done = !m.done;
      if (m.done) log('mission', `Hoàn thành nhiệm vụ: ${m.title}`);
      commit();
    },
    'del-mission': (el) => { state.missions[ui.schedDate] = (state.missions[ui.schedDate] || []).filter((x) => x.id !== el.dataset.id); commit(); },
    'del-routine': (el) => { state.routine = state.routine.filter((x) => x.id !== el.dataset.id); commit(); },
    'act-filter': (el) => { ui.actFilter = el.dataset.filter; render(); },
    'clear-activity': () => {
      if (!confirm('Xóa toàn bộ lịch sử hoạt động? (Dữ liệu điểm danh vẫn được giữ)')) return;
      state.activities = []; commit(); toast('Đã xóa lịch sử hoạt động', 'info');
    },
    'del-task': (el) => {
      const t = state.tasks.find((x) => x.id === el.dataset.id);
      if (!t || !confirm(`Xóa mục "${t.name}"?`)) return;
      state.tasks = state.tasks.filter((x) => x.id !== t.id);
      log('system', `Đã xóa mục kỷ luật: ${t.name}`);
      commit();
    },
    'next-quote': () => {
      const card = $('.quote-card');
      card.classList.add('fade');
      setTimeout(() => { ui.quoteIdx = (ui.quoteIdx + 1) % QUOTES.length; render(); card.classList.remove('fade'); }, 300);
    },
    export: () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `discipline-backup-${todayKey()}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast('Đã xuất dữ liệu', 'success', 'download');
    },
    import: () => $('#importFile').click(),
    'reset-sample': () => {
      if (!confirm('Thay toàn bộ dữ liệu hiện tại bằng dữ liệu mẫu?')) return;
      state = seedState(); state.unlocked = computeUnlocked(state).map((m) => m.id); commit(); toast('Đã nạp dữ liệu mẫu', 'info');
    },
    'reset-streak': () => {
      if (!confirm('Reset chuỗi kỷ luật và kỷ lục về 0?\nLịch sử điểm danh vẫn được giữ, chuỗi mới sẽ tính từ lần điểm danh tiếp theo.')) return;
      state.streakResetAt = Date.now();
      state.unlocked = computeUnlocked(state).map((m) => m.id);
      log('system', 'Đã reset chuỗi kỷ luật về 0 🔄');
      commit(); toast('Đã reset chuỗi. Bắt đầu lại nào! 💪', 'info', 'refresh');
    },
    'clear-all': () => {
      if (!confirm('Xóa TOÀN BỘ dữ liệu (điểm danh, chuỗi, lịch sử, nhiệm vụ) và bắt đầu lại từ đầu? Không thể hoàn tác.')) return;
      state = freshState({ settings: state.settings, tasks: state.tasks, routine: state.routine });
      commit(); toast('Đã xóa toàn bộ dữ liệu', 'info');
    },
  };

  const FORMS = {
    checkin: (f) => {
      const k = f.dataset.date;
      const d = ensureDay(k);
      const wasChecked = d.checkedIn;
      const prevDone = [...d.done];
      const fd = new FormData(f);
      d.done = fd.getAll('task');
      d.study = Math.max(0, Math.min(24, r1(parseFloat(fd.get('study')) || 0)));
      d.note = String(fd.get('note') || '').trim();
      const goal = +state.settings.studyGoal;
      const studyTask = state.tasks.find((t) => t.id === 'study');
      if (state.settings.autoStudyTask && studyTask && goal > 0 && d.study >= goal && !d.done.includes('study')) d.done.push('study');
      d.done.filter((id) => !prevDone.includes(id)).forEach((id) => {
        const t = state.tasks.find((x) => x.id === id);
        if (t) log('task', `Hoàn thành mục: ${t.name}${k !== todayKey() ? ` (ngày ${fmtShort(parseKey(k))})` : ''} ${t.emoji || ''}`.trim());
      });
      if (!wasChecked) {
        d.checkedIn = true;
        d.checkedAt = Date.now();
        log('checkin', k === todayKey() ? 'Đã điểm danh thành công hôm nay!' : `Đã điểm danh bù ngày ${fmtShort(parseKey(k))}`);
        toast(k === todayKey() ? `Điểm danh thành công! Chuỗi: ${currentStreak()} ngày 🔥` : 'Đã điểm danh bù', 'success', 'check');
      } else toast('Đã cập nhật điểm danh', 'success', 'check');
      checkAchievements();
      closeModal();
      commit();
      if (!wasChecked && k === todayKey()) {
        const c = $('#streakCard');
        if (c) { c.classList.remove('pulse'); void c.offsetWidth; c.classList.add('pulse'); }
      }
    },
    mission: (f) => {
      const fd = new FormData(f);
      const title = String(fd.get('title') || '').trim();
      if (!title) return;
      (state.missions[ui.schedDate] ||= []).push({ id: uid(), time: fd.get('time') || '', title, done: false });
      commit();
      toast('Đã thêm nhiệm vụ', 'success', 'plus');
    },
    routine: (f) => {
      const fd = new FormData(f);
      const title = String(fd.get('title') || '').trim();
      if (!title) return;
      state.routine.push({ id: uid(), time: fd.get('time'), title });
      commit();
    },
    profile: (f) => {
      const fd = new FormData(f);
      state.settings.name = String(fd.get('name') || '').trim() || 'bro';
      state.settings.studyGoal = Math.max(0, Math.min(24, parseFloat(fd.get('studyGoal')) || 0));
      commit();
      toast('Đã lưu cài đặt', 'success', 'check');
    },
    tasks: (f) => {
      const fd = new FormData(f);
      state.tasks.forEach((t) => {
        const n = String(fd.get('name-' + t.id) || '').trim();
        if (n) t.name = n;
        t.emoji = String(fd.get('emoji-' + t.id) || '').trim();
      });
      commit();
      toast('Đã lưu các mục kỷ luật', 'success', 'check');
    },
    'add-task': (f) => {
      const fd = new FormData(f);
      const name = String(fd.get('name') || '').trim();
      if (!name) return;
      state.tasks.push({ id: 't' + uid(), name, emoji: String(fd.get('emoji') || '').trim() || '🎯' });
      log('system', `Đã thêm mục kỷ luật: ${name}`);
      commit();
      toast('Đã thêm mục mới', 'success', 'plus');
    },
  };

  /* ================= EMOJI PICKER (kiểu bàn phím emoji iOS) ================= */
  const EMOJI_CATS = [
    { id: 'recent', icon: '🕘', name: 'Thường dùng' },
    { id: 'smileys', icon: '😀', name: 'Mặt cười & Người', list: '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🥵 🥶 🥴 😵 🤯 🤠 🥳 😎 🤓 🧐 😕 😟 🙁 😮 😯 😲 😳 🥺 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 🥱 😤 😡 😠 🤬 😈 👿 💀 💩 🤡 👻 👽 🤖 👋 🤚 ✋ 🖖 👌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 👇 👍 👎 ✊ 👊 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 💪 🦾 🧠 👀 👶 🧒 👦 👧 🧑 👨 👩 🧓 👴 👵 🧘 🏃 🚶 🧍 🏋️ 🤸 🚴 🏊 🧗' },
    { id: 'nature', icon: '🐻', name: 'Động vật & Thiên nhiên', list: '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🐔 🐧 🐦 🐤 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐞 🐜 🐢 🐍 🦎 🐙 🦑 🦀 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🐘 🦒 🐪 🦘 🐎 🐕 🐈 🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘️ 🍀 🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌙 🌎 🪐 ⭐ 🌟 ✨ ⚡ 🔥 💥 ☀️ 🌤️ ⛅ 🌧️ ⛈️ ❄️ ☃️ 🌊 💧 🌈' },
    { id: 'food', icon: '🍔', name: 'Đồ ăn & Thức uống', list: '🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶️ 🌽 🥕 🧄 🧅 🥔 🍠 🥐 🍞 🥖 🥨 🧀 🥚 🍳 🥞 🥓 🥩 🍗 🍖 🌭 🍔 🍟 🍕 🥪 🌮 🌯 🥗 🥘 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🍤 🍙 🍚 🍘 🍥 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🥜 🍯 🥛 ☕ 🍵 🧃 🥤 🧋 🍶 🍺 🍷 🧊' },
    { id: 'activity', icon: '⚽', name: 'Hoạt động', list: '⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🥏 🎱 🏓 🏸 🏒 🏑 🥍 🏏 🥅 ⛳ 🏹 🎣 🥊 🥋 🎽 🛹 ⛸️ 🥌 🎿 ⛷️ 🏂 🏋️ 🤼 🤸 🤺 🧘 🏄 🏊 🚣 🧗 🚵 🚴 🏆 🥇 🥈 🥉 🏅 🎖️ 🎗️ 🎫 🎪 🎭 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🎷 🎺 🎸 🎻 🎲 ♟️ 🎯 🎳 🎮 🧩' },
    { id: 'travel', icon: '🚗', name: 'Du lịch & Địa điểm', list: '🚗 🚕 🚙 🚌 🏎️ 🚓 🚑 🚒 🚚 🚲 🛴 🛵 🏍️ 🚨 🚆 🚇 🚊 ✈️ 🛫 🛬 🚀 🛸 🚁 ⛵ 🚤 🛳️ ⚓ ⛽ 🚦 🗺️ 🗽 🗼 🏰 🏯 🏟️ 🎡 🎢 🎠 ⛲ 🏖️ 🏝️ 🏜️ 🌋 ⛰️ 🏔️ 🗻 🏕️ ⛺ 🏠 🏡 🏢 🏬 🏥 🏦 🏨 🏫 ⛪ 🕌 🛕 🌅 🌄 🌠 🎇 🎆 🌇 🌆 🏙️ 🌃 🌌 🌉' },
    { id: 'objects', icon: '💡', name: 'Đồ vật', list: '⌚ 📱 💻 ⌨️ 🖥️ 🖨️ 🖱️ 💾 💿 📷 📹 🎥 📞 ☎️ 📺 📻 🎙️ ⏱️ ⏲️ ⏰ 🕰️ ⌛ ⏳ 📡 🔋 🔌 💡 🔦 🕯️ 💸 💵 💰 💳 💎 ⚖️ 🔧 🔨 🛠️ ⚙️ 🧱 🔑 🗝️ 🚪 🛏️ 🛋️ 🚿 🛁 🧴 🧹 🧺 🧼 🪥 🛒 🎁 🎈 🎉 🎊 ✉️ 📦 📝 📒 📕 📗 📘 📙 📚 📖 🔖 📎 📌 📍 ✂️ 🖊️ ✏️ 🖍️ 🔍 🔒 🔓 📅 📆 🗓️ 📈 📉 📊 📋 🗂️ 💼 🎒 👓 🕶️ 👕 👖 👗 👟 👞 🧢 💄 💍 🩺 💊 💉 🧬 🔬 🔭' },
    { id: 'symbols', icon: '🔣', name: 'Biểu tượng', list: '❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ☮️ ☯️ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ 🆔 ⚛️ 🆚 💮 🅰️ 🅱️ 🆎 🆑 🅾️ 🆘 ❌ ⭕ 🛑 ⛔ 📛 🚫 💯 💢 ♨️ 📵 🚭 ❗ ❕ ❓ ❔ ‼️ ⁉️ 🔅 🔆 ⚠️ 🔱 ⚜️ 🔰 ♻️ ✅ ❇️ ✳️ ❎ 🌐 💠 🌀 💤 ♿ 🅿️ 🆗 🆙 🆒 🆕 🆓 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 ▶️ ⏸️ ⏹️ ⏺️ ⏭️ ⏮️ ⏩ ⏪ 🔀 🔁 🔂 ➕ ➖ ➗ ✖️ ♾️ 💲 ✔️ ☑️ 🔘 🔴 🟠 🟡 🟢 🔵 🟣 ⚫ ⚪ 🟥 🟧 🟨 🟩 🟦 🟪 ⬛ ⬜ 🔶 🔷 🔺 🔻 💬 💭 🔔 🔕 📣 📢 🏁 🚩' },
  ];
  // Từ khóa tìm kiếm (tiếng Việt không dấu + tiếng Anh) cho các emoji hay dùng khi đặt thói quen
  const EMOJI_KEYWORDS = {
    'thuc day bao thuc wake alarm sang dong ho': '⏰ ⏱️ 🌅 🌄 ☀️ 🌞 🐓 🛏️',
    'ngu sleep dem toi moon': '🌙 😴 🛏️ 💤 🌛 🌃 🌌',
    'hoc study sach book doc read viet': '📚 📖 📝 ✏️ 🖊️ 📒 🎓 🧠 💻 📘',
    'tap gym the duc sport workout chay run': '💪 🏋️ 🏃 🤸 🧘 🚴 🏊 ⚽ 🏀 🥊 🔥 👟',
    'an eat healthy rau food lanh manh': '🥗 🥦 🍎 🥑 🥕 🍌 🍳 🥚 🍓 🥬',
    'nuoc water uong drink': '💧 🥤 🥛 🍵 ☕ 🧊 🌊',
    'thien meditation yoga binh tam': '🧘 🕯️ 🌿 ☮️ 🌸 🙏',
    'tien money tiet kiem save': '💰 💵 💳 💸 🏦 📈',
    'lam viec work cong viec code': '💻 💼 📊 📈 🖥️ ⌨️ 📋 ⚙️',
    'tim heart yeu love': '❤️ 💜 💙 💚 💛 🧡 💖 💕',
    'muc tieu goal target thanh cong': '🎯 🏆 🥇 🏅 ✅ 💯 ⭐ 🚀',
    'nhac music dan': '🎵 🎧 🎸 🎹 🎤 🎻 🥁',
    've art paint sang tao': '🎨 🖌️ 🖍️ ✏️ 🎭',
    'gia dinh family ban be friend': '👨 👩 👴 👵 👶 🤝 🏠',
    'don dep clean nha': '🧹 🧺 🧼 🛁 🏠 🪥',
    'thuoc medicine suc khoe health': '💊 🩺 💉 ❤️ 🧬',
    'khong dien thoai no phone': '📵 📱 🚫',
    'lua fire streak': '🔥 ⚡ 💥 ✨',
  };
  const stripVN = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  const RECENT_KEY = 'discipline-recent-emoji';

  const picker = (() => {
    let el = null, target = null;
    const getRecent = () => { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; } };
    const pushRecent = (e) => { const r = [e, ...getRecent().filter((x) => x !== e)].slice(0, 32); localStorage.setItem(RECENT_KEY, JSON.stringify(r)); };
    const defaultRecent = ['⏰', '📚', '💪', '🥗', '🌙', '💧', '🧘', '🏃', '📖', '🎯', '🔥', '✅', '💻', '🙏', '🚀', '⭐'];
    const grid = (list) => list.map((e) => `<button type="button" class="ep-emoji" data-emoji="${e}">${e}</button>`).join('');

    function body() {
      const recent = getRecent();
      return EMOJI_CATS.map((c) => {
        const list = c.id === 'recent' ? (recent.length ? recent : defaultRecent) : c.list.split(' ');
        return `<section class="ep-section" data-sec="${c.id}"><h5>${c.name}</h5><div class="ep-grid">${grid(list)}</div></section>`;
      }).join('');
    }
    function build() {
      el = document.createElement('div');
      el.className = 'emoji-picker';
      el.innerHTML = `
        <div class="ep-search">${icon('target')}<input type="text" placeholder="Tìm emoji (vd: học, ngủ, gym, nước...)" aria-label="Tìm emoji"></div>
        <div class="ep-body"></div>
        <div class="ep-tabs">${EMOJI_CATS.map((c) => `<button type="button" data-cat="${c.id}" title="${c.name}">${c.icon}</button>`).join('')}
          <button type="button" class="ep-clear" data-clear title="Xóa emoji">⌫</button></div>`;
      el.querySelector('.ep-search .ic').outerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
      document.body.appendChild(el);
      const bodyEl = el.querySelector('.ep-body');
      const input = el.querySelector('.ep-search input');

      el.addEventListener('click', (e) => {
        const em = e.target.closest('[data-emoji]');
        if (em) return choose(em.dataset.emoji);
        if (e.target.closest('[data-clear]')) return choose('');
        const cat = e.target.closest('[data-cat]');
        if (cat) {
          input.value = ''; bodyEl.innerHTML = body();
          const sec = bodyEl.querySelector(`[data-sec="${cat.dataset.cat}"]`);
          if (sec) bodyEl.scrollTo({ top: sec.offsetTop - bodyEl.offsetTop, behavior: 'smooth' });
        }
      });
      bodyEl.addEventListener('scroll', () => {
        let cur = 'recent';
        bodyEl.querySelectorAll('.ep-section').forEach((s) => { if (s.offsetTop - bodyEl.offsetTop <= bodyEl.scrollTop + 10) cur = s.dataset.sec; });
        el.querySelectorAll('[data-cat]').forEach((b) => b.classList.toggle('active', b.dataset.cat === cur));
      });
      input.addEventListener('input', () => {
        const q = stripVN(input.value.trim());
        if (!q) { bodyEl.innerHTML = body(); return; }
        const found = new Set();
        Object.entries(EMOJI_KEYWORDS).forEach(([k, v]) => { if (k.split(' ').some((w) => w.startsWith(q) || q.split(' ').some((p) => p && w.startsWith(p)))) v.split(' ').forEach((x) => found.add(x)); });
        EMOJI_CATS.forEach((c) => { if (c.list && stripVN(c.name).includes(q)) c.list.split(' ').forEach((x) => found.add(x)); });
        bodyEl.innerHTML = found.size
          ? `<section class="ep-section"><h5>Kết quả</h5><div class="ep-grid">${grid([...found])}</div></section>`
          : '<p class="ep-empty">Không tìm thấy emoji phù hợp</p>';
        bodyEl.scrollTop = 0;
      });
    }
    function choose(emoji) {
      if (!target) return close();
      const hidden = target.nextElementSibling;
      const isAdd = !target.dataset.taskId;
      const val = emoji || (isAdd ? '🎯' : '');
      target.textContent = val || '➕';
      if (hidden && hidden.type === 'hidden') hidden.value = val;
      if (emoji) pushRecent(emoji);
      const t = state.tasks.find((x) => x.id === target.dataset.taskId);
      if (t) { t.emoji = val; save(); toast(`Đã đổi biểu tượng: ${val || '(trống)'} ${t.name}`, 'success', 'check'); }
      close();
    }
    function open(btn) {
      if (!el) build();
      target = btn;
      const input = el.querySelector('.ep-search input');
      input.value = '';
      el.querySelector('.ep-body').innerHTML = body();
      el.querySelector('.ep-body').scrollTop = 0;
      el.querySelectorAll('[data-cat]').forEach((b) => b.classList.toggle('active', b.dataset.cat === 'recent'));
      el.classList.add('open');
      const mobile = window.innerWidth < 640;
      el.classList.toggle('sheet', mobile);
      if (!mobile) {
        const r = btn.getBoundingClientRect();
        const w = el.offsetWidth, h = el.offsetHeight;
        let left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
        let top = r.bottom + 8;
        if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 8);
        el.style.left = left + 'px'; el.style.top = top + 'px';
        setTimeout(() => input.focus(), 30);
      } else { el.style.left = ''; el.style.top = ''; }
    }
    function close() { if (el) el.classList.remove('open'); target = null; }
    return {
      toggle: (btn) => (el && el.classList.contains('open') && target === btn ? close() : open(btn)),
      close,
      isOpen: () => !!(el && el.classList.contains('open')),
    };
  })();

  /* ================= EVENTS ================= */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el || el.disabled) return;
    const fn = ACTIONS[el.dataset.action];
    if (fn) { e.preventDefault(); fn(el, e); }
  });
  document.addEventListener('submit', (e) => {
    const fn = FORMS[e.target.dataset.form];
    if (fn) { e.preventDefault(); fn(e.target); }
  });
  $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (picker.isOpen()) picker.close(); else closeModal(); } });
  document.addEventListener('click', (e) => { if (picker.isOpen() && !e.target.closest('.emoji-picker, [data-action="emoji-pick"]')) picker.close(); });
  // Chỉ đóng khi đổi chiều ngang (bàn phím điện thoại bật lên chỉ đổi chiều cao)
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => { if (window.innerWidth !== lastW) { lastW = window.innerWidth; picker.close(); } });
  $('#menuBtn').addEventListener('click', () => { $('#sidebar').classList.add('open'); $('#backdrop').classList.add('show'); });
  $('#backdrop').addEventListener('click', () => { $('#sidebar').classList.remove('open'); $('#backdrop').classList.remove('show'); });
  $('#importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || !Array.isArray(data.tasks) || typeof data.days !== 'object') throw new Error('invalid');
        state = normalize(data);
        log('system', 'Đã nhập dữ liệu từ file sao lưu');
        commit();
        toast('Nhập dữ liệu thành công', 'success', 'upload');
      } catch { toast('File không hợp lệ', 'warn'); }
      e.target.value = '';
    };
    reader.readAsText(file);
  });
  window.addEventListener('hashchange', route);
  let rz;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if (ui.route === 'overview' || ui.route === 'stats') render(); }, 150); });

  // Tự cập nhật khi qua ngày mới
  let lastDay = todayKey();
  setInterval(() => { if (todayKey() !== lastDay) { lastDay = todayKey(); ui.schedDate = lastDay; render(); } }, 60e3);

  /* ================= INIT ================= */
  state = load();
  ui.quoteIdx = today().getDate() % QUOTES.length;
  hydrateIcons();
  save();
  route();
})();
