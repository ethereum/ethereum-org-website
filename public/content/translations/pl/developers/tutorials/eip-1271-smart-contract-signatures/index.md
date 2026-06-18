---
title: "EIP-1271: Podpisywanie i weryfikacja podpisów inteligentnych kontraktów"
description: Przegląd generowania i weryfikacji podpisów inteligentnych kontraktów za pomocą EIP-1271. Omawiamy również implementację EIP-1271 używaną w Safe (wcześniej Gnosis Safe), aby zapewnić konkretny przykład, na którym mogą opierać się programiści inteligentnych kontraktów.
author: Nathan H. Leung
lang: pl
tags: ["eip-1271", "inteligentne kontrakty", "weryfikacja", "podpisywanie"]
skill: intermediate
breadcrumb: Podpisy EIP-1271
published: 2023-01-12
---

Standard [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) pozwala inteligentnym kontraktom weryfikować podpisy.

W tym samouczku przedstawiamy przegląd podpisów cyfrowych, tło EIP-1271 oraz konkretną implementację EIP-1271 używaną przez [Safe](https://safe.global/) (wcześniej Gnosis Safe). Wszystko to może posłużyć jako punkt wyjścia do implementacji EIP-1271 we własnych kontraktach.

## Czym jest podpis? {#what-is-a-signature}

W tym kontekście podpis (a dokładniej „podpis cyfrowy”) to wiadomość plus pewnego rodzaju dowód, że wiadomość pochodzi od konkretnej osoby/nadawcy/adresu.

Na przykład podpis cyfrowy może wyglądać tak:

1. Wiadomość: „Chcę zalogować się na tej stronie za pomocą mojego portfela Ethereum”.
2. Podpisujący: Mój adres to `0x000…`
3. Dowód: Oto dowód, że ja, `0x000…`, faktycznie stworzyłem całą tę wiadomość (zazwyczaj jest to coś kryptograficznego).

Należy pamiętać, że podpis cyfrowy obejmuje zarówno „wiadomość”, jak i „podpis”.

Dlaczego? Na przykład, gdybyś dał mi kontrakt do podpisania, a ja odciąłbym stronę z podpisem i oddał ci tylko moje podpisy bez reszty kontraktu, kontrakt nie byłby ważny.

W ten sam sposób podpis cyfrowy nic nie znaczy bez powiązanej wiadomości!

## Dlaczego istnieje EIP-1271? {#why-does-eip-1271-exist}

Aby utworzyć podpis cyfrowy do użytku na blockchainach opartych na Ethereum, zazwyczaj potrzebujesz tajnego klucza prywatnego, którego nikt inny nie zna. To właśnie sprawia, że twój podpis jest twój (nikt inny nie może utworzyć takiego samego podpisu bez znajomości tajnego klucza).

Twoje konto Ethereum (tj. twoje konto posiadane zewnętrznie/EOA) ma powiązany ze sobą klucz prywatny i to właśnie ten klucz prywatny jest zazwyczaj używany, gdy strona internetowa lub zdecentralizowana aplikacja (dapp) prosi cię o podpis (np. w celu „Zaloguj się przez Ethereum”).

Aplikacja może [zweryfikować podpis](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum), który tworzysz za pomocą biblioteki innej firmy, takiej jak ethers.js, [bez znajomości twojego klucza prywatnego](https://en.wikipedia.org/wiki/Public-key_cryptography) i mieć pewność, że to _ty_ utworzyłeś ten podpis.

> W rzeczywistości, ponieważ podpisy cyfrowe EOA wykorzystują kryptografię klucza publicznego, mogą być generowane i weryfikowane **pozałańcuchowo**! Tak właśnie działa głosowanie DAO bez opłat za gaz — zamiast przesyłać głosy onchain, podpisy cyfrowe mogą być tworzone i weryfikowane pozałańcuchowo przy użyciu bibliotek kryptograficznych.

Podczas gdy konta EOA mają klucz prywatny, konta inteligentnych kontraktów nie mają żadnego klucza prywatnego ani tajnego (więc „Zaloguj się przez Ethereum” itp. nie może natywnie działać z kontami inteligentnych kontraktów).

Problem, który EIP-1271 ma na celu rozwiązać: jak możemy stwierdzić, że podpis inteligentnego kontraktu jest ważny, jeśli inteligentny kontrakt nie ma „sekretu”, który mógłby włączyć do podpisu?

## Jak działa EIP-1271? {#how-does-eip-1271-work}

Inteligentne kontrakty nie mają kluczy prywatnych, których można by użyć do podpisywania wiadomości. Jak więc możemy stwierdzić, czy podpis jest autentyczny?

Cóż, jednym z pomysłów jest to, że możemy po prostu _zapytać_ inteligentny kontrakt, czy podpis jest autentyczny!

To, co robi EIP-1271, to standaryzacja tego pomysłu „pytania” inteligentnego kontraktu, czy dany podpis jest ważny.

Kontrakt implementujący EIP-1271 musi mieć funkcję o nazwie `isValidSignature`, która przyjmuje wiadomość i podpis. Kontrakt może następnie uruchomić pewną logikę walidacji (specyfikacja nie wymusza tutaj niczego konkretnego), a następnie zwrócić wartość wskazującą, czy podpis jest ważny, czy nie.

Jeśli `isValidSignature` zwróci prawidłowy wynik, to w zasadzie kontrakt mówi: „tak, zatwierdzam ten podpis + wiadomość!”.

### Interfejs {#interface}

Oto dokładny interfejs w specyfikacji EIP-1271 (o parametrze `_hash` porozmawiamy poniżej, ale na razie myśl o nim jako o wiadomości, która jest weryfikowana):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Powinno zwracać, czy dostarczony podpis jest ważny dla dostarczonego hasha
   * @param _hash      Hash danych do podpisania
   * @param _signature Tablica bajtów podpisu powiązana z _hash
   *
   * MUSI zwracać magiczną wartość bytes4 0x1626ba7e, gdy funkcja kończy się powodzeniem.
   * NIE MOŻE modyfikować stanu (używając STATICCALL dla solc < 0.5, modyfikatora view dla solc > 0.5)
   * MUSI zezwalać na wywołania zewnętrzne
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Przykładowa implementacja EIP-1271: Safe {#example-eip-1271-implementation-safe}

Kontrakty mogą implementować `isValidSignature` na wiele sposobów — specyfikacja nie mówi zbyt wiele o dokładnej implementacji.

Jednym ze znanych kontraktów implementujących EIP-1271 jest Safe (wcześniej Gnosis Safe).

W kodzie Safe, `isValidSignature` [jest zaimplementowane](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) w taki sposób, że podpisy mogą być tworzone i weryfikowane na [dwa sposoby](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Wiadomości onchain
   1. Tworzenie: właściciel Safe tworzy nową transakcję Safe, aby „podpisać” wiadomość, przekazując wiadomość jako dane do transakcji. Gdy wystarczająca liczba właścicieli podpisze transakcję, aby osiągnąć próg multisig, transakcja jest rozgłaszana i uruchamiana. W transakcji znajduje się funkcja Safe o nazwie (`signMessage(bytes calldata _data)`), która dodaje wiadomość do listy „zatwierdzonych” wiadomości.
   2. Weryfikacja: wywołaj `isValidSignature` na kontrakcie Safe i przekaż wiadomość do weryfikacji jako parametr wiadomości oraz [pustą wartość dla parametru podpisu](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (tj. `0x`). Safe zauważy, że parametr podpisu jest pusty i zamiast kryptograficznie weryfikować podpis, będzie wiedział, że ma po prostu sprawdzić, czy wiadomość znajduje się na liście „zatwierdzonych” wiadomości.
2. Wiadomości pozałańcuchowe:
   1. Tworzenie: właściciel Safe tworzy wiadomość pozałańcuchowo, a następnie prosi innych właścicieli Safe o indywidualne podpisanie wiadomości, aż do uzyskania wystarczającej liczby podpisów do przekroczenia progu zatwierdzenia multisig.
   2. Weryfikacja: wywołaj `isValidSignature`. W parametrze wiadomości przekaż wiadomość do weryfikacji. W parametrze podpisu przekaż indywidualne podpisy każdego właściciela Safe, połączone ze sobą jeden po drugim. Safe sprawdzi, czy jest wystarczająco dużo podpisów, aby spełnić próg **oraz** czy każdy podpis jest ważny. Jeśli tak, zwróci wartość wskazującą na pomyślną weryfikację podpisu.

## Czym dokładnie jest parametr `_hash`? Dlaczego nie przekazać całej wiadomości? {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

Być może zauważyłeś, że funkcja `isValidSignature` w [interfejsie EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) nie przyjmuje samej wiadomości, ale zamiast tego parametr `_hash`. Oznacza to, że zamiast przekazywać pełną wiadomość o dowolnej długości do `isValidSignature`, przekazujemy 32-bajtowy hash wiadomości (zazwyczaj keccak256).

Każdy bajt danych wywołania — tj. danych parametrów funkcji przekazywanych do funkcji inteligentnego kontraktu — [kosztuje 16 jednostek gazu (4 jednostki gazu, jeśli bajt jest zerowy)](https://eips.ethereum.org/EIPS/eip-2028), więc może to zaoszczędzić dużo gazu, jeśli wiadomość jest długa.

### Poprzednie specyfikacje EIP-1271 {#previous-eip-1271-specifications}

W praktyce można spotkać specyfikacje EIP-1271, które mają funkcję `isValidSignature` z pierwszym parametrem typu `bytes` (o dowolnej długości, zamiast stałej długości `bytes32`) i nazwą parametru `message`. Jest to [starsza wersja](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) standardu EIP-1271.

## Jak należy zaimplementować EIP-1271 we własnych kontraktach? {#how-should-eip-1271-be-implemented-in-my-own-contracts}

Specyfikacja jest tutaj bardzo otwarta. Implementacja Safe ma kilka dobrych pomysłów:

- Możesz uznać podpisy EOA od „właściciela” kontraktu za ważne.
- Możesz przechowywać listę zatwierdzonych wiadomości i uznawać tylko je za ważne.

Ostatecznie zależy to od ciebie jako programisty kontraktu!

## Wnioski {#conclusion}

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) to wszechstronny standard, który pozwala inteligentnym kontraktom weryfikować podpisy. Otwiera on drzwi dla inteligentnych kontraktów do działania bardziej jak EOA — na przykład zapewniając sposób na to, aby „Zaloguj się przez Ethereum” działało z inteligentnymi kontraktami — i może być zaimplementowany na wiele sposobów (Safe ma nietrywialną, interesującą implementację do rozważenia).