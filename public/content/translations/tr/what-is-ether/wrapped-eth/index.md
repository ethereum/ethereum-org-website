---
title: Sarılmış ether (WETH)
metaTitle: Sarılmış Ether (WETH) Nedir?
description: Sarılmış ether'e (WETH) giriş—ether (ETH) için ERC-20 uyumlu bir sarmalayıcı. 
lang: tr
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Herhangi bir zincirde ETH sarmak veya sarmasını açmak için cüzdanınızı [WrapETH.com](https://www.wrapeth.com/) adresinden bağlayın</div>
</Alert>

Ether (ETH), Ethereum'un ana para birimidir. Staking, bir para birimi olarak kullanım ve hesaplama için gaz ücretlerini ödeme gibi çeşitli amaçlar için kullanılır. **WETH, aslında Ethereum'daki diğer dijital varlık türleri olan [ERC-20 Token'ları](/glossary/#erc-20) ve birçok uygulama tarafından ihtiyaç duyulan bazı ek işlevlere sahip, ETH'nin yükseltilmiş bir biçimidir.** Bu Token'larla çalışabilmek için ETH'nin, ERC-20 standardı olarak bilinen ve onların uyduğu kuralların aynısına uyması gerekir.

Bu boşluğu doldurmak için sarılmış ether (WETH) oluşturuldu. **Sarılmış ETH, sözleşmeye herhangi bir miktarda ETH yatırmanıza ve ERC-20 Token standardına uyan aynı miktarda basılmış WETH almanıza olanak tanıyan bir akıllı sözleşmedir.** WETH, ETH'nin yerel varlık olarak değil, bir ERC-20 Token'ı olarak etkileşime girmenizi sağlayan bir temsilidir. Gaz ücretlerini ödemek için hâlâ yerel ETH'ye ihtiyacınız olacak, bu nedenle para yatırırken bir miktar ayırdığınızdan emin olun. 

WETH akıllı sözleşmesini kullanarak WETH'nin sarmasını açıp ETH'ye dönüştürebilirsiniz. WETH akıllı sözleşmesi ile herhangi bir miktarda WETH'yi bozdurabilir ve aynı miktarda ETH alabilirsiniz. Yatırılan WETH daha sonra yakılır ve dolaşımdaki WETH arzından çıkarılır.

**Dolaşımdaki ETH arzının kabaca ~%3'ü WETH Token sözleşmesinde kilitlidir**, bu da onu en çok kullanılan [akıllı sözleşmelerden](/glossary/#smart-contract) biri yapar. WETH, özellikle merkeziyetsiz finans (DeFi) uygulamalarıyla etkileşime giren kullanıcılar için önemlidir.

## Neden ETH'yi bir ERC-20 olarak sarmamız gerekiyor? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/), transfer edilebilir Token'lar için standart bir arayüz tanımlar, böylece herkes Ethereum ekosisteminde bu standardı kullanan uygulamalar ve Token'larla sorunsuz bir şekilde etkileşime giren Token'lar oluşturabilir. **ETH, ERC-20 standardından daha eski olduğu için**, ETH bu spesifikasyona uymaz. Bu, ETH'yi diğer ERC-20 Token'larıyla **kolayca takas edemeyeceğiniz** veya **ETH'yi ERC-20 standardını kullanan uygulamalarda kullanamayacağınız** anlamına gelir. ETH'yi sarmak size aşağıdakileri yapma fırsatı verir:

- **ETH'yi ERC-20 Token'larıyla takas etme**: ETH'yi doğrudan diğer ERC-20 Token'larıyla takas edemezsiniz. WETH, ERC-20 misli token standardına uyan ve diğer ERC-20 Token'larıyla takas edilebilen Ether'in bir temsilidir. 

- **ETH'yi dapp'lerde kullanma**: ETH, ERC-20 uyumlu olmadığı için geliştiricilerin merkeziyetsiz uygulamalarda (dapp) ayrı arayüzler (biri ETH, diğeri ERC-20 Token'ları için) oluşturması gerekirdi. ETH'yi sarmak bu engeli ortadan kaldırır ve geliştiricilerin aynı dapp içinde ETH ve diğer Token'ları işlemesine olanak tanır. Birçok merkeziyetsiz finans uygulaması bu standardı kullanır ve bu Token'ları takas etmek için piyasalar oluşturur.

## Sarılmış ether (WETH) ve ether (ETH): Fark nedir? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Sarılmış Ether (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Arz     | [ETH arzı](/eth/supply/), [Ethereum](/) protokolü tarafından yönetilir. ETH'nin [ihracı](/roadmap/merge/issuance), işlemleri işlerken ve bloklar oluştururken Ethereum doğrulayıcıları tarafından gerçekleştirilir.                           | WETH, arzı bir akıllı sözleşme tarafından yönetilen bir ERC-20 Token'ıdır. Sözleşme kullanıcılardan ETH mevduatı aldıktan sonra yeni WETH birimleri ihraç edilir veya bir kullanıcı WETH'yi ETH için bozdurmak istediğinde WETH birimleri yakılır.                                                                                                                                        |
| Sahiplik  | Sahiplik, hesap bakiyeniz aracılığıyla Ethereum protokolü tarafından yönetilir.  | WETH sahipliği, Ethereum protokolü tarafından güvence altına alınan WETH Token akıllı sözleşmesi tarafından yönetilir.                                                                                                                                         |
| Gaz        | Ether (ETH), Ethereum ağındaki hesaplamalar için kabul edilen ödeme birimidir. Gaz ücretleri Gwei (bir Ether birimi) cinsinden ifade edilir.                                                                                    | WETH Token'ları ile gaz ödemesi yerel olarak desteklenmez.                                                                                                                                                                                              |

## Sıkça sorulan sorular {#faq}
 
<ExpandableCard title="ETH sarmak/açmak için ödeme yapıyor musunuz?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

WETH sözleşmesini kullanarak ETH sarmak veya sarmasını açmak için gaz ücreti ödersiniz.

</ExpandableCard>

<ExpandableCard title="WETH güvenli mi?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH, basit ve zorlu testlerden geçmiş bir akıllı sözleşmeye dayandığı için genellikle güvenli kabul edilir. WETH sözleşmesi ayrıca, Ethereum'daki akıllı sözleşmeler için en yüksek güvenlik standardı olan biçimsel doğrulama işleminden geçmiştir.

</ExpandableCard>

<ExpandableCard title="Neden farklı WETH token'ları görüyorum?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Bu sayfada açıklanan [standart WETH uygulamasının](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) yanı sıra, piyasada başka varyantlar da bulunmaktadır. Bunlar, uygulama geliştiricileri tarafından oluşturulan özel Token'lar veya diğer blokzincirlerinde ihraç edilen sürümler olabilir ve farklı davranabilir veya farklı güvenlik özelliklerine sahip olabilirler. **Hangi WETH uygulamasıyla etkileşime girdiğinizi bilmek için Token bilgilerini her zaman mutlaka kontrol edin.**

</ExpandableCard>

<ExpandableCard title="Diğer ağlardaki WETH sözleşmeleri nelerdir?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum Ana Ağı](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [WTF is WETH?](https://weth.tkn.eth.limo/)
- [Blockscout üzerinde WETH Token bilgileri](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [WETH'nin Biçimsel Doğrulaması](https://zellic.io/blog/formal-verification-weth)