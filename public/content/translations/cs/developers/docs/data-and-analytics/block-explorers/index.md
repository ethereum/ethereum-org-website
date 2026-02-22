---
title: "Průzkumníci bloků"
description: "Úvod k průzkumníkům bloků, vašeho portálu do světa blockchainových dat, kde můžete vyhledávat informace o transakcích, účtech, kontraktech a dalších."
lang: cs
sidebarDepth: 3
---

Průzkumníci bloků jsou vaším portálem k datům Etherea. Pomocí nich můžete v reálném čase sledovat údaje o blocích, transakcích, validátorech, účtech a dalších on-chain aktivitách.

## Předpoklady {#prerequisites}

Měli byste rozumět základním konceptům Etherea, abyste dokázali porozumět údajům, které vám průzkumník bloku poskytne. Začněte s [úvodem do Etherea](/developers/docs/intro-to-ethereum/).

## Služby {#services}

- [Etherscan](https://etherscan.io/) -_Dostupné také v čínštině, korejštině, ruštině a japonštině_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) -_Dostupné také ve španělštině, francouzštině, italštině, nizozemštině, portugalštině, ruštině, čínštině a perštině_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) -_Dostupné také v čínštině, španělštině, francouzštině, turečtině, ruštině, korejštině a vietnamštině_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Ethseer](https://ethseer.io)

## Open-source nástroje {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Data {#data}

Ethereum je ze své podstaty transparentní, takže je vše ověřitelné. Průzkumníci bloků poskytují rozhraní pro získání těchto informací. A to jak pro hlavní síť Ethereum, tak pro testovací sítě, pokud tato data potřebujete. Data se dělí na exekuční data a data o konsensu. Exekuční data se vztahují k transakcím, které byly provedeny v konkrétním bloku. Data o konsensu se týkají samotných bloků a validátorů, kteří je navrhli.

Zde je přehled typů dat, která můžete z průzkumníka bloků získat.

### Exekuční data {#execution-data}

Nové bloky jsou přidávány do Etherea každých 12 sekund (pokud navrhovatel bloku nezmešká svou šanci), takže do průzkumníků bloků je přidáván téměř nepřetržitý tok dat. Bloky obsahují spoustu důležitých údajů, které se vám mohou hodit:

**Standardní data**

- Výška bloku (Block height) - značí číslo bloku a délku blockchainu (v blocích) při vytvoření aktuálního bloku
- Časová značka (Timestamp) - Čas, kdy byl blok navržen
- Transakce (Transactions) - Počet transakcí zahrnutých v bloku
- Příjemce poplatků (Fee recipient) - Adresa, která obdržela spropitné z transakcí
- Odměna za blok (Block Reward) - Množství ETH udělené validátorovi, který blok navrhl
- Velikost (Size) - Velikost dat v bloku (měřeno v bajtech)
- Využité palivo (Gas used) - Celkový počet jednotek paliva spotřebovaných transakcemi v bloku
- Limit paliva (Gas limit) - Celkové limity paliva nastavené transakcemi v bloku
- Základní poplatek za palivo (Base fee per gas) - Minimální násobitel potřebný pro zařazení transakce do bloku
- Spálené poplatky (Burnt fees) - Množství ETH spálené v bloku
- Extra data (Extra data) - Jakákoli další data, která tvůrce bloku zahrnul

**Pokročilá data**

- Hash (Hash) - Kryptografický hash, který představuje hlavičku bloku (jedinečný identifikátor bloku)
- Rodičovský hash (Parent hash) - Hash bloku, který předcházel aktuálnímu bloku
- Kořenový stav (StateRoot) - Kořenový hash Merkle trie, který ukládá celý stav systému

### Gas {#gas}

Průzkumníci bloků vám poskytnou nejen údaje o využití paliva v transakcích a blocích, ale někteří vám poskytnou i informace o aktuálních cenách paliva v síti. To vám pomůže pochopit využití sítě, zadávat bezpečné transakce a neutrácet za palivo příliš mnoho. Vyhledejte rozhraní API, která vám pomohou tyto informace dostat do rozhraní vašeho produktu. Specifické údaje pro palivo zahrnují:

- Odhadované jednotky paliva potřebné pro bezpečnou, ale pomalou transakci (+ odhadovaná cena a doba trvání)
- Odhadované jednotky paliva potřebné pro průměrnou transakci (+ odhadovaná cena a doba trvání)
- Odhadované jednotky paliva potřebné pro rychlou transakci (+ odhadovaná cena a doba trvání)
- Průměrná doba potvrzení na základě ceny paliva
- Kontrakty, které spotřebovávají palivo – jinými slovy populární produkty, které se v síti hodně používají
- Účty, které spotřebovávají nejvíce paliva – jinými slovy častí uživatelé sítě

### Transakce {#transactions}

Průzkumníci bloků se stali běžným místem, kde lidé sledují průběh svých transakcí. Je to proto, že úroveň detailů, kterou můžete získat, poskytuje dodatečnou jistotu. Údaje o transakcích zahrnují:

**Standardní data**

- Transaction hash - Hash, který se generuje při odeslání transakce
- Stav - Udává, zda je transakce čekající, neúspěšná, nebo úspěšná
- Block - Označuje blok, ve kterém byla transakce zahrnuta
- Timestamp - Čas, kdy byla transakce zahrnuta do bloku navrženého validátorem
- From - Adresa účtu, který transakci odeslal
- To - Adresa příjemce nebo smart kontraktu, se kterým transakce interaguje
- Tokens transferred - Seznam tokenů, které byly v rámci transakce převedeny
- Hodnota - Celková převáděná hodnota ETH
- Transakční poplatek - Částka zaplacená validátorovi za zpracování transakce (vypočítá se jako cena paliva \* množství použitého paliva)

**Pokročilá data**

- Gas limit - Maximální počet jednotek paliva, které může tato transakce spotřebovat
- Využité palivo - Skutečné množství jednotek paliva, které transakce spotřebovala
- Cena paliva - Cena stanovená za jednotku paliva
- Nonce - Číslo transakce pro adresu `from` (mějte na paměti, že se začíná od 0, takže nonce `100` by ve skutečnosti byla 101. transakce odeslaná tímto účtem).
- Vstupní data - Veškeré další informace požadované transakcí

### Účty {#accounts}

O účtu existuje mnoho dat, ke kterým můžete získat přístup. Proto se často doporučuje používat více účtů, aby nebylo možné snadno zjistit váš majetek a jeho hodnotu. Ve vývoji jsou také další řešení, která umožňují větší soukromí transakcí a aktivit na účtu. Zde jsou však data, která jsou k dispozici o účtech:

**Uživatelské účty**

- Adresa účtu - veřejná adresa, na kterou můžete posílat finanční prostředky
- Zůstatek ETH - Množství ETH spojené s daným účtem
- Celková hodnota ETH - Hodnota ETH
- Tokeny - Tokeny spojené s účtem a jejich hodnota
- Historie transakcí - Seznam všech transakcí, kde byl tento účet buď odesílatelem, nebo příjemcem

**Chytré kontrakty**

Smart kontrakt účty obsahují všechny údaje, které má uživatelský účet, ale někteří průzkumníci bloků zobrazují navíc i některé informace o kódu. Mezi příklady patří:

- Tvůrce kontraktu - Adresa, která kontrakt nasadila na Mainnet
- Transakce vytvoření - Transakce, která zahrnovala spuštění na Mainnetu
- Zdrojový kód - Solidity nebo Vyper kód smart kontraktu
- ABI kontraktu - Aplikační binární rozhraní kontraktu - volání, která kontrakt provádí, a data, která přijímá
- Kód vytvoření kontraktu - Zkompilovaný bajtový kód smart kontraktu - vytvoří se při kompilaci smart kontraktu napsaného v Solidity, Vyper apod.
- Události kontraktu - Historie metod volaných ve smart kontraktu – v podstatě způsob, jak zjistit, jak je kontrakt používán a jak často

### Tokeny {#tokens}

Tokeny jsou typem kontraktu, takže ponesou podobné údaje jako smart kontrakty. Ale protože mají hodnotu a lze s nimi obchodovat, mají i další datové položky:

- Typ - Zda se jedná o token ERC-20, ERC-721 nebo jiný standard
- Cena - Pokud se jedná o ERC-20, budou mít aktuální tržní hodnotu
- Tržní kapitalizace - Pokud se jedná o ERC-20, bude u nich uvedena tržní kapitalizace (vypočtená jako cena \* celkové množství)
- Celková zásoba - Počet tokenů v oběhu
- Držitelé - Počet adres, které drží daný token
- Převody - Počet koliktrát byl token převeden mezi účty
- Historie transakcí - Historie všech transakcí zahrnující daný token
- Adresa kontraktu - Adresa tokenu nasazeného na Mainnet
- Desetinná místa - Tokeny ERC-20 jsou dělitelné a mají desetinná místa

### Síť {#network}

Některá data bloku se týkají celkového zdraví sítě Ethereum.

- Celkový počet transakcí - Počet transakcí od vzniku Etherea
- Transakce za sekundu - Počet transakcí zpracovatelných během jedné sekundy
- Cena ETH - Aktuální hodnota 1 ETH
- Celková nabídka ETH - Počet ETH v oběhu - nezapomeňte, že s vytvořením každého bloku vznikají nové ETH ve formě blokových odměn
- Tržní kapitalizace - Výpočítá se jako cena \* celková nabídka

## Data konsenzuální vrstvy {#consensus-layer-data}

### Epocha {#epoch}

Z bezpečnostních důvodů jsou na konci každé epochy (každých 6,4 minut) vytvořeny náhodně vybrané komise validátorů. Data o epochách zahrnují:

- Číslo epochy
- Finalizovaný stav - Zda byla epocha finalizována (ano/ne)
- Čas - Čas ukončení epochy
- Atestace - Počet atestací v epoše (hlasování pro bloky v rámci slotů)
- Vklady - Počet vložených ETH zahrnutých v epoše (validátoři musí uzamknout ETH, aby se stali validátory)
- Srážky - Počet pokut udělených navrhovatelům bloků nebo atestátorům
- Účast na hlasování - Množství uzamčených ETH použitých k atestování bloků
- Validátoři - Počet validátorů aktivních pro danou epochu
- Průměrný zůstatek validátorů - Průměrný zůstatek aktivních validátorů
- Sloty - Počet časových úseků "slotů" zahrnutých do epochy (sloty zahrnují jeden validní blok)

### Slot {#slot}

Sloty jsou časové úseky pro vytváření bloků, údaje dostupné pro každý slot zahrnují:

- Epocha - Epocha, ve které je slot platný
- Číslo slotu
- Stav - Stav slotu (navržený/nepřijatý)
- Čas - Časová stopa slotu
- Navrhovatel - validátor, který navrhl blok pro slot
- Kořen bloku - Kořen stromu hashů bloku BeaconBlock
- Rodičovský kořen - Hash předcházejícího bloku
- Kořen stavu - Kořen stromového hashe bloku BeaconState
- Podpis
- Randao reveal
- Graffiti - Navrhovatel bloku může ke svému návrhu bloku připojit 32 bajtů dlouhou zprávu
- Exekuční data
  - Hash bloku
  - Počet vkladů
  - Kořen vkladů
- Atestace - Počet atestací bloku v tomto slotu
- Vklady - Počet vkladů během tohoto slotu
- Dobrovolné odchody - Počet validátorů, kteří během tohoto slotu odešli
- Srážky - Počet pokut udělených navrhovatelům bloků nebo atestátorům
- Hlasy - Validátoři, kteří hlasovali pro blok v tomto slotu

### Bloky {#blocks-1}

Proof of stake dělí čas to slotů a epoch. To tedy znamená nová data!

- Navrhovatel - validátor, který byl algoritmem vybrán, aby navrhl nový blok
- Epocha - Epocha, ve které byl blok navržen
- Slot - Časový úsek, ve kterém byl blok navržen
- Atestace - Počet atestací zahrnutých do slotu - atestace jsou jako hlasy, které označují, že blok je připraven přejít do Beacon Chainu

### Validátoři {#validators}

Validátoři jsou odpovědní za navrhování bloků a jejich atestaci v rámci slotů.

- Číslo validátora - Jedinečné číslo, které reprezentuje validátora
- Aktuální zůstatek - Zůstatek validátora včetně odměn
- Efektivní zůstatek - Zůstatek validátora, který se používá pro staking (uzamčení)
- Příjem - Odměny nebo pokuty, které validátor obdržel
- Stav - Zda je validátor aktuálně online a aktivní, nebo ne
- Efektivita atestace - Průměrná doba, za kterou jsou atestace validátora zařazeny do řetězce
- Způsobilost k aktivaci - Datum (a epocha), kdy se validátor stal dostupným pro validace
- Aktivní od - Datum (a epocha), kdy se validátor stal aktivním
- Navrhované bloky - Bloky, které validátor navrhl
- Atestace - Atestace, které validátor provedl
- Vklady - Adresa odesílatele, hash transakce, číslo bloku, časové razítko, částka a stav stakovaného vkladu, který validátor provedl

### Atestace {#attestations}

Atestace jsou hlasy "ano" pro zařazení bloků do řetězce. Jejich data se týkají záznamu o atestaci a validátorů, kteří atestovali

- Slot - Časový úsek, ve kterém se atestace uskutečnila
- Index komise - Index komise v daném slotu
- Agregační bity - Představuje agregovanou atestaci všech zúčastněných validátorů v atestaci
- Validátoři - Validátoři, kteří provedli atestace
- Kořen beacon bloku - Ukazuje na blok, ke kterému validátoři vydávají atestace
- Zdroj - Ukazuje na poslední oprávněnou epochu
- Cíl - Ukazuje na poslední hranici epochy
- Podpis

### Síť {#network-1}

Základní data o konsensuální vrstvě zahrnují následující údaje:

- Aktuální epochu
- Aktuální slot
- Aktivní validátoty - Počet aktivních validátorů
- Čekající validátory – Počet validátorů, kteří čekají na to, až budou aktivní
- Stakované ETH - Množství ETH uzamčených v síti
- Průměrný zůstatek - Průměrný zůstatek ETH validátorů

## Průzkumníky bloků {#block-explorers}

- [Etherscan](https://etherscan.io/) – průzkumník bloků, který můžete použít k získávání dat pro Ethereum Mainnet a testnet.
- [3xpl](https://3xpl.com/ethereum) – open-source průzkumník Etherea bez reklam, který umožňuje stahování jeho datasetů.
- [Beaconcha.in](https://beaconcha.in/) – open-source průzkumník bloků pro Ethereum Mainnet a testnet.
- [Blockchair](https://blockchair.com/ethereum) – nejprivátnější průzkumník Etherea. Také pro třídění a filtrování dat (mempoolu)
- [Etherchain](https://www.etherchain.org/) – průzkumník bloků pro Ethereum Mainnet.
- [Ethplorer](https://ethplorer.io/) – průzkumník bloků se zaměřením na tokeny pro Ethereum Mainnet a testnet Kovan.

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Transakce](/developers/docs/transactions/)
- [Účty](/developers/docs/accounts/)
- [Sítě](/developers/docs/networks/)
