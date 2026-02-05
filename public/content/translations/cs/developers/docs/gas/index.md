---
title: Palivo a poplatky
metaTitle: "Palivo a poplatky na Ethereu: technický přehled"
description: Zjistěte více o poplatcích za palivo na Ethereu, jak se vypočítávají a jakou roli hrají v zabezpečení sítě a zpracování transakcí.
lang: cs
---

Palivo je pro síť Ethereum nezbytné. Umožňuje jí fungovat, stejně jako auto potřebuje benzín, aby mohlo jezdit.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky vám doporučujeme si nejprve přečíst o [transakcích](/developers/docs/transactions/) a [EVM](/developers/docs/evm/).

## Co je to palivo? {#what-is-gas}

Palivo označuje jednotku, která měří množství výpočetního úsilí potřebného k provedení specifických operací na síti Ethereum.

Jelikož každá transakce na Ethereu potřebuje výpočetní zdroje k jejímu provedení, tyto zdroje se musí zaplatit, aby Ethereum nebylo zranitelné vůči spamovým útokům a nemohlo se zaseknout v nekonečných výpočetních smyčkách. Platba za výpočetní úsilí se provádí ve formě poplatku za palivo.

Poplatek za palivo je **množství paliva použitého k provedení určité operace vynásobené cenou za jednotku paliva**. Poplatek je zaplacen bez ohledu na to, zda je transakce úspěšně realizována, nebo selže.

![Diagram znázorňující, kde je v operacích EVM zapotřebí palivo](./gas.png)
_Diagram převzat z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Poplatky za palivo musí být zaplaceny v nativní měně Etherea, etheru (ETH). Ceny paliva jsou obvykle uváděny v gwei, což je denominace ETH. Každý gwei je roven jedné miliardtině ETH (0,000000001 ETH nebo 10<sup>-9</sup> ETH).

Např. místo toho, abyste řekli, že vaše palivo stojí 0,000000001 etheru, můžete říct, že stojí 1 gwei.

Slovo 'gwei' je zkratka pro „giga-wei“, což znamená „miliarda wei“. Jeden gwei se rovná jedné miliardě wei. Samotný wei (pojmenovaný po [Wei Daiovi](https://wikipedia.org/wiki/Wei_Dai), tvůrci [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) je nejmenší jednotkou ETH.

## Jak se vypočítají palivové poplatky? {#how-are-gas-fees-calculated}

Když odesíláte transakci, můžete nastavit množství paliva, které jste ochotni zaplatit. Nabídkou určitého množství paliva nabízíte svoji transakci k zařazení do dalšího bloku. Pokud nabídnete příliš málo, máte menší pravděpodobnost, že validátoři vaši transakci vyberou k zařazení, což znamená, že vaše transakce může být zpožděna nebo nemusí být provedena vůbec. Pokud nabídnete příliš mnoho, můžete utratit ETH zbytečně. Jak máte tedy poznat, kolik zaplatit?

Celkový poplatek za palivo, který zaplatíte, se skládá ze dvou složek: `základního poplatku` a `prioritního poplatku` (spropitného).

`Základní poplatek` stanovuje protokol – musíte zaplatit alespoň tuto částku, aby byla vaše transakce považována za platnou. `Prioritní poplatek` je spropitné, které přidáte k základnímu poplatku, aby byla vaše transakce atraktivní pro validátory – aby ji vybrali k zařazení do dalšího bloku.

Transakce, u které se platí pouze `základní poplatek`, je technicky platná, ale je nepravděpodobné, že bude zahrnuta, protože validátorům nenabízí žádnou motivaci, aby ji upřednostnili před jinou transakcí. „Správný“ `prioritní` poplatek je určen vytížením sítě v době odeslání transakce – pokud je velká poptávka, možná budete muset nastavit vyšší `prioritní` poplatek, ale když je poptávka nižší, můžete zaplatit méně.

Např. řekněme, že Jordan musí zaplatit Taylorovi 1 ETH. Převod ETH vyžaduje 21 000 jednotek paliva a základní poplatek je 10 gwei. Jordan přidá spropitné 2 gwei.

Celkový poplatek by nyní dělal:

`spotřebované jednotky paliva * (základní poplatek + prioritní poplatek)`

kde `základní poplatek` je hodnota stanovená protokolem a `prioritní poplatek` je hodnota, kterou stanoví uživatel jako spropitné pro validátora.

např. `21,000 * (10 + 2) = 252,000 gwei` (0,000252 ETH).

Když Jordan odešle peníze, z jeho účtu bude odečteno 1,000252 ETH. Taylor obdrží 1,0000 ETH. Validátor obdrží spropitné ve výši 0,000042 ETH. `Základní poplatek` ve výši 0,00021 ETH je spálen.

### Základní poplatek {#base-fee}

Každý blok má základní poplatek, který funguje jako rezervní cena. Aby byla transakce způsobilá k zařazení do bloku, nabízená cena za palivo musí být rovna alespoň základnímu poplatku. Základní poplatek se vypočítává nezávisle na aktuálním bloku a je určen bloky před ním, díky čemuž jsou transakční poplatky pro uživatele předvídatelnější. Při vytvoření bloku je tento **základní poplatek „spálen“**, čímž je odstraněn z oběhu.

Základní poplatek se vypočítává podle vzorce, který porovnává velikost předchozího bloku (množství paliva spotřebovaného na všechny transakce) s cílovou velikostí (polovina limitu transakčních poplatků). Základní poplatek se zvýší nebo sníží o maximálně 12,5 % za blok, pokud je cílová velikost bloku překročena, resp. nedosažena. Tento exponenciální růst činí ekonomicky neudržitelným, aby velikost bloku zůstala vysoká po neomezenou dobu.

| Číslo bloku |         Zahrnuté palivo | Zvýšení poplatku | Aktuální základní poplatek |
| ----------- | ----------------------: | ---------------: | -------------------------: |
| 1           | 18 mil. |               0% |                   100 gwei |
| 2           | 36 mil. |               0% |                   100 gwei |
| 3           | 36 mil. |           12,5 % |                 112,5 gwei |
| 4           | 36 mil. |           12,5 % |                 126,6 gwei |
| 5           | 36 mil. |           12,5 % |                 142,4 gwei |
| 6           | 36 mil. |           12,5 % |                 160,2 gwei |
| 7           | 36 mil. |           12,5 % |                 180,2 gwei |
| 8           | 36 mil. |           12,5 % |                 202,7 gwei |

Ve výše uvedené tabulce je uveden příklad s limitem transakčních poplatků 36 milionů. Podle tohoto příkladu při vytváření transakce v bloku číslo 9 peněženka s jistotou informuje uživatele, že **maximální základní poplatek**, který bude přidán do dalšího bloku, je `current base fee * 112.5%` neboli `202.7 gwei * 112.5% = 228.1 gwei`.

Je také důležité poznamenat, že z důvodu rychlosti, s jakou se základní poplatek zvyšuje předcházejícímu plnému bloku, je nepravděpodobné, že bychom viděli dlouhodobé peaky plných bloků.

| Číslo bloku                                         |                                     Zahrnuté palivo | Zvýšení poplatku |                          Aktuální základní poplatek |
| --------------------------------------------------- | --------------------------------------------------: | ---------------: | --------------------------------------------------: |
| 30                                                  |                             36 mil. |           12,5 % |                                        2 705,6 gwei |
| ... | ... |           12,5 % | ... |
| 50                                                  |                             36 mil. |           12,5 % |                                       28 531,3 gwei |
| ... | ... |           12,5 % | ... |
| 100                                                 |                             36 mil. |           12,5 % |                                   10 302 608,6 gwei |

### Prioritní poplatek (spropitné) {#priority-fee}

Prioritní poplatek (spropitné) motivuje validátory, aby maximalizovali počet transakcí v bloku, přičemž jsou omezeni pouze limitem transakčních poplatků bloku. Bez spropitného by racionální validátor mohl zahrnout méně transakcí, nebo dokonce žádné, a to bez jakéhokoli přímého postihu na exekuční nebo konsensuální vrstvě, protože odměny ze stakingu jsou nezávislé na počtu transakcí v bloku. Spropitné navíc umožňuje uživatelům přeplatit ostatní za prioritu v rámci stejného bloku, čímž efektivně signalizují naléhavost.

### Maximální poplatek {#maxfee}

Při provedení transakce na síti mohou uživatelé specifikovat maximální limit, který jsou ochotni zaplatit. Tento volitelný parametr je známý jako `maxFeePerGas`. Aby byla transakce provedena, musí maximální poplatek překročit součet základního poplatku a spropitného. Odesílateli transakce je vrácen rozdíl mezi maximálním poplatkem a součtem základního poplatku a spropitného.

### Velikost bloku {#block-size}

Každý blok má cílovou velikost poloviny současného limitu transakčních poplatků, ale velikost bloků se bude zvyšovat nebo snižovat v souladu s poptávkou v síti, a to až do dosažení limitu bloku (2x cílová velikost bloku). Protokol dosahuje rovnovážné průměrné velikosti bloku na cílové úrovni prostřednictvím procesu _tâtonnement_. To znamená, že pokud je velikost bloku větší než cílová velikost bloku, protokol zvýší základní poplatek pro následující blok. Podobně, pokud je velikost bloku menší než cílová velikost, protokol sníží základní poplatek.

Hodnota, o kterou se základní poplatek upravuje, je úměrná tomu, jak daleko je aktuální velikost bloku od cíle. Jedná se o lineární výpočet od -12,5 % pro prázdný blok, 0 % při cílové velikosti, až po +12,5 % pro blok, který dosáhne limitu transakčních poplatků. Limit transakčních poplatků se může v čase měnit na základě signalizace validátorů a také prostřednictvím vylepšení sítě. Změny limitu transakčních poplatků v čase si můžete [prohlédnout zde](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Více o blocích](/developers/docs/blocks/)

### Výpočet poplatků za palivo v praxi {#calculating-fees-in-practice}

Můžete explicitně uvést, kolik jste ochotni zaplatit, aby byla vaše transakce provedena. Většina poskytovatelů peněženek však automaticky nastaví doporučený transakční poplatek (základní poplatek + doporučené spropitné), aby svým uživatelům vše zjednodušila.

## Proč existují poplatky za palivo? {#why-do-gas-fees-exist}

Stručně řečeno, poplatky za palivo pomáhají udržovat bezpečnost sítě Ethereum. Požadováním poplatku za každý výpočet provedený v síti zabráníme nečestným aktérům v zahlcení sítě. Abychom se vyhnuli náhodným nebo záměrným nekonečným smyčkám nebo jinému plýtvání výpočetními zdroji v kódu, každá transakce musí nastavit limit na počet výpočetních kroků potřebných k vykonání kódu. Základní jednotkou výpočtu je „palivo“.

Ačkoli transakce zahrnuje limit, jakékoli palivo, které se v transakci nespotřebuje, se vrací uživateli (např. se vrací `max fee - (base fee + tip)`).

![Diagram znázorňující, jak se vrací nespotřebované palivo](../transactions/gas-tx.png)
_Diagram převzat z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Co je to limit paliva? {#what-is-gas-limit}

Limit paliva označuje maximální množství paliva, které jste ochotni za transakci utratit. Složitější transakce zahrnující [chytré kontrakty](/developers/docs/smart-contracts/) vyžadují více výpočetní práce, takže vyžadují vyšší limit transakčních poplatků než jednoduchá platba. Standardní převod ETH vyžaduje limit paliva 21 000 jednotek.

Např. pokud nastavíte limit paliva na 50 000 pro jednoduchý převod ETH, EVM spotřebuje 21 000 a zbývajících 29 000 se vám vrátí. Pokud však zadáte příliš málo paliva, například limit paliva 20 000 pro jednoduchý převod ETH, transakce ve fázi validace selže. Bude odmítnuta před zařazením do bloku a nebude spotřebováno žádné palivo. Na druhou stranu, pokud transakci během provádění dojde palivo (např. chytrý kontrakt spotřebuje v polovině provádění veškeré palivo), EVM vrátí všechny změny, ale veškeré poskytnuté palivo bude stále spotřebováno na provedenou práci.

## Proč mohou být poplatky za palivo tak vysoké? {#why-can-gas-fees-get-so-high}

Vysoké poplatky za palivo jsou způsobeny popularitou Etherea. Pokud je poptávka příliš vysoká, uživatelé musí nabídnout vyšší spropitné, aby se pokusili přeplatit transakce jiných uživatelů. Vyšší spropitné může zvýšit pravděpodobnost, že se vaše transakce dostane do dalšího bloku. Také složitější aplikace s chytrými kontrakty mohou vykonávat spoustu operací k podpoře svých funkcí, což způsobuje vyšší spotřebu paliva.

## Iniciativy na snížení nákladů na palivo {#initiatives-to-reduce-gas-costs}

[Vylepšení škálovatelnosti](/roadmap/) Etherea by měla v konečném důsledku vyřešit některé problémy s poplatky za palivo, což platformě umožní zpracovávat tisíce transakcí za sekundu a škálovat globálně.

Primární iniciativou ke snížení palivových nákladů a zlepšení uživatelských možností a škálovatelnosti je škálování druhé vrstvy.

[Více o škálování na druhé vrstvě](/developers/docs/scaling/#layer-2-scaling)

## Monitorování poplatků za palivo {#monitoring-gas-fees}

Pokud chcete monitorovat poplatky za palivo, abyste mohli odesílat své ETH za nižší ceny, můžete využít několik různých nástrojů, např.:

- [Etherscan](https://etherscan.io/gastracker) _Odhad ceny transakčního paliva_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Open-source odhad ceny transakčního paliva_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Monitorujte a sledujte ceny paliva na Ethereu a L2, abyste snížili transakční poplatky a ušetřili peníze_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Rozšíření pro Chrome pro odhad paliva, které podporuje jak starší transakce typu 0, tak transakce typu 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Vypočítejte poplatky za palivo ve vaší místní měně pro různé typy transakcí na hlavní síti (Mainnet), Arbitrum a Polygonu._

## Související nástroje {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API pro odhadování paliva, které využívá globální datovou platformu mempoolu od Blocknative_
- [Gas Network](https://gas.network) Oracles pro palivo na blockchainu. Podpora pro více než 35 chainů.

## Další čtení {#further-reading}

- [Vysvětlení ethereového paliva](https://defiprime.com/gas)
- [Snížení spotřeby paliva vašich chytrých kontraktů](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategie optimalizace paliva pro vývojáře](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumentace k EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Zdroje Tima Beika k EIP-1559](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Oddělení mechanismů od memů](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
