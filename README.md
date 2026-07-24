# Staj Çalışmaları ve Proje Portfolyosu

Bu depo, staj programı kapsamında geliştirilen web tabanlı arayüz ödevlerini ve uçtan uca tasarlanmış, makine öğrenmesi destekli görüntü işleme projelerini içermektedir. 

Çalışmalar, temel web teknolojilerinden başlayıp, sentetik veri üretimi ve modelleme ile sonuçlanan kapsamlı bir "Akıllı Görüntü Teşhis ve Onarım Sistemi"ne uzanan bir gelişim sürecini yansıtmaktadır.

## 📁 Depo İçeriği ve Klasör Yapısı

### 1. Web Geliştirme Ödevleri (`Ödev1`, `Ödev2`, `Ödev3`, `Ödev4`)
Temel web programlama konseptlerinin uygulandığı projelerdir.
* **Form ve Validasyon:** Kullanıcı kayıt formları, veri doğrulama işlemleri ve yönlendirmeler.
* **Dinamik İçerik ve State Yönetimi:** LocalStorage kullanılarak tarayıcı hafızasında tutulan dinamik renk paleti tasarımı ve animasyonlu (jQuery fadeIn/fadeOut) UI etkileşimleri.
* **Asenkron Veri Çekme:** jQuery AJAX kullanılarak haber kaynaklarından dinamik veri çekimi, tablo yönetimi ve veri silme/güncelleme işlemleri.
* **Admin Paneli:** Şifreli giriş sistemi ve yönetim paneli arayüzü.

### 2. `GÖRÜNTÜ İŞLEME` - Fotoğraf Kalitesi Analizi
Görüntü kalitesini objektif metriklerle değerlendirmek için kurulan temel Python pipeline'ı.
* **Metrik Çıkarımı:** Fotoğrafların parlaklık , kontrast, netlik ve entropi değerlerinin matematiksel olarak hesaplanması.
* **Uygulanan Filtreler:** Gaussian Blur, Histogram Eşitleme, Canny Kenar Tespiti ve Thresholding (Global, Otsu, Adaptive) yöntemlerinin kalitatif karşılaştırması.
* **Yapısal Benzerlik:** Fotoğraflar arası kalitenin SSIM  ile nicel olarak ölçülmesi.

### 3. `GÖRÜNTÜ İŞLEME 2` - Görüntü Onarımı
Bozuk görüntüleri referans fotoğraflara en yakın hâle getirmeyi amaçlayan restorasyon çalışmaları.
* **Gürültü Giderme:** Gaussian, Median, Bilateral ve Non-Local Means filtrelerinin PSNR/SSIM metrikleriyle kıyaslanması. En yüksek yapısal benzerliği sunan NLM algoritmasının sisteme entegrasyonu.
* **Karanlık Görüntü İyileştirme:** Histogram Eşitleme, Gamma Düzeltmesi ve CLAHE algoritmalarının optimizasyonu (Optimum: CLAHE clipLimit=25).

### 4. `Intelligent Image Diagnosis and Automatic Repair` - Makine Öğrenmesi Entegrasyonu
Manuel teşhis ve parametre arama süreçlerini otomatikleştiren, yapay zeka destekli bir mimari kurulmuştur.
* **Sentetik Veri Üretimi:** Temiz referans görüntülere kontrollü şiddetlerde gürültü, karanlık ve bulanıklık eklenerek etiketli veri seti oluşturulmuştur.
* **Sınıflandırma ve Regresyon:** Random Forest modelleri ile fotoğraftaki bozulma türü (gürültü, karanlık, bulanık vb.) sınıflandırılmış; bozulma şiddeti regresyon ile tahmin edilmiştir.
* **Otomatik Onarım:** Modelin tahminlerine dayanarak, uygun onarım algoritmaları (NLM, CLAHE vb.) doğru parametrelerle fotoğrafa otomatik olarak uygulanmaktadır.
* **Domain Gap Analizi:** Modelin sentetik veri ile gerçek dünya verisi arasındaki davranış farklılıkları analiz edilmiş, istatistiksel farklılıklar raporlanmıştır.

## 🛠️ Kullanılan Teknolojiler
* **Görüntü İşleme:** OpenCV, scikit-image
* **Makine Öğrenmesi & Veri Analizi:** Python, scikit-learn, Pandas, NumPy
* **Görselleştirme:** Matplotlib, Seaborn
* **Web:** HTML5, CSS3, JavaScript, jQuery, AJAX
