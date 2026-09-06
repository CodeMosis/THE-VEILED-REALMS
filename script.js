let canvas, ctx;
let particles = [];
const PARTICLE_COUNT = 85;
let particleMode = "floating"; 

document.addEventListener("DOMContentLoaded", () => {
    initParticleCanvas();
    startAwakeningSequence();
    setupParallaxEffect();
});

function initParticleCanvas() {
    canvas = document.getElementById("particle-canvas");
    ctx = canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
    }

    requestAnimationFrame(renderParticles);
}

function createParticle() {
    return {
        x: Math.random() * (canvas ? canvas.width : window.innerWidth),
        y: Math.random() * (canvas ? canvas.height : window.innerHeight),
        radius: Math.random() * 2.2 + 0.5,
        color: Math.random() > 0.4 ? "rgba(212, 160, 23, " : "rgba(138, 180, 248, ",
        alpha: Math.random() * 0.6 + 0.1,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        pulse: Math.random() * 0.02 + 0.005,
        length: Math.random() * 15 + 5 
    };
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        if (particleMode === "descent") {
            p.y += (Math.random() * 8 + 6);
            p.x += p.speedX * 0.5;

            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y - p.length);
            ctx.strokeStyle = p.color + "0.6)";
            ctx.lineWidth = p.radius * 0.8;
            ctx.stroke();

        } else {
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < -10) p.y = canvas.height + 10;
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;

            p.alpha += Math.sin(Date.now() * p.pulse) * 0.005;
            const clampedAlpha = Math.max(0.05, Math.min(0.7, p.alpha));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + clampedAlpha + ")";
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color + "0.8)";
            ctx.fill();
        }
    });

    requestAnimationFrame(renderParticles);
}


function startAwakeningSequence() {
    setTimeout(() => {
        document.getElementById("particle-canvas").classList.add("visible");
    }, 500);

    setTimeout(() => {
        const sideFar = document.querySelectorAll(".side-far");
        sideFar.forEach(el => el.classList.add("revealed"));
    }, 1800);

    setTimeout(() => {
        const sideMid = document.querySelectorAll(".side-mid");
        sideMid.forEach(el => el.classList.add("revealed"));
    }, 3000);

    setTimeout(() => {
        const charNeeli = document.getElementById("char-neeli");
        if (charNeeli) charNeeli.classList.add("revealed");
    }, 4200);

    setTimeout(() => {
        document.getElementById("main-title").classList.add("revealed");
        document.getElementById("main-subtitle").classList.add("revealed");
    }, 5500);

    setTimeout(() => {
        document.getElementById("enter-btn").classList.add("revealed");
    }, 6500);
}

function setupParallaxEffect() {
    const layers = document.querySelectorAll(".parallax-layer");
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    });

    function animateParallax() {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        layers.forEach(layer => {
            const depth = parseFloat(layer.getAttribute("data-depth") || 0.05);
            const moveX = targetX * (depth * 300);
            const moveY = targetY * (depth * 150);
            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });

        requestAnimationFrame(animateParallax);
    }

    animateParallax();
}

function goToScene2() {
    const scene1 = document.getElementById("scene-1");
    const scene2 = document.getElementById("scene-2");
    const overlay = document.getElementById("scene-transition-overlay");

    scene1.style.transform = "scale(1.12)";
    scene1.style.filter = "brightness(0.1) blur(6px)";
    scene1.style.opacity = "0";
    overlay.classList.add("active");

    setTimeout(() => {
        scene1.classList.remove("active");
        scene2.classList.add("active");

        switchStage("descent-stage");
        overlay.classList.remove("active");

        startDescentCinematic();
    }, 1400);
}

function switchStage(stageId) {
    const stages = document.querySelectorAll(".stage-container");
    stages.forEach(st => st.classList.remove("active"));

    const targetStage = document.getElementById(stageId);
    if (targetStage) targetStage.classList.add("active");
}

function startDescentCinematic() {
    particleMode = "descent";

    const traveler = document.getElementById("traveler-silhouette");
    const landscape = document.getElementById("kerala-landscape");
    const ripple = document.getElementById("landing-ripple");

    setTimeout(() => {
        traveler.classList.add("descending");
    }, 400);

    setTimeout(() => {
        landscape.classList.add("emerged");
    }, 1800);

    setTimeout(() => {
        traveler.classList.remove("descending");
        traveler.classList.add("landed");
        ripple.classList.add("active");
        particleMode = "floating"; 
    }, 3600);

    setTimeout(() => {
        showCinematicText();
    }, 5200);
}

function showCinematicText() {
    const line1 = document.getElementById("line-1");
    const line2 = document.getElementById("line-2");

    line1.classList.add("visible");

    setTimeout(() => {
        line2.classList.add("visible");
    }, 2200);

    setTimeout(() => {
        line1.classList.remove("visible");
        line2.classList.remove("visible");
    }, 5500);

    setTimeout(() => {
        switchStage("realms-stage");
    }, 7000);
}


const REALM_DATA = {
    forest: {
        title: "THE FOREST REALM",
        desc: "Where ancient shadows whisper beneath the sacred grove canopy"
    },
    temple: {
        title: "THE TEMPLE REALM",
        desc: "Where gods and restless spirits cross the sacred threshold"
    },
    village: {
        title: "THE VILLAGE REALM",
        desc: "Where folklore whispers live in midnight court hearths"
    },
    mountains: {
        title: "THE MOUNTAIN REALM",
        desc: "Where the unknown waits beyond the mist of Western Ghats"
    }
};

const CHARACTER_LORE = {
    neeli: {
        realm: "SOUTHERN BORDERLANDS",
        title: "KALLIYANKATTU NEELI",
        epithet: "The Wrathful Spirit of the Palms",
        quote: "Her beauty was a woven trap of moonlight; her vengeance, a timeless curse.",
        lore: "Tricked and slain by her beloved merchant husband in a past incarnation, Neeli returned as a formidable spirit in Kalliyankattu forest. She lures wicked travelers into deep palm woods using ethereal melodies before unleashing her righteous wrath.",
        aura: "aura-crimson",
        svg: `<path d="M100 50 C80 50 70 80 65 120 C50 160 30 220 20 280 L180 280 C170 220 150 160 135 120 C130 80 120 50 100 50 Z" fill="#03060a"/>
              <path d="M85 30 L100 10 L115 30 L125 20 L100 0 L75 20 Z" fill="#d4a017"/>
              <circle cx="90" cy="70" r="3" class="eye-glow"/>
              <circle cx="110" cy="70" r="3" class="eye-glow"/>`
    },
    chathan: {
        realm: "MALABAR MYSTERIES",
        title: "KUTTICHATHAN",
        epithet: "The Mischievous Imp Deity",
        quote: "Bound by blood ritual, loyal to a fault, yet unpredictable as wildfire.",
        lore: "Kuttichathan is a potent goblin-deity in Kerala lore. Capable of vanishing into thin air, hurling stones at household roofs, and protecting those who honor his shrines, he represents the volatile boundary between friendly guardian and chaotic force.",
        aura: "aura-emerald",
        svg: `<path d="M100 100 C75 100 60 130 50 170 C40 210 30 250 25 280 L175 280 C170 250 160 210 150 170 C140 130 125 100 100 100 Z" fill="#03060a"/>
              <line x1="45" y1="280" x2="45" y2="120" stroke="#d4a017" stroke-width="4"/>
              <circle cx="45" cy="115" r="7" class="rune-glow"/>
              <circle cx="88" cy="120" r="3" class="eye-glow"/>
              <circle cx="112" cy="120" r="3" class="eye-glow"/>`
    },
    odiyan: {
        realm: "NIGHT SHAPESHIFTING",
        title: "ODIYAN",
        epithet: "The Shadow Beast Shapeshifter",
        quote: "Pluck the ears-ear herb, step on all fours, and become the shadow beast.",
        lore: "Members of the secret Odiyan cult were feared assassins of rural Kerala. Using secret herbal ointments behind their ears during midnight rituals, they transformed their physical form into bulls, leopards, or trunks to ambush victims in total dark.",
        aura: "aura-dark",
        svg: `<path d="M100 110 C80 110 65 140 55 180 C45 220 35 250 30 280 L170 280 C165 250 155 220 145 180 C135 140 120 110 100 110 Z" fill="#03060a"/>
              <path d="M70 120 C50 100 40 70 70 80 Q85 100 95 115 Z" fill="#020407"/>
              <circle cx="88" cy="135" r="3" class="eye-glow"/>
              <circle cx="112" cy="135" r="3" class="eye-glow"/>`
    },
    spirit: {
        realm: "CELESTIAL FORESTS",
        title: "YAKSHI",
        epithet: "The Enchantress of Pala Trees",
        quote: "Beware the sweet scent of Pala blossoms at twilight.",
        lore: "An ethereal celestial being in classical folklore who lingers near flowering Pala trees. Appearing as an irresistible maiden to lone travelers, her true ghostly form remains hidden until the moonlight reveals her true power.",
        aura: "aura-silver",
        svg: `<path d="M100 70 C85 70 75 100 65 140 C55 180 35 240 25 280 L175 280 C165 240 145 180 135 140 C125 100 115 70 100 70 Z" fill="#03060a"/>
              <path d="M100 70 C60 90 40 140 20 200 C50 160 80 120 95 100 Z" fill="#8ab4f8"/>
              <circle cx="92" cy="100" r="3" class="eye-glow"/>
              <circle cx="108" cy="100" r="3" class="eye-glow"/>`
    },
    theyyam: {
        realm: "RITUAL SANCTUARIES",
        title: "THEYYAM DEITY",
        epithet: "The Living Channel of the Divine",
        quote: "Mortals elevated into living deities through fire and sacred rhythm.",
        lore: "In Northern Kerala's sacred groves, ritual performers adorn colossal ornate headpieces (Mudi) and red vermillion paint. Through intense drumming, fire dancing, and trance, the performer ceases to be human and becomes the embodiment of the god.",
        aura: "aura-gold",
        svg: `<path d="M100 30 A 70 70 0 0 1 170 100 L30 100 A 70 70 0 0 1 100 30 Z" fill="#081420"/>
              <path d="M40 120 L160 120 L175 280 L25 280 Z" fill="#03060a"/>
              <circle cx="100" cy="65" r="18" fill="none" stroke="#d4a017" stroke-width="3"/>
              <circle cx="88" cy="140" r="3" class="eye-glow"/>
              <circle cx="112" cy="140" r="3" class="eye-glow"/>`
    }
};

function selectRealm(realmKey) {
    const data = REALM_DATA[realmKey] || REALM_DATA.forest;

    document.getElementById("active-realm-name").innerText = data.title;
    document.getElementById("active-realm-desc").innerText = data.desc;

    switchStage("characters-stage");

    const charCards = document.querySelectorAll(".realm-char-card");
    charCards.forEach((card, index) => {
        card.classList.remove("revealed");
        setTimeout(() => {
            card.classList.add("revealed");
        }, index * 220 + 300);
    });
}

function returnToRealms() {
    switchStage("realms-stage");
}


function openCharacterStory(charKey) {
    const info = CHARACTER_LORE[charKey];
    if (!info) return;

    document.getElementById("modal-char-realm").innerText = info.realm;
    document.getElementById("modal-char-title").innerText = info.title;
    document.getElementById("modal-char-epithet").innerText = info.epithet;
    document.getElementById("modal-char-quote").innerText = info.quote;
    document.getElementById("modal-char-lore").innerText = info.lore;

    const auraElem = document.getElementById("modal-art-aura");
    auraElem.className = `modal-art-glow ${info.aura}`;

    const svgElem = document.getElementById("modal-char-svg");
    svgElem.innerHTML = info.svg;

    const modal = document.getElementById("character-story-overlay");
    modal.classList.add("active");
}

function closeCharacterStory() {
    const modal = document.getElementById("character-story-overlay");
    modal.classList.remove("active");
}