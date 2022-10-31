---
title: Kendi Ethereum düğümünüzü başlatın
description: Kendi Ethereum istemcinizi çalıştırmaya genel bir giriş.
lang: tr
sidebarDepth: 2
---

Kendi düğümünüzü çalıştırmak size birçok fayda sağlar, yeni fırsatlar oluşturur ve ekosistemi desteklemeye yardımcı olur. Bu sayfa size kendi düğümünüzü başlatmanız ve Ethereum işlem doğrulamalarına katılmanız için rehber olacaktır.

## Ön koşullar {#prerequisites}

Bir Ethereum düğümünün ne olduğunu ve neden bir istemci çalıştırmak isteyebileceğinizi anlamalısınız. Bunlar, [Düğümler ve istemciler](/developers/docs/nodes-and-clients/) bölümünde anlatılmıştır.

Eğer düğüm çalıştırma konusunda acemiyseniz veya daha az teknik bir yol arıyorsanız, ilk olarak [bir Ethereum düğümü çalıştırmak üzerine](/run-a-node) kullanıcı dostu öğreticimize göz atmanızı öneririz.

## Bir yaklaşım seçme {#choosing-approach}

Düğümünüzü başlatmak için atmanız gereken ilk adım bir yaklaşım seçmek olacaktır. İstemciyi (yazılımı), ortamı ve başlamak istediğiniz parametreleri seçmeniz gerekir. Tüm mevcut [Mainnet istemcilerini](/developers/docs/nodes-and-clients/#advantages-of-different-implementations) görün.

#### İstemci ayarları {#client-settings}

İstemci uygulamaları farklı senkronizasyon modları ve çeşitli diğer özellikler sağlar. [Senkronizasyon modları](/developers/docs/nodes-and-clients/#sync-modes) farklı blok zinciri verileri indirme ve doğrulama yöntemlerini temsil eder. Düğümü başlatmadan önce, hangi ağı ve senkronizasyon modunu kullanacağınıza karar vermelisiniz. Göz önünde bulundurulması gereken en önemli şeyler ise disk alanı ve istemcinin ihtiyaç duyacağı senkronizasyon süresidir.

Tüm özellikler ve seçenekler istemcilerin belgelerinde bulunabilir. İstemciyi uyumlu bayraklarla çalıştırarak çeşitli istemci yapılandırmaları belirlenebilir. [EthHub](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/#client-settings) veya istemci belgelerinden bayraklarla ilgili daha fazla bilgi alabilirsiniz. Amaç test etmek ise, test ağlarından birinde istemci çalıştırmayı tercih edebilirsiniz. [Desteklenen ağları gözden geçirin](/developers/docs/nodes-and-clients/#execution-clients).

### Ortam ve donanım {#environment-and-hardware}

#### Yerel veya Bulut {#local-vs-cloud}

Ethereum istemcileri tüketici sınıfı bilgisayarlarda çalışabilirler ve örneğin madencilikte olduğu gibi özel donanım gerektirmezler. Bu sebeple, ihtiyaçlarınıza bağlı olarak dağıtım için çeşitli seçenekleriniz bulunur. Basitleştirmek gerekirse, fiziksel bir makine üzerinde ve bir bulut sunucusunda çalışan bir düğümü düşünelim:

- Bulut
  - Sağlayıcılar yüksek sunucu hizmet zamanı ve statik halka açık IP adresleri sunar
  - Özel veya sanal bir sunucu almak kendinizinkini yapmaktan daha rahat olabilir
  - Eksisi ise üçüncü bir parti olan sunucu sağlayıcısına güvenmeniz gerekmesidir
  - Tam düğüm için gereken depolama büyüklüğü sebebiyle kiralanan bir sunucunun fiyatı yüksek olabilir
- Kendi donanımınız
  - Daha az güven gerektiren ve egemen yaklaşım
  - Bir kerelik yatırım
  - Önceden yapılandırılmış makine alma seçeneği
  - Fiziksel olarak makineyi hazırlamanız, sürdürmeniz ve potansiyel olarak arıza gidermeniz gerekir

İki seçenek de yukarıda özetlendiği gibi farklı avantajlara sahiptir. Eğer bir bulut çözümü arıyorsanız, birçok geleneksel bulut bilişim sağlayıcısının yanı sıra ayrıca düğüm dağıtımına odaklı hizmetler bulunmaktadır. Örneğin:

- [QuikNode](https://www.quiknode.io/)
- [Blockdaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### Donanım {#hardware}

Ancak sansüre dirençli bir merkeziyetsiz ağ, bulut sağlayıcılarına bağımlı olmamalıdır. Düğümünüzü donanım üzerinde çalıştırmanız ekosistem için daha sağlıklıdır. En kolay seçenekler bunlar gibi önceden yapılandırılmış makinelerdir:

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

[Her bir istemci ve senkronizasyon modu için ](/developers/docs/nodes-and-clients/#requirements) minimum ve önerilen disk alanı gereksinimlerini kontrol edin. Genel olarak, ortalama bir bilgisayar gücü yeterli olacaktır. Sıkıntı genelde sürücü hızındadır. Başlangıç senkronizasyonu esnasında, Ethereum istemcileri birçok okuma/yazma işlemi gerçekleştirir. Bu nedenle SSD şiddetle önerilir. Bir istemci [HDD'de mevcut durumla senkronize bile olamayabilir](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278) ve Mainnet'in birkaç blok gerisinde takılı kalabilir. Birçok istemciyi [ARM ile tek kartlı bir bilgisayarda](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/) çalıştırabilirsiniz. Ayrıca Raspberry Pi 4 için [Ethbian](https://ethbian.org/index.html) işletim sistemini kullanabilirsiniz. Bu, [SD kartı flaşlayarak bir istemci çalıştırmanızı](/developers/tutorials/run-node-raspberry-pi/) sağlar. Yazılım ve donanım seçimlerinize bağlı olarak, başlangıç senkronizasyon süresi ve depolama gereksinimleri değişebilir. [Senkronizasyon süreleri ve depolama gereksinimlerini kontrol ettiğinizden](/developers/docs/nodes-and-clients/#recommended-specifications) emin olun. Ayrıca internet bağlantınızın bir [bant genişliği sınırı](https://wikipedia.org/wiki/Data_cap) tarafından limitlendirilmediğinden de emin olun. Başlangıç senkronizasyonu ve ağa yayınlanan veri, kotanızı aşabileceği için sınırsız bağlantı kullanmanız önerilir.

#### İşletim sistemi {#operating-system}

Tüm istemciler ana işletim sistemlerini destekler: Linux, MacOS, Windows. Bu, düğümleri sıradan masaüstü veya sunucu makinelerinde, size en uygun işletim sistemiyle (OS) çalıştırabileceğiniz anlamına gelir. Potansiyel sıkıntılardan ve güvenlik açıklarından kaçınmak için işletim sisteminizin güncel olduğundan emin olun.

## Düğümü başlatmak {#spinning-up-node}

### İstemci yazılımını edinme {#getting-the-client}

İlk olarak tercih ettiğiniz [istemci yazılımını](/developers/docs/nodes-and-clients/#execution-clients) indirin

İşletim sisteminize ve mimarinize uyan bir yürütülebilir uygulama veya bir kurulum paketi indirmeniz yeterlidir. Her zaman indirilen paketlerin imzalarını ve denetim toplamlarını doğrulayın. Bazı istemciler ayrıca daha kolay kurulum ve güncellemeler için depolar sağlar. İsterseniz, kaynaktan oluşturabilirsiniz. Tüm istemciler açık kaynak olduğundan, bunları uygun derleyici ile kaynak koddan oluşturabilirsiniz.

Stabil Mainnet istemci uygulamaları için yürütülebilir ikili programlar yayınlanma sayfalarından indirilebilir:

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum,](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://besu.hyperledger.org/en/stable/)
- [Erigon](https://github.com/ledgerwatch/erigon)

**OpenEthereum'un [kullanımdan kaldırıldığını](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ve artık sürdürülmediğini unutmayın**. Dikkatli kullanın ve tercihen başka bir istemci uygulamasına geçin.

### İstemciyi başlatma {#starting-the-client}

Ethereum istemci yazılımını başlatmadan önce, ortamınızın hazır olduğuna dair son bir kontrol yapın. Örneğin, şunlara emin olun:

- Seçilmiş ağ ve senkronizasyon modu hesaba katıldığında yeterli disk alanı olduğundan.
- Bellek ve CPU'nun diğer programlar tarafından durdurulmadığından.
- İşletim sisteminin en güncel sürüme güncellendiğinden.
- Sistemin doğru saat ve tarihe ayarlı olduğundan.
- Yönlendiriciniz ve güvenlik duvarınız, dinleme bağlantı noktalarındaki bağlantıları kabul ettiğinden. Varsayılan olarak Ethereum istemcileri, ikisi de varsayılan olarak 30303 üzerinde olan bir dinleyici (TCP) bağlantı noktası ve bir keşif (UDP) bağlantı noktası kullanır.

Her şeyin doğru çalıştığından emin olmak için önce istemcinizi bir test ağında çalıştırın. Bir [Geth hafif düğümü](/developers/tutorials/run-light-node-geth/) çalıştırmak yardımcı olacaktır. Başlangıçta, varsayılan olmayan tüm istemci ayarlarını bildirmeniz gerekir. Tercih yapılandırmalarınızı duyurmak için bayrakları veya yapılandırma dosyasını kullanabilirsiniz. Ayrıntılar için istemcinizin belgelerini inceleyin İstemciyi yürütmek, istemcinin temel fonksiyonlarını ve seçilmiş uç noktalarını başlatır ve eş aramaya başlar. İstemci, eşlerini başarılı bir şekilde bulduktan sonra senkronizasyonu başlatır. İstemci mevcut duruma başarılı şekilde senkronize edildiğinde mevcut blok zinciri verisi mevcut olacaktır.

### İstemciyi kullanma {#using-the-client}

İstemciler, istemciyi kontrol etmek ve çeşitli yollarla Ethereum ağı ile etkileşime geçmek için kullanabileceğiniz RPC API uç noktaları sunar:

- Onları uyumlu bir protokolle manuel olarak çağırmak (örneğin `curl` kullanarak)
- Sağlanan bir konsolu eklemek (örneğin `geth attach`)
- Onları uygulamalara yürütmek

Farklı istemciler, RPC uç noktalarının farklı uygulamalarına sahiptir. Ancak her istemciyle kullanabileceğiniz standart bir JSON-RPC bulunmaktadır. Genel bir bakış için [JSON-RPC belgelerini okuyun](https://eth.wiki/json-rpc/API). Ethereum ağından bilgiye ihtiyaç duyan uygulamalar bu RPC'yi kullanabilir. Örnek olarak, popüler cüzdan MetaMask [yerel bir blok zinciri kopyası çalıştırmanızı ve ona bağlanmanızı](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) sağlar.

#### RPC'ye ulaşma {#reaching-rpc}

`8545`, JSON-RPC'nin varsayılan bağlantı noktasıdır ama yapılandırma dosyasında yerel uç noktalarının bağlantı noktalarını değiştirebilirsiniz. Varsayılan olarak, RPC arayüzüne sadece bilgisayarınızın yerel sunucusundan erişilebilir. Eğer onu uzaktan erişilebilir hâle getirmek istiyorsanız, adresi `0.0.0.0` yaparak onu herkese açık duruma getirebilirsiniz. Bu, onu yerel ve herkese açık IP adresleri üzerinden erişilebilir hâle getirecektir. Çoğu durumda yönlendiricinizde bağlantı noktası yönlendirmeyi (port forwarding) de kurmanız gerekecektir.

Bu, internetteki herhangi birinin düğümünüzü kontrol etmesine izin vereceği için bunu dikkatlice yapmanız gerekir. Kötü amaçlı aktörler, sisteminizi çökertmek için düğümünüze erişim sağlayabilirler veya istemcinizi cüzdan olarak kullanıyorsanız paranızı çalabilirler.

Bu engeli aşmanın bir yolu ise potansiyel olarak zararlı olan RPC yöntemlerinin değiştirilebilmesini engellemektir. Örnek olarak, `geth` ile değiştirilebilir yöntemleri bir bayrakla duyurabilirsiniz: `--http.api web3,eth,txpool`.

Ayrıca Nginx gibi bir web sunucusunun hizmetini, istemcinizin yerel adresine ve bağlantı noktasına yönlendirerek RPC arayüzünüze erişim sağlayabilirsiniz.

Herkese açık şekilde erişilebilir bir uç noktası kurmanın en gizlilik sağlayan ve basit yolu, onu kendi [Tor](https://www.torproject.org/) onion servisinizde yönetmenizdir. Bu, herkese açık statik bir IP adresi veya açık bağlantı noktaları olmadan yerel ağınızın dışında RPC'ye erişmenizi sağlayacaktır. Bunu yapmak için:

- `tor` kurun
- İstemcinizin RPC adresi ve bağlantı noktası ile gizli hizmeti etkinleştirmek için `torrc` yapılandırma dosyasını düzenleyin
- `tor` servisini yeniden başlatın

Tor'u yeniden başlattığınızda, istediğiniz dizinde gizli hizmet anahtarları ve bir ana bilgisayar adı edinirsiniz. Sonrasında RPC'niz bir `.onion` ana bilgisayar adı altında erişilebilir olacaktır.

### Düğümü yürütme {#operating-the-node}

Düğümünüzün düzgün çalıştığından emin olmak için onu düzenli olarak gözetmelisiniz. Zaman zaman bakım yapmanız gerekebilir.

#### Düğümü çevrimiçi tutma {#keeping-node-online}

Düğümünüz aralıksız çevrimiçi olmak zorunda değildir ancak onu ağ ile senkronizasyonda tutabilmek için olabildiğince çevrimiçi olmasını sağlamalısınız. Yeniden başlatmak için kapatabilirsiniz ama şunu unutmayın:

- Kapatma, eğer mevcut durum hâlâ sabit diske yazılıyorsa birkaç dakika sürebilir.
- Zorla kapatmalar veri tabanına hasar verebilir.
- İstemcinizin ağ ile senkronizasyonu bozulacaktır ve yeniden başlattığınızda tekrar senkronize etmeniz gerekecektir.

_Bu, mutabakat katmanı doğrulayıcı düğümleri için geçerli değildir._ Düğümünüzü çevrimdışı yapmak ona bağlı olan tüm servisleri etkiler. Eğer _stake etme_ amacıyla bir düğüm çalıştırıyorsanız kesinti süresini olabildiğince azaltmalısınız.

#### İstemci hizmeti oluşturma {#creating-client-service}

İstemcinizi başlangıçta otomatik olarak çalıştıracak bir hizmet oluşturmayı göz önünde bulundurun. Örnek olarak Linux sunucularında istemciyi düzenli bir yapılandırma ile, sınırlı ayrıcalıklara sahip olan bir kullanıcının altında çalıştıran ve otomatik olarak yeniden başlatan bir hizmet oluşturmak iyi bir uygulama olurdu.

#### İstemciyi güncelleme {#updating-client}

İstemci yazılımınızı en son güvenlik yamaları, özellikler ve [EIP'ler](/eips/) ile güncel tutmalısınız. Özellikle [sert çatallanmalardan](/history/) önce, doğru istemci sürümünü çalıştırdığınızdan emin olun.

Her istemci uygulamasının, eşler arası protokolde kullanılan insan tarafından okunabilir bir sürüm dizesi vardır, ancak komut satırından da erişilebilir. Bu sürüm dizesi, kullanıcıların doğru sürümü çalıştırıp çalıştırmadıklarını kontrol etmelerini sağlar ve belirli istemcilerin ağ üzerindeki dağılımını ölçmekle ilgilenen blok gezginlerine ve diğer analitik araçlara izin verir. Sürüm dizileri hakkında daha fazla bilgi için lütfen bireysel istemci belgelerine bakın.

#### Ek hizmetler çalıştırma {#running-additional-services}

Kendi düğümünüzü çalıştırmak Ethereum istemci RPC'sine doğrudan erişim gerektiren hizmetleri kullanmanızı sağlar. Bu hizmetler, Ethereum'un üzerinde inşa edilen [katman 2 çözümleri](/developers/docs/scaling/#layer-2-scaling), [mutabakat katmanı istemcileri](/upgrades/get-involved/#clients) ve diğer Ethereum altyapıları gibi hizmetlerdir.

#### Düğümü gözetleme {#monitoring-the-node}

Düğümünüzü düzgün şekilde gözlemlemek istiyorsanız, metrik toplamayı gözden geçirin. İstemciler, düğümünüz hakkında kapsamlı veri alabilmeniz için metrik uç noktaları sunar. [Grafana](https://grafana.com/) gibi uygulamalarda görselleştirmelere ve tablolara dökebileceğiniz veri tabanları oluşturmak için [InfluxDB](https://www.influxdata.com/get-influxdb/) veya [Prometheus](https://prometheus.io/) gibi araçlar kullanın. Bu yazılımları kullanmak için birçok farklı kurulum ve düğümünüzle ağı tamamen görselleştirebilmek için farklı Grafana gösterge panelleri bulunmaktadır. Gözetlemenize dahil olarak, makinenizin performansına da dikkat etmeyi unutmayın. Düğümünüzün başlangıç senkronizasyonu esnasında istemci yazılımı CPU ve RAM üzerinde ağırlık yapabilir. Grafana'ya ek olarak, işletim sisteminizin sunduğu `htop` veya `uptime` gibi araçları da kullanabilirsiniz.

## Daha fazla bilgi {#further-reading}

- [Tam doğrulanmış bir Ethereum düğümü olmak için gereken donanımın analizi](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 Eylül 2018_
- [Ethereum Tam Düğümlerini Çalıştırmak: Pek Motivasyonu Olmayanlar İçin Bir Kılavuz](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Kasım 2019_
- [Bir Ethereum Düğümü Çalıştırma](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, sık sık güncellenir_
- [Ethereum Mainnet'te Hyperledger Besu Düğümü Çalıştırma: Faydaları, Gereksinimleri ve Kurulum](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mayıs 2020_
- [Gözetleme Yığını ile Nethermind Ethereum İstemcisi Dağıtma](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 Temmuz 2020_

## İlgili konular {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [Bloklar](/developers/docs/blocks/)
- [Ağlar](/developers/docs/networks/)
