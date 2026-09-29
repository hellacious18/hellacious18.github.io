/**
 * ==========================================================================
 * HELLY'S ARCHIVE - INTERACTIVE SCRIPT
 * ==========================================================================
 * 
 * Modules:
 * 1. Scroll Position Reset on Refresh
 * 2. Asset Manifests (Illustration Stickers, Logos, Certificates)
 * 3. App Lifecycle
 * 4. Custom Magical Cursor Tracking
 * 5. Scattered Background Stickers Engine
 * 6. Responsive Resize Handling
 * 7. Arsenal Multi-Phase Scroll Timeline
 *    - Phase 1: Card stacking on left -> Tech Stack logos fly in from right
 *    - Phase 2: Slow scroll-driven absorption of all logos into Tech Stack book
 *    - Phase 3: Card 2 (Accolades) promotes to top -> Certificates fly in from right
 * 8. Non-Overlapping Showcase Placement Engine
 */

// ==========================================================================
// 1. SCROLL POSITION RESET ON PAGE REFRESH
// ==========================================================================

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});


// ==========================================================================
// 2. ASSET MANIFESTS
// ==========================================================================

// Primary Illustration Stickers (13 Unique Assets - badge reserved for Work heading)
const SVG_ASSETS = [
  { name: 'butterfly', file: 'assets/butterfly.svg', baseWidth: 125, baseHeight: 125 },
  { name: 'castle', file: 'assets/castle.svg', baseWidth: 140, baseHeight: 140 },
  { name: 'clock', file: 'assets/clock.svg', baseWidth: 125, baseHeight: 125 },
  { name: 'crown', file: 'assets/crown.svg', baseWidth: 120, baseHeight: 120 },
  { name: 'eyes', file: 'assets/eyes.svg', baseWidth: 125, baseHeight: 125 },
  { name: 'flower', file: 'assets/flower.svg', baseWidth: 120, baseHeight: 120 },
  { name: 'key', file: 'assets/key.svg', baseWidth: 110, baseHeight: 110 },
  { name: 'lamp', file: 'assets/lamp.svg', baseWidth: 120, baseHeight: 120 },
  { name: 'mirror', file: 'assets/mirror.svg', baseWidth: 125, baseHeight: 125 },
  { name: 'moon', file: 'assets/moon.svg', baseWidth: 120, baseHeight: 120 },
  { name: 'pen', file: 'assets/pen.svg', baseWidth: 104, baseHeight: 156 },
  { name: 'poison', file: 'assets/poison.svg', baseWidth: 118, baseHeight: 118 },
  { name: 'sun', file: 'assets/sun.svg', baseWidth: 135, baseHeight: 135 }
];

// Technical Arsenal Logos (12 Unique Brand & Tool Assets with uniform aspect-correct dimensions)
const LOGO_ASSETS = [
  { id: 'android', name: 'Android', file: 'assets/logo/android_logo.svg', baseWidth: 135, baseHeight: 26 },
  { id: 'android-studio', name: 'Android Studio', file: 'assets/logo/lg-661b2243e2959-Android-Studio.webp', baseWidth: 44, baseHeight: 44 },
  { id: 'kotlin', name: 'Kotlin', file: 'assets/logo/Kotlin Logo.svg', baseWidth: 108, baseHeight: 30 },
  { id: 'python', name: 'Python', file: 'assets/logo/python-logo-only.svg', baseWidth: 102, baseHeight: 30 },
  { id: 'play-console', name: 'Google Play Console', file: 'assets/logo/Google_Play_Console.svg', baseWidth: 138, baseHeight: 22 },
  { id: 'antigravity', name: 'Google Antigravity', file: 'assets/logo/Google_Antigravity_Logo_2025.svg', baseWidth: 146, baseHeight: 20 },
  { id: 'figma', name: 'Figma', file: 'assets/logo/Figma Lockup.svg', baseWidth: 72, baseHeight: 44 },
  { id: 'github', name: 'GitHub', file: 'assets/logo/GitHub_Lockup_Black_Clearspace.svg', baseWidth: 108, baseHeight: 30 },
  { id: 'postman', name: 'Postman', file: 'assets/logo/Postman-logo-orange-2021.svg', baseWidth: 108, baseHeight: 33 },
  { id: 'firebase', name: 'Firebase', file: 'assets/logo/Primary_Horizontal_Lockup_Full_Color.svg', baseWidth: 112, baseHeight: 30 },
  { id: 'gradle', name: 'Gradle', file: 'assets/logo/logo-stacked-mono-dark.svg', baseWidth: 68, baseHeight: 43 },
  { id: 'canva', name: 'Canva', file: 'assets/logo/canva-com-brandmark.jpg', baseWidth: 104, baseHeight: 34 }
];

// Industry Accolades & Credentials with Direct Links
const CERTIFICATE_ASSETS = [
  {
    id: 'kotlin-cert',
    name: 'Kotlin Professional Certificate',
    issuer: 'LinkedIn Learning',
    file: 'assets/certificates/kotlin.png',
    url: 'https://www.linkedin.com/learning/certificates/40983a6911fea389901c3c26e4e2055d272e59f21fa61f0bdb90ad57405d237f?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BHGH%2F3EbiR9mI1QtrP3kE%2Bw%3D%3D',
    baseWidth: 260,
    baseHeight: 200
  },
  {
    id: 'cloud-architect',
    name: 'Google Cloud Certified',
    issuer: 'Google Cloud · Credly',
    file: 'assets/certificates/cloud.png',
    url: 'https://www.credly.com/badges/b752088a-70c5-4854-b49a-97ea5804d2c6/linked_in_profile',
    baseWidth: 260,
    baseHeight: 200
  },
  {
    id: 'claude-cert',
    name: 'Claude Certification',
    issuer: 'Anthropic · Skilljar',
    file: 'assets/certificates/claude.png',
    url: 'https://verify.skilljar.com/c/qmokcstx4gb6',
    baseWidth: 260,
    baseHeight: 200
  },
  {
    id: 'store-listing-cert',
    name: 'Google Play Store Listing',
    issuer: 'Google Play Academy',
    file: 'assets/certificates/playstore.png',
    url: 'https://www.credential.net/40e1010e-79a1-4a14-b89b-3e2a823712e8#acc.5ZyjAlKs',
    baseWidth: 260,
    baseHeight: 200
  }
];

// Beyond The Code - 3 Offline Moments in Large Authentic Polaroid Format (No Captions)
const PHOTO_ASSETS = [
  {
    id: 'photo-1',
    file: 'assets/photos/IMG_20260908_145338.jpg.jpeg',
    baseWidth: 245,
    baseHeight: 300
  },
  {
    id: 'photo-2',
    file: 'assets/photos/PXL_20260516_094730689~2.jpg',
    baseWidth: 245,
    baseHeight: 300
  },
  {
    id: 'photo-3',
    file: 'assets/photos/PXL_20260524_054446499~3.jpg',
    baseWidth: 245,
    baseHeight: 300
  }
];


// ==========================================================================
// 3. APP LIFECYCLE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  initCustomCursor();
  initRandomStickers();
  initRotatingKeywords();
  initNavSmoothScroll();
  initCardScrollStack();
  initProjectGallery();
  initEmailCopy();
});

function initNavSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const targetOffset = targetEl.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: targetOffset, behavior: 'instant' });
        }
      }
    });
  });
}


// ==========================================================================
// 3b. ROTATING HIGHLIGHTED KEYWORDS ENGINE
// ==========================================================================

function initRotatingKeywords() {
  const wordEl = document.getElementById('rotating-keyword');
  const badgeEl = document.querySelector('.highlight-badge');
  if (!wordEl || !badgeEl) return;

  const keywords = [
    'SEAMLESS',
    'NATIVE FIRST',
    'INTELLIGENT',
    'PRODUCTION READY',
    'PLAYFUL',
    'EXPRESSIVE',
    'SCALABLE',
    'MODERN'
  ];

  let currentIndex = 0;

  setInterval(() => {
    badgeEl.classList.add('transitioning');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % keywords.length;
      wordEl.textContent = keywords[currentIndex];
      badgeEl.classList.remove('transitioning');
    }, 280);
  }, 2600);
}


// ==========================================================================
// 4. CUSTOM ARROW CURSOR
// ==========================================================================

function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches) return;

  window.addEventListener('pointermove', (e) => {
    cursor.classList.add('visible');
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
  });

  document.addEventListener('mouseenter', () => {
    cursor.classList.add('visible');
  });
}


// ==========================================================================
// 5. DYNAMIC BORDER STICKERS ENGINE (LEFT & RIGHT PARALLAX BORDERS)
// ==========================================================================

let stickerParallaxTicking = false;
let trackLeftEl = null;
let trackRightEl = null;
const BORDER_PARALLAX_FACTOR = 0.35; // Stickers scroll up slowly relative to normal scroll

function initRandomStickers() {
  const container = document.getElementById('stickers-container');
  if (!container) return;

  container.innerHTML = `
    <div class="stickers-border-track track-left" id="stickers-track-left"></div>
    <div class="stickers-border-track track-right" id="stickers-track-right"></div>
  `;

  trackLeftEl = document.getElementById('stickers-track-left');
  trackRightEl = document.getElementById('stickers-track-right');

  const windowW = window.innerWidth || document.documentElement.clientWidth;
  const windowH = window.innerHeight || document.documentElement.clientHeight;
  const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 4000);

  const contactSection = document.getElementById('contact');
  const contactTop = contactSection ? contactSection.offsetTop : (docH - windowH);

  // Sticker sizing based on viewport (enlarged for prominence)
  const baseScale = Math.min(1.2, Math.max(0.85, windowW / 1200));
  // Bound track height strictly before the contact section
  const maxTrackHeight = Math.max(windowH * 0.8, (contactTop - 80) * BORDER_PARALLAX_FACTOR);

  // Distribute all 13 unique sticker assets across left and right borders without ANY repetition
  const shuffledAssets = [...SVG_ASSETS].sort(() => Math.random() - 0.5);
  const leftAssets = [];
  const rightAssets = [];
  shuffledAssets.forEach((asset, idx) => {
    if (idx % 2 === 0) {
      leftAssets.push(asset);
    } else {
      rightAssets.push(asset);
    }
  });

  // Helper to create sticker item with increased size
  function createBorderSticker(asset, yPos, side, index) {
    const itemWidth = Math.round(asset.baseWidth * baseScale * 0.95);
    const itemHeight = Math.round(asset.baseHeight * baseScale * 0.95);
    const rotation = (Math.random() * 26 - 13).toFixed(1);
    const animOffset = (Math.random() * 4).toFixed(2);
    const animDuration = (3.5 + Math.random() * 2).toFixed(2);

    const el = document.createElement('div');
    el.className = 'sticker-item';
    el.style.width = `${itemWidth}px`;
    el.style.height = `${itemHeight}px`;
    el.style.top = `${yPos}px`;

    // Randomize side border offset between 50px and 200px for each sticker
    const isMobile = window.innerWidth <= 640;
    const sideOffset = isMobile ? 14 : Math.round(50 + Math.random() * 150);

    if (side === 'left') {
      el.style.left = `${sideOffset}px`;
    } else {
      el.style.right = `${sideOffset}px`;
    }

    const startX = side === 'left' ? -(sideOffset + 180) : (sideOffset + 180);
    const startY = Math.round(Math.random() * 100 - 50);
    const startRot = (parseFloat(rotation) + (side === 'left' ? -35 : 35)).toFixed(1);

    el.style.setProperty('--rot', `${rotation}deg`);
    el.style.setProperty('--start-x', `${startX}px`);
    el.style.setProperty('--start-y', `${startY}px`);
    el.style.setProperty('--start-rot', `${startRot}deg`);

    const inner = document.createElement('div');
    inner.className = 'sticker-inner floating';
    inner.style.animationDelay = `-${animOffset}s`;
    inner.style.animationDuration = `${animDuration}s`;

    const img = document.createElement('img');
    img.src = asset.file;
    img.alt = asset.name;
    img.draggable = false;

    inner.appendChild(img);
    el.appendChild(inner);

    setTimeout(() => {
      requestAnimationFrame(() => {
        el.classList.add('loaded');
      });
    }, 40 + index * 50);

    return el;
  }

  // Populate Left Track (No Repeats)
  const leftSpacing = leftAssets.length > 1 ? (maxTrackHeight - 80) / (leftAssets.length - 1) : 240;
  leftAssets.forEach((asset, i) => {
    const yPos = Math.round(40 + i * leftSpacing);
    if (yPos > maxTrackHeight) return;
    const sticker = createBorderSticker(asset, yPos, 'left', i);
    trackLeftEl.appendChild(sticker);
  });

  // Populate Right Track (No Repeats, staggered spacing)
  const rightSpacing = rightAssets.length > 1 ? (maxTrackHeight - 80) / (rightAssets.length - 1) : 240;
  const rightStagger = Math.round(rightSpacing * 0.5);
  rightAssets.forEach((asset, i) => {
    const yPos = Math.round(40 + rightStagger + i * rightSpacing);
    if (yPos > maxTrackHeight) return;
    const sticker = createBorderSticker(asset, yPos, 'right', i);
    trackRightEl.appendChild(sticker);
  });

  updateStickerParallax();
}

function updateStickerParallax() {
  if (!trackLeftEl || !trackRightEl) return;
  const container = document.getElementById('stickers-container');
  const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  const translateY = -scrollY * BORDER_PARALLAX_FACTOR;
  trackLeftEl.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
  trackRightEl.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;

  // Smoothly fade out stickers completely when entering contact section and below
  const contactSection = document.getElementById('contact');
  if (contactSection && container) {
    const contactRect = contactSection.getBoundingClientRect();
    const windowH = window.innerHeight || document.documentElement.clientHeight;

    if (contactRect.top < windowH) {
      const fadeDist = windowH * 0.35;
      const progress = Math.max(0, Math.min(1, (windowH - contactRect.top) / fadeDist));
      const opacity = 1 - progress;
      container.style.opacity = opacity <= 0.01 ? '0' : opacity.toFixed(3);
      container.style.pointerEvents = opacity <= 0.05 ? 'none' : 'auto';
    } else {
      container.style.opacity = '1';
      container.style.pointerEvents = 'auto';
    }
  }
}

window.addEventListener('scroll', () => {
  if (!stickerParallaxTicking) {
    requestAnimationFrame(() => {
      updateStickerParallax();
      stickerParallaxTicking = false;
    });
    stickerParallaxTicking = true;
  }
}, { passive: true });


// ==========================================================================
// 6. RESPONSIVE WINDOW RESIZE HANDLING
// ==========================================================================

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initRandomStickers();
  }, 250);
});


// ==========================================================================
// 7. MULTI-PHASE ARSENAL SCROLL TIMELINE ENGINE
// ==========================================================================

let renderedShowcaseType = null;
let logoElementsCache = [];

function initCardScrollStack() {
  const section = document.getElementById('arsenal');
  const container = document.querySelector('.arsenal-cards-container');
  const headingWrapper = document.querySelector('.section-heading-wrapper');
  const subtitle = document.querySelector('.section-subtitle');
  const card1 = document.querySelector('.card-tech-stack');
  const card2 = document.querySelector('.card-accomplished');
  const card3 = document.querySelector('.card-beyond');

  if (!section || !container || !card1 || !card2 || !card3) return;

  let ticking = false;

  function updateStack() {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight || document.documentElement.clientHeight;

    // Calibrated scroll distance matching 350vh section height
    const scrollDistance = windowH * 2.5;
    const rawProgress = (-rect.top) / scrollDistance;
    const progress = Math.max(0, Math.min(1, rawProgress));

    // Stacking convergence: progress 0.00 -> 0.16
    const stackProgress = Math.max(0, Math.min(1, progress / 0.16));
    const stackEased = stackProgress < 0.5
      ? 2 * stackProgress * stackProgress
      : 1 - Math.pow(-2 * stackProgress + 2, 2) / 2;

    container.style.setProperty('--stack-progress', stackEased.toFixed(4));
    section.style.setProperty('--stack-progress', stackEased.toFixed(4));

    if (headingWrapper) {
      headingWrapper.style.pointerEvents = stackEased > 0.6 ? 'none' : 'auto';
    }
    if (subtitle) {
      subtitle.style.pointerEvents = stackEased > 0.6 ? 'none' : 'auto';
    }

    const isMobile = window.innerWidth <= 640;
    if (isMobile) {
      card1.style.setProperty('--shift-x', `0px`);
      card1.style.setProperty('--shift-y', `0px`);
      card1.style.setProperty('--shift-rot', `${(-2).toFixed(1)}deg`);

      card2.style.setProperty('--shift-x', `0px`);
      card2.style.setProperty('--shift-y', `0px`);
      card2.style.setProperty('--shift-rot', `${(1.5).toFixed(1)}deg`);

      card3.style.setProperty('--shift-x', `0px`);
      card3.style.setProperty('--shift-y', `0px`);
      card3.style.setProperty('--shift-rot', `${(-1.5).toFixed(1)}deg`);
    } else {
      const r1 = card1.offsetLeft;
      const r2 = card2.offsetLeft;
      const r3 = card3.offsetLeft;

      const stackLeftPush = Math.min(260, Math.max(140, window.innerWidth * 0.18));
      const shiftX1 = (-stackLeftPush * stackEased);

      const shiftX2 = (r1 - r2 + 18) * stackEased;
      const shiftY2 = (stackEased * 10);

      const shiftX3 = (r1 - r3 + 36) * stackEased;
      const shiftY3 = (stackEased * 20);

      card1.style.setProperty('--shift-x', `${shiftX1.toFixed(1)}px`);
      card1.style.setProperty('--shift-y', `0px`);
      card1.style.setProperty('--shift-rot', `${(-3.5 - stackEased * 3).toFixed(1)}deg`);

      card2.style.setProperty('--shift-x', `${(shiftX2 + shiftX1).toFixed(1)}px`);
      card2.style.setProperty('--shift-y', `${shiftY2.toFixed(1)}px`);
      card2.style.setProperty('--shift-rot', `${(2 + stackEased * 4.5).toFixed(1)}deg`);

      card3.style.setProperty('--shift-x', `${(shiftX3 + shiftX1).toFixed(1)}px`);
      card3.style.setProperty('--shift-y', `${shiftY3.toFixed(1)}px`);
      card3.style.setProperty('--shift-rot', `${(-2.5 + stackEased * 9).toFixed(1)}deg`);
    }

    // ======================================================================
    // STRICT SEQUENTIAL 3-CARD SCROLL TIMELINE:
    // ======================================================================
    // 0.00 - 0.12 : Cards converge to left stack
    // 0.12 - 0.34 : Phase 1 -> Card 1 active on top. Tech Stack logos fly in & float
    // 0.34 - 0.58 : Phase 2 -> Logos absorb between Card 1 and Card 2 book.
    //               At progress >= 0.46, Card 2 elevates & certificates glide in slowly!
    // 0.58 - 0.72 : Phase 2b -> Card 2 active on top. Certificates in full view.
    // 0.72 - 0.90 : Phase 3 -> Certificates absorb into Card 2.
    //               At progress >= 0.80, Card 3 elevates & Polaroid photos glide in!
    // 0.90 - 1.00 : Phase 3b -> Card 3 active on top. Polaroid photos in full view.
    // ======================================================================

    if (progress < 0.12) {
      // Idle before stack & incoming logos
      section.classList.remove('stacked-active');
      clearAllShowcase();
      setCardLayering('none', card1, card2, card3);

    } else if (progress >= 0.12 && progress < 0.34) {
      // Phase 1: Tech Stack Logos Active & Calmly Floating
      section.classList.add('stacked-active');
      setCardLayering('tech-stack', card1, card2, card3);

      clearCertsShowcase();
      clearPhotosShowcase();
      if (!isLogosRendered()) {
        renderNonOverlappingLogos();
      } else {
        resetLogoAbsorption();
      }

    } else if (progress >= 0.34 && progress < 0.58) {
      // Phase 2: Logos Absorb into Card 1 -> Accolades/Certificates Enter
      section.classList.add('stacked-active');
      clearPhotosShowcase();

      if (!isLogosRendered()) {
        renderNonOverlappingLogos();
      }

      const absorbFraction = Math.max(0, Math.min(1, (progress - 0.34) / (0.50 - 0.34)));
      applyScrollDrivenLogoAbsorption(absorbFraction);

      // When the last logos are about to vanish (progress >= 0.46)
      // Card 2 promotes to top and certificates glide in smoothly
      if (progress >= 0.46) {
        setCardLayering('accomplished', card1, card2, card3);
        if (!isCertsRendered()) {
          renderNonOverlappingCertificates();
        }
        const certFraction = Math.max(0, Math.min(1, (progress - 0.46) / (0.58 - 0.46)));
        applyScrollDrivenCertEntrance(certFraction);
      } else {
        setCardLayering('tech-stack', card1, card2, card3);
        if (isCertsRendered()) {
          clearCertsShowcase();
        }
      }

    } else if (progress >= 0.58 && progress < 0.72) {
      // Phase 2b: Accolades / Certificates in Full View
      section.classList.add('stacked-active');
      setCardLayering('accomplished', card1, card2, card3);

      clearLogosShowcase();
      clearPhotosShowcase();
      if (!isCertsRendered()) {
        renderNonOverlappingCertificates();
      }
      applyScrollDrivenCertEntrance(1.0);

    } else if (progress >= 0.72 && progress < 0.90) {
      // Phase 3: Certificates Absorb into Card 2 -> Polaroids Enter
      section.classList.add('stacked-active');
      clearLogosShowcase();

      if (!isCertsRendered()) {
        renderNonOverlappingCertificates();
      }

      const certAbsorbFraction = Math.max(0, Math.min(1, (progress - 0.72) / (0.84 - 0.72)));
      applyScrollDrivenCertAbsorption(certAbsorbFraction);

      // When last certificate is about to vanish (progress >= 0.80)
      // Card 3 promotes to top and Polaroid photos glide in
      if (progress >= 0.80) {
        setCardLayering('beyond', card1, card2, card3);
        if (!isPhotosRendered()) {
          renderNonOverlappingPhotos();
        }
        const photoFraction = Math.max(0, Math.min(1, (progress - 0.80) / (0.90 - 0.80)));
        applyScrollDrivenPhotoEntrance(photoFraction);
      } else {
        setCardLayering('accomplished', card1, card2, card3);
        if (isPhotosRendered()) {
          clearPhotosShowcase();
        }
      }

    } else if (progress >= 0.90) {
      // Phase 3b: Beyond The Code Polaroids in Full View
      section.classList.add('stacked-active');
      setCardLayering('beyond', card1, card2, card3);

      clearLogosShowcase();
      clearCertsShowcase();
      if (!isPhotosRendered()) {
        renderNonOverlappingPhotos();
      }
      applyScrollDrivenPhotoEntrance(1.0);
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateStack);
      ticking = true;
    }
  }, { passive: true });

  card1.addEventListener('click', () => {
    section.classList.add('stacked-active');
    setCardLayering('tech-stack', card1, card2, card3);
    clearCertsShowcase();
    clearPhotosShowcase();
    if (!isLogosRendered()) renderNonOverlappingLogos();
    resetLogoAbsorption();
  });

  card2.addEventListener('click', () => {
    section.classList.add('stacked-active');
    setCardLayering('accomplished', card1, card2, card3);
    clearLogosShowcase();
    clearPhotosShowcase();
    if (!isCertsRendered()) renderNonOverlappingCertificates();
    applyScrollDrivenCertEntrance(1.0);
  });

  card3.addEventListener('click', () => {
    section.classList.add('stacked-active');
    setCardLayering('beyond', card1, card2, card3);
    clearLogosShowcase();
    clearCertsShowcase();
    if (!isPhotosRendered()) renderNonOverlappingPhotos();
    applyScrollDrivenPhotoEntrance(1.0);
  });

  updateStack();
}

function setCardLayering(category, card1, card2, card3) {
  const stage = document.getElementById('arsenal-showcase');
  const logosLayer = document.getElementById('showcase-logos');
  const certsLayer = document.getElementById('showcase-certs');
  const photosLayer = document.getElementById('showcase-photos');

  card1.classList.toggle('is-active', category === 'tech-stack');
  card2.classList.toggle('is-active', category === 'accomplished');
  card3.classList.toggle('is-active', category === 'beyond');

  // Stickers / Cards are ALWAYS on top of incoming logos, certificates, and photos
  if (stage) stage.style.zIndex = '25';
  if (logosLayer) logosLayer.style.zIndex = '25';
  if (certsLayer) certsLayer.style.zIndex = '25';
  if (photosLayer) photosLayer.style.zIndex = '25';

  if (category === 'tech-stack') {
    card1.style.zIndex = '50';
    card2.style.zIndex = '45';
    card3.style.zIndex = '40';
  } else if (category === 'accomplished') {
    card2.style.zIndex = '50';
    card1.style.zIndex = '45';
    card3.style.zIndex = '40';
  } else if (category === 'beyond') {
    card3.style.zIndex = '50';
    card2.style.zIndex = '45';
    card1.style.zIndex = '40';
  } else {
    card1.style.zIndex = '35';
    card2.style.zIndex = '20';
    card3.style.zIndex = '10';
  }
}


// ==========================================================================
// 8. NON-OVERLAPPING SHOWCASE PLACEMENT & ABSORPTION ENGINE
// ==========================================================================

let logosActive = false;
let certsActive = false;
let photosActive = false;
let certElementsCache = [];
let photoElementsCache = [];
let beyondQuoteCache = null;

function isLogosRendered() {
  const container = document.getElementById('showcase-logos');
  return logosActive && container && container.children.length > 0;
}

function isCertsRendered() {
  const container = document.getElementById('showcase-certs');
  return certsActive && container && container.children.length > 0;
}

function isPhotosRendered() {
  const container = document.getElementById('showcase-photos');
  return photosActive && container && container.children.length > 0;
}

function clearLogosShowcase() {
  const container = document.getElementById('showcase-logos');
  logosActive = false;
  logoElementsCache = [];
  if (container) container.innerHTML = '';
}

function clearCertsShowcase() {
  const container = document.getElementById('showcase-certs');
  certsActive = false;
  certElementsCache = [];
  if (container) container.innerHTML = '';
}

function clearPhotosShowcase() {
  const container = document.getElementById('showcase-photos');
  photosActive = false;
  photoElementsCache = [];
  beyondQuoteCache = null;
  if (container) container.innerHTML = '';
}

function clearAllShowcase() {
  clearLogosShowcase();
  clearCertsShowcase();
  clearPhotosShowcase();
  renderedShowcaseType = null;
}

/**
 * Render 12 Logos with strict 4x3 non-overlapping grid & store absorption metadata
 */
function renderNonOverlappingLogos() {
  const container = document.getElementById('showcase-logos');
  const stage = document.getElementById('arsenal-showcase');
  const card1 = document.querySelector('.card-tech-stack');
  if (!container || !stage || !card1) return;

  if (isLogosRendered()) {
    resetLogoAbsorption();
    return;
  }

  logosActive = true;
  renderedShowcaseType = 'logos';
  container.innerHTML = '';
  logoElementsCache = [];

  const stageRect = stage.getBoundingClientRect();
  const card1Rect = card1.getBoundingClientRect();

  const isMobile = window.innerWidth <= 640;
  const width = Math.max(280, stageRect.width || (isMobile ? window.innerWidth - 16 : window.innerWidth * 0.52));
  const height = Math.max(260, stageRect.height || (isMobile ? 330 : 480));
  const scale = isMobile ? Math.min(0.75, Math.max(0.55, width / 440)) : Math.min(1.05, Math.max(0.72, width / 700));

  // 3 Cols x 4 Rows on mobile, 4 Cols x 3 Rows on desktop
  const cols = isMobile ? 3 : 4;
  const rows = isMobile ? 4 : 3;
  const cellW = width / cols;
  const cellH = height / rows;

  const slots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      slots.push({ r, c });
    }
  }
  slots.sort(() => Math.random() - 0.5);

  const placedBoxes = [];

  LOGO_ASSETS.forEach((logo, index) => {
    const itemWidth = Math.round(logo.baseWidth * scale);
    const itemHeight = Math.round(logo.baseHeight * scale);

    const badgeW = isMobile ? itemWidth + 20 : itemWidth + 36;
    const badgeH = isMobile ? itemHeight + 14 : itemHeight + 20;

    const slot = slots[index % slots.length];
    const slotCenterX = slot.c * cellW + cellW / 2;
    const slotCenterY = slot.r * cellH + cellH / 2;

    const maxJitterX = Math.max(0, (cellW - badgeW) / 2 - 2);
    const maxJitterY = Math.max(0, (cellH - badgeH) / 2 - 2);

    let posX = slotCenterX - badgeW / 2 + (Math.random() * 2 - 1) * maxJitterX;
    let posY = slotCenterY - badgeH / 2 + (Math.random() * 2 - 1) * maxJitterY;

    posX = Math.max(2, Math.min(width - badgeW - 2, posX));
    posY = Math.max(2, Math.min(height - badgeH - 2, posY));

    placedBoxes.push({ x: posX, y: posY, w: badgeW, h: badgeH });

    const rotation = (Math.random() * (isMobile ? 10 : 16) - (isMobile ? 5 : 8)).toFixed(1);
    const animOffset = (Math.random() * 5).toFixed(2);
    const animDuration = (3.5 + Math.random() * 2).toFixed(2);

    const enterX = isMobile
      ? Math.round(width * 0.45 + Math.random() * 40)
      : Math.round(width + 150 + Math.random() * 260);
    const enterY = Math.round((Math.random() - 0.5) * (isMobile ? 80 : 160));
    const enterRot = (parseFloat(rotation) + (Math.random() * 36 - 18)).toFixed(1);

    // Calculate exact vector to Card 1 center (Tech Stack book on the left)
    const logoCenterGlobalX = stageRect.left + posX + badgeW / 2;
    const logoCenterGlobalY = stageRect.top + posY + badgeH / 2;
    const card1CenterGlobalX = card1Rect.left + card1Rect.width / 2;
    const card1CenterGlobalY = card1Rect.top + card1Rect.height / 2;

    const absorbX = Math.round(card1CenterGlobalX - logoCenterGlobalX);
    const absorbY = Math.round(card1CenterGlobalY - logoCenterGlobalY);
    const absorbRot = Math.round(Math.random() * 80 - 40);

    const el = document.createElement('div');
    el.className = 'showcase-item-logo';
    el.style.left = `${posX.toFixed(1)}px`;
    el.style.top = `${posY.toFixed(1)}px`;
    el.style.setProperty('--rot', `${rotation}deg`);
    el.style.setProperty('--enter-x', `${enterX}px`);
    el.style.setProperty('--enter-y', `${enterY}px`);
    el.style.setProperty('--enter-rot', `${enterRot}deg`);
    el.setAttribute('title', logo.name);

    el.innerHTML = `
      <div class="sticker-inner floating" style="animation-delay: -${animOffset}s; animation-duration: ${animDuration}s;">
        <div class="logo-badge-card">
          <div class="logo-img-wrap" style="width: ${itemWidth}px; height: ${itemHeight}px;">
            <img src="${logo.file}" alt="${logo.name}" draggable="false">
          </div>
        </div>
      </div>
    `;

    container.appendChild(el);

    // Cache metadata for real-time scroll interpolation
    logoElementsCache.push({
      el,
      index,
      baseRot: parseFloat(rotation),
      absorbX,
      absorbY,
      absorbRot
    });

    setTimeout(() => {
      requestAnimationFrame(() => {
        el.classList.add('is-entered');
      });
    }, 40 + index * 40);
  });
}

/**
 * Real-time scroll-driven absorption: logos smoothly travel into Card 1 gap at user's scroll pace
 */
function applyScrollDrivenLogoAbsorption(fraction) {
  const clampedFraction = Math.max(0, Math.min(1, fraction));
  const total = logoElementsCache.length || 12;

  logoElementsCache.forEach((item) => {
    const { el, index, baseRot, absorbX, absorbY, absorbRot } = item;

    // Stagger wave so logos flow naturally between Card 1 & Card 2 as user scrolls
    const waveStart = (index / total) * 0.45;
    const itemProg = Math.max(0, Math.min(1, (clampedFraction - waveStart) / 0.55));

    // Smooth cubic easing
    const ease = itemProg * itemProg * (3 - 2 * itemProg);

    const curX = absorbX * ease;
    const curY = absorbY * ease;
    const curScale = Math.max(0.02, 1.0 - ease * 0.96);
    const curRot = baseRot + (absorbRot - baseRot) * ease;
    const curOpacity = Math.max(0, Math.min(1, 1.0 - ease * 1.35));
    const curBlur = `${(ease * 3).toFixed(1)}px`;

    el.classList.add('is-absorbing');
    el.style.setProperty('--dyn-tx', `${curX.toFixed(1)}px`);
    el.style.setProperty('--dyn-ty', `${curY.toFixed(1)}px`);
    el.style.setProperty('--dyn-scale', curScale.toFixed(3));
    el.style.setProperty('--dyn-rot', `${curRot.toFixed(1)}deg`);
    el.style.setProperty('--dyn-opacity', curOpacity.toFixed(3));
    el.style.setProperty('--dyn-blur', curBlur);
  });
}

/**
 * Reset absorption so logos float in their natural positions
 */
function resetLogoAbsorption() {
  logoElementsCache.forEach((item) => {
    item.el.classList.remove('is-absorbing');
    item.el.classList.add('is-entered');
    item.el.style.removeProperty('--dyn-tx');
    item.el.style.removeProperty('--dyn-ty');
    item.el.style.removeProperty('--dyn-scale');
    item.el.style.removeProperty('--dyn-rot');
    item.el.style.removeProperty('--dyn-opacity');
    item.el.style.removeProperty('--dyn-blur');
  });
}

/**
 * Render 4 Certificates with stored metadata for slow scroll-driven entrance
 */
function renderNonOverlappingCertificates() {
  const container = document.getElementById('showcase-certs');
  const stage = document.getElementById('arsenal-showcase');
  const card2 = document.querySelector('.card-accomplished');
  if (!container || !stage) return;

  if (isCertsRendered()) return;

  certsActive = true;
  renderedShowcaseType = 'certificates';
  container.innerHTML = '';
  certElementsCache = [];

  const stageRect = stage.getBoundingClientRect();
  const card2Rect = card2 ? card2.getBoundingClientRect() : { left: 0, top: 0, width: 200, height: 200 };
  const isMobile = window.innerWidth <= 640;
  const width = Math.max(280, stageRect.width || (isMobile ? window.innerWidth - 16 : window.innerWidth * 0.52));
  const height = Math.max(260, stageRect.height || (isMobile ? 330 : 480));
  const scale = isMobile ? Math.min(0.55, Math.max(0.44, (width - 24) / 540)) : Math.min(1.05, Math.max(0.68, width / 720));

  const cols = 2;
  const rows = 2;
  const cellW = (width - 16) / cols;
  const cellH = (height - 16) / rows;

  CERTIFICATE_ASSETS.forEach((cert, index) => {
    const itemWidth = Math.round(cert.baseWidth * scale);
    const itemHeight = Math.round(cert.baseHeight * scale);

    const col = index % cols;
    const row = Math.floor(index / cols);

    const posX = isMobile
      ? Math.round(6 + col * cellW + (cellW - itemWidth) / 2)
      : Math.max(8, Math.min(width - itemWidth - 8, col * cellW + 12 + (Math.random() * 16 - 8)));
    const posY = isMobile
      ? Math.round(6 + row * cellH + (cellH - itemHeight) / 2)
      : Math.max(8, Math.min(height - itemHeight - 8, row * cellH + 8 + (Math.random() * 12 - 6)));

    const rotation = isMobile ? (index % 2 === 0 ? -1.5 : 1.5) : (Math.random() * 8 - 4).toFixed(1);
    const animOffset = (Math.random() * 4).toFixed(2);
    const animDuration = (4 + Math.random() * 2).toFixed(2);

    const enterX = isMobile
      ? Math.round(width * 0.45 + index * 25)
      : Math.round(width + 180 + index * 60);
    const enterY = Math.round((Math.random() - 0.5) * (isMobile ? 60 : 120));
    const enterRot = (parseFloat(rotation) + (Math.random() * (isMobile ? 12 : 24) - (isMobile ? 6 : 12))).toFixed(1);

    // Vector to Card 2 center for phase 3 absorption
    const certCenterGlobalX = stageRect.left + posX + itemWidth / 2;
    const certCenterGlobalY = stageRect.top + posY + itemHeight / 2;
    const card2CenterGlobalX = card2Rect.left + card2Rect.width / 2;
    const card2CenterGlobalY = card2Rect.top + card2Rect.height / 2;

    const absorbX = Math.round(card2CenterGlobalX - certCenterGlobalX);
    const absorbY = Math.round(card2CenterGlobalY - certCenterGlobalY);
    const absorbRot = Math.round(Math.random() * 60 - 30);

    const el = document.createElement('div');
    el.className = 'showcase-item-cert';
    el.style.width = `${itemWidth}px`;
    el.style.height = `${itemHeight}px`;
    el.style.left = `${posX.toFixed(1)}px`;
    el.style.top = `${posY.toFixed(1)}px`;
    el.style.setProperty('--rot', `${rotation}deg`);
    el.style.setProperty('--enter-x', `${enterX}px`);
    el.style.setProperty('--enter-y', `${enterY}px`);
    el.style.setProperty('--enter-rot', `${enterRot}deg`);
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'link');
    el.setAttribute('aria-label', `${cert.name} by ${cert.issuer} - Open credential`);

    el.innerHTML = `
      <div class="sticker-inner" style="width: 100%; height: 100%;">
        <div class="cert-frame-card">
          <img src="${cert.file}" alt="${cert.name}" draggable="false">
          <div class="cert-overlay-badge">
            <span class="cert-overlay-title">${cert.name}</span>
            <span class="cert-overlay-issuer">${cert.issuer}</span>
          </div>
        </div>
      </div>
    `;

    // Direct link redirection (no modal preview)
    el.addEventListener('click', () => {
      if (cert.url) {
        window.open(cert.url, '_blank', 'noopener,noreferrer');
      }
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (cert.url) {
          window.open(cert.url, '_blank', 'noopener,noreferrer');
        }
      }
    });

    container.appendChild(el);

    certElementsCache.push({
      el,
      index,
      targetRot: parseFloat(rotation),
      enterX,
      enterY,
      enterRot: parseFloat(enterRot),
      absorbX,
      absorbY,
      absorbRot
    });
  });
}

/**
 * Real-time scroll-driven certificate entrance: certificates slowly glide in at user's scroll speed
 */
function applyScrollDrivenCertEntrance(fraction) {
  const clampedFraction = Math.max(0, Math.min(1, fraction));
  const total = certElementsCache.length || 4;

  certElementsCache.forEach((item) => {
    const { el, index, targetRot, enterX, enterY, enterRot } = item;

    // Stagger so certificates glide in progressively and gently
    const itemStart = (index / total) * 0.35;
    const itemProg = Math.max(0, Math.min(1, (clampedFraction - itemStart) / 0.65));

    // Smooth cubic easing
    const ease = itemProg * itemProg * (3 - 2 * itemProg);

    if (ease >= 0.999) {
      el.classList.remove('is-scroll-entering');
      el.classList.add('is-entered');
      el.style.removeProperty('--dyn-tx');
      el.style.removeProperty('--dyn-ty');
      el.style.removeProperty('--dyn-scale');
      el.style.removeProperty('--dyn-rot');
      el.style.removeProperty('--dyn-opacity');
    } else {
      el.classList.remove('is-entered');
      el.classList.add('is-scroll-entering');

      const curTx = enterX * (1 - ease);
      const curTy = enterY * (1 - ease);
      const curScale = 0.85 + 0.15 * ease;
      const curRot = enterRot * (1 - ease) + targetRot * ease;
      const curOpacity = ease;

      el.style.setProperty('--dyn-tx', `${curTx.toFixed(1)}px`);
      el.style.setProperty('--dyn-ty', `${curTy.toFixed(1)}px`);
      el.style.setProperty('--dyn-scale', curScale.toFixed(3));
      el.style.setProperty('--dyn-rot', `${curRot.toFixed(1)}deg`);
      el.style.setProperty('--dyn-opacity', curOpacity.toFixed(3));
    }
  });
}

/**
 * Real-time scroll-driven absorption: certificates absorb into Card 2 gap
 */
function applyScrollDrivenCertAbsorption(fraction) {
  const clampedFraction = Math.max(0, Math.min(1, fraction));
  const total = certElementsCache.length || 4;

  certElementsCache.forEach((item) => {
    const { el, index, targetRot, absorbX, absorbY, absorbRot } = item;

    const itemStart = (index / total) * 0.40;
    const itemProg = Math.max(0, Math.min(1, (clampedFraction - itemStart) / 0.60));
    const ease = itemProg * itemProg * (3 - 2 * itemProg);

    const curX = absorbX * ease;
    const curY = absorbY * ease;
    const curScale = Math.max(0.04, 1.0 - ease * 0.94);
    const curRot = targetRot + (absorbRot - targetRot) * ease;
    const curOpacity = Math.max(0, Math.min(1, 1.0 - ease * 1.3));

    el.classList.remove('is-entered');
    el.classList.add('is-scroll-entering');
    el.style.setProperty('--dyn-tx', `${curX.toFixed(1)}px`);
    el.style.setProperty('--dyn-ty', `${curY.toFixed(1)}px`);
    el.style.setProperty('--dyn-scale', curScale.toFixed(3));
    el.style.setProperty('--dyn-rot', `${curRot.toFixed(1)}deg`);
    el.style.setProperty('--dyn-opacity', curOpacity.toFixed(3));
  });
}

/**
 * Render 3 Polaroid Photos with guaranteed zero overlap and washi tape details
 */
function renderNonOverlappingPhotos() {
  const container = document.getElementById('showcase-photos');
  const stage = document.getElementById('arsenal-showcase');
  if (!container || !stage) return;

  if (isPhotosRendered()) return;

  photosActive = true;
  renderedShowcaseType = 'photos';
  container.innerHTML = '';
  photoElementsCache = [];

  const stageRect = stage.getBoundingClientRect();
  const isMobile = window.innerWidth <= 640;
  const width = Math.max(280, stageRect.width || (isMobile ? window.innerWidth - 16 : window.innerWidth * 0.52));
  const height = Math.max(260, stageRect.height || (isMobile ? 330 : 480));

  // Divide width into 3 dedicated zones
  const cols = 3;
  const colWidth = (width - 12) / cols;
  const itemWidth = isMobile
    ? Math.min(124, Math.max(98, Math.floor(width * 0.32)))
    : Math.min(225, Math.max(160, Math.floor(colWidth - 14)));
  const itemHeight = isMobile
    ? Math.round(itemWidth * 1.18)
    : Math.round(itemWidth * 1.22); // Classic Polaroid aspect ratio

  // Distinct vertical and rotational offsets for organic visual interest with zero overlap
  const layoutConfigs = isMobile
    ? [
        { topOffset: 8, rot: -4.0, tapeRot: -2.5, animDelay: 0.0, animDur: 4.4 },
        { topOffset: 26, rot: 3.0, tapeRot: 2.0, animDelay: 1.4, animDur: 4.8 },
        { topOffset: 10, rot: -3.0, tapeRot: -1.5, animDelay: 2.6, animDur: 4.2 }
      ]
    : [
        { topOffset: Math.max(12, (height - itemHeight) * 0.18), rot: -4.0, tapeRot: -2.5, animDelay: 0.0, animDur: 4.4 },
        { topOffset: Math.max(28, (height - itemHeight) * 0.52), rot: 3.5, tapeRot: 2.0, animDelay: 1.4, animDur: 4.8 },
        { topOffset: Math.max(12, (height - itemHeight) * 0.22), rot: -2.5, tapeRot: -1.0, animDelay: 2.6, animDur: 4.2 }
      ];

  const stepX = isMobile ? (width - itemWidth) / 2 : colWidth;

  PHOTO_ASSETS.forEach((photo, index) => {
    const cfg = layoutConfigs[index % layoutConfigs.length];

    const posX = isMobile
      ? Math.round(index * stepX)
      : Math.round(6 + index * colWidth + (colWidth - itemWidth) / 2);
    const posY = Math.round(cfg.topOffset);

    const rotation = cfg.rot.toFixed(1);
    const tapeRot = cfg.tapeRot.toFixed(1);

    const enterX = isMobile
      ? Math.round(width * 0.45 + index * 25)
      : Math.round(width + 160 + index * 80);
    const enterY = Math.round((Math.random() - 0.5) * (isMobile ? 60 : 120));
    const enterRot = (parseFloat(rotation) + (Math.random() * (isMobile ? 12 : 24) - (isMobile ? 6 : 12))).toFixed(1);

    const el = document.createElement('div');
    el.className = 'showcase-item-photo';
    el.style.width = `${itemWidth}px`;
    el.style.height = 'auto';
    el.style.left = `${posX}px`;
    el.style.top = `${posY}px`;
    el.style.setProperty('--rot', `${rotation}deg`);
    el.style.setProperty('--enter-x', `${enterX}px`);
    el.style.setProperty('--enter-y', `${enterY}px`);
    el.style.setProperty('--enter-rot', `${enterRot}deg`);

    el.innerHTML = `
      <div class="sticker-inner floating" style="animation-delay: -${cfg.animDelay}s; animation-duration: ${cfg.animDur}s;">
        <div class="polaroid-card">
          <div class="polaroid-tape" style="--tape-rot: ${tapeRot}deg;"></div>
          <div class="polaroid-photo-frame">
            <img src="${photo.file}" alt="Polaroid snapshot" draggable="false">
          </div>
        </div>
      </div>
    `;

    container.appendChild(el);

    photoElementsCache.push({
      el,
      index,
      targetRot: parseFloat(rotation),
      enterX,
      enterY,
      enterRot: parseFloat(enterRot)
    });
  });

  // Beyond The Code Statement Quote Pill
  const quoteEl = document.createElement('div');
  quoteEl.className = 'beyond-quote-banner';
  quoteEl.innerHTML = `
    <div class="beyond-quote-bubble">
      <span class="beyond-quote-icon">✦</span>
      <p class="beyond-quote-text">Community, design, and real-world event energy shape how I solve problems.</p>
    </div>
  `;
  container.appendChild(quoteEl);
  beyondQuoteCache = quoteEl;
}

/**
 * Real-time scroll-driven Polaroid photo entrance: polaroids slowly glide in at user's scroll speed
 */
function applyScrollDrivenPhotoEntrance(fraction) {
  const clampedFraction = Math.max(0, Math.min(1, fraction));
  const total = photoElementsCache.length || 3;

  photoElementsCache.forEach((item) => {
    const { el, index, targetRot, enterX, enterY, enterRot } = item;

    const itemStart = (index / total) * 0.35;
    const itemProg = Math.max(0, Math.min(1, (clampedFraction - itemStart) / 0.65));
    const ease = itemProg * itemProg * (3 - 2 * itemProg);

    if (ease >= 0.999) {
      el.classList.remove('is-scroll-entering');
      el.classList.add('is-entered');
      el.style.removeProperty('--dyn-tx');
      el.style.removeProperty('--dyn-ty');
      el.style.removeProperty('--dyn-scale');
      el.style.removeProperty('--dyn-rot');
      el.style.removeProperty('--dyn-opacity');
    } else {
      el.classList.remove('is-entered');
      el.classList.add('is-scroll-entering');

      const curTx = enterX * (1 - ease);
      const curTy = enterY * (1 - ease);
      const curScale = 0.85 + 0.15 * ease;
      const curRot = enterRot * (1 - ease) + targetRot * ease;
      const curOpacity = ease;

      el.style.setProperty('--dyn-tx', `${curTx.toFixed(1)}px`);
      el.style.setProperty('--dyn-ty', `${curTy.toFixed(1)}px`);
      el.style.setProperty('--dyn-scale', curScale.toFixed(3));
      el.style.setProperty('--dyn-rot', `${curRot.toFixed(1)}deg`);
      el.style.setProperty('--dyn-opacity', curOpacity.toFixed(3));
    }
  });

  // Animate Beyond quote banner in sync with scroll
  if (beyondQuoteCache) {
    const qProg = Math.max(0, Math.min(1, clampedFraction));
    const qEase = qProg * qProg * (3 - 2 * qProg);
    beyondQuoteCache.style.opacity = qEase.toFixed(3);
    beyondQuoteCache.style.transform = `translateX(-50%) translateY(${(18 * (1 - qEase)).toFixed(1)}px)`;
  }
}

// ==========================================================================
// 10. WORK SHOWCASE: DUAL PROJECT SCROLL TIMELINE & SHARED PHONE CONTROLLER
// ==========================================================================

function initProjectGallery() {
  const stage = document.getElementById('work-showcase-stage');
  const card2048 = document.getElementById('project-card-2048');
  const cardCashe = document.getElementById('project-card-cashe');
  const sharedPhone = document.getElementById('shared-phone-stage');
  const slotRight = document.querySelector('.slot-right');
  const slotLeft = document.querySelector('.slot-left');
  const gallery2048 = document.getElementById('gallery-2048');
  const galleryCashe = document.getElementById('gallery-cashe');
  const btnPrev = document.getElementById('device-btn-prev');
  const btnNext = document.getElementById('device-btn-next');
  const dots = document.querySelectorAll('.phone-pagination-dots .p-dot');

  if (!stage || !sharedPhone || !gallery2048 || !galleryCashe) return;

  let currentProject = '2048'; // '2048' | 'cashe'
  let ticking = false;

  const getActiveGallery = () => (currentProject === '2048' ? gallery2048 : galleryCashe);
  const getSlideWidth = (gallery) => (gallery ? gallery.clientWidth || 208 : 208);

  // Update pagination dots for currently active gallery
  function updateActiveDot() {
    const activeGallery = getActiveGallery();
    if (!activeGallery || !dots.length) return;
    const slideW = getSlideWidth(activeGallery);
    const currentIndex = Math.min(
      dots.length - 1,
      Math.max(0, Math.round(activeGallery.scrollLeft / slideW))
    );
    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === currentIndex);
    });
  }

  // Scroll Timeline Engine
  function updateWorkTimeline() {
    ticking = false;
    const stageRect = stage.getBoundingClientRect();
    const windowH = window.innerHeight || document.documentElement.clientHeight;
    const totalScrollable = stage.offsetHeight - windowH;

    if (totalScrollable <= 0) return;

    const rawProgress = -stageRect.top / totalScrollable;
    const progress = Math.max(0, Math.min(1, rawProgress));

    // Transition Window: 0.32 -> 0.68
    const transStart = 0.32;
    const transEnd = 0.68;
    let t = 0;

    if (progress <= transStart) {
      t = 0;
    } else if (progress >= transEnd) {
      t = 1;
    } else {
      const linearT = (progress - transStart) / (transEnd - transStart);
      // Smooth cubic bezier easing
      t = linearT < 0.5 ? 2 * linearT * linearT : 1 - Math.pow(-2 * linearT + 2, 2) / 2;
    }

    stage.style.setProperty('--project-progress', t.toFixed(4));
    stage.style.setProperty('--card1-exit', t.toFixed(4));
    stage.style.setProperty('--card2-enter', t.toFixed(4));

    if (card2048) {
      card2048.style.pointerEvents = t > 0.5 ? 'none' : 'auto';
    }
    if (cardCashe) {
      cardCashe.style.pointerEvents = t > 0.5 ? 'auto' : 'none';
    }

    // Calculate physical horizontal shift between Right Slot and Left Slot
    if (slotRight && slotLeft) {
      const rectR = slotRight.getBoundingClientRect();
      const rectL = slotLeft.getBoundingClientRect();
      const diffX = (rectL.left + rectL.width / 2) - (rectR.left + rectR.width / 2);
      const shiftX = diffX * t;
      sharedPhone.style.setProperty('--phone-shift-x', `${shiftX.toFixed(1)}px`);
    }

    // Adjust Frame Width & Aspect Ratio to match active screenshot proportions
    const isMobile = window.innerWidth <= 640;
    const baseH = isMobile ? 260 : 370;
    const w2048 = baseH * (9 / 16);
    const wCashe = baseH * (864 / 1872);
    const currentW = w2048 + (wCashe - w2048) * t;
    const currentAspect = (9 / 16) + ((864 / 1872) - (9 / 16)) * t;

    const phoneDevice = document.getElementById('shared-phone-device');
    if (phoneDevice) {
      phoneDevice.style.setProperty('--phone-width', `${currentW.toFixed(1)}px`);
      phoneDevice.style.setProperty('--phone-aspect', `${currentAspect.toFixed(4)}`);
    }

    // Midpoint Screenshot Gallery Switch
    const targetProject = t >= 0.5 ? 'cashe' : '2048';
    if (targetProject !== currentProject) {
      currentProject = targetProject;
      if (currentProject === 'cashe') {
        gallery2048.classList.remove('is-visible');
        galleryCashe.classList.add('is-visible');
      } else {
        galleryCashe.classList.remove('is-visible');
        gallery2048.classList.add('is-visible');
      }
      updateActiveDot();
    }
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateWorkTimeline);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateWorkTimeline();
    updateActiveDot();
  }, { passive: true });

  // Initial timeline sync
  updateWorkTimeline();

  // Navigation Arrow Controls
  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      const active = getActiveGallery();
      if (active) {
        active.scrollBy({ left: -getSlideWidth(active), behavior: 'smooth' });
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.preventDefault();
      const active = getActiveGallery();
      if (active) {
        active.scrollBy({ left: getSlideWidth(active), behavior: 'smooth' });
      }
    });
  }

  // Pagination Dots Click
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      const active = getActiveGallery();
      if (active && !isNaN(targetIndex)) {
        active.scrollTo({
          left: targetIndex * getSlideWidth(active),
          behavior: 'smooth'
        });
      }
    });
  });

  // Attach scroll listeners to both galleries for dot synchronization
  gallery2048.addEventListener('scroll', updateActiveDot, { passive: true });
  galleryCashe.addEventListener('scroll', updateActiveDot, { passive: true });

  // Touch / Mouse Drag & Swipe for both galleries
  [gallery2048, galleryCashe].forEach((gallery) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
      gallery.style.scrollBehavior = 'auto';
      gallery.style.scrollSnapType = 'none';
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        gallery.style.scrollBehavior = 'smooth';
        gallery.style.scrollSnapType = 'x mandatory';
        updateActiveDot();
      }
    });

    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    });

    // Keyboard navigation when focused
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        gallery.scrollBy({ left: -getSlideWidth(gallery), behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        gallery.scrollBy({ left: getSlideWidth(gallery), behavior: 'smooth' });
      }
    });
  });
}

function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const tooltip = document.getElementById('copy-tooltip');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email') || 'rathwahelly@gmail.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (tooltip) {
        tooltip.classList.add('is-visible');
        clearTimeout(copyBtn._copyTimeout);
        copyBtn._copyTimeout = setTimeout(() => {
          tooltip.classList.remove('is-visible');
        }, 2200);
      }
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  });
}
