---
title: Okosszerződés könyvtárak
description:
lang: hu
---

Nem kell minden okosszerződést a nulláról megírni. Számos nyílt forráskódú okosszerződés könyvtár áll rendelkezésedre, amelyek újrafelhasználható építőelemeket kínálnak a projektedhez, így megkímélnek attól, hogy újra fel kelljen találni a kereket.

## Előfeltételek {#prerequisites}

Mielőtt belevetnéd magad az okosszerződés könyvtárakba, érdemes tisztában lenned az okosszerződések felépítésével. Irány az [okosszerződés anatómia](/developers/docs/smart-contracts/anatomy/) cikk, ha még nem olvastad el.

## Mi van egy könyvtárban {#whats-in-a-library}

Az okosszerződés könyvtárakban általában kétféle építőelem található: újrafelhasználható eljárások, amelyeket hozzáadhatsz a szerződéseidhez, valamint különféle szabványok megvalósítása.

### Eljárások {#behaviors}

Okosszerződés írás közben jó esély van rá, hogy újra és újra hasonló minták megírásán találod magad, mint például hozzárendelsz egy _admin_ címet védett operációk véghezviteléhez, vagy egy vészeseti _szünet_ gombot adsz hozzá egy váratlan esemény miatt.

Az okosszerződéses könyvtárak általában ezeknek a viselkedéseknek az újrafelhasználható megvalósítását biztosítják [könyvtárakon](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) vagy [öröklésen keresztül](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) Solidity-ben.

Példaként az alábbiakban bemutatjuk az [`Ownable` szerződés](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) egyszerűsített verzióját az [OpenZeppelin Szerződés könyvtárból](https://github.com/OpenZeppelin/openzeppelin-contracts), mely egy címet jelöl ki tulajdonosként a szerződésben, és egy módosítóval lekorlátozza az adott metódus hozzáférését az adott tulajdonosra.

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

Egy ehhez hasonló építőelem használatához a szerződésedben, először be kell importálnod, majd kiterjesztened belőle a szerződéseidet. Ez lehetővé teszi az `Ownable` szerződés által biztosított módosító használatát, hogy bebiztosítsd a saját függvényeidet.

```solidity
import ".../Ownable.sol"; // Az importált könyvtár útvonala

contract MyContract is Ownable {
    // Az alábbi függvényt csak a tulajdonos hívhatja meg
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Egy másik népszerű példa a [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) vagy a [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Ezek olyan könyvtárak (szemben az alapszerződésekkel), amelyek számtani függvényeket biztosítanak túlcsordulás-ellenőrzésekkel, amelyeket a nyelv nem biztosít. Jó gyakorlat ezeknek a könyvtáraknak az alkalmazása a natív számtani műveletek helyett, hogy megvédd a szerződésed a túlcsordulástól, amelynek katasztrofális következményei lehetnek!

### Szabványok {#standards}

Hogy elősegítsük az [összeilleszthetőséget és az interoperabilitást](/developers/docs/smart-contracts/composability/), az Ethereum közösség számos szabványt vezetett be **ERC-k** formájában. Többet olvashatsz róluk a [szabványok](/developers/docs/standards/) részben.

Amikor egy ERC-t szeretne betenni a szerződésbe, célszerű sztenderd megvalósításokat keresni ahelyett, hogy megpróbálná a sajátját bevezetni. Számos okosszerződés könyvtár tartalmazza a legnépszerűbb ERC-k megvalósításait. Például a mindenütt jelen levő [ERC20 felcserélhető tokenszabvány](/developers/tutorials/understand-the-erc-20-token-smart-contract/) megtalálható a [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) és [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20) platformon. Ezenkívül, egyes ERC-k kanonikus megvalósításokat is biztosítanak az ERC részeként.

Érdemes megemlíteni, hogy egyes ERC-k nem önállóak, hanem kiegészítenek más ERC-ket. Például az [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) kiterjeszti az ERC20-as szabványt a használhatóság javítása érdekében.

## Hogyan lehet könyvtárt hozzáadni {#how-to}

Mindig nézd át a könyvtár dokumentációját, amit használsz a projektedben specifikus instrukciókért arról, hogyan kell használni. Számos Solidity szerződés könyvtár az `npm` használatával van csomagolva, így elég csak `npm install` módon telepíteni őket. A legtöbb szerződés [fordító](/developers/docs/smart-contracts/compiling/) eszköz végig nézi a `node_modules` mappát okosszerződés könyvtárak után kutatva, így megteheted a következőt:

```solidity
// Ez betölti az @openzeppelin/contracts könyvtárat a node_modules könyvtárból
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Az általad használt módszertől függetlenül, ha könyvtárat importálsz be, mindig ellenőrizd le a [nyelv](/developers/docs/smart-contracts/languages/) verziót. Például nem használhatsz könyvtárat a Solidity 0.6-hoz, ha a szerződéseidet a Solidity 0.5-ben írod.

## Mikor használjuk {#when-to-use}

Egy okosszerződés könyvtár használatának számos előnye van. Először is, időt takarít meg azzal, hogy használatra kész építőelemeket biztosít, amelyeket beépíthetsz a rendszeredbe, ahelyett, hogy saját magadnak kellene leprogramozni őket.

A biztonság is egy fontos pozitívum. A nyílt forráskódú okosszerződés könyvtárakat gyakran alaposan megvizsgálják. Tekintettel arra, hogy sok projekt függ tőlük, a közösségnek erős ösztönzője van arra, hogy folyamatosan felülvizsgálja őket. Sokkal gyakrabban lehet hibákat találni az alkalmazáskódban, mint az újrafelhasználható szerződés könyvtárakban. Némely könyvtár [külső auditnak](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) veti alá magát magasabb fokú biztonságért.

Az okosszerződés könyvtárak használata azonban azt a kockázatot hordozza magával, hogy számodra ismeretlen kódot veszel fel a projektbe. Csábító egy szerződést importálni és közvetlenül beilleszteni a projektbe, de anélkül, hogy megértenéd, hogy ez a szerződés mit csinál pontosan, véletlenül bevihetsz egy hibát a rendszerbe egy váratlan viselkedésből kifolyólag. Mindig feltétlenül olvasd el az importált kód dokumentációját, majd nézd át magát a kódot, mielőtt a projekt részévé tennéd!

Végül, amikor eldöntöd, hogy felveszel-e egy könyvtárat, vedd figyelembe annak általános használatát. Egy széles körben elfogadott szerződés előnye, hogy nagyobb a közössége, és többen tudnak foglalkozni a problémákkal. A biztonság legyen az elsődleges szempont okosszerződés fejlesztéskor!

## Kapcsolódó eszközök {#related-tools}

**OpenZeppelin Contracts -** **_A legnépszerűbb könyvtár biztonságos okosszerződés fejlesztéshez._**

- [Dokumentáció](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Közösségi Fórum](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Biztonságos, egyszerű, flexibilis okosszerződés építőelemek._**

- [Dokumentáció](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Egy Solidity projekt szerződésekkel, könyvtárakkal és példákkal, melyek segítenek teljesértékű alkalmazásokat fejleszteni a külvilágnak_**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK –** **_Olyan eszközöket biztosít, melyekkel hatékonyan lehet személyre szabott okosszerződéseket létrehozni_**

- [Dokumentáció](https://portal.thirdweb.com/solidity/)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Kapcsolódó útmutatók {#related-tutorials}

- [Security considerations for Ethereum developers](/developers/docs/smart-contracts/security/) _– Egy biztonsági megfontolásokról szóló útmutató okosszerződés-fejlesztéshez könyvtárhasználattal._
- [Az ERC-20 tokenes okosszerződés megértése](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Útmutató az ERC20 szabványról több könyvtáron keresztül._

## További olvasnivaló {#further-reading}

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_
