---
title: "Kendi Ethereum düğümünüzü başlatın"
description: "Kendi Ethereum istemcinizi çalıştırmaya genel bir giriş."
lang: tr
sidebarDepth: 2
---

Kendi düğümünüzü çalıştırmak size birçok fayda sağlar, yeni fırsatlar oluşturur ve ekosistemi desteklemeye yardımcı olur. Bu sayfa size kendi düğümünüzü başlatmanız ve Ethereum işlem doğrulamalarına katılmanız için rehber olacaktır.

[Birleşim](/roadmap/merge) sonrasında bir Ethereum düğümü çalıştırmak için iki istemcinin gerekli olduğunu unutmayın; bir **yürütme katmanı (EL)** istemcisi ve bir **mutabakat katmanı (CL)** istemcisi. Bu sayfa, bir Ethereum düğümünü çalıştırmak için, bu iki istemcinin nasıl kurulacağını, yapılandırılacağını ve bağlanacağını gösterecektir.

## Ön Koşullar {#prerequisites}

Bir Ethereum düğümünün ne olduğunu ve neden bir istemci çalıştırmak isteyebileceğinizi anlamalısınız. Bu konu [Düğümler ve istemciler](/developers/docs/nodes-and-clients/) bölümünde ele alınmaktadır.

Bir düğüm çalıştırma konusuna yeniyseniz veya daha az teknik bir yol arıyorsanız, öncelikle [bir Ethereum düğümü çalıştırma](/run-a-node) hakkındaki kullanıcı dostu tanıtımımıza göz atmanızı öneririz.

## Bir yaklaşım seçme {#choosing-approach}

Düğümünüzü başlatmak için atmanız gereken ilk adım bir yaklaşım seçmek olacaktır. Gereksinimlere ve çeşitli olasılıklara bağlı olarak, istemci uygulamasını (hem yürütüm hem de fikir birliği istemcilerinin), ortamı (donanım, sistem) ve istemci ayarları için parametreleri seçmelisiniz.

Bu sayfa, size bu seçimlerde rehberlik edecek ve Ethereum oluşumunuzu çalıştırmak için en uygun yolu bulmanıza yardım edecektir.

İstemci uygulamaları arasından seçim yapmak için mevcut tüm Ana Ağa hazır [yürütme istemcilerine](/developers/docs/nodes-and-clients/#execution-clients) ve [mutabakat istemcilerine](/developers/docs/nodes-and-clients/#consensus-clients) bakın ve [istemci çeşitliliği](/developers/docs/nodes-and-clients/client-diversity) hakkında bilgi edinin.

İstemcilerin [gereksinimlerini](#requirements) göz önünde bulundurarak yazılımı kendi [donanımınızda mı yoksa bulutta mı](#local-vs-cloud) çalıştıracağınıza karar verin.

Ortamı hazırladıktan sonra, seçilen istemcileri ya [başlangıç seviyesi dostu bir arayüzle](#automatized-setup) ya da gelişmiş seçeneklere sahip bir terminal kullanarak [manuel olarak](#manual-setup) kurun.

Düğüm çalışır ve senkronize olurken, [onu kullanmaya](#using-the-node) hazırsınız demektir, ancak [bakımını](#operating-the-node) gözden kaçırmadığınızdan emin olun.

![İstemci kurulumu](./diagram.png)

### Ortam ve donanım {#environment-and-hardware}

#### Yerel veya bulut {#local-vs-cloud}

Ethereum istemcileri, tüketici sınıfı bilgisayarlarda çalışabilirler ve madencilik makineleri gibi özel bir donanım gerektirmezler. Bu sebeple, düğümü ihtiyaçlarınıza göre dağıtmak için çeşitli seçenekleriniz vardır.
Basitleştirmek gerekirse, fiziksel bir makine üzerinde ve bir bulut sunucusunda çalışan bir düğümü düşünelim:

- Bulut
  - Sağlayıcılar yüksek sunucu hizmet zamanı ve statik halka açık IP adresleri sunarlar
  - Özel veya sanal bir sunucu almak kendinizinkini yapmaktan daha rahat olabilir
  - Eksisi ise üçüncü bir parti olan sunucu sağlayıcısına güvenmeniz gerekmesidir
  - Tam düğüm için gereken depolama boyutu sebebiyle, kiralık sunucunun fiyatı yükselebilir
- Kendi donanımınız
  - Daha az güven gerektiren ve egemen yaklaşım
  - Bir kerelik yatırım
  - Önceden yapılandırılmış makine alma seçeneği
  - Makineyi fiziksel olarak hazırlamanız, bakımını yapmanız ve potansiyel makine ve ağ arızalarını gidermeniz gerekir

İki seçenek de yukarıda özetlendiği gibi farklı avantajlara sahiptir. Eğer bir bulut çözümü arıyorsanız, birçok geleneksel bulut bilişim sağlayıcısının yanı sıra ayrıca düğüm dağıtımına odaklı hizmetler bulunmaktadır. Barındırılan düğümler hakkında daha fazla seçenek için [hizmet olarak düğümlere](/developers/docs/nodes-and-clients/nodes-as-a-service/) göz atın.

#### Donanım {#hardware}

Ancak sansüre dirençli bir merkeziyetsiz ağ, bulut sağlayıcılarına bağımlı olmamalıdır. Bunun yerine, düğümünüzü kendi yerel donanımınızda çalıştırmanız ekosistem için daha faydalıdır. [Tahminler](https://www.ethernodes.org/networkType/cl/Hosting) düğümlerin büyük bir bölümünün bulutta çalıştığını ve bunun tek bir hata noktası haline gelebileceğini göstermektedir.

Ethereum istemcileri bilgisayarınızda, dizüstü bilgisayarınızda, sunucunuzda ve hatta tek kartlı bir bilgisayarda bile çalışabilir. İstemcileri kendi bilgisayarınızda çalıştırmak mümkün olsa da sadece düğümünüz için bir makineye sahip olmak, birincil bilgisayarınızın üzerindeki etkiyi azaltırken düğümün performansını ve güvenliğini de önemli ölçüde iyileştirebilir.

Kendi donanımınızı kullanmak çok kolay olabilir. Daha teknik kişiler için gelişmiş kurulumlar olduğu gibi birçok basit seçenek de mevcuttur. Hadi makinenizde Ethereum istemcileri çalıştırmak için gereksinimlere ve araçlara bakalım.

#### Gereksinimler {#requirements}

Donanım gereksinimleri istemciye göre farklılık gösterir, ancak düğümün yalnızca senkronize kalması gerektiğinden bu gereksinimler genellikle pek yüksek değildir. Bunu madencilikle karıştırmayın; madencilik çok daha fazla bilgi işlem gücü gerektirir. Bununla birlikte, senkronizasyon süresi ve performansı, daha güçlü donanımlarla iyileşir.

Herhangi bir istemciyi kurmadan önce, lütfen bilgisayarınızın onu çalıştırmak için yeterli kaynaklara sahip olduğundan emin olun. Minimum ve önerilen gereksinimleri aşağıda bulabilirsiniz.

Donanımınız için darboğaz çoğunlukla disk alanı olacaktır. Ethereum blok zinciri senkronizasyonunda girdi/çıktı yoğunluğu vardır ve çok fazla alan gerektirir. Senkronizasyondan sonra bile yüzlerce GB boş alana sahip bir **katı hal sürücüsüne (SSD)** sahip olmak en iyisidir.

Veritabanının boyutu ve ilk senkronizasyonun hızı, seçilen istemciye, yapılandırmasına ve [senkronizasyon stratejisine](/developers/docs/nodes-and-clients/#sync-modes) bağlıdır.

Ayrıca internet bağlantınızın bir [bant genişliği sınırı](https://wikipedia.org/wiki/Data_cap) ile kısıtlanmadığından emin olun. Başlangıç senkronizasyonu ve ağa yayınlanan veri, kotanızı aşabileceği için sınırsız bağlantı kullanmanız önerilir.

##### İşletim sistemi

Tüm istemciler ana işletim sistemlerini destekler: Linux, MacOS, Windows. Bu, düğümleri sıradan masaüstü veya sunucu makinelerinde, size en uygun işletim sistemiyle (OS) çalıştırabileceğiniz anlamına gelir. Potansiyel sıkıntılardan ve güvenlik açıklarından kaçınmak için işletim sisteminizin güncel olduğundan emin olun.

##### Minimum gereksinimler

- 2+ çekirdekli CPU
- 8 GB RAM
- 2 TB SSD
- 10+ MBit/sn bant genişliği

##### Tavsiye edilen özellikler

- 4+ çekirdekli hızlı CPU
- 16 GB+ RAM
- 2+ TB hızlı SSD
- 25+ MBit/sn bant genişliği

Seçtiğiniz senkronizasyon modu ve istemci alan gereksinimlerini etkileyecektir, ancak her bir istemci için ihtiyaç duyacağınız disk alanını aşağıda tahmin ettik.

| İstemci    | Disk boyutu (anlık senkronizasyon) | Disk boyutu (full archive) |
| ---------- | ----------------------------------------------------- | --------------------------------------------- |
| Besu       | 800GB+                                                | 12TB+                                         |
| Erigon     | Yok                                                   | 2.5TB+                        |
| Geth       | 500GB+                                                | 12TB+                                         |
| Nethermind | 500GB+                                                | 12TB+                                         |
| Reth       | Yok                                                   | 2,2 TB veya fazlası                           |

- Not: Erigon ve Reth anlık senkronizasyon sunmaz, ancak tam temizleme mümkündür ( Erigon için ~2TB, Reth için ~1,2TB)

Mutabakat istemcileri için alan gereksinimi, istemci uygulamasına ve etkinleştirilmiş özelliklere (ör. doğrulayıcı slasher) de bağlıdır, ancak genel olarak işaret zinciri verileri için gereken ek 200 GB'ı hesaba katın. Büyük bir doğrulayıcı sayısı ile bant genişliği yükü de artmaktadır. [Bu analizde mutabakat istemcisi gereksinimleri hakkındaki ayrıntıları](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc) bulabilirsiniz.

#### Tak ve çalıştır çözümleri {#plug-and-play}

Kendi donanımınızla bir düğüm çalıştırmak için en kolay seçenek tak-çalıştır kutular kullanmaktır. Satıcılardan önceden yapılandırılmış makineler en basit deneyimi sunar: sipariş et, bağla, çalıştır. Her şey önceden yapılandırılmıştır, açık bir kılavuz ve yazılım gözlemlemek ve kontrol etmek için bir kontrol paneli ile otomatik olarak çalışır.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Tek kartlı bir bilgisayarda Ethereum {#ethereum-on-a-single-board-computer}

Ethereum düğümünü çalıştırmanın kolay ve ucuz bir yolu, ARM mimarisine sahip olan Raspberry Pi bile olsa tek kartlı bir bilgisayar kullanmaktır. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/), Raspberry Pi ve diğer ARM kartları için birden fazla yürütme ve mutabakat istemcisinin çalıştırılması kolay görüntülerini sağlar.

Bunlar gibi küçük, ucuz ve verimli cihazlar evde düğüm çalıştırmak için idealdir fakat sınırlı performansları olduğunu aklınızda tutun.

## Düğümü başlatma {#spinning-up-node}

Asıl istemci kurulumu otomatik başlatıcılarla veya istemci yazılımını direkt şekilde ayarlayarak tamamlanabilir.

Daha az gelişmiş kullanıcılar için, önerilen yaklaşım size kurulumda rehberlik eden ve istemci kurulum sürecini otomatik hale getiren bir başlatıcı kullanılmasıdır. Ancak terminal kullanım deneyiminiz var ise, elle kurulum adımlarını takip etmek kolay olmalıdır.

### Kılavuzlu kurulum {#automatized-setup}

Birden fazla kullanıcı dostu proje, istemci kurulum deneyimini geliştirmeyi hedeflemektedir. Bu başlatıcılar otomatik istemci kurulumu ve yapılandırması sunar ve hatta bazıları kılavuzlu bir kurulum ve istemcilerin gözlemi için grafik bir arayüz sunar.

Aşağıda birkaç tıklamayla istemci kurmanıza ve yönetmenize yardımcı olacak birkaç proje bulunmaktadır:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DappNode yalnızca bir satıcıdan alınan bir makineyle gelmez. Yazılım, asıl düğüm başlatıcısı ve birçok özelliği olan kontrol merkezi herhangi bir donanımda kullanılabilir.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - Tam bir düğüm kurmanın en hızlı ve en kolay yolu. Tek satırlık kurulum aracı ve düğüm yönetimi TUI'si. Ücretsiz. Açık kaynak. Solo staker'lar tarafından Ethereum için kamu malları. ARM64 ve AMD64 desteği.
- [eth-docker](https://eth-docker.net/) - Kolay ve güvenli staking'e odaklanan, Docker kullanan otomatik kurulum. Temel terminal ve Docker bilgisi gerektirir, biraz daha ileri düzey kullanıcılara tavsiye edilir.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - Uzak bir sunucuya SSH bağlantısı aracılığıyla istemcileri kurmak için bir GUI kurulum kılavuzu, kontrol merkezi ve diğer birçok özelliğe sahip bir başlatıcı.
- [NiceNode](https://www.nicenode.xyz/) - Bilgisayarınızda bir düğüm çalıştırmak için basit bir kullanıcı deneyimine sahip başlatıcı. Sadece istemciler seçin ve birkaç tıkta bunları başlatın. Hâlâ geliştirilmektedir.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - CLI sihirbazını kullanarak otomatik olarak bir Docker yapılandırması oluşturan düğüm kurulum aracı. Nethermind tarafından Go ile yazılmıştır.

### Manuel istemci kurulumu {#manual-setup}

Diğer bir seçenek ise istemci yazılımını manuel olarak indirmek, doğrulamak ve yapılandırmaktır. Bazı istemciler bir grafik arayüzü sunsa bile, manuel bir kurulum basit terminal kabiliyeti gerektirir ancak çok daha fazla değişkenlik sağlar.

Önceden de anlatıldığı gibi, kendi Ethereum düğümünüzü kurmak bir fikir birliği ve yürütüm istemcisi çifti çalıştırmayı gerektirecektir. Bazı istemciler diğer türden bir hafif istemci içerebilir ve başka bir yazılıma duymadan eşlenebilir. Ancak, tam güven gerektirmeyen doğrulama iki uygulamayı da gerektirir.

#### İstemci yazılımını edinme {#getting-the-client}

Öncelikle, tercih ettiğiniz [yürütme istemcisi](/developers/docs/nodes-and-clients/#execution-clients) ve [mutabakat istemcisi](/developers/docs/nodes-and-clients/#consensus-clients) yazılımını edinmeniz gerekir.

İşletim sisteminize ve mimarinize uyan bir yürütülebilir uygulama veya bir kurulum paketi indirmeniz yeterlidir. Her zaman indirilen paketlerin imzalarını ve denetim toplamlarını doğrulayın. Bazı istemciler ayrıca daha kolay kurulum ve güncellemeler için depolar veya Docker görüntüleri sağlar. Tüm istemciler açık kaynaklıdır, yani bunları kaynağından da inşa edebilirsiniz. Bu daha gelişmiş bir yöntemdir, ancak bazı durumlarda gerekli olabilir.

Her bir istemcinin kurulumu için yönergeler yukarıdaki istemci listelerinde bağlantısı verilmiş dokümanlarda sağlanmıştır.

İstemcilerin önceden inşa edilmiş dosyalarını veya kurulum yönergelerini bulabileceğiniz çıkarım sürüm notu sayfaları buradadır:

##### Yürütüm istemcileri

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Ayrıca istemci çeşitliliğinin [yürütme katmanında bir sorun](/developers/docs/nodes-and-clients/client-diversity/#execution-layer) olduğunu da belirtmek gerekir. Okurların azınlık bir yürütüm istemcisi çalıştırması önerilir.

##### Mutabakat istemcileri

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/) (Önceden oluşturulmuş bir ikili dosya sağlamaz, yalnızca bir Docker görüntüsü sunar veya kaynaktan oluşturulması gerekir)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[İstemci çeşitliliği](/developers/docs/nodes-and-clients/client-diversity/), doğrulayıcıları çalıştıran mutabakat düğümleri için kritik öneme sahiptir. Eğer doğrulayıcıların çoğunluğu tek bir istemci uygulaması kullanıyorsa, ağ güvenliği risk altındadır. Bundan dolayı azınlık bir istemci seçiminin düşünülmesi önerilir.

[En son ağ istemcisi kullanımını görün](https://clientdiversity.org/) ve [istemci çeşitliliği](/developers/docs/nodes-and-clients/client-diversity) hakkında daha fazla bilgi edinin.

##### Yazılımı doğrulamak

İnternetten yazılım indirirken, bütünlüğünün doğrulanması önerilir. Bu adım zorunlu değildir ancak özellikle Ethereum istemcisi gibi önemli bir altyapı parçası için potansiyel saldırı vektörleri ve onlardan nasıl kaçınılacağıyla ilgili farkındalık sahibi olmak önemlidir. Eğer önceden inşa edilmiş bir dosya indirdiyseniz, ona güvenmeniz gerekir ve bir saldırganın çalıştırılabilir dosyayı zararlı bir versiyonuyla değiştirebileceği riskini göze alırsınız.

Geliştiriciler yayınlanmış dosyaları kendi PGP anahtarları ile imzalarlar böylece tam olarak onların oluşturduğu yazılımı çalıştırdığınızı kriptografik olarak doğrulayabilirsiniz. Geliştiriciler tarafından kullanılan herkese açık anahtarları elde etmeniz gerekir, bunlar da istemci yayım sayfalarında veya dokümanlarda bulunur. İstemci sürümünü ve imzasını indirdikten sonra, bunları kolayca doğrulamak için [GnuPG](https://gnupg.org/download/index.html) gibi bir PGP uygulaması kullanabilirsiniz. [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) veya [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/) üzerinde `gpg` kullanarak açık kaynaklı yazılımları doğrulama üzerine bir eğitime göz atın.

Başka bir doğrulama yöntemi ise geliştiriciler tarafından sağlanan karmanın, yani eşsiz kriptografik bir parmak izinin, indirdiğiniz yazılımınki ile uyup uymadığından emin olmaktır. Bu PGP kullanmaktan bile daha kolaydır ve bazı istemciler sadece bu seçeneği sunar. Sadece karma fonksiyonunu indirilen yazılım üzerinde çalıştırın ve sürüm notu sayfasındaki ile karşılaştırın. Örneğin:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### İstemci kurulumu {#client-setup}

İstemci yazılımını indirdikten, kurduktan veya derledikten sonra, çalıştırmaya hazırsınız. Bu sadece yeterli yapılandırma ile yürütülebileceği anlamına gelir. İstemciler birçok özelliği etkinleştirebilen zengin yapılandırma seçenekleri sunarlar.

Hadi istemci performansını ve veri kullanımını büyük oranda etkileyen seçeneklerle başlayalım. [Senkronizasyon modları](/developers/docs/nodes-and-clients/#sync-modes), blok zinciri verilerini indirmenin ve doğrulamanın farklı yöntemlerini temsil eder. Düğümü başlatmadan önce, hangi ağı ve senkronizasyon modunu kullanacağınıza karar vermelisiniz. Göz önünde bulundurulması gereken en önemli şeyler ise disk alanı ve istemcinin ihtiyaç duyacağı senkronizasyon süresidir. Hangi senkronizasyon modunun varsayılan olduğunu belirlemek için istemcinin dokümanlarına dikkat edin. Eğer size uymazsa, güvenlik düzeyine, mevcut veriye ve maliyete göre başka birini seçin. Senkronizasyon algoritmasının yanı sıra, farklı türdeki eski verilerin budanmasını da ayarlayabilirsiniz. Budama, güncel olmayan verilerin silinmesini, yani son bloklardan ulaşılamayan durum trie düğümlerinin kaldırılmasını sağlar.

Diğer temel yapılandırma seçenekleri, örneğin bir ağ seçme (Ana Ağ veya test ağları), RPC veya WebSockets için HTTP uç noktasını etkinleştirme vb.'dir. Tüm özellikler ve seçenekleri istemcinin dokümanlarında bulabilirsiniz. İstemciyi uyumlu bayraklarla çalıştırarak direkt olarak CLI'de veya yapılandırma dosyasında çeşitli istemci yapılandırmaları belirlenebilir. Her istemci biraz farklıdır; lütfen her zaman yapılandırma seçenekleri hakkında detaylar için resmi dokümanlara veya yardım sayfasına başvurun.

Test etmek amaçlı olarak, istemciyi test ağlarından birinde çalıştırmayı tercih edebilirsiniz. [Desteklenen ağlara genel bakışı görün](/developers/docs/nodes-and-clients/#execution-clients).

Yürütüm istemcilerinin basit yapılandırma ile çalıştırılma örnekleri sıradaki bölümde görülebilir.

#### Yürütme istemcisini başlatma {#starting-the-execution-client}

Ethereum istemci yazılımını başlatmadan önce, ortamınızın hazır olduğuna dair son bir kontrol yapın. Örneğin, şunlara emin olun:

- Seçilmiş ağ ve senkronizasyon modu hesaba katıldığında yeterli disk alanı olduğuna.
- Bellek ve CPU'nun diğer programlar tarafından durdurulmadığına.
- İşletim sisteminin en güncel sürüme güncellendiğine.
- Sistemin doğru saat ve tarihe ayarlı olduğuna.
- Yönlendiriciniz ve güvenlik duvarınızın, dinleme bağlantı noktalarındaki bağlantıları kabul ettiğine. Varsayılan olarak Ethereum istemcileri, ikisi de varsayılan olarak 30303 üzerinde olan bir dinleyici (TCP) bağlantı noktası ve bir keşif (UDP) bağlantı noktası kullanır.

Her şeyin doğru çalıştığından emin olmak için önce istemcinizi bir test ağında çalıştırın.

Başlangıçta, varsayılan olmayan tüm istemci ayarlarını bildirmeniz gerekir. Tercih yapılandırmalarınızı duyurmak için bayrakları veya yapılandırma dosyasını kullanabilirsiniz. Her bir istemcinin özellik listesi ve yapılandırma söz dizimi farklılık gösterir. Detaylar için istemcinizin dokümanlara bakın.

Yürütme ve mutabakat istemcileri, [Motor API'sinde](https://github.com/ethereum/execution-apis/tree/main/src/engine) belirtilen kimliği doğrulanmış bir uç nokta aracılığıyla iletişim kurar. Bir mutabakat istemcisine bağlanmak için yürütme istemcisinin bilinen bir yolda bir [`jwtsecret`](https://jwt.io/) oluşturması gerekir. Güvenlik ve istikrar sebeplerinden dolayı, istemciler aynı makinede çalışmalıdır ve iki istemci de bu yolu aralarında yerel bir RPC bağlantısını doğrulamak için kullanıldığından bilmelidir. Yürütüm istemcisi ayrıca kimliği doğrulanmış API'lar için bir dinleme bağlantı noktası tanımlamalıdır.

Bu token istemci yazılmı tarafından otomatik olarak oluşturulur ama bazı durumlar kendiniz yapmanız gerekebilir. [OpenSSL](https://www.openssl.org/) kullanarak oluşturabilirsiniz:

```sh
openssl rand -hex 32 > jwtsecret
```

#### Bir yürütme istemcisini çalıştırma {#running-an-execution-client}

Bu bölüm size yürütüm istemcileri başlatmada rehberlik edecektir. Sadece istemciyi şu ayarlarla başlatacak temel bir yapılandırma örneği olarak görev yapmaktadır:

- Bağlanılacak ağı belirler, bizim örneklerimizde Ana ağ
  - Bunun yerine, kurulumunuzun ön testi için [test ağlarından birini](/developers/docs/networks/) seçebilirsiniz
- Blok zincir dahil tüm verinin depolanacağı veri klasörünü belirtir
  - Yolu, örneğin harici sürücünüze işaret eden gerçek bir yolla değiştirdiğinizden emin olun
- İstemci ile iletişim için arayüzleri aktif eder
  - Fikir birliği istemcisiyle iletişim için JSON-RPC ve Engine API'si içerir
- Kimliği doğrulanmış API için `jwtsecret` yolunu tanımlar
  - Örnek yolu, istemciler tarafından erişilebilen gerçek bir yolla, ör. `/tmp/jwtsecret` ile değiştirdiğinizden emin olun

Bunun temel bir örnek olduğunu aklınızda tutun, diğer tüm ayarlar varsayılana ayarlı olacaktır. Varsayılan değerler, ayarlar ve özellikleri öğrenmek için her bir istemcinin dokümasyonlarına dikkat edin. Gözlem, doğrulayıcı çalıştırmak ve benzeri gibi daha fazla özellik için spesifik istemcinin dokümanlarına başvurun.

> Örneklerdeki ters eğik çizgilerin (``) yalnızca biçimlendirme amaçlı olduğunu unutmayın; yapılandırma bayrakları tek bir satırda tanımlanabilir.

##### Besu'yu Çalıştırmak

Bu örnek, Besu'yu Ana Ağ'da başlatır, blok zinciri verilerini `/data/ethereum` adresinde varsayılan biçimde depolar, JSON-RPC'yi ve mutabakat istemcisini bağlamak için Motor RPC'sini etkinleştirir. Motor API'si `jwtsecret` jetonu ile doğrulanır ve yalnızca `localhost`'tan gelen çağrılara izin verilir.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu aynı zamanda birtakım sorular soran ve yapılandırma dosyasını oluşturan bir başlatıcı seçeneği ile beraber gelir. Etkileşimli başlatıcıyı şunu kullanarak çalıştırın:

```sh
besu --Xlauncher
```

[Besu'nun belgeleri](https://besu.hyperledger.org/public-networks/get-started/start-node/) ek seçenekler ve yapılandırma ayrıntıları içerir.

##### Erigon'u Çalıştırmak

Bu örnek Erigon'u Ana Ağ'da başlatır, blok zinciri verilerini `/data/ethereum` adresinde depolar, JSON-RPC'yi etkinleştirir, hangi ad alanlarına izin verildiğini tanımlar ve `jwtsecret` yolu ile tanımlanan mutabakat istemcisine bağlanmak için kimlik doğrulamasını etkinleştirir.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Erigon varsayılan olarak 8 GB bir HDD ile tam senkronizasyon gerçekleştirir, bu da 2 TB'den fazla arşiv verisi ortaya çıkartır. `datadir`'in yeterli boş alana sahip bir diske işaret ettiğinden emin olun veya farklı türde verileri kırpabilen `--prune` bayrağına bakın. Daha fazla bilgi edinmek için Erigon'un `--help` komutunu kontrol edin.

##### Geth'i Çalıştırmak

Bu örnek Geth'i Ana Ağ'da başlatır, blok zinciri verilerini `/data/ethereum` adresinde depolar, JSON-RPC'yi etkinleştirir ve hangi ad alanlarına izin verildiğini tanımlar. Ayrıca, `jwtsecret` yolunu gerektiren mutabakat istemcisine bağlanmak için kimlik doğrulamasını ve hangi bağlantılara izin verildiğini tanımlayan seçeneği de etkinleştirir; bizim örneğimizde yalnızca `localhost`'tan gelen bağlantılara izin verilir.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

[Tüm yapılandırma seçenekleri için belgelere](https://geth.ethereum.org/docs/fundamentals/command-line-options) göz atın ve [Geth'i bir mutabakat istemcisiyle çalıştırma](https://geth.ethereum.org/docs/getting-started/consensus-clients) hakkında daha fazla bilgi edinin.

##### Nethermind'ı Çalıştırmak

Nethermind çeşitli [kurulum seçenekleri](https://docs.nethermind.io/get-started/installing-nethermind) sunar. Paket çeşitli dosyalarla gelir, bunlara yapılandırmayı etkileşimli bir şekilde oluşturmanıza yardımcı olacak kılavuzlu kurulumu olan bir Başlatıcı dahildir. Alternatif olarak, çalıştırılabilir dosyanın kendisi olan Çalıştırıcı'yı bulacaksınız ve bunu sadece yapılandırma bayrakları ile çalıştırabilirsiniz. JSON-RPC varsayılan olarak etkindir.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Nethermind belgeleri, Nethermind'i mutabakat istemcisiyle çalıştırma hakkında [eksiksiz bir kılavuz](https://docs.nethermind.io/get-started/running-node/) sunar.

Bir yürütüm istemcisi çekirdek fonksiyonlarını ve seçili uç noktalarını başlatacak ve eşleri aramaya başlayacaktır. İstemci, eşlerini başarılı bir şekilde bulduktan sonra senkronizasyonu başlatır. Yürütüm istemcisi fikir birliği istemcisinden bir bağlantı bekleyecektir. İstemci mevcut duruma başarılı şekilde senkronize edildiğinde mevcut blok zincir verisi mevcut olacaktır.

##### Reth'i Çalıştırma

Bu örnek Reth'i Ana Ağda, varsayılan depolama lokasyonunu kullanarak başlatır. `jwtsecret` yolu ile tanımlanan mutabakat istemcisine bağlanmak için JSON-RPC ve Motor RPC kimlik doğrulamasını etkinleştirir, yalnızca `localhost`'tan gelen çağrılara izin verilir.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Varsayılan veri dizinleri hakkında daha fazla bilgi edinmek için [Reth'i Yapılandırma](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) bölümüne bakın. [Reth'in belgeleri](https://reth.rs/run/mainnet.html) ek seçenekler ve yapılandırma ayrıntıları içerir.

#### Mutabakat istemcisini başlatma {#starting-the-consensus-client}

Fikir birliği istemcisi yürütüm istemcisi ile yerel bir RPC bağlantısı kurmak için doğru bir port yapılandırması ile başlatılmalıdır. Fikir birliği istemcilerinin bir yapılandırma argümanı olarak açık yürütüm istemcisi portu ile çalıştırılmaları gerekir.

Mutabakat istemcisinin, aralarındaki RPC bağlantısının kimliğini doğrulamak için yürütme istemcisinin `jwt-secret` yoluna da ihtiyacı vardır. Yukarıdaki yürütüm örneklerine benzer şekilde, her fikir birliği istemcisinn jwt token dosya yolunu argüman olarak alan bir yapılandırma bayrağı bulunur. Bu, yürütme istemcisine sağlanan `jwtsecret` yolu ile tutarlı olmalıdır.

Bir doğrulayıcı çalıştırmayı planlıyorsanız, alıcının Ethereum adresini belirten bir yapılandırma bayrağı eklediğinizden emin olun. Bu doğrulayıcınızın ether ödüllerinin birikeceği yerdir. Her mutabakat istemcisinin, argüman olarak bir Ethereum adresi alan `--suggested-fee-recipient=0xabcd1` gibi bir seçeneği vardır.

Bir test ağında bir İşaret Düğümü başlatırken, [Kontrol noktası senkronizasyonu](https://notes.ethereum.org/@launchpad/checkpoint-sync) için genel bir uç nokta kullanarak önemli ölçüde senkronizasyon süresinden tasarruf edebilirsiniz.

#### Bir mutabakat istemcisini çalıştırma {#running-a-consensus-client}

##### Lighthouse'u Çalıştırmak

Lighthouse'ı çalıştırmadan önce, [Lighthouse Kitabı'nda](https://lighthouse-book.sigmaprime.io/installation.html) nasıl kurulacağı ve yapılandırılacağı hakkında daha fazla bilgi edinin.

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Lodestar'ı Çalıştırmak

Lodestar yazılımını derleyerek veya Docker görüntüsünü indirerek kurun. [Belgelerde](https://chainsafe.github.io/lodestar/) ve daha kapsamlı [kurulum kılavuzunda](https://hackmd.io/@philknows/rk5cDvKmK) daha fazla bilgi edinin.

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Nimbus'u Çalıştırmak

Nimbus hem yürütüm hem de fikir birliği istemcileriyle gelir. En makul hesaplama gücüne sahip olan çeşitli cihazlarda bile çalıştırılabilir.
[Bağımlılıkları ve Nimbus'un kendisini kurduktan sonra](https://nimbus.guide/quick-start.html), mutabakat istemcisini çalıştırabilirsiniz:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Prysm'i Çalıştırmak

Prysm kolay otomatik kurulum sağlayan bir betikle gelir. Ayrıntılar [Prysm belgelerinde](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/) bulunabilir.

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Teku'yu Çalıştırmak

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Bir fikir birliği istemcisi yatırım sözleşmesini okumak ve doğrulayıcıları tespit etmek için yürütüm istemcisine bağlandığında, aynı zamanda diğer İşaret Düğümü eşlerine bağlanır ve başlangıçtan itibaren mutabakat yuvalarını senkronize etmeye başlar. İşaret Düğümü mevcut döneme ulaştığında, İşaret API doğrulayıcınız için kullanılabilir hale gelir. [İşaret Düğümü API'leri](https://eth2docs.vercel.app/) hakkında daha fazla bilgi edinin.

### Doğrulayıcı Ekleme {#adding-validators}

Bir fikir birliği istemcisi, doğrulayıcıların bağlanması için bir İşaret Düğümü işlevi görür. Her fikir birliği istemcisinin ilgili dokümanlarında detaylı şekilde açıklanan kendi doğrulayıcı yazılımı bulunur.

Kendi doğrulayıcınızı çalıştırmak, Ethereum ağını desteklemenin en etkili ve güven gerektirmeyen yöntemi olan [solo staking'e](/staking/solo/) olanak tanır. Ancak bunun için 32 ETH'lik bir yatırım gerekir. Kendi düğümünüzde daha küçük bir miktarla bir doğrulayıcı çalıştırmak için, [Rocket Pool](https://rocketpool.net/node-operators) gibi izinsiz düğüm operatörlerine sahip merkeziyetsiz bir havuz ilginizi çekebilir.

Staking ve doğrulayıcı anahtar üretimine başlamanın en kolay yolu, [Hoodi üzerinde düğümler çalıştırarak](https://notes.ethereum.org/@launchpad/hoodi) kurulumunuzu test etmenize olanak tanıyan [Hoodi Test Ağı Staking Başlatma Paneli'ni](https://hoodi.launchpad.ethereum.org/) kullanmaktır. Ana Ağ için hazır olduğunuzda, [Ana Ağ Staking Başlatma Paneli'ni](https://launchpad.ethereum.org/) kullanarak bu adımları tekrarlayabilirsiniz.

Staking seçeneklerine genel bir bakış için [staking sayfasına](/staking) göz atın.

### Düğümü kullanma {#using-the-node}

Yürütme istemcileri, Ethereum ağında çeşitli yollarla işlem göndermek, akıllı sözleşmelerle etkileşim kurmak veya onları dağıtmak için kullanabileceğiniz [RPC API uç noktaları](/developers/docs/apis/json-rpc/) sunar:

- Uygun bir protokolle manuel olarak çağırma (ör. `curl` kullanarak)
- Sağlanan bir konsolu ekleme (ör. `geth attach`)
- [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/) gibi web3 kütüphanelerini kullanarak uygulamalarda uygulama

Farklı istemciler, RPC uç noktalarının farklı uygulamalarına sahiptir. Ancak her istemciyle kullanabileceğiniz standart bir JSON-RPC bulunmaktadır. Genel bir bakış için [JSON-RPC belgelerini okuyun](/developers/docs/apis/json-rpc/). Ethereum ağından bilgiye ihtiyaç duyan uygulamalar bu RPC'yi kullanabilir. Örneğin, popüler cüzdan MetaMask, güçlü gizlilik ve güvenlik avantajlarına sahip [kendi RPC uç noktanıza bağlanmanıza](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) olanak tanır.

Tüm mutabakat istemcileri, [Curl](https://curl.se) gibi araçları kullanarak istek göndererek mutabakat istemcisinin durumunu kontrol etmek veya blokları ve mutabakat verilerini indirmek için kullanılabilecek bir [İşaret API'si](https://ethereum.github.io/beacon-APIs) sunar. Bununla ilgili daha fazla bilgiye, her bir fikir birliği istemcisinin dökümanlarından ulaşılabilir.

#### RPC'ye ulaşma {#reaching-rpc}

Yürütme istemcisi JSON-RPC için varsayılan bağlantı noktası `8545`'tir ancak yerel uç noktaların bağlantı noktalarını yapılandırmada değiştirebilirsiniz. Varsayılan olarak, RPC arayüzüne sadece bilgisayarınızın yerel sunucusundan erişilebilir. Uzaktan erişilebilir hale getirmek için adresi `0.0.0.0` olarak değiştirerek herkese açık hale getirmek isteyebilirsiniz. Bu, onu yerel ağ ve genel IP adresleri üzerinden erişilebilir hale getirecektir. Çoğu durumda yönlendiricinizde port yönlendirmeyi de kurmanız gerekecektir.

İnternete port açmaya dikkatle yaklaşın çünkü bu internetteki herhangi birinin düğümünüzü kontrol etmesine izin verecektir. Kötü amaçlı aktörler, sisteminizi çökertmek için düğümünüze erişim sağlayabilirler veya istemcinizi cüzdan olarak kullanıyorsanız paranızı çalabilirler.

Bu engeli aşmanın bir yolu ise potansiyel olarak zararlı olan RPC yöntemlerinin değiştirilebilmesini engellemektir. Örneğin, Geth ile değiştirilebilir yöntemleri bir bayrakla bildirebilirsiniz: `--http.api web3,eth,txpool`.

RPC arayüzüne erişim, sınır katman API'larının geliştirmesi veya Nginx gibi web sunucusu uygulamaları ve onların istemcinizin yerel adres ve portuna bağlanması ile genişletilebilir. Bir ara katmandan yararlanmak, geliştiricilere RPC arayüzüne güvenli `https` bağlantıları için bir sertifika kurma olanağı da sağlayabilir.

Bir web sunucusu, proxy veya dışa bakan bir Rest API ayarlamak düğümünüzün RPC uç noktasına erişim sağlamak için tek yol değildir. Herkese açık bir uç nokta kurmanın gizliliği koruyan başka bir yolu da düğümü kendi [Tor](https://www.torproject.org/) onion hizmetinizde barındırmaktır. Bu, genel statik bir IP adresi veya açık portlar olmadan yerel ağınızın dışında RPC'ye erişmenizi sağlayacaktır. Ancak bu yapılandırmanın kullanılması RPC uç noktasının sadece tüm uygulamalar tarafından desteklenmeyen Tor ağı aracılığıyla erişilebilir olmasına yol açacaktır ve bağlantı sorunlarına sebep olabilir.

Bunu yapmak için kendi [onion hizmetinizi](https://community.torproject.org/onion-services/) oluşturmanız gerekir. Kendi hizmetinizi barındırmak için onion hizmeti kurulumu hakkındaki [belgelere](https://community.torproject.org/onion-services/setup/) göz atın. Onu RPC portuna proxy'si olan bir web sunucusu ile veya direkt olarak RPC'ye işaret ettirebilirsiniz.

Sonuncu ve iç ağlara erişim sağlamak için en popüler yollardan biri ise VPN bağlantısıdır. Kullanım alanınıza ve düğümünüze ihtiyaç duyan kullanıcı niceliğine göre, güvenli VPN bağlantısı bir seçenek olabilir. [OpenVPN](https://openvpn.net/), endüstri standardı SSL/TLS protokolünü kullanarak OSI katman 2 veya 3 güvenli ağ uzantısını uygulayan, sertifikalara, akıllı kartlara ve/veya kullanıcı adı/parola kimlik bilgilerine dayalı esnek istemci kimlik doğrulama yöntemlerini destekleyen ve VPN sanal arayüzüne uygulanan güvenlik duvarı kurallarını kullanarak kullanıcıya veya gruba özel erişim kontrolü politikalarına izin veren tam özellikli bir SSL VPN'dir.

### Düğümü işletme {#operating-the-node}

Düğümünüzün düzgün çalıştığından emin olmak için onu düzenli olarak izlemelisiniz. Zaman zaman bakım yapmanız gerekebilir.

#### Bir düğümü çevrimiçi tutma {#keeping-node-online}

Düğümünüzün her zaman çevrimiçi olması gerekmez, ancak ağ ile senkronize durumda olması için onu olabildiğince çevrimiçi tutmalısınız. Yeniden başlatmak için kapatabilirsiniz ama şunu unutmayın:

- Kapatmak, eğer güncel durum hâlâ sabit diske yazılıyorsa birkaç dakika sürebilir.
- Zorla kapatmalar veritabanına hasar verebilir, bu da tüm düğümü yeniden senkronize etmenizi gerektirir.
- İstemcinizin ağ ile senkronizasyonu bozulacaktır ve yeniden başlattığınızda tekrar senkronize etmeniz gerekecektir. Düğüm kapatıldığı son yerden senkronize olmaya başlasa da, çevrim dışı olduğu süreye göre süreç zaman alabilir.

_Bu, mutabakat katmanı doğrulayıcı düğümleri için geçerli değildir._ Düğümünüzü çevrimdışı bırakmak, ona bağlı tüm hizmetleri etkileyecektir. _Staking_ amacıyla bir düğüm çalıştırıyorsanız, kesinti süresini mümkün olduğunca en aza indirmeye çalışmalısınız.

#### İstemci hizmetleri oluşturma {#creating-client-services}

İstemcilerinizi başlangıçta otomatik olarak çalıştırmak için bir hizmet oluşturmayı düşünün. Örneğin, Linux sunucularında, istemciyi uygun yapılandırmayla, sınırlı ayrıcalıklara sahip bir kullanıcı altında yürüten ve otomatik olarak yeniden başlatan, `systemd` gibi bir hizmet oluşturmak iyi bir uygulamadır.

#### İstemcileri güncelleme {#updating-clients}

İstemci yazılımınızı en son güvenlik yamaları, özellikler ve [EIP'ler](/eips/) ile güncel tutmanız gerekir. Özellikle [sert çatallardan](/ethereum-forks/) önce, doğru istemci sürümlerini çalıştırdığınızdan emin olun.

> Önemli ağ güncellemelerinden önce EF, [blogunda](https://blog.ethereum.org) bir gönderi yayınlar. Düğümünüzün bir güncellemeye ihtiyacı olduğunda e-postanıza bir bildirim almak için [bu duyurulara abone olabilirsiniz](https://blog.ethereum.org/category/protocol#subscribe).

İstemcileri güncellemek çok basittir. Her istemcinin dokümanlarında belirli yönergeler vardır, ancak süreç genellikle en güncel sürümü indirmek ve istemciyi yeni çalıştırılabilir dosya ile yeniden başlatmaktır. İstemci kaldığı yerden ancak uygulanan güncellemelerle devam etmelidir.

Her istemci uygulamasının, eşler arası protokolde kullanılan insan tarafından okunabilir bir sürüm dizesi vardır, ancak buna komut satırından da erişilebilir. Bu sürüm dizesi, kullanıcıların doğru sürümü çalıştırıp çalıştırmadıklarını kontrol etmelerini sağlar ve belirli istemcilerin ağ üzerindeki dağılımını ölçmekle ilgilenen blok arayıcılarına ve diğer analitik araçlara izin verir. Sürüm dizileri hakkında daha fazla bilgi için lütfen bireysel istemci dokümanlarına bakın.

#### Ek hizmetleri çalıştırma {#running-additional-services}

Kendi düğümünüzü çalıştırmak Ethereum istemci RPC'sine doğrudan erişim gerektiren hizmetleri kullanmanızı sağlar. Bunlar, [katman 2 çözümleri](/developers/docs/scaling/#layer-2-scaling), cüzdanlar için arka uç, blok gezginleri, geliştirici araçları ve diğer Ethereum altyapısı gibi Ethereum üzerine kurulmuş hizmetlerdir.

#### Düğümü izleme {#monitoring-the-node}

Düğümünüzü düzgün şekilde gözlemlemek istiyorsanız, metrik toplamayı gözden geçirin. İstemciler, düğümünüz hakkında kapsamlı veri alabilmeniz için metrik uç noktaları sunar. [Grafana](https://grafana.com/) gibi yazılımlarda görselleştirmelere ve grafiklere dönüştürebileceğiniz veritabanları oluşturmak için [InfluxDB](https://www.influxdata.com/get-influxdb/) veya [Prometheus](https://prometheus.io/) gibi araçları kullanın. Bu yazılımları kullanmak için birçok farklı kurulum ve düğümünüzle ağı tamamen görselleştirebilmek için farklı Grafana gösterge panelleri bulunmaktadır. Örneğin, [Geth'i izleme eğitimine](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/) göz atın.

Gözetlemenize dahil olarak, makinenizin performansına da dikkat etmeyi unutmayın. Düğümünüzün başlangıç senkronizasyonu esnasında istemci yazılımı CPU ve RAM üzerinde ağırlık yapabilir. Grafana'ya ek olarak, bunu yapmak için işletim sisteminizin sunduğu `htop` veya `uptime` gibi araçları kullanabilirsiniz.

## Daha fazla kaynak {#further-reading}

- [Ethereum Staking Kılavuzları](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, sık sık güncellenir_
- [Kılavuz | Ana ağda Ethereum staking için bir doğrulayıcı nasıl kurulur](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, sık sık güncellenir_
- [Test ağlarında doğrulayıcıları çalıştırmaya ilişkin ETHStaker kılavuzları](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, düzenli olarak güncellenir_
- [Ethereum Düğümleri için Örnek AWS Blockchain Düğüm Çalıştırıcı uygulaması](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) - _AWS, sık sık güncellenir_
- [Düğüm operatörleri için Birleşim SSS'si](https://notes.ethereum.org/@launchpad/node-faq-merge) - _Temmuz 2022_
- [Tam bir Ethereum onaylanmış düğümü olmak için donanım gereksinimlerini analiz etme](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 Eylül 2018_
- [Ethereum Tam Düğümlerini Çalıştırma: Yeterince Motive Olmayanlar İçin Bir Rehber](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Kasım 2019_
- [Ethereum Ana Ağı'nda Hyperledger Besu Düğümü Çalıştırma: Avantajlar, Gereksinimler ve Kurulum](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mayıs 2020_
- [Nethermind Ethereum İstemcisini İzleme Yığını ile Dağıtma](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 Temmuz 2020_

## Alakalı başlıklar {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [Bloklar](/developers/docs/blocks/)
- [Ağlar](/developers/docs/networks/)
