---
title: "Niektóre sztuczki stosowane przez fałszywe tokeny i jak je wykryć"
description: "W tym samouczku analizujemy fałszywy token, aby zobaczyć niektóre sztuczki stosowane przez oszustów, sposób ich implementacji oraz jak możemy je wykryć."
author: Ori Pomerantz
tags: ["oszustwo", "Solidity", "erc-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: "Sztuczki fałszywych tokenów"
published: 2023-09-15
lang: pl
---

W tym samouczku analizujemy [fałszywy token](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), aby zobaczyć niektóre sztuczki stosowane przez oszustów i sposób ich implementacji. Pod koniec tego samouczka będziesz mieć pełniejszy obraz kontraktów tokenów ERC-20, ich możliwości oraz powodów, dla których sceptycyzm jest niezbędny. Następnie przyjrzymy się zdarzeniom emitowanym przez ten fałszywy token i zobaczymy, jak możemy automatycznie zidentyfikować, że nie jest on autentyczny.

## Fałszywe tokeny – czym są, dlaczego ludzie je tworzą i jak ich unikać {#scam-tokens}

Jednym z najczęstszych zastosowań Ethereum jest tworzenie przez grupę zbywalnego tokena, w pewnym sensie własnej waluty. Jednak wszędzie tam, gdzie istnieją uzasadnione przypadki użycia przynoszące wartość, pojawiają się również przestępcy, którzy próbują ukraść tę wartość dla siebie.

Więcej na ten temat z perspektywy użytkownika możesz przeczytać [w innym miejscu na ethereum.org](/guides/how-to-id-scam-tokens/). Ten samouczek skupia się na analizie fałszywego tokena, aby zobaczyć, jak to się robi i jak można to wykryć.

### Skąd mam wiedzieć, że wARB to oszustwo? {#warb-scam}

Token, który analizujemy, to [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), który udaje odpowiednik autentycznego [tokena ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Najprostszym sposobem, aby dowiedzieć się, który token jest autentyczny, jest spojrzenie na organizację, z której pochodzi, czyli [Arbitrum](https://arbitrum.foundation/). Prawdziwe adresy są określone [w ich dokumentacji](https://docs.arbitrum.foundation/deployment-addresses#token).

### Dlaczego kod źródłowy jest dostępny? {#why-source}

Zazwyczaj spodziewalibyśmy się, że osoby próbujące oszukać innych będą działać w tajemnicy, i rzeczywiście wiele fałszywych tokenów nie udostępnia swojego kodu (na przykład [ten](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) i [ten](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Jednak autentyczne tokeny zazwyczaj publikują swój kod źródłowy, więc aby wyglądać na legalne, autorzy fałszywych tokenów czasami robią to samo. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) jest jednym z tych tokenów z dostępnym kodem źródłowym, co ułatwia jego zrozumienie.

Chociaż osoby wdrażające kontrakt mogą zdecydować, czy opublikować kod źródłowy, czy nie, _nie mogą_ opublikować błędnego kodu źródłowego. Eksplorator bloków niezależnie kompiluje dostarczony kod źródłowy, a jeśli nie uzyska dokładnie takiego samego kodu bajtowego, odrzuca ten kod źródłowy. [Więcej na ten temat możesz przeczytać na stronie Etherscan](https://etherscan.io/verifyContract).

## Porównanie z autentycznymi tokenami ERC-20 {#compare-legit-erc20}

Porównamy ten token z autentycznymi tokenami ERC-20. Jeśli nie wiesz, jak zazwyczaj pisane są autentyczne tokeny ERC-20, [zapoznaj się z tym samouczkiem](/developers/tutorials/erc20-annotated-code/).

### Stałe dla uprzywilejowanych adresów {#constants-for-privileged-addresses}

Kontrakty czasami potrzebują uprzywilejowanych adresów. Kontrakty zaprojektowane do długoterminowego użytku pozwalają pewnemu uprzywilejowanemu adresowi na zmianę tych adresów, na przykład w celu umożliwienia korzystania z nowego kontraktu multisig. Istnieje kilka sposobów, aby to zrobić.

Kontrakt tokena [`HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) wykorzystuje wzorzec [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Uprzywilejowany adres jest przechowywany w pamięci, w polu o nazwie `_owner` (zobacz trzeci plik, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Kontrakt tokena [`ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) nie ma bezpośrednio uprzywilejowanego adresu. Jednakże nie potrzebuje go. Znajduje się za [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) pod [adresem `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Ten kontrakt ma uprzywilejowany adres (zobacz czwarty plik, `ERC1967Upgrade.sol`), który może być użyty do aktualizacji.

```solidity
    /**
     * @dev Zapisuje nowy adres w slocie admina EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

W przeciwieństwie do tego, kontrakt `wARB` ma zakodowany na stałe `contract_owner`.

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

[Ten właściciel kontraktu](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) nie jest kontraktem, który mógłby być kontrolowany przez różne konta w różnym czasie, ale [kontem zewnętrznym](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Oznacza to, że prawdopodobnie został zaprojektowany do krótkoterminowego użytku przez osobę fizyczną, a nie jako długoterminowe rozwiązanie do kontrolowania tokena ERC-20, który zachowa swoją wartość.

I rzeczywiście, jeśli spojrzymy na Etherscan, zobaczymy, że oszust używał tego kontraktu tylko przez 12 godzin (od [pierwszej transakcji](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) do [ostatniej transakcji](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) w dniu 19 maja 2023 r.

### Fałszywa funkcja `_transfer` {#the-fake-transfer-function}

Standardem jest, że rzeczywiste transfery odbywają się za pomocą [wewnętrznej funkcji `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

W `wARB` ta funkcja wygląda prawie na autentyczną:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
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

Jeśli właściciel kontraktu wysyła tokeny, dlaczego zdarzenie `Transfer` pokazuje, że pochodzą one z `deployer`?

Istnieje jednak ważniejszy problem. Kto wywołuje tę funkcję `_transfer`? Nie można jej wywołać z zewnątrz, jest oznaczona jako `internal`. A kod, który posiadamy, nie zawiera żadnych wywołań `_transfer`. Wyraźnie widać, że jest tu jako zmyłka.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Kiedy spojrzymy na funkcje wywoływane w celu transferu tokenów, `transfer` i `transferFrom`, widzimy, że wywołują one zupełnie inną funkcję, `_f_`.

### Prawdziwa funkcja `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

W tej funkcji znajdują się dwie potencjalne czerwone flagi.

- Użycie [modyfikatora funkcji](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Jednak gdy zagłębimy się w kod źródłowy, zobaczymy, że `_mod_` jest w rzeczywistości nieszkodliwy.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Ten sam problem, który widzieliśmy w `_transfer`, polegający na tym, że gdy `contract_owner` wysyła tokeny, wydają się one pochodzić z `deployer`.

### Fałszywa funkcja zdarzeń `dropNewTokens` {#the-fake-events-function-dropnewtokens}

Teraz przechodzimy do czegoś, co wygląda na prawdziwe oszustwo. Nieco edytowałem tę funkcję dla czytelności, ale jest ona funkcjonalnie równoważna.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Ta funkcja ma modyfikator `auth()`, co oznacza, że może być wywołana tylko przez właściciela kontraktu.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

To ograniczenie ma całkowity sens, ponieważ nie chcielibyśmy, aby przypadkowe konta dystrybuowały tokeny. Jednak reszta funkcji jest podejrzana.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Funkcja transferu z konta puli do tablicy odbiorców tablicy kwot ma całkowity sens. Istnieje wiele przypadków użycia, w których będziesz chciał dystrybuować tokeny z jednego źródła do wielu miejsc docelowych, takich jak listy płac, airdropy itp. Jest to tańsze (w gazie) do wykonania w jednej transakcji zamiast wydawania wielu transakcji, a nawet wielokrotnego wywoływania ERC-20 z innego kontraktu w ramach tej samej transakcji.

Jednak `dropNewTokens` tego nie robi. Emituje [zdarzenia `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), ale w rzeczywistości nie wykonuje transferu żadnych tokenów. Nie ma uzasadnionego powodu, aby wprowadzać w błąd aplikacje pozałańcuchowe, informując je o transferze, który w rzeczywistości nie miał miejsca.

### Funkcja spalania `Approve` {#the-burning-approve-function}

Kontrakty ERC-20 powinny mieć [funkcję `approve`](/developers/tutorials/erc20-annotated-code/#approve) dla limitów wydatków, i rzeczywiście nasz fałszywy token ma taką funkcję, a nawet jest ona poprawna. Jednak ponieważ Solidity wywodzi się z C, wielkość liter ma znaczenie. „Approve” i „approve” to różne ciągi znaków.

Ponadto funkcjonalność ta nie jest związana z `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Ta funkcja jest wywoływana z tablicą adresów posiadaczy tokena.

```solidity
    public approver() {
```

Modyfikator `approver()` upewnia się, że tylko `contract_owner` ma prawo wywołać tę funkcję (zobacz poniżej).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Dla każdego adresu posiadacza funkcja przenosi całe saldo posiadacza na adres `0x00...01`, skutecznie je spalając (rzeczywiste `burn` w standardzie zmienia również całkowitą podaż i transferuje tokeny na `0x00...00`). Oznacza to, że `contract_owner` może usunąć aktywa dowolnego użytkownika. Nie wydaje się to funkcją, której oczekiwałbyś w tokenie zarządzania.

### Problemy z jakością kodu {#code-quality-issues}

Te problemy z jakością kodu nie _dowodzą_, że ten kod to oszustwo, ale sprawiają, że wydaje się on podejrzany. Zorganizowane firmy, takie jak Arbitrum, zazwyczaj nie wypuszczają tak złego kodu.

#### Funkcja `mount` {#the-mount-function}

Chociaż nie jest to określone w [standardzie](https://eips.ethereum.org/EIPS/eip-20), ogólnie rzecz biorąc, funkcja tworząca nowe tokeny nazywa się [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Jeśli spojrzymy na konstruktor `wARB`, zobaczymy, że funkcja wybijania została z jakiegoś powodu przemianowana na `mount` i jest wywoływana pięć razy z jedną piątą początkowej podaży, zamiast raz dla całej kwoty w celu zwiększenia wydajności.

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

Sama funkcja `mount` również jest podejrzana.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Patrząc na `require`, widzimy, że tylko właściciel kontraktu ma prawo wybijać. To jest uzasadnione. Ale komunikat o błędzie powinien brzmieć _only owner is allowed to mint_ (tylko właściciel może wybijać) lub coś w tym stylu. Zamiast tego jest to nieistotne _ERC20: mint to the zero address_ (ERC20: wybijanie na adres zerowy). Prawidłowym testem na wybijanie na adres zerowy jest `require(account != address(0), "<error message>")`, czego kontrakt nigdy nie sprawdza.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Istnieją jeszcze dwa podejrzane fakty, bezpośrednio związane z wybijaniem:

- Istnieje parametr `account`, który prawdopodobnie jest kontem, które powinno otrzymać wybitą kwotę. Ale saldo, które rośnie, w rzeczywistości należy do `contract_owner`.

- Chociaż zwiększone saldo należy do `contract_owner`, wyemitowane zdarzenie pokazuje transfer do `account`.

### Dlaczego zarówno `auth`, jak i `approver`? Dlaczego `mod`, które nic nie robi? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Ten kontrakt zawiera trzy modyfikatory: `_mod_`, `auth` i `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` przyjmuje trzy parametry i nic z nimi nie robi. Po co go mieć?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` i `approver` mają więcej sensu, ponieważ sprawdzają, czy kontrakt został wywołany przez `contract_owner`. Oczekiwalibyśmy, że pewne uprzywilejowane działania, takie jak wybijanie, będą ograniczone do tego konta. Jaki jest jednak sens posiadania dwóch oddzielnych funkcji, które robią _dokładnie to samo_?

## Co możemy wykryć automatycznie? {#what-can-we-detect-automatically}

Możemy zobaczyć, że `wARB` to fałszywy token, patrząc na Etherscan. Jest to jednak rozwiązanie scentralizowane. W teorii Etherscan mógłby zostać zmanipulowany lub zhakowany. Lepiej jest móc samodzielnie ustalić, czy token jest autentyczny, czy nie.

Istnieją pewne sztuczki, których możemy użyć, aby zidentyfikować, że token ERC-20 jest podejrzany (albo jest to oszustwo, albo jest bardzo źle napisany), patrząc na emitowane przez niego zdarzenia.

## Podejrzane zdarzenia `Approval` {#suspicious-approval-events}

[Zdarzenia `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) powinny występować tylko przy bezpośrednim żądaniu (w przeciwieństwie do [zdarzeń `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), które mogą wystąpić w wyniku limitu wydatków). [Zobacz dokumentację Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin), aby uzyskać szczegółowe wyjaśnienie tego problemu i dowiedzieć się, dlaczego żądania muszą być bezpośrednie, a nie pośredniczone przez kontrakt.

Oznacza to, że zdarzenia `Approval`, które zatwierdzają wydatki z [konta zewnętrznego](/developers/docs/accounts/#types-of-account), muszą pochodzić z transakcji, które mają swój początek na tym koncie, a ich miejscem docelowym jest kontrakt ERC-20. Każdy inny rodzaj zatwierdzenia z konta zewnętrznego jest podejrzany.

Oto [program, który identyfikuje tego rodzaju zdarzenia](https://github.com/qbzzt/20230915-scam-token-detection), używając [Viem](https://viem.sh/) i [TypeScript](https://www.typescriptlang.org/docs/), wariantu JavaScript z bezpieczeństwem typów. Aby go uruchomić:

1. Skopiuj `.env.example` do `.env`.
2. Edytuj `.env`, aby podać adres URL do węzła sieci głównej Ethereum.
3. Uruchom `pnpm install`, aby zainstalować niezbędne pakiety.
4. Uruchom `pnpm susApproval`, aby poszukać podejrzanych zatwierdzeń.

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

Utwórz klienta Viem. Musimy tylko odczytywać dane z blockchaina, więc ten klient nie potrzebuje klucza prywatnego.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Adres podejrzanego kontraktu ERC-20 oraz bloki, w których będziemy szukać zdarzeń. Dostawcy węzłów zazwyczaj ograniczają naszą możliwość odczytu zdarzeń, ponieważ przepustowość może być kosztowna. Na szczęście `wARB` nie był używany przez osiemnaście godzin, więc możemy poszukać wszystkich zdarzeń (w sumie było ich tylko 13).

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

W ten sposób prosimy Viem o informacje o zdarzeniu. Kiedy podamy mu dokładną sygnaturę zdarzenia, w tym nazwy pól, przeanalizuje on zdarzenie za nas.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Nasz algorytm ma zastosowanie tylko do kont zewnętrznych. Jeśli `client.getBytecode` zwróci jakikolwiek kod bajtowy, oznacza to, że jest to kontrakt i powinniśmy go po prostu pominąć.

Jeśli wcześniej nie używałeś TypeScript, definicja funkcji może wyglądać nieco dziwnie. Nie tylko mówimy mu, że pierwszy (i jedyny) parametr nazywa się `addr`, ale także, że jest typu `Address`. Podobnie część `: boolean` mówi TypeScriptowi, że wartością zwracaną przez funkcję jest wartość logiczna (boolean).

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Ta funkcja pobiera pokwitowanie transakcji ze zdarzenia. Potrzebujemy pokwitowania, aby upewnić się, że znamy miejsce docelowe transakcji.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

To jest najważniejsza funkcja, ta, która faktycznie decyduje, czy zdarzenie jest podejrzane, czy nie. Typ zwracany, `(Event | null)`, mówi TypeScriptowi, że ta funkcja może zwrócić `Event` lub `null`. Zwracamy `null`, jeśli zdarzenie nie jest podejrzane.

```typescript
const owner = ev.args._owner
```

Viem ma nazwy pól, więc przeanalizował zdarzenie za nas. `_owner` to właściciel tokenów, które mają zostać wydane.

```typescript
// Zatwierdzenia przez kontrakty nie są podejrzane
if (await isContract(owner)) return null
```

Jeśli właścicielem jest kontrakt, załóż, że to zatwierdzenie nie jest podejrzane. Aby sprawdzić, czy zatwierdzenie kontraktu jest podejrzane, czy nie, musielibyśmy prześledzić pełne wykonanie transakcji, aby zobaczyć, czy kiedykolwiek dotarła ona do kontraktu właściciela i czy ten kontrakt wywołał bezpośrednio kontrakt ERC-20. Jest to o wiele bardziej zasobochłonne, niż byśmy chcieli.

```typescript
const txn = await getEventTxn(ev)
```

Jeśli zatwierdzenie pochodzi z konta zewnętrznego, pobierz transakcję, która je spowodowała.

```typescript
// Zatwierdzenie jest podejrzane, jeśli pochodzi od właściciela EOA, który nie jest `from` transakcji
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Nie możemy po prostu sprawdzić równości ciągów znaków, ponieważ adresy są szesnastkowe, więc zawierają litery. Czasami, na przykład w `txn.from`, te litery są w całości małe. W innych przypadkach, takich jak `ev.args._owner`, adres jest zapisany [wielkością liter mieszaną w celu identyfikacji błędów](https://eips.ethereum.org/EIPS/eip-55).

Ale jeśli transakcja nie pochodzi od właściciela, a ten właściciel jest kontem zewnętrznym, to mamy do czynienia z podejrzaną transakcją.

```typescript
// Jest również podejrzane, jeśli celem transakcji nie jest kontrakt ERC-20, który
// badamy
if (txn.to.toLowerCase() != testedAddress) return ev
```

Podobnie, jeśli adres `to` transakcji, czyli pierwszy wywołany kontrakt, nie jest badanym kontraktem ERC-20, to jest to podejrzane.

```typescript
    // Jeśli nie ma powodu do podejrzeń, zwróć null.
    return null
}
```

Jeśli żaden z warunków nie jest prawdziwy, to zdarzenie `Approval` nie jest podejrzane.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Funkcja `async`](https://www.w3schools.com/js/js_async.asp) zwraca obiekt `Promise`. Przy użyciu powszechnej składni, `await x()`, czekamy na spełnienie tego `Promise` przed kontynuowaniem przetwarzania. Jest to proste do zaprogramowania i śledzenia, ale jest również nieefektywne. Podczas gdy czekamy na spełnienie `Promise` dla konkretnego zdarzenia, możemy już zacząć pracować nad następnym zdarzeniem.

Tutaj używamy [`map`](https://www.w3schools.com/jsref/jsref_map.asp) do utworzenia tablicy obiektów `Promise`. Następnie używamy [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/), aby poczekać na rozwiązanie wszystkich tych obietnic. Następnie [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) te wyniki, aby usunąć niepodejrzane zdarzenia.

### Podejrzane zdarzenia `Transfer` {#suspicious-transfer-events}

Innym możliwym sposobem na zidentyfikowanie fałszywych tokenów jest sprawdzenie, czy mają one jakieś podejrzane transfery. Na przykład transfery z kont, które nie mają tak wielu tokenów. Możesz zobaczyć, [jak zaimplementować ten test](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), ale `wARB` nie ma tego problemu.

## Wniosek {#conclusion}

Automatyczne wykrywanie oszustw ERC-20 cierpi na [wyniki fałszywie negatywne](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), ponieważ oszustwo może wykorzystywać całkowicie normalny kontrakt tokena ERC-20, który po prostu nie reprezentuje niczego rzeczywistego. Dlatego zawsze powinieneś próbować _uzyskać adres tokena z zaufanego źródła_.

Automatyczne wykrywanie może pomóc w niektórych przypadkach, takich jak elementy zdecentralizowanych finansów (DeFi), gdzie istnieje wiele tokenów i muszą być one obsługiwane automatycznie. Ale jak zawsze [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp) (niech kupujący się strzeże), zrób własny research i zachęcaj swoich użytkowników do tego samego.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).