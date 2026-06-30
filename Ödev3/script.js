$(function () {

  const JSON_DOSYASI = "renkler.json";
  const HAFIZA_ANAHTARI = "renkPaletiRenkler"; 

  let renkler = [];                               
  let aktifHedef = null;                             
  let secimler = { dikdortgen: null, daire: null };   

  const $palet = $("#palet");
  const $renkKodu = $("#renkKodu");
  //palet ve renkKodu id'li HTML elemanlarını jQuery($) ile bulup, değişkenlere atıyor.

  $palet.hide(); 

  const hafizadakiRenkler = localStorage.getItem(HAFIZA_ANAHTARI);
  // Tarayıcının kendi hafızasına (localStorage) gidiyor,  renkPaletiRenkler adına sahip bir kayıt var mı? Varsa getir, hafizadakiRenkler kutusuna koy.
  
  if (hafizadakiRenkler) {
    renkler = JSON.parse(hafizadakiRenkler);
    paletiDoldur();   //JSON.parse() komutu, düz metni JavaScript'in anlayabileceği  listeye (diziye) dönüştürür.
  } else {
    fetch(JSON_DOSYASI)
      .then((cevap) => cevap.json())
      .then((veri) => {
        renkler = veri.colors;
        localStorage.setItem(HAFIZA_ANAHTARI, JSON.stringify(renkler));
        paletiDoldur();
      })
      .catch((hata) => console.error("renkler.json okunamadı:", hata));
  }
  //fetch(): Gidip renkler.json dosyasını bulup getirir.
  //.then(...): Dosyayı getirdikten SONRA şunu yap: Gelen cevabı .json() formatına çevir.
  /*Dosya JSON formatına çevrildikten SONRA (then(veri)), dosyanın içindeki colors listesini boş renkler listesine eşitler.
     localStorage.setItem(...):  JSON'dan yeni veri çektik, bunu tarayıcı hafızasına kaydet. 
     JSON.stringify() komutu, bizim listemizi tarayıcının anlayacağı "düz metne" çevirir. */

  function paletiDoldur() {
    $palet.empty();
    renkler.forEach((hex) => {
      $("<div>")
        .addClass("renk-karesi")
        .css("background-color", hex)
        .attr("data-renk", hex)
        .attr("title", hex)
        .appendTo($palet);
    });
  }

  /* $("<div>"): HTML'de olmayan yepyeni bir <div> kutusu yarat.
     .addClass("renk-karesi"): Buna CSS'teki .renk-karesi sınıfını ekle (30x30).
     .css(...): Arka plan rengini o anki hex kodu neyse ona boya.
     .attr("data-renk", hex): Üzerine tıklanınca okumak için data-renk.
     .attr("title", hex): Kullanıcı fareyi karenin üzerinde bekletince renk kodu tooltip olarak görünsün.
     .appendTo($palet): Kareyi al, HTML'deki #palet kutusunun içine ekle. */

  $(".sekil").on("click", function (e) {
    e.stopPropagation();
  /*Sayfadaki herhangi bir şekle tıklandığında e.stopPropagation() 
     tıklamanın sadece şekilde kalmasını, altındaki sayfa zeminine geçip
     paletin yanlışlıkla kapanmasını engeller.*/
    
    const tiklanan = $(this).data("hedef");
    // Tıklanan elemanın HTML'indeki "data-hedef" etiketini okuyup hafızaya al (dikdortgen mi, daire mi?)

    if (aktifHedef === tiklanan && $palet.is(":visible")) {
      $palet.stop(true, true).fadeOut(500);
      return;
    }
    //Eğer daha önce tıkladığım şekle TEKRAR tıkladıysam VE palet şu an zaten açıksa paleti yavaşça kapat.

    aktifHedef = tiklanan;

    const ofset = $(this).offset();
    $palet.css({
      top: ofset.top + $(this).outerHeight() + 10,
      left: ofset.left
    });

    /*.offset(): Tıkladığın şeklin ekranın en üstüne ve en soluna olan piksel uzaklığını (X ve Y koordinatlarını) verir.
       top : Tıkladığın şeklin yukarıdan uzaklığı (ofset.top) + o şeklin kendi boyu (outerHeight) + araya eklenecek 10 piksellik boşluk. 
             paletin tam olarak şeklin alt sınırından başlamasını sağlar.
       left : Şeklin soldan uzaklığı neyse paletin uzaklığı da o olsun. Böylece palet tıkladığın şekille aynı hizada açılır.*/

    $(".renk-karesi").removeClass("secili");
    if (secimler[aktifHedef]) {
      $('.renk-karesi[data-renk="' + secimler[aktifHedef] + '"]').addClass("secili");
    }

    /*Eğer daha önceden bu şekil için yaptığım bir renk seçimi (secimler[aktifHedef]) hafızada duruyorsa, 
       paletin içinden tam da o renk koduna sahip olan kareyi bul ve ona tekrar .secili class'ını ekle. */

    $palet.stop(true, true).fadeIn(500);
  });

    // Tıklanan şeklin koordinatları hesaplandıktan sonra paleti .fadeIn(500) ile yarım saniye içinde ekranda göster. Başına .stop(true, true) koyarak, 
    // palet tam kapanırken  tekrar tıklarsa animasyonun titremesini engeller.

  $palet.on("click", function (e) {
    e.stopPropagation(); 
  });
  
    //Paletin içindeki  karelere değil de, beyaz boşluklara tıklarsak hiçbir şey olmamasını sağlar.


  $palet.on("click", ".renk-karesi", function (e) {
    e.stopPropagation();
    const secilenRenk = $(this).data("renk");

    $("#" + aktifHedef).css("background-color", secilenRenk);

    $renkKodu.val(secilenRenk);

    secimler[aktifHedef] = secilenRenk;

    $palet.stop(true, true).fadeOut(500);
  });
  /*Query, sonradan yaratılan elemanlara direkt click atayamaz. 
      Tıklama olayını baştan beri var olan #palet'e verir. 
      Tıklanan karenin  içindeki data-renk kodunu alıp secilenRenk kutusuna koyar. 
      Hafızada tutulan hedef şekli bulur. HTML'deki #daire id'li elemanı ve CSS'teki arka plan rengini bulur. 
      Textbox'ın içine renk kodunu yazdırıyoruz.
      Sonra bilgiyi secimler hafızasına kaydediyor, paleti bir sonraki açışında o rengin etrafı noktalı kalsın.
      Boyama işlemi bittikten sonra paleti yarım saniyede kapatıyoruz.
      */

  $(document).on("click", function () {
    if ($palet.is(":visible")) {
      $palet.stop(true, true).fadeOut(500);
    }
  });
  /* Kullanıcı palet açıkken  sayfanın herhangi bir boş yerine tıklarsa paletin kapanmasını sağlar.
       .is(":visible") şartı ile "Eğer palet şu an zaten açıksa kapat. */
});
