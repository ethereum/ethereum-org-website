---
title: Utangulizi wa madaraja ya kiambajengo
description: Madaraja huruhusu watumiaji kuhamisha fedha zao kwenye miambajengo tofauti
lang: sw
---

# Madaraja ya kiambajengo {#prerequisites}

_Web3 imebadilika na kuwa mfumo wa ikolojia wa miambajengo ya L1 na suluhisho za uboreshaji wa uwezo za L2, kila moja ikiwa imeundwa na uwezo wa kipekee na mapungufu. Kadiri idadi ya itifaki za kiambajengo inavyoongezeka, ndivyo mahitaji ya kuhamisha mali kwenye minyororo yanavyoongezeka. Ili kutimiza hitaji hili, tunahitaji madaraja._

<Divider />

## Madaraja ni nini? {#what-are-bridges}

Madaraja ya kiambajengo hufanya kazi kama madaraja tunayoyajua katika ulimwengu wa kawaida. Kama vile daraja la kawaida linavyounganisha maeneo mawili, daraja la kiambajengo huunganisha mifumo miwili ya ikolojia ya kiambajengo. **Madaraja hurahisisha mawasiliano kati ya miambajengo kupitia uhamishaji wa taarifa na mali**.

Hebu tuchunguze mfano:

Unatoka Marekani na unapanga safari ya kwenda Ulaya. Una USD, lakini unahitaji EUR kwa matumizi. Ili kubadilisha USD yako kuwa EUR unaweza kutumia duka la kubadilisha fedha kwa ada ndogo.

Lakini, unafanya nini ikiwa unataka kufanya ubadilishanaji kama huo ili kutumia [kiambajengo](/glossary/#blockchain) tofauti? Tuseme unataka kubadilisha [ETH](/glossary/#ether) kwenye mainnet ya [Ethereum](/) ili kupata ETH kwenye [Arbitrum](https://arbitrum.io/). Kama ubadilishanaji wa fedha tuliofanya kwa EUR, tunahitaji utaratibu wa kuhamisha ETH yetu kutoka Ethereum kwenda Arbitrum. Madaraja hufanya muamala kama huo uwezekane. Katika hali hii, [Arbitrum ina daraja lake la asili](https://portal.arbitrum.io/bridge) ambalo linaweza kuhamisha ETH kutoka mainnet kwenda kwenye Arbitrum.

## Kwa nini tunahitaji madaraja? {#why-do-we-need-bridges}

Miambajengo yote ina mapungufu yake. Ili Ethereum iweze kufanya uboreshaji wa uwezo na kuendana na mahitaji, imehitaji [rollups](/glossary/#rollups). Vinginevyo, L1 kama Solana na Avalanche zimeundwa tofauti ili kuwezesha uchakataji wa kiwango cha juu lakini kwa gharama ya mfumo mtawanyo.

Hata hivyo, miambajengo yote inatengenezwa katika mazingira yaliyotengwa na ina sheria na taratibu tofauti za [makubaliano](/glossary/#consensus). Hii inamaanisha haziwezi kuwasiliana kiasili, na tokeni haziwezi kusonga kwa uhuru kati ya miambajengo.

Madaraja yapo ili kuunganisha miambajengo, kuruhusu uhamishaji wa taarifa na tokeni kati yao.

**Madaraja huwezesha**:

- uhamishaji wa mali na taarifa kati ya minyororo.
- [mfumo mtawanyo wa kimamlaka](/glossary/#dapp) kufikia uwezo wa miambajengo mbalimbali – hivyo kuboresha uwezo wao (kwa kuwa itifaki sasa zina nafasi zaidi ya muundo kwa ajili ya ubunifu).
- watumiaji kufikia majukwaa mapya na kutumia faida za minyororo tofauti.
- watengenezaji kutoka mifumo tofauti ya ikolojia ya kiambajengo kushirikiana na kujenga majukwaa mapya kwa ajili ya watumiaji.

[Jinsi ya kuhamisha tokeni kwa daraja kwenda safu ya 2](/guides/how-to-use-a-bridge/)

<Divider />

## Matumizi ya daraja {#bridge-use-cases}

Yafuatayo ni baadhi ya matukio ambapo unaweza kutumia daraja:

### Ada ndogo za miamala {#transaction-fees}

Tuseme una ETH kwenye mainnet ya Ethereum lakini unataka ada nafuu za miamala ili kuchunguza mfumo mtawanyo wa kimamlaka tofauti. Kwa kuhamisha ETH yako kwa daraja kutoka kwenye mainnet kwenda kwenye rollup ya L2 ya Ethereum, unaweza kufurahia ada ndogo za miamala.

### Mfumo mtawanyo wa kimamlaka kwenye miambajengo mingine {#dapps-other-chains}

Ikiwa umekuwa ukitumia Aave kwenye mainnet ya Ethereum kusambaza USDT lakini kiwango cha riba unachoweza kupokea kwa kusambaza USDT ukitumia Aave kwenye Polygon ni kikubwa zaidi.

### Chunguza mifumo ya ikolojia ya kiambajengo {#explore-ecosystems}

Ikiwa una ETH kwenye mainnet ya Ethereum na unataka kuchunguza L1 mbadala ili kujaribu mfumo mtawanyo wa kimamlaka wao wa asili. Unaweza kutumia daraja kuhamisha ETH yako kutoka mainnet ya Ethereum kwenda kwenye L1 mbadala.

### Miliki mali asili za kidigitali {#own-native}

Tuseme unataka kumiliki Bitcoin (BTC) asili, lakini una fedha tu kwenye mainnet ya Ethereum. Ili kupata ufikiaji wa BTC kwenye Ethereum, unaweza kununua Wrapped Bitcoin (WBTC). Hata hivyo, WBTC ni tokeni ya [ERC-20](/glossary/#erc-20) asili kwenye mtandao wa Ethereum, ambayo inamaanisha ni toleo la Ethereum la Bitcoin na si mali asili kwenye kiambajengo cha Bitcoin. Ili kumiliki BTC asili, itabidi uhamishe mali zako kwa daraja kutoka Ethereum kwenda Bitcoin ukitumia daraja. Hii itahamisha WBTC yako na kuibadilisha kuwa BTC asili. Vinginevyo, unaweza kumiliki BTC na unataka kuitumia katika itifaki za [DeFi](/glossary/#defi) za Ethereum. Hii itahitaji kuhamisha kwa daraja kwa njia nyingine, kutoka BTC kwenda WBTC ambayo inaweza kutumika kama mali kwenye Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Unaweza pia kufanya yote hapo juu ukitumia [exchange isiyogatuliwa](/get-eth). Hata hivyo, isipokuwa kama fedha zako tayari ziko kwenye soko la ubadilishanaji, itahusisha hatua nyingi, na huenda ikawa bora zaidi kutumia daraja.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Aina za madaraja {#types-of-bridge}

Madaraja yana aina nyingi za miundo na utata. Kwa ujumla, madaraja yamegawanywa katika makundi mawili: madaraja yanayoaminika na madaraja yasiyohitaji uaminifu.

| Madaraja Yanayoaminika | Madaraja Yasiyohitaji Uaminifu |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Madaraja yanayoaminika hutegemea chombo kikuu au mfumo kwa ajili ya uendeshaji wao. | Madaraja yasiyohitaji uaminifu hufanya kazi kwa kutumia mikataba mahiri na algoriti. |
| Yana dhana za uaminifu kuhusiana na utunzaji wa fedha na usalama wa daraja. Watumiaji mara nyingi hutegemea sifa ya mwendeshaji wa daraja. | Hayahitaji uaminifu, yaani, usalama wa daraja ni sawa na ule wa kiambajengo cha msingi. |
| Watumiaji wanahitaji kuachia udhibiti wa mali zao za kidigitali. | Kupitia [mikataba mahiri](/glossary/#smart-contract), madaraja yasiyohitaji uaminifu huwezesha watumiaji kuendelea kudhibiti fedha zao. |

Kwa ufupi, tunaweza kusema kwamba madaraja yanayoaminika yana dhana za uaminifu, wakati madaraja yasiyohitaji uaminifu yamepunguzwa uaminifu na hayafanyi dhana mpya za uaminifu zaidi ya zile za vikoa vya msingi. Hivi ndivyo maneno haya yanavyoweza kuelezewa:

- **Kutohitaji uaminifu**: kuwa na usalama sawa na vikoa vya msingi. Kama ilivyoelezwa na [Arjun Bhuptani katika makala haya.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Dhana za uaminifu:** kuondoka kwenye usalama wa vikoa vya msingi kwa kuongeza wathibitishaji wa nje katika mfumo, hivyo kuufanya usiwe salama sana kiuchumi na kikriptografia.

Ili kukuza uelewa mzuri wa tofauti kuu kati ya njia hizi mbili, hebu tuchukue mfano:

Fikiria uko kwenye kituo cha ukaguzi wa usalama cha uwanja wa ndege. Kuna aina mbili za vituo vya ukaguzi:

1. Vituo vya Ukaguzi vya Mwongozo — vinaendeshwa na maafisa ambao hukagua kwa mikono maelezo yote ya tiketi yako na utambulisho kabla ya kukabidhi pasi ya kupanda ndege.
2. Kujisajili Mwenyewe — kunaendeshwa na mashine ambapo unaweka maelezo ya safari yako ya ndege na kupokea pasi ya kupanda ndege ikiwa kila kitu kiko sawa.

Kituo cha ukaguzi cha mwongozo ni sawa na mfumo unaoaminika kwani unategemea mtu wa tatu, yaani, maafisa, kwa uendeshaji wake. Kama mtumiaji, unawaamini maafisa kufanya maamuzi sahihi na kutumia taarifa zako za kibinafsi kwa usahihi.

Kujisajili mwenyewe ni sawa na mfumo usiohitaji uaminifu kwani unaondoa jukumu la mwendeshaji na kutumia teknolojia kwa uendeshaji wake. Watumiaji daima wanaendelea kudhibiti data zao na hawapaswi kumwamini mtu wa tatu na taarifa zao za kibinafsi.

Suluhisho nyingi za madaraja huchukua mifumo kati ya hizi mbili zilizokithiri na viwango tofauti vya kutohitaji uaminifu.

<Divider />

## Tumia madaraja {#use-bridge}

Kutumia madaraja hukuruhusu kuhamisha mali zako kwenye miambajengo tofauti. Hapa kuna baadhi ya rasilimali zinazoweza kukusaidia kupata na kutumia madaraja:

- **[Muhtasari wa Madaraja wa L2BEAT](https://l2beat.com/bridges/summary) & [Uchambuzi wa Hatari wa Madaraja wa L2BEAT](https://l2beat.com/bridges/summary)**: Muhtasari wa kina wa madaraja mbalimbali, ikijumuisha maelezo kuhusu hisa ya soko, aina ya daraja, na minyororo lengwa. L2BEAT pia ina uchambuzi wa hatari kwa madaraja, kusaidia watumiaji kufanya maamuzi sahihi wakati wa kuchagua daraja.
- **[Muhtasari wa Daraja wa DefiLlama](https://defillama.com/bridges/Ethereum)**: Muhtasari wa viwango vya daraja kwenye mitandao ya Ethereum.

<Divider />

## Hatari ya kutumia madaraja {#bridge-risk}

Madaraja yapo katika hatua za awali za maendeleo. Kuna uwezekano kwamba muundo bora wa daraja bado haujagunduliwa. Kuingiliana na aina yoyote ya daraja hubeba hatari:

- **Hatari ya Mkataba Mahiri —** hatari ya hitilafu katika msimbo inayoweza kusababisha fedha za mtumiaji kupotea
- **Hatari ya Teknolojia —** kufeli kwa programu, msimbo wenye hitilafu, kosa la kibinadamu, barua taka, na mashambulizi mabaya yanaweza kuvuruga shughuli za mtumiaji

Zaidi ya hayo, kwa kuwa madaraja yanayoaminika huongeza dhana za uaminifu, yanabeba hatari za ziada kama vile:

- **Hatari ya Udhibiti —** waendeshaji wa daraja wanaweza kinadharia kuwazuia watumiaji kuhamisha mali zao kwa kutumia daraja
- **Hatari ya Utunzaji —** waendeshaji wa daraja wanaweza kula njama ili kuiba fedha za watumiaji

Fedha za mtumiaji ziko hatarini ikiwa:

- kuna hitilafu katika mkataba mahiri
- mtumiaji anafanya kosa
- kiambajengo cha msingi kinadukuliwa
- waendeshaji wa daraja wana nia mbaya katika daraja linaloaminika
- daraja linadukuliwa

Udukuzi mmoja wa hivi karibuni ulikuwa daraja la Wormhole la Solana, [ambapo wETH 120k ($325 milioni USD) ziliibiwa wakati wa udukuzi](https://rekt.news/wormhole-rekt/). Mengi ya [madukuzi makubwa katika miambajengo yalihusisha madaraja](https://rekt.news/leaderboard/).

Madaraja ni muhimu katika kuingiza watumiaji kwenye L2 za Ethereum, na hata kwa watumiaji wanaotaka kuchunguza mifumo tofauti ya ikolojia. Hata hivyo, kutokana na hatari zinazohusika katika kuingiliana na madaraja, watumiaji lazima waelewe mapungufu ambayo madaraja yanafanya. Hizi ni baadhi ya [mikakati ya usalama wa minyororo tofauti](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Usomaji zaidi {#further-reading}

- [EIP-5164: Utekelezaji wa Minyororo Tofauti](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _Juni 18, 2022 - Brendan Asselstine_
- [Mfumo wa Hatari wa L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _Julai 5, 2022 - Bartek Kiepuszewski_
- ["Kwa nini siku zijazo zitakuwa za minyororo mingi, lakini hazitakuwa za minyororo tofauti."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _Januari 8, 2022 - Vitalik Buterin_
- [Kutumia Usalama wa Pamoja kwa Mwingiliano Salama wa Minyororo Tofauti: Kamati za Hali za Lagrange na Zaidi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _Juni 12, 2024 - Emmanuel Awosika_
- [Hali ya Suluhisho za Mwingiliano wa Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _Juni 20, 2024 - Alex Hook_