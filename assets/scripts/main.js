const getPreferScheme = (scheme) => {
  if (!window.matchMedia) {
    return null;
  }

  return window.matchMedia(`(prefers-color-scheme: ${scheme})`)?.matches;
};

const init = () => {
  const localTheme = localStorage.getItem('theme');
  const userPrefersDark = getPreferScheme('dark');

  const currentTheme = localStorage.getItem('theme');
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  if (!toggleSwitch) {
    return;
  }

  toggleSwitch.checked =
    (localTheme === 'dark' || userPrefersDark === true) &&
    (!localTheme || localTheme !== 'light');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }

  const switchTheme = (e) => {
    const toggle = e.target;

    if (toggle.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  toggleSwitch.addEventListener('change', switchTheme, false);

  let menuOpen = false;

  const navMenuBtn = document.querySelector('.nav-menu');
  const navContainer = document.querySelector('.nav-container');
  const navEl = document.querySelector('nav');

  navMenuBtn.addEventListener('click', () => {
    navContainer.style.height = menuOpen ? '40px' : '248px';
    navEl.classList.toggle('nav-shadow')

    menuOpen = !menuOpen;
  });

};

init();
