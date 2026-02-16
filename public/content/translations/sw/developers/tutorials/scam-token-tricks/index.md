---
title: "Baadhi ya hila zinazotumiwa na tokeni za ulaghai na jinsi ya kuzigundua"
description: Katika mafunzo haya tunachambua tokeni ya ulaghai ili kuona baadhi ya hila ambazo walaghai hutumia, jinsi wanavyozitekeleza, na jinsi tunavyoweza kuzigundua.
author: Ori Pomerantz
tags:
  [
    "ulaghai",
    "uimara",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: sw
---

Katika mafunzo haya tunachambua [tokeni ya ulaghai](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ili kuona baadhi ya hila ambazo walaghai hutumia na jinsi wanavyozitekeleza. Mwishoni mwa mafunzo haya utakuwa na mtazamo mpana zaidi wa mikataba ya tokeni za ERC-20, uwezo wao, na kwa nini kuwa na mashaka ni muhimu. Kisha tunaangalia matukio yaliyotolewa na tokeni hiyo ya ulaghai na kuona jinsi tunavyoweza kutambua kiotomatiki kwamba si halali.

## Tokeni za ulaghai - ni nini, kwa nini watu huzifanya, na jinsi ya kuziepuka {#scam-tokens}

Moja ya matumizi yanayojulikana sana ya Ethereum ni pale kikundi cha watu kinapotengeneza tokeni inayoweza kuuzwa, kwa maana nyingine, sarafu yao wenyewe. Hata hivyo, popote palipo na matumizi halali yanayoleta thamani, pia kuna wahalifu wanaojaribu kuiba thamani hiyo kwa faida yao binafsi.

Unaweza kusoma zaidi kuhusu mada hii [mahali pengine kwenye ethereum.org](/guides/how-to-id-scam-tokens/) kwa mtazamo wa mtumiaji. Mafunzo haya yanalenga kuchambua tokeni ya ulaghai ili kuona jinsi inavyofanywa na jinsi inavyoweza kugunduliwa.

### Nitajuaje kuwa wARB ni ulaghai? {#warb-scam}

Tokeni tunayoichambua ni [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), ambayo inajifanya kuwa sawa na [tokeni halali ya ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Njia rahisi zaidi ya kujua ni tokeni ipi halali ni kuangalia shirika lililoianzisha, [Arbitrum](https://arbitrum.foundation/). Anwani halali zimeainishwa [katika nyaraka zao](https://docs.arbitrum.foundation/deployment-addresses#token).

### Kwa nini msimbo chanzo unapatikana? {#why-source}

Kwa kawaida tungetarajia watu wanaojaribu kuwalaghai wengine wawe wasiri, na hakika tokeni nyingi za ulaghai hazina msimbo wao unaopatikana (kwa mfano, [hii hapa](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) na [hii hapa](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Hata hivyo, tokeni halali kwa kawaida huchapisha msimbo wao chanzo, kwa hivyo ili kuonekana halali, waandishi wa tokeni za ulaghai wakati mwingine hufanya vivyo hivyo. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ni mojawapo ya tokeni hizo zilizo na msimbo chanzo unaopatikana, jambo ambalo hurahisisha kuielewa.

Wakati watumaji wa mikataba wanaweza kuchagua kuchapisha msimbo chanzo au la, _hawawezi_ kuchapisha msimbo chanzo usio sahihi. Kichunguzi cha bloku hukusanya msimbo chanzo uliotolewa kwa kujitegemea, na ikiwa hakipati bytecode sawa kabisa, kinakataa msimbo huo chanzo. [Unaweza kusoma zaidi kuhusu hili kwenye tovuti ya Etherscan](https://etherscan.io/verifyContract).

## Ulinganisho na tokeni halali za ERC-20 {#compare-legit-erc20}

Tunaenda kulinganisha tokeni hii na tokeni halali za ERC-20. Ikiwa hufahamu jinsi tokeni halali za ERC-20 zinavyoandikwa kwa kawaida, [angalia mafunzo haya](/developers/tutorials/erc20-annotated-code/).

### Maadili yasiyobadilika kwa anwani zenye upendeleo {#constants-for-privileged-addresses}

Mikataba wakati mwingine huhitaji anwani zenye upendeleo. Mikataba ambayo imeundwa kwa matumizi ya muda mrefu huruhusu anwani fulani yenye upendeleo kubadilisha anwani hizo, kwa mfano kuwezesha matumizi ya mkataba mpya wa multisig. Kuna njia kadhaa za kufanya hivi.

Mkataba wa tokeni ya [`HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) hutumia muundo wa [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Anwani yenye upendeleo huhifadhiwa kwenye hifadhi, katika sehemu inayoitwa `_owner` (angalia faili la tatu, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Mkataba wa tokeni ya [`ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) hauna anwani ya upendeleo moja kwa moja. Hata hivyo, haihitaji. Inakaa nyuma ya [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) kwenye [anwani `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Mkataba huo una anwani yenye upendeleo (angalia faili la nne, `ERC1967Upgrade.sol`) ambayo inaweza kutumika kwa ajili ya maboresho.

```solidity
    /**
     * @dev Huhifadhi anwani mpya katika nafasi ya msimamizi wa EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: msimamizi mpya ni anwani ya sifuri");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Kinyume chake, mkataba wa `wARB` una `contract_owner` iliyoandikwa moja kwa moja kwenye msimbo.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Mmiliki huyu wa mkataba](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) si mkataba unaoweza kudhibitiwa na akaunti tofauti kwa nyakati tofauti, bali ni [akaunti inayomilikiwa nje](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Hii inamaanisha kuwa huenda imeundwa kwa matumizi ya muda mfupi na mtu binafsi, badala ya kuwa suluhisho la muda mrefu la kudhibiti ERC-20 ambayo itabaki na thamani.

Na hakika, tukiangalia kwenye Etherscan tunaona kuwa mlaghai alitumia mkataba huu kwa saa 12 tu ([muamala wa kwanza](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) hadi [muamala wa mwisho](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) wakati wa Mei 19, 2023.

### Kitendakazi bandia cha `_transfer` {#the-fake-transfer-function}

Ni kawaida kwa uhamisho halisi kutokea kwa kutumia [kitendakazi cha ndani cha `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

Katika `wARB` kitendakazi hiki kinaonekana kuwa halali:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: uhamisho kutoka kwa anwani ya sifuri");
        require(recipient != address(0), "ERC20: uhamisho kwenda kwa anwani ya sifuri");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: kiasi cha uhamisho kinazidi salio");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Sehemu ya kutiliwa shaka ni:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Ikiwa mmiliki wa mkataba anatuma tokeni, kwa nini tukio la `Transfer` linaonyesha zinatoka kwa `deployer`?

Hata hivyo, kuna suala muhimu zaidi. Nani anaita kitendakazi hiki cha `_transfer`? Haiwezi kuitwa kutoka nje, imewekewa alama ya `internal`. Na msimbo tulionao haujumuishi miito yoyote kwa `_transfer`. Ni wazi, ipo hapa kama chambo.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: kiasi cha uhamisho kinazidi ruhusa"));
        return true;
    }
```

Tunapoangalia vitendakazi vinavyoitwa kuhamisha tokeni, `transfer` na `transferFrom`, tunaona kuwa vinaita kitendakazi tofauti kabisa, `_f_`.

### Kitendakazi halisi cha `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: uhamisho kutoka kwa anwani ya sifuri");
        require(recipient != address(0), "ERC20: uhamisho kwenda kwa anwani ya sifuri");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: kiasi cha uhamisho kinazidi salio");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Kuna ishara mbili za hatari katika kitendakazi hiki.

- Matumizi ya [kirekebishaji cha kitendakazi](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Hata hivyo, tunapoangalia msimbo chanzo tunaona kuwa `_mod_` kwa kweli haina madhara.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Suala lile lile tuliloliona katika `_transfer`, ambalo ni wakati `contract_owner` anapotuma tokeni, zinaonekana kutoka kwa `deployer`.

### Kitendakazi bandia cha matukio `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Sasa tunafika kwenye kitu kinachoonekana kama ulaghai halisi. Nimehariri kitendakazi kidogo ili kisomeke vizuri, lakini kinafanya kazi sawa.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Kitendakazi hiki kina kirekebishaji cha `auth()`, ambacho kinamaanisha kuwa kinaweza kuitwa tu na mmiliki wa mkataba.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Kizuizi hiki kina mantiki kamili, kwa sababu hatungetaka akaunti zisizo na mpangilio zigawanye tokeni. Hata hivyo, sehemu iliyobaki ya kitendakazi inatiliwa shaka.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Kitendakazi cha kuhamisha kutoka kwa akaunti ya pool kwenda kwa safu ya wapokeaji na safu ya kiasi kina mantiki kamili. Kuna matumizi mengi ambayo utataka kusambaza tokeni kutoka chanzo kimoja kwenda maeneo mengi, kama vile malipo ya mishahara, airdrops, n.k. Ni nafuu zaidi (kwa gesi) kufanya katika muamala mmoja badala ya kutoa miamala mingi, au hata kuita ERC-20 mara nyingi kutoka kwa mkataba tofauti kama sehemu ya muamala mmoja.

Hata hivyo, `dropNewTokens` haifanyi hivyo. Inatoa [matukio ya `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), lakini haihamishi tokeni zozote. Hakuna sababu halali ya kuchanganya programu za nje ya mnyororo kwa kuziarifu kuhusu uhamisho ambao haukutokea kweli.

### Kitendakazi cha `Approve` kinachochoma {#the-burning-approve-function}

Mikataba ya ERC-20 inapaswa kuwa na [kitendakazi cha `approve`](/developers/tutorials/erc20-annotated-code/#approve) kwa ajili ya ruhusa, na hakika tokeni yetu ya ulaghai ina kitendakazi kama hicho, na hata ni sahihi. Hata hivyo, kwa sababu Solidity inatokana na C, ni muhimu kwa herufi kubwa na ndogo. "Approve" na "approve" ni maneno tofauti.

Pia, utendaji hauhusiani na `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Kitendakazi hiki kinaitwa na safu ya anwani za wamiliki wa tokeni.

```solidity
    public approver() {
```

Kirekebishaji cha `approver()` kinahakikisha kuwa ni `contract_owner` tu anayeruhusiwa kuita kitendakazi hiki (tazama hapa chini).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: kiasi cha kuchoma kinazidi salio");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Kwa kila anwani ya mmiliki, kitendakazi huhamisha salio zima la mmiliki kwenda kwenye anwani `0x00...01`, na hivyo kuichoma (kitendo halisi cha `burn` katika kiwango pia hubadilisha jumla ya usambazaji, na huhamisha tokeni kwenda `0x00...00`). Hii inamaanisha kuwa `contract_owner` anaweza kuondoa mali ya mtumiaji yeyote. Hiyo haionekani kama kipengele ambacho ungependa katika tokeni ya utawala.

### Masuala ya ubora wa msimbo {#code-quality-issues}

Masuala haya ya ubora wa msimbo _hayathibitishi_ kuwa msimbo huu ni ulaghai, lakini yanaifanya ionekane ya kutiliwa shaka. Kampuni zilizopangwa kama Arbitrum kwa kawaida hazitoi msimbo mbaya kama huu.

#### Kitendakazi cha `mount` {#the-mount-function}

Ingawa haijaainishwa katika [kiwango](https://eips.ethereum.org/EIPS/eip-20), kwa ujumla kitendakazi kinachotengeneza tokeni mpya huitwa [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Tukiangalia katika kiunda cha `wARB`, tunaona kitendakazi cha muda cha mint kimebadilishwa jina na kuwa `mount` kwa sababu fulani, na kinaitwa mara tano na sehemu ya tano ya usambazaji wa awali, badala ya mara moja kwa kiasi chote kwa ufanisi.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

Kitendakazi cha `mount` chenyewe pia kinatiliwa shaka.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Tukiangalia kwenye `require`, tunaona kuwa ni mmiliki wa mkataba pekee anayeruhusiwa ku-mint. Hiyo ni halali. Lakini ujumbe wa hitilafu unapaswa kuwa _mmiliki pekee ndiye anayeruhusiwa ku-mint_ au kitu kama hicho. Badala yake, ni _ERC20: mint kwa anwani ya sifuri_ isiyo na maana. Jaribio sahihi la ku-mint kwa anwani ya sifuri ni `require(account != address(0), "<error message>")`, ambalo mkataba haujisumbui kamwe kulikagua.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Kuna mambo mengine mawili ya kutiliwa shaka, yanayohusiana moja kwa moja na uundaji:

- Kuna kigezo cha `account`, ambacho pengine ni akaunti inayopaswa kupokea kiasi kilichoundwa. Lakini salio linaloongezeka ni la `contract_owner`.

- Wakati salio lililoongezeka ni la `contract_owner`, tukio lililotolewa linaonyesha uhamisho kwenda kwa `account`.

### Kwa nini `auth` na `approver` zote mbili? Kwa nini `mod` ambayo haifanyi chochote? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Mkataba huu una virekebishaji vitatu: `_mod_`, `auth`, na `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` inachukua vigezo vitatu na haifanyi chochote navyo. Kwa nini iwe nayo?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` na `approver` zina mantiki zaidi, kwa sababu zinakagua kuwa mkataba uliitwa na `contract_owner`. Tungetarajia vitendo fulani vya upendeleo, kama vile kuunda, kuwekewa mipaka kwa akaunti hiyo. Hata hivyo, kuna haja gani ya kuwa na vitendakazi viwili tofauti vinavyofanya _jambo lile lile_?

## Tunaweza kugundua nini kiotomatiki? {#what-can-we-detect-automatically}

Tunaweza kuona kuwa `wARB` ni tokeni ya ulaghai kwa kuangalia Etherscan. Hata hivyo, hiyo ni suluhisho la kati. Kinadharia, Etherscan inaweza kupotoshwa au kudukuliwa. Ni bora kuweza kubaini kwa kujitegemea ikiwa tokeni ni halali au la.

Kuna baadhi ya mbinu tunazoweza kutumia kutambua kuwa tokeni ya ERC-20 inatiliwa shaka (ama ni ulaghai au imeandikwa vibaya sana), kwa kuangalia matukio wanayotoa.

## Matukio ya `Approval` yenye shaka {#suspicious-approval-events}

[Matukio ya `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) yanapaswa kutokea tu kwa ombi la moja kwa moja (kinyume na [matukio ya `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) ambayo yanaweza kutokea kama matokeo ya ruhusa). [Tazama hati za Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) kwa maelezo ya kina ya suala hili na kwa nini maombi yanahitaji kuwa ya moja kwa moja, badala ya kupatanishwa na mkataba.

Hii inamaanisha kuwa matukio ya `Approval` yanayoidhinisha matumizi kutoka kwa [akaunti inayomilikiwa nje](/developers/docs/accounts/#types-of-account) yanapaswa kutoka kwa miamala inayotoka katika akaunti hiyo, na ambayo lengo lake ni mkataba wa ERC-20. Aina nyingine yoyote ya idhini kutoka kwa akaunti inayomilikiwa nje inatiliwa shaka.

Hapa kuna [programu inayotambua aina hii ya tukio](https://github.com/qbzzt/20230915-scam-token-detection), kwa kutumia [viem](https://viem.sh/) na [TypeScript](https://www.typescriptlang.org/docs/), lahaja ya JavaScript yenye usalama wa aina. Ili kuiendesha:

1. Nakili `.env.example` kwenda kwa `.env`.
2. Hariri `.env` ili kutoa URL ya nodi ya mainnet ya Ethereum.
3. Endesha `pnpm install` ili kusakinisha vifurushi vinavyohitajika.
4. Endesha `pnpm susApproval` ili kutafuta idhini zinazotiliwa shaka.

Hapa kuna maelezo ya mstari kwa mstari:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Leta ufafanuzi wa aina, vitendakazi, na ufafanuzi wa mnyororo kutoka kwa `viem`.

```typescript
import { config } from "dotenv"
config()
```

Soma `.env` ili kupata URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Unda mteja wa Viem. Tunahitaji tu kusoma kutoka kwa mnyororo wa bloku, kwa hivyo mteja huyu hahitaji ufunguo wa faragha.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Anwani ya mkataba wa ERC-20 unaotiliwa shaka, na bloku ambazo tutatafuta matukio ndani yake. Watoa huduma wa nodi kwa kawaida huweka kikomo uwezo wetu wa kusoma matukio kwa sababu kipimo data kinaweza kuwa ghali. Kwa bahati nzuri `wARB` haikutumika kwa kipindi cha saa kumi na nane, kwa hivyo tunaweza kutafuta matukio yote (kulikuwa na 13 tu kwa jumla).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Hii ndiyo njia ya kuomba taarifa za matukio kutoka kwa Viem. Tunapoipatia saini kamili ya tukio, ikiwa ni pamoja na majina ya sehemu, inatuchambulia tukio hilo.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Kanuni yetu inatumika tu kwa akaunti zinazomilikiwa nje. Ikiwa kuna bytecode yoyote iliyorejeshwa na `client.getBytecode` inamaanisha kuwa huu ni mkataba na tunapaswa kuiruka tu.

Ikiwa hujawahi kutumia TypeScript hapo awali, ufafanuzi wa kitendakazi unaweza kuonekana wa ajabu kidogo. Hatuiambii tu kigezo cha kwanza (na cha pekee) kinaitwa `addr`, lakini pia kwamba ni cha aina ya `Address`. Vile vile, sehemu ya `: boolean` inaiambia TypeScript kuwa thamani ya kurudisha ya kitendakazi ni boolean.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Kitendakazi hiki kinapata risiti ya muamala kutoka kwa tukio. Tunahitaji risiti ili kuhakikisha tunajua lengo la muamala lilikuwa nini.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Hiki ndicho kitendakazi muhimu zaidi, kinachoamua ikiwa tukio linatiliwa shaka au la. Aina ya kurudisha, `(Event | null)`, inaiambia TypeScript kuwa kitendakazi hiki kinaweza kurudisha ama `Event` au `null`. Tunarejesha `null` ikiwa tukio halitiliwi shaka.

```typescript
const owner = ev.args._owner
```

Viem ina majina ya sehemu, kwa hivyo imetuchambulia tukio. `_owner` ni mmiliki wa tokeni zitakazotumiwa.

```typescript
// Idhini za mikataba hazitiliwi shaka
if (await isContract(owner)) return null
```

Ikiwa mmiliki ni mkataba, chukulia kuwa idhini hii haitiliwi shaka. Ili kuangalia ikiwa idhini ya mkataba inatiliwa shaka au la, tutahitaji kufuatilia utekelezaji kamili wa muamala ili kuona ikiwa umewahi kufika kwenye mkataba wa mmiliki, na ikiwa mkataba huo uliita mkataba wa ERC-20 moja kwa moja. Hiyo ni ghali zaidi kwa rasilimali kuliko tunavyopenda kufanya.

```typescript
const txn = await getEventTxn(ev)
```

Ikiwa idhini inatoka kwa akaunti inayomilikiwa nje, pata muamala ulioisababisha.

```typescript
// Idhini inatiliwa shaka ikiwa inatoka kwa mmiliki wa EOA ambaye si `from` ya muamala
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Hatuwezi tu kuangalia usawa wa maneno kwa sababu anwani ni za mfumo wa heksadesimali, kwa hivyo zina herufi. Wakati mwingine, kwa mfano katika `txn.from`, herufi hizo zote ni ndogo. Katika hali zingine, kama vile `ev.args._owner`, anwani iko katika [herufi mchanganyiko kwa ajili ya utambuzi wa makosa](https://eips.ethereum.org/EIPS/eip-55).

Lakini ikiwa muamala hautoki kwa mmiliki, na mmiliki huyo anamilikiwa nje, basi tuna muamala unaotiliwa shaka.

```typescript
// Pia inatiliwa shaka ikiwa lengo la muamala si mkataba wa ERC-20 tunaouchunguza
// uchunguzi
if (txn.to.toLowerCase() != testedAddress) return ev
```

Vile vile, ikiwa anwani ya `to` ya muamala, mkataba wa kwanza kuitwa, si mkataba wa ERC-20 unaochunguzwa basi inatiliwa shaka.

```typescript
    // Ikiwa hakuna sababu ya kutilia shaka, rudisha null.
    return null
}
```

Ikiwa hakuna sharti kati ya hayo mawili lililo kweli basi tukio la `Approval` halitiliwi shaka.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Kitendakazi cha `async`](https://www.w3schools.com/js/js_async.asp) kinarudisha kitu cha `Promise`. Kwa sintaksia ya kawaida, `await x()`, tunasubiri `Promise` hiyo itimizwe kabla ya kuendelea na uchakataji. Hii ni rahisi kupanga na kufuata, lakini pia haina ufanisi. Wakati tunasubiri `Promise` kwa tukio maalum litimizwe tayari tunaweza kuanza kufanyia kazi tukio linalofuata.

Hapa tunatumia [`map`](https://www.w3schools.com/jsref/jsref_map.asp) kuunda safu ya vitu vya `Promise`. Kisha tunatumia [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) kusubiri ahadi zote hizo zitimizwe. Kisha tunachuja [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) matokeo hayo ili kuondoa matukio yasiyotiliwa shaka.

### Matukio ya `Transfer` yenye shaka {#suspicious-transfer-events}

Njia nyingine inayowezekana ya kutambua tokeni za ulaghai ni kuona ikiwa zina uhamisho wowote unaotiliwa shaka. Kwa mfano, uhamisho kutoka kwa akaunti ambazo hazina tokeni nyingi kiasi hicho. Unaweza kuona [jinsi ya kutekeleza jaribio hili](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), lakini `wARB` haina suala hili.

## Hitimisho {#conclusion}

Ugunduzi wa kiotomatiki wa ulaghai wa ERC-20 unakabiliwa na [matokeo hasi ya uwongo](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), kwa sababu ulaghai unaweza kutumia mkataba wa tokeni wa ERC-20 wa kawaida kabisa ambao hauwakilishi kitu halisi. Kwa hivyo unapaswa kujaribu kila wakati _kupata anwani ya tokeni kutoka chanzo kinachoaminika_.

Ugunduzi wa kiotomatiki unaweza kusaidia katika hali fulani, kama vile vipande vya DeFi, ambapo kuna tokeni nyingi na zinahitaji kushughulikiwa kiotomatiki. Lakini kama kawaida [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), fanya utafiti wako mwenyewe, na wahimize watumiaji wako kufanya vivyo hivyo.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
