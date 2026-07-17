---
title: Zabalený ether (WETH)
metaTitle: Co je zabalený ether (WETH)
description: Úvod do zabaleného etheru (WETH) – wrapperu pro ether (ETH) kompatibilního s ERC-20.
lang: cs
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Připojte svou peněženku a zabalte nebo rozbalte ETH na jakémkoli řetězci na [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

Ether (ETH) je hlavní měnou Etherea. Používá se k několika účelům, jako je staking, jako měna a k placení poplatků za gas za výpočty. **WETH je v podstatě vylepšená forma ETH s některými dalšími funkcemi, které vyžaduje mnoho aplikací a [tokenů ERC-20](/glossary/#erc-20)**, což jsou další typy digitálních aktiv na Ethereu. Aby bylo možné s těmito tokeny pracovat, musí ETH dodržovat stejná pravidla jako ony, známá jako standard ERC-20.

K překlenutí této mezery byl vytvořen zabalený ether (WETH). **Zabalený ether je chytrý kontrakt, který vám umožňuje vložit do kontraktu jakékoli množství ETH a získat stejné množství ve vyraženém WETH**, které odpovídá standardu tokenů ERC-20. WETH je reprezentací ETH, která vám umožňuje s ním interagovat jako s tokenem ERC-20, nikoli jako s nativním aktivem ETH. K placení poplatků za gas budete stále potřebovat nativní ETH, takže si při vkladu nezapomeňte nějaké nechat. 

WETH můžete rozbalit na ETH pomocí chytrého kontraktu WETH. Pomocí chytrého kontraktu WETH můžete vyplatit jakékoli množství WETH a obdržíte stejné množství v ETH. Vložené WETH je poté spáleno a staženo z obíhající nabídky WETH.

**Zhruba ~3 % obíhající nabídky ETH je uzamčeno v kontraktu tokenu WETH**, což z něj činí jeden z nejpoužívanějších [chytrých kontraktů](/glossary/#smart-contract). WETH je obzvláště důležitý pro uživatele, kteří interagují s aplikacemi v decentralizovaných financích (DeFi).

## Proč potřebujeme zabalit ETH jako ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definuje standardní rozhraní pro převoditelné tokeny, takže kdokoli může vytvářet tokeny, které bezproblémově interagují s aplikacemi a tokeny využívajícími tento standard v ekosystému Etherea. Vzhledem k tomu, že **ETH předchází standardu ERC-20**, ETH této specifikaci nevyhovuje. To znamená, že **nemůžete snadno** směnit ETH za jiné tokeny ERC-20 nebo **používat ETH v aplikacích využívajících standard ERC-20**. Zabalení ETH vám dává možnost provádět následující:

- **Směnit ETH za tokeny ERC-20**: ETH nemůžete přímo směnit za jiné tokeny ERC-20. WETH je reprezentací etheru, která splňuje standard pro zaměnitelný token ERC-20 a lze ji směnit za jiné tokeny ERC-20. 

- **Používat ETH v decentralizovaných aplikacích (dapps)**: Protože ETH není kompatibilní s ERC-20, vývojáři by museli v decentralizovaných aplikacích (dapps) vytvářet oddělená rozhraní (jedno pro ETH a druhé pro tokeny ERC-20). Zabalení ETH tuto překážku odstraňuje a umožňuje vývojářům pracovat s ETH a dalšími tokeny v rámci stejné dapp. Mnoho aplikací pro decentralizované finance tento standard využívá a vytváří trhy pro směnu těchto tokenů.

## Zabalený ether (WETH) vs. ether (ETH): Jaký je v tom rozdíl? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Zabalený ether (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nabídka     | [Nabídka ETH](/eth/supply/) je spravována protokolem [Ethereum](/). [Emise](/roadmap/merge/issuance) ETH je zajišťována validátory Etherea při zpracování transakcí a vytváření bloků.                           | WETH je token ERC-20, jehož nabídka je spravována chytrým kontraktem. Nové jednotky WETH jsou kontraktem emitovány poté, co obdrží vklady ETH od uživatelů, nebo jsou jednotky WETH spáleny, když si uživatel přeje vyplatit WETH za ETH.                                                                                                                                        |
| Vlastnictví  | Vlastnictví je spravováno protokolem Ethereum prostřednictvím zůstatku na vašem účtu.  | Vlastnictví WETH je spravováno chytrým kontraktem tokenu WETH, který je zabezpečen protokolem Ethereum.                                                                                                                                         |
| Gas        | Ether (ETH) je přijímanou jednotkou platby za výpočty v síti Ethereum. Poplatky za gas jsou denominovány v Gwei (jednotka etheru).                                                                                    | Placení za gas pomocí tokenů WETH není nativně podporováno.                                                                                                                                                                                              |

## Často kladené dotazy {#faq}
 
<ExpandableCard title="Platíte za zabalení/rozbalení ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Za zabalení nebo rozbalení ETH pomocí kontraktu WETH platíte poplatky za gas.

</ExpandableCard>

<ExpandableCard title="Je WETH bezpečný?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH je obecně považován za bezpečný, protože je založen na jednoduchém, v praxi prověřeném chytrém kontraktu. Kontrakt WETH prošel také formální verifikací, což je nejvyšší bezpečnostní standard pro chytré kontrakty na Ethereu.

</ExpandableCard>

<ExpandableCard title="Proč vidím různé tokeny WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Kromě [kanonické implementace WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) popsané na této stránce existují v praxi i další varianty. Může se jednat o vlastní tokeny vytvořené vývojáři aplikací nebo verze vydané na jiných blockchainech, které se mohou chovat odlišně nebo mít jiné bezpečnostní vlastnosti. **Vždy si dvakrát zkontrolujte informace o tokenu, abyste věděli, se kterou implementací WETH interagujete.**

</ExpandableCard>

<ExpandableCard title="Jaké jsou kontrakty WETH na jiných sítích?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum Mainnet](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Další čtení {#further-reading}

- [WTF is WETH?](https://weth.tkn.eth.limo/)
- [Informace o tokenu WETH na Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Formální verifikace WETH](https://zellic.io/blog/formal-verification-weth)