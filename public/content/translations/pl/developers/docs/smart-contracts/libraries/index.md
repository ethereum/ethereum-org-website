---
title: Biblioteki inteligentnych kontraktów
description:
lang: pl
---

Nie musisz pisać każdego inteligentnego kontraktu w swoim projekcie od zera. Istnieje wiele bibliotek open source inteligentnych kontraktów. Można w nich znaleźć elementy do utworzenia Twojego projektu, więc nie musisz wymyślać koła od nowa.

## Warunki wstępne {#prerequisites}

Przed przejściem do bibliotek inteligentnych kontraktów warto dobrze poznać strukturę inteligentnego kontraktu. Zapoznaj się z [anatomią inteligentnego kontraktu](/developers/docs/smart-contracts/anatomy/), jeśli jeszcze tego nie zrobiłeś.

## Co jest w bibliotece {#whats-in-a-library}

W bibliotekach inteligentnych kontraktów zwykle można znaleźć dwa rodzaje elementów konstrukcyjnych: zachowania wielokrotnego użytku, które możesz dodać do swoich kontraktów, oraz implementacje różnych standardów.

### Zachowania {#behaviors}

Podczas pisania inteligentnych kontraktów masz sporą szansę, że będziesz w nieskończoność zapisywać podobne wzorce, na przykład przypisywanie adresu _administratora_ w celu wykonania chronionych operacji w kontrakcie lub dodawanie awaryjnego przycisku _pauzy_ na wypadek nieoczekiwanego problemu.

Biblioteki kontraktów inteligentnych zazwyczaj zapewniają wielokrotne implementacje tych zachowań jako [bibliotek](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) lub przez [dziedziczenie](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) w Solidity.

Jako przykład poniżej znajduje się uproszczona wersja [kontraktu `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) z [biblioteki kontraktów OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), która projektuje adres jako właściciela kontraktu oraz udostępnia modyfikator do ograniczania dostępu do metody tylko do tego właściciela.

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

Aby w kontrakcie użyć takiego bloku konstrukcyjnego, musisz go najpierw zaimportować, a następnie rozszerzyć na własny kontrakt. Pozwoli to na użycie modyfikatora dostarczonego przez kontrakt bazowy `Ownable` do zabezpieczenia własnych funkcji.

```solidity
import ".../Ownable.sol"; // ścieżka do zaimportowanego kontraktu

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Innym popularnym przykładem jest [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) lub [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Są to biblioteki (w przeciwieństwie do kontraktów podstawowych), które zapewniają niedostarczane przez język funkcje arytmetyczne z kontrolą przepełnienia. Dobrą praktyką jest używanie którejkolwiek z tych bibliotek zamiast rodzimych operacji arytmetycznych w celu ochrony kontraktu przed przepełnieniami, co może mieć katastrofalne skutki!

### Standardy {#standards}

Aby ułatwić [komponowalność i interoperacyjność](/developers/docs/smart-contracts/composability/), społeczność Ethereum zdefiniowała kilka standardów w postaci **ERC **. Więcej o nich można przeczytać w sekcji [standardy](/developers/docs/standards/).

W przypadku uwzględniania ERC w swoich kontraktach lepiej poszukać implementacji standardu niż próbować wdrożyć własną. Wiele bibliotek kontraktów inteligentnych zawiera implementacje dla najpopularniejszych ERC. Na przykład wszechobecny [standard tokenów wymiennych ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) można znaleźć w [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) i [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Ponadto niektóre ERC zapewniają również implementacje kanoniczne w ramach samego ERC.

Warto wspomnieć, że niektóre ERC nie są samodzielne, ale stanowią uzupełnienie innych ERC. Na przykład [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) dodaje rozszerzenie do ERC20 w celu poprawy jego użyteczności.

## Jak dodać bibliotekę {#how-to}

Zawsze zapoznaj się z dokumentacją dołączanej biblioteki, aby uzyskać szczegółowe instrukcje, jak uwzględnić ją w swoim projekcie. Kilka bibliotek kontraktów Solidity jest spakowanych za pomocą aplikacji `npm`, więce można po prostu użyć polecenia `npm install`. Większość narzędzi do [kompilowania](/developers/docs/smart-contracts/compiling/) kontraktów będzie szukać bibliotek kontraktów inteligentnych w Twoich `node_modules`, więc możesz wykonać następujące czynności:

```solidity
// to spowoduje wczytanie biblioteki @openzeppelin/contracts library z node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Niezależnie od używanej metody, dołączając bibliotekę, zawsze uważaj na wersję [językową](/developers/docs/smart-contracts/languages/). Na przykład, nie możesz użyć biblioteki dla Solidity 0.6, jeśli piszesz swoje kontrakty w Solidity 0.5.

## Kiedy użyć {#when-to-use}

Korzystanie z biblioteki inteligentnych kontraktów w projekcie ma kilka zalet. Przede wszystkim oszczędza czas, dostarczając gotowe do użycia bloki konstrukcyjne, które możesz dołączyć do swojego systemu, zamiast samodzielnie je kodować.

Dużym plusem jest także bezpieczeństwo. Biblioteki inteligentnych kontraktów typu open source są również często poddawane szczegółowej analizie. Biorąc pod uwagę, że wiele projektów od nich zależy, społeczność ma silną motywację do ciągłego ich sprawdzania. Znacznie częściej można znaleźć błędy w kodzie aplikacji niż w bibliotekach kontraktów wielokrotnego użytku. Niektóre biblioteki przechodzą również [kontrole zewnętrzne](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audit) w celu dodatkowego zabezpieczenia.

Jednak korzystanie z bibliotek inteligentnych kontraktów niesie ze sobą ryzyko włączenia do projektu kodu, którego nie znasz. Zaimportowanie kontraktu i włączenie go bezpośrednio do projektu jest kuszące, ale bez dobrego zrozumienia tego, co robi ten kontrakt, możesz nieumyślnie wprowadzić problem do swojego systemu z powodu nieoczekiwanego zachowania. Zawsze upewnij się, że przeczytałeś dokumentację importowanego kodu, a następnie przejrzyj sam kod przed włączeniem go do swojego projektu!

Na koniec, podejmując decyzję o włączeniu biblioteki, weź pod uwagę jej ogólne wykorzystanie. Biblioteka przyjęta powszechnie ma zalety wynikające z większej społeczności i większej liczby osób wyszukujących w niej problemy. Bezpieczeństwo powinno być Twoim głównym celem podczas tworzenia za pomocą inteligentnych kontraktów!

## Powiązane narzędzia {#related-tools}

**Kontrakty OpenZeppelin —** **_najpopularniejsza biblioteka do bezpiecznego tworzenia inteligentnych kontraktów._ **

- [Dokumentacja](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum społeczności](https://forum.openzeppelin.com/c/general/16)

**DappSys —** **_bezpieczne, proste, elastyczne elementy konstrukcyjne do inteligentnych kontraktów._**

- [Dokumentacja](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 —** **_projekt Solidity z kontraktami, bibliotekami i przykładami, które pomogą Ci stworzyć w pełni wyposażone aplikacje zdecentralizowane dla świata rzeczywistego._**

- [GitHub](https://github.com/HQ20/contracts)

## Powiązane samouczki {#related-tutorials}

- [Zagadnienia bezpieczeństwa dla programistów Ethereum](/developers/docs/smart-contracts/security/) _– samouczek na temat zagadnień bezpieczeństwa podczas tworzenia inteligentnych kontraktów, z uwzględnieniem korzystania z bibliotek._
- [Informacje o kontraktach inteligentnych tokena ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _— samouczek dotyczący standardu ERC20 oferowanego przez wiele bibliotek._

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_
