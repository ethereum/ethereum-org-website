---
title: Maksimalna pridobljiva vrednost (MEV)
description: Uvod v maksimalno pridobljivo vrednost (MEV)
lang: sl
---

Maksimalna pridobljiva vrednost (MEV) se nanaša na maksimalno vrednost, ki se lahko pridobi pri izdelavi bloka poleg standardne blokovne nagrade in provizij goriva z vključevanjem, izključevanjem in spreminjanjem vrstnega reda transakcij v bloku.

## Pridobljiva vrednost rudarjev

Ta koncept se je prvič pojavil v kontekstu [dokaza o delu](/developers/docs/consensus-mechanisms/pow/) in se je na začetku imenoval "pridobljiva vrednost rudarjev". To je zato, ker pri dokazu o delu rudarji nadzirajo vključevanje, izključevanje in razvrščanje transakcij. Vendar pa bodo validatorji po prehodu na dokaz o deležu prek [Spojitve](/roadmap/merge) odgovorni za te vloge in rudarjenje ne bo več uporabno. Metode za pridobivanje vrednosti bodo ostale tudi po prehodu in zato je bila potrebna zamenjava imena. Zaradi ohranjanja kontinuitete bomo ohranili enako kratico in obenem ohranili osnovni pomen, "maksimalna pridobljiva vrednost" se zdaj uporablja kot bolj vključujoča zamenjava.

## Predpogoji {#prerequisites}

Prepričajte se, da ste seznanjeni s [transakcijami](/developers/docs/transactions/), [bloki](/developers/docs/blocks/), [gorivom](/developers/docs/gas/) in [rudarjenjem](/developers/docs/consensus-mechanisms/pow/mining/). Seznanjenost z [dappi](/dapps/) in [DeFi](/defi/) je prav tako v pomoč.

## Ekstrakcija MEV {#mev-extraction}

V teoriji se MEV v celoti dodaja rudarjem, saj so samo te edini subjekt, ki lahko jamči izvedbo dobičkonosne priložnosti MEV (vsaj na trenutni verigi z dokazom o delu — to se bo spremenilo po [Spojitvi](/roadmap/merge/)). V praksi pa je velik del MEV pridobljen s strani neodvisnih sodelujočih v omrežju, ki se imenujejo "iskalci." Iskalci izvajajo kompleksne algoritme na podatkih blokovne verige, da zaznajo dobičkonosne priložnosti MEV, in imajo robote, da omrežju samodejno predložijo te dobičkonosne transakcije.

Rudarji prejmejo del celotne količine MEV v vsakem primeru, saj so iskalci pripravljeni plačati visoke provizije goriva (ki gredo rudarjem) v zameno za višjo možnost vključitve njihove dobičkonosne transakcije v blok. Predpostavimo, da so iskalci ekonomsko racionalni, provizija goriva, ki jo je iskalec pripravljen plačati, bo obsegala do 100 % iskalčeve MEV (saj, če bi bila provizija goriva višja, bi iskalec izgubil denar).

S tem morajo za nekatere visoko konkurenčne priložnosti MEV, kot je [arbitraža DEX](#mev-examples-dex-arbitrage), iskalci plačati do 90 % ali celo več svojega prihodka za provizije goriva rudarjem, saj želi veliko ljudi trgovati na isti dobičkonosni arbitraži. To pa zato, ker je edini način za zagotavljanje, da se njihova arbitražna transakcija izvede, ta, da predložijo transakcijo z najvišjo ceno goriva.

### Golf z gorivom {#mev-extraction-gas-golfing}

Ta dinamika je poskrbela, da je postalo dobro "igranje golfa z gorivom" — programiranje transakcij, da porabijo najmanjšo možno količino goriva — konkurenčna prednost, saj iskalcem omogoča, da nastavijo višjo ceno goriva, medtem ko ohranjajo svojo skupno provizijo goriva konstantno (glede na to, da so provizije goriva = cena goriva \* porabljeno gorivo).

Nekaj prepoznanih tehnik golfa z gorivom vključuje: uporabo naslovov, ki se začnejo z dolgim nizom ničel (torej [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)), glede na to, da zavzamejo manj prostora (in posledično goriva) v shrambi; in puščanje majhnih stanj žetonov [ERC-20](/developers/docs/standards/tokens/erc-20/) v pogodbah, glede na to, da iniciacija reže v shrambi stane več goriva (če je stanje 0) kot njena nadgradnja. Iskanje novih načinov za znižanje porabe goriva je aktivno področje raziskav med iskalci.

### Generalizirani prehitevalci {#mev-extraction-generalized-frontrunners}

Raje kot da programirajo kompleksne algoritme za zaznavanje dobičkonosnih priložnosti MEV, nekateri iskalci upravljajo generalizirane prehitevalce. Generalizirani prehitevalci so roboti, ki opazujejo čakalnico, da bi zaznali dobičkonosne transakcije. Prehitevalec bo kopiral kodo potencialno dobičkonosne transakcije, nadomestil naslove s svojimi in izvedel transakcijo lokalno, da ponovno preveri, če transakcija rezultira v dobičku za njegov naslov. Če se transakcija izkaže za dobičkonosno, bo prehitevalec predložil prilagojeno transakcijo z zamenjanim naslovom in višjo provizijo goriva, s čimer bo "prehitel" izvorno transakcijo in prejel MEV izvornega iskalca.

### Flash roboti {#mev-extraction-flashbots}

Flash roboti so neodvisen projekt, ki stranko go-ethereum razteza s storitvijo, ki iskalcem omogoča posredovanje transakcij MEV rudarjem, brez da bi jih razkril javni čakalnici. To preprečuje, da transakcije prehitijo generalizirani prehitevalci.

V času tega pisanja je velik del transakcij MEV speljan prek Flash robotov, kar pomeni, da generalizirani prehitevalci niso tako učinkoviti, kot so bili.

## Primeri MEV {#mev-examples}

MEV se na blokovni verigi pojavlja na različne načine.

### Arbitraža DEX {#mev-examples-dex-arbitrage}

Arbitraža na [decentraliziranih borzah](/glossary/#dex) (DEX) je najenostavnejša in najbolj znana priložnost MEV. Posledično zanjo obstaja tudi največ konkurence.

Deluje tako: če dva DEX-a ponujata isti žeton po dveh različnih cenah, lahko nekdo kupi žeton na cenejšem DEX-u in ga proda na dražjem DEX-u z eno samo atomsko transakcijo. Zahvaljujoč mehaniki blokovne verige je to prava arbitraža brez rizika.

[Tukaj je primer](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) dobičkonosne arbitražne transakcije, kjer je iskalec 1,000 ETH pretvoril v 1,045 ETH s tem, da je izkoristil razliko v tečajnem paru ETH/DAI na Uniswapu in Sushiswapu.

### Likvidacije {#mev-examples-liquidations}

Likvidacije na posojilnih protokolih predstavljajo še eno znano priložnost MEV.

Posojilni protokoli, kot sta Maker in Aave, delujejo tako, da od uporabnikov zahtevajo, da položijo neko vrsto zavarovanja (recimo ETH). Uporabniki si lahko nato od drugih sposodijo različna sredstva in žetone glede na to, kaj potrebujejo (na primer, lahko si sposodijo MKR, če želijo glasovati o upravljavskih predlogih MakerDAO, ali SUSHI, če želijo zaslužiti delež provizij od trgovanja na Sushiswapu) do določene količine svojega položenega zavarovanja — na primer 30 % (točno procentualno posojilojemalsko moč določi protokol). Uporabniki, pri katerih si izposodijo druge žetone, v tem primeru delujejo kot posojilodajalci.

Glede na to, da vrednost posojilojemalčevega zavarovanja niha, niha tudi njihova posojilojemalska moč. Če zaradi tržnih fluktuacij vrednost sposojenih sredstev recimo preseže 30 % vrednosti zavarovanja (ponovno, točen odstotek določi protokol), protokol po navadi dovoli komurkoli, da likvidira zavarovanje in v trenutku poplača posojilodajalce (to deluje podobno, kot delujejo [pozivi h kritju](https://www.investopedia.com/terms/m/margincall.asp) v tradicionalnih financah). V primeru likvidacije mora posojilojemalec po navadi plačati mastno likvidacijsko provizijo, del katere gre likvidatorju — tukaj se pojavi priložnost MEV.

Iskalci tekmujejo pri čim hitrejšem razčlenjevanju podatkov blokovne verige, da bi določili, kateri posojilojemalci so lahko likvidirani in bi tako prvi predložili likvidacijsko transakcijo ter zase pobrali likvidacijsko provizijo.

### Trgovanje s sendvičem {#mev-examples-sandwich-trading}

Trgovanje s sendvičem je še ena pogosta metoda ekstrakcije MEV.

Za trgovanje s sendvičem bo iskalec opazoval čakalnico za visoke trgovalne zneske na DEX-u. Na primer predpostavimo, da želi nekdo kupiti 10,000 UNI z DAI na Uniswapu. Trgovanje v takem obsegu bo imelo konkreten vpliv na par UNI/DAI, kar bo potencialno precej dvignilo ceno UNI glede na DAI.

Iskalec lahko izračuna približen cenovni učinek tega velikega trgovanja na paru UNI/DAI in izvede optimalno naročilo za nakup tik _pred_ velikim trgovanjem, UNI kupi poceni in nato izvede naročilo za prodajo tik _po_ velikem trgovanju ter tako sredstvo proda po višji ceni, ki nastane kot posledica velikega naročila.

Trgovanje s sendvičem je bolj riskantno, saj ni atomsko (za razliko od arbitraže DEX, kot je opisana zgoraj) in je nagnjeno k [salmonela napadom](https://github.com/Defi-Cartel/salmonella).

### NFT MEV {#mev-examples-nfts}

MEV v svetu NFT je pojavljajoč se fenomen in ni nujno dobičkonosen.

Vendar pa glede na to, da se transakcije NFT dogajajo na isti blokovni verigi, deljeni z vsemi drugimi transakcijami Ethereum, iskalci lahko uporabljajo podobne tehnike kot tiste, ki se uporabljajo pri tradicionalnih priložnostih MEV tudi na trgu NFT.

Na primer, če obstaja priljubljena izdaja NFT in iskalec želi določen NFT ali več njih, lahko sprogramirajo takšno transakcijo, da so prvi v vrsti za nakup NFT-ja ali pa lahko kupijo celoten set NFT-jev z eno transakcijo. Ali če je NFT [po pomoti na voljo po nizki ceni](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), lahko iskalec prehiti druge kupce in ga poceni ukrade.

Izrazit primer NFT MEV se je pojavil, ko je iskalec porabil 7 milijonov dolarjev za [nakup](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) vseh Cryptopunkov na spodnjem pragu cene. Raziskovalec blokovnih verig je [na Twitterju pojasnil](https://twitter.com/IvanBogatyy/status/1422232184493121538), kako je kupec sodeloval s ponudnikom MEV, da je nakup ohranil tajen.

### Dolgi rep {#mev-examples-long-tail}

Arbitraža DEX, likvidacije in trgovanje s sendvičem so zelo dobro znane priložnosti MEV, ki za nove iskalce po vsej verjetnosti niso dobičkonosne. Vendar obstaja dolgi rep manj poznanih priložnosti MEV (NFT MEV je verjetno takšna priložnost).

Iskalci, ki so še na začetku, bi lahko več uspeha našli pri iskanju MEV v tem dolgem repu priložnosti. Flashbotova [tabla zaposlitev MEV](https://github.com/flashbots/mev-job-board) navaja nekaj nastajajočih priložnosti.

## Učinki MEV {#effects-of-mev}

MEV ni samo slab — obstajajo tako pozitivne kot negativne posledice za MEV na Ethereumu.

### Dobri {#effects-of-mev-the-good}

Veliko projektov DeFi se zanaša na ekonomsko racionalne igralce za zagotavljanje uporabnosti in stabilnosti njihovih protokolov. Na primer, arbitraža DEX zagotavlja, da uporabniki dobijo najboljše, najbolj pravilne cene za svoje žetone, posojilni protokoli pa se za zagotavljanja poplačil posojilodajalcev zanašajo na hitre likvidacije, ko posojilojemalci padejo pod zavarovalna razmerja.

Brez racionalnih iskalcev, ki iščejo in popravljajo ekonomske neučinkovitosti ter izkoriščajo prednosti protokolovih ekonomskih spodbud, protokoli DeFi in dappi v splošnem ne bi bili tako odporni, kot so danes.

### Slabi {#effects-of-mev-the-bad}

Na plasti aplikacij nekatere oblike MEV, kot je trgovanje s sendvičem, rezultirajo v neprimerljivo slabši izkušnji za uporabnike. Uporabniki, ki pristanejo v sendviču, se soočajo s povečanim drsenjem in slabšo izvedbo pri svojem trgovanju.

Na plasti omrežja generalizirani prehitevalci in dražbe cen goriva, pri katerih pogosto sodelujejo (ko dva ali več prehitevalcev tekmuje za to, da je njihova transakcija vključena v naslednji blok, tako da postopoma dvigujejo ceno goriva za svoje lastne transakcije), rezultirajo v prezasedenosti omrežja in visokih cenah goriva za vse druge, ki poskušajo izvajati svoje običajne transakcije.

Naprej od tega, kar se dogaja _znotraj_ blokov, ima lahko MEV škodljiv vpliv tudi _med_ bloki. Če MEV, razpoložljiv v bloku, bistveno presega standardno blokovno nagrado, bodo rudarji bolj spodbujeni k temu, da ponovno zrudarijo blok in si MEV zagotovijo zase ter s tem povzročijo reorganizacijo blokovne verige in nestabilnost soglasja.

Ta možnost reorganizacije blokovne verige je bila [predhodno raziskovana na Bitcoinovi blokovni verigi](https://dl.acm.org/doi/10.1145/2976749.2978408). Glede na to, da se blokovna nagrada pri Bitcoinu razpolavlja in s tem provizije za transakcije predstavljajo večji del blokovne nagrade, se pojavljajo situacije, kjer za rudarje postane ekonomsko racionalno, da prepustijo blokovno nagrado naslednjega bloka in namesto tega ponovno zrudarijo predhodni blok z višjimi provizijami. Z rastjo MEV bi se lahko podobne vrste situacij pojavile tudi pri Ethereumu, kar bi ogrozilo integriteto blokovne verige.

## Stanje MEV {#state-of-mev}

Ekstrakcija MEV se je v začetku leta 2021 močno povečala, kar je rezultiralo v zelo visokih cenah goriva v prvih parih mesecih. Nastanek Flashbotovega trenda MEV je zmanjšal učinkovitost generaliziranih prehitevalcev in prenesel dražbe cene goriva z verige, kar je znižalo cene goriva za običajne uporabnike.

Čeprav veliko iskalcev z MEV še vedno služi dober denar, s tem, ko postajajo vse bolj prepoznavne, vse več iskalcev tekmuje za iste priložnosti, zato bodo rudarji ujeli vse več skupnih prihodkov MEV (saj se enake vrste dražb goriva, opisanih zgoraj, čeprav zasebno, prav tako pojavljajo v Flashbotih in rudarji bodo tako ujeli posledični prihodek od goriva). MEV prav tako ni unikaten za Ethereum in s tem, ko priložnosti na Ethereumu postajajo bolj konkurenčne, se iskalci premikajo k drugim blokovnim verigam, kot je Binance Smart Chain, kjer obstajajo priložnosti, podobne tistim na Ethereumu, z manj konkurence.

Medtem ko DeFi raste in pridobiva na popularnosti, bo MEV kmalu lahko konkretno presegel osnovno blokovno nagrado Ethereum. S tem pa raste možnost sebičnega ponovnega rudarjenja blokov in nestabilnosti soglasja. Nekateri to smatrajo kot eksistenčno grožnjo za Ethereum, zato destimulacija sebičnega rudarjenja predstavlja aktivno področje raziskav pri teoriji protokola Ethereum. Trenutno raziskovana rešitev je [glajenje nagrad MEV](https://ethresear.ch/t/committee-driven-mev-smoothing/10408).

## Povezani viri {#related-resources}

- [Flash roboti GitHub](https://github.com/flashbots/pm)
- [MEV-raziskovanje](https://explore.flashbots.net/) _Nadzorna plošča in raziskovalec za transakcije MEV_

## Nadaljnje branje {#further-reading}

- [Kaj je rudarska pridobljiva vrednost (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV in jaz](https://research.paradigm.xyz/MEV)
- [Ethereum je Temen gozd](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Pobeg iz Temnega gozda](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: prehitevanje krize MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Zapisi MEV, ki jih je pripravil @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
