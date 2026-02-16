---
title: Utangulizi wa msanidi programu wa Python kwa Ethereum, sehemu ya 1
description: Utangulizi wa uundaji wa Ethereum, muhimu hasa kwa wale wenye ujuzi wa lugha ya programu ya Python
author: Marc Garreau
lang: sw
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Kwa hivyo, umesikia kuhusu jambo hili la Ethereum na uko tayari kuanza safari ya kulichunguza kwa kina? Chapisho hili litaelezea kwa haraka misingi fulani ya mnyororo wa bloku, kisha kukuwezesha kuingiliana na nodi ya Ethereum iliyoigwa – kusoma data ya bloku, kuangalia salio la akaunti, na kutuma miamala. Wakati huo huo, tutaangazia tofauti kati ya njia za jadi za kuunda programu na dhana hii mpya ya ugatuzi.

## Mahitaji (yasiyo ya lazima) {#soft-prerequisites}

Chapisho hili linalenga kufikiwa na wasanidi programu mbalimbali. [Zana za Python](/developers/docs/programming-languages/python/) zitatumika, lakini ni kama chombo tu cha kuwasilisha mawazo – hakuna shida kama wewe si msanidi programu wa Python. Hata hivyo, nitakuwa na mawazo machache kuhusu kile ambacho tayari unakijua, ili tuweze kuendelea haraka na sehemu mahususi za Ethereum.

Mawazo:

- Unaweza kutumia terminal,
- Umeandika mistari michache ya msimbo wa Python,
- Toleo la Python 3.6 au la juu zaidi limesakinishwa kwenye kompyuta yako (matumizi ya [mazingira ya mtandaoni](https://realpython.com/effective-python-environment/#virtual-environments) yanapendekezwa sana), na
- umetumia `pip`, kisakinishi cha vifurushi cha Python.
  Tena, ikiwa yoyote kati ya haya si kweli, au huna mpango wa kuiga msimbo katika makala hii, bado unaweza kufuatilia vizuri tu.

## Minyororo ya bloku, kwa ufupi {#blockchains-briefly}

Kuna njia nyingi za kuelezea Ethereum, lakini kiini chake ni mnyororo wa bloku. Minyororo ya bloku huundwa na mfululizo wa bloku, kwa hivyo tuanzie hapo. Kwa maneno rahisi, kila bloku kwenye mnyororo wa bloku wa Ethereum ni metadata fulani na orodha ya miamala. Katika umbizo la JSON, inaonekana kama hivi:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Kila [bloku](/developers/docs/blocks/) ina rejeleo la bloku iliyotangulia; `parentHash` ni hashi tu ya bloku iliyopita.

<FeaturedText>Kumbuka: Ethereum hutumia mara kwa mara <a href="https://wikipedia.org/wiki/Hash_function">kazi za hashi</a> kutoa thamani za ukubwa usiobadilika ("hashi"). Hashi zina jukumu muhimu katika Ethereum, lakini kwa sasa unaweza kuzichukulia kama vitambulisho vya kipekee.</FeaturedText>

![Mchoro unaoonyesha mnyororo wa bloku pamoja na data ndani ya kila bloku](./blockchain-diagram.png)

_Mnyororo wa bloku kimsingi ni orodha iliyounganishwa; kila bloku ina rejeleo la bloku iliyopita._

Muundo huu wa data si jambo jipya, lakini sheria (yaani, itifaki za rika-kwa-rika) zinazoongoza mtandao ndizo zilizo mpya. Hakuna mamlaka kuu; mtandao wa marika lazima ushirikiane ili kuendeleza mtandao, na kushindana kuamua ni miamala ipi itakayojumuishwa katika bloku inayofuata. Kwa hivyo, unapotaka kumtumia rafiki pesa, utahitaji kutangaza muamala huo kwa mtandao, kisha subiri ujumuishwe katika bloku ijayo.

Njia pekee ya mnyororo wa bloku kuthibitisha kuwa pesa zilitumwa kweli kutoka kwa mtumiaji mmoja hadi mwingine ni kutumia sarafu asili ya (yaani, iliyoundwa na kusimamiwa na) mnyororo huo wa bloku. Katika Ethereum, sarafu hii inaitwa ether, na mnyororo wa bloku wa Ethereum una rekodi rasmi pekee ya salio za akaunti.

## Dhana mpya {#a-new-paradigm}

Rundo hili jipya la teknolojia ya ugatuzi limechochea zana mpya za wasanidi programu. Zana kama hizo zipo katika lugha nyingi za programu, lakini tutakuwa tukiangalia kupitia lenzi ya Python. Kukariri: hata kama Python si lugha unayoipendelea, haipaswi kuwa shida sana kufuatilia.

Wasanidi programu wa Python wanaotaka kuingiliana na Ethereum huenda wakatumia [Web3.py](https://web3py.readthedocs.io/). Web3.py ni maktaba inayorahisisha sana jinsi unavyounganisha kwenye nodi ya Ethereum, kisha kutuma na kupokea data kutoka kwayo.

<FeaturedText>Kumbuka: "Nodi ya Ethereum" na "Mteja wa Ethereum" hutumika kwa kubadilishana. Katika hali zote mbili, inarejelea programu ambayo mshiriki katika mtandao wa Ethereum anatumia. Programu hii inaweza kusoma data ya bloku, kupokea sasisho wakati bloku mpya zinaongezwa kwenye mnyororo, kutangaza miamala mipya, na zaidi. Kitaalamu, mteja ni programu, nodi ni kompyuta inayoendesha programu hiyo.</FeaturedText>

[Wateja wa Ethereum](/developers/docs/nodes-and-clients/) wanaweza kusanidiwa kufikiwa na [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP, au Websockets, kwa hivyo Web3.py itahitaji kuiga usanidi huu. Web3.py inarejelea chaguo hizi za muunganisho kama **watoa huduma**. Utataka kuchagua mmoja wa watoa huduma watatu ili kuunganisha tukio la Web3.py na nodi yako.

![Mchoro unaoonyesha jinsi web3.py inavyotumia IPC kuunganisha programu yako na nodi ya Ethereum](./web3py-and-nodes.png)

_Sanidi nodi ya Ethereum na Web3.py ili kuwasiliana kupitia itifaki ileile, k.m., IPC katika mchoro huu._

Mara tu Web3.py itakaposanidiwa vizuri, unaweza kuanza kuingiliana na mnyororo wa bloku. Hapa kuna mifano michache ya matumizi ya Web3.py kama onyesho la kile kitakachofuata:

```python
# soma data ya bloku:
w3.eth.get_block('latest')

# tuma muamala:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Usakinishaji {#installation}

Katika mwongozo huu, tutakuwa tukifanya kazi ndani ya mkalimani wa Python tu. Hatutakuwa tukitengeneza saraka, faili, madarasa au kazi zozote.

<FeaturedText>Kumbuka: Katika mifano iliyo hapa chini, amri zinazoanza na `$` zimekusudiwa kuendeshwa kwenye terminal. (Usiandike `$`, inaashiria tu mwanzo wa mstari.)</FeaturedText>

Kwanza, sakinisha [IPython](https://ipython.org/) kwa mazingira rahisi ya mtumiaji ya kuchunguza. IPython inatoa ukamilishaji wa kichupo, miongoni mwa vipengele vingine, na kuifanya iwe rahisi zaidi kuona kinachowezekana ndani ya Web3.py.

```bash
pip install ipython
```

Web3.py imechapishwa chini ya jina `web3`. Isakinishe kama ifuatavyo:

```bash
pip install web3
```

Jambo moja zaidi – tutaiga mnyororo wa bloku baadaye, jambo ambalo linahitaji vitegemezi vingine vichache. Unaweza kuzisakinisha kupitia:

```bash
pip install 'web3[tester]'
```

Uko tayari kuanza!

Kumbuka: Kifurushi cha `web3[tester]` hufanya kazi hadi Python 3.10.xx

## Anzisha sanduku la mchanga {#spin-up-a-sandbox}

Fungua mazingira mapya ya Python kwa kuendesha `ipython` kwenye terminal yako. Hii inalinganishwa na kuendesha `python`, lakini inakuja na mambo mengi zaidi.

```bash
ipython
```

Hii itachapisha habari fulani kuhusu matoleo ya Python na IPython unayotumia, kisha unapaswa kuona kidokezo kinachosubiri uingizaji:

```python
In [1]:
```

Sasa unaangalia ganda la maingiliano la Python. Kimsingi, ni sanduku la mchanga la kuchezea. Ikiwa umefika hapa, ni wakati wa kuingiza Web3.py:

```python
In [1]: from web3 import Web3
```

## Kutambulisha moduli ya Web3 {#introducing-the-web3-module}

Licha ya kuwa lango la Ethereum, moduli ya [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) hutoa kazi chache za urahisi. Hebu tuchunguze kadhaa.

Katika programu ya Ethereum, kwa kawaida utahitaji kubadilisha madhehebu ya sarafu. Moduli ya Web3 hutoa mbinu kadhaa za usaidizi kwa ajili ya hili tu: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) na [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Kumbuka: Kompyuta ni mbaya sana katika kushughulikia hesabu za desimali. Ili kuepuka hili, wasanidi programu mara nyingi huhifadhi kiasi cha dola katika senti. Kwa mfano, bidhaa yenye bei ya $5.99 inaweza kuhifadhiwa kwenye hifadhidata kama 599.

Mfumo kama huo hutumiwa wakati wa kushughulikia miamala katika <b>ether</b>. Hata hivyo, badala ya nukta mbili za desimali, ether ina 18! Dhehebu dogo zaidi la ether linaitwa <b>wei</b>, kwa hivyo hiyo ndiyo thamani iliyobainishwa wakati wa kutuma miamala.

ether 1 = wei 1000000000000000000

wei 1 = ether 0.000000000000000001

</FeaturedText>

Jaribu kubadilisha baadhi ya thamani kwenda na kutoka wei. Kumbuka kwamba [kuna majina kwa madhehebu mengi](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) kati ya ether na wei. Mojawapo ya inayojulikana zaidi kati yao ni **gwei**, kwani mara nyingi ndivyo ada za muamala zinavyowakilishwa.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Mbinu zingine za matumizi kwenye moduli ya Web3 ni pamoja na vibadilishaji umbizo la data (k.m., [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), wasaidizi wa anwani (k.m., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)), na kazi za hashi (k.m., [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Mengi ya haya yatajadiliwa baadaye katika mfululizo huu. Ili kuona mbinu na sifa zote zinazopatikana, tumia ukamilishaji kiotomatiki wa IPython kwa kuandika `Web3`. na kugonga kitufe cha kichupo mara mbili baada ya kipindi.

## Zungumza na mnyororo {#talk-to-the-chain}

Mbinu za urahisi ni nzuri, lakini hebu tuendelee kwenye mnyororo wa bloku. Hatua inayofuata ni kusanidi Web3.py ili kuwasiliana na nodi ya Ethereum. Hapa tuna chaguo la kutumia watoa huduma wa IPC, HTTP, au Websocket.

Hatutapitia njia hii, lakini mfano wa mtiririko kamili wa kazi kwa kutumia Mtoa huduma wa HTTP unaweza kuonekana kama hivi:

- Pakua nodi ya Ethereum, k.m., [Geth](https://geth.ethereum.org/).
- Anzisha Geth katika dirisha moja la terminal na usubiri isawazishe mtandao. Lango la msingi la HTTP ni `8545`, lakini linaweza kusanidiwa.
- Iambie Web3.py iunganishe kwenye nodi kupitia HTTP, kwenye `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Tumia tukio la `w3` ili kuingiliana na nodi.

Ingawa hii ni njia moja "halisi" ya kufanya hivyo, mchakato wa kusawazisha huchukua masaa na si lazima ikiwa unataka tu mazingira ya usanidi. Web3.py inaonyesha mtoa huduma wa nne kwa madhumuni haya, **EthereumTesterProvider**. Mtoa huduma huyu wa majaribio anaunganisha kwenye nodi ya Ethereum iliyoigwa yenye ruhusa zilizolegezwa na sarafu bandia ya kuchezea.

![Mchoro unaoonyesha EthereumTesterProvider ikiunganisha programu yako ya web3.py na nodi ya Ethereum iliyoigwa](./ethereumtesterprovider.png)

_EthereumTesterProvider huunganisha kwenye nodi iliyoigwa na ni muhimu kwa mazingira ya usanidi wa haraka._

Nodi hiyo iliyoigwa inaitwa [eth-tester](https://github.com/ethereum/eth-tester) na tuliisakikisha kama sehemu ya amri ya `pip install web3[tester]`. Kusanidi Web3.py kutumia mtoa huduma huyu wa majaribio ni rahisi kama:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Sasa uko tayari kutembelea mnyororo! Hilo si jambo ambalo watu husema. Nimebuni tu. Hebu tufanye ziara ya haraka.

## Ziara ya haraka {#the-quick-tour}

Kwanza kabisa, ukaguzi wa haraka:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Kwa kuwa tunatumia mtoa huduma wa majaribio, hili si jaribio la thamani sana, lakini likishindikana, kuna uwezekano uliandika kitu kimakosa ulipokuwa ukianzisha kigezo cha `w3`. Hakikisha mara mbili kuwa umejumuisha mabano ya ndani, yaani, `Web3.EthereumTesterProvider()`.

## Kituo cha ziara #1: [akaunti](/developers/docs/accounts/) {#tour-stop-1-accounts}

Ili kurahisisha, mtoa huduma wa majaribio alitengeneza akaunti na kuziwekea ether ya majaribio.

Kwanza, hebu tuone orodha ya akaunti hizo:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Ukitekeleza amri hii, unapaswa kuona orodha ya nyuzi kumi zinazoanza na `0x`. Kila moja ni **anwani ya umma** na kwa namna fulani, inafanana na nambari ya akaunti kwenye akaunti ya hundi. Ungetoa anwani hii kwa mtu anayetaka kukutumia ether.

Kama ilivyotajwa, mtoa huduma wa majaribio ameweka ether ya majaribio katika kila akaunti hizi. Hebu tujue ni kiasi gani kiko kwenye akaunti ya kwanza:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Hizo ni sufuri nyingi sana! Kabla ya kucheka hadi benki bandia, kumbuka somo kuhusu madhehebu ya sarafu la awali. Thamani za Ether huwakilishwa katika dhehebu dogo zaidi, wei. Badilisha hiyo iwe ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Ether milioni moja za majaribio — bado si haba.

## Kituo cha ziara #2: data ya bloku {#tour-stop-2-block-data}

Hebu tuangalie hali ya mnyororo huu wa bloku ulioigwa:

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

Habari nyingi hurudishwa kuhusu bloku, lakini kuna mambo kadhaa ya kuonyesha hapa:

- Nambari ya bloku ni sifuri — haijalishi ni muda gani umepita tangu usanidi mtoa huduma wa majaribio. Tofauti na mtandao halisi wa Ethereum, ambao huongeza bloku mpya kila sekunde 12, uigaji huu utasubiri hadi uupe kazi ya kufanya.
- `transactions` ni orodha tupu, kwa sababu ileile: bado hatujafanya chochote. Bloku hii ya kwanza ni **bloku tupu**, ili tu kuanzisha mnyororo.
- Angalia kwamba `parentHash` ni kundi tu la baiti tupu. Hii inaashiria kuwa ni bloku ya kwanza kwenye mnyororo, pia inajulikana kama **bloku ya mwanzo**.

## Kituo cha ziara #3: [miamala](/developers/docs/transactions/) {#tour-stop-3-transactions}

Tumenaswa kwenye bloku sifuri hadi kuwe na muamala unaosubiri, kwa hivyo hebu tuupe mmoja. Tuma ether chache za majaribio kutoka akaunti moja hadi nyingine:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Kwa kawaida hapa ndipo mahali ambapo ungesubiri kwa sekunde kadhaa ili muamala wako ujumuishwe katika bloku mpya. Mchakato mzima unaenda kama hivi:

1. Wasilisha muamala na ushikilie hashi ya muamala. Hadi bloku iliyo na muamala itakapoundwa na kutangazwa, muamala huo "unasubiri."
   `tx_hash = w3.eth.send_transaction({ … })`
2. Subiri muamala ujumuishwe katika bloku:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Endelea na mantiki ya programu. Ili kuona muamala uliofanikiwa:
   `w3.eth.get_transaction(tx_hash)`

Mazingira yetu yaliyoigwa yataongeza muamala katika bloku mpya mara moja, kwa hivyo tunaweza kuona muamala mara moja:

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

Utaona maelezo ya kawaida hapa: sehemu za `from`, `to`, na `value` zinapaswa kufanana na viingizo vya wito wetu wa `send_transaction`. Jambo lingine la kutia moyo ni kwamba muamala huu ulijumuishwa kama muamala wa kwanza (`'transactionIndex': 0`) ndani ya bloku nambari 1.

Tunaweza pia kuthibitisha kwa urahisi mafanikio ya muamala huu kwa kuangalia salio la akaunti mbili zinazohusika. Ether tatu zinapaswa kuwa zimehamishwa kutoka moja hadi nyingine.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Ya mwisho inaonekana vizuri! Salio liliongezeka kutoka ether 1,000,000 hadi 1,000,003. Lakini nini kilitokea kwa akaunti ya kwanza? Inaonekana imepoteza ether zaidi kidogo ya tatu. Ole, hakuna kitu maishani bure, na kutumia mtandao wa umma wa Ethereum kunahitaji uwalipe wenzako kwa jukumu lao la kusaidia. Ada ndogo ya muamala ilikatwa kutoka kwenye akaunti iliyowasilisha muamala - ada hii ni kiasi cha gesi iliyotumika (vitengo 21000 vya gesi kwa uhamisho wa ETH) kilichozidishwa na ada ya msingi ambayo hutofautiana kulingana na shughuli za mtandao pamoja na bakshishi inayokwenda kwa mthibitishaji anayejumuisha muamala katika bloku.

Zaidi kuhusu [gesi](/developers/docs/gas/#post-london)

<FeaturedText>Kumbuka: Kwenye mtandao wa umma, ada za muamala hubadilika kulingana na mahitaji ya mtandao na jinsi unavyotaka muamala uchakatwe haraka. Ikiwa una nia ya uchanganuzi wa jinsi ada zinavyokokotolewa, angalia chapisho langu la awali kuhusu <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">jinsi miamala inavyojumuishwa katika bloku</a>.</FeaturedText>

## Na pumua {#and-breathe}

Tumekuwa tukifanya hivi kwa muda, kwa hivyo hapa panaonekana kuwa mahali pazuri pa kupumzika. Safari ya uchunguzi wa kina inaendelea, na tutaendelea kuchunguza katika sehemu ya pili ya mfululizo huu. Baadhi ya dhana zijazo: kuunganisha kwenye nodi halisi, mikataba-erevu, na tokeni. Una maswali ya kufuatilia? Nijulishe! Maoni yako yataathiri wapi tutaelekea kutoka hapa. Maombi yanakaribishwa kupitia [Twitter](https://twitter.com/wolovim).
