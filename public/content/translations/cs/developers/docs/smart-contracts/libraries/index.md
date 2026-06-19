---
title: Knihovny chytrých kontraktů
description: Objevte znovupoužitelné knihovny chytrých kontraktů a stavební bloky, které urychlí vaše vývojové projekty na Ethereu.
lang: cs
---

Nemusíte psát každý chytrý kontrakt ve svém projektu od nuly. K dispozici je mnoho open source knihoven chytrých kontraktů, které poskytují znovupoužitelné stavební bloky pro váš projekt a mohou vás ušetřit nutnosti znovu vynalézat kolo.

## Předpoklady {#prerequisites}

Než se vrhnete na knihovny chytrých kontraktů, je dobré mít solidní představu o struktuře chytrého kontraktu. Pokud jste tak ještě neučinili, přejděte na [anatomii chytrého kontraktu](/developers/docs/smart-contracts/anatomy/).

## Co obsahuje knihovna {#whats-in-a-library}

V knihovnách chytrých kontraktů obvykle najdete dva druhy stavebních bloků: znovupoužitelná chování, která můžete přidat do svých kontraktů, a implementace různých standardů.

### Chování {#behaviors}

Při psaní chytrých kontraktů je velká šance, že se přistihnete, jak píšete podobné vzory stále dokola, jako je přiřazení _admin_ adresy k provádění chráněných operací v kontraktu, nebo přidání nouzového tlačítka _pause_ (pozastavit) pro případ neočekávaného problému.

Knihovny chytrých kontraktů obvykle poskytují znovupoužitelné implementace těchto chování jako [knihovny](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) nebo prostřednictvím [dědičnosti](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) v Solidity.

Jako příklad uvádíme zjednodušenou verzi [kontraktu `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) z [knihovny OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts), který určuje adresu jako vlastníka kontraktu a poskytuje modifikátor pro omezení přístupu k metodě pouze pro tohoto vlastníka.

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

Chcete-li ve svém kontraktu použít takovýto stavební blok, musíte jej nejprve importovat a poté z něj ve svých vlastních kontraktech dědit. To vám umožní použít modifikátor poskytovaný základním kontraktem `Ownable` k zabezpečení vašich vlastních funkcí.

```solidity
import ".../Ownable.sol"; // Cesta k importované knihovně

contract MyContract is Ownable {
    // Následující funkci může volat pouze vlastník
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Dalším oblíbeným příkladem je [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) nebo [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Jedná se o knihovny (na rozdíl od základních kontraktů), které poskytují aritmetické funkce s kontrolou přetečení, což samotný jazyk neposkytuje. Je dobrou praxí používat některou z těchto knihoven místo nativních aritmetických operací, abyste svůj kontrakt ochránili před přetečením, které může mít katastrofální následky!

### Standardy {#standards}

Pro usnadnění [skládatelnosti a interoperability](/developers/docs/smart-contracts/composability/) definovala komunita Etherea několik standardů ve formě **ERC**. Více si o nich můžete přečíst v sekci [standardy](/developers/docs/standards/).

Při začleňování ERC do vašich kontraktů je dobré hledat standardní implementace, spíše než se snažit vytvořit vlastní. Mnoho knihoven chytrých kontraktů obsahuje implementace pro nejpopulárnější ERC. Například všudypřítomný [standard pro zaměnitelný token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) lze nalézt v [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) a [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Některé ERC navíc poskytují kanonické implementace jako součást samotného ERC.

Stojí za zmínku, že některé ERC nejsou samostatné, ale jsou doplňky k jiným ERC. Například [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) přidává rozšíření k ERC-20 pro zlepšení jeho použitelnosti.

## Jak přidat knihovnu {#how-to}

Vždy se podívejte do dokumentace knihovny, kterou začleňujete, kde najdete konkrétní pokyny, jak ji do projektu zahrnout. Několik knihoven kontraktů v Solidity je zabaleno pomocí `npm`, takže je můžete jednoduše nainstalovat pomocí `npm install`. Většina nástrojů pro [kompilaci](/developers/docs/smart-contracts/compiling/) kontraktů bude hledat knihovny chytrých kontraktů ve vaší složce `node_modules`, takže můžete udělat následující:

```solidity
// Toto načte knihovnu @openzeppelin/contracts z vašich node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Bez ohledu na použitou metodu při začleňování knihovny vždy dávejte pozor na verzi [jazyka](/developers/docs/smart-contracts/languages/). Například nemůžete použít knihovnu pro Solidity 0.6, pokud píšete své kontrakty v Solidity 0.5.

## Kdy je použít {#when-to-use}

Použití knihovny chytrých kontraktů pro váš projekt má několik výhod. V první řadě vám šetří čas tím, že vám poskytuje stavební bloky připravené k použití, které můžete zahrnout do svého systému, místo abyste je museli kódovat sami.

Bezpečnost je také velkým plusem. Open source knihovny chytrých kontraktů jsou často velmi pečlivě zkoumány. Vzhledem k tomu, že na nich závisí mnoho projektů, má komunita silnou motivaci udržovat je pod neustálým dohledem. Je mnohem běžnější najít chyby v kódu aplikace než ve znovupoužitelných knihovnách kontraktů. Některé knihovny také procházejí [externími audity](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) pro zajištění dodatečné bezpečnosti.

Používání knihoven chytrých kontraktů však s sebou nese riziko zahrnutí kódu, se kterým nejste obeznámeni, do vašeho projektu. Je lákavé importovat kontrakt a zahrnout ho přímo do projektu, ale bez dobrého pochopení toho, co daný kontrakt dělá, můžete do svého systému neúmyslně zanést problém kvůli neočekávanému chování. Vždy si přečtěte dokumentaci kódu, který importujete, a předtím, než ho učiníte součástí svého projektu, zkontrolujte i samotný kód!

Nakonec, při rozhodování, zda knihovnu zahrnout, zvažte její celkové využití. Široce přijímaná knihovna má výhodu větší komunity a více očí, které hledají případné problémy. Bezpečnost by měla být vaším hlavním zaměřením při budování s chytrými kontrakty!

## Související nástroje {#related-tools}

**OpenZeppelin Contracts –** **_Nejpopulárnější knihovna pro bezpečný vývoj chytrých kontraktů._**

- [Dokumentace](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Komunitní fórum](https://forum.openzeppelin.com/c/general/16)

**DappSys –** **_Bezpečné, jednoduché a flexibilní stavební bloky pro chytré kontrakty._**

- [Dokumentace](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 –** **_Projekt v Solidity s kontrakty, knihovnami a příklady, které vám pomohou budovat plně vybavené distribuované aplikace pro reálný svět._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK –** **_Poskytuje nástroje potřebné k efektivnímu budování vlastních chytrých kontraktů._**

- [Dokumentace](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Související tutoriály {#related-tutorials}

- [Bezpečnostní aspekty pro vývojáře na Ethereu](/developers/docs/smart-contracts/security/) _– Tutoriál o bezpečnostních aspektech při budování chytrých kontraktů, včetně použití knihoven._
- [Porozumění chytrému kontraktu pro token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Tutoriál o standardu ERC-20, který poskytuje více knihoven._

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_