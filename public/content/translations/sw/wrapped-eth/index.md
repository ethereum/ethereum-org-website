---
title: Ether Iliyofungwa (WETH) ni nini
description: "Utangulizi wa Ether Iliyofungwa (WETH)— kifungashio kinachotangamana na ERC20 cha ether (ETH)."
lang: sw
---

# Ether iliyofungwa (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Unganisha mkoba wako ili kufunga au kufungua ETH kwenye mnyororo wowote kwenye [WrapETH.com](https://www.wrapeth.com/)
</div>
</Alert>

Ether (ETH) ndiyo sarafu kuu ya Ethereum. Hutumika kwa madhumuni kadhaa kama vile kuweka hisa, kama sarafu, na kulipia ada za gesi kwa ajili ya kukokotoa. **WETH kwa hakika ni mfumo ulioboreshwa wa ETH wenye utendakazi fulani wa ziada unaohitajika na programu nyingi na [tokeni za ERC-20](/glossary/#erc-20)**, ambazo ni aina zingine za mali za kidijitali kwenye Ethereum. Ili kufanya kazi na tokeni hizi, ETH lazima ifuate sheria sawa na zinazofuatwa, zinazojulikana kama kiwango cha ERC-20.

Ili kuziba pengo hili, ETH iliyofungwa (WETH) iliundwa. **ETH Iliyofungwa ni mkataba-erevu unaokuwezesha kuweka kiasi chochote cha ETH kwenye mkataba na kupokea kiasi sawa katika WETH iliyotengenezwa** inayofuata kiwango cha tokeni cha ERC-20. WETH ni uwakilishi wa ETH unaokuruhusu kuingiliana nayo kama tokeni ya ERC-20, sio kama mali asili ya ETH. Bado utahitaji ETH asili ili kulipia ada za gesi, kwa hivyo hakikisha unahifadhi kiasi fulani unapoweka.

Unaweza kufungua WETH na kupata ETH kwa kutumia mkataba-erevu wa WETH. Unaweza kukomboa kiasi chochote cha WETH na mkataba-erevu wa WETH, na utapokea kiasi sawa katika ETH. WETH iliyowekwa huchomwa na kutolewa kwenye usambazaji unaozunguka wa WETH.

**Takriban ~3% ya usambazaji unaozunguka wa ETH umefungwa kwenye mkataba wa tokeni wa WETH** na kuifanya kuwa moja ya [mikabataba-erevu](/glossary/#smart-contract) inayotumika zaidi. WETH ni muhimu hasa kwa watumiaji wanaoigilia kati programu katika fedha zilizogatuliwa (DeFi).

## Kwa nini tunahitaji kufunga ETH kama ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) inafafanua kiolesura cha kawaida cha tokeni zinazoweza kuhamishwa, kwa hivyo mtu yeyote anaweza kuunda tokeni zinazoingiliana bila matatizo na programu na tokeni zinazotumia kiwango hiki katika mfumo ikolojia wa Ethereum. Kwa kuwa **ETH ilikuwepo kabla ya kiwango cha ERC-20**, ETH haikubaliani na vipimo hivi. Hii ina maana **huwezi kwa urahisi** kubadilisha ETH kwa tokeni zingine za ERC-20 au **kutumia ETH katika programu zinazotumia kiwango cha ERC-20**. Kufunga ETH kunakupa fursa ya kufanya yafuatayo:

- **Kubadilisha ETH kwa tokeni za ERC-20**: Huwezi kubadilisha ETH moja kwa moja kwa tokeni zingine za ERC-20. WETH ni uwakilishi wa ether unaotii kiwango cha tokeni kinachoweza kubadilishwa cha ERC-20 na inaweza kubadilishwa na tokeni zingine za ERC-20.

- **Tumia ETH katika mfumo mtawanyo wa kimamlaka**: Kwa sababu ETH haitangamani na ERC20, wasanidi programu watahitaji kuunda violessura tofauti (moja kwa ETH na nyingine kwa tokeni za ERC-20) katika mfumo mtawanyo wa kimamlaka. Kufunga ETH kunaondoa kikwazo hiki na kuwawezesha wasanidi programu kushughulikia ETH na tokeni zingine ndani ya mfumo mtawanyo wa kimamlaka mmoja. Programu nyingi za fedha zilizogatuliwa hutumia kiwango hiki, na kuunda masoko ya kubadilisha tokeni hizi.

## Ether iliyofungwa (WETH) dhidi ya ether (ETH): Kuna tofauti gani? {#weth-vs-eth-differences}

|         | **Ether (ETH)**                                                                                                                                                                                            | **Ether Iliyofungwa (WETH)**                                                                                                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ugavi   | Ugavi wa ETH unadhibitiwa na itifaki ya Ethereum. [Utoaji](/roadmap/merge/issuance) wa ETH hushughulikiwa na wathibitishaji wa Ethereum wakati wa kuchakata miamala na kuunda bloku.          | WETH ni tokeni ya ERC-20 ambayo ugavi wake unadhibitiwa na mkataba-erevu. Vipande vipya vya WETH hutolewa na mkataba baada ya kupokea amana za ETH kutoka kwa watumiaji, au vipande vya WETH huchomwa mtumiaji anapotaka kukomboa WETH kwa ETH. |
| Umiliki | Umiliki unadhibitiwa na itifaki ya Ethereum kupitia salio la akaunti yako.                                                                                                                                    | Umiliki wa WETH unadhibitiwa na mkataba-erevu wa tokeni ya WETH, unaolindwa na itifaki ya Ethereum.                                                                                                                                                             |
| Gesi    | Ether (ETH) ndicho kipimo kinachokubalika cha malipo kwa ajili ya kukokotoa kwenye mtandao wa Ethereum. Ada za gesi hupimwa kwa gwei (sehemu ya ether). | Kulipa gesi kwa kutumia tokeni za WETH hakuwezeshwi moja kwa moja.                                                                                                                                                                                              |

## Maswali yanayoulizwa mara kwa mara {#faq}

<ExpandableCard title="Je, unalipia kufunga/kufungua ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Unalipa ada za gesi ili kufunga au kufungua ETH ukitumia mkataba wa WETH.
</ExpandableCard>

<ExpandableCard title="Je, WETH ni salama?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH kwa ujumla inachukuliwa kuwa salama kwa sababu inategemea mkataba-erevu rahisi na uliothibitishwa kivita. Mkataba wa WETH pia umethibitishwa rasmi, ambao ndio kiwango cha juu zaidi cha usalama kwa mikataba-erevu kwenye Ethereum.
</ExpandableCard>

<ExpandableCard title="Kwa nini naona tokeni tofauti za WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Kando na [utekelezaji mkuu wa WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) ulioelezewa kwenye ukurasa huu, kuna anuwai zingine zinazotumika. Hizi zinaweza kuwa tokeni maalum zilizoundwa na wasanidi programu au matoleo yaliyotolewa kwenye minyororo mingine ya bloku, na zinaweza kuwa na tabia tofauti au kuwa na sifa tofauti za usalama. **Kagua mara mbili habari za tokeni kila wakati ili kujua ni utekelezaji upi wa WETH unaoingiliana nao.**
</ExpandableCard>

<ExpandableCard title="Ni ipi mikataba ya WETH kwenye mitandao mingine?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Mtandao Mkuu wa Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)
</ExpandableCard>

## Masomo zaidi {#further-reading}

- [WETH ni nini?](https://weth.tkn.eth.limo/)
- [Taarifa za tokeni ya WETH kwenye Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Uthibitisho Rasmi wa WETH](https://zellic.io/blog/formal-verification-weth)
