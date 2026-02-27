
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// E-posta gönderimi için transporter yapılandırması
// Not: Güvenlik için e-posta ve şifrenizi environment variables'da saklayın
// https://firebase.google.com/docs/functions/config-env
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email, // Environment variable
        pass: functions.config().gmail.password // Environment variable
    }
});

exports.sendRequestEmail = functions.firestore
    .document('requests/{requestId}')
    .onCreate((snap, context) => {
        const newValue = snap.data();
        const mailOptions = {
            from: 'Firebase Projeniz <noreply@your-project-id.firebaseapp.com>',
            to: 'tevfikgulep@gmail.com',
            subject: 'Yeni Bir İstek/Öneri Geldi!',
            html: `
                <p><strong>Gönderen:</strong> ${newValue.email}</p>
                <p><strong>İstek:</strong></p>
                <p>${newValue.request}</p>
                <p><i>Bu e-posta, Firebase projenizdeki bir Cloud Function tarafından otomatik olarak gönderilmiştir.</i></p>
            `
        };

        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.toString());
            }
            return console.log('Sended');
        });
    });
