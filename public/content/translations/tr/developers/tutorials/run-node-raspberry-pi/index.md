---
title: Raspberry Pi 4 üzerinde bir Ethereum düğümü çalıştırın
description: Raspberry Pi 4'ünüzü flaşlayın, bir ethernet kablosu takın, SSD diskini bağlayın ve Raspberry Pi 4'ü tam bir Ethereum düğümü + doğrulayıcıya dönüştürmek için cihazı çalıştırın
author: "EthereumOnArm"
tags: ["istemciler", "yürütme katmanı", "fikir birliği katmanı", "düğümler"]
lang: tr
skill: intermediate
breadcrumb: Rasp Pi Düğümü
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm, bir Raspberry Pi'yi bir Ethereum düğümüne dönüştürebilen özel bir Linux imajıdır.**

Bir Raspberry Pi'yi bir Ethereum düğümüne dönüştürmek üzere Ethereum on Arm'ı kullanmak için aşağıdaki donanımlar önerilir:

- Raspberry 4 (model B 8GB), Odroid M1 veya Rock 5B (8GB/16GB RAM) kartı
- MicroSD Kart (minimum 16 GB Sınıf 10)
- Minimum 2 TB SSD USB 3.0 disk veya USB'den SATA'ya dönüştürücü kutusu olan bir SSD.
- Güç kaynağı
- Ethernet kablosu
- Port yönlendirme (daha fazla bilgi için istemcilere bakın)
- Soğutucu ve fanlı bir kasa
- USB klavye, Monitör ve HDMI kablosu (mikro-HDMI) (İsteğe bağlı)

## Neden ARM üzerinde Ethereum çalıştırmalıyım? {#why-run-ethereum-on-arm}

ARM kartları çok uygun fiyatlı, esnek ve küçük bilgisayarlardır. Ethereum düğümlerini çalıştırmak için iyi seçeneklerdir çünkü ucuza satın alınabilirler, tüm kaynakları yalnızca düğüme odaklanacak şekilde yapılandırılarak verimli hale getirilebilirler, düşük miktarda güç tüketirler ve fiziksel olarak küçük oldukları için her eve göze batmadan sığabilirler. Ayrıca düğümleri ayağa kaldırmak çok kolaydır çünkü Raspberry Pi'nin MicroSD'si, herhangi bir yazılım indirmeye veya derlemeye gerek kalmadan önceden oluşturulmuş bir imajla kolayca flaşlanabilir.

## Nasıl çalışır? {#how-does-it-work}

Raspberry Pi'nin hafıza kartı önceden oluşturulmuş bir imajla flaşlanır. Bu imaj, bir Ethereum düğümünü çalıştırmak için gereken her şeyi içerir. Flaşlanmış bir kartla, kullanıcının tek yapması gereken Raspberry Pi'yi açmaktır. Düğümü çalıştırmak için gereken tüm süreçler otomatik olarak başlatılır. Bu işe yarar çünkü hafıza kartı, üzerinde üniteyi bir Ethereum düğümüne dönüştüren sistem düzeyindeki süreçlerin otomatik olarak çalıştırıldığı Linux tabanlı bir işletim sistemi (OS) içerir.

Ethereum, popüler Raspberry Pi Linux işletim sistemi "Raspbian" kullanılarak çalıştırılamaz çünkü Raspbian hala 32 bit mimari kullanır, bu da Ethereum kullanıcılarının bellek sorunlarıyla karşılaşmasına yol açar ve fikir birliği istemcileri 32 bit ikili dosyaları desteklemez. Bunun üstesinden gelmek için Ethereum on Arm ekibi, "Armbian" adlı yerel bir 64 bit işletim sistemine geçiş yaptı.

**İmajlar**, ortamın ayarlanması ve SSD diskinin biçimlendirilmesinden Ethereum yazılımının kurulup çalıştırılmasına ve Blokzincir eşzamanlamasının başlatılmasına kadar **gerekli tüm adımları halleder**.

## Yürütme ve fikir birliği istemcileri hakkında not {#note-on-execution-and-consensus-clients}

Ethereum on Arm imajı, hizmet olarak önceden oluşturulmuş yürütme ve fikir birliği istemcilerini içerir. Bir Ethereum düğümü, her iki istemcinin de eşzamanlanmış ve çalışıyor olmasını gerektirir. Sadece imajı indirip flaşlamanız ve ardından hizmetleri başlatmanız gerekir. İmaj, aşağıdaki yürütme istemcileriyle önceden yüklenmiş olarak gelir:

- Geth
- Nethermind
- Besu

ve aşağıdaki fikir birliği istemcileriyle:

- Lighthouse
- Nimbus
- Prysm
- Teku

Çalıştırmak için her birinden bir tane seçmelisiniz - tüm yürütme istemcileri tüm fikir birliği istemcileriyle uyumludur. Açıkça bir istemci seçmezseniz, düğüm varsayılanlarına (Geth ve Lighthouse) geri dönecek ve kart açıldığında bunları otomatik olarak çalıştıracaktır. Geth'in eşleri bulabilmesi ve onlara bağlanabilmesi için yönlendiricinizde 30303 numaralı portu açmalısınız.

## İmajı İndirme {#downloading-the-image}

Raspberry Pi 4 Ethereum imajı, hem yürütme hem de fikir birliği istemcilerini otomatik olarak kuran ve ayarlayan, birbirleriyle konuşacak ve Ethereum ağına bağlanacak şekilde yapılandıran bir "tak ve çalıştır" imajıdır. Kullanıcının tek yapması gereken basit bir komut kullanarak süreçlerini başlatmaktır.

Raspberry Pi imajını [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) üzerinden indirin ve SHA256 hash'ini doğrulayın:

```sh
# İndirilen imajı içeren dizinden
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash çıktısı şu olmalıdır: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Rock 5B ve Odroid M1 kartları için imajların Ethereum-on-Arm [indirmeler sayfasında](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) bulunduğunu unutmayın.

## MicroSD'yi Flaşlama {#flashing-the-microsd}

Raspberry Pi için kullanılacak MicroSD kart, flaşlanabilmesi için önce bir masaüstü veya dizüstü bilgisayara takılmalıdır. Ardından, aşağıdaki terminal komutları indirilen imajı SD karta flaşlayacaktır:

```shell
# MicroSD kart adını kontrol edin
sudo fdisk -l

>> sdxxx
```

İsmi doğru yazmak gerçekten önemlidir çünkü bir sonraki komut, imajı karta aktarmadan önce kartın mevcut içeriğini tamamen silen `dd` içerir. Devam etmek için, sıkıştırılmış imajı içeren dizine gidin:

```shell
# zipten çıkarın ve imajı yazdırın
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Kart artık flaşlandı, bu nedenle Raspberry Pi'ye takılabilir.

## Düğümü başlatın {#start-the-node}

SD kart Raspberry Pi'ye takılıyken, ethernet kablosunu ve SSD'yi bağlayın ve ardından gücü açın. İşletim sistemi önyüklenecek ve istemci yazılımını kurmak ve derlemek de dahil olmak üzere Raspberry Pi'yi bir Ethereum düğümüne dönüştüren önceden yapılandırılmış görevleri otomatik olarak gerçekleştirmeye başlayacaktır. Bu muhtemelen 10-15 dakika sürecektir.

Her şey kurulup yapılandırıldıktan sonra, bir ssh bağlantısı aracılığıyla veya karta bir monitör ve klavye bağlıysa doğrudan terminali kullanarak cihaza giriş yapın. Düğümü başlatmak için gereken izinlere sahip olduğundan, giriş yapmak için `ethereum` hesabını kullanın.

```shell
User: ethereum
Password: ethereum
```

Varsayılan yürütme istemcisi Geth otomatik olarak başlayacaktır. Aşağıdaki terminal komutunu kullanarak günlükleri kontrol edip bunu doğrulayabilirsiniz:

```sh
sudo journalctl -u geth -f
```

Fikir birliği istemcisinin açıkça başlatılması gerekir. Bunu yapmak için, Lighthouse'un eşleri bulabilmesi ve onlara bağlanabilmesi için önce yönlendiricinizde 9000 numaralı portu açın. Ardından lighthouse hizmetini etkinleştirin ve başlatın:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Günlükleri kullanarak istemciyi kontrol edin:

```sh
sudo journalctl -u lighthouse-beacon
```

Fikir birliği istemcisinin kontrol noktası eşzamanlaması kullandığı için birkaç dakika içinde eşzamanlanacağını unutmayın. Yürütme istemcisi daha uzun sürecektir - potansiyel olarak birkaç saat - ve fikir birliği istemcisi eşzamanlamayı bitirene kadar başlamayacaktır (bunun nedeni, yürütme istemcisinin eşzamanlanacak bir hedefe ihtiyaç duymasıdır ve bu hedefi eşzamanlanmış fikir birliği istemcisi sağlar).

Geth ve Lighthouse hizmetleri çalışır ve eşzamanlanmış durumdayken, Raspberry Pi'niz artık bir Ethereum düğümüdür! Ethereum ağıyla etkileşim kurmak için en yaygın yöntem, 8545 numaralı port üzerinden Geth istemcisine bağlanabilen Geth'in JavaScript konsolunu kullanmaktır. Curl gibi bir istek aracı kullanarak JSON nesneleri olarak biçimlendirilmiş komutlar göndermek de mümkündür. Daha fazlasını [Geth belgelerinde](https://geth.ethereum.org/) görün.

Geth, metrikleri tarayıcıda görüntülenebilen bir Grafana panosuna bildirecek şekilde önceden yapılandırılmıştır. Daha ileri düzey kullanıcılar, `ipaddress:3000` adresine gidip `user: admin` ve `passwd: ethereum` bilgilerini girerek düğümlerinin sağlığını izlemek için bu özelliği kullanmak isteyebilirler.

## Doğrulayıcılar {#validators}

Fikir birliği istemcisine isteğe bağlı olarak bir doğrulayıcı da eklenebilir. Doğrulayıcı yazılımı, düğümünüzün mutabakata aktif olarak katılmasına olanak tanır ve ağa kriptoekonomik güvenlik sağlar. Bu çalışma için ETH ile ödüllendirilirsiniz. Bir doğrulayıcı çalıştırmak için öncelikle yatırma sözleşmesine yatırılması gereken 32 ETH'niz olmalıdır. Yatırma işlemi, [Launchpad](https://launchpad.ethereum.org/) üzerindeki adım adım kılavuz izlenerek yapılabilir. Bunu bir masaüstü/dizüstü bilgisayarda yapın, ancak anahtarlar oluşturmayın — bu doğrudan Raspberry Pi üzerinde yapılabilir.

Raspberry Pi'de bir terminal açın ve yatırma anahtarlarını oluşturmak için aşağıdaki komutu çalıştırın:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Veya hava boşluklu (airgapped) bir makinede çalıştırmak için [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) aracını indirin ve `deposit new-mnemnonic` komutunu çalıştırın)

Anımsatıcı ifadeyi güvende tutun! Yukarıdaki komut, düğümün anahtar deposunda iki dosya oluşturdu: doğrulayıcı anahtarları ve bir yatırma veri dosyası. Yatırma verilerinin launchpad'e yüklenmesi gerekir, bu nedenle Raspberry Pi'den masaüstü/dizüstü bilgisayara kopyalanmalıdır. Bu, bir ssh bağlantısı veya başka bir kopyala/yapıştır yöntemi kullanılarak yapılabilir.

Yatırma veri dosyası launchpad'i çalıştıran bilgisayarda mevcut olduğunda, launchpad ekranındaki `+` üzerine sürüklenip bırakılabilir. Yatırma sözleşmesine bir işlem göndermek için ekrandaki talimatları izleyin.

Raspberry Pi'ye geri döndüğünüzde, bir doğrulayıcı başlatılabilir. Bu, doğrulayıcı anahtarlarını içe aktarmayı, ödülleri toplamak için Adresi ayarlamayı ve ardından önceden yapılandırılmış doğrulayıcı sürecini başlatmayı gerektirir. Aşağıdaki örnek Lighthouse içindir—diğer fikir birliği istemcileri için talimatlar [Ethereum on Arm belgelerinde](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) mevcuttur:

```shell
# doğrulayıcı anahtarlarını içe aktarın
lighthouse account validator import --directory=/home/ethereum/validator_keys

# ödül adresini belirleyin
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# doğrulayıcıyı başlatın
sudo systemctl start lighthouse-validator
```

Tebrikler, artık bir Raspberry Pi üzerinde çalışan tam bir Ethereum düğümünüz ve doğrulayıcınız var!

## Daha fazla detay {#more-details}

Bu sayfa, Raspberry Pi kullanarak bir Geth-Lighthouse düğümü ve doğrulayıcısının nasıl kurulacağına dair genel bir bakış sundu. Daha ayrıntılı talimatlar [Ethereum-on-Arm web sitesinde](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) mevcuttur.

## Geri bildirimleriniz değerlidir {#feedback-appreciated}

Raspberry Pi'nin, Ethereum ağının sağlığı üzerinde çok olumlu bir etkiye sahip olabilecek devasa bir kullanıcı tabanına sahip olduğunu biliyoruz.
Lütfen bu eğitimdeki ayrıntıları inceleyin, test ağlarında çalıştırmayı deneyin, Ethereum on Arm GitHub'ına göz atın, geri bildirimde bulunun, sorunlar ve çekme istekleri (pull requests) oluşturun ve teknolojiyi ve belgeleri ilerletmeye yardımcı olun!

## Referanslar {#references}

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org