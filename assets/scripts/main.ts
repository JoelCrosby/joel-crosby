type ThemeScheme = 'dark' | 'light';

const getPreferScheme = (scheme: ThemeScheme): boolean => {
  if (!window.matchMedia) {
    return null;
  }

  return window.matchMedia(`(prefers-color-scheme: ${scheme})`)?.matches;
};

const setupThemeToggle = () => {
  const localTheme = localStorage.getItem('theme');
  const userPrefersDark = getPreferScheme('dark');

  const currentTheme = localStorage.getItem('theme');
  const toggleSwitch: HTMLInputElement = document.querySelector(
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

  const switchTheme = (e: Event) => {
    const toggle = e.target as HTMLInputElement;

    if (toggle.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  toggleSwitch.addEventListener('change', switchTheme, false);
};

const setupNav = () => {
  let menuOpen = false;

  const navEl = document.querySelector<HTMLDivElement>('nav');
  const navContainer = document.querySelector<HTMLDivElement>('.nav-container');
  const navMenuBtn = navContainer.querySelector<HTMLDivElement>('.nav-menu');
  const navMenu = navContainer.querySelector<HTMLDivElement>('ul');

  navMenuBtn.addEventListener('click', () => {
    navContainer.style.height = menuOpen ? '40px' : '248px';
    navEl.classList.toggle('nav-shadow');
    navMenu.classList.toggle('nav-open');

    menuOpen = !menuOpen;
  });
};

setupThemeToggle();
setupNav();
