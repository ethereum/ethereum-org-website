---
title: ERC-223 Caighdeán Chomhartha
description: Forbhreathnú ar an gcaighdeán comharthaí idirmhalartacha ERC-223, conas a oibríonn sé, agus comparáid le ERC-20.
lang: ga
---

## Réamhrá {#introduction}

### Cad é ERC-223? {#what-is-erc223}

Is caighdeán é ERC-223 le haghaidh comharthaí idirmhalartacha, cosúil leis an gcaighdeán ERC-20. Is í an phríomhdhifríocht ná go sainmhíníonn ERC-223 ní amháin API chomharthaí ach freisin an loighic chun comharthaí a aistriú ó sheoltóir go faighteoir. Tugann sé isteach múnla cumarsáide a cheadaíonn aistrithe chomharthaí a láimhseáil ar thaobh an fhaighteora.

### Difríochtaí ó ERC-20 {#erc20-differences}

Tugann ERC-223 aghaidh ar roinnt srianta a bhaineann le ERC-20 agus tugtar isteach modh nua idirghníomhaíochta idir an conradh comhartha agus conradh a fhéadfaidh na comharthaí a fháil. Is beag rudaí indéanta le ERC-223 nach bhfuil indéanta le ERC-20:

- Láimhseáil aistrithe comhartha ar thaobh an fhaighteora: Is féidir le faighteoirí a bhrath go bhfuil comhartha ERC-223 á thaisceadh.
- Diúltú comharthaí seolta go míchuí: Má sheolann úsáideoir comharthaí ERC-223 chuig conradh nach bhfuil ceaptha chun comharthaí a fháil, is féidir leis an gconradh an t-idirbheart a dhiúltú, rud a chuireann cosc ​​ar chaillteanas chomharthaí.
- Meiteashonraí in aistrithe: Is féidir meiteashonraí a áireamh le comharthaí ERC-223, rud a fhágann gur féidir faisnéis threallach a cheangal le hidirbhearta dearbhán.

## Réamhriachtanais {#prerequisites}

- [Cuntais](/developers/docs/accounts)
- [Conarthaí Cliste](/developers/docs/smart-contracts/)
- [Caighdeáin chomhartha](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Corp {#body}

Is caighdeán dearbhán é ERC-223 a chuireann API le haghaidh comharthaí i bhfeidhm laistigh de chonarthaí cliste. Dearbhaíonn sé freisin API le haghaidh conarthaí atá ceaptha chun comharthaí ERC-223 a fháil. Ní féidir le conarthaí nach dtacaíonn le API Glacadóir ERC-223 comharthaí ERC-223 a fháil, rud a chuireann cosc ​​ar earráid úsáideora.

Má chuireann conradh cliste na modhanna agus na himeachtaí seo a leanas i bhfeidhm is féidir conradh dearbhán comhoiriúnach ERC-223 a thabhairt air. Nuair a bheidh sé imscartha, beidh sé freagrach as súil a choinneáil ar na comharthaí cruthaithe ar Ethereum.

Níl aon oibleagáid ar an gconradh ach na feidhmeanna seo a bheith aige agus is féidir le forbróir aon ghné eile ó chaighdeáin chomharthaí éagsúla a chur leis an gconradh seo. Mar shampla, níl feidhmeanna `ceadaigh` agus `transferFrom` mar chuid de chaighdeán ERC-223 ach d'fhéadfaí na feidhmeanna seo a chur i bhfeidhm dá mbeadh gá leis.

Ó [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Modhanna {#methods}

Ní mór do chomhartha ERC-223 na modhanna seo a leanas a chur i bhfeidhm:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Caithfidh conradh atá ceaptha chun comharthaí ERC-223 a fháil an modh seo a leanas a chur i bhfeidhm:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Má sheoltar comharthaí ERC-223 chuig conradh nach gcuireann an fheidhm `tokenReceived(..)` i bhfeidhm ní mór go dteipfidh ar an aistriú agus ní féidir na comharthaí a aistriú ó iarmhéid an tseoltóra.

### Imeachtaí {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Samplaí {#examples}

Tá an API de ERC-223 chomhartha cosúil leis an ERC-20, mar sin ó thaobh forbartha Chomhéadain níl aon difríocht ann. Is é an t-aon eisceacht anseo ná go bhféadfadh sé nach mbeadh feidhmeanna `ceadaigh` + `transferFrom` ag comharthaí ERC-223 mar go bhfuil siad seo roghnach don chaighdeán seo.

#### Samplaí soladacha {#solidity-example}

Léiríonn an sampla seo a leanas conas a fheidhmíonn bunchonradh dearbhán ERC-223:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Anois teastaíonn conradh eile uainn chun glacadh le taiscí `tokenA` ag glacadh leis gur comhartha ERC-223 é tokenA. Ní mór don chonradh glacadh le tokenA amháin agus aon comharthaí eile a dhiúltú. Nuair a fhaigheann an conradh chomhartha, caithfidh sé imeacht `Taiscigh()` a astú agus luach na hathróige `taiscí` inmheánach a mhéadú.

Seo é an cód:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // An t-aon chomhartha gur mian linn glacadh leis.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Tá sé tábhachtach é sin a thuiscint laistigh den fheidhm seo
        // msg.sender seoladh dearbhán atá á fháil,
        // msg.value  is 0 i gcónaí toisc nach leis an gconradh chomharthaí ná nach seolann éitear i bhformhór na gcásanna,
        // _from      is é seoltóir an aistrithe chomhartha.
        // _value     is é an méid comharthaí a cuireadh i dtaisce.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Ceisteanna coitianta {#faq}

### Cad a tharlóidh má sheolaimid roinnt tokenB chuig an gconradh? {#sending-tokens}

Teipfidh an t-idirbheart, agus ní tharlóidh aistriú comharthaí. Seolfar na comharthaí ar ais chuig seoladh an tseoltóra.

### Conas is féidir linn taisce a dhéanamh sa chonradh seo? {#contract-deposits}

Glaoigh ar an fheidhm `transfer(address,uint256)` nó `transfer(address,uint256,bytes)` den chomhartha ERC-223, ag sonrú seoladh an `RecipientContract`.

### Cad a tharlóidh má aistrímid comhartha ERC-20 chuig an gconradh seo? {#erc-20-transfers}

Má sheoltar comhartha ERC-20 chuig an `RecipientContract`, aistreofar na comharthaí, ach ní aithneofar an t-aistriú (ní dhéanfar aon imeacht `Taiscigh()` a bhácáil, agus ní athrófar luach na taiscí). Ní féidir taiscí ERC-20 nach dteastaíonn a scagadh ná a chosc.

### Cad a tharlaíonn má theastaíonn uainn feidhm éigin a rith tar éis don taisce chomhartha a bheith críochnaithe? {#function-execution}

Tá bealaí iomadúla ann chun é sin a dhéanamh. Sa sampla seo leanfaimid an modh a fhágann gurb ionann aistrithe ERC-223 agus aistrithe éitir:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Nuair a gheobhaidh an `RecipientContract` chomhartha ERC-223 déanfaidh an conradh feidhm atá ionchódaithe mar pharaiméadar `_data` an idirbhirt chomharthaí, comhionann leis an gcaoi a n-ionchódaíonn idirbhearta éitear glaonna mar `data` idirbhirt. Léigh [an réimse sonraí] (/developers/docs/transactions/#the-data-field) le haghaidh tuilleadh faisnéise.

Sa sampla thuas ní mór comhartha ERC-223 a aistriú chuig seoladh an `RecipientContract` leis an bhfeidhm `transfer(address,uin256,bytes calldata _data)`. Más é `0xc2985578` (síniú feidhm `foo()`) an paraiméadar sonraí, déanfar an foo feidhme () a agairt tar éis an taisce chomhartha a fháil agus déanfar an t-imeacht Foo() a bhácáil.

Is féidir paraiméadair a ionchódú i `sonraí` an aistrithe chomharthaí freisin, mar shampla is féidir linn an fheidhm barra() a ghlaoch le luach 12345 le haghaidh `_someNumber`. Sa chás seo, caithfidh an `data` a bheith `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, áit a bhfuil `0x0423a132` ina shíniú ar an bhfeidhm `bar(uint256)` agus `00000000000000000000000000000000000000000000000000000000000004d2` ina 12345 mar uint256.

## Teorainneacha {#limitations}

Cé go dtugann ERC-223 aghaidh ar roinnt saincheisteanna a aimsítear i gcaighdeán ERC-20, níl a theorainneacha féin ag baint leis:

- Glacadh agus Comhoiriúnacht: Níl ERC-223 glactha go forleathan fós, rud a d’fhéadfadh teorainn a chur lena chomhoiriúnacht le huirlisí agus le hardáin atá ann cheana.
- Comhoiriúnacht Siar: Níl ERC-223 comhoiriúnach siar le ERC-20, rud a chiallaíonn nach n-oibreoidh conarthaí agus uirlisí ERC-20 atá ann cheana le comharthaí ERC-223 gan modhnuithe.
- Costais Gháis: D’fhéadfadh costais gháis níos airde a bheith mar thoradh ar sheiceálacha agus feidhmiúlachtaí breise in aistrithe ERC-223 i gcomparáid le hidirbhearta ERC-20.

## Tuilleadh léitheoireachta {#further-reading}

- [EIP-223: Caighdeán Comhartha ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Togra tosaigh ERC-223](https://github.com/ethereum/eips/issues/223)
