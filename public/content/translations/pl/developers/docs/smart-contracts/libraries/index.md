---
title: Biblioteki inteligentnych kontraktów
description: Odkryj biblioteki inteligentnych kontraktów i bloki konstrukcyjne wielokrotnego użytku, aby przyspieszyć swoje projekty programistyczne na Ethereum.
lang: pl
---

Nie musisz pisać każdego inteligentnego kontraktu w swoim projekcie od zera. Dostępnych jest wiele bibliotek inteligentnych kontraktów typu open source, które zapewniają bloki konstrukcyjne wielokrotnego użytku dla Twojego projektu, co pozwala uniknąć wymyślania koła na nowo.

## Wymagania wstępne {#prerequisites}

Zanim przejdziesz do bibliotek inteligentnych kontraktów, warto dobrze zrozumieć strukturę inteligentnego kontraktu. Przejdź do sekcji [anatomia inteligentnego kontraktu](/developers/docs/smart-contracts/anatomy/), jeśli jeszcze tego nie zrobiłeś.

## Co znajduje się w bibliotece {#whats-in-a-library}

W bibliotekach inteligentnych kontraktów zazwyczaj można znaleźć dwa rodzaje bloków konstrukcyjnych: zachowania wielokrotnego użytku, które można dodać do swoich kontraktów, oraz implementacje różnych standardów.

### Zachowania {#behaviors}

Podczas pisania inteligentnych kontraktów istnieje duża szansa, że będziesz wielokrotnie pisać podobne wzorce, takie jak przypisywanie adresu _admin_ do wykonywania chronionych operacji w kontrakcie lub dodawanie przycisku awaryjnej _pauzy_ w przypadku nieoczekiwanego problemu.

Biblioteki inteligentnych kontraktów zazwyczaj dostarczają implementacje tych zachowań wielokrotnego użytku jako [biblioteki](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) lub poprzez [dziedziczenie](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) w języku Solidity.

Jako przykład, poniżej znajduje się uproszczona wersja [kontraktu `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) z [biblioteki OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts), która wyznacza adres jako właściciela kontraktu i zapewnia modyfikator ograniczający dostęp do metody tylko dla tego właściciela.

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

Aby użyć takiego bloku konstrukcyjnego w swoim kontrakcie, musisz go najpierw zaimportować, a następnie rozszerzyć go w swoich własnych kontraktach. Pozwoli to na użycie modyfikatora dostarczonego przez bazowy kontrakt `Ownable` do zabezpieczenia własnych funkcji.

```solidity
import ".../Ownable.sol"; // Ścieżka do zaimportowanej biblioteki

contract MyContract is Ownable {
    // Poniższa funkcja może być wywołana tylko przez właściciela
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Innym popularnym przykładem jest [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) lub [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Są to biblioteki (w przeciwieństwie do kontraktów bazowych), które dostarczają funkcje arytmetyczne ze sprawdzaniem przepełnienia, czego nie zapewnia sam język. Dobrą praktyką jest używanie jednej z tych bibliotek zamiast natywnych operacji arytmetycznych, aby chronić swój kontrakt przed przepełnieniem, które może mieć katastrofalne skutki!

### Standardy {#standards}

Aby ułatwić [kompozycyjność i interoperacyjność](/developers/docs/smart-contracts/composability/), społeczność Ethereum zdefiniowała kilka standardów w postaci **ERC**. Możesz przeczytać o nich więcej w sekcji [standardy](/developers/docs/standards/).

Włączając ERC jako część swoich kontraktów, warto poszukać standardowych implementacji, zamiast próbować tworzyć własne. Wiele bibliotek inteligentnych kontraktów zawiera implementacje najpopularniejszych standardów ERC. Na przykład wszechobecny [standard tokena zamiennego ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) można znaleźć w [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) i [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Dodatkowo, niektóre ERC dostarczają również kanoniczne implementacje jako część samego ERC.

Warto wspomnieć, że niektóre ERC nie są samodzielne, ale stanowią dodatki do innych ERC. Na przykład [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) dodaje rozszerzenie do ERC-20 w celu poprawy jego użyteczności.

## Jak dodać bibliotekę {#how-to}

Zawsze odwołuj się do dokumentacji dołączanej biblioteki, aby uzyskać szczegółowe instrukcje dotyczące sposobu włączenia jej do projektu. Kilka bibliotek kontraktów Solidity jest pakowanych przy użyciu `npm`, więc możesz po prostu użyć na nich `npm install`. Większość narzędzi do [kompilacji](/developers/docs/smart-contracts/compiling/) kontraktów będzie szukać bibliotek inteligentnych kontraktów w Twoim `node_modules`, więc możesz wykonać następujące czynności:

```solidity
// Spowoduje to załadowanie biblioteki @openzeppelin/contracts z twojego node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Niezależnie od używanej metody, dołączając bibliotekę, zawsze zwracaj uwagę na wersję [języka](/developers/docs/smart-contracts/languages/). Na przykład nie możesz użyć biblioteki dla Solidity 0.6, jeśli piszesz swoje kontrakty w Solidity 0.5.

## Kiedy używać {#when-to-use}

Używanie biblioteki inteligentnych kontraktów w Twoim projekcie ma kilka zalet. Przede wszystkim oszczędza czas, dostarczając gotowe do użycia bloki konstrukcyjne, które możesz włączyć do swojego systemu, zamiast musieć kodować je samodzielnie.

Bezpieczeństwo to również duży plus. Biblioteki inteligentnych kontraktów typu open source są często poddawane szczegółowej analizie. Biorąc pod uwagę, że wiele projektów od nich zależy, społeczność ma silną motywację, aby poddawać je ciągłemu przeglądowi. Znacznie częściej można znaleźć błędy w kodzie aplikacji niż w bibliotekach kontraktów wielokrotnego użytku. Niektóre biblioteki przechodzą również [zewnętrzne audyty](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) w celu zapewnienia dodatkowego bezpieczeństwa.

Jednak korzystanie z bibliotek inteligentnych kontraktów niesie ze sobą ryzyko włączenia do projektu kodu, z którym nie jesteś zaznajomiony. Kuszące jest zaimportowanie kontraktu i włączenie go bezpośrednio do projektu, ale bez dobrego zrozumienia, co ten kontrakt robi, możesz nieumyślnie wprowadzić problem do swojego systemu z powodu nieoczekiwanego zachowania. Zawsze upewnij się, że przeczytałeś dokumentację importowanego kodu, a następnie przejrzyj sam kod, zanim uczynisz go częścią swojego projektu!

Na koniec, decydując się na włączenie biblioteki, weź pod uwagę jej ogólne wykorzystanie. Szeroko przyjęta biblioteka ma tę zaletę, że posiada większą społeczność i więcej osób szukających w niej problemów. Bezpieczeństwo powinno być Twoim głównym celem podczas budowania z użyciem inteligentnych kontraktów!

## Powiązane narzędzia {#related-tools}

**OpenZeppelin Contracts -** **_Najpopularniejsza biblioteka do bezpiecznego tworzenia inteligentnych kontraktów._**

- [Dokumentacja](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum społeczności](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Bezpieczne, proste i elastyczne bloki konstrukcyjne dla inteligentnych kontraktów._**

- [Dokumentacja](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Projekt w języku Solidity zawierający kontrakty, biblioteki i przykłady, które pomogą Ci budować w pełni funkcjonalne aplikacje rozproszone dla prawdziwego świata._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Zapewnia narzędzia potrzebne do wydajnego budowania niestandardowych inteligentnych kontraktów_**

- [Dokumentacja](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Powiązane samouczki {#related-tutorials}

- [Kwestie bezpieczeństwa dla programistów Ethereum](/developers/docs/smart-contracts/security/) _– Samouczek dotyczący kwestii bezpieczeństwa podczas budowania inteligentnych kontraktów, w tym korzystania z bibliotek._
- [Zrozumienie inteligentnego kontraktu tokena ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Samouczek dotyczący standardu ERC-20, dostarczanego przez wiele bibliotek._

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_