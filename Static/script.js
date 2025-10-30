// script.js

// Show a welcome popup on dashboard
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('dashboard')) {
    const username = document.querySelector('strong')?.textContent || 'Student';
    alert(`Welcome back, ${username}! 🎉`);
  }
});

// Confirm before submitting lost & found posts
if (window.location.pathname.includes('lostfound')) {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const item = document.querySelector('input[name="item"]').value;
      const status = document.querySelector('select[name="status"]').value;
      const confirmPost = confirm(`Are you sure you want to post this as "${status}": ${item}?`);
      if (!confirmPost) e.preventDefault();
    });
  }
}

// Highlight active link in dashboard
if (window.location.pathname.includes('dashboard')) {
  const links = document.querySelectorAll('.dashboard-links a');
  links.forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.backgroundColor = '#0056b3';
    });
    link.addEventListener('mouseout', () => {
      link.style.backgroundColor = '#007bff';
    });
  });
}
// 🎉 Badge celebration popup
if (window.location.pathname.includes('badge') && document.referrer.includes('dashboard')) {
  setTimeout(() => {
    alert("🏆 Congrats! You've earned a new badge!");
  }, 500);
}
// 📊 Badge progress bar
if (window.location.pathname.includes('badge')) {
  const badgeCount = document.querySelectorAll('p').length;
  const goal = 10;
  const percent = Math.min((badgeCount / goal) * 100, 100);
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = percent + '%';
}
// Highlight top badge earner in analytics
if (window.location.pathname.includes('analytics')) {
  const badgeSection = document.querySelectorAll('h3')[0];
  const badgeList = badgeSection?.nextElementSibling;
  if (badgeList) {
    const top = badgeList.querySelector('p');
    if (top) {
      top.style.backgroundColor = '#ffe066';
      top.style.fontWeight = 'bold';
      top.style.padding = '5px';
    }
  }
}
// 🏆 Highlight top badge earner in leaderboard
if (window.location.pathname.includes('leaderboard')) {
  const badgeSection = document.querySelectorAll('h3')[0];
  const badgeList = badgeSection?.nextElementSibling;
  if (badgeList) {
    const top = badgeList.querySelector('p');
    if (top) {
      top.style.backgroundColor = '#ffd700';
      top.style.fontWeight = 'bold';
      top.style.padding = '5px';
      top.textContent += ' 🥇';
    }
  }
}
// 📊 Badge progress bar in profile
if (window.location.pathname.includes('profile')) {
  const badgeCount = document.querySelectorAll('ul')[0]?.children.length || 0;
  const goal = 10;
  const percent = Math.min((badgeCount / goal) * 100, 100);
  const bar = document.getElementById('profile-progress-bar');
  if (bar) bar.style.width = percent + '%';
}