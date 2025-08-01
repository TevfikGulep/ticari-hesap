// =================================================================
// DOSYA: src/components/Placeholder.js
// AÇIKLAMA: Henüz geliştirilmemiş özellikler için kullanılan
// yer tutucu component.
// =================================================================
import React from 'react';

const Placeholder = ({ title, styles }) => (
    <div style={styles.card}>
        <h2 style={styles.cardTitle}>{title}</h2>
        <p style={styles.label}>Bu özellik yakında eklenecektir.</p>
    </div>
);

export default Placeholder;
