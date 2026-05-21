// ============================================
// CAROUSEL — Spectacular Multi-Effect Transitions
// Pauses on hover/touch so user can read each slide
// No thumbnails, no timer ring, no counter — clean design
// ============================================
var carouselSlides = [
  { img:'assets/slides/slide-01.jpg', title:'Demystifying Steel Slitting', subtitle:'An introduction to how Hero Steels transforms raw mother coils into precision-cut strips for industry.' },
  { img:'assets/slides/slide-02.jpg', title:'The Supply Chain', subtitle:'End customers need narrow, toleranced steel strips. Hero Steels purchases raw mother coils and bridges the gap.' },
  { img:'assets/slides/slide-03.jpg', title:'Mother Coil Specifications', subtitle:'1200\u20131500mm wide, 5\u201320 metric tonnes each, with highly specific material grades and chemical compositions.' },
  { img:'assets/slides/slide-04.jpg', title:'The Slitting Process', subtitle:'Advanced machines pull wide mother coils through rotary knives, cutting into multiple narrow strips matching orders.' },
  { img:'assets/slides/slide-05.jpg', title:'The Manual Problem', subtitle:'Physical cutting is automated by robots \u2014 but deciding which coil to cut for which order is still done entirely by hand.' },
  { img:'assets/slides/slide-06.jpg', title:'The Planner\u2019s Impossible Puzzle', subtitle:'Every day, a planner must manually decide which mother coil gets allocated to which order. Steel is wasted.' },
  { img:'assets/slides/slide-07.jpg', title:'The Perfect Allocation Challenge', subtitle:'Grades must match within \u00b10.05mm. The human brain cannot optimize 5 rigid variables across 1,400 orders.' },
  { img:'assets/slides/slide-08.jpg', title:'The Cost of Yield Loss', subtitle:'Every sub-optimal cut wastes steel sold for pennies. The industry accepts this as \u201cthe cost of doing business.\u201d' },
  { img:'assets/slides/slide-09.jpg', title:'Enter CutSmart', subtitle:'Replaces manual Excel math with a heuristic engine that turns a 2-day headache into a 2-second automated master plan.' },
  { img:'assets/slides/slide-10.jpg', title:'The Engine Pipeline', subtitle:'Validate \u2192 Allocate \u2192 Output. Assigns strips to the best compatible coil in 2 seconds. Yield: 99.9%.' },
  { img:'assets/slides/slide-11.jpg', title:'Strategic Oscillation Algorithm', subtitle:'Packs strips to the brim \u2014 achieving 50% scrap reduction compared to manual planning methods.' },
  { img:'assets/slides/slide-12.jpg', title:'Manual vs CutSmart', subtitle:'1\u20132 days \u2192 2 seconds. Variable waste \u2192 99.9% yield (mathematical maximum). Enforces FIFO.' },
  { img:'assets/slides/slide-13.jpg', title:'The ROI Impact', subtitle:'1% yield improvement \u00d7 10,000 tonnes/month = \u20b940\u201350 Lakhs saved every single month.' },
  { img:'assets/slides/slide-14.jpg', title:'The Complete Flow', subtitle:'Big rolls in \u2192 CutSmart optimizes \u2192 Narrow strips out. Delivered perfectly to customers.' },
  { img:'assets/slides/slide-15.jpg', title:'CutSmart Summary', subtitle:'\u201cTransforming mathematical chaos into 99.9% yield \u2014 telling the factory exactly which roll to cut.\u201d' }
];

(function() {
var M = window.Motion||{}, mAnimate = M.animate, mSpring = M.spring;
var slidesEl = document.getElementById('carousel-slides');
var dotsEl = document.getElementById('carousel-thumbs');
var titleEl = document.getElementById('carousel-title');
var subtitleEl = document.getElementById('carousel-subtitle');
var counterEl = document.getElementById('carousel-counter');
var progressEl = document.getElementById('carousel-progress');
var timerRing = document.getElementById('carousel-timer-ring');
var viewportEl = document.getElementById('carousel-viewport');
var current = 0, isAnimating = false, autoTimer = null, total = carouselSlides.length;
var paused = false;
var fxIdx = 0;
var fxList = ['spring3d','wipe','zoom','glitch','flip','shatter','rotate3d'];

// Build slides
var imgs = carouselSlides.map(function(s, i) {
  var img = document.createElement('img');
  img.src = s.img; img.alt = s.title;
  img.loading = i < 4 ? 'eager' : 'lazy';
  img.style.cssText = 'opacity:'+(i===0?'1':'0')+';transform:scale(1);z-index:'+(i===0?'2':'1');
  if (i===0) { img.classList.add('slide-active-kb'); img.onload=function(){slidesEl.classList.add('loaded');}; }
  slidesEl.appendChild(img);
  return img;
});

// Build minimal dots
if (dotsEl) {
  carouselSlides.forEach(function(s, i) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i===0?' active':'');
    dot.setAttribute('aria-label', 'Slide '+(i+1));
    dot.onclick = function(){ goTo(i); };
    dotsEl.appendChild(dot);
  });
}

// ===== PAUSE ON HOVER / TOUCH =====
viewportEl.addEventListener('mouseenter', function(){ pauseAutoplay(); });
viewportEl.addEventListener('mouseleave', function(){ resumeAutoplay(); });
viewportEl.addEventListener('touchstart', function(){ pauseAutoplay(); }, {passive:true});
viewportEl.addEventListener('touchend', function(){
  setTimeout(function(){ if(paused) resumeAutoplay(); }, 3000);
}, {passive:true});

function pauseAutoplay() { paused = true; clearTimeout(autoTimer); }
function resumeAutoplay() { paused = false; restartTimer(); }

// ===== TRANSITION ENGINE =====
function goTo(idx) {
  if (idx === current || isAnimating) return;
  if (idx < 0) idx = total-1;
  if (idx >= total) idx = 0;
  isAnimating = true;
  var prev = current; current = idx;
  var dir = (idx > prev || (prev===total-1 && idx===0)) ? 1 : -1;
  if (prev===0 && idx===total-1) dir = -1;
  var outI = imgs[prev], inI = imgs[current];
  imgs.forEach(function(im){ im.style.zIndex='1'; im.className=''; im.style.clipPath=''; });
  outI.style.zIndex = '2'; inI.style.zIndex = '3';
  viewportEl.classList.remove('viewport-glow'); void viewportEl.offsetWidth;
  viewportEl.classList.add('viewport-glow');
  var fx = fxList[fxIdx % fxList.length]; fxIdx++;
  try { window['fx_'+fx](outI, inI, dir); } catch(e) { fxCSS(outI, inI, dir); }
  animateText(); updateDots();
  if (!paused) restartTimer();
}

// ===== 7 DRAMATIC EFFECTS =====

// 1. Spring 3D — bouncy 3D rotation with overshoot
window.fx_spring3d = function(o, n, d) {
  if (!mAnimate) return fxCSS(o, n, d);
  mAnimate(o, {opacity:0, transform:'scale(0.78) translateX('+(-100*d)+'px) rotateY('+(12*d)+'deg)'},
    {duration:0.5, easing:[0.55,0,1,1]});
  n.style.cssText = 'opacity:0;transform:scale(1.18) translateX('+(120*d)+'px) rotateY('+(-10*d)+'deg);z-index:3';
  void n.offsetWidth;
  mAnimate(n, {opacity:1, transform:'scale(1) translateX(0px) rotateY(0deg)'},
    {duration:1.0, easing:mSpring({stiffness:100, damping:12, mass:0.9})}
  ).finished.then(function(){done(n);}).catch(function(){done(n);});
};

// 2. Wipe — polygon clip-path curtain with spring
window.fx_wipe = function(o, n, d) {
  if (!mAnimate) return fxCSS(o, n, d);
  mAnimate(o, {opacity:0, transform:'scale(0.95) translateX('+(-40*d)+'px)'}, {duration:0.35});
  var start = d>0 ? 'polygon(100% 0,100% 0,100% 100%,100% 100%)' : 'polygon(0 0,0 0,0 100%,0 100%)';
  n.style.cssText = 'opacity:1;transform:scale(1);z-index:3;clip-path:'+start;
  void n.offsetWidth;
  mAnimate(n, {clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'},
    {duration:0.8, easing:mSpring({stiffness:130, damping:18})}
  ).finished.then(function(){n.style.clipPath=''; done(n);}).catch(function(){done(n);});
};

// 3. Zoom Burst — explosive scale with rotation
window.fx_zoom = function(o, n, d) {
  if (!mAnimate) return fxCSS(o, n, d);
  mAnimate(o, {opacity:0, transform:'scale(1.6) rotate(2deg)'}, {duration:0.35, easing:[0.6,0,1,1]});
  n.style.cssText = 'opacity:0;transform:scale(0.3) rotate(-3deg);z-index:3';
  void n.offsetWidth;
  mAnimate(n, {opacity:1, transform:'scale(1) rotate(0deg)'},
    {duration:0.9, easing:mSpring({stiffness:160, damping:14})}
  ).finished.then(function(){done(n);}).catch(function(){done(n);});
};

// 4. Glitch — digital distortion
window.fx_glitch = function(o, n, d) {
  o.style.transition='opacity 0.1s'; o.style.opacity='0';
  n.style.cssText = 'opacity:1;transform:scale(1);z-index:3';
  n.classList.add('slide-glitch');
  setTimeout(function(){done(n);}, 500);
};

// 5. 3D Card Flip — full Y-axis rotation
window.fx_flip = function(o, n, d) {
  if (!mAnimate) return fxCSS(o, n, d);
  mAnimate(o, {opacity:0, transform:'perspective(800px) rotateY('+(110*d)+'deg) scale(0.7)'},
    {duration:0.4, easing:[0.5,0,0.75,0]});
  n.style.cssText = 'opacity:0;transform:perspective(800px) rotateY('+(-110*d)+'deg) scale(0.7);z-index:3';
  void n.offsetWidth;
  mAnimate(n, {opacity:1, transform:'perspective(800px) rotateY(0deg) scale(1)'},
    {duration:0.8, easing:mSpring({stiffness:130, damping:13})}
  ).finished.then(function(){done(n);}).catch(function(){done(n);});
};

// 6. Shatter — diagonal skew split
window.fx_shatter = function(o, n, d) {
  if (!mAnimate) return fxCSS(o, n, d);
  mAnimate(o, {opacity:0, transform:'scale(0.9) skewX('+(5*d)+'deg) translateX('+(-60*d)+'px)'},
    {duration:0.4, easing:[0.4,0,1,1]});
  n.style.cssText = 'opacity:0;transform:scale(1.1) skewX('+(-8*d)+'deg) translateX('+(80*d)+'px);z-index:3';
  void n.offsetWidth;
  mAnimate(n, {opacity:1, transform:'scale(1) skewX(0deg) translateX(0px)'},
    {duration:0.85, easing:mSpring({stiffness:140, damping:15})}
  ).finished.then(function(){done(n);}).catch(function(){done(n);});
};

// 7. Rotate 3D — X-axis tilt with depth
window.fx_rotate3d = function(o, n, d) {
  if (!mAnimate) return fxCSS(o, n, d);
  mAnimate(o, {opacity:0, transform:'perspective(600px) rotateX('+(15*d)+'deg) translateY('+(50*d)+'px) scale(0.85)'},
    {duration:0.45, easing:[0.4,0,0.2,1]});
  n.style.cssText = 'opacity:0;transform:perspective(600px) rotateX('+(-20*d)+'deg) translateY('+(-60*d)+'px) scale(1.1);z-index:3';
  void n.offsetWidth;
  mAnimate(n, {opacity:1, transform:'perspective(600px) rotateX(0deg) translateY(0px) scale(1)'},
    {duration:0.9, easing:mSpring({stiffness:120, damping:14})}
  ).finished.then(function(){done(n);}).catch(function(){done(n);});
};

// CSS Fallback — still dramatic, never a plain fade
function fxCSS(o, n, d) {
  o.style.transition='all 0.5s cubic-bezier(0.6,0,0.4,1)';
  o.style.opacity='0'; o.style.transform='scale(0.8) translateX('+(-70*d)+'px) rotate('+(3*d)+'deg)';
  n.style.cssText='opacity:0;transform:scale(1.12) translateX('+(80*d)+'px) rotate('+(-2*d)+'deg);z-index:3;transition:none';
  void n.offsetWidth;
  n.style.transition='all 0.75s cubic-bezier(0.16,1,0.3,1)';
  n.style.opacity='1'; n.style.transform='scale(1) translateX(0) rotate(0deg)';
  setTimeout(function(){done(n);}, 800);
}

function done(n) { n.classList.add('slide-active-kb'); isAnimating = false; }

// ===== TEXT & UI =====
function animateText() {
  // Use GSAP for text (reliable, no errors)
  gsap.to(titleEl, {opacity:0, y:-15, duration:0.2, ease:'power2.in', onComplete:function(){
    titleEl.textContent = carouselSlides[current].title;
    gsap.fromTo(titleEl, {opacity:0, y:20, scale:0.95}, {opacity:1, y:0, scale:1, duration:0.5, ease:'back.out(1.4)'});
  }});
  gsap.to(subtitleEl, {opacity:0, y:-10, duration:0.15, ease:'power2.in', onComplete:function(){
    subtitleEl.textContent = carouselSlides[current].subtitle;
    gsap.fromTo(subtitleEl, {opacity:0, y:12}, {opacity:1, y:0, duration:0.45, delay:0.08, ease:'back.out(1.2)'});
  }});
}

function updateDots() {
  if (!dotsEl) return;
  dotsEl.querySelectorAll('.carousel-dot').forEach(function(d,i){ d.classList.toggle('active',i===current); });
}

function restartTimer() {
  if (timerRing) {
    timerRing.style.animation='none'; timerRing.offsetHeight;
    timerRing.classList.remove('timer-running'); void timerRing.offsetWidth;
    timerRing.classList.add('timer-running');
  }
  clearTimeout(autoTimer);
  autoTimer = setTimeout(function(){ if(!paused) goTo(current+1); }, 6000);
}

// ===== CONTROLS =====
function next(){ goTo(current+1); }
function prev(){ goTo(current-1); }
document.getElementById('carousel-prev').onclick = prev;
document.getElementById('carousel-next').onclick = next;
document.getElementById('carousel-prev-mobile').onclick = prev;
document.getElementById('carousel-next-mobile').onclick = next;
document.addEventListener('keydown', function(e){
  var r = document.getElementById('carousel-stage').getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom > 0) {
    if (e.key==='ArrowLeft'){prev();e.preventDefault();}
    if (e.key==='ArrowRight'){next();e.preventDefault();}
  }
});
var tx=0;
viewportEl.addEventListener('touchstart',function(e){tx=e.changedTouches[0].screenX;},{passive:true});
viewportEl.addEventListener('touchend',function(e){
  var dx=tx-e.changedTouches[0].screenX;
  if(Math.abs(dx)>50){dx>0?next():prev();}
},{passive:true});

// Init immediately
titleEl.textContent = carouselSlides[0].title;
subtitleEl.textContent = carouselSlides[0].subtitle;
if (counterEl) counterEl.textContent = '01 / '+String(total).padStart(2,'0');
restartTimer();
})();
