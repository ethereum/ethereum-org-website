---
title: Kuanzishwa kwa daraja za blockchain
description: Daraja hizi zinakubalisha users waweze kupeleka mapato yao kati ya different blockchains
lang: sw
---

# Madaraja ya mnyororo wa bloku {#prerequisites}

_Web3 imepitia mabadiliko mwanana hadi ikawa ukolojia ya L1 blockchains na ufumbuzi wa L2 scaling, kila mmoja imeboreshwa na uwezo wa kipekee na biashara-offs. Idadi ya blochi mnyororo inakua, na mahitaji ya kusogeza mali kati yao pia yanakua.Tunahitaji daraja kutimiza haya mahitaji._

<Divider />

## Je, daraja ni nini? {#what-are-bridges}

Daraja za Blockchain zinatumika sawasawa na daraja tunazozitumia kila siku duniani. Jinsi kama daraja ya kawaida inavyounganisha sehemu mbili, daraja ya blockchain inaunganisha ikolojia mbili ya blockchain. **Madaraja huwezesha mawasiliano kati ya minyororo ya kizuizi kupitia utumaji wa habari na mali**.

Hebu tuzingatie mfano:

Umetoka Amerika na unapanga kuzuru Ughaibuni. Una USD lakini unahitaji kutumia EUR. Ukitaka kuexchange USD yako iwe EUR unatumia exchange ya masarafu utakapotozwa ada ndogo.

Lakini, unafanya nini ikiwa unataka kufanya ubadilishanaji sawa ili utumie [mnyororo wa bloku](/glossary/#blockchain) tofauti? Tuseme unataka kubadilishana [ETH](/glossary/#ether) kwenye Mtandao Mkuu wa Ethereum kwa ETH kwenye [Arbitrum](https://arbitrum.io/). Kama vile tulivyounda exchange ya sarafu ya EUR, tunahitaji utaratibu wa kusongeza ETH kutoka Ethereum hadi Arbitrum. Daraja zinafanya hii shughuli itimizwe. Katika hali hii, [Arbitrum ina daraja asili](https://portal.arbitrum.io/bridge) ambalo linaweza kuhamisha ETH kutoka Mtandao Mkuu hadi Arbitrum.

## Kwa nini tunahitaji madaraja? {#why-do-we-need-bridges}

Viambajengo vyote vina mapungufu yao. Ili Ethereum ipanuke na kukidhi mahitaji, imehitaji [unda-mpya](/glossary/#rollups). Vinginevyo, L1 kama Solana na Avalanche zimeundwa kwa njia tofauti ili kuwezesha matokeo ya juu lakini kwa gharama ya ugatuaji.

Hata hivyo, minyororo yote ya bloku hutengenezwa katika mazingira yaliyotengwa na huwa na sheria na mifumo tofauti ya [makubaliano](/glossary/#consensus). Hii inamaanisha kuwa hawawezi kuwasiliana asili, na ishara haziwezi kusonga kwa uhuru kati ya viambajengo.

Madaraja yapo ili kuunganisha viambajengo, kuruhusu uhamisho wa habari na ishara kati yao.

**Bridges enable**:

- uhamisho wa mnyororo wa mali na habari.
- [mfumo mtawanyo wa kimamlaka](/glossary/#dapp) za kufikia uwezo wa minyororo mbalimbali ya bloku – hivyo basi kuimarisha uwezo wao (kwa kuwa sasa itifaki zina nafasi zaidi ya kubuni kwa ajili ya uvumbuzi).
- watumiaji kufikia majukwaa mapya na kuongeza manufaa ya minyororo tofauti.
- watengenezaji kutoka kwa mifumo tofauti ya ikolojia ya kiambajengo ili kushirikiana na kuunda mifumo mipya ya watumiaji.

[Jinsi ya kuhamisha tokeni kwa safu ya 2 kwa kutumia daraja](/guides/how-to-use-a-bridge/)

<Divider />

## Matumizi ya daraja {#bridge-use-cases}

Zifuatazo ni baadhi ya matukio ambapo unaweza kutumia daraja:

### Ada za chini za muamala {#transaction-fees}

Hebu tuseme una ETH kwenye Ethereum Mainnet lakini unataka ada nafuu za ununuzi ili kuchunguza dapps tofauti. Kwa kuweka daraja la ETH yako kutoka Mainnet hadi kwenye mkusanyo wa Ethereum L2, unaweza kufurahia ada za chini za ununuzi.

### mfumo mtawanyo wa kimamlaka kwenye minyororo mingine ya bloku {#dapps-other-chains}

Ikiwa umekuwa ukitumia Aave kwenye Ethereum Mainnet kusambaza USDT lakini kiwango cha riba unachoweza kupokea kwa kusambaza USDT kwa kutumia Aave on Polygon ni cha juu zaidi.

### Gundua mifumo ikolojia ya mnyororo wa bloku {#explore-ecosystems}

Ikiwa una ETH kwenye Ethereum Mainnet na ungependa kuchunguza alt L1 ili kujaribu dapp zao asili. Unaweza kutumia daraja kuhamisha ETH yako kutoka Ethereum Mainnet hadi alt L1.

### Miliki mali asili za sarafu ya kidigitali {#own-native}

Hebu tuseme unataka kumiliki Bitcoin asilia (BTC), lakini una pesa tu kwenye Ethereum Mainnet. Ili kupata kufichuliwa na BTC kwenye Ethereum, unaweza kununua Wrapped Bitcoin (WBTC). Hata hivyo, WBTC ni tokeni ya [ERC-20](/glossary/#erc-20) asili ya mtandao wa Ethereum, ambayo ina maana kwamba ni toleo la Ethereum la Bitcoin na si mali asili kwenye mnyororo wa bloku wa Bitcoin. Ili kumiliki BTC asili, utahitaji kuunganisha mali yako kutoka Ethereum hadi Bitcoin kwa kutumia daraja. Hii itaunganisha WBTC yako na kuibadilisha kuwa BTC asili. Vinginevyo, unaweza kumiliki BTC na kutaka kuitumia katika itifaki za [DeFi](/glossary/#defi) za Ethereum. Hii itahitaji kuunganishwa kwa njia nyingine, kutoka BTC hadi WBTC ambayo inaweza kutumika kama mali kwenye Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Unaweza pia kufanya yote yaliyo hapo juu kwa kutumia [centralized exchange](/get-eth). Walakini, isipokuwa pesa zako tayari ziko kwenye ubadilishaji, itahusisha hatua nyingi, na unaweza kuwa bora kutumia daraja.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Aina za madaraja {#types-of-bridge}

Madaraja yana aina nyingi za miundo na ugumu. Kwa ujumla, madaraja yapo katika makundi mawili: madaraja yanayoaminika na yasiyoaminika.

| Madaraja yanayoaminika                                                                                                                                                  | Madaraja yasiyoaminika                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Madaraja yanayoaminika hutegemea huluki kuu au mfumo kwa shughuli zao.                                                                                  | Madaraja yasiyoaminika yanafanya kazi kwa kutumia mikataba mahiri na kanuni za algoriti.                                                    |
| Madaraja yasiyoaminika yanafanya kazi kwa kutumia mikataba na kanuni za algoriti. Watumiaji wengi hutegemea sifa ya mwendeshaji daraja. | Hawana uaminifu, yaani, usalama wa daraja ni sawa na ule wa kiambajengo cha msingi.                                                         |
| Watumiaji wanahitaji kuacha udhibiti wa mali zao za kripto.                                                                                             | Kupitia [mikataba-erevu](/glossary/#smart-contract), madaraja yasiyohitaji kuaminiwa huwawezesha watumiaji kubaki na udhibiti wa fedha zao. |

Kwa kifupi, tunaweza kusema kwamba madaraja yanayoaminika yana mawazo ya kuaminiana, ilhali madaraja yasiyoaminika yanapunguzwa uaminifu na hayatoi mawazo mapya ya uaminifu zaidi ya yale ya vikoa vya msingi. Hivi ndivyo maneno haya yanaweza kuelezewa:

- **Isiyohitaji kuaminiwa**: kuwa na usalama sawa na vikoa vya msingi. Kama ilivyoelezwa na [Arjun Bhuptani katika makala hii.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Dhana za uaminifu:** kuondoka kwenye usalama wa vikoa vya msingi kwa kuongeza vithibitishaji vya nje kwenye mfumo, na hivyo kuufanya usiwe salama sana kiuchumi-kripto.

Ili kukuza uelewa mzuri wa tofauti kuu kati ya njia hizi mbili, wacha tuchukue mfano:

Fikiria uko kwenye kituo cha ukaguzi cha usalama cha uwanja wa ndege. Kuna aina mbili za vituo vya ukaguzi:

1. Vituo vya ukaguzi wa Mwongozo - vinavyoendeshwa na maafisa ambao huangalia wenyewe maelezo yote ya tikiti na utambulisho wako kabla ya kupeana pasi ya kuabiri.
2. Kujiandikisha - kunaendeshwa na mashine ambapo unaweka maelezo ya safari yako ya ndege na kupokea pasi ya kupanda kila kitu kitakapokamilika.

Sehemu ya ukaguzi ya mwongozo ni sawa na muundo unaoaminika kwani inategemea mtu wa tatu, yaani, maafisa, kwa shughuli zake. Kama mtumiaji, unawaamini maafisa kufanya maamuzi sahihi na kutumia taarifa zako za faragha kwa usahihi.

Kujiandikisha ni sawa na modeli isiyoaminika kwani huondoa jukumu la mwendeshaji na kutumia teknolojia kwa shughuli zake. Watumiaji daima hubakia kudhibiti data zao na si lazima waamini watu wengine na taarifa zao za faragha.

Suluhu nyingi za kuweka daraja hupitisha modeli kati ya hali hizi mbili za kupita kiasi na viwango tofauti vya kutokuwa na imani.

<Divider />

## Tumia madaraja {#use-bridge}

Kutumia madaraja hukuruhusu kuhamisha mali yako kwenye viambajengo tofauti tofauti. Hapa kuna nyenzo ambazo zinaweza kukusaidia kupata na kutumia madaraja:

- **[L2BEAT Bridges Summary](https://l2beat.com/bridges/summary) & [L2BEAT Bridges Risk Analysis](https://l2beat.com/bridges/summary)**: Muhtasari wa kina wa madaraja mbalimbali, ukijumuisha maelezo kuhusu hisa za soko, aina ya daraja, na minyororo lengwa. L2BEAT pia ina uchanganuzi wa hatari kwa madaraja, kusaidia watumiaji kufanya maamuzi sahihi wakati wa kuchagua daraja.
- **[DefiLlama Bridge Summary](https://defillama.com/bridges/Ethereum)**: Muhtasari wa ujazo wa madaraja kwenye mitandao ya Ethereum.

<Divider />

## Hatari za kutumia madaraja {#bridge-risk}

Madaraja yako katika hatua za mwanzo za maendeleo. Kuna uwezekano kwamba muundo bora wa daraja bado haujagunduliwa. Kuingiliana na aina yoyote ya daraja hubeba hatari:

- **Hatari ya Mkataba-erevu —** hatari ya hitilafu kwenye msimbo ambayo inaweza kusababisha fedha za mtumiaji kupotea
- **Hatari ya Teknolojia —** kushindwa kwa programu, msimbo wenye hitilafu, makosa ya kibinadamu, barua taka, na mashambulizi mabaya yanaweza kutatiza shughuli za mtumiaji

Zaidi ya hayo, kwa kuwa madaraja yanayoaminika huongeza mawazo ya uaminifu, yana hatari zaidi kama vile:

- **Hatari ya Udhibiti —** waendeshaji wa daraja wanaweza kinadharia kuwazuia watumiaji kuhamisha mali zao kwa kutumia daraja
- **Hatari ya Ulinzi —** waendeshaji wa daraja wanaweza kushirikiana kuiba fedha za watumiaji

Pesa za mtumiaji ziko hatarini ikiwa:

- kuna hitilafu kwenye mkataba mahiri
- mtumiaji hufanya makosa
- kiambajengo cha msingi kimedukuliwa
- waendeshaji daraja wana nia ovu katika daraja linaloaminika
- daraja linadukuliwa

Udukuzi mmoja wa hivi majuzi ulikuwa wa daraja la Wormhole la Solana, [ambapo wETH 120k ($325 milioni USD) iliibwa wakati wa udukuzi huo](https://rekt.news/wormhole-rekt/). [Nyingi za udukuzi mkuu katika minyororo ya bloku zilihusisha madaraja](https://rekt.news/leaderboard/).

Madaraja ni muhimu kwa watumiaji kuingia kwenye Ethereum L2s, na hata kwa watumiaji wanaotaka kuchunguza mifumo mbalimbali ya ikolojia. Hata hivyo, kutokana na hatari zinazohusika katika kuingiliana na madaraja, watumiaji lazima waelewe usuluhishi unaofanywa na madaraja. Hii ni baadhi ya [mikakati ya usalama wa kuvuka-minyororo](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Masomo zaidi {#further-reading}

- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _Juni 18, 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _Julai 5, 2022 - Bartek Kiepuszewski_
- ["Kwa nini mustakabali utakuwa wa minyororo mingi, lakini hautakuwa wa kuvuka-minyororo."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _Januari 8, 2022 - Vitalik Buterin_
- [Harnessing Shared Security For Secure Cross-Chain Interoperability: Lagrange State Committees And Beyond](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _Juni 12, 2024 - Emmanuel Awosika_
- [The State Of Rollup Interoperability Solutions](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _Juni 20, 2024 - Alex Hook_

