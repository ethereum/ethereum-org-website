---
title: "Návrh bloku"
description: "Vysvětlení, jak jsou navrhovány bloky v Ethereu s důkazem podílem (PoS)."
lang: cs
---

Bloky jsou základními jednotkami blockchainu. Bloky jsou diskrétní jednotky informací, které se předávají mezi uzly, je na nich dosaženo shody a jsou přidány do databáze každého uzlu. Tato stránka vysvětluje, jak se vytvářejí.

## Předpoklady {#prerequisites}

Návrh bloku je součástí protokolu důkazu podílem (PoS). Pro lepší pochopení této stránky doporučujeme přečíst si o [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/) a [architektuře bloku](/developers/docs/blocks/).

## Kdo vytváří bloky? {#who-produces-blocks}

Účty validátorů navrhují bloky. Účty validátorů spravují provozovatelé uzlů, kteří spouštějí software validátoru jako součást svých exekučních klientů a klientů vrstvy konsensu a vložili alespoň 32 ETH do depozitního kontraktu. Každý validátor je však za návrh bloku zodpovědný pouze občas. [Ethereum](/) měří čas ve slotech a epochách. Každý slot trvá dvanáct sekund a 32 slotů (6,4 minuty) tvoří epochu. Každý slot představuje příležitost přidat do Etherea nový blok.

### Náhodný výběr {#random-selection}

V každém slotu je pseudonáhodně vybrán jeden validátor, aby navrhl blok. V blockchainu neexistuje nic jako skutečná náhodnost, protože kdyby každý uzel generoval skutečně náhodná čísla, nemohly by dojít ke konsensu. Místo toho je cílem učinit proces výběru validátoru nepředvídatelným. Náhodnosti se na Ethereu dosahuje pomocí algoritmu zvaného RANDAO, který míchá hash od navrhovatele bloku se seedem, který se aktualizuje s každým blokem. Tato hodnota se používá k výběru konkrétního validátoru z celkové sady validátorů. Výběr validátoru je pevně stanoven dvě epochy předem jako způsob ochrany proti určitým druhům manipulace se seedem.

Ačkoli validátoři přidávají do RANDAO v každém slotu, globální hodnota RANDAO se aktualizuje pouze jednou za epochu. Pro výpočet indexu dalšího navrhovatele bloku se hodnota RANDAO smíchá s číslem slotu, čímž vznikne jedinečná hodnota v každém slotu. Pravděpodobnost výběru jednotlivého validátoru není jednoduše `1/N` (kde `N` = celkový počet aktivních validátorů). Místo toho je vážena efektivním zůstatkem ETH každého validátoru. Maximální efektivní zůstatek je 32 ETH (to znamená, že `balance < 32 ETH` vede k nižší váze než `balance == 32 ETH`, ale `balance > 32 ETH` nevede k vyšší váze než `balance == 32 ETH`).

V každém slotu je vybrán pouze jeden navrhovatel bloku. Za normálních podmínek vytvoří a vydá jeden tvůrce bloku jeden blok ve svém vyhrazeném slotu. Vytvoření dvou bloků pro stejný slot je přestupek, za který hrozí penalizace, často známý jako „ekvivokace“.

## Jak se blok vytváří? {#how-is-a-block-created}

Očekává se, že navrhovatel bloku odvysílá podepsaný beacon blok, který staví na nejnovější hlavičce řetězce podle pohledu jeho vlastního lokálně spuštěného algoritmu volby forku. Algoritmus volby forku aplikuje všechny atestace ve frontě, které zbyly z předchozího slotu, a poté najde blok s největší akumulovanou váhou atestací ve své historii. Tento blok je rodičem nového bloku vytvořeného navrhovatelem.

Navrhovatel bloku vytvoří blok shromážděním dat ze své vlastní lokální databáze a pohledu na řetězec. Obsah bloku je zobrazen v úryvku níže:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Pole `randao_reveal` přijímá ověřitelnou náhodnou hodnotu, kterou navrhovatel bloku vytvoří podepsáním čísla aktuální epochy. `eth1_data` je hlas pro pohled navrhovatele bloku na depozitní kontrakt, včetně kořene depozitní Merkleovy trie a celkového počtu vkladů, které umožňují ověření nových vkladů. `graffiti` je volitelné pole, které lze použít k přidání zprávy do bloku. `proposer_slashings` a `attester_slashings` jsou pole, která obsahují důkaz, že se určití validátoři dopustili přestupků, za které hrozí penalizace, podle pohledu navrhovatele na řetězec. `deposits` je seznam nových vkladů validátorů, o kterých navrhovatel bloku ví, a `voluntary_exits` je seznam validátorů, kteří si přejí provést výstup, o kterých navrhovatel bloku slyšel v gossip síti vrstvy konsensu. `sync_aggregate` je vektor ukazující, kteří validátoři byli dříve přiřazeni do synchronizační komise (podmnožina validátorů, kteří poskytují data pro lehké klienty) a podíleli se na podepisování dat.

`execution_payload` umožňuje předávání informací o transakcích mezi exekučními klienty a klienty vrstvy konsensu. `execution_payload` je blok exekučních dat, který je vnořen do beacon bloku. Pole uvnitř `execution_payload` odrážejí strukturu bloku nastíněnou v dokumentu Ethereum yellow paper, s tou výjimkou, že zde nejsou žádné ommery a `prev_randao` existuje místo `difficulty`. Exekuční klient má přístup k lokálnímu poolu transakcí, o kterých slyšel ve své vlastní gossip síti. Tyto transakce jsou lokálně provedeny, aby vygenerovaly aktualizovanou stavovou trii známou jako post-stav. Transakce jsou zahrnuty v `execution_payload` jako seznam nazvaný `transactions` a post-stav je poskytnut v poli `state-root`.

Všechna tato data jsou shromážděna v beacon bloku, podepsána a odvysílána peerům navrhovatele bloku, kteří je šíří dále svým peerům atd.

Přečtěte si více o [anatomii bloků](/developers/docs/blocks).

## Co se stane s blokem? {#what-happens-to-blocks}

Blok je přidán do lokální databáze navrhovatele bloku a odvysílán peerům přes gossip síť vrstvy konsensu. Když validátor obdrží blok, ověří data v něm, včetně kontroly, zda má blok správného rodiče, odpovídá správnému slotu, zda je index navrhovatele očekávaný, zda je odhalení RANDAO platné a zda navrhovatel nebyl penalizován. `execution_payload` je rozbalen a exekuční klient validátoru znovu provede transakce v seznamu, aby zkontroloval navrhovanou změnu stavu. Za předpokladu, že blok projde všemi těmito kontrolami, každý validátor přidá blok do svého vlastního kanonického řetězce. Proces pak začíná znovu v dalším slotu.

## Odměny za blok {#block-rewards}

Navrhovatel bloku dostává za svou práci zaplaceno. Existuje `base_reward` vypočítaná jako funkce počtu aktivních validátorů a jejich efektivních zůstatků. Navrhovatel bloku pak obdrží zlomek `base_reward` za každou platnou atestaci zahrnutou v bloku; čím více validátorů atestuje blok, tím větší je odměna navrhovatele bloku. Existuje také odměna za nahlášení validátorů, kteří by měli být penalizováni, rovnající se `1/512 * effective balance` za každého penalizovaného validátora.

[Více o odměnách a penalizacích](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Další čtení {#further-reading}

- [Úvod do bloků](/developers/docs/blocks/)
- [Úvod do důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Specifikace konsensu Etherea](https://github.com/ethereum/consensus-specs)
- [Úvod do Gasperu](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Aktualizace Etherea](https://eth2book.info/)