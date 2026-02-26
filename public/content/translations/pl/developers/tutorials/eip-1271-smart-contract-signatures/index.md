---
title: "EIP-1271: Podpisywanie i weryfikowanie podpisów inteligentnych kontraktów"
description: "Omówienie generowania i weryfikacji podpisów inteligentnych kontraktów za pomocą EIP-1271. Omawiamy również implementację EIP-1271 stosowaną w Safe (dawniej Gnosis Safe), aby dać deweloperom inteligentnych kontraktów konkretny przykład, na którym mogą się wzorować."
author: Nathan H. Leung
lang: pl
tags:
  [
    "eip-1271",
    "smart kontrakty",
    "weryfikacja",
    "podpisywanie"
  ]
skill: intermediate
published: 2023-01-12
---

Standard [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) pozwala inteligentnym kontraktom weryfikować podpisy.

W tym samouczku przedstawiamy przegląd podpisów cyfrowych, tło EIP-1271 oraz specyficzną implementację EIP-1271 używaną przez [Safe](https://safe.global/) (wcześniej Gnosis Safe). Wszystko to może posłużyć jako punkt wyjścia do implementacji EIP-1271 w Twoich własnych kontraktach.

## Czym jest podpis?

W tym kontekście podpis (a dokładniej „podpis cyfrowy”) to komunikat oraz pewnego rodzaju dowód, że komunikat pochodzi od określonej osoby/nadawcy/adresu.

Na przykład podpis cyfrowy może wyglądać tak:

1. Komunikat: „Chcę zalogować się do tej witryny za pomocą mojego portfela Ethereum”.
2. Podpisujący: Mój adres to `0x000…`
3. Dowód: Oto dowód na to, że ja, `0x000...`, faktycznie stworzyłem cały ten komunikat (zazwyczaj jest to coś kryptograficznego).

Należy pamiętać, że podpis cyfrowy zawiera zarówno „komunikat”, jak i „podpis”.

Dlaczego? Na przykład, gdybyś dał mi umowę do podpisania, a ja odciąłbym stronę z podpisem i oddał Ci tylko moje podpisy bez reszty umowy, umowa nie byłaby ważna.

W ten sam sposób podpis cyfrowy nic nie znaczy bez powiązanego z nim komunikatu!

## Dlaczego EIP-1271 istnieje?

Aby utworzyć podpis cyfrowy do użytku w blockchainach opartych na Ethereum, zazwyczaj potrzebny jest tajny klucz prywatny, którego nikt inny nie zna. To właśnie sprawia, że Twój podpis jest Twój (nikt inny nie może stworzyć tego samego podpisu bez znajomości tajnego klucza).

Twoje konto Ethereum (tj. konto zewnętrznego właściciela/EOA) ma przypisany do niego klucz prywatny i to właśnie ten klucz prywatny jest zazwyczaj używany, gdy strona internetowa lub dapka prosi o podpis (np. przy „Zaloguj się z Ethereum”).

Aplikacja może [zweryfikować podpis](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum), który tworzysz za pomocą biblioteki zewnętrznej, takiej jak ethers.js, [bez znajomości Twojego klucza prywatnego](https://en.wikipedia.org/wiki/Public-key_cryptography) i mieć pewność, że to _Ty_ go stworzyłeś.

> W rzeczywistości, ponieważ podpisy cyfrowe EOA wykorzystują kryptografię klucza publicznego, mogą być generowane i weryfikowane **offchain**! Tak działa bezgazowe głosowanie DAO — zamiast przesyłania głosów onchain, podpisy cyfrowe mogą być tworzone i weryfikowane offchain za pomocą bibliotek kryptograficznych.

Podczas gdy konta EOA posiadają klucz prywatny, konta inteligentnych kontraktów nie posiadają żadnego rodzaju klucza prywatnego ani tajnego (więc "Zaloguj się za pomocą Ethereum", itp. nie może natywnie działać z kontami inteligentnych kontraktów).

Problem, który EIP-1271 ma na celu rozwiązać: skąd możemy wiedzieć, że podpis inteligentnego kontraktu jest ważny, jeśli inteligentny kontrakt nie ma "tajemnicy", którą mógłby włączyć do podpisu?

## Jak działa EIP-1271?

Inteligentne kontrakty nie mają kluczy prywatnych, których można użyć do podpisywania komunikatów. Skąd więc możemy wiedzieć, czy podpis jest autentyczny?

Cóż, jednym z pomysłów jest to, że możemy po prostu _zapytać_ inteligentny kontrakt, czy podpis jest autentyczny!

EIP-1271 standaryzuje ideę „pytania” inteligentnego kontraktu, czy dany podpis jest ważny.

Kontrakt, który implementuje EIP-1271, musi mieć funkcję o nazwie `isValidSignature`, która przyjmuje komunikat i podpis. Kontrakt może następnie uruchomić pewną logikę walidacji (specyfikacja nie narzuca tutaj niczego konkretnego), a następnie zwrócić wartość wskazującą, czy podpis jest ważny, czy nie.

Jeśli `isValidSignature` zwróci prawidłowy wynik, to jest to prawie tak, jakby kontrakt mówił: "tak, zatwierdzam ten podpis + komunikat!".

### Interfejs

Oto dokładny interfejs w specyfikacji EIP-1271 (o parametrze `_hash` porozmawiamy poniżej, ale na razie pomyśl o nim jako o weryfikowanym komunikacie):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Powinna zwrócić, czy podany podpis jest ważny dla podanego haszu
   * @param _hash      Hasz danych do podpisania
   * @param _signature Tablica bajtów podpisu powiązana z _hasz
   *
   * MUSI zwrócić magiczną wartość bytes4 0x1626ba7e, gdy funkcja przejdzie pomyślnie.
   * NIE MOŻE modyfikować stanu (używając STATICCALL dla solc < 0.5, modyfikator view dla solc > 0.5)
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

## Przykładowa implementacja EIP-1271: Safe

Kontrakty mogą implementować `isValidSignature` na wiele sposobów – specyfikacja nie mówi wiele o dokładnej implementacji.

Jednym z godnych uwagi kontraktów, który implementuje EIP-1271, jest Safe (wcześniej Gnosis Safe).

W kodzie Safe `isValidSignature` [jest zaimplementowane](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) tak, że podpisy mogą być tworzone i weryfikowane na [dwa sposoby](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Komunikaty onchain
   1. Tworzenie: właściciel Safe tworzy nową transakcję Safe, aby „podpisać” komunikat, przekazując go jako dane do transakcji. Gdy wystarczająca liczba właścicieli podpisze transakcję, aby osiągnąć próg multisig, transakcja jest rozgłaszana i uruchamiana. W transakcji jest funkcja Safe o nazwie (`signMessage(bytes calldata _data)`), która dodaje komunikat do listy "zatwierdzonych" komunikatów.
   2. Weryfikacja: wywołaj `isValidSignature` w kontrakcie Safe i przekaż komunikat do weryfikacji jako parametr komunikatu oraz [pustą wartość dla parametru podpisu](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (tj. `0x`). Safe zobaczy, że parametr podpisu jest pusty i zamiast kryptograficznie weryfikować podpis, będzie wiedział, żeby po prostu sprawdzić, czy komunikat znajduje się na liście "zatwierdzonych" komunikatów.
2. Komunikaty offchain:
   1. Tworzenie: właściciel Safe tworzy komunikat offchain, a następnie prosi innych właścicieli Safe o indywidualne podpisanie komunikatu, dopóki nie będzie wystarczającej liczby podpisów, aby przekroczyć próg zatwierdzenia multisig.
   2. Weryfikacja: wywołaj `isValidSignature`. W parametrze komunikatu przekaż komunikat do zweryfikowania. W parametrze podpisu przekaż połączone ze sobą indywidualne podpisy każdego właściciela Safe, jeden po drugim. Safe sprawdzi, czy jest wystarczająco dużo podpisów, aby osiągnąć próg **oraz** czy każdy podpis jest ważny. Jeśli tak, zwróci wartość wskazującą pomyślną weryfikację podpisu.

## Czym dokładnie jest parametr `_hash`? Dlaczego nie przekazać całego komunikatu?

Być może zauważyłeś, że funkcja `isValidSignature` w [interfejsie EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) nie przyjmuje samego komunikatu, ale parametr `_hash`. Oznacza to, że zamiast przekazywać do `isValidSignature` pełny komunikat o dowolnej długości, przekazujemy 32-bajtowy hasz komunikatu (zazwyczaj keccak256).

Każdy bajt calldata – tj. dane parametrów funkcji przekazywane do funkcji inteligentnego kontraktu – [kosztuje 16 jednostek gazu (4 jednostki gazu w przypadku bajtu zerowego)](https://eips.ethereum.org/EIPS/eip-2028), więc może to zaoszczędzić dużo gazu, jeśli komunikat jest długi.

### Poprzednie specyfikacje EIP-1271

Istnieją specyfikacje EIP-1271, które mają funkcję `isValidSignature` z pierwszym parametrem typu `bytes` (o dowolnej długości, zamiast o stałej długości `bytes32`) i nazwą parametru `message`. Jest to [starsza wersja](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) standardu EIP-1271.

## Jak EIP-1271 powinien być zaimplementowany w moich własnych kontraktach?

Specyfikacja jest w tym zakresie bardzo otwarta. Implementacja Safe zawiera kilka dobrych pomysłów:

- Można uznać podpisy EOA od "właściciela" kontraktu za ważne.
- Można przechowywać listę zatwierdzonych komunikatów i tylko je uważać za ważne.

Ostatecznie zależy to od Ciebie jako dewelopera kontraktu!

## Podsumowanie

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) to wszechstronny standard, który pozwala inteligentnym kontraktom weryfikować podpisy. Otwiera to drzwi do tego, aby inteligentne kontrakty działały bardziej jak EOA – na przykład zapewniając sposób na działanie "Logowania za pomocą Ethereum" z inteligentnymi kontraktami – i może być wdrażany na wiele sposobów (Safe ma nietrywialną, interesującą implementację do rozważenia).
