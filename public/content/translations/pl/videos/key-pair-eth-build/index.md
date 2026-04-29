---
title: "Para kluczy — ETH.BUILD"
description: "Demonstracja par kluczy publicznych i prywatnych za pomocą narzędzia edukacyjnego ETH.BUILD. Zrozum, jak kryptograficzne pary kluczy zabezpieczają konta Ethereum i umożliwiają podpisywanie transakcji."
lang: pl
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "konta"
  - "kryptografia"
format: tutorial
author: Austin Griffith
breadcrumb: "Pary kluczy (ETH.BUILD)"
---

Samouczek autorstwa **Austina Griffitha** demonstrujący, jak działają pary kluczy publicznych i prywatnych za pomocą narzędzia do programowania wizualnego ETH.BUILD, obejmujący generowanie klucza prywatnego, wyprowadzanie klucza publicznego, podpisywanie wiadomości i odzyskiwanie podpisu.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=9LtBDy67Tho) opublikowanego przez Austina Griffitha. Został on lekko zredagowany w celu poprawy czytelności.*

### Klucz prywatny (0:00) {#the-private-key-000}

W pierwszym filmie użyliśmy hasha, a hashe będą ważne w dalszej części. Ale kolejnym najważniejszym elementem jest para kluczy. Najważniejszą częścią pary kluczy jest klucz prywatny. Przejdźmy dalej i wygenerujmy go — jest to w zasadzie losowy 64-znakowy ciąg szesnastkowy, tego samego rozmiaru co hash, z którym właśnie pracowaliśmy.

Zaczynasz od tego jako swojego klucza prywatnego, a następnie używając kryptografii krzywych eliptycznych — sprawdź to na Wikipedii jako zadanie poboczne — wyprowadzamy klucz publiczny. Więc teraz mamy klucz prywatny i klucz publiczny. Właśnie wygenerowaliśmy klucz prywatny z niczego, a klucz publiczny daje nam adres. To tutaj ludzie mogliby faktycznie wysyłać pieniądze. Kiedy ktoś mówi „wyślij na mój adres Ethereum”, to jest właśnie to.

Gdybym chciał założyć konto w Wells Fargo, musiałbym pojechać do banku i podać im mnóstwo informacji. Zajęłoby to trochę czasu. Ale aby wygenerować konto w systemie kryptograficznym takim jak ten, gdzie mogę wysyłać i odbierać pieniądze, po prostu generuję ten klucz prywatny. Ten 64-znakowy szesnastkowy klucz prywatny wyprowadza wszystko inne.

### Podpisywanie i odzyskiwanie wiadomości (1:54) {#signing-and-recovering-messages-154}

Istnieje naprawdę fajna właściwość tej pary kluczy, którą powinniśmy zbadać, a mianowicie podpisywanie i odzyskiwanie wiadomości. Zasadniczo bierzesz swój klucz prywatny i używasz go do podpisania jakiejś wiadomości. Wpiszmy wiadomość — „niedźwiedź jest lepki od miodu”.

Wprowadzamy to jako naszą wiadomość, a przy włączonym automatycznym podpisywaniu otrzymujemy z powrotem podpis. Podobnie jak hash, nasz podpis polega w zasadzie na wzięciu wiadomości i naszego klucza prywatnego i podpisaniu czegoś. To, co z tego otrzymujemy, to podpis.

Mogę to wysłać w świat — mógłbym to wysłać publicznie do wszystkich — ten ciąg podpisu wraz z wiadomością. To, co każdy może zrobić za pomocą matematyki, to zweryfikować, że to konkretnie ja go podpisałem.

### Odzyskiwanie adresu podpisującego (3:17) {#recovering-the-signers-address-317}

Pozwól, że pokażę ci, jak to działa. Używamy metody „recover” (odzyskiwania). Potrzebujemy dwóch danych wejściowych: wiadomości — „niedźwiedź jest lepki od miodu” — oraz podpisu. To, co z tego wynika, to adres, który został użyty do jej podpisania. Możemy wizualnie zobaczyć, że konto podpisało tę wiadomość, używając identykonów Blockie.

Nie ma możliwości manipulowania tym. Jeśli ktoś zmieni choćby jedno słowo — na przykład zamieniając „niedźwiedź” na „borsuk” — wszystko się zmienia. Nawet przy tym samym podpisie, inna wiadomość wyrzuca inny adres, a nie ten właściwy.

Ta wiadomość nie może zostać sfałszowana. Moglibyśmy wrzucić tam znacznik czasu — moglibyśmy powiedzieć „w tym dniu przewiduję, że coś się wydarzy”, podpisać to, udostępnić podpis i wiadomość, a każdy do końca czasu będzie mógł matematycznie udowodnić, że podpisałeś tę wiadomość w tamtym czasie.

### Kluczowa właściwość pary kluczy (4:58) {#the-key-property-of-a-key-pair-458}

To jest kluczowa właściwość pary kluczy. Para kluczy wygenerowana z niczego więcej niż 64-znakowego losowego ciągu szesnastkowego może zostać użyta do podpisania wiadomości, a następnie ta wiadomość może zostać odzyskana.

- Klucz prywatny + wiadomość = podpis
- Podpis + wiadomość = adres publiczny

Możemy podpisywać dane naszym kluczem prywatnym, a ludzie mogą udowodnić, że to my je podpisaliśmy. Będzie to ważny element w następnym kroku.