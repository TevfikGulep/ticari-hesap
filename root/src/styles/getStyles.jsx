// =================================================================
// DOSYA: src/styles/getStyles.js
// AÇIKLAMA: Tema ve stil tanımlamalarını içerir. Auth component'i
// için yeni stiller eklendi.
// =================================================================
const getStyles = (theme) => {
  const isLight = theme === 'light';
  const colors = {
    background: isLight ? '#f4f7f9' : '#121212',
    text: isLight ? '#1a202c' : '#e9ecef',
    card: isLight ? '#ffffff' : '#1e1e1e',
    cardTitle: isLight ? '#2d3748' : '#f8f9fa',
    label: isLight ? '#4a5568' : '#adb5bd',
    inputBg: isLight ? '#edf2f7' : '#2c2c2c',
    inputBorder: isLight ? '#e2e8f0' : '#424242',
    inputText: isLight ? '#1a202c' : '#f8f9fa',
    resultBg: isLight ? '#f8f9fa' : '#2a2a2a',
    resultLabel: isLight ? '#495057' : '#adb5bd',
    navActiveText: '#3b82f6',
    icon: isLight ? '#1a202c' : '#e9ecef',
    menuBg: isLight ? '#ffffff' : '#1e1e1e',
    menuItemHover: isLight ? '#f1f5f9' : '#334155',
    toggleBorder: isLight ? '#d1d5db' : '#4b5563',
    toggleActiveBg: isLight ? '#3b82f6' : '#3b82f6',
    toggleText: isLight ? '#374151' : '#d1d5db',
    authButtonBg: isLight ? '#4285F4' : '#4285F4',
    authButtonText: '#ffffff',
  };

  return {
    safeArea: { flex: 1, backgroundColor: colors.background, fontFamily: 'sans-serif', minHeight: '100vh', position: 'relative', overflowX: 'hidden' },
    container: { padding: 20, maxWidth: '1800px', margin: 'auto', paddingTop: '80px' },
    header: { position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: '60px', backgroundColor: colors.card, boxShadow: `0 2px 4px rgba(0, 0, 0, ${isLight ? 0.05 : 0.2})`, zIndex: 1000 },
    headerLeft: { display: 'flex', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginLeft: '10px' },
    menuButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '10px' },
    menuIcon: { color: colors.icon },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1001 },
    sideMenu: { position: 'fixed', top: 0, bottom: 0, width: '300px', backgroundColor: colors.menuBg, zIndex: 1002, boxShadow: '2px 0 10px rgba(0,0,0,0.1)', transition: 'left 0.3s ease-in-out' },
    sideMenuHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: `1px solid ${colors.inputBorder}` },
    sideMenuTitle: { fontSize: 18, fontWeight: '600', color: colors.text, margin: 0 },
    menuItem: { display: 'block', width: '100%', padding: '15px 20px', border: 'none', backgroundColor: 'transparent', textAlign: 'left', fontSize: 16, color: colors.text, cursor: 'pointer' },
    menuItemActive: { backgroundColor: colors.menuItemHover, fontWeight: 'bold', color: colors.navActiveText },
    card: { backgroundColor: colors.card, borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: `0 2px 8px rgba(0, 0, 0, ${isLight ? 0.1 : 0.3})`, border: isLight ? 'none' : `1px solid ${colors.inputBorder}`, margin: 'auto' },
    cardTitle: { fontSize: 20, fontWeight: '600', color: colors.cardTitle, marginBottom: 16 },
    label: { fontSize: 14, color: colors.label, marginBottom: 8 },
    input: { backgroundColor: colors.inputBg, borderRadius: 8, padding: '12px 16px', fontSize: 16, color: colors.inputText, marginBottom: 16, border: `1px solid ${colors.inputBorder}`, width: '100%', boxSizing: 'border-box' },
    resultContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.resultBg, padding: '16px', borderRadius: 8, marginTop: 8, marginBottom: '8px', margin: 'auto' },
    resultLabel: { fontSize: 16, color: colors.resultLabel },
    resultValue: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    highlightedResult: { backgroundColor: isLight ? '#e6f7ff' : '#032f4a', border: `1px solid ${isLight ? '#91d5ff' : '#054569'}`, marginBottom: '8px' },
    highlightedResultLabel: { fontSize: 16, color: isLight ? '#0050b3' : '#91d5ff', fontWeight: '500' },
    highlightedResultValue: { fontSize: 20, fontWeight: 'bold', color: isLight ? '#0050b3' : '#91d5ff' },
    toggleContainer: { display: 'flex', border: `1px solid ${colors.toggleBorder}`, borderRadius: '8px', marginBottom: '16px' },
    toggleButton: { flex: 1, padding: '10px', border: 'none', background: 'none', cursor: 'pointer', color: colors.toggleText, fontWeight: '500' },
    toggleButtonActive: { flex: 1, padding: '10px', border: 'none', background: colors.toggleActiveBg, color: '#fff', borderRadius: '7px', cursor: 'pointer', fontWeight: 'bold' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
    th: { padding: '8px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.resultBg, color: colors.label, textAlign: 'right' },
    td: { padding: '8px', border: `1px solid ${colors.inputBorder}`, textAlign: 'right', color: colors.text },
    tdHighlighted: { padding: '8px', border: `1px solid ${colors.inputBorder}`, textAlign: 'right', fontWeight: 'bold', color: colors.navActiveText },
    tfootTr: { backgroundColor: colors.resultBg, borderTop: `2px solid ${colors.inputBorder}` },
    tfootTd: { padding: '10px 8px', border: `1px solid ${colors.inputBorder}`, textAlign: 'right', color: colors.text },
    // --- Auth Styles ---
    authContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
    profileButton: { 
        display: 'flex', 
        alignItems: 'center', 
        background: colors.inputBg, 
        border: `1px solid ${colors.inputBorder}`, 
        padding: '6px 12px', 
        borderRadius: '9999px', // Tamamen yuvarlak kenarlar için
        cursor: 'pointer',
        boxShadow: `0 1px 3px rgba(0, 0, 0, ${isLight ? 0.1 : 0.4})`,
        transition: 'background-color 0.2s, box-shadow 0.2s',
        '&:hover': { 
            backgroundColor: colors.menuItemHover,
            boxShadow: `0 2px 8px rgba(0, 0, 0, ${isLight ? 0.15 : 0.5})`,
        } 
    },
    profileImage: { width: '28px', height: '28px', borderRadius: '50%' },
    userName: { color: colors.text, fontWeight: '500', fontSize: '14px', marginLeft: '8px', marginRight: '4px' },
    signOutButton: { 
        backgroundColor: 'transparent', 
        color: colors.label, 
        border: 'none',
        borderRadius: '6px', 
        padding: '8px 12px', 
        cursor: 'pointer', 
        fontSize: '14px', 
        fontWeight: '500',
        '&:hover': { 
            color: colors.text,
            backgroundColor: colors.menuItemHover 
        } 
    },
    signInButton: { 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: colors.authButtonBg, 
        color: colors.authButtonText, 
        border: 'none', 
        borderRadius: '6px', 
        padding: '8px 16px', 
        fontSize: '14px', 
        fontWeight: '500' 
    },
    googleIcon: { width: '18px', height: '18px', marginRight: '10px' },
  };
};

export default getStyles;
