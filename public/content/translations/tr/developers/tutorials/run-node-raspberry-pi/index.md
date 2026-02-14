---
title: "Raspeberry Pi 4 üzerinde bir Ethereum düğümü çalıştırın"
description: "Raspberry Pi 4'ünüzü flash'layın, bir ethernet kablosu takın, SSD diski bağlayın ve cihazı çalıştırarak Raspberry Pi 4'ü tam bir Ethereum düğümü + doğrulayıcısına dönüştürün"
author: "EthereumOnArm"
tags:
  [
    "istemciler",
    "yürütme katmanı",
    "mutabakat katmanı",
    "düğümler"
  ]
lang: tr
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm, bir Raspberry Pi'ı Ethereum düğümüne dönüştürebilen özel bir Linux görüntüsüdür.**

Ethereum on Arm'ı kullanarak bir Raspberry Pi'ı Ethereum düğümüne dönüştürmek için aşağıdaki donanımlar önerilir:

- Raspberry 4 (model B 8GB), Odroid M1 veya Rock 5B (8GB/16GB RAM) kartı
- MicroSD Kart (minimum 16 GB Sınıf 10)
- Minimum 2 TB SSD USB 3.0 disk veya USB - SATA kasalı bir SSD.
- Güç kaynağı
- Ethernet kablosu
- Bağlantı noktası yönlendirme (daha fazla bilgi için istemcilere bakın)
- Soğutuculu ve fanlı bir kasa
- USB klavye, Monitör ve HDMI kablosu (mikro-HDMI) (İsteğe bağlı)

## Neden ARM üzerinde Ethereum çalıştırmalısınız? {#why-run-ethereum-on-arm}

ARM kartları çok uygun fiyatlı, esnek, küçük bilgisayarlardır. Ucuz bir şekilde satın alınabildikleri, tüm kaynakları yalnızca düğüme odaklanacak şekilde yapılandırılabildikleri için Ethereum düğümlerini çalıştırmak için iyi seçeneklerdir. Bu onları verimli kılar, düşük miktarda güç tüketirler ve fiziksel olarak küçük olduklarından her eve göze batmayacak şekilde sığabilirler. Ayrıca, Raspberry Pi'nin MicroSD kartına önceden oluşturulmuş bir imaj kolayca yüklenebildiği için düğümleri kurmak da çok kolaydır, yazılım indirme veya derleme gerekmez.

## Nasıl çalışır? {#how-does-it-work}

Raspberry Pi'nin hafıza kartına önceden oluşturulmuş bir imaj yüklenir. Bu imaj, bir Ethereum düğümünü çalıştırmak için gereken her şeyi içerir. İmaj yüklenmiş bir kartla, kullanıcının yapması gereken tek şey Raspberry Pi'ı açmaktır. Düğümü çalıştırmak için gereken tüm işlemler otomatik olarak başlatılır. Bu, bellek kartının Linux tabanlı bir işletim sistemi (OS) içermesi ve bu sistem üzerinde birimi bir Ethereum düğümüne dönüştüren sistem düzeyindeki işlemlerin otomatik olarak çalışması sayesinde mümkündür.

Ethereum, popüler Raspberry Pi Linux işletim sistemi "Raspbian" kullanılarak çalıştırılamaz çünkü Raspbian hâlâ 32-bit bir mimari kullanır, bu da Ethereum kullanıcılarının bellek sorunları yaşamasına neden olur ve mutabakat istemcileri 32-bit ikili dosyaları desteklemez. Bunun üstesinden gelmek için Ethereum on Arm ekibi, "Armbian" adlı yerel bir 64-bit işletim sistemine geçiş yaptı.

**İmajlar, ortamı kurmaktan ve SSD diski biçimlendirmekten, Ethereum yazılımını kurup çalıştırmaya ve blok zinciri senkronizasyonunu başlatmaya kadar gerekli tüm adımları halleder.**

## Yürütme ve mutabakat istemcileri hakkında not {#note-on-execution-and-consensus-clients}

Ethereum on Arm imajı, hizmet olarak önceden oluşturulmuş yürütme ve mutabakat istemcileri içerir. Bir Ethereum düğümü, her iki istemcinin de senkronize edilmiş ve çalışır durumda olmasını gerektirir. Yalnızca imajı indirip yüklemeniz ve ardından hizmetleri başlatmanız gerekir. İmaj, aşağıdaki yürütme istemcileriyle önceden yüklenmiştir:

- Geth
- Nethermind
- Besu

ve aşağıdaki mutabakat istemcileri:

- Lighthouse
- Nimbus
- Prysm
- Teku

Çalıştırmak için her birinden bir tane seçmelisiniz - tüm yürütme istemcileri, tüm mutabakat istemcileriyle uyumludur. Açıkça bir istemci seçmezseniz düğüm varsayılan ayarlarına (Geth ve Lighthouse) geri döner ve kart açıldığında bunları otomatik olarak çalıştırır. Geth'in eşleri bulup onlara bağlanabilmesi için yönlendiricinizde 30303 numaralı bağlantı noktasını açmalısınız.

## İmajı İndirme {#downloading-the-image}

Raspberry Pi 4 Ethereum imajı, hem yürütme hem de mutabakat istemcilerini otomatik olarak kuran ve ayarlayan, birbirleriyle iletişim kurmaları ve Ethereum ağına bağlanmaları için yapılandıran bir "tak ve çalıştır" imajıdır. Kullanıcının tek yapması gereken, basit bir komut kullanarak işlemlerini başlatmaktır.

Raspberry Pi imajını [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) adresinden indirin ve SHA256 karmasını doğrulayın:

```sh
# İndirilen imajı içeren dizinden
shasum -a 256 ethonarm_22.04.00.img.zip
# Karma çıktısı şu şekilde olmalıdır: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Rock 5B ve Odroid M1 kartları için imajların Ethereum-on-Arm [indirmeler sayfasında](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) mevcut olduğunu unutmayın.

## MicroSD'ye İmaj Yükleme {#flashing-the-microsd}

Raspberry Pi için kullanılacak MicroSD kart, imajın yüklenebilmesi için önce bir masaüstü veya dizüstü bilgisayara takılmalıdır. Ardından, aşağıdaki terminal komutları indirilen imajı SD karta yükleyecektir:

```shell
# MicroSD kart adını kontrol edin
sudo fdisk -l

>> sdxxx
```

İsmi doğru yazmanız gerçekten önemlidir, çünkü bir sonraki komut, imajı karta yazmadan önce kartın mevcut içeriğini tamamen silen `dd` komutunu içerir. Devam etmek için sıkıştırılmış imajı içeren dizine gidin:

```shell
# imajı ayıklayın ve yükleyin
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Kartın imajı şimdi yüklendi, artık Raspberry Pi'a takılabilir.

## Düğümü başlatma {#start-the-node}

SD kart Raspberry Pi'a takılıyken, ethernet kablosunu ve SSD'yi bağlayın, ardından gücü açın. İşletim sistemi açılacak ve istemci yazılımını kurma ve derleme de dahil olmak üzere Raspberry Pi'ı bir Ethereum düğümüne dönüştüren önceden yapılandırılmış görevleri otomatik olarak gerçekleştirmeye başlayacaktır. Bu muhtemelen 10-15 dakika sürecektir.

Her şey kurulup yapılandırıldıktan sonra, bir ssh bağlantısı aracılığıyla veya karta bir monitör ve klavye bağlıysa doğrudan terminali kullanarak cihazda oturum açın. Düğümü başlatmak için gerekli izinlere sahip olduğundan, oturum açmak için `ethereum` hesabını kullanın.

```shell
Kullanıcı: ethereum
Parola: ethereum
```

Varsayılan yürütme istemcisi olan Geth otomatik olarak başlayacaktır. Aşağıdaki terminal komutunu kullanarak günlükleri kontrol ederek bunu doğrulayabilirsiniz:

```sh
sudo journalctl -u geth -f
```

Mutabakat istemcisinin açıkça başlatılması gerekir. Bunu yapmak için, Lighthouse'un eşleri bulup onlara bağlanabilmesi için önce yönlendiricinizde 9000 numaralı bağlantı noktasını açın. Ardından lighthouse hizmetini etkinleştirin ve başlatın:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Günlükleri kullanarak istemciyi kontrol edin:

```sh
sudo journalctl -u lighthouse-beacon
```

Mutabakat istemcisinin kontrol noktası senkronizasyonunu kullandığı için birkaç dakika içinde senkronize olacağını unutmayın. Yürütme istemcisi daha uzun sürer (potansiyel olarak birkaç saat) ve mutabakat istemcisi senkronizasyonu bitirene kadar başlamaz (bunun nedeni, yürütme istemcisinin senkronize olmak için bir hedefe ihtiyaç duymasıdır ve bunu da senkronize olmuş mutabakat istemcisi sağlar).

Geth ve Lighthouse hizmetleri çalışır ve senkronize durumdayken, Raspberry Pi'ınız artık bir Ethereum düğümü! Ethereum ağı ile etkileşim kurmanın en yaygın yolu, 8545 numaralı bağlantı noktasındaki Geth istemcisine eklenebilen Geth'in Javascript konsolunu kullanmaktır. Curl gibi bir istek aracı kullanarak JSON nesneleri olarak biçimlendirilmiş komutları göndermek de mümkündür. [Geth dokümantasyonunda](https://geth.ethereum.org/) daha fazlasını görebilirsiniz.

Geth, metrikleri tarayıcıda görüntülenebilen bir Grafana panosuna bildirecek şekilde önceden yapılandırılmıştır. Daha ileri düzey kullanıcılar, `ipaddress:3000` adresine gidip `user: admin` ve `passwd: ethereum` parametrelerini girerek düğümlerinin sağlığını izlemek için bu özelliği kullanmak isteyebilirler.

## Doğrulayıcılar {#validators}

Mutabakat istemcisine isteğe bağlı olarak bir doğrulayıcı da eklenebilir. Doğrulayıcı yazılımı, düğümünüzün mutabakata aktif olarak katılmasına olanak tanır ve ağa kriptoekonomik güvenlik sağlar. Bu çalışma karşılığında ETH olarak ödüllendirilirsiniz. Bir doğrulayıcı çalıştırmak için, önce para yatırma sözleşmesine yatırılması gereken 32 ETH'ye sahip olmanız gerekir. [Launchpad](https://launchpad.ethereum.org/) üzerindeki adım adım kılavuzu izleyerek para yatırma işlemi yapılabilir. Bunu bir masaüstü/dizüstü bilgisayarda yapın, ancak anahtar oluşturmayın — bu işlem doğrudan Raspberry Pi üzerinde yapılabilir.

Raspberry Pi'da bir terminal açın ve para yatırma anahtarlarını oluşturmak için aşağıdaki komutu çalıştırın:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Veya [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) uygulamasını indirip internet bağlantısı olmayan bir makinede çalıştırın ve `deposit new-mnemnonic` komutunu yürütün)

Anımsatıcı ifadenizi güvende tutun! Yukarıdaki komut, düğümün anahtar deposunda iki dosya oluşturdu: doğrulayıcı anahtarları ve bir para yatırma veri dosyası. Para yatırma verilerinin Launchpad'e yüklenmesi gerekir, bu nedenle Raspberry Pi'dan masaüstü/dizüstü bilgisayara kopyalanmalıdır. Bu, bir ssh bağlantısı veya başka bir kopyala/yapıştır yöntemi kullanılarak yapılabilir.

Para yatırma veri dosyası, Launchpad'i çalıştıran bilgisayarda mevcut olduğunda, Launchpad ekranındaki `+` üzerine sürüklenip bırakılabilir. Para yatırma sözleşmesine bir işlem göndermek için ekrandaki talimatları izleyin.

Raspberry Pi'a geri dönersek, bir doğrulayıcı başlatılabilir. Bu, doğrulayıcı anahtarlarını içe aktarmayı, ödülleri toplamak için adresi ayarlamayı ve ardından önceden yapılandırılmış doğrulayıcı sürecini başlatmayı gerektirir. Aşağıdaki örnek Lighthouse içindir—diğer mutabakat istemcileri için talimatlar [Ethereum on Arm belgelerinde](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) mevcuttur:

```shell
# doğrulayıcı anahtarlarını içe aktar
lighthouse account validator import --directory=/home/ethereum/validator_keys

# ödül adresini ayarla
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# doğrulayıcıyı başlat
sudo systemctl start lighthouse-validator
```

Tebrikler, artık Raspberry Pi üzerinde çalışan tam bir Ethereum düğümünüz ve doğrulayıcınız var!

## Daha fazla ayrıntı {#more-details}

Bu sayfa, Raspberry Pi kullanarak bir Geth-Lighthouse düğümü ve doğrulayıcısının nasıl kurulacağına dair genel bir bakış sunmuştur. Daha ayrıntılı talimatlar [Ethereum-on-Arm web sitesinde](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html) mevcuttur.

## Geri bildirimleriniz bizim için değerli {#feedback-appreciated}

Raspberry Pi'ın, Ethereum ağının sağlığı üzerinde çok olumlu bir etkiye sahip olabilecek devasa bir kullanıcı tabanına sahip olduğunu biliyoruz.
Lütfen bu eğiticinin ayrıntılarını inceleyin, test ağlarında çalıştırmayı deneyin, Ethereum on Arm GitHub'ına göz atın, geri bildirimde bulunun, sorunları bildirin, çekme istekleri oluşturun ve teknolojinin ve dokümantasyonun geliştirilmesine yardımcı olun!

## Kaynaklar {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
