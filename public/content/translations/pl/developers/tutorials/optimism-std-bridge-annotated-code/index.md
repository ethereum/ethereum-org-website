---
title: "Przegląd standardowego kontraktu mostu Optimism"
description: "Jak działa standardowy most dla Optimism? Dlaczego działa w ten sposób?"
author: Ori Pomerantz
tags: [ "solidity", "most", "warstwa 2" ]
skill: intermediate
published: 2022-03-30
lang: pl
---

[Optimism](https://www.optimism.io/) to [rollup optymistyczny](/developers/docs/scaling/optimistic-rollups/).
Rollupy optymistyczne mogą przetwarzać transakcje po znacznie niższej cenie niż sieć główna Ethereum (znana również jako warstwa 1 lub L1), ponieważ transakcje są przetwarzane tylko przez kilka węzłów, a nie przez każdy węzeł w sieci.
Jednocześnie wszystkie dane są zapisywane w L1, dzięki czemu wszystko można udowodnić i zrekonstruować z zachowaniem wszystkich gwarancji integralności i dostępności sieci głównej.

Aby używać aktywów L1 na Optimism (lub dowolnej innej L2), aktywa te muszą być [przeniesione przez most](/bridges/#prerequisites).
Jednym ze sposobów na osiągnięcie tego jest zablokowanie przez użytkowników aktywów (najczęściej są to tokeny ETH i [ERC-20](/developers/docs/standards/tokens/erc-20/)) na L1 i otrzymanie równoważnych aktywów do wykorzystania na L2.
Ostatecznie ten, kto je zdobędzie, może chcieć przenieść je z powrotem na L1 za pomocą mostu.
W takim przypadku aktywa są spalane na L2, a następnie uwalniane z powrotem do użytkownika na L1.

W ten sposób działa [standardowy most Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
W tym artykule przeanalizujemy kod źródłowy tego mostu, aby zobaczyć, jak on działa i zbadać go jako przykład dobrze napisanego kodu Solidity.

## Przepływy sterowania {#control-flows}

Most ma dwa główne przepływy:

- Depozyt (z L1 do L2)
- Wypłata (z L2 do L1)

### Przepływ depozytu {#deposit-flow}

#### Warstwa 1 {#deposit-flow-layer-1}

1. W przypadku deponowania ERC-20 deponent udziela mostowi zgody na wydanie zdeponowanej kwoty
2. Deponent wywołuje most L1 (`depositERC20`, `depositERC20To`, `depositETH` lub `depositETHTo`)
3. Most L1 przejmuje w posiadanie przeniesione aktywa
   - ETH: Aktywa są przekazywane przez deponenta w ramach wywołania
   - ERC-20: Aktywa są przenoszone przez most na siebie, korzystając ze zgody udzielonej przez deponenta
4. Most L1 używa mechanizmu wiadomości między domenami do wywołania funkcji `finalizeDeposit` na moście L2

#### Warstwa 2 {#deposit-flow-layer-2}

5. Most L2 weryfikuje, czy wywołanie funkcji `finalizeDeposit` jest prawidłowe:
   - Pochodzi z kontraktu wiadomości między domenami
   - Pochodził pierwotnie z mostu na L1
6. Most L2 sprawdza, czy kontrakt tokenu ERC-20 na L2 jest prawidłowy:
   - Kontrakt L2 informuje, że jego odpowiednik L1 jest taki sam jak ten, z którego pochodzą tokeny na L1
   - Kontrakt L2 informuje, że obsługuje prawidłowy interfejs ([używając ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Jeśli kontrakt L2 jest prawidłowy, wywołaj go, aby wyemitować odpowiednią liczbę tokenów na odpowiedni adres. Jeśli nie, rozpocznij proces wypłaty, aby umożliwić użytkownikowi odebranie tokenów na L1.

### Przepływ wypłat {#withdrawal-flow}

#### Warstwa 2 {#withdrawal-flow-layer-2}

1. Wypłacający wywołuje most L2 (`withdraw` lub `withdrawTo`)
2. Most L2 spala odpowiednią liczbę tokenów należących do `msg.sender`
3. Most L2 używa mechanizmu wiadomości między domenami do wywołania funkcji `finalizeETHWithdrawal` lub `finalizeERC20Withdrawal` na moście L1

#### Warstwa 1 {#withdrawal-flow-layer-1}

4. Most L1 weryfikuje, czy wywołanie funkcji `finalizeETHWithdrawal` lub `finalizeERC20Withdrawal` jest prawidłowe:
   - Pochodzi z mechanizmu wiadomości między domenami
   - Pochodził pierwotnie z mostu na L2
5. Most L1 przekazuje odpowiednie aktywa (ETH lub ERC-20) na odpowiedni adres

## Kod warstwy 1 {#layer-1-code}

To jest kod, który działa na L1, w sieci głównej Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Ten interfejs jest zdefiniowany tutaj](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Zawiera on funkcje i definicje wymagane do przenoszenia tokenów ERC-20 za pomocą mostu.

```solidity
// SPDX-License-Identifier: MIT
```

[Większość kodu Optimism jest udostępniana na licencji MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

W chwili pisania tego tekstu najnowsza wersja Solidity to 0.8.12.
Dopóki wersja 0.9.0 nie zostanie wydana, nie wiemy, czy ten kod jest z nią kompatybilny, czy nie.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Zdarzenia *
     **********/

    event ERC20DepositInitiated(
```

W terminologii mostów Optimism _depozyt_ oznacza transfer z L1 do L2, a _wypłata_ oznacza transfer z L2 do L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

W większości przypadków adres ERC-20 na L1 nie jest taki sam jak adres równoważnego ERC-20 na L2.
[Listę adresów tokenów można zobaczyć tutaj](https://static.optimism.io/optimism.tokenlist.json).
Adres z `chainId` 1 znajduje się na L1 (sieć główna), a adres z `chainId` 10 na L2 (Optimism).
Pozostałe dwie wartości `chainId` dotyczą sieci testowej Kovan (42) i sieci testowej Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Możliwe jest dodawanie notatek do transferów, w którym to przypadku są one dodawane do zdarzeń, które je raportują.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Ten sam kontrakt mostu obsługuje transfery w obu kierunkach.
W przypadku mostu L1 oznacza to inicjalizację depozytów i finalizację wypłat.

```solidity

    /********************
     * Funkcje publiczne *
     ********************/

    /**
     * @dev pobierz adres odpowiedniego kontraktu mostu L2.
     * @return Adres odpowiedniego kontraktu mostu L2.
     */
    function l2TokenBridge() external returns (address);
```

Ta funkcja nie jest tak naprawdę potrzebna, ponieważ na L2 jest to kontrakt wdrożony wstępnie, więc zawsze znajduje się pod adresem `0x4200000000000000000000000000000000000010`.
Jest tu dla symetrii z mostem L2, ponieważ adres mostu L1 _nie jest_ trywialny do poznania.

```solidity
    /**
     * @dev zdeponuj kwotę ERC20 na saldo wywołującego na L2.
     * @param _l1Token Adres ERC20 L1, który deponujemy
     * @param _l2Token Adres odpowiedniego ERC20 L2
     * @param _amount Kwota ERC20 do zdeponowania
     * @param _l2Gas Limit gazu wymagany do ukończenia depozytu na L2.
     * @param _data Opcjonalne dane do przesłania do L2. Dane te są udostępniane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Oprócz egzekwowania maksymalnej
     *        długości, kontrakty te nie dają żadnych gwarancji co do ich zawartości.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Parametr `_l2Gas` to ilość gazu L2, którą transakcja może zużyć.
[Do pewnego (wysokiego) limitu jest to darmowe](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), więc o ile kontrakt ERC-20 nie robi czegoś naprawdę dziwnego podczas emisji, nie powinno to stanowić problemu.
Ta funkcja obsługuje typowy scenariusz, w którym użytkownik przenosi aktywa za pomocą mostu na ten sam adres na innym blockchainie.

```solidity
    /**
     * @dev zdeponuj kwotę ERC20 na saldo odbiorcy na L2.
     * @param _l1Token Adres ERC20 L1, który deponujemy
     * @param _l2Token Adres odpowiedniego ERC20 L2
     * @param _to Adres L2, na który ma być zaksięgowana wypłata.
     * @param _amount Kwota ERC20 do zdeponowania.
     * @param _l2Gas Limit gazu wymagany do ukończenia depozytu na L2.
     * @param _data Opcjonalne dane do przesłania do L2. Dane te są udostępniane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Oprócz egzekwowania maksymalnej
     *        długości, kontrakty te nie dają żadnych gwarancji co do ich zawartości.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Ta funkcja jest niemal identyczna jak `depositERC20`, ale pozwala na wysłanie ERC-20 na inny adres.

```solidity
    /*************************
     * Funkcje międzyłańcuchowe *
     *************************/

    /**
     * @dev Zakończ wypłatę z L2 do L1 i zasil saldo odbiorcy tokenem
     * L1 ERC20.
     * To wywołanie nie powiedzie się, jeśli zainicjowana wypłata z L2 nie została sfinalizowana.
     *
     * @param _l1Token Adres tokenu L1, dla którego finalizowana jest wypłata.
     * @param _l2Token Adres tokenu L2, na którym zainicjowano wypłatę.
     * @param _from Adres L2 inicjujący transfer.
     * @param _to Adres L1, na który ma zostać zaksięgowana wypłata.
     * @param _amount Kwota ERC20 do zdeponowania.
     * @param _data Dane dostarczone przez nadawcę na L2. Dane te są udostępniane
     *   wyłącznie dla wygody zewnętrznych kontraktów. Oprócz egzekwowania maksymalnej
     *   długości, kontrakty te nie dają żadnych gwarancji co do ich zawartości.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Wypłaty (i inne wiadomości z L2 do L1) w Optimism to proces dwuetapowy:

1. Transakcja inicjująca na L2.
2. Transakcja finalizująca lub odbierająca na L1.
   Ta transakcja musi nastąpić po zakończeniu [okresu kwestionowania błędu](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) dla transakcji L2.

### IL1StandardBridge {#il1standardbridge}

[Ten interfejs jest zdefiniowany tutaj](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Ten plik zawiera definicje zdarzeń i funkcji dla ETH.
Definicje te są bardzo podobne do tych zdefiniowanych powyżej w `IL1ERC20Bridge` dla ERC-20.

Interfejs mostu jest podzielony na dwa pliki, ponieważ niektóre tokeny ERC-20 wymagają niestandardowego przetwarzania i nie mogą być obsługiwane przez standardowy most.
W ten sposób niestandardowy most, który obsługuje taki token, może zaimplementować `IL1ERC20Bridge` i nie musi również przenosić ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Zdarzenia *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

To zdarzenie jest prawie identyczne z wersją ERC-20 (`ERC20DepositInitiated`), z wyjątkiem braku adresów tokenów L1 i L2.
To samo dotyczy innych zdarzeń i funkcji.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Funkcje publiczne *
     ********************/

    /**
     * @dev Zdeponuj kwotę ETH na saldo wywołującego na L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Zdeponuj kwotę ETH na saldo odbiorcy na L2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Funkcje międzyłańcuchowe *
     *************************/

    /**
     * @dev Zakończ wypłatę z L2 do L1 i zasil saldo odbiorcy tokenem
     * L1 ETH. Ponieważ tylko xDomainMessenger może wywołać tę funkcję, nigdy nie zostanie ona wywołana
     * przed sfinalizowaniem wypłaty.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Ten kontrakt](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) jest dziedziczony przez oba mosty ([L1](#the-l1-bridge-contract) i [L2](#the-l2-bridge-contract)) do wysyłania wiadomości do drugiej warstwy.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Importy interfejsów */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Ten interfejs](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) informuje kontrakt, jak wysyłać wiadomości do drugiej warstwy, używając komunikatora między domenami.
Ten komunikator między domenami to zupełnie inny system i zasługuje na osobny artykuł, który mam nadzieję napisać w przyszłości.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Kontrakt pomocniczy dla kontraktów wykonujących komunikację między domenami
 *
 * Użyty kompilator: zdefiniowany przez kontrakt dziedziczący
 */
contract CrossDomainEnabled {
    /*************
     * Zmienne *
     *************/

    // Kontrakt komunikatora używany do wysyłania i odbierania wiadomości z innej domeny.
    address public messenger;

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _messenger Adres CrossDomainMessenger w bieżącej warstwie.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Jedyny parametr, który kontrakt musi znać, to adres komunikatora między domenami w tej warstwie.
Ten parametr jest ustawiany raz, w konstruktorze i nigdy się nie zmienia.

```solidity

    /**********************
     * Modyfikatory funkcji *
     **********************/

    /**
     * Wymusza, aby zmodyfikowana funkcja była wywoływana tylko przez określone konto między domenami.
     * @param _sourceDomainAccount Jedyne konto w domenie źródłowej, które jest
     *  uwierzytelnione do wywołania tej funkcji.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Komunikacja między domenami jest dostępna dla każdego kontraktu na blockchainie, na którym jest uruchomiona (zarówno w sieci głównej Ethereum, jak i Optimism).
Ale potrzebujemy, aby most po każdej stronie ufał _tylko_ określonym wiadomościom, jeśli pochodzą one z mostu po drugiej stronie.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: kontrakt komunikatora nieuwierzytelniony"
        );
```

Tylko wiadomości z odpowiedniego komunikatora między domenami (`messenger`, jak widać poniżej) mogą być zaufane.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: zły nadawca wiadomości między domenami"
        );
```

Sposób, w jaki komunikator między domenami dostarcza adres, który wysłał wiadomość z drugiej warstwy, to [funkcja `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Dopóki jest wywoływana w transakcji zainicjowanej przez wiadomość, może dostarczyć tych informacji.

Musimy upewnić się, że otrzymana wiadomość pochodzi z drugiego mostu.

```solidity

        _;
    }

    /**********************
     * Funkcje wewnętrzne *
     **********************/

    /**
     * Pobiera komunikator, zazwyczaj z pamięci masowej. Ta funkcja jest udostępniana na wypadek, gdyby kontrakt potomny
     * musiał ją nadpisać.
     * @return Adres kontraktu komunikatora między domenami, który powinien być używany.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Ta funkcja zwraca komunikator między domenami.
Używamy funkcji, a nie zmiennej `messenger`, aby umożliwić kontraktom dziedziczącym po tym kontrakcie użycie algorytmu do określenia, którego komunikatora między domenami użyć.

```solidity

    /**
     * Wysyła wiadomość do konta w innej domenie
     * @param _crossDomainTarget Docelowy odbiorca w domenie docelowej
     * @param _message Dane do wysłania do celu (zazwyczaj calldata do funkcji z
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Limit gazu na odbiór wiadomości w domenie docelowej.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Na koniec funkcja, która wysyła wiadomość do drugiej warstwy.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) to statyczny analizator, który Optimism uruchamia na każdym kontrakcie w poszukiwaniu luk w zabezpieczeniach i innych potencjalnych problemów.
W tym przypadku poniższa linia uruchamia dwie luki w zabezpieczeniach:

1. [Zdarzenia ponownego wejścia](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Łagodne ponowne wejście](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

W tym przypadku nie martwimy się o ponowne wejście, ponieważ wiemy, że `getCrossDomainMessenger()` zwraca zaufany adres, nawet jeśli Slither nie ma sposobu, aby to wiedzieć.

### Kontrakt mostu L1 {#the-l1-bridge-contract}

[Kod źródłowy tego kontraktu znajduje się tutaj](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Interfejsy mogą być częścią innych kontraktów, więc muszą obsługiwać szeroki zakres wersji Solidity.
Ale sam most jest naszym kontraktem i możemy być rygorystyczni co do wersji Solidity, której używa.

```solidity
/* Importy interfejsów */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) i [IL1StandardBridge](#IL1StandardBridge) zostały wyjaśnione powyżej.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Ten interfejs](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) pozwala nam tworzyć wiadomości do kontrolowania standardowego mostu na L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Ten interfejs](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) pozwala nam kontrolować kontrakty ERC-20.
[Więcej na ten temat możesz przeczytać tutaj](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Importy bibliotek */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Jak wyjaśniono powyżej](#crossdomainenabled), ten kontrakt jest używany do komunikacji międzywarstwowej.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) zawiera adresy kontraktów L2, które zawsze mają ten sam adres. Obejmuje to standardowy most na L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Narzędzia adresowe OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Jest używany do rozróżniania adresów kontraktów od adresów należących do kont zewnętrznych (EOA).

Należy pamiętać, że nie jest to idealne rozwiązanie, ponieważ nie ma sposobu, aby odróżnić wywołania bezpośrednie od wywołań z konstruktora kontraktu, ale przynajmniej pozwala nam to zidentyfikować i zapobiec niektórym typowym błędom użytkowników.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Standard ERC-20](https://eips.ethereum.org/EIPS/eip-20) obsługuje dwa sposoby raportowania niepowodzenia przez kontrakt:

1. Przywróć
2. Zwróć `false`

Obsługa obu przypadków skomplikowałaby nasz kod, dlatego zamiast tego używamy [`SafeERC20` OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), co zapewnia, że [wszystkie niepowodzenia skutkują przywróceniem](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Most L1 ETH i ERC20 to kontrakt, który przechowuje zdeponowane środki L1 i standardowe
 * tokeny, które są w użyciu na L2. Synchronizuje on odpowiedni most L2, informując go o depozytach
 * i nasłuchując na nowo sfinalizowane wypłaty.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Ta linia określa, że za każdym razem, gdy używamy interfejsu `IERC20`, używamy opakowania `SafeERC20`.

```solidity

    /********************************
     * Odniesienia do kontraktów zewnętrznych *
     ********************************/

    address public l2TokenBridge;
```

Adres [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Mapuje token L1 do tokenu L2 do salda zdeponowanego tokenu L1
    mapping(address => mapping(address => uint256)) public deposits;
```

Podwójne [mapowanie](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) takie jak to jest sposobem na zdefiniowanie [dwuwymiarowej tablicy rzadkiej](https://en.wikipedia.org/wiki/Sparse_matrix).
Wartości w tej strukturze danych są identyfikowane jako `deposit[L1 token addr][L2 token addr]`.
Wartość domyślna to zero.
Tylko komórki, które są ustawione na inną wartość, są zapisywane w pamięci.

```solidity

    /***************
     * Konstruktor *
     ***************/

    // Ten kontrakt znajduje się za proxy, więc parametry konstruktora nie będą używane.
    constructor() CrossDomainEnabled(address(0)) {}
```

Aby móc uaktualnić ten kontrakt bez konieczności kopiowania wszystkich zmiennych w pamięci.
Aby to zrobić, używamy [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), kontraktu, który używa [`delegatecall`](https://solidity-by-example.org/delegatecall/) do przekazywania wywołań do osobnego kontraktu, którego adres jest przechowywany przez kontrakt proxy (podczas aktualizacji informujesz proxy o zmianie tego adresu).
Gdy używasz `delegatecall`, pamięć pozostaje pamięcią kontraktu _wywołującego_, więc wartości wszystkich zmiennych stanu kontraktu pozostają nienaruszone.

Jednym z efektów tego wzorca jest to, że pamięć kontraktu, który jest _wywoływany_ przez `delegatecall`, nie jest używana, a zatem wartości konstruktora przekazane do niego nie mają znaczenia.
To jest powód, dla którego możemy podać bezsensowną wartość do konstruktora `CrossDomainEnabled`.
Jest to również powód, dla którego poniższa inicjalizacja jest oddzielona od konstruktora.

```solidity
    /******************
     * Inicjalizacja *
     ******************/

    /**
     * @param _l1messenger Adres komunikatora L1 używany do komunikacji międzyłańcuchowej.
     * @param _l2TokenBridge Adres standardowego mostu L2.
     */
    // slither-disable-next-line external-function
```

Ten [test Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identyfikuje funkcje, które nie są wywoływane z kodu kontraktu i dlatego mogą być zadeklarowane jako `external` zamiast `public`.
Koszt gazu funkcji `external` może być niższy, ponieważ mogą one być dostarczane z parametrami w calldata.
Funkcje zadeklarowane jako `public` muszą być dostępne z wnętrza kontraktu.
Kontrakty nie mogą modyfikować własnych calldata, więc parametry muszą znajdować się w pamięci.
Gdy taka funkcja jest wywoływana zewnętrznie, konieczne jest skopiowanie calldata do pamięci, co kosztuje gaz.
W tym przypadku funkcja jest wywoływana tylko raz, więc nieefektywność nie ma dla nas znaczenia.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Kontrakt został już zainicjowany.");
```

Funkcja `initialize` powinna być wywoływana tylko raz.
Jeśli zmieni się adres komunikatora między domenami L1 lub mostu tokenów L2, tworzymy nowe proxy i nowy most, który je wywołuje.
Jest to mało prawdopodobne, chyba że cały system zostanie uaktualniony, co jest bardzo rzadkim zjawiskiem.

Należy pamiętać, że ta funkcja nie ma żadnego mechanizmu ograniczającego, _kto_ może ją wywołać.
Oznacza to, że teoretycznie napastnik może poczekać, aż wdrożymy proxy i pierwszą wersję mostu, a następnie [wykonać front-running](https://solidity-by-example.org/hacks/front-running/), aby dostać się do funkcji `initialize` przed legalnym użytkownikiem. Ale istnieją dwie metody, aby temu zapobiec:

1. Jeśli kontrakty są wdrażane nie bezpośrednio przez EOA, ale [w transakcji, w której inny kontrakt je tworzy](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), cały proces może być atomowy i zakończyć się przed wykonaniem jakiejkolwiek innej transakcji.
2. Jeśli legalne wywołanie `initialize` nie powiedzie się, zawsze można zignorować nowo utworzone proxy i most i utworzyć nowe.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

To są dwa parametry, które most musi znać.

```solidity

    /**************
     * Deponowanie *
     **************/

    /** @dev Modyfikator wymagający, aby nadawca był EOA.  To sprawdzenie mogłoby zostać ominięte przez złośliwy
     *  kontrakt poprzez initcode, ale zapobiega to błędowi użytkownika, którego chcemy uniknąć.
     */
    modifier onlyEOA() {
        // Używane do zatrzymywania depozytów z kontraktów (unikanie przypadkowej utraty tokenów)
        require(!Address.isContract(msg.sender), "Konto nie jest EOA");
        _;
    }
```

To jest powód, dla którego potrzebowaliśmy narzędzi `Address` od OpenZeppelin.

```solidity
    /**
     * @dev Tę funkcję można wywołać bez danych
     * w celu zdeponowania kwoty ETH na saldzie wywołującego na L2.
     * Ponieważ funkcja odbioru nie przyjmuje danych, konserwatywna
     * domyślna kwota jest przekazywana do L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Ta funkcja istnieje w celach testowych.
Zauważ, że nie pojawia się w definicjach interfejsu - nie jest przeznaczona do normalnego użytku.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Te dwie funkcje są opakowaniami wokół `_initiateETHDeposit`, funkcji obsługującej faktyczny depozyt ETH.

```solidity
    /**
     * @dev Wykonuje logikę depozytów, przechowując ETH i informując bramę L2 ETH o
     * depozycie.
     * @param _from Konto, z którego ma być pobrany depozyt na L1.
     * @param _to Konto, na które ma być przekazany depozyt na L2.
     * @param _l2Gas Limit gazu wymagany do ukończenia depozytu na L2.
     * @param _data Opcjonalne dane do przesłania do L2. Dane te są udostępniane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Oprócz egzekwowania maksymalnej
     *        długości, kontrakty te nie dają żadnych gwarancji co do ich zawartości.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Skonstruuj calldata dla wywołania finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Sposób działania wiadomości między domenami polega na tym, że kontrakt docelowy jest wywoływany z wiadomością jako jego calldata.
Kontrakty Solidity zawsze interpretują swoje calldata zgodnie z
[specyfikacjami ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Funkcja Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) tworzy te calldata.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

Wiadomość tutaj polega na wywołaniu [funkcji `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) z tymi parametrami:

| Parametr                        | Wartość                                                                                  | Znaczenie                                                                                                                                                                               |
| ------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | Specjalna wartość oznaczająca ETH (który nie jest tokenem ERC-20) na L1                                                                                              |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Kontrakt L2, który zarządza ETH na Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (ten kontrakt jest przeznaczony wyłącznie do użytku wewnętrznego Optimism) |
| \_from    | \_from                                                             | Adres na L1, który wysyła ETH                                                                                                                                                           |
| \_to      | \_to                                                               | Adres na L2, który odbiera ETH                                                                                                                                                          |
| kwota                           | msg.value                                                                | Ilość wysłanych wei (które zostały już wysłane na most)                                                                                                              |
| \_data    | \_data                                                             | Dodatkowe dane do dołączenia do depozytu                                                                                                                                                |

```solidity
        // Wyślij calldata do L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Wyślij wiadomość za pośrednictwem komunikatora między domenami.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Wyemituj zdarzenie, aby poinformować o tym transferze każdą aplikację zdecentralizowaną, która go nasłuchuje.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Te dwie funkcje są opakowaniami wokół `_initiateERC20Deposit`, funkcji obsługującej faktyczny depozyt ERC-20.

```solidity
    /**
     * @dev Wykonuje logikę depozytów, informując kontrakt tokenu zdeponowanego L2
     * o depozycie i wywołując obsługę w celu zablokowania środków L1. (np. transferFrom)
     *
     * @param _l1Token Adres ERC20 L1, który deponujemy
     * @param _l2Token Adres odpowiedniego ERC20 L2
     * @param _from Konto, z którego ma być pobrany depozyt na L1
     * @param _to Konto, na które ma być przekazany depozyt na L2
     * @param _amount Kwota ERC20 do zdeponowania.
     * @param _l2Gas Limit gazu wymagany do ukończenia depozytu na L2.
     * @param _data Opcjonalne dane do przesłania do L2. Dane te są udostępniane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Oprócz egzekwowania maksymalnej
     *        długości, kontrakty te nie dają żadnych gwarancji co do ich zawartości.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Ta funkcja jest podobna do `_initiateETHDeposit` powyżej, z kilkoma ważnymi różnicami.
Pierwsza różnica polega na tym, że ta funkcja otrzymuje adresy tokenów i kwotę do przeniesienia jako parametry.
W przypadku ETH wywołanie mostu już obejmuje transfer aktywów na konto mostu (`msg.value`).

```solidity
        // Gdy depozyt jest inicjowany na L1, most L1 przekazuje środki do siebie na przyszłe
        // wypłaty. safeTransferFrom sprawdza również, czy kontrakt ma kod, więc to się nie powiedzie, jeśli
        // _from jest EOA lub address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Transfery tokenów ERC-20 przebiegają inaczej niż transfery ETH:

1. Użytkownik (`_from`) daje mostowi upoważnienie do transferu odpowiednich tokenów.
2. Użytkownik wywołuje most z adresem kontraktu tokenu, kwotą itp.
3. Most transferuje tokeny (do siebie) w ramach procesu depozytowego.

Pierwszy krok może nastąpić w osobnej transakcji niż dwa ostatnie.
Jednak front-running nie stanowi problemu, ponieważ dwie funkcje, które wywołują `_initiateERC20Deposit` (`depositERC20` i `depositERC20To`) wywołują tę funkcję tylko z `msg.sender` jako parametrem `_from`.

```solidity
        // Skonstruuj calldata dla _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Wyślij calldata do L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Dodaj zdeponowaną kwotę tokenów do struktury danych `deposits`.
Na L2 może istnieć wiele adresów odpowiadających temu samemu tokenowi ERC-20 L1, więc nie wystarczy użyć salda mostu tokenu ERC-20 L1, aby śledzić depozyty.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Funkcje międzyłańcuchowe *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Most L2 wysyła wiadomość do komunikatora między domenami L2, co powoduje, że komunikator między domenami L1 wywołuje tę funkcję (oczywiście, gdy [transakcja finalizująca wiadomość](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) zostanie przesłana na L1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Upewnij się, że jest to _legalna_ wiadomość, pochodząca z komunikatora między domenami i pochodząca z mostu tokenów L2.
Ta funkcja służy do wypłacania ETH z mostu, więc musimy upewnić się, że jest wywoływana tylko przez upoważnionego wywołującego.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Sposobem na transfer ETH jest wywołanie odbiorcy z kwotą wei w `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: Transfer ETH nie powiódł się");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Wyemituj zdarzenie dotyczące wypłaty.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Ta funkcja jest podobna do `finalizeETHWithdrawal` powyżej, z niezbędnymi zmianami dla tokenów ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Zaktualizuj strukturę danych `deposits`.

```solidity

        // Gdy wypłata jest finalizowana na L1, most L1 przekazuje środki do wypłacającego
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Tymczasowe – Migracja ETH *
     *****************************/

    /**
     * @dev Dodaje saldo ETH do konta. Ma to na celu umożliwienie migracji ETH
     * ze starej bramy do nowej.
     * UWAGA: Jest to pozostawione tylko na jedną aktualizację, abyśmy mogli otrzymać zmigrowane ETH ze
     * starego kontraktu
     */
    function donateETH() external payable {}
}
```

Istniała wcześniejsza implementacja mostu.
Kiedy przeszliśmy z tamtej implementacji na tę, musieliśmy przenieść wszystkie aktywa.
Tokeny ERC-20 można po prostu przenieść.
Jednak aby przetransferować ETH do kontraktu, potrzebna jest zgoda tego kontraktu, którą zapewnia nam `donateETH`.

## Tokeny ERC-20 na L2 {#erc-20-tokens-on-l2}

Aby token ERC-20 pasował do standardowego mostu, musi on zezwalać standardowemu mostowi, i _tylko_ standardowemu mostowi, na emisję tokenów.
Jest to konieczne, ponieważ mosty muszą zapewnić, że liczba tokenów w obiegu na Optimism jest równa liczbie tokenów zablokowanych w kontrakcie mostu L1.
Jeśli na L2 będzie zbyt wiele tokenów, niektórzy użytkownicy nie będą mogli przenieść swoich aktywów z powrotem na L1.
Zamiast zaufanego mostu, w zasadzie odtworzylibyśmy [bankowość rezerw cząstkowych](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Jeśli na L1 jest zbyt wiele tokenów, niektóre z nich pozostaną na zawsze zablokowane w kontrakcie mostu, ponieważ nie ma sposobu, aby je uwolnić bez spalenia tokenów L2.

### IL2StandardERC20 {#il2standarderc20}

Każdy token ERC-20 na L2, który używa standardowego mostu, musi dostarczać [ten interfejs](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), który zawiera funkcje i zdarzenia potrzebne standardowemu mostowi.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Standardowy interfejs ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nie zawiera funkcji `mint` i `burn`.
Metody te nie są wymagane przez [standard ERC-20](https://eips.ethereum.org/EIPS/eip-20), który nie określa mechanizmów tworzenia i niszczenia tokenów.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Interfejs ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) służy do określania, jakie funkcje dostarcza kontrakt.
[Standard można przeczytać tutaj](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Ta funkcja dostarcza adres tokenu L1, który jest przenoszony na ten kontrakt za pomocą mostu.
Zauważ, że nie mamy podobnej funkcji w przeciwnym kierunku.
Musimy być w stanie przenosić dowolny token L1 za pomocą mostu, niezależnie od tego, czy wsparcie L2 było planowane podczas jego implementacji, czy nie.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funkcje i zdarzenia do emisji (tworzenia) i spalania (niszczenia) tokenów.
Most powinien być jedynym podmiotem, który może uruchamiać te funkcje, aby zapewnić prawidłową liczbę tokenów (równą liczbie tokenów zablokowanych na L1).

### L2StandardERC20 {#L2StandardERC20}

[To jest nasza implementacja interfejsu `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
O ile nie potrzebujesz jakiejś niestandardowej logiki, powinieneś użyć tej.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Kontrakt ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism nie wierzy w wynajdywanie koła na nowo, zwłaszcza gdy koło jest dobrze audytowane i musi być na tyle godne zaufania, aby przechowywać aktywa.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Są to dwa dodatkowe parametry konfiguracyjne, których wymagamy, a których ERC-20 normalnie nie wymaga.

```solidity

    /**
     * @param _l2Bridge Adres standardowego mostu L2.
     * @param _l1Token Adres odpowiadającego mu tokenu L1.
     * @param _name Nazwa ERC20.
     * @param _symbol Symbol ERC20.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Najpierw wywołaj konstruktor dla kontraktu, z którego dziedziczymy (`ERC20(_name, _symbol)`), a następnie ustaw nasze własne zmienne.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Tylko Most L2 może emitować i spalać");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

Tak działa [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Każdy interfejs to liczba obsługiwanych funkcji i jest identyfikowany jako [alternatywa wykluczająca](https://en.wikipedia.org/wiki/Exclusive_or) [selektorów funkcji ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) tych funkcji.

Most L2 używa ERC-165 jako testu poprawności, aby upewnić się, że kontrakt ERC-20, do którego wysyła aktywa, jest `IL2StandardERC20`.

**Uwaga:** Nic nie stoi na przeszkodzie, aby nieuczciwy kontrakt dostarczał fałszywych odpowiedzi do `supportsInterface`, więc jest to mechanizm sprawdzania poprawności, _nie_ mechanizm bezpieczeństwa.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Tylko most L2 może emitować i spalać aktywa.

`_mint` i `_burn` są w rzeczywistości zdefiniowane w [kontrakcie ERC-20 OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Ten kontrakt po prostu nie udostępnia ich na zewnątrz, ponieważ warunki emisji i spalania tokenów są tak zróżnicowane, jak liczba sposobów wykorzystania ERC-20.

## Kod mostu L2 {#l2-bridge-code}

To jest kod, który uruchamia most na Optimism.
[Źródło tego kontraktu znajduje się tutaj](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Importy interfejsów */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Interfejs [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) jest bardzo podobny do [odpowiednika L1](#IL1ERC20Bridge), który widzieliśmy powyżej.
Istnieją dwie znaczące różnice:

1. Na L1 inicjujesz depozyty i finalizujesz wypłaty.
   Tutaj inicjujesz wypłaty i finalizujesz depozyty.
2. Na L1 konieczne jest rozróżnienie między tokenami ETH i ERC-20.
   Na L2 możemy używać tych samych funkcji dla obu, ponieważ wewnętrznie salda ETH na Optimism są obsługiwane jako token ERC-20 z adresem [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Importy bibliotek */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Importy kontraktów */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Most standardowy L2 to kontrakt, który współpracuje z mostem standardowym L1, aby
 * umożliwić przejścia ETH i ERC20 między L1 i L2.
 * Ten kontrakt działa jako emitent nowych tokenów, gdy dowiaduje się o depozytach na moście standardowym
 * L1.
 * Ten kontrakt działa również jako spalacz tokenów przeznaczonych do wypłaty, informując most L1
 * o uwolnieniu środków L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Odniesienia do kontraktów zewnętrznych *
     ********************************/

    address public l1TokenBridge;
```

Śledź adres mostu L1.
Zauważ, że w przeciwieństwie do odpowiednika L1, tutaj _potrzebujemy_ tej zmiennej.
Adres mostu L1 nie jest znany z góry.

```solidity

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Komunikator między domenami używany przez ten kontrakt.
     * @param _l1TokenBridge Adres mostu L1 wdrożonego w głównej sieci.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Wypłacanie *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Te dwie funkcje inicjują wypłaty.
Zauważ, że nie ma potrzeby określania adresu tokenu L1.
Oczekuje się, że tokeny L2 podadzą nam adres swojego odpowiednika L1.

```solidity

    /**
     * @dev Wykonuje logikę wypłat, spalając token i informując
     *      bramę tokenów L1 o wypłacie.
     * @param _l2Token Adres tokenu L2, na którym inicjowana jest wypłata.
     * @param _from Konto, z którego ma być pobrana wypłata na L2.
     * @param _to Konto, na które ma być przekazana wypłata na L1.
     * @param _amount Ilość tokenu do wypłaty.
     * @param _l1Gas Nieużywane, ale zawarte w celu zapewnienia potencjalnej zgodności w przyszłości.
     * @param _data Opcjonalne dane do przesłania do L1. Dane te są udostępniane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Oprócz egzekwowania maksymalnej
     *        długości, kontrakty te nie dają żadnych gwarancji co do ich zawartości.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Gdy inicjowana jest wypłata, spalamy środki wypłacającego, aby zapobiec późniejszemu wykorzystaniu na L2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Zauważ, że _nie_ polegamy na parametrze `_from`, ale na `msg.sender`, który jest znacznie trudniejszy do sfałszowania (o ile mi wiadomo, niemożliwy).

```solidity

        // Skonstruuj calldata dla l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Na L1 konieczne jest rozróżnienie między ETH i ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Wyślij wiadomość do mostu L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Funkcja międzyłańcuchowa: Deponowanie *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Ta funkcja jest wywoływana przez `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Upewnij się, że źródło wiadomości jest legalne.
Jest to ważne, ponieważ ta funkcja wywołuje `_mint` i może być użyta do wydawania tokenów, które nie są pokryte tokenami, które most posiada na L1.

```solidity
        // Sprawdź, czy token docelowy jest zgodny i
        // zweryfikuj, czy zdeponowany token na L1 odpowiada reprezentacji zdeponowanego tokenu L2 tutaj
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Testy poprawności:

1. Obsługiwany jest prawidłowy interfejs
2. Adres L1 kontraktu ERC-20 na L2 odpowiada źródłu tokenów na L1

```solidity
        ) {
            // Po sfinalizowaniu depozytu zasilamy konto na L2 taką samą kwotą
            // tokenów.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Jeśli testy poprawności przejdą pomyślnie, sfinalizuj depozyt:

1. Wyemituj tokeny
2. Wyemituj odpowiednie zdarzenie

```solidity
        } else {
            // Albo token L2, do którego dokonywany jest depozyt, nie zgadza się co do prawidłowego adresu
            // swojego tokenu L1, albo nie obsługuje prawidłowego interfejsu.
            // Powinno to nastąpić tylko wtedy, gdy istnieje złośliwy token L2 lub jeśli użytkownik w jakiś sposób
            // podał nieprawidłowy adres tokenu L2 do zdeponowania.
            // W obu przypadkach zatrzymujemy tutaj proces i konstruujemy wiadomość
            // wypłaty, aby użytkownicy mogli w niektórych przypadkach odzyskać swoje środki.
            // Nie ma sposobu, aby całkowicie zapobiec złośliwym kontraktom tokenów, ale ogranicza to
            // błędy użytkowników i łagodzi niektóre formy złośliwego zachowania kontraktów.
```

Jeśli użytkownik popełnił wykrywalny błąd, używając niewłaściwego adresu tokenu L2, chcemy anulować depozyt i zwrócić tokeny na L1.
Jedynym sposobem, w jaki możemy to zrobić z L2, jest wysłanie wiadomości, która będzie musiała poczekać na okres kwestionowania błędu, ale jest to znacznie lepsze dla użytkownika niż trwała utrata tokenów.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // zamieniono tutaj _to i _from, aby zwrócić depozyt do nadawcy
                _from,
                _amount,
                _data
            );

            // Wyślij wiadomość do mostu L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Wnioski {#conclusion}

Standardowy most jest najbardziej elastycznym mechanizmem transferu aktywów.
Jednakże, ponieważ jest tak ogólny, nie zawsze jest to najłatwiejszy mechanizm do użycia.
Szczególnie w przypadku wypłat, większość użytkowników woli korzystać z [mostów stron trzecich](https://optimism.io/apps#bridge), które nie czekają na okres kwestionowania i nie wymagają dowodu Merkle, aby sfinalizować wypłatę.

Te mosty zazwyczaj działają poprzez posiadanie aktywów na L1, które dostarczają natychmiast za niewielką opłatą (często niższą niż koszt gazu za standardową wypłatę z mostu).
Gdy most (lub osoby go prowadzące) przewiduje brak aktywów L1, przekazuje wystarczającą ilość aktywów z L2. Ponieważ są to bardzo duże wypłaty, koszt wypłaty jest amortyzowany na dużą kwotę i stanowi znacznie mniejszy procent.

Mam nadzieję, że ten artykuł pomógł ci lepiej zrozumieć, jak działa warstwa 2 i jak pisać kod Solidity, który jest jasny i bezpieczny.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).
