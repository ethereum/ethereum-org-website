---
title: Dowód pracy (PoW)
description: Wyjaśnienie protokołu konsensusu dowodu pracy i jego roli w Ethereum.
lang: pl
---

Sieć [Ethereum](/) początkowo korzystała z mechanizmu konsensusu, który opierał się na **[dowodzie pracy (PoW)](/developers/docs/consensus-mechanisms/pow)**. Pozwalało to węzłom sieci Ethereum na osiągnięcie zgody co do stanu wszystkich informacji zapisanych na blockchainie Ethereum i zapobiegało pewnym rodzajom ataków ekonomicznych. Jednakże w 2022 roku Ethereum wyłączyło dowód pracy i zaczęło zamiast niego używać [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos).

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Dowód pracy został wycofany. Ethereum nie używa już dowodu pracy jako części swojego mechanizmu konsensusu. Zamiast tego używa dowodu stawki. Przeczytaj więcej o [dowodzie stawki](/developers/docs/consensus-mechanisms/pos/) i [stakingu](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się z [transakcjami](/developers/docs/transactions/), [blokami](/developers/docs/blocks/) oraz [mechanizmami konsensusu](/developers/docs/consensus-mechanisms/).

## Czym jest dowód pracy (PoW)? {#what-is-pow}

Konsensus Nakamoto, który wykorzystuje dowód pracy, to mechanizm, który niegdyś pozwalał zdecentralizowanej sieci Ethereum na osiągnięcie konsensusu (tj. zgody wszystkich węzłów) w kwestiach takich jak salda kont i kolejność transakcji. Zapobiegało to „podwójnemu wydawaniu” monet przez użytkowników i zapewniało, że łańcuch Ethereum był niezwykle trudny do zaatakowania lub zmanipulowania. Te właściwości bezpieczeństwa pochodzą teraz z dowodu stawki, wykorzystującego mechanizm konsensusu znany jako [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Dowód pracy i kopanie {#pow-and-mining}

Dowód pracy to podstawowy algorytm, który ustala trudność i zasady pracy, jaką górnicy wykonują na blockchainach opartych na dowodzie pracy. Kopanie to sama „praca”. Jest to czynność dodawania prawidłowych bloków do łańcucha. Jest to ważne, ponieważ długość łańcucha pomaga sieci podążać za właściwym rozwidleniem blockchaina. Im więcej wykonanej „pracy”, tym dłuższy łańcuch i wyższy numer bloku, a co za tym idzie – tym większą pewność co do obecnego stanu może mieć sieć.

[Więcej o kopaniu](/developers/docs/consensus-mechanisms/pow/mining/)

## Jak działał dowód pracy w Ethereum? {#how-it-works}

Transakcje w Ethereum są przetwarzane w bloki. W wycofanym już Ethereum opartym na dowodzie pracy każdy blok zawierał:

- trudność bloku – na przykład: 3,324,092,183,262,715
- mixHash – na przykład: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – na przykład: `0xd3ee432b4fb3d26b`

Te dane bloku były bezpośrednio związane z dowodem pracy.

### Praca w dowodzie pracy {#the-work}

Protokół dowodu pracy, Ethash, wymagał od górników udziału w intensywnym wyścigu prób i błędów w celu znalezienia wartości nonce dla bloku. Tylko bloki z prawidłowym nonce mogły zostać dodane do łańcucha.

Ścigając się o utworzenie bloku, górnik wielokrotnie przepuszczał przez funkcję matematyczną zbiór danych, który można było uzyskać tylko poprzez pobranie i uruchomienie pełnego łańcucha (co robi górnik). Zbiór danych był używany do wygenerowania wartości mixHash poniżej celu podyktowanego przez trudność bloku. Najlepszym sposobem na to jest metoda prób i błędów.

Trudność określała cel dla hasha. Im niższy cel, tym mniejszy zbiór prawidłowych hashów. Po wygenerowaniu było to niezwykle łatwe do zweryfikowania przez innych górników i klientów. Nawet gdyby jedna transakcja uległa zmianie, hash byłby zupełnie inny, sygnalizując oszustwo.

Haszowanie sprawia, że oszustwo jest łatwe do zauważenia. Jednak dowód pracy jako proces był również dużym czynnikiem odstraszającym przed atakiem na łańcuch.

### Dowód pracy a bezpieczeństwo {#security}

Górnicy byli motywowani do wykonywania tej pracy na głównym łańcuchu Ethereum. Istniała niewielka zachęta dla podgrupy górników do uruchomienia własnego łańcucha – podważa to system. Blockchainy opierają się na posiadaniu pojedynczego stanu jako źródła prawdy.

Celem dowodu pracy było wydłużenie łańcucha. Najdłuższy łańcuch był najbardziej wiarygodny jako ten prawidłowy, ponieważ do jego wygenerowania wykonano najwięcej pracy obliczeniowej. W systemie PoW Ethereum było prawie niemożliwe tworzenie nowych bloków, które usuwałyby transakcje, tworzyły fałszywe lub utrzymywały drugi łańcuch. Wynikało to z faktu, że złośliwy górnik musiałby zawsze rozwiązywać nonce bloku szybciej niż wszyscy inni.

Aby konsekwentnie tworzyć złośliwe, ale prawidłowe bloki, złośliwy górnik potrzebowałby ponad 51% mocy kopania w sieci, aby pokonać wszystkich innych. Taka ilość „pracy” wymaga ogromnej, drogiej mocy obliczeniowej, a zużyta energia mogłaby nawet przewyższyć zyski z ataku.

### Ekonomia dowodu pracy {#economics}

Dowód pracy był również odpowiedzialny za emisję nowej waluty do systemu i motywowanie górników do wykonywania pracy.

Od czasu aktualizacji [Konstantynopol](/ethereum-forks/#constantinople) górnicy, którym udało się utworzyć blok, byli nagradzani dwoma nowo wyemitowanymi ETH oraz częścią opłat transakcyjnych. Bloki ommer również były rekompensowane kwotą 1,75 ETH. Bloki ommer były prawidłowymi blokami utworzonymi przez górnika praktycznie w tym samym czasie, gdy inny górnik utworzył blok kanoniczny, co ostatecznie zależało od tego, na którym łańcuchu najpierw nadbudowano kolejne bloki. Bloki ommer zazwyczaj powstawały z powodu opóźnień w sieci.

## Ostateczność {#finality}

Transakcja osiąga „ostateczność” w Ethereum, gdy jest częścią bloku, który nie może ulec zmianie.

Ponieważ górnicy pracowali w sposób zdecentralizowany, dwa prawidłowe bloki mogły zostać wykopane w tym samym czasie. Tworzy to tymczasowe rozwidlenie. Ostatecznie jeden z tych łańcuchów stawał się łańcuchem zaakceptowanym po tym, jak kolejne bloki zostały wykopane i do niego dodane, czyniąc go dłuższym.

Co więcej, transakcje odrzucone na tymczasowym rozwidleniu mogły nie zostać uwzględnione w zaakceptowanym łańcuchu. Oznacza to, że mogły zostać cofnięte. Zatem ostateczność odnosi się do czasu, jaki należy odczekać przed uznaniem transakcji za nieodwracalną. W poprzednim Ethereum opartym na dowodzie pracy, im więcej bloków zostało wykopanych na wierzchu konkretnego bloku `N`, tym większa była pewność, że transakcje w `N` zakończyły się sukcesem i nie zostaną cofnięte. Obecnie, dzięki dowodowi stawki, finalizacja jest jawną, a nie probabilistyczną właściwością bloku.

## Zużycie energii przez dowód pracy {#energy}

Główną krytyką dowodu pracy jest ilość energii wymagana do zapewnienia bezpieczeństwa sieci. Aby utrzymać bezpieczeństwo i decentralizację, Ethereum oparte na dowodzie pracy zużywało ogromne ilości energii. Krótko przed przejściem na dowód stawki górnicy Ethereum zużywali łącznie około 70 TWh rocznie (mniej więcej tyle samo co Czechy – według [digiconomist](https://digiconomist.net/) z 18 lipca 2022 r.).

## Plusy i minusy {#pros-and-cons}

| Plusy                                                                                                                                                                                                                         | Minusy                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Dowód pracy jest neutralny. Nie potrzebujesz ETH, aby zacząć, a nagrody za bloki pozwalają przejść od 0 ETH do dodatniego salda. W przypadku [dowodu stawki](/developers/docs/consensus-mechanisms/pos/) potrzebujesz ETH na start. | Dowód pracy zużywa tak dużo energii, że jest szkodliwy dla środowiska.                                                                      |
| Dowód pracy to wypróbowany i przetestowany mechanizm konsensusu, który przez wiele lat zapewniał bezpieczeństwo i decentralizację Bitcoina i Ethereum.                                                                                          | Jeśli chcesz kopać, potrzebujesz tak specjalistycznego sprzętu, że rozpoczęcie działalności wiąże się z dużą inwestycją.                                                |
| W porównaniu do dowodu stawki jest stosunkowo łatwy do wdrożenia.                                                                                                                                                                | Ze względu na rosnące zapotrzebowanie na obliczenia, pule wydobywcze mogłyby potencjalnie zdominować grę w kopanie, prowadząc do centralizacji i zagrożeń bezpieczeństwa. |

## Porównanie z dowodem stawki {#compared-to-pos}

Na wysokim poziomie dowód stawki ma ten sam cel końcowy co dowód pracy: pomóc zdecentralizowanej sieci w bezpiecznym osiągnięciu konsensusu. Istnieją jednak pewne różnice w procesie i uczestnikach:

- Dowód stawki zamienia znaczenie mocy obliczeniowej na stakowane ETH.
- Dowód stawki zastępuje górników walidatorami. Walidatorzy stakują swoje ETH, aby aktywować możliwość tworzenia nowych bloków.
- Walidatorzy nie rywalizują o tworzenie bloków, zamiast tego są wybierani losowo przez algorytm.
- Ostateczność jest wyraźniejsza: w określonych punktach kontrolnych, jeśli 2/3 walidatorów zgadza się co do stanu bloku, jest on uważany za ostateczny. Walidatorzy muszą postawić na to całą swoją stawkę, więc jeśli spróbują później wejść w zmowę, stracą całą swoją stawkę.

[Więcej o dowodzie stawki](/developers/docs/consensus-mechanisms/pos/)

## Wolisz uczyć się wzrokowo? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Dalsza lektura {#further-reading}

- [Atak większościowy](https://en.bitcoin.it/wiki/Majority_attack)
- [O ostateczności rozrachunku](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Filmy {#videos}

- [Techniczne wyjaśnienie protokołów dowodu pracy](https://youtu.be/9V1bipPkCTU)

## Powiązane tematy {#related-topics}

- [Kopanie](/developers/docs/consensus-mechanisms/pow/mining/)
- [Dowód stawki](/developers/docs/consensus-mechanisms/pos/)
- [Dowód autorytetu (PoA)](/developers/docs/consensus-mechanisms/poa/)