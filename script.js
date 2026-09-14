// ===================== Header scroll effect =====================
// body에 class="home"이 있으면: 스크롤 전 투명(overlay) -> 스크롤 후 흰 배경(solid)
// 그 외 페이지는 처음부터 흰 배경 고정(static-solid) — CSS에서 이미 처리됨
(function () {
  var headerDesktop = document.getElementById('site-header');
  var headerMobile = document.getElementById('site-header-mobile');
  var isHome = document.body.classList.contains('home');
  var threshold = 40;

  function applyScrollState() {
    var scrolled = window.scrollY > threshold;
    [headerDesktop, headerMobile].forEach(function (h) {
      if (!h) return;
      if (isHome) {
        h.classList.toggle('solid', scrolled);
        h.style.backgroundColor = scrolled ? '#ffffff' : 'transparent';
        h.style.boxShadow = scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none';
      }
    });
  }

  if (isHome) {
    window.addEventListener('scroll', applyScrollState);
    applyScrollState();
  } else {
    // 내부 페이지는 항상 흰 배경 + 어두운 텍스트
    [headerDesktop, headerMobile].forEach(function (h) {
      if (!h) return;
      h.classList.add('static-solid');
      h.style.backgroundColor = '#ffffff';
    });
  }
})();

// ===================== Mobile slide menu =====================
(function () {
  var btn = document.getElementById('mobileMenuBtn');
  var closeBtn = document.getElementById('mobileMenuClose');
  var menu = document.getElementById('mobile-menu');
  if (btn) btn.addEventListener('click', function () { menu.classList.add('open'); });
  if (closeBtn) closeBtn.addEventListener('click', function () { menu.classList.remove('open'); });
})();

// ===================== Films 필터 탭 =====================
// 탭 클릭 시 해당 카테고리 섹션만 보여줌 ("All"은 전체 표시)
(function () {
  var tabs = document.querySelectorAll('.film-tab');
  if (!tabs.length) return;
  var sections = document.querySelectorAll('.film-category');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      var target = tab.getAttribute('data-target');

      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      sections.forEach(function (sec) {
        if (target === 'all' || sec.getAttribute('data-category') === target) {
          sec.style.display = '';
        } else {
          sec.style.display = 'none';
        }
      });
    });
  });
})();
