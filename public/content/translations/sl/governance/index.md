---
title: Upravljanje Ethereuma
description: Uvod v odločevalski proces Ethereuma.
lang: sl
---

# Uvod v upravljanje Ethereuma {#introduction}

_Če si nihče ne lasti Ethereuma, kako so potem sprejete odločitve o prihodnjih in preteklih spremembah? Upravljanje Ethereuma kaže na proces, ki omogoča sprejemanje takšnih odločitev_

<Divider />

## Kaj je upravljanje? {#what-is-governance}

Upravljanje je sistem, ki omogoča sprejemanje odločitev. V tipični organizacijski strukturi ima lahko zadnjo besedo pri sprejemanju odločitev izvršna ekipa ali upravni odbor. Ali pa morda delničarji glasujejo o predlogih za uveljavitev sprememb. V političnem sistemu izvoljeni uradniki lahko uveljavijo zakonodajo, ki poskuša predstavljati interese njihovih volivcev.

## Decentralizirano upravljanje {#decentalized-governance}

Nobena oseba si ne lasti ali kontrolira Ethereum protokola, vendar odločitve o implementaciji sprememb morajo biti kljub temu sprejete, da bi lahko zagotovili dolgoživost in blaginjo omrežja. To pomanjkanje lastništva pomeni, da je tradicionalno organizacijsko upravljanje nezdružljiva rešitev.

## Upravljanje Ethereuma {#ethereum-governance}

Upravljanje Ethereuma je proces s katerim so sprejete spremembe protokola. Pomembno je izpostaviti, da ta proces ni povezan s tem kako ljudje in aplikacije protokol uporabljajo - Ethereum ne zahteva dovoljenja. Kdorkoli lahko od koderkoli na svetu sodeluje v aktivnostih na verigi. Ni postavljenih pravil za to, kdo lahko ali ne sme razviti aplikacije ali poslati transakcije. Ne glede na to obstaja proces za predloge sprememb jedrnega protokola, na katerem delujejo te aplikacije. Ker se veliko ljudi zanaša na Ethereumovo stabilnost, obstaja zelo visoka meja koordinacije za ključne spremembe, vključno s socialnimi in tehničnimi, za zagotavljanje varnosti in široke podpore skupnosti pri kakršnihkoli spremembah.

### Upravljanje na verigi proti izven verige {#on-chain-vs-off-chain}

Tehnologija blokovnih verig omogoča nove upravljavske sposobnosti, znane kot upravljanje na verigi. Upravljanje na verigi je proces, pri katerem se o spremembah protokola odloča z glasovanjem deležnikov, običajno lastnikov upravljavskih žetonov in to glasovanje se dogaja na verigi. Pri nekaterih oblikah upravljanja na verigi so predlogi za spremembe že zapisani v programski kodi in implementirani samodejno, če jih deležniki potrdijo.

Nasprotni pristop, upravljanje izven verige je proces, pri katerem se kakršnekoli odločitve o spremembi protokola zgodijo prek informacijskega procesa socialne razprave in se, če so odobrene, implementirajo v programsko kodo.

**Upravljanje Ethereuma se dogaja izven verige** v širokem krogu deležnikov udeleženih v proces.

_Čeprav je na nivoju protokola upravljanje Ethereuma izven verige, se v veliko primerih razvitih na Ethereumu, kot so DAOs, uporablja upravljanje na verigi._

<ButtonLink href="/dao/">Več o DAOs</ButtonLink>

<Divider />

## Kdo vse je vključen? {#who-is-involved}

V [Ethereum skupnosti](/community/) so prisotni različni deležniki, od katerih vsak predstavlja svojo vlogo v upravljavskem procesu. Začne se pri deležnikih, ki so najbolj oddaljeni od protokola in se nato približuje. Imamo:

- **Ether lastnike**: to so osebe, ki hranijo poljubno količino ETH. [Več o ETH](/eth/).
- **Uporabniki aplikacij**: to so osebe, ki uporabljajo aplikacije na blokovni verigi Ethereum.
- **Razvijalci aplikacij/orodij**: to so osebe, ki razvijajo aplikacije, ki delujejo na blokovni verigi Ethereum (kot so DeFi, NFTs itd.), ali razvijajo orodja za interakcije z Ethereumom (kot so denarnice, testna območja itd.). [Več o dappih](/dapps/).
- **Operaterji vozlišč**: to so osebe, ki upravljajo vozlišča, ki potrjujejo bloke in transakcije, zavračajo kakršnekoli neveljavne transakcije ali bloke, ki jih najdejo. [Več o vozliščih](/developers/docs/nodes-and-clients/).
- **EIP avtorji**: to so osebe, ki predlagajo spremembe za Ethereum protokol v obliki Ethereum predlogov za izboljšave (EIPs). [Več o EIPs](/eips/).
- **Rudarji/validatorji**: to so osebe, ki upravljajo vozlišča, ki lahko v blokovno verigo Ethereum dodajajo bloke.
- **Razvijalci protokola** (poznani tudi kot "ključni razvijalci"): to so osebe, ki vzdržujejo različne implementacije Ethereuma (kot so go-ethereum, Nethermind, Besu, Erigon na izvršilni plasti ali Prysm, Lighthouse, Nimbus, Teku, Lodestar na plasti za soglasje). [Več o Ethereum strankah](/developers/docs/nodes-and-clients/).

_Opomba: katerikoli posameznik je lahko del različnih skupin (na primer, razvijalec protokola se lahko zavzema za EIP, upravlja validator na oddajniški verigi in uporablja DeFi aplikacije). Za večjo jasnost koncepta je lažje, če se jih obravnava posebej._

<Divider />

## Kaj je EIP? {#what-is-an-eip}

Pomemben proces, ki se uporablja pri upravljanju Ethereuma je predlaganje **Ethereum predlogov za izboljšave (EIPs)**. EIPs so standard za opredeljevanje potencialnih lastnosti ali procesov Ethereuma. Kdorkoli znotraj Ethereum skupnosti lahko ustvari EIP. Na primer, noben od avtorjev EIP-721 - EIP-ja, ki je standardiziral NFT-je, ni neposredno delal na razvoju Ethereum protokola.

<ButtonLink href="/eips/">Več o EIPs</ButtonLink>

<Divider />

## Uraden proces {#formal-process}

Uraden proces za predstavitev sprememb Ethereum protokola je sledeč:

1. **Predlog ključnega EIP**: kot je opisano v [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), prvi korak do uradnega predloga za spremembo Ethereuma predstavlja podroben opis v ključnem EIP. To bo predstavljalo uradno opredelitev za EIP, ki ga bodo Ethereum razvijalci implementirali, če bo sprejet.

2. **Predstavite vaš EIP razvijalcem protokola**: ko imate ključen EIP, za katerega ste zbrali odzive skupnosti, ga predstavite razvijalcem protokola. To lahko storite z predlogom razprave na [AllCoreDevs klicu](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Verjetno je, da se bodo nekatere razprave zgodile sočasno na [Ethereum čarovniškem forumu](https://ethereum-magicians.org/) ali v [Ethereum R&D Discordu](https://discord.gg/mncqtgVSVw).

> Potencialni izidi tega koraka so:

> - EIP bo upoštevan za prihodnje nadgradnje omrežja
> - Zahtevane bodo tehnične spremembe
> - Lahko je zavrnjen, če ni prednosten ali če izboljšava ni dovolj obsežna glede na potreben razvojni vložek

3. **Ponavljajte do končnega predloga:** po prejemu odziva s strani relevantnih deležnikov, boste verjetno morali izvesti spremembe vašega začetnega predloga, da izboljšate njegovo varnost ali bolje dosežete potrebe posameznih uporabnikov. Ko vaš EIP vključuje vse spremembe, za katere menite, da so potrebne, ga boste morali ponovno predstaviti razvijalcem protokola. Nato se boste premaknili na naslednji korak tega procesa, ali pa se bodo pojavile nove skrbi, ki bodo zahtevale nov krog ponovitev.

4. **EIP, ki je vključen v nadgradnjo omrežja**: pod predpostavko, da je EIP potrjen, testiran in implementiran, se ga načrtuje kot del nadgradnje omrežja. Glede na visoke stroške nadgradenj omrežja (vsi morajo hkrati nadgraditi), so običajno EIP-ji skupaj povezani v nadgradnje.

5. **Aktivirana nadgradnja omrežja**: po tem, ko je nadgradnja omrežja aktivirana, bo EIP aktiven na Ethereum omrežju. _Opomba: nadgradnje omrežja so običajno aktivirane na testnem omrežju, preden se aktivirajo na glavnem omrežju Ethereum._

Ta tok, čeprav zelo poenostavljen, daje pregled nad pomembnimi fazami za aktivacijo spremembe protokola na Ethereumu. Zdaj pa si oglejmo neformalne dejavnike, ki so v igri pri tem procesu.

## Neformalen proces {#informal-process}

### Razumevanje predhodnega dela {#prior-work}

EIP predlagatelji se morajo seznaniti z predhodnim delom in predlogi, preden ustvarijo EIP, ki bo lahko resno upoštevan za uvedbo na glavnem Ethereum omrežju. Na ta način upamo, da EIP prinese nekaj novega, kar še ni bilo predhodno zavrnjeno. Tri glavna mesta za raziskovanje tega so [EIP zbornik](https://github.com/ethereum/eips), [Ethereum čarovniki](https://www.ethereum-magicians.org/) in [ ethresear.ch](https://www.ethresear.ch/).

### Delovne skupine {#working-groups}

Prvi osnutek EIP-ja verjetno ne bo implementiran v glavno Ethereum omrežje brez urejanja in sprememb. Na splošno bodo EIP predlagatelji z podskupino razvijalcev protokola, da opredelijo, implementirajo, testirajo, ponovijo in finalizirajo njihov predlog. Zgodovinsko gledano imajo te delovne skupine zahtevajo nekaj mesecev (včasih celo let!) dela. Podobno bi morali EIP predlagatelji za takšne spremembe v njihov trud že zgodaj vključiti relevantne razvijalce aplikacij/orodij, da zberejo odzive končnih uporabnikov in zmanjšajo kakršnakoli tveganja pri uvajanju.

### Soglasje skupnosti {#community-consensus}

Medtem, ko EIP-ji predstavljajo predvsem tehnične izboljšave v manjših odtenkih, so nekateri bolj kompleksni in sami po sebi predstavljajo kompromise, ki bodo na različne načine vplivale na različne deležnike. To pomeni, da nekateri EIP-ji znotraj skupnosti postanejo bolj sporni kot drugi.

Ne obstaja jasna knjiga pravil o tem, kako ravnati s spornimi predlogi. Glede na to, da razvijalci protokola nimajo možnosti, da prisilijo ljudi k posvojitvi nadgradenj omrežja, se bodo običajno izogibali implementaciji EIP-jev, katerih spornost pretehta nad ugodnostmi za širšo skupnost.

Od EIP predlagateljev se pričakuje, da zberejo odzive od vseh relevantnih deležnikov. Če ste predlagatelj spornega EIP-ja, poskusite nasloviti ugovore in s tem doseči soglasje za vaš EIP. Glede na velikost in raznolikost Ethereum skupnosti, ne obstaja posamezno merilo (kot je glasovanje z kovanci), ki je lahko uporabljeno za merjenje soglasja skupnosti in od EIP predlagateljev se pričakuje, da se prilagodijo okoliščinam njihovega predloga.

Onstran varnosti Ethereum omrežja, je bila s strani razvijalcev protokola zgodovinsko gledano velika teža posvečena temu, kar visoko vrednotijo uporabniki in razvijalci aplikacij/orodij, glede na to, da njihova uporaba in razvoj Ethereuma delata ekosistem privlačen za ostale deležnike. Poleg tega morajo biti EIP-ji implementirani prek vseh implementacij strank, ki jih upravljajo različne ekipe. Del tega procesa običajno predstavlja prepričevanje več ekip razvijalcev protokola, da je določena sprememba dragocena, in v pomoč končnim uporabnikom, ali pa rešuje varnostno težavo.

<Divider />

## Upravljanje nestrinjanj {#disagreements}

Veliko število deležnikov z različnimi razlogi in prepričanji pomeni, da pogosto prihaja do nestrinjanj.

Na splošno se nestrinjanje rešuje z dolgo razpravo na javnih forumih, da bi lahko razumeli izvor problema in vsem omogočili sodelovanje. Običajno ena skupina prizna drugo rešitev ali pa se doseže kompromis, s katerim so vsi zadovoljni. Če je ena skupina dovolj prepričana, bi lahko prisilna uvedba spremembe privedla do razdelitve verige. Do razdelitve verige pride, ko nekaj deležnikov nasprotuje implementaciji spremembe protokola, kar privede do drugačne, nekompatibilne verzije delujočega protokola, iz katerega se razvijeta dve samostojni blokovni verigi.

### DAO razcep {#dao-fork}

Razcepi se zgodijo, ko pride do pomembnejših nadgradenj ali sprememb omrežja in sprememb pravil protokola. [Ethereum stranke](/developers/docs/nodes-and-clients/) morajo nadgraditi svojo programsko opremo, da implementirajo nova pravila razcepa.

DAO razcep se je zgodil kot odziv na [2016 DAO napad](https://www.coindesk.com/understanding-dao-hack-journalists), pri katerem je bilo z napadom iz nezavarovane [DAO](/glossary/#dao) pogodbe izpraznjenih več kot 3,6 milijona ETH. Razcep je prestavil sredstva iz pogodbe z napako v novo pogodbo, kar je vsem, ki so sredstva v napadu izgubili, omogočilo vračilo.

O tem načinu odziva je glasovala Ethereum skupnost. Katerikoli lastnik ETH je lahko glasoval prek transakcije na [glasovalni platformi](http://v1.carbonvote.com/). Odločitev za razcep je prejela več kot 85 % glasov.

Pomembno je opomniti, da čeprav se je protokol razcepil z namenom preklica napada, je teža glasov, ki so razcep podprli lahko predmet razprave iz več razlogov:

- Udeležba pri glasovanju je bila zelo nizka
- Večina ljudi ni vedela, da se dogaja glasovanje
- Glasovanje je predstavljalo le lastnike ETH in nobenih drugih deležnikov v sistemu

Manjši del skupnosti je razcep zavrnil predvsem zaradi prepričanja, da napad na DAO ni bil težava na protokolu. Oblikovali so [Ethereum Classic](https://ethereumclassic.org/).

Danes je Ethereum skupnost sprejela stališče o neposeganju v primeru napak v pogodbah ali izgubljenih sredstev, da bi ohranili nevtralnost sistema.

Oglejte si več o DAO razcepu:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Uporabnost razcepov {#forking-utility}

Ethereum/Ethereum Classic razcep je odličen primer zdravega razcepa. Dve skupini sta se o nekaterih ključnih vrednotah dovolj močno nestrinjali, da se jim je zdelo tveganja vredno nadaljevati z različnima načinoma delovanja.

Možnost razcepa ob pomembnih političnih, filozofskih ali ekonomskih razlikah predstavlja pomembno vlogo za uspeh Ethereum upravljanja. Brez možnosti razcepa so bila alternativa nenehni spopadi, prisilno sodelovanje za tiste, ki so sčasoma oblikovali Ethereum Classic in vedno bolj različna vizija za to, kako izgleda uspeh Ethereuma.

<Divider />

## Razvoj oddajniške verige {#beacon-chain}

Proces Ethereum upravljanja pogosto zapostavi hitrost in učinkovitost za odprtost in vključevalnost. Za pospešitev razvoja Oddajniške verige je bila ta zagnana ločeno od Ethereum omrežja z dokazom o delu in je tako sledila svojemu načinu upravljanja.

Medtem ko je bil razvoj specifikacij in implementacij vedno povsem odprtokoden, uradni procesi za predlaganje nadgradenj opisani zgoraj niso bili uporabljeni. To je omogočilo, da so bile spremembe s strani raziskovalcev in implementatorjev določene in dogovorjene hitreje.

Ko se bo Oddajniška veriga združila z Ethereumovo izvršilno plastjo, se bo upravljavski proces za predlaganje sprememb poenotil. Proces za implementacijo združitve je [že na poti](https://eips.ethereum.org/EIPS/eip-3675).

<ButtonLink href="/roadmap/merge/">Več o združitvi</ButtonLink>

<Divider />

## Kako se lahko vključim? {#get-involved}

- [Predlagajte EIP](/eips/#sodelovanje)
- [Razpravljajte o trenutnih predlogih](https://ethereum-magicians.org/)
- [Vključite se v R&D razprave](https://ethresear.ch/)
- [Pridružite se Ethereum R&D Diskordu](https://discord.gg/mncqtgVSVw)
- [Upravljajte vozlišče](/developers/docs/nodes-and-clients/run-a-node/)
- [Prispevajte k razvoju strank](/developers/docs/nodes-and-clients/#execution-clients)
- [Pripravniški program za ključne razvijalce](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Dodatno branje {#further-reading}

Upravljanje Ethereuma ni rigidno določeno. Različni sodelujoči v skupnosti imajo raznolike poglede nanj. Tukaj jih je nekaj:

- [Kako deluje Ethereum upravljanje?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Kako deluje Ethereum upravljanje](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Kaj je ključni Ethereum razvijalec?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) – _Hudson Jameson_
