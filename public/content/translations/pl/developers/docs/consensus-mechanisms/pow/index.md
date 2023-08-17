---
title: Proof-of-work (PoW)
description: Wyjaśnienie protokołu konsensusu proof-of-work i jego roli w Ethereum.
lang: pl
incomplete: true
---

Ethereum, podobnie jak Bitcoin, używa obecnie protokołu konsensusu o nazwie [proof-of-work (PoW)](https://wikipedia.org/wiki/Proof_of_work). Pozwala to węzłom sieci Ethereum na uzgodnienie stanu wszystkich informacji zapisanych w blockchainie Ethereum i zapobiega niektórym rodzajom ataków ekonomicznych.

## Warunki wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się z [transakcjami](/developers/docs/transactions/) i [blokami](/developers/docs/blocks/).

## Czym jest proof-of-work (PoW)? {#what-is-pow}

Proof-of-work (PoW) jest mechanizmem pozwalającym zdecentralizowanej sieci Ethereum na osiągnięcie konsensusu, lub akceptuje takie rzeczy jak salda konta i kolejność transakcji. Zapobiega to „podwójnemu wydawaniu” swoich monet przez użytkowników i zapewnia, że ​​łańcuch Ethereum jest niezwykle trudny do zaatakowania lub nadpisania.

## Proof-of-work i wydobycie {#pow-and-mining}

Proof-of-work to podstawowy algorytm, który określa poziom trudności i zasady wykonywania pracy przez górników. Wydobycie to sama „praca”. Jest to akt dodawania prawidłowych bloków do łańcucha. Jest to ważne, ponieważ długość łańcucha pomaga sieci wykryć prawidłowy łańcuch Ethereum i zrozumieć aktualny stan Ethereum. Im więcej „pracy” zostanie wykonane, im dłuższy łańcuch i im wyższy numer bloku, tym większa pewność co do aktualnego stanu rzeczy w sieci.

[Więcej o wydobyciu](/developers/docs/consensus-mechanisms/pow/mining/)

## Jak działa proof-of-work Ethereum? {#how-it-works}

Transakcje Ethereum są przetwarzane w blokach. Każdy blok zawiera:

- trudności bloku – na przykład: 3,324,092,183,262,715
- mixHash – na przykład: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – na przykład: `0xd3ee432b4fb3d26b`

Te dane bloku są bezpośrednio związane z PoW.

### Praca na potrzeby proof-of-work {#the-work}

Protokół proof-of-work, znany jako Ethash, wymaga od górników intensywnego wyścigu prób i błędów, aby znaleźć blok nonce. Do łańcucha można dodać tylko bloki z poprawnym nonce.

Podczas wyścigu o utworzenie bloku, górnik wielokrotnie umieszcza zbiór danych, który można uzyskać tylko po pobraniu i uruchomieniu pełnego łańcucha (tak jak robi to górnik), za pomocą funkcji matematycznej. Ma to na celu wygenerowanie mixHash, który jest poniżej docelowego nonce, zgodnie z trudnością bloku. Najlepszym sposobem na to jest metoda prób i błędów.

Trudność określa cel hashu. Im niższy cel, tym mniejszy zestaw prawidłowych hashów. Po wygenerowaniu jest to niezwykle łatwe do zweryfikowania przez innych górników i klientów. Nawet jeśli jedna transakcja miałaby się zmienić, hash byłby zupełnie inny, sygnalizując oszustwo.

Haszowanie ułatwia wykrycie oszustwa. Ale PoW jako proces jest również dużym środkiem odstraszającym do atakowania łańcucha.

### Proof-of-work i bezpieczeństwo {#security}

Górnicy są zachęcani do wykonywania tych prac w głównym łańcuchu Ethereum. W niewielkim stopniu zachęca się podzbiór górników do uruchomienia własnego łańcucha – podważa to system. Blockchainy opierają się na jednym stanie jako źródle prawdy. Użytkownicy zawsze wybierają najdłuższy lub „najcięższy” łańcuch.

Celem programu PoW jest rozszerzenie łańcucha. Najdłuższy łańcuch jest najbardziej wiarygodny jako prawidłowy, ponieważ wykonano na nim najwięcej pracy obliczeniowej. W systemie PoW Ethereum prawie niemożliwe jest tworzenie nowych bloków, które usuwają transakcje lub tworzą fałszywe transakcje, lub utrzymują drugi łańcuch. Dzieje się tak, ponieważ złośliwy górnik musiałby zawsze rozwiązywać blok n-razy szybciej niż wszyscy inni.

Aby konsekwentnie tworzyć złośliwe, ale ważne bloki, potrzebujesz ponad 51% mocy wydobycia sieci, aby pokonać wszystkich innych. Potrzebujesz dużo mocy obliczeniowej, aby móc wykonać tę ilość „pracy”. A wydatkowanie energii może nawet przewyższyć zyski, jakie możesz osiągnąć w ataku.

### Ekonomia proof-of-work {#economics}

PoW jest również odpowiedzialny za emisję nowej waluty do systemu i zachęcanie górników do wykonywania pracy.

Górnicy, którzy pomyślnie utworzyli blok, są nagrodzeni w 2 świeżo wybitnych ETH i wszystkie opłaty transakcyjne w ramach bloku. Górnik może również otrzymać 1,75 Eth na blok wuja. To poprawny blok, utworzony jednocześnie z udanym blokiem, przez innego górnika. Zwykle dzieje się to z powodu opóźnień w sieci.

## Nieodwołalność {#finality}

W sieciach rozproszonych transakcja osiąga „nieodwołalność”, gdy staje się częścią bloku, który nie może się zmienić.

Ponieważ górnicy działają w sposób zdecentralizowany, możliwe jest wydobycie dwóch ważnych bloków jednocześnie. Tworzy to tymczasowy fork. Ostatecznie jeden łańcuch stanie się akceptowanym łańcuchem, gdy kolejny blok zostanie wydobyty i dodany, co sprawi, że będzie dłuższy.

Ale aby jeszcze bardziej skomplikować sprawy, transakcje, które zostały odrzucone na tymczasowym forku, mogły być zawarte w zaakceptowanym łańcuchu. Oznacza to, że może on zostać odwrócony. Zatem nieodwołalność odnosi się do czasu, w którym należy poczekać przed uznaniem transakcji za nieodwracalną. Dla Ethereum zalecany czas to 6 bloków lub nieco ponad 1 minuta. Następnie można z względną pewnością powiedzieć, że transakcja zakończyła się sukcesem. Oczywiście można dłużej czekać na jeszcze większą pewność.

Należy o tym pamiętać podczas projektowania zdecentralizowanych aplikacji, ponieważ błędne przedstawianie informacji o transakcjach użytkownikom byłoby kiepskim doświadczeniem. Zwłaszcza jeśli transakcja ma wysoką wartość.

Pamiętaj, że ten czas nie zawiera czasu oczekiwania na odebranie transakcji przez górnika.

## Wady i zalety {#pros-and-cons}

| Zalety                                                                                                                                                                                                                           | Wady                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PoW jest neutralny. Nie potrzebujesz ETH, aby rozpocząć, a nagrody blokowe pozwalają przejść od 0ETH do salda dodatniego. W przypadku [proof of stake](/developers/docs/consensus-mechanisms/pos/) potrzebujesz ETH na początek. | PoW zużywa tak dużo energii, że jest to szkodliwe dla środowiska.                                                                                                                  |
| PoW to wypróbowany i przetestowany mechanizm konsensusu, dzięki któremu Bitcoin i Ethereum były bezpieczne i zdecentralizowane od wielu lat.                                                                                     | Jeśli chcesz kopać, potrzebujesz tak specjalistycznego sprzętu, że to duża inwestycja na początek.                                                                                 |
| W porównaniu z proof-of-stake jest to stosunkowo łatwe w realizacji.                                                                                                                                                             | Ze względu na coraz większe zapotrzebowanie obliczeniowe, pule wydobywcze mogą potencjalnie zdominować grę wydobywczą, co prowadzi do centralizacji i zagrożeń dla bezpieczeństwa. |

## W porównaniu z proof of stake {#compared-to-pos}

Na wysokim poziomie proof of stake ma ten sam cel co proof of work: pomoc w osiągnięciu konsensusu przez zdecentralizowaną sieć w bezpieczny sposób. Ma jednak pewne różnice w procesie i pracownikach:

- PoS zmienia znaczenie mocy obliczeniowej dla ETH
- PoS zastępuje górników walidatorami. Walidatorzy stawiają ETH w celu aktywacji możliwości tworzenia nowych bloków.
- Walidatorzy nie konkurują o tworzenie bloków, zamiast tego są wybierani losowo przez algorytm.
- Nieodwołalność jest jaśniejsza: w niektórych punktach kontrolnych, jeżeli 2/3 zatwierdzających zgadza się co do stanu bloku, jest on uważany za ostateczny. Walidatorzy muszą postawić na to całą swoją stawkę, więc jeśli spróbują się zmówić, stracą ją.

[Więcej o proof-of-stake](/developers/docs/consensus-mechanisms/pos/)

## Dalsza lektura {#further-reading}

- [Atak większościowy](https://en.bitcoin.it/wiki/Majority_attack)
- [O nieodwołalności rozliczenia](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

## Tematy powiązane {#related-topics}

- [Wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/)
- [proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
