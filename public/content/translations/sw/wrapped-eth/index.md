---
title: Ether iliyofungwa (WETH)
metaTitle: Ether Iliyofungwa (WETH) ni nini
description: Utangulizi wa Ether iliyofungwa (WETH)—kifungashio kinachoendana na ERC20 kwa ajili ya etha (ETH). 
lang: sw
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Unganisha mkoba wako ili kufunga au kufungua ETH kwenye mnyororo wowote katika [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

Etha (ETH) ni sarafu kuu ya Ethereum. Inatumika kwa madhumuni kadhaa kama vile uwekaji dhamana, kama sarafu, na kulipia ada za gesi kwa ajili ya ukokotoaji. **WETH kimsingi ni aina iliyoboreshwa ya ETH yenye utendaji wa ziada unaohitajika na programu nyingi na [tokeni za ERC-20](/glossary/#erc-20)**, ambazo ni aina nyingine za rasilimali za kidijitali kwenye Ethereum. Ili kufanya kazi na tokeni hizi, ETH lazima ifuate sheria sawa na zao, zinazojulikana kama kiwango cha ERC-20.

Ili kuziba pengo hili, ether iliyofungwa (WETH) iliundwa. **Ether iliyofungwa ni mkataba mahiri unaokuruhusu kuweka kiasi chochote cha ETH kwenye mkataba na kupokea kiasi hicho hicho katika WETH iliyozalishwa** ambayo inatii kiwango cha tokeni cha ERC-20. WETH ni uwakilishi wa ETH unaokuruhusu kuingiliana nayo kama tokeni ya ERC-20, na si kama rasilimali asili ya ETH. Bado utahitaji ETH asili ili kulipia ada za gesi, kwa hivyo hakikisha unabakiza kiasi fulani unapoweka. 

Unaweza kufungua WETH ili kupata ETH kwa kutumia mkataba mahiri wa WETH. Unaweza kukomboa kiasi chochote cha WETH kwa kutumia mkataba mahiri wa WETH, na utapokea kiasi hicho hicho katika ETH. WETH iliyowekwa kisha inachomwa na kuondolewa kwenye usambazaji unaozunguka wa WETH.

**Takriban ~3% ya usambazaji wa ETH unaozunguka umefungwa kwenye mkataba wa tokeni wa WETH** na kuifanya kuwa mojawapo ya [mikataba mahiri](/glossary/#smart-contract) inayotumiwa zaidi. WETH ni muhimu hasa kwa watumiaji wanaoingiliana na programu katika fedha zilizogatuliwa (DeFi).

## Kwa nini tunahitaji kufunga ETH kama ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) inafafanua kiolesura cha kawaida cha tokeni zinazoweza kuhamishwa, kwa hivyo mtu yeyote anaweza kuunda tokeni zinazoingiliana kwa urahisi na programu na tokeni zinazotumia kiwango hiki katika mfumo wa ikolojia wa Ethereum. Kwa kuwa **ETH ilitangulia kiwango cha ERC-20**, ETH haitii vipimo hivi. Hii inamaanisha **huwezi kwa urahisi** kubadilisha ETH kwa tokeni nyingine za ERC-20 au **kutumia ETH katika programu zinazotumia kiwango cha ERC-20**. Kufunga ETH kunakupa fursa ya kufanya yafuatayo:

- **Kubadilisha ETH kwa tokeni za ERC-20**: Huwezi kubadilisha ETH moja kwa moja kwa tokeni nyingine za ERC-20. WETH ni uwakilishi wa etha unaotii kiwango cha tokheni mbadala cha ERC-20 na inaweza kubadilishwa na tokeni nyingine za ERC-20. 

- **Kutumia ETH katika programu tumizi zilizogatuliwa (dapps)**: Kwa sababu ETH haiendani na ERC20, wasanidi programu wangehitaji kuunda violesura tofauti (kimoja cha ETH na kingine cha tokeni za ERC-20) katika dapps. Kufunga ETH kunaondoa kikwazo hiki na kuwawezesha wasanidi programu kushughulikia ETH na tokeni nyingine ndani ya dapp hiyo hiyo. Programu nyingi za fedha zilizogatuliwa hutumia kiwango hiki, na kuunda masoko ya kubadilishana tokeni hizi.

## Ether iliyofungwa (WETH) dhidi ya etha (ETH): Kuna tofauti gani? {#weth-vs-eth-differences}


|            | **Etha (ETH)**                                                                                                                                                                                                                 | **Ether Iliyofungwa (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Usambazaji | [Usambazaji wa ETH](/eth/supply/) unasimamiwa na itifaki ya [Ethereum](/). [Utoaji](/roadmap/merge/issuance) wa ETH unashughulikiwa na wathibitishaji wa Ethereum wakati wa kuchakata miamala na kuunda vitalu.                           | WETH ni tokeni ya ERC-20 ambayo usambazaji wake unasimamiwa na mkataba mahiri. Vitengo vipya vya WETH hutolewa na mkataba baada ya kupokea amana za ETH kutoka kwa watumiaji, au vitengo vya WETH huchomwa wakati mtumiaji anapotaka kukomboa WETH kwa ETH.                                                                                                                                        |
| Umiliki    | Umiliki unasimamiwa na itifaki ya Ethereum kupitia salio la akaunti yako.  | Umiliki wa WETH unasimamiwa na mkataba mahiri wa tokeni ya WETH, uliolindwa na itifaki ya Ethereum.                                                                                                                                         |
| Gesi       | Etha (ETH) ni kitengo kinachokubalika cha malipo kwa ajili ya ukokotoaji kwenye mtandao wa Ethereum. Ada za gesi huonyeshwa katika Gwei (kitengo cha etha).                                                                                    | Kulipa gesi kwa kutumia tokeni za WETH hakutumiki kiasili.                                                                                                                                                                                              |

## Maswali yanayoulizwa mara kwa mara {#faq}
 
<ExpandableCard title="Je, unalipa ili kufunga/kufungua ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Unalipa ada za gesi ili kufunga au kufungua ETH kwa kutumia mkataba wa WETH.

</ExpandableCard>

<ExpandableCard title="Je, WETH ni salama?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH kwa ujumla inachukuliwa kuwa salama kwa sababu inategemea mkataba mahiri rahisi na uliojaribiwa kikamilifu. Mkataba wa WETH pia umepitia uthibitishaji rasmi, ambao ni kiwango cha juu zaidi cha usalama kwa mikataba mahiri kwenye Ethereum.

</ExpandableCard>

<ExpandableCard title="Kwa nini ninaona tokeni tofauti za WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Kando na [utekelezaji rasmi wa WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) ulioelezwa kwenye ukurasa huu, kuna matoleo mengine katika matumizi halisi. Hizi zinaweza kuwa tokeni maalum zilizoundwa na wasanidi programu au matoleo yaliyotolewa kwenye minyororo mingine ya kuzuia, na zinaweza kufanya kazi tofauti au kuwa na sifa tofauti za usalama. **Daima hakikisha mara mbili taarifa za tokeni ili kujua ni utekelezaji upi wa WETH unaoingiliana nao.**

</ExpandableCard>

<ExpandableCard title="Mikataba ya WETH kwenye mitandao mingine ni ipi?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Mtandao Mkuu wa Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Kusoma zaidi {#further-reading}

- [WETH ni nini?](https://weth.tkn.eth.limo/)
- [Taarifa za tokeni ya WETH kwenye Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Uthibitishaji Rasmi wa WETH](https://zellic.io/blog/formal-verification-weth)