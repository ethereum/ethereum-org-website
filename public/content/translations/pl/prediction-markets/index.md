---
title: Rynki predykcyjne
lang: pl
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Handluj wynikami przyszłych zdarzeń"
  - "Ceny działają jako bieżące, publiczne szacunki prawdopodobieństwa danego zdarzenia"
buttons:
  - content: Dowiedz się więcej
    toId: how-prediction-markets-work
  - content: Przeglądaj aplikacje
    toId: find-a-prediction-market
    isSecondary: false
---

Rynki predykcyjne pozwalają ludziom kupować i sprzedawać udziały w wynikach przyszłych zdarzeń. Cena udziału pokazuje, jak bardzo rynek jako całość uważa dany wynik za prawdopodobny. Przyciągnęły one szeroką uwagę podczas wyborów w USA w 2024 roku.

## Jak działają rynki predykcyjne {#how-prediction-markets-work}

Każdy rynek zadaje pytanie z jasną odpowiedzią, np. „Czy jutro w Lizbonie będzie padać?”. Udział na **Tak** wypłaca 1 USD, jeśli odpowiedź okaże się twierdząca, i nic, jeśli tak nie będzie. Udział na **Nie** działa odwrotnie.

Jeśli udziały na Tak są w obrocie po 67 centów, rynek mówi, że istnieje około 67% szans na deszcz. Każdy, kto uważa, że rzeczywista szansa jest inna, może kupować lub sprzedawać, a to porusza cenę. Ponieważ osoby, które wiedzą więcej, mają powód do handlu, nowe informacje zazwyczaj szybko pojawiają się w cenie. Dlatego rynki predykcyjne mogą być użytecznymi prognozami. Nie są one jednak idealne.

Każdy wygrywający udział jest opłacany przez kogoś, kto posiadał stronę przegrywającą. Rynki predykcyjne to gry o **sumie zerowej**: pomijając opłaty, to, co zyskują zwycięzcy, tracą przegrani.

## Dlaczego ma to znaczenie? {#why-does-this-matter}

Oparte na blockchainie rynki predykcyjne dodają kilka rzeczy, których nie mają tradycyjne strony bukmacherskie i giełdy:

<Grid>
  <Card title="Otwarte dane" emoji="🔍" description="Każda transakcja jest zapisywana onchain, więc każdy może sprawdzić ceny, wolumeny oraz to, kto wygrał lub przegrał."/>
  <Card title="Rozliczenia onchain" emoji="🌎" description="Pozycje to tokeny w Twoim własnym portfelu, a inteligentne kontrakty wypłacają wygrywające udziały po zgłoszeniu wyniku." />
  <Card title="Kursy napędzane przez rynek" emoji="🤝" description="Ceny są ustalane przez traderów kupujących i sprzedających udziały w wynikach, a nie z góry przez scentralizowanego bukmachera." />
</Grid>

Otwarte dane mają znaczenie w praktyce. Badacze byli w stanie [przeanalizować każdą transakcję na Polymarket](https://cepr.org/publications/dp21615), obejmującą ponad 2,4 miliona użytkowników od listopada 2022 r. do marca 2026 r., ponieważ jego transakcje są rozliczane na publicznym blockchainie. Tego rodzaju niezależna weryfikacja nie jest możliwa na scentralizowanych platformach, takich jak Kalshi, gdzie handel i wypłaty odbywają się w systemach samej firmy. Nie ma publicznego rejestru do audytu ani inteligentnego kontraktu gwarantującego, że wygrywające pozycje zostaną opłacone.

Oto jak działa rynek od początku do końca:

1. Rynek jest tworzony wokół pytania z jasnymi zasadami dotyczącymi tego, jak zostanie ono rozstrzygnięte.
2. Traderzy kupują i sprzedają udziały na Tak i Nie, a cena zmienia się wraz z ich działaniami.
3. Gdy zdarzenie ma miejsce, [wyrocznia](/developers/docs/oracles/) zgłasza wynik onchain. Na Polymarket każdy może zaproponować wynik, wpłacając depozyt, a każdy inny może go zakwestionować. Jeśli spór nie zostanie rozstrzygnięty, posiadacze tokena UMA głosują nad wynikiem.
4. Każdy wygrywający udział można wymienić na 1 USD. Przegrywające udziały są bezwartościowe.
5. Każdy może wykorzystać historię cen i dane handlowe do badań lub dyskusji.

## Znajdź rynek predykcyjny {#find-a-prediction-market}

Te rynki predykcyjne rozliczają transakcje onchain, więc każdy może sprawdzić ceny i historię handlu:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Pamiętaj o ryzyku</strong></p>
  <p className="mt-2">Większość osób handlujących na rynkach predykcyjnych traci pieniądze. Handluj tylko tym, co możesz stracić, i bądź świadomy potencjalnych zachowań uzależniających.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Wyzwania i ryzyko {#challenges-and-risks}

Rynki predykcyjne stoją przed realnymi wyzwaniami, które wpływają na uczciwość, legalność i dokładność.

📉 **Większość traderów traci** – [Badanie każdej transakcji na Polymarket](https://cepr.org/publications/dp21615) od listopada 2022 r. do marca 2026 r. wykazało, że około 69% użytkowników zakończyło ze stratą. Wśród użytkowników, którzy zarobili pieniądze, 1% najlepszych zgarnęło 76,5% zysków. Największymi zwycięzcami byli w większości traderzy, którzy zapewniają płynność za pomocą zleceń z limitem, często profesjonalnie i przy dużym wolumenie.

🕵️ **Wykorzystywanie informacji poufnych (insider trading)** – Osoby, które znają wynik z wyprzedzeniem, mogą czerpać zyski kosztem innych traderów. [Badacze z Columbia Law School i Uniwersytetu w Hajfie](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) oszacowali, że podejrzani poinformowani traderzy zarobili około 143 milionów dolarów na Polymarket między lutym 2024 r. a lutym 2026 r.

⚖️ **Kwestionowane wyniki** – Inteligentne kontrakty mogą wypłacać środki automatycznie, ale ktoś nadal musi zgłosić, co się stało. Gdy pytanie jest sformułowane nieprecyzyjnie lub fakty są niejasne, zgłoszony wynik może zostać zakwestionowany.

⚠️ **Manipulacja rynkiem** – Traderzy z dużą ilością pieniędzy mogą wpływać na ceny, zwłaszcza na małych rynkach. Wash trading (handel z samym sobą) może sprawić, że rynek będzie wyglądał na bardziej ruchliwy niż jest w rzeczywistości.

💧 **Problemy z płynnością** – Niskie uczestnictwo ([niska płynność](https://www.investopedia.com/terms/t/thinmarket.asp)) może sprawić, że ceny będą mniej wiarygodne.

🏛 **Niepewność regulacyjna** – Zasady różnią się w zależności od kraju i szybko się zmieniają. W USA organy regulacyjne i sądy wciąż decydują, czy niektóre kontrakty na zdarzenia, zwłaszcza sportowe, liczą się jako produkty finansowe, czy hazard. Wiele platform blokuje użytkowników w niektórych krajach.

## Eksperymentowanie z rynkami predykcyjnymi {#experimenting-with-prediction-markets}

Rynki predykcyjne mogą być użyteczne nie tylko do handlu dla zysku. Jedna z koncepcji, zwana futarchią, idzie dalej i wykorzystuje rynki do pomocy w podejmowaniu decyzji, a nie tylko do ich prognozowania.

Na przykład [Propozycja Ulepszenia Devcon](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) sugerowała, aby organizatorzy Devcon wykorzystali rynki predykcyjne do prognozowania frekwencji w potencjalnych przyszłych lokalizacjach. Mogłoby to pomóc im w rozważeniu, które miasto przyciągnęłoby największe wydarzenie, a które byłoby najbardziej dostępne na arenie międzynarodowej. Mogłoby to również zaoszczędzić czas spędzony na porównywaniu polityki wizowej, dostępu do lotnisk i kosztów życia, jednocześnie pokazując, dokąd potencjalni uczestnicy chętnie by pojechali.

## Dalsza lektura {#further-reading}

[Od rynków predykcyjnych do info finance](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Kto wygrywa, a kto przegrywa na rynkach predykcyjnych? Dowody z Polymarket](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie i Martineau  
[Biała księga projektu Augur](https://github.com/AugurProject/whitepaper)
