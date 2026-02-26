---
title: "Kilka sztuczek używanych przez scamerskie tokeny i jak je wykryć"
description: "W tym samouczku przeanalizujemy scamerski token, aby zobaczyć niektóre sztuczki stosowane przez oszustów, jak je wdrażają i jak możemy je wykrywać."
author: Ori Pomerantz
tags:
  [
    "scam",
    "solidity",
    "erc-20",
    "JavaScript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: pl
---

W tym samouczku przeanalizujemy [scamerski token](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), aby zobaczyć niektóre sztuczki stosowane przez oszustów i jak je wdrażają. Pod koniec samouczka będziesz mieć bardziej kompleksowy pogląd na kontrakty tokenów ERC-20, ich możliwości i dlaczego sceptycyzm jest konieczny. Następnie przyjrzymy się zdarzeniom emitowanym przez ten scamerski token i zobaczymy, jak możemy automatycznie zidentyfikować, że nie jest on wiarygodny.

## Scamerskie tokeny – czym są, dlaczego ludzie je tworzą i jak ich unikać {#scam-tokens}

Jednym z najczęstszych zastosowań Ethereum jest tworzenie przez grupę wymienialnych tokenów, w pewnym sensie własnej waluty. Jednak wszędzie tam, gdzie istnieją uzasadnione przypadki użycia, które przynoszą wartość, są też przestępcy, którzy próbują ukraść tę wartość dla siebie.

Możesz przeczytać więcej na ten temat [w innym miejscu na ethereum.org](/guides/how-to-id-scam-tokens/) z perspektywy użytkownika. Ten samouczek skupia się na analizie scamerskiego tokena, aby zobaczyć, jak to się robi i jak można go wykryć.

### Skąd mam wiedzieć, że wARB to oszustwo? {#warb-scam}

Token, który analizujemy to [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), który udaje, że jest odpowiednikiem legalnego [tokena ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Najprostszym sposobem, aby dowiedzieć się, który token jest legalny, jest spojrzenie na organizację, która go stworzyła, [Arbitrum](https://arbitrum.foundation/). Legalne adresy są określone [w ich dokumentacji](https://docs.arbitrum.foundation/deployment-addresses#token).

### Dlaczego kod źródłowy jest dostępny? {#why-source}

Zwykle spodziewalibyśmy się, że ludzie, którzy próbują oszukiwać innych, będą skryci, i rzeczywiście, wiele scamerskich tokenów nie ma dostępnego swojego kodu (na przykład, [ten](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) i [ten](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Jednakże, legalne tokeny zwykle publikują swój kod źródłowy, więc aby wyglądać na legalne, autorzy scamerskich tokenów czasami robią to samo. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) jest jednym z tych tokenów z dostępnym kodem źródłowym, co ułatwia jego zrozumienie.

Podczas gdy wdrażający kontrakty mogą wybrać, czy opublikować kod źródłowy, czy nie, to _nie mogą_ opublikować niewłaściwego kodu źródłowego. Eksplorator bloków niezależnie kompiluje dostarczony kod źródłowy, i jeśli nie uzyska dokładnie tego samego kodu bajtowego, odrzuca ten kod źródłowy. [Możesz przeczytać więcej na ten temat na stronie Etherscan](https://etherscan.io/verifyContract).

## Porównanie z legalnymi tokenami ERC-20 {#compare-legit-erc20}

Porównamy ten token z legalnymi tokenami ERC-20. Jeśli nie znasz sposobu, w jaki zazwyczaj pisane są legalne tokeny ERC-20, [zobacz ten samouczek](/developers/tutorials/erc20-annotated-code/).

### Stałe dla uprzywilejowanych adresów {#constants-for-privileged-addresses}

Kontrakty czasami potrzebują uprzywilejowanych adresów. Kontrakty, które są zaprojektowane do długotrwałego użytku, pozwalają pewnym uprzywilejowanym adresom na zmianę tych adresów, na przykład, aby umożliwić korzystanie z nowego kontraktu multisig. Istnieje kilka sposobów na zrobienie tego.

Kontrakt tokena [`HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) używa wzorca [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Uprzywilejowany adres jest przechowywany w pamięci masowej, w polu o nazwie `_owner` (zobacz trzeci plik, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Kontrakt tokena [`ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) nie ma bezpośrednio uprzywilejowanego adresu. Jednakże nie potrzebuje go. Znajduje się za [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) pod [adresem `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Ten kontrakt ma uprzywilejowany adres (zobacz czwarty plik, `ERC1967Upgrade.sol`), który może być używany do aktualizacji.

```solidity
    /**
     * @dev Przechowuje nowy adres w slocie administratora EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

W przeciwieństwie do tego, kontrakt `wARB` ma na stałe zakodowanego `contract_owner`.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Ten właściciel kontraktu](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) nie jest kontraktem, który mógłby być kontrolowany przez różne konta w różnym czasie, ale [kontem zarządzanym zewnętrznie](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Oznacza to, że jest prawdopodobnie przeznaczony do krótkotrwałego użytku przez jedną osobę, a nie jako długoterminowe rozwiązanie do kontrolowania ERC-20, które pozostanie cenne.

I rzeczywiście, jeśli spojrzymy na Etherscan, zobaczymy, że oszust używał tego kontraktu tylko przez 12 godzin ([pierwsza transakcja](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) do [ostatniej transakcji](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) w dniu 19 maja 2023 r.

### Fałszywa funkcja `_transfer` {#the-fake-transfer-function}

Standardem jest, że faktyczne transfery odbywają się przy użyciu [wewnętrznej funkcji `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

W `wARB` ta funkcja wygląda na prawie legalną:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer z adresu zerowego");
        require(recipient != address(0), "ERC20: transfer na adres zerowy");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: kwota transferu przekracza saldo");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Podejrzana część to:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Jeśli właściciel kontraktu wysyła tokeny, dlaczego zdarzenie `Transfer` pokazuje, że pochodzą one od `deployer`?

Jest jednak ważniejsza kwestia. Kto wywołuje tę funkcję `_transfer`? Nie można jej wywołać z zewnątrz, jest oznaczona jako `internal`. A kod, który mamy, nie zawiera żadnych wywołań `_transfer`. Oczywiście jest to tylko przynęta.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: kwota transferu przekracza przydział"));
        return true;
    }
```

Gdy przyjrzymy się funkcjom wywoływanym w celu transferu tokenów, `transfer` i `transferFrom`, widzimy, że wywołują one zupełnie inną funkcję, `_f_`.

### Prawdziwa funkcja `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer z adresu zerowego");
        require(recipient != address(0), "ERC20: transfer na adres zerowy");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: kwota transferu przekracza saldo");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

W tej funkcji są dwa potencjalne sygnały ostrzegawcze.

- Użycie [modyfikatora funkcji](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Jednak gdy spojrzymy w kod źródłowy, zobaczymy, że `_mod_` jest w rzeczywistości nieszkodliwy.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Ten sam problem, który widzieliśmy w `_transfer`, czyli gdy `contract_owner` wysyła tokeny, wydaje się, że pochodzą one z `deployer`.

### Fałszywa funkcja zdarzeń `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Teraz dochodzimy do czegoś, co wygląda jak prawdziwe oszustwo. Edytowałem funkcję dla większej czytelności, ale jest ona funkcjonalnie równoważna.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Ta funkcja ma modyfikator `auth()`, co oznacza, że może być wywołana tylko przez właściciela kontraktu.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Brak pozwolenia na interakcję");
    _;
}
```

To ograniczenie ma sens, ponieważ nie chcielibyśmy, aby przypadkowe konta dystrybuowały tokeny. Jednak reszta funkcji jest podejrzana.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Funkcja transferu z konta puli do tablicy odbiorców tablicy kwot ma sens. Istnieje wiele przypadków użycia, w których będziesz chciał dystrybuować tokeny z jednego źródła do wielu miejsc docelowych, takich jak listy płac, airdropy itp. Jest to tańsze (w gazie) do wykonania w jednej transakcji zamiast emitowania wielu transakcji lub nawet wielokrotnego wywoływania ERC-20 z innego kontraktu w ramach tej samej transakcji.

Jednak `dropNewTokens` tego nie robi. Emituje [zdarzenia `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), ale tak naprawdę nie transferuje żadnych tokenów. Nie ma żadnego uzasadnionego powodu, aby wprowadzać w błąd aplikacje offchain, informując je o transferze, który tak naprawdę nie miał miejsca.

### Funkcja `Approve` do spalania {#the-burning-approve-function}

Kontrakty ERC-20 powinny mieć [funkcję `approve`](/developers/tutorials/erc20-annotated-code/#approve) dla przydziałów i rzeczywiście, nasz scamerski token ma taką funkcję, a nawet jest ona poprawna. Jednakże, ponieważ Solidity wywodzi się z C, wielkość liter ma znaczenie. "Approve" i "approve" to różne ciągi znaków.

Ponadto funkcjonalność nie jest związana z `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Ta funkcja jest wywoływana z tablicą adresów posiadaczy tokena.

```solidity
    public approver() {
```

Modyfikator `approver()` zapewnia, że tylko `contract_owner` może wywołać tę funkcję (zobacz poniżej).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: spalana kwota przekracza saldo");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Dla każdego adresu posiadacza funkcja przenosi całe saldo posiadacza na adres `0x00...01`, skutecznie je spalając (rzeczywiste `spalenie` w standardzie zmienia również całkowitą podaż i transferuje tokeny do `0x00...00`). Oznacza to, że `contract_owner` może usunąć aktywa dowolnego użytkownika. Nie wydaje się to funkcją, którą chciałbyś mieć w tokenie zarządzania.

### Problemy z jakością kodu {#code-quality-issues}

Te problemy z jakością kodu nie _udowadniają_, że ten kod jest oszustwem, ale sprawiają, że wydaje się on podejrzany. Zorganizowane firmy, takie jak Arbitrum, zwykle nie wydają tak złego kodu.

#### Funkcja `mount` {#the-mount-function}

Chociaż nie jest to określone w [standardzie](https://eips.ethereum.org/EIPS/eip-20), ogólnie rzecz biorąc, funkcja, która tworzy nowe tokeny, nazywa się [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Jeśli spojrzymy na konstruktor `wARB`, zobaczymy, że funkcja mintowania została z jakiegoś powodu przemianowana na `mount` i jest wywoływana pięć razy z jedną piątą początkowej podaży, zamiast raz dla całej kwoty dla wydajności.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

Sama funkcja `mount` jest również podejrzana.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mintowanie na adres zerowy");
```

Patrząc na `require`, widzimy, że tylko właściciel kontraktu może mintować. To jest legalne. Ale komunikat o błędzie powinien brzmieć _tylko właściciel może mintować_ lub coś w tym rodzaju. Zamiast tego jest to nieistotne _ERC20: mintowanie na adres zerowy_. Prawidłowy test mintowania na adres zerowy to `require(account != address(0), "<komunikat błędu>")`, czego kontrakt nigdy nie sprawdza.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Istnieją jeszcze dwa podejrzane fakty, bezpośrednio związane z mintowaniem:

- Istnieje parametr `account`, który jest przypuszczalnie kontem, które powinno otrzymać z-mintowaną kwotę. Ale saldo, które wzrasta, należy w rzeczywistości do `contract_owner`.

- Podczas gdy zwiększone saldo należy do `contract_owner`, emitowane zdarzenie pokazuje transfer na `account`.

### Po co zarówno `auth`, jak i `approver`? Po co `mod`, który nic nie robi? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Ten kontrakt zawiera trzy modyfikatory: `_mod_`, `auth` i `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` przyjmuje trzy parametry i nic z nimi nie robi. Po co on jest?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Brak pozwolenia na interakcję");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Brak pozwolenia na interakcję");
        _;
    }
```

`auth` i `approver` mają więcej sensu, ponieważ sprawdzają, czy kontrakt został wywołany przez `contract_owner`. Spodziewalibyśmy się, że pewne uprzywilejowane działania, takie jak mintowanie, będą ograniczone do tego konta. Jednak jaki jest sens posiadania dwóch oddzielnych funkcji, które robią _dokładnie to samo_?

## Co możemy wykryć automatycznie? {#what-can-we-detect-automatically}

Możemy zobaczyć, że `wARB` jest scamerskim tokenem, patrząc na Etherscan. Jest to jednak scentralizowane rozwiązanie. W teorii Etherscan mógłby zostać obalony lub zhakowany. Lepiej jest być w stanie samodzielnie ocenić, czy token jest legalny, czy nie.

Istnieją pewne sztuczki, których możemy użyć, aby zidentyfikować, że token ERC-20 jest podejrzany (albo jest to oszustwo, albo jest bardzo źle napisany), patrząc na emitowane przez niego zdarzenia.

## Podejrzane zdarzenia `Approval` {#suspicious-approval-events}

[Zdarzenia `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) powinny mieć miejsce tylko na bezpośrednie żądanie (w przeciwieństwie do [zdarzeń `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), które mogą mieć miejsce w wyniku przydziału). [Zobacz dokumentację Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin), aby uzyskać szczegółowe wyjaśnienie tego problemu i dlaczego żądania muszą być bezpośrednie, a nie za pośrednictwem kontraktu.

Oznacza to, że zdarzenia `Approval` zatwierdzające wydatki z [konta zarządzanego zewnętrznie](/developers/docs/accounts/#types-of-account) muszą pochodzić z transakcji, które pochodzą z tego konta i których miejscem docelowym jest kontrakt ERC-20. Każdy inny rodzaj zatwierdzenia z konta zarządzanego zewnętrznie jest podejrzany.

Oto [program, który identyfikuje tego rodzaju zdarzenia](https://github.com/qbzzt/20230915-scam-token-detection), używając [viem](https://viem.sh/) i [TypeScript](https://www.typescriptlang.org/docs/), wariantu JavaScript z bezpieczeństwem typów. Aby go uruchomić:

1. Skopiuj `.env.example` do `.env`.
2. Edytuj `.env`, aby podać adres URL do węzła sieci głównej Ethereum.
3. Uruchom `pnpm install`, aby zainstalować niezbędne pakiety.
4. Uruchom `pnpm susApproval`, aby wyszukać podejrzane zatwierdzenia.

Oto wyjaśnienie linijka po linijce:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Importuj definicje typów, funkcje i definicję łańcucha z `viem`.

```typescript
import { config } from "dotenv"
config()
```

Odczytaj `.env`, aby uzyskać adres URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Utwórz klienta Viem. Musimy tylko odczytywać z blockchainu, więc ten klient nie potrzebuje klucza prywatnego.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Adres podejrzanego kontraktu ERC-20 i bloki, w których będziemy szukać zdarzeń. Dostawcy węzłów zazwyczaj ograniczają naszą zdolność do odczytywania zdarzeń, ponieważ przepustowość może być kosztowna. Na szczęście `wARB` nie był używany przez osiemnaście godzin, więc możemy szukać wszystkich zdarzeń (w sumie było ich tylko 13).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

W ten sposób prosi się Viem o informacje o zdarzeniach. Gdy podamy mu dokładną sygnaturę zdarzenia, w tym nazwy pól, parser przetwarza dla nas zdarzenie.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Nasz algorytm ma zastosowanie tylko do kont zarządzanych zewnętrznie. Jeśli `client.getBytecode` zwróci jakikolwiek kod bajtowy, oznacza to, że jest to kontrakt i powinniśmy go po prostu pominąć.

Jeśli nie używałeś wcześniej TypeScript, definicja funkcji może wyglądać nieco dziwnie. Nie tylko mówimy mu, że pierwszy (i jedyny) parametr nazywa się `addr`, ale także, że jest typu `Address`. Podobnie, część `: boolean` mówi TypeScript, że wartość zwracana przez funkcję jest typu boolean.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Ta funkcja pobiera potwierdzenie transakcji ze zdarzenia. Potrzebujemy potwierdzenia, aby upewnić się, że znamy miejsce docelowe transakcji.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

To jest najważniejsza funkcja, ta, która faktycznie decyduje, czy zdarzenie jest podejrzane, czy nie. Typ zwrotny, `(Event | null)`, informuje TypeScript, że ta funkcja może zwrócić `Event` lub `null`. Zwracamy `null`, jeśli zdarzenie nie jest podejrzane.

```typescript
const owner = ev.args._owner
```

Viem ma nazwy pól, więc przetworzył dla nas zdarzenie. `_owner` jest właścicielem tokenów do wydania.

```typescript
// Zatwierdzenia przez kontrakty nie są podejrzane
if (await isContract(owner)) return null
```

Jeśli właścicielem jest kontrakt, załóż, że to zatwierdzenie nie jest podejrzane. Aby sprawdzić, czy zatwierdzenie kontraktu jest podejrzane, czy nie, musimy prześledzić pełne wykonanie transakcji, aby zobaczyć, czy kiedykolwiek dotarła ona do kontraktu właściciela i czy ten kontrakt wywołał bezpośrednio kontrakt ERC-20. Jest to znacznie bardziej zasobochłonne, niż chcielibyśmy.

```typescript
const txn = await getEventTxn(ev)
```

Jeśli zatwierdzenie pochodzi z konta zarządzanego zewnętrznie, pobierz transakcję, która je spowodowała.

```typescript
// Zatwierdzenie jest podejrzane, jeśli pochodzi od właściciela EOA, który nie jest `from` transakcji
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Nie możemy po prostu sprawdzić równości ciągów znaków, ponieważ adresy są szesnastkowe, więc zawierają litery. Czasami, na przykład w `txn.from`, wszystkie te litery są małe. W innych przypadkach, takich jak `ev.args._owner`, adres ma [mieszaną wielkość liter do identyfikacji błędów](https://eips.ethereum.org/EIPS/eip-55).

Ale jeśli transakcja nie pochodzi od właściciela, a ten właściciel jest zarządzany zewnętrznie, to mamy podejrzaną transakcję.

```typescript
// Jest to również podejrzane, jeśli miejscem docelowym transakcji nie jest badany przez nas
// kontrakt ERC-20
if (txn.to.toLowerCase() != testedAddress) return ev
```

Podobnie, jeśli adres `to` transakcji, czyli pierwszy wywołany kontrakt, nie jest badanym kontraktem ERC-20, jest to podejrzane.

```typescript
    // Jeśli nie ma powodu do podejrzeń, zwróć null.
    return null
}
```

Jeśli żaden z warunków nie jest prawdziwy, zdarzenie `Approval` nie jest podejrzane.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Funkcja `async`](https://www.w3schools.com/js/js_async.asp) zwraca obiekt `Promise`. Przy użyciu popularnej składni `await x()` czekamy na spełnienie `Promise` przed kontynuowaniem przetwarzania. Jest to proste do zaprogramowania i śledzenia, ale jest również nieefektywne. Podczas gdy czekamy na spełnienie `Promise` dla określonego zdarzenia, możemy już pracować nad następnym zdarzeniem.

Tutaj używamy [`map`](https://www.w3schools.com/jsref/jsref_map.asp), aby utworzyć tablicę obiektów `Promise`. Następnie używamy [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/), aby poczekać na rozwiązanie wszystkich tych obietnic. Następnie [`filtrujemy`](https://www.w3schools.com/jsref/jsref_filter.asp) te wyniki, aby usunąć niepodejrzane zdarzenia.

### Podejrzane zdarzenia `Transfer` {#suspicious-transfer-events}

Innym możliwym sposobem identyfikacji scamerskich tokenów jest sprawdzenie, czy mają jakieś podejrzane transfery. Na przykład transfery z kont, które nie mają tak wielu tokenów. Możesz zobaczyć, [jak zaimplementować ten test](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), ale `wARB` nie ma tego problemu.

## Wnioski {#conclusion}

Automatyczne wykrywanie oszustw ERC-20 cierpi z powodu [fałszywie negatywnych wyników](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), ponieważ oszustwo może wykorzystywać całkowicie normalny kontrakt tokena ERC-20, który po prostu nie reprezentuje niczego prawdziwego. Dlatego zawsze powinieneś próbować _uzyskać adres tokena z zaufanego źródła_.

Automatyczne wykrywanie może pomóc w niektórych przypadkach, takich jak elementy DeFi, gdzie jest wiele tokenów i muszą być one obsługiwane automatycznie. Ale jak zawsze [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), przeprowadzaj własne badania i zachęcaj swoich użytkowników do tego samego.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).
