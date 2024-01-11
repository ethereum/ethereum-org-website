---
title: Bevezetés a blokklánchidak működésébe
description: A hidak segítségével a felhasználók különböző blokkláncok között tudnak eszközöket mozgatni
lang: hu
---

# Blokkláncösszekötők {#prerequisites}

_A Web3 egy olyan ökoszisztémává fejlődött, ahol L1 blokkláncok és L2 skálázási megoldások találhatók, mind egyedi képességekkel és kompromisszumokkal. Ahogy növekszik a blokkláncprotokollok száma, úgy nő [a kereslet is, hogy az eszközöket láncok között lehessen mozgatni](<https://dune.xyz/eliasimos/Bridge-Away-(from-Ethereum)>). Az igény kielégítéséhez összekötőkre vagy hidakra van szükségünk._

<Divider />

## Mik azok az összekötők vagy hidak? {#what-are-bridges}

A blokklánchidak épp olyanok, mint a fizikai világban. A fizikai híd két helyet köt össze, a blokklánchíd két blokklánc-ökoszisztémát. A hidak kommunikációs lehetőséget teremtenek a blokkláncok között az információk és eszközök transzferálásával.

Vegyünk egy példát:

Ön az Amerikai Egyesült Államokból való és Európába utazik. Amerikai dollárral (USD) rendelkezik, de az utazáson euróra (EUR) van szüksége. Az átváltáshoz használhat egy valutaváltót egy kis díj ellenében.

De mit csináljunk, ha egy ilyen átváltást két különböző blokkláncon akarunk véghezvinni? Tegyük fel, hogy Ön az Ethereum-főhálózatán lévő ETH-t akarja váltani az [Arbitrumon](https://arbitrum.io/) lévő ETH-ra. Ahogy a fenti példában EUR-t váltottunk, szükség van egy olyan mechanizmusra, mely az ETH összegünket átviszi az Ethereumról az Arbitrumra. A hidak teszik lehetővé az ilyen tranzakciókat. Ebben az esetben az [Arbitrum rendelkezik egy saját híddal](https://bridge.arbitrum.io/), ami átviszi az ETH-t a főhálózatról az Arbitrumra.

## Miért van szükség hidakra? {#why-do-we-need-bridges}

Minden blokkláncnak megvannak a maga korlátai. Az Ethereum skálázásához és hogy ki bírja szolgálni a keresletet, rollupokra van szüksége. Más L1 blokkláncok, mint a Solana és az Avalanche, másképpen vannak összerakva, így magasabb tranzakcióátvitelt bírnak, de a decentralizációt áldozzák fel cserébe.

Ugyanakkor minden blokkláncot elkülönült környezetben fejlesztenek, más szabályok és már konszenzusmechanizmus alapján. Emiatt maguktól nem tudnak egymással kommunikálni, a tokeneket pedig nem lehet szabadon átvinni az egyikről a másikra.

A hidak kötik össze a blokkláncokat, lehetővé téve az információ és a tokenek áramlását közöttük.

A hidak lehetőséget adnak arra, hogy:

- az eszközök és az információk a láncok között mozogjanak
- a decentralizált alkalmazások hozzáférjenek a különféle blokkláncok erősségeihez – így azok képességeit fejleszteni tudják (mivel a protokollok esetében manapság több tér van az innovációra).
- a felhasználók új platformokat érjenek el és hasznosítsák a különböző láncok előnyeit.
- a fejlesztők a különböző blokklánc-ökoszisztémákon együttműködjenek és új platformokat építsenek a felhasználók számára.

[Hogyan lehet áthelyezni a tokeneket a második blokkláncrétegbe (L2)](/guides/how-to-use-a-bridge/)

<Divider />

## A hidak alkalmazási területei {#bridge-use-cases}

A következő szcenáriók esetében lehet hidat használni:

### Alacsonyabb tranzakciós költségek {#transaction-fees}

Tegyük fel, hogy Ön rendelkezik ETH-szel az Ethereum főhálózatán, de olcsóbb tranzakciós díjat szeretne, hogy különféle alkalmazásokat tudjon használni. Ha a főhálózatról az ETH-t áthelyezi egy L2 rollupmegoldásra, akkor alacsonyabb díjakat élvezhet.

### Decentralizált alkalmazások (dapp) más blokkláncokon {#dapps-other-chains}

Tegyük fel, hogy Ön az Aave alkalmazást használja az Ethereum főhálózatán arra, hogy USDT-t kölcsönözzön, de a Polygonon ugyanez az alkalmazás magasabb kamatot ad.

### A blokklánc-ökoszisztémák felfedezése {#explore-ecosystems}

Ha Ön ETH összeggel rendelkezik az Ethereum-főhálózaton, de fel szeretne fedezni egy alternatív L1 hálózatot, hogy kipróbálja annak alkalmazásait. A hídon keresztül átviheti az ETH-t a kiválasztott L1-re.

### Saját kriptoeszközök {#own-native}

Amennyiben Ön szeretne bitcoint (BTC) birtokolni, de a pénzeszközei az Ethereum főhálózatán vannak. Az Ethereumon becsomagolt formában szerezhet bitcoint (WBTC). Ugyanakkor a WBTC egy ERC-20 token az Ethereum hálózatán, tehát egy Ethereum verziójú bitcoin, és nem az eredeti eszköz a Bitcoin-blokkláncon. Az eredeti BTC megszerzéséhez egy hídon keresztül át kell vinnie a pénzeszközeit a Bitcoin hálózatára. Ezzel áthelyezi a WBTC-t és átváltja BTC-re. Másik irányból, ha Ön rendelkezik BTC-vel, de azt az Ethereum decentralizált pénzügyi (DeFi) protokolljában akarja használni. Ekkor a hídon a másik irányba mozgatja az eszközeit, BTC-ről WBTC-re váltja, majd azt áthelyezi az Ethereumra.

<InfoBanner shouldCenter emoji=":bulb:">
  Mindezt megteheti egy <a href="/get-eth/">centralizált tőzsde</a> segítségével is. Ha azonban az eszközei már a tőzsdén vannak, akkor több lépést kell végrehajtani, és akkor már egyszerűbb a hidat használni.
</InfoBanner>

<Divider />

## A hidak típusai {#types-of-bridge}

A hidak többféle kialakításúak és összetettségűek. Általánosságban kétféle lehet: bizalmat igénylő és bizalomigénytől mentes.

| Bizalmat igénylő (trusted) hidak                                                                                                                  | Bizalomigénytől mentes (trustless) hidak                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| A bizalmat igénylő hidak működése egy központi entitáson vagy rendszeren múlik.                                                                   | A bizalomigénytől mentes hidak működését okosszerződések és algoritmusok vezérlik.              |
| A pénzeszközök felügyelete és a híd biztonsága terén bizalmi feltételezések vannak. A felhasználó a híd működtetőjének reputációjára támaszkodik. | A bizalommentessége azt jelenti, hogy a híd biztonsága megegyezik a mögötte álló blokkláncéval. |
| A felhasználónak át kell engednie a kriptoeszközök feletti kontrollját.                                                                           | Az okosszerződések révén a felhasználók kontrollja alatt maradnak az eszközök.                  |

Röviden, a bizalmat igénylő hidaknál bizalmi feltételezésekkel kell élnünk, míg a bizalomigénytől mentes hidaknál ez minimális és nem merül fel más, mint a mögöttes blokklánc kapcsán. Ezeket a kifejezéseket a következőképpen kell érteni:

- **Bizalomigénytől mentes (trustless)**: a mögötte található rendszerrel megegyező biztonsági szintje van. Olvassa el [Arjun Bhuptani erről szóló cikkét.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Bizalmat igénylő (trusted)**: a mögöttes rendszer biztonságától eltávolodik azzal, hogy külső igazolókat von be a rendszerbe, így kriptogazdasági szempontból kevésbé biztonságos.

A két megkülönböztetés fő különbségeinek jobb megértése érdekben vegyünk egy példát:

Tegyük fel, hogy Ön a reptéren a check-in előtt áll. Kétféle ellenőrzés van:

1. Manuális chek-in – ahol a hivatalnokok manuálisan ellenőrzik a jegyét és a személyazonosságát, mielőtt a belépőkártyát átadnák.
2. Self check-In – ahol egy gép ellenőrzi ezeket és adja ki a belépőkártyát, ha mindent rendben talál.

A manuális ellenőrzés hasonló a bizalmat igénylő modellhez, mert egy harmadik félen múlik a működése, mint a hivatalnokok. Felhasználóként abban bízunk, hogy a hivatalnokok a megfelelő döntést hozzák és helyesen kezelik a privát információkat.

A self check-in hasonlít a bizalomigénytől mentes modellhez, mivel kiveszi az operátor szerepét, és a technológia működteti. A felhasználónak mindvégig megmarad a kontroll az adatai felett, és nem kell azokat egy harmadik félre bíznia.

Számos hidat biztosító megoldás e két modell közötti módszert alakít ki változó bizalmi fokozattal.

<Divider />

## A hidak használatának kockázata {#bridge-risk}

A hidak fejlesztése még a korai stádiumban van. Nagy valószínűséggel az optimális kialakítás még nem született meg. A hidakkal való interakció a következő kockázatokkal jár:

- **Okosszerződéses kockázat —** a programkódban lévő hiba miatt a felhasználó pénzeszközei elveszhetnek
- **Technológiai kockázat —** szoftverhiba, hibás kód, emberi hiba, spam és rosszindulatú támadás valószínűleg megakaszthatja a működést

Emellett, mivel a bizalmat igénylő (trusted) hidak még több bizalmi feltételt jelentenek, ezért több kockázatot is hordoznak magukban:

- **Cenzúra kockázata —** a hidak működtetői elméletileg meg tudják akadályozni a felhasználót az eszközeinek áthelyezésében
- **Felügyeleti kockázat —** a hidak működtetői összefoghatnak abban, hogy ellopják a felhasználók eszközeit

A felhasználó eszközei veszélyben vannak, ha:

- hiba van az okosszerződésben
- a felhasználó hibázik
- a mögöttes blokkláncot megtámadják
- a híd kezelői a bizalmat igénylő (trusted) hidak esetében rosszhiszeműek
- a hidat megtámadják

Az egyik korábbi, Solana Wormhole híd elleni támadásnál [ 120k wETH-t (325 millió USD) lopott el a támadó](https://rekt.news/wormhole-rekt/). A [blokkláncok elleni legnagyobb támadások hidakat is érintenek](https://rekt.news/leaderboard/).

A hidak elengedhetetlenek az Ethereum L2 használatához, illetve ha a felhasználók más ökoszisztémákat is fel szeretnének fedezni. Ugyanakkor az ebben rejlő kockázatok miatt meg kell érteni a hidak által hozott kompromisszumokat. Íme néhány [stratégia a láncok közötti biztonság](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946) témájában.

<Divider />

## További olvasnivaló {#further-reading}

- [EIP-5164: Láncok közötti műveletek végrehajtása](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _2022. június 18. – Brendan Asselstine_
- [L2 hidak kockázati keretrendszere](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _2022. július 5. – Bartek Kiepuszewski_
- [A jövő miért inkább többláncú, mint láncok közötti](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _2022. január 8. – Vitalik Buterin_
- [Mik azok a blokklánchidak és hogyan kategorizáljuk azokat?](https://blog.li.finance/what-are-blockchain-bridges-and-how-can-we-classify-them-560dc6ec05fa) _2021. február 18. – Arjun Chand_
- [Mik azok a blokklánchidak?](https://www.alchemy.com/overviews/cross-chain-bridges) _2022. május 10. – Alchemy_
- [Blokklánchidak: a kriptohálózatok hálózatának megépítése](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) _2021. szeptember 8. – Dmitriy Berenzon_
- [Hidak a kriptovilágban](https://medium.com/chainsafe-systems/bridges-in-crypto-space-12e158f5fd1e) _2021. augusztus 23. – Ben Adar Hyman_
- [Az interoperabilitás trilemmája](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) _2021. október 1. – Arjun Bhuptani_
- [Biztosítani a hidat: a láncok közötti kommunikáció megfelelő módja](https://medium.com/dragonfly-research/secure-the-bridge-cross-chain-communication-done-right-part-i-993f76ffed5d) _2021. augusztus 23. – Celia Wan_
