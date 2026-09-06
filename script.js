document.addEventListener("DOMContentLoaded", () => {
    initParticleCanvas();
    startAwakeningSequence();
    setupParallaxEffect();
});

let canvas, ctx;
let particles = [];
const PARTICLE_COUNT = 75;

function initParticleCanvas() {
    canvas = document.getElementById("particle-canvas");
    ctx = canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2.5 + 0.5,
            color: Math.random() > 0.4 ? "rgba(212, 160, 23, " : "rgba(138, 180, 248, ",
            alpha: Math.random() * 0.6 + 0.1,
            speedY: -(Math.random() * 0.4 + 0.1),
            speedX: (Math.random() - 0.5) * 0.3,
            pulse: Math.random() * 0.02 + 0.005
        });
    }

    requestAnimationFrame(renderParticles);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
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
    const sceneContainer = document.getElementById("scene-1");
    const overlay = document.getElementById("scene-transition-overlay");

    sceneContainer.style.transition = "transform 1.2s cubic-bezier(0.7, 0, 0.84, 0), filter 1.2s ease";
    sceneContainer.style.transform = "scale(1.12)";
    sceneContainer.style.filter = "brightness(0.2) blur(4px)";

    setTimeout(() => {
        overlay.classList.add("active");
    }, 600);
}