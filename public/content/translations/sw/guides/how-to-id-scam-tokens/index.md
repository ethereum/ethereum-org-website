---
title: Jinsi ya kutambua tokeni za utapeli
description: Kuelewa tokeni za utapeli, jinsi zinavyojifanya kuonekana halali, na jinsi ya kuziepuka.
lang: sw
---

Moja ya matumizi ya kawaida ya Ethereum ni kwa kikundi kuunda tokeni inayoweza kuuzwa, kwa maana fulani sarafu yao wenyewe. Tokeni hizi kwa kawaida hufuata kiwango, [ERC-20](/developers/docs/standards/tokens/erc-20/). Hata hivyo, popote pale ambapo kuna matumizi halali yanayoleta thamani, pia kuna wahalifu wanaojaribu kujiibia thamani hiyo.

Kuna njia mbili ambazo wanaweza kukudanganya:

- **Kukuuzia tokeni ya utapeli**, ambayo inaweza kuonekana kama tokeni halali unayotaka kununua, lakini inatolewa na matapeli na haina thamani yoyote.
- **Kukuhadaa ili kusaini miamala mibaya**, kwa kawaida kwa kukuelekeza kwenye kiolesura chao cha mtumiaji. Wanaweza kujaribu kukushawishi upe mikataba yao kibali kwenye tokeni zako za ERC-20, kufichua taarifa nyeti zinazowapa ufikiaji wa mali zako, n.k. Violesura hivi vya mtumiaji vinaweza kuwa nakala zinazokaribia kufanana kabisa na tovuti halali, lakini zikiwa na hila zilizofichwa.

Ili kueleza tokeni za utapeli ni nini, na jinsi ya kuzitambua, tutaangalia mfano wa moja: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Tokeni hii inajaribu kuonekana kama tokeni halali ya [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="What is ARB?"
contentPreview=''>

Arbitrum ni shirika linalotengeneza na kusimamia [mikusanyiko yenye matumaini (optimistic rollups)](/developers/docs/scaling/optimistic-rollups/). Hapo awali, Arbitrum ilipangwa kama kampuni ya kutengeneza faida, lakini kisha ikachukua hatua za ugatuzi. Kama sehemu ya mchakato huo, walitoa [tokini ya utawala](/dao/#token-based-membership) inayoweza kuuzwa.

</ExpandableCard>

<ExpandableCard
title="Why is the scam token called wARB?"
contentPreview=''>

Kuna utaratibu katika Ethereum kwamba wakati mali haitii viwango vya ERC-20 tunaunda toleo lake "lililofungwa" lenye jina linaloanza na "w". Kwa hivyo, kwa mfano, tuna WBTC kwa Bitcoin na <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">ether iliyofungwa (weth) kwa Etha</a>.

Haina maana kuunda toleo lililofungwa la tokeni ya ERC-20 ambayo tayari iko kwenye Ethereum, lakini matapeli hutegemea mwonekano wa uhalali badala ya uhalisia wa msingi.

</ExpandableCard>

## Tokeni za utapeli zinafanyaje kazi? {#how-do-scam-tokens-work}

Lengo kuu la Ethereum ni ugatuzi. Hii inamaanisha kuwa hakuna mamlaka kuu inayoweza kutaifisha mali zako au kukuzuia kusambaza mkataba mahiri. Lakini pia inamaanisha kuwa matapeli wanaweza kusambaza mkataba mahiri wowote wanaotaka.

<ExpandableCard
title="What are smart contracts?"
contentPreview=''>

[Mikataba mahiri](/developers/docs/smart-contracts/) ni programu zinazoendeshwa juu ya mnyororo wa vitalu wa Ethereum. Kila tokeni ya ERC-20, kwa mfano, inatekelezwa kama mkataba mahiri.

</ExpandableCard>

Hasa, Arbitrum ilisambaza mkataba unaotumia alama ya `ARB`. Lakini hiyo haizuii watu wengine pia kusambaza mkataba unaotumia alama sawa kabisa, au inayofanana. Yeyote anayeandika mkataba anapata kuweka kile ambacho mkataba utafanya.

## Kuonekana halali {#appearing-legitimate}

Kuna hila kadhaa ambazo waundaji wa tokeni za utapeli hufanya ili kuonekana halali.

- **Jina na alama halali**. Kama ilivyotajwa hapo awali, mikataba ya ERC-20 inaweza kuwa na alama na jina sawa na mikataba mingine ya ERC-20. Huwezi kutegemea sehemu hizo kwa usalama.

- **Wamiliki halali**. Tokeni za utapeli mara nyingi hufanya mgao wa bure wa salio kubwa kwa anwani ambazo zinaweza kutarajiwa kuwa wamiliki halali wa tokeni halisi.

  Kwa mfano, hebu tuangalie `wARB` tena. [Takriban 16% ya tokeni](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) zinashikiliwa na anwani ambayo lebo yake ya umma ni [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Hii _sio_ anwani feki, kwa kweli ni anwani ambayo [ilisambaza mkataba halisi wa ARB kwenye Mtandao Mkuu wa Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Kwa sababu salio la ERC-20 la anwani ni sehemu ya hifadhi ya mkataba wa ERC-20, linaweza kubainishwa na mkataba kuwa chochote anachotaka msanidi wa mkataba. Inawezekana pia kwa mkataba kuzuia hamisho ili watumiaji halali wasiweze kuondoa tokeni hizo za utapeli.

- **Hamisho halali**. _Wamiliki halali wasingelipa ili kufanya hamisho la tokeni ya utapeli kwa wengine, kwa hivyo ikiwa kuna hamisho lazima iwe halali, sivyo?_ **Sio kweli**. Matukio ya `Transfer` yanazalishwa na mkataba wa ERC-20. Tapeli anaweza kuandika mkataba kwa urahisi kwa njia ambayo itazalisha vitendo hivyo.

## Tovuti za utapeli {#websites}

Matapeli wanaweza pia kutengeneza tovuti zinazoshawishi sana, wakati mwingine hata nakala kamili za tovuti halisi zenye violesura vya mtumiaji (UIs) vinavyofanana, lakini zikiwa na hila fiche. Mifano inaweza kuwa viungo vya nje vinavyoonekana halali lakini kwa kweli vinampeleka mtumiaji kwenye tovuti ya nje ya utapeli, au maagizo yasiyo sahihi yanayomwongoza mtumiaji kufichua funguo zao au kutuma fedha kwenye anwani ya mshambuliaji.

Mbinu bora ya kuepuka hili ni kuangalia kwa makini URL ya tovuti unazotembelea, na kuhifadhi anwani za tovuti zinazojulikana kuwa halisi katika alamisho zako. Kisha, unaweza kufikia tovuti halisi kupitia alamisho zako bila kufanya makosa ya tahajia kwa bahati mbaya au kutegemea viungo vya nje.

## Unawezaje kujilinda? {#protect-yourself}

1. **Angalia anwani ya mkataba**. Tokeni halali hutoka kwa mashirika halali, na unaweza kuona anwani za mkataba kwenye tovuti ya shirika. Kwa mfano, [kwa `ARB` unaweza kuona anwani halali hapa](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Tokeni halisi zina ukwasi**. Chaguo jingine ni kuangalia ukubwa wa bwawa la ukwasi kwenye [Uniswap](https://uniswap.org/), mojawapo ya itifaki za kawaida za kubadilishana tokeni. Itifaki hii inafanya kazi kwa kutumia mabwawa ya ukwasi, ambamo wawekezaji huweka tokeni zao kwa matumaini ya kupata faida kutokana na ada za biashara.

Tokeni za utapeli kwa kawaida huwa na mabwawa madogo sana ya ukwasi, ikiwa yapo, kwa sababu matapeli hawataki kuhatarisha mali halisi. Kwa mfano, bwawa la Uniswap la `ARB`/`ETH` linashikilia takriban dola milioni moja ([tazama hapa kwa thamani ya sasa](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) na kununua au kuuza kiasi kidogo hakutabadilisha bei:

![Buying a legitimate token](./uniswap-real.png)

Lakini unapojaribu kununua tokeni ya utapeli ya `wARB`, hata ununuzi mdogo sana ungebadilisha bei kwa zaidi ya 90%:

![Buying a scam token](./uniswap-scam.png)

Huu ni ushahidi mwingine unaotuonyesha kuwa `wARB` huenda isiwe tokeni halali.

3. **Angalia katika Etherscan**. Tokeni nyingi za utapeli tayari zimetambuliwa na kuripotiwa na jamii. Tokeni kama hizo [zimewekewa alama katika Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Ingawa Etherscan sio chanzo chenye mamlaka cha ukweli (ni asili ya mitandao iliyogatuliwa kwamba hakuwezi kuwa na chanzo chenye mamlaka cha uhalali), tokeni zinazotambuliwa na Etherscan kama utapeli zina uwezekano mkubwa wa kuwa utapeli.

   ![Scam token in Etherscan](./etherscan-scam.png)

## Hitimisho {#conclusion}

Ilimradi kuna thamani duniani, kutakuwa na matapeli wanaojaribu kujiibia, na katika ulimwengu uliogatuliwa hakuna mtu wa kukulinda isipokuwa wewe mwenyewe. Tunatumai, unakumbuka mambo haya ili kusaidia kutofautisha tokeni halali na za utapeli:

- Tokeni za utapeli huiga tokeni halali, zinaweza kutumia jina sawa, alama, n.k.
- Tokeni za utapeli _haziwezi_ kutumia anwani sawa ya mkataba.
- Chanzo bora cha anwani ya tokeni halali ni shirika ambalo linamiliki tokeni hiyo.
- Ikishindikana, unaweza kutumia programu maarufu, zinazoaminika kama vile [Uniswap](https://app.uniswap.org/#/swap) na [Blockscout](https://eth.blockscout.com/).