---
title: "Síťová vrstva"
description: "Úvod do síťové vrstvy Etherea: jak uzly nacházejí peery a sdílejí bloky, transakce a atestace přes devp2p a libp2p."
lang: cs
sidebarDepth: 2
---

[Ethereum](/) je peer-to-peer síť s tisíci uzly, které spolu musí umět komunikovat pomocí standardizovaných protokolů. „Síťová vrstva“ je sada protokolů, které těmto uzlům umožňují se navzájem najít a vyměňovat si informace. To zahrnuje šíření informací pomocí gossip protokolu (komunikace jeden k mnoha) po síti, stejně jako výměnu požadavků a odpovědí mezi konkrétními uzly (komunikace jeden na jednoho). Každý uzel musí dodržovat specifická síťová pravidla, aby bylo zajištěno, že odesílá a přijímá správné informace.

Klientský software se skládá ze dvou částí (exekuční klienti a konsensuální klienti), z nichž každá má svůj vlastní odlišný síťový stack. Kromě komunikace s ostatními uzly Etherea musí exekuční a konsensuální klienti komunikovat i mezi sebou. Tato stránka poskytuje úvodní vysvětlení protokolů, které tuto komunikaci umožňují.

Exekuční klienti šíří transakce pomocí gossip protokolu přes peer-to-peer síť exekuční vrstvy. To vyžaduje šifrovanou komunikaci mezi ověřenými peery. Když je validátor vybrán jako navrhovatel bloku, transakce z lokálního transakčního poolu uzlu budou předány konsensuálním klientům přes lokální RPC připojení, které budou zabaleny do beacon bloků. Konsensuální klienti pak budou šířit beacon bloky pomocí gossip protokolu napříč svou p2p sítí. To vyžaduje dvě oddělené p2p sítě: jednu propojující exekuční klienty pro šíření transakcí a druhou propojující konsensuální klienty pro šíření bloků.

## Předpoklady {#prerequisites}

Pro pochopení této stránky bude užitečná určitá znalost [uzlů a klientů](/developers/docs/nodes-and-clients/) Etherea.

## Exekuční vrstva {#execution-layer}

Síťové protokoly exekuční vrstvy jsou rozděleny do dvou stacků:

- stack pro objevování: postavený nad UDP a umožňuje novému uzlu najít peery, ke kterým se může připojit

- stack devp2p: běží nad TCP a umožňuje uzlům vyměňovat si informace

Oba stacky fungují paralelně. Stack pro objevování přivádí do sítě nové účastníky a stack devp2p umožňuje jejich interakce.

### Objevování {#discovery}

Objevování je proces hledání dalších uzlů v síti. To je inicializováno pomocí malé sady zaváděcích uzlů (uzlů, jejichž adresy jsou [pevně zakódovány](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) v klientovi, takže je lze okamžitě najít a připojit klienta k peerům). Tyto zaváděcí uzly existují pouze proto, aby představily nový uzel skupině peerů – to je jejich jediný účel, neúčastní se běžných úkolů klienta, jako je synchronizace řetězce, a používají se pouze při úplně prvním spuštění klienta.

Protokol používaný pro interakce mezi uzlem a zaváděcím uzlem je upravená forma [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), která používá [distribuovanou hashovací tabulku](https://en.wikipedia.org/wiki/Distributed_hash_table) ke sdílení seznamů uzlů. Každý uzel má verzi této tabulky obsahující informace potřebné k připojení k jeho nejbližším peerům. Tato „blízkost“ není geografická – vzdálenost je definována podobností ID uzlu. Tabulka každého uzlu je pravidelně obnovována jako bezpečnostní prvek. Například v protokolu pro objevování [discv5](https://github.com/ethereum/devp2p/tree/master/discv5) mohou uzly také posílat „reklamy“, které zobrazují podprotokoly podporované klientem, což umožňuje peerům vyjednávat o protokolech, které mohou oba použít ke komunikaci.

Objevování začíná hrou PING-PONG. Úspěšný PING-PONG „sváže“ nový uzel se zaváděcím uzlem. Počáteční zpráva, která upozorní zaváděcí uzel na existenci nového uzlu vstupujícího do sítě, je `PING`. Tento `PING` obsahuje zahašované informace o novém uzlu, zaváděcím uzlu a časové razítko vypršení platnosti. Zaváděcí uzel přijme `PING` a vrátí `PONG` obsahující hash `PING`. Pokud se hashe `PING` a `PONG` shodují, pak je spojení mezi novým uzlem a zaváděcím uzlem ověřeno a říká se, že jsou „svázány“.

Jakmile jsou svázány, nový uzel může odeslat požadavek `FIND-NEIGHBOURS` zaváděcímu uzlu. Data vrácená zaváděcím uzlem zahrnují seznam peerů, ke kterým se nový uzel může připojit. Pokud uzly nejsou svázány, požadavek `FIND-NEIGHBOURS` selže, takže nový uzel nebude moci vstoupit do sítě.

Jakmile nový uzel obdrží od zaváděcího uzlu seznam sousedů, zahájí s každým z nich výměnu PING-PONG. Úspěšné PING-PONGy svážou nový uzel s jeho sousedy, což umožní výměnu zpráv.

```
start client --> connect to bootnode --> bond to bootnode --> find neighbours --> bond to neighbours
```

Exekuční klienti v současnosti používají protokol pro objevování [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) a probíhá aktivní snaha o migraci na protokol [discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Záznamy uzlů Etherea (Ethereum Node Records) {#enr}

[Záznam uzlu Etherea (ENR)](/developers/docs/networking-layer/network-addresses/) je objekt, který obsahuje tři základní prvky: podpis (hash obsahu záznamu vytvořený podle nějakého dohodnutého schématu identity), pořadové číslo, které sleduje změny záznamu, a libovolný seznam párů klíč:hodnota. Jedná se o formát odolný vůči budoucnosti, který umožňuje snadnější výměnu identifikačních informací mezi novými peery a je preferovaným formátem [síťové adresy](/developers/docs/networking-layer/network-addresses) pro uzly Etherea.

#### Proč je objevování postaveno na UDP? {#why-udp}

UDP nepodporuje žádnou kontrolu chyb, opětovné odesílání neúspěšných paketů ani dynamické otevírání a zavírání spojení – místo toho jen chrlí nepřetržitý proud informací na cíl, bez ohledu na to, zda je úspěšně přijat. Tato minimální funkcionalita se také promítá do minimální režie, díky čemuž je tento druh připojení velmi rychlý. Pro objevování, kde uzel jednoduše chce dát o sobě vědět, aby pak navázal formální spojení s peerem, je UDP dostačující. Pro zbytek síťového stacku však UDP není vhodné. Výměna informací mezi uzly je poměrně složitá, a proto potřebuje plnohodnotnější protokol, který dokáže podpořit opětovné odesílání, kontrolu chyb atd. Dodatečná režie spojená s TCP stojí za dodatečnou funkcionalitu. Proto většina P2P stacku funguje přes TCP.

### devp2p {#devp2p}

devp2p je sám o sobě celý stack protokolů, které Ethereum implementuje k vytvoření a udržování peer-to-peer sítě. Poté, co nové uzly vstoupí do sítě, se jejich interakce řídí protokoly ve stacku [devp2p](https://github.com/ethereum/devp2p). Všechny tyto protokoly běží nad TCP a zahrnují transportní protokol RLPx, wire protokol a několik podprotokolů. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) je protokol, který řídí zahajování, ověřování a udržování relací mezi uzly. RLPx kóduje zprávy pomocí rekurzivní předpony délky (RLP), což je velmi prostorově efektivní metoda kódování dat do minimální struktury pro odesílání mezi uzly.

Relace RLPx mezi dvěma uzly začíná počátečním kryptografickým handshake. To zahrnuje odeslání ověřovací zprávy uzlem, která je následně ověřena peerem. Při úspěšném ověření peer vygeneruje zprávu o potvrzení ověření, kterou vrátí iniciačnímu uzlu. Jedná se o proces výměny klíčů, který umožňuje uzlům komunikovat soukromě a bezpečně. Úspěšný kryptografický handshake pak spustí odeslání zprávy „hello“ oběma uzly navzájem „po drátě“ (on the wire). Wire protokol je iniciován úspěšnou výměnou zpráv hello.

Zprávy hello obsahují:

- verzi protokolu
- ID klienta
- port
- ID uzlu
- seznam podporovaných podprotokolů

Toto jsou informace potřebné pro úspěšnou interakci, protože definují, jaké schopnosti jsou sdíleny mezi oběma uzly, a konfigurují komunikaci. Existuje proces vyjednávání podprotokolů, kde se porovnávají seznamy podprotokolů podporovaných každým uzlem a ty, které jsou společné oběma uzlům, mohou být použity v relaci.

Spolu se zprávami hello může wire protokol také odeslat zprávu „disconnect“, která varuje peera, že spojení bude ukončeno. Wire protokol také zahrnuje zprávy PING a PONG, které se pravidelně odesílají, aby udržely relaci otevřenou. Výměny RLPx a wire protokolu proto vytvářejí základy komunikace mezi uzly a poskytují strukturu pro výměnu užitečných informací podle konkrétního podprotokolu.

### Podprotokoly {#sub-protocols}

#### Wire protokol {#wire-protocol}

Jakmile jsou peery připojeny a byla zahájena relace RLPx, wire protokol definuje, jak peery komunikují. Původně wire protokol definoval tři hlavní úkoly: synchronizaci řetězce, šíření bloku a výměnu transakcí. Jakmile však Ethereum přešlo na důkaz podílem (PoS), šíření bloku a synchronizace řetězce se staly součástí vrstvy konsensu. Výměna transakcí je stále v kompetenci exekučních klientů. Výměna transakcí označuje výměnu čekajících transakcí mezi uzly, aby tvůrci bloků mohli některé z nich vybrat pro zahrnutí do dalšího bloku. Podrobné informace o těchto úkolech jsou k dispozici [zde](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Klienti, kteří podporují tyto podprotokoly, je zpřístupňují prostřednictvím [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (lehký podprotokol Etherea) {#les}

Toto je minimální protokol pro synchronizaci lehkých klientů. Tradičně se tento protokol používal zřídka, protože plné uzly musí poskytovat data lehkým klientům bez jakékoliv motivace. Výchozím chováním exekučních klientů je neposkytovat data lehkých klientů přes les. Více informací je k dispozici ve [specifikaci](https://github.com/ethereum/devp2p/blob/master/caps/les.md) les.

#### Snap {#snap}

[Snap protokol](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) je volitelné rozšíření, které umožňuje peerům vyměňovat si snímky nedávných stavů, což umožňuje peerům ověřovat data účtů a úložišť, aniž by museli stahovat mezilehlé uzly Merkle trie.

#### Wit (protokol svědků) {#wit}

[Protokol svědků](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) je volitelné rozšíření, které umožňuje výměnu svědků stavu mezi peery, což pomáhá synchronizovat klienty na špičku řetězce.

#### Whisper {#whisper}

Whisper byl protokol, jehož cílem bylo poskytovat bezpečné zasílání zpráv mezi peery bez zápisu jakýchkoli informací na blockchain. Byl součástí wire protokolu devp2p, ale nyní je zastaralý. Existují další [související projekty](https://wakunetwork.com/) s podobnými cíli.

## Vrstva konsensu {#consensus-layer}

Konsensuální klienti se účastní oddělené peer-to-peer sítě s odlišnou specifikací. Konsensuální klienti se musí účastnit šíření bloků pomocí gossip protokolu, aby mohli přijímat nové bloky od peerů a vysílat je, když jsou na řadě jako navrhovatel bloku. Podobně jako u exekuční vrstvy to nejprve vyžaduje protokol pro objevování, aby uzel mohl najít peery a navázat bezpečné relace pro výměnu bloků, atestací atd.

### Objevování {#consensus-discovery}

Podobně jako exekuční klienti používají konsensuální klienti [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) přes UDP k hledání peerů. Implementace discv5 ve vrstvě konsensu se od implementace exekučních klientů liší pouze tím, že obsahuje adaptér připojující discv5 do stacku [libp2p](https://libp2p.io/), čímž nahrazuje devp2p. Relace RLPx exekuční vrstvy jsou nahrazeny ve prospěch handshake zabezpečeného kanálu noise z libp2p.

### ENR {#consensus-enr}

ENR pro konsensuální uzly zahrnuje veřejný klíč uzlu, IP adresu, UDP a TCP porty a dvě pole specifická pro konsensus: bitové pole podsítě atestací a klíč `eth2`. První z nich usnadňuje uzlům najít peery účastnící se specifických podsítí pro šíření atestací pomocí gossip protokolu. Klíč `eth2` obsahuje informace o tom, jakou verzi forku Etherea uzel používá, což zajišťuje, že se peery připojují ke správnému Ethereu.

### libp2p {#libp2p}

Stack libp2p podporuje veškerou komunikaci po objevování. Klienti mohou vytáčet a naslouchat na IPv4 a/nebo IPv6, jak je definováno v jejich ENR. Protokoly na vrstvě libp2p lze rozdělit do domén gossip a req/resp (požadavek/odpověď).

### Gossip {#gossip}

Doména gossip zahrnuje všechny informace, které se musí rychle šířit po celé síti. To zahrnuje beacon bloky, důkazy, atestace, odchody (exits) a penalizace (slashings). To se přenáší pomocí libp2p gossipsub v1 a spoléhá se na různá metadata uložená lokálně na každém uzlu, včetně maximální velikosti gossip payloadů pro příjem a přenos. Podrobné informace o doméně gossip jsou k dispozici [zde](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Požadavek-odpověď {#request-response}

Doména požadavek-odpověď obsahuje protokoly pro klienty požadující specifické informace od svých peerů. Příklady zahrnují vyžádání specifických beacon bloků odpovídajících určitým kořenovým hashům nebo v rámci rozsahu slotů. Odpovědi jsou vždy vráceny jako snappy-komprimované bajty kódované pomocí SSZ.

## Proč konsensuální klient preferuje SSZ před RLP? {#ssz-vs-rlp}

SSZ znamená jednoduchá serializace (simple serialization). Používá pevné offsety, které usnadňují dekódování jednotlivých částí zakódované zprávy, aniž by bylo nutné dekódovat celou strukturu, což je pro konsensuálního klienta velmi užitečné, protože může efektivně získávat specifické části informací ze zakódovaných zpráv. Je také navržen speciálně pro integraci s Merkle protokoly, se souvisejícím zvýšením efektivity pro merklerizaci. Vzhledem k tomu, že všechny hashe ve vrstvě konsensu jsou Merkle kořeny, představuje to významné zlepšení. SSZ také zaručuje jedinečné reprezentace hodnot.

## Propojení exekučních a konsensuálních klientů {#connecting-clients}

Konsensuální i exekuční klienti běží paralelně. Musí být propojeni, aby konsensuální klient mohl poskytovat instrukce exekučnímu klientovi a exekuční klient mohl předávat balíčky transakcí konsensuálnímu klientovi k zahrnutí do beacon bloků. Komunikace mezi oběma klienty může být dosažena pomocí lokálního RPC připojení. Rozhraní pro programování aplikací (API) známé jako [„Engine-API“](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) definuje instrukce odesílané mezi oběma klienty. Tito dva klienti nesdílejí síťovou identitu: každý má svůj vlastní klíč uzlu a svůj vlastní [záznam uzlu (ENR)](/developers/docs/networking-layer/network-addresses/) ve své vlastní peer-to-peer síti.

Shrnutí toku řízení je uvedeno níže, s příslušným síťovým stackem v závorkách.

### Když konsensuální klient není producentem bloku: {#when-consensus-client-is-not-block-producer}

- Konsensuální klient přijme blok prostřednictvím protokolu pro šíření bloku (konsensuální p2p)
- Konsensuální klient předběžně validuje blok, tj. zajistí, že dorazil od platného odesílatele se správnými metadaty
- Transakce v bloku jsou odeslány do exekuční vrstvy jako exekuční payload (lokální RPC připojení)
- Exekuční vrstva provede transakce a validuje stav v hlavičce bloku (tj. zkontroluje shodu hashů)
- Exekuční vrstva předá validační data zpět do vrstvy konsensu, blok je nyní považován za validovaný (lokální RPC připojení)
- Vrstva konsensu přidá blok na špičku svého vlastního blockchainu a atestuje jej, přičemž atestaci vysílá po síti (konsensuální p2p)

### Když je konsensuální klient producentem bloku: {#when-consensus-client-is-block-producer}

- Konsensuální klient ze své kopie beacon stavu zjistí, že jeden z jeho validátorů navrhuje další blok (není potřeba síť)
- Konsensuální klient zavolá `engine_forkchoiceUpdated` s atributy payloadu a požádá exekučního klienta, aby začal sestavovat blok (lokální RPC)
- Exekuční vrstva přistoupí k transakčnímu mempoolu, který byl naplněn protokolem pro šíření transakcí (exekuční p2p)
- Exekuční klient sbalí transakce do exekučního payloadu, provede transakce a vygeneruje hash bloku
- Konsensuální klient načte payload pomocí `engine_getPayload` a přidá jej do beacon bloku, který jeho validátor podepíše (lokální RPC)
- Konsensuální klient vysílá blok přes protokol pro šíření bloku (konsensuální p2p)
- Ostatní klienti přijmou navržený blok přes protokol pro šíření bloku a validují jej, jak je popsáno výše (konsensuální p2p)

Jakmile je blok atestován dostatečným počtem validátorů, je přidán na špičku řetězce, ospravedlněn a nakonec finalizován.

<NodeNetworksDiagram />

## Další čtení {#further-reading}

[devp2p](https://github.com/ethereum/devp2p)
[libp2p](https://github.com/libp2p/specs)
[Síťové specifikace vrstvy konsensu](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[Od Kademlia k discv5](https://vac.dev/kademlia-to-discv5)
[Dokument o Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Úvod do p2p Etherea](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Vztah Eth1/Eth2](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Video o detailech klienta pro The Merge a Eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
