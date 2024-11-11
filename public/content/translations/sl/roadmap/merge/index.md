---
title: Spojitev
description: Več informacij o spojitvi – trenutku, ko je Ethereumovo glavno omrežje začelo uporabljati dokaz o deležu.
lang: sl
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoint1: Ethereumovo glavno omrežje uporablja dokaz o deležu, vendar ni bilo vedno tako.
summaryPoint2: Nadgradnja z izvirnega mehanizma dokaza o delu na dokaz o deležu se je imenovala spojitev.
summaryPoint3: Spojitev je ime dogodka, ko se je Ethereumovo glavno omrežje spojilo z oddajniško verigo – ločeno verigo blokov, ki je uporabljalo dokaz o deležu. Obe omrežji zdaj obstajata kot ena veriga.
summaryPoint4: Spojitev je Ethereumovo porabo energijo zmanjšala za približno 99,95 %.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Spojitev je bila izvedena 15. septembra 2022. Zaključila je Ethereumov prehod na mehanizem za doseganje soglasja z dokazom o deležu. Ta je uradno zamenjal mehanizem dokaza o delu in porabo energije zmanjšal za približno 99,95 %.
</UpgradeStatus>

## Kaj je bila spojitev? {#what-is-the-merge}

Spojitev je bila združitev izvirne izvajalne plasti Ethereuma (glavno omrežje, ki je obstajalo od [izvora](/history/#frontier)) z novo plastjo z mehanizmom za doseganje soglasja z dokazom o deležu, oddajniško verigo. Odpravila je potrebo po energijsko potratnem rudarjenju in namesto tega omogočila zaščito omrežja z zastavljanjem ETH. Predstavljala je zares vznemirljiv korak k realizaciji Ethereumove vizije – več možnosti širitve, varnosti in trajnosti.

<MergeInfographic />

Najprej je [oddajniška veriga](/roadmap/beacon-chain/) stopila v uporabo ločeno od [glavnega omrežja](/glossary/#mainnet). Ethereumovo glavno omrežje z vsemi računi, zneski, pametnimi pogodbami in stanjem verige blokov je še naprej varoval mehanizem [dokaza o delu](/developers/docs/consensus-mechanisms/pow/), tudi ko je oddajniška veriga vzporedno uporabljala [dokaz o deležu](/developers/docs/consensus-mechanisms/pos/). Spojitev je končno združila oba sistema in mehanizem dokaza o delu je trajno zamenjal mehanizem dokaza o deležu.

Predstavljajte si, da je Ethereum vesoljska ladja, ki je bila izstreljena, še preden je bila povsem pripravljena na medzvezdno potovanje. Z oddajniško verigo je skupnost pripravila nov motor in močnejši trup. Po celovitem testiranju je bil čas, da nov motor kar med poletom zamenja starega. Tako se je nov učinkovitejši motor združil z obstoječo vesoljsko ladjo, ki bo tako lahko prepotovala velike razdalje in raziskala vesolje.

## Spojitev z glavnim omrežjem {#merging-with-mainnet}

Z mehanizmom dokaza o delu je bilo Ethereumovo glavno omrežje zaščiteno od izvora do spojitve. Tako je lahko Ethereumova veriga blokov, ki jo vsi poznamo, julija 2015 začela delovati z vsemi znanimi funkcijami – transakcijami, pametnimi pogodbami, računi itd.

Skozi celotno Ethereumovo zgodovino so se razvijalci pripravljali na neizogiben prehod z mehanizma dokaza o delu na mehanizem dokaza o deležu. 1. decembra 2020 je bila oddajniška veriga ustvarjena kot veriga blokov, ločena od glavnega omrežja, ki je delovala vzporedno.

Oddajniška veriga najprej ni obdelovala transakcij v glavnem omrežju. Namesto tega je dosegala soglasja o lastnem stanju, tako da se je strinjala z aktivnimi validatorji in stanji na njihovih računih. Po obsežnem preskušanju je prišel čas, ko je začela oddajniška veriga dosegati soglasja o podatkih iz resničnega sveta. Po spojitvi je postala oddajniška veriga mehanizem za doseganje soglasij o vseh podatkih v omrežju, vključno s transakcijami in stanji na računih na izvajalni plasti.

Spojitev je predstavljala uradni premik, kjer se je oddajniška veriga začela uporabljati kot sredstvo za ustvarjanje blokov. Rudarjenje ni več sredstvo za ustvarjanje veljavnih blokov. To vlogo so prevzeli validatorji dokaza o deležu, ki so zdaj odgovorni za preverjanje veljavnosti vseh transakcij in predlaganih blokov.

V spojitvi ni bil izgubljen noben del zgodovine. Ko se je glavno omrežje spojilo z oddajniško verigo, je spojilo tudi celotno Ethereumovo zgodovino transakcij.

<InfoBanner>
Ta prehod na mehanizem dokaza o deležu je spremenil način izdajanja etra. Preberite več o <a href="/roadmap/merge/issuance/">izdajanju etra pred spojitvijo in po njej</a>.
</InfoBanner>

### Uporabniki in imetniki {#users-holders}

**Spojitev ni za imetnike in uporabnike spremenila ničesar.**

_Naj ponovimo_: kot uporabniku ali imetniku ETH ali kateregakoli drugega digitalnega sredstva na Ethereumu pa tudi kot zastavljavcu, ki ne upravlja vozlišča, **vam po spojitvi s sredstvi ali denarnico ni treba narediti ničesar.** ETH je samo ETH. Ne obstajata "stari in novi ETH" ali "ETH1 in ETH2", pa tudi denarnice po spojitvi delujejo popolnoma enako kot prej – osebe, ki pravijo drugače, so zelo verjetno prevaranti.

Tudi po zamenjavi mehanizma dokaza o delu je celotna Ethereumova zgodovina ostala enaka in se zaradi prehoda na mehanizem dokaza o deležu ni spremenila. Tudi po spojitvi imate še vedno dostop do vseh sredstev v svoji denarnici, ki ste jih tja shranili pred spojitvijo. **Ni vam treba opraviti nobene nadgradnje.**

[Več o varnosti Ethereuma](/security/#eth2-token-scam)

### Upravljavci vozlišč in razvijalci decentraliziranih aplikacij {#node-operators-dapp-developers}

<ExpandableCard
title="Upravljavci in ponudniki vozlišč za zastavljanje"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Ključne naloge vključujejo:

1. Zaženite tako odjemalca za doseganje soglasja kot izvajalnega odjemalca. Končne točke drugih razvijalcev po spojitvi ne delujejo več.
2. Potrdite pristnost odjemalca za doseganje soglasja in izvajalnega odjemalca s skupnim geslom JWT, da lahko varno komunicirata.
3. Nastavite naslov "prejemnika provizij", da boste lahko prejemali zaslužene provizije transakcij in provizije MEV.

Če za vozlišče ne opravite zgornjih dveh korakov, bo vozlišče prikazano kot "brez povezave", dokler obe plasti nista sinhronizirani in preverjeni.

Če ne nastavite "prejemnika provizij", bo validator deloval kot običajno, ne boste pa prejeli neporabljenih provizij in maksimalnih pridobljivih vrednosti (MEV), ki bi jih zaslužili z bloki, ki jih predlaga vaš validator.
</ExpandableCard>

<ExpandableCard
title="Upravljavci vozlišč, ki ne opravljajo validacije, in ponudniki infrastrukture"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Do spojitve je bil za prejemanje, ustrezno preverjanje in širjenje blokov, ki jih šepeta omrežje, dovolj izvajalni odjemalec (na primer Geth, Erigon, Besu ali Nethermind). _Po spojitvi_ je veljavnost transakcij v izvajalnem tovoru odvisna tudi od veljavnosti "bloka soglasja", v katerem je.

Zaradi tega potrebuje celotno Ethereumovo vozlišče zdaj izvajalnega odjemalca in odjemalca za doseganje soglasja. Ta dva odjemalca skupaj uporabljata nov programski vmesnik mehanizma. Programski vmesnik mehanizma zahteva preverjanje pristnosti z geslom JWT, ki je posredovan obema odjemalcema, kar omogoča varno komunikacijo.

Ključne naloge vključujejo:

– Poleg izvajalnega odjemalca namestite odjemalca za doseganje soglasja.
– Potrdite pristnost izvajalnega odjemalca in odjemalca za doseganje soglasja s skupnim geslom JWT, da bosta lahko varno komunicirala drug z drugim.

Če za vozlišče ne opravite zgornjih korakov, bo vozlišče prikazano kot "brez povezave", dokler obe plasti nista sinhronizirani in preverjeni.

</ExpandableCard>

<ExpandableCard
title="Razvijalci decentraliziranih aplikacij in pametnih pogodb"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

Spojitev je spremenila način doseganja soglasja, kar vključuje tudi spremembe, povezane:

– s strukturo blokov,
– s časi rež ali blokov,
– z izvajalno kodo,
– z viri naključnosti na verigi ter
– s koncepti _varnih vodilnih_ in _zaključenih blokov_.

Za več informacij preberite blog [Kako spojitev vpliva na Ethereumovo aplikacijsko plast](https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/) Tima Beika.
</ExpandableCard>

## Spojitev in poraba energije {#merge-and-energy}

Spojitev predstavlja konec mehanizma dokaza o delu za Ethereum in začetek bolj trajnostno usmerjenega in okolju prijaznega Ethereuma. Ethereumova poraba energije se je znižala za približno 99,95 %, zaradi česar je Ethereum zelena veriga blokov. Pridobite več informacij o [Ethereumovi porabi energije](/energy-consumption/).

## Spojitev in širjenje omrežja {#merge-and-scaling}

Spojitev je tudi postavila temelje za nadaljnje širitve omrežja, ki z dokazom o delu niso bile mogoče. Tako se je Ethereum še za korak približal velikosti, varnosti in trajnosti, opisani v [viziji za Ethereum](/roadmap/vision/).

## Zmote o spojitvi {#misconceptions}

<ExpandableCard
title="Zmota: &quot;Če želite upravljati vozlišče, morate zastaviti 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">
Obstajata dve vrsti Ethereumovih vozlišč: vozlišča, ki predlagajo bloke, in vozlišča, ki jih ne.

Vozlišča, ki predlagajo bloke, predstavljajo le majhno število vseh Ethereumovih vozlišč. Ta kategorija vključuje vozlišča za rudarjenje, ki uporabljajo mehanizem dokaza o delu, in validacijska vozlišča, ki uporabljajo mehanizem dokaza o deležu. Zahteva zagotavljanje ekonomskih virov (na primer računske moči grafične kartice za dokaz o delu ali zastavljenega ETH za dokaz o deležu) za možnost, da občasno predlagajo naslednji blok in zaslužijo nagrade, ki jih podeljuje protokol.

Drugim vozliščem v omrežju (ki so v večini) ni treba zagotavljati ekonomskih virov, razen običajnega osebnega računalnika z 1–2 TB razpoložljivega prostora za shranjevanje in internetno povezavo. Ta vozlišča ne predlagajo blokov, še vedno pa imajo nepogrešljivo vlogo pri varovanju omrežja. Zagotavljajo namreč ustreznost vseh predlagateljev blokov, tako da poslušajo, ali so nastali novi bloki, in ob njihovem nastanku preverjajo, ali so v skladu s pravili soglasja omrežja. Če je blok veljaven, ga vozlišče posreduje skozi omrežje. Če blok iz kateregakoli vzroka ni veljaven, ga bo programska oprema vozlišča smatrala za neveljavnega in ga ne bo posredovala v omrežje.

Vozlišče, ki ne ustvarja blokov, lahko kdorkoli vodi v skladu s katerim od mehanizmov za doseganje soglasja (dokaz o delu ali dokaz o deležu). Uporabnike k temu _močno spodbujamo_, če imajo sredstva za to. Delovanje vozlišča je za Ethereum izjemno pomembno. Vsako tako posamezno vozlišče izboljšuje varnost, zasebnost in zaščito pred cenzuro za celotno omrežje.

Zmožnost, da lahko kdorkoli upravlja svoje vozlišče, je _popolnoma nepogrešljiva_ za zagotavljanje decentralizacije Ethereumovega omrežja.

[Več o upravljanju lastnega vozlišča](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Zmota: &quot;Spojitev ni zmanjšala provizij za plin.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">
Provizije za plin so posledica povpraševanja v omrežju glede na njegovo kapaciteto. Spojitev je odpravila uporabo mehanizma dokaza o delu in za doseganje soglasja uvedla mehanizem dokaza o deležu, ni pa občutno spremenila dejavnikov, ki neposredno vplivajo na kapaciteto ali pretočnost omrežja.

Z [načrtom razvoja, ki se osredotoča na združevanje transakcij](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698), se trudimo širiti dejavnost uporabnikov na [2. plasti 2](/layer-2/), glavno omrežje na 1. plasti pa želimo razvijati kot varno decentralizirano plast za poravnavo, ki je optimizirana za povečevanje prostora za shranjevanje podatkov, s katerim bodo vse transakcije postale eksponentno cenejše. Prehod na mehanizem dokaza o deležu je nujen predpogoj za tako delovanje. [Več o plinu in provizijah.](/developers/docs/gas/)
</ExpandableCard>

<ExpandableCard
title="Zmota: &quot;Spojitev je močno pospešila transakcije.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
"Hitrost" transakcije se lahko meri na več načinov, na primer s časom vključitve v blok ali zaključka transakcije. Oba se bosta rahlo spremenila, ne pa toliko, da bi uporabniki opazili.

V preteklosti je bil pri mehanizmu dokaza o delu cilj, da se nov blok ustvari približno vsakih 13,3 sekunde. Pri mehanizmu dokaza o deležu se vsaka reža pojavi na natanko 12 sekund. V vsaki reži lahko validator objavi blok. V večini rež so bloki, ne pa nujno v vseh (ko validator na primer ne deluje). Pri mehanizmu dokaza o deležu se bloki ustvarjajo za približno 10 % pogosteje kot pri mehanizmu dokaza o delu. To je majhna sprememba, ki je uporabniki verjetno ne bodo opazili.

Mehanizem dokaza o deležu je uvedel koncept zaključka transakcije, ki prej ni bil na voljo. Pri mehanizmu dokaza o delu je zmožnost povrnitve bloka postala eksponentno težja z vsakim blokom, ki je bil ustvarjen po transakciji, vendar pa nikoli ni postala ničelna. Pri mehanizmu dokaza o deležu se bloki združujejo v epohe (6,4-minutna obdobja, ki vsebujejo 32 možnosti za bloke), o katerih glasujejo validatorji. Ko se epoha konča, validatorji glasujejo, ali jo smatrajo za "upravičeno". Če se validatorji strinjajo, da je epoha upravičena, se v naslednji epohi zaključi. Razveljavitev zaključenih transakcij ni ekonomsko smiselna, saj bi bilo treba za njo pridobiti in sežgati tretjino vsega zastavljenega ETH.

</ExpandableCard>

<ExpandableCard
title="Zmota: &quot;Spojitev je omogočila dvige zastavljenih sredstev.&quot;"
contentPreview="False. Staking withdrawals are not yet enabled with The Merge. The following Shanghai upgrade will enable staking withdrawals.">
Zastavljen ETH in nagrade za zastavljanje so še naprej zadržane in jih ni mogoče dvigniti. Dvigi so načrtovani v prihajajoči nadgradnji Shanghai.
</ExpandableCard>

<ExpandableCard
title="Zmota: &quot;Validatorji do nadgradnje Shanghai, ki bo omogočila dvige, ne bodo prejeli nobene likvidne nagrade v ETH.&quot;"
contentPreview="False. Fee tips/MEV are credited to a non-staking account controlled by the validator, available immediately.">
Morda se zgornja opomba, da dvigi do nadgradnje Shanghai niso mogoči, zdi neintuitivna, vendar validatorji IMAJO takojšen dostop do provizij za transakcije in provizij MEV, ki so jih zaslužili med predlaganjem blokov.

Protokol izdaja ETH kot nagrado za validatorje, ki prispevajo k doseganju soglasja. Plast za doseganje soglasja upošteva novo izdani ETH, kjer ima validator edinstveni naslov za hranjenje zastavljenega ETH in nagrad protokola. Ta ETH je zaklenjen do nadgradnje Shanghai.

ETH na izvajalni plasti se upošteva ločeno od tistega na plasti za doseganje soglasja. Ko uporabniki opravljajo transakcije v Ethereumovem glavnem omrežju, se z ETH plačujejo plin in provizije validatorjem. Ta ETH je že na izvajalni plasti in ga protokol ne izdaja na novo – validatorjem je na voljo takoj (če so odjemalski programski opremi posredovali veljaven naslov "prejemnika provizije").
</ExpandableCard>

<ExpandableCard
title="Zmota: &quot;Ko bodo omogočeni dvigi, bodo vsi zastavljavci hkrati izstopili iz omrežja.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Ko bo nadgradnja Shanghai omogočila dvige, bodo vsi validatorji motivirani, da dvignejo zastavljena sredstva, ki presegajo 32 ETH, saj ta sredstva ne pripomorejo k izkupičku in niso zadržana na noben drug način. Odvisno od letne mere donosa (ki ga določa skupna vsota zastavljenega ETH) bodo morda želeli izklopiti validatorje in dvigniti vsa svoja sredstva ali pa nagrade izkoristiti za zastavitev še večje vsote, ki jim bo zagotovila večji izkupiček.

Pomembna opomba: protokol omejuje popolne izhode validatorjev iz omrežja. Tako lahko na epoho iz omrežja izstopi največ šest validatorjev (vsake 6,4 minute, torej 1350 na dan ali približno največ 43.200 ETH na dan od več kot 10 milijonov zastavljenega ETH). Ta omejitev je odvisna od skupne vsote zastavljenega ETH in preprečuje prevelik beg sredstev. Poleg tega preprečuje morebitnim napadalcem, da bi s svojimi sredstvi povzročili prekršek za zmanjšanje deleža in v isti epohi dvignili vsa svoja sredstva, preden bi protokol lahko uveljavil kazen za zmanjšanje deleža.

Letna mera donosa je namenoma dinamična, saj tako celotnemu trgu zastavljavcev omogoča, da pretehtajo, koliko so pripravljeni zaslužiti za pomoč pri ščitenju omrežja. Ko bodo dvigi omogočeni in bo omejitev prenizka, bodo validatorji izstopali pri omejitvi, ki jo določa protokol. S tem bo letna mera donosa postopoma naraščala, kar bo privabilo nove ali stare zastavljavce.
</ExpandableCard>

## Kaj se je zgodilo z "Eth2"? {#eth2}

Pojem "Eth2" smo opustili. Po spojitvi omrežij "Eth1" in "Eth2" v eno verigo ni več mogoče razlikovati med obema Ethereumovima omrežjema. Obstaja samo še Ethereum.

Da bi se izognila zmedi, je skupnost posodobila spodnja pojma:

- "Eth1" je zdaj "izvajalna plast", ki opravlja transakcije in izvaja kodo.
- "Eth2" je zdaj "plast za doseganje soglasja", ki obravnava mehanizem za doseganje soglasja z dokazom o deležu.

Te posodobitve terminologije spreminjajo samo konvencije o poimenovanju; ne spreminjajo ciljev ali načrta Ethereuma.

[Pridobite več informacij o preimenovanju omrežja "Eth2"](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Razmerje med nadgradnjami {#relationship-between-upgrades}

Vse nadgradnje Ethereuma so med seboj delno povezane. Povzemimo torej, kako spojitev vpliva na druge nadgradnje.

### Spojitev in oddajniška veriga {#merge-and-beacon-chain}

Spojitev predstavlja uradno dodajanje oddajniške verige kot nove plasti za doseganje soglasja izvirni izvajalni plasti glavnega omrežja. Od spojitve validatorji ščitijo Ethereumovo glavno omrežje, rudarjenje z mehanizmom [dokaza o delu](/developers/docs/consensus-mechanisms/pow/) pa ni več veljaven način ustvarjanja blokov.

Namesto tega bloke predlagajo validacijska vozlišča, ki so zastavila ETH v zameno za pravico, da sodelujejo pri sprejemanju soglasja. Te nadgradnje postavljajo temelje za prihodnje nadgradnje za širjenje omrežja, vključno z razdrobitvijo.

<ButtonLink href="/roadmap/beacon-chain/">
  Oddajniška veriga
</ButtonLink>

### Spojitev in nadgradnja Shanghai {#merge-and-shanghai}

Da bi poenostavila in se osredotočila na uspešen prehod na mehanizem dokaza o deležu, spojitev ni vključevala nekaterih pričakovanih funkcij, na primer možnosti dviga zastavljenega ETH. Spojitvi bo sledila nadgradnja Shanghai, ki bo zastavljavcem omogočila dvig teh sredstev.

Na tekočem lahko ostanete tako, da preberete članek [Težava z načrtovanjem nadgradnje Shanghai na GitHubu](https://github.com/ethereum/pm/issues/450) ali [Spletni dnevnik Ethereumove fundacije o raziskavah in razvoju](https://blog.ethereum.org/category/research-and-development/). Vsi bolj radovedni si lahko več pogledate v predstavitvi [Kaj se bo zgodilo po spojitvi](https://youtu.be/7ggwLccuN5s?t=101), ki jo je imel Vitalik na dogodku ETHGlobal aprila 2021.

### Spojitev in razdrobitev {#merge-and-data-sharding}

Začetni načrt je predvideval delo na razdrobitvi, s katero bi nadgradljivost naslovili pred spojitvijo. Z razcvetom [rešitev za nadgradljivost na podlagi tehnologije 2. plasti](/layer-2/) se je prioriteta preusmerila na menjavo mehanizma dokaza o delu z mehanizmom dokaza o deležu.

Načrti za razdrobitev se hitro spreminjajo, vendar so se s pojavom in uspehom tehnologij 2. plasti za nadgradnjo opravljanja transakcij preusmerili na iskanje najboljšega načina za porazdelitev bremena shranjevanja klicanih podatkov iz vseh pogodb, kar bi omogočilo eksponentno rast kapacitete omrežja. To ne bi bilo mogoče brez predhodnega prehoda na mehanizem dokaza o deležu.

<ButtonLink href="/roadmap/danksharding/">
  Razdrobitev
</ButtonLink>

## Nadaljnje branje {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
