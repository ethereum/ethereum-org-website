---
title: Miamala
description: Muhtasari wa miamala ya Ethereum - jinsi inavyofanya kazi, muundo wao wa data, na jinsi ya kuzituma kupitia mfumo.
lang: sw
---

Miamala ni maagizo yaliyosainiwa kwa njia fiche kutoka kwa akaunti. Akaunti itaanzisha muamala ili kusasisha hali ya mtandao wa Ethereum. Muamala rahisi zaidi ni kuhamisha ETH kutoka akaunti moja hadi nyingine.

## Mahitaji ya awali {#prerequisites}

Ili kukusaidia kuelewa ukurasa huu vizuri, tunapendekeza usome kwanza [Akaunti](/developers/docs/accounts/) na [utangulizi wetu wa Ethereum](/developers/docs/intro-to-ethereum/).

## Muamala ni nini? {#whats-a-transaction}

Muamala wa Ethereum unamaanisha kitendo kilichoanzishwa na akaunti inayomilikiwa na mtu wa nje, kwa maneno mengine akaunti inayosimamiwa na binadamu, sio mkataba. Kwa mfano, kama Bob atatuma ETH 1 kwa Alice, akaunti ya Bob lazima ipunguzwe na ya Alice ni lazima iongezwe. Kitendo hiki cha kubadilisha hali hufanyika ndani ya muamala.

![Mchoro unaoonyesha muamala unaosababisha mabadiliko ya hali](./tx.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Miamala, ambayo hubadilisha hali ya EVM, yanahitaji kutangazwa kwa mtandao mzima. Nodi yoyote inaweza kutangaza ombi la muamala kutekelezwa kwenye EVM; baada ya hili kutokea, mthibitishaji atatekeleza muamala na kueneza mabadiliko ya hali yaliyotokana kwa sehemu iliyobaki ya mtandao.

Miamala inahitaji ada na lazima ijumuishwe kwenye bloku iliyothibitishwa. Ili kurahisisha muhtasari huu, tutaangazia ada za gesi na uthibitishaji mahali pengine.

Muamala uliowasilishwa unajumuisha taarifa zifuatazo:

- `from` – anwani ya mtumaji, ambayo itatia saini kwenye muamala. Hii itakuwa akaunti inayomilikiwa na mtu wa nje kwa kuwa akaunti za mkataba haziwezi kutuma miamala
- `to` – anwani ya mpokeaji (ikiwa ni akaunti inayomilikiwa na mtu wa nje, muamala utahamisha thamani. Ikiwa ni akaunti ya mkataba, muamala utatekeleza msimbo wa mkataba)
- `sahihi` – kitambulisho cha mtumaji. Hii inatengenezwa wakati ufunguo binafsi wa mtumaji unapotia saini muamala na kuthibitisha kuwa mtumaji ameidhinisha muamala huu
- `nonce` - kaunta inayoongezeka kwa mfuatano ambayo inaonyesha nambari ya muamala kutoka kwa akaunti
- `value` – kiasi cha ETH cha kuhamishwa kutoka kwa mtumaji hadi kwa mpokeaji (kimetajwa kwa WEI, ambapo 1ETH ni sawa na 1e+18wei)
- `input data` – sehemu ya hiari ya kujumuisha data yoyote
- `gasLimit` – kiwango cha juu cha vitengo vya gesi ambavyo vinaweza kutumiwa na muamala. [EVM](/developers/docs/evm/opcodes) inabainisha vitengo vya gesi vinavyohitajika kwa kila hatua ya kukokotoa
- `maxPriorityFeePerGas` - bei ya juu zaidi ya gesi iliyotumika kujumuishwa kama zawadi kwa mthibitishaji
- `maxFeePerGas` - ada ya juu zaidi kwa kila kitengo cha gesi ambayo mtu yuko tayari kulipia muamala (inajumuisha `baseFeePerGas` na `maxPriorityFeePerGas`)

Gesi ni rejeleo la hesabu inayohitajika kuchakata muamala na mthibitishaji. Watumiaji wanapaswa kulipa ada kwa ajili ya hesabu hii. `gasLimit`, na `maxPriorityFeePerGas` huamua ada ya juu zaidi ya muamala inayolipwa kwa mthibitishaji. [Zaidi kuhusu Gesi](/developers/docs/gas/).

Kitu cha muamala kitaonekana kama hivi:

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

Lakini kitu cha muamala kinahitaji kutiwa saini kwa kutumia ufunguo binafsi wa mtumaji. Hii inathibitisha kuwa muamala ungeweza tu kutoka kwa mtumaji na haukutumwa kwa njia ya ulaghai.

Mteja wa Ethereum kama Geth atashughulikia mchakato huu wa kutia saini.

Mfano wa wito wa [JSON-RPC](/developers/docs/apis/json-rpc):

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

Mfano wa jibu:

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

- `raw` ni muamala uliotiwa saini katika mfumo uliosimbwa kwa [Kiambishi awali cha Urefu Kinachojirudia (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- `tx` ni muamala uliotiwa saini katika mfumo wa JSON

Kwa kutumia hashi ya saini, muamala unaweza kuthibitishwa kwa njia fiche kwamba ulitoka kwa mtumaji na uliwasilishwa kwenye mtandao.

### Sehemu ya data {#the-data-field}

Idadi kubwa ya miamala hufikia mkataba kutoka kwa akaunti inayomilikiwa na mtu wa nje.
Mikataba mingi imeandikwa kwa lugha ya Solidity na inatafsiri sehemu yake ya data kulingana na [kiolesura cha programu ya binary (ABI)](/glossary/#abi).

Baiti nne za kwanza hubainisha ni kazi ipi ya kuitwa, kwa kutumia hashi ya jina la kazi na hoja zake.
Wakati mwingine unaweza kutambua kazi kutoka kwa kiteuzi kwa kutumia [hifadhidata hii](https://www.4byte.directory/signatures/).

Sehemu iliyobaki ya calldata ni hoja, [zilizosimbwa kama ilivyobainishwa katika maelezo ya ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Kwa mfano, hebu tuangalie [muamala huu](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Tumia **Bofya ili kuona Zaidi** ili kuona calldata.

Kiteuzi cha kazi ni `0xa9059cbb`. Kuna [kazi kadhaa zinazojulikana na saini hii](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
Katika kesi hii [msimbo chanzo wa mkataba](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) umepakiwa kwenye Etherscan, kwa hivyo tunajua kazi ni `transfer(address,uint256)`.

Data iliyobaki ni:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Kulingana na maelezo ya ABI, thamani za nambari kamili (kama vile anwani, ambazo ni nambari kamili za baiti-20) huonekana katika ABI kama maneno ya baiti-32, yaliyojazwa na sufuri mbele.
Kwa hivyo tunajua anwani ya `to` ni [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
`value` ni 0x3b0559f4 = 990206452.

## Aina za miamala {#types-of-transactions}

Kwenye Ethereum kuna aina chache tofauti za miamala:

- Miamala ya kawaida: muamala kutoka akaunti moja kwenda nyingine.
- Miamala ya kupeleka mkataba: muamala bila anwani ya 'to', ambapo sehemu ya data hutumika kwa msimbo wa mkataba.
- Utekelezaji wa mkataba: muamala unaoingiliana na mkataba-erevu uliowekwa. Katika kesi hii, anwani ya 'to' ni anwani ya mkataba-erevu.

### Kuhusu gesi {#on-gas}

Kama ilivyotajwa, miamala inagharimu [gesi](/developers/docs/gas/) kutekeleza. Miamala rahisi ya uhamishaji inahitaji vitengo 21,000 vya Gesi.

Kwa hiyo Bob kumtumia Alice 1 ETH kwa `baseFeePerGas` ya 190 gwei na `maxPriorityFeePerGas` ya 10 gwei, Bob atahitaji kulipa ada ifuatayo:

```
(190 + 10) * 21000 = 4,200,000 gwei
--au--
0.0042 ETH
```

Akaunti ya Bob itapunguzwa **-1.0042 ETH** (ETH 1 kwa Alice + ETH 0.0042 katika ada za gesi)

Akaunti ya Alice itaongezwa **+1.0 ETH**

Ada ya msingi itachomwa **-0.00399 ETH**

Mthibitishaji huweka zawadi **+0.000210 ETH**

![Mchoro unaonyesha jinsi gesi isiyotumika inavyorejeshwa](./gas-tx.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gesi yoyote isiyotumika katika muamala hurejeshwa kwenye akaunti ya mtumiaji.

### Mwingiliano wa mkataba-erevu {#smart-contract-interactions}

Gesi inahitajika kwa muamala wowote unaohusisha mkataba-erevu.

Mikataba-erevu pia inaweza kuwa na kazi zinazojulikana kama kazi za [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) au [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), ambazo hazibadilishi hali ya mkataba. Kwa hivyo, kuita kazi hizi kutoka kwa EOA hakutahitaji gesi yoyote. Wito wa msingi wa RPC kwa hali hii ni [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Tofauti na inapofikiwa kwa kutumia `eth_call`, kazi hizi za `view` au `pure` pia huitwa kwa kawaida ndani (yaani, kutoka kwa mkataba wenyewe au kutoka kwa mkataba mwingine) ambazo hugharimu gesi.

## Mzunguko wa maisha ya muamala {#transaction-lifecycle}

Mara tu muamala unapowasilishwa, yafuatayo hutokea:

1. Hashi ya muamala inatolewa kwa njia fiche:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Kisha muamala hutangazwa kwenye mtandao na kuongezwa kwenye dimbwi la miamala linalojumuisha miamala mingine yote ya mtandao inayosubiri.
3. Mthibitishaji lazima achague muamala wako na kuujumuisha kwenye bloku ili kuthibitisha muamala na kuuchukulia kama "uliyefanikiwa".
4. Kadiri muda unavyopita, bloku iliyo na muamala wako itasasishwa kuwa "iliyohalalishwa" kisha "iliyokamilishwa". Maboresho haya hufanya iwe na uhakika zaidi kwamba muamala wako ulifanikiwa na hautawahi kubadilishwa. Mara tu bloku "inapokamilishwa", inaweza tu kubadilishwa na shambulio la kiwango cha mtandao ambalo lingegharimu mabilioni mengi ya dola.

## Onyesho la picha {#a-visual-demo}

Tazama Austin akikuelekeza kupitia miamala, gesi, na uchimbaji madini.

<YouTube id="er-0ihqFQB0" />

## Bahasha ya Muamala Uliochapwa {#typed-transaction-envelope}

Ethereum hapo awali ilikuwa na muundo mmoja wa miamala. Kila muamala ulikuwa na nonce, bei ya gesi, kikomo cha gesi, anwani ya mpokeaji, thamani, data, v, r, na s. Sehemu hizi [zimesimbwa kwa RLP](/developers/docs/data-structures-and-encoding/rlp/), ili kuonekana kama hivi:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum imebadilika ili kusaidia aina nyingi za miamala ili kuruhusu vipengele vipya kama vile orodha za ufikiaji na [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) kutekelezwa bila kuathiri miundo ya miamala ya zamani.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) ndicho kinachoruhusu tabia hii. Miamala inatafsiriwa kama:

`TransactionType || TransactionPayload`

Ambapo sehemu zimefafanuliwa kama:

- `TransactionType` - nambari kati ya 0 na 0x7f, kwa jumla ya aina 128 zinazowezekana za miamala.
- `TransactionPayload` - safu ya baiti isiyo ya mpangilio iliyofafanuliwa na aina ya muamala.

Kulingana na thamani ya `TransactionType`, muamala unaweza kuainishwa kama:

1. **Aina ya 0 (Urithi) Miamala:** Muundo asili wa muamala uliotumika tangu uzinduzi wa Ethereum. Hazijumuishi vipengele kutoka [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) kama vile hesabu za ada za gesi zinazobadilika au orodha za ufikiaji za mikataba-erevu. Miamala ya urithi haina kiambishi awali maalum kinachoonyesha aina yake katika mfumo wake wa mfululizo, ikianza na baiti `0xf8` wakati wa kutumia usimbaji wa [Kiambishi awali cha Urefu Kinachojirudia (RLP)](/developers/docs/data-structures-and-encoding/rlp). Thamani ya TransactionType kwa miamala hii ni `0x0`.

2. **Miamala ya Aina 1:** Ilianzishwa katika [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) kama sehemu ya [Sasisho la Berlin la](/ethereum-forks/#berlin) Ethereum, miamala hii inajumuisha kigezo cha `accessList`. Orodha hii inabainisha anwani na funguo za hifadhi ambazo muamala unatarajia kufikia, ikisaidia kupunguza gharama za [gesi](/developers/docs/gas/) kwa miamala tata inayohusisha mikataba-erevu. Mabadiliko ya soko la ada la EIP-1559 hayajumuishwi katika miamala ya Aina 1. Miamala ya Aina 1 pia inajumuisha kigezo cha `yParity`, ambacho kinaweza kuwa `0x0` au `0x1`, kikionyesha usawa wa thamani ya y ya saini ya secp256k1. Zinatambuliwa kwa kuanza na baiti `0x01`, na thamani yao ya TransactionType ni `0x1`.

3. **Miamala ya Aina 2**, inayojulikana kama miamala ya EIP-1559, ni miamala iliyoanzishwa katika [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), katika [Sasisho la London la](/ethereum-forks/#london) Ethereum. Zimekuwa aina ya kawaida ya muamala kwenye mtandao wa Ethereum. Miamala hii inaleta utaratibu mpya wa soko la ada ambao unaboresha utabiri kwa kutenganisha ada ya muamala kuwa ada ya msingi na ada ya kipaumbele. Zinaanza na baiti `0x02` na zinajumuisha sehemu kama vile `maxPriorityFeePerGas` na `maxFeePerGas`. Miamala ya Aina 2 sasa ndiyo chaguo-msingi kutokana na unyumbufu na ufanisi wake, hasa inapendelewa wakati wa msongamano mkubwa wa mtandao kwa uwezo wake wa kusaidia watumiaji kudhibiti ada za miamala kwa utabiri zaidi. Thamani ya TransactionType kwa miamala hii ni `0x2`.

4. **Miamala ya Aina 3 (Blob)** ilianzishwa katika [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) kama sehemu ya [Sasisho la Dencun la](/ethereum-forks/#dencun) Ethereum. Miamala hii imeundwa kushughulikia data ya "blob" (Vitu Vikubwa vya Binary) kwa ufanisi zaidi, hasa ikinufaisha unda-mpya wa Safu 2 kwa kutoa njia ya kutuma data kwenye mtandao wa Ethereum kwa gharama ya chini. Miamala ya blob inajumuisha sehemu za ziada kama vile `blobVersionedHashes`, `maxFeePerBlobGas`, na `blobGasPrice`. Zinaanza na baiti `0x03`, na thamani yao ya TransactionType ni `0x3`. Miamala ya blob inawakilisha uboreshaji mkubwa katika upatikanaji wa data wa Ethereum na uwezo wa kuongezeka.

5. **Miamala ya Aina 4** ilianzishwa katika [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) kama sehemu ya [Sasisho la Pectra la](/roadmap/pectra/) Ethereum. Miamala hii imeundwa kuwa na uoanifu wa mbele na uondoaji wa akaunti. Zinaruhusu EOA kutenda kwa muda kama akaunti za mkataba-erevu bila kuathiri utendaji wao wa asili. Zinajumuisha kigezo cha `authorization_list`, ambacho kinabainisha mkataba-erevu ambao EOA inakabidhi mamlaka yake. Baada ya muamala, sehemu ya msimbo ya EOA itakuwa na anwani ya mkataba-erevu uliokabidhiwa.

## Masomo zaidi {#further-reading}

- [EIP-2718: Bahasha ya Muamala Yenye Aina](https://eips.ethereum.org/EIPS/eip-2718)

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- Hifadhi ya fedha (/developers/docs/accounts/)
- [Mashine Halisi ya Ethereum (EVM)](/developers/docs/evm/)
- [Gesi](/developers/docs/gas/)
