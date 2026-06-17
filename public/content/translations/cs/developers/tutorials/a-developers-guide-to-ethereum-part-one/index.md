---
title: "Úvod do Etherea pro vývojáře v Pythonu, část 1"
description: "Úvod do vývoje na Ethereu, obzvláště užitečný pro ty, kteří znají programovací jazyk Python"
author: Marc Garreau
lang: cs
tags:
  - python
  - web3.py
skill: beginner
breadcrumb: Ethereum s Pythonem
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Takže jste slyšeli o tom Ethereu a jste připraveni vydat se do králičí nory? Tento článek rychle projde některé základy blockchainu a poté vás nechá interagovat se simulovaným uzlem Etherea – číst data bloků, kontrolovat zůstatky na účtech a odesílat transakce. Během toho zdůrazníme rozdíly mezi tradičními způsoby tvorby aplikací a tímto novým decentralizovaným paradigmatem.

## (Mírné) prerekvizity {#soft-prerequisites}

Tento článek si klade za cíl být přístupný široké škále vývojářů. Budou zde zapojeny [nástroje Pythonu](/developers/docs/programming-languages/python/), ale ty jsou pouze prostředkem pro předání myšlenek – nevadí, pokud nejste vývojář v Pythonu. Budu však předpokládat několik věcí, které už znáte, abychom se mohli rychle přesunout k částem specifickým pro Ethereum.

Předpoklady:

- Umíte se pohybovat v terminálu,
- Napsali jste už pár řádků kódu v Pythonu,
- Na vašem počítači je nainstalován Python verze 3.6 nebo novější (důrazně doporučujeme použít [virtuální prostředí](https://realpython.com/effective-python-environment/#virtual-environments)) a
- použili jste `pip`, instalátor balíčků pro Python.
  Znovu opakuji, pokud něco z toho není pravda, nebo neplánujete reprodukovat kód v tomto článku, pravděpodobně i tak budete moci bez problémů sledovat výklad.

## Blockchainy ve stručnosti {#blockchains-briefly}

Existuje mnoho způsobů, jak popsat Ethereum, ale v jeho jádru je blockchain. Blockchainy se skládají ze série bloků, takže začněme tam. Zjednodušeně řečeno, každý blok na blockchainu Etherea jsou jen nějaká metadata a seznam transakcí. Ve formátu JSON to vypadá nějak takto:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Každý [blok](/developers/docs/blocks/) má odkaz na blok, který mu předcházel; `parentHash` je jednoduše hash předchozího bloku.

<FeaturedText>Poznámka: Ethereum pravidelně využívá <a href="https://wikipedia.org/wiki/Hash_function">hashovací funkce</a> k vytváření hodnot s pevnou délkou („hashů“). Hashe hrají v Ethereu důležitou roli, ale prozatím si je můžete bez obav představit jako unikátní ID.</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_Blockchain je v podstatě spojový seznam; každý blok má odkaz na předchozí blok._

Tato datová struktura není ničím novým, ale pravidla (tj. peer-to-peer protokoly), která řídí síť, ano. Neexistuje žádná centrální autorita; síť uzlů (peers) musí spolupracovat na udržení sítě a soutěžit o to, které transakce budou zahrnuty do dalšího bloku. Takže když chcete poslat nějaké peníze příteli, budete muset tuto transakci odeslat do sítě a pak počkat, až bude zahrnuta do nadcházejícího bloku.

Jediný způsob, jak může blockchain ověřit, že peníze byly skutečně odeslány od jednoho uživatele k druhému, je použít měnu nativní pro tento blockchain (tj. jím vytvořenou a spravovanou). V Ethereu se tato měna nazývá ether a blockchain Etherea obsahuje jediný oficiální záznam o zůstatcích na účtech.

## Nové paradigma {#a-new-paradigm}

Tento nový decentralizovaný technologický stack dal vzniknout novým vývojářským nástrojům. Takové nástroje existují v mnoha programovacích jazycích, ale my se na ně podíváme optikou Pythonu. Opakuji: i když Python není váš preferovaný jazyk, nemělo by vám dělat velký problém sledovat výklad.

Vývojáři v Pythonu, kteří chtějí interagovat s Ethereem, pravděpodobně sáhnou po [Web3.py](https://web3py.readthedocs.io/). Web3.py je knihovna, která výrazně zjednodušuje způsob, jakým se připojujete k uzlu Etherea a následně z něj odesíláte a přijímáte data.

<FeaturedText>Poznámka: Pojmy „uzel Etherea“ a „klient Etherea“ se používají zaměnitelně. V obou případech odkazují na software, který spouští účastník sítě Ethereum. Tento software dokáže číst data bloků, přijímat aktualizace při přidání nových bloků do řetězce, odesílat nové transakce a další. Technicky vzato je klient software a uzel je počítač, na kterém tento software běží.</FeaturedText>

[Klienty Etherea](/developers/docs/nodes-and-clients/) lze nakonfigurovat tak, aby byly dostupné přes [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP nebo Websockety, takže Web3.py bude muset tuto konfiguraci zrcadlit. Web3.py označuje tyto možnosti připojení jako **poskytovatele** (providers). Budete si muset vybrat jednoho ze tří poskytovatelů, abyste propojili instanci Web3.py s vaším uzlem.

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_Nakonfigurujte uzel Etherea a Web3.py tak, aby komunikovaly přes stejný protokol, např. IPC v tomto diagramu._

Jakmile je Web3.py správně nakonfigurováno, můžete začít interagovat s blockchainem. Zde je několik příkladů použití Web3.py jako ukázka toho, co nás čeká:

```python
# číst data bloku:
w3.eth.get_block('latest')

# odeslat transakci:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalace {#installation}

V tomto průvodci budeme pracovat pouze v interpretu Pythonu. Nebudeme vytvářet žádné adresáře, soubory, třídy ani funkce.

<FeaturedText>Poznámka: V níže uvedených příkladech jsou příkazy začínající na `$` určeny ke spuštění v terminálu. (Nezadávejte `$`, pouze to označuje začátek řádku.)</FeaturedText>

Nejprve si nainstalujte [IPython](https://ipython.org/), abyste získali uživatelsky přívětivé prostředí pro zkoumání. IPython nabízí mimo jiné doplňování pomocí tabulátoru, což značně usnadňuje zjišťování, co všechno je ve Web3.py možné.

```bash
pip install ipython
```

Web3.py je publikováno pod názvem `web3`. Nainstalujte jej takto:

```bash
pip install web3
```

Ještě jedna věc – později budeme simulovat blockchain, což vyžaduje několik dalších závislostí. Můžete je nainstalovat pomocí:

```bash
pip install 'web3[tester]'
```

Vše je připraveno a můžeme začít!

Poznámka: Balíček `web3[tester]` funguje do verze Pythonu 3.10.xx

## Spuštění sandboxu {#spin-up-a-sandbox}

Otevřete nové prostředí Pythonu spuštěním `ipython` ve vašem terminálu. Je to srovnatelné se spuštěním `python`, ale nabízí to více funkcí a vylepšení.

```bash
ipython
```

Tím se vypíší některé informace o verzích Pythonu a IPythonu, které používáte, a poté byste měli vidět výzvu čekající na zadání:

```python
In [1]:
```

Nyní se díváte na interaktivní shell Pythonu. V podstatě je to sandbox, ve kterém si můžete hrát. Pokud jste se dostali až sem, je čas importovat Web3.py:

```python
In [1]: from web3 import Web3
```

## Představení modulu Web3 {#introducing-the-web3-module}

Kromě toho, že je bránou do Etherea, nabízí modul [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) několik užitečných funkcí. Pojďme si jich pár prozkoumat.

V aplikaci na Ethereu budete běžně potřebovat převádět nominální hodnoty měny. Modul Web3 poskytuje několik pomocných metod přesně pro tento účel: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) a [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Poznámka: Počítače jsou notoricky špatné ve zpracování desetinné matematiky. Aby se tomu vývojáři vyhnuli, často ukládají částky v dolarech jako centy. Například položka s cenou 5,99 $ může být v databázi uložena jako 599.

Podobný vzor se používá při zpracování transakcí v <b>etheru</b>. Nicméně místo dvou desetinných míst má ether 18! Nejmenší nominální hodnota etheru se nazývá <b>Wei</b>, takže to je hodnota, která se zadává při odesílání transakcí.

1 ether = 1000000000000000000 Wei

1 Wei = 0.000000000000000001 ether

</FeaturedText>

Zkuste převést některé hodnoty do a z Wei. Všimněte si, že [existují názvy pro mnoho nominálních hodnot](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) mezi etherem a Wei. Jednou z nejznámějších z nich je **Gwei**, protože se tak často vyjadřují transakční poplatky.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Další užitečné metody v modulu Web3 zahrnují převodníky datových formátů (např. [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), pomocníky pro adresy (např. [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) a hashovací funkce (např. [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Mnohými z nich se budeme zabývat později v této sérii. Chcete-li zobrazit všechny dostupné metody a vlastnosti, využijte automatické doplňování v IPythonu tak, že napíšete `Web3`. a po tečce dvakrát stisknete klávesu Tab.

## Komunikace s řetězcem {#talk-to-the-chain}

Užitečné metody jsou skvělé, ale pojďme se přesunout k blockchainu. Dalším krokem je konfigurace Web3.py pro komunikaci s uzlem Etherea. Zde máme možnost použít poskytovatele IPC, HTTP nebo Websocket.

Touto cestou se nevydáme, ale příklad kompletního pracovního postupu s použitím poskytovatele HTTP by mohl vypadat nějak takto:

- Stáhněte si uzel Etherea, např. [Geth](https://geth.ethereum.org/).
- Spusťte Geth v jednom okně terminálu a počkejte na synchronizaci sítě. Výchozí port HTTP je `8545`, ale lze jej nakonfigurovat.
- Řekněte Web3.py, aby se připojilo k uzlu přes HTTP na `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Použijte instanci `w3` k interakci s uzlem.

Ačkoli je to jeden ze „skutečných“ způsobů, jak to udělat, proces synchronizace trvá hodiny a je zbytečný, pokud chcete jen vývojové prostředí. Web3.py pro tento účel nabízí čtvrtého poskytovatele, **EthereumTesterProvider**. Tento testovací poskytovatel se připojuje k simulovanému uzlu Etherea s uvolněnými oprávněními a falešnou měnou na hraní.

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_EthereumTesterProvider se připojuje k simulovanému uzlu a je užitečný pro rychlá vývojová prostředí._

Tento simulovaný uzel se nazývá [eth-tester](https://github.com/ethereum/eth-tester) a nainstalovali jsme jej jako součást příkazu `pip install web3[tester]`. Konfigurace Web3.py pro použití tohoto testovacího poskytovatele je takto jednoduchá:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Nyní jste připraveni surfovat po řetězci! To se sice neříká, právě jsem si to vymyslel. Pojďme si udělat rychlou prohlídku.

## Rychlá prohlídka {#the-quick-tour}

Nejdříve ze všeho, rychlá kontrola funkčnosti:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Vzhledem k tomu, že používáme testovacího poskytovatele, není to příliš hodnotný test, ale pokud selže, je pravděpodobné, že jste při vytváření instance proměnné `w3` zadali něco špatně. Zkontrolujte, zda jste zahrnuli vnitřní závorky, tj. `Web3.EthereumTesterProvider()`.

## Zastávka č. 1: [účty](/developers/docs/accounts/) {#tour-stop-1-accounts}

Pro usnadnění vytvořil testovací poskytovatel několik účtů a předem je nabil testovacím etherem.

Nejprve se podívejme na seznam těchto účtů:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Pokud spustíte tento příkaz, měli byste vidět seznam deseti řetězců, které začínají na `0x`. Každý z nich je **veřejná adresa** a v některých ohledech je analogický číslu běžného účtu. Tuto adresu byste poskytli někomu, kdo by vám chtěl poslat ether.

Jak již bylo zmíněno, testovací poskytovatel předem nabil každý z těchto účtů nějakým testovacím etherem. Pojďme zjistit, kolik je na prvním účtu:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

To je spousta nul! Než se začnete smát cestou do falešné banky, vzpomeňte si na dřívější lekci o nominálních hodnotách měny. Hodnoty etheru jsou reprezentovány v nejmenší nominální hodnotě, Wei. Převeďte to na ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Jeden milion testovacích etherů – to stále není k zahození.

## Zastávka č. 2: data bloku {#tour-stop-2-block-data}

Pojďme nahlédnout na stav tohoto simulovaného blockchainu:

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

O bloku se vrací spousta informací, ale zde je třeba zdůraznit jen pár věcí:

- Číslo bloku je nula – bez ohledu na to, jak dávno jste nakonfigurovali testovacího poskytovatele. Na rozdíl od skutečné sítě Ethereum, která přidává nový blok každých 12 sekund, tato simulace počká, dokud jí nedáte nějakou práci.
- `transactions` je prázdný seznam ze stejného důvodu: zatím jsme nic neudělali. Tento první blok je **prázdný blok**, jen aby se řetězec nastartoval.
- Všimněte si, že `parentHash` je jen hromada prázdných bajtů. To znamená, že se jedná o první blok v řetězci, známý také jako **genesis blok**.

## Zastávka č. 3: [transakce](/developers/docs/transactions/) {#tour-stop-3-transactions}

Jsme zaseknutí na bloku nula, dokud nebude existovat čekající transakce, takže mu jednu dejme. Pošlete několik testovacích etherů z jednoho účtu na druhý:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Toto je obvykle bod, kdy byste několik sekund čekali, než bude vaše transakce zahrnuta do nového bloku. Celý proces probíhá zhruba takto:

1. Odešlete transakci a ponechte si hash transakce. Dokud není vytvořen a odeslán blok obsahující transakci, je transakce „čekající“ (pending).
   `tx_hash = w3.eth.send_transaction({ … })`
2. Počkejte, až bude transakce zahrnuta do bloku:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Pokračujte v logice aplikace. Chcete-li zobrazit úspěšnou transakci:
   `w3.eth.get_transaction(tx_hash)`

Naše simulované prostředí přidá transakci do nového bloku okamžitě, takže si můžeme transakci ihned prohlédnout:

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

Zde uvidíte některé známé detaily: pole `from`, `to` a `value` by měla odpovídat vstupům našeho volání `send_transaction`. Další uklidňující věcí je, že tato transakce byla zahrnuta jako první transakce (`'transactionIndex': 0`) v bloku číslo 1.

Úspěšnost této transakce můžeme také snadno ověřit kontrolou zůstatků obou zúčastněných účtů. Tři ethery by se měly přesunout z jednoho na druhý.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

To druhé vypadá dobře! Zůstatek se zvýšil z 1 000 000 na 1 000 003 etherů. Ale co se stalo s prvním účtem? Zdá se, že ztratil o něco více než tři ethery. Bohužel, nic v životě není zadarmo a používání veřejné sítě Ethereum vyžaduje, abyste kompenzovali ostatní uzly za jejich podpůrnou roli. Z účtu, který transakci odeslal, byl stržen malý transakční poplatek – tento poplatek je množství spáleného gasu (21000 jednotek gasu pro převod ETH) vynásobené základním poplatkem, který se mění podle aktivity sítě, plus prioritní poplatek, který jde validátorovi, jenž transakci zahrne do bloku.

Více o [gasu](/developers/docs/gas/#post-london)

<FeaturedText>Poznámka: Ve veřejné síti jsou transakční poplatky variabilní na základě poptávky v síti a toho, jak rychle chcete, aby byla transakce zpracována. Pokud vás zajímá rozpis toho, jak se poplatky počítají, podívejte se na můj dřívější článek o tom, <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">jak jsou transakce zahrnuty do bloku</a>.</FeaturedText>

## A vydechněte {#and-breathe}

Už se tomu věnujeme nějakou dobu, takže se zdá, že je to dobré místo na přestávku. Králičí nora pokračuje dál a my budeme v průzkumu pokračovat ve druhé části této série. Některé z nadcházejících konceptů: připojení ke skutečnému uzlu, chytré kontrakty a tokeny. Máte doplňující otázky? Dejte mi vědět! Vaše zpětná vazba ovlivní, kam se odsud vydáme. Požadavky jsou vítány přes [Twitter](https://twitter.com/wolovim).