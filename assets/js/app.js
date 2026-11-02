/* =========================================================
   OUR LITTLE UNIVERSE
   Everything lives in this browser. No server, no tracking.
   ========================================================= */
(() => {
  "use strict";

  /* ---------- constants ---------- */
  const STORAGE_KEY = "our-little-universe-v1";
  const DB_NAME = "our-little-universe-photos";
  const DB_STORE = "photos";
  const MAX_PHOTOS = 30;
  const DAY = 86400000;
  const THEMES = ["blush", "dusk", "mint"];
  const FIXED_NAMES = ["张选宁", "吕燕娇"];
  const FIXED_START_DATE = "2026-03-28";
  const DEFAULT_NAMES = [...FIXED_NAMES];
  const DEFAULT_DATE = FIXED_START_DATE;

  const MOODS = [
    { emoji: "🥰", label: "甜到冒泡", tone: "love" },
    { emoji: "😌", label: "平静温柔", tone: "calm" },
    { emoji: "🥳", label: "超级开心", tone: "happy" },
    { emoji: "😴", label: "电量不足", tone: "tired" },
    { emoji: "🥺", label: "想你了", tone: "miss" },
    { emoji: "😤", label: "有点小气", tone: "angry" },
    { emoji: "😢", label: "需要抱抱", tone: "sad" },
    { emoji: "🤒", label: "不太舒服", tone: "sick" }
  ];

  const QUOTES = [
    { text: "今天也是想和你一起浪费的一天。", from: "我们的小宇宙" },
    { text: "世界很大，幸好我的小事都有你。", from: "我们的小宇宙" },
    { text: "你不用完美，你只要是你。", from: "我们的小宇宙" },
    { text: "想把日子过得很慢，慢到每一秒都有你。", from: "我们的小宇宙" },
    { text: "你是我所有平凡日子里的例外。", from: "我们的小宇宙" },
    { text: "见到你之后，我的生物钟变成了想你。", from: "我们的小宇宙" },
    { text: "我们不是天生一对，是每天重新选择彼此。", from: "我们的小宇宙" },
    { text: "想和你把柴米油盐，过成风花雪月。", from: "我们的小宇宙" },
    { text: "你一笑，我就觉得今天没白过。", from: "我们的小宇宙" },
    { text: "爱不是彼此凝视，而是一起朝同一个方向看。", from: "圣埃克苏佩里" },
    { text: "我明白你会来，所以我等。", from: "沈从文" },
    { text: "答案很长，我准备用一生的时间来回答。", from: "林徽因" },
    { text: "今晚月色真美。", from: "夏目漱石" },
    { text: "从前的日色变得慢，车、马、邮件都慢。", from: "木心" },
    { text: "你下午四点钟来，那么从三点钟起，我就开始感到幸福。", from: "《小王子》" },
    { text: "我这一生都是坚定的唯物主义者，唯有你，我希望有来生。", from: "周恩来" },
    { text: "所谓浪漫，就是没有后来。", from: "我们的小宇宙" },
    { text: "想和你分享的不是生活，是我对生活的热爱。", from: "我们的小宇宙" },
    { text: "你在我身边的时候，我从来没有羡慕过任何人。", from: "我们的小宇宙" },
    { text: "愿我们既有柴米油盐，也有星辰大海。", from: "我们的小宇宙" },
    { text: "把普通的日子过得浪漫一点，是我们共同的本事。", from: "我们的小宇宙" },
    { text: "喜欢是乍见之欢，爱是久处不厌。", from: "我们的小宇宙" },
    { text: "你是我认真挑选的家人。", from: "我们的小宇宙" },
    { text: "想和你一起，把“以后”变成“现在”。", from: "我们的小宇宙" },
    { text: "不必时时刻刻心动，只要一直心安。", from: "我们的小宇宙" },
    { text: "最好的关系，是并肩而立，成为彼此的底气。", from: "我们的小宇宙" },
    { text: "日子是重复的，但和你在一起就不是。", from: "我们的小宇宙" },
    { text: "想陪你把漫长岁月，熬成一碗甜粥。", from: "我们的小宇宙" },
    { text: "你是我平淡生活里，最亮的那颗星。", from: "我们的小宇宙" },
    { text: "余生请多指教，今天也请多抱抱。", from: "我们的小宇宙" }
  ];

  const QUIZ_QUESTIONS = [
    { q: "周末最想怎么过？", options: ["宅家一起看电影", "去公园散步晒太阳", "探店吃一顿好的", "来一场短途旅行"] },
    { q: "心情不好时，最需要什么？", options: ["一个很紧的拥抱", "安静地陪在身边", "听我把话说完", "带我吃点好吃的"] },
    { q: "最想收到什么样的礼物？", options: ["手写的小卡片", "一直想要的东西", "一次精心安排的约会", "不用礼物，人在就好"] },
    { q: "吃饭时最看重什么？", options: ["味道好吃", "环境好看", "和谁一起吃", "不用排队"] },
    { q: "旅行时更喜欢？", options: ["做好攻略按计划走", "睡到自然醒随便逛", "去海边发呆", "打卡所有景点"] },
    { q: "吵架之后，更希望？", options: ["先抱一下再讲道理", "各自冷静一会儿", "把话说开", "用好吃的和好"] }
  ];

  const WHEEL_META = {
    food: { title: "今天吃什么？", desc: "把“随便”从今晚的对话里删掉。", label: "吃什么" },
    place: { title: "今天去哪玩？", desc: "不用做攻略，让转盘替你们决定。", label: "去哪玩" },
    chore: { title: "今天谁来做？", desc: "公平公正，愿赌服输。", label: "谁来做" }
  };

  const WHEEL_COLORS = ["#f2557f", "#ff9f7a", "#ffd166", "#8fd6bd", "#b9a6f2", "#ff9ec4", "#f7c8a0", "#9cc9f2"];

  /* ---------- tiny helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const pad2 = (n) => String(n).padStart(2, "0");
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  function uid() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));
  }

  function parseDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [y, m, d] = value.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
    return date;
  }

  function startOfDay(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function dateKey(date = new Date()) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
  }

  function addDays(date, days) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function formatFullDate(date) {
    try {
      return new Intl.DateTimeFormat("zh-CN", {
        year: "numeric", month: "long", day: "numeric", weekday: "long"
      }).format(date);
    } catch {
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
  }

  function formatShortDate(date) {
    return `${date.getFullYear()}.${pad2(date.getMonth() + 1)}.${pad2(date.getDate())}`;
  }

  function formatMonthDay(date) {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }

  function firstName(name) {
    const chars = Array.from(String(name || "").trim());
    return chars[0] ? chars[0].toUpperCase() : "♡";
  }

  function isMobile() {
    return window.matchMedia("(max-width: 980px)").matches;
  }

  function copyText(text, message = "已复制") {
    const done = () => toast(message);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      done();
    } catch {
      window.prompt("复制这个链接发给 TA：", text);
    } finally {
      area.remove();
    }
  }

  /* ---------- state ---------- */
  function defaultState() {
    return {
      version: 1,
      onboarded: false,
      names: [...DEFAULT_NAMES],
      startDate: DEFAULT_DATE,
      theme: "blush",
      anniversaries: [
        { id: uid(), title: "在一起纪念日", date: DEFAULT_DATE, yearly: true, icon: "heart", auto: true }
      ],
      wishes: [
        { id: uid(), text: "一起去看一次日出", category: "旅行", done: false, createdAt: Date.now() },
        { id: uid(), text: "拍一组只属于我们的照片", category: "纪念", done: false, createdAt: Date.now() },
        { id: uid(), text: "学会做对方最爱吃的一道菜", category: "日常", done: false, createdAt: Date.now() }
      ],
      moods: {},
      notes: [
        {
          id: uid(),
          author: "system",
          text: "欢迎来到我们的小宇宙。\n\n这里没有观众，只有你们两个人。把想说的话、想记住的日子，都悄悄放进来吧。",
          createdAt: Date.now(),
          openAt: null
        }
      ],
      quizBest: 0,
      wheelOptions: {
        food: ["火锅", "日料", "烧烤", "家常菜", "披萨", "随便吃点"],
        place: ["看电影", "逛公园", "探店", "宅家", "短途旅行", "散步"],
        chore: ["石头剪刀布", "一起做", "今天你", "今天我", "猜拳", "抽签"]
      },
      activeWheel: "food",
      createdAt: Date.now()
    };
  }

  function normalizeState(raw) {
    const base = defaultState();
    if (!raw || typeof raw !== "object") return base;
    const out = { ...base, ...raw };

    out.version = 1;
    // Names and the relationship start date are intentionally locked.
    // Even an old backup or a crafted URL cannot change them.
    out.names = [...FIXED_NAMES];
    out.startDate = FIXED_START_DATE;
    if (!THEMES.includes(out.theme)) out.theme = "blush";
    out.onboarded = Boolean(raw.onboarded);
    out.quizBest = clamp(Number(raw.quizBest) || 0, 0, 100);
    out.moods = raw.moods && typeof raw.moods === "object" ? raw.moods : {};
    out.notes = Array.isArray(raw.notes) ? raw.notes.filter((n) => n && typeof n.text === "string") : base.notes;
    out.wishes = Array.isArray(raw.wishes) ? raw.wishes.filter((w) => w && typeof w.text === "string").map((w) => ({
      id: w.id || uid(),
      text: String(w.text).slice(0, 80),
      category: String(w.category || "日常").slice(0, 10),
      done: Boolean(w.done),
      createdAt: Number(w.createdAt) || Date.now()
    })) : base.wishes;
    out.anniversaries = Array.isArray(raw.anniversaries)
      ? raw.anniversaries.filter((a) => a && typeof a.title === "string" && parseDate(a.date)).map((a) => ({
        id: a.id || uid(),
        title: String(a.title).slice(0, 30),
        date: a.date,
        yearly: a.yearly !== false,
        icon: ["heart", "cake", "plane", "star", "ring"].includes(a.icon) ? a.icon : "heart",
        auto: Boolean(a.auto)
      }))
      : base.anniversaries;

    // Keep one locked "在一起纪念日" card that always follows the fixed date.
    const autoAnniversary = out.anniversaries.find((a) => a.auto || a.title === "在一起纪念日");
    if (autoAnniversary) {
      autoAnniversary.title = "在一起纪念日";
      autoAnniversary.date = FIXED_START_DATE;
      autoAnniversary.yearly = true;
      autoAnniversary.icon = "heart";
      autoAnniversary.auto = true;
    } else {
      out.anniversaries.unshift({
        id: uid(),
        title: "在一起纪念日",
        date: FIXED_START_DATE,
        yearly: true,
        icon: "heart",
        auto: true
      });
    }

    const fallbackWheels = base.wheelOptions;
    const rawWheels = raw.wheelOptions && typeof raw.wheelOptions === "object" ? raw.wheelOptions : {};
    out.wheelOptions = {};
    ["food", "place", "chore"].forEach((key) => {
      const list = Array.isArray(rawWheels[key]) ? rawWheels[key] : fallbackWheels[key];
      out.wheelOptions[key] = list.map((s) => String(s).trim()).filter(Boolean).slice(0, 10);
      if (out.wheelOptions[key].length < 2) out.wheelOptions[key] = fallbackWheels[key];
    });
    out.activeWheel = ["food", "place", "chore"].includes(raw.activeWheel) ? raw.activeWheel : "food";
    return out;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      return normalizeState(JSON.parse(raw));
    } catch (err) {
      console.warn("Could not read saved state", err);
      return defaultState();
    }
  }

  let state = loadState();
  let photosCache = [];
  let wishFilter = "all";
  let selectedAnniversaryIcon = "heart";
  let editingAnniversaryId = null;
  let currentLetterId = null;
  let lightboxIndex = 0;
  let toastTimer = 0;
  let lastFocus = null;
  let lastTodayKey = dateKey();
  let confirmCallback = null;
  let audioCtx = null;
  let audioTimer = 0;
  let audioMaster = null;
  let musicOn = false;
  let heartBurstTimer = 0;

  /* ---------- persistence ---------- */
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Could not save state", err);
      toast("浏览器存储空间不足，刚才的修改可能没有保存");
    }
  }

  function setTheme(theme) {
    const safe = THEMES.includes(theme) ? theme : "blush";
    document.documentElement.dataset.theme = safe;
    state.theme = safe;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", safe === "dusk" ? "#171017" : safe === "mint" ? "#f2f7f2" : "#fbf4ee");
    $$("#themeOptions [data-theme-choice]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.themeChoice === safe);
    });
  }

  /* ---------- dates & counters ---------- */
  function getStartDate() {
    return parseDate(state.startDate) || parseDate(DEFAULT_DATE);
  }

  function getDaysTogether() {
    const start = getStartDate();
    const today = startOfDay();
    const diff = Math.floor((today - start) / DAY);
    return diff < 0 ? 0 : diff + 1;
  }

  function occurrenceThisYear(base, year) {
    let month = base.getMonth();
    let day = base.getDate();
    if (month === 1 && day === 29) {
      const leap = new Date(year, 1, 29);
      if (leap.getMonth() !== 1) day = 28;
    }
    return new Date(year, month, day);
  }

  function getNextForAnniversary(item) {
    const base = parseDate(item.date);
    if (!base) return null;
    const today = startOfDay();
    if (!item.yearly) {
      return base >= today ? { target: base, days: Math.round((base - today) / DAY) } : null;
    }
    let target = occurrenceThisYear(base, today.getFullYear());
    if (target < today) target = occurrenceThisYear(base, today.getFullYear() + 1);
    return { target, days: Math.round((target - today) / DAY) };
  }

  function getNextAnniversary() {
    const candidates = state.anniversaries
      .map((item) => ({ item, next: getNextForAnniversary(item) }))
      .filter((x) => x.next)
      .sort((a, b) => a.next.target - b.next.target);
    return candidates[0] || null;
  }

  function getMilestones() {
    const start = getStartDate();
    const today = startOfDay();
    const marks = [100, 520, 1000, 1314, 2000, 3000];
    return marks.map((mark) => {
      const target = addDays(start, mark - 1);
      const days = Math.round((target - today) / DAY);
      return { mark, target, days, done: target <= today };
    });
  }

  function getMood(person, key = dateKey()) {
    const entry = state.moods[key];
    return entry && entry[person] ? entry[person] : null;
  }

  function getTodayMood(person) {
    return getMood(person, dateKey());
  }

  function getMoodTone(mood) {
    if (!mood) return "none";
    return mood.tone || "calm";
  }

  /* ---------- modal helpers ---------- */
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    $$(".modal.is-open").forEach((open) => {
      if (open !== modal) closeModal(open.id, true);
    });
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    window.setTimeout(() => {
      if (!modal.classList.contains("is-open")) return;
      const focusable = modal.querySelector("input:not([type=hidden]), textarea, select, button:not(.modal-close), [href]");
      if (focusable) focusable.focus({ preventScroll: true });
    }, 100);
  }

  function closeModal(id, keepLock = false) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    const anyOpen = $$(".modal.is-open").length > 0;
    if (!anyOpen && !keepLock) {
      document.body.classList.remove("is-locked");
      if (lastFocus && typeof lastFocus.focus === "function") {
        try { lastFocus.focus({ preventScroll: true }); } catch { /* ignore */ }
      }
      lastFocus = null;
    }
  }

  function closeAllModals() {
    $$(".modal.is-open").forEach((m) => closeModal(m.id, true));
    document.body.classList.remove("is-locked");
  }

  function askConfirm(title, description, onConfirm, confirmLabel = "确定") {
    const titleEl = $("#confirmTitle");
    const descEl = $("#confirmDesc");
    const ok = $("#confirmOk");
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = description;
    if (ok) ok.textContent = confirmLabel;
    confirmCallback = typeof onConfirm === "function" ? onConfirm : null;
    openModal("confirmModal");
  }

  function toast(message) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => el.classList.remove("is-visible"), 2800);
  }

  /* ---------- share ---------- */
  function buildShareUrl() {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.toString();
  }

  function shareHouse() {
    const url = buildShareUrl();
    copyText(url, "专属链接已复制，发给 TA 一起打开吧");
    if (window.location.protocol === "file:") {
      toast("现在是本地打开，链接只能在这台电脑使用");
    }
  }

  /* ---------- render: core ---------- */
  function renderAll() {
    renderIdentity();
    renderWishes();
    renderAnniversaries();
    updateCountdown();
    renderMood();
    renderWeekMood();
    renderLetters();
    renderBadges();
    renderStats();
    renderSettingsFields();
    renderWheelChrome();
    updateHeroNote();
    renderMilestones();
    updateDocumentTitle();
  }

  function renderIdentity() {
    const [a, b] = state.names;
    const start = getStartDate();
    const year = start.getFullYear();

    setText("#heroNameA", a);
    setText("#heroNameB", b);
    const heroTitle = $(".hero-title");
    if (heroTitle) {
      const totalChars = Array.from(a).length + Array.from(b).length;
      heroTitle.classList.toggle("is-long", totalChars > 4);
    }
    setText("#orbInitialA", firstName(a));
    setText("#orbInitialB", firstName(b));
    setText("#moodNameA", a);
    setText("#moodNameB", b);
    setText("#moodAvatarA", firstName(a));
    setText("#moodAvatarB", firstName(b));
    setText("#estYear", `EST. ${year}`);
    setText("#orbitYear", String(year));
    setText("#footerDate", String(new Date().getFullYear()));
    setText("#wishDoneTop", String(state.wishes.filter((w) => w.done).length));

    const authorSelect = $("#letterAuthor");
    if (authorSelect) {
      const current = authorSelect.value || "a";
      authorSelect.innerHTML = `<option value="a">我 · ${esc(a)}</option><option value="b">TA · ${esc(b)}</option>`;
      authorSelect.value = current === "b" ? "b" : "a";
    }

    const today = new Date();
    const weekNames = ["日", "一", "二", "三", "四", "五", "六"];
    const shortToday = `${pad2(today.getMonth() + 1)}.${pad2(today.getDate())} 周${weekNames[today.getDay()]}`;
    ["A", "B"].forEach((p) => setText(`#moodDate${p}`, shortToday));
  }

  function setText(selector, text) {
    const el = $(selector);
    if (el) el.textContent = text;
  }

  function renderStats() {
    const days = getDaysTogether();
    const done = state.wishes.filter((w) => w.done).length;
    const notes = state.notes.filter((n) => n.author !== "system").length;
    setText("#daysTogether", String(days));
    setText("#statDays", String(days));
    setText("#statWishes", String(done));
    setText("#statNotes", String(notes));
    setText("#togetherDaysAside", String(days));
    setText("#togetherSinceAside", formatShortDate(getStartDate()));
    const quizStat = $("#statQuiz");
    if (quizStat) quizStat.innerHTML = `${state.quizBest || 0}${state.quizBest ? "<small>%</small>" : ""}`;
    setText("#quizBest", state.quizBest ? `${state.quizBest}%` : "--");
  }

  function updateHeroNote() {
    const noteA = getTodayMood("a");
    const noteB = getTodayMood("b");
    const note = (noteA && noteA.note) || (noteB && noteB.note);
    const quote = quoteOfDay();
    const el = $("#heroNote");
    if (el) el.textContent = note || quote.text;
  }

  function quoteOfDay() {
    const date = new Date();
    const start = new Date(date.getFullYear(), 0, 0);
    const day = Math.floor((date - start) / DAY);
    return QUOTES[Math.abs(day) % QUOTES.length];
  }

  function updateDocumentTitle() {
    document.title = `第 ${getDaysTogether()} 天 · 张选宁 & 吕燕娇`;
  }

  /* ---------- render: anniversaries ---------- */
  function renderAnniversaries() {
    const list = $("#anniversaryList");
    if (!list) return;
    const items = state.anniversaries
      .map((item) => ({ item, next: getNextForAnniversary(item) }))
      .sort((a, b) => {
        if (!a.next && !b.next) return a.item.title.localeCompare(b.item.title);
        if (!a.next) return 1;
        if (!b.next) return -1;
        return a.next.days - b.next.days;
      });

    if (!items.length) {
      list.innerHTML = `<div class="empty-state"><span class="empty-emoji">🗓️</span><p>还没有纪念日，<br>把你们的故事写进时间里吧。</p></div>`;
      return;
    }

    list.innerHTML = items.map(({ item, next }) => {
      const daysLabel = next ? (next.days === 0 ? "就是今天" : `还有 ${next.days} 天`) : "已经走过";
      const dateText = `${formatMonthDay(parseDate(item.date))}${item.yearly ? " · 每年" : ` · ${parseDate(item.date).getFullYear()}`}`;
      return `
        <article class="anniversary-item" data-id="${esc(item.id)}">
          <div class="anniversary-icon"><svg class="icon"><use href="#i-${esc(item.icon)}"></use></svg></div>
          <div class="anniversary-info">
            <h4>${esc(item.title)}</h4>
            <p>${esc(dateText)}</p>
          </div>
          <div class="anniversary-days">
            <b>${next ? (next.days === 0 ? "♥" : next.days) : "—"}</b>
            <span>${daysLabel}</span>
          </div>
          ${item.auto
            ? `<span class="anniversary-lock" title="名字与开始日期已固定" aria-label="已固定"><svg class="icon"><use href="#i-lock"></use></svg></span>`
            : `<div class="anniversary-actions">
                <button class="mini-btn" type="button" data-edit-anniversary="${esc(item.id)}" aria-label="编辑 ${esc(item.title)}"><svg class="icon"><use href="#i-edit"></use></svg></button>
                <button class="mini-btn" type="button" data-delete-anniversary="${esc(item.id)}" aria-label="删除 ${esc(item.title)}"><svg class="icon"><use href="#i-trash"></use></svg></button>
              </div>`}
        </article>`;
    }).join("");
  }

  function renderMilestones() {
    const el = $("#milestoneRow");
    if (!el) return;
    const all = getMilestones();
    const upcoming = all.filter((m) => !m.done);
    const selected = upcoming.length ? upcoming.slice(0, 3) : all.slice(-3);
    el.innerHTML = selected.map((m) => {
      const label = m.done ? "已抵达" : m.days === 0 ? "就是今天" : `还有 ${m.days} 天`;
      return `
        <div class="milestone ${m.done ? "is-done" : ""}" data-mark="${m.mark}">
          <span class="milestone-dot"></span>
          <div><b>第 ${m.mark} 天</b><p>${formatFullDate(m.target)}</p></div>
          <span class="when">${label}</span>
        </div>`;
    }).join("");
  }

  function updateCountdown() {
    const next = getNextAnniversary();
    const daysEl = $("#cdDays");
    const hoursEl = $("#cdHours");
    const minutesEl = $("#cdMinutes");
    const secondsEl = $("#cdSeconds");
    if (!daysEl) return;

    if (!next) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      setText("#nextTitle", "所有纪念日都已走过");
      setText("#nextBadge", "MEMORY");
      setText("#nextDate", "去添加下一个值得期待的日子吧");
      setText("#nextHint", "每一个被记住的日子，都算数。");
      const bar = $("#nextProgress");
      if (bar) bar.style.width = "100%";
      return;
    }

    const { item, next: n } = next;
    setText("#nextTitle", item.title);
    setText("#nextBadge", item.yearly ? "YEARLY" : "ONE TIME");
    const today = startOfDay();
    const target = n.target;

    if (target.getTime() === today.getTime()) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      setText("#nextDate", `${formatFullDate(target)} · 就是今天`);
      setText("#nextHint", "就是今天，记得好好抱一下。");
      const bar = $("#nextProgress");
      if (bar) bar.style.width = "100%";
      return;
    }

    const now = new Date();
    let diff = Math.max(0, target.getTime() - now.getTime());
    const days = Math.floor(diff / DAY);
    diff -= days * DAY;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    daysEl.textContent = pad2(days);
    hoursEl.textContent = pad2(hours);
    minutesEl.textContent = pad2(minutes);
    secondsEl.textContent = pad2(seconds);
    setText("#nextDate", `${formatFullDate(target)} · 还有 ${n.days} 天`);

    if (n.days <= 7) setText("#nextHint", "快到了，偷偷准备一个小惊喜吧。");
    else if (n.days <= 30) setText("#nextHint", "这个月有一件值得期待的小事。");
    else setText("#nextHint", "每过一天，就多爱你一点。");

    let percent = 0;
    if (item.yearly) {
      const last = new Date(target.getFullYear() - 1, target.getMonth(), target.getDate());
      percent = clamp(((now - last) / (target - last)) * 100, 0, 100);
    } else {
      percent = 100;
    }
    const bar = $("#nextProgress");
    if (bar) bar.style.width = `${percent.toFixed(1)}%`;
  }

  /* ---------- render: wishes ---------- */
  function renderWishes() {
    const list = $("#wishList");
    if (!list) return;
    const total = state.wishes.length;
    const done = state.wishes.filter((w) => w.done).length;
    const percent = total ? Math.round((done / total) * 100) : 0;

    const ring = $("#wishRing");
    if (ring) ring.style.setProperty("--p", String(percent));
    setText("#wishPercent", `${percent}%`);
    setText("#wishDone", String(done));
    setText("#wishTotal", String(total));
    setText("#wishDoneTop", String(done));

    const filtered = state.wishes.filter((w) => {
      if (wishFilter === "todo") return !w.done;
      if (wishFilter === "done") return w.done;
      return true;
    }).sort((a, b) => Number(a.done) - Number(b.done) || b.createdAt - a.createdAt);

    if (!filtered.length) {
      const messages = {
        all: ["🌱", "清单还是空的，<br>写下第一件想一起做的事吧。"],
        todo: ["🎉", "所有愿望都实现啦，<br>去添加下一个吧。"],
        done: ["🫧", "还没有完成的愿望，<br>不着急，慢慢来。"]
      };
      const [emoji, msg] = messages[wishFilter];
      list.innerHTML = `<li class="empty-state"><span class="empty-emoji">${emoji}</span><p>${msg}</p></li>`;
      return;
    }

    list.innerHTML = filtered.map((wish) => `
      <li class="wish-item ${wish.done ? "is-done" : ""}" data-id="${esc(wish.id)}">
        <button class="wish-check" type="button" data-toggle-wish="${esc(wish.id)}" aria-label="${wish.done ? "标记为未完成" : "标记为已完成"}">
          <svg class="icon"><use href="#i-check"></use></svg>
        </button>
        <div class="wish-content">
          <div class="wish-text">${esc(wish.text)}</div>
          <span class="wish-cat">${esc(wish.category)}</span>
        </div>
        <button class="mini-btn" type="button" data-delete-wish="${esc(wish.id)}" aria-label="删除这个愿望"><svg class="icon"><use href="#i-trash"></use></svg></button>
      </li>`).join("");
  }

  /* ---------- render: moods ---------- */
  function renderMood() {
    ["a", "b"].forEach((person) => {
      const mood = getTodayMood(person);
      const wrap = document.querySelector(`.mood-options[data-person="${person}"]`);
      if (wrap) {
        wrap.innerHTML = MOODS.map((m) => `
          <button class="mood-option ${mood && mood.emoji === m.emoji ? "is-active" : ""}" type="button" data-mood="${m.emoji}" data-person="${person}" aria-pressed="${mood && mood.emoji === m.emoji ? "true" : "false"}">
            <span class="emoji">${m.emoji}</span><span class="label">${escapeEmojiLabel(m.label)}</span>
          </button>`).join("");
      }
      const selected = document.querySelector(`#moodSelected${person.toUpperCase()}`);
      if (selected) {
        selected.innerHTML = mood
          ? `<b>${mood.emoji} ${esc(mood.label)}</b>${mood.note ? ` · ${esc(mood.note)}` : ""}`
          : "<span>还没有记录，选一个最像今天的表情吧。</span>";
      }
      const note = document.querySelector(`#moodNote${person.toUpperCase()}`);
      if (note && document.activeElement !== note) note.value = mood && mood.note ? mood.note : "";
    });
    renderMoodTogether();
    renderWeekMood();
    updateHeroNote();
  }

  function escapeEmojiLabel(text) {
    return esc(text);
  }

  function renderMoodTogether() {
    const el = $("#moodTogether");
    if (!el) return;
    const a = getTodayMood("a");
    const b = getTodayMood("b");
    const nameA = state.names[0];
    const nameB = state.names[1];
    if (!a && !b) {
      el.innerHTML = `<span class="mood-together-dot"></span><span>等你们记录今天的心情</span>`;
      return;
    }
    if (a && !b) {
      el.innerHTML = `<span class="mood-together-dot"></span><span>${esc(nameA)} 今天 ${a.emoji}，等 ${esc(nameB)} 也来说说</span>`;
      return;
    }
    if (!a && b) {
      el.innerHTML = `<span class="mood-together-dot"></span><span>${esc(nameB)} 今天 ${b.emoji}，等 ${esc(nameA)} 也来说说</span>`;
      return;
    }
    const tones = [getMoodTone(a), getMoodTone(b)];
    const hard = tones.some((t) => ["sad", "sick", "angry", "tired"].includes(t));
    const sweet = tones.every((t) => ["love", "happy", "calm", "miss"].includes(t));
    const message = hard ? "今天记得多给彼此一个抱抱" : sweet ? "今天是甜度超标的一天" : "两颗心都在认真感受今天";
    el.innerHTML = `<span class="mood-together-dot"></span><span>${a.emoji} ${esc(nameA)} · ${b.emoji} ${esc(nameB)} <b>${message}</b></span>`;
  }

  function renderWeekMood() {
    const el = $("#weekMood");
    if (!el) return;
    const today = startOfDay();
    const names = ["日", "一", "二", "三", "四", "五", "六"];
    let html = "";
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = addDays(today, -offset);
      const key = dateKey(date);
      const a = getMood("a", key);
      const b = getMood("b", key);
      html += `
        <div class="week-day ${offset === 0 ? "is-today" : ""}" title="${date.getMonth() + 1}月${date.getDate()}日">
          <span class="day-name">周${names[date.getDay()]}</span>
          <span class="day-num">${date.getDate()}</span>
          <div class="day-moods">
            ${a ? `<span title="${esc(a.label)}">${a.emoji}</span>` : "<i></i>"}
            ${b ? `<span title="${esc(b.label)}">${b.emoji}</span>` : "<i></i>"}
          </div>
        </div>`;
    }
    el.innerHTML = html;
  }

  /* ---------- render: letters ---------- */
  function authorName(author) {
    if (author === "a") return state.names[0];
    if (author === "b") return state.names[1];
    return "爱神丘比特";
  }

  function isLetterLocked(note) {
    if (!note.openAt) return false;
    const open = parseDate(note.openAt);
    if (!open) return false;
    return open > startOfDay();
  }

  function renderLetters() {
    const list = $("#letterList");
    if (!list) return;
    if (!state.notes.length) {
      list.innerHTML = `<div class="letter-empty">信箱还是空的，写第一封信吧。</div>`;
      return;
    }
    list.innerHTML = state.notes.slice().sort((a, b) => b.createdAt - a.createdAt).map((note) => {
      const locked = isLetterLocked(note);
      const days = locked ? Math.ceil((parseDate(note.openAt) - startOfDay()) / DAY) : 0;
      const excerpt = note.text.replace(/\s+/g, " ").trim().slice(0, 72) || "（一封没有文字的信）";
      return `
        <article class="letter-card ${locked ? "locked" : ""}" data-letter-id="${esc(note.id)}">
          <span class="letter-seal"><svg class="icon"><use href="#i-${locked ? "lock" : "heart"}"></use></svg></span>
          <div class="letter-card-body">
            <div class="letter-card-meta"><b>${esc(authorName(note.author))}</b><time>${formatShortDate(new Date(note.createdAt))}</time></div>
            <h4>${locked ? "这封信还在时间里睡着…" : esc(excerpt)}</h4>
            ${locked ? `<div class="letter-lock-note"><svg class="icon"><use href="#i-lock"></use></svg>还有 ${days} 天开启</div>` : ""}
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- render: quiz best ---------- */
  function renderQuizBest() {
    setText("#quizBest", state.quizBest ? `${state.quizBest}%` : "--");
    renderStats();
  }

  /* ---------- render: badges ---------- */
  function renderBadges() {
    const el = $("#badgeGrid");
    if (!el) return;
    const userNotes = state.notes.filter((n) => n.author !== "system").length;
    const days = getDaysTogether();
    const items = [
      { id: "onboard", icon: "🌷", title: "点亮小屋", desc: "完成第一次设置", unlocked: state.onboarded },
      { id: "letter", icon: "💌", title: "第一封情书", desc: "写下第一封信", unlocked: userNotes >= 1 },
      { id: "wish5", icon: "✨", title: "愿望收藏家", desc: "清单里有 5 个愿望", unlocked: state.wishes.length >= 5 },
      { id: "done", icon: "✅", title: "说到做到", desc: "实现第一个愿望", unlocked: state.wishes.some((w) => w.done) },
      { id: "photo", icon: "📷", title: "胶卷记忆", desc: "收藏 3 张照片", unlocked: photosCache.length >= 3 },
      { id: "notes5", icon: "🕊️", title: "情话大师", desc: "写下 5 封信", unlocked: userNotes >= 5 },
      { id: "quiz", icon: "💞", title: "心有灵犀", desc: "默契值达到 80%", unlocked: state.quizBest >= 80 },
      { id: "days", icon: "🌙", title: "很久很久", desc: "在一起超过 100 天", unlocked: days >= 100 }
    ];
    const unlocked = items.filter((i) => i.unlocked).length;
    setText("#badgeCount", String(unlocked));
    el.innerHTML = items.map((item) => `
      <article class="badge ${item.unlocked ? "" : "is-locked"}">
        <div class="badge-icon">${item.icon}</div>
        <div class="badge-body"><b>${item.title}</b><span>${item.desc}</span></div>
      </article>`).join("");
  }

  /* ---------- settings form ---------- */
  function renderSettingsFields() {
    $$("#themeOptions [data-theme-choice]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.themeChoice === state.theme);
    });
  }

  /* ---------- photos / IndexedDB ---------- */
  let photoDBPromise = null;

  function openPhotoDB() {
    if (!("indexedDB" in window)) return Promise.reject(new Error("IndexedDB unavailable"));
    if (photoDBPromise) return photoDBPromise;
    photoDBPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE, { keyPath: "id" });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("Could not open photo database"));
    });
    return photoDBPromise;
  }

  async function dbAllPhotos() {
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readonly");
      const store = tx.objectStore(DB_STORE);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async function dbPutPhoto(photo) {
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      tx.objectStore(DB_STORE).put(photo);
      tx.oncomplete = () => resolve(photo);
      tx.onerror = () => reject(tx.error);
    });
  }

  async function dbDeletePhoto(id) {
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      tx.objectStore(DB_STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function dbClearPhotos() {
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      tx.objectStore(DB_STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function initPhotos() {
    try {
      photosCache = (await dbAllPhotos()).sort((a, b) => b.createdAt - a.createdAt);
    } catch (err) {
      console.warn("Photo storage unavailable", err);
      photosCache = [];
    }
    renderPhotoWall();
    renderBadges();
  }

  function renderPhotoWall() {
    const wall = $("#photoWall");
    if (!wall) return;
    if (!photosCache.length) {
      const placeholders = [
        ["🌷", "把今天存进胶卷"],
        ["🌊", "下一次见面，要拍很多照片"],
        ["☁️", "平凡的一天，也值得被记住"]
      ];
      wall.innerHTML = placeholders.map(([emoji, text]) => `
        <div class="photo-placeholder"><span class="ph-emoji">${emoji}</span><p>${text}</p></div>`).join("") + `
        <button class="photo-add photo-add-wide" type="button" data-add-photo>
          <svg class="icon"><use href="#i-camera"></use></svg>
          <strong>放入第一张照片</strong>
          <small>只保存在这台设备</small>
        </button>`;
      return;
    }
    wall.innerHTML = photosCache.map((photo, index) => `
      <article class="photo-card" data-photo-id="${esc(photo.id)}" style="animation-delay:${Math.min(index, 8) * 40}ms">
        <img src="${esc(photo.data)}" alt="${esc(photo.caption || "我们的回忆照片")}" loading="lazy">
        <span class="photo-caption" contenteditable="true" spellcheck="false" data-caption-id="${esc(photo.id)}" aria-label="照片配文">${esc(photo.caption || "")}</span>
        <span class="photo-date">${formatShortDate(new Date(photo.createdAt))}</span>
      </article>`).join("") + `
      <button class="photo-add" type="button" data-add-photo>
        <svg class="icon"><use href="#i-camera"></use></svg>
        <strong>再放一张</strong>
        <small>把新的回忆也存进来</small>
      </button>`;
  }

  async function compressImage(file) {
    if (!file.type.startsWith("image/")) throw new Error("not-image");
    let source;
    if ("createImageBitmap" in window) {
      source = await createImageBitmap(file);
    } else {
      source = await new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("image-load")); };
        img.src = url;
      });
    }
    const width = source.width || source.naturalWidth;
    const height = source.height || source.naturalHeight;
    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const ctx = canvas.getContext("2d");
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    if (source.close) source.close();

    let quality = 0.84;
    let data = canvas.toDataURL("image/jpeg", quality);
    while (data.length > 720000 && quality > 0.5) {
      quality -= 0.08;
      data = canvas.toDataURL("image/jpeg", quality);
    }
    if (data.length > 1000000) {
      const small = document.createElement("canvas");
      const smallScale = 1100 / Math.max(canvas.width, canvas.height);
      small.width = Math.max(1, Math.round(canvas.width * Math.min(1, smallScale)));
      small.height = Math.max(1, Math.round(canvas.height * Math.min(1, smallScale)));
      small.getContext("2d").drawImage(canvas, 0, 0, small.width, small.height);
      data = small.toDataURL("image/jpeg", 0.72);
    }
    return data;
  }

  async function handlePhotoFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    if (photosCache.length >= MAX_PHOTOS) {
      toast(`最多保存 ${MAX_PHOTOS} 张照片，先删掉一些再放吧`);
      return;
    }
    let added = 0;
    for (const file of files) {
      if (photosCache.length >= MAX_PHOTOS) break;
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 20 * 1024 * 1024) {
        toast("这张照片太大了，换一张试试");
        continue;
      }
      try {
        const data = await compressImage(file);
        const photo = { id: uid(), data, caption: "", createdAt: Date.now() };
        await dbPutPhoto(photo);
        photosCache.unshift(photo);
        added += 1;
      } catch (err) {
        console.warn("Could not add photo", err);
        toast("这张照片没有读出来，换一张试试");
      }
    }
    if (added) {
      renderPhotoWall();
      renderBadges();
      toast(added === 1 ? "照片已经放进胶卷里啦" : `${added} 张照片已经放进胶卷里啦`);
      burstConfetti(45);
    }
  }

  function openLightbox(id) {
    const index = photosCache.findIndex((p) => p.id === id);
    if (index < 0) return;
    lightboxIndex = index;
    setLightboxSlide();
    openModal("lightboxModal");
  }

  function setLightboxSlide() {
    const photo = photosCache[lightboxIndex];
    if (!photo) return;
    const img = $("#lightboxImg");
    const cap = $("#lightboxCaption");
    if (img) {
      img.src = photo.data;
      img.alt = photo.caption || "我们的回忆照片";
    }
    if (cap) cap.textContent = photo.caption || formatFullDate(new Date(photo.createdAt));
  }

  function moveLightbox(step) {
    if (!photosCache.length) return;
    lightboxIndex = (lightboxIndex + step + photosCache.length) % photosCache.length;
    setLightboxSlide();
  }

  async function saveCaption(id, caption) {
    const photo = photosCache.find((p) => p.id === id);
    if (!photo) return;
    const clean = String(caption || "").replace(/\s+/g, " ").trim().slice(0, 60);
    if (clean === photo.caption) return;
    photo.caption = clean;
    try { await dbPutPhoto(photo); } catch (err) { console.warn(err); }
  }

  /* ---------- letters ---------- */
  function openLetter(id) {
    const note = state.notes.find((n) => n.id === id);
    if (!note) return;
    if (isLetterLocked(note)) {
      const days = Math.ceil((parseDate(note.openAt) - startOfDay()) / DAY);
      toast(`这封信会在 ${days} 天后开启`);
      return;
    }
    currentLetterId = id;
    setText("#letterModalTitle", note.author === "system" ? "写给我们" : `写给 ${state.names.join(" & ")}`);
    const body = $("#letterBody");
    if (body) body.textContent = note.text;
    setText("#letterFrom", `— ${authorName(note.author)}`);
    setText("#letterDate", formatShortDate(new Date(note.createdAt)));
    const del = $("#deleteLetterBtn");
    if (del) del.style.display = note.author === "system" ? "none" : "";
    openModal("letterModal");
  }

  function randomLetter() {
    const available = state.notes.filter((n) => !isLetterLocked(n));
    if (!available.length) {
      toast("信箱里还没有可以读的信");
      return;
    }
    const pick = available[Math.floor(Math.random() * available.length)];
    openLetter(pick.id);
  }

  /* ---------- quiz ---------- */
  const quiz = {
    phase: "intro",
    index: 0,
    initiator: "a",
    answersA: [],
    answersB: [],
    locked: false
  };

  function quizStart(initiator = "a") {
    quiz.phase = "a";
    quiz.index = 0;
    quiz.initiator = initiator;
    quiz.answersA = [];
    quiz.answersB = [];
    quiz.locked = false;
    renderQuiz();
  }

  function quizCurrentPerson() {
    if (quiz.phase === "a") return quiz.initiator;
    return quiz.initiator === "a" ? "b" : "a";
  }

  function quizGuessPerson() {
    return quiz.initiator === "a" ? "b" : "a";
  }

  function renderQuiz() {
    const start = $("#quizStart");
    const play = $("#quizPlay");
    const handoff = $("#quizHandoff");
    const result = $("#quizResult");
    if (!start) return;
    start.classList.toggle("is-hidden", quiz.phase !== "intro");
    play.classList.toggle("is-hidden", !["a", "b"].includes(quiz.phase));
    handoff.classList.toggle("is-hidden", quiz.phase !== "handoff");
    result.classList.toggle("is-hidden", quiz.phase !== "result");

    if (["a", "b"].includes(quiz.phase)) {
      const person = quizCurrentPerson();
      const question = QUIZ_QUESTIONS[quiz.index];
      const guessing = quiz.phase === "b";
      setText("#quizPhaseLabel", guessing ? "GUESS TA'S ANSWER" : "YOUR TURN");
      setText("#quizPhaseTitle", guessing ? `${state.names[person]} 来猜猜 ${state.names[quizGuessPerson()]}` : `先由 ${state.names[person]} 作答`);
      setText("#quizCounter", `${quiz.index + 1} / ${QUIZ_QUESTIONS.length}`);
      const progress = $("#quizProgress");
      if (progress) progress.style.width = `${((quiz.index) / QUIZ_QUESTIONS.length) * 100}%`;
      const q = $("#quizQuestion");
      if (q) q.innerHTML = `${guessing ? '<span class="quiz-guess-tag">TA 会选哪一个？</span>' : ""}${esc(question.q)}`;
      const opts = $("#quizOptions");
      if (opts) {
        opts.innerHTML = question.options.map((option, i) => `
          <button class="quiz-option" type="button" data-quiz-option="${i}">
            <span class="option-letter">${String.fromCharCode(65 + i)}</span>${esc(option)}
          </button>`).join("");
      }
      const hint = $("#quizHint");
      if (hint) hint.textContent = guessing ? "凭你对 TA 的了解选，不要偷看答案哦。" : "凭第一直觉选就好，没有标准答案。";
    }

    if (quiz.phase === "handoff") {
      setText("#handoffName", state.names[quizGuessPerson()]);
    }

    if (quiz.phase === "result") {
      renderQuizResult();
    }
  }

  function chooseQuizOption(index) {
    if (quiz.locked) return;
    const options = $$("#quizOptions .quiz-option");
    if (!options[index]) return;
    quiz.locked = true;
    options.forEach((btn, i) => btn.classList.toggle("is-selected", i === index));
    if (quiz.phase === "a") quiz.answersA.push(index);
    else quiz.answersB.push(index);

    window.setTimeout(() => {
      quiz.locked = false;
      if (quiz.index < QUIZ_QUESTIONS.length - 1) {
        quiz.index += 1;
        renderQuiz();
      } else if (quiz.phase === "a") {
        quiz.phase = "handoff";
        renderQuiz();
      } else {
        quiz.phase = "result";
        const matches = quiz.answersA.reduce((acc, answer, i) => acc + (answer === quiz.answersB[i] ? 1 : 0), 0);
        const score = Math.round((matches / QUIZ_QUESTIONS.length) * 100);
        if (score > state.quizBest) {
          state.quizBest = score;
          saveState();
        }
        renderQuiz();
        renderQuizBest();
        renderBadges();
        if (score >= 80) burstConfetti(80);
      }
    }, 260);
  }

  function renderQuizResult() {
    const matches = quiz.answersA.reduce((acc, answer, i) => acc + (answer === quiz.answersB[i] ? 1 : 0), 0);
    const score = Math.round((matches / QUIZ_QUESTIONS.length) * 100);
    const ring = $("#resultRing");
    if (ring) ring.style.setProperty("--p", String(score));
    setText("#resultScore", String(score));
    let title = "重新认识一下";
    let desc = "原来还有这么多小秘密等着被发现，今天又多懂彼此一点。";
    if (score === 100) {
      title = "灵魂同频";
      desc = "六道题全部命中。你们不是有默契，是心有灵犀。";
    } else if (score >= 80) {
      title = "心有灵犀";
      desc = "大部分答案都对上了，你们真的很懂彼此。";
    } else if (score >= 60) {
      title = "默契升温";
      desc = "已经抓到 TA 的很多小习惯了，再多相处一点会更好。";
    } else if (score >= 40) {
      title = "还在靠近";
      desc = "有些答案不一样也没关系，喜欢就是慢慢读懂对方。";
    } else if (score >= 20) {
      title = "互补型选手";
      desc = "你们很不一样，但刚好可以互相补全。";
    }
    setText("#resultTitle", title);
    setText("#resultDesc", desc);

    const list = $("#resultList");
    if (list) {
      list.innerHTML = QUIZ_QUESTIONS.map((q, i) => {
        const ok = quiz.answersA[i] === quiz.answersB[i];
        return `<div class="result-item ${ok ? "ok" : "no"}">
          <span class="res-mark">${ok ? "✓" : "×"}</span>
          <span>第 ${i + 1} 题 ${ok ? "猜对了" : "没猜中"}</span>
        </div>`;
      }).join("");
    }
  }

  /* ---------- wheel ---------- */
  const wheel = { rotation: 0, spinning: false, index: -1 };

  function currentWheelOptions() {
    return state.wheelOptions[state.activeWheel] || state.wheelOptions.food;
  }

  function renderWheelChrome() {
    const meta = WHEEL_META[state.activeWheel] || WHEEL_META.food;
    setText("#wheelTitle", meta.title);
    setText("#wheelDesc", meta.desc);
    setText("#wheelEditLabel", meta.label);
    $$("#wheelTabs [data-wheel]").forEach((btn) => {
      const active = btn.dataset.wheel === state.activeWheel;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    const legend = $("#wheelLegend");
    if (legend) {
      const options = currentWheelOptions();
      legend.innerHTML = options.map((option, i) => `<span><i style="background:${WHEEL_COLORS[i % WHEEL_COLORS.length]}"></i>${esc(option)}</span>`).join("");
    }
  }

  function drawWheel() {
    const canvas = $("#wheelCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const options = currentWheelOptions();
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 16;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(center, center);

    const segment = (Math.PI * 2) / options.length;
    options.forEach((option, i) => {
      const start = -Math.PI / 2 + i * segment;
      const end = start + segment;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.75)";
      ctx.lineWidth = 3;
      ctx.stroke();

      const mid = start + segment / 2;
      const textRadius = radius * 0.64;
      const color = WHEEL_COLORS[i % WHEEL_COLORS.length];
      const lightSegment = ["#ffd166", "#8fd6bd", "#f7c8a0", "#9cc9f2"].includes(color);
      ctx.save();
      ctx.translate(Math.cos(mid) * textRadius, Math.sin(mid) * textRadius);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = lightSegment ? "#3b2630" : "#fffaf7";
      ctx.font = `600 ${options.length > 7 ? 17 : 20}px 'PingFang SC', 'Microsoft YaHei', sans-serif`;
      const label = option.length > 9 ? `${option.slice(0, 9)}…` : option;
      ctx.shadowColor = lightSegment ? "rgba(255,255,255,0.3)" : "rgba(60,20,35,0.22)";
      ctx.shadowBlur = 4;
      ctx.fillText(label, 0, 1);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 8;
    ctx.stroke();

    for (let i = 0; i < 24; i += 1) {
      const angle = (Math.PI * 2 * i) / 24;
      const x = Math.cos(angle) * (radius - 13);
      const y = Math.sin(angle) * (radius - 13);
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.fill();
    }
    ctx.restore();
  }

  function spinWheel() {
    if (wheel.spinning) return;
    const options = currentWheelOptions();
    if (options.length < 2) {
      toast("至少要有两个选项才能转哦");
      return;
    }
    wheel.spinning = true;
    const spinBtn = $("#spinBtn");
    if (spinBtn) spinBtn.disabled = true;
    const index = Math.floor(Math.random() * options.length);
    const segment = 360 / options.length;
    const desired = (360 - (index + 0.5) * segment) % 360;
    const current = ((wheel.rotation % 360) + 360) % 360;
    const delta = (desired - current + 360) % 360;
    wheel.rotation += 360 * 6 + delta;
    const canvas = $("#wheelCanvas");
    if (canvas) canvas.style.transform = `rotate(${wheel.rotation}deg)`;
    wheel.index = index;

    window.setTimeout(() => {
      wheel.spinning = false;
      if (spinBtn) spinBtn.disabled = false;
      const meta = WHEEL_META[state.activeWheel];
      const winner = options[index];
      let sentence = `今天就决定是「${esc(winner)}」！`;
      if (state.activeWheel === "food") sentence = `今天就吃「${esc(winner)}」！`;
      if (state.activeWheel === "place") sentence = `今天就去「${esc(winner)}」！`;
      if (state.activeWheel === "chore") sentence = `今天的家务归「${esc(winner)}」！`;
      const result = $("#wheelResult");
      if (result) result.innerHTML = `<span class="tiny-label">THE WHEEL SAYS</span><p class="is-result">${sentence}</p>`;
      toast(`${meta.label}的结果已经出来啦`);
      burstConfetti(55);
    }, 4900);
  }

  /* ---------- canvas: hearts ---------- */
  const heartField = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    dpr: 1,
    particles: [],
    burst: [],
    raf: 0,
    visible: true,
    running: false
  };

  function initHeartCanvas() {
    const canvas = $("#heartCanvas");
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    heartField.canvas = canvas;
    heartField.ctx = canvas.getContext("2d");
    resizeHeartCanvas();
    const count = isMobile() ? 15 : 26;
    for (let i = 0; i < count; i += 1) heartField.particles.push(makeHeartParticle(true));
    const io = new IntersectionObserver((entries) => {
      heartField.visible = entries[0].isIntersecting;
      if (heartField.visible) startHeartLoop();
    }, { threshold: 0 });
    io.observe(canvas.parentElement);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && heartField.visible) startHeartLoop();
    });
    window.addEventListener("resize", resizeHeartCanvas);
    startHeartLoop();
  }

  function resizeHeartCanvas() {
    const canvas = heartField.canvas;
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    heartField.width = rect.width;
    heartField.height = rect.height;
    heartField.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * heartField.dpr));
    canvas.height = Math.max(1, Math.round(rect.height * heartField.dpr));
    heartField.ctx.setTransform(heartField.dpr, 0, 0, heartField.dpr, 0, 0);
  }

  function makeHeartParticle(initial = false) {
    return {
      x: Math.random() * heartField.width,
      y: initial ? Math.random() * heartField.height : heartField.height + 20,
      size: 4 + Math.random() * 9,
      speed: 0.18 + Math.random() * 0.45,
      sway: 0.25 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.08 + Math.random() * 0.2,
      hue: Math.random() > 0.55 ? "pink" : Math.random() > 0.5 ? "peach" : "lilac"
    };
  }

  function drawHeartShape(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size * 0.32);
    ctx.bezierCurveTo(x - size * 0.9, y - size * 0.35, x - size * 0.5, y - size * 0.95, x, y - size * 0.42);
    ctx.bezierCurveTo(x + size * 0.5, y - size * 0.95, x + size * 0.9, y - size * 0.35, x, y + size * 0.32);
    ctx.closePath();
    ctx.fill();
  }

  function startHeartLoop() {
    if (heartField.running || !heartField.ctx) return;
    heartField.running = true;
    const tick = () => {
      if (!heartField.visible || document.hidden) {
        heartField.running = false;
        return;
      }
      const ctx = heartField.ctx;
      const w = heartField.width;
      const h = heartField.height;
      ctx.clearRect(0, 0, w, h);
      heartField.particles.forEach((p) => {
        p.y -= p.speed;
        p.phase += 0.008;
        p.x += Math.sin(p.phase) * p.sway * 0.3;
        if (p.y < -30) Object.assign(p, makeHeartParticle(false));
        ctx.fillStyle = p.hue === "pink"
          ? `rgba(242, 85, 127, ${p.alpha})`
          : p.hue === "peach"
            ? `rgba(255, 150, 120, ${p.alpha})`
            : `rgba(185, 166, 242, ${p.alpha})`;
        drawHeartShape(ctx, p.x, p.y, p.size);
      });
      heartField.burst = heartField.burst.filter((p) => p.life > 0);
      heartField.burst.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.028;
        p.vx *= 0.992;
        p.life -= 0.012;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        drawHeartShape(ctx, p.x, p.y, p.size);
        ctx.globalAlpha = 1;
      });
      heartField.raf = requestAnimationFrame(tick);
    };
    heartField.raf = requestAnimationFrame(tick);
  }

  function burstHeartsFromButton() {
    const canvas = heartField.canvas;
    if (!canvas) {
      burstConfetti(60);
      return;
    }
    const rect = canvas.parentElement.getBoundingClientRect();
    const button = $("#heartBurstBtn");
    const bRect = button ? button.getBoundingClientRect() : null;
    const cx = bRect ? bRect.left - rect.left + bRect.width / 2 : rect.width * 0.8;
    const cy = bRect ? bRect.top - rect.top + bRect.height / 2 : rect.height * 0.7;
    const colors = ["#f2557f", "#ff9f7a", "#b9a6f2", "#ffd166"];
    for (let i = 0; i < 34; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4;
      heartField.burst.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 4 + Math.random() * 10,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    if (button) {
      button.classList.remove("is-bouncing");
      void button.offsetWidth;
      button.classList.add("is-bouncing");
    }
    clearTimeout(heartBurstTimer);
    heartBurstTimer = window.setTimeout(() => {
      if (button) button.classList.remove("is-bouncing");
    }, 600);
    startHeartLoop();
  }

  /* ---------- canvas: confetti ---------- */
  const fx = { canvas: null, ctx: null, width: 0, height: 0, dpr: 1, items: [], raf: 0, running: false };

  function initFxCanvas() {
    const canvas = $("#fxCanvas");
    if (!canvas) return;
    fx.canvas = canvas;
    fx.ctx = canvas.getContext("2d");
    resizeFx();
    window.addEventListener("resize", resizeFx);
  }

  function resizeFx() {
    if (!fx.canvas) return;
    fx.width = window.innerWidth;
    fx.height = window.innerHeight;
    fx.dpr = Math.min(window.devicePixelRatio || 1, 2);
    fx.canvas.width = Math.round(fx.width * fx.dpr);
    fx.canvas.height = Math.round(fx.height * fx.dpr);
    fx.ctx.setTransform(fx.dpr, 0, 0, fx.dpr, 0, 0);
  }

  function burstConfetti(count = 70) {
    if (!fx.ctx) initFxCanvas();
    if (!fx.ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#f2557f", "#ff9f7a", "#ffd166", "#8fd6bd", "#b9a6f2", "#ff9ec4", "#fff3e8"];
    const originX = fx.width / 2;
    const originY = Math.min(fx.height * 0.45, 420);
    for (let i = 0; i < count; i += 1) {
      const angle = (-Math.PI / 2) + (Math.random() - 0.5) * 1.9;
      const speed = 5 + Math.random() * 10;
      fx.items.push({
        x: originX + (Math.random() - 0.5) * 160,
        y: originY + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.18 + Math.random() * 0.12,
        drag: 0.992,
        size: 4 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.25,
        life: 1,
        decay: 0.006 + Math.random() * 0.008,
        shape: Math.random() > 0.35 ? "heart" : "rect"
      });
    }
    if (fx.items.length > 260) fx.items = fx.items.slice(-260);
    startFxLoop();
  }

  function startFxLoop() {
    if (fx.running) return;
    fx.running = true;
    const tick = () => {
      if (!fx.ctx) { fx.running = false; return; }
      fx.ctx.clearRect(0, 0, fx.width, fx.height);
      fx.items = fx.items.filter((p) => p.life > 0 && p.y < fx.height + 50);
      fx.items.forEach((p) => {
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= p.decay;
        fx.ctx.save();
        fx.ctx.translate(p.x, p.y);
        fx.ctx.rotate(p.rot);
        fx.ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));
        fx.ctx.fillStyle = p.color;
        if (p.shape === "heart") {
          drawHeartShape(fx.ctx, 0, 0, p.size);
        } else {
          fx.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        fx.ctx.restore();
      });
      if (fx.items.length) {
        fx.raf = requestAnimationFrame(tick);
      } else {
        fx.ctx.clearRect(0, 0, fx.width, fx.height);
        fx.running = false;
      }
    };
    fx.raf = requestAnimationFrame(tick);
  }

  /* ---------- music ---------- */
  function toggleMusic() {
    if (musicOn) {
      stopMusic();
      return;
    }
    if (!("AudioContext" in window || "webkitAudioContext" in window)) {
      toast("这个浏览器暂时不支持心动旋律");
      return;
    }
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctx();
      audioMaster = audioCtx.createGain();
      audioMaster.gain.value = 0.0001;
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1600;
      audioMaster.connect(filter).connect(audioCtx.destination);
      audioMaster.gain.exponentialRampToValueAtTime(0.07, audioCtx.currentTime + 1.2);
      const chords = [
        [261.63, 329.63, 392.00, 493.88],
        [220.00, 261.63, 329.63, 392.00],
        [174.61, 220.00, 261.63, 329.63],
        [196.00, 246.94, 293.66, 329.63]
      ];
      let chordIndex = 0;
      const play = () => {
        if (!audioCtx || audioCtx.state === "closed") return;
        const now = audioCtx.currentTime;
        const notes = chords[chordIndex % chords.length];
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = i === 0 ? "sine" : "triangle";
          osc.frequency.value = freq;
          const start = now + i * 0.14;
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.15 / (i + 1), start + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 2.7);
          osc.connect(gain).connect(audioMaster);
          osc.start(start);
          osc.stop(start + 2.9);
        });
        chordIndex += 1;
      };
      play();
      audioTimer = window.setInterval(play, 2600);
      musicOn = true;
      const btn = $("#musicBtn");
      if (btn) {
        btn.classList.add("is-playing");
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", "关闭心动旋律");
      }
      toast("心动旋律已开启，音量可以调小一点");
    } catch (err) {
      console.warn("Audio unavailable", err);
      stopMusic();
      toast("旋律没有播放出来，再试一次吧");
    }
  }

  function stopMusic() {
    window.clearInterval(audioTimer);
    audioTimer = 0;
    if (audioMaster && audioCtx) {
      try {
        audioMaster.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      } catch { /* ignore */ }
    }
    const ctx = audioCtx;
    window.setTimeout(() => {
      if (ctx && ctx.state !== "closed") ctx.close().catch(() => {});
    }, 500);
    audioCtx = null;
    audioMaster = null;
    musicOn = false;
    const btn = $("#musicBtn");
    if (btn) {
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "开启心动旋律");
    }
  }

  /* ---------- quote ---------- */
  let currentQuote = QUOTES[0];

  function showQuote(random = false) {
    currentQuote = random ? QUOTES[Math.floor(Math.random() * QUOTES.length)] : quoteOfDay();
    setText("#quoteText", currentQuote.text);
    setText("#quoteFrom", `— ${currentQuote.from}`);
    openModal("quoteModal");
  }

  /* ---------- locked identity ---------- */
  function persistSettings() {
    state.onboarded = true;
    saveState();
    renderAll();
    setTheme(state.theme);
    updateCountdown();
  }

  function completeWelcome() {
    persistSettings();
    closeModal("welcomeModal");
    toast("欢迎回家，张选宁 & 吕燕娇");
    burstConfetti(80);
  }

  async function exportBackup() {
    try {
      const photos = await dbAllPhotos().catch(() => []);
      const payload = {
        app: "our-little-universe",
        exportedAt: new Date().toISOString(),
        state,
        photos
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `our-little-universe-${dateKey()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast("备份文件已经下载好啦");
    } catch (err) {
      console.warn(err);
      toast("备份没有成功，稍后再试");
    }
  }

  function importBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        const incomingState = parsed.state || parsed;
        if (!incomingState || !Array.isArray(incomingState.names)) throw new Error("invalid");
        askConfirm("导入这份备份？", "当前小屋里的设置、心愿、留言会被这份备份覆盖。照片也会一起恢复。", async () => {
          state = normalizeState(incomingState);
          state.onboarded = true;
          saveState();
          if (Array.isArray(parsed.photos)) {
            try {
              await dbClearPhotos();
              for (const photo of parsed.photos) {
                if (photo && photo.id && typeof photo.data === "string") await dbPutPhoto(photo);
              }
            } catch (err) {
              console.warn("Could not restore photos", err);
            }
          }
          setTheme(state.theme);
          window.location.reload();
        }, "导入并覆盖");
      } catch (err) {
        console.warn(err);
        toast("这个文件好像不是小屋的备份");
      }
    };
    reader.onerror = () => toast("文件没有读出来，再试一次吧");
    reader.readAsText(file);
  }

  async function resetHouse() {
    askConfirm("清空整间小屋？", "心愿、心情、照片和信都会被删除，而且不能恢复。名字和开始日期是固定的，不会受影响；建议先导出备份。", async () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
        await dbClearPhotos().catch(() => {});
        if (indexedDB && indexedDB.deleteDatabase) indexedDB.deleteDatabase(DB_NAME);
      } catch (err) {
        console.warn(err);
      }
      window.location.href = window.location.href.split("?")[0].split("#")[0];
    }, "全部清空");
  }

  /* ---------- welcome ---------- */
  function openWelcome() {
    openModal("welcomeModal");
  }

  function cleanLockedUrl() {
    try {
      if (!window.location.search) return;
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.pathname + url.hash);
    } catch {
      // file:// or an old browser may not allow replaceState; the UI is still locked.
    }
  }

  /* ---------- navigation & scroll ---------- */
  function initScrollUi() {
    const topbar = $("#topbar");
    const progress = $("#scrollProgress");
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (topbar) topbar.classList.toggle("is-scrolled", y > 24);
      const night = document.getElementById("photos");
      if (night && topbar) {
        const rect = night.getBoundingClientRect();
        topbar.classList.toggle("on-dark", rect.top <= 68 && rect.bottom >= 130);
      }
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = `${height > 0 ? clamp((y / height) * 100, 0, 100) : 0}%`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();

    $$("[data-scroll]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.scroll;
        const el = target ? $(target) : null;
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    const navMap = new Map();
    $$(".desktop-nav a[data-nav]").forEach((a) => navMap.set(a.dataset.nav, a));
    $$(".mobile-dock a[data-dock]").forEach((a) => {
      if (!navMap.has(a.dataset.dock)) navMap.set(a.dataset.dock, a);
    });
    const sections = ["home", "time", "wishes", "mood", "photos", "letters", "quiz", "wheel"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        $$(".desktop-nav a, .mobile-dock a").forEach((a) => a.classList.remove("is-active"));
        $$(".desktop-nav a").forEach((a) => {
          if (a.dataset.nav === id) a.classList.add("is-active");
        });
        $$(".mobile-dock a").forEach((a) => {
          if (a.dataset.dock === id) a.classList.add("is-active");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach((section) => io.observe(section));

    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => closeSheet());
    });
  }

  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- mobile sheet ---------- */
  function openSheet() {
    const sheet = $("#mobileSheet");
    if (!sheet) return;
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
  }

  function closeSheet() {
    const sheet = $("#mobileSheet");
    if (!sheet) return;
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    if (!$$(".modal.is-open").length) document.body.classList.remove("is-locked");
  }

  /* ---------- init events ---------- */
  function initEvents() {
    // settings & share
    ["settingsBtn", "footerSettingsBtn", "sheetSettingsBtn"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", () => {
        closeSheet();
        renderSettingsFields();
        openModal("settingsModal");
      });
    });
    ["shareBtn", "footerShareBtn", "copyLinkBtn"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", shareHouse);
    });

    const settingsForm = $("#settingsForm");
    if (settingsForm) {
      settingsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        persistSettings();
        closeModal("settingsModal");
        toast("小屋设置已保存");
      });
    }

    $$("#themeOptions [data-theme-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTheme(btn.dataset.themeChoice);
        saveState();
        toast("主题换好啦");
      });
    });

    const exportBtn = $("#exportBtn");
    if (exportBtn) exportBtn.addEventListener("click", exportBackup);
    const importBtn = $("#importBtn");
    const importInput = $("#importInput");
    if (importBtn && importInput) {
      importBtn.addEventListener("click", () => importInput.click());
      importInput.addEventListener("change", () => {
        importBackup(importInput.files && importInput.files[0]);
        importInput.value = "";
      });
    }
    const resetBtn = $("#resetBtn");
    if (resetBtn) resetBtn.addEventListener("click", resetHouse);

    // welcome
    const welcomeForm = $("#welcomeForm");
    if (welcomeForm) {
      welcomeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        completeWelcome();
      });
    }

    // generic modal close
    document.addEventListener("click", (event) => {
      const close = event.target.closest("[data-close-modal]");
      if (close) {
        const modal = close.closest(".modal");
        if (modal) closeModal(modal.id);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const modal = $(".modal.is-open");
        if (modal) closeModal(modal.id);
        else closeSheet();
      }
      if (event.key === "Tab") {
        const modal = $(".modal.is-open");
        if (!modal) return;
        const focusables = $$('button:not([disabled]), [href], input:not([type="hidden"]), textarea, select', modal)
          .filter((el) => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    // confirm
    const confirmOk = $("#confirmOk");
    if (confirmOk) {
      confirmOk.addEventListener("click", () => {
        const callback = confirmCallback;
        confirmCallback = null;
        closeModal("confirmModal");
        if (callback) callback();
      });
    }
    const confirmCancel = $("#confirmCancel");
    if (confirmCancel) confirmCancel.addEventListener("click", () => {
      confirmCallback = null;
      closeModal("confirmModal");
    });

    // anniversary
    ["addAnniversaryBtn", "addAnniversaryBtn2"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", () => openAnniversaryModal());
    });
    const annForm = $("#anniversaryForm");
    if (annForm) {
      annForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = $("#anniversaryName")?.value.trim();
        const date = $("#anniversaryDate")?.value;
        const yearly = $("#anniversaryYearly")?.checked;
        if (!title) { toast("给这一天取个名字吧"); return; }
        if (!parseDate(date)) { toast("日期好像不太对"); return; }
        if (editingAnniversaryId) {
          const item = state.anniversaries.find((a) => a.id === editingAnniversaryId);
          if (item) {
            item.title = title.slice(0, 30);
            item.date = date;
            item.yearly = Boolean(yearly);
            item.icon = selectedAnniversaryIcon;
          }
        } else {
          state.anniversaries.push({
            id: uid(),
            title: title.slice(0, 30),
            date,
            yearly: Boolean(yearly),
            icon: selectedAnniversaryIcon
          });
        }
        saveState();
        closeModal("anniversaryModal");
        renderAnniversaries();
        updateCountdown();
        toast(editingAnniversaryId ? "纪念日已经更新" : "新的纪念日已经记下");
        editingAnniversaryId = null;
        burstConfetti(35);
      });
    }
    const iconPicker = $("#iconPicker");
    if (iconPicker) {
      iconPicker.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-icon]");
        if (!btn) return;
        selectedAnniversaryIcon = btn.dataset.icon;
        $$("#iconPicker [data-icon]").forEach((b) => b.classList.toggle("is-active", b === btn));
      });
    }
    const annList = $("#anniversaryList");
    if (annList) {
      annList.addEventListener("click", (event) => {
        const edit = event.target.closest("[data-edit-anniversary]");
        if (edit) {
          openAnniversaryModal(edit.dataset.editAnniversary);
          return;
        }
        const del = event.target.closest("[data-delete-anniversary]");
        if (del) {
          const item = state.anniversaries.find((a) => a.id === del.dataset.deleteAnniversary);
          if (!item) return;
          askConfirm("删除这个纪念日？", `“${item.title}”会从小屋里消失。`, () => {
            state.anniversaries = state.anniversaries.filter((a) => a.id !== item.id);
            saveState();
            renderAnniversaries();
            updateCountdown();
            renderMilestones();
            toast("纪念日已删除");
          }, "删除");
        }
      });
    }

    // wishes
    const wishForm = $("#wishForm");
    if (wishForm) {
      wishForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = $("#wishInput");
        const text = input ? input.value.trim() : "";
        if (!text) {
          toast("先写下一个愿望吧");
          input?.focus();
          return;
        }
        state.wishes.push({
          id: uid(),
          text: text.slice(0, 80),
          category: $("#wishCategory")?.value || "日常",
          done: false,
          createdAt: Date.now()
        });
        saveState();
        if (input) input.value = "";
        wishFilter = "all";
        $$("#wishFilters button").forEach((b) => b.classList.toggle("is-active", b.dataset.filter === "all"));
        renderWishes();
        renderBadges();
        renderStats();
        toast("愿望已经放进清单里啦");
        input?.focus();
      });
    }
    const filters = $("#wishFilters");
    if (filters) {
      filters.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-filter]");
        if (!btn) return;
        wishFilter = btn.dataset.filter;
        $$("#wishFilters button").forEach((b) => b.classList.toggle("is-active", b === btn));
        renderWishes();
      });
    }
    const wishList = $("#wishList");
    if (wishList) {
      wishList.addEventListener("click", (event) => {
        const toggle = event.target.closest("[data-toggle-wish]");
        if (toggle) {
          const wish = state.wishes.find((w) => w.id === toggle.dataset.toggleWish);
          if (!wish) return;
          wish.done = !wish.done;
          saveState();
          renderWishes();
          renderBadges();
          renderStats();
          if (wish.done && state.wishes.every((w) => w.done)) {
            toast("所有愿望都实现啦，真了不起");
            burstConfetti(100);
          }
          return;
        }
        const del = event.target.closest("[data-delete-wish]");
        if (del) {
          const wish = state.wishes.find((w) => w.id === del.dataset.deleteWish);
          if (!wish) return;
          askConfirm("删除这个愿望？", `“${wish.text}”会从清单里移除。`, () => {
            state.wishes = state.wishes.filter((w) => w.id !== wish.id);
            saveState();
            renderWishes();
            renderBadges();
            renderStats();
            toast("愿望已移除");
          }, "删除");
        }
      });
    }

    // mood
    $$(".mood-options").forEach((wrap) => {
      wrap.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-mood]");
        if (!btn) return;
        const person = btn.dataset.person;
        const mood = MOODS.find((m) => m.emoji === btn.dataset.mood);
        if (!mood) return;
        const key = dateKey();
        if (!state.moods[key]) state.moods[key] = {};
        const existing = state.moods[key][person];
        const noteEl = document.querySelector(`#moodNote${person.toUpperCase()}`);
        const draftNote = noteEl ? noteEl.value.trim().slice(0, 120) : "";
        state.moods[key][person] = {
          emoji: mood.emoji,
          label: mood.label,
          tone: mood.tone,
          note: draftNote || existing?.note || ""
        };
        saveState();
        renderMood();
        renderStats();
        toast("今天的心情已经记下");
      });
    });
    $$("[data-save-mood]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const person = btn.dataset.saveMood;
        const key = dateKey();
        const mood = getTodayMood(person);
        if (!mood) {
          toast("先选一个最像今天的心情吧");
          return;
        }
        const noteEl = document.querySelector(`#moodNote${person.toUpperCase()}`);
        mood.note = noteEl ? noteEl.value.trim().slice(0, 120) : "";
        saveState();
        renderMood();
        toast("心情和悄悄话都保存好啦");
      });
    });

    // photos
    const uploadBtn = $("#uploadPhotoBtn");
    const photoInput = $("#photoInput");
    if (uploadBtn && photoInput) {
      uploadBtn.addEventListener("click", () => photoInput.click());
      photoInput.addEventListener("change", () => {
        handlePhotoFiles(photoInput.files);
        photoInput.value = "";
      });
    }
    const wall = $("#photoWall");
    if (wall) {
      wall.addEventListener("click", (event) => {
        if (event.target.closest("[data-add-photo]")) {
          photoInput?.click();
          return;
        }
        if (event.target.closest(".photo-caption")) return;
        const card = event.target.closest("[data-photo-id]");
        if (card) openLightbox(card.dataset.photoId);
      });
      wall.addEventListener("blur", (event) => {
        const cap = event.target.closest?.("[data-caption-id]");
        if (cap) saveCaption(cap.dataset.captionId, cap.textContent);
      }, true);
      wall.addEventListener("keydown", (event) => {
        if (event.target.matches("[data-caption-id]") && event.key === "Enter") {
          event.preventDefault();
          event.target.blur();
        }
      });
    }
    const prev = $("#lightboxPrev");
    const next = $("#lightboxNext");
    if (prev) prev.addEventListener("click", () => moveLightbox(-1));
    if (next) next.addEventListener("click", () => moveLightbox(1));
    const lightboxDelete = $("#lightboxDelete");
    if (lightboxDelete) {
      lightboxDelete.addEventListener("click", () => {
        const photo = photosCache[lightboxIndex];
        if (!photo) return;
        askConfirm("删除这张照片？", "照片会从这台设备的胶卷里移除。", async () => {
          try {
            await dbDeletePhoto(photo.id);
            photosCache = photosCache.filter((p) => p.id !== photo.id);
            closeModal("lightboxModal");
            renderPhotoWall();
            renderBadges();
            toast("照片已删除");
          } catch (err) {
            console.warn(err);
            toast("照片删除失败，再试一次");
          }
        }, "删除");
      });
    }

    // letters
    const letterForm = $("#letterForm");
    if (letterForm) {
      letterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = $("#letterText")?.value.trim();
        if (!text) {
          toast("信里还没有写字呢");
          $("#letterText")?.focus();
          return;
        }
        const openAt = $("#letterOpenAt")?.value || null;
        const note = {
          id: uid(),
          author: $("#letterAuthor")?.value || "a",
          text: text.slice(0, 500),
          createdAt: Date.now(),
          openAt: openAt && parseDate(openAt) ? openAt : null
        };
        state.notes.unshift(note);
        saveState();
        const textarea = $("#letterText");
        if (textarea) textarea.value = "";
        const openDate = $("#letterOpenAt");
        if (openDate) openDate.value = "";
        renderLetters();
        renderBadges();
        renderStats();
        toast(note.openAt && isLetterLocked(note) ? "信已经封存，等那一天再打开" : "信已经投进信箱啦");
        burstConfetti(40);
      });
    }
    const letterList = $("#letterList");
    if (letterList) {
      letterList.addEventListener("click", (event) => {
        const card = event.target.closest("[data-letter-id]");
        if (card) openLetter(card.dataset.letterId);
      });
    }
    const randomBtn = $("#randomLetterBtn");
    if (randomBtn) randomBtn.addEventListener("click", randomLetter);
    const futureBtn = $("#futureLetterBtn");
    if (futureBtn) {
      futureBtn.addEventListener("click", () => {
        const openDate = $("#letterOpenAt");
        if (openDate) {
          const nextYear = new Date();
          nextYear.setFullYear(nextYear.getFullYear() + 1);
          openDate.value = dateKey(nextYear);
        }
        const textarea = $("#letterText");
        if (textarea) {
          textarea.focus();
          textarea.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        toast("已经替你把开启日期设成一年后的今天");
      });
    }
    const deleteLetter = $("#deleteLetterBtn");
    if (deleteLetter) {
      deleteLetter.addEventListener("click", () => {
        const note = state.notes.find((n) => n.id === currentLetterId);
        if (!note) return;
        askConfirm("删除这封信？", "这封信会从信箱里永远消失。", () => {
          state.notes = state.notes.filter((n) => n.id !== note.id);
          saveState();
          closeModal("letterModal");
          renderLetters();
          renderBadges();
          renderStats();
          toast("信已删除");
        }, "删除");
      });
    }

    // quiz
    const quizStartBtn = $("#quizStartBtn");
    if (quizStartBtn) quizStartBtn.addEventListener("click", () => quizStart("a"));
    const quizHandoffBtn = $("#quizHandoffBtn");
    if (quizHandoffBtn) quizHandoffBtn.addEventListener("click", () => {
      quiz.phase = "b";
      quiz.index = 0;
      quiz.answersB = [];
      renderQuiz();
    });
    const quizRestartBtn = $("#quizRestartBtn");
    if (quizRestartBtn) quizRestartBtn.addEventListener("click", () => quizStart(quiz.initiator));
    const quizSwapBtn = $("#quizSwapBtn");
    if (quizSwapBtn) quizSwapBtn.addEventListener("click", () => quizStart(quiz.initiator === "a" ? "b" : "a"));
    const quizOptions = $("#quizOptions");
    if (quizOptions) {
      quizOptions.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-quiz-option]");
        if (btn) chooseQuizOption(Number(btn.dataset.quizOption));
      });
    }

    // wheel
    const tabs = $("#wheelTabs");
    if (tabs) {
      tabs.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-wheel]");
        if (!btn || wheel.spinning) return;
        state.activeWheel = btn.dataset.wheel;
        saveState();
        wheel.rotation = 0;
        const canvas = $("#wheelCanvas");
        if (canvas) {
          canvas.style.transition = "none";
          canvas.style.transform = "rotate(0deg)";
          requestAnimationFrame(() => {
            canvas.style.transition = "";
          });
        }
        const result = $("#wheelResult");
        if (result) result.innerHTML = `<span class="tiny-label">THE WHEEL SAYS</span><p>转一下，让选择自己出现。</p>`;
        renderWheelChrome();
        drawWheel();
      });
    }
    const spinBtn = $("#spinBtn");
    if (spinBtn) spinBtn.addEventListener("click", spinWheel);
    const editWheelBtn = $("#editWheelBtn");
    if (editWheelBtn) {
      editWheelBtn.addEventListener("click", () => {
        const area = $("#wheelOptionsInput");
        if (area) area.value = currentWheelOptions().join("\n");
        setText("#wheelModalTitle", `编辑「${WHEEL_META[state.activeWheel].label}」选项`);
        openModal("wheelModal");
      });
    }
    const saveWheelBtn = $("#saveWheelBtn");
    if (saveWheelBtn) {
      saveWheelBtn.addEventListener("click", () => {
        const area = $("#wheelOptionsInput");
        const list = (area?.value || "").split(/\n+/).map((s) => s.trim()).filter(Boolean).slice(0, 10);
        if (list.length < 2) {
          toast("至少写两个选项，转盘才转得起来");
          return;
        }
        state.wheelOptions[state.activeWheel] = list;
        saveState();
        closeModal("wheelModal");
        drawWheel();
        renderWheelChrome();
        toast("转盘选项已经更新");
      });
    }

    // quote
    const quoteBtn = $("#quoteBtn");
    if (quoteBtn) quoteBtn.addEventListener("click", () => showQuote(false));
    const anotherQuote = $("#anotherQuoteBtn");
    if (anotherQuote) anotherQuote.addEventListener("click", () => showQuote(true));
    const copyQuote = $("#copyQuoteBtn");
    if (copyQuote) copyQuote.addEventListener("click", () => copyText(currentQuote.text, "情话已复制"));

    // music, heart, sheet
    const musicBtn = $("#musicBtn");
    if (musicBtn) musicBtn.addEventListener("click", toggleMusic);
    const heartBtn = $("#heartBurstBtn");
    if (heartBtn) heartBtn.addEventListener("click", burstHeartsFromButton);
    const dockMenu = $("#dockMenuBtn");
    if (dockMenu) dockMenu.addEventListener("click", openSheet);
    $$("[data-close-sheet]").forEach((el) => el.addEventListener("click", closeSheet));
    document.addEventListener("click", (event) => {
      if (event.target.closest(".mobile-sheet .sheet-grid a")) closeSheet();
    });

    // keyboard shortcut for quote
    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "q" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target;
        if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
        if ($(".modal.is-open")) return;
        showQuote(true);
      }
    });
  }

  function openAnniversaryModal(id) {
    const form = $("#anniversaryForm");
    if (!form) return;
    editingAnniversaryId = id || null;
    const item = id ? state.anniversaries.find((a) => a.id === id) : null;
    setText("#anniversaryTitle", item ? "编辑这个纪念日" : "记录一个新的纪念日");
    const name = $("#anniversaryName");
    const date = $("#anniversaryDate");
    const yearly = $("#anniversaryYearly");
    if (name) name.value = item ? item.title : "";
    if (date) date.value = item ? item.date : dateKey();
    if (yearly) yearly.checked = item ? item.yearly : true;
    selectedAnniversaryIcon = item ? item.icon : "heart";
    $$("#iconPicker [data-icon]").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.icon === selectedAnniversaryIcon));
    openModal("anniversaryModal");
  }

  /* ---------- timers ---------- */
  function startTimers() {
    const clock = () => {
      const now = new Date();
      const el = $("#liveClock");
      if (el) {
        el.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
        el.setAttribute("datetime", now.toISOString());
      }
      updateCountdown();
      const key = dateKey(now);
      if (key !== lastTodayKey) {
        lastTodayKey = key;
        renderIdentity();
        renderStats();
        renderMood();
        renderWeekMood();
        renderAnniversaries();
        renderMilestones();
        updateHeroNote();
        updateDocumentTitle();
      }
    };
    clock();
    window.setInterval(clock, 1000);
  }

  /* ---------- init ---------- */
  function init() {
    cleanLockedUrl();
    setTheme(state.theme);
    renderAll();
    initEvents();
    initScrollUi();
    initReveal();
    initPhotos();
    initFxCanvas();
    initHeartCanvas();
    drawWheel();
    renderWheelChrome();
    renderQuiz();
    startTimers();

    if (!state.onboarded) {
      window.setTimeout(openWelcome, 650);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
