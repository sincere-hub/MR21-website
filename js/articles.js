document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. READING PROGRESS BAR
  // ==========================================
  const progressBar = document.querySelector('[data-reading-progress-bar]');
  const articleContent = document.querySelector('[data-article-content]');

  const updateProgress = () => {
    if (!progressBar || !articleContent) return;
    const rect = articleContent.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    const percentage = total > 0 ? (scrolled / total) * 100 : 0;
    progressBar.style.width = `${Math.min(percentage, 100)}%`;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  // ==========================================
  // 2. ESTIMATED READ TIME
  // ==========================================
  const readTimeEl = document.querySelector('[data-read-time]');
  if (readTimeEl && articleContent) {
    const words = articleContent.textContent.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    readTimeEl.innerHTML = `<i class="fa-regular fa-clock" aria-hidden="true"></i> ${minutes} min read`;
  }

  // ==========================================
  // 3. SHARE BUTTONS
  // ==========================================
  const pageUrl = window.location.href;
  const pageTitle = document.title;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${pageTitle} ${pageUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`,
  };

  const shareToast = document.querySelector('[data-share-toast]');
  let toastTimer;

  const showToast = (message) => {
    if (!shareToast) return;
    shareToast.textContent = message;
    shareToast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { shareToast.hidden = true; }, 2500);
  };

  document.querySelectorAll('[data-share]').forEach((button) => {
    button.addEventListener('click', async () => {
      const type = button.getAttribute('data-share');

      if (type === 'copy') {
        try {
          await navigator.clipboard.writeText(pageUrl);
          showToast('Link copied');
        } catch (err) {
          showToast('Could not copy link');
        }
        return;
      }

      const url = shareLinks[type];
      if (url) {
        window.open(url, '_blank', 'noopener,width=600,height=520');
      }
    });
  });
});
