---
title: "Zrozumienie mechanizmów konsensusu blockchain"
description: "Wyjaśnienie obejmujące główne mechanizmy konsensusu używane w blockchainach oraz to, jak umożliwiają one zdecentralizowanym sieciom uzgodnienie stanu transakcji bez centralnego organu."
lang: pl
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "konsensus"
  - "blockchain"
format: explainer
author: Tech in Asia
breadcrumb: "Mechanizmy konsensusu"
---

Wyjaśnienie przygotowane przez **Tech in Asia** obejmujące trzy główne mechanizmy konsensusu używane w systemach blockchain: dowód pracy (PoW), dowód stawki (PoS) i dowód autorytetu (PoA), oraz to, jak umożliwiają one zdecentralizowanym sieciom uzgodnienie stanu transakcji.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=ojxfbN78WFQ) opublikowanego przez Tech in Asia. Został on lekko zredagowany w celu poprawy czytelności.*

#### Czym są mechanizmy konsensusu? (0:00) {#what-are-consensus-mechanisms-000}

Blockchain — najpopularniejsze słowo 2018 roku. Ale czy wiesz, jak zdecentralizowany system peer-to-peer bez organu nadzorczego podejmuje decyzje? Odpowiedź leży w mechanizmach konsensusu. Istnieją różne mechanizmy konsensusu, ale wszystkie służą temu samemu celowi: zapewnieniu, że zapisy są prawdziwe i rzetelne. Różnica polega na sposobie osiągania konsensusu. Tutaj przyjrzymy się trzem rodzajom mechanizmów konsensusu.

#### Dowód pracy (PoW) (0:23) {#proof-of-work-023}

W systemie opartym na dowodzie pracy (PoW), dane transakcji są przechowywane w blokach, które są walidowane poprzez rozwiązywanie skomplikowanego problemu matematycznego, który jest do nich dołączony. Zazwyczaj robią to potężne komputery, a proces ten jest znany jako „kopanie”. Nagroda w postaci kryptowaluty jest przyznawana pierwszemu górnikowi, który rozwiąże ten problem.

Wyobraź sobie grupę poszukiwaczy skarbów próbujących otworzyć skrzynię ze skomplikowanym zamkiem. Odgadnięcie właściwej kombinacji jest żmudne, ale pierwsza osoba, która to zrobi, otrzymuje nagrodę. Mówiąc prościej, dowód pracy (PoW) to wyścig o odgadnięcie właściwej kombinacji do skrzyni skarbów. Kryptowaluty takie jak Bitcoin i Ethereum używają mechanizmu dowodu pracy (PoW).

#### Dowód stawki (PoS) (1:04) {#proof-of-stake-104}

Następnie mamy dowód stawki (PoS). Tutaj twórca nowego bloku, znany również jako walidator, jest wybierany losowo na podstawie tego, jak dużą stawkę wnosi do sieci. Im wyższa wniesiona stawka, tym większa szansa na zostanie wybranym jako walidator.

Zastosujmy to do scenariusza ze skrzynią skarbów. Wyobraź sobie grupę poszukiwaczy skarbów rywalizujących o skrzynię. Skrzynia jest przyznawana na podstawie systemu loterii. Aby wziąć udział, każdy poszukiwacz musi kupić losy na loterię. Im więcej losów kupi dany poszukiwacz, tym większa szansa na wygraną. Protokoły blockchain, takie jak Ouroboros od Cardano i EOS, przyjmują konsensus dowodu stawki (PoS).

#### Dowód autorytetu (PoA) (1:42) {#proof-of-authority-142}

Na koniec dowód autorytetu (PoA) — zmodyfikowana forma dowodu stawki (PoS). Tutaj tylko zatwierdzone strony, wybrane na podstawie ich reputacji, mogą zostać walidatorami.

Wróćmy do scenariusza ze skrzynią skarbów. Grupa poszukiwaczy skarbów tworzy związek i łączy swoje skarby. Na podstawie poziomu ich wiarygodności, kilku wybranych zostaje wyznaczonych przez grupę, aby zapewnić ważność zawartości skrzyni. Hyperledger Fabric od IBM oraz sieć testowa Kovan w Ethereum to przykłady systemów blockchain, które używają dowodu autorytetu (PoA).

#### Hybrydowe modele konsensusu (2:14) {#hybrid-consensus-models-214}

Podczas gdy tradycyjne firmy blockchain opierają się na pojedynczym mechanizmie konsensusu, niektóre innowacyjne przedsiębiorstwa przyjmują wiele protokołów konsensusu. Weźmy na przykład Opet Foundation, która buduje unikalny blockchain do przechowywania danych zebranych w swojej aplikacji chatbota wspomagającego naukę, stosując zarówno protokoły dowodu autorytetu (PoA), jak i dowodu pracy (PoW).

Dane takie jak wyniki w nauce, zajęcia pozalekcyjne i profile osobowości uczniów są przechowywane na blockchainie i potencjalnie walidowane za pomocą struktury dowodu autorytetu (PoA) opartej na Hyperledger Fabric. Walidatorami w tym przypadku są renomowane instytucje edukacyjne, a nawet krajowe rejestry i odpowiednie ministerstwa edukacji. Pomaga to zapewnić, że wszystkie dane uczniów są wiarygodne.

Ale kto będzie pracował za darmo? Konsensus dowodu pracy (PoW) wkracza do gry, aby nagrodzić walidatorów, którzy wykonali pracę.

#### Prywatność i dane uczniów (3:02) {#privacy-and-student-data-302}

Dzięki Hyperledger Fabric każdy rekord ucznia jest zabezpieczony prywatnym kluczem hash, którego właścicielem jest uczeń. Dostęp do danych można uzyskać tylko wtedy, gdy uczeń poda ten unikalny klucz. Oznacza to, że prywatność ucznia jest zachowana i kontrolowana przez niego samego.

Na przykład, gdy uczniowie aplikują na uniwersytet za pośrednictwem platformy Opet, przekazują uniwersytetowi unikalny klucz do swoich rekordów. Dzięki temu uniwersytet ma dostęp do ich najnowszych wyników w nauce. Uczniowie będą również mogli zobaczyć, czy ich rekordy zostały odblokowane lub przynajmniej wzięte pod uwagę w procesie rekrutacji. Zwiększa to wydajność i przejrzystość w porównaniu z tradycyjnymi metodami.

#### Zakończenie (3:37) {#closing-337}

Łącząc modele dowodu pracy (PoW) i dowodu autorytetu (PoA), rozwiązanie blockchain Opet Foundation zapewnia prywatność danych uczniów, jednocześnie motywując zarówno instytucje edukacyjne, jak i uczniów do wnoszenia wkładu w platformę. Ponieważ blockchainy zyskują na popularności, to tylko kwestia czasu, zanim zobaczymy jeszcze więcej unikalnych systemów hybrydowych.