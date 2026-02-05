---
title: "Síťová vrstva"
description: "Úvod do síťové vrstvy Etherea."
lang: cs
sidebarDepth: 2
---

Ethereum je peer-to-peer síť s tisíci uzly, které musí být schopny spolu komunikovat pomocí standardizovaných protokolů. "Síťová vrstva“ je vrstva protokolů, která umožňuje těmto uzlům se navzájem najít a vyměňovat si informace. To zahrnuje jak „gossiping“ informací (komunikaci jeden-k-mnohým) po síti, tak výměnu požadavků a odpovědí mezi konkrétními uzly (komunikace jeden na jednoho). Každý uzel musí dodržovat specifická síťová pravidla, aby zajistil, že odesílá a přijímá správné informace.

Klientský software má dvě části (exekuční klienty a konsensuální klienty), z nichž každá má vlastní specifickou síťovou vrstvu. Kromě komunikace s ostatními uzly Etherea musí exekuční a konsensuální klienti komunikovat mezi sebou. Tato stránka poskytuje úvodní vysvětlení protokolů, které umožňují tuto komunikaci.

Exekuční klienti šíří transakce po peer-to-peer síti exekuční vrstvy. To vyžaduje šifrovanou komunikaci mezi ověřenými peery. Když je validátor vybrán k návrhu bloku, transakce z místního transakčního poolu uzlu jsou předány konsensuálním klientům prostřednictvím lokálního RPC připojení, které je následně zabalí do Beacon bloků. Konsensuální klienti pak šíří Beacon bloky po své p2p síti. To vyžaduje dvě samostatné p2p sítě: Kednu pro propojení exekučních klientů pro gossiping transakcí a druhou pro propojení konsensuálních klientů pro gossiping bloků.

## Předpoklady {#prerequisites}

Některé znalosti o [uzlech a klientech](/developers/docs/nodes-and-clients/) sítě Ethereum budou užitečné pro pochopení této stránky.

## Exekuční vrstva {#execution-layer}

Síťové protokoly exekuční vrstvy jsou rozděleny do dvou skupin:

- vrstva pro objevování: postavená na protokolu UDP - umožňuje novému síťovému uzlu najít kolegy, ke kterým se může připojit

- vrstva DevP2P: běží na protokolu TCP a umožňuje uzlům vyměňovat si informace

Obě vrstvy fungují paralelně. Vrstva pro objevování přivádí do sítě nové účastníky, zatímco vrstva DevP2P umožňuje jejich interakce.

### Objevování {#discovery}

Objevování je proces hledání dalších uzlů v síti. Tento proces je zahájen pomocí malé sady bootnodů (uzlů, jejichž adresy jsou [pevně zakódovány](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) v klientovi, aby je bylo možné okamžitě najít a připojit klienta k peerům). Tyto bootnody existují pouze za účelem představení nového uzlu sadě kolegů - to je jejich jediný účel, neúčastní se normálních úkolů klienta, jako je synchronizace řetězce, a používají se pouze při prvním spuštění klienta.

Protokol používaný pro interakce mezi uzlem a bootnodem je upravenou formou [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), která používá [distribuovanou hašovací tabulku](https://en.wikipedia.org/wiki/Distributed_hash_table) ke sdílení seznamů uzlů. Každý uzel má verzi této tabulky obsahující informace potřebné k připojení k nejbližším kolegům. Tato „blízkost“ není geografická – vzdálenost je definována podobností ID uzlu. Tabulka každého uzlu je pravidelně obnovována jako bezpečnostní opatření. Například v protokolu pro objevování [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) mohou uzly také posílat „inzeráty“, které zobrazují subprotokoly, které klient podporuje, což umožňuje peerům vyjednávat o protokolech, které mohou oba použít ke vzájemné komunikaci.

Objevování začíná hrou PING-PONG. Úspěšné PING-PONG „spojí“ nový uzel s bootnodem. Počáteční zpráva, která upozorní bootnode na existenci nového uzlu vstupujícího do sítě, je `PING`. Tento `PING` obsahuje hašované informace o novém uzlu, bootnodu a časové razítko expirace. Bootnode obdrží `PING` a vrátí `PONG` obsahující haš zprávy `PING`. Pokud se haše `PING` a `PONG` shodují, je spojení mezi novým uzlem a bootnodem ověřeno a říká se, že jsou „propojeni“.

Po propojení může nový uzel poslat bootnodu požadavek `FIND-NEIGHBOURS`. Data vrácená bootnodem zahrnují seznam peerů, ke kterým se nový uzel může připojit. Pokud uzly nejsou propojeny, požadavek `FIND-NEIGHBOURS` selže a nový uzel tak nebude moci vstoupit do sítě.

Jakmile nový uzel obdrží seznam sousedů od bootnodu, zahájí s každým z nich výměnu PING-PONG. Úspěšné PING-PONGy spojují nový uzel s jeho sousedy a umožňují výměnu zpráv.

```
spustit klienta --> připojit se k bootnodu --> propojit se s bootnodem --> najít sousedy --> propojit se se sousedy
```

Exekuční klienti v současné době používají protokol pro objevování [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) a aktivně se pracuje na migraci na protokol [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Ethereum Node Records {#enr}

[Záznam o uzlu Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) je objekt, který obsahuje tři základní prvky: podpis (haš obsahu záznamu vytvořený podle dohodnutého schématu identity), pořadové číslo, které sleduje změny v záznamu, a libovolný seznam párů klíč:hodnota. Jedná se o formát, který je připraven na budoucnost a umožňuje snazší výměnu identifikačních informací mezi novými peery a je preferovaným formátem [síťové adresy](/developers/docs/networking-layer/network-addresses) pro uzly sítě Ethereum.

#### Proč je objevování postaveno na UDP? Proč UDP? {#why-udp}

UDP nepodporuje žádné kontrolní mechanismy chyb, opakované odesílání neúspěšných paketů ani dynamické otevírání a zavírání spojení – místo toho jen posílá nepřetržitý tok informací na cíl, bez ohledu na to, zda je úspěšně přijat. Tato minimální funkcionalita se také promítá do minimální režie, což činí tento typ spojení velmi rychlým. Pro objevování, kde uzel prostě chce oznámit svou přítomnost, aby pak mohl navázat formální spojení s peerem, je UDP dostačující. Pro zbytek síťové vrstvy však UDP není vhodné. Výměna informací mezi uzly je poměrně složitá a proto potřebuje plně vybavený protokol, který podporuje opakované odesílání, kontrolu chyb atd. Dodatečná režie spojená s TCP stojí za tuto dodatečnou funkcionalitu. Proto většina P2P stacku funguje přes TCP.

### DevP2P {#devp2p}

DevP2P je sada protokolů, které Ethereum implementuje k vytvoření a udržování peer-to-peer sítě. Poté, co nové uzly vstoupí do sítě, jsou jejich interakce řízeny protokoly ve stacku [DevP2P](https://github.com/ethereum/devp2p). Ty všechny běží na protokolu TCP a zahrnují transportní protokol RLPx, wire protokol a několik subprotokolů. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) je protokol, který řídí navazování, autentizaci a udržování relací mezi uzly. RLPx kóduje zprávy pomocí RLP (Recursive Length Prefix), což je velmi prostorově úsporná metoda kódování dat do minimální struktury pro odesílání mezi uzly.

Relace RLPx mezi dvěma uzly začíná úvodním kryptografickým "podáním ruky". To zahrnuje uzel, který odesílá ověřovací zprávu, která je následně ověřena peerem. Při úspěšném ověření peer generuje ověřovací zprávu, kterou vrátí iniciátorskému uzlu. Toto je proces výměny klíčů, který umožňuje uzlům komunikovat soukromě a bezpečně. Úspěšné kryptografické podání ruky poté spustí oba uzly, aby si mezi sebou "na drátu" poslaly zprávu "hello". Wire protokol je zahájen úspěšnou výměnou zprávy "hello".

Zprávy hello obsahují:

- verzi protokolu
- ID klienta
- port
- ID uzlu
- seznam podporovaných subprotokolů

Toto jsou informace potřebné pro úspěšnou interakci, protože definují, jaké schopnosti jsou sdíleny mezi oběma uzly, a konfigurují komunikaci. Tak probíhá proces vyjednávání subprotokolů, kde jsou porovnávány seznamy subprotokolů podporovaných každým uzlem a ty, které jsou společné oběma uzlům, mohou být použity v relaci.

Spolu se zprávami hello může wire protokol také odeslat zprávu "disconnect", která upozorní kolegu, že spojení bude uzavřeno. Wire protokol také zahrnuje zprávy PING a PONG, které jsou pravidelně odesílány k udržení otevřené relace. Výměny RLPx a wire protokolu tedy vytvářejí základy komunikace mezi uzly a poskytují rámec pro výměnu užitečných informací podle specifického subprotokolu.

### Subprotokoly {#sub-protocols}

#### Wire protokol {#wire-protocol}

Jakmile jsou peery připojeny a relace RLPx je spuštěna, wire protokol definuje, jakým způsobem peery komunikují. Původně wire protokol definoval tři hlavní úkoly: synchronizaci řetězce, šíření bloků a výměnu transakcí. Nicméně, jakmile Ethereum přešlo na proof of stake, šíření bloků a synchronizace řetězce se staly součástí konsensuální vrstvy. Výměna transakcí však stále spadá do působnosti exekučních klientů. Výměna transakcí se týká výměny nevyřízených transakcí mezi uzly, aby blokoví producenti mohli vybrat některé z nich k zařazení do dalšího bloku. Podrobné informace o těchto úkolech jsou k dispozici [zde](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Klienti, kteří tyto subprotokoly podporují, je zpřístupňují prostřednictvím [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (light Ethereum subprotocol) {#les}

Toto je minimální protokol pro synchronizaci jednoduchých uzlů. Tradičně byl tento protokol zřídka používán, protože úplné uzly jsou požadovány k poskytování dat jednoduchým uzlům bez pobídek. Výchozí chování exekučních klientů je neposkytovat data jednoduchým uzlům přes "les". Více informací je k dispozici ve [specifikaci](https://github.com/ethereum/devp2p/blob/master/caps/les.md) protokolu les.

#### Snap {#snap}

[Protokol snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) je volitelné rozšíření, které umožňuje peerům vyměňovat si snímky nedávných stavů, což peerům umožňuje ověřovat data účtu a úložiště bez nutnosti stahovat mezilehlé uzly Merkle trie.

#### Wit (witness protocol) {#wit}

[Protokol witness](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) je volitelné rozšíření, které umožňuje výměnu stavových svědků mezi peery a pomáhá synchronizovat klienty na nejnovější blok řetězce.

#### Whisper {#whisper}

Whisper byl protokol, který měl za cíl poskytovat bezpečné zprávy mezi peery, aniž by zapisoval jakékoli informace na blockchain. Byl součástí wire protokolu DevP2P, ale nyní je zastaralý. Existují i další [související projekty](https://wakunetwork.com/) s podobnými cíli.

## Konsensuální vrstva {#consensus-layer}

Konsensuální klienti se účastní samostatné peer-to-peer sítě s odlišnou specifikací. Konsensuální klienti se potřebují účastnit gossipu bloků, aby mohli přijímat nové bloky od kolegů a šířit je, když jsou na řadě v nahrhování bloku. Podobně jako u exekuční vrstvy, toto nejprve vyžaduje objevovací protokol, aby uzel mohl najít peery a vytvořit zabezpečené relace pro výměnu bloků, potvrzení atd.

### Objevování {#consensus-discovery}

Podobně jako exekuční klienti používají i konsensuální klienti pro vyhledávání peerů protokol [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) přes UDP. Implementace protokolu discv5 na konsensuální vrstvě se liší od implementace exekučních klientů pouze v tom, že obsahuje adaptér propojující discv5 se stackem [libP2P](https://libp2p.io/), čímž se DevP2P stává zastaralým. RLPx relace v exekuční vrstvě jsou nahrazeny zabezpečeným kanálem libP2P noise.

### ENR {#consensus-enr}

ENR pro konsensuální uzly obsahuje veřejný klíč uzlu, IP adresu, porty UDP a TCP a dvě pole specifická pro konsensus: bitové pole atestačního subnetu a klíč `eth2`. První z nich usnadňuje uzlům najít peery účastnící se specifických gossip subnetů pro potvrzení. Klíč `eth2` obsahuje informace o tom, jakou verzi větve (fork) Etherea uzel používá, což zajišťuje, že se peery připojují ke správnému Ethereu.

### libP2P {#libp2p}

LibP2P stack podporuje veškerou komunikaci po objevení. Klienti mohou volat a poslouchat na IPv4 a/nebo IPv6, jak je definováno v jejich ENR. Protokoly na vrstvě libP2P mohou být rozděleny do domén gossip a req/resp.

### Gossip {#gossip}

Doména gossip zahrnuje veškeré informace, které musí být rychle rozšířeny po síti. To zahrnuje beacon bloky, důkazy, potvrzení, výstupy a penalty. Toto je přenášeno pomocí libP2P gossipsub v1 a spoléhá na různá metadata, která jsou lokálně uložena na každém uzlu, včetně maximální velikosti gossip payloadů k přijímání a přenosu. Podrobné informace o gossip doméně jsou k dispozici [zde](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Požadavek–odpověď {#request-response}

Doména request-response obsahuje protokoly, které umožňují klientům požadovat specifické informace od svých kolegů. Příklady zahrnují žádosti o konkrétní Beacon bloky, které odpovídají určitým kořenovým hashům nebo jsou v rozmezí určitých slotů. Odpovědi jsou vždy vráceny jako snappy-komprimované SSZ zakódované bajty.

## Proč dává konsensuální klient přednost SSZ před RLP? {#ssz-vs-rlp}

SSZ znamená simple serialization (jednoduchá serializace). Používá pevné offsety, které usnadňují dekódování jednotlivých částí zakódované zprávy, aniž by bylo nutné dekódovat celou strukturu, což je pro konsensuálního klienta velmi užitečné, protože umožňuje efektivně vyzvednout specifické části informací ze zakódovaných zpráv. SSZ je také navrženo speciálně pro integraci s Merkle protokoly, což přináší související zisky v efektivitě merkleizace. Vzhledem k tomu, že všechny hashe v konsensuální vrstvě jsou Merkle kořeny, jedná se o významné zlepšení. SSZ také zaručuje jedinečné reprezentace hodnot.

## Propojení exekučních a konsensuálních klientů {#connecting-clients}

Konsensuální i exekuční klienti běží paralelně. Potřebují být propojeni tak, aby konsensuální klient mohl poskytovat pokyny exekučnímu klientovi a exekuční klient mohl předávat balíky transakcí konsensuálnímu klientovi k zařazení do Beacon bloků. Komunikace mezi těmito dvěma klienty může být realizována pomocí lokálního RPC spojení. API známé jako ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) definuje instrukce posílané mezi těmito dvěma klienty. Vzhledem k tomu, že oba klienti fungují pod jednou síťovou identitou, sdílejí jeden ENR (Ethereum node record), který obsahuje samostatný klíč pro každého klienta (eth1 klíč a eth2 klíč).

Souhrn toku řízení je uveden níže, s relevantní síťovou vrstvou v závorkách.

### Když konsensuální klient není producentem bloku: {#when-consensus-client-is-not-block-producer}

- Konsensuální klient přijme blok prostřednictvím block gossip protokolu (konsensuální p2p)
- Konsensuální klient předběžně validuje blok, tj. zajišťuje, že přišel od platného odesílatele se správnými metadaty.
- Transakce v bloku jsou odeslány do exekuční vrstvy jako exekuční payload (lokální RPC spojení)
- Exekuční vrstva provede transakce a zvaliduje stav v hlavičce bloku (tj. zkontroluje, zda se shodují haše).
- Exekuční vrstva předává validační data zpět konsensuální vrstvě, blok je nyní považován za validovaný (lokální RPC spojení)
- Konsensuální vrstva přidá blok na svéůj vlastní blockchain a potvrzuje ho, přičemž vysílá potvrzení po síti (konsensuální p2p)

### Když je konsensuální klient producentem bloku: {#when-consensus-client-is-block-producer}

- Konsensuální klient dostane oznámení, že je dalším producentem bloku (konsensuální p2p)
- Konsensuální vrstva volá metodu `create block` v exekučním klientovi (místní RPC).
- Exekuční vrstva přistupuje k transakčnímu mempoolu, který byl naplněn prostřednictvím transakčního gossip protokolu (exekuční p2p)
- Exekuční klient shromažďuje transakce do bloku, provádí transakce a generuje hash bloku
- Konsensuální klient uchopí transakce a hash bloku od exekučního klienta a přidá je do beacon bloku (lokální RPC)
- Konsensuální klient vysílá blok prostřednictvím block gossip protokolu (konsensuální p2p)
- Ostatní klienti přijímají navržený blok prostřednictvím block gossip protokolu a validují ho, jak je popsáno výše (konsensuální p2p)

Jakmile je blok potvrzen dostatečným počtem validátorů, je přidán na hlavu řetězce, ospravedlněn a nakonec finalizován.

![](cons_client_net_layer.png)\n![](exe_client_net_layer.png)

Schéma síťové vrstvy pro konsensuální a exekuční klienty, z [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Další čtení {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)\n[LibP2p](https://github.com/libp2p/specs)\n[Specifikace sítě konsensuální vrstvy](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)\n[Od Kademlia k Discv5](https://vac.dev/kademlia-to-discv5)\n[Článek o Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)\n[Úvod do P2P sítě Etherea](https://p2p.paris/en/talks/intro-ethereum-networking/)\n[Vztah eth1/eth2](http://ethresear.ch/t/eth1-eth2-client-relationship/7248)\n[Video s podrobnostmi o klientech pro sloučení a eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
