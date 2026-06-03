---
title: "Jak budować aplikacje chroniące prywatność na Ethereum za pomocą dowodów z wiedzą zerową"
description: "Jeden uniwersalny wzorzec napędza anonimowe głosowania, miksery, airdropy i systemy członkostwa na Ethereum. Poznaj cykl zobowiązanie-nulifikator-dowód i dowiedz się, jak narzędzia z wiedzą zerową umożliwiają ich praktyczne budowanie już dziś."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "dowody z wiedzą zerową"
  - "prywatność"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: Aplikacje chroniące prywatność na Ethereum
lang: pl
---

Ethereum z założenia jest radykalnie publiczne. Każdy adres, saldo, transakcja, wywołanie kontraktu i zdarzenie są widoczne dla każdego, kto posiada eksplorator bloków. Ta przejrzystość jest przydatna, gdy zależy nam na weryfikowalności. Staje się jednak problemem, gdy użytkownicy muszą oddać głos, odebrać środki, dokonać wypłaty lub udowodnić członkostwo bez łączenia każdego działania z tym samym portfelem.

Anonimowe członkostwo to uniwersalny wzorzec, który napędza dużą klasę aplikacji chroniących prywatność na Ethereum. Ludzie najpierw się rejestrują, a później udowadniają, że należą do grupy, nie ujawniając, którym członkiem są. Dowód z wiedzą zerową to most między portfelem rejestracyjnym a portfelem wykonującym działanie, a ten most nie ujawnia, kto przez niego przeszedł.

Otaczający produkt się zmienia, ale szkielet prywatności pozostaje ten sam.

## Wzorzec wyjaśniony na przykładzie anonimowego głosowania {#the-pattern-explained-through-anonymous-voting}

Wzorzec składa się z trzech elementów. Zobowiązanie rejestruje każdego członka. Drzewo Merklego zamienia te zobowiązania w tłum. Dowód i nulifikator pozwalają jednemu członkowi na jednorazowe działanie bez ujawniania, który z nich to zrobił.

### Krok pierwszy: rejestracja {#step-one-registering}

Każdy głosujący tworzy dwie prywatne wartości pozałańcuchowo: sekret i nulifikator. Głosujący hashuje te wartości w publiczne zobowiązanie, a następnie rejestruje to zobowiązanie onchain.

Zobowiązanie to publiczny zapis rejestracji. Sekret i nulifikator to prywatna notatka, której głosujący będzie potrzebował później. Jeśli głosujący zgubi notatkę, nie będzie mógł udowodnić członkostwa. Jeśli wycieknie, ktoś inny może oddać głos w jego imieniu.

Ponieważ zobowiązanie to hash, obserwatorzy nie mogą odzyskać zawartych w nim prywatnych wartości. Zobowiązanie mówi „ktoś się zarejestrował”, nie ujawniając, kto później skorzysta z tej rejestracji.

### Krok drugi: budowanie tłumu {#step-two-building-the-crowd}

W miarę jak rejestruje się coraz więcej głosujących, aplikacja zbiera ich zobowiązania w drzewo Merklego. Drzewo Merklego kompresuje długą listę wartości w pojedynczy hash, zwany korzeniem drzewa Merklego. Zmiana jakiejkolwiek wartości na liście powoduje zmianę hasha, więc korzeń działa jako odporne na manipulacje podsumowanie całego zbioru.

To drzewo to twój zbiór anonimowości. Jeśli w drzewie znajduje się dziesięciu użytkowników, obserwator może zawęzić późniejsze działanie do jednego z nich. Jeśli w drzewie jest dziesięć tysięcy użytkowników, znacznie trudniej jest powiązać działanie z jedną osobą. Prywatna aplikacja z małym zbiorem anonimowości zazwyczaj nie jest zbyt prywatna, nawet jeśli kryptografia jest poprawna.

### Krok trzeci: anonimowe działanie {#step-three-acting-anonymously}

Kiedy głosowanie się rozpoczyna, głosujący nie powinien oddawać głosu z tego samego portfela, który zarejestrował zobowiązanie. Głosowanie z portfela rejestracyjnego powiązałoby głos bezpośrednio z rejestrującym i zniweczyłoby wysiłki na rzecz prywatności. Zamiast tego głosujący tworzy dowód z wiedzą zerową. Oświadczenie jest zakodowane jako obwód, który mówi: „Znam prywatne wartości, które tworzą zarejestrowane zobowiązanie, i ujawniam poprawny hash nulifikatora dla tego głosowania”.

Dowód przekonuje kontrakt weryfikatora, że oświadczenie jest prawdziwe. Nie ujawnia on sekretu, nulifikatora ani tego, które zobowiązanie zostało użyte.

Nulifikator zapobiega podwójnemu głosowaniu. Wraz z dowodem głosujący publikuje hash nulifikatora. Kontrakt głosowania przechowuje ten hash po zaakceptowaniu głosu. Jeśli ta sama prywatna notatka zostanie użyta ponownie w tym samym głosowaniu, wygeneruje ten sam hash nulifikatora, a kontrakt odrzuci drugi głos. W połączeniu z dowodem sprawia to, że kontrakt wie tylko, że jakiś zarejestrowany głosujący zadziałał raz, ale nie wie który.

## Uniwersalna bramka {#the-reusable-gate}

Ta sama para dowodu i nulifikatora sprawdza się nie tylko w głosowaniu. Jeśli odrzucimy otoczkę głosowania, otrzymamy bramkę prywatności dla funkcji inteligentnego kontraktu.

Zanim funkcja zostanie uruchomiona, kontrakt sprawdza korzeń drzewa Merklego, weryfikuje dowód, potwierdza, że hash nulifikatora nie został użyty, i wiąże publiczne dane wejściowe z odpowiednią aplikacją, łańcuchem, głosowaniem, roszczeniem lub wypłatą. Jeśli te kontrole zakończą się pomyślnie, oznacza nulifikator jako użyty i uruchamia resztę funkcji.

Umieść tę bramkę przed głosem, a otrzymasz anonimowe głosowanie. Umieść ją przed odebraniem airdropa, a otrzymasz anonimowe roszczenia. Umieść ją przed funkcją wypłaty, a otrzymasz rdzeń przepływu wypłat w stylu miksera. To samo drzewo zobowiązań, ta sama koncepcja nulifikatora, ten sam wzorzec dowodu. Zmienia się tylko ciało funkcji i otaczająca ją logika aplikacji.

## Co i gdzie jest uruchamiane {#what-runs-where}

Prywatna praca zazwyczaj odbywa się pozałańcuchowo. Użytkownik przechowuje notatkę, a aplikacja kliencka buduje świadka i uruchamia provera, aby wygenerować dowód. Indeksator śledzi zobowiązania i korzenie drzewa Merklego. Bundler propaguje operację użytkownika (UserOperation) onchain, a paymaster ERC-4337 sponsoruje gaz, dzięki czemu nowy portfel nie potrzebuje najpierw ETH ze znanego portfela użytkownika.

Publiczne egzekwowanie odbywa się onchain. Kontrakt weryfikatora sprawdza dowód. Kontrakt aplikacji sprawdza prawidłowe korzenie i nieużyte nulifikatory, przechowuje hash nulifikatora i uruchamia publiczne działanie.

Wrażliwym elementem UX jest obsługa notatek. Traktuj sekret i nulifikator jak klucze. Nie umieszczaj ich w analityce, logach, adresach URL, raportach o błędach ani w standardowej telemetrii po stronie serwera. Gdy notatka wycieknie, prywatność znika, bez względu na to, jak silny jest dowód.

## Narzędzia nadgoniły zaległości {#the-tooling-caught-up}

Nie musisz ręcznie kodować bazowej kryptografii. Powszechną ścieżką jest napisanie obwodu w języku wysokiego poziomu z wiedzą zerową, wygenerowanie weryfikatora w Solidity i wywołanie tego weryfikatora z kontraktu aplikacji.

Odpowiedni stos technologiczny zależy od zadania. Circom z snarkjs to ugruntowana ścieżka dla obwodów na poziomie aplikacji. Noir z Barretenberg to nowsza, przyjazna dla programistów ścieżka. Halo2 i gnark to biblioteki obwodów niższego poziomu. Maszyny wirtualne z wiedzą zerową (zkVM), takie jak RISC Zero czy SP1, dowodzą działania zwykłych programów, ale ich dowodzenie może być droższe niż w przypadku małego, niestandardowego obwodu.

W przypadku anonimowego członkostwa, zanim napiszesz własny obwód, sięgnij po istniejący protokół. Semaphore pakuje członkostwo w grupie i zapobieganie podwójnemu użyciu oparte na nulifikatorach w kontrakty i biblioteki JavaScript. W przypadku prywatnego głosowania i zarządzania, MACI jest wyspecjalizowaną ścieżką, ponieważ dodaje właściwości antykoluzyjne. Dojrzałe protokoły są często bezpieczniejsze niż nowe obwody.

## Sam dowód to za mało {#the-proof-is-not-enough}

Nawet idealny dowód zawiedzie, jeśli przepływ w portfelu ujawni powiązanie. Zarejestruj się z portfela A, a później wykonaj działanie z portfela A, a każdy obserwujący będzie mógł połączyć te transakcje. Zasil portfel B z portfela A tuż przed działaniem, a ta transakcja zasilająca stworzy ten sam problem.

Właśnie dlatego bundlery i paymastery mają znaczenie. Portfel wykonujący działanie powinien być nowy i nie powinien musieć otrzymywać ETH z portfela, który użytkownik próbuje oddzielić od tego działania.

Ten sam problem istnieje pozałańcuchowo. Przesyłanie transakcji rejestracji i działania z tego samego adresu IP, dostawcy RPC lub sesji może osłabić prywatność zapewniananą przez obwód. Frontend może powodować wycieki poprzez analitykę, pamięć lokalną i logi wsparcia. Dowód z wiedzą zerową ukrywa wartości wewnątrz dowodu. Nie ukrywa wszystkiego wokół transakcji.

Publiczne dane wejściowe to kolejne miejsce, w którym aplikacje chroniące prywatność zawodzą. Wszystko, co w obwodzie oznaczono jako publiczne, wyemitowano jako zdarzenie, dołączono do danych wywołania (calldata) lub zapisano przez kontrakt, jest widoczne. Przeglądaj publiczne dane wejściowe równie uważnie, jak kontrolę dostępu w kontrakcie Solidity.

## Co to zmienia dla twórców {#what-this-changes-for-builders}

Prywatność na Ethereum jest gotowa do wdrożenia. Twórcy mogą składać te elementy w prawdziwe aplikacje. Stos technologiczny to obwód dla prywatnego oświadczenia, weryfikator do sprawdzania dowodów, kontrakt aplikacji dla publicznych reguł, indeksator dla danych Merklego oraz bundler i paymaster do niepowiązanego przesyłania i sponsorowania gazu.

Trudne części to projektowanie produktu, zarządzanie kluczami, higiena metadanych, audyty i powiększanie zbioru anonimowości. Jeśli zrobisz błąd w którymkolwiek z tych elementów, prywatność zapewniona przez dowód zniknie.

## Dalsza lektura {#further-reading}

1. [Dowody z wiedzą zerową (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Dokumentacja Semaphore](https://docs.semaphore.pse.dev/)
3. [Dokumentacja MACI](https://maci.pse.dev/)
4. [Dokumentacja Circom](https://docs.circom.io/)
5. [Dokumentacja Noir](https://noir-lang.org/)
6. [Książka Halo2](https://zcash.github.io/halo2/)
7. [Dokumentacja gnark](https://docs.gnark.consensys.io/)
8. [Dokumentacja RISC Zero](https://dev.risczero.com/api/)
9. [Dokumentacja SP1](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: Abstrakcja konta poprzez kontrakt EntryPoint](https://eips.ethereum.org/EIPS/eip-4337)