---
title: Gas a poplatky
metaTitle: "Ethereum gas a poplatky: technický přehled"
description: "Přečtěte si o poplatcích za plyn (gas) na Ethereu, jak se počítají a jakou roli hrají v zabezpečení sítě a zpracování transakcí."
lang: cs
---

Gas je pro [síť Ethereum](/) nezbytný. Je to palivo, které jí umožňuje fungovat, podobně jako auto potřebuje k jízdě benzín.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [transakcích](/developers/docs/transactions/) a [EVM](/developers/docs/evm/).

## Co je to gas? {#what-is-gas}

Gas označuje jednotku, která měří množství výpočetního úsilí potřebného k provedení konkrétních operací v síti Ethereum.

Vzhledem k tomu, že každá transakce na Ethereu vyžaduje k provedení výpočetní prostředky, musí být tyto prostředky zaplaceny, aby se zajistilo, že Ethereum nebude zranitelné vůči spamu a nemůže uvíznout v nekonečných výpočetních smyčkách. Platba za výpočet se provádí ve formě poplatku za plyn (gas fee).

Poplatek za plyn je **množství gasu použitého k provedení nějaké operace vynásobené cenou za jednotku gasu**. Poplatek se platí bez ohledu na to, zda je transakce úspěšná nebo ne.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Diagram upraven z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Poplatky za plyn se musí platit v nativní měně Etherea, etheru (ETH). Ceny plynu se obvykle uvádějí v Gwei, což je nominální hodnota ETH. Každé Gwei se rovná jedné miliardtině ETH (0,000000001 ETH nebo 10<sup>-9</sup> ETH).

Například místo toho, abyste řekli, že váš gas stojí 0,000000001 etheru, můžete říct, že váš gas stojí 1 Gwei.

Slovo „Gwei“ je zkratka pro „giga-wei“, což znamená „miliarda Wei“. Jedno Gwei se rovná jedné miliardě Wei. Samotné Wei (pojmenované po [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), tvůrci [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) je nejmenší jednotkou ETH.

## Jak se počítají poplatky za plyn? {#how-are-gas-fees-calculated}

Při odesílání transakce můžete nastavit množství gasu, které jste ochotni zaplatit. Nabídnutím určitého množství gasu přihazujete na to, aby byla vaše transakce zahrnuta do dalšího bloku. Pokud nabídnete příliš málo, je méně pravděpodobné, že validátoři vaši transakci vyberou k zahrnutí, což znamená, že se vaše transakce může provést pozdě nebo vůbec. Pokud nabídnete příliš mnoho, můžete zbytečně utratit nějaké ETH. Jak tedy poznáte, kolik máte zaplatit?

Celkový gas, který zaplatíte, se dělí na dvě složky: `base fee` (základní poplatek) a `priority fee` (prioritní poplatek).

`base fee` je stanoven protokolem – musíte zaplatit alespoň tuto částku, aby byla vaše transakce považována za platnou. `priority fee` je prioritní poplatek, který přidáte k základnímu poplatku, aby byla vaše transakce pro validátory atraktivní a oni ji vybrali k zahrnutí do dalšího bloku.

Transakce, která platí pouze `base fee`, je technicky platná, ale je nepravděpodobné, že bude zahrnuta, protože nenabízí validátorům žádnou motivaci, aby si ji vybrali před jakoukoli jinou transakcí. „Správný“ `priority` je určen využitím sítě v době, kdy transakci odesíláte – pokud je velká poptávka, možná budete muset nastavit svůj `priority` výše, ale když je poptávka menší, můžete zaplatit méně.

Řekněme například, že Jordan musí zaplatit Taylorovi 1 ETH. Převod ETH vyžaduje 21 000 jednotek gasu a základní poplatek je 10 Gwei. Jordan zahrne prioritní poplatek 2 Gwei.

Celkový poplatek by se nyní rovnal:

`units of gas used * (base fee + priority fee)`

kde `base fee` je hodnota nastavená protokolem a `priority fee` je hodnota nastavená uživatelem jako prioritní poplatek pro validátora.

např. `21,000 * (10 + 2) = 252,000 gwei` (0,000252 ETH).

Když Jordan pošle peníze, z jeho účtu se odečte 1,000252 ETH. Taylorovi bude připsáno 1,0000 ETH. Validátor obdrží prioritní poplatek ve výši 0,000042 ETH. `base fee` ve výši 0,00021 ETH je spálen.

### Základní poplatek {#base-fee}

Každý blok má základní poplatek, který funguje jako minimální cena. Aby byla transakce způsobilá k zahrnutí do bloku, musí se nabízená cena za gas rovnat alespoň základnímu poplatku. Základní poplatek se počítá nezávisle na aktuálním bloku a je místo toho určen bloky před ním, díky čemuž jsou transakční poplatky pro uživatele předvídatelnější. Když je blok vytvořen, tento **základní poplatek je „spálen“**, čímž je stažen z oběhu.

Základní poplatek se počítá podle vzorce, který porovnává velikost předchozího bloku (množství gasu použitého pro všechny transakce) s cílovou velikostí (polovina limitu plynu). Základní poplatek se zvýší nebo sníží maximálně o 12,5 % za blok, pokud je velikost bloku nad nebo pod cílovou hodnotou. Tento exponenciální růst činí ekonomicky neudržitelným, aby velikost bloku zůstala trvale vysoká.

| Číslo bloku | Zahrnutý gas | Zvýšení poplatku | Aktuální základní poplatek |
| ------------ | -----------: | -----------: | ---------------: |
| 1            |          18M |           0% |         100 Gwei |
| 2            |          36M |           0% |         100 Gwei |
| 3            |          36M |        12.5% |       112.5 Gwei |
| 4            |          36M |        12.5% |       126.6 Gwei |
| 5            |          36M |        12.5% |       142.4 Gwei |
| 6            |          36M |        12.5% |       160.2 Gwei |
| 7            |          36M |        12.5% |       180.2 Gwei |
| 8            |          36M |        12.5% |       202.7 Gwei |

Ve výše uvedené tabulce je ukázán příklad s použitím 36 milionů jako limitu plynu. Podle tohoto příkladu, pro vytvoření transakce v bloku číslo 9, peněženka uživateli s jistotou oznámí, že **maximální základní poplatek**, který bude přidán do dalšího bloku, je `current base fee * 112.5%` nebo `202.7 gwei * 112.5% = 228.1 gwei`.

Je také důležité poznamenat, že je nepravděpodobné, že bychom byli svědky dlouhodobých špiček plných bloků kvůli rychlosti, jakou se základní poplatek zvyšuje před plným blokem.

| Číslo bloku | Zahrnutý gas | Zvýšení poplatku | Aktuální základní poplatek |
| ------------ | -----------: | -----------: | ---------------: |
| 30           |          36M |        12.5% |      2705.6 Gwei |
| ...          |          ... |        12.5% |              ... |
| 50           |          36M |        12.5% |     28531.3 Gwei |
| ...          |          ... |        12.5% |              ... |
| 100          |          36M |        12.5% |  10302608.6 Gwei |

### Prioritní poplatek (tips) {#priority-fee}

Prioritní poplatek motivuje validátory k maximalizaci počtu transakcí v bloku, což je omezeno pouze limitem plynu bloku. Bez prioritních poplatků by racionální validátor mohl zahrnout méně – nebo dokonce nula – transakcí bez jakékoli přímé penalizace na exekuční vrstvě nebo vrstvě konsensu, protože odměny za staking jsou nezávislé na tom, kolik transakcí je v bloku. Prioritní poplatky navíc umožňují uživatelům přeplatit ostatní za prioritu ve stejném bloku, čímž efektivně signalizují naléhavost. 

### Maximální poplatek {#maxfee}

K provedení transakce v síti mohou uživatelé zadat maximální limit, který jsou ochotni zaplatit za provedení své transakce. Tento volitelný parametr je známý jako `maxFeePerGas` (maximální poplatek). Aby byla transakce provedena, musí maximální poplatek překročit součet základního poplatku a prioritního poplatku. Odesílateli transakce je vrácen rozdíl mezi maximálním poplatkem a součtem základního a prioritního poplatku.

### Velikost bloku {#block-size}

Každý blok má cílovou velikost rovnou polovině aktuálního limitu plynu, ale velikost bloků se bude zvyšovat nebo snižovat v souladu s poptávkou v síti, dokud nebude dosaženo limitu bloku (2x cílová velikost bloku). Protokol dosahuje rovnovážné průměrné velikosti bloku na cílové hodnotě prostřednictvím procesu _tâtonnement_ (postupného přibližování). To znamená, že pokud je velikost bloku větší než cílová velikost bloku, protokol zvýší základní poplatek pro následující blok. Podobně protokol sníží základní poplatek, pokud je velikost bloku menší než cílová velikost bloku.

Částka, o kterou je základní poplatek upraven, je úměrná tomu, jak daleko je aktuální velikost bloku od cíle. Jedná se o lineární výpočet od -12,5 % pro prázdný blok, 0 % při cílové velikosti, až po +12,5 % pro blok dosahující limitu plynu. Limit plynu může v průběhu času kolísat na základě signalizace validátorů a také prostřednictvím upgradů sítě. Zde si můžete [prohlédnout změny limitu plynu v čase](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Více o blocích](/developers/docs/blocks/)

### Výpočet poplatků za plyn v praxi {#calculating-fees-in-practice}

Můžete explicitně uvést, kolik jste ochotni zaplatit za provedení vaší transakce. Většina poskytovatelů peněženek však automaticky nastaví doporučený transakční poplatek (základní poplatek + doporučený prioritní poplatek), aby snížila složitost, která je na jejich uživatele kladena.

## Proč existují poplatky za plyn? {#why-do-gas-fees-exist}

Stručně řečeno, poplatky za plyn pomáhají udržovat síť Ethereum v bezpečí. Požadováním poplatku za každý výpočet provedený v síti bráníme škodlivým aktérům ve spamování sítě. Aby se zabránilo náhodným nebo nepřátelským nekonečným smyčkám nebo jinému plýtvání výpočetním výkonem v kódu, musí každá transakce nastavit limit, kolik výpočetních kroků provádění kódu může použít. Základní jednotkou výpočtu je „gas“.

Ačkoli transakce obsahuje limit, jakýkoli gas, který není v transakci použit, se vrací uživateli (např. `max fee - (base fee + tip)` se vrátí).

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Diagram upraven z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Co je to limit plynu? {#what-is-gas-limit}

Limit plynu označuje maximální množství gasu, které jste ochotni spotřebovat na transakci. Složitější transakce zahrnující [chytré kontrakty](/developers/docs/smart-contracts/) vyžadují více výpočetní práce, takže vyžadují vyšší limit plynu než jednoduchá platba. Standardní převod ETH vyžaduje limit plynu 21 000 jednotek gasu.

Pokud například nastavíte limit plynu 50 000 pro jednoduchý převod ETH, EVM spotřebuje 21 000 a zbývajících 29 000 dostanete zpět. Pokud však zadáte příliš málo gasu, například limit plynu 20 000 pro jednoduchý převod ETH, transakce selže během fáze validace. Bude odmítnuta před zahrnutím do bloku a nebude spotřebován žádný gas. Na druhou stranu, pokud transakci dojde gas během provádění (např. chytrý kontrakt spotřebuje veškerý gas v polovině), EVM zvrátí jakékoli změny, ale veškerý poskytnutý gas bude stále spotřebován za provedenou práci.

## Proč mohou být poplatky za plyn tak vysoké? {#why-can-gas-fees-get-so-high}

Vysoké poplatky za plyn jsou dány popularitou Etherea. Pokud je příliš velká poptávka, uživatelé musí nabídnout vyšší částky prioritních poplatků, aby se pokusili přeplatit transakce ostatních uživatelů. Vyšší prioritní poplatek může zvýšit pravděpodobnost, že se vaše transakce dostane do dalšího bloku. Složitější aplikace chytrých kontraktů mohou také provádět spoustu operací na podporu svých funkcí, což způsobuje, že spotřebovávají hodně gasu.

## Iniciativy ke snížení nákladů na gas {#initiatives-to-reduce-gas-costs}

[Upgrady škálovatelnosti](/roadmap/) Etherea by měly nakonec vyřešit některé problémy s poplatky za plyn, což platformě následně umožní zpracovávat tisíce transakcí za sekundu a globálně škálovat.

Škálování na vrstvě 2 (l2) je primární iniciativou k výraznému zlepšení nákladů na gas, uživatelské zkušenosti a škálovatelnosti.

[Více o škálování na vrstvě 2 (l2)](/developers/docs/scaling/#layer-2-scaling)

## Sledování poplatků za plyn {#monitoring-gas-fees}

Pokud chcete sledovat ceny plynu, abyste mohli posílat své ETH levněji, můžete použít mnoho různých nástrojů, jako jsou:

- [Etherscan](https://etherscan.io/gastracker) _Odhadce ceny plynu pro transakce_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Open source odhadce ceny plynu pro transakce_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Sledujte ceny plynu na Ethereu a L2, abyste snížili transakční poplatky a ušetřili peníze_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Rozšíření pro Chrome pro odhad gasu podporující jak starší transakce typu 0, tak transakce typu 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://cryptoneur.xyz/en/gas-fees-calculator) _Vypočítejte si poplatky za plyn ve vaší místní měně pro různé typy transakcí na sítích Mainnet, Arbitrum a Polygon._

## Související nástroje {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API pro odhad gasu poháněné globální datovou platformou mempool od Blocknative_
- [Gas Network](https://gas.network) Onchain orákula pro gas. Podpora pro více než 35 sítí. 

## Další čtení {#further-reading}

- [Vysvětlení gasu na Ethereu](https://defiprime.com/gas)
- [Snížení spotřeby gasu vašich chytrých kontraktů](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategie optimalizace plynu pro vývojáře](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumentace k EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Zdroje k EIP-1559 od Tima Beika](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Oddělení mechanismů od memů](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
