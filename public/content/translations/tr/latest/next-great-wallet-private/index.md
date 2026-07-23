---
title: "Bir sonraki harika cüzdan gizli olacak"
description: "Cüzdanınız sahip olduğunuz her adresi, bağlandığınız her merkeziyetsiz uygulamayı (dapp) ve yaptığınız her isteği görür. Aynı konum, tüm bunları korumasını da sağlar. Yeni nesil Ethereum cüzdanlarını tanımlayacak gizlilik araçlarına, varsayılanlara ve henüz piyasaya sürülmemiş fikirlere pratik bir bakış."
author: "Elliott Alexander"
team: ""
tags:
  - "gizlilik"
  - "cüzdanlar"
  - "sıfır bilgi ispatları"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Bir sonraki harika cüzdan"
lang: tr
---

Cüzdanınızda geçirdiğiniz iki dakikanın bir anlık görüntüsünü alın. Uygulamayı açarsınız, bakiyenize göz atarsınız, denemek istediğiniz bir merkeziyetsiz uygulamaya (dapp) bağlanırsınız, önünüze çıkardığı işlemi onaylarsınız ve bir arkadaşınıza öğle yemeğinden borçlu olduğunuz ETH'yi gönderirsiniz.

Bununla ilgili hiçbir şey izleniyormuş hissi vermez. Kimse adınızı sormadı. Uygulamayı kapatır ve gününüze devam edersiniz.

Şimdi gerçekte nelerin sızdırıldığını sayalım. Başlatıldığında, siz henüz hiçbir şey yapmadan önce, bir dizi analiz hizmeti IP adresinizi ve bu cüzdanı kullandığınızı öğrendi. Cüzdanınızın zinciri okuduğu sunucu, sahip olduğunuz her adresi gördü, tek bir IP'den sorgulandı; tüm portföyünüz, günlükleri tutan kişi için düzgün bir şekilde gruplandırıldı. Merkeziyetsiz uygulama (dapp) aktif adresinizi aldı ki bu, herhangi birinin tüm geçmişine bakması için ihtiyaç duyduğu tek şeydir. Ve arkadaşınıza yaptığınız ödeme, cüzdanınızı onunkine bağlayan kalıcı ve herkese açık bir kayıttır.

Bu sızıntıların her biri aynı yazılımdan geçti. Cüzdan analizleri yükledi, o sunucuyu seçti, adresi teslim etti, işlemi oluşturdu. Ancak aynı konum iki tarafı keskin bir kılıç gibidir: her şeyi gören katman, aynı zamanda her şeyi koruyabilen katmandır.

Birçok cüzdanın iş modeli bu bilgilerin toplanmasına dayanır, ancak bunu kullanıcıları riske atmadan yapmanın yolları vardır. Bunun için gerekenlerin bir kısmı rafta duruyor, çalışıyor ve görmezden geliniyor. Bir kısmını ise henüz kimse çözemedi. Her iki yarı da birer fırsattır ve bunları kim üstlenirse bir sonraki harika cüzdanı o oluşturacaktır.

## Cüzdanınızın zincir içi ele verdikleri {#what-your-wallet-gives-away-onchain}

Hangi cüzdanı kullanırsanız kullanın herkese açık olan zincir içi verilerle başlayalım. Bir adres isim taşımaz ve sadece bu gerçek bile oldukça rahatlatıcıdır. Ancak aldığınız her ödeme, dokunduğunuz her sözleşme, şu anki bakiyenizin büyüklüğü ve şimdiye kadar işlem yaptığınız herkesin tam listesi açıkta durur ve herkes tarafından serbestçe sorgulanabilir. Takma ad kullanımı, sadece adınız yerine bir yer tutucu altında dosyalandığı anlamına gelir.

Standart savunma, etkinliğinizi birkaç adrese yaymaktır ve çoğu deneyimli kullanıcı bunu yapar. Göründüğünden daha az yardımcı olur. İki adresi aynı kaynaktan fonlayın veya birbirlerine bir kez ödeme yapmalarına izin verin; küme analizi çalıştıran herhangi biri için bunlar tek bir varlığa dönüşür.

2020 yılına dönersek, Ethereum'un ilk dört yılına ait [bir çalışma](https://fc20.ifca.ai/preproceedings/31.pdf), tüm aktif harici olarak sahip olunan hesapların %17,9'unu zaten kümeleyebiliyor ve birden fazla adresi kontrol eden 340.000'den fazla varlığı ortaya çıkarabiliyordu. Bu, altı yıl ve bir yapay zeka patlaması önceydi. Dikkatli ayrımınızın bozulmasına sadece birkaç adım kaldı.

Er ya da geç, küme gerçek bir kişiye bağlanır. Sosyal medya kullanıcı adınızı yansıtan bir ENS adı kaydedin, pasaport taramanızı tutan bir borsadan bir kez çekim yapın veya etiketli adresleri bir elektronik tabloda tutan birinden ödeme alın; küme artık soyut olmaktan çıkar.

Veri ihlalleri de üzerine düşeni yapar; bir ev adresiyle birlikte sızdırılan bir e-posta, e-postaya benzeyen bir ENS adıyla eşleşir. Bunların hiçbiri artık bir mahkeme celbi veya bir uzman gerektirmiyor. Yapay zeka, iyi bir eşleşme için milyonlarca kaydı elemeyi bir gecede çalışan bir işe dönüştürdü ve maliyet sürekli bir düşüş içinde.

## Cüzdanınızın siz işlem yapmadan önce ele verdikleri {#what-your-wallet-gives-away-before-you-transact}

Zincir içi iz, en azından işlem yapmanızı gerektiriyordu. Zincir dışı olanı ise daha erken başlar. 2026'nın başlarında bir araştırmacı, temiz bir cihazda [on üç popüler cüzdanı bir paket dinleyiciden geçirdi](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) ve henüz hiçbir hesap yokken, ilk başlatmada her birinin ne yaptığını kaydetti. Ortalama bir cüzdan yaklaşık on dört alan adıyla iletişime geçti. En kötüsü, henüz bir cüzdan oluşturmamış bir kullanıcı için üç ayrı sağlayıcıya yapılan bakiye altyapısı çağrıları da dahil olmak üzere 41 IP adresi üzerinden 26 alan adıyla iletişime geçti. Testteki başka bir cüzdan, sekiz pazarlama ilişkilendirme alt alan adının yanı sıra bir cihaz parmak izi hizmeti sundu.

Bunların hepsi sıradan tüketici uygulamalarının temel dayanaklarıdır (analizler, çökme raporlaması, pazarlama ilişkilendirmesi) ancak bu Candy Crush değil, vaadi öz-egemenlik olan bir uygulamadır. Aynı test, ilk başlatmada hiçbir şey göndermeyen [bir cüzdan](https://cakewallet.com/) buldu: sıfır paket, sıfır DNS isteği. Bir cüzdanla ilgili hiçbir şey bu gevezeliği gerektirmez.

Bir de asla kapanmayan sızıntı var. Cüzdanınız zincirin bir kopyasını tutmaz; bir bakiyeyi her okuduğunda veya bir işlem gönderdiğinde, RPC (Uzaktan Prosedür Çağrısı) sağlayıcısı adı verilen bir sunucuya sorar. Kendi düğümünüzü çalıştırmadığınız sürece, her istek bunlardan birinden geçer ve varsayılan sağlayıcı tam adres listenizi, IP'nizi ve yaptığınız her şeyin zamanlamasını görür. Bu IP'yi bir abone adıyla eşleştirmek, bir hükümet için rutin bir kayıt talebidir.

MetaMask'ın varsayılan sağlayıcısı [2022'de](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash) cüzdan adreslerinin yanı sıra IP'leri de günlüğe kaydettiğini kabul ettiğinde, gelen tepkiler onu [saklama süresini yedi güne indirmeye](https://consensys.io/blog/consensys-data-retention-update) itti. Yiğidi öldür hakkını ver, ancak bu çözüm bir politikadır ve altındaki mimari değişmemiştir: tek bir sunucu hala yaptığınız her isteği alır. Ve böyle bir günlüğün zarar vermesi için talep edilmesine gerek yoktur; sadece var olması yeterlidir. Veritabanları ihlal edilir, satılır ve sessizce diğerleriyle birleştirilir ve tek başına hiçbir anlam ifade etmeyen bir günlük, yazıldıktan yıllar sonra sizinle bağlantılı hale getirilebilir.

Tüm bu katmanla ilgili dikkat edilmesi gereken şey, kullanıcının bunların hiçbirini asla görmemesidir. Para göndermek en azından önünüze bir onay ekranı çıkarır; meta verinin ise bir ekranı yoktur. Hiç kimse adres listesinin IP'siyle birlikte seyahat etmesini onaylamaz ve hiçbir imzalama istemi analizleri kapsamaz.

Bu varsayılanlar, insanların parasını tutan bir uygulamaya fazla düşünülmeden uygulanan standart tüketici uygulaması taktik kitabından (sağlam altyapı, faydalı çökme raporları, büyüme metrikleri) çıkmıştır. Cesaret verici olan kısım da budur: bu bölümde bahsedilen her sızıntı, bir cüzdan oluşturucunun vereceği bir karara dayanır.

## Kim bakıyor {#whos-looking}

En az isteyeceğiniz izleyicilerle başlayın. Suçlular, herkese açık bir defterin, tasarrufları zorla alınabilecek kişilerin bir kataloğu olarak da işlev gördüğünü anladılar. İngiliz anahtarı saldırıları (anahtarın şiddet veya şiddet tehdidi yoluyla çıkarıldığı soygunlar) [2025'te %75 arttı](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026) ve kurbanlar yalnızca [2026'nın ilk dört ayında yaklaşık 101 milyon dolar](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report) kaybetti. Ve bu model, araştırmacıların veri odaklı hedefleme olarak adlandırdığı, saldırganların kapıyı çalmadan önce kurbanın varlıklarının zincir içi profilini çıkardığı bir yöne kaydı. Son olayların yarısından fazlasında, koz olarak bir eşe, çocuğa veya ebeveyne ulaştılar. Ön kapınıza kadar izi sürülebilen bir cüzdan bakiyesi, suçlular için açık bir davetiyedir.

Bir de rozetli izleyiciler var. Şeffaf bir defter, hiçbir hükümetin inşa etmek zorunda olmadığı bir gözetim sistemidir: kimin kime, ne zaman ve ne kadar ödediğinin tam bir kaydı, herkese açık bir şekilde, mahkeme celbi gerektirmeyen tek bir sorgu uzağınızda duruyor. Bunun sizi ne kadar endişelendirmesi gerektiği sizi kimin yönettiğine bağlıdır ve milyonlarca insan için cevap; muhalefet partisine yapılan bir bağışı, bir VPN aboneliğini veya devletin basamayacağı bir para biriminde tutulan tasarrufları cezalandıran bir hükümettir.

Bu kullanıcılar için finansal ifşa bir tehdit modelidir ve cüzdanın varsayılanları ne kadar ifşa olacaklarına karar verir.

Her iki tür izleyici de aynı yükseltmeyi alıyor. Yapay zeka, izlemeyi her yıl daha ucuz hale getiriyor ve zincire yazılan her şey yazılı kalıyor, bir sonraki yeni analiz tekniği ne olursa olsun kullanıma hazır oluyor. Bunların hiçbiri herkese açık defterin bir suçlaması değildir; şeffaflık, herkesin zinciri doğrulamasını sağlayan şeydir. İfşa, kaydı size bağlayan izde yaşar: fonlama modelleri, yeniden kullanılan adresler, sunucu günlükleri.

Cüzdanlar şimdiye kadar bu izi yerinde bıraktı çünkü onu bırakmak, kullanıcı için olduğu kadar yazılım için de en az direnç gösteren yoldur. Aynı zamanda bir cüzdanın tam olarak ortadan kaldırmak için konumlandırıldığı şeydir.

## Gizlilik neden cüzdanda düzeltilir? {#why-the-wallet-is-where-privacy-gets-fixed}

Tüm bunların neden cüzdanın işi olduğunu sormak adil bir sorudur. Ethereum'un temel katmanında [gizliliğe yönelik aktif araştırmalar](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) var ve protokol eninde sonunda bu yükün bir kısmını taşıyabilir. Ancak zincir, en iyi ihtimalle yılda iki kez sert çatallanma yoluyla yükseltilir ve gizlilikle ilgili değişiklikler bunların birkaçına yayılacaktır. Bu, yıllarla ölçülen ve aceleye getirilmemesi gereken bir süreç tarafından karar verilen bir zaman çizelgesidir.

Bu arada bireyler şu anda zincir içi ödeme almanın, bağış yapmanın, tasarruflarını orada tutmanın güvenli olup olmadığına karar veriyorlar. Ethereum sosyal mutabakat sürecinin ve çatallanma programının sağlayabileceğinden daha hızlı gelen bir gizliliğe ihtiyaçları var.

Uygulama katmanı bu sorun için yanlış bir yapıdadır. Her merkeziyetsiz uygulama (dapp) kendi gizlilik özelliğini sunsa bile, her biri yalnızca kendi duvarları içindeki etkinliği, kendi yöntemiyle, kullanıcının yönetmesi gereken kendi tuhaflıkları ve sırlarıyla koruyabilir. Sizi ifşa eden şey, tüm bunlar arasında uzanan bağlantılardır (paylaşılan adresler, fonlama izleri, size geri dönen bağlantılar) ve bu bağlantılar uygulamalar arasındaki boşlukta yaşar. Gizliliği uygulama bazında çözmek, sorunun gerçekte olduğu yer hariç her yerde çözmek anlamına gelir. Merkeziyetsiz uygulamalar (dapp'ler) gerçek çözümün yaşayabileceği yer değildir.

Geriye cüzdan kalıyor. Bağlandığınız her merkeziyetsiz uygulamayı (dapp), kontrol ettiğiniz her adresi ve yaptığınız her isteği gören tek yazılım parçasıdır. Sızdıran bir cüzdanı bu kadar maliyetli yapan aynı görünürlük, dikkatli bir cüzdanın yaptığınız her şeyde gizliliği koordine etmesini sağlayan şeydir: hangi uygulamanın hangi adresle karşılaşacağını seçmek, okumaları yönlendirerek hiçbir sunucunun resmin tamamını görmemesini sağlamak, gizlilik protokollerinin talep ettiği defter tutma işlemlerini yürütmek.

Ve bu protokoller çoğu oluşturucunun varsaydığından daha ileridedir. [Railgun](https://railgun.org/) [kümülatif hacimde 5 milyar dolardan](https://dune.com/railgun_project/railgun) fazlasını işledi ve bugün yaklaşık [80 milyon dolar](https://defillama.com/protocol/railgun) tutuyor, [Umbra](https://www.techflowpost.com/en-US/article/30477) gibi gizli adres araçları on binlerce tek kullanımlık adres üretti ve [bir sayıma göre](https://wublock.substack.com/p/ethereum-privacys-https-moment-from) 35'ten fazla ekip özel transferlere yönelik bir düzineden fazla farklı yaklaşım izliyor.

Bunların hiçbiri henüz ana akım değil ve bazı parçalar gerçekten eksik. Ancak protokoller çalışıyor, içlerinden gerçek para geçiyor ve eksik olan şey kullanıcının ana akışında bir yer. İşte ileri görüşlü bir cüzdan tam da bu noktada devreye giriyor.

## Gizliliği koruyan bir cüzdan aslında ne yapar? {#what-a-privacy-preserving-wallet-actually-does}

Jargonu bir kenara bırakırsanız, çoğu gizlilik işi defter tutmaktır. Burada yeni bir adres kullanın, para yatırma işlemini şuradan yönlendirin, bu notu koruyun, çekim yapmadan önce bekleyin, bu iki hesabın birbirine dokunmasına asla izin vermeyin. Bu, insanların kötü olduğu ve yazılımın bunun için oluşturulduğu bir disiplindir ve bugün neredeyse tamamen kullanıcının üzerindedir.

Gizliliği koruyan bir cüzdan, defter tutma işini kullanıcıya yüklemek yerine kendisi yapan cüzdandır. Kullanıcı ne yapacağına karar verir; cüzdan, bunu yapmanın onlara geri dönen hiçbir iz bırakmadığından emin olur.

Yayında olanlarla başlayın. Korumalı havuzlar bugün çalışıyor: Railgun, herkese açık bakiyenizin yanında gizli bir bakiye tutar ve fonlar içeri girdikten sonra, dışarı yapılan bir ödeme diğer varlıklarınız hakkında hiçbir şey ortaya çıkarmaz. Maliyetler gerçektir (basit bir transferden daha yüksek ücretler, saniyelerle ölçülen ispat üretimi, aktarıcılara bir miktar bağımlılık) ancak protokol bu ödünleşimlere rağmen milyarlarca dolarlık hacim taşımıştır.

Bunu hiçbir protokole ihtiyaç duyulmayan bir alışkanlıkla eşleştirin: her karşı taraf için yeni bir adres. Kullanıcı yeni bir merkeziyetsiz uygulamaya (dapp) bağlandığında, cüzdan korumalı bakiyeden finanse edilen, ona özel bir adres sunabilir, böylece uygulama geçmişi ve kardeşi olmayan bir hesap görür. Gizli adresler ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) aynı hareketi ödeme almaya da genişletir. [Tornado Cash](https://tornadocash.eth.limo/) ve [Privacy Pools](https://privacypools.com/) gibi karıştırıcılar daha basit, daha dar bir iş yapar: fonlar bir adresten girer ve diğerine çıkar, ikisi arasındaki bağlantı koparılır. Bu, kimsenin size kadar izini süremeyeceği yeni bir adresi finanse etmek için kullanılan bir araçtır ve eksik olan parça, bu ritüeli kullanıcıya bırakmak yerine talep üzerine böyle bir adres üreten cüzdandır. Bunların hiçbiri bir sert çatallanma veya bir araştırma hibesi beklemiyor. Kullanıcılar adına defter tutmayı üstlenmeye istekli bir cüzdan bekliyor.

Ağ tarafı çoğunlukla kararlardan ibarettir. Sıfır üçüncü taraf analiziyle piyasaya sürmek bir seçimdir ve piyasadaki en az bir cüzdan bunu zaten yapmıştır. RPC ifşası konusunda, çoğu cüzdan zaten sağlayıcıları takas etmenize izin verir, bu nedenle isteğe bağlılık mevcuttur, ileri düzey kullanıcıların ziyaret ettiği ve diğer herkesin asla bulamadığı bir ayarlar sayfasına gizlenmiştir.

Henüz piyasaya sürülmemiş hamle ayrımdır: farklı adreslere farklı sağlayıcılar atayın, böylece hiçbir sunucu tam listeyi asla görmez ve cüzdan ile sağlayıcı arasına bir proxy koyun, böylece IP ve adresler asla birlikte seyahat etmez. [Helios](https://github.com/a16z/helios) veya [Colibri](https://github.com/corpus-core/colibri-stateless) gibi bir hafif istemci, cüzdanın aldığı cevapları körü körüne inanmak yerine doğrulamasını sağlar. Bunların her birinin altyapı, gecikme veya mühendislik süresi açısından bir maliyeti vardır, ancak hiçbiri yeni bir kriptografi gerektirmez.

Bir de Frontier var. Bugün bakiyelerinizi okumak, adres kümenizi sorguyu sunan kişiye ifşa etmek anlamına gelir ve bunu düzeltmeye yönelik çalışmalar şu anda devam etmektedir: Oblivious RAM ile eşleştirilmiş Güvenilir Yürütme Ortamları, özel bilgi alımı ve tamamen gizli okumalara doğru uzanan hafif istemciler. Bunların hiçbiri henüz bir referans uygulamasından kopyalanacak kadar yerleşmiş değil, ki bu da onu tam olarak üzerinde hak iddia etmeye değer bir zemin yapıyor.

Yazma tarafı da aynı şekle sahiptir: eşler arası yayın ve karma ağlar (mixnets), bir işlemin IP'nizi bir sunucuya taşımasını engeller. Bu parçaları ilk indiren cüzdanlar, alanın geri kalanının ölçüleceği cüzdanlar olacaktır.

İşte çıta ve bunun yeni bir kriptografi çıtasından ziyade bir kullanıcı deneyimi çıtası olduğuna dikkat edin. Bu makalenin açılışını yaptığı bölümü (başlat, bağlan, onayla, öde) ele alın ve o oturum olarak tanınabilir şekilde tutun. Ödünleşimler olacaktır; bir ispatın üretilmesi saniyeler sürer, korumalı bir transfer daha maliyetlidir ve arayüzde bir veya iki yeni kavramın isimlendirilmesi gerekebilir.

Bu farklılıkların ne kadar küçük hissedildiği entegrasyonun zanaatıdır ve bunu doğru yapan cüzdanları, teknik olarak sunan ancak kullanıcılar için hayatı zorlaştıran yollarla sunanlardan ayıracaktır. Tamamen değişmesi gereken şey: başlatmada hiçbir analiz tetiklenmez, her yeni merkeziyetsiz uygulama (dapp) geçmişi olmayan bir adresle karşılaşır ve bir arkadaşa yapılan ödeme, arkasındaki hesaplar hakkında hiçbir şey ortaya çıkarmaz.

Kullanıcıdan farklı bir kişi olmasını isteyen gizlilik asla yayılmaz. Kullanıcıların zaten anladığı bir deneyimin içine geldiğinde, bu sadece daha iyi bir cüzdandır.

## Çalmaya değer fikirler {#ideas-worth-stealing}

Temellerin ötesinde, görebildiğim kadarıyla henüz kimsenin piyasaya sürmediği bir özellikler katmanı yer alıyor. Sadece bazı fikirler, ancak her biri bir cüzdanı bariz bir seçim haline getirebilecek türden şeyler.

Zamanlama ile başlayın. Anonimlik kümelerinin adımlar arasında büyümesi için zamana ihtiyacı vardır ve zaman damgalarınız sessizce düşündüğünüzden daha fazlasını ifşa eder: ne zaman uyanık olduğunuzu, hangi saat diliminde olduğunuzu, hangi günlerde işlem yaptığınızı. Bir cüzdan acil olmayan her şeyi sıraya koyabilir ve tuhaf saatlerde tetikleyebilir: koruma amaçlı para yatırma işlemi gece boyunca gerçekleşir, fonlar sabaha kadar hazır bekler ve hayatınızın hiçbir ritmi zincir içi oluşmaz.

Sonra kolay düğme. Bugün ortaya çıkan bir kullanıcı tamamen ifşa olmuştur: çok kullanılmış bir kurtarma ifadesi, arkasında yılların geçmişi. Bunu girmelerine izin verin ve cüzdan onaylamaları için bir geçiş planı hazırlasın: şu kadarı Railgun'a, şu kadarı Privacy Pools'a, dağılımı istediğiniz gibi ayarlayın. Daha sonra, açıkta fonlara ihtiyaç duyulduğunda, hazır ve ifşa olmamış bir şekilde yüzeye çıkarlar: yeni bir adres, tuhaf bir saat, giren miktarı yansıtmayan bir miktar. Ve çoğu zaman bir çıkış yoluna ihtiyaç duyulmaz. Railgun'ın ekosistemi içinde bir kullanıcı, hiç yüzeye çıkmadan transfer ve ticaret yapabilir, üstelik çıkış ücretlerinden de tasarruf edebilir. Pazartesi günü açık bir kitap olan bir kullanıcı Cuma gününe kadar okunamaz hale gelir ve tek yaptıkları bir planı onaylamaktır.

Bir cüzdan gizlilik için de denetim (lint) yapabilir. Bu makalenin ilk yarısındaki kümeleme buluşsal yöntemleri herkese açıktır, bu nedenle bunları kullanıcının kendi bekleyen işlemine yöneltin ve imzadan önce uyarın: bu ödeme bu iki hesabı birbirine bağlayacak, bu çekim yatırdığınız parayla kuruşu kuruşuna eşleşiyor. Cüzdanlar, boşaltılan fonları yakalamak için zaten işlemleri simüle ediyor. Bir izleyicinin ne öğrendiğini simüle etmek, farklı bir riski hedefleyen aynı harekettir.

Ve insanlara izleyicinin zaten ne gördüğünü gösterin. Kullanıcının kendi hesapları üzerinde küme analizi çalıştıran bir gösterge paneli, soyut bir tehdidi kullanıcıların harekete geçme ihtiyacı hissettiği bir şeye dönüştürür: bu beş adres bir gözlemci için tek bir varlıktır, bu hesap temizdir, bu ENS adı ikisini birbirine bağlar. Ayrıca yukarıda bahsedilen kolay düğme özelliğine öncesi ve sonrası durumunu verir.

## Eylem adımları {#action-steps}

### Oluşturucular için {#for-builders}

Bu makalenin her bölümü aynı yerde bitiyor: cüzdanın yapması gereken bir seçim.

Bu seçimleri yapmanın yolu, kullanıcının geçersiz kılabileceği mantıklı varsayılanlardır, hem de her birini. Varsayılan olarak gizli yolu seçin, çünkü çoğu kullanıcının yaşayacağı şey varsayılan olandır. Ancak bunu kullanıcı odaklı isteğe bağlılığa açık bırakın, çünkü cüzdanını farklı bir RPC sunucusuna veya kendi düğümüne yönlendiremeyen bir kullanıcıya gerçekten egemenlik verilmiş sayılmaz.

Sıfırdan başlamak zorunda değilsiniz. [Kohaku SDK](https://github.com/ethereum/kohaku), bu makaledeki ilkellerin birkaçını (korumalı bakiyeler, karıştırıcılar, hafif istemciler) paketler, böylece bir cüzdan her protokolü sıfırdan yeniden oluşturmadan bunları benimseyebilir. Parçalar rafta. Bazı şeyler, kimse onları istemeden çok önce önemlidir. Kimse kitlelerin uçtan uca şifreleme için dilekçe verdiğini de görmedi; varsayılan olarak gönderildi, milyarlarca insan fark etmeden veya umursamadan buna sahip oldu ve şimdi buna sahip olmayan bir mesajlaşma uygulaması bozuk ve ihlal edici hissettiriyor.

Sizi bulmak, profilinizi çıkarmak veya sizi hedef almak için kullanılamayan para da aynı kategoriye aittir. Buna bu şekilde yaklaşan cüzdan, bir sonraki harika cüzdan olacaktır.

### Kullanıcılar için {#for-users}

Kullandığınız cüzdan, bir norm olarak teşvik ettiğiniz cüzdandır. Gizliliğinizi ve güvenliğinizi ciddiye alan cüzdanları seçin. Bu, en güvenli ve en gizli olanı için en pürüzsüz arayüzden fedakarlık etmek anlamına gelebilir. Şu anda bu muhtemelen [Walletbeat](https://www.walletbeat.fyi/)'teki en son gelişmeleri takip etmek, hangi cüzdanların kullanıcı gizliliğini sağlamaya yönelik bir geçiş yaptığını görmek ve bunları denemek için zaman ayırmak anlamına geliyor.

## Daha fazla keşif için {#for-further-exploration}

- [Cüzdan gizliliği puan kartı](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) - 13 cüzdanın ilk başlatmadaki ağ ifşası
- [ERC-5564: Gizli Adresler](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/) ve [Tornado Cash](https://tornadocash.eth.limo/)
- [Helios](https://github.com/a16z/helios) ve [Colibri](https://github.com/corpus-core/colibri-stateless) hafif istemcileri
- [Kohaku](https://github.com/ethereum/kohaku) - Cüzdan oluşturucuları için gizlilik SDK'sı
- [Walletbeat](https://www.walletbeat.fyi/) - Mevcut cüzdanların durumu