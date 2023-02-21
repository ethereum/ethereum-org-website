---
title: Az Ethereum története
description: Az Ethereum blokklánc története a nagyobb mérföld kövekkel, kiadásokkal és forkokkal.
lang: hu
sidebarDepth: 1
isOutdated: true
---

# Az Ethereum története {#the-history-of-ethereum}

Az Ethereum blokklánc összes fontos mérföldkövének, forkjának és frissítésének idővonala.

<ExpandableCard title="Mik azok a forkok?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

A forkok a hálózat nagyobb technikai frissítései vagy változtatásai esetében jönnek létre – általában az [Ethereum Fejlesztési Javaslatokból (EIP-k)](/eips/) származnak és megváltoztatják a protokoll "szabályait".

Amikor a hagyományos, központi irányítású szoftverek esetében szükséges egy frissítés, a cég csak kibocsájt egy új verziót a végfelhasználó részére. A blokkláncok máshogy működnek, mivel nincsen központi tulajdonjog. Az [Ethereum klienseknek](/developers/docs/nodes-and-clients/) kell frissíteni a szoftverjüket, hogy implementálják az új változtatásokat. Ezenkívül a blokk létrehozóknak (bányászok egy proof-of-work rendszerben, validátorok egy proof-of-stake rendszerben) és a csomópontoknak blokkokat kell létrehozniuk és az új szabályokkal szembe menően validálniuk. [Többet a konszenzus mechanizmusokról](/developers/docs/consensus-mechanisms/)

Ezek a szabályváltoztatások átmeneti törést okozhatnak a hálózatban. Új blokkok jöhetnek létre az új szabályok vagy a régiek szerint. A forkokról általában előzetes egyezség születik, így a kliensek együttesen vezetik be a változtatásokat és a változásokkal rendelkező fork válik a fő lánccá. Azonban néha előfordul nézeteltérés a forkokat illetően, mely a lánc megmaradó kettészakadását eredményezi - a legismertebb ilyen eset az Ethereum Classic létrejötte volt a [DAO forkkal](#dao-fork).

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Beacon Chain genesis {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-01-2020 12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Beacon Chain blokk szám: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $586.23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#beacon-chain-genesis-summary}

A [Beacon Chain](/upgrades/beacon-chain/) biztonságos elindításához 16384 darab 32 ETH-nyi letétre volt szükség. Ez november 27.-én történt meg, vagyis a Beacon Chain a blokkok létrehozását december 1.-jén kezdte meg 2020-ban. Ez az [Eth2 vízió](/upgrades/vision/) elérésének fontos első lépése.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  A Beacon Chain
</DocLink>

---

### A letétbe helyezési szerződés aktiválása {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Okt-14-2020 09:22:52 AM +UTC</code><br /><Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Blokk száma: <a href="https://etherscan.io/block/11052984">11052984</a><br /><Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $379.04 USD<br /><Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#deposit-contract-summary}

A letétbe helyezési szerződés bemutatta a [letétbe helyezés](/glossary/#staking) rendszerét az Ethereum ökoszisztémában. Bár [főhálózati](/glossary/#mainnet) szerződés, közvetlenül befolyásolta egy fontos [Eth2 frissítés](/upgrades/), a [Beacon Chain](/upgrades/beacon-chain/) indításának ütemezését.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Letétbe helyezés
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jan-02-2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/9200000">9200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $127.18 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#muir-glacier-summary}

A Muir Glacier nevű fork késleltetést vezetett be a [nehézségi bombához](/glossary/#difficulty-bomb). A blokknehézség növelése a [proof-of-work](/developers/docs/consensus-mechanisms/pow/) konszenzus-mechanizmusában azzal fenyegetett, hogy az Ethereum használhatósága csökkenni fog, mert a tranzakciók küldése és a dappok használata több időt fog igénybe venni.

- [Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Olvasd el az Ethereum Cat Herder magyarázatát](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIP-k" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _újabb 4,000,000 blokkal, vagy ~611 nappal késlelteti a nehézségi bomba bekövetkezését._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-08-2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/9069000">9069000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $151.06 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#istanbul-summary}

Az Istanbul fork:

- Bizonyos műveletek [gas](/glossary/#gas) díj optimalizálása az [EVM-ben](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Továbbfejlesztett szolgáltatás megtagadásos támadás elleni ellenállás.
- A SNARKokon és a STARKokon alapuló [2. réteges skálázási](/developers/docs/layer-2-scaling/) megoldások teljesítményének javítása.
- Az Ethereum és a Zcash közötti együttműködés bevezetése.
- Az okosszerződések kreatívabb függvényeinek lehetővé tétele.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIP-k" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _adatvédelmet biztosító valuták használata az Ethereumon, mint a Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _olcsóbb kriptográfia a [gas](/glossary/#gas) díjak csökkentésére._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _az Ethereum védelme a visszajátszási támadásokkal szemben a `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine) bevezetésével._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _opkód gáz árak optimálása a fogyasztás alapján._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _a CallData díjának csökkentése, hogy több adat férjen a blokkba – jó a [2. rétegű skálázásnak](/developers/docs/layer-2-scaling/)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _egyéb opkód gáz változtatások._

</ExpandableCard>

---

### Constantinople {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Feb-28-2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/7280000">7280000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $136.29 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#constantinople-summary}

A Constantinople fork:

- A blokklánc lefagyásának megakadályozása, mielőtt a [proof-of-stake bevezetésre kerülne](#beacon-chain-genesis).
- Bizonyos műveletek [gas](/glossary/#gas) díj optimálása az [EVM-ben](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Lehetőség olyan címekkel történő interakcióra, melyek még nem jöttek létre.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIP-k" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _bizonyos on-chain műveletek díjának optimalizálása._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _lehetőség olyan címekkel történő interakcióra, melyek még nem jöttek létre._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _bizonyos on-chain műveletek díjának optimalizálása._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _A blokklánc lefagyásának megakadályozása, mielőtt a proof-of-stake bevezetésre kerülne._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-16-2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/4370000">4370000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $334.23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#byzantium-summary}

A Byzantium fork:

- A [bányászati](/developers/docs/consensus-mechanisms/pow/mining/) blokk jutalom csökkentése 5-ről 3 ETH-re.
- A [nehézségi bomba](/glossary/#difficulty-bomb) késleltetése egy évvel.
- Más szerződések is indíthatnak állapotot nem befolyásoló hívásokat.
- Bizonyos kriptográfiai metódusok hozzáadása, mely lehetővé teszi a [2. réteges skálázást](/developers/docs/layer-2-scaling/).

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIP-k" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _`REVERT` opkód hozzáadása._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _státusz mező hozzáadása a tranzakció nyugtákhoz, mely jelzi hogy sikeres volt-e._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _elliptikus görbe és skaláris szorzás bevezetése, mely lehetővé teszi a [ZK-Snarkokat](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _elliptikus görbe és skaláris szorzás bevezetése, mely lehetővé teszi a [ZK-Snarkokat](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _RSA aláírás hitelesítés bevezetése._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _változó hosszú visszatérítési érték támogatása._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _a `STATICCALL` opkód hozzáadása, mely lehetővé teszi az állapotot nem befolyásoló hívások indítását a többi szerződésnek._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _a nehézséget szabályozó képlet megváltoztatása._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _a [nehézségi bomba](/glossary/#difficulty-bomb) késleltetése 1 évvel és a blokk jutalom 5-ről 3-ra csökkentése._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Nov-22-2016 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/2675000">2675000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $9.84 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#spurious-dragon-summary}

A Spurious Dragon fork volt a második válasz a szolgáltatás megtagadásos (DoS) támagásokkal szemben a hálózaton (2016 szeptember/október), mely az alábbiakat tartalmazta:

- opkód árazás finomhangolása a jövőbeli támadások megakadályozása érdekében.
- a blokklánc állapot "leeresztésének" lehetővé tétele.
- visszajátszásos támadás elleni védelem hozzáadása.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIP-k" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _megakadályozza, hogy az Ethereum láncról származó tranzakciókat újra lehessen küldeni egy másik láncon, például egy tesztnet tranzakciót újra küldeni a fő Ethereum hálózatra._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _az `EXP` opkód árának beállítása – megnehezíti a hálózat lelassítására irányuló törekvéseket számításilag költséges szerződés műveletekkel._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _lehetővé teszi az üres számlák törlését, melyeket a DOS támadás közben adtak hozzá._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _megváltoztatja a maximális kód méretet, mellyel egy blokkláncon lévő szerződés rendelkezhet – 24576 bájtra._

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-18-2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/2463000">2463000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $12.50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#tangerine-whistle-summary}

A Tangerine Whistle fork volt a első válasz a szolgáltatás megtagadásos (DoS) támagásokkal szemben a hálózaton (2016 szeptember/október), mely az alábbiakat tartalmazta:

- az alulárazott opkódokkal kapcsolatos sürgős hálózati kérdések kezelése.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIP-k" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _a gázár növelése olyan opkódoknál, melyet lehet használni a spam támadásoknál._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _csökkenti az állapot méretet nagy számú üres számlák törlésével, melyek hozzá lettek adva az állapothoz nagyon alacsony költséggel az Ethereum korábbi verziói hibái miatt._

</ExpandableCard>

---

### DAO fork {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-20-2016 01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/1920000">1920000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $12.54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#dao-fork-summary}

A DAO fork volt a válasz a [2016-os DAO támadásra](https://www.coindesk.com/understanding-dao-hack-journalists), amikor egy sérülékeny [DAO](/glossary/#dao) szerződésből 3.6 millió ETH-et ürítettek le a támadás során. A fork átmozgatta a pénzt a hibás szerződésből egy [új szerződésbe](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754), aminek csak egyetlen funkciója van: kiutalás. Bárki aki veszteséget szenvedett el kiutalhatott 1 ETH-et, minden tárcájukban lévő 100 DAO tokenre.

Ennek az akciónak a menetét megszavazták az Ethereum közösségen belül. Bármely ETH tulajdonos szavazhatott egy tranzakción keresztül [egy szavazási platformon](http://v1.carbonvote.com/). A fork mellett több mint a szavazók 85%-a voksolt.

Némely bányász nem volt hajlandó forkolni, mivel a DAO incidens nem a protokollból származó hibából eredt. Ők ezután létrehozták az [Ethereum Classicot](https://ethereumclassic.org/).

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Mar-14-2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/1150000">1150000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $12.50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#homestead-summary}

A Homestead fork, mely a jövőbe tekintett. Számos protokoll változtatást tartalmazott és egy hálózati változtatást, mely lehetővé tette az Ethereum számára a további hálózati változtatásokat.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIP-k" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _módosítja a szerződés létrehozás folyamatát._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _új opkód hozzáadása: `DELEGATECALL`_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _bevezeti a devp2p előrefelé történő kompatibilitási elvárásokat_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Sep-07-2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/200000">200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: $1.24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#frontier-thawing-summary}

A frontier thawing fork megszüntette az 5,000-es [gáz](/glossary/#gas) limitet egy [blokkra](/glossary/#block) és beállította az alapértelmezett gáz árat 51 [gweire](/glossary/#gwei). Ez lehetővé tette a tranzakciók létrejöttét – a tranzakciók 21,000 gázt igényeltek.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Blokk száma: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH ára: N/A<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

#### Összefoglaló {#frontier-summary}

A Frontier egy működő, de teljesen leegyszerűsített implementációja volt az Ethereum projektnek. Az sikeres Olympic tesztelési fázist követte. A műszaki felhasználóknak készült, kimondottan fejlesztőknek. A [blokkoknak](/glossary/#block) egy 5000-es [gáz](/glossary/#gas) limit volt beállítva. Ez a ‘kiolvasztási’ időszak lehetővé tette a bányászok számára, hogy elindítsák a tevékenységüket és a korai felhasználóknak, hogy telepítsék a klienseiket anélkül, hogy 'sietniük' kellene.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether eladás {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> July 22 - September 02, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

A hivatalos Ether eladás 42 napig tartott. BTC-vel tudtál fizetni.

[Olvasd el az Ethereum Alapítvány közleményét](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Sárga könyv kiadása {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> April 01, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

A Sárga Könyv, melynek a szerzője Dr. Gavin Wood, az Ethereum protokoll műszaki meghatározása.

[A Sárga Könyv megtekintése](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### A fehérkönyv kiadása {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> November 27, 2013<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org a waybackmachine-en</a>

A bemutatkozó kiadvány, melyet Vitalik Buterin az Ethereum alapítója adott ki 2013-ban, a projekt 2015-ös indulása előtt.

<DocLink to="/whitepaper/">
  Fehérkönyv
</DocLink>
