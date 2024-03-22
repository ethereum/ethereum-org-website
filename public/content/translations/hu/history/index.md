---
title: Az Ethereum története és elágazásai
description: Az Ethereum blokklánc története a nagyobb mérföldkövekkel, frissítésekkel és elágazásokkal.
lang: hu
sidebarDepth: 1
---

# Az Ethereum története {#the-history-of-ethereum}

Az Ethereum blokklánc összes fontos mérföldkövének, elágazásának és frissítésének idővonala.

<ExpandableCard title="Mik azok az elágazások?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Az elágazások a hálózat nagyobb technikai frissítései vagy változtatásai esetében jönnek létre – általában az <a href="/eips/">Ethereum fejlesztési javaslatokból (EIP)</a> származnak és megváltoztatják a protokoll „szabályait”.

Amikor a hagyományos, központi irányítású szoftverek esetében szükséges egy frissítés, a cég csak kibocsájt egy új verziót a végfelhasználó részére. A blokkláncok máshogy működnek, mivel nincsen központi tulajdonjog. Az <a href="/developers/docs/nodes-and-clients/">Ethereum-klienseknek</a> frissíteni kell a szoftverjét, hogy az új elágazási szabályokat életbe léptessék. Ezenkívül a blokklétrehozóknak (bányászok egy proof-of-work rendszerben, validátorok egy proof-of-stake rendszerben) és a csomópontoknak blokkokat kell létrehozniuk és az új szabályokkal szembemenően kell validálniuk. <a href="/developers/docs/consensus-mechanisms/">Bővebben a konszenzusmechanizmusokról</a>

Ezek a szabályváltozások létrehozhatnak egy átmeneti szétválást a hálózatban. Új blokkok jöhetnek létre az új szabályok vagy a régiek szerint. Az elágazásokról általában előzetes egyezség születik, így a kliensek együttesen vezetik be a változtatásokat és a változásokkal rendelkező elágazás válik a fő lánccá. Azonban néha előfordul nézeteltérés az elágazásokat illetően, mely a lánc megmaradó kettészakadását eredményezi – a legismertebb ilyen eset az Ethereum Classic létrejötte volt a <a href="#dao-fork">DAO elágazással</a>.

</ExpandableCard>

Odaugorhat akár néhány rendkívül fontos frissítéshez: [A Beacon lánc](/roadmap/beacon-chain/); [A Merge](/roadmap/merge/); és [EIP-1559](#london)

Az elkövetkező protokollfrissítések érdeklik? [Tudjon meg többet a következő frissítésekről az Ethereum ütemtervéből](/roadmap/).

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Shanghai összefoglaló {#shanghai-summary}

A Shanghai frissítés bevezette a letétek kivonási lehetőségét a végrehajtási rétegen. A Capella frissítéssel együtt ez lehetővé tette, hogy a blokkok kivonási műveletet fogadjanak el, amivel a letétesek ki tudják venni az ETH a Beacon láncról a végrehajtási rétegre.

<ExpandableCard title="Shanghai EIP-ek" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>A <code>COINBASE</code> címmelegítés elkezdése</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Új <code>PUSH0</code> parancs</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Az initkód behatárolása és mérése</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>A Beacon lánc kivételeket küld műveletként</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> – <em>A<code>SELFDESTRUCT</code> érvénytelenítése</em></li>
</ul>

</ExpandableCard>

- [Olvassa el a Shanghai frissítés specifikációit](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella összefoglaló {#capella-summary}

A Capella frissítés a harmadik legnagyobb frissítés volt a konszenzusrétegen (Beacon lánc) és lehetővé tette a letétek kivételét. A Capella egyszerre történt a Shanghai frissítéssel, ami a végrehajtási réteget változtatta meg, s így lehetővé vált a letét kivétele.

Ez a konszenzusréteg frissítés megengedte a letétbe helyezőknek, hogy ha a letét kezdetén nem adtak meg kivételi adatokat, akkor most megtehessék.

Emellett bevezették az automatikus számlasöprési funkciót, ami folyamatosan átnézi a validátorok számláit, hogy van-e kifizetendő jutalom vagy teljes kivétel.

- [Bővebben a letétek visszavonásáról](/staking/withdrawals/).
- [Olvassa el a Capella frissítés specifikációit](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (a Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Összegzés {#paris-summary}

A Paris frissítést az váltotta ki, hogy a proof-of-work blokklánc meghaladta a [végső teljes nehézséget](/glossary/#terminal-total-difficulty), melynek mértéke 58750000000000000000000 volt. Az a 15537393. blokknál történt 2022. szeptember 15-én, így kiváltva a következő blokktól a Paris frissítést. A Paris volt [a beolvadás (Merge)](/roadmap/merge/) áttérés, melynek fő jellemzője a [proof-of-work](/developers/docs/consensus-mechanisms/pow) bányászó algoritmus és a kapcsolódó konszenzuslogika kikapcsolása, ehelyett pedig a [proof-of-stake](/developers/docs/consensus-mechanisms/pos) bekapcsolása. Paris egyúttal frissítette a [végrehajtási klienseket](/developers/docs/nodes-and-clients/#execution-clients) (a Bellatrix-hoz hasonlóan, ami a konszenzusrétegen tette), hogy instrukciókat tudjanak fogadni a velük kapcsolódó [konszenzuskliensektől](/developers/docs/nodes-and-clients/#consensus-clients). Ehhez szükség volt arra, hogy a belső API metódusok egy új készletét, az [Engine API-kat](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) aktiválják. Ez kétségtelenül az Ethereum történetének legjelentősebb frissítése volt a [Homestead](#homestead) óta!

- [Olvassa el a Paris frissítés specifikációit](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIP-ek" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>A konszenzus frissítése proof-of-stake-re</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>A DIFFICULTY opkód kiváltása PREVRANDAO-val</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Összegzés {#bellatrix-summary}

A Bellatrix frissítés a második betervezett frissítés volt a [Beacon láncra](/roadmap/beacon-chain), hogy előkészítse a láncot a [Merge-re](/roadmap/merge/). Ezzel a validátorok büntetései teljes értékűek lettek az aktivitás hiányára és a súlyos büntetésekre vonatkozóan. A Bellatrix szintén hozott egy frissítést az elágazásválasztás szabályaiba, hogy felkészítse a láncot a Merge-re és arra, hogy az utolsó proof-of-work blokk után az első proof-of-stake blokk következzen. A konszenzuskliensek ezzel tudatosak lettek az 58750000000000000000000 [végső teljes nehézségről](/glossary/#terminal-total-difficulty).

- [Olvassa el a Bellatrix frissítés specifikációit](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Összegzés {#gray-glacier-summary}

A Gray Glacier hálózati frissítés eltolta a [nehézségbombát](/glossary/#difficulty-bomb) három hónappal. Ez a frissítés csak ezt változtatta meg, s így természetében hasonlít a [Arrow Glacier](#arrow-glacier) és a [Muir Glacier](#muir-glacier) frissítésekhez. Hasonló változtatások történtek a [Byzantium](#byzantium), [Constantinople](#constantinople) és [London](#london) hálózati frissítéseknél is.

- [EF Blog – Gray Glacier frissítés bejelentése](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIP-ek" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>A nehézségbomba elhalasztása 2022. szeptemberig</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Összegzés {#arrow-glacier-summary}

Az Arrow Glacier hálózati frissítés eltolta a [nehézségbombát](/glossary/#difficulty-bomb) néhány hónappal. Ez a frissítés csak ezt változtatta meg, s így természetében hasonlít a [Muir Glacier](#muir-glacier) frissítéshez. Hasonló változtatások történtek a [Byzantium](#byzantium), [Constantinople](#constantinople) és [London](#london) hálózati frissítéseknél is.

- [EF Blog – Arrow Glacier frissítés bejelentése](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders – Ethereum Arrow Glacier frissítés](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIP-ek" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>A nehézségbomba elhalasztása 2022. júniusig</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Összegzés {#altair-summary}

Az Altair frissítés a [Beacon lánc](/roadmap/beacon-chain) első tervezett változtatása volt. A „szinkronizálási bizottságokhoz” adott támogatást, mint a könnyű kliensek bevezetése, valamint megnövelte a validátor nem aktivitás és súlyos büntetések mértékét, hogy előkészítse a Merge-t.

- [Olvassa el az Altair frissítés specifikációit](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <emoji text=":tada:" size={1} mr="0.5rem" />Érdekesség {#altair-fun-fact}

Az Altair volt az első nagyobb hálózati frissítés, aminek konkrét bevezetési ideje volt. Az összes korábbi frissítés egy adott blokkszám alapján történt a proof-of-work láncon, ahol a blokkonkénti idő változó. A Beacon láncnak nem kellett igazodnia a proof-of-work-höz, így időalapú korszakok rendszerén alapszik, amelyek 32 darab 12 másodperces slotokból állnak, s a validátorok ezekben tudnak blokkot javasolni. Így pontosan lehetett tudni, hogy mikor következik a 74.240. korszak, s az Altair élesbe lép!

- [Blokk idő](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Összegzés {#london-summary}

A London frissítés bevezette az [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) változást, ami megreformálta a tranzakciós díj piacot, azzal együtt, hogyan kezelik a gázvisszatérítéseket, valamint betervezte az [Ice Age-et](/glossary/#ice-age).

- [Ön egy dapp-fejlesztő? Feltétlenül frissítse a könyvtárakat és az eszközöket.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Olvassa el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Olvassa el az Ethereum Cat Herder magyarázatát](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIP-ek" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>Fejleszti a tranzakciós díjak piacát</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>Visszaküldi a <code>BASEFEE</code> mezőt a blokkból</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> – <em>Csökkenti a gázvisszatérítést az EVM műveletekre</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> – <em>Megakadályozza olyan szerződések telepítését, melyek <code>0xEF</code> kóddal kezdődnek</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>Elhalasztja az Ice Age-et 2021. decemberig</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Összegzés {#berlin-summary}

A Berlin frissítés optimalizálta a gázköltséget bizonyos EVM műveleteknél, s több támogatást adott a többszörös tranzakció típusokra.

- [Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Olvasd el az Ethereum Cat Herder magyarázatát](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIP-ek" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>Csökkenti a ModExp gázköltséget</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>Könnyebb támogatást tesz lehetővé a többszörös tranzakciótípusokra</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>A gázköltséget megnöveli a státuszelérő opkódokra</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>Opcionális hozzáféréslistákat hoz létre</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Beacon lánc genezis {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Összegzés {#beacon-chain-genesis-summary}

A [Beacon lánc](/roadmap/beacon-chain/) biztonságos elindításához 16384 darab 32 ETH-nyi letétre volt szükség. Ez november 27-én történt meg, vagyis a Beacon lánc a blokkok létrehozását 2020. december 1-jén kezdte meg. Ez az [Ethereum vízió](/roadmap/vision/) elérésének fontos első lépése volt.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/roadmap/beacon-chain/">
  A Beacon Chain
</DocLink>

---

### A letétbe helyezési szerződés aktiválása {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Összegzés {#deposit-contract-summary}

A letétbe helyezési szerződés bevezette a [letétbe helyezés](/glossary/#staking) rendszerét az Ethereum ökoszisztémába. Habár ez egy szerződés a [főhálózaton](/glossary/#mainnet), közvetlen hatást gyakorolt a [Beacon lánc](/roadmap/beacon-chain/) bevezetési idejére, ami egy fontos [Ethereum frissítés](/roadmap/).

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Letétbe helyezés
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Összegzés {#muir-glacier-summary}

A Muir Glacier nevű elágazás késleltetést vezetett be a [nehézségi bombához](/glossary/#difficulty-bomb). A blokknehézség növelése a [proof-of-work](/developers/docs/consensus-mechanisms/pow/) konszenzusmechanizmusában azzal fenyegetett, hogy az Ethereum használhatósága csökkenni fog, mert a tranzakciók küldése és a dappok használata több időt fog igénybe venni.

- [Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Olvasd el az Ethereum Cat Herder magyarázatát](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIP-ek" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>Eltolta a nehézségbomba bevezetését újabb 4.000.000 blokkal vagy kb. 611 nappal.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Összegzés {#istanbul-summary}

Az Istanbul elágazás:

- Bizonyos műveletek [gázdíj](/glossary/#gas) optimalizálása az [EVM-ben](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Fejlettebb védekezés a szolgáltatásmegtagadásos támadás ellen.
- A SNARKokon és a STARKokon alapuló [második blokkláncréteg (L2) skálázási](/developers/docs/scaling/#layer-2-scaling) megoldások teljesítményének javítása.
- Az Ethereum és a Zcash közötti együttműködés bevezetése.
- Az okosszerződésekben kreatívabb függvényeket tett lehetővé.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIP-ek" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>Az Ethereum együtt tud működni az adatvédelmet megőrző valutával, mint amilyen a Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>Olcsóbb kriptográfia, hogy javuljon a <a href="/glossary/#gas">gázdíj</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>Az Ethereumot védi az újrajátszási támadással szemben a <code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">opkód</a> bevezetésével.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>Optimizálja az opkód gázárakat a fogyasztás alapján.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>A CallData költségének csökkentése, hogy több adat férjen be a blokkokba, ami támogatja az <a href="/developers/docs/scaling/#layer-2-scaling">L2 skálázást</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>Más opkód gázár változtatások.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Összegzés {#constantinople-summary}

A Constantinople elágazás:

- A [blokkbányászat](/developers/docs/consensus-mechanisms/pow/mining/) jutalmának csökkentése 3 ETH-ről 2-re.
- A blokklánc lefagyásának megakadályozása, mielőtt a [proof-of-stake bevezetésre kerülne](#beacon-chain-genesis).
- Bizonyos műveletek [gázdíj](/glossary/#gas) optimalizálása az [EVM-ben](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Lehetőség olyan címekkel történő interakcióra, melyek még nem jöttek létre.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIP-ek" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>Optimizálja bizonyos láncon futó működések költségét.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>Lehetővé teszi az interakciót olyan szerződésekkel, melyeket még nem hoztak létre.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>Optimizálja bizonyos láncon futó működések költségét.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>Megakadályozza, hogy a blokklánc lefagyjon a proof-of-stake bevezetése előtt, és csökkenti a blokkjutalmat 3 ETH-ről 2-re.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Összegzés {#byzantium-summary}

A Byzantium elágazás:

- A [blokkbányászat](/developers/docs/consensus-mechanisms/pow/mining/) jutalmának csökkentése 5 ETH-ről 3-ra.
- A [nehézségbomba](/glossary/#difficulty-bomb) késleltetése egy évvel.
- Bevezették azt a lehetőséget, hogy állapotot nem befolyásoló hívásokat lehet indítani más szerződések felé.
- Bizonyos kriptográfiai módszerek hozzáadása, hogy támogassa az [L2 skálázást](/developers/docs/scaling/#layer-2-scaling).

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIP-ek" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>A <code>REVERT</code> opkód bevezetése.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>A tranzakció visszaigazolásba bekerült a státuszmező, hogy mutassa a sikeres vagy sikertelen végrehajtást.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>Az elliptikus görbe és a skaláris szorzást bevezetése, hogy támogassa a <a href="/developers/docs/scaling/zk-rollups/">ZK-SNARK-okat</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>Az elliptikus görbe és a skaláris szorzást bevezetése, hogy támogassa a <a href="/developers/docs/scaling/zk-rollups/">ZK-SNARK-okat</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>Az RSA aláírásellenőrzés lehetővé tétele.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>A változó hosszúságú visszatérési értékek támogatása.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>A <code>STATICCALL</code> opkód bevezetése, hogy állapotot nem befolyásoló hívásokat lehessen indítani más szerződések felé.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>A nehézség beállítási formulájának változtatása.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>A <a href="/glossary/#difficulty-bomb">nehézségbomba</a> elhalasztása 1 évvel, s a blokkjutalom csökkentése 5 ETH-ről 3-ra.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Összegzés {#spurious-dragon-summary}

A Spurious Dragon elágazás volt a második válasz a szolgáltatás megtagadásos (DoS) támadásokkal szemben a hálózaton (2016 szeptember/október), mely az alábbiakat tartalmazta:

- opkód árazás finomhangolása a jövőbeli támadások megakadályozása érdekében.
- a blokklánc állapot „leeresztésének” lehetővé tétele.
- visszajátszásos támadás elleni védelem hozzáadása.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIP-ek" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>Megakadályozza, hogy egy Ethereum-láncról a tranzakciókat újra elküldjék egy alternatív láncon, például egy teszthálózati tranzakciót lejátszanak a főhálózaton.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>Az <code>EXP</code> opkód árigazítása, hogy ezáltal nehezebb legyen lelassítani a hálózatot az intenzív számítást igénylő szerződésműködésekkel.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>Az üres számlák eltávolítása, melyeket a szolgáltatásmegtagadási (DoS) támadások alatt hoztak létre.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>A láncon lévő szerződés maximális kódméretének megnövelése 24576 bájtra.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Összegzés {#tangerine-whistle-summary}

A Tangerine Whistle elágazás volt a első válasz a szolgáltatásmegtagadásos (DoS) támadásokkal szemben a hálózaton (2016 szeptember/október), mely az alábbiakat tartalmazta:

- az alulárazott opkódokkal kapcsolatos sürgős hálózati kérdések kezelése.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIP-ek" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>Megnöveli azon opkódok gázköltségeit, melyeket teleszemetelési (spam) támadásokra lehet használni.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>Csökkenti a státuszméretet azáltal, hogy eltávolítja az üres számlákat, melyeket alacsony költségen küldtek be a státuszba a korábbi Ethereum protokoll hibái miatt.</em></li>
</ul>

</ExpandableCard>

---

### DAO elágazás {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Összegzés {#dao-fork-summary}

A DAO elágazás volt a válasz a [2016-os DAO támadásra](https://www.coindesk.com/learn/understanding-the-dao-attack/), amikor egy sérülékeny [DAO](/glossary/#dao) szerződésből 3,6 millió ETH-t ürítettek le a támadás során. Az elágazás átmozgatta a pénzt a hibás szerződésből egy [új szerződésbe](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754), amelynek csak kiutalási funkciója volt. Bárki, aki veszteséget szenvedett el, kivehetett 1 ETH-t a tárcájában lévő minden 100 DAO tokenre.

Ennek az akciónak a menetét megszavazták az Ethereum közösségen belül. Bármely ETH tulajdonos szavazhatott egy tranzakción keresztül [egy szavazási platformon](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). A fork mellett több mint a szavazók 85%-a voksolt.

Némely bányász nem támogatta az elágazást, mivel a DAO incidens nem a protokollból származó hibából eredt. Ők ezután létrehozták az [Ethereum Classicot](https://ethereumclassic.org/).

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Összegzés {#homestead-summary}

A Homestead elágazás a jövőbe tekintett. Számos protokollváltoztatást tartalmazott és egy hálózati változtatást, mely lehetővé tette az Ethereum számára a további hálózati változtatásokat.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIP-ek" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>A szerződéslétrehozási folyamat szerkesztése.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>A <code>DELEGATECALL</code> új opkód bevezetése</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>Bevezették a devp2p jövőkompatibilitási (forward compatibility) követelményeket</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Összegzés {#frontier-thawing-summary}

A Frontier thawing elágazás megemelte az 5.000-es [gázhatárt](/glossary/#gas) [blokkonként](/glossary/#block) és beállította az alapértelmezett gázárat 51 [gweire](/glossary/#gwei). Ez lehetővé tette a tranzakciók létrejöttét, mivel azokhoz 21.000 gázra van szükség. Bevezették a [nehézségbombát](/glossary/#difficulty-bomb), hogy lehetőség legyen egy jövőbeli végleges elágazásra (hard fork) a [proof-of-stake](/glossary/#pos) mechanizmusra való áttérésnél.

- [Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Tekintse meg az Ethereum protokollfrissítés 1. cikket](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Összegzés {#frontier-summary}

A Frontier egy működő, de teljesen leegyszerűsített implementációja volt az Ethereum projektnek. A sikeres Olympic tesztelési fázist követte. A műszaki felhasználóknak készült, kimondottan fejlesztőknek. A [blokkoknak](/glossary/#block) egy 5000-es [gázhatár](/glossary/#gas) volt beállítva. Ez a „kiolvasztási” időszak lehetővé tette a bányászok számára, hogy elindítsák a tevékenységüket, és a korai felhasználóknak, hogy telepítsék a klienseiket anélkül, hogy sietniük kellene.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether eladás {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

A hivatalos Ether eladás 42 napig tartott. BTC-vel lehetett érte fizetni.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Sárgakönyv kiadása {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

A Sárgakönyv, melynek a szerzője Dr. Gavin Wood, az Ethereum protokoll műszaki meghatározása.

[A Sárgakönyv megtekintése](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### A Fehérkönyv kiadása {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

A bemutatkozó kiadvány, melyet Vitalik Buterin, az Ethereum alapítója adott ki 2013-ban, a projekt 2015-ös indulása előtt.

<DocLink to="/whitepaper/">
  Fehérkönyv
</DocLink>
