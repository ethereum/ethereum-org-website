---
title: Bloky
description: "Přehled bloků v blockchainu Etherea – jejich datová struktura, proč jsou potřeba a jak vznikají."
lang: cs
---

Bloky jsou dávky transakcí s hashem předchozího bloku v řetězci. To spojuje bloky dohromady (do řetězce), protože hashe jsou kryptograficky odvozeny z dat bloku. Tím se předchází podvodům, protože jedna změna v jakémkoli bloku v historii by zneplatnila všechny následující bloky, jelikož by se změnily všechny následné hashe a každý, kdo provozuje blockchain, by si toho všiml.

## Předpoklady {#prerequisites}

Bloky jsou téma velmi přívětivé pro začátečníky. Ale abychom vám pomohli lépe porozumět této stránce, doporučujeme si nejprve přečíst o [účtech](/developers/docs/accounts/), [transakcích](/developers/docs/transactions/) a náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

## Proč bloky? {#why-blocks}

Abychom zajistili, že všichni účastníci v [síti Ethereum](/) udržují synchronizovaný stav a shodnou se na přesné historii transakcí, seskupujeme transakce do bloků. To znamená, že desítky (nebo stovky) transakcí jsou potvrzeny, odsouhlaseny a synchronizovány najednou.

![A diagram showing transaction in a block causing state changes](./tx-block.png)
_Diagram upraven z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Rozložením potvrzení v čase dáváme všem účastníkům sítě dostatek času k dosažení konsensu: i když k požadavkům na transakce dochází desítkykrát za sekundu, bloky jsou na Ethereu vytvářeny a potvrzovány pouze jednou za dvanáct sekund.

## Jak bloky fungují {#how-blocks-work}

Pro zachování historie transakcí jsou bloky striktně seřazeny (každý nově vytvořený blok obsahuje odkaz na svůj rodičovský blok) a transakce uvnitř bloků jsou také striktně seřazeny. Až na vzácné případy se v daném okamžiku všichni účastníci sítě shodují na přesném počtu a historii bloků a pracují na seskupení aktuálních živých požadavků na transakce do dalšího bloku.

Jakmile je blok sestaven náhodně vybraným validátorem v síti, je šířen do zbytku sítě; všechny uzly přidají tento blok na konec svého blockchainu a je vybrán nový validátor k vytvoření dalšího bloku. Přesný proces sestavování bloku a proces potvrzování/konsensu je v současnosti specifikován protokolem Etherea „důkaz podílem (PoS)“.

## Protokol důkaz podílem (PoS) {#proof-of-stake-protocol}

Důkaz podílem (PoS) znamená následující:

- Validující uzly musí vložit jako stake 32 ETH do depozitního kontraktu jako zajištění proti špatnému chování. To pomáhá chránit síť, protože prokazatelně nečestná aktivita vede ke zničení části nebo celého tohoto staku.
- V každém slotu (s odstupem dvanácti sekund) je náhodně vybrán validátor, který se stane navrhovatelem bloku. Ten seskupí transakce dohromady, provede je a určí nový „stav“. Tyto informace zabalí do bloku a předá je ostatním validátorům.
- Ostatní validátoři, kteří se o novém bloku dozvědí, znovu provedou transakce, aby se ujistili, že souhlasí s navrhovanou změnou globálního stavu. Za předpokladu, že je blok platný, přidají jej do své vlastní databáze.
- Pokud se validátor dozví o dvou konfliktních blocích pro stejný slot, použije svůj algoritmus pro výběr forku (fork-choice algorithm), aby vybral ten, který je podporován největším množstvím stakovaných ETH.

[Více o důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos)

## Co je v bloku? {#block-anatomy}

Blok obsahuje spoustu informací. Na nejvyšší úrovni obsahuje blok následující pole:

| Pole | Popis |
| :--------------- | :---------------------------------------------------- |
| `slot` | slot, do kterého blok patří |
| `proposer_index` | ID validátora, který je navrhovatelem bloku |
| `parent_root` | hash předchozího bloku |
| `state_root` | kořenový hash stavového objektu |
| `body` | objekt obsahující několik polí, jak je definováno níže |

Samotné `body` bloku obsahuje několik vlastních polí:

| Pole | Popis |
| :------------------- | :----------------------------------------------- |
| `randao_reveal` | hodnota použitá k výběru dalšího navrhovatele bloku |
| `eth1_data` | informace o depozitním kontraktu |
| `graffiti` | libovolná data použitá k označení bloků |
| `proposer_slashings` | seznam validátorů k penalizaci |
| `attester_slashings` | seznam atestujících k penalizaci |
| `attestations` | seznam atestací provedených vůči předchozím slotům |
| `deposits` | seznam nových vkladů do depozitního kontraktu |
| `voluntary_exits` | seznam validátorů opouštějících síť |
| `sync_aggregate` | podmnožina validátorů používaná k obsluze lehkých klientů |
| `execution_payload` | transakce předané z exekučního klienta |

Pole `attestations` obsahuje seznam všech atestací v bloku. Atestace mají svůj vlastní datový typ, který obsahuje několik částí dat. Každá atestace obsahuje:

| Pole | Popis |
| :----------------- | :------------------------------------------------------------- |
| `aggregation_bits` | seznam validátorů, kteří se zúčastnili této atestace |
| `data` | kontejner s více dílčími poli |
| `signature` | agregovaný podpis sady validátorů vůči části `data` |

Pole `data` v `attestation` obsahuje následující:

| Pole | Popis |
| :------------------ | :-------------------------------------------------------------- |
| `slot` | slot, ke kterému se atestace vztahuje |
| `index` | indexy pro atestující validátory |
| `beacon_block_root` | kořenový hash beacon bloku vnímaného jako hlava řetězce |
| `source` | poslední ospravedlněný kontrolní bod |
| `target` | nejnovější hraniční blok epochy |

Provedení transakcí v `execution_payload` aktualizuje globální stav. Všichni klienti znovu provedou transakce v `execution_payload`, aby se ujistili, že nový stav odpovídá stavu v poli `state_root` nového bloku. Takto klienti poznají, že je nový blok platný a bezpečný pro přidání do jejich blockchainu. Samotný `execution payload` je objekt s několika poli. Existuje také `execution_payload_header`, který obsahuje důležité souhrnné informace o exekučních datech. Tyto datové struktury jsou uspořádány následovně:

`execution_payload_header` obsahuje následující pole:

| Pole | Popis |
| :------------------ | :------------------------------------------------------------------ |
| `parent_hash` | hash rodičovského bloku |
| `fee_recipient` | adresa účtu pro placení transakčních poplatků |
| `state_root` | kořenový hash pro globální stav po aplikaci změn v tomto bloku |
| `receipts_root` | hash trie účtenek transakcí |
| `logs_bloom` | datová struktura obsahující protokoly událostí |
| `prev_randao` | hodnota použitá při náhodném výběru validátora |
| `block_number` | číslo aktuálního bloku |
| `gas_limit` | maximální povolený gas v tomto bloku |
| `gas_used` | skutečné množství gasu použitého v tomto bloku |
| `timestamp` | čas bloku |
| `extra_data` | libovolná dodatečná data jako surové bajty |
| `base_fee_per_gas` | hodnota základního poplatku |
| `block_hash` | hash exekučního bloku |
| `transactions_root` | kořenový hash transakcí v payloadu |
| `withdrawal_root` | kořenový hash výběrů v payloadu |

Samotný `execution_payload` obsahuje následující (všimněte si, že je to identické s hlavičkou, kromě toho, že místo kořenového hashe transakcí obsahuje skutečný seznam transakcí a informace o výběrech):

| Pole | Popis |
| :----------------- | :------------------------------------------------------------------ |
| `parent_hash` | hash rodičovského bloku |
| `fee_recipient` | adresa účtu pro placení transakčních poplatků |
| `state_root` | kořenový hash pro globální stav po aplikaci změn v tomto bloku |
| `receipts_root` | hash trie účtenek transakcí |
| `logs_bloom` | datová struktura obsahující protokoly událostí |
| `prev_randao` | hodnota použitá při náhodném výběru validátora |
| `block_number` | číslo aktuálního bloku |
| `gas_limit` | maximální povolený gas v tomto bloku |
| `gas_used` | skutečné množství gasu použitého v tomto bloku |
| `timestamp` | čas bloku |
| `extra_data` | libovolná dodatečná data jako surové bajty |
| `base_fee_per_gas` | hodnota základního poplatku |
| `block_hash` | hash exekučního bloku |
| `transactions` | seznam transakcí k provedení |
| `withdrawals` | seznam objektů výběrů |

Seznam `withdrawals` obsahuje objekty `withdrawal` strukturované následujícím způsobem:

| Pole | Popis |
| :--------------- | :--------------------------------- |
| `address` | adresa účtu, který provedl výběr |
| `amount` | částka výběru |
| `index` | hodnota indexu výběru |
| `validatorIndex` | hodnota indexu validátora |

## Čas bloku {#block-time}

Čas bloku označuje dobu oddělující bloky. V Ethereu je čas rozdělen do dvanáctisekundových jednotek zvaných „sloty“. V každém slotu je vybrán jeden validátor, který navrhne blok. Za předpokladu, že jsou všichni validátoři online a plně funkční, bude v každém slotu blok, což znamená, že čas bloku je 12 s. Občas však mohou být validátoři offline, když jsou vyzváni k navržení bloku, což znamená, že sloty mohou někdy zůstat prázdné.

Tato implementace se liší od systémů založených na důkazu prací (PoW), kde jsou časy bloků pravděpodobnostní a laděné cílovou obtížností těžby protokolu. [Průměrný čas bloku](https://etherscan.io/chart/blocktime) Etherea je toho dokonalým příkladem, přičemž přechod z důkazu prací (PoW) na důkaz podílem (PoS) lze jasně odvodit na základě konzistence nového času bloku 12 s.

## Velikost bloku {#block-size}

Poslední důležitou poznámkou je, že samotné bloky jsou omezeny svou velikostí. Každý blok má cílovou velikost 30 milionů gasu, ale velikost bloků se bude zvyšovat nebo snižovat v souladu s požadavky sítě, a to až do limitu bloku 60 milionů gasu (dvojnásobek cílovové velikosti bloku). Limit plynu bloku lze upravit nahoru nebo dolů o faktor 1/1024 oproti limitu plynu předchozího bloku. V důsledku toho mohou validátoři změnit limit plynu bloku prostřednictvím konsensu. Celkové množství gasu spotřebovaného všemi transakcemi v bloku musí být menší než limit plynu bloku. To je důležité, protože to zajišťuje, že bloky nemohou být libovolně velké. Kdyby mohly být bloky libovolně velké, pak by méně výkonné plné uzly postupně přestaly být schopny držet krok se sítí kvůli požadavkům na prostor a rychlost. Čím větší je blok, tím větší výpočetní výkon je potřeba k jeho včasnému zpracování pro další slot. To je centralizační síla, které se čelí omezením velikosti bloků.

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Transakce](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
- [Důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos)