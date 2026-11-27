---
title: Onaylar
description: "Hisse kanıtı (proof-of-stake) Ethereum'daki onayların bir açıklaması."
lang: tr
---

Bir doğrulayıcının her dönem (epoch) boyunca bir onay oluşturması, imzalaması ve yayınlaması beklenir. Bu sayfa, bu onayların neye benzediğini ve mutabakat istemcileri arasında nasıl işlendiğini ve iletildiğini özetlemektedir.

## Bir onay nedir? {#what-is-an-attestation}

Her [dönem](/glossary/#epoch) (6,4 dakika) bir doğrulayıcı ağa bir onay yayınlar. Onay, dönem içindeki belirli bir slot içindir. Onayın amacı, doğrulayıcının zincir görünümü lehine, özellikle zincirin başı, en son gerekçelendirilmiş kontrol noktası ve mevcut dönemin başındaki kontrol noktası (`source` ve `target` kontrol noktaları olarak bilinir) lehine oy kullanmaktır. Bu bilgi, katılan tüm doğrulayıcılar için birleştirilir ve ağın blokzincirin durumu hakkında mutabakata varmasını sağlar.

[Pectra güncellemesinden](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)) bu yana, tek bir doğrulayıcıdan gelen bir onay ile birleştirilmiş bir onay farklı formatlara sahiptir. Tek bir doğrulayıcının onayı şunları içerir:

- `committee_index`: doğrulayıcının verilen slotta ait olduğu komite
- `attester_index`: doğrulayıcının endeksi
- `data`: aşağıda tanımlandığı gibi onayla ilgili ayrıntılar
- `signature`: doğrulayıcının `data` üzerindeki BLS imzası

Onaylayan bir doğrulayıcı için ilk görev `data` oluşturmaktır. `data` aşağıdaki bilgileri içerir:

- `slot`: Onayın atıfta bulunduğu slot numarası
- `index`: Pectra'dan bu yana `0` olarak ayarlanmıştır. Komite, farklı komitelerden gelen oyların aynı `data` değerine sahip olması ve birlikte birleştirilebilmesi için `data` dışında (bir `committee_index` ile veya bir birleştirmede `committee_bits` ile) tanımlanır. Pectra'dan önce bu alan komiteyi tanımlıyordu
- `beacon_block_root`: Doğrulayıcının zincirin başında gördüğü bloğun kök hash'i (çatallanma seçimi algoritmasının uygulanmasının sonucu)
- `source`: Doğrulayıcıların en son gerekçelendirilmiş kontrol noktası olarak ne gördüğünü gösteren kesinlik oyunun bir parçası
- `target`: Doğrulayıcıların mevcut dönemin başındaki kontrol noktası olarak ne gördüğünü gösteren kesinlik oyunun bir parçası (ilk slotundaki blok veya o slot boşsa ondan önceki en son blok)

`data` oluşturulduktan sonra, doğrulayıcı bunu imzalar ve onayı komitesi için [alt ağa](#aggregated-attestation) yayınlar.

### Birleştirilmiş onay {#aggregated-attestation}

Bu verilerin her doğrulayıcı için ağ etrafında aktarılmasıyla ilişkili önemli bir ek yük vardır. Bu nedenle, bireysel doğrulayıcılardan gelen onaylar, daha geniş çapta yayınlanmadan önce alt ağlar içinde birleştirilir. Bu, yayınlanan bir onayın mutabakat `data` verisini ve o `data` ile aynı fikirde olan tüm doğrulayıcıların imzalarının birleştirilmesiyle oluşturulan tek bir imzayı içermesi için imzaların birlikte birleştirilmesini içerir. Birleştirilmiş bir onay şunları içerir:

- `aggregation_bits`: dahil edilen her komitenin üyesi başına bir bit içeren bir bit listesi, burada konum doğrulayıcının komitesindeki konumuyla eşleşir; değer (0/1) o doğrulayıcının imzasının dahil edilip edilmediğini gösterir
- `data`: dahil edilen her doğrulayıcının imzaladığı onay verisi
- `signature`: dahil edilen doğrulayıcıların imzalarını birleştiren bir BLS imzası
- `committee_bits`: hangi komitelerin üyelerinin `aggregation_bits` tarafından kapsandığı

Herkes, birleştirilmiş imzayı, bitleri ayarlanmış doğrulayıcıların birleştirilmiş açık anahtarlarına karşı kontrol edebilir.

Her slotta, her komitenin yaklaşık 16 üyesi onun `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`) olmak üzere seçilir. Bir doğrulayıcı, slot numarası üzerindeki kendi imzasından seçilip seçilmediğini öğrenir. Birleştiriciler, komitelerinin alt ağında duydukları ve kendilerininkiyle aynı `data` verisine sahip olan tüm onayları toplar ve bunları birleştirerek her birinin göndericisini `aggregation_bits` içine kaydeder. Birleştiriciler daha sonra birleşimi daha geniş ağa yayınlar.

Bir doğrulayıcı bir blok teklifçisi olarak seçildiğinde, yeni bloğa son slotlardan gelen birleştirilmiş onayları dahil eder. Pectra'dan bu yana, teklif edici aynı `data` verisini paylaşan farklı komitelerden gelen birleşimleri tek bir onayda birleştirebilir ve bir blok bunlardan en fazla 8 tanesini tutabilir.

### Onay dahil edilme yaşam döngüsü {#attestation-inclusion-lifecycle}

1. Üretim
2. Yayılım
3. Birleştirme
4. Yayılım
5. Dahil edilme

Onay yaşam döngüsü aşağıdaki şemada özetlenmiştir:

<AttestationsDiagram />

## Ödüller {#rewards}

Doğrulayıcılar onay sundukları için ödüllendirilirler. Onay ödülü, katılım bayraklarına (kaynak, hedef ve baş), temel ödüle ve katılım oranına bağlıdır.

Katılım bayraklarının her biri, sunulan onaya ve dahil edilme gecikmesine bağlı olarak doğru veya yanlış olabilir.

En iyi senaryo, üç bayrağın da doğru olduğu durumda gerçekleşir; bu durumda bir doğrulayıcı (doğru bayrak başına) şunları kazanır:

`reward += base reward * flag weight * flag attesting rate / 64`

Bayrak onaylama oranı, verilen bayrak için onaylayan tüm doğrulayıcıların etkin bakiyelerinin toplamının toplam aktif etkin bakiye ile karşılaştırılması kullanılarak ölçülür.

### Temel ödül {#base-reward}

Temel ödül, onaylayan doğrulayıcıların sayısına ve stake edilen etkin Ether bakiyelerine göre hesaplanır:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Dahil edilme gecikmesi {#inclusion-delay}

Doğrulayıcıların zincirin başı (`block n`) üzerinde oy kullandığı sırada, `block n+1` henüz teklif edilmemişti. Bu nedenle onaylar doğal olarak **bir blok sonra** dahil edilir, böylece zincir başının `block n` olduğuna oy veren tüm onaylar `block n+1` içine dahil edilir ve **dahil edilme gecikmesi** 1 olur. Dahil edilme gecikmesi, bir onayın hangi katılım bayraklarını kazanacağına karar verir:

- `head`: yalnızca dahil edilme gecikmesi tam olarak 1 slotsa
- `source`: dahil edilme gecikmesi en fazla 5 slotsa (bir dönemdeki 32 slotun tam sayı karekökü)
- `target`: onay ne zaman dahil edilirse edilsin (Deneb güncellemesinden bu yana, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Yani iki slot geç dahil edilen bir onay baş ödülünü kaybeder ancak yine de kaynak ve hedef ödüllerini kazanır.

### Onay senaryoları {#attestation-scenarios}

#### Eksik Oy Veren Doğrulayıcı {#missing-voting-validator}

Bir onay, yapıldığı slottan sonraki herhangi bir bloğa, bir sonraki dönemin sonuna kadar dahil edilebilir. Dönem 0'dan bir onay, dönem 0 sırasında bir bloğa dahil edilmezse, daha uzun bir dahil edilme gecikmesiyle dönem 1'e yine de dahil edilebilir.

#### Eksik Birleştirici {#missing-aggregator}

Her komite her slotta yaklaşık 16 birleştirici hedefler, bu nedenle eksik bir birleştirici nadiren bir komitenin onaylarının birleştirilmesini durdurur. Ayrı olarak, her işaret düğümü, düğüm kimliğinden seçilen ve her alt ağı iyi bağlı tutan **256 dönem boyunca iki alt ağa** aynı anda abone kalır.

#### Eksik blok teklifçisi {#missing-block-proposer}

Bazı durumlarda şanslı bir birleştiricinin aynı zamanda blok teklifçisi olabileceğini unutmayın. Blok teklifçisi kaybolduğu için onay dahil edilmediyse, bir sonraki blok teklifçisi birleştirilmiş onayı alır ve bir sonraki bloğa dahil eder. Ancak, **dahil edilme gecikmesi** bir artacaktır.

## Daha fazla bilgi {#further-reading}

- [Vitalik'in açıklamalı mutabakat spesifikasyonunda onaylar](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [eth2book.info'da onaylar](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Electra mutabakat spesifikasyonunda onaylar](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_
