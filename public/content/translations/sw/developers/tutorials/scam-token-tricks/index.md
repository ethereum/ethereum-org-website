---
title: "Baadhi ya mbinu zinazotumiwa na tokeni za utapeli na jinsi ya kuzigundua"
description: Katika mafunzo haya tunachambua tokeni ya utapeli ili kuona baadhi ya mbinu ambazo matapeli hutumia, jinsi wanavyozitekeleza, na jinsi tunavyoweza kuzigundua.
author: Ori Pomerantz
tags:
  - utapeli
  - Solidity
  - ERC-20
  - JavaScript
  - TypeScript
skill: intermediate
breadcrumb: Mbinu za tokeni za utapeli
published: 2023-09-15
lang: sw
---

Katika mafunzo haya tunachambua [tokeni ya utapeli](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ili kuona baadhi ya mbinu ambazo matapeli hutumia na jinsi wanavyozitekeleza. Kufikia mwisho wa mafunzo haya utakuwa na mtazamo mpana zaidi wa mikataba ya tokeni za ERC-20, uwezo wake, na kwa nini kuwa na shaka ni muhimu. Kisha tunaangalia matukio yanayotolewa na tokeni hiyo ya utapeli na kuona jinsi tunavyoweza kutambua kuwa si halali kiotomatiki.

## Tokeni za utapeli - ni nini, kwa nini watu wanazitengeneza, na jinsi ya kuziepuka {#scam-tokens}

Moja ya matumizi ya kawaida ya Ethereum ni kwa kikundi kuunda tokeni inayoweza kuuzwa, kwa maana fulani sarafu yao wenyewe. Hata hivyo, popote pale ambapo kuna matumizi halali yanayoleta thamani, pia kuna wahalifu wanaojaribu kujiibia thamani hiyo.

Unaweza kusoma zaidi kuhusu mada hii [kwingineko kwenye ethereum.org](/guides/how-to-id-scam-tokens/) kutoka kwa mtazamo wa mtumiaji. Mafunzo haya yanalenga katika kuchambua tokeni ya utapeli ili kuona jinsi inavyofanywa na jinsi inavyoweza kugunduliwa.

### Ninajuaje kuwa wARB ni utapeli? {#warb-scam}

Tokeni tunayochambua ni [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), ambayo inajifanya kuwa sawa na [tokeni halali ya ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Njia rahisi zaidi ya kujua ni tokeni ipi iliyo halali ni kuangalia shirika lililoianzisha, [Arbitrum](https://arbitrum.foundation/). Anwani halali zimebainishwa [katika nyaraka zao](https://docs.arbitrum.foundation/deployment-addresses#token).

### Kwa nini msimbo wa chanzo unapatikana? {#why-source}

Kwa kawaida tungetarajia watu wanaojaribu kutapeli wengine kuwa wasiri, na kwa kweli tokeni nyingi za utapeli hazina msimbo wao unaopatikana (kwa mfano, [hii hapa](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) na [hii hapa](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Hata hivyo, tokeni halali kwa kawaida huchapisha msimbo wao wa chanzo, kwa hivyo ili kuonekana halali waandishi wa tokeni za utapeli wakati mwingine hufanya vivyo hivyo. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ni mojawapo ya tokeni hizo zenye msimbo wa chanzo unaopatikana, jambo ambalo hurahisisha kuielewa.

Ingawa wasambazaji wa mkataba wanaweza kuchagua kuchapisha au kutochapisha msimbo wa chanzo, _hawawezi_ kuchapisha msimbo wa chanzo usio sahihi. Kichunguzi cha bloku hukusanya msimbo wa chanzo uliotolewa kwa kujitegemea, na ikiwa hakipati msimbo wa baiti sawa kabisa, kinakataa msimbo huo wa chanzo. [Unaweza kusoma zaidi kuhusu hili kwenye tovuti ya Etherscan](https://etherscan.io/verifyContract).

## Ulinganisho na tokeni halali za ERC-20 {#compare-legit-erc20}

Tutalinganisha tokeni hii na tokeni halali za ERC-20. Ikiwa hufahamu jinsi tokeni halali za ERC-20 zinavyoandikwa kwa kawaida, [tazama mafunzo haya](/developers/tutorials/erc20-annotated-code/).

### Vigezo visivyobadilika kwa anwani zenye mapendeleo {#constants-for-privileged-addresses}

Mikataba wakati mwingine inahitaji anwani zenye mapendeleo. Mikataba iliyoundwa kwa matumizi ya muda mrefu inaruhusu anwani fulani yenye mapendeleo kubadilisha anwani hizo, kwa mfano kuwezesha matumizi ya mkataba mpya wa saini-nyingi. Kuna njia kadhaa za kufanya hivi.

[Mkataba wa tokeni wa `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) unatumia muundo wa [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Anwani yenye mapendeleo huwekwa kwenye hifadhi, katika sehemu inayoitwa `_owner` (tazama faili la tatu, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[Mkataba wa tokeni wa `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) hauna anwani yenye mapendeleo moja kwa moja. Hata hivyo, hauhitaji moja. Unakaa nyuma ya [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) kwenye [anwani `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Mkataba huo una anwani yenye mapendeleo (tazama faili la nne, `ERC1967Upgrade.sol`) inayoweza kutumika kwa uboreshaji.

```solidity
    /**
     * @dev Inahifadhi anwani mpya katika sloti ya msimamizi ya EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Kinyume chake, mkataba wa `wARB` una `contract_owner` iliyowekwa moja kwa moja kwenye msimbo.

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

[Mmiliki huyu wa mkataba](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) si mkataba unaoweza kudhibitiwa na akaunti tofauti kwa nyakati tofauti, bali ni [akaunti inayomilikiwa na mtu wa nje](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Hii inamaanisha kuwa huenda imeundwa kwa matumizi ya muda mfupi na mtu binafsi, badala ya kuwa suluhisho la muda mrefu la kudhibiti ERC-20 itakayosalia kuwa na thamani.

Na kwa kweli, tukitazama kwenye Etherscan tunaona kwamba tapeli alitumia mkataba huu kwa saa 12 pekee ([muamala wa kwanza](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) hadi [muamala wa mwisho](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) mnamo Mei 19, 2023.

### Kazi feki ya `_transfer` {#the-fake-transfer-function}

Ni kawaida kuwa na mahamisho halisi yakifanyika kwa kutumia [kazi ya ndani ya `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

Katika `wARB` kazi hii inaonekana karibu halali:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Sehemu inayotia shaka ni:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Ikiwa mmiliki wa mkataba anatuma tokeni, kwa nini tukio la `Transfer` linaonyesha zinatoka kwa `deployer`?

Hata hivyo, kuna suala muhimu zaidi. Nani anaita kazi hii ya `_transfer`? Haiwezi kuitwa kutoka nje, imewekwa alama ya `internal`. Na msimbo tulio nao haujumuishi miito yoyote kwa `_transfer`. Ni wazi, iko hapa kama chambo.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Tunapoangalia kazi zinazoitwa kuhamisha tokeni, `transfer` na `transferFrom`, tunaona kwamba zinaita kazi tofauti kabisa, `_f_`.

### Kazi halisi ya `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Kuna viashiria viwili vinavyowezekana vya hatari katika kazi hii.

- Matumizi ya [kirekebishaji cha kazi](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Hata hivyo, tunapoangalia ndani ya msimbo wa chanzo tunaona kwamba `_mod_` kwa kweli haina madhara.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Suala lile lile tuliloona katika `_transfer`, ambalo ni wakati `contract_owner` inatuma tokeni zinaonekana kutoka kwa `deployer`.

### Kazi feki ya matukio `dropNewTokens` {#the-fake-events-function-dropnewtokens}

Sasa tunakuja kwenye kitu kinachoonekana kama utapeli halisi. Nilihariri kazi hii kidogo ili isomeke kwa urahisi, lakini inafanya kazi sawa.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Kazi hii ina kirekebishaji cha `auth()`, ambayo inamaanisha inaweza kuitwa tu na mmiliki wa mkataba.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Kizuizi hiki kinaleta maana kabisa, kwa sababu hatungetaka akaunti za kubahatisha zisambaze tokeni. Hata hivyo, sehemu iliyosalia ya kazi inatia shaka.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Kazi ya kuhamisha kutoka kwa akaunti ya pamoja hadi kwa orodha ya wapokeaji orodha ya kiasi inaleta maana kabisa. Kuna matumizi mengi ambapo utataka kusambaza tokeni kutoka chanzo kimoja hadi maeneo mengi, kama vile malipo ya mishahara, airdrops, n.k. Ni nafuu (kwa gesi) kufanya katika muamala mmoja badala ya kutoa miamala mingi, au hata kuita ERC-20 mara nyingi kutoka kwa mkataba tofauti kama sehemu ya muamala huo huo.

Hata hivyo, `dropNewTokens` haifanyi hivyo. Inatoa [matukio ya `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), lakini kwa kweli haihamishi tokeni zozote. Hakuna sababu halali ya kuchanganya programu za nje ya mnyororo kwa kuziambia kuhusu hamisho ambalo halikufanyika kweli.

### Kazi ya kuteketeza ya `Approve` {#the-burning-approve-function}

Mikataba ya ERC-20 inapaswa kuwa na [kazi ya `approve`](/developers/tutorials/erc20-annotated-code/#approve) kwa ajili ya vibali, na kwa kweli tokeni yetu ya utapeli ina kazi kama hiyo, na hata ni sahihi. Hata hivyo, kwa sababu Solidity inatokana na C inajali herufi kubwa na ndogo. "Approve" na "approve" ni mifuatano tofauti.

Pia, utendaji hauhusiani na `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Kazi hii inaitwa na orodha ya anwani za wamiliki wa tokeni.

```solidity
    public approver() {
```

Kirekebishaji cha `approver()` kinahakikisha kuwa `contract_owner` pekee ndiye anayeruhusiwa kuita kazi hii (tazama hapa chini).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Kwa kila anwani ya mmiliki kazi inahamisha salio lote la mmiliki hadi kwenye anwani `0x00...01`, na kuiteketeza kikamilifu (`burn` halisi katika kiwango pia inabadilisha usambazaji wa jumla, na kuhamisha tokeni hadi `0x00...00`). Hii inamaanisha kuwa `contract_owner` inaweza kuondoa mali za mtumiaji yeyote. Hicho hakionekani kama kipengele ambacho ungetaka katika tokini ya utawala.

### Masuala ya ubora wa msimbo {#code-quality-issues}

Masuala haya ya ubora wa msimbo _hayathibitishi_ kwamba msimbo huu ni utapeli, lakini yanafanya uonekane wa kutiliwa shaka. Kampuni zilizopangwa vizuri kama vile Arbitrum kwa kawaida hazitoi msimbo mbaya kiasi hiki.

#### Kazi ya `mount` {#the-mount-function}

Ingawa haijabainishwa katika [kiwango](https://eips.ethereum.org/EIPS/eip-20), kwa ujumla kazi inayounda tokeni mpya inaitwa [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Tukiangalia katika konstrukta ya `wARB`, tunaona kazi ya kufua muda imebadilishwa jina kuwa `mount` kwa sababu fulani, na inaitwa mara tano na sehemu ya tano ya usambazaji wa awali, badala ya mara moja kwa kiasi chote kwa ufanisi.

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

Kazi ya `mount` yenyewe pia inatia shaka.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Tukiangalia `require`, tunaona kwamba mmiliki wa mkataba pekee ndiye anayeruhusiwa kufua. Hiyo ni halali. Lakini ujumbe wa kosa unapaswa kuwa _only owner is allowed to mint_ au kitu kama hicho. Badala yake, ni ujumbe usiohusika wa _ERC20: mint to the zero address_. Jaribio sahihi la kufua kwenye anwani sifuri ni `require(account != address(0), "<error message>")`, ambalo mkataba haujisumbui kuliangalia.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Kuna mambo mawili zaidi yanayotia shaka, yanayohusiana moja kwa moja na ufuzi:

- Kuna kigezo cha `account`, ambacho huenda ni akaunti inayopaswa kupokea kiasi kilichofuliwa. Lakini salio linaloongezeka kwa kweli ni la `contract_owner`.

- Ingawa salio lililoongezeka ni la `contract_owner`, tukio lililotolewa linaonyesha hamisho kwenda kwa `account`.

### Kwa nini zote mbili `auth` na `approver`? Kwa nini `mod` ambayo haifanyi chochote? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

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

`auth` na `approver` zinaleta maana zaidi, kwa sababu zinaangalia kwamba mkataba uliitwa na `contract_owner`. Tungetarajia vitendo fulani vyenye mapendeleo, kama vile ufuzi, viwe na kikomo kwa akaunti hiyo. Hata hivyo, kuna maana gani ya kuwa na kazi mbili tofauti zinazofanya _kitu kile kile haswa_?

## Tunaweza kugundua nini kiotomatiki? {#what-can-we-detect-automatically}

Tunaweza kuona kwamba `wARB` ni tokeni ya utapeli kwa kuangalia Etherscan. Hata hivyo, hilo ni suluhisho lililowekwa kati. Kinadharia, Etherscan inaweza kuhujumiwa au kudukuliwa. Ni bora kuweza kujua kwa kujitegemea ikiwa tokeni ni halali au la.

Kuna baadhi ya mbinu tunazoweza kutumia kutambua kwamba tokeni ya ERC-20 inatia shaka (iwe ni utapeli au imeandikwa vibaya sana), kwa kuangalia matukio inayotoa.

## Matukio ya `Approval` yanayotia shaka {#suspicious-approval-events}

[Matukio ya `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) yanapaswa kutokea tu kwa ombi la moja kwa moja (tofauti na [matukio ya `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) ambayo yanaweza kutokea kama matokeo ya kibali). [Tazama nyaraka za Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) kwa maelezo ya kina ya suala hili na kwa nini maombi yanahitaji kuwa ya moja kwa moja, badala ya kupatanishwa na mkataba.

Hii inamaanisha kuwa matukio ya `Approval` yanayoidhinisha matumizi kutoka kwa [akaunti inayomilikiwa na mtu wa nje](/developers/docs/accounts/#types-of-account) lazima yatokane na miamala inayoanzia kwenye akaunti hiyo, na ambayo lengo lake ni mkataba wa ERC-20. Aina nyingine yoyote ya idhini kutoka kwa akaunti inayomilikiwa na mtu wa nje inatia shaka.

Hapa kuna [programu inayotambua aina hii ya tukio](https://github.com/qbzzt/20230915-scam-token-detection), kwa kutumia [Viem](https://viem.sh/) na [TypeScript](https://www.typescriptlang.org/docs/), lahaja ya JavaScript yenye usalama wa aina. Ili kuiendesha:

1. Nakili `.env.example` hadi `.env`.
2. Hariri `.env` ili kutoa URL kwa nodi ya Mtandao Mkuu wa Ethereum.
3. Endesha `pnpm install` ili kusakinisha vifurushi vinavyohitajika.
4. Endesha `pnpm susApproval` ili kutafuta idhini zinazotia shaka.

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

Ingiza ufafanuzi wa aina, kazi, na ufafanuzi wa mnyororo kutoka `viem`.

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

Unda mteja wa Viem. Tunahitaji tu kusoma kutoka kwenye mnyororo wa vitalu, kwa hivyo mteja huyu hahitaji ufunguo wa siri.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Anwani ya mkataba wa ERC-20 unaotia shaka, na bloku ambazo ndani yake tutatafuta matukio. Watoa huduma wa nodi kwa kawaida huweka kikomo uwezo wetu wa kusoma matukio kwa sababu kipimo data kinaweza kuwa ghali. Kwa bahati nzuri `wARB` haikutumika kwa kipindi cha saa kumi na nane, kwa hivyo tunaweza kutafuta matukio yote (kulikuwa na 13 pekee kwa jumla).

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

Hii ndiyo njia ya kuuliza Viem taarifa za tukio. Tunapoipatia sahihi kamili ya tukio, ikijumuisha majina ya sehemu, inachanganua tukio kwa ajili yetu.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Kanuni yetu inatumika tu kwa akaunti zinazomilikiwa na watu wa nje. Ikiwa kuna msimbo wa baiti wowote uliorejeshwa na `client.getBytecode` inamaanisha kuwa huu ni mkataba na tunapaswa kuuruka tu.

Ikiwa hujawahi kutumia TypeScript hapo awali, ufafanuzi wa kazi unaweza kuonekana wa kushangaza kidogo. Hatuiambii tu kigezo cha kwanza (na cha pekee) kinaitwa `addr`, lakini pia kwamba ni cha aina ya `Address`. Vile vile, sehemu ya `: boolean` inaiambia TypeScript kwamba thamani ya kurejesha ya kazi ni boolean.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Kazi hii inapata stakabadhi ya muamala kutoka kwa tukio. Tunahitaji stakabadhi ili kuhakikisha tunajua lengo la muamala lilikuwa nini.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Hii ndiyo kazi muhimu zaidi, ile inayoamua kwa kweli ikiwa tukio linatia shaka au la. Aina ya kurejesha, `(Event | null)`, inaiambia TypeScript kwamba kazi hii inaweza kurejesha ama `Event` au `null`. Tunarejesha `null` ikiwa tukio halitii shaka.

```typescript
const owner = ev.args._owner
```

Viem ina majina ya sehemu, kwa hivyo ilichanganua tukio kwa ajili yetu. `_owner` ni mmiliki wa tokeni zitakazotumika.

```typescript
// Vibali vya mikataba havitiliwi shaka
if (await isContract(owner)) return null
```

Ikiwa mmiliki ni mkataba, chukulia idhini hii haitii shaka. Ili kuangalia ikiwa idhini ya mkataba inatia shaka au la tutahitaji kufuatilia utekelezaji kamili wa muamala ili kuona ikiwa uliwahi kufika kwenye mkataba wa mmiliki, na ikiwa mkataba huo uliita mkataba wa ERC-20 moja kwa moja. Hiyo inagharimu rasilimali nyingi zaidi kuliko tunavyopenda kufanya.

```typescript
const txn = await getEventTxn(ev)
```

Ikiwa idhini inatoka kwa akaunti inayomilikiwa na mtu wa nje, pata muamala uliosababisha.

```typescript
// Kibali kinatiliwa shaka kama kinatoka kwa mmiliki wa EOA ambaye si `from` ya muamala
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Hatuwezi tu kuangalia usawa wa mfuatano kwa sababu anwani ni heksadesimali, kwa hivyo zina herufi. Wakati mwingine, kwa mfano katika `txn.from`, herufi hizo zote ni ndogo. Katika hali nyingine, kama vile `ev.args._owner`, anwani iko katika [herufi mchanganyiko kwa utambuzi wa makosa](https://eips.ethereum.org/EIPS/eip-55).

Lakini ikiwa muamala hautoki kwa mmiliki, na mmiliki huyo anamilikiwa na mtu wa nje, basi tuna muamala unaotia shaka.

```typescript
// Pia inatiliwa shaka kama lengwa la muamala si mkataba wa ERC-20 ambao
// tunauchunguza
if (txn.to.toLowerCase() != testedAddress) return ev
```

Vile vile, ikiwa anwani ya `to` ya muamala, mkataba wa kwanza ulioitwa, si mkataba wa ERC-20 unaochunguzwa basi inatia shaka.

```typescript
    // Kama hakuna sababu ya kutilia shaka, rejesha null.
    return null
}
```

Ikiwa hakuna sharti lililo la kweli basi tukio la `Approval` halitii shaka.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Kazi ya `async`](https://www.w3schools.com/js/js_async.asp) inarejesha kipengee cha `Promise`. Kwa sintaksia ya kawaida, `await x()`, tunasubiri `Promise` hiyo itimizwe kabla ya kuendelea na uchakataji. Hii ni rahisi kupanga na kufuata, lakini pia haina ufanisi. Wakati tunasubiri `Promise` kwa tukio maalum kutimizwa tunaweza tayari kuanza kufanyia kazi tukio linalofuata.

Hapa tunatumia [`map`](https://www.w3schools.com/jsref/jsref_map.asp) kuunda orodha ya vipengee vya `Promise`. Kisha tunatumia [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) kusubiri ahadi hizo zote kutatuliwa. Kisha tunachuja ([`filter`](https://www.w3schools.com/jsref/jsref_filter.asp)) matokeo hayo ili kuondoa matukio yasiyotia shaka.

### Matukio ya `Transfer` yanayotia shaka {#suspicious-transfer-events}

Njia nyingine inayowezekana ya kutambua tokeni za utapeli ni kuona ikiwa zina mahamisho yoyote yanayotia shaka. Kwa mfano, mahamisho kutoka kwa akaunti ambazo hazina tokeni nyingi hivyo. Unaweza kuona [jinsi ya kutekeleza jaribio hili](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), lakini `wARB` haina suala hili.

## Hitimisho {#conclusion}

Ugunduzi wa kiotomatiki wa utapeli wa ERC-20 unakabiliwa na [matokeo hasi ya uongo](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), kwa sababu utapeli unaweza kutumia mkataba wa tokeni wa ERC-20 wa kawaida kabisa ambao hauwakilishi chochote halisi. Kwa hivyo unapaswa kujaribu kila wakati _kupata anwani ya tokeni kutoka kwa chanzo kinachoaminika_.

Ugunduzi wa kiotomatiki unaweza kusaidia katika hali fulani, kama vile vipande vya fedha zilizogatuliwa (DeFi), ambapo kuna tokeni nyingi na zinahitaji kushughulikiwa kiotomatiki. Lakini kama kawaida [mnunuzi achukue tahadhari (caveat emptor)](https://www.investopedia.com/terms/c/caveatemptor.asp), fanya utafiti wako mwenyewe, na uwahimize watumiaji wako kufanya vivyo hivyo.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).