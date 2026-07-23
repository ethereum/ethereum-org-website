---
title: Miamala
description: "Muhtasari wa miamala ya Ethereum – jinsi inavyofanya kazi, muundo wa data zake, na jinsi ya kuituma kupitia programu."
lang: sw
---

Miamala ni maagizo yaliyosainiwa kwa njia ya kriptografia kutoka kwenye akaunti. Akaunti itaanzisha muamala ili kusasisha hali ya mtandao wa [Ethereum](/). Muamala rahisi zaidi ni kuhamisha ETH kutoka akaunti moja hadi nyingine.

## Mahitaji ya Awali {#prerequisites}

Ili kukusaidia kuelewa ukurasa huu vizuri zaidi, tunapendekeza usome kwanza [Akaunti](/developers/docs/accounts/) na [utangulizi wetu wa Ethereum](/developers/docs/intro-to-ethereum/).

## Muamala ni nini? {#whats-a-transaction}

Muamala wa Ethereum unarejelea kitendo kilichoanzishwa na akaunti inayomilikiwa na mtu wa nje, kwa maneno mengine akaunti inayosimamiwa na binadamu, si mkataba. Kwa mfano, ikiwa Bob atamtumia Alice 1 ETH, akaunti ya Bob lazima ikatwe na ya Alice lazima iongezwe. Kitendo hiki cha kubadilisha hali hufanyika ndani ya muamala.

![Diagram showing a transaction cause state change](./tx.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Miamala, ambayo hubadilisha hali ya EVM, inahitaji kutangazwa kwa mtandao mzima. Nodi yoyote inaweza kutangaza ombi la muamala kutekelezwa kwenye EVM; baada ya hili kutokea, mthibitishaji atatekeleza muamala na kusambaza mabadiliko ya hali yanayotokana kwa mtandao uliosalia.

Miamala inahitaji ada na lazima ijumuishe kwenye kitalu kilichothibitishwa. Ili kufanya muhtasari huu kuwa rahisi tutaangazia ada za gesi na uthibitishaji mahali pengine.

Muamala uliowasilishwa unajumuisha taarifa zifuatazo:

- `from` – anwani ya mtumaji, ambaye atasaini muamala. Hii itakuwa akaunti inayomilikiwa na mtu wa nje kwa kuwa akaunti za mkataba haziwezi kutuma miamala
- `to` – anwani inayopokea (ikiwa ni akaunti inayomilikiwa na mtu wa nje, muamala utahamisha thamani. Ikiwa ni akaunti ya mkataba, muamala utatekeleza msimbo wa mkataba)
- `signature` – kitambulisho cha mtumaji. Hiki huzalishwa wakati ufunguo wa siri wa mtumaji unaposaini muamala na kuthibitisha kuwa mtumaji ameidhinisha muamala huu
- `nonce` - kihesabio kinachoongezeka kwa mfuatano ambacho kinaonyesha nambari ya muamala kutoka kwenye akaunti
- `value` – kiasi cha ETH cha kuhamisha kutoka kwa mtumaji kwenda kwa mpokeaji (kikipimwa kwa Wei, ambapo 1ETH ni sawa na 1e+18wei)
- `input data` – sehemu ya hiari ya kujumuisha data yoyote
- `gasLimit` – kiwango cha juu cha uniti za gesi zinazoweza kutumiwa na muamala. [EVM](/developers/docs/evm/opcodes) inabainisha uniti za gesi zinazohitajika kwa kila hatua ya ukokotoaji
- `maxPriorityFeePerGas` - bei ya juu zaidi ya gesi iliyotumika kujumuishwa kama ada ya kipaumbele kwa mthibitishaji
- `maxFeePerGas` - ada ya juu zaidi kwa kila uniti ya gesi iliyo tayari kulipwa kwa ajili ya muamala (ikijumuisha `baseFeePerGas` na `maxPriorityFeePerGas`)

Gesi ni rejeleo la ukokotoaji unaohitajika ili kuchakata muamala na mthibitishaji. Watumiaji wanapaswa kulipa ada kwa ukokotoaji huu. `gasLimit`, na `maxPriorityFeePerGas` huamua ada ya juu zaidi ya muamala inayolipwa kwa mthibitishaji. [Zaidi kuhusu Gesi](/developers/docs/gas/).

Kipengee cha muamala kitaonekana hivi:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Lakini kipengee cha muamala kinahitaji kusainiwa kwa kutumia ufunguo wa siri wa mtumaji. Hii inathibitisha kuwa muamala ungeweza tu kutoka kwa mtumaji na haukutumwa kwa njia ya udanganyifu.

Mteja wa Ethereum kama Geth atashughulikia mchakato huu wa kusaini.

Mfano wa mwito wa [JSON-RPC](/developers/docs/apis/json-rpc):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Mfano wa majibu:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` ni muamala uliosainiwa katika muundo uliosimbwa wa [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- `tx` ni muamala uliosainiwa katika muundo wa JSON

Kwa heshi ya sahihi, muamala unaweza kuthibitishwa kwa njia ya kriptografia kuwa ulitoka kwa mtumaji na kuwasilishwa kwenye mtandao.

### Sehemu ya data {#the-data-field}

Idadi kubwa ya miamala hufikia mkataba kutoka kwenye akaunti inayomilikiwa na mtu wa nje.
Mikataba mingi imeandikwa kwa Solidity na inatafsiri sehemu yao ya data kwa mujibu wa [application binary interface (ABI)](/glossary/#abi).

Baiti nne za kwanza zinabainisha ni kipengele kipi cha kuita, kwa kutumia heshi ya jina la kipengele na hoja zake.
Wakati mwingine unaweza kutambua kipengele kutoka kwa kiteuzi ukitumia [hifadhidata hii](https://www.4byte.directory/signatures/).

Sehemu iliyosalia ya data za mwito ni hoja, [zilizosimbwa kama ilivyobainishwa katika vipimo vya ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Kwa mfano, hebu tuangalie [muamala huu](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Tumia **Bofya ili kuona Zaidi** ili kuona data za mwito.

Kiteuzi cha kipengele ni `0xa9059cbb`. Kuna [vipengele kadhaa vinavyojulikana vyenye sahihi hii](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
Katika hali hii [msimbo chanzo wa mkataba](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) umepakiwa kwenye Etherscan, kwa hivyo tunajua kipengele ni `transfer(address,uint256)`.

Data iliyosalia ni:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Kulingana na vipimo vya ABI, thamani za nambari kamili (kama vile anwani, ambazo ni nambari kamili za baiti 20) huonekana kwenye ABI kama maneno ya baiti 32, yaliyojazwa na sufuri mbele.
Kwa hivyo tunajua kwamba anwani ya `to` ni [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
`value` ni 0x3b0559f4 = 990206452.

### Vifafanuzi vya muamala {#transaction-descriptors}

Kwa sababu sehemu ya data ina baiti za heksadesimali zisizoeleweka, inaweza kuwa vigumu sana kuthibitisha ni kitendo gani muamala utafanya haswa. Udhaifu huu wa "kusaini bila kuona" unashughulikiwa na **[Kusaini kwa Uwazi](https://clearsigning.org/)** kupitia matumizi ya [vifafanuzi vya muamala](https://eips.ethereum.org/EIPS/eip-7730) (vilivyofafanuliwa na ERC-7730).  

Uainishaji wa ERC-7730 unatumia vifafanuzi vya muamala (mara nyingi vimeundwa kama faili za JSON) ili kuboresha data inayopatikana katika ABI na jumbe zilizoundwa, kama vile data za mwito za muamala wa EVM, jumbe za EIP-712, na Operesheni za Mtumiaji za EIP-4337. Wasanidi programu hutumia vifafanuzi hivi kuweka vigezo maalum vya muamala moja kwa moja kwenye violezo vya uumbizaji, na kuhakikisha data ya msingi inasalia kusomeka na mashine kwa ajili ya programu.

Kwenye upande wa mbele, pochi hutumia muktadha huu wa uumbizaji kutafsiri msimbo wa baiti usioeleweka kuwa taarifa wazi, inayosomeka na binadamu. Kwa kutatua kiotomatiki thamani kama vile anwani za tokeni kuwa alama zinazotambulika, au kiasi kuwa desimali, watumiaji hupewa muhtasari wa lugha nyepesi wa nia halisi ya muamala (k.m., 'Fanya badilishano la 1000 USDC kwa angalau 0.25 ether iliyofungwa (weth)') kabla ya kusaini

## Aina za miamala {#types-of-transactions}

Kwenye Ethereum kuna aina chache tofauti za miamala:

- Miamala ya kawaida: muamala kutoka akaunti moja hadi nyingine.
- Miamala ya usambazaji wa mkataba: muamala usio na anwani ya 'kwenda', ambapo sehemu ya data inatumika kwa msimbo wa mkataba.
- Utekelezaji wa mkataba: muamala unaoingiliana na mkataba mahiri uliosambazwa. Katika hali hii, anwani ya 'kwenda' ni anwani ya mkataba mahiri.

### Kuhusu gesi {#on-gas}

Kama ilivyotajwa, miamala inagharimu [gesi](/developers/docs/gas/) ili kutekelezwa. Miamala rahisi ya hamisho inahitaji uniti 21000 za Gesi.

Kwa hivyo ili Bob amtumie Alice 1 ETH kwa `baseFeePerGas` ya 190 Gwei na `maxPriorityFeePerGas` ya 10 Gwei, Bob atahitaji kulipa ada ifuatayo:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Akaunti ya Bob itakatwa **-1.0042 ETH** (1 ETH kwa Alice + 0.0042 ETH katika ada za gesi)

Akaunti ya Alice itaongezwa **+1.0 ETH**

Ada ya msingi itachomwa **-0.00399 ETH**

Mthibitishaji anabaki na ada ya kipaumbele **+0.000210 ETH**


![Diagram showing how unused gas is refunded](./gas-tx.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gesi yoyote ambayo haijatumika katika muamala inarejeshwa kwenye akaunti ya mtumiaji.

### Mwingiliano wa mkataba mahiri {#smart-contract-interactions}

Gesi inahitajika kwa muamala wowote unaohusisha mkataba mahiri.

Mikataba mahiri inaweza pia kuwa na vipengele vinavyojulikana kama vipengele vya [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) au [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), ambavyo havibadilishi hali ya mkataba. Kwa hivyo, kuita vipengele hivi kutoka kwa EOA hakutahitaji gesi yoyote. Mwito wa msingi wa RPC kwa hali hii ni [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Tofauti na inavyofikiwa kwa kutumia `eth_call`, vipengele hivi vya `view` au `pure` pia huitwa kwa kawaida kwa ndani (yaani, kutoka kwa mkataba wenyewe au kutoka kwa mkataba mwingine) jambo ambalo linagharimu gesi.

## Mzunguko wa maisha wa muamala {#transaction-lifecycle}

Pindi muamala unapowasilishwa yafuatayo hutokea:

1. Heshi ya muamala inazalishwa kwa njia ya kriptografia:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Kisha muamala unatangazwa kwenye mtandao na kuongezwa kwenye kusanyiko la miamala linalojumuisha miamala mingine yote ya mtandao inayosubiri.
3. Mthibitishaji lazima achague muamala wako na kuujumuisha kwenye kitalu ili kuthibitisha muamala na kuuchukulia kuwa "umefaulu".
4. Kadiri muda unavyopita kitalu kilicho na muamala wako kitasasishwa kuwa "kiliyohalalishwa" kisha "kiliokamilishwa". Masasisho haya yanafanya iwe na uhakika zaidi kwamba muamala wako ulifanikiwa na hautawahi kubadilishwa. Pindi kitalu "kiliokamilishwa" kinaweza tu kubadilishwa na shambulio la kiwango cha mtandao ambalo lingegharimu mabilioni mengi ya dola.

## Onyesho la kuona {#a-visual-demo}

Mtazame Austin akikupitisha kwenye miamala, gesi, na uchimbaji.

<VideoWatch slug="transactions-eth-build" />

## Bahasha ya Muamala Iliyoandikwa {#typed-transaction-envelope}

Ethereum hapo awali ilikuwa na muundo mmoja wa miamala. Kila muamala ulikuwa na nonsi, bei ya gesi, kikomo cha gesi, anwani ya kwenda, thamani, data, v, r, na s. Sehemu hizi [zimesimbwa kwa RLP](/developers/docs/data-structures-and-encoding/rlp/), ili kuonekana kama hivi:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum imebadilika ili kusaidia aina nyingi za miamala ili kuruhusu vipengele vipya kama vile orodha za ufikiaji na [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) kutekelezwa bila kuathiri miundo ya miamala ya zamani.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) ndiyo inaruhusu tabia hii. Miamala inatafsiriwa kama:

`TransactionType || TransactionPayload`

Ambapo sehemu zinafafanuliwa kama:

- `TransactionType` - nambari kati ya 0 na 0x7f, kwa jumla ya aina 128 zinazowezekana za miamala.
- `TransactionPayload` - safu yoyote ya baiti iliyofafanuliwa na aina ya muamala.

Kulingana na thamani ya `TransactionType`, muamala unaweza kuainishwa kama:

1. **Miamala ya Aina ya 0 (Ya Zamani):** Muundo asili wa muamala uliotumika tangu kuzinduliwa kwa Ethereum. Haijumuishi vipengele kutoka [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) kama vile ukokotoaji wa ada ya gesi inayobadilika au orodha za ufikiaji za mikataba mahiri. Miamala ya zamani inakosa kiambishi awali maalum kinachoonyesha aina yake katika muundo wake uliopangwa, kuanzia na baiti `0xf8` unapotumia usimbaji wa [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp). Thamani ya TransactionType kwa miamala hii ni `0x0`.

2. **Miamala ya Aina ya 1:** Ilianzishwa katika [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) kama sehemu ya Sasisho la Berlin la Ethereum, miamala hii inajumuisha kigezo cha `accessList`. Orodha hii inabainisha anwani na funguo za hifadhi ambazo muamala unatarajia kufikia, kusaidia kupunguza uwezekano wa gharama za [gesi](/developers/docs/gas/) kwa miamala changamano inayohusisha mikataba mahiri. Mabadiliko ya soko la ada ya EIP-1559 hayajajumuishwa katika miamala ya Aina ya 1. Miamala ya Aina ya 1 pia inajumuisha kigezo cha `yParity`, ambacho kinaweza kuwa `0x0` au `0x1`, kuonyesha usawa wa thamani ya y ya sahihi ya secp256k1. Inatambuliwa kwa kuanza na baiti `0x01`, na thamani yake ya TransactionType ni `0x1`.

3. **Miamala ya Aina ya 2**, inayojulikana kwa kawaida kama miamala ya EIP-1559, ni miamala iliyoanzishwa katika [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), katika Sasisho la London la Ethereum. Imekuwa aina ya kawaida ya muamala kwenye mtandao wa Ethereum. Miamala hii inaleta utaratibu mpya wa soko la ada ambao unaboresha utabiri kwa kutenganisha ada ya muamala kuwa ada ya msingi na ada ya kipaumbele. Inaanza na baiti `0x02` na inajumuisha sehemu kama vile `maxPriorityFeePerGas` na `maxFeePerGas`. Miamala ya Aina ya 2 sasa ndiyo chaguo-msingi kutokana na unyumbufu na ufanisi wake, hasa ikipendelewa wakati wa msongamano mkubwa wa mtandao kwa uwezo wake wa kusaidia watumiaji kudhibiti ada za muamala kwa njia inayotabirika zaidi. Thamani ya TransactionType kwa miamala hii ni `0x2`.

4. **Miamala ya Aina ya 3 (Blobu)** ilianzishwa katika [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) kama sehemu ya sasisho la Dencun la Ethereum. Miamala hii imeundwa kushughulikia data za "blobu" (Binary Large Objects) kwa ufanisi zaidi, hasa ikinufaisha mikusanyiko ya tabaka la 2 (l2) kwa kutoa njia ya kuchapisha data kwenye mtandao wa Ethereum kwa gharama ya chini. Miamala ya blobu inajumuisha sehemu za ziada kama vile `blobVersionedHashes`, `maxFeePerBlobGas`, na `blobGasPrice`. Inaanza na baiti `0x03`, na thamani yake ya TransactionType ni `0x3`. Miamala ya blobu inawakilisha uboreshaji mkubwa katika upatikanaji wa data wa Ethereum na uwezo wa kuongeza ukubwa.

5. **Miamala ya Aina ya 4** ilianzishwa katika [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) kama sehemu ya Sasisho la Pectra la Ethereum. Miamala hii imeundwa ili kuendana na udhanifu wa akaunti wa siku zijazo. Inaruhusu EOA kufanya kazi kwa muda kama akaunti za mkataba mahiri bila kuathiri utendaji wao wa asili. Inajumuisha kigezo cha `authorization_list`, ambacho kinabainisha mkataba mahiri ambao EOA inakabidhi mamlaka yake. Baada ya muamala, sehemu ya msimbo ya EOA itakuwa na anwani ya mkataba mahiri uliokabidhiwa.

## Usomaji zaidi {#further-reading}

- [EIP-2718: Bahasha ya Muamala Iliyoandikwa](https://eips.ethereum.org/EIPS/eip-2718)

_Je, unajua nyenzo ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Akaunti](/developers/docs/accounts/)
- [Mashine pepe ya Ethereum (EVM)](/developers/docs/evm/)
- [Gesi](/developers/docs/gas/)