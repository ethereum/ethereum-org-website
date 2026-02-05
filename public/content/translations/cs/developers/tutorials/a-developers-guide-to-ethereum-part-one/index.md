---
title: Úvod do Etherea pro vývojáře v Pythonu, 1. část
description: Úvod do vývoje na Ethereu, zvláště užitečný pro ty, kdo znají programovací jazyk Python.
author: Marc Garreau
lang: cs
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Takže jsi slyšel o tomhle Ethereu a jsi připravený vydat se do králičí nory? V tomto příspěvku si rychle projdeme základy blockchainu a pak tě necháme interagovat se simulovaným uzlem sítě Ethereum – číst data z bloků, kontrolovat zůstatky na účtech a odesílat transakce. Cestou si také ukážeme rozdíly mezi tradičními způsoby tvorby aplikací a tímto novým decentralizovaným paradigmatem.

## (Nepovinné) předpoklady {#soft-prerequisites}

Tento příspěvek se snaží být přístupný širokému okruhu vývojářů. [Nástroje pro Python](/developers/docs/programming-languages/python/) sice použijeme, ale jsou jen prostředkem k předání myšlenek – nevadí, pokud nejsi vývojář v Pythonu. Budu však předpokládat, že už pár věcí znáš, abychom se mohli rychle přesunout k částem specifickým pro Ethereum.

Předpoklady:

- Vyznáš se v terminálu,
- Napsal jsi pár řádků kódu v Pythonu,
- na svém počítači máš nainstalovaný Python verze 3.6 nebo vyšší (důrazně doporučujeme použít [virtuální prostředí](https://realpython.com/effective-python-environment/#virtual-environments)) a
- používal jsi `pip`, instalátor balíčků pro Python.
  I když něco z toho nesplňuješ nebo si neplánuješ kód z tohoto článku zkoušet, nejspíš i tak všechno bez problémů pochopíš.

## Stručně o blockchainech {#blockchains-briefly}

Ethereum lze popsat mnoha způsoby, ale v jeho jádru je blockchain. Blockchainy se skládají z řady bloků, takže začněme u nich. Zjednodušeně řečeno, každý blok na blockchainu Etherea je jen několik metadat a seznam transakcí. Ve formátu JSON to vypadá nějak takto:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Každý [blok](/developers/docs/blocks/) má odkaz na blok, který mu předcházel; `parentHash` je jednoduše haš předchozího bloku.

<FeaturedText>Poznámka: Ethereum pravidelně používá <a href="https://wikipedia.org/wiki/Hash_function">hašovací funkce</a> k vytváření hodnot pevné velikosti („hašů“). Haše hrají v Ethereu důležitou roli, ale prozatím si je můžeš bezpečně představit jako jedinečné identifikátory.</FeaturedText>

![Diagram znázorňující blockchain včetně dat uvnitř každého bloku](./blockchain-diagram.png)

_Blockchain je v podstatě spojový seznam; každý blok má odkaz na předchozí blok._

Tato datová struktura není nijak nová, ale pravidla (tj. protokoly peer-to-peer), která řídí síť, ano. Neexistuje žádná centrální autorita; síť peerů musí spolupracovat na udržení sítě a soutěžit o to, které transakce zahrnout do dalšího bloku. Takže když chceš poslat nějaké peníze kamarádovi, musíš tuto transakci odvysílat do sítě a pak počkat, až bude zahrnuta do některého z nadcházejících bloků.

Jediný způsob, jak může blockchain ověřit, že peníze byly skutečně poslány od jednoho uživatele k druhému, je použití měny, která je pro daný blockchain nativní (tj. vytvořená a řízená jím). V Ethereu se tato měna nazývá ether a blockchain Etherea obsahuje jediný oficiální záznam o zůstatcích na účtech.

## Nové paradigma {#a-new-paradigm}

Tento nový decentralizovaný technologický stack dal vzniknout novým vývojářským nástrojům. Takové nástroje existují v mnoha programovacích jazycích, ale my se na ně podíváme z pohledu Pythonu. Znovu opakuji: i když Python není tvůj preferovaný jazyk, neměl by být velký problém vše sledovat.

Vývojáři v Pythonu, kteří chtějí interagovat s Ethereem, pravděpodobně sáhnou po [Web3.py](https://web3py.readthedocs.io/). Web3.py je knihovna, která výrazně zjednodušuje způsob, jakým se připojíš k uzlu Ethereum a poté z něj odesíláš a přijímáš data.

<FeaturedText>Poznámka: „Uzel sítě Ethereum“ a „klient sítě Ethereum“ se používají zaměnitelně. V obou případech se jedná o software, který spouští účastník sítě Ethereum. Tento software umí číst data bloků, přijímat aktualizace, když jsou do řetězce přidány nové bloky, vysílat nové transakce a další. Technicky vzato je klient software a uzel je počítač, na kterém software běží.</FeaturedText>

[Klienti sítě Ethereum](/developers/docs/nodes-and-clients/) mohou být nakonfigurováni tak, aby byli dosažitelní pomocí [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP nebo Websockets, takže Web3.py bude muset tuto konfiguraci zrcadlit. Web3.py označuje tyto možnosti připojení jako **providery**. Budeš si chtít vybrat jednoho ze tří providerů, abys propojil instanci Web3.py se svým uzlem.

![Diagram znázorňující, jak web3.py používá IPC k připojení tvé aplikace k uzlu Ethereum](./web3py-and-nodes.png)

_Nakonfiguruj uzel Ethereum a Web3.py tak, aby komunikovaly pomocí stejného protokolu, např. IPC v tomto diagramu._

Jakmile je Web3.py správně nakonfigurováno, můžeš začít interagovat s blockchainem. Zde je několik příkladů použití Web3.py jako ukázka toho, co přijde:

```python
# čtení dat bloku:
w3.eth.get_block('latest')

# odeslání transakce:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalace {#installation}

V tomto návodu budeme pracovat pouze v interpretu Pythonu. Nebudeme vytvářet žádné adresáře, soubory, třídy ani funkce.

<FeaturedText>Poznámka: V níže uvedených příkladech jsou příkazy začínající na `$` určeny ke spuštění v terminálu. (Znak `$` nepiš, označuje pouze začátek řádku.)</FeaturedText>

Nejprve si nainstaluj [IPython](https://ipython.org/) pro uživatelsky přívětivé prostředí k prozkoumávání. IPython nabízí mimo jiné doplňování pomocí tabulátoru, což výrazně usnadňuje zjištění, co všechno je v Web3.py možné.

```bash
pip install ipython
```

Web3.py je publikován pod názvem `web3`. Nainstaluj ho takto:

```bash
pip install web3
```

Ještě jedna věc – později budeme simulovat blockchain, což vyžaduje několik dalších závislostí. Můžeš si je nainstalovat pomocí:

```bash
pip install 'web3[tester]'
```

Máš všechno připravené a můžeme začít!

Poznámka: Balíček `web3[tester]` funguje až do Pythonu 3.10.xx

## Spuštění sandboxu {#spin-up-a-sandbox}

Otevři si nové prostředí Python spuštěním `ipython` v terminálu. Je to srovnatelné se spuštěním `python`, ale s více vychytávkami.

```bash
ipython
```

Tím se vypíší informace o verzích Pythonu a IPythonu, které používáš, a pak bys měl vidět výzvu čekající na zadání:

```python
In [1]:
```

Právě se díváš na interaktivní Python shell. V podstatě je to sandbox, ve kterém si můžeš hrát. Pokud ses dostal až sem, je čas importovat Web3.py:

```python
In [1]: from web3 import Web3
```

## Představení modulu Web3 {#introducing-the-web3-module}

Kromě toho, že je modul [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) bránou do Etherea, nabízí i několik pomocných funkcí. Pojďme si jich pár prozkoumat.

V aplikaci pro Ethereum budeš běžně potřebovat převádět nominální hodnoty měn. Modul Web3 poskytuje pro tento účel několik pomocných metod: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) a [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Poznámka: Počítače jsou proslulé tím, že špatně zvládají desetinnou matematiku. Aby se tomu předešlo, vývojáři často ukládají dolarové částky v centech. Například položka s cenou 5,99 $ může být v databázi uložena jako 599.

Podobný vzorec se používá při zpracování transakcí v <b>etheru</b>. Avšak místo dvou desetinných míst má ether 18! Nejmenší nominální hodnota etheru se nazývá <b>wei</b>, takže to je hodnota, která se zadává při odesílání transakcí.

1 ether = 1000000000000000000 wei

1 wei = 0,000000000000000001 etheru

</FeaturedText>

Zkus si převést některé hodnoty do a z wei. Všimni si, že [existují názvy pro mnoho nominálních hodnot](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) mezi etherem a wei. Jednou z nejznámějších mezi nimi je **gwei**, protože se v ní často uvádějí transakční poplatky.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Další pomocné metody v modulu Web3 zahrnují převodníky datových formátů (např. [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), pomocné funkce pro adresy (např. [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) a hašovací funkce (např. [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Mnohým z nich se budeme věnovat později v této sérii. Chceš-li zobrazit všechny dostupné metody a vlastnosti, využij automatické doplňování v IPythonu zadáním `Web3`. a dvojitým stisknutím klávesy Tab za tečkou.

## Komunikace s chainem {#talk-to-the-chain}

Pomocné metody jsou fajn, ale pojďme se přesunout k blockchainu. Dalším krokem je nakonfigurovat Web3.py pro komunikaci s uzlem Etherea. Zde máme možnost použít providery IPC, HTTP nebo Websocket.

Tudy se nevydáme, ale příklad kompletního pracovního postupu s použitím HTTP Provideru by mohl vypadat asi takto:

- Stáhni si uzel Etherea, např. [Geth](https://geth.ethereum.org/).
- Spusť Geth v jednom okně terminálu a počkej, až se synchronizuje se sítí. Výchozí port HTTP je `8545`, ale je konfigurovatelný.
- Řekni Web3.py, aby se připojil k uzlu přes HTTP na `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Použij instanci `w3` k interakci s uzlem.

I když je to jeden ze „skutečných“ způsobů, jak to udělat, proces synchronizace trvá hodiny a je zbytečný, pokud chceš jen vývojové prostředí. Web3.py pro tento účel zpřístupňuje čtvrtého providera, **EthereumTesterProvider**. Tento tester provider se připojuje k simulovanému uzlu Etherea s uvolněnými oprávněními a falešnou měnou na hraní.

![Diagram znázorňující EthereumTesterProvider propojující tvou aplikaci web3.py se simulovaným uzlem Ethereum](./ethereumtesterprovider.png)

_EthereumTesterProvider se připojuje k simulovanému uzlu a je praktický pro rychlé vytvoření vývojového prostředí._

Tento simulovaný uzel se nazývá [eth-tester](https://github.com/ethereum/eth-tester) a nainstalovali jsme si ho jako součást příkazu `pip install web3[tester]`. Konfigurace Web3.py pro použití tohoto tester providera je tak jednoduchá:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Teď jsi připravený surfovat na chainu! Takhle se to neříká. To jsem si právě vymyslel. Pojďme na rychlou prohlídku.

## Rychlá prohlídka {#the-quick-tour}

Nejdříve ze všeho, kontrola funkčnosti:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Jelikož používáme tester providera, není to příliš cenný test, ale pokud selže, je pravděpodobné, že jsi při vytváření instance proměnné `w3` něco špatně napsal. Zkontroluj si, že jsi zahrnul vnitřní závorky, tj. `Web3.EthereumTesterProvider()`.

## Zastávka č. 1: [účty](/developers/docs/accounts/) {#tour-stop-1-accounts}

Pro usnadnění tester provider vytvořil několik účtů a předem je nabil testovacím etherem.

Nejprve se podívejme na seznam těchto účtů:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Pokud tento příkaz spustíš, měl bys vidět seznam deseti řetězců, které začínají `0x`. Každý z nich je **veřejná adresa** a je v některých ohledech analogický číslu běžného účtu. Tuto adresu bys poskytl někomu, kdo by ti chtěl poslat ether.

Jak již bylo zmíněno, tester provider předem nabil každý z těchto účtů testovacím etherem. Pojďme zjistit, kolik je na prvním účtu:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

To je hodně nul! Než se s úsměvem vydáš do falešné banky, vzpomeň si na dřívější lekci o nominálních hodnotách měn. Hodnoty etheru jsou vyjádřeny v nejmenší nominální hodnotě, wei. Převeďme to na ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Jeden milion testovacích etherů – to pořád není špatné.

## Zastávka č. 2: data bloku {#tour-stop-2-block-data}

Pojďme se podívat na stav tohoto simulovaného blockchainu:

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

O bloku se vrací spousta informací, ale zde je třeba upozornit jen na pár věcí:

- Číslo bloku je nula – bez ohledu na to, jak dávno jsi nakonfiguroval tester providera. Na rozdíl od skutečné sítě Ethereum, která přidává nový blok každých 12 sekund, tato simulace počká, dokud jí nedáš nějakou práci.
- `transactions` je prázdný seznam ze stejného důvodu: ještě jsme nic neudělali. Tento první blok je **prázdný blok**, jen aby se spustil chain.
- Všimni si, že `parentHash` je jen spousta prázdných bytů. To znamená, že se jedná o první blok v řetězci, známý také jako **genesis blok**.

## Zastávka č. 3: [transakce](/developers/docs/transactions/) {#tour-stop-3-transactions}

Zasekli jsme se na bloku nula, dokud nebude čekající transakce, tak mu ji dejme. Pošli pár testovacích etherů z jednoho účtu na druhý:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

To je obvykle bod, kde bys čekal několik sekund, než se tvá transakce zahrne do nového bloku. Celý proces probíhá nějak takhle:

1. Odešli transakci a uschovej si haš transakce. Dokud není vytvořen a odvysílán blok obsahující transakci, transakce je „čekající“.
   `tx_hash = w3.eth.send_transaction({ …` `})`
2. Počkej, až bude transakce zahrnuta do bloku:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Pokračuj v logice aplikace. Pro zobrazení úspěšné transakce:
   `w3.eth.get_transaction(tx_hash)`

Naše simulované prostředí přidá transakci do nového bloku okamžitě, takže si transakci můžeme hned prohlédnout:

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Zde uvidíš některé známé detaily: pole `from`, `to` a `value` by měla odpovídat vstupům našeho volání `send_transaction`. Další uklidňující věcí je, že tato transakce byla zahrnuta jako první transakce (`'transactionIndex': 0`) v bloku číslo 1.

Úspěšnost této transakce můžeme také snadno ověřit kontrolou zůstatků na obou zúčastněných účtech. Tři ethery se měly přesunout z jednoho na druhý.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

To druhé vypadá dobře! Zůstatek se změnil z 1 000 000 na 1 000 003 etherů. Ale co se stalo s prvním účtem? Zdá se, že ztratil o něco více než tři ethery. Bohužel, nic v životě není zadarmo, a používání veřejné sítě Ethereum vyžaduje, abys odměnil ostatní účastníky sítě za jejich podporu. Z účtu, který transakci odeslal, byl odečten malý transakční poplatek – tento poplatek je množství spáleného paliva (21 000 jednotek paliva za převod ETH) vynásobené základním poplatkem, který se liší podle aktivity sítě, plus spropitné, které jde validátorovi, který transakci zahrne do bloku.

Více o [palivu](/developers/docs/gas/#post-london)

<FeaturedText>Poznámka: Ve veřejné síti jsou transakční poplatky proměnlivé v závislosti na poptávce v síti a na tom, jak rychle chceš, aby byla transakce zpracována. Pokud tě zajímá, jak se poplatky počítají, podívej se na můj dřívější příspěvek o tom, <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">jak se transakce zahrnují do bloku</a>.</FeaturedText>

## A teď výdech {#and-breathe}

Už jsme u toho nějakou dobu, takže se zdá, že je to dobré místo na přestávku. Králičí nora pokračuje a my budeme pokračovat v průzkumu v druhé části této série. Některé koncepty, které přijdou: připojení ke skutečnému uzlu, chytré kontrakty a tokeny. Máš další otázky? Dej mi vědět! Tvá zpětná vazba ovlivní, kam se odtud vydáme. Žádosti jsou vítány přes [Twitter](https://twitter.com/wolovim).
