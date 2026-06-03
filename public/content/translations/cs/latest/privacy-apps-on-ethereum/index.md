---
title: "Jak budovat aplikace pro soukromí na Ethereu pomocí důkazů s nulovou znalostí"
description: "Jeden znovupoužitelný vzor pohání anonymní hlasování, mixéry, airdropy a systémy členství na Ethereu. Poznejte cyklus závazek-nulifikátor-důkaz a zjistěte, jak nástroje s nulovým vědomím umožňují jejich praktické budování již dnes."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "důkazy s nulovou znalostí"
  - "soukromí"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: "Aplikace pro soukromí na Ethereu"
lang: cs
---

Ethereum je ze své podstaty radikálně veřejné. Každá adresa, zůstatek, transakce, volání kontraktu a událost je viditelná pro kohokoli s prohlížečem bloků. Tato transparentnost je užitečná, když chcete ověřitelnost. Je to však problém, když uživatelé potřebují hlasovat, uplatnit nárok, provést výběr nebo prokázat členství, aniž by každou akci spojili se stejnou peněženkou.

Anonymní členství je znovupoužitelný vzor, který pohání velkou třídu aplikací pro soukromí na Ethereu. Lidé se nejprve zaregistrují a později prokážou, že patří do skupiny, aniž by odhalili, kterým členem jsou. Důkaz s nulovou znalostí je most mezi registrační peněženkou a jednající peněženkou a tento most neprozrazuje, kdo jej přešel.

Okolní produkt se mění, ale kostra soukromí zůstává stejná.

## Vzor vysvětlený na anonymním hlasování {#the-pattern-explained-through-anonymous-voting}

Vzor má tři části. Závazek registruje každého člena. Merkleův strom mění tyto závazky v dav. Důkaz a nulifikátor umožňují jednomu členovi jednat jednou, aniž by odhalili, který člen jednal.

### Krok první: registrace {#step-one-registering}

Každý volič vytvoří offchain dvě soukromé hodnoty, tajemství a nulifikátor. Volič tyto hodnoty zahashuje do veřejného závazku a poté tento závazek zaregistruje onchain.

Závazek je veřejný registrační záznam. Tajemství a nulifikátor tvoří soukromou poznámku, kterou volič potřebuje později. Pokud poznámku ztratí, volič nemůže prokázat členství. Pokud unikne, někdo jiný může být schopen hlasovat na místě uživatele.

Protože závazek je hash, pozorovatelé nemohou obnovit soukromé hodnoty uvnitř něj. Závazek říká „někdo se zaregistroval“, aniž by odhalil, kdo tuto registraci později použije.

### Krok druhý: budování davu {#step-two-building-the-crowd}

Jak se registruje více voličů, aplikace shromažďuje jejich závazky do Merkleova stromu. Merkleův strom komprimuje dlouhý seznam hodnot do jediného hashe, zvaného kořen. Změňte jakoukoli hodnotu v seznamu a hash se změní, takže kořen funguje jako shrnutí celé sady, které je odolné proti neoprávněné manipulaci.

Tento strom je vaše množina anonymity. Pokud je ve stromu deset uživatelů, pozorovatel může pozdější akci zúžit na jednoho z těchto deseti. Pokud je ve stromu deset tisíc uživatelů, je mnohem těžší spojit akci s jednou osobou. Soukromá aplikace s malou množinou anonymity obvykle není příliš soukromá, i když je kryptografie správná.

### Krok třetí: anonymní jednání {#step-three-acting-anonymously}

Když se hlasování otevře, volič by neměl hlasovat ze stejné peněženky, která zaregistrovala závazek. Hlasování z registrační peněženky by spojilo hlas přímo s registrujícím a zničilo by práci na soukromí. Místo toho volič vytvoří důkaz s nulovou znalostí. Tvrzení je zakódováno jako obvod, který říká: „Znám soukromé hodnoty, které vytvářejí registrovaný závazek, a odhaluji správný hash nulifikátoru pro toto hlasování.“

Důkaz přesvědčí kontrakt ověřovatele, že tvrzení je pravdivé. Neodhaluje tajemství, nulifikátor ani to, který závazek byl použit.

Nulifikátor je to, co zabraňuje dvojímu hlasování. Spolu s důkazem volič zveřejní hash nulifikátoru. Hlasovací kontrakt tento hash po přijetí hlasu uloží. Pokud je stejná soukromá poznámka použita znovu pro stejné hlasování, vytvoří stejný hash nulifikátoru a kontrakt druhý hlas odmítne. V kombinaci s důkazem to znamená, že kontrakt ví pouze to, že nějaký registrovaný volič jednal jednou, nikoli který.

## Znovupoužitelná brána {#the-reusable-gate}

Stejný pár důkazu a nulifikátoru funguje i mimo hlasování. Odstraňte příběh o hlasování a to, co získáte, je brána soukromí pro funkce chytrého kontraktu.

Než se funkce spustí, kontrakt zkontroluje Merkleho kořen, ověří důkaz, potvrdí, že hash nulifikátoru nebyl použit, a sváže veřejné vstupy se správnou aplikací, řetězcem, hlasováním, nárokem nebo výběrem. Pokud tyto kontroly projdou, označí nulifikátor jako použitý a spustí zbytek funkce.

Dejte tuto bránu před hlas a získáte anonymní hlasování. Dejte ji před nárok na airdrop a získáte anonymní nároky. Dejte ji před funkci výběru a získáte jádro toku výběru ve stylu mixéru. Stejný strom závazků, stejná myšlenka nulifikátoru, stejný vzor důkazu. To, co se mění, je tělo funkce a okolní logika aplikace.

## Co běží kde {#what-runs-where}

Soukromá práce obvykle probíhá offchain. Uživatel uloží poznámku a klientská aplikace sestaví svědka a spustí dokazovatele, aby vytvořil důkaz. Indexer sleduje závazky a Merkleho kořeny. Bundler propaguje uživatelskou operaci (UserOperation) onchain a paymaster ERC-4337 sponzoruje gas, takže nová peněženka nepotřebuje nejprve ETH ze známé peněženky uživatele.

Veřejné vynucování probíhá onchain. Kontrakt ověřovatele kontroluje důkaz. Kontrakt aplikace kontroluje platné kořeny a nepoužité nulifikátory, ukládá hash nulifikátoru a spouští veřejnou akci.

Citlivou součástí uživatelské zkušenosti (UX) je manipulace s poznámkou. Zacházejte s tajemstvím a nulifikátorem jako s klíči. Nevkládejte je do analytiky, logů, URL adres, chybových hlášení nebo běžné telemetrie na straně serveru. Jakmile poznámka unikne, soukromí je pryč, bez ohledu na to, jak silný je důkaz.

## Nástroje to dohnaly {#the-tooling-caught-up}

Nemusíte ručně kódovat základní kryptografii. Běžnou cestou je napsat obvod ve vysokoúrovňovovém jazyce s nulovým vědomím, vygenerovat ověřovatele v Solidity a zavolat tohoto ověřovatele z kontraktu aplikace.

Správný technologický stack závisí na daném úkolu. Circom se snarkjs je dlouhodobě zavedenou cestou pro obvody na úrovni aplikací. Noir s Barretenbergem je novější cesta přátelská k vývojářům. Halo2 a gnark jsou nízkoúrovňové knihovny obvodů. zkVM, jako jsou RISC Zero nebo SP1, dokazují běžné programy, ale jejich dokazování může být dražší než u malého vlastního obvodu.

Pro anonymní členství sáhněte po existujícím protokolu, než začnete psát vlastní obvod. Semaphore balí skupinové členství a prevenci dvojího použití založenou na nulifikátoru do kontraktů a knihoven v JavaScriptu. Pro soukromé hlasování a správu je MACI specializovanou cestou, protože přidává vlastnosti proti tajným dohodám. Zralé protokoly jsou často bezpečnější než nové obvody.

## Důkaz nestačí {#the-proof-is-not-enough}

Dokonce i dokonalý důkaz selže, pokud tok peněženky prozradí spojení. Zaregistrujte se z peněženky A a později jednejte z peněženky A, a kdokoli, kdo to sleduje, může tyto transakce propojit. Zafinancujte peněženku B z peněženky A těsně před jednáním a tato financující transakce vytvoří stejný problém.

Proto jsou bundlery a paymasteři důležití. Jednající peněženka by měla být nová a neměla by potřebovat přijímat ETH z peněženky, kterou se uživatel snaží od akce oddělit.

Stejný problém existuje i offchain. Odeslání registračních a akčních transakcí ze stejné IP adresy, poskytovatele RPC nebo relace může oslabit soukromí, které obvod poskytuje. Frontendy mohou unikat prostřednictvím analytiky, lokálního úložiště a logů podpory. Důkaz s nulovou znalostí skrývá hodnoty uvnitř důkazu. Neskrývá vše kolem transakce.

Veřejné vstupy jsou dalším místem, kde aplikace pro soukromí selhávají. Cokoli označené v obvodu jako veřejné, emitované jako událost, zahrnuté v datech volání (calldata) nebo uložené kontraktem, je viditelné. Kontrolujte veřejné vstupy stejně pečlivě jako řízení přístupu u kontraktu v Solidity.

## Co to mění pro tvůrce {#what-this-changes-for-builders}

Soukromí na Ethereu je připravené k nasazení. Tvůrci mohou tyto kousky skládat do skutečných aplikací. Technologický stack tvoří obvod pro soukromé tvrzení, ověřovatel pro kontrolu důkazu, kontrakt aplikace pro veřejná pravidla, indexer pro Merkleho data a bundler plus paymaster pro nepropojitelné odeslání a sponzorování gasu.

Těžkými částmi jsou návrh produktu, správa klíčů, hygiena metadat, audity a rozšiřování množiny anonymity. Pokud cokoli z toho uděláte špatně, soukromí, které důkaz poskytl, je pryč.

## Další čtení {#further-reading}

1. [Důkazy s nulovou znalostí (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Dokumentace Semaphore](https://docs.semaphore.pse.dev/)
3. [Dokumentace MACI](https://maci.pse.dev/)
4. [Dokumentace Circom](https://docs.circom.io/)
5. [Dokumentace Noir](https://noir-lang.org/)
6. [Kniha Halo2](https://zcash.github.io/halo2/)
7. [Dokumentace gnark](https://docs.gnark.consensys.io/)
8. [Dokumentace RISC Zero](https://dev.risczero.com/api/)
9. [Dokumentace SP1](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: Abstrakce účtu přes kontrakt EntryPoint](https://eips.ethereum.org/EIPS/eip-4337)