---
title: Leabharlanna conarthaí cliste
description:
lang: ga
---

Ní gá duit gach conradh cliste i do thionscadal a scríobh ón tús. Tá go leor leabharlanna conartha cliste foinse oscailte ar fáil a sholáthraíonn bloic thógála ath-inúsáidte do do thionscadal ar féidir leo tú a shábháil ón roth a athchruthú.

## Réamhriachtanais {#prerequisites}

Sula léimeann tú isteach i leabharlanna conartha cliste, is fiú tuiscint mhaith a bheith agat ar struchtúr conartha cliste. Téigh chuig [anatamaíocht chonartha cliste](/developers/docs/smart-contracts/anatomy/) mura bhfuil sé sin déanta agat go fóill.

## Cad atá i leabharlann {#whats-in-a-library}

Is gnách go bhfaighidh tú dhá chineál bloic thógála i leabharlanna conarthaí cliste: iompraíocht ath-inúsáidte is féidir leat a chur le do chonarthaí, agus cur i bhfeidhm chaighdeáin éagsúla.

### Iompraíochtaí {#behaviors}

Agus conarthaí cliste á scríobh agat, tá seans maith ann go mbeidh tú ag scríobh patrúin den chineál céanna arís agus arís eile, mar shampla seoladh _admin_ a shannadh chun oibríochtaí cosanta a dhéanamh i gconradh, nó cnaipe éigeandála _sos_ a chur leis i gcás ceiste gan choinne.

Is gnách go soláthraíonn leabharlanna conartha cliste feidhmiúcháin ath-inúsáidte de na hiompraíochtaí seo mar [leabharlanna](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) nó trí <[oidhreacht](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) i Solidity.

Mar shampla, seo a leanas leagan simplithe den chonradh [`Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) ón [Leabharlann Conarthaí OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), a ainmníonn seoladh mar úinéir conartha, agus a sholáthraíonn modhnóir chun rochtain ar mhodh a shrianadh chuig an úinéir amháin.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Chun bloc tógála mar seo a úsáid i do chonradh, bheadh ​​ort é a allmhairiú ar dtús, agus ansin síneadh uaidh i do chonarthaí féin. Ligeann sé seo duit úsáid a bhaint as an modhnóir a sholáthraíonn an bunchonradh `Ownable` chun do chuid feidhmeanna féin a dhéanamh slán.

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Sampla coitianta eile is ea [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) nó [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Is leabharlanna iad seo (seachas bunchonarthaí) a sholáthraíonn feidhmeanna uimhríochta le seiceálacha forshreafaí, nach soláthraíonn an teanga. Is dea-chleachtas é ceachtar de na leabharlanna seo a úsáid in ionad oibríochtaí uimhríochta dúchais chun do chonradh a chosaint ar ró-shreabhadh, rud a bhféadfadh iarmhairtí tubaisteacha a bheith aige!

### Caighdeáin {#standards}

Chun [cumthacht agus idir-inoibritheacht](/developers/docs/smart-contracts/composability/) a éascú, tá roinnt caighdeán sainmhínithe ag pobal Ethereum i bhfoirm **ERCs **. Is féidir leat tuilleadh a léamh fúthu sa rannán [caighdeáin](/developers/docs/standards/).

Agus ERC san áireamh mar chuid de do chonarthaí, is smaoineamh maith é feidhmiú caighdeánach a lorg seachas iarracht a dhéanamh do chuid féin a rolladh amach. Áirítear le go leor leabharlanna conartha cliste feidhmiúcháin do na ERCanna is mó ráchairt. Mar shampla, tá an [caighdeán comharthaí idirmhalartacha ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) uileláithreach le fáil in [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) agus [OpenZeppelin ](https://docs.openzeppelin.com/contracts/3.x/erc20). Ina theannta sin, cuireann roinnt ERCanna feidhmiúcháin chanónacha ar fáil mar chuid den ERC féin.

Is fiú a lua nach bhfuil roinnt ERCanna neamhspleách, ach gur breisithe iad le ERCanna eile. Mar shampla, cuireann [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) síneadh le ERC20 chun a inúsáidteacht a fheabhsú.

## Conas leabharlann a chur leis {#how-to}

Déan tagairt i gcónaí do dhoiciméadú na leabharlainne atá á cur agat le haghaidh treoracha sonracha maidir le conas é a áireamh i do thionscadal. Déantar roinnt leabharlann conarthaí Solidity a phacáistiú trí úsáid a bhaint as `npm`, mar sin ní féidir leat ach `suiteáil npm ` a dhéanamh orthu. Breathnóidh formhór na n-uirlisí chun [conarthaí a thiomsú](/developers/docs/smart-contracts/compiling/) ar do `node_modules` le haghaidh leabharlanna conartha cliste, ionas gur féidir leat na rudaí seo a leanas a dhéanamh:

```solidity
// This will load the @openzeppelin/contracts library from your node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Is cuma cén modh a úsáideann tú, agus leabharlann san áireamh, coinnigh súil i gcónaí ar an leagan [teanga](/developers/docs/smart-contracts/languages/). Mar shampla, ní féidir leat leabharlann a úsáid le haghaidh Solidity 0.6 má tá do chonarthaí á scríobh agat i Solidity 0.5.

## Cathain a úsáid {#when-to-use}

Tá buntáistí éagsúla ag baint le leabharlann chliste chonartha a úsáid le haghaidh do thionscadal. Ar an gcéad dul síos, sábhálann sé am duit trí bhloic thógála réidh le húsáid a sholáthar duit is féidir leat a chur san áireamh i do chóras, seachas a bheith ag iarraidh iad a chódú duit féin.

Is buntáiste mór é slándáil freisin. Is minic freisin go ndéantar dianscrúdú ar leabharlanna conarthaí cliste foinse oscailte. Ós rud é go mbraitheann go leor tionscadal orthu, tá spreagadh láidir ag an bpobal iad a choinneáil faoi athbhreithniú leanúnach. Tá sé i bhfad níos coitianta earráidí a aimsiú sa chód feidhme ná i leabharlanna conartha in-athúsáidte. Déantar [iniúchtaí seachtracha](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) ar roinnt leabharlann freisin le haghaidh slándála breise.

Mar sin féin, tá an baol ann go n-áireofaí cód nach bhfuil tú eolach air i do thionscadal agus leabharlanna conartha cliste á n-úsáid agat. Bheadh fonn ort conradh a iompórtáil agus é a áireamh go díreach isteach i do thionscadal, ach gan tuiscint mhaith ar cad a dhéanann an conradh sin, d'fhéadfá fadhb a thabhairt isteach i do chóras gan chuimhneamh mar gheall ar iompar gan choinne. Bí cinnte i gcónaí doiciméadú an chóid atá á iompórtáil agat a léamh, agus ansin déan athbhreithniú ar an gcód féin sula ndéanann tú cuid de do thionscadal de!

Ar deireadh, agus cinneadh á dhéanamh ar cheart leabharlann a chur san áireamh, déan machnamh ar a húsáid iomlán. Baineann buntáistí le leabharlann a bhfuil glacadh ag pobal forleathan leis le níos mó súile ag faire amach d'fhadhbanna. Ba chóir go mbeadh slándáil mar phríomhfhócas agat agus tú ag tógáil le conarthaí cliste!

## Uirlisí gaolmhara {#related-tools}

**Conarthaí OpenZeppelin -** **_An leabharlann is mó a bhfuil tóir uirthi le haghaidh forbairt conartha cliste slán._ **

- [Doiciméadúchán](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Fóram Pobail](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Bloic thógála atá sábháilte, simplí agus solúbtha le haghaidh conarthaí cliste._**

- [Doiciméadúchán](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Tionscadal Solidity le conarthaí, leabharlanna agus samplaí chun cabhrú leat feidhmchláir dáilte lánfheidhme a thógáil don domhan fíor._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Soláthraíonn sé na huirlisí is gá chun conarthaí saincheaptha cliste a thógáil go héifeachtach_**

- [Doiciméadúchán](https://portal.thirdweb.com/solidity/)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Ranganna teagaisc a bhaineann leo {#related-tutorials}

- [Breithnithe slándála d'fhorbróirí Ethereum](/developers/docs/smart-contracts/security/) _- Teagaisc ar chúrsaí slándála agus conarthaí cliste á dtógáil, lena n-áirítear leabharlann úsáid._
- [Tuig an conradh cliste comharthaí ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Teagasc ar an gcaighdeán ERC20, arna sholáthar ag iliomad leabharlanna._

## Tuilleadh léitheoireachta {#further-reading}

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_
