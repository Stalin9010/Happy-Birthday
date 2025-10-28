/* =========================
   Clean working script
   Edit these variables to personalize:
   - NAME (string)
   - PHOTO_URLS (array of 10 image URLs)
   - VIDEO_URLS (array of 2 mp4 URLs)
   ========================= */

const NAME = "Minnie";

/* Replace with your photos (10 slots) */
const PHOTO_URLS = [
    "Minnie2.jpeg",
    "Minnie3.jpeg",
    "Minnie4.jpeg",
    "Minnie5.jpeg",
    "Minnie6.jpeg",
    "Minnie7.jpeg",
    "Minnie8.jpeg",
    "Minnie10.jpeg",
    "Minnie12.jpeg",
    "Minnie13.jpeg"
];

/* Replace with your videos (2 slots) or leave empty strings */
const VIDEO_URLS = ["MinnieV1.mp4", "MinnieV2.mp4"];

/* ---------- DOM references ---------- */
const nameHead = document.getElementById("name-head");
const nameMain = document.getElementById("name-main");
const namePoem = document.getElementById("name-poem");
const typewriter = document.getElementById("typewriter");
const mainTitle = document.getElementById("mainTitle");

const galleryEl = document.getElementById("gallery");
const videosEl = document.getElementById("videos");
const wishesEl = document.getElementById("wishes");

const themeButtons = document.querySelectorAll(".theme-btn");
const canvasContainer = document.getElementById("canvasContainer");

const celebrateBtn = document.getElementById("celebrateBtn");
const downloadBtn = document.getElementById("downloadBtn");

/* ---------- initialize content ---------- */
function populateContent() {
    nameHead.textContent = NAME;
    nameMain.textContent = NAME;
    namePoem.textContent = NAME;

    // gallery
    galleryEl.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        const img = document.createElement("img");
        img.alt = `photo-${i + 1}`;
        img.src = PHOTO_URLS[i] || "";
        if (!PHOTO_URLS[i]) img.style.opacity = 0.06;
        galleryEl.appendChild(img);
    }

    // videos
    videosEl.innerHTML = "";
    VIDEO_URLS.forEach((v, idx) => {
        if (v && v.trim()) {
            const vid = document.createElement("video");
            vid.controls = true;
            vid.playsInline = true;
            vid.src = v;
            videosEl.appendChild(vid);
        } else {
            const placeholder = document.createElement("div");
            placeholder.className = "card";
            placeholder.style.textAlign = "center";
            placeholder.style.padding = "18px";
            placeholder.textContent = `Video slot ${idx + 1} — add MP4 URL in script.js`;
            videosEl.appendChild(placeholder);
        }
    });

    // wishes
    const sample = [
        "Happy birthday Nana! you deserve all the love i the world ❤️",
        "Wising you endless oy and laughter today , tommorow and forver",
        "Hope your day is as beautifull as your heart",
        "The only thing i'll always wish is to be by your side and make you happy and whatch you achieve every thing you ever said to me",
        "Once again many more happy returns of the chinnu",
        "I'll always hope this 21 brings you smiles and great achivements"
      ];
    wishesEl.innerHTML = "";
    sample.forEach(s => { const li = document.createElement("li"); li.textContent = s; wishesEl.appendChild(li); });
}
populateContent();

/* ---------- Typewriter then reveal ---------- */
/* ---------- Typewriter then reveal ---------- */
let hasRun = false; // prevents double-triggering

function runTypewriter() {
    if (hasRun) return; // ✅ stops duplicate runs
    hasRun = true;

    const message = `Hey Minnie... today’s your day 💖`;
    const typewriter = document.querySelector(".typewriter");
    const mainTitle = document.querySelector(".main-title");

    if (!typewriter || !mainTitle) return;

    // Reset state
    typewriter.textContent = "";
    typewriter.classList.remove("show-type", "fade-out", "hidden");
    mainTitle.classList.remove("show");

    let i = 0;
    const typingSpeed = 90;

    function typeChar() {
        if (i < message.length) {
            typewriter.textContent += message.charAt(i);
            i++;
            setTimeout(typeChar, typingSpeed);
        } else {
            setTimeout(() => {
                typewriter.classList.add("fade-out");
                setTimeout(() => {
                    typewriter.classList.add("hidden");
                    mainTitle.classList.add("show");
                }, 700);
            }, 1200);
        }
    }

    typewriter.classList.add("show-type");
    typeChar();
}

// ✅ Run only once after page fully loads
window.addEventListener("DOMContentLoaded", runTypewriter);

/* ---------- Canvas animation system ---------- */
/* Each theme creates its own animation function and stores the frame id in currentFrame.
   Switching theme cancels the previous animation and fades canvas for a smooth transition.
*/
let canvas, ctx, currentFrame = null, currentTheme = document.body.getAttribute("data-theme") || "dreamy";

function createCanvas() {
    // remove existing canvas if any
    canvasContainer.innerHTML = "";
    canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.className = "theme-canvas";
    canvasContainer.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
    if (!canvas) return;
    const rect = canvasContainer.getBoundingClientRect();
    canvas.width = Math.max(300, Math.floor(rect.width));
    canvas.height = Math.max(200, Math.floor(rect.height));
}

/* Cancel any running animation */
function cancelAnim() {
    if (currentFrame) cancelAnimationFrame(currentFrame);
    currentFrame = null;
}

/* Smooth switch visuals */
function switchThemeVisual(theme) {
    cancelAnim();
    // fade out canvas container briefly
    canvasContainer.classList.add("fade-out");
    setTimeout(() => {
        createCanvas();
        if (theme === "starry") startStarry();
        else if (theme === "dreamy") startHearts();
        else if (theme === "elegant") startGold();
        else startButterflies();
        canvasContainer.classList.remove("fade-out");
    }, 260);
}

/* ---------- Starry ---------- */
function startStarry() {
    const W = canvas.width, H = canvas.height;
    const stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.2, a: Math.random()
    }));
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
        g.addColorStop(0, '#030116'); g.addColorStop(1, '#07042a');
        ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (const s of stars) {
            s.a += (Math.random() - 0.5) * 0.03;
            s.a = Math.max(0.1, Math.min(1, s.a));
            ctx.globalAlpha = s.a;
            ctx.beginPath(); ctx.fillStyle = '#fff'; ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
            s.x += Math.sin(Date.now() / 10000 + s.x) * 0.04;
            s.y += Math.cos(Date.now() / 12000 + s.y) * 0.02;
            if (s.x < 0) s.x = canvas.width; if (s.x > canvas.width) s.x = 0;
            if (s.y < 0) s.y = canvas.height; if (s.y > canvas.height) s.y = 0;
        }
        ctx.globalAlpha = 1;
        currentFrame = requestAnimationFrame(loop);
    }
    loop();
}

/* ---------- Hearts (dreamy) ---------- */
function startHearts() {
    const W = canvas.width, H = canvas.height;
    const hearts = Array.from({ length: 36 }, () => ({
        x: Math.random() * W, y: Math.random() * H, s: 8 + Math.random() * 30,
        vx: (Math.random() - 0.5) * 0.6, vy: 0.2 + Math.random() * 0.6, rot: Math.random() * Math.PI * 2, hue: 320 + Math.random() * 30
    }));
    function drawHeart(x, y, size, rot, hue) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
        ctx.beginPath();
        const top = size * 0.3;
        ctx.moveTo(0, top);
        ctx.bezierCurveTo(size / 2, -size / 2, size, top, 0, size);
        ctx.bezierCurveTo(-size, top, -size / 2, -size / 2, 0, top);
        ctx.closePath();
        ctx.fillStyle = `hsla(${hue},85%,70%,0.95)`; ctx.fill();
        ctx.restore();
    }
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const g = ctx.createLinearGradient(0, 0, 0, canvas.height); g.addColorStop(0, '#fff6fb'); g.addColorStop(1, '#ffe8f8');
        ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (const h of hearts) {
            drawHeart(h.x, h.y, h.s, Math.sin(Date.now() / 800 + h.rot) * 0.6, h.hue);
            h.x += h.vx + Math.sin(Date.now() / 800 + h.x) * 0.2;
            h.y += h.vy;
            if (h.y > canvas.height + 40) { h.y = -40; h.x = Math.random() * canvas.width; }
        }
        currentFrame = requestAnimationFrame(loop);
    }
    loop();
}

/* ---------- Gold glows (elegant) ---------- */
function startGold() {
    const glows = Array.from({ length: 18 }, (_, i) => ({
        x: ((i + 0.5) / 18) * canvas.width + Math.random() * 20,
        y: Math.random() * canvas.height,
        r: 50 + Math.random() * 110,
        a: 0.04 + Math.random() * 0.08,
        speed: 0.001 + Math.random() * 0.004
    }));
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const g = ctx.createLinearGradient(0, 0, 0, canvas.height); g.addColorStop(0, '#fff9f7'); g.addColorStop(1, '#fff6f3');
        ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (const p of glows) {
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
            grad.addColorStop(0, `rgba(255,224,230,${p.a})`);
            grad.addColorStop(1, `rgba(255,224,230,0)`);
            ctx.fillStyle = grad; ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
            p.y += Math.sin(Date.now() * p.speed) * 0.3;
            p.x += Math.cos(Date.now() * p.speed) * 0.3;
        }
        currentFrame = requestAnimationFrame(loop);
    }
    loop();
}

/* ---------- Butterflies (fantasy) ---------- */
function startButterflies() {
    const bf = Array.from({ length: 26 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: -0.2 + Math.random() * 0.6, vy: 0.1 + Math.random() * 0.6,
        s: 6 + Math.random() * 14, ang: Math.random() * Math.PI * 2, col: 240 + Math.random() * 100
    }));
    function drawButterfly(x, y, s, col, t) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t / 300 + x) * 0.6);
        ctx.fillStyle = `hsla(${col},75%,70%,0.95)`;
        ctx.beginPath(); ctx.ellipse(-s, 0, s, s * 0.6, 0, 0, Math.PI * 2); ctx.ellipse(s, 0, s, s * 0.6, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const g = ctx.createLinearGradient(0, 0, 0, canvas.height); g.addColorStop(0, '#f6fbff'); g.addColorStop(1, '#eef8ff');
        ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
        const t = Date.now();
        for (const b of bf) {
            drawButterfly(b.x, b.y, b.s, b.col, t);
            b.x += Math.cos(t / 700 + b.ang) * 0.6 + b.vx * 0.6;
            b.y += Math.sin(t / 900 + b.ang) * 0.4 + b.vy * 0.4;
            if (b.y > canvas.height + 40) { b.y = -40; b.x = Math.random() * canvas.width; }
            if (b.x < -40) b.x = canvas.width + 40;
            if (b.x > canvas.width + 40) b.x = -40;
        }
        currentFrame = requestAnimationFrame(loop);
    }
    loop();
}

/* ---------- Theme UI logic ---------- */
themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        themeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const theme = btn.dataset.theme;
        if (theme === currentTheme) return;
        currentTheme = theme;

        // fade out overlay content for smooth color switch
        document.querySelectorAll(".hero-overlay, .main-title, .typewriter").forEach(el => {
            el.classList.add("fade-out");
            setTimeout(() => el.classList.remove("fade-out"), 420);
        });

        // change body dataset and restart visuals with fade
        document.body.setAttribute("data-theme", theme);
        switchThemeVisual(theme);
    });
});

/* ---------- Celebrate confetti ---------- */
function triggerConfetti() {
    const count = 80;
    for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        el.className = "confetti";
        el.style.left = Math.random() * 100 + "vw";
        el.style.backgroundColor = `hsl(${Math.random() * 360},80%,70%)`;
        el.style.width = (6 + Math.random() * 10) + "px";
        el.style.height = (8 + Math.random() * 14) + "px";
        el.style.top = (-10 - Math.random() * 50) + "px";
        el.style.animationDuration = (2000 + Math.random() * 1600) + "ms";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4500);
    }
}
celebrateBtn.addEventListener("click", triggerConfetti);

/* ---------- Download HTML ---------- */
downloadBtn.addEventListener("click", () => {
    const html = "<!doctype html>\n" + document.documentElement.outerHTML;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `happy-birthday-${NAME.toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
});

/* ---------- Initialize ---------- */
function init() {
    createCanvas();
    switchThemeVisual(currentTheme);
    runTypewriter();
}

init();

/* Stop heavy animation when page hidden */
document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnim();
    else switchThemeVisual(currentTheme);
});
