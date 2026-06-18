---
title: Agenci AI
metaTitle: Agenci AI | Agenci AI w Ethereum
description: Przegląd agentów AI w Ethereum
lang: pl
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Ludzie zgromadzeni przy stole z terminalem
summaryPoints:
  - "Sztuczna inteligencja, która wchodzi w interakcje z blockchainem i samodzielnie handluje"
  - "Kontroluje portfele onchain i środki"
  - "Zatrudnia ludzi lub innych agentów do pracy"
buttons:
  - content: Czym są agenci AI?
    toId: what-are-ai-agents
  - content: Odkryj agentów
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Wyobraź sobie poruszanie się po Ethereum z asystentem AI, który bada trendy rynkowe onchain 24/7, odpowiada na pytania, a nawet wykonuje transakcje w Twoim imieniu. Witaj w świecie agentów AI — inteligentnych systemów zaprojektowanych, aby uprościć Twoje cyfrowe życie.

W Ethereum obserwujemy innowacje w postaci agentów AI, od wirtualnych influencerów i autonomicznych twórców treści po platformy analizy rynku w czasie rzeczywistym, które wzmacniają pozycję użytkowników, dostarczając im wiedzę, rozrywkę i wydajność operacyjną.

## Czym są agenci AI? {#what-are-ai-agents}

Agenci AI to programy komputerowe, które wykorzystują sztuczną inteligencję do wykonywania zadań lub podejmowania własnych decyzji. Uczą się na podstawie danych, dostosowują do zmian i radzą sobie ze skomplikowanymi zadaniami. Działają bez przerwy i potrafią błyskawicznie wykrywać okazje.

### Jak agenci AI współpracują z blockchainami {#how-ai-agents-work-with-blockchains}

W tradycyjnych finansach agenci AI często działają w scentralizowanych środowiskach z ograniczonymi danymi wejściowymi. Utrudnia to ich zdolność do uczenia się lub autonomicznego zarządzania aktywami.

W przeciwieństwie do tego, zdecentralizowany ekosystem Ethereum oferuje kilka kluczowych zalet:

- <strong>Przejrzyste dane:</strong> Dostęp do informacji z blockchaina w czasie rzeczywistym.
- <strong>Prawdziwa własność aktywów:</strong> Cyfrowe aktywa są w pełni własnością agentów AI.
- <strong>Rozbudowana funkcjonalność onchain:</strong> Umożliwia agentom AI wykonywanie transakcji, interakcję z inteligentnymi kontraktami, zapewnianie płynności i współpracę w ramach różnych protokołów.

Te czynniki przekształcają agentów AI ze zwykłych botów w dynamiczne, samodoskonalące się systemy, które oferują znaczną wartość w wielu sektorach:

<Grid>
  <Card title="Zautomatyzowane DeFi" emoji=":money_with_wings:" description="Agenci AI uważnie śledzą trendy rynkowe, realizują transakcje i zarządzają portfelami — dzięki czemu skomplikowany świat DeFi staje się znacznie bardziej przystępny."/>
  <Card title="Nowa gospodarka agentów AI" emoji="🌎" description="Agenci AI mogą zatrudniać innych agentów (lub ludzi) o różnych umiejętnościach do wykonywania dla nich wyspecjalizowanych zadań." />
  <Card title="Zarządzanie ryzykiem" emoji="🛠️" description="Monitorując aktywność transakcyjną, agenci AI mogą pomóc w wykrywaniu oszustw oraz lepiej i szybciej chronić Twoje zasoby cyfrowe." />
</Grid>

## Weryfikowalna sztuczna inteligencja (AI) {#verifiable-ai}

Agenci AI działający pozałańcuchowo często zachowują się jak „czarne skrzynki” — ich rozumowanie, dane wejściowe i wyjściowe nie mogą być niezależnie zweryfikowane. Ethereum to zmienia. Zakotwiczając zachowanie agenta onchain, programiści mogą tworzyć agentów, którzy są _niewymagający zaufania_ (trustless), _przejrzyści_ i _niezależni ekonomicznie_. Działania takich agentów mogą być audytowane, ograniczane i udowadniane.

### Weryfikowalne wnioskowanie {#verifiable-inference}

Wnioskowanie AI tradycyjnie odbywa się pozałańcuchowo, gdzie wykonanie jest tanie, ale działanie modelu jest nieprzejrzyste. W Ethereum programiści mogą łączyć agentów z weryfikowalnymi obliczeniami za pomocą kilku technik:

- [**zkML (uczenie maszynowe z wiedzą zerową)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) pozwala agentom udowodnić, że model został wykonany poprawnie bez ujawniania samego modelu ani danych wejściowych
- [**Atestacje TEE (Zaufane Środowisko Wykonawcze)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) umożliwiają sprzętowe dowody na to, że agent uruchomił określony model lub ścieżkę kodu
- **Niezmienność onchain** gwarantuje, że do tych dowodów i atestacji może odwoływać się, odtwarzać je i ufać im każdy kontrakt lub agent

## Płatności i handel z x402 {#x402}

[Protokół x402](https://www.x402.org/), wdrożony w Ethereum i sieciach L2, daje agentom natywny sposób płacenia za zasoby i interakcji ekonomicznych bez interwencji człowieka. Agenci mogą:

- Płacić za obliczenia, dane i wywołania API za pomocą stablecoinów
- Żądać lub weryfikować atestacje od innych agentów lub usług
- Uczestniczyć w handlu między agentami, kupując i sprzedając moc obliczeniową, dane lub wyniki modeli

x402 zamienia Ethereum w programowalną warstwę ekonomiczną dla autonomicznych agentów, umożliwiając interakcje typu pay-per-use (płatność za użycie) zamiast kont, subskrypcji czy scentralizowanych rozliczeń.

### Bezpieczeństwo finansów agentów {#agentic-finance-security}

Autonomiczni agenci potrzebują barier ochronnych. Ethereum zapewnia je na poziomie portfela i kontraktu:

- [Inteligentne konta (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) pozwalają programistom egzekwować limity wydatków, białe listy, klucze sesji i szczegółowe uprawnienia
- Zaprogramowane ograniczenia w inteligentnych kontraktach mogą zawężać to, co agentowi wolno robić
- Limity oparte na wnioskowaniu (np. wymaganie dowodu zkML przed wykonaniem akcji wysokiego ryzyka) dodają kolejną warstwę bezpieczeństwa

Te mechanizmy kontrolne umożliwiają wdrożenie autonomicznych agentów, którzy nie są pozbawieni ograniczeń.

### Rejestry onchain: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) definiuje rejestry onchain dla tożsamości, reputacji i walidacji agentów. Współtworzony przez współpracowników z MetaMask, Fundacji Ethereum, Google i Coinbase, jest wdrożony w 16 sieciach, w tym w sieci głównej Ethereum, Base, Polygon, Arbitrum i innych.

Zapewnia on:

- **Rejestr tożsamości** dla przenośnych, odpornych na cenzurę identyfikatorów agentów
- **Rejestr reputacji** dla ustandaryzowanych sygnałów zwrotnych w różnych aplikacjach
- **Rejestr walidacji** do żądania niezależnej weryfikacji (zkML, TEE, ponowne wykonanie oparte na stawce)

ERC-8004 ułatwia agentom odkrywanie, weryfikowanie i przeprowadzanie transakcji między sobą w pełni zdecentralizowanym środowisku.

## Agenci AI w Ethereum {#ai-agents-on-ethereum}

Zaczynamy odkrywać pełen potencjał agentów AI, a projekty już teraz wykorzystują synergię między sztuczną inteligencją a blockchainem — szczególnie w zakresie przejrzystości i monetyzacji.

<AiAgentProductLists list="ai-agents" />

<strong>Pierwszy występ Luny jako gościa podcastu</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## Portfele kontrolowane przez agentów {#agent-controlled-wallets}

Agenci tacy jak Luna czy AIXBT kontrolują swój własny portfel onchain ([portfel AIXBT](https://clusters.xyz/aixbt), [portfel Luny](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), co umożliwia im nagradzanie fanów i uczestnictwo w działaniach ekonomicznych.

Podczas kampanii społecznościowej Luny na platformie X pod hasłem #LunaMuralChallenge, Luna wybrała i nagrodziła zwycięzców za pośrednictwem swojego portfela w sieci Base — co stanowi <strong>pierwszy przypadek zatrudnienia ludzi przez sztuczną inteligencję w zamian za nagrodę w krypto</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Warto wiedzieć</strong></strong>
<p className="mt-2">Agenci AI i powiązane z nimi narzędzia są wciąż we wczesnej fazie rozwoju i mają charakter wysoce eksperymentalny — używaj ich z ostrożnością.</p>
</AlertContent>
</Alert>

## Kontroluj swój portfel za pomocą poleceń czatu {#control-your-wallet-using-chat-commands}

Możesz pominąć skomplikowane interfejsy zdecentralizowanych finansów (DeFi) i zarządzać swoim krypto za pomocą prostych poleceń na czacie.

To intuicyjne podejście sprawia, że transakcje są szybsze, łatwiejsze i mniej podatne na błędy, takie jak wysłanie środków na zły adres lub przepłacanie za opłaty.

<AiAgentProductLists list="chat" />

## Agenci AI a boty AI {#ai-agents-vs-ai-bots}

Różnica między agentami AI a botami AI może być czasami myląca, ponieważ oba wykonują zautomatyzowane działania na podstawie danych wejściowych.

- Boty AI są jak zautomatyzowani asystenci — postępują zgodnie z określonymi, wstępnie zaprogramowanymi instrukcjami, aby wykonywać rutynowe zadania.
- Agenci AI przypominają bardziej inteligentnych towarzyszy — uczą się na podstawie doświadczeń, dostosowują do nowych informacji i samodzielnie podejmują decyzje.

|                     | Agenci AI                                                              | Boty AI                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interakcje**    | Złożone, elastyczne, autonomiczne                                         | Proste, z góry określony zakres, zakodowane na stałe        |
| **Uczenie się**        | Uczą się w sposób ciągły, mogą eksperymentować i dostosowywać się do nowych danych w czasie rzeczywistym | Działają na wstępnie wytrenowanych danych lub stałych regułach |
| **Wykonywanie zadań** | Mają na celu osiągnięcie szerszych celów                                     | Skupiają się wyłącznie na konkretnych zadaniach              |

## Dowiedz się więcej {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Możesz zbudować własnego agenta AI {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />