# Ticari Hesaplayıcı

Bu proje, işletmelerin ve bireylerin ticari faaliyetlerinde ihtiyaç duyacakları temel hesaplamaları kolayca yapabilmeleri için geliştirilmiş web tabanlı bir hesap makinesi uygulamasıdır. React kullanılarak oluşturulmuştur ve modern, duyarlı bir arayüze sahiptir.

## Özellikler

Uygulama, aşağıdaki hesaplama modüllerini içerir:

* **Kâr/Zarar Hesaplama:** Bir ürünün alış ve KDV dahil satış fiyatına göre net kâr veya zarar tutarını ve oranını hesaplar.
* **Satış Fiyatı Hesaplama:** Bir ürünün alış fiyatı ve hedeflenen kâr oranına göre olması gereken satış fiyatını belirler.
* **Pazaryeri Fiyat Hesaplama:** E-ticaret platformları için özel olarak tasarlanmıştır. Ürün maliyeti, kargo, paketleme, reklam, iade oranı, komisyon ve KDV gibi birçok parametreyi dikkate alarak kârlı bir satış fiyatı önerir.
* **Brüt/Net Maaş Hesaplama:** 2025 yılı parametrelerine göre brütten nete veya netten brüte maaş hesaplamaları yapar. Engellilik durumu gibi özel indirimleri de dikkate alır ve yıllık detaylı bir döküm sunar.

**Geliştirme Aşamasında Olan Özellikler:**
* İşyeri Gider Hesaplama
* Ürün Başı İşletme Maliyeti Hesaplama

## Kullanılan Teknolojiler

* **React:** Kullanıcı arayüzü ve uygulamanın genel yapısı için kullanılmıştır.
* **React Hooks (`useState`, `useEffect`):** Componentlerin state yönetimi ve yaşam döngüsü işlemleri için kullanılmıştır.
* **JavaScript (ES6+):** Uygulamanın temel mantığı ve hesaplama algoritmaları için kullanılmıştır.
* **Dinamik Stil (Inline Styles):** Component bazlı ve temaya (Açık/Koyu Mod) duyarlı dinamik stillendirme için kullanılmıştır.

## Kurulum ve Kullanım

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyebilirsiniz. Projenin bir `create-react-app` yapısı içinde olduğunu varsayarsak:

1.  **Projeyi klonlayın:**
    ```bash
    git clone <repository-url>
    ```

2.  **Proje dizinine gidin:**
    ```bash
    cd ticari-hesaplayici
    ```

3.  **Gerekli bağımlılıkları yükleyin:**
    ```bash
    npm install
    ```

4.  **Uygulamayı başlatın:**
    ```bash
    npm start
    ```

    Bu komut, uygulamayı geliştirme modunda çalıştırır ve tarayıcınızda `http://localhost:3000` adresinde açar.

## Lisans

Bu proje, **GNU General Public License v3.0** kapsamında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakabilirsiniz.
