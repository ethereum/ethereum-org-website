---
title: "Návrh bloku"
description: "Vysvětlení, jak se navrhují bloky v síti Ethereum s mechanismem konsensu důkaz podílem."
lang: cs
---

Bloky jsou základní jednotky blockchainu. Bloky jsou samostatné jednotky informací, které se předávají mezi uzly, odsouhlasují se a přidávají se do databáze každého uzlu. Tato stránka vysvětluje, jak se vytvářejí.

## Předpoklady {#prerequisites}

Navrhování bloků je součástí protokolu důkaz podílem. Pro lepší pochopení této stránky doporučujeme přečíst si o [důkazu podílem](/developers/docs/consensus-mechanisms/pos/) a [architektuře bloků](/developers/docs/blocks/).

## Kdo vytváří bloky? {#who-produces-blocks}

Bloky navrhují účty validátorů. Účty validátorů spravují operátoři uzlů, kteří provozují software validátorů jako součást svých exekučních a konsensuálních klientů a kteří vložili alespoň 32 ETH do smlouvy o vkladu. Každý validátor je však za navržení bloku zodpovědný jen příležitostně. Ethereum měří čas ve slotech a epochách. Každý slot trvá dvanáct sekund a 32 slotů (6,4 minuty) tvoří jednu epochu. Každý slot je příležitostí přidat do sítě Ethereum nový blok.

### Náhodný výběr {#random-selection}

V každém slotu je pseudonáhodně vybrán jeden validátor, který navrhne blok. V blockchainu neexistuje skutečná náhodnost, protože kdyby každý uzel generoval skutečně náhodná čísla, nemohly by dospět ke konsensu. Cílem je naopak učinit proces výběru validátorů nepředvídatelným. Náhodnosti se v síti Ethereum dosahuje pomocí algoritmu RANDAO, který smíchá haš od navrhovatele bloku se seedem, který se aktualizuje s každým blokem. Tato hodnota se používá k výběru konkrétního validátora z celkové sady validátorů. Výběr validátora je stanoven dvě epochy předem, aby se zabránilo určitým druhům manipulace se seedem.

Ačkoli validátoři přispívají do RANDAO v každém slotu, globální hodnota RANDAO se aktualizuje pouze jednou za epochu. Pro výpočet indexu dalšího navrhovatele bloku se hodnota RANDAO smíchá s číslem slotu, aby v každém slotu vznikla jedinečná hodnota. Pravděpodobnost výběru jednotlivého validátora není pouze `1/N` (kde `N` = celkový počet aktivních validátorů). Místo toho je vážena efektivním zůstatkem ETH každého validátora. Maximální efektivní zůstatek je 32 ETH (to znamená, že `zůstatek < 32 ETH` vede k nižší váze než `zůstatek == 32 ETH`, ale `zůstatek > 32 ETH` nevede k vyšší váze než `zůstatek == 32 ETH`).

V každém slotu je vybrán pouze jeden navrhovatel bloku. Za normálních podmínek vytvoří a vydá jeden tvůrce bloku jeden blok ve svém vyhrazeném slotu. Vytvoření dvou bloků pro stejný slot je přestupek, za který hrozí trest (tzv. slashing), často známý jako „ekvivokace“.

## Jak se blok vytváří? {#how-is-a-block-created}

Očekává se, že navrhovatel bloku bude vysílat podepsaný beacon blok, který navazuje na nejnovější hlavu řetězce podle pohledu jeho vlastního lokálně spuštěného algoritmu pro výběr větve. Algoritmus pro výběr větve použije všechny atestace ve frontě z předchozího slotu a poté najde blok s největší kumulovanou váhou atestací ve své historii. Tento blok je rodičem nového bloku vytvořeného navrhovatelem.

Navrhovatel bloku vytváří blok shromažďováním dat z vlastní lokální databáze a pohledu na řetězec. Obsah bloku je uveden v úryvku níže:

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

Pole `randao_reveal` obsahuje ověřitelnou náhodnou hodnotu, kterou navrhovatel bloku vytvoří podepsáním čísla aktuální epochy. `eth1_data` je hlasování o pohledu navrhovatele bloku na smlouvu o vkladu, včetně kořene Merkle trie vkladů a celkového počtu vkladů, který umožňuje ověřování nových vkladů. `graffiti` je volitelné pole, které lze použít k přidání zprávy do bloku. `proposer_slashings` a `attester_slashings` jsou pole, která obsahují důkaz, že se někteří validátoři podle pohledu navrhovatele na řetězec dopustili přestupků, za které hrozí trest. `deposits` je seznam nových vkladů validátorů, o kterých ví navrhovatel bloku, a `voluntary_exits` je seznam validátorů, kteří chtějí odejít a o kterých se navrhovatel bloku doslechl v gossip síti na konsensuální vrstvě. `sync_aggregate` je vektor, který ukazuje, kteří validátoři byli dříve přiřazeni k synchronizačnímu výboru (podmnožina validátorů, kteří poskytují data lehkým klientům) a podíleli se na podepisování dat.

`execution_payload` umožňuje předávání informací o transakcích mezi exekučními a konsensuálními klienty. `execution_payload` je blok exekučních dat, který je vnořen do beacon bloku. Pole uvnitř `execution_payload` odrážejí strukturu bloku popsanou ve Žluté knize Etherea, s tím rozdílem, že neobsahují ommery a místo `difficulty` existuje `prev_randao`. Exekuční klient má přístup k lokálnímu poolu transakcí, o kterých se dozvěděl ve své vlastní gossip síti. Tyto transakce se spouštějí lokálně, aby se vygeneroval aktualizovaný stavový strom (trie), známý jako post-state. Transakce jsou zahrnuty v `execution_payload` jako seznam nazvaný `transactions` a post-state je uveden v poli `state-root`.

Všechna tato data jsou shromážděna v beacon bloku, podepsána a vysílána peerům navrhovatele bloku, kteří je dále šíří svým peerům atd.

Přečtěte si více o [anatomii bloků](/developers/docs/blocks).

## Co se stane s blokem? {#what-happens-to-blocks}

Blok je přidán do lokální databáze navrhovatele bloku a vysílán peerům prostřednictvím gossip sítě konsensuální vrstvy. Když validátor obdrží blok, ověří data v něm, včetně kontroly, zda má blok správného rodiče, odpovídá správnému slotu, zda je index navrhovatele očekávaný, zda je odhalení RANDAO platné a zda navrhovatel nebyl potrestán (slashingem). `execution_payload` se rozbalí a exekuční klient validátora znovu provede transakce v seznamu, aby zkontroloval navrhovanou změnu stavu. Za předpokladu, že blok projde všemi těmito kontrolami, každý validátor přidá blok do svého vlastního kanonického řetězce. Proces se pak znovu spustí v dalším slotu.

## Odměny za blok {#block-rewards}

Navrhovatel bloku dostává za svou práci odměnu. Existuje `base_reward` (základní odměna) vypočtená jako funkce počtu aktivních validátorů a jejich efektivních zůstatků. Navrhovatel bloku pak obdrží zlomek `base_reward` za každou platnou atestaci obsaženou v bloku; čím více validátorů blok dosvědčí, tím větší je odměna navrhovatele bloku. Existuje také odměna za nahlášení validátorů, kteří by měli být potrestáni (slashingem), která se rovná `1/512 * efektivní zůstatek` za každého potrestaného validátora.

[Více o odměnách a trestech](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Další čtení {#further-reading}

- [Úvod do bloků](/developers/docs/blocks/)
- [Úvod do důkazu podílem](/developers/docs/consensus-mechanisms/pos/)
- [Specifikace konsensu Etherea](https://github.com/ethereum/consensus-specs)
- [Úvod do Gasperu](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Vylepšování Etherea](https://eth2book.info/)
