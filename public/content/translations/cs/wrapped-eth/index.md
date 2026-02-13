---
title: "Co je Zabalený ether (WETH)"
description: "Úvod do Zabaleného etheru (WETH), ERC20-kompatibilního wrapperu pro ether (ETH)."
lang: cs
---

# Zabalený ether (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Připojte svou peněženku a zabalte nebo rozbalte ETH na jakémkoli řetězci na [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

Ether (ETH) je hlavní měna Etherea. Používá se pro různé účely, jako je uzamčení, platby a placení poplatků za palivo potřebné pro výpočetní operace. **WETH je v podstatě vylepšená forma ETH s přidanými funkcemi, které vyžaduje řada aplikací a [ERC-20 tokeny(/glossary/#erc-20)**, což jsou další typy digitálních aktiv na Ethereu. Aby ETH mohlo pracovat s těmito tokeny, musí dodržovat stejná pravidla, která jsou stanovena standardem ERC-20.

Zabalené ETH (WETH) byl vytvořeno za účelem zaplnění této mezery. Zabalené ETH je chytrý kontrakt, který vám umožní vložit libovolné množství ETH do kontraktu a obdržet stejné množství ve vyraženém WETH, které odpovídá standardu ERC-20 tokenů. WETH je reprezentací ETH, která vám umožňuje s ním zacházet jako s ERC-20 tokenem, nikoliv jako s nativním ETH. Stále však budete potřebovat nativní ETH k placení poplatků za palivo, takže si při směně nezapomeňte nechat potřebnou část ETH.

Pomocí WETH chytrého kontraktu můžete WETH zpětně vyměnit za ETH. Pomocí WETH chytrého kontraktu si můžete i zpětně vyměnit libovolné množství WETH a obdržíte stejné množství v ETH. Takto vložené WETH je následně spáleno a odebráno z oběhu.

**V kontraktu WETH tokenu jsou uzamčena asi ~3 % oběžné zásoby ETH**, což z něj činí jeden z nejpoužívanějších [chytrých kontraktů](/glossary/#smart-contract). WETH je obzvláště důležité pro uživatele, kteří interagují s aplikacemi v decentralizovaných financích (DeFi).

## Proč potřebujeme ETH zabalit jako ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definuje standardní rozhraní pro transferovatelné tokeny, takže kdokoli může vytvářet tokeny, které spolupracují s aplikacemi bez jakýchkoliv problémů, a tokeny, které používají tento standard v ekosystému Etherea. Protože ETH existovalo dříve než standard ERC-20, nesplňuje tuto specifikaci. To znamená, že **nemůžete snadno** směnit ETH za jiné ERC-20 tokeny nebo **používat ETH v aplikacích, které používají standard ERC-20**. Zabalení ETH vám umožňuje následující:

- **Směna ETH za ERC-20 tokeny**: Nemůžete přímo vyměnit ETH za jiné ERC-20 tokeny. WETH je reprezentací etheru, která splňuje standard ERC-20 a může být směňováno za jiné ERC-20 tokeny.

- **Použití ETH v dappkách**: Protože ETH není kompatibilní s ERC-20, vývojáři by museli vytvořit samostatná rozhraní (jedno pro ETH a další pro ERC-20 tokeny) v dappkách. Zabalení ETH tento problém odstraňuje a umožňuje vývojářům pracovat s ETH a dalšími tokeny v rámci stejné aplikace. Spousta aplikací v decentralizovaných financích používá tento standard a vytváří trhy pro směnu těchto tokenů.

## Zabalený ether (WETH) vs. ether (ETH): Čím se liší? {#weth-vs-eth-differences}

|             | **Ether (ETH)**                                                                                                                                                                                    | **Zabalený ether (WETH)**                                                                                                                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Zásoba      | Zásoba ETH je spravována protokolem Ethereum. [Vydávání](/roadmap/merge/issuance) ETH je zajišťováno validátory Etherea během zpracování transakcí a vytváření bloků.                 | WETH je ERC-20 token, jehož zásoba je spravována chytrým kontraktem. Nové jednotky WETH jsou vydávány kontraktem po obdržení vkladů ETH od uživatelů nebo jsou jednotky WETH spáleny, když si uživatel přeje zpětně vyměnit WETH za ETH. |
| Vlastnictví | Vlastnictví je spravováno protokolem Ethereum prostřednictvím vašeho zůstatku na účtu.                                                                                                                | Vlastnictví WETH je spravováno chytrým kontraktem WETH, který je zabezpečen protokolem Ethereum.                                                                                                                                                         |
| Palivo      | Ether (ETH) je akceptovaná jednotka platby za výpočetní operace v síti Ethereum. Poplatky za palivo jsou denominovány v gwei (jednotka etheru). | Placení poplatků za palivo pomocí WETH tokenů není nativně podporováno.                                                                                                                                                                                  |

## Často kladené dotazy {#faq}

<ExpandableCard title="Platí se za zabalení/rozbalení ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Platíte poplatky za palivo při balení nebo rozbalování ETH pomocí WETH kontraktu.
</ExpandableCard>

<ExpandableCard title="Je WETH bezpečné?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH je obecně považováno za bezpečné, protože je založeno na jednoduchém, osvědčeném chytrém kontraktu. WETH kontrakt byl také formálně ověřen, což je nejvyšší bezpečnostní standard pro chytré kontrakty na Ethereu.
</ExpandableCard>

<ExpandableCard title="Proč vidím různé WETH tokeny?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Kromě [kanonické implementace WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) popsané na této stránce existují i jiné varianty. Tyto varianty mohou být tokeny, které vytvořili vývojáři aplikací pro vlastní účely, nebo verze vydané na jiných blockchainech a mohou se chovat odlišně nebo mít odlišné bezpečnostní vlastnosti. **Vždy si ověřte informace o tokenu, abyste věděli, s jakou implementací WETH pracujete.**
</ExpandableCard>

<ExpandableCard title="Jaké jsou WETH kontrakty na jiných sítích?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Hlavní síť Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)
</ExpandableCard>

## Další čtení {#further-reading}

- [Co je WETH?](https://weth.tkn.eth.limo/)
- [Informace o tokenu WETH na Blockscoutu](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Formální verifikace WETH](https://zellic.io/blog/formal-verification-weth)
