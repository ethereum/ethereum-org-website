---
title: "Knihovny smart kontraktů"
description: "Objevte znovupoužitelné knihovny chytrých kontraktů a stavební bloky, které urychlí vaše vývojové projekty na Ethereu."
lang: cs
---

Ve svém projektu nemusíte psát každý smart kontrakt od nuly. Existuje mnoho open-source knihoven smart kontraktů, které poskytují znovupoužitelné stavební bloky pro váš projekt, což vám může ušetřit čas a práci s vymýšlením již existujících řešení.

## Předpoklady {#prerequisites}

Než se ponoříte do knihoven smart kontraktů, je dobré mít pevné základy ve struktuře smart kontraktů. Pokud jste tak ještě neučinili, přejděte na [anatomii chytrých kontraktů](/developers/docs/smart-contracts/anatomy/).

## Co je obsahem knihovny {#whats-in-a-library}

V knihovnách smart kontraktů obvykle najdete dva druhy stavebních bloků: znovupoužitelné akce, které můžete přidat ke svým kontraktům, a implementace různých standardů.

### Chování {#behaviors}

Při psaní chytrých kontraktů se vám může stát, že budete opakovaně psát podobné vzory, jako je přiřazení _admin_ adresy pro provádění chráněných operací v kontraktu nebo přidání tlačítka pro nouzové _pozastavení_ v případě neočekávaného problému.

Knihovny chytrých kontraktů obvykle poskytují znovupoužitelné implementace tohoto chování jako [knihovny](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) nebo prostřednictvím [dědičnosti](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) v Solidity.

Jako příklad následuje zjednodušená verze [`Ownable` kontraktu](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) z [knihovny OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts), která určí adresu jako vlastníka kontraktu a poskytne modifikátor pro omezení přístupu k metodě pouze tomuto vlastníkovi.

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

Abyste mohli ve svém smart kontraktu použít takovýto stavební blok, musíte jej nejprve importovat a následně jej ve svých vlastních kontraktech rozšířit (dědit z něj). To vám umožní použít modifikátor poskytnutý základním kontraktem `Ownable` k zabezpečení vašich vlastních funkcí.

```solidity
import ".../Ownable.sol"; // Cesta k importované knihovně

contract MyContract is Ownable {
    // Následující funkci může volat pouze vlastník
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Dalším populárním příkladem je [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) nebo [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Jedná se o knihovny (na rozdíl od základních kontraktů), které poskytují aritmetické funkce s kontrolami přetečení, což jazyk samotný nenabízí. Je dobrým zvykem používat některou z těchto knihoven místo nativních aritmetických operací, aby byl váš smart kontrakt chráněn před přetečeními, která mohou mít katastrofální následky!

### Standardy {#standards}

Aby se usnadnila [skladatelnost a interoperabilita](/developers/docs/smart-contracts/composability/), komunita Etherea definovala několik standardů ve formě **ERC**. Více si o nich můžete přečíst v sekci [standardy](/developers/docs/standards/).

Pokud zahrnete ERC do svých smart kontraktů, je dobré hledat standardní implementace místo toho, abyste se snažili vytvořit vlastní. Spousta knihoven smart kontraktů zahrnuje implementace pro nejpopulárnější ERC. Například všudypřítomný [standard zaměnitelných tokenů ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) lze nalézt v [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token) a [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Navíc některé ERC poskytují kanonické implementace jako součást samotného standardu.

Stojí za zmínku, že některé ERC nejsou samostatné, ale jsou rozšířením jiných ERC. Například [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) přidává rozšíření k ERC20 pro zlepšení jeho použitelnosti.

## Jak přidat knihovnu {#how-to}

Vždy se řiďte dokumentací knihovny, kterou přidáváte, kde najdete konkrétní instrukce, jak ji zahrnout do svého projektu. Řada knihoven pro chytré kontrakty v Solidity je zabalena pomocí `npm`, takže je můžete jednoduše nainstalovat pomocí příkazu `npm install`. Většina nástrojů pro [kompilaci](/developers/docs/smart-contracts/compiling/) kontraktů prohledá vaši složku `node_modules`, aby našla knihovny chytrých kontraktů, takže můžete postupovat následovně:

```solidity
// Tímto se načte knihovna @openzeppelin/contracts z vaší složky node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Bez ohledu na to, jakou metodu používáte, při zahrnutí knihovny vždy sledujte verzi [jazyka](/developers/docs/smart-contracts/languages/). Například nemůžete použít knihovnu pro Solidity 0.6, pokud píšete své smart kontrakty v Solidity 0.5.

## Kdy použít {#when-to-use}

Použití knihovny smart kontraktů přináší vašemu projektu několik výhod. Především vám ušetří čas tím, že poskytne hotové stavební bloky, které můžete zahrnout do svého systému, místo abyste je museli programovat sami.

Bezpečnost je také velkým přínosem. Open source knihovny smart kontraktů jsou často podrobeny přísné kontrole. Vzhledem k tomu, že na nich závisí mnoho projektů, je komunita silně motivována je neustále kontrolovat. Mnohem častěji lze najít chyby v aplikačním kódu než v knihovnách pro znovupoužitelné smart kontrakty. Některé knihovny také procházejí [externími audity](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) pro zvýšení bezpečnosti.

Nicméně používání knihoven smart kontraktů nese riziko, že do vašeho projektu zahrnete kód, se kterým nejste obeznámeni. Je lákavé importovat kontrakt a přímo jej zahrnout do vašeho projektu, ale bez perfektního porozumění tomu, co tento kontrakt dělá, můžete neúmyslně do systému zavést neočekávané chování a tím si zadělat na problémy. Vždy si předtím, než kód zahrnete do svého projektu, přečtěte jeho dokumentaci a poté si kód sami prohlédněte!

Nakonec při rozhodování, zda zahrnout knihovnu, zvažte její celkové použití. Široce adoptovaná knihovna má výhodu větší komunity, což znamená více lidí, kteří do ní nahlížejí a hledají problémy. Bezpečnost by měla být při vytváření smart kontraktů vaší hlavní prioritou!

## Související nástroje {#related-tools}

**OpenZeppelin Contracts -** **_Nejoblíbenější knihovna pro bezpečný vývoj chytrých kontraktů._**

- [Dokumentace](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Komunitní fórum](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Bezpečné, jednoduché a flexibilní stavební bloky pro chytré kontrakty._**

- [Dokumentace](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Projekt v Solidity s kontrakty, knihovnami a příklady, které vám pomohou vytvořit plně funkční distribuované aplikace pro reálný svět._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Poskytuje nástroje potřebné pro efektivní vytváření vlastních chytrých kontraktů_**

- [Dokumentace](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Související návody {#related-tutorials}

- [Bezpečnostní aspekty pro vývojáře na Ethereu](/developers/docs/smart-contracts/security/) _– Tutoriál o bezpečnostních aspektech při vytváření chytrých kontraktů, včetně použití knihoven._
- [Pochopení chytrého kontraktu tokenu ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Tutoriál o standardu ERC20, poskytovaný několika knihovnami._

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
