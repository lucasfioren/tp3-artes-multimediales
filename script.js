const imgDataMap = {
    "xul-palacios": "media/xul-palacios.jpg",
    "xul-contrapunto": "media/xul-contrapunto.jpg",
    "gimenez-2gatos": "media/gimenez-2gatos.jpg",
    "gimenez-nohabra": "media/gimenez-nohabra.jpg",
    "leparc-alquimia338": "media/leparc-alquimia338.jpg",
    "leparc-modulacion48": "media/leparc-modulacion48.jpg",
    "kenneth-paisajecompacto": "media/kenneth-paisajecompacto.jpg",
    "kenneth-paisajesimaginados": "media/kenneth-paisajesimaginados.jpg",
    "yente-curvilinea": "media/yente-curvilinea.jpg",
    "yente-impresionismoabstracto": "media/yente-impresionismoabstracto.jpg",
    "aizenberg-sueño": "media/aizenberg-sueno.jpg",
    "aizenberg-padree": "media/aizenberg-padree.jpg"
};

const authorsData = [
    {
        name: "Xul Solar",
        colorBg: "#3d1f0f",
        bio: "Xul Solar (1887-1963) pintor, inventor, astrólogo y escritor argentino. Creador de un universo místico, lenguajes inventados y arquitecturas imaginarias.",
        works: [
            { title: "Palacios en Bría", year: "1932", style: "Acuarela", key: "xul-palacios" },
            { title: "Contrapunto", year: "1942", style: "Temple", key: "xul-contrapunto" }
        ]
    },
    {
        name: "Edgardo Giménez",
        colorBg: "#4a0f38",
        bio: "Edgardo Giménez (1942) artista, diseñador y escenógrafo argentino, referente clave del arte pop y la vanguardia del Instituto Di Tella con colores vibrantes.",
        works: [
            { title: "Dos gatos y no habrá ninguno igual", year: "1965", style: "Pop Art", key: "gimenez-2gatos" },
            { title: "No habrá más penas ni olvido", year: "1972", style: "Arte Pop Camp", key: "gimenez-nohabra" }
        ]
    },
    {
        name: "Julio Le Parc",
        colorBg: "#0f2f3d",
        bio: "Julio Le Parc (1928) referente fundamental del arte cinético y óptico internacional. Sus obras exploran el movimiento, la luz y la participación activa del espectador.",
        works: [
            { title: "Alquimia 338", year: "1971", style: "Arte Cinético", key: "leparc-alquimia338" },
            { title: "Modulación", year: "1985", style: "Op Art", key: "leparc-modulacion48" }
        ]
    },
    {
        name: "Kenneth Kemble",
        colorBg: "#2b2b1a",
        bio: "Kenneth Kemble (1923–1998) principal exponente del Informalismo argentino. Pionero absoluto en el uso de collages, ensamblajes y materiales de desecho.",
        works: [
            { title: "Paisajes imaginados", year: "1974", style: "Abstracción matérica", key: "kenneth-paisajesimaginados" },
            { title: "Paisaje compacto", year: "1988", style: "Informalismo", key: "kenneth-paisajecompacto" }
        ]
    },
    {
        name: "Yente (Eugenia Crenovich)",
        colorBg: "#1a2b25",
        bio: "Yente (1905–1990) pintora y ensayista, la primera mujer artista en adherir de manera sostenida al arte abstracto en la Argentina desde finales de los años 30.",
        works: [
            { title: "Composición curvilínea", year: "1937", style: "Abstracción Geométrica", key: "yente-curvilinea" },
            { title: "Impresionismo abstracto", year: "1960", style: "Abstracción Libre", key: "yente-impresionismoabstracto" }
        ]
    },
    {
        name: "Roberto Aizenberg",
        colorBg: "#182030",
        bio: "Roberto Aizenberg fue un pintor y escultor surrealista argentino. Fue alumno de Antonio Berni, y tuvo sus comienzos en el surrealismo cuando fue apadrinado por Juan Batlle Planas, alrededor del 1950.",
        works: [
            { title: "Sueño", year: "1968", style: "Surrealismo", key: "aizenberg-sueño" },
            { title: "Padre e hijo", year: "1975", style: "Metafísica", key: "aizenberg-padree" }
        ]
    }
];

const fusionCanvas = document.getElementById('fusion-canvas');
const historicFrame = document.querySelector('.historic-frame');
const leftPanel = document.getElementById('left-panel');
const rightPanel = document.getElementById('right-panel');
const mainSubtitle = document.getElementById('main-subtitle');
const resetBtn = document.getElementById('reset-btn');
const downloadBtn = document.getElementById('download-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

let interactionStarted = false;

// Lógica de cambio de Modo Oscuro / Modo Claro
themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeToggleBtn.textContent = 'Modo Oscuro';
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = 'Modo Claro';
    }
});

function triggerInteractionState() {
    if (!interactionStarted) {
        interactionStarted = true;
        mainSubtitle.classList.add('hidden');
        resetBtn.classList.add('visible');
        downloadBtn.classList.add('visible');
    }
}

function renderCatalogs() {
    leftPanel.innerHTML = '<div class="mobile-drag-handle" id="drag-handle" title="Deslizar panel"></div>';
    rightPanel.innerHTML = '';

    if (window.innerWidth <= 900) {
        authorsData.forEach(author => buildAuthorGroup(author, leftPanel));
        setupMobileSheetBehavior();
    } else {
        const midpoint = Math.ceil(authorsData.length / 2);
        const leftAuthors = authorsData.slice(0, midpoint);
        const rightAuthors = authorsData.slice(midpoint);

        leftAuthors.forEach(author => buildAuthorGroup(author, leftPanel));
        rightAuthors.forEach(author => buildAuthorGroup(author, rightPanel));
    }
}

function setupMobileSheetBehavior() {
    const panel = document.getElementById('left-panel');
    const handle = document.getElementById('drag-handle');

    handle.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('expanded');
    });
}

function buildAuthorGroup(authorObj, container) {
    const groupCard = document.createElement('div');
    groupCard.classList.add('author-group-card');

    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('author-header-wrapper');

    const header = document.createElement('div');
    header.classList.add('author-header');
    header.style.backgroundColor = authorObj.colorBg;
    header.style.color = '#fff';
    header.textContent = authorObj.name;

    const tooltip = document.createElement('div');
    tooltip.classList.add('author-alert-tooltip');
    tooltip.innerHTML = `<strong>${authorObj.name}</strong><br><br>${authorObj.bio.replace(/\n/g, '<br>')}`;
    
    header.addEventListener('click', () => {
        headerWrapper.classList.toggle('active-bio');
    });

    headerWrapper.appendChild(header);
    headerWrapper.appendChild(tooltip);
    groupCard.appendChild(headerWrapper);

    const grid = document.createElement('div');
    grid.classList.add('catalog-grid');

    authorObj.works.forEach(work => {
        const card = document.createElement('div');
        card.classList.add('source-card');
        
        const imageUrl = imgDataMap[work.key] || "media/xul-palacios.jpg";

        card.innerHTML = `
            <div class="card-square-container">
                <img src="${imageUrl}" alt="${work.title}">
                <canvas class="hover-negative-canvas"></canvas>
            </div>
            <div class="color-layers-bar"></div>
            <div class="meta-info-container">
                <div class="meta-title">${work.title}</div>
                <div class="meta-details">
                    <span>${work.year}</span>
                    <span>${work.style}</span>
                </div>
            </div>
        `;

        const containerImg = card.querySelector('.card-square-container');
        const hoverNegCanvas = card.querySelector('.hover-negative-canvas');
        const colorBar = card.querySelector('.color-layers-bar');

        const virtualImg = new Image();
        virtualImg.src = imageUrl;
        
        virtualImg.onload = () => {
            const dominantColors = extractDominantColors(virtualImg, 4);

            dominantColors.forEach(rgbColor => {
                const chip = document.createElement('div');
                chip.classList.add('color-layer-chip');
                chip.style.backgroundColor = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
                chip.title = `Tono rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

                chip.addEventListener('mouseenter', () => {
                    renderColorWithDottedOutline(virtualImg, hoverNegCanvas, rgbColor, 40);
                    containerImg.classList.add('active-negative');
                });

                chip.addEventListener('mouseleave', () => {
                    containerImg.classList.remove('active-negative');
                });

                chip.addEventListener('click', (e) => {
                    e.stopPropagation();
                    triggerInteractionState();
                    const isolatedLayerUrl = generateColorLayerBlob(virtualImg, rgbColor, 40);
                    addPieceToCanvas(isolatedLayerUrl);
                });

                colorBar.appendChild(chip);
            });
        };

        containerImg.addEventListener('mousemove', (e) => {
            const rect = containerImg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = virtualImg.naturalWidth || 300;
            canvas.height = virtualImg.naturalHeight || 300;
            ctx.drawImage(virtualImg, 0, 0);

            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const pixelX = Math.floor(x * scaleX);
            const pixelY = Math.floor(y * scaleY);

            try {
                const pixelData = ctx.getImageData(pixelX, pixelY, 1, 1).data;
                const hoveredRgb = { r: pixelData[0], g: pixelData[1], b: pixelData[2] };
                
                renderColorWithDottedOutline(virtualImg, hoverNegCanvas, hoveredRgb, 35);
                containerImg.classList.add('active-negative');
            } catch (err) {}
        });

        containerImg.addEventListener('mouseleave', () => {
            containerImg.classList.remove('active-negative');
        });

        containerImg.addEventListener('click', (e) => {
            triggerInteractionState();
            const rect = containerImg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = virtualImg.naturalWidth || 300;
            canvas.height = virtualImg.naturalHeight || 300;
            ctx.drawImage(virtualImg, 0, 0);

            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const pixelX = Math.floor(x * scaleX);
            const pixelY = Math.floor(y * scaleY);

            try {
                const pixelData = ctx.getImageData(pixelX, pixelY, 1, 1).data;
                const clickedRgb = { r: pixelData[0], g: pixelData[1], b: pixelData[2] };
                const isolatedLayerUrl = generateColorLayerBlob(virtualImg, clickedRgb, 35);
                addPieceToCanvas(isolatedLayerUrl);
            } catch (err) {
                console.error("Error al procesar el píxel.", err);
            }
        });

        grid.appendChild(card);
    });

    groupCard.appendChild(grid);
    container.appendChild(groupCard);
}

function renderColorWithDottedOutline(img, targetCanvas, targetRgb, tolerance) {
    const ctx = targetCanvas.getContext('2d');
    const w = 150;
    const h = 150;
    targetCanvas.width = w;
    targetCanvas.height = h;

    try {
        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        const matchMask = new Uint8Array(w * h);

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const i = (y * w + x) * 4;
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];

                const dist = Math.sqrt(
                    Math.pow(r - targetRgb.r, 2) + 
                    Math.pow(g - targetRgb.g, 2) + 
                    Math.pow(b - targetRgb.b, 2)
                );

                if (dist <= tolerance) {
                    matchMask[y * w + x] = 1;
                    data[i] = 255 - r;
                    data[i+1] = 255 - g;
                    data[i+2] = 255 - b;
                } else {
                    data[i+3] = 0;
                }
            }
        }

        for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
                const idx = y * w + x;
                if (matchMask[idx] === 1) {
                    const isEdge = (
                        matchMask[idx - 1] === 0 || 
                        matchMask[idx + 1] === 0 || 
                        matchMask[idx - w] === 0 || 
                        matchMask[idx + w] === 0
                    );

                    if (isEdge) {
                        if ((x + y) % 4 === 0) {
                            const i = idx * 4;
                            data[i] = 226;   
                            data[i+1] = 192; 
                            data[i+2] = 104;
                            data[i+3] = 255; 
                        }
                    }
                }
            }
        }

        ctx.putImageData(imgData, 0, 0);
    } catch(e) {
        console.error("CORS taint en canvas", e);
    }
}

function extractDominantColors(img, colorCount) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 40;
    canvas.height = 40;
    
    try {
        ctx.drawImage(img, 0, 0, 40, 40);
        const imgData = ctx.getImageData(0, 0, 40, 40).data;
        const colorMap = {};

        for (let i = 0; i < imgData.length; i += 16) {
            const r = Math.round(imgData[i] / 32) * 32;
            const g = Math.round(imgData[i+1] / 32) * 32;
            const b = Math.round(imgData[i+2] / 32) * 32;
            
            const key = `${r},${g},${b}`;
            colorMap[key] = (colorMap[key] || 0) + 1;
        }

        const sortedColors = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]);
        const result = [];
        for (let i = 0; i < Math.min(colorCount, sortedColors.length); i++) {
            const parts = sortedColors[i].split(',');
            result.push({ r: parseInt(parts[0]), g: parseInt(parts[1]), b: parseInt(parts[2]) });
        }
        return result;
    } catch(e) {
        return [{r: 200, g: 150, b: 100}, {r: 50, g: 100, b: 150}, {r: 200, g: 50, b: 50}, {r: 100, g: 200, b: 100}];
    }
}

function generateColorLayerBlob(img, targetRgb, tolerance) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth || 300;
    canvas.height = img.naturalHeight || 300;
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];

        const distance = Math.sqrt(
            Math.pow(r - targetRgb.r, 2) + 
            Math.pow(g - targetRgb.g, 2) + 
            Math.pow(b - targetRgb.b, 2)
        );

        if (distance > tolerance) {
            data[i+3] = 0;
        }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
}

function addPieceToCanvas(imageUrl) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('collage-piece');

    const img = document.createElement('img');
    img.src = imageUrl;
    wrapper.appendChild(img);

    const sizes = [350, 420, 500, 580, 650];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    wrapper.style.setProperty('--piece-size', `${randomSize}px`);

    const randomX = (Math.random() * 50) - 5; 
    const randomY = (Math.random() * 50) - 5; 
    const rotation = (Math.random() - 0.5) * 35; 

    wrapper.style.left = `${randomX}%`;
    wrapper.style.top = `${randomY}%`;
    wrapper.style.setProperty('--rot', `${rotation}deg`);
    wrapper.style.zIndex = fusionCanvas.children.length + 1;

    fusionCanvas.appendChild(wrapper);
}

resetBtn.addEventListener('click', () => {
    fusionCanvas.innerHTML = '';
    interactionStarted = false;
    mainSubtitle.classList.remove('hidden');
    resetBtn.classList.remove('visible');
    downloadBtn.classList.remove('visible');
});

downloadBtn.addEventListener('click', () => {
    html2canvas(historicFrame, {
        useCORS: true,
        backgroundColor: null,
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'mi-obra-divergencia-artistica.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        console.error("Error al generar la imagen de la obra:", err);
        alert("No se pudo descargar la obra. Inténtalo nuevamente.");
    });
});

window.addEventListener('DOMContentLoaded', () => {
    renderCatalogs();
});

window.addEventListener('resize', () => {
    renderCatalogs();
});