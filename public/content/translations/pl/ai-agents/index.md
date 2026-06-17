---
title: Agenci AI
metaTitle: Agenci AI | Agenci AI na Ethereum
description: "Przegląd agentów AI na Ethereum"
lang: pl
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: "Ludzie stojący przy stole z ekranami"
summaryPoints:
  - "AI, która współpracuje z blockchainem i dokonuje niezależnych transakcji"
  - "Kontroluje portfele blockchain i finanse"
  - "Współpracuje z ludźmi i innymi agentami"
buttons:
  - content: Czym są agenci AI?
    toId: what-are-ai-agents
  - content: Poznaj agentów
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Wyobraź sobie zarządzanie Ethereum z pomocą asystenta AI, który analizuje trendy na rynku blockchain 24/7, odpowiada na pytania, a nawet zawiera transakcje w twoim imieniu. Witaj w świecie agentów AI—inteligentnych systemów zaprojektowanych, by ułatwić twoje życie w cyfrowym świecie.

W Ethereum jesteśmy świadkami rozwoju agentów AI począwszy od wirtualnych influencerów i autonomicznych twórców treści, aż po platformy analizujące rynek w czasie rzeczywistym, które zapewniają użytkownikom dogłębne analizy, rozrywkę i wydajność operacyjną.

## Czym są agenci AI? {#what-are-ai-agents}

Agenci AI to oprogramowanie, które używa sztucznej inteligencji do wykonywania zadań czy podejmowania decyzji. Uczą się na podstawie danych, przystosowują się do zmian i radzą sobie z kompleksowymi zadaniami. Pracują bez przerwy i potrafią dostrzec okazje natychmiastowo.

### Jak agenci AI pracują na blockchainie {#how-ai-agents-work-with-blockchains}

W tradycyjnych finansach agenci AI często działają w scentralizowanych środowiskach z ograniczoną ilością danych wejściowych. To ogranicza ich możliwość uczenia się czy autonomicznego zarządzania aktywami.

W przeciwieństwie do tego zdecentralizowany ekosystem Ethereum oferuje kilka istotnych korzyści:

- <strong>Transparentność danych:</strong> Dostęp do informacji o blockchainie w czasie rzeczywistym.
- <strong> Rzeczywiste posiadanie aktywów:</strong> Cyfrowe aktywa są w całości własnością agentów AI.
- <strong>Niezawodna funkcjonalność w łańcuchu: </strong> Umożliwia agentom AI dokonywanie transakcji, interakcję z inteligentnymi kontraktami, zapewnienie płynności i współpracę w ramach protokołów.

Te czynniki przekształcają agentów AI z prostych botów w dynamiczne, samodoskonalące się systemy, które stanowią istotną wartość w wielu obszarach:

<Grid>
  <Card title="Zautomatyzowane DeFi" emoji=":money_with_wings:" description="Agenci AI śledzą trendy rynkowe, realizują transakcje i zarządzają portfelami — sprawiając, że złożony świat DeFi staje się o wiele bardziej przystępny."/>
  <Card title="Nowa gospodarka agentów AI" emoji="🌎" description="Agenci AI mogą zatrudniać innych agentów (lub ludzi) o różnych umiejętnościach do wykonywania dla nich specjalistycznych zadań." />
  <Card title="Zarządzanie ryzykiem" emoji="🛠️" description="Monitorując transakcje, agenci AI pomagają wykrywać oszustwa oraz lepiej i szybciej chronić Twoje cyfrowe aktywa." />
</Grid>

## Weryfikowalna AI {#verifiable-ai}

Agenci AI działający offchain często zachowują się jak "czarne skrzynki" — ich rozumowanie, dane wejściowe i wyjściowe nie mogą być niezależnie zweryfikowane. Ethereum to zmienia. Poprzez zakotwiczenie zachowania agenta onchain deweloperzy mogą budować agentów, którzy są _niewymagający zaufania_, _przejrzyści_ i _ekonomicznie autonomiczni_. Działania takich agentów mogą być audytowane, ograniczane i udowadniane.

### Weryfikowalne wnioskowanie {#verifiable-inference}

Wnioskowanie AI tradycyjnie odbywa się offchain, gdzie wykonanie jest tanie, ale wykonanie modelu jest nieprzejrzyste. Na Ethereum deweloperzy mogą parować agentów z weryfikowalnymi obliczeniami, używając kilku technik:

- [**zkML (uczenie maszynowe o zerowej wiedzy)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) pozwala agentom udowodnić, że model został wykonany poprawnie, bez ujawniania modelu lub danych wejściowych
- [**Poświadczenia TEE (zaufane środowisko wykonawcze)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) pozwalają na sprzętowe dowody, że agent uruchomił określony model lub ścieżkę kodu
- **Niezmienność onchain** zapewnia, że te dowody i poświadczenia mogą być przywoływane, odtwarzane i uznawane za godne zaufania przez każdy kontrakt lub agenta

## Płatności i handel z x402 {#x402}

Protokół [x402](https://www.x402.org/), wdrożony na Ethereum i warstwach L2, daje agentom natywny sposób płacenia za zasoby i interakcji ekonomicznych bez interwencji człowieka. Agenci mogą:

- Płacić za obliczenia, dane i wywołania API za pomocą stablecoinów
- Żądać lub weryfikować poświadczenia od innych agentów lub usług
- Uczestniczyć w handlu między agentami, kupując i sprzedając moc obliczeniową, dane lub wyniki modeli

x402 przekształca Ethereum w programowalną warstwę ekonomiczną dla autonomicznych agentów, umożliwiając interakcje oparte na płatności za użycie zamiast kont, subskrypcji lub scentralizowanego fakturowania.

### Bezpieczeństwo finansów agentowych {#agentic-finance-security}

Autonomiczni agenci potrzebują zabezpieczeń. Ethereum zapewnia je na poziomie portfela i kontraktu:

- [Inteligentne konta (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) pozwalają deweloperom egzekwować limity wydatków, białe listy, klucze sesji i szczegółowe uprawnienia
- Zaprogramowane ograniczenia w inteligentnych kontraktach mogą ograniczać to, co agent może robić
- Limity oparte na wnioskowaniu (np. wymaganie dowodu zkML przed wykonaniem akcji wysokiego ryzyka) dodają kolejną warstwę bezpieczeństwa

Te mechanizmy kontrolne umożliwiają wdrażanie autonomicznych agentów, którzy nie są nieograniczeni.

### Rejestry onchain: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) to powstający standard (obecnie w trakcie recenzji), który proponuje rejestry onchain dla tożsamości, możliwości i poświadczeń agentów.

Jeśli zostanie przyjęty, mógłby zapewnić:

- Współdzielony, niewymagający zaufania katalog agentów
- Znormalizowane formaty poświadczeń
- Podstawę dla "niewymagającej zaufania infrastruktury agentów" bezpośrednio w sieci głównej Ethereum

Ułatwiłoby to agentom wzajemne odkrywanie, weryfikowanie i zawieranie transakcji w całkowicie zdecentralizowanym środowisku.

## Agenci AI na Ethereum {#ai-agents-on-ethereum}

Dopiero zaczynamy odkrywać pełny potencjał agentów AI, a projekty już wykorzystują synergię pomiędzy AI a blockchainem—szczególnie w zakresie transparentności i monetyzacji.

<AiAgentProductLists list="ai-agents" />

<strong>Pierwsze wystąpienie Luny w podcaście</strong>

<YouTube id="ZCsOMxnIruA" />

## Portfele kontrolowane przez agentów {#agent-controlled-wallets}

Agenci tacy jak Luna czy AIXBT kontrolują swój portfel blockchain ([portfel AIXBT](https://clusters.xyz/aixbt), [portfel Luna](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), co pozwala im dawać napiwki fanom i angażować się w działalność gospodarczą.

Podczas kampanii społecznościowej Luny na portalu X, w wyzwaniu #LunaMuralChallange Luna wytypowała i nagrodziła zwycięzców za pomocą portfela Base — stając się <strong>pierwszą AI zatrudniającą człowieka w zamian za nagrodę w kryptowalutach</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Dobrze wiedzieć</strong></p>
<p className="mt-2">Agenci AI i związane z nimi narzędzia wciąż są we wczesnej fazie rozwoju i są bardzo eksperymentalne—używaj ich z rozwagą.</p>
</AlertContent>

</Alert>

## Miej kontrolę nad swoim portfelem używając poleceń chatu {#control-your-wallet-using-chat-commands}

Możesz pominąć skomplikowane interfejsy DeFi i zarządzać swoimi kryptowalutami za pomocą prostych poleceń chatu.

Intuicyjne podejście przyspiesza i ułatwia transakcje i sprawia, że jest mniejsze ryzyko błędów takich jak wysłanie środków na niewłaściwy adres czy płacenie zbyt wysokich opłat.

<AiAgentProductLists list="chat" />

## Agenci AI vs. boty AI {#ai-agents-vs-ai-bots}

Rozróżnienie pomiędzy agentami AI a botami AI czasem może sprawiać kłopot, ponieważ oba narzędzia wykonują zautomatyzowane działania w oparciu o dane wejściowe.

- Boty AI przypominają automatycznych asystentów — Przestrzegają konkretnych, wcześniej zaprogramowanych instrukcji, aby wykonywać codzienne zadania.
- Agenci AI przypominają bardziej inteligentnych towarzyszy — Uczą się dzięki doświadczeniu, dostosowują się do otrzymanych informacji i sami podejmują decyzje.

|                       | Agenci AI                                                                                                 | Boty AI                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Interakcje**        | Złożone, adaptacyjne, autonomiczne                                                                        | Proste, wcześniej zdefiniowane, zakodowane                                  |
| **Uczenie się**       | Uczy się w sposób ciągły, potrafi eksperymentować i dostosować się do nowych danych w czasie rzeczywistym | Działa na podstawie przygotowanych danych treningowych lub ustalonych zasad |
| **Wykonywanie zadań** | Stara się realizować większe cele                                                                         | Skupia się wyłącznie na konkretnych zadaniach                               |

## Dowiedz się więcej {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Możesz stworzyć własnego agenta AI {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />
