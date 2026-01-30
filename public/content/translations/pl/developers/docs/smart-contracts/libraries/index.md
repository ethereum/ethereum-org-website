---
title: Biblioteki inteligentnych kontraktów
description: Odkryj biblioteki wielokrotnego użytku do inteligentnych kontraktów i części składowe, aby przyspieszyć programowanie Twoich projektów Ethereum.
lang: pl
---

Nie musisz pisać każdego inteligentnego kontraktu w swoim projekcie od zera. Istnieje wiele bibliotek open source inteligentnych kontraktów. Można w nich znaleźć elementy do utworzenia Twojego projektu, więc nie musisz wymyślać koła od nowa.

## Wymagania wstępne {#prerequisites}

Przed przejściem do bibliotek inteligentnych kontraktów warto dobrze poznać strukturę inteligentnego kontraktu. Przejdź do [anatomii inteligentnych kontraktów](/developers/docs/smart-contracts/anatomy/), jeśli jeszcze tego nie zrobiłeś.

## Co zawiera biblioteka {#whats-in-a-library}

W bibliotekach inteligentnych kontraktów zwykle można znaleźć dwa rodzaje elementów konstrukcyjnych: zachowania wielokrotnego użytku, które można dodać do swoich kontraktów, oraz implementacje różnych standardów.

### Zachowania {#behaviors}

Pisząc inteligentne kontrakty, jest duża szansa, że będziesz wielokrotnie pisać podobne wzorce, takie jak przypisywanie adresu _administratora_ do wykonywania chronionych operacji w kontrakcie lub dodawanie przycisku awaryjnej _pauzy_ na wypadek nieoczekiwanego problemu.

Biblioteki inteligentnych kontraktów zwykle zapewniają implementacje tych zachowań wielokrotnego użytku jako [biblioteki](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) lub poprzez [dziedziczenie](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) w Solidity.

Jako przykład poniżej przedstawiono uproszczoną wersję [`kontraktu Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) z [biblioteki kontraktów OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), który wyznacza adres jako właściciela kontraktu i udostępnia modyfikator ograniczający dostęp do metody tylko temu właścicielowi.

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

Aby w kontrakcie użyć takiego bloku konstrukcyjnego, musisz go najpierw zaimportować, a następnie rozszerzyć na własny kontrakt. Pozwoli to na użycie modyfikatora dostarczonego przez bazowy kontrakt `Ownable` w celu zabezpieczenia własnych funkcji.

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

Aby ułatwić [komponowalność i interoperacyjność](/developers/docs/smart-contracts/composability/), społeczność Ethereum zdefiniowała kilka standardów w postaci **ERC**. Więcej na ich temat można przeczytać w sekcji [standardy](/developers/docs/standards/).

W przypadku uwzględniania ERC w swoich kontraktach lepiej poszukać implementacji standardu niż próbować wdrożyć własną. Wiele bibliotek kontraktów inteligentnych zawiera implementacje dla najpopularniejszych ERC. Na przykład wszechobecny [standard wymiennych tokenów ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) można znaleźć w [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token) i [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Ponadto niektóre ERC zapewniają również implementacje kanoniczne w ramach samego ERC.

Warto wspomnieć, że niektóre ERC nie są samodzielne, ale stanowią uzupełnienie innych ERC. Na przykład [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) dodaje rozszerzenie do ERC20 w celu poprawy jego użyteczności.

## Jak dodać bibliotekę {#how-to}

Zawsze zapoznaj się z dokumentacją dołączanej biblioteki, aby uzyskać szczegółowe instrukcje, jak uwzględnić ją w swoim projekcie. Wiele bibliotek kontraktów Solidity jest spakowanych przy użyciu `npm`, więc można je po prostu zainstalować za pomocą `npm install`. Większość narzędzi do [kompilowania](/developers/docs/smart-contracts/compiling/) kontraktów będzie szukać bibliotek inteligentnych kontraktów w `node_modules`, więc możesz wykonać następujące czynności:

```solidity
// to spowoduje wczytanie biblioteki @openzeppelin/contracts library z node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Niezależnie od używanej metody, dołączając bibliotekę, zawsze zwracaj uwagę na wersję [języka](/developers/docs/smart-contracts/languages/). Na przykład, nie możesz użyć biblioteki dla Solidity 0.6, jeśli piszesz swoje kontrakty w Solidity 0.5.

## Kiedy używać {#when-to-use}

Korzystanie z biblioteki inteligentnych kontraktów w projekcie ma kilka zalet. Przede wszystkim oszczędza czas, dostarczając gotowe do użycia bloki konstrukcyjne, które możesz dołączyć do swojego systemu, zamiast samodzielnie je kodować.

Dużym plusem jest także bezpieczeństwo. Biblioteki inteligentnych kontraktów typu open source są również często poddawane szczegółowej analizie. Biorąc pod uwagę, że wiele projektów od nich zależy, społeczność ma silną motywację do ciągłego ich sprawdzania. Znacznie częściej można znaleźć błędy w kodzie aplikacji niż w bibliotekach kontraktów wielokrotnego użytku. Niektóre biblioteki przechodzą również [zewnętrzne audyty](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) w celu zapewnienia dodatkowego bezpieczeństwa.

Jednak korzystanie z bibliotek inteligentnych kontraktów niesie ze sobą ryzyko włączenia do projektu kodu, którego nie znasz. Zaimportowanie kontraktu i włączenie go bezpośrednio do projektu jest kuszące, ale bez dobrego zrozumienia tego, co robi ten kontrakt, możesz nieumyślnie wprowadzić problem do swojego systemu z powodu nieoczekiwanego zachowania. Zawsze upewnij się, że przeczytałeś dokumentację importowanego kodu, a następnie przejrzyj sam kod przed włączeniem go do swojego projektu!

Na koniec, podejmując decyzję o włączeniu biblioteki, weź pod uwagę jej ogólne wykorzystanie. Biblioteka przyjęta powszechnie ma zalety wynikające z większej społeczności i większej liczby osób wyszukujących w niej problemy. Bezpieczeństwo powinno być Twoim głównym celem podczas tworzenia za pomocą inteligentnych kontraktów!

## Powiązane narzędzia {#related-tools}

**OpenZeppelin Contracts –** **_najpopularniejsza biblioteka do bezpiecznego tworzenia inteligentnych kontraktów._**

- [Dokumentacja](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum społeczności](https://forum.openzeppelin.com/c/general/16)

**DappSys –** **_bezpieczne, proste i elastyczne elementy konstrukcyjne dla inteligentnych kontraktów._**

- [Dokumentacja](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 –** **_projekt Solidity z kontraktami, bibliotekami i przykładami, które pomogą Ci zbudować w pełni funkcjonalne, zdecentralizowane aplikacje dla realnego świata._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK –** **_zapewnia narzędzia potrzebne do wydajnego tworzenia niestandardowych inteligentnych kontraktów_**

- [Dokumentacja](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Powiązane samouczki {#related-tutorials}

- [Zagadnienia bezpieczeństwa dla deweloperów Ethereum](/developers/docs/smart-contracts/security/) _– samouczek na temat zagadnień bezpieczeństwa podczas tworzenia inteligentnych kontraktów, z uwzględnieniem korzystania z bibliotek._
- [Zrozumienie inteligentnego kontraktu tokena ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– samouczek na temat standardu ERC20, udostępniany przez wiele bibliotek._

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
