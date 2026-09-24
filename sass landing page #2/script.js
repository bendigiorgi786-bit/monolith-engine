// Initialize Lucide Icons
lucide.createIcons();

// Mobile Navigation Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Cursor Spotlight Effect
const cursorSpotlight = document.getElementById('cursor-spotlight');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorSpotlight) {
        cursorSpotlight.style.transform = `translate3d(${mouseX - 200}px, ${mouseY - 200}px, 0)`;
    }
});

// Fluid Emerald Wave Background Canvas
const canvas = document.getElementById('emerald-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawEmeraldWaves(time) {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1.5;

    const totalLines = 14;
    const lineSpacing = height / totalLines;

    for (let i = 1; i < totalLines; i++) {
        ctx.beginPath();
        const yBase = i * lineSpacing;

        // Gradient line stroke
        const grad = ctx.createLinearGradient(0, yBase, width, yBase);
        grad.addColorStop(0, '#059669');
        grad.addColorStop(0.5, '#10b981');
        grad.addColorStop(1, '#040a06');
        ctx.strokeStyle = grad;

        for (let x = 0; x <= width; x += 25) {
            let dx = x - mouseX;
            let dy = yBase - mouseY;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let force = Math.max(0, (200 - dist) / 200);

            let wave = Math.sin(x * 0.004 + time * 0.0008 + i * 0.5) * 22;
            let y = yBase + wave - (force * 40);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }
}

let animTime = 0;
function renderLoop() {
    animTime += 16;
    drawEmeraldWaves(animTime);
    requestAnimationFrame(renderLoop);
}
renderLoop();

// Interactive Pipeline Switcher
const stageData = {
    ingest: {
        tag: 'DIRECT MEMORY LOCK',
        title: 'RDMA Zero-Copy Ingestion',
        desc: 'Bypasses OS kernel network stacks to stream payload packets straight into high-bandwidth GPU VRAM buffers.',
        m1: '0.000 ms',
        m2: '512 Channels',
        cmd: 'ingest',
        term: [
            '[0.00ms] Allocation lock acquired on VRAM 0x7FFF',
            '<span class="text-emeraldTheme-lightEmerald">[0.01ms] Ingesting 2.4M packets/sec...</span>'
        ]
    },
    index: {
        tag: 'GRAPH MATRIX // HNSW',
        title: 'Hierarchical Vector Graph Indexing',
        desc: 'Maps multi-dimensional payload embeddings into quantized vector clusters for instant similarity querying.',
        m1: '0.045 ms',
        m2: '2,048 Dims',
        cmd: 'vector-index',
        term: [
            '[0.00ms] Building spatial vector indices...',
            '<span class="text-emeraldTheme-emerald">[0.02ms] Quantization complete (INT8 precision).</span>'
        ]
    },
    execute: {
        tag: 'SPECULATIVE NEURAL TREE',
        title: 'Speculative Tree Execution',
        desc: 'Predicts dynamic branching state paths before queries finalize, pre-computing neural weights in parallel.',
        m1: '99.8%',
        m2: 'Branch Predictor',
        cmd: 'speculate-eval',
        term: [
            '[0.00ms] Evaluating target branch probability...',
            '<span class="text-emeraldTheme-lightEmerald">[0.01ms] Branch #1 pre-computed into L1 cache.</span>'
        ]
    },
    flush: {
        tag: 'DIRECT SSE FLUSH',
        title: 'Zero-Latency Response Output',
        desc: 'Flushes raw byte output streams directly into client sockets without intermediate serialization overhead.',
        m1: '0.005 ms',
        m2: '100% Direct',
        cmd: 'stream-flush',
        term: [
            '[0.00ms] Direct socket channel open.',
            '<span class="text-emeraldTheme-emerald">[0.01ms] Stream complete. Connection recycled.</span>'
        ]
    }
};

const pipelineBtns = document.querySelectorAll('.pipeline-btn');
const stageTag = document.getElementById('stage-tag');
const stageTitle = document.getElementById('stage-title');
const stageDesc = document.getElementById('stage-desc');
const stageM1 = document.getElementById('stage-m1');
const stageM2 = document.getElementById('stage-m2');
const stageCmd = document.getElementById('stage-cmd');
const stageTerminal = document.getElementById('stage-terminal');

pipelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pipelineBtns.forEach(b => {
            b.classList.remove('active');
            b.classList.add('bg-emeraldTheme-surface/40');
        });

        btn.classList.add('active');
        btn.classList.remove('bg-emeraldTheme-surface/40');

        const key = btn.getAttribute('data-stage');
        const data = stageData[key];

        if (data) {
            stageTag.textContent = data.tag;
            stageTitle.textContent = data.title;
            stageDesc.textContent = data.desc;
            stageM1.textContent = data.m1;
            stageM2.textContent = data.m2;
            stageCmd.textContent = data.cmd;
            stageTerminal.innerHTML = data.term.map(line => `<div>${line}</div>`).join('');
        }
    });
});

// Interactive Calculator
const sliderVol = document.getElementById('calc-vol-slider');
const sliderLat = document.getElementById('calc-lat-slider');
const volText = document.getElementById('calc-vol-text');
const latText = document.getElementById('calc-lat-text');
const resSavings = document.getElementById('calc-savings');
const resLat = document.getElementById('calc-new-lat');

function updateCalculator() {
    const vol = parseInt(sliderVol.value);
    const lat = parseInt(sliderLat.value);

    volText.textContent = `${vol} Million`;
    latText.textContent = `${lat} ms`;

    const savings = Math.round(vol * 280 + lat * 16);
    const newLat = (lat * 0.002).toFixed(2);

    resSavings.textContent = `$${savings.toLocaleString()}`;
    resLat.textContent = `${newLat} ms`;
}

if (sliderVol && sliderLat) {
    sliderVol.addEventListener('input', updateCalculator);
    sliderLat.addEventListener('input', updateCalculator);
}