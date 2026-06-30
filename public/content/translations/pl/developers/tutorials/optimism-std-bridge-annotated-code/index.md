---
title: "Przewodnik po kontrakcie standardowego mostu Optimism"
description: "Jak działa standardowy most dla Optimism? Dlaczego działa w ten sposób?"
author: Ori Pomerantz
tags: ["Solidity", "most", "warstwa 2"]
skill: intermediate
breadcrumb: "Most Optimism"
published: 2022-03-30
lang: pl
---

[Optimism](https://www.optimism.io/) to [optymistyczny rollup](/developers/docs/scaling/optimistic-rollups/).
Optymistyczne rollupy mogą przetwarzać transakcje za znacznie niższą cenę niż sieć główna Ethereum (znana również jako warstwa 1 lub L1), ponieważ transakcje są przetwarzane tylko przez kilka węzłów, a nie przez każdy węzeł w sieci.
Jednocześnie wszystkie dane są zapisywane w L1, dzięki czemu wszystko można udowodnić i zrekonstruować ze wszystkimi gwarancjami integralności i dostępności sieci głównej.

Aby używać aktywów z L1 na Optimism (lub dowolnej innej L2), aktywa te muszą zostać [przeniesione przez most](/bridges/#prerequisites).
Jednym ze sposobów na osiągnięcie tego jest zablokowanie przez użytkowników aktywów (najczęściej są to ETH i [tokeny ERC-20](/developers/docs/standards/tokens/erc-20/)) na L1 i otrzymanie równoważnych aktywów do wykorzystania na L2.
Ostatecznie ten, kto wejdzie w ich posiadanie, może chcieć przenieść je z powrotem przez most na L1.
W takim przypadku aktywa są spalane na L2, a następnie uwalniane z powrotem do użytkownika na L1.

W ten sposób działa [standardowy most Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
W tym artykule przyjrzymy się kodowi źródłowemu tego mostu, aby zobaczyć, jak działa, i przeanalizujemy go jako przykład dobrze napisanego kodu w języku Solidity.

## Przepływy sterowania {#control-flows}

Most ma dwa główne przepływy:

- Depozyt (z L1 do L2)
- Wypłata (z L2 do L1)

### Przepływ depozytu {#deposit-flow}

#### Warstwa 1 {#deposit-flow-layer-1}

1. W przypadku deponowania ERC-20, deponent przyznaje mostowi limit wydatków na kwotę, która ma zostać zdeponowana
2. Deponent wywołuje most L1 (`depositERC20`, `depositERC20To`, `depositETH` lub `depositETHTo`)
3. Most L1 przejmuje w posiadanie przenoszone aktywo
   - ETH: Aktywo jest transferowane przez deponenta w ramach wywołania
   - ERC-20: Aktywo jest transferowane przez most do samego siebie przy użyciu limitu wydatków zapewnionego przez deponenta
4. Most L1 używa mechanizmu wiadomości międzydomenowych (cross-domain message), aby wywołać `finalizeDeposit` w moście L2

#### Warstwa 2 {#deposit-flow-layer-2}

5. Most L2 weryfikuje, czy wywołanie `finalizeDeposit` jest prawidłowe:
   - Pochodzi z kontraktu wiadomości międzydomenowych
   - Pierwotnie pochodziło z mostu na L1
6. Most L2 sprawdza, czy kontrakt tokena ERC-20 na L2 jest właściwy:
   - Kontrakt L2 zgłasza, że jego odpowiednik na L1 jest taki sam jak ten, z którego pochodzą tokeny na L1
   - Kontrakt L2 zgłasza, że obsługuje poprawny interfejs ([używając ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Jeśli kontrakt L2 jest właściwy, wywołuje go, aby wybić odpowiednią liczbę tokenów na odpowiedni adres. Jeśli nie, rozpoczyna proces wypłaty, aby umożliwić użytkownikowi odebranie tokenów na L1.

### Przepływ wypłaty {#withdrawal-flow}

#### Warstwa 2 {#withdrawal-flow-layer-2}

1. Wypłacający wywołuje most L2 (`withdraw` lub `withdrawTo`)
2. Most L2 spala odpowiednią liczbę tokenów należących do `msg.sender`
3. Most L2 używa mechanizmu wiadomości międzydomenowych, aby wywołać `finalizeETHWithdrawal` lub `finalizeERC20Withdrawal` w moście L1

#### Warstwa 1 {#withdrawal-flow-layer-1}

4. Most L1 weryfikuje, czy wywołanie `finalizeETHWithdrawal` lub `finalizeERC20Withdrawal` jest prawidłowe:
   - Pochodzi z mechanizmu wiadomości międzydomenowych
   - Pierwotnie pochodziło z mostu na L2
5. Most L1 transferuje odpowiednie aktywo (ETH lub ERC-20) na odpowiedni adres

## Kod warstwy 1 {#layer-1-code}

To jest kod, który działa na L1, w sieci głównej Ethereum.

### IL1ERC20Bridge {#il1erc20bridge}

[Ten interfejs jest zdefiniowany tutaj](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Zawiera on funkcje i definicje wymagane do przenoszenia tokenów ERC-20 przez most.

```solidity
// SPDX-License-Identifier: MIT
```

[Większość kodu Optimism jest wydana na licencji MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

W momencie pisania tego tekstu najnowszą wersją Solidity jest 0.8.12.
Dopóki nie zostanie wydana wersja 0.9.0, nie wiemy, czy ten kod będzie z nią kompatybilny, czy nie.

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

W terminologii mostu Optimism _depozyt_ oznacza transfer z L1 do L2, a _wypłata_ oznacza transfer z L2 do L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

W większości przypadków adres ERC-20 na L1 nie jest taki sam jak adres równoważnego ERC-20 na L2.
[Listę adresów tokenów można zobaczyć tutaj](https://static.optimism.io/optimism.tokenlist.json).
Adres z `chainId` 1 znajduje się na L1 (sieć główna), a adres z `chainId` 10 znajduje się na L2 (Optimism).
Pozostałe dwie wartości `chainId` dotyczą sieci testowej Kovan (42) i sieci testowej Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Do transferów można dodawać notatki, w którym to przypadku są one dodawane do zdarzeń, które je raportują.

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
     * @dev pobiera adres odpowiedniego kontraktu mostu warstwy 2 (L2).
     * @return Adres odpowiedniego kontraktu mostu warstwy 2 (L2).
     */
    function l2TokenBridge() external returns (address);
```

Ta funkcja nie jest tak naprawdę potrzebna, ponieważ na L2 jest to wstępnie wdrożony kontrakt, więc zawsze znajduje się pod adresem `0x4200000000000000000000000000000000000010`.
Znajduje się tutaj dla zachowania symetrii z mostem L2, ponieważ adres mostu L1 _nie_ jest trywialny do poznania.

```solidity
    /**
     * @dev deponuje kwotę ERC-20 na saldo wywołującego w warstwie 2 (L2).
     * @param _l1Token Adres ERC-20 warstwy 1 (L1), który deponujemy
     * @param _l2Token Adres odpowiedniego ERC-20 warstwy 2 (L2) dla warstwy 1 (L1)
     * @param _amount Kwota ERC-20 do zdeponowania
     * @param _l2Gas Limit gazu wymagany do ukończenia depozytu w warstwie 2 (L2).
     * @param _data Opcjonalne dane do przekazania do warstwy 2 (L2). Te dane są dostarczane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Poza wymuszaniem maksymalnej
     *        długości, te kontrakty nie dają żadnych gwarancji co do ich zawartości.
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
[Do pewnego (wysokiego) limitu jest to darmowe](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), więc o ile kontrakt ERC-20 nie robi czegoś naprawdę dziwnego podczas wybijania, nie powinno to stanowić problemu.
Ta funkcja zajmuje się typowym scenariuszem, w którym użytkownik przenosi aktywa przez most na ten sam adres na innym blockchainie.

```solidity
    /**
     * @dev deponuje kwotę ERC-20 na saldo odbiorcy w warstwie 2 (L2).
     * @param _l1Token Adres ERC-20 warstwy 1 (L1), który deponujemy
     * @param _l2Token Adres odpowiedniego ERC-20 warstwy 2 (L2) dla warstwy 1 (L1)
     * @param _to Adres warstwy 2 (L2), na który ma zostać uznana wypłata.
     * @param _amount Kwota ERC-20 do zdeponowania.
     * @param _l2Gas Limit gazu wymagany do ukończenia depozytu w warstwie 2 (L2).
     * @param _data Opcjonalne dane do przekazania do warstwy 2 (L2). Te dane są dostarczane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Poza wymuszaniem maksymalnej
     *        długości, te kontrakty nie dają żadnych gwarancji co do ich zawartości.
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

Ta funkcja jest prawie identyczna z `depositERC20`, ale pozwala na wysłanie ERC-20 na inny adres.

```solidity
    /*************************
     * Funkcje międzyłańcuchowe *
     *************************/

    /**
     * @dev Kończy wypłatę z warstwy 2 (L2) do warstwy 1 (L1) i uznaje środki na saldzie odbiorcy
     * tokena ERC-20 warstwy 1 (L1).
     * To wywołanie nie powiedzie się, jeśli zainicjowana wypłata z warstwy 2 (L2) nie została sfinalizowana.
     *
     * @param _l1Token Adres tokena warstwy 1 (L1), dla którego ma zostać wykonane finalizeWithdrawal.
     * @param _l2Token Adres tokena warstwy 2 (L2), gdzie zainicjowano wypłatę.
     * @param _from Adres warstwy 2 (L2) inicjujący transfer.
     * @param _to Adres warstwy 1 (L1), na który ma zostać uznana wypłata.
     * @param _amount Kwota ERC-20 do zdeponowania.
     * @param _data Dane dostarczone przez nadawcę w warstwie 2 (L2). Te dane są dostarczane
     *   wyłącznie dla wygody zewnętrznych kontraktów. Poza wymuszaniem maksymalnej
     *   długości, te kontrakty nie dają żadnych gwarancji co do ich zawartości.
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
2. Transakcja finalizująca lub odbierająca (roszczenie) na L1.
   Ta transakcja musi nastąpić po zakończeniu [okresu kwestionowania błędów (fault challenge period)](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) dla transakcji L2.

### IL1StandardBridge {#il1standardbridge}

[Ten interfejs jest zdefiniowany tutaj](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Ten plik zawiera definicje zdarzeń i funkcji dla ETH.
Definicje te są bardzo podobne do tych zdefiniowanych w `IL1ERC20Bridge` powyżej dla ERC-20.

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

To zdarzenie jest prawie identyczne z wersją ERC-20 (`ERC20DepositInitiated`), z tą różnicą, że nie zawiera adresów tokenów L1 i L2.
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
     * @dev Deponuje kwotę ETH na saldo wywołującego w warstwie 2 (L2).
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deponuje kwotę ETH na saldo odbiorcy w warstwie 2 (L2).
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
     * @dev Kończy wypłatę z warstwy 2 (L2) do warstwy 1 (L1) i uznaje środki na saldzie odbiorcy
     * tokena ETH warstwy 1 (L1). Ponieważ tylko xDomainMessenger może wywołać tę funkcję, nigdy nie zostanie ona wywołana
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

[Ten kontrakt](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) jest dziedziczony przez oba mosty ([L1](#the-l1-bridge-contract) i [L2](#l2-bridge-code)) w celu wysyłania wiadomości do drugiej warstwy.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Importy interfejsów */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Ten interfejs](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) mówi kontraktowi, jak wysyłać wiadomości do drugiej warstwy, używając komunikatora międzydomenowego (cross domain messenger).
Ten komunikator międzydomenowy to zupełnie inny system i zasługuje na osobny artykuł, który mam nadzieję napisać w przyszłości.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Kontrakt pomocniczy dla kontraktów wykonujących komunikację międzydomenową
 *
 * Użyty kompilator: zdefiniowany przez dziedziczący kontrakt
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

Jedynym parametrem, który kontrakt musi znać, jest adres komunikatora międzydomenowego w tej warstwie.
Parametr ten jest ustawiany raz, w konstruktorze, i nigdy się nie zmienia.

```solidity

    /**********************
     * Modyfikatory funkcji *
     **********************/

    /**
     * Wymusza, aby modyfikowana funkcja mogła być wywoływana tylko przez określone konto międzydomenowe.
     * @param _sourceDomainAccount Jedyne konto w domenie źródłowej, które jest
     *  uwierzytelnione do wywołania tej funkcji.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Wiadomości międzydomenowe są dostępne dla każdego kontraktu na blockchainie, na którym jest on uruchomiony (zarówno w sieci głównej Ethereum, jak i w Optimism).
Musimy jednak sprawić, aby most po każdej stronie ufał _tylko_ określonym wiadomościom, jeśli pochodzą one z mostu po drugiej stronie.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Tylko wiadomości z odpowiedniego komunikatora międzydomenowego (`messenger`, jak widać poniżej) mogą być uznane za zaufane.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Sposobem, w jaki komunikator międzydomenowy udostępnia adres, który wysłał wiadomość z innej warstwy, jest [funkcja `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Dopóki jest ona wywoływana w transakcji zainicjowanej przez wiadomość, może dostarczyć te informacje.

Musimy upewnić się, że otrzymana wiadomość pochodzi z drugiego mostu.

```solidity

        _;
    }

    /**********************
     * Funkcje wewnętrzne *
     **********************/

    /**
     * Pobiera komunikator, zazwyczaj z pamięci (storage). Ta funkcja jest udostępniona na wypadek, gdyby kontrakt potomny
     * musiał ją nadpisać.
     * @return Adres kontraktu komunikatora międzydomenowego, który powinien zostać użyty.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Ta funkcja zwraca komunikator międzydomenowy.
Używamy funkcji zamiast zmiennej `messenger`, aby umożliwić kontraktom dziedziczącym po tym kontrakcie użycie algorytmu do określenia, którego komunikatora międzydomenowego użyć.

```solidity

    /**
     * Wysyła wiadomość do konta w innej domenie
     * @param _crossDomainTarget Zamierzony odbiorca w domenie docelowej
     * @param _message Dane do wysłania do celu (zazwyczaj dane wywołania do funkcji z
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Limit gazu (gasLimit) dla odbioru wiadomości w domenie docelowej.
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

[Slither](https://github.com/crytic/slither) to analizator statyczny, który Optimism uruchamia na każdym kontrakcie w poszukiwaniu luk w zabezpieczeniach i innych potencjalnych problemów.
W tym przypadku poniższy wiersz wyzwala dwie luki:

1. [Zdarzenia reentrancji](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Łagodna reentrancja](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

W tym przypadku nie martwimy się o reentrancję, ponieważ wiemy, że `getCrossDomainMessenger()` zwraca zaufany adres, nawet jeśli Slither nie ma możliwości, aby o tym wiedzieć.

### Kontrakt mostu L1 {#the-l1-bridge-contract}

[Kod źródłowy tego kontraktu znajduje się tutaj](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Interfejsy mogą być częścią innych kontraktów, więc muszą obsługiwać szeroki zakres wersji Solidity.
Ale sam most jest naszym kontraktem i możemy być rygorystyczni co do tego, jakiej wersji Solidity używa.

```solidity
/* Importy interfejsów */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) i [IL1StandardBridge](#il1standardbridge) zostały wyjaśnione powyżej.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Ten interfejs](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) pozwala nam tworzyć wiadomości do sterowania standardowym mostem na L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Ten interfejs](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) pozwala nam kontrolować kontrakty ERC-20.
[Więcej na ten temat można przeczytać tutaj](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Importy bibliotek */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Jak wyjaśniono powyżej](#crossdomainenabled), ten kontrakt jest używany do przesyłania wiadomości między warstwami.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) zawiera adresy kontraktów L2, które zawsze mają ten sam adres. Obejmuje to standardowy most na L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Narzędzia Address z OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Służą one do rozróżniania adresów kontraktów od tych należących do kont zewnętrznych (EOA).

Należy pamiętać, że nie jest to idealne rozwiązanie, ponieważ nie ma sposobu na rozróżnienie bezpośrednich wywołań od wywołań z konstruktora kontraktu, ale przynajmniej pozwala nam to zidentyfikować i zapobiec niektórym typowym błędom użytkowników.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Standard ERC-20](https://eips.ethereum.org/EIPS/eip-20) obsługuje dwa sposoby zgłaszania niepowodzenia przez kontrakt:

1. Wycofanie (revert)
2. Zwrócenie `false`

Obsługa obu przypadków skomplikowałaby nasz kod, więc zamiast tego używamy [`SafeERC20` z OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), co gwarantuje, że [wszystkie niepowodzenia skutkują wycofaniem](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Most ETH i ERC-20 warstwy 1 (L1) to kontrakt, który przechowuje zdeponowane środki warstwy 1 (L1) i standardowe
 * tokeny, które są w użyciu w warstwie 2 (L2). Synchronizuje on odpowiedni most warstwy 2 (L2), informując go o depozytach
 * i nasłuchując nowo sfinalizowanych wypłat.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

W tym wierszu określamy, aby używać wrappera `SafeERC20` za każdym razem, gdy używamy interfejsu `IERC20`.

```solidity

    /********************************
     * Referencje do zewnętrznych kontraktów *
     ********************************/

    address public l2TokenBridge;
```

Adres [L2StandardBridge](#l2-bridge-code).

```solidity

    // Mapuje token warstwy 1 (L1) na token warstwy 2 (L2) na saldo zdeponowanego tokena warstwy 1 (L1)
    mapping(address => mapping(address => uint256)) public deposits;
```

Podwójne [mapowanie](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) tego typu to sposób na zdefiniowanie [dwuwymiarowej tablicy rzadkiej](https://en.wikipedia.org/wiki/Sparse_matrix).
Wartości w tej strukturze danych są identyfikowane jako `deposit[L1 token addr][L2 token addr]`.
Wartość domyślna to zero.
Tylko komórki ustawione na inną wartość są zapisywane w pamięci (storage).

```solidity

    /***************
     * Konstruktor *
     ***************/

    // Ten kontrakt znajduje się za proxy, więc parametry konstruktora pozostaną nieużywane.
    constructor() CrossDomainEnabled(address(0)) {}
```

Chcemy mieć możliwość aktualizacji tego kontraktu bez konieczności kopiowania wszystkich zmiennych w pamięci.
Aby to zrobić, używamy [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), kontraktu, który używa [`delegatecall`](https://solidity-by-example.org/delegatecall/) do przekazywania wywołań do oddzielnego kontraktu, którego adres jest przechowywany przez kontrakt proxy (podczas aktualizacji mówisz proxy, aby zmienił ten adres).
Kiedy używasz `delegatecall`, pamięć pozostaje pamięcią kontraktu _wywołującego_, więc wartości wszystkich zmiennych stanu kontraktu pozostają nienaruszone.

Jednym ze skutków tego wzorca jest to, że pamięć kontraktu, który jest _wywoływany_ przez `delegatecall`, nie jest używana, a zatem wartości konstruktora przekazane do niego nie mają znaczenia.
Z tego powodu możemy podać bezsensowną wartość do konstruktora `CrossDomainEnabled`.
Jest to również powód, dla którego poniższa inicjalizacja jest oddzielona od konstruktora.

```solidity
    /******************
     * Inicjalizacja *
     ******************/

    /**
     * @param _l1messenger Adres komunikatora warstwy 1 (L1) używanego do komunikacji międzyłańcuchowej.
     * @param _l2TokenBridge Adres standardowego mostu warstwy 2 (L2).
     */
    // slither-disable-next-line external-function
```

Ten [test Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identyfikuje funkcje, które nie są wywoływane z kodu kontraktu i dlatego mogłyby zostać zadeklarowane jako `external` zamiast `public`.
Koszt gazu dla funkcji `external` może być niższy, ponieważ mogą one otrzymywać parametry w danych wywołania (calldata).
Funkcje zadeklarowane jako `public` muszą być dostępne z wnętrza kontraktu.
Kontrakty nie mogą modyfikować własnych danych wywołania, więc parametry muszą znajdować się w pamięci (memory).
Gdy taka funkcja jest wywoływana zewnętrznie, konieczne jest skopiowanie danych wywołania do pamięci, co kosztuje gaz.
W tym przypadku funkcja jest wywoływana tylko raz, więc ta nieefektywność nie ma dla nas znaczenia.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Funkcja `initialize` powinna być wywołana tylko raz.
Jeśli zmieni się adres komunikatora międzydomenowego L1 lub mostu tokenów L2, tworzymy nowe proxy i nowy most, który je wywołuje.
Jest mało prawdopodobne, aby to nastąpiło, z wyjątkiem sytuacji, gdy cały system jest aktualizowany, co zdarza się bardzo rzadko.

Należy zauważyć, że ta funkcja nie ma żadnego mechanizmu ograniczającego to, _kto_ może ją wywołać.
Oznacza to, że w teorii atakujący mógłby poczekać, aż wdrożymy proxy i pierwszą wersję mostu, a następnie zastosować [wyprzedzanie transakcji](https://solidity-by-example.org/hacks/front-running/), aby dostać się do funkcji `initialize` przed prawowitym użytkownikiem. Istnieją jednak dwie metody, aby temu zapobiec:

1. Jeśli kontrakty nie są wdrażane bezpośrednio przez EOA, ale [w transakcji, w której inny kontrakt je tworzy](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), cały proces może być atomowy i zakończyć się przed wykonaniem jakiejkolwiek innej transakcji.
2. Jeśli prawowite wywołanie `initialize` nie powiedzie się, zawsze można zignorować nowo utworzone proxy i most, a następnie utworzyć nowe.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Są to dwa parametry, które most musi znać.

```solidity

    /**************
     * Deponowanie *
     **************/

    /** @dev Modyfikator wymagający, aby nadawca był EOA. To sprawdzenie mogłoby zostać ominięte przez złośliwy
     *  kontrakt za pomocą initcode, ale zapobiega błędowi użytkownika, którego chcemy uniknąć.
     */
    modifier onlyEOA() {
        // Używane do zatrzymania depozytów z kontraktów (unikanie przypadkowo utraconych tokenów)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Z tego powodu potrzebowaliśmy narzędzi `Address` z OpenZeppelin.

```solidity
    /**
     * @dev Ta funkcja może zostać wywołana bez danych,
     * aby zdeponować kwotę ETH na saldo wywołującego w warstwie 2 (L2).
     * Ponieważ funkcja receive nie przyjmuje danych, konserwatywna
     * domyślna kwota jest przekazywana do warstwy 2 (L2).
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Ta funkcja istnieje w celach testowych.
Zauważ, że nie pojawia się ona w definicjach interfejsów – nie jest przeznaczona do normalnego użytku.

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

Te dwie funkcje to wrappery wokół `_initiateETHDeposit`, funkcji, która obsługuje właściwy depozyt ETH.

```solidity
    /**
     * @dev Wykonuje logikę dla depozytów poprzez przechowywanie ETH i informowanie bramki ETH warstwy 2 (L2) o
     * depozycie.
     * @param _from Konto, z którego ma zostać pobrany depozyt w warstwie 1 (L1).
     * @param _to Konto, któremu ma zostać przekazany depozyt w warstwie 2 (L2).
     * @param _l2Gas Limit gazu wymagany do ukończenia depozytu w warstwie 2 (L2).
     * @param _data Opcjonalne dane do przekazania do warstwy 2 (L2). Te dane są dostarczane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Poza wymuszaniem maksymalnej
     *        długości, te kontrakty nie dają żadnych gwarancji co do ich zawartości.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Konstruuje dane wywołania dla wywołania finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Wiadomości międzydomenowe działają w ten sposób, że kontrakt docelowy jest wywoływany z wiadomością jako jego danymi wywołania (calldata).
Kontrakty Solidity zawsze interpretują swoje dane wywołania zgodnie ze [specyfikacjami ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Funkcja Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) tworzy te dane wywołania.

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

Wiadomość polega tutaj na wywołaniu [funkcji `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) z następującymi parametrami:

| Parametr | Wartość                          | Znaczenie                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | Specjalna wartość oznaczająca ETH (które nie jest tokenem ERC-20) na L1                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Kontrakt L2, który zarządza ETH na Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (ten kontrakt jest przeznaczony wyłącznie do użytku wewnętrznego Optimism) |
| \_from    | \_from                         | Adres na L1, który wysyła ETH                                                                                                         |
| \_to      | \_to                           | Adres na L2, który odbiera ETH                                                                                                      |
| amount    | msg.value                      | Ilość wysłanych wei (które zostały już wysłane do mostu)                                                                               |
| \_data    | \_data                         | Dodatkowe dane do dołączenia do depozytu                                                                                                     |

```solidity
        // Wysyła dane wywołania do warstwy 2 (L2)
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Wysyła wiadomość przez komunikator międzydomenowy.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Emituje zdarzenie, aby poinformować każdą zdecentralizowaną aplikację (dapp), która nasłuchuje tego transferu.

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

Te dwie funkcje to wrappery wokół `_initiateERC20Deposit`, funkcji, która obsługuje właściwy depozyt ERC-20.

```solidity
    /**
     * @dev Wykonuje logikę dla depozytów poprzez poinformowanie kontraktu zdeponowanego tokena warstwy 2 (L2)
     * o depozycie i wywołanie handlera w celu zablokowania środków warstwy 1 (L1). (np. transferFrom)
     *
     * @param _l1Token Adres ERC-20 warstwy 1 (L1), który deponujemy
     * @param _l2Token Adres odpowiedniego ERC-20 warstwy 2 (L2) dla warstwy 1 (L1)
     * @param _from Konto, z którego ma zostać pobrany depozyt w warstwie 1 (L1)
     * @param _to Konto, któremu ma zostać przekazany depozyt w warstwie 2 (L2)
     * @param _amount Kwota ERC-20 do zdeponowania.
     * @param _l2Gas Limit gazu wymagany do ukończenia depozytu w warstwie 2 (L2).
     * @param _data Opcjonalne dane do przekazania do warstwy 2 (L2). Te dane są dostarczane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Poza wymuszaniem maksymalnej
     *        długości, te kontrakty nie dają żadnych gwarancji co do ich zawartości.
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
Pierwsza różnica polega na tym, że ta funkcja otrzymuje adresy tokenów i kwotę do transferu jako parametry.
W przypadku ETH wywołanie mostu obejmuje już transfer aktywa na konto mostu (`msg.value`).

```solidity
        // Kiedy depozyt jest inicjowany w warstwie 1 (L1), most warstwy 1 (L1) transferuje środki do siebie na poczet przyszłych
        // wypłat. safeTransferFrom sprawdza również, czy kontrakt posiada kod, więc to się nie powiedzie, jeśli
        // _from jest EOA lub address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Transfery tokenów ERC-20 przebiegają inaczej niż w przypadku ETH:

1. Użytkownik (`_from`) przyznaje mostowi limit wydatków na transfer odpowiednich tokenów.
2. Użytkownik wywołuje most z adresem kontraktu tokena, kwotą itp.
3. Most transferuje tokeny (do samego siebie) w ramach procesu depozytu.

Pierwszy krok może nastąpić w oddzielnej transakcji od dwóch ostatnich.
Jednak wyprzedzanie transakcji nie stanowi problemu, ponieważ dwie funkcje, które wywołują `_initiateERC20Deposit` (`depositERC20` i `depositERC20To`), wywołują tę funkcję tylko z `msg.sender` jako parametrem `_from`.

```solidity
        // Konstruuje dane wywołania dla _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Wysyła dane wywołania do warstwy 2 (L2)
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Dodaje zdeponowaną kwotę tokenów do struktury danych `deposits`.
Na L2 może istnieć wiele adresów odpowiadających temu samemu tokenowi ERC-20 na L1, więc użycie salda mostu dla tokena ERC-20 na L1 nie wystarczy do śledzenia depozytów.

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

Most L2 wysyła wiadomość do komunikatora międzydomenowego L2, co powoduje, że komunikator międzydomenowy L1 wywołuje tę funkcję (oczywiście po przesłaniu [transakcji finalizującej wiadomość](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) na L1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Upewnia się, że jest to _prawidłowa_ wiadomość, pochodząca z komunikatora międzydomenowego i mająca swoje źródło w moście tokenów L2.
Ta funkcja służy do wypłaty ETH z mostu, więc musimy upewnić się, że jest wywoływana tylko przez autoryzowanego wywołującego.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Sposobem na transfer ETH jest wywołanie odbiorcy z ilością wei w `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Emituje zdarzenie dotyczące wypłaty.

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

Aktualizuje strukturę danych `deposits`.

```solidity

        // Kiedy wypłata jest finalizowana w warstwie 1 (L1), most warstwy 1 (L1) transferuje środki do wypłacającego
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Tymczasowe - Migracja ETH *
     *****************************/

    /**
     * @dev Dodaje saldo ETH do konta. Ma to na celu umożliwienie migracji ETH
     * ze starej bramki do nowej bramki.
     * UWAGA: Zostaje to pozostawione tylko na jedną aktualizację, abyśmy mogli otrzymać zmigrowane ETH ze
     * starego kontraktu
     */
    function donateETH() external payable {}
}
```

Istniała wcześniejsza implementacja mostu.
Kiedy przeszliśmy z tamtej implementacji na tę, musieliśmy przenieść wszystkie aktywa.
Tokeny ERC-20 można po prostu przenieść.
Jednak aby przetransferować ETH do kontraktu, potrzebujesz zgody tego kontraktu, co właśnie zapewnia nam `donateETH`.

## Tokeny ERC-20 na L2 {#erc-20-tokens-on-l2}

Aby token ERC-20 pasował do standardowego mostu, musi pozwalać standardowemu mostowi, i _tylko_ standardowemu mostowi, na wybijanie tokenów.
Jest to konieczne, ponieważ mosty muszą zapewnić, że liczba tokenów w obiegu na Optimism jest równa liczbie tokenów zablokowanych wewnątrz kontraktu mostu L1.
Gdyby na L2 było zbyt wiele tokenów, niektórzy użytkownicy nie byliby w stanie przenieść swoich aktywów z powrotem przez most na L1.
Zamiast zaufanego mostu, w zasadzie odtworzylibyśmy [system rezerwy cząstkowej](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Gdyby na L1 było zbyt wiele tokenów, niektóre z nich pozostałyby zablokowane wewnątrz kontraktu mostu na zawsze, ponieważ nie ma sposobu na ich uwolnienie bez spalenia tokenów L2.

### IL2StandardERC20 {#il2standarderc20}

Każdy token ERC-20 na L2, który używa standardowego mostu, musi udostępniać [ten interfejs](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), który zawiera funkcje i zdarzenia potrzebne standardowemu mostowi.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Standardowy interfejs ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nie zawiera funkcji `mint` i `burn`.
Metody te nie są wymagane przez [standard ERC-20](https://eips.ethereum.org/EIPS/eip-20), który pozostawia nieokreślone mechanizmy tworzenia i niszczenia tokenów.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Interfejs ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) służy do określania, jakie funkcje udostępnia kontrakt.
[Standard można przeczytać tutaj](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Ta funkcja udostępnia adres tokena L1, który jest przenoszony przez most do tego kontraktu.
Należy zauważyć, że nie mamy podobnej funkcji w przeciwnym kierunku.
Musimy mieć możliwość przeniesienia przez most dowolnego tokena L1, niezależnie od tego, czy obsługa L2 była planowana podczas jego implementacji, czy nie.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funkcje i zdarzenia do wybijania (tworzenia) i spalania (niszczenia) tokenów.
Most powinien być jedynym podmiotem, który może uruchamiać te funkcje, aby zapewnić, że liczba tokenów jest prawidłowa (równa liczbie tokenów zablokowanych na L1).

### L2StandardERC20 {#l2standarderc20}

[To jest nasza implementacja interfejsu `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
O ile nie potrzebujesz jakiejś niestandardowej logiki, powinieneś użyć tej.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Kontrakt ERC-20 z OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism nie wierzy w wymyślanie koła na nowo, zwłaszcza gdy koło jest dobrze zbadane i musi być wystarczająco godne zaufania, aby przechowywać aktywa.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Są to dwa dodatkowe parametry konfiguracyjne, których wymagamy, a których ERC-20 normalnie nie wymaga.

```solidity

    /**
     * @param _l2Bridge Adres standardowego mostu warstwy 2 (L2).
     * @param _l1Token Adres odpowiedniego tokena warstwy 1 (L1).
     * @param _name Nazwa ERC-20.
     * @param _symbol Symbol ERC-20.
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

Najpierw wywołuje konstruktor dla kontraktu, po którym dziedziczymy (`ERC20(_name, _symbol)`), a następnie ustawia nasze własne zmienne.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
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

W ten sposób działa [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Każdy interfejs to zbiór obsługiwanych funkcji i jest identyfikowany jako [alternatywa wykluczająca (XOR)](https://en.wikipedia.org/wiki/Exclusive_or) [selektorów funkcji ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) tych funkcji.

Most L2 używa ERC-165 jako testu poprawności (sanity check), aby upewnić się, że kontrakt ERC-20, do którego wysyła aktywa, to `IL2StandardERC20`.

**Uwaga:** Nie ma nic, co powstrzymałoby złośliwy kontrakt przed udzielaniem fałszywych odpowiedzi na `supportsInterface`, więc jest to mechanizm testu poprawności, a _nie_ mechanizm bezpieczeństwa.

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

Tylko most L2 ma prawo wybijania i spalania aktywów.

`_mint` i `_burn` są w rzeczywistości zdefiniowane w [kontrakcie ERC-20 z OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Ten kontrakt po prostu nie udostępnia ich na zewnątrz, ponieważ warunki wybijania i spalania tokenów są tak zróżnicowane, jak liczba sposobów wykorzystania ERC-20.

## Kod mostu L2 {#l2-bridge-code}

To jest kod, który uruchamia most na Optimism.
[Kod źródłowy tego kontraktu znajduje się tutaj](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Importy interfejsów */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Interfejs [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) jest bardzo podobny do [odpowiednika L1](#il1erc20bridge), który widzieliśmy powyżej.
Istnieją dwie istotne różnice:

1. Na L1 inicjujesz depozyty i finalizujesz wypłaty.
   Tutaj inicjujesz wypłaty i finalizujesz depozyty.
2. Na L1 konieczne jest rozróżnienie między ETH a tokenami ERC-20.
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
 * @dev Standardowy most warstwy 2 (L2) to kontrakt, który współpracuje ze standardowym mostem warstwy 1 (L1), aby
 * umożliwić przejścia ETH i ERC-20 między warstwą 1 (L1) a warstwą 2 (L2).
 * Ten kontrakt działa jako wybijający nowe tokeny, gdy dowiaduje się o depozytach w standardowym moście
 * warstwy 1 (L1).
 * Ten kontrakt działa również jako spalający tokeny przeznaczone do wypłaty, informując most
 * warstwy 1 (L1) o konieczności uwolnienia środków warstwy 1 (L1).
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Referencje do zewnętrznych kontraktów *
     ********************************/

    address public l1TokenBridge;
```

Śledzi adres mostu L1.
Należy zauważyć, że w przeciwieństwie do odpowiednika L1, tutaj _potrzebujemy_ tej zmiennej.
Adres mostu L1 nie jest znany z góry.

```solidity

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Komunikator międzydomenowy używany przez ten kontrakt.
     * @param _l1TokenBridge Adres mostu warstwy 1 (L1) wdrożonego w głównym łańcuchu.
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
Należy zauważyć, że nie ma potrzeby określania adresu tokena L1.
Oczekuje się, że tokeny L2 podadzą nam adres odpowiednika L1.

```solidity

    /**
     * @dev Wykonuje logikę dla wypłat poprzez spalenie tokena i poinformowanie
     *      bramki tokena warstwy 1 (L1) o wypłacie.
     * @param _l2Token Adres tokena warstwy 2 (L2), gdzie inicjowana jest wypłata.
     * @param _from Konto, z którego ma zostać pobrana wypłata w warstwie 2 (L2).
     * @param _to Konto, któremu ma zostać przekazana wypłata w warstwie 1 (L1).
     * @param _amount Kwota tokena do wypłaty.
     * @param _l1Gas Nieużywane, ale dołączone ze względu na potencjalną kompatybilność w przyszłości.
     * @param _data Opcjonalne dane do przekazania do warstwy 1 (L1). Te dane są dostarczane
     *        wyłącznie dla wygody zewnętrznych kontraktów. Poza wymuszaniem maksymalnej
     *        długości, te kontrakty nie dają żadnych gwarancji co do ich zawartości.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Kiedy wypłata jest inicjowana, spalamy środki wypłacającego, aby zapobiec późniejszemu
        // użyciu w warstwie 2 (L2)
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Zauważ, że _nie_ polegamy na parametrze `_from`, ale na `msg.sender`, który jest znacznie trudniejszy do sfałszowania (niemożliwy, o ile mi wiadomo).

```solidity

        // Konstruuje dane wywołania dla l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Na L1 konieczne jest rozróżnienie między ETH a ERC-20.

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

        // Wysyła wiadomość w górę do mostu warstwy 1 (L1)
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

Upewnia się, że źródło wiadomości jest prawidłowe.
Jest to ważne, ponieważ ta funkcja wywołuje `_mint` i mogłaby zostać użyta do przyznania tokenów, które nie mają pokrycia w tokenach posiadanych przez most na L1.

```solidity
        // Sprawdza, czy docelowy token jest zgodny i
        // weryfikuje, czy zdeponowany token w warstwie 1 (L1) pasuje do reprezentacji zdeponowanego tokena w warstwie 2 (L2) tutaj
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Testy poprawności (sanity checks):

1. Obsługiwany jest poprawny interfejs
2. Adres L1 kontraktu ERC-20 na L2 pasuje do źródła tokenów na L1

```solidity
        ) {
            // Kiedy depozyt jest finalizowany, uznajemy konto w warstwie 2 (L2) tą samą kwotą
            // tokenów.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Jeśli testy poprawności zakończą się pomyślnie, finalizuje depozyt:

1. Wybija tokeny
2. Emituje odpowiednie zdarzenie

```solidity
        } else {
            // Albo token warstwy 2 (L2), do którego dokonywany jest depozyt, nie zgadza się co do poprawnego adresu
            // swojego tokena warstwy 1 (L1), albo nie obsługuje poprawnego interfejsu.
            // Powinno to mieć miejsce tylko wtedy, gdy istnieje złośliwy token warstwy 2 (L2), lub jeśli użytkownik w jakiś sposób
            // określił zły adres tokena warstwy 2 (L2) do zdeponowania.
            // W obu przypadkach zatrzymujemy proces tutaj i konstruujemy wiadomość
            // wypłaty, aby użytkownicy mogli w niektórych przypadkach odzyskać swoje środki.
            // Nie ma sposobu, aby całkowicie zapobiec złośliwym kontraktom tokenów, ale to ogranicza
            // błędy użytkowników i łagodzi niektóre formy złośliwego zachowania kontraktów.
```

Jeśli użytkownik popełnił wykrywalny błąd, używając niewłaściwego adresu tokena L2, chcemy anulować depozyt i zwrócić tokeny na L1.
Jedynym sposobem, w jaki możemy to zrobić z L2, jest wysłanie wiadomości, która będzie musiała odczekać okres kwestionowania błędów, ale jest to znacznie lepsze dla użytkownika niż trwała utrata tokenów.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // zamieniono tutaj _to i _from, aby odesłać depozyt z powrotem do nadawcy
                _from,
                _amount,
                _data
            );

            // Wysyła wiadomość w górę do mostu warstwy 1 (L1)
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Podsumowanie {#conclusion}

Standardowy most to najbardziej elastyczny mechanizm transferu aktywów.
Jednak ze względu na to, że jest tak ogólny, nie zawsze jest najłatwiejszym mechanizmem w użyciu.
Szczególnie w przypadku wypłat większość użytkowników woli korzystać z [mostów stron trzecich](https://optimism.io/apps#bridge), które nie czekają na okres kwestionowania i nie wymagają dowodu Merkle'a do sfinalizowania wypłaty.

Mosty te zazwyczaj działają w ten sposób, że posiadają aktywa na L1, które udostępniają natychmiast za niewielką opłatą (często mniejszą niż koszt gazu dla standardowej wypłaty z mostu).
Kiedy most (lub osoby nim zarządzające) przewiduje, że zabraknie mu aktywów na L1, transferuje wystarczającą ilość aktywów z L2. Ponieważ są to bardzo duże wypłaty, koszt wypłaty jest amortyzowany na dużą kwotę i stanowi znacznie mniejszy procent.

Mamy nadzieję, że ten artykuł pomógł Ci lepiej zrozumieć, jak działa warstwa 2 i jak pisać kod w Solidity, który jest przejrzysty i bezpieczny.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).
