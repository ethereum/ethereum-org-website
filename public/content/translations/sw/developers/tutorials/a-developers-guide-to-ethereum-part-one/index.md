---
title: Utangulizi wa Ethereum kwa msanidi wa Python, sehemu ya 1
description: Utangulizi wa uundaji wa Ethereum, muhimu hasa kwa wale walio na ujuzi wa lugha ya programu ya Python
author: Marc Garreau
lang: sw
tags: ["python", "web3.py"]
skill: beginner
breadcrumb: Ethereum na Python
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Kwa hivyo, umesikia kuhusu hii kitu inayoitwa Ethereum na uko tayari kuchunguza kwa kina? Chapisho hili litashughulikia kwa haraka baadhi ya misingi ya mnyororo wa vitalu, kisha litakuwezesha kuingiliana na nodi ya Ethereum iliyoigwa – kusoma data ya kitalu, kuangalia salio la akaunti, na kutuma miamala. Njiani, tutaangazia tofauti kati ya njia za kitamaduni za kuunda programu na mtazamo huu mpya uliogatuliwa.

## Mahitaji (Mepesi) ya awali {#soft-prerequisites}

Chapisho hili linalenga kufikiwa na anuwai ya wasanidi. [Zana za Python](/developers/docs/programming-languages/python/) zitahusika, lakini ni njia tu ya kuwasilisha mawazo – hakuna shida ikiwa wewe si msanidi wa Python. Hata hivyo, nitafanya dhana chache tu kuhusu kile unachojua tayari, ili tuweze kuendelea haraka na sehemu mahususi za Ethereum.

Dhana:

- Unaweza kutumia terminali,
- Umeandika mistari michache ya msimbo wa Python,
- Toleo la Python 3.6 au la juu zaidi limesakinishwa kwenye mashine yako (matumizi ya [mazingira pepe](https://realpython.com/effective-python-environment/#virtual-environments) yanahimizwa sana), na
- umetumia `pip`, kisakinishi cha kifurushi cha Python.
  Tena, ikiwa yoyote kati ya haya si kweli, au hupangi kurudia msimbo katika makala haya, bado unaweza kufuatilia vizuri tu.

## Minyororo ya vitalu, kwa ufupi {#blockchains-briefly}

Kuna njia nyingi za kuelezea Ethereum, lakini kiini chake ni mnyororo wa vitalu. Minyororo ya vitalu inaundwa na mfululizo wa vitalu, kwa hivyo tuanzie hapo. Kwa maneno rahisi, kila kitalu kwenye mnyororo wa vitalu wa Ethereum ni data fafanuzi tu na orodha ya miamala. Katika umbizo la JSON, inaonekana kama hivi:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Kila [kitalu](/developers/docs/blocks/) kina rejeleo la kitalu kilichotangulia; `parentHash` ni heshi tu ya kitalu kilichotangulia.

<FeaturedText>Kumbuka: Ethereum hutumia mara kwa mara <a href="https://wikipedia.org/wiki/Hash_function">vitendaji vya heshi</a> kutoa thamani za ukubwa usiobadilika (“heshi”). Heshi zina jukumu muhimu katika Ethereum, lakini kwa sasa unaweza kuzichukulia kama vitambulisho vya kipekee.</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_Mnyororo wa vitalu kimsingi ni orodha iliyounganishwa; kila kitalu kina rejeleo la kitalu kilichotangulia._

Muundo huu wa data si mgeni, lakini sheria (yaani, itifaki za rika-kwa-rika) zinazosimamia mtandao ni ngeni. Hakuna mamlaka kuu; mtandao wa marika lazima ushirikiane ili kudumisha mtandao, na kushindana kuamua ni miamala ipi itajumuishwa katika kitalu kijacho. Kwa hivyo, unapotaka kumtumia rafiki pesa, utahitaji kutangaza muamala huo kwenye mtandao, kisha usubiri ujumuishwe kwenye kitalu kijacho.

Njia pekee ya mnyororo wa vitalu kuthibitisha kuwa pesa zilitumwa kweli kutoka kwa mtumiaji mmoja hadi mwingine ni kutumia sarafu asili ya (yaani, iliyoundwa na kusimamiwa na) mnyororo huo wa vitalu. Katika Ethereum, sarafu hii inaitwa Etha, na mnyororo wa vitalu wa Ethereum una rekodi pekee rasmi ya salio la akaunti.

## Mtazamo mpya {#a-new-paradigm}

Mkusanyiko huu mpya wa teknolojia iliyogatuliwa umezalisha zana mpya za wasanidi. Zana kama hizo zipo katika lugha nyingi za programu, lakini tutaangalia kupitia mtazamo wa Python. Kusisitiza: hata kama Python si lugha unayoipendelea, haipaswi kuwa shida sana kufuatilia.

Wasanidi wa Python wanaotaka kuingiliana na Ethereum wana uwezekano wa kutumia [Web3.py](https://web3py.readthedocs.io/). Web3.py ni maktaba inayorahisisha sana njia unayounganisha kwenye nodi ya Ethereum, kisha kutuma na kupokea data kutoka kwayo.

<FeaturedText>Kumbuka: “Nodi ya Ethereum” na “Mteja wa Ethereum” hutumiwa kwa kubadilishana. Katika hali yoyote, inarejelea programu ambayo mshiriki katika mtandao wa Ethereum anaendesha. Programu hii inaweza kusoma data ya kitalu, kupokea masasisho wakati vitalu vipya vinaongezwa kwenye mnyororo, kutangaza miamala mipya, na zaidi. Kitaalam, mteja ni programu, nodi ni kompyuta inayoendesha programu hiyo.</FeaturedText>

[Wateja wa Ethereum](/developers/docs/nodes-and-clients/) wanaweza kusanidiwa kufikiwa na [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP, au Websockets, kwa hivyo Web3.py itahitaji kuakisi usanidi huu. Web3.py inarejelea chaguo hizi za muunganisho kama **watoa huduma**. Utataka kuchagua mmoja wa watoa huduma watatu ili kuunganisha mfano wa Web3.py na nodi yako.

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_Sanidi nodi ya Ethereum na Web3.py ili kuwasiliana kupitia itifaki sawa, k.m., IPC katika mchoro huu._

Mara tu Web3.py inaposanidiwa vizuri, unaweza kuanza kuingiliana na mnyororo wa vitalu. Hapa kuna mifano michache ya matumizi ya Web3.py kama onyesho la kile kitakachokuja:

```python
# soma data za kitalu:
w3.eth.get_block('latest')

# tuma muamala:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Usakinishaji {#installation}

Katika mwongozo huu, tutakuwa tukifanya kazi ndani ya mkalimani wa Python. Hatutaunda saraka, faili, madarasa au vitendaji vyovyote.

<FeaturedText>Kumbuka: Katika mifano hapa chini, amri zinazoanza na `$` zinakusudiwa kuendeshwa kwenye terminali. (Usiandike `$`, inaashiria tu mwanzo wa mstari.)</FeaturedText>

Kwanza, sakinisha [IPython](https://ipython.org/) kwa mazingira rafiki kwa mtumiaji ya kuchunguza. IPython inatoa ukamilishaji wa kichupo, miongoni mwa vipengele vingine, na kuifanya iwe rahisi zaidi kuona kile kinachowezekana ndani ya Web3.py.

```bash
pip install ipython
```

Web3.py imechapishwa chini ya jina `web3`. Isakinishe hivi:

```bash
pip install web3
```

Jambo moja zaidi – tutaiga mnyororo wa vitalu baadaye, ambayo inahitaji vitegemezi vichache zaidi. Unaweza kusakinisha hizo kupitia:

```bash
pip install 'web3[tester]'
```

Uko tayari kuanza!

Kumbuka: Kifurushi cha `web3[tester]` hufanya kazi hadi Python 3.10.xx

## Anzisha mazingira ya majaribio {#spin-up-a-sandbox}

Fungua mazingira mapya ya Python kwa kuendesha `ipython` kwenye terminali yako. Hii inalinganishwa na kuendesha `python`, lakini inakuja na vipengele vingi zaidi.

```bash
ipython
```

Hii itachapisha baadhi ya taarifa kuhusu matoleo ya Python na IPython unayoendesha, kisha unapaswa kuona kidokezo kinachosubiri ingizo:

```python
In [1]:
```

Sasa unaangalia ganda la Python linaloingiliana. Kimsingi, ni mazingira ya majaribio ya kuchezea. Ikiwa umefika hapa, ni wakati wa kuleta Web3.py:

```python
In [1]: from web3 import Web3
```

## Kutambulisha moduli ya Web3 {#introducing-the-web3-module}

Kando na kuwa lango la Ethereum, moduli ya [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) inatoa vitendaji vichache vya urahisi. Hebu tuchunguze vichache.

Katika programu ya Ethereum, kwa kawaida utahitaji kubadilisha thamani za sarafu. Moduli ya Web3 hutoa mbinu chache za usaidizi kwa ajili ya hili tu: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) na [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Kumbuka: Kompyuta ni mbaya sana katika kushughulikia hesabu za desimali. Ili kuepuka hili, wasanidi mara nyingi huhifadhi kiasi cha dola katika senti. Kwa mfano, bidhaa yenye bei ya $5.99 inaweza kuhifadhiwa kwenye hifadhidata kama 599.

Mtindo sawa hutumiwa wakati wa kushughulikia miamala katika <b>Etha</b>. Hata hivyo, badala ya sehemu mbili za desimali, Etha ina 18! Thamani ndogo zaidi ya Etha inaitwa <b>Wei</b>, kwa hivyo hiyo ndiyo thamani inayobainishwa wakati wa kutuma miamala.

Etha 1 = Wei 1000000000000000000

Wei 1 = Etha 0.000000000000000001

</FeaturedText>

Jaribu kubadilisha baadhi ya thamani kwenda na kutoka Wei. Kumbuka kwamba [kuna majina kwa nyingi ya thamani](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) kati ya Etha na Wei. Moja ya zinazojulikana zaidi kati yao ni **Gwei**, kwani mara nyingi ndivyo ada za muamala zinavyowakilishwa.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Mbinu zingine za matumizi kwenye moduli ya Web3 ni pamoja na vibadilishaji vya umbizo la data (k.m., [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), wasaidizi wa anwani (k.m., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)), na vitendaji vya heshi (k.m., [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Nyingi ya hizi zitashughulikiwa baadaye katika mfululizo huu. Ili kutazama mbinu na sifa zote zinazopatikana, tumia ukamilishaji otomatiki wa IPython kwa kuandika `Web3`. na kubonyeza kitufe cha tab mara mbili baada ya nukta.

## Wasiliana na mnyororo {#talk-to-the-chain}

Mbinu za urahisi ni nzuri, lakini tuendelee kwenye mnyororo wa vitalu. Hatua inayofuata ni kusanidi Web3.py ili kuwasiliana na nodi ya Ethereum. Hapa tuna chaguo la kutumia watoa huduma wa IPC, HTTP, au Websocket.

Hatutapitia njia hii, lakini mfano wa mtiririko kamili wa kazi kwa kutumia Mtoa Huduma wa HTTP unaweza kuonekana kama hivi:

- Pakua nodi ya Ethereum, k.m., [Geth](https://geth.ethereum.org/).
- Anzisha Geth katika dirisha moja la terminali na usubiri isawazishe mtandao. Lango chaguomsingi la HTTP ni `8545`, lakini linaweza kusanidiwa.
- Iambie Web3.py iunganishe kwenye nodi kupitia HTTP, kwenye `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Tumia mfano wa `w3` kuingiliana na nodi.

Ingawa hii ni njia moja “halisi” ya kufanya hivyo, mchakato wa usawazishaji huchukua saa nyingi na si wa lazima ikiwa unataka tu mazingira ya uundaji. Web3.py inafichua mtoa huduma wa nne kwa madhumuni haya, **EthereumTesterProvider**. Mtoa huduma huyu wa majaribio huunganisha kwenye nodi ya Ethereum iliyoigwa yenye ruhusa zilizolegezwa na sarafu bandia ya kuchezea.

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_EthereumTesterProvider huunganisha kwenye nodi iliyoigwa na inafaa kwa mazingira ya haraka ya uundaji._

Nodi hiyo iliyoigwa inaitwa [eth-tester](https://github.com/ethereum/eth-tester) na tuliisakinisha kama sehemu ya amri ya `pip install web3[tester]`. Kusanidi Web3.py kutumia mtoa huduma huyu wa majaribio ni rahisi kama:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Sasa uko tayari kuvinjari mnyororo! Hilo si jambo ambalo watu husema. Nimebuni tu. Hebu tufanye ziara ya haraka.

## Ziara ya haraka {#the-quick-tour}

Kwanza kabisa, ukaguzi wa uhakika:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Kwa kuwa tunatumia mtoa huduma wa majaribio, hili si jaribio la thamani sana, lakini likishindwa, kuna uwezekano uliandika kitu vibaya wakati wa kuanzisha kigezo cha `w3`. Hakikisha tena kwamba umejumuisha mabano ya ndani, yaani, `Web3.EthereumTesterProvider()`.

## Kituo cha ziara #1: [akaunti](/developers/docs/accounts/) {#tour-stop-1-accounts}

Kama urahisi, mtoa huduma wa majaribio aliunda baadhi ya akaunti na kuzipakia mapema na Etha ya majaribio.

Kwanza, hebu tuone orodha ya akaunti hizo:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Ikiwa utaendesha amri hii, unapaswa kuona orodha ya mifuatano kumi inayoanza na `0x`. Kila moja ni **anwani ya umma** na, kwa njia fulani, inafanana na nambari ya akaunti kwenye akaunti ya hundi. Ungempa anwani hii mtu ambaye angetaka kukutumia Etha.

Kama ilivyotajwa, mtoa huduma wa majaribio amepakia mapema kila moja ya akaunti hizi na Etha ya majaribio. Hebu tujue ni kiasi gani kiko kwenye akaunti ya kwanza:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Hizo ni sifuri nyingi! Kabla hujaenda ukicheka hadi kwenye benki bandia, kumbuka somo lile kuhusu thamani za sarafu kutoka awali. Thamani za Etha zinawakilishwa katika thamani ndogo zaidi, Wei. Badilisha hiyo iwe Etha:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Etha milioni moja ya majaribio — bado si haba.

## Kituo cha ziara #2: data ya kitalu {#tour-stop-2-block-data}

Hebu tuchunguze hali ya mnyororo huu wa vitalu ulioigwa:

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

Taarifa nyingi hurejeshwa kuhusu kitalu, lakini mambo machache tu ya kuangazia hapa:

- Nambari ya kitalu ni sifuri — haijalishi ni muda gani uliopita ulisanidi mtoa huduma wa majaribio. Tofauti na mtandao halisi wa Ethereum, ambao huongeza kitalu kipya kila sekunde 12, uigaji huu utangoja hadi uupe kazi ya kufanya.
- `transactions` ni orodha tupu, kwa sababu hiyo hiyo: hatujafanya chochote bado. Kitalu hiki cha kwanza ni **kitalu kitupu**, ili tu kuanzisha mnyororo.
- Kumbuka kwamba `parentHash` ni kundi tu la baiti tupu. Hii inaashiria kwamba ni kitalu cha kwanza katika mnyororo, kinachojulikana pia kama **kitalu cha asili**.

## Kituo cha ziara #3: [miamala](/developers/docs/transactions/) {#tour-stop-3-transactions}

Tumekwama kwenye kitalu sifuri hadi kuwe na muamala unaosubiri, kwa hivyo hebu tuupe mmoja. Tuma Etha chache za majaribio kutoka akaunti moja hadi nyingine:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Hapa ndipo kwa kawaida ungesubiri kwa sekunde kadhaa ili muamala wako ujumuishwe kwenye kitalu kipya. Mchakato kamili unaenda kama hivi:

1. Wasilisha muamala na ushikilie heshi ya muamala. Hadi kitalu kinachojumuisha muamala kiundwe na kutangazwa, muamala huo “unasubiri.”
   `tx_hash = w3.eth.send_transaction({ … })`
2. Subiri muamala ujumuishwe kwenye kitalu:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Endelea na mantiki ya programu. Ili kutazama muamala uliofanikiwa:
   `w3.eth.get_transaction(tx_hash)`

Mazingira yetu yaliyoigwa yataongeza muamala katika kitalu kipya papo hapo, kwa hivyo tunaweza kutazama muamala mara moja:

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

Utaona baadhi ya maelezo unayoyafahamu hapa: sehemu za `from`, `to`, na `value` zinapaswa kulingana na ingizo la wito wetu wa `send_transaction`. Jambo lingine la kutia moyo ni kwamba muamala huu ulijumuishwa kama muamala wa kwanza (`'transactionIndex': 0`) ndani ya kitalu nambari 1.

Tunaweza pia kuthibitisha kwa urahisi mafanikio ya muamala huu kwa kuangalia salio la akaunti mbili zinazohusika. Etha tatu zinapaswa kuwa zimehamishwa kutoka moja hadi nyingine.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Ya mwisho inaonekana nzuri! Salio lilitoka Etha 1,000,000 hadi 1,000,003. Lakini nini kilitokea kwa akaunti ya kwanza? Inaonekana imepoteza zaidi kidogo ya Etha tatu. Ala, hakuna kitu maishani kilicho cha bure, na kutumia mtandao wa umma wa Ethereum kunahitaji uwafidie marika wako kwa jukumu lao la kusaidia. Ada ndogo ya muamala ilikatwa kutoka kwa akaunti iliyowasilisha muamala - ada hii ni kiasi cha gesi iliyochomwa (yunit 21000 za gesi kwa hamisho la ETH) ikizidishwa na ada ya msingi ambayo inatofautiana kulingana na shughuli za mtandao pamoja na ada ya kipaumbele inayoenda kwa mthibitishaji anayejumuisha muamala kwenye kitalu.

Zaidi kuhusu [gesi](/developers/docs/gas/#post-london)

<FeaturedText>Kumbuka: Kwenye mtandao wa umma, ada za muamala zinabadilika kulingana na mahitaji ya mtandao na jinsi unavyotaka muamala uchakatwe haraka. Ikiwa una nia ya mchanganuo wa jinsi ada zinavyokokotolewa, tazama chapisho langu la awali kuhusu <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">jinsi miamala inavyojumuishwa kwenye kitalu</a>.</FeaturedText>

## Na pumua {#and-breathe}

Tumekuwa tukifanya hivi kwa muda, kwa hivyo hapa panaonekana kuwa mahali pazuri pa kupumzika. Uchunguzi wa kina unaendelea, na tutaendelea kuchunguza katika sehemu ya pili ya mfululizo huu. Baadhi ya dhana zinazokuja: kuunganisha kwenye nodi halisi, mikataba mahiri, na tokeni. Una maswali ya ufuatiliaji? Nijulishe! Maoni yako yataathiri tunakoelekea kutoka hapa. Maombi yanakaribishwa kupitia [Twitter](https://twitter.com/wolovim).