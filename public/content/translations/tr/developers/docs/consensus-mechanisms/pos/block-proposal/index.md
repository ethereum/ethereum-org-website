---
title: Blok teklifi
description: "Hisse kanıtı (PoS) Ethereum'da blokların nasıl teklif edildiğinin açıklaması."
lang: tr
---

Bloklar, blokzincirin temel birimleridir. Bloklar, düğümler arasında aktarılan, üzerinde mutabakata varılan ve her düğümün veritabanına eklenen ayrık bilgi birimleridir. Bu sayfa, bunların nasıl üretildiğini açıklamaktadır.

## Ön koşullar {#prerequisites}

Blok teklifi, hisse kanıtı (PoS) protokolünün bir parçasıdır. Bu sayfayı anlamanıza yardımcı olması için [hisse kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) ve [blok mimarisi](/developers/docs/blocks/) hakkında okumanızı öneririz.

## Blokları kim üretir? {#who-produces-blocks}

Doğrulayıcı hesapları blokları teklif eder. Doğrulayıcı hesapları, yürütme ve mutabakat istemcilerinin bir parçası olarak doğrulayıcı yazılımı çalıştıran ve yatırma sözleşmesine en az 32 ETH yatırmış olan düğüm operatörleri tarafından yönetilir. Ancak, her bir doğrulayıcı yalnızca ara sıra bir blok teklif etmekten sorumludur. [Ethereum](/) zamanı slotlar ve dönemler (epoch) cinsinden ölçer. Her slot on iki saniyedir ve 32 slot (6,4 dakika) bir dönemi oluşturur. Her slot, Ethereum'a yeni bir blok eklemek için bir fırsattır.

### Rastgele seçim {#random-selection}

Her slotta bir blok teklif etmesi için sözde rastgele (pseudo-randomly) tek bir doğrulayıcı seçilir. Bir blokzincirde gerçek rastgelelik diye bir şey yoktur çünkü her düğüm gerçekten rastgele sayılar üretseydi, mutabakata varamazlardı. Bunun yerine amaç, doğrulayıcı seçim sürecini öngörülemez kılmaktır. Ethereum'da rastgelelik, blok teklifçisinden gelen bir hash'i her blokta güncellenen bir tohumla (seed) karıştıran RANDAO adlı bir algoritma kullanılarak elde edilir. Bu değer, toplam doğrulayıcı setinden belirli bir doğrulayıcıyı seçmek için kullanılır. Doğrulayıcı seçimi, belirli tohum manipülasyonu türlerine karşı korunmanın bir yolu olarak iki dönem önceden sabitlenir.

Doğrulayıcılar her slotta RANDAO'ya ekleme yapsa da, küresel RANDAO değeri her dönemde yalnızca bir kez güncellenir. Bir sonraki blok teklifçisinin endeksini hesaplamak için RANDAO değeri, her slotta benzersiz bir değer vermek üzere slot numarasıyla karıştırılır. Bireysel bir doğrulayıcının seçilme olasılığı basitçe `1/N` değildir (burada `N` = toplam aktif doğrulayıcılar). Bunun yerine, her bir doğrulayıcının efektif ETH bakiyesi ile ağırlıklandırılır. Maksimum efektif bakiye 32 ETH'dir (bu, `balance < 32 ETH` değerinin `balance == 32 ETH` değerinden daha düşük bir ağırlığa yol açtığı, ancak `balance > 32 ETH` değerinin `balance == 32 ETH` değerinden daha yüksek bir ağırlıklandırmaya yol açmadığı anlamına gelir).

Her slotta yalnızca bir blok teklifçisi seçilir. Normal koşullar altında, tek bir blok üreticisi kendi ayrılmış slotunda tek bir blok oluşturur ve yayınlar. Aynı slot için iki blok oluşturmak, genellikle "çifte imza" olarak bilinen ve ceza kesintisi gerektiren bir suçtur.

## Blok nasıl oluşturulur? {#how-is-a-block-created}

Blok teklifçisinin, kendi yerel olarak çalıştırdığı çatallanma seçimi algoritmasının görüşüne göre zincirin en son başının üzerine inşa edilen imzalı bir işaret bloğu yayınlaması beklenir. Çatallanma seçimi algoritması, önceki slottan kalan sıraya alınmış onayları uygular, ardından geçmişinde en büyük birikmiş onay ağırlığına sahip bloğu bulur. Bu blok, teklif edici tarafından oluşturulan yeni bloğun ebeveynidir.

Blok teklifçisi, kendi yerel veritabanından ve zincir görünümünden veri toplayarak bir blok oluşturur. Bloğun içeriği aşağıdaki kod parçacığında gösterilmektedir:

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

`randao_reveal` alanı, blok teklifçisinin mevcut dönem numarasını imzalayarak oluşturduğu doğrulanabilir rastgele bir değer alır. `eth1_data`, yatırma Merkle ağacının kökü ve yeni yatırmaların doğrulanmasını sağlayan toplam yatırma sayısı dahil olmak üzere, blok teklifçisinin yatırma sözleşmesi görünümü için bir oydur. `graffiti`, bloğa bir mesaj eklemek için kullanılabilecek isteğe bağlı bir alandır. `proposer_slashings` ve `attester_slashings`, teklif edicinin zincir görünümüne göre belirli doğrulayıcıların ceza kesintisi gerektiren suçlar işlediğine dair kanıt içeren alanlardır. `deposits`, blok teklifçisinin haberdar olduğu yeni doğrulayıcı yatırmalarının bir listesidir ve `voluntary_exits`, blok teklifçisinin mutabakat katmanı dedikodu ağında duyduğu, çıkış yapmak isteyen doğrulayıcıların bir listesidir. `sync_aggregate`, daha önce bir senkronizasyon komitesine (hafif istemci verilerine hizmet eden bir doğrulayıcı alt kümesi) atanan ve veri imzalamaya katılan doğrulayıcıları gösteren bir vektördür.

`execution_payload`, işlemler hakkındaki bilgilerin yürütme ve mutabakat istemcileri arasında aktarılmasını sağlar. `execution_payload`, bir işaret bloğunun içine yerleştirilen bir yürütme verisi bloğudur. `execution_payload` içindeki alanlar, ommer'ların olmaması ve `difficulty` yerine `prev_randao` bulunması dışında, Ethereum Sarı Bülten'de özetlenen blok yapısını yansıtır. Yürütme istemcisi, kendi dedikodu ağında duyduğu yerel bir işlem havuzuna erişime sahiptir. Bu işlemler, son-durum olarak bilinen güncellenmiş bir durum ağacı oluşturmak için yerel olarak yürütülür. İşlemler, `execution_payload` içine `transactions` adlı bir liste olarak dahil edilir ve son-durum `state-root` alanında sağlanır.

Tüm bu veriler bir işaret bloğunda toplanır, imzalanır ve blok teklifçisinin eşlerine yayınlanır, onlar da bunu kendi eşlerine yayarlar vb.

[Blokların anatomisi](/developers/docs/blocks) hakkında daha fazla bilgi edinin.

## Bloğa ne olur? {#what-happens-to-blocks}

Blok, blok teklifçisinin yerel veritabanına eklenir ve mutabakat katmanı dedikodu ağı üzerinden eşlere yayınlanır. Bir doğrulayıcı bloğu aldığında, bloğun doğru ebeveyne sahip olduğunu, doğru slota karşılık geldiğini, teklif edici endeksinin beklenen endeks olduğunu, RANDAO açıklamasının geçerli olduğunu ve teklif edicinin ceza kesintisine uğramadığını kontrol etmek de dahil olmak üzere içindeki verileri doğrular. `execution_payload` paketten çıkarılır ve doğrulayıcının yürütme istemcisi, teklif edilen durum değişikliğini kontrol etmek için listedeki işlemleri yeniden yürütür. Bloğun tüm bu kontrolleri geçtiği varsayıldığında, her doğrulayıcı bloğu kendi kurallı zincirine ekler. Süreç daha sonra bir sonraki slotta yeniden başlar.

## Blok ödülleri {#block-rewards}

Blok teklifçisi çalışmaları için ödeme alır. Aktif doğrulayıcıların sayısının ve efektif bakiyelerinin bir fonksiyonu olarak hesaplanan bir `base_reward` vardır. Blok teklifçisi daha sonra bloğa dahil edilen her geçerli onay için `base_reward` değerinin bir kısmını alır; bloğu ne kadar çok doğrulayıcı onaylarsa, blok teklifçisinin ödülü o kadar büyük olur. Ayrıca, ceza kesintisi uygulanması gereken doğrulayıcıları bildirmek için, ceza kesintisine uğrayan her doğrulayıcı için `1/512 * effective balance` değerine eşit bir ödül vardır.

[Ödüller ve cezalar hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Daha fazla bilgi {#further-reading}

- [Bloklara giriş](/developers/docs/blocks/)
- [Hisse kanıtına (PoS) giriş](/developers/docs/consensus-mechanisms/pos/)
- [Ethereum mutabakat spesifikasyonları](https://github.com/ethereum/consensus-specs)
- [Gasper'a giriş](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Ethereum'u Güncellemek](https://eth2book.info/)