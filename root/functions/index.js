const {onSchedule} = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const axios = require("axios");

// Firebase Admin SDK'yı başlat
admin.initializeApp();
const db = admin.firestore();

// Firebase Functions v2 (yeni nesil) kullanarak zamanlanmış fonksiyonu tanımla
exports.fetchCurrencyRates = onSchedule("every 15 minutes", async (event) => {
    console.log("Executing fetchCurrencyRates function to get latest rates...");
    try {
      // ExchangeRate-API'den USD bazlı tüm kurları tek bir istekte çekiyoruz.
      const response = await axios.get("https://open.er-api.com/v6/latest/USD");
      const data = response.data;

      if (data.result !== 'success' || !data.rates) {
          throw new Error("API'den geçerli veri alınamadı. Yanıt: " + JSON.stringify(data));
      }

      const usdToTry = data.rates.TRY;
      const usdToEur = data.rates.EUR;

      if (!usdToTry || !usdToEur) {
          throw new Error("API yanıtında TRY veya EUR kuru bulunamadı.");
      }

      // EUR/TRY kurunu dolaylı olarak hesaplıyoruz (çapraz kur).
      const eurToTry = usdToTry / usdToEur;

      const ratesToSave = {
        USD: usdToTry,
        EUR: eurToTry,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      };

      await db.collection("rates").doc("latest").set(ratesToSave);

      console.log("Currency rates updated successfully! Rates:", JSON.stringify(ratesToSave));
    } catch (error) {
      console.error("Error fetching or saving currency rates:", error.message);
      if (error.response) {
        console.error("API Response Status:", error.response.status);
        console.error("API Response Data:", JSON.stringify(error.response.data));
      }
    }
});
