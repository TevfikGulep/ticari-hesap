// root/src/components/Sidebar.jsx

import { HomeIcon, HomeIconSolid, MenuIcon, XIcon, SunIcon, MoonIcon } from './Icons';

const Sidebar = ({
  isOpen,
  onToggle,
  onSelectCalculator,
  calculators,
  currentCalculator,
  theme,
  onToggleTheme,
  homepage,
  onSetHomepage,
}) => {
  const getStyles = (theme) => ({
    sidebar: {
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f0f0f0',
      color: theme === 'dark' ? '#f0f0f0' : '#1a1a1a',
    },
    link: {
      color: theme === 'dark' ? '#f0f0f0' : '#1a1a1a',
    },
    activeLink: {
      backgroundColor: theme === 'dark' ? '#333' : '#ddd',
    },
    button: {
      color: theme === 'dark' ? '#f0f0f0' : '#1a1a1a',
    },
  });

  const styles = getStyles(theme);

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-30 p-2 rounded-md transition-colors"
        style={styles.button}
        aria-label="Menüyü aç"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={styles.sidebar}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Hesaplayıcılar</h2>
          <button onClick={onToggle} className="p-2" aria-label="Menüyü kapat">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {Object.keys(calculators).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCalculator(key);
                  onToggle();
                }}
                className={`block p-2 rounded-md ${
                  currentCalculator === key ? 'font-bold' : ''
                }`}
                style={{
                  ...styles.link,
                  ...(currentCalculator === key ? styles.activeLink : {}),
                }}
              >
                {calculators[key].name}
              </a>
              <button
                onClick={() => onSetHomepage(key)}
                className="p-2 rounded-full hover:bg-gray-500/20"
                aria-label={`${calculators[key].name} sayfasını açılış sayfası yap`}
              >
                {homepage === key ? (
                  <HomeIconSolid className="h-5 w-5" />
                ) : (
                  <HomeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full transition-colors"
            style={styles.button}
            aria-label="Temayı değiştir"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={onToggle}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
