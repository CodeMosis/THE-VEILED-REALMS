let canvas, ctx;
let particles = [];
const PARTICLE_COUNT = 85;
let particleMode = "floating";
let currentRealm = "forest";

const REALM_DATA = {
    forest: {
        title: "THE FOREST REALM",
        desc: "Where ancient shadows whisper beneath the sacred grove canopy"
    },
    temple: {
        title: "THE TEMPLE REALM",
        desc: "Where gods and restless spirits cross the sacred threshold"
    }
};

const CHARACTER_LORE = {
    neeli: { 
        realm: "TEMPLE FOLKLORE", 
        title: "KALLIYANKATTU NEELI", 
        epithet: "The Wrathful Spirit of the Palms", 
        quote: "“They feared the spirit she became, but forgot the woman she once was.”", 
        lore: "Kalliyankattu Neeli is one of Kerala's most enduring Yakshi legends. In a widely told tradition, her story begins with Alli, a woman betrayed and killed by her husband. From that injustice, Neeli emerges as a powerful spirit of vengeance, haunting the boundary between the human world and the supernatural. Yet her story carries more than fear. Across traditions, the wrathful spirit gradually becomes associated with reverence and protection, transforming a tale of betrayal into one of power, memory, and divine presence.", 
        svg: `<path d="M100 50 C80 50 70 80 65 120 C50 160 30 220 20 280 L180 280 C170 220 150 160 135 120 C130 80 120 50 100 50 Z" fill="#03060a"/> 
              <path d="M85 30 L100 10 L115 30 L125 20 L100 0 L75 20 Z" fill="#d4a017"/> 
              <circle cx="90" cy="70" r="3" class="eye-glow"/> 
              <circle cx="110" cy="70" r="3" class="eye-glow"/>` 
    },

    chathan: { 
        realm: "FOREST FOLKLORE", 
        title: "KUTTICHATHAN", 
        epithet: "The Mischievous Imp Deity", 
        quote: "“His laughter may sound playful, but never mistake mischief for weakness.”", 
        lore: "Kuttichathan is a powerful and mysterious figure in Malabar folklore, also represented through Kuttichathan Theyyam. Different traditions preserve different stories about his origins, but he is often imagined as a supernatural child-like being with extraordinary powers. He is associated with mischief, illusion, protection, prosperity, and supernatural punishment. Neither entirely benevolent nor entirely malicious, Kuttichathan remains unpredictable—a spirit whose favour may bring fortune and whose displeasure may bring consequences.", 
        aura: "aura-emerald", 
        svg: `<path d="M100 100 C75 100 60 130 50 170 C40 210 30 250 25 280 L175 280 C170 250 160 210 150 170 C140 130 125 100 100 100 Z" fill="#03060a"/> 
              <line x1="45" y1="280" x2="45" y2="120" stroke="#d4a017" stroke-width="4"/> 
              <circle cx="45" cy="115" r="7" class="rune-glow"/> 
              <circle cx="88" cy="120" r="3" class="eye-glow"/> 
              <circle cx="112" cy="120" r="3" class="eye-glow"/>` 
    },

    odiyan: { 
        realm: "FOREST FOLKLORE", 
        title: "ODIYAN", 
        epithet: "The Shadow Beast Shapeshifter", 
        quote: "“In the darkness, the most frightening question is not what you saw, but what it truly was.”", 
        lore: "The Odiyan is one of Kerala's most mysterious folklore figures, traditionally associated with Odividya, an occult practice believed in folklore to grant practitioners the ability to take on frightening animal-like forms. Tales speak of Odiyans appearing at night as creatures such as buffaloes or bulls, waiting along lonely paths for unsuspecting travellers. Yet the deepest fear surrounding the Odiyan comes from uncertainty. In the darkness, a distant shape could be a man, a beast, or something that cannot be named.", 
        aura: "aura-dark", 
        svg: `<path d="M100 110 C80 110 65 140 55 180 C45 220 35 250 30 280 L170 280 C165 250 155 220 145 180 C135 140 120 110 100 110 Z" fill="#03060a"/> 
              <path d="M70 120 C50 100 40 70 70 80 Q85 100 95 115 Z" fill="#020407"/> 
              <circle cx="88" cy="135" r="3" class="eye-glow"/> 
              <circle cx="112" cy="135" r="3" class="eye-glow"/>` 
    },

    spirit: { 
        realm: "FOREST FOLKLORE", 
        title: "YAKSHI", 
        epithet: "The Enchantress of Pala Trees", 
        quote: "“Beneath the Pala tree, beauty can be the first warning of danger.”", 
        lore: "The Yakshi is one of Kerala's most enduring supernatural figures, traditionally portrayed as a beautiful and mysterious woman associated with the Pala tree. In folklore, travellers encountering her at night may be drawn in by her beauty before discovering the danger hidden beneath it. Many stories connect Yakshis with betrayal, violent death, vengeance, and unresolved injustice. She therefore stands at the unsettling boundary between enchantment and terror, where something beautiful can conceal something deadly.", 
        aura: "aura-silver", 
        svg: `<path d="M100 70 C85 70 75 100 65 140 C55 180 35 240 25 280 L175 280 C165 240 145 180 135 140 C125 100 115 70 100 70 Z" fill="#03060a"/> 
              <path d="M100 70 C60 90 40 140 20 200 C50 160 80 120 95 100 Z" fill="#8ab4f8"/> 
              <circle cx="92" cy="100" r="3" class="eye-glow"/> 
              <circle cx="108" cy="100" r="3" class="eye-glow"/>` 
    },

    theyyam: { 
        realm: "TEMPLE FOLKLORE", 
        title: "THEYYAM DEITY", 
        epithet: "The Living Channel of the Divine", 
        quote: "“When the drums awaken the night, the distance between mortal and divine begins to disappear.”", 
        lore: "Theyyam is more than a performance; it is a sacred ritual tradition through which divine and ancestral figures are embodied. Through elaborate costumes, vivid face painting, powerful dance, music, ritual movements, and devotion, the performer becomes the centre of a profound encounter between the human and the divine. Rooted deeply in the cultural traditions of North Kerala, Theyyam transforms an ordinary sacred space into a world where gods, spirits, ancestors, and devotees meet.", 
        aura: "aura-gold", 
        svg: `<path d="M100 30 A 70 70 0 0 1 170 100 L30 100 A 70 70 0 0 1 100 30 Z" fill="#081420"/> 
              <path d="M40 120 L160 120 L175 280 L25 280 Z" fill="#03060a"/> 
              <circle cx="100" cy="65" r="18" fill="none" stroke="#d4a017" stroke-width="3"/> 
              <circle cx="88" cy="140" r="3" class="eye-glow"/> 
              <circle cx="112" cy="140" r="3" class="eye-glow"/>` 
    },

    marutha: { 
        realm: "FOREST FOLKLORE", 
        title: "MARUTHA", 
        epithet: "The Night Phantom of the Groves", 
        quote: "“The forest remembers every footstep. Marutha remembers the ones who never returned.”", 
        lore: "Marutha can be portrayed as an enigmatic supernatural presence of Kerala's deep groves and forests, existing at the uncertain boundary between the natural and the otherworldly. Rather than a simple monster, Marutha represents the unknown hidden within the wilderness—the feeling that the forest is watching even when no one can be seen. Ancient, silent, and elusive, this presence turns familiar trees and forgotten paths into places filled with secrets.", 
        aura: "aura-dark", 
        svg: `<path d="M100 110 C80 110 65 140 55 180 C45 220 35 250 30 280 L170 280 C165 250 155 220 145 180 C135 140 120 110 100 110 Z" fill="#03060a"/> 
              <circle cx="88" cy="135" r="3" class="eye-glow"/> 
              <circle cx="112" cy="135" r="3" class="eye-glow"/>` 
    },

    gulikan: { 
        realm: "FOREST FOLKLORE", 
        title: "GULIKAN", 
        epithet: "The Herald of Time and Fate", 
        quote: "“You can flee the night, but you cannot flee the fate that waits beyond it.”", 
        lore: "Gulikan is a powerful figure in the Theyyam traditions of North Kerala and is associated with Yama, the deity of death. His ritual presence is intense, marked by elaborate costume, commanding movements, music, and an atmosphere charged with fear and reverence. Gulikan is more than a frightening figure; he embodies the inevitability of death and the limits of human power. Before him, wealth, strength, and status become meaningless, reminding all who encounter him that every life has an ending.", 
        aura: "aura-crimson", 
        svg: `<path d="M100 50 C80 50 70 80 65 120 C50 160 30 220 20 280 L180 280 C170 220 150 160 135 120 C130 80 120 50 100 50 Z" fill="#03060a"/> 
              <circle cx="90" cy="70" r="3" class="eye-glow"/> 
              <circle cx="110" cy="70" r="3" class="eye-glow"/>` 
    },

    muthappan: { 
        realm: "TEMPLE FOLKLORE", 
        title: "MUTHAPPAN", 
        epithet: "The Compassionate Deity", 
        quote: "“You do not need to stand above others to be heard by the divine. Come as you are.”", 
        lore: "Muthappan is one of the most beloved folk-deity traditions of North Kerala, especially associated with the Parassinikadavu Muthappan Temple. Closely connected with the Theyyam tradition, Muthappan represents a distinctive and deeply rooted form of folk worship. His presence is often understood through ideas of compassion, protection, acceptance, and closeness to ordinary people. In the world of Muthappan, the divine does not remain distant—it comes close to the people who seek it.", 
        aura: "aura-gold", 
        svg: `<path d="M100 30 A 70 70 0 0 1 170 100 L30 100 A 70 70 0 0 1 100 30 Z" fill="#081420"/> 
              <path d="M40 120 L160 120 L175 280 L25 280 Z" fill="#03060a"/> 
              <circle cx="88" cy="140" r="3" class="eye-glow"/> 
              <circle cx="112" cy="140" r="3" class="eye-glow"/>` 
    },

    chathan_deivam: { 
        realm: "TEMPLE FOLKLORE", 
        title: "CHATHAN DEIVAM", 
        epithet: "The Sacred Guardian Entity", 
        quote: "“Some guardians stand in the light. Others watch from the shadows.”", 
        lore: "Chathan worship in Kerala exists through diverse local traditions, with Chathan figures appearing in family shrines and sacred spaces as powerful supernatural beings. In traditions where Chathan is revered as a guardian, devotees seek protection, prosperity, and relief from misfortune while maintaining sacred vows and practices. This creates a fascinating duality: a figure associated with supernatural fear can also become a source of protection and devotion.", 
        aura: "aura-emerald", 
        svg: `<path d="M100 100 C75 100 60 130 50 170 C40 210 30 250 25 280 L175 280 C170 250 160 210 150 170 C140 130 125 100 100 100 Z" fill="#03060a"/> 
              <circle cx="88" cy="120" r="3" class="eye-glow"/> 
              <circle cx="112" cy="120" r="3" class="eye-glow"/>` 
    },

    bhagavathi: { 
        realm: "TEMPLE FOLKLORE", 
        title: "BHAGAVATHI", 
        epithet: "The Divine Mother Deity", 
        quote: "“Her grace shelters the devoted; her fury rises against the darkness.”", 
        lore: "Bhagavathi is a powerful mother-goddess tradition deeply woven into Kerala's sacred landscape, with countless local forms worshipped in temples and sacred groves known as Kavus. Representing Shakti, the divine feminine power, Bhagavathi can embody both compassion and formidable strength. Through different regional traditions and forms, she is revered as a protector of communities, sacred spaces, and devotees, standing as a powerful symbol of divine feminine energy.", 
        aura: "aura-crimson", 
        svg: `<path d="M100 50 C80 50 70 80 65 120 C50 160 30 220 20 280 L180 280 C170 220 150 160 135 120 C130 80 120 50 100 50 Z" fill="#03060a"/> 
              <circle cx="90" cy="70" r="3" class="eye-glow"/> 
              <circle cx="110" cy="70" r="3" class="eye-glow"/>` 
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initParticleCanvas();
    startAwakeningSequence();
    setupParallaxEffect();
    setupKeyboardListeners();
    setupCharacterCardListeners();
});

function setupKeyboardListeners() {
    const realmCards = document.querySelectorAll('#scene-realms .realm-card, .realm-card');
    realmCards.forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

function setupCharacterCardListeners() {
    const cards = document.querySelectorAll(".realm-char-card, [data-char]");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const charId = card.dataset.char || card.id.replace("char-", "");
            if (charId) {
                openCharacterStory(charId);
            }
        });
    });

    const backBtn = document.getElementById("back-to-realm-btn") || document.querySelector(".back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", closeCharacterStory);
    }
}

function initParticleCanvas() {
    canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
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
    if (!ctx) return;
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

function startAwakeningSequence() {
    setTimeout(() => {
        const pCanvas = document.getElementById("particle-canvas");
        if (pCanvas) pCanvas.classList.add("visible");
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
        const title = document.getElementById("main-title");
        const subtitle = document.getElementById("main-subtitle");
        if (title) title.classList.add("revealed");
        if (subtitle) subtitle.classList.add("revealed");
    }, 5500);

    setTimeout(() => {
        const enterBtn = document.getElementById("enter-btn");
        if (enterBtn) enterBtn.classList.add("revealed");
    }, 6500);
}

function goToScene2() {
    const scene1 = document.getElementById("scene-1");
    const scene2 = document.getElementById("scene-2");
    const overlay = document.getElementById("scene-transition-overlay");

    if (!scene1 || !scene2 || !overlay) return;

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

    if (traveler) {
        setTimeout(() => {
            traveler.classList.add("descending");
        }, 400);
    }

    if (landscape) {
        setTimeout(() => {
            landscape.classList.add("emerged");
        }, 1800);
    }

    if (traveler && ripple) {
        setTimeout(() => {
            traveler.classList.remove("descending");
            traveler.classList.add("landed");
            ripple.classList.add("active");
            particleMode = "floating";
        }, 3600);
    }

    setTimeout(() => {
        showCinematicText();
    }, 5200);
}

function showCinematicText() {
    const line1 = document.getElementById("line-1");
    const line2 = document.getElementById("line-2");

    if (line1) line1.classList.add("visible");

    if (line2) {
        setTimeout(() => {
            line2.classList.add("visible");
        }, 2200);
    }

    setTimeout(() => {
        if (line1) line1.classList.remove("visible");
        if (line2) line2.classList.remove("visible");
    }, 5500);

    setTimeout(() => {
        switchStage("realms-stage");
    }, 7000);
}

function showRealmSelection() {
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => scene.classList.remove('active'));

    const sceneRealms = document.getElementById('scene-realms');
    if (sceneRealms) {
        sceneRealms.classList.add('active');
    }
}

function selectRealm(realmKey) {
    if (!realmKey) return;
    currentRealm = realmKey.toLowerCase();
    const data = REALM_DATA[currentRealm] || REALM_DATA.forest;

    const nameElem = document.getElementById("active-realm-name");
    const descElem = document.getElementById("active-realm-desc");

    if (nameElem) nameElem.innerText = data.title;
    if (descElem) descElem.innerText = data.desc;

    switchStage("characters-stage");

    const charCards = document.querySelectorAll(".realm-char-card");
    let visibleIndex = 0;

    charCards.forEach(card => {
        const cardRealm = (card.dataset.realm || "").toLowerCase();

        if (cardRealm === currentRealm) {
            card.style.display = "";
            card.classList.remove("revealed");
            setTimeout(() => {
                card.classList.add("revealed");
            }, visibleIndex * 200 + 100);
            visibleIndex++;
        } else {
            card.style.display = "none";
            card.classList.remove("revealed");
        }
    });
}

function returnToRealms() {
    switchStage("realms-stage");
}

function openCharacterStory(charKey) {
    if (!charKey) return;

    const normalizedKey = charKey.toLowerCase().replace(/[-_]/g, "");
    const matchedKey = Object.keys(CHARACTER_LORE).find(
        key => key.toLowerCase().replace(/[-_]/g, "") === normalizedKey
    ) || charKey;

    const info = CHARACTER_LORE[matchedKey];
    if (!info) return;

    const realmElem = document.getElementById("modal-char-realm");
    const titleElem = document.getElementById("modal-char-title");
    const epithetElem = document.getElementById("modal-char-epithet");
    const quoteElem = document.getElementById("modal-char-quote");
    const loreElem = document.getElementById("modal-char-lore");

    if (realmElem) realmElem.innerText = info.realm;
    if (titleElem) titleElem.innerText = info.title;
    if (epithetElem) epithetElem.innerText = info.epithet;
    if (quoteElem) quoteElem.innerText = info.quote;
    if (loreElem) loreElem.innerText = info.lore;

    const auraElem = document.getElementById("modal-art-aura");
    if (auraElem) auraElem.className = `modal-art-glow ${info.aura}`;

    const svgElem = document.getElementById("modal-char-svg");
    if (svgElem) svgElem.innerHTML = info.svg;

    const modal = document.getElementById("character-story-overlay");
    if (modal) modal.classList.add("active");
}

function closeCharacterStory() {
    const modal = document.getElementById("character-story-overlay");
    if (modal) modal.classList.remove("active");

    if (currentRealm) {
        selectRealm(currentRealm);
    }
}

