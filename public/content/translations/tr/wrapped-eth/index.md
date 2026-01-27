---
title: "Sarılı ETH (WETH) Nedir?"
description: "Ether (ETH) için ERC20 uyumlu bir sarıcı olan Sarılı ethere (WETH) giriş."
lang: tr
---

# Sarılı ether (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Herhangi bir zincirde ETH sarmak veya sarmalamayı açmak için [WrapETH.com](https://www.wrapeth.com/) adresinde cüzdanınızı bağlayın.
</div>
</Alert>

Ether (ETH), Ethereum'un ana para birimidir. Para birimi olarak kullanmak suretiyle hisseleme ve hesaplama için gas ücretlerini ödeme gibi çeşitli amaçlarla kullanılır. **WETH, Ethereum'daki diğer dijital varlık türleri olan birçok uygulamanın ve [ERC-20 jetonlarının](/glossary/#erc-20)** ihtiyaç duyduğu bazı ek işlevlere sahip, ETH'nin etkili bir şekilde yükseltilmiş formudur. ETH, bu jetonlar ile çalışabilmek için ERC-20 standardı olarak bilinen aynı kurallara uymalıdır.

Bu boşluğu doldurabilmek için sarılı ETH (WETH) yaratıldı. **Sarılı ETH, sözleşmeye herhangi bir miktarda ETH yatırmanıza ve aynı miktarı basılmış WETH** olarak almanıza olanak tanıyan ve ERC-20 jeton standardına uygun bir akıllı sözleşmedir. WETH, ETH'nin yerel varlığı ETH olarak değil, ERC-20 jetonu olarak etkileşime girmenize olanak tanıyan bir temsilidir. Gaz ücretlerini ödemek için yine de yerel ETH'ye ihtiyacınız olacak, bu yüzden para yatırırken mutlaka bir miktar tasarruf yapın.

WETH akıllı sözleşmesini kullanarak WETH'yi ETH'ye çevirebilirsiniz. WETH akıllı sözleşmesi ile istediğiniz miktarda WETH kullanabilirsiniz ve aynı miktarı ETH olarak alırsınız. Biriktirilen WETH daha sonrasında yakılır ve yakılan WETH'ler dolaşımdan çıkarılır.

**ETH arzının yaklaşık olarak ~ %3'ü WETH jeton sözleşmesinde kilitlenir** ve bu da WETH'yi en çok kullanılan [akıllı sözleşmelerden](/glossary/#smart-contract) biri yapar. WETH, özellikle kullanıcılar merkeziyetsiz finans (DeFi) uygulamalarıyla etkileşime geçtiğinde önemlidir.

## ETH'yi neden ERC-20 olarak sarmamız gerekiyor? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/), isteyen herkesin Ethereum ekosisteminde bu standardı kullanan uygulama ve jetonlarla sorunsuz bir şekilde etkileşim kuran jetonlar oluşturabilmesini sağlayan aktarılabilir jetonlar için standart bir arayüz tanımlar. **ETH, ERC-20 standardından önceki** bir standart olduğundan bu spesifikasyona uymaz. Bu, ETH'yi diğer ERC-20 jetonlarıyla **kolayca** değiştiremeyeceğiniz veya **ERC-20 standardını kullanan uygulamalarda ETH kullanamayacağınız** anlamına gelir. ETH'yi sarmak size aşağıdakileri yapma olanağı tanır:

- **ETH'yi ERC-20 jetonları ile değiştirme**: ETH'yi diğer ERC-20 jetonları ile doğrudan değiştiremezsiniz. WETH, ERC-20 değiştirilebilir jeton standardına uygun ve diğer ERC-20 jetonlarıyla takas edilebilen bir ether temsilidir.

- **Merkeziyetsiz uygulamalarda ETH kullanma**: ETH, ERC20 ile uyumlu olmadığından geliştiricilerin merkeziyetsiz uygulamalarda ayrı arayüzler (biri ETH için, diğeri ERC-20 jetonları için) oluşturmaları gerekir. ETH'yi sarmak bu engeli ortadan kaldırır ve geliştiricilerin aynı merkeziyetsiz uygulama içinde ETH'yi ve diğer jetonları yönetmesini sağlar. Birçok merkeziyetsiz finans uygulaması bu standardı kullanır ve bu jetonların takası için pazarlar yaratır.

## Sarılı ether (WETH) ile ether (ETH) karşılaştırması: Fark nedir? {#weth-vs-eth-differences}

|          | **Ether (ETH)**                                                                                                                                                                                                                 | **Sarılı Ether (WETH)**                                                                                                                                                                                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Arz      | ETH arzı, Ethereum protokolü tarafından yönetilir. ETH [ihracı](/roadmap/merge/issuance), işlemlerin gerçekleştirilmesi ve blokların oluşturulması sırasında Ethereum doğrulayıcıları tarafından gerçekleştirilir. | WETH, bir ERC-20 jetonudur ve arzı, bir akıllı sözleşme tarafından yönetilir. Yeni WETH birimleri, kullanıcılardan ETH depozitoları aldıktan sonra sözleşme tarafından ihraç edilir veya bir kullanıcı ETH karşılığında WETH almak istediğinde WETH birimleri yakılır. |
| Mülkiyet | Sahiplik, hesap bakiyeniz aracılığıyla Ethereum protokolü tarafından yönetilir.                                                                                                                                                    | WETH'nin mülkiyeti, Ethereum protokolü tarafından güvence altına alınan WETH jeton akıllı sözleşmesi tarafından yönetilir.                                                                                                                                                             |
| Gaz      | Ether (ETH), Ethereum ağındaki hesaplama ödemeleri için kabul edilen ödeme birimidir. Gaz ücretleri gwei (bir ether birimi) cinsinden belirlenir.                            | Gaz ödemeleri için WETH jetonunun kullanımı yerel olarak desteklenmez.                                                                                                                                                                                                                 |

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="ETH'yi sarmak veya çözmek ücretli mi?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

WETH sözleşmesini kullanarak ETH'yi sarmak veya çözmek için gaz ücreti ödersiniz.
</ExpandableCard>

<ExpandableCard title="WETH güvenli mi?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH, basit ve test edilmiş bir akıllı sözleşmeye dayandığı için genellikle güvenli kabul edilir. WETH sözleşmesi resmen doğrulanmıştır. Bu, Ethereum'da akıllı sözleşmelere yönelik en yüksek güvenlik standardıdır.
</ExpandableCard>

<ExpandableCard title="Neden farklı WETH jetonları görüyorum?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Bu sayfada açıklanan [WETH'nin kanonik uygulamasının](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) yanı sıra, başka varyantları da vardır. Bunlar, uygulama geliştiricileri tarafından oluşturulan özel jetonlar veya diğer blokzincirlerde yayımlanmış sürümler olabilir ve farklı davranabilir ya da farklı güvenlik özelliklerine sahip olabilir. **Hangi WETH uygulaması ile etkileşimde olduğunuzu öğrenmek için jeton bilgilerini her zaman iki kez kontrol edin.**
</ExpandableCard>

<ExpandableCard title="Diğer ağlardaki WETH sözleşmeleri nelerdir?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum Ana Ağı](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)
</ExpandableCard>

## Daha fazla kaynak {#further-reading}

- [Nedir bu WETH?](https://weth.tkn.eth.limo/)
- [WETH'nin Blockscout'taki jeton bilgileri](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [WETH'nin Resmi Doğrulaması](https://zellic.io/blog/formal-verification-weth)
