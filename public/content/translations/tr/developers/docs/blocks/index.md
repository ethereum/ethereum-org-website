---
title: Bloklar
description: Ethereum blok zincirindeki blokların veri yapıları, neden gerekli oldukları ve nasıl oluşturuldukları hakkında bir tanıtım.
lang: tr
---

Bloklar, zincirde yer alan bir önceki blok hakkındaki hash değerlerini barındıran işlem gruplarıdır. Bu, blokları birbirine (bir zincir hâlinde) bağlar çünkü hash değerleri blok verilerinden kriptografik olarak türetilir. Bu, geçmişteki herhangi bir bloktaki tek bir değişikliğin sonraki tüm hash değerlerini değiştirerek tüm blokları geçersiz kılacağı ve bu durum blok zincirini yürüten herkes tarafından fark edileceği için dolandırıcılığı önler.

## Ön koşullar {#prerequisites}

Bloklar, yeni başlayanlar için uygun bir konudur. Ancak bu sayfayı daha iyi anlamanıza yardımcı olmak için önce [Hesaplar](/developers/docs/accounts/), [İşlemler](/developers/docs/transactions/) ve [Ethereum'a giriş](/developers/docs/intro-to-ethereum/) bölümlerini okumanızı öneririz.

## Bloklar neden gerekli? {#why-blocks}

Ethereum ağındaki tüm katılımcıların senkronize durumlarını sürdürmesini ve işlemlerin kesin geçmişi üzerinde anlaşmasını sağlamak için işlemleri bloklar hâlinde topluyoruz. Bu, düzinelerce (veya yüzlerce) işlemin aynı anda taahhüt edildiği, üzerinde anlaşmaya varıldığı ve senkronize edildiği anlamına gelir.

![Durum değişikliklerine neden olan bir bloktaki işlemi gösteren bir diyagram](./tx-block.png) _Diyagram [Ethereum EVM resmediciden](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) uyarlanmıştır_

Taahhütler arasında boşluk bırakarak, tüm ağ katılımcılarına mutabakata varmaları için yeterli zaman tanıyoruz: İşlem talepleri saniyede düzinelerce kez gerçekleşse de, Ethereum'daki bloklar yaklaşık her on beş saniyede bir işlenir.

## Blokların çalışma şekli {#how-blocks-work}

İşlem geçmişini korumak için, bloklar titizlikle sıralanır (oluşturulan her yeni blok, önceki bloğa bir referans içerir) ve bloklar içindeki işlemler de titizlikle sıralanır. Herhangi bir zamanda olabilecek nadir durumlar dışında ağdaki tüm katılımcılar, blokların tam sayısı ve geçmişi konusunda mutabıktır ve mevcut aktif işlem taleplerini bir sonraki blokta gruplandırmak için çalışmaktadır.

Bir blok ağdaki bir madenci tarafından bir araya getirildiğinde (kazıldığında) blok ağın geri kalanına yayılır; tüm düğümler bu bloğu blok zincirlerinin sonuna ekler ve madencilik devam eder. Kesin blok birleştirme (madencilik) süreci ve taahhüt/mutabakat süreci mevcut olarak Ethereum'un "İş İspatı" protokolü tarafından belirlenmiştir.

### Görsel bir demo {#a-visual-demo}

<YouTube id="_160oMzblY8" />

## İş ispatı protokolü {#proof-of-work-protocol}

İş ispatı aşağıdaki anlamlara gelir:

- Madencilik düğümleri, ağa önerdikleri bir blok için bir “meşruiyet sertifikası” üretmek için değişken ancak önemli miktarda enerji, zaman ve bilgi işlem gücü harcamak zorundadır. Bu, sertifikaların üretilmesi pahalı olduğu için ağı istenmeyen spam/hizmet reddi saldırılarından korumaya yardımcı olur.
- Geçerli bir meşruiyet sertifikasına sahip yeni bir blok hakkında bilgi alan diğer madenciler, yeni bloğu blok zincirindeki bir sonraki standart blok olarak kabul etmelidir.
- Herhangi bir madencinin bu sertifikayı üretmesi için gereken tam süre, yüksek değişkenliğe sahip rastgele bir değişkendir. Bu, iki madencinin önerilen bir sonraki blok için aynı anda doğrulama üretmesinin olasılığını ortadan kaldırır: Bir madenci sertifikalı yeni bir blok ürettiğinde ve yaydığında, bloğun ağ tarafından çakışma olmadan blok zincirindeki bir sonraki standart blok olarak kabul edileceğinden (her ne kadar iki sertifikalı blok zincirinin neredeyse aynı anda üretilmesi durumunda da çatışmalarla başa çıkmak için bir protokol olsa da) emin olabilir.

[Madencilik hakkında daha fazlası](/developers/docs/consensus-mechanisms/pow/mining/)

## Bir blokta neler yer alır? {#block-anatomy}

- `timestamp` - bloğun çıkarıldığı zaman.
- `blockNumber` – blok zincirinin blok cinsinden uzunluğu.
- `baseFeePerGas` - işlemin bloğa dahil edilmesi için gereken gaz başına minimum ücret.
- `difficulty` – bloğu çıkarmak için gereken çaba.
- `mixHash` – bloğa ait benzersiz bir tanımlayıcı.
- `parentHash` – daha önce gelen bloğun benzersiz tanımlayıcısı (bloklar bir zincirde bu şekilde bağlanır).
- `transactions` – bloğa dahil edilen işlemler.
- `stateRoot` – sistemin tüm durumu: hesap bakiyeleri, sözleşme depolaması, sözleşme kodu ve hesap nonce'ları içindedir.
- `nonce` – mixHash ile birleştirildiğinde, bloğun [iş ispatından](/developers/docs/consensus-mechanisms/pow/) geçtiğini kanıtlayan bir hash.

## Blok süresi {#block-time}

Blok süresi, yeni bir bloğu kazmanın aldığı zamanı belirtir. Ethereum'da ortalama blok süresi 12 saniye ila 14 saniyedir ve bu süre her bloktan sonra ölçülür. Beklenen blok süresi protokol seviyesinde bir sabit olarak belirlenmiştir ve madenciler daha fazla bilgi işlem gücü eklediğinde ağın güvenliğini korumak için kullanılır. Ortalama blok süresi beklenen blok süresiyle karşılaştırılır; eğer ortalama blok süresi daha fazlaysa blok başlığındaki zorluk düşürülür. Eğer ortalama blok süresi daha az ise blok başlığındaki zorluk artırılır.

## Blok boyutu {#block-size}

Son olarak önemli bir not: Blokların kendileri de boyut olarak sınırlandırılmıştır. Her bloğun hedef boyutu 15 milyon gazdır ama blok boyutu ağ isteklerine göre 30 milyon gaz olan blok limitine kadar (blok boyutu hedefinin 2 katı) artabilir veya azalabilir. Bloktaki işlemlerden kesilen toplam gaz miktarı, bloğun gaz limitinden daha az olmalıdır. Bu, blok boyutunun keyfi olarak belirlenememesini sağladığı için önemlidir. Bloklar keyfi boyutlarda olabilseydi, daha az performans gösteren tam düğümler, alan ve hız gereksinimleri nedeniyle yavaş yavaş ağa ayak uyduramazlardı.

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili konular {#related-topics}

- [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/)
- [İşlemler](/developers/docs/transactions/)
- [Gaz](/developers/docs/gas/)
