---
title: "Düğüm mimarisi"
description: "Ethereum düğümlerinin nasıl oluşturulduğuna giriş."
lang: tr
---

Bir Ethereum düğümü iki istemciden oluşur: bir [yürütüm istemcisi](/developers/docs/nodes-and-clients/#execution-clients) ve bir [mutabakat istemcisi](/developers/docs/nodes-and-clients/#consensus-clients). Bir düğümün yeni bir blok önerebilmesi için bir [doğrulayıcı istemcisi](#validators) de çalıştırması gerekir.

Ethereum [iş ispatı](/developers/docs/consensus-mechanisms/pow/) kullanırken, tam bir Ethereum düğümünü çalıştırmak için bir yürütüm istemcisi yeterliydi. Ancak, [hisse ispatı](/developers/docs/consensus-mechanisms/pow/) uygulamasından bu yana, yürütüm istemcisinin [mutabakat istemcisi](/developers/docs/nodes-and-clients/#consensus-clients) adı verilen başka bir yazılımla birlikte kullanılması gerekir.

Aşağıdaki şema iki Ethereum istemcisi arasındaki ilişkiyi göstermekte. İki istemci kendilerine ait ilgili eşler arası (P2P) ağlarına bağlanır. Yürütüm istemcileri P2P ağı üzerinden işlem "dedikodu"su yaparken, ayrı P2P ağlarına ihtiyaç duyulur ve bu yerel işlem havuzlarını yönetmelerine olanak sağlar. Bu süreçte de fikir birliği istemcileri P2P ağı üzerinden blok dedikodularını yaparlar ve bu da mutabakatın ve zincir büyümesinin önünü açar.

![](node-architecture-text-background.png)

_Yürütüm istemcisi için Erigon, Nethermind ve Besu dahil olmak üzere çeşitli seçenekler vardır_.

Bu iki istemcili yapının çalışması için, mutabakat istemcilerinin yürütüm istemcisine işlem demetlerini aktarması gerekir. Yürütüm istemcisi, işlemlerin herhangi bir Ethereum kuralını ihlal etmediğini ve Ethereum’un durumuna yönelik önerilen güncellemenin doğru olduğunu doğrulamak için işlemleri yerel olarak yürütür. Bir düğüm blok üreticisi olarak seçildiğinde, mutabakat istemcisi örneği, yeni bloka dahil etmek ve küresel durumu güncellemek üzere yürütmek için yürütüm istemcisinden işlem demetleri talep eder. Mutabakat istemcisi, [Motor API'sini](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) kullanarak yerel bir RPC bağlantısı aracılığıyla yürütüm istemcisini yönlendirir.

## Yürütüm istemcisi ne yapar? {#execution-client}

Yürütüm istemcisi, durum yönetimi ve Ethereum Sanal Makinesi'ni ([EVM](/developers/docs/evm/)) desteklemenin yanı sıra işlem doğrulama, işleme ve dedikodudan sorumludur. Blok oluşturma, blok dedikodusu yapma veya mutabakat mantığını yönetmekten sorumlu **değildir**. Bunlar, fikir birliği istemcisinin sorumluluğundadır.

Yürütüm istemcisi, işlem listesi, güncellenmiş durum ağacı ve diğer yürütümle ilgili veriler gibi yürütüm yüklerini oluşturur. Fikir birliği istemcileri, her bloktaki yürütme yüklerini içerir. Yürütüm istemcisi, geçerli olduklarından emin olmak için yeni bloklarda işlemlerin yeniden yürütülmesinden sorumludur. İşlemlerin yürütülmesi, yürütüm istemcisinin [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm) olarak bilinen gömülü bilgisayarında yapılır.

Yürütüm istemcisi ayrıca, kullanıcıların Ethereum blok zincirini sorgulamasını, işlem göndermesini ve akıllı sözleşmeleri dağıtmasını sağlayan [RPC yöntemleri](/developers/docs/apis/json-rpc) aracılığıyla Ethereum'a bir kullanıcı arayüzü sunar. RPC çağrılarının [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/) gibi bir kütüphane veya tarayıcı cüzdanı gibi bir kullanıcı arayüzü tarafından işlenmesi yaygındır.

Özetle, yürütüm istemcisi:

- Ethereum'a bir kullanıcı ağ geçidi
- Ethereum'un durum ve işlem havuzu olan Ethereum Sanal Makinesi'nin evidir.

## Fikir birliği istemcisi ne yapar? {#consensus-client}

Fikir birliği istemcisi, bir düğümün Ethereum ağıyla senkronize kalmasını sağlayan mantıkla ilgilenir. Bu eşlerden blok almayı ve her zaman en büyük tastik birikintisi olan düğümü (Doğrulayıcının etkin bakiyesiyle ölçülür) takip ettiğinden emin olmak için çatal seçim algoritmasını çalıştırmasını kapsar. Yürütüm istemcisine benzer olarak, yürütüm istemcilerinin de blok ve tastikler paylaştıkları kendilerine ait bir P2P ağları vardır.

Yürütüm istemcisi tasdikleme sürecine ya da blok önerilerine katılmaz, bu isteğe bağlı bir fikir birliği istemcisi olan doğrulayıcı tarafından yapılır. Doğrulayıcı olmayan bir fikir birliği istemcisi sadece düğümün senkronize kalması için zincirin baş kısmını takip eder. Bu kullanıcının kendi yürütüm istemcisini kullanarak ve doğru zincirde olduğundan emin olarak Ethereum üzerinde işlem yapmasını sağlar.

## Doğrulayıcılar {#validators}

Hisseleme ve doğrulayıcı yazılımını çalıştırmak, bir düğümü yeni bir blok önermek üzere seçilmeye uygun hale getirir. Düğüm operatörleri mevduat sözleşmesine 32 ETH yatırırken kendi fikir birliği istemcilerine doğrulayıcı ekleyebilirler. Doğrulayıcı istemcisi fikir birliği istemcisi ile paketlenmiş şekilde gelir ve istenen herhangi bir zamanda bir düğüme eklenebilir. Doğrulayıcı, tastikleri ve blok önerilerini işler. Ayrıca bir düğümün cezalar veya kesintiler yoluyla ödül biriktirmesini veya ETH kaybetmesini sağlar.

[Hisseleme hakkında daha fazlası](/staking/).

## Düğüm karşılaştırması bileşenleri {#node-comparison}

| Yürütüm İstemcisi                                                | Fikir Birliği İstemcisi                                                                                                                                                                | Doğrulayıcı                      |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| P2P ağı üzerinden işlemlerin dedikodusunu yapar. | Kendi P2P ağı üzerinden blokların ve tasdiklerin dedikodusunu yapar.                                                                                                   | Blok önerir                      |
| İşlemleri yürütür/yeniden yürütür                                | Çatal seçim algoritmasını çalıştırır                                                                                                                                                   | Ödülleri ve cezaları pay eder    |
| Gelen durum değişikliklerini onaylar                             | Zincirin başını takip eder                                                                                                                                                             | Tasdikleri yapar                 |
| Durum ve makbuz denemelerini yönetir                             | İşaret durumunu yönetir (mutabakat ve yürütme bilgilerine sahiptir)                                                                                                 | Hisselenmesi için 32 ETH gerekir |
| Yürütme yükünü oluşturur                                         | RANDAO'da (doğrulayıcı seçimi ve diğer mutabakat işlemleri için doğrulanabilir rastgelelik sağlayan bir algoritma) biriken rastgeleliği takip eder. | Cezalandırılabilir               |
| Ethereum ile etkileşimde olan JSON-RPC API'larını ortaya çıkarır | Gerekçeyi ve sonuçlandırmayı takip eder                                                                                                                                                |                                  |

## Daha fazla kaynak {#further-reading}

- [Hisse ispatı](/developers/docs/consensus-mechanisms/pos)
- [Blok önerisi](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Doğrulayıcı ödülleri ve cezaları](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
