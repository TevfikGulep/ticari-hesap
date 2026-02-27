import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const RequestForm = ({ styles, user }) => {
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  // Kullanıcı giriş yapmışsa e-posta alanını otomatik doldur
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    } else {
      setEmail('');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !request.trim()) {
      setStatus({ type: 'error', message: 'Lütfen tüm zorunlu alanları doldurun.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Gönderiliyor...' });

    try {
      await addDoc(collection(db, 'requests'), {
        email: email,
        request: request,
        createdAt: serverTimestamp(),
      });
      setStatus({ type: 'success', message: 'İsteğiniz başarıyla alındı. Teşekkür ederiz!' });
      // Giriş yapmamış kullanıcı için formu temizle
      if (!user) {
        setEmail('');
      }
      setRequest('');
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus({ type: 'error', message: 'İstek gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>İstek & Öneri</h2>
      <p style={{ ...styles.label, marginBottom: '20px' }}>
        Uygulamamızı geliştirmemize yardımcı olacak bir fikriniz veya isteğiniz mi var? Lütfen bizimle paylaşın.
      </p>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>E-posta Adresiniz *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Lütfen e-posta adresinizi girin"
            style={styles.input}
            required
            readOnly={!!user} // Kullanıcı giriş yapmışsa alanı salt okunur yap
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>İsteğiniz / Öneriniz *</label>
          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Yeni bir hesaplama modülü, mevcut bir özellikte değişiklik veya başka bir fikir..."
            required
            rows="5"
            style={styles.input}
          />
        </div>
        
        <button type="submit" style={styles.button} disabled={status.type === 'loading'}>
          {status.type === 'loading' ? 'Gönderiliyor...' : 'Gönder'}
        </button>

        {status.message && (
          <p style={{
            ...styles.label,
            marginTop: '15px',
            color: status.type === 'error' ? '#c0392b' : '#27ae60'
          }}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default RequestForm;
