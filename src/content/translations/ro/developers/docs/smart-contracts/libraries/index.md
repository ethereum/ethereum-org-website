---
title: Biblioteci de contracte inteligente
description:
lang: ro
sidebar: true
---

Nu este nevoie să scrii de la zero fiecare contract inteligent din proiect. Există multe biblioteci de contracte inteligente open source disponibile care oferă elemente de construcție reutilizabile pentru proiectul tău, care te pot scuti de nevoia de a reinventa roata.

## Condiții prealabile {#prerequisites}

Înainte de a folosi bibliotecile cu contracte inteligente, este o idee bună să ai o înțelegere bună a structurii unui contract inteligent. Treci prin [anatomia contractelor inteligente](/developers/docs/smart-contracts/anatomy/), dacă nu ai făcut-o deja.

## Ce conține o bibliotecă {#whats-in-a-library}

De obicei, poți găsi două tipuri de elemente de bază în bibliotecile de contracte inteligente: comportamente reutilizabile pe care le poți adăuga la contractele tale și implementări de diferite standarde.

### Comportamente {#behaviors}

Atunci când scrii contracte inteligente, există șanse mari să te regăsești scriind modele similare de mai multe ori, cum ar fi atribuirea unei adrese de _administrator_ pentru a efectua operațiuni protejate într-un contract sau adăugarea unui buton de _pauză_ de urgență în cazul unei probleme neașteptate.

Bibliotecile de contracte inteligente oferă de obicei implementări reutilizabile ale acestor comportamente sub formă de [biblioteci](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) sau prin [moștenire](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) în Solidity.

Ca un exemplu, în continuare este prezentată o versiune simplificată a contractului [`Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) din [biblioteca de contracte OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), care creează o adresă „address” ca proprietar al unui contract și oferă un modificator pentru restricționarea accesului la o metodă, numai proprietarului respectiv.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: apelantul nu este proprietarul");
        _;
    }
}
```

Pentru a utiliza un bloc de construcție ca acesta în contractul tău, ar trebui mai întâi să îl imporți, apoi să îl extinzi în propriile contracte. Acest lucru îți va permite să utilizezi modificatorul furnizat de contractul de bază `Ownable` pentru a-ți asigura propriile funcții.

```solidity
import ".../Ownable.sol"; // Calea către biblioteca importată

contract MyContract is Ownable {
    // Următoarea funcție poate fi apelată numai de către proprietar
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Un alt exemplu popular este [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) sau [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Acestea sunt biblioteci (spre deosebire de contractele de bază), care oferă funcții aritmetice cu verificări de depășire de număr întreg, care nu sunt furnizate de limbaj. Este o practică bună să utilizezi oricare dintre aceste biblioteci în loc de operații aritmetice native pentru a-ți proteja contractul împotriva valorilor numerice peste maximul permis, care pot avea consecințe dezastruoase!

### Standarde {#standards}

Pentru a facilita [combinabilitatea și interoperabilitatea](/developers/docs/smart-contracts/composability/), comunitatea Ethereum a definit mai multe standarde sub formă de **ERC**-uri. Poți citi mai multe despre acestea în secțiunea [standarde](/developers/docs/standards/).

Atunci când incluzi un ERC ca parte a contractelor tale, este bine să cauți implementări standard, mai degrabă decât să încerci să le lansezi pe cele proprii. Multe biblioteci de contracte inteligente includ implementări pentru cele mai populare ERC-uri. De exemplu, [tokenul fungibil standard ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) omniprezent poate fi găsit în [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) și [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). În plus, unele ERC-uri oferă, de asemenea, implementări canonice ca parte a ERC-ului însuși.

Merită menționat faptul că unele ERC-uri nu sunt independente, ci sunt completări la alte ERC-uri. De exemplu, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) adaugă o extensie la ERC20 pentru a-i îmbunătății posibilitate de întrebuințare.

## Cum se adaugă o bibliotecă {#how-to}

Consultă întotdeauna documentația bibliotecii pe care o incluzi pentru instrucțiuni specifice despre cum să o introduci în proiectul tău. Mai multe biblioteci de contracte Solidity sunt ambalate folosind `npm`, astfel încât să le poți instala numai cu comanda`npm install`. Majoritatea instrumentelor pentru [compilarea](/developers/docs/smart-contracts/compiling/) contractelor vor căuta în `node_modules` pentru bibliotecile de contracte inteligente, astfel încât să poți face următoarele:

```solidity
// Aceasta va încărca @openzeppelin/contracts library din node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Indiferent de metoda pe care o utilizezi, atunci când incluzi o bibliotecă, urmărește întotdeauna versiunea [limbajului](/developers/docs/smart-contracts/languages/). De exemplu, nu poți utiliza o bibliotecă pentru Solidity 0.6 dacă scrii contractele în Solidity 0.5.

## Când se folosește {#when-to-use}

Utilizarea unei biblioteci de contracte inteligente pentru proiectul tău are mai multe avantaje. În primul rând, îți economisește timpul oferindu-ți elemente de construcție gata de utilizat pe care le poți include în sistem, mai degrabă decât să le codifici singur.

Securitatea este, de asemenea, un avantaj major. Bibliotecile de contracte inteligente open source sunt, de asemenea, adesea examinate intens. Având în vedere că multe proiecte depind de ele, există un stimulent puternic din partea comunității de a le ține sub revizuire constantă. Este mult mai comun să găsești erori în codul aplicației decât în ​​bibliotecile de contracte reutilizabile. Unele biblioteci sunt supuse, de asemenea, la [audituri externe](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audit) pentru securitate suplimentară.

Totuși, folosirea bibliotecilor de contracte inteligente prezintă riscul includerii de coduri cu care nu ești familiarizat în proiect. Este tentant să imporți un contract și să-l incluzi direct în proiectul tău, dar fără o bună înțelegere a acțiunii acelui contract, este posibil să introduci din greșeală o problemă în sistem, din cauza unui comportament neașteptat. Asigură-te întotdeauna că citești documentația codului pe care îl imporți, apoi revizuiește codul însuși înainte de a-l face parte din proiectul tău!

În cele din urmă, atunci când decizi să incluzi o bibliotecă, ia în considerare utilizarea sa generală. O bibliotecă adoptată pe scară largă are avantajele de a avea o comunitate mai mare și mai mulți ochi care caută probleme. Securitatea ar trebui să fie preocuparea ta principală atunci când construiești aplicații cu contracte inteligente!

## Instrumente corelate {#related-tools}

**Contractele OpenZeppelin -** **_Cea mai populară bibliotecă pentru dezvoltarea de contracte inteligente sigure._**

- [Documentație](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forumul comunității](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocuri de construcții sigure, simple, flexibile pentru contracte inteligente._**

- [Documentație](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Un proiect Solidity cu contracte, biblioteci și exemple pentru a te ajuta să construiți aplicații distribuite complet-funcționale pentru lumea reală._**

- [GitHub](https://github.com/HQ20/contracts)

## Tutoriale corelate {#related-tutorials}

- [Considerații de securitate pentru programatorii Ethereum](/developers/docs/smart-contracts/security/) _– Un tutorial privind considerațiile de securitate atunci când construiești contracte inteligente, inclusiv utilizarea de biblioteci._
- [Înțelege contractul inteligent token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Tutorial privind standardul ERC20, oferit de mai multe biblioteci._

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_
