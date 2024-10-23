---
title: Düğüm mimarisi
description: Ethereum düğümlerinin nasıl oluşturulduğuna giriş.
lang: tr
---

Bir Ethereum düğümü iki istemciden oluşur: bir [yürütüm istemcisi](/developers/docs/nodes-and-clients/#execution-clients) ve bir [fikir birliği istemcisi](/developers/docs/nodes-and-clients/#consensus-clients).

Ethereum [iş ispatı](/developers/docs/consensus-mechanisms/pow/) kullanırken, bir Ethereum düğümünü çalıştırmak için tek bir yürütüm istemcisi yeterliydi. Ancak, [hisse ispatının](/developers/docs/consensus-mechanisms/pow/) uygulanmasından beri, yürütüm istemcisinin [fikir birliği istemcisi](/developers/docs/nodes-and-clients/#consensus-clients) denilen başka bir yazılım parçası ile birlikte kullanılması gerekmekte.

Aşağıdaki şema iki Ethereum istemcisi arasındaki ilişkiyi göstermekte. İki istemci kendilerine ait ilgili eşler arası (P2P) ağlarına bağlanır. Yürütüm istemcileri P2P ağı üzerinden işlem "dedikodu"su yaparken, ayrı P2P ağlarına ihtiyaç duyulur ve bu yerel işlem havuzlarını yönetmelerine olanak sağlar. Bu süreçte de fikir birliği istemcileri P2P ağı üzerinden blok dedikodularını yaparlar ve bu da mutabakatın ve zincir büyümesinin önünü açar.

![](node-architecture-text-background.png)

Bu çift istemcili yapının çalışması için, fikir birliği istemcilerinin yürütüm istemcisine işlem paketlerini iletebilmesi gerekir. İstemcinin herhangi bir Ethereum kuralını çiğnemediğinden ve Ethereum'un durumu için önerilen güncellemenin doğru olduğundan emin olmanın yolu işlemleri yerel olarak yürütmektir. Benzer olarak, düğüm bir blok üreticisi olmak için seçildiğinde, fikir birliği istemcisi yeni bloka dahil etmek ve küresel durumu güncellemek için Geth üzerinden işlem paketleri talep edebilmelidir. İstemciler arası gerçekleşen bu iletişim [motor API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)'sını kullanan yerel bir RPC bağlantısı tarafından sağlanır.

## Yürütüm istemcisi ne yapar? {#execution-client}

Yürütüm istemcisi, işlem işleme, işlem dedikodusu, durum yönetimi ve Ethereum Sanal Makinesi'nin ([EVM](/developers/docs/evm/)) desteklenmesinden sorumludur. Ancak blok inşası, blok dedikodusu ve mutabakat mantığının idaresinden sorumlu **değildir**. Bunlar, fikir birliği istemcisinin sorumluluğundadır.

Yürütüm istemcisi, işlem listesi, güncellenmiş durum ağacı ve diğer yürütümle ilgili veriler gibi yürütüm yüklerini oluşturur. Fikir birliği istemcileri, her bloktaki yürütme yüklerini içerir. Yürütüm istemcisi, geçerli olduklarından emin olmak için yeni bloklarda işlemlerin yeniden yürütülmesinden sorumludur. İşlemleri yürütme, yürütüm istemcisinin [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm) olarak bilinen gömülü bilgisayarından yapılır.

Yürütüm istemcisi ayrıca Ethereum'a [RPC yöntemleri](/developers/docs/apis/json-rpc) aracılığıyla kullanıcıların Ethereum blok zincirini sorgulamasını, işlemleri göndermelerini ve akıllı sözleşmeler dağıtmalarını sağlayan bir arayüz sunar. RPC çağrılarının bir [Web3js](https://docs.web3js.org/)veya [Web3py](https://web3py.readthedocs.io/en/v5/) kütüphanesi ya da tarayıcı cüzdanı gibi bir kullanıcı arayüzü tarafından işlenmesi yaygın bir durumdur.

Özetle, yürütüm istemcisi:

- Ethereum'a bir kullanıcı ağ geçidi
- Ethereum'un durum ve işlem havuzu olan Ethereum Sanal Makinesi'nin evidir.

## Fikir birliği istemcisi ne yapar? {#consensus-client}

Fikir birliği istemcisi, bir düğümün Ethereum ağıyla senkronize kalmasını sağlayan mantıkla ilgilenir. Bu eşlerden blok almayı ve her zaman en büyük tastik birikintisi olan düğümü (Doğrulayıcının etkin bakiyesiyle ölçülür) takip ettiğinden emin olmak için çatal seçim algoritmasını çalıştırmasını kapsar. Yürütüm istemcisine benzer olarak, yürütüm istemcilerinin de blok ve tastikler paylaştıkları kendilerine ait bir P2P ağları vardır.

Yürütüm istemcisi tasdikleme sürecine ya da blok önerilerine katılmaz, bu isteğe bağlı bir fikir birliği istemcisi olan doğrulayıcı tarafından yapılır. Doğrulayıcı olmayan bir fikir birliği istemcisi sadece düğümün senkronize kalması için zincirin baş kısmını takip eder. Bu kullanıcının kendi yürütüm istemcisini kullanarak ve doğru zincirde olduğundan emin olarak Ethereum üzerinde işlem yapmasını sağlar.

## Doğrulayıcılar {#validators}

Düğüm operatörleri mevduat sözleşmesine 32 ETH yatırırken kendi fikir birliği istemcilerine doğrulayıcı ekleyebilirler. Doğrulayıcı istemcisi fikir birliği istemcisi ile paketlenmiş şekilde gelir ve istenen herhangi bir zamanda bir düğüme eklenebilir. Doğrulayıcı, tastikleri ve blok önerilerini işler. Bir düğümün duruma göre ödülleri almasını, cezalar sebebiyle ETH kaybetmesini ya da cezalandırılmasını sağlarlar. Doğrulayıcı yazılımını çalıştırmak ayrıca bir düğümün yeni blok önermesi için seçilmesine uygun hale getirir.

[Hisseleme hakkında daha fazlası](/staking/).

## Düğüm karşılaştırmasının bileşenleri {#node-comparison}

| Yürütüm İstemcisi                                                | Fikir Birliği İstemcisi                                                | Doğrulayıcı                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| P2P Ağı üzerinden işlem "dedikodu"sunu yapar                     | Kendi P2P ağı üzerinden blokların "dedikodu"sunu ve tastiklerini yapar | Blok önerir                      |
| İşlemleri yürütür/yeniden yürütür                                | Çatal seçim algoritmasını çalıştırır                                   | Ödülleri ve cezaları pay eder    |
| Gelen durum değişikliklerini onaylar                             | Zincirin başını takip eder                                             | Tasdikleri yapar                 |
| Durum ve makbuz denemelerini yönetir                             | İşaret durumunu yönetir (mutabakat ve yürütme bilgilerine sahiptir)    | Hisselenmesi için 32 ETH gerekir |
| Yürütme yükünü oluşturur                                         | RanDAO'da birikmiş rastlantısallığı takip eder                         | Cezalandırılabilir               |
| Ethereum ile etkileşimde olan JSON-RPC API'larını ortaya çıkarır | Gerekçeyi ve sonuçlandırmayı takip eder                                |                                  |

## Daha fazla bilgi {#further-reading}

- [Hisse ispatı](/developers/docs/consensus-mechanisms/pos)
- [Blok önerisi](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Doğrulayıcı ödülleri ve cezaları](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
