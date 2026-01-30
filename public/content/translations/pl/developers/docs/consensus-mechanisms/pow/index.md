---
title: Proof of work (PoW)
description: Wyjaśnienie protokołu konsensusu proof-of-work i jego roli w Ethereum.
lang: pl
---

Sieć Ethereum na początku używała mechanizmu konsensusu zwanego **[Proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow)**. To pozwalało węzłom sieci Ethereum na uzgadnianie stanu wszystkich informacji zarejestrowanych na łańcuchu bloków Ethereum i zapobiegało niektórym rodzajom ataków ekonomicznych. Jednakże w 2022 roku Ethereum wyłączyło mechanizm proof-of-work i zamiast niego zaczęło używać [proof-of-stake](/developers/docs/consensus-mechanisms/pos).

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    proof-of-work odtąd został wycofany. Ethereum nie używa już proof-of-work jako części swojego mechanizmu konsensusu. Zamiast tego, używa proof-of-stake. Przeczytaj więcej o [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) i [stakingu](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznanie się z [transakcjami](/developers/docs/transactions/), [blokami](/developers/docs/blocks/) i [mechanizmami konsensusu](/developers/docs/consensus-mechanisms/).

## Czym jest Proof-of-work (PoW)? {#what-is-pow}

Konsensus Nakamoto, który wykorzystuje proof-of-work, to mechanizm, który kiedyś pozwalał zdecentralizowanej sieci Ethereum osiągnąć konsensus (tzn. wszystkie węzły dochodzą do porozumienia) w takich kwestiach, jak salda kont i kolejność transakcji. To uniemożliwiało użytkownikom 'podwójne wydawanie' ich monet i gwarantowało, że łańcuch Ethereum był niezwykle trudny do atakowania i manipulowania. Te właściwości bezpieczeństwa pochodzą teraz z mechanizmu proof-of-stake, wykorzystując mechanizm konsensusu znany jako [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Proof-of-work i wydobycie {#pow-and-mining}

proof-of-work jest głównym algorytmem, który ustala trudność oraz zasady pracy wykonywanej przez górników na blockchainie typu proof-of-work. Wydobycie to sama „praca”. Jest to akt dodawania prawidłowych bloków do łańcucha. Jest to ważne, ponieważ długość łańcucha pomaga sieci podążać za prawidłowym rozgałęzieniem blockchainu. Im więcej „pracy” zostanie wykonane, im dłuższy łańcuch i im wyższy numer bloku, tym większa pewność co do aktualnego stanu rzeczy w sieci.

[Więcej o wydobyciu](/developers/docs/consensus-mechanisms/pow/mining/)

## Jak działał mechanizm proof-of-work w Ethereum? {#how-it-works}

Transakcje Ethereum są przetwarzane w blokach. W wycofanym już mechanizmie proof-of-work w Ethereum każdy blok zawierał:

- trudności bloku – na przykład: 3,324,092,183,262,715
- mixHash – na przykład: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – na przykład: `0xd3ee432b4fb3d26b`

Te dane bloku były bezpośrednio związane z mechanizmem proof-of-work.

### Praca na potrzeby proof-of-work {#the-work}

Protokół proof-of-work, Ethash, wymagał od górników, aby przeszli przez intensywny wyścig prób i błędów w celu znalezienia wartości nonce dla bloku. Tylko bloki z prawidłowym nonce mogły być dodane do łańcucha.

Podczas wyścigu o utworzenie bloku górnik wielokrotnie przepuszczał przez funkcję matematyczną zbiór danych, który można było uzyskać jedynie poprzez pobranie i uruchomienie pełnego łańcucha (tak jak robi to górnik). Ten zbiór danych służył do wygenerowania wartości mixHash poniżej celu, który jest podyktowany trudnością bloku. Najlepszym sposobem na to jest metoda prób i błędów.

Trudność określała cel dla haszu. Im niższy cel, tym mniejszy zestaw prawidłowych hashów. Po wygenerowaniu, było to niezwykle łatwe do zweryfikowania przez innych górników i klientów. Nawet gdyby jedna transakcja uległa zmianie, hasz byłby zupełnie inny, co sygnalizowałoby oszustwo.

Haszowanie ułatwia wykrycie oszustwa. Ale proces proof-of-work był również istotnym czynnikiem zniechęcającym do atakowania łańcucha.

### Proof-of-work i bezpieczeństwo {#security}

Górnicy mieli motywację, aby wykonywać tę pracę w głównym łańcuchu Ethereum. Niewielka była motywacja, aby podzbiór górników zakładał własny łańcuch — podważa to cały system. Blockchainy opierają się na jednym stanie jako źródle prawdy.

Celem proof-of-work było przedłużenie łańcucha. Najdłuższy łańcuch był najbardziej wiarygodny pod względem poprawności, ponieważ wymagał najwięcej mocy obliczeniowej do wygenerowania. W systemie Ethereum proof-of-work niemal niemożliwe było stworzenie nowego bloku, który wymazywał transakcje, tworzył fałszywe transakcje lub utrzymywał drugi łańcuch. Wynikało to z tego, że złośliwy górnik musiałby zawsze rozwiązać nonce bloku szybciej niż wszyscy inni.

Aby konsekwentnie tworzyć złośliwe, ale poprawne bloki, złośliwy górnik musiałby posiadać ponad 51% całej mocy wydobywczej sieci, aby pokonać wszystkich innych. Taka ilość "pracy" wymaga tak wielkiej ilości drogiej mocy obliczeniowej i zużytej energii, że może to przeważyć zyski z wykonanego ataku.

### Ekonomia proof-of-work {#economics}

proof-of-work było również odpowiedzialne za emisję nowej waluty do systemu i zachęcenie górników do wykonania pracy.

Od czasu [aktualizacji Constantinople](/ethereum-forks/#constantinople) górnicy, którzy pomyślnie utworzyli blok, byli nagradzani dwoma nowo wybitymi ETH i częścią opłat transakcyjnych. Bloki ommer również otrzymywały 1,75 ETH. Bloki ommer były poprawnymi blokami stworzonymi przez górnika praktycznie w tym samym czasie, gdy inny górnik tworzył blok kanoniczny, co ostatecznie było rozsądzane na podstawie informacji, który łańcuch został zbudowany jako pierwszy. Bloki ommer zdarzały się głównie przez opóźnienie sieci.

## Nieodwołalność {#finality}

Transakcja ma "nieodwołalność" na Ethereum, kiedy jest częścią bloku, którego nie można zmienić.

Ponieważ górnicy pracowali w zdecentralizowany sposób, dwa poprawne bloki mogły być wykopane w tym samym czasie. Tworzy to tymczasowy fork. Ostatecznie jeden z tych łańcuchów stawał się akceptowanym łańcuchem po wydobyciu i dołączeniu kolejnego bloku, który powodował jego wydłużenie.

Aby skomplikować jeszcze nieco tę kwestię, transakcje odrzucone na tymczasowym rozgałęzieniu nie mogły zostać zawarte w zaakceptowanym łańcuchu. Oznacza to, że może on zostać odwrócony. Zatem nieodwołalność odnosi się do czasu, w którym należy poczekać przed uznaniem transakcji za nieodwracalną. W poprzedniej wersji Ethereum opartej na proof-of-work, im więcej bloków zostało wykopanych na konkretnym bloku `N`, tym większa była pewność, że transakcje w `N` powiodły się i nie zostaną cofnięte. Teraz, w modelu proof-of-stake, finalizacja jest jawną, a nie probabilistyczną właściwością danego bloku.

## Zużycie energii przez proof-of-work {#energy}

Istotnym punktem krytyki modelu proof-of-work jest ilość energii zużywanej do zabezpieczenia sieci. Aby utrzymać bezpieczeństwo i decentralizację, Ethereum w modelu proof-of-work wykorzystywało duże zasoby energii. Krótko przed przejściem na proof-of-stake górnicy Ethereum zużywali łącznie około 70 TWh/rok (mniej więcej tyle samo co Czechy – według [digiconomist](https://digiconomist.net/) z 18 lipca 2022 r.).

## Zalety i wady {#pros-and-cons}

| Zalety                                                                                                                                                                                                                                                                                           | Wady                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Model proof-of-work jest neutralny. Nie potrzebujesz ETH, aby rozpocząć, a nagrody blokowe pozwalają przejść od 0ETH do salda dodatniego. W przypadku [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) na początek potrzebujesz ETH. | Model proof-of-work zużywa tyle energii, że jest szkodliwy dla środowiska.                                                                                                         |
| Model proof-of-work jest przetestowanym mechanizmem konsensusu, który zapewniał bezpieczeństwo i decentralizację sieciom Bitcoin, jak i Ethereum przez wiele lat.                                                                                                                | Jeśli chcesz kopać, potrzebujesz tak specjalistycznego sprzętu, że na początek jest to duża inwestycja.                                                                            |
| W porównaniu z proof-of-stake jest to stosunkowo łatwe w realizacji.                                                                                                                                                                                                             | Ze względu na coraz większe zapotrzebowanie obliczeniowe, pule wydobywcze mogą potencjalnie zdominować grę wydobywczą, co prowadzi do centralizacji i zagrożeń dla bezpieczeństwa. |

## W porównaniu z proof-of-stake {#compared-to-pos}

Na wysokim poziomie, model proof-of-stake ma taki sam cel co proof-of-work: pomóc zdecentralizowanej sieci osiągnąć konsensus w bezpieczny sposób. Ma jednak pewne różnice w procesie i pracownikach:

- Model proof-of-stake zamienia moc obliczeniową na zestakowane ETH.
- Model proof-of-stake zamienia górników na walidatorów. Walidatorzy stawiają ETH w celu aktywacji możliwości tworzenia nowych bloków.
- Walidatorzy nie konkurują o tworzenie bloków, zamiast tego są wybierani losowo przez algorytm.
- Nieodwołalność jest jaśniejsza: w niektórych punktach kontrolnych, jeżeli 2/3 zatwierdzających zgadza się co do stanu bloku, jest on uważany za ostateczny. Walidatorzy muszą postawić na to całą swoją stawkę, więc jeśli spróbują się zmówić, stracą ją.

[Więcej o proof-of-stake](/developers/docs/consensus-mechanisms/pos/)

## Jesteś raczej wzrokowcem? Dla wzrokowców {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Dalsza lektura {#further-reading}

- [Atak większościowy](https://en.bitcoin.it/wiki/Majority_attack)
- [O nieodwołalności rozliczeń](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Filmy {#videos}

- [Techniczne wyjaśnienie protokołów proof-of-work](https://youtu.be/9V1bipPkCTU)

## Powiązane tematy {#related-topics}

- [Wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)
