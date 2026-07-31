/* ================= BOOT SEQUENCE ================= */
(function boot(){
  const bootEl = document.getElementById('boot');
  const bar = document.getElementById('bootBar');
  const pct = document.getElementById('bootPct');
  const skip = document.getElementById('bootSkip');
  const lines = bootEl.querySelectorAll('.line');

  lines.forEach(l=>{
    const t = parseInt(l.dataset.t||'0',10);
    setTimeout(()=>l.classList.add('show'), t);
  });

  let p = 0;
  const iv = setInterval(()=>{
    p += Math.random()*14 + 4;
    if(p>=100){p=100;clearInterval(iv);}
    bar.style.width = p+'%';
    pct.textContent = Math.floor(p)+'%';
    if(p>=100) setTimeout(finish, 350);
  }, 220);

  function finish(){
    bootEl.classList.add('hide');
    document.body.style.overflow='';
    document.getElementById('nav').classList.add('show');
  }
  skip.addEventListener('click', ()=>{ clearInterval(iv); finish(); });
  document.body.style.overflow='hidden';
  setTimeout(()=>{document.body.style.overflow='';}, 6000);
})();

/* ================= GENERAL SCROLL REVEAL ================= */
const revealIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealIO.unobserve(e.target);} });
},{threshold:0.15});
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.reveal').forEach(el=>revealIO.observe(el));
});

/* ================= HERO TITLE + NAV ================= */
window.addEventListener('load', ()=>{
  document.querySelectorAll('.hero-title span').forEach((s,i)=>{
    setTimeout(()=>{ s.style.transition='transform 1s cubic-bezier(.22,1,.36,1)'; s.style.transform='translateY(0)'; }, 300 + i*140);
  });
});
window.addEventListener('scroll', ()=>{
  const nav = document.getElementById('nav');
  if(window.scrollY > 40) nav.classList.add('show');
});

/* ================= PORTRAIT PARALLAX ================= */
const pCard = document.getElementById('portraitCard');
if(pCard){
  window.addEventListener('mousemove', (e)=>{
    const rx = (e.clientX/window.innerWidth - 0.5) * 14;
    const ry = (e.clientY/window.innerHeight - 0.5) * -14;
    pCard.style.transform = `rotateY(${rx}deg) rotateX(${ry}deg)`;
  });
}

/* ================= PHILOSOPHY WORD REVEAL ================= */
(function philosophy(){
  const el = document.getElementById('philQuote');
  const words = el.textContent.trim().split(' ');
  el.innerHTML = words.map(w=>`<span class="word">${w}</span>`).join(' ');
  const spans = el.querySelectorAll('.word');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        spans.forEach((s,i)=> setTimeout(()=>s.classList.add('lit'), i*45));
        io.unobserve(el);
      }
    });
  },{threshold:0.3});
  io.observe(el);
})();

/* ================= NARRATION TOGGLE ================= */
(function sound(){

  const btn = document.getElementById("soundToggle");
  const audio = document.getElementById("narration");

  // FIX: if either element is missing (e.g. <audio> tag is commented out
  // in the HTML), stop here instead of throwing — otherwise every line
  // below this function in the file never runs.
  if (!btn || !audio) {
    console.warn("Narration controls not found — skipping sound setup.");
    return;
  }

  let playing = false;

  btn.addEventListener("click", () => {

    if (!playing) {
      audio.play().catch(()=>{});
      playing = true;
      btn.classList.add("playing");
    } else {
      audio.pause();
      playing = false;
      btn.classList.remove("playing");
    }

  });

  audio.addEventListener("ended", () => {
    playing = false;
    btn.classList.remove("playing");
  });

})();
/* ================= RESUME BUTTON ================= */
const resumeBtn = document.getElementById("resumeBtn");

if (resumeBtn) {

    resumeBtn.addEventListener("click",(e)=>{
        e.preventDefault();

        alert("Add your resume PDF...");
    });

}
/* ================= THINKING PROCESS DATA ================= */
const THINKING = [
  ['Observation','Watching how people actually behave, not how they say they behave.'],
  ['Thinking / Reverse Thinking','Starting from the outcome and working backward to what has to be true.'],
  ['Imagination','Generating more directions than feels comfortable, on purpose.'],
  ['Research','Understanding the problem space before touching a solution.'],
  ['Action','Building the thinnest version that can be genuinely used.']
];
const track = document.getElementById('thinkTrack');
THINKING.forEach((t,i)=>{
  const card = document.createElement('div');
  card.className='think-card';
  card.innerHTML = `<span class="idx mono">${String(i+1).padStart(2,'0')}</span><h4>${t[0]}</h4><p>${t[1]}</p>`;
  track.appendChild(card);
  if(i < THINKING.length-1){
    const arrow = document.createElement('div');
    arrow.className='think-arrow';
    arrow.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
    track.appendChild(arrow);
  }
});

/* ================= WHAT DRIVES ME DATA ================= */
const DRIVES = [
  ['Startup Building','Turning an observation into something people rely on — repeatedly, not once.'],
  ['AI','Systems that get better with data instead of just following rules.'],
  ['Entrepreneurship','Betting my own time on a problem before anyone tells me it\'s worth solving.'],
  ['Engineering','The discipline of making something work under real conditions, not demo conditions.'],
  ['Design','Reducing a system until only the necessary parts are left, and they’re clear.'],
  ['Problem Solving','The specific relief of a hard problem finally clicking into place.'],
  ['Leadership','Making it easier for the people around a problem to do their best work on it.'],
  ['Learning','Treating not-knowing as a temporary, fixable state — never a fixed one.'],
];
const driveGrid = document.getElementById('driveGrid');
DRIVES.forEach((d,i)=>{
  const card = document.createElement('div');
  card.className='drive-card';
  card.innerHTML = `<span class="num mono">${String(i+1).padStart(2,'0')}</span><h4>${d[0]}</h4><p>${d[1]}</p>`;
  card.addEventListener('click', ()=>card.classList.toggle('open'));
  driveGrid.appendChild(card);
});

/* ================= SANRATHI SHOWCASE DATA ================= */
const SANRATHI_ACCORDION = [
  ['Problem', 'Every classroom teaches one lesson to hundreds of students, yet every student learns differently. Teachers have no way to understand comprehension in real time, which forces education to optimize for the average instead of the individual. Sanrathi exists to close that gap.'],
  ['Solution', 'Sanrathi creates a real-time learning model for every student. Instead of just recording lectures or generating notes, it continuously understands comprehension, identifies gaps, adapts explanations, personalizes practice, and helps teachers intervene before students fall behind.'],
  ['Vision', 'We believe every student deserves a learning experience built around how they understand—not around how a classroom is scheduled. Our vision is to become the intelligence layer for modern education.'],
  ['Why Now', 'Large language models, multimodal AI and edge computing have made real-time classroom intelligence possible for the first time. At the same time, millions of learners still depend on one-size-fits-all teaching even as expectations rise. The opportunity is clear.'],
  ['Market Opportunity', 'We are starting with coaching institutes and higher education, where better learning outcomes are visible and measurable. The broader opportunity is larger: every classroom, every educator, and every learner.']
];

const SANRATHI_FLOW1 = [
  'Teacher', 'Voice', 'Video', 'Slides', 'Knowledge Graph', 'Personalized Learning', 'Practice', 'Progress Analytics'
];

const SANRATHI_FLOW2 = [
  ['Capture', 'Voice, slides, whiteboards and classroom interactions.'],
  ['Understand', 'Identify concepts, misconceptions and comprehension.'],
  ['Model', 'Continuously update each student\'s learning profile.'],
  ['Personalize', 'Adapt explanations, notes and practice automatically.'],
  ['Measure', 'Track conceptual understanding instead of attendance.'],
  ['Improve', 'Give teachers clear classroom intelligence.']
];

(function renderSanrathi() {
  const accContainer = document.getElementById('sanrathiAccordion');
  if(accContainer) {
    SANRATHI_ACCORDION.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'sanrathi-acc-card reveal';
      card.innerHTML = `
        <h4>${item[0]}</h4>
        <div class="sanrathi-acc-content">${item[1]}</div>
        <div class="sanrathi-acc-toggle">Read More</div>
      `;
      card.addEventListener('click', () => {
        card.classList.toggle('open');
        const toggle = card.querySelector('.sanrathi-acc-toggle');
        toggle.textContent = card.classList.contains('open') ? 'Read Less' : 'Read More';
      });
      accContainer.appendChild(card);
      if(typeof revealIO !== 'undefined') revealIO.observe(card);
    });
  }

  const flow1Container = document.getElementById('sanrathiFlow1');
  if(flow1Container) {
    SANRATHI_FLOW1.forEach((pill, i) => {
      const pillEl = document.createElement('div');
      pillEl.className = 's-pill reveal';
      pillEl.textContent = pill;
      flow1Container.appendChild(pillEl);
      if(typeof revealIO !== 'undefined') revealIO.observe(pillEl);

      if (i < SANRATHI_FLOW1.length - 1) {
        const arrowEl = document.createElement('div');
        arrowEl.className = 's-arrow reveal';
        arrowEl.textContent = '→';
        flow1Container.appendChild(arrowEl);
        if(typeof revealIO !== 'undefined') revealIO.observe(arrowEl);
      }
    });
  }

  const flow2Container = document.getElementById('sanrathiFlow2');
  if(flow2Container) {
    SANRATHI_FLOW2.forEach((step, i) => {
      const stepEl = document.createElement('div');
      stepEl.className = 's-step reveal';
      stepEl.innerHTML = `
        <div class="s-step-num">Step 0${i+1} — ${step[0]}</div>
        <div class="s-step-desc">${step[1]}</div>
      `;
      flow2Container.appendChild(stepEl);
      if(typeof revealIO !== 'undefined') revealIO.observe(stepEl);
    });
  }
})();

const UPCOMING = [
  {
    name:'NutriSnap', status:'Upcoming', link:'https://github.com/mithilesh939/Ai-food-Recogniser',
    vision:'An AI-powered nutrition companion that understands not just what you eat, but how much, when, why, and how it impacts your health.',
    problem:'Most calorie-tracking apps require users to manually log meals, which makes long-term adherence difficult — and even when people do log, the apps estimate nutrition without offering contextual health insight.',
    solution:'NutriSnap combines computer vision and multimodal AI to automatically analyze meals from images, estimate portion sizes, calculate nutritional values, and generate personalized health insights — removing the logging friction entirely.',
    features:['AI food recognition','Portion & weight estimation','Nutritional analysis','Protein / carb / fat tracking','Weekly & monthly health reports','Body transformation visualization','Personalized meal recommendations','Disease-specific nutrition guidance','Recipe generation','Voice-first, multilingual','Offline AI for privacy'],
  },
  {
    name:'LexAI', status:'Idea Stage',
    vision:'Make legal knowledge accessible, understandable, and actionable for everyone through AI — positioned as a legal intelligence platform, not a replacement for courts or lawyers.',
    problem:'Millions of people struggle to understand their legal rights because laws are complex, legal language is dense, and affordable legal guidance is limited. Most legal questions don\'t start with "I need a lawyer" — they start with "what are my rights?"',
    solution:'An AI-powered legal intelligence platform that helps citizens, students, and legal professionals understand laws, analyze legal situations, research precedents, and prepare for legal processes — always pointing toward qualified professionals for final decisions, never replacing them.',
    features:['Natural-language legal assistant','Case intelligence & summarization','Semantic precedent search','AI moot court for law students','Rights explorer','Step-by-step legal workflow guide','Multilingual support','Evidence organizer','Lawyer productivity tools'],
    long:[
      ['AI architecture','A RAG pipeline grounded in the Constitution, bare acts, case law, court judgments, and government notifications — so the assistant reasons from real legal source material, not from memory alone.'],
      ['Responsible framing','No claims of predicting judgments or replacing judges. The platform analyzes publicly available case law, identifies similar precedents, and helps people prepare — final decisions stay with courts and qualified professionals.'],
    ],
  },
  {
    name:'AI Workspace', status:'Idea Stage',
    vision:'A workspace where people build and manage multiple specialized AI agents instead of relying on a single general-purpose assistant — heading toward an AI operating system where personal agents collaborate automatically.',
    problem:'People repeatedly give the same instructions to AI for different tasks, which leads to repetitive workflows and inconsistent outputs.',
    solution:'Users build lightweight agents, each responsible for one specific job — a Resume Agent, a Research Agent, a Coding Agent — that remember their role, follow predefined workflows, ask clarifying questions, and produce structured output. Instead of opening a chat every time, you drag the agent you need into your workflow.',
    features:['Resume Agent','Research Agent','Coding Agent','Finance Agent','Meeting Agent','Email Agent','Startup Advisor Agent','Legal Assistant Agent'],
  },
];

function renderVentureList(listData, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  listData.forEach(v=>{
    const el = document.createElement('div');
    el.className='venture reveal';
    let longHtml = '';
    if(v.long){
      longHtml = '<div class="venture-long">' + v.long.map(l=>`<h5>${l[0]}</h5><p>${l[1]}</p>`).join('') + '</div>';
    }

    let headContent = `<div class="venture-name">${v.name}</div>`;
    if(v.link) {
      headContent = `<a href="${v.link}" target="_blank" class="venture-name" style="text-decoration:underline; text-decoration-color:var(--neon);">${v.name} <span style="font-size:18px">↗</span></a>`;
    }

    el.innerHTML = `
      <div class="venture-head">
        ${headContent}
        <div class="venture-status mono">${v.status}</div>
      </div>
      <p class="venture-vision">${v.vision}</p>
      <div class="venture-cols">
        <div class="venture-col">
          <div class="lbl">Problem</div>
          <div class="text-content collapsed">
            <p>${v.problem}</p>
          </div>
          <button class="read-more mono">Read more</button>
        </div>
        <div class="venture-col">
          <div class="lbl">Solution</div>
          <div class="text-content collapsed">
            <p>${v.solution}</p>
          </div>
          <button class="read-more mono">Read more</button>
        </div>
      </div>
      <div class="venture-col" style="margin-top:20px;"><div class="lbl">Core Features</div>
        <div class="feature-grid">${v.features.map(f=>`<div class="feature-chip">${f}</div>`).join('')}</div>
      </div>
      ${longHtml}
    `;

    const readMoreBtns = el.querySelectorAll('.read-more');
    readMoreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const textContent = e.target.previousElementSibling;
        if (textContent.classList.contains('collapsed')) {
          textContent.classList.remove('collapsed');
          e.target.innerText = 'Read less';
        } else {
          textContent.classList.add('collapsed');
          e.target.innerText = 'Read more';
        }
      });
    });

    container.appendChild(el);
    if(typeof revealIO !== 'undefined') revealIO.observe(el);
  });
}

renderVentureList(UPCOMING, 'upcomingList');

/* ================= ENGINEERING PROJECTS DATA ================= */
const ENGINEERING = [
  ['Quant / AI', 'Low-Latency Market Decoder','A system for turning raw, fast-moving market data into a decoded, human-readable signal with minimal lag.',['Streaming data','Low-latency'], 'https://github.com/mithilesh939/market-decoder'],
  ['Systems','Vamana ANN','An implementation exploring the Vamana graph-based approximate nearest-neighbor algorithm — the backbone of large-scale vector search.',['ANN search','Graph algorithms'], 'https://github.com/mithilesh939/Vamana-GraphANN'],
  ['Data / ML','Movie Analytics','An exploratory analytics project turning a raw movie dataset into insight — ratings, trends, and audience behavior.',['Data analysis','Visualization']],
  ['Data / ML','FIFA Dashboard','An interactive dashboard for exploring FIFA player and team data — built to practice turning a dataset into a genuinely usable interface.',['Dashboard','Data viz']],
];
const engGrid = document.getElementById('engGrid');
ENGINEERING.forEach(p=>{
  const el = document.createElement(p[4] ? 'a' : 'div');
  if(p[4]) { el.href = p[4]; el.target = "_blank"; el.style.display = "block"; el.style.textDecoration = "none"; el.style.color = "inherit"; }
  el.className='eng-card reveal';
  el.innerHTML = `<span class="tag2">${p[0]}</span><h4>${p[1]} ${p[4] ? '<span style="color:var(--neon);font-size:14px">↗</span>' : ''}</h4><p>${p[2]}</p><div class="stack">${p[3].map(s=>`<span>${s}</span>`).join('')}</div>`;
  engGrid.appendChild(el);
  revealIO.observe(el);
});

/* ================= CUSTOMER FEEDBACK (real reviewer data) ================= */
const TESTIMONIALS = [
  {
    name:'R. Raghuttama Rao', title:'CEO, GDC', stars:5,
    quote:'"A strong foundation with genuine founder intuition for solving a meaningful problem."',
    photo:'assets/r-raghuttama-rao.png', poster:'assets/r-raghuttama-rao-feedback.jpeg',
    link:'https://gdciitm.org/teams/r-raghuttama-rao/'
  },
  {
    name:'K. K. Raman', title:'Retired, Apollo Global, India', stars:5,
    quote:'"A clean, well-structured value proposition that is realistic and investor-ready."',
    photo:'assets/kk-raman.png', poster:'assets/kk-raman-feedback.jpeg',
    link:'https://acr.iitm.ac.in/latestdasa/shri-komal-krishnamurthy-raman/'
  },
  {
    name:'Ponguri Parthasarathy', title:'Business Mentor · Ex-Sanofi · Startups', stars:5,
    quote:'"Customer relationships, partnerships, and revenue model all reflect thoughtful business thinking."',
    photo:'assets/ponguri-parthasarathy.jpeg', poster:'assets/ponguri-parthasarathy1-feedback.jpeg',
    link:'https://www.linkedin.com/in/ponguriparthasarathy/'
  },
  {
    name:'J. Murali Krishnan', title:'Professor, Dept. of Civil Engineering, IIT Madras', stars:5,
    quote:'"A thoughtful engagement strategy with a compelling founder story — the origin story gives the product real soul."',
    photo:'assets/j-murali-krishnan.jpg', poster:'assets/j-murali-krishnan-feedback.jpeg',
    link:'https://home.iitm.ac.in/jmk/home'
  },
  {
    name:'Gopal Raman', title:'Formerly President, Hinduja Group', stars:5,
    quote:'"A sharp, entrepreneurial approach to business problem-solving, reflecting genuine strategic maturity."',
    photo:'assets/gopal-raman.jpeg', poster:'assets/gopal-raman-feedback.jpeg',
    link:'https://www.linkedin.com/in/ponguriparthasarathy/'
  },
  {
    name:'Prof. Satyanarayanan S', title:'Co-Founder, Next Carbon', stars:5,
    quote:'"Customer discovery done right — grounded, practical workflows paired with structured assumptions show real thinking."',
    photo:'assets/prof-satyanarayanan-s.jpg', poster:'assets/prof-satyanarayanan-s-feedback.jpeg',
    link:'https://www.linkedin.com/in/satyaseshadri/?skipRedirect=true'
  },
  {
    name:'Shuchi Bhatnagar', title:'Pitch Deck Expert (100+) · Independent Director', stars:5,
    quote:'"A polished, investor-caliber pitch deck — the narrative and positioning land with real clarity and emotional resonance."',
    photo:'assets/shuchi-bhatnagar.jpeg', poster:'assets/shuchi-bhatnagar-feedback.jpeg',
    link:'https://www.linkedin.com/in/shuchi-bhatnagar-4baa6238/?skipRedirect=true&originalSubdomain=in'
  },
  {
    name:'Ponguri Parthasarathy', title:'Business Plan Review', stars:5,
    quote:'"Sanrathi\'s business plan tells a consistent, credible story — real market understanding reflected across the go-to-market strategy."',
    photo:'assets/ponguri-parthasarathy.jpeg', poster:'assets/ponguri-parthasarathy2-feedback.jpeg',
    link:'https://www.linkedin.com/in/ponguriparthasarathy/'
  },
];

function fbCardHtml(t){
  return `
    <div class="fb-card">
      <div class="fb-head">
        <img class="fb-photo" src="${t.photo}" alt="${t.name}" loading="lazy" />
        <div>
          <div class="fb-name">${t.name}</div>
          <div class="fb-title">${t.title}</div>
        </div>
      </div>
      <div class="fb-stars">${'★'.repeat(t.stars)}</div>
      <p class="fb-quote">${t.quote}</p>
      <button class="fb-open mono" data-poster="${t.poster}">Read Full Review →</button>
    </div>`;
}

(function renderFeedback(){
  const track = document.getElementById('feedbackTrack');
  if(!track) return;
  const rowHtml = TESTIMONIALS.map(fbCardHtml).join('');
  track.innerHTML = rowHtml + rowHtml + rowHtml; // multiple copies for seamless scroll

  let isDown = false;
  let startX;
  let scrollLeft;
  let autoScroll = true;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    autoScroll = false;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => {
    isDown = false;
    autoScroll = true;
  });
  track.addEventListener('mouseup', () => {
    isDown = false;
    autoScroll = true;
  });
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  setInterval(() => {
    if (autoScroll) {
      track.scrollLeft += 1;
      if (track.scrollLeft >= track.scrollWidth / 3) {
        track.scrollLeft = 0;
      }
    }
  }, 16);
})();

/* ================= COMPLETE REVIEWS — poster wall ================= */
(function renderPosterWall(){
  const wall = document.getElementById('posterWall');
  if(!wall) return;
  TESTIMONIALS.forEach(t=>{
    const el = document.createElement('div');
    el.className = 'poster-thumb reveal';
    el.dataset.poster = t.poster;
    el.innerHTML = `<img src="${t.poster}" alt="Full review from ${t.name}" loading="lazy" />`;
    wall.appendChild(el);
    revealIO.observe(el);
  });
})();

/* ================= LIGHTBOX ================= */
(function lightbox(){
  const box = document.getElementById('reviewLightbox');
  const img = document.getElementById('lightboxImg');
  const dl = document.getElementById('lightboxDownload');
  const closeBtn = document.getElementById('lightboxClose');
  if(!box) return;

  function open(src){
    img.src = src;
    dl.href = src;
    box.classList.add('show');
  }
  function close(){ box.classList.remove('show'); }

  document.addEventListener('click', (e)=>{
    const trigger = e.target.closest('[data-poster]');
    if(trigger){ open(trigger.dataset.poster); }
  });
  closeBtn.addEventListener('click', close);
  box.addEventListener('click', (e)=>{ if(e.target === box) close(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
})();