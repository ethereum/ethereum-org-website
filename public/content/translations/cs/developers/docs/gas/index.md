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

Vzhledem k tomu, že každá transakce na Ethereu vyžaduje k provedení výpočetní zdroje, musí být tyto zdroje zaplaceny, aby se zajistilo, že Ethereum nebude zranitelné vůči spamu a nemůže uvíznout v nekonečných výpočetních smyčkách. Platba za výpočet se provádí ve formě poplatku za plyn.

Poplatek za plyn je **množství gasu použitého k provedení nějaké operace vynásobené cenou za jednotku gasu**. Poplatek se platí bez ohledu na to, zda je transakce úspěšná nebo selže.

<GasEvmDiagram />

Poplatky za plyn musí být placeny v nativní měně Etherea, etheru (ETH). Ceny plynu se obvykle uvádějí v Gwei, což je nominální hodnota ETH. Každý Gwei se rovná jedné miliardtině ETH (0,000000001 ETH nebo 10<sup>-9</sup> ETH).

Například místo toho, abyste řekli, že váš gas stojí 0,000000001 etheru, můžete říci, že váš gas stojí 1 Gwei.

Slovo „Gwei“ je zkratka pro „giga-wei“, což znamená „miliarda Wei“. Jeden Gwei se rovná jedné miliardě Wei. Samotný Wei (pojmenovaný po [Wei Daiovi](https://wikipedia.org/wiki/Wei_Dai), tvůrci [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) je nejmenší jednotkou ETH.

## Jak se počítají poplatky za plyn? {#how-are-gas-fees-calculated}

Při odesílání transakce můžete nastavit množství gasu, které jste ochotni zaplatit. Nabídnutím určitého množství gasu přihazujete na to, aby byla vaše transakce zahrnuta do dalšího bloku. Pokud nabídnete příliš málo, je méně pravděpodobné, že validátoři vaši transakci k zahrnutí vyberou, což znamená, že se vaše transakce může provést pozdě nebo vůbec. Pokud nabídnete příliš mnoho, můžete zbytečně utratit nějaké ETH. Jak tedy poznáte, kolik máte zaplatit?

Cena, kterou platíte za jednotku gasu, se dělí na dvě složky: `základní poplatek` a `prioritní poplatek`.

`Základní poplatek` je stanoven protokolem – musíte zaplatit alespoň tuto částku, aby byla vaše transakce považována za platnou. `Prioritní poplatek` je částka, kterou přidáte k základnímu poplatku, aby byla vaše transakce pro validátory atraktivní a vybrali ji k zahrnutí do dalšího bloku.

Transakce, která platí pouze `základní poplatek`, je technicky platná, ale je nepravděpodobné, že bude zahrnuta, protože validátorům nenabízí žádnou motivaci, aby si ji vybrali před jakoukoli jinou transakcí. „Správný“ `prioritní poplatek` je určen využitím sítě v době, kdy transakci odesíláte – pokud je velká poptávka, možná budete muset nastavit `prioritní poplatek` výše, ale když je poptávka menší, můžete zaplatit méně.

Řekněme například, že Jordan musí zaplatit Taylorovi 1 ETH. Převod ETH vyžaduje 21 000 jednotek gasu a základní poplatek je 10 Gwei. Jordan zahrne prioritní poplatek 2 Gwei.

Celkový poplatek by se nyní rovnal:

`spotřebované jednotky gasu * (základní poplatek + prioritní poplatek)`

kde `základní poplatek` je hodnota nastavená protokolem a `prioritní poplatek` je hodnota nastavená uživatelem jako odměna pro validátora.

např. `21 000 * (10 + 2) = 252 000 Gwei` (0,000252 ETH).

Když Jordan odešle peníze, z jeho účtu se odečte 1,000252 ETH. Taylorovi bude připsáno 1,0000 ETH. Validátor obdrží prioritní poplatek 0,000042 ETH. `Základní poplatek` ve výši 0,00021 ETH je spálen.

### Základní poplatek {#base-fee}

Každý blok má základní poplatek, který funguje jako minimální (rezervní) cena. Aby byla transakce způsobilá k zahrnutí do bloku, musí se nabízená cena za gas rovnat alespoň základnímu poplatku. Základní poplatek se počítá nezávisle na aktuálním bloku a je místo toho určen bloky před ním, díky čemuž jsou transakční poplatky pro uživatele předvídatelnější. Když je blok vytvořen, tento **základní poplatek je „spálen“**, čímž je stažen z oběhu.

Základní poplatek se počítá podle vzorce, který porovnává velikost předchozího bloku (množství gasu spotřebovaného na všechny transakce) s cílovou velikostí (polovina limitu plynu). Základní poplatek se zvýší nebo sníží maximálně o 12,5 % za blok, pokud je velikost bloku nad nebo pod cílovou hodnotou. Tento exponenciální růst činí ekonomicky neúnosným, aby velikost bloku zůstala trvale vysoká.

| Číslo bloku | Zahrnutý gas | Zvýšení poplatku | Aktuální základní poplatek |
| ----------- | -----------: | ---------------: | -------------------------: |
| 1           |          30M |               0% |                   0,1 Gwei |
| 2           |          60M |               0% |                   0,1 Gwei |
| 3           |          60M |           12,5 % |                0,1125 Gwei |
| 4           |          60M |           12,5 % |                0,1266 Gwei |
| 5           |          60M |           12,5 % |                0,1424 Gwei |
| 6           |          60M |           12,5 % |                0,1602 Gwei |
| 7           |          60M |           12,5 % |                0,1802 Gwei |
| 8           |          60M |           12,5 % |                0,2027 Gwei |

V tabulce výše je uveden příklad s použitím 60 milionů jako limitu plynu. Podle tohoto příkladu při vytváření transakce v bloku číslo 9 peněženka uživateli s jistotou oznámí, že **maximální základní poplatek**, který bude přidán do dalšího bloku, je `aktuální základní poplatek * 112,5 %` nebo `0,2027 Gwei * 112,5 % = 0,2281 Gwei`.

<BaseFeeDiagram />

Je také důležité poznamenat, že je nepravděpodobné, že bychom zaznamenali delší období plných bloků kvůli rychlosti, jakou se základní poplatek před plným blokem zvyšuje.

| Číslo bloku | Zahrnutý gas | Zvýšení poplatku | Aktuální základní poplatek |
| ----------- | -----------: | ---------------: | -------------------------: |
| 30          |          60M |           12,5 % |                2,7056 Gwei |
| ...         |          ... |           12,5 % |                        ... |
| 50          |          60M |           12,5 % |               28,5313 Gwei |
| ...         |          ... |           12,5 % |                        ... |
| 100         |          60M |           12,5 % |            10302,6083 Gwei |

### Prioritní poplatek (tips) {#priority-fee}

Prioritní poplatek motivuje validátory k maximalizaci počtu transakcí v bloku, což je omezeno pouze limitem plynu bloku. Bez prioritních poplatků by racionální validátor mohl zahrnout méně – nebo dokonce nula – transakcí bez jakékoli přímé penalizace na exekuční vrstvě nebo vrstvě konsensu, protože odměny za staking jsou nezávislé na tom, kolik transakcí je v bloku. Prioritní poplatky navíc umožňují uživatelům přeplatit ostatní za prioritu ve stejném bloku, čímž efektivně signalizují naléhavost. 

### Maximální poplatek {#maxfee}

K provedení transakce v síti mohou uživatelé zadat maximální limit, který jsou ochotni zaplatit za provedení své transakce. Tento volitelný parametr je známý jako `maxFeePerGas`. Aby byla transakce provedena, musí být maximální poplatek alespoň roven základnímu poplatku a zaplacený prioritní poplatek je omezen tak, aby základní poplatek plus prioritní poplatek nikdy nepřekročil maximální poplatek. Odesílateli transakce je vrácen rozdíl mezi maximálním poplatkem a součtem základního a prioritního poplatku.

### Velikost bloku {#block-size}

Každý blok má cílovou velikost rovnou polovině aktuálního limitu plynu, ale velikost bloků se bude zvyšovat nebo snižovat v souladu s poptávkou v síti, dokud nebude dosaženo limitu bloku (2x cílová velikost bloku). Protokol dosahuje rovnovážné průměrné velikosti bloku na cílové hodnotě prostřednictvím procesu _tâtonnement_ (postupného přibližování). To znamená, že pokud je velikost bloku větší než cílová velikost bloku, protokol zvýší základní poplatek pro následující blok. Podobně protokol sníží základní poplatek, pokud je velikost bloku menší než cílová velikost bloku.

Částka, o kterou je základní poplatek upraven, je úměrná tomu, jak daleko je aktuální velikost bloku od cíle. Jedná se o lineární výpočet od -12,5 % pro prázdný blok, 0 % při cílové velikosti, až po +12,5 % pro blok dosahující limitu plynu. Limit plynu může v průběhu času kolísat na základě signalizace validátorů a také prostřednictvím upgradů sítě. Zde si můžete [prohlédnout změny limitu plynu v čase](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Více o blocích](/developers/docs/blocks/)

### Výpočet poplatků za plyn v praxi {#calculating-fees-in-practice}

Můžete explicitně uvést, kolik jste ochotni zaplatit za provedení vaší transakce. Většina poskytovatelů peněženek však automaticky nastaví doporučený transakční poplatek (základní poplatek + doporučený prioritní poplatek), aby snížila složitost, která je na jejich uživatele kladena.

## Proč existují poplatky za plyn? {#why-do-gas-fees-exist}

Stručně řečeno, poplatky za plyn pomáhají udržovat síť Ethereum v bezpečí. Požadováním poplatku za každý výpočet provedený v síti bráníme škodlivým aktérům ve spamování sítě. Aby se zabránilo náhodným nebo nepřátelským nekonečným smyčkám nebo jinému plýtvání výpočetním výkonem v kódu, každá transakce musí nastavit limit, kolik výpočetních kroků provádění kódu může použít. Základní jednotkou výpočtu je „gas“.

Ačkoli transakce obsahuje limit, jakýkoli gas, který není v transakci použit, se uživateli vrátí (např. vrátí se `maximální poplatek - (základní poplatek + prioritní poplatek)`).

<GasTxDiagram />

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

- [Etherscan](https://etherscan.io/gastracker) _Odhadce ceny plynu za transakci_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Open source odhadce ceny plynu za transakci_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Sledujte a monitorujte ceny plynu na Ethereu a vrstvě 2 (l2), abyste snížili transakční poplatky a ušetřili peníze_
- [Cryptoneur Gas Fees Calculator](https://cryptoneur.xyz/en/gas-fees-calculator) _Vypočítejte si poplatky za plyn ve vaší místní měně pro různé typy transakcí na sítích Mainnet, Arbitrum a Polygon._

## Další čtení {#further-reading}

- [Vysvětlení gasu na Ethereu](https://defiprime.com/gas)
- [Snížení spotřeby gasu vašich chytrých kontraktů](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategie optimalizace plynu pro vývojáře](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumentace k EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Zdroje k EIP-1559 od Tima Beika](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Oddělení mechanismů od memů](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
