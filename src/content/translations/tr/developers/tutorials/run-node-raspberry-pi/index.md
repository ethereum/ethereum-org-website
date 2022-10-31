---
title: Raspberry Pi 4'ünüzü sadece MicroSD kartı flaşlayarak bir düğüme nasıl dönüştürebilirsiniz
description: Raspberry Pi 4'ünüzü flaşlayın, bir ethernet kablosu takın, SSD diskini bağlayın ve Raspberry Pi 4'ü yürütüm katmanını veya mutabakat katmanını (İşaret Zinciri/doğrulayıcı) çalıştıran tam bir Ethereum düğümüne dönüştürmek için cihazı çalıştırın
author: "EthereumOnArm"
tags:
  - "istemciler"
  - "yürütüm katmanı"
  - "mutabakat katmanı"
  - "düğümler"
lang: tr
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**Kısacası**: Raspberry Pi 4'ünüzü flaşlayın, bir ethernet kablosu takın, SSD diskini bağlayın ve Raspberry Pi 4'ü yürütüm katmanını veya mutabakat katmanını (İşaret Zinciri/doğrulayıcı) çalıştıran tam bir Ethereum düğümüne dönüştürmek için cihazı çalıştırın

[Ethereum yükseltmeleri hakkında bilgi edinin](/upgrades/)

Önce biraz arka plan bilgisi verelim. Bildiğiniz gibi, Raspbian işletim sistemi hâlâ 32 bit [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (en azından kullanıcı alanı) üzerinde olduğundan, [[1]](/developers/tutorials/run-node-raspberry-pi/#references)Raspberry Pi 4 görüntüsüyle ilgili bazı bellek sorunlarıyla karşılaşıyoruz. Resmi işletim sistemine bağlı kalmayı tercih ederken, bu sorunları çözmek için yerel 64 bit işletim sistemine geçmemiz gerektiği sonucuna vardık

Ayrıca, [mutabakat istemcileri](/upgrades/get-involved/#clients) 32 bit ikili dosyaları desteklemez, bu nedenle Raspbian kullanmak, Raspberry Pi 4'ün bir mutabakat katmanı düğümü çalıştırmasını (ve stake etme olasılığını) hariç tutar.

Bu nedenle, birkaç testten sonra şimdi Ubuntu 20.04 64bit [[3]](/developers/tutorials/run-node-raspberry-pi/#references) tabanlı 2 farklı sürücü yayınlıyoruz: yürütüm katmanı ve mutabakat katmanı sürümleri.

Temel olarak, her ikisi de aynı sürücüdür ve Raspbian tabanlı sürücülerin aynı özelliklerini içerir. Ancak varsayılan olarak yürütüm katmanı veya mutabakat katmanı yazılımlarını çalıştırmak için ayarlanmıştır.

**Sürücüler**, ortamın kurulmasından ve SSD diskinin biçimlendirilmesinden Ethereum yazılımını kurup çalıştırmaya ve ayrıca blok zinciri senkronizasyonunu başlatmaya kadar gerekli tüm adımların üstesinden gelir.

## Ana özellikler {#main-features}

- Ubuntu 20.04 64bit temelli
- Otomatik USB disk bölümleme ve formatlama
- Armbian çalışmasına dayalı takas belleği (ZRAM çekirdek modülü + bir takas dosyası) ekler[[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- MAC hash değerine dayalı olarak ana bilgisayar adını "ethnode-e2a3e6fe" gibi bir şeyle değiştirir
- Yazılımı bir systemd hizmeti olarak çalıştırır ve Blok Zincirini senkronize etmeye başlar
- Ethereum yazılımını kurmak ve yükseltmek için bir APT deposu içerir
- Grafana/Prometheus'a dayalı bir izleme gösterge paneli içerir

## Mevcut yazılım {#software-included}

Her iki sürücü de aynı paketleri içerir: Aralarındaki tek fark, yürütüm sürümünün varsayılan olarak Geth'i çalıştırması ve mutabakat sürümünün varsayılan olarak Prysm işaret zincirini çalıştırmasıdır.

### Yürütüm istemcileri {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references): 1.9.13 (resmi ikili)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (çapraz derlenmiş)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (çapraz derlenmiş)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (derlenmiş)

### Mutabakat istemcileri {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (resmi ikili)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (derlenmiş)

### Ethereum çerçevesi {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (resmi ikili)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (resmi ikili)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (resmi ikili)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (derlenmiş)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (resmi ikili)

## Kurulum rehberi ve kullanım {#installation-guide-and-usage}

### Önerilen donanım ve kurulum {#recommended-hardware-and-setup}

- Raspberry 4 (model B) - 4GB
- MicroSD Kartı (minimum 16 GB Class 10)
- SSD USB 3.0 diski (depolama bölümüne bakın)
- Güç kaynağı
- Ethernet kablosu
- 30303 Port yönlendirme (yürütüm katmanı) ve 13000 port yönlendirme (mutabakat katmanı)[[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- Soğutucu ve fanlı bir kasa (isteğe bağlıdır ancak şiddetle tavsiye edilir)
- USB klavye, Monitör ve HDMI kablosu (mikro HDMI) (isteğe bağlı)

## Depolama {#storage}

Ethereum istemcilerini çalıştırmak için bir SSD'ye ihtiyacınız olacak (SSD sürücüsü olmadan Ethereum blok zincirini senkronize etme şansınız kesinlikle yoktur). İki seçenek bulunmaktadır:

- Samsung T5 Portable SSD gibi bir taşınabilir USB SSD diski kullanın.
- SSD Diskli bir USB 3.0 External Hard Drive Case kullanın. Biz, bir Inateck 2.5 Hard Drive Enclosure FE2011 kullandık. Özellikle JMicron (JMS567 veya JMS578) veya ASMedia (ASM1153E) olmak üzere UAS uyumlu çipli bir kasa satın aldığınızdan emin olun.

Her iki durumda da, düşük kaliteli SSD diskleri almaktan kaçının çünkü bu, düğümünüzün önemli bir bileşenidir ve performansı (ve senkronizasyon sürelerini) büyük ölçüde etkileyebilir.

Diski bir USB 3.0 portuna (mavi) takmanız gerektiğini unutmayın

## Sürücü indirme ve kurulumu {#image-download-and-installation}

### 1. Yürütüm ve mutabakat katmanı sürücülerini indirin {#1-download-execution-or-consensus-images}

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">
  Yürütüm katmanı sürücüsünü indir
</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">
  Mutabakat katmanı sürücüsünü indir
</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Sürücüyü flaşlayın {#2-flash-the-image}

MicroSD'yi Masaüstünüze/Dizüstü bilgisayarınıza takın ve dosyayı indirin (örneğin yürütüm katmanı):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Not: Eğer komut satırı ile rahat değilseniz veya Windows çalıştırıyorsanız, [Etcher](https://etcher.io) kullanabilirsiniz

Bir terminal açın ve çalışan MicroSD cihaz adınızı kontrol edin:

```bash
sudo fdisk -l
```

mmcblk0 veya sdd adında bir cihaz görmelisiniz. Sürücüyü unzip'leyin ve flaşlayın:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. MicroSD'yi Raspberry Pi 4'e takın. Bir Ethernet kablosu bağlayın ve USB SSD diskini takın (mavi bir port kullandığınızdan emin olun). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Cihazı çalıştırın {#4-power-on-the-device}

Ubuntu İşletim Sistemi bir dakikadan daha kısa sürede açılacaktır ancak ** komut dosyasının cihazı bir Ethereum düğümüne dönüştürmek ve Raspberry'yi yeniden başlatmak için gerekli görevleri gerçekleştirmesine izin vermek için yaklaşık 10 dakika beklemeniz gerekecek**.

Sürücüye bağlı olarak şunları çalıştıracaksınız:

- Yürütüm istemcisi: Blok zincirini senkronize eden varsayılan istemci olarak Geth
- Mutabakat istemcisi: İşaret zincirini senkronize eden varsayılan istemci olarak Prysm (Prater testnet)

### 5. Giriş yapın {#5-log-in}

SSH üzerinden veya konsolu kullanarak oturum açabilirsiniz (bağlı bir monitörünüz ve klavyeniz varsa)

```bash
User: ethereum
Password: ethereum
```

İlk girişte şifreyi değiştirmeniz istenecek, bu yüzden iki kez giriş yapmanız gerekecek.

### 6. Prysm işaret zinciri çalıştırıyorsanız 13000 ve Geth için 30303 portunu açın. Bunu nasıl yapacağınızı bilmiyorsanız, yönlendirici modeliniz ile birlikte “port yönlendirme” kelimelerini google'layın. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Konsol çıktısı alın {#7-get-console-output}

Yazarak arka planda neler olduğunu görebilirsiniz:

```bash
sudo tail -f /var/log/syslog
```

**Tebrikler. Artık Raspberry Pi 4'ünüzde tam bir Ethereum düğümü çalıştırıyorsunuz.**

## İşaret zincirini senkronize etmek {#syncing-the-blockchain}

Şimdi blok zincirinin senkronize edilmesini beklemeniz gerekiyor. Yürütüm katmanı söz konusu olduğunda, bu birkaç faktöre bağlı olarak birkaç gün sürebilir, ancak yaklaşık 5-7 güne kadar bekleyebilirsiniz.

Mutabakat katmanı Prater test ağını çalıştırıyorsanız, 1-2 günlük İşaret zinciri senkronizasyon süresi bekleyebilirsiniz. Stake sürecini başlatmak için doğrulayıcıyı daha sonra kurmanız gerekeceğini unutmayın. [Mutabakat katmanı doğrulayıcı nasıl çalıştırılır](/developers/tutorials/run-node-raspberry-pi/#validator)

## İzleme gösterge panoları {#monitoring-dashboards}

Bu ilk sürüm için, düğümü ve istemci verilerini (Geth ve Besu) izlemek için Prometheus[[5]](/developers/tutorials/run-node-raspberry-pi/#references)/Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) temelli 3 izleme gösterge panosu ekledik. Web tarayıcınız üzerinden erişebilirsiniz:

```bash
URL: http://your_raspberrypi_IP:3000
User: admin
Password: ethereum
```

## İstemcileri değiştirme {#switching-clients}

Tüm istemciler bir systemd hizmeti olarak çalışır. Sistem, bir sorun ortaya çıkarsa süreci otomatik olarak yeniden başlatacağı için bu önemlidir.

Geth ve Prysm işaret zinciri varsayılan olarak çalışır (ne senkronize ettiğinize, yürütüm katmanına veya mutabakat katmanına bağlı olarak), bu nedenle, diğer istemcilere geçmek istiyorsanız (örneğin Geth'ten Nethermind'e), önce Geth'i durdurup devre dışı bırakmanız ve ardından diğer istemciyi etkinleştirip başlatmanız gerekir:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Her yürütüm istemcisini etkinleştirme ve başlatma komutları:

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Mutabakat istemcileri:

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## Parametreleri değiştirme {#changing-parameters}

İstemcilerin yapılandırma dosyaları /etc/ethereum/ dizininde bulunur. Değişikliklerin etkili olması için bu dosyaları düzenleyebilir ve systemd hizmetini yeniden başlatabilirsiniz. Tek istisna, ayrıca burada bulunan bir Mainnet yapılandırma dosyasına sahip olan Nethermind'dır:

```bash
/etc/nethermind/configs/mainnet.cfg
```

Blok zinciri istemcilerinin verileri, Ethereum ana hesabında aşağıdaki şekilde saklanır (dizin adından önceki noktaya dikkat edin):

### Yürütüm katmanı {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Mutabakat katmanı {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind ve Hyperledger Besu {#nethermind-and-hyperledger-besu}

Bu 2 harika yürütüm istemcisi, Geth ve Parity'ye harika bir alternatif hâline geldi. Ağdaki çeşitlilik ne kadar fazlaysa o kadar iyidir, bu yüzden onları deneyebilir ve ağ sağlığına katkıda bulunabilirsiniz.

Her ikisinin de daha fazla teste ihtiyacı var, bu yüzden onlarla deney yapmaktan çekinmeyin ve geri bildiriminizi gönderin.

## Mutabakat doğrulayıcı nasıl çalıştırılır (stake etmek) {#validator}

Prater test ağı işaret zinciri senkronize edildikten sonra aynı cihazda bir doğrulayıcı çalıştırabilirsiniz. [Bu katılım adımlarını](https://prylabs.net/participate) takip etmeniz gerekecek.

İlk sefer için, “doğrulayıcı” ikili dosyasını çalıştırarak manuel olarak bir hesap oluşturmanız ve bir şifre belirlemeniz gerekir. Bu adımı tamamladıktan sonra parolayı `/etc/ethereum/prysm-validator.conf` dizinine ekleyebilir ve doğrulayıcıyı bir systemd hizmeti olarak başlatabilirsiniz.

## Geri bildirim faydalı olur {#feedback-appreciated}

Bu cihazın devasa kullanıcı tabanının ağ üzerinde çok olumlu bir etkisi olabileceğini bildiğimizden dolayı Raspberry Pi 4'ü tam bir Ethereum düğümü olarak kurmak için çok uğraştık.

Lütfen bunun Ubuntu 20.04 temelli ilk sürücü olduğunu dikkate alın, bu nedenle bazı hatalar olabilir. Eğer varsa, [GitHub](https://github.com/diglos/ethereumonarm) üzerinde bir konu açın veya bize [Twitter](https://twitter.com/EthereumOnARM) üzerinden ulaşın.

## Referanslar {#references}

1. [geth, SIGSEGV ile sürekli çöküyor](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum \* **OpenEthereum'un [kullanımdan kaldırıldığını](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ve artık sürdürülmediğini unutmayın**. Dikkatli kullanın ve tercihen başka bir istemci uygulamasına geçin.
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
