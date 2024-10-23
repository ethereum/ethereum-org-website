---
title: Blok önerisi
description: Ethereum hisse ispatında blokların nasıl önerildiği üzerine açıklama.
lang: tr
---

Bloklar blok zincirin temel birimleridir. Bloklar; düğümler arasında geçilmiş, üzerinde anlaşmaya varılmış ve her düğümün veritabanına eklenmiş ayrık bilgi birimleridir. Bu sayfa nasıl üretildiklerini açıklar.

## Ön koşullar {#prerequisites}

Blok önerisi hisse ispatı protokolünün bir parçasıdır. Bu sayfayı anlamaya yardımcı olması için [hisse ispatı](/developers/docs/consensus-mechanisms/pos/) ile [blok mimarisi](/developers/docs/blocks/) hakkındakileri okumanızı tavsiye ederiz.

## Blokları kim üretir? {#who-produces-blocks}

Doğrulayıcı hesapları blok önerisinde bulunur. Doğrulayıcı hesapları, yürütüm ve fikir birliği istemcilerinin bir parçası olarak doğrulayıcı yazılımını çalıştırırlar ve mevduat sözleşmesine en az 32 ETH yatırmış olan düğüm operatörleri tarafından yönetilirler. Neyse ki, her doğrulayıcı bir blok önermekten yalnızca ara sıra sorumludur. Ethereum, yuva ve dönemlerdeki zamanı ölçer. Her yuva 12 saniyedir ve her 32 yuva (6,4 dk) da bir dönem oluşturur. Her bir yuva, Ethereum'a yeni bir blok ekleme fırsatıdır.

### Rastgele seçim {#random-selection}

Her bir yuvada blok önermek için tek bir doğrulayıcı yapay olarak rastgele seçilir. Bir blok zincirde gerçek rastgelelik diye bir şey yoktur çünkü eğer her bir düğüm gerçekten ratgele numaralar üretirse, bir mutabakata varılamaz. Bunun yerine amaç; doğrulayıcı seçim sürecini öngörülemeyen hale getirmektir. Ethereum'da rastgelelik, blok önericinin bir karmasını, her blokta güncelleyerek bir tohumla karıştıran "RANDAO" adlı algoritmanın kullanılmasıyla sağlanır. Bu değer, toplam doğrulayıcı kümesinden belirli bir doğrulayıcıyı seçmek için kullanılır. Belirli türdeki tohum manipülasyonlarına karşı korunma için, doğrulayıcı seçimi iki dönem önce sabitlenir.

Doğrulayıcıların her yuva için RANDAO'ya katkı sağlamasına rağmen, global RANDAO değeri her dönem yalnız bir kere güncellenir. RANDAO değeri yuva numarası ile karıştırılarak, bir sonraki blok önericinin endeksi hesaplanır ve her yuvada benzersiz bir değer elde edilmiş olur. Bir bireysel doğrulayıcının seçilme olasılığı sadece `1/N` (burada `N`, toplam etkin doğrulayıcılar anlamına gelir) şeklinde değildir. Bunun yerine her bir doğrulayıcının ETH bakiyesine göre ağırlıklandırılır. Maksimum etkili bakiye 32 ETH'dir (bu, `balance < 32 ETH` durumunun `balance == 32 ETH` durumundan daha düşük bir ağırlığa yol açtığı, ancak `balance > 32 ETH` durumunun `balance == 32 ETH` durumundan daha yüksek bir ağırlığa yol açmadığı anlamına gelir).

Her yuva için sadece bir blok önerici seçilir. Normal koşullar altında, tek bir blok üreticisi kendi özel yuvasında tek bir blok üretir ve yayınlar. Genellikle "çifte söz" olarak bilinen aynı yuvada iki blok oluşturmak, cezalandırılabilir bir suçtur.

## Blok nasıl oluşturulur? {#how-is-a-block-created}

Blok önericinin, yerel olarak çalıştırılan kendi çatal seçim algoritmasına göre en son başın üstünde inşa edilen bir imzalanmış işaret blokunu yayınlaması beklenir. Çatal seçim algoritması, kuyruğa alınmış olan herhangi bir tasdiki önceki yuvalarda uygular, daha sonra geçmişinde birikmiş olan en yüksek ağırlığa sahip tasdiklere sahip bloku bulur. Bu blok, önerici tarafından oluşturulmuş yeni blokun bir üstüdür.

Blok önerici, kendi yerel veritabanından ve zincir görünümünden veri toplar ve bir blok oluşturur. Blokun içeriği, aşağıdaki alıntıda gösterilmektedir:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

`randao_reveal` alanın blok önericisinin mevcut dönem numarasını imzalayarak oluşturduğu doğrulanabilir rastgele bir değeri alır. `eth1_data`, yatırım Merkle ağacının kökü ve yeni yatırımların doğrulanmasını sağlayacak olan toplam yatırım sayısı dahil blok önericinin mevduat sözleşmesi üzerine bir oyudur. `graffiti` bloka bir mesaj eklemek için kullanılabilecek isteğe bağlı bir alandır. `proposer_slashings` ve `attester_slashings` alanları önericinin zincir görüşüne göre bazı doğrulayıcıların cezalandırılabilir suçlar işlediğiyle ilgili kanıtlar içeren alanlardır. `deposits` blok önericinin haberdar olduğu yeni doğrulayıcı yatırımlarının bir listesidir ve `voluntary_exits` blok önericinin fikir birliği katmanı dedikodu ağı üzerinde duyduğu çıkış yapmak isteyen doğrulayıcıların listesidir. `sync_aggregate` hangi doğrulayıcıların önceden bir senkronizasyon kuruluna (hafif istemci verisi sunan bir doğrulayıcı alt grubu) atandığını ve veri imzasına katıldığını gösteren bir vektördür.

`execution_payload` işlemler hakkında bilgilerin yürütüm ve fikir birliği istemcileri arasında aktarılmasını sağlar. `execution_payload` bir işaret bloku içinde yuvalanan bir yürütme verisi blokudur. `execution_payload` içindeki alanlar Ethereum sarı kağıdında belirtilen blok yapısını yansıtırlar, ancak hiçbir ommer yoktur ve `prev_randao` `difficulty` yerine bulunmaktadır. Yürütüm istemcisinin kendi dedikodu ağında hakkında duyduğu yerel bir işlem havuzuna erişimi vardır. Bu işlemler durum sonrası olarak bilinen bir güncel durum ağacı oluşturmak için yerel olarak yürütülürler. İşlemler `transactions` isimli bir liste olarak `execution_payload` içine dahil edilir ve durum sonrası `state-root` alanında verilir.

Tüm bu veriler bir işaret blokunda toplanır, imzalanır ve bloku kendi eşlerine yayacak olan blok önericinin eşlerine yayınlanır.

[Blokların anatomisi](/developers/docs/blocks) hakkında daha fazlasını okuyun.

## Bloka ne olur? {#what-happens-to-blocks}

Blok önericinin yerel veritabanına eklenen blok, fikir birliği katmanı yayın ağı üzerinden düğüm eşlerine iletilir. Bir doğrulayıcı bir blok aldığı zaman, içindeki verileri doğrular. Blokun içerdiği verilerin doğru bir üst bloku olup olmadığını, doğru yuvaya karşılık gelip gelmediğini, öneren endeksin beklenen olup olmadığını, RANDAO açığının geçerli olup olmadığını ve önericinin cezalandırılmamış olup olmadığını kontrol eder. `execution_payload` ayrıştırılır ve doğrulayıcının yürütüm istemcisi, önerilen durumun değişip değişmediğini kontrol etmek amacıyla listedeki işlemleri tekrardan yürütür. Blok, tüm kontrollerden geçtiği takdirde, her doğrulayıcı bloku kendi kaonik zincirine ekler. Bir sonraki yuvada, süreç tekrardan başlar.

## Blok ödülleri {#block-rewards}

Blok önerici çalışmaları için ödeme alır. Aktif doğrulayıcı sayısı ve etkin bakiyelerinin bir fonksiyonu olarak hesaplanan `base_reward` vardır. Blok önerici sonrasında bloka dahil edilen her geçerli tasdik için `base_reward` ödülünün bir kısmını alır; bloka tasdik sağlayan doğrulayıcı sayısı arttıkça blok önericinin ödülü de artar. Aynı zamanda, cezalandırılan her bir doğrulayıcı için `1/512 * geçerli bakiyeye` eşit olarak bölünmesi gereken doğrulayıcıları raporlamak için de bir ödül vardır.

[Ödül ve cezalar hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Daha fazla bilgi {#further-reading}

- [Blok'lara giriş](/developers/docs/blocks/)
- [Hisse ispatı'na giriş](/developers/docs/consensus-mechanisms/pos/)
- [Ethereum mutabakat özellikleri](https://github.com/ethereum/consensus-specs)
- [Gasper'a giriş](/developers/docs/consensus-mechanisms/pos/)
- [Ethereum'u Yükseltme](https://eth2book.info/)
