---
title: Smart kontract libraries
description:
lang: pcm
---

Yu nor nid to dey write efri smart kontract for yor project from di biginnin. Plenti open source smart kontract libraries dey wey get buildin blocks wey yu fit yus again and again for your project wey fit save yu from to dey do am again.

## Prerequisites {#prerequisites}

Bifor yu jump enta smart kontract libraries, na good idia to ondastand di strukshure of smart kontract wella. Start to dey go to [smart kontract anatomy](/developers/docs/smart-contracts/anatomy/) if yu neva do am bifor.

## Wetin dey inside library {#whats-in-a-library}

Yu fit ushualy find two kain buildin blocks for smart kontract libraries: behaviours wey yu fit add to yor kontracts wey yu fit yus again, and implementashons of difren standards.

### Behaviors {#behaviors}

Wen yu dey write smart kontracts, good shans dey wey yu fo find yorsef dey write same pattans ova and ova, laik to dey assign one _admin_ address to do operashons wey dem don protet for kontract, abi to dey add one emergency _pause_ button if issue wey yu nor ekspet hapun.

Smart kontract libraries dey ushualy give implimentashons of dis behaviours wey yu fit yus again as [libraries](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries)abi thru [inheritans](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) for Solidity.

As eksampol, to dey folow one simpol vashon of di [`Ownabol` kontract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) from di [OpenZeppelin Kontracts library](https://github.com/OpenZeppelin/openzeppelin-contracts), wey dey shuse one address as di owna of di kontract, and e dey give modifier to restrict access to only dat owna for some metod.

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

To yus one buildin block laik dis for yor kontract, yu go first nid to import am, and den extend from am in yor own kontracts. Dis go allow yu yus di modifier wey di `Ownabol` kontract don provide to sekure yor own funshons.

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Anoda popular eksampol na [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) abi [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Dis na libraries (as e dey against to base kontracts) wey provide arithmetik funshons wit ovaflow sheks, wey di languaj nor dey provide. Na good praktis to yus one of dis libraries insted of native arithemetik operashons to guard yor kontract ovaflows, wey fit get bad konsekwens.

### Levels {#standards}

To make tins [fit work well togeda and dey kompatibol](/developers/docs/smart-contracts/composability/), di Ethereum komunity don define some standards in di form of **ERCs**. Yu fit read more about dem for di [standards](/developers/docs/standards/) sekshon.

Wen yu dey add one ERC as part of yor kontracts, na good idia to dey look for standard implementashons pass to dey try roll out yor own. Plenti smart kontract libraries inklude implementashons for di ERCs wey popular pass. For eksampol, di afailabol [ERC20 fungibol token standard](/developers/tutorials/understand-the-erc-20-token-smart-contract/) wey efribody sabi for [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) and [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). In adishon, some ERCs also provide kanonical implementashons as part of di ERC imsef.

Im worth to menshon sey some ERCs nor bi standalone, but dem adishons to oda ERCs. For eksampol, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) dey add one ekstenshon to ERC20 to impruf di way to yus am.

## Hau to add one labrary {#how-to}

Make yu always refer to di dokumentashon of di library wey yu inklud for spesifik instrukshon on hau to inklude am in yor projet. Dem don pakaj mome Solidity kontract libraries to dey yus `npm`, so yu fit just `npm install` dem. Plenti tools wey dey [kompile](/developers/docs/smart-contracts/compiling/) kontracts go look yor `node_modules` for smart kontract libraries, so yu fit do di followin:

```solidity
// This will load the @openzeppelin/contracts library from your node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Nor mata di metod yu yus, wen yu dey inklude library, always dey kip one eye on di [languaj](/developers/docs/smart-contracts/languages/) vashon. For eksampol, yu nor fit yus one library for Solidity 0.6 if yu dey write yor kontracts in Solidity 0.5.

## Wen yu fit yus am {#when-to-use}

To dey yus one smart kontract library for yor project get plenti benefits. Numba one, im dey save yu taim as im dey provide yu wit ready-to-yus buildin blocks wey yu fit inklude in yor system, pass to dey code dem yorsef.

Sekurity na ogbonge plus to am. Open source smart kontract libraries dey skrutinaize wella. Bikos plenti projects dipend on dem, strong insentiv dey by di komunity to kip dem onda konstant review. Im komon wella to dey find errors in aplikashon code pass inside kontract libraries wey yu fit yus again. Some libraries sef dey get [external audit](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) for adishonal sekurity.

But, to dey yus smart kontract libraries get risk say yu fit inklude code wey yu nor sabi wella for yur project. Im fit dey tempt yu to import one kontract and inklude am direct into yor projet, but witout one good ondastandin of wetin dat kontract dey do, yu fit dey introdus one issue wella in yor system due to one bihavior yu nor ekspet. Always make sure to read di dokumentashon of di code yu dey import, and den review di code imsef bifor yu make am part of yor project!

Last, wen yu dey diside on weda to inklude one library, make yu konsida hau yu dey yus am. Di one wey pipol dey yus pass get benefits to get one large komunity and more eyes to dey look into am for issues. Sekurity suppose bi yor primary fokus wen yu dey build wit smart kontracts!

## Tools resembol {#related-tools}

**OpenZeppelin Kontracts -** **_Library wey popular pass to dey sekure smart kontract divelopment._**

- [Dokumentashon](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Komunity Forum](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Safe, simpol, flexibol building-blocks for smart-kontracts._**

- [Dokumentashon](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_One Solidity project wit kontracts, libraries and eksampol to helep yu build aplikashons wey dem don distribute for real world._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Dey provide di tools wey dey nid to build kustom smart kontracts betta_**

- [Dokumentashon](https://portal.thirdweb.com/solidity/)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Related tutorials {#related-tutorials}

- [ Di sekurity konsiderashons for Ethereum divelopas](/developers/docs/smart-contracts/security/) _– Dis one na tutorial on sekurity konsiderashons wen dem dey build smart kontracts, inkludin library yus._
- [Ondastand di ERC-20 token smart kontract](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Tutorial on di ERC20 standard, wey dem plenti libraries dey provide._

## Further reading {#further-reading}

_Know a community resource wey fit helped you? Edit this page and add it!_
