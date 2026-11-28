---
title: "Raspberry Pi 5 üzerinde bir Ethereum düğümü çalıştırın"
description: "Raspberry Pi 5'inizi flaşlayın, bir ethernet kablosu takın, NVMe diskini bağlayın ve Raspberry Pi 5'i tam bir Ethereum düğümü + doğrulayıcıya dönüştürmek için cihazı çalıştırın"
author: "EthereumOnArm"
tags: ["istemciler", "yürütme katmanı", "fikir birliği katmanı", "düğümler"]
lang: tr
skill: intermediate
breadcrumb: "Rasp Pi Düğümü"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm, bir Raspberry Pi'yi bir Ethereum düğümüne dönüştürebilen özel bir Linux imajıdır.**

Bir Raspberry Pi'yi bir Ethereum düğümüne dönüştürmek üzere Ethereum on Arm kullanmak için aşağıdaki donanımlar önerilir:

- 16 GB RAM'e sahip Raspberry Pi 5
- Bir NVMe diski bağlamak için Raspberry Pi 5 için bir NVMe HAT
- NVMe SSD (M.2 2280), minimum 4 TB. Bilinen uyumluluk sorunları olan Phison denetleyicisine sahip disklerden kaçının.
- MicroSD Kart (minimum 16 GB Sınıf 10)
- Güç kaynağı
- Ethernet kablosu
- Port yönlendirme (daha fazla bilgi için istemcilere bakın)
- Soğutuculu bir kasa
- USB klavye, Monitör ve HDMI kablosu (mikro-HDMI) (İsteğe bağlı)

Ethereum on Arm ayrıca NanoPC T6, Rock 5B ve Orange Pi 5 Plus gibi diğer ARM kartlarını da destekler. Bu kartların yerel NVMe desteği vardır, bu nedenle yeni donanım satın alıyorsanız Ethereum on Arm ekibi bunları Raspberry Pi 5 yerine önermektedir. Ayrıntılar için [önerilen donanım listesine](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) bakın. Bu eğitimin geri kalanı, indirdiğiniz imaj dosyası hariç, desteklenen tüm kartlar için aynıdır.

## Neden ARM üzerinde Ethereum çalıştırmalıyım? {#why-run-ethereum-on-arm}

ARM kartları çok uygun fiyatlı, esnek ve küçük bilgisayarlardır. Ethereum düğümlerini çalıştırmak için iyi seçeneklerdir çünkü ucuza satın alınabilirler, tüm kaynakları yalnızca düğüme odaklanacak şekilde yapılandırılarak verimli hale getirilebilirler, düşük miktarda güç tüketirler ve fiziksel olarak küçük oldukları için her eve göze batmadan sığabilirler. Ayrıca düğümleri ayağa kaldırmak çok kolaydır çünkü Raspberry Pi'nin MicroSD'si, herhangi bir yazılım indirmeye veya derlemeye gerek kalmadan önceden oluşturulmuş bir imajla kolayca flaşlanabilir.

## Nasıl çalışır? {#how-does-it-work}

Raspberry Pi'nin hafıza kartı önceden oluşturulmuş bir imajla flaşlanır. Bu imaj, bir Ethereum düğümü çalıştırmak için gereken her şeyi içerir. Flaşlanmış bir kartla, kullanıcının tek yapması gereken Raspberry Pi'yi açmaktır. Düğümü çalıştırmak için gereken tüm işlemler otomatik olarak başlatılır. Bu işe yarar çünkü hafıza kartı, üzerinde birimi bir Ethereum düğümüne dönüştüren sistem düzeyindeki işlemlerin otomatik olarak çalıştırıldığı Linux tabanlı bir işletim sistemi (OS) içerir.

Ethereum on Arm imajları, bir Ethereum düğümü çalıştırmak için optimize edilmiş 64 bitlik bir Linux dağıtımına dayanır ve önceden oluşturulmuş Ethereum istemcilerini içerir.

**İmajlar**, ortamın ayarlanmasından ve NVMe diskinin biçimlendirilmesinden Ethereum yazılımının yüklenmesine kadar **gerekli tüm adımları halleder**.

## Yürütme ve fikir birliği istemcileri hakkında not {#note-on-execution-and-consensus-clients}

Ethereum on Arm imajı, hizmet olarak önceden oluşturulmuş yürütme ve fikir birliği istemcilerini içerir. Bir Ethereum düğümü, her iki istemcinin de eşzamanlanmış ve çalışıyor olmasını gerektirir. Yalnızca imajı indirip flaşlamanız ve ardından hizmetleri başlatmanız gerekir. İmaj, çeşitli yürütme istemcileri (Geth, Nethermind, Besu, Erigon ve Reth gibi) ve fikir birliği istemcileri (Lighthouse, Prysm, Teku, Nimbus ve Lodestar gibi) ile önceden yüklenmiş olarak gelir. Güncel liste için [Ethereum on Arm belgelerine](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) bakın.

Çalıştırmak için her birinden bir tane seçmelisiniz - tüm yürütme istemcileri tüm fikir birliği istemcileriyle uyumludur. Bu eğitimde Geth ve Lighthouse kullanılmaktadır.

## İmajı İndirme {#downloading-the-image}

Ethereum on Arm imajı, hem yürütme hem de fikir birliği istemcilerini otomatik olarak yükleyen ve kuran, birbirleriyle konuşacak ve Ethereum ağına bağlanacak şekilde yapılandıran "tak ve çalıştır" bir imajdır. Kullanıcının tek yapması gereken basit bir komut kullanarak işlemlerini başlatmaktır.

Kartınız için en son imajı [Ethereum on Arm indirme sayfasından](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads) indirin. İndirme sayfası ayrıca her imajın SHA-256 sağlama toplamını (checksum) listeler. İndirilen dosyayı buna karşı doğrulayın:

```sh
# İndirilen imajı içeren dizinden
sha256sum ethonarm_rpi5_<version>.img.zip
# Çıktıyı indirme sayfasındaki sağlama toplamı ile karşılaştırın
```

## MicroSD'yi Flaşlama {#flashing-the-microsd}

Raspberry Pi için kullanılacak MicroSD kart, flaşlanabilmesi için öncelikle bir masaüstü veya dizüstü bilgisayara takılmalıdır. Ardından, aşağıdaki terminal komutları indirilen imajı SD karta flaşlayacaktır:

```shell
# MicroSD kart adını kontrol edin
sudo fdisk -l

>> sdxxx
```

İsmi doğru yazmak gerçekten önemlidir çünkü bir sonraki komut, imajı karta aktarmadan önce kartın mevcut içeriğini tamamen silen `dd` içerir. Devam etmek için sıkıştırılmış imajı içeren dizine gidin:

```shell
# zipten çıkarın ve imajı yazdırın
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Kart artık flaşlandı, bu nedenle Raspberry Pi'ye takılabilir.

## Düğümü başlatın {#start-the-node}

SD kart Raspberry Pi'ye takılıyken ethernet kablosunu ve NVMe diskini bağlayın, ardından gücü açın. İşletim sistemi önyüklenecek ve NVMe diskini biçimlendirmek ve istemci yazılımını yüklemek de dahil olmak üzere Raspberry Pi'yi bir Ethereum düğümüne dönüştüren önceden yapılandırılmış görevleri otomatik olarak gerçekleştirmeye başlayacaktır. Bu muhtemelen 10-15 dakika sürecektir ve bittiğinde kart otomatik olarak yeniden başlatılır. Bu süre zarfında güç kaynağını kesmeyin.

Her şey kurulup yapılandırıldıktan sonra, bir ssh bağlantısı aracılığıyla veya karta bir monitör ve klavye bağlıysa doğrudan terminali kullanarak cihaza giriş yapın. Düğümü başlatmak için gereken izinlere sahip olduğundan, giriş yapmak için `ethereum` hesabını kullanın.

```shell
User: ethereum
Password: ethereum
```

İlk girişinizde varsayılan parolayı değiştirmeniz istenecektir. Bunu yapın, çünkü aksi takdirde düğümünüze ulaşabilen herkes varsayılan parolayla giriş yapabilir. Sistem güvenlik duvarı varsayılan olarak devre dışıdır, bu nedenle düğümünüzün genel bir IP adresi varsa, etkinleştirmek için [Ethereum on Arm güvenlik kılavuzuna](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) bakın.

Önce fikir birliği istemcisini başlatın. Lighthouse'un eşleri bulabilmesi ve onlara bağlanabilmesi için yönlendiricinizde 9000 numaralı bağlantı noktasını (TCP ve UDP) açın. Ardından lighthouse hizmetini etkinleştirin ve başlatın, böylece yeniden başlatmanın ardından da yeniden başlar:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Günlükleri kullanarak istemciyi kontrol edin:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Ardından, yürütme istemcisini başlatın. Geth'in eşleri bulabilmesi ve onlara bağlanabilmesi için yönlendiricinizde 30303 numaralı bağlantı noktasını (TCP ve UDP) açın. Ardından geth hizmetini etkinleştirin ve başlatın:

```sh
sudo systemctl enable --now geth
```

Günlükleri kontrol ederek çalıştığını doğrulayabilirsiniz:

```sh
sudo journalctl -u geth -f
```

Fikir birliği istemcisinin kontrol noktası eşzamanlaması kullandığı için birkaç dakika içinde eşzamanlanacağını unutmayın. Yürütme istemcisi daha uzun sürecektir - potansiyel olarak birkaç saat. Her iki istemci de aynı anda çalışır: fikir birliği istemcisi yürütme istemcisine hangi bloğun zincirin başı olduğunu söyler ve yürütme istemcisi ona kadar olan blokları indirir ve doğrular.

Geth ve Lighthouse hizmetleri çalışır ve eşzamanlanmış durumdayken, Raspberry Pi'niz artık bir Ethereum düğümüdür! Ethereum ağıyla etkileşim kurmanın en yaygın yolu, 8545 numaralı bağlantı noktasındaki Geth istemcisine eklenebilen Geth'in JavaScript konsolunu kullanmaktır. Curl gibi bir istek aracı kullanarak JSON nesneleri olarak biçimlendirilmiş komutlar göndermek de mümkündür. Daha fazlasını [Geth belgelerinde](https://geth.ethereum.org/) görebilirsiniz.

İmaj ayrıca, daha ileri düzey kullanıcıların bir tarayıcıda `ipaddress:3000` adresine giderek düğümlerinin sağlığını izlemek için kullanabilecekleri bir Grafana panosu içerir.

## Doğrulayıcılar {#validators}

Fikir birliği istemcisine isteğe bağlı olarak bir doğrulayıcı da eklenebilir. Doğrulayıcı yazılımı, düğümünüzün mutabakata aktif olarak katılmasına olanak tanır ve ağa kriptoekonomik güvenlik sağlar. Bu iş için ETH ile ödüllendirilirsiniz. Bir doğrulayıcı çalıştırmak için öncelikle yatırma sözleşmesine yatırılması gereken 32 ETH'niz olmalıdır. Yatırma işlemi, [Launchpad](https://launchpad.ethereum.org/) üzerindeki adım adım kılavuz izlenerek yapılabilir. Bunu bir masaüstü/dizüstü bilgisayarda yapın, ancak anahtarlar oluşturmayın — bu doğrudan Raspberry Pi üzerinde yapılabilir.

[ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) aracı doğrulayıcı anahtarları oluşturur. Mevcut imajlar bunu içerir; daha eski bir imaj çalıştırıyorsanız, önce onu yükleyin. Ardından, `<YOUR_ETH_ADDRESS>` kısmını çekimlerinizi alması gereken adresle değiştirerek yatırma anahtarlarını oluşturun:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Veya hava boşluklu (airgapped) bir makinede çalıştırmak için [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) aracını indirin ve `deposit new-mnemonic` komutunu orada çalıştırın)

Anımsatıcı ifadeyi (mnemonic phrase) güvende tutun! Yukarıdaki komut `validator_keys` dizininde iki dosya oluşturdu: doğrulayıcı anahtarları ve bir yatırma veri dosyası. Yatırma verilerinin launchpad'e yüklenmesi gerekir, bu nedenle Raspberry Pi'den masaüstü/dizüstü bilgisayara kopyalanmalıdır. Bu, bir ssh bağlantısı veya başka herhangi bir kopyala/yapıştır yöntemi kullanılarak yapılabilir.

Yatırma veri dosyası launchpad'i çalıştıran bilgisayarda mevcut olduğunda, launchpad ekranındaki `+` üzerine sürüklenip bırakılabilir. Yatırma sözleşmesine bir işlem göndermek için ekrandaki talimatları izleyin.

Raspberry Pi'ye geri döndüğünüzde, bir doğrulayıcı başlatılabilir. Bu, doğrulayıcı anahtarlarını içe aktarmayı, ödülleri toplayacak adresi ayarlamayı ve ardından önceden yapılandırılmış doğrulayıcı sürecini başlatmayı gerektirir. Aşağıdaki örnek Lighthouse içindir—diğer fikir birliği istemcileri için talimatlar [Ethereum on Arm belgelerinde](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html) mevcuttur:

```shell
# Doğrulayıcı anahtarlarını içe aktarın
lighthouse account validator import --directory=/home/ethereum/validator_keys

# ödül adresini ayarlayın (<YOUR_ETH_ADDRESS> kısmını kendi adresinizle değiştirin)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# Doğrulayıcıyı başlatın
sudo systemctl enable --now lighthouse-validator
```

Tebrikler, artık bir Raspberry Pi üzerinde çalışan tam bir Ethereum düğümünüz ve doğrulayıcınız var!

## Daha fazla detay {#more-details}

Bu sayfa, Raspberry Pi kullanarak bir Geth-Lighthouse düğümü ve doğrulayıcısının nasıl kurulacağına dair genel bir bakış sundu. Daha ayrıntılı talimatlar [Ethereum-on-Arm web sitesinde](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) mevcuttur.

## Geri bildirimleriniz değerlidir {#feedback-appreciated}

Raspberry Pi'nin Ethereum ağının sağlığı üzerinde çok olumlu bir etkiye sahip olabilecek devasa bir kullanıcı tabanına sahip olduğunu biliyoruz.
Lütfen bu eğitimdeki ayrıntıları inceleyin, test ağlarında çalıştırmayı deneyin, [Ethereum on Arm GitHub](https://github.com/EOA-Blockchain-Labs/ethereumonarm) sayfasına göz atın, geri bildirimde bulunun, sorunlar (issues) ve çekme istekleri (pull requests) oluşturun ve teknolojiyi ve belgeleri ilerletmeye yardımcı olun!

## Referanslar {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
