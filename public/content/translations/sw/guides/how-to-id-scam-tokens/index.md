---
title: Jinsi ya kutambua tokeni za udanganyifu
description: Kuelewa tokeni za udanganyifu, mbinu zinazo zifanya zionekane kuwa halali, na jinsi ya kujiepusha nazo.
lang: sw
---

# Jinsi ya kutambua tokeni za ulaghai {#identify-scam-tokens}

Moja ya matumizi yanayojulikana sana ya Ethereum ni pale kikundi cha watu kinapotengeneza tokeni inayoweza kuuzwa, kwa maana nyingine, sarafu yao wenyewe. Tokeni hizi kwa kawaida hufuata kiwango, [ERC-20](/developers/docs/standards/tokens/erc-20/). Hata hivyo, popote palipo na matumizi halali yanayoleta thamani, pia kuna wahalifu wanaojaribu kuiba thamani hiyo kwa faida yao binafsi.

Kuna njia mbili ambazo zina uwezekano mkubwa kutumiwa na wahalifu hawa kukudanganya:

- **Kukuuzia tokeni ya ulaghai**, ambayo inaweza kuonekana kama tokeni halali unayotaka kununua, lakini imetolewa na walaghai na haina thamani.
- **Kukuhadaa ili usaini miamala mibaya**, kwa kawaida kwa kukuelekeza kwenye kiolesura chao cha mtumiaji. Wanaweza kujaribu kukufanya utoe ruhusa kwa mikataba yao kutumia tokeni zako za ERC-20, jambo ambalo linaweza kufichua taarifa nyeti na kuwapa ufikiaji wa mali zako. Mara nyingi tovuti hizi hufanana kabisa na zile za halali, lakini zikiwa na ujanja uliojificha.

Ili kuonyesha tokeni za ulaghai ni nini, na jinsi ya kuzitambua, tutaangalia mfano mmoja: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Tokeni hii inajaribu kufanana na tokeni halali ya [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="What is ARB?"
contentPreview=''>

Arbitrum ni shirika linalotengeneza na kusimamia [optimistic rollups](/developers/docs/scaling/optimistic-rollups/). Hapo awali, ilikuwa ni kampuni ya kibiashara yenye lengo la kupata faida, lakini baadae kuchukua hatua ya kugatua madaraka. Kama sehemu ya mchakato huo, walitoa [tokeni ya utawala](/dao/#token-based-membership) inayoweza kuuzwa.

</ExpandableCard>

<ExpandableCard
title="Why is the scam token called wARB?"
contentPreview=''>

Katika Ethereum, iwapo mali si ya kiwango cha ERC-20, huundwa toleo jipya ambalo limefungamana na kiwango hicho linaloanzia na herufi "w" kwenye jina lake. Kwa mfano, kuna wBTC kwaajili ya bitcoin na <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH kwaajili ya ether</a>.

Haileti maana kuwa na toleo la tokeni lililofungamana na kiwango cha ERC-20 kama tokeni tayari ni ya Ethereum, lakini matapeli hutegemea mwonekano wa uhalali badala ya ukweli wa msingi.

</ExpandableCard>

## Tokeni za udanganyifu hufanyaje kazi? {#how-do-scam-tokens-work}

Lengo kuu la Ethereum ni ugatuaji. Hii ina maana kwamba hakuna mamlaka ya kati inayoweza kukupokonya mali zako au kukuzuia kuunda mkataba wa kidijitali. Lakini pia ina maana kwamba matapeli wanaweza kuunda mikataba yoyote wanayotaka.

<ExpandableCard
title="What are smart contracts?"
contentPreview=''>

[Mikataba-erevu](/developers/docs/smart-contracts/) ni programu zinazoendeshwa juu ya blockchain ya Ethereum. Kila tokeni ya ERC-20, kwa mfano, huundwa kama mkataba wa kidigitali.

</ExpandableCard>

Hasa, Arbitrum ilipeleka mkataba unaotumia alama ya `ARB`. Lakini hilo halizuii watu wengine kuunda mikataba inayotumia alama hiyo hiyo au inayofanana. Yeyote anayeandika mkataba ndiye anayechagua mkataba huo ufanye nini.

## Kuonekana halali {#appearing-legitimate}

Kuna mbinu nyingi ambazo watengenezaji wa tokeni za udanganyifu hutumia ili kuonekana kama halali.

- **Jina na alama halali**. Kama tulivyosema awali, mikataba ya ERC-20 inaweza kutumia jina na alama sawa kabisa na mikataba mingine ya ERC-20. Hivyo basi, huwezi kutegemea majina au alama hizo kama kipimo cha usalama.

- **Wamiliki halali**. Mara nyingi, tokeni za ulaghai husambaza kiasi kikubwa cha tokeni kwa anuani ambazo zinatarajiwa kuwa wamiliki halali wa tokeni halisi.

  Kwa mfano, hebu tuangalie `wARB` tena. [Takriban 16% ya tokeni](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) zinashikiliwa na anwani ambayo lebo yake ya umma ni [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Hii _sio_ anwani bandia, ni anwani halisi ambayo [ilipeleka mkataba halisi wa ARB kwenye Mtandao Mkuu wa Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Kwa sababu salio la ERC-20 la anuani fulani ni sehemu ya hifadhi ya mkataba wa ERC-20, mkataba unaweza kuamuliwa kuwa chochote msanidi anachotaka. Pia inawezekana mkataba kuzuia uhamishaji, hivyo watumiaji halali hawawezi kuondoa zile tokeni za udanganyifu.

- **Uhamishaji halali**. _Wamiliki halali hawangelipa kuhamisha tokeni ya ulaghai kwa wengine, kwa hivyo kama kuna hamisho, ni lazima iwe halali, sivyo?_ **Si kweli**. Matukio ya `Transfer` yanazalishwa na mkataba wa ERC-20. Tapeli anaweza kuandika mkataba kwa namna kwamba utazalisha vitendo hivyo kirahisi.

## Tovuti za ulaghai {#websites}

Matapeli wanaweza kutengeneza tovuti zinazoshawishi sana, mara nyengine hata nakala zinazofanana kabisa na tovuti za kweli na zenye muonekano sawa kabisa, lakini zote zikiwa ni njia za ujanja tu. Kwa mfano unaweza kuona kiungo cha nje kinachoonekana halali kabisa kumbe kinakupeleka kwenye tovuti ya kitapeli, au maelekezo yasiyo sahihi yanayokufanya utoe funguo zako au kutuma fedha kwenye anwani ya mshambuliaji.

Njia bora ya kujilinda na hili ni kukagua kwa makini URL ya tovuti unazotembelea, na kuhifadhi anuani za tovuti halisi kwenye vialamisho vyako. Ukifanya hivyo, utaweza kufikia tovuti halisi moja kwa moja kupitia vialamisho vyako bila kufanya makosa ya tahajia au kutegemea viungo vya nje.

## Unawezaje kujilinda? {#protect-yourself}

1. **Angalia anuani ya mkataba**. Tokeni halali zinatoka kwenye mashirika halali, na unaweza kuona anuani za mikataba kwenye tovuti rasmi ya shirika husika. Kwa mfano, [kwa `ARB` unaweza kuona anwani halali hapa](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Tokeni halisi zina ukwasi**. Chaguo jingine ni kuangalia ukubwa wa bwawa la ukwasi kwenye [Uniswap](https://uniswap.org/), mojawapo ya protokali za kawaida za kubadilisha tokeni. Itifaki hii inafanya kazi kwa kutumia mabwawa ya ukwasi, ambapo wawekezaji huweka tokeni zao wakitarajia kupata mapato kutokana na ada za biashara.

Tokeni za udanganyifu kwa kawaida huwa na mabwawa madogo sana ya ukwasi, au hayana kabisa, kwa sababu matapeli hawataki kuhatarisha mali halisi. Kwa mfano, bwawa la `ARB`/`ETH` la Uniswap lina takriban dola milioni moja ([angalia hapa kwa thamani ya sasa](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) na kununua au kuuza kiasi kidogo hakutabadilisha bei:

![Kununua tokeni halali](./uniswap-real.png)

Lakini unapojaribu kununua tokeni ya ulaghai ya `wARB`, hata ununuzi mdogo ungebadilisha bei kwa zaidi ya 90%:

![Kununua tokeni ya ulaghai](./uniswap-scam.png)

Huu ni ushahidi mwingine unaoonyesha kuwa `wARB` kuna uwezekano si tokeni halali.

3. **Angalia kwenye Etherscan**. Tokeni nyingi za kitapeli tayari zimebainishwa na kuripotiwa na jamii. Tokeni kama hizi [zimetiwa alama katika Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Ingawa Etherscan si chanzo rasmi cha ukweli (kwa sababu katika mitandao ambayo imegatuliwa hakuna chanzo kimoja cha ukweli), tokeni ambazo zimetambulika na Etherscan kama za kitapeli mara nyingi kweli huwa za kitapeli.

   ![Tokeni ya ulaghai katika Etherscan](./etherscan-scam.png)

## Hitimisho {#conclusion}

Almradi bado kuna thamani duniani, kutakuwepo na matapeli wanaotaka kuiba. Katika dunia ya kidijitali isiyo na udhibiti wa kati, hakuna wa kukulinda isipokuwa wewe mwenyewe. Ni matumaini yangu utayakumbuka mambo haya ili yakusaidie kutofautisha tokeni halali na za kitapeli:

- Tokeni za kitapeli huiga tokeni halali, zinaweza kutumia jina na alama sawa n.k.
- Tokeni za ulaghai _haziwezi_ kutumia anwani sawa ya mkataba.
- Chanzo bora cha anuani ya tokeni halali ni shirika linalomiliki tokeni hiyo.
- Ikishindikana, unaweza kutumia programu maarufu na za kuaminika kama vile [Uniswap](https://app.uniswap.org/#/swap) na [Blockscout](https://eth.blockscout.com/).
