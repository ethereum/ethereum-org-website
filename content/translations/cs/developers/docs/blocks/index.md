---
title: Bloky
description: Přehled bloků na blockchainu Ethereum – jejich datová struktura, proč jsou potřeba a jak se vytvářejí.
lang: cs
---

Bloky jsou soubory transakcí s hashem předchozího bloku v řetězci. Tím se bloky spojí dohromady (do řetězce), protože hashe jsou kryptograficky odvozeny z dat bloku. To zabraňuje podvodům, protože jedna změna v jakémkoli bloku v historii by zneplatnila všechny následující bloky, změnily by se totiž všechny následné hashe a všichni, kdo blockchain provozují, by si toho všimli.

## Předpoklady {#prerequisites}

Bloky jsou velmi přívětivým tématem pro začátečníky. K lepšímu pochopení této stránky však doporučujeme nejprve si přečíst [Účty](/developers/docs/accounts/), [Transakce](/developers/docs/transactions/), a náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

## Proč bloky? {#why-blocks}

Aby bylo zajištěno, že všichni účastníci sítě Ethereum udržují synchronizovaný stav a shodují se na přesné historii transakcí, seskupujeme transakce do bloků. To znamená, že desítky (nebo stovky) transakcí jsou potvrzeny, odsouhlaseny a synchronizovány najednou.

![Diagram zobrazující transakci v bloku, která způsobuje změny stavu](./tx-block.png) _Diagram převzat z [ilustrace Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Tím, že rozdělujeme potvrzení do jednotlivých intervalů, dáváme všem účastníkům sítě dostatek času k dosažení konsenzu: I když jsou požadavky na transakce zasílány v řádu vyšších desítek za sekundu, bloky jsou na Ethereu vytvářeny a potvrzovány pouze jednou za dvanáct sekund.

## Jak fungují bloky {#how-blocks-work}

K zachování historie transakcí jsou bloky přísně uspořádány (každý nově vytvořený blok obsahuje odkaz na nadřazený blok) a transakce uvnitř bloků jsou rovněž přísně uspořádány. Až na výjimečné případy se v každém okamžiku všichni účastníci sítě shodují na přesném počtu a historii bloků a pracují na zařazení aktuálních transakčních požadavků do dalšího bloku.

Jakmile náhodně vybraný validátor blok sestaví, rozšíří se do zbytku sítě. Všechny uzly přidají tento blok na konec svého blockchainu a vybere se nový validátor, který vytvoří další blok. Přesný proces sestavování bloků a proces potvrzení/konsenzu je v současnosti specifikován protokolem „důkazu podílem“ Etherea.

## Protokol důkazu podílem {#proof-of-work-protocol}

Důkaz podílem znamená následující:

- Validátorské uzly musí vložit 32 ETH do vkladového kontraktu jako záruku proti nevhodnému chování. To pomáhá ochránit celou síť, protože prokázaná nepoctivá činnost vede k částečné nebo úplné ztrátě této záruky.
- V každém slotu (v intervalech dvanácti sekund) je náhodně vybrán validátor, který navrhne blok. Tento validátor seskupí transakce, vykoná je a určí nový „stav“. Tyto informace zabalí do bloku a předá je ostatním validátorům.
- Ostatní validátoři, kteří se dozvědí o novém bloku, znovu provedou transakce, aby se ujistili, že souhlasí s navrženou změnou globálního stavu. Pokud je blok platný, přidají jej do své vlastní databáze.
- Pokud validátor obdrží informace o dvou konfliktních blocích pro stejný slot, použije svůj algoritmus pro volbu větve, aby vybral ten, který podpořilo nejvíce uzamčených ETH.

[Více o proof of stake](/developers/docs/consensus-mechanisms/pos)

## Co je v bloku? {#block-anatomy}

Blok obsahuje spoustu informací. Na nejvyšší úrovni blok obsahuje následující pole:

| Pole             | Popis                                                   |
|:---------------- |:------------------------------------------------------- |
| `slot`           | slot, do kterého blok patří                             |
| `proposer_index` | ID validátora, který navrhuje blok                      |
| `parent_root`    | hash předchozího bloku                                  |
| `state_root`     | kořenový hash stavového objektu                         |
| `body`           | tělo bloku obsahující několik polí, jak je uvedeno níže |

`Tělo` bloku obsahuje několik vlastních polí:

| Pole                 | Popis                                                           |
|:-------------------- |:--------------------------------------------------------------- |
| `randao_reveal`      | hodnota, která byla použita k výběru dalšího navrhovatele bloku |
| `eth1_data`          | informace o vkladovém kontraktu                                 |
| `graffiti`           | libovolná data používaná k označování bloků                     |
| `proposer_slashings` | seznam validátorů, kteří budou penalizováni                     |
| `attester_slashings` | seznam atestátorů bloků, kteří budou penalizováni               |
| `atestace`           | seznam atestací ve prospěch aktuálního bloku                    |
| `deposits`           | seznam nových vkladů do vkladového kontraktu                    |
| `voluntary_exits`    | seznam validátorů odcházejících ze sítě                         |
| `sync_aggregate`     | podmnožina validátorů používaná k obsluze lehkých klientů       |
| `execution_payload`  | transakce předané z exekučního klienta                          |

Pole `atestace` obsahuje seznam všech atestací v bloku. Atestace mají svůj vlastní datový typ, který obsahuje několik částí dat. Každá atestace obsahuje:

| Pole               | Popis                                               |
|:------------------ |:--------------------------------------------------- |
| `aggregation_bits` | seznam validátorů, kteří se účastnili této atestace |
| `data`             | objekt s několika podpoli                           |
| `podpis`           | agregovaný podpis všech atestujících validátorů     |

Pole `data` v `atestaci` obsahuje následující:

| Pole                | Popis                                                       |
|:------------------- |:----------------------------------------------------------- |
| `slot`              | slot, k němuž se atestace vztahuje                          |
| `index`             | indexy pro atestující validátory                            |
| `beacon_block_root` | kořenový hash bloku na Beaconu, který obsahuje tento objekt |
| `zdroj`             | poslední oprávněný kontrolní bod                            |
| `target`            | poslední hraniční blok epochy                               |

Provádění transakcí v `execution_payload` aktualizuje globální stav. Všechny klienty znovu provedou transakce v `execution_payload`, aby se ujistily, že nový stav odpovídá stavu v novém poli `state_root` bloku. Takto mohou klienty zjistit, že nový blok je platný a bezpečný pro přidání do jejich blockchainu. Samotný `execution_payload` je objekt s několika poli. Existuje také `execution_payload_header` – hlavička, která obsahuje důležité souhrnné informace o datech provádění. Tyto datové struktury jsou organizovány následovně:

`Execution_payload_header` obsahuje tato pole:

| Pole                | Popis                                                           |
|:------------------- |:--------------------------------------------------------------- |
| `parent_hash`       | hash předchozího bloku                                          |
| `fee_recipient`     | adresa účtu pro platbu transakčních poplatků                    |
| `state_root`        | kořenový hash pro globální stav po uplatnění změn v tomto bloku |
| `receipts_root`     | hash účtenek za transakce sdružených do struktury trie          |
| `logs_bloom`        | datová struktura obsahující logy událostí                       |
| `prev_randao`       | hodnota použitá při náhodném výběru validátorů                  |
| `block_number`      | číslo aktuálního bloku                                          |
| `gas_limit`         | maximální poplatky povolené v tomto bloku                       |
| `gas_used`          | skutečné poplatky použité v tomto bloku                         |
| `timestamp`         | čas bloku                                                       |
| `extra_data`        | libovolná dodatečná data v surových bajtech                     |
| `base_fee_per_gas`  | hodnota základního poplatku                                     |
| `block_hash`        | hash exekučního bloku                                           |
| `transactions_root` | kořenový hash transakcí v payloadu                              |
| `withdrawal_root`   | kořenový hash výběrů v payloadu                                 |

Samotný `execution_payload` obsahuje následující (všimněte si, že je totožný s hlavičkou, s výjimkou toho, že místo kořenového hashe transakcí zahrnuje skutečný seznam transakcí a informace o výběrech):

| Pole               | Popis                                                           |
|:------------------ |:--------------------------------------------------------------- |
| `parent_hash`      | hash předchozího bloku                                          |
| `fee_recipient`    | adresa účtu pro platbu transakčních poplatků                    |
| `state_root`       | kořenový hash pro globální stav po uplatnění změn v tomto bloku |
| `receipts_root`    | hash účtenek za transakce sdružených do struktury trie          |
| `logs_bloom`       | datová struktura obsahující logy událostí                       |
| `prev_randao`      | hodnota použitá při náhodném výběru validátorů                  |
| `block_number`     | číslo aktuálního bloku                                          |
| `gas_limit`        | maximální poplatky povolené v tomto bloku                       |
| `gas_used`         | skutečné poplatky použité v tomto bloku                         |
| `timestamp`        | čas bloku                                                       |
| `extra_data`       | libovolná dodatečná data v surových bajtech                     |
| `base_fee_per_gas` | hodnota základního poplatku                                     |
| `block_hash`       | hash exekučního bloku                                           |
| `transakce`        | seznam transakcí připravených k realizaci                       |
| `výběry`           | seznam objektů výběru                                           |

Seznam `výběrů` obsahuje objekty `výběru` strukturované následovně:

| Pole               | Popis                            |
|:------------------ |:-------------------------------- |
| `address (adresa)` | adresa účtu, který provádí výběr |
| `částka`           | částka výběru                    |
| `index`            | indexní hodnota výběru           |
| `validatorIndex`   | indexní hodnota validátora       |

## Čas bloku {#block-time}

Čas bloku referuje o čase mezi bloky. Na Ethereu je čas rozdělen do dvanáctisekundových jednotek nazývaných „sloty“. V každém slotu je vybrán jeden validátor, který navrhne blok. Za předpokladu, že všichni validátoři jsou online a plně funkční, bude v každém slotu blok, což znamená, že čas bloku je 12 s. Někdy ale mohou být validátoři offline, když jsou vyzváni k navržení bloku, což znamená, že některé sloty mohou zůstat prázdné.

Tato implementace se liší od systémů založených na důkazu prací, kde jsou časy bloků pravděpodobnostní a upravují se cílovou obtížností těžby v protokolu. [Průměrný čas bloku](https://etherscan.io/chart/blocktime) na Ethereu je dokonalým příkladem tohoto rozdílu, na kterém lze jasně pozorovat přechod z důkazu prací na důkaz podílem díky konzistenci nového 12s času bloku.

## Velikost bloku {#block-size}

Poslední důležitou poznámkou je, že velikost samotných bloků je omezená. Každý blok má cílovou velikost 15 milionů jednotek, ale velikost bloků se bude zvyšovat nebo snižovat v závislosti na požadavcích sítě, až do limitu bloku 30 milionů jednotek (2x cílová velikost bloku). Limit jednotek na jeden blok může být upraven směrem nahoru nebo dolů faktorem 1/1024 oproti limitu jednotek předchozího bloku. Výsledkem je, že validátoři mohou prostřednictvím konsenzu měnit limit jednotek na jeden blok. Celkové množství jednotek spotřebované všemi transakcemi v bloku musí být menší než limit jednotek pro blok. To je důležité, protože je díky tomu zajištěno, že bloky nemohou být libovolně velké. Pokud by bloky mohly být libovolně velké, pak by méně výkonné plné uzly postupně přestávaly být schopny držet krok se sítí kvůli požadavkům na prostor a rychlost. Čím větší je blok, tím větší výpočetní výkon je potřeba k jeho včasnému zpracování pro další slot. Toto je centralizující síla, proti které se bojuje omezením velikosti bloků.

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ji!_

## Příbuzná témata {#related-topics}

- [Transakce](/developers/docs/transactions/)
- [Palivo](/developers/docs/gas/)
- [Důkaz podílem](/developers/docs/consensus-mechanisms/pos)
