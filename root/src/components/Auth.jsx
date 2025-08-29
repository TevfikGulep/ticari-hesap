// =================================================================
// DOSYA: root/src/components/Auth.js (GÜNCELLENDİ)
// AÇIKLAMA: Auth bileşeni sadece profil resmini gösterecek şekilde güncellendi.
// =================================================================
import React from 'react';

const Auth = ({ user, styles }) => {
  if (user) {
    return (
      <div style={styles.authContainer}>
        <img src={user.photoURL} alt={user.displayName} style={styles.profileImage} />
      </div>
    );
  }
  return null;
};

export default Auth;
