---
title: Restaking
metaTitle: "Czym jest restaking? | Korzyści i zastosowanie restakingu"
description: "Użyj stakowanego ETH do zabezpieczenia innych zdecentralizowanych usług i zdobywaj dodatkowe nagrody."
lang: pl
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: Wizualna reprezentacja restakingu na Ethereum.
sidebarDepth: 2
summaryPoint1: "Użyj stakowanego ETH do zabezpieczenia innych zdecentralizowanych usług i zdobywaj dodatkowe nagrody."
buttons:
  - content: Czym jest restaking?
    toId: what-is-restaking
  - content: Jak to działa?
    toId: how-does-restaking-work
    isSecondary: false
---

Sieć Ethereum zabezpiecza wartość miliardów dolarów 24/7, 365 dni w roku. Jak?

Ludzie z całego świata blokują (lub „stakują”) [ether (ETH)](/eth/) w smart kontraktach, aby uruchomić oprogramowanie, które przetwarza transakcje Ethereum i zabezpiecza sieć Ethereum. W zamian są nagradzani dodatkowym ETH.

Restaking to technologia stworzona dla [stakerów](/staking/) w celu rozszerzenia tego zabezpieczenia na inne usługi, aplikacje lub sieci. W zamian otrzymują dodatkowe nagrody za restaking. Jednak narażają również swoje stakowane ETH na większe ryzyko.

**Restaking wyjaśniony w 18 minut**

<YouTube id="rOJo7VwPh7I" />

## Czym jest restaking? {#what-is-restaking}

Restaking ma miejsce, gdy stakerzy używają swoich już stakowanych ETH do zabezpieczenia innych zdecentralizowanych usług. W zamian restakerzy mogą uzyskać dodatkowe nagrody z tych innych usług oprócz regularnych nagród za stakowanie ETH.

Zdecentralizowane usługi zabezpieczone przez restaking są znane jako „aktywnie walidowane usługi” (AVS).
W ten sam sposób, w jaki wielu stakerów ETH uruchamia oprogramowanie do walidacji Ethereum, wielu restakerów uruchamia wyspecjalizowane oprogramowanie AVS.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Dobrze wiedzieć</strong></p>
  <p className="mt-2">Chociaż „aktywnie walidowane usługi” (AVS) to najczęstsza nazwa, różne platformy restakingu mogą używać innych nazw dla zdecentralizowanych usług, które pomagają zabezpieczać, takich jak „autonomicznie walidowane usługi”, „rozproszone bezpieczne usługi” czy „sieci”.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking a restaking {#staking-vs-restaking}

| Staking                        | Restaking                                          |
| ------------------------------ | -------------------------------------------------- |
| Zdobywaj nagrody w ETH         | Zdobywaj nagrody w ETH + nagrody AVS               |
| Zabezpiecza sieć Ethereum      | Zabezpiecza sieć Ethereum + AVS-y                  |
| Brak minimalnej kwoty ETH      | Brak minimalnej kwoty ETH                          |
| Niski poziom ryzyka            | Poziom ryzyka od niskiego do wysokiego             |
| Czas wypłaty zależy od kolejki | Czas wypłaty zależy od kolejki + okresu unbondingu |

## Dlaczego potrzebujemy restakingu? {#why-do-we-need-restaking}

Wyobraź sobie dwa światy: jeden z restakingiem, a drugi bez.

 <TabbedSection />

W tym świecie z restakingiem zarówno AVS, jak i stakerzy czerpią korzyści z możliwości wzajemnego odnalezienia się i wymiany bezpieczeństwa na dodatkowe nagrody.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Dodatkowa korzyść z restakingu</strong></p>
  <p className="mt-2">AVS-y mogą przeznaczyć wszystkie swoje zasoby na budowanie i marketing swoich usług, zamiast rozpraszać się decentralizacją i bezpieczeństwem.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Jak działa restaking? {#how-does-restaking-work}

W restaking zaangażowanych jest kilka podmiotów – każdy z nich odgrywa ważną rolę.

| **Termin**               | **Opis**                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Platformy restakingu** | Platforma restakingu to usługa, która łączy AVS-y, stakerów ETH i operatorów. Tworzą aplikacje zdecentralizowane dla stakerów, aby mogli oni restakować swoje ETH, oraz rynki, na których stakerzy, AVS-y i operatorzy mogą się nawzajem odnaleźć.                                                                                                                                                                                             |
| **Natywni restakerzy**   | Osoby, które stakują swoje ETH, uruchamiając własne walidatory Ethereum, mogą podłączyć swoje stakowane ETH do platformy restakingu, w tym EigenLayer i innych, aby zarabiać nagrody za restaking oprócz nagród dla walidatorów ETH.                                                                                                                                                                                                                           |
|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Płynni restakerzy**    | Osoby, które stakują swoje ETH za pośrednictwem zewnętrznego dostawcy płynnego stakingu, takiego jak Lido lub Rocket Pool, otrzymują tokeny płynnego stakingu (LST), które reprezentują ich stakowane ETH. Mogą oni restakować te LST, aby zdobywać nagrody za restaking, jednocześnie utrzymując swoje pierwotne ETH w stakingu.                                                                                           |
|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Operatorzy**           | Operatorzy uruchamiają oprogramowanie restakingu AVS-ów, wykonując zadania walidacyjne wymagane przez każdy AVS. Operatorzy to zazwyczaj profesjonalni dostawcy usług, którzy gwarantują takie rzeczy jak czas sprawności i wydajność. Podobnie jak restakerzy niebędący operatorami, operatorzy używają stakowanego ETH do zabezpieczania AVS-ów, ale operatorzy otrzymują również dodatkowe nagrody w zamian za swoją pracę. |
|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **AVS-y**                | Są to zdecentralizowane usługi — takie jak wyrocznie cenowe, mosty tokenów i systemy danych — które otrzymują zabezpieczenie od restakerów i w zamian oferują nagrody w postaci tokenów.                                                                                                                                                                                                                                                                       |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Dobrze wiedzieć</strong></p>
  <p className="mt-2">Natywni i płynni restakerzy często delegują swoje stakowane ETH do operatora, zamiast samodzielnie uruchamiać oprogramowanie do zabezpieczania AVS-ów.</p>
  <p className="mt-2">W ten sposób nie muszą martwić się o skomplikowane wymagania techniczne ze strony AVS-ów, chociaż otrzymują niższą stawkę nagród niż operatorzy.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Jakie są przykłady restakingu? {#what-are-some-examples-of-restaking}

Chociaż jest to nowatorski pomysł, pojawiło się kilka projektów badających możliwości restakingu.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Uwaga: błędna nazwa</strong></p>
  <p className="mt-2">Niektóre osoby mylą „restaking” z udzielaniem i zaciąganiem pożyczek LST w DeFi. Oba procesy angażują stakowane ETH do pracy, ale restaking oznacza zabezpieczanie AVS-ów, a nie tylko zarabianie odsetek od LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Ile mogę zarobić na restakingu? {#how-much-can-i-make-from-restaking}

Podczas gdy AVS-y oferują różne stawki, tokeny płynnego restakingu (LRT), takie jak eETH, dają wyobrażenie o tym, ile można zarobić. W ten sam sposób, w jaki otrzymujesz LST, takie jak stETH, za stakowanie swojego ETH, możesz otrzymać LRT, takie jak eETH, za restaking stETH. Te tokeny zarabiają nagrody za stakowanie ETH i restaking.

**Ważne jest, aby być świadomym ryzyka związanego z restakingiem. Potencjalne nagrody mogą być atrakcyjne, ale nie są wolne od ryzyka.**

## Jakie są zagrożenia związane z restakingiem? {#what-are-the-risks-of-restaking}

| **Ryzyka**                                   | **Opis**                                                                                                                                                                                                                                                             |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kary (lub „slashing”)** | Podobnie jak w przypadku stakowania ETH, jeśli restakerzy/operatorzy przejdą w tryb offline, będą cenzurować wiadomości lub spróbują uszkodzić sieć, ich stakowane środki mogą zostać częściowo lub całkowicie obcięte (spalone). |
| **Centralizacja**                            | Jeśli kilku operatorów zdominuje większość restakingu, mogą oni mieć duży wpływ na restakerów, AVS-y, a nawet platformy restakingu.                                                                                                                  |
| **Reakcje łańcuchowe**                       | Jeśli środki restakera zostaną obcięte podczas zabezpieczania wielu AVS-ów, może to obniżyć bezpieczeństwo pozostałych AVS-ów, czyniąc je podatnymi na ataki.                                                                                        |
| **Natychmiastowy dostęp do środków**         | W przypadku wypłaty restakowanego ETH obowiązuje czas oczekiwania (lub „okres unbondingu”), więc możesz nie zawsze mieć do nich natychmiastowy dostęp.                                                                            |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Współzałożyciel Ethereum pisze…</strong></p>
  <p className="mt-2">
 Vitalik, współzałożyciel Ethereum, ostrzegał przed potencjalnymi zagrożeniami związanymi z restakingiem we wpisie na blogu z 2021 roku zatytułowanym <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus</a>.
</p>
</AlertDescription>
</AlertContent>
</Alert>

## Jak zacząć z restakingiem? {#how-to-get-started-with-restaking}

| 🫡 Początkujący                                                                                                        | 🤓 Zaawansowani użytkownicy                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Stakuj ETH na platformach takich jak Lido lub Rocket Pool, aby otrzymać LST. | 1. Stakuj swoje ETH jako walidator na Ethereum.                                                 |
| 2. Użyj tych LST, aby rozpocząć restaking w usłudze restakingu.                 | 2. Porównaj usługi restakingu, takie jak EigenLayer, Symbiotic i inne.                          |
|                                                                                                                        | 3. Postępuj zgodnie z instrukcjami, aby podłączyć swój walidator do smart kontraktu restakingu. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Staking na Ethereum:</strong> Jak to działa?</p>
  <ButtonLink href="/staking/">
    Dowiedz się więcej
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Zaawansowane {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Dalsza lektura {#further-reading}

1. [ethereum.org - przewodnik po stakowaniu ETH](https://ethereum.org/en/staking/)
2. [Ledger Academy – czym jest restaking Ethereum?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys – EigenLayer: wyjaśnienie zdecentralizowanego protokołu restakingu Ethereum](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin – Nie przeciążaj konsensusu Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph – Czym jest EigenLayer? Wyjaśnienie protokołu restakingu Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Dodawanie funkcji bez pozwoleń do Ethereum ze Sreeramem Kannanem](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - Wyjaśnienie EigenLayer: Czym jest restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block – Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)
