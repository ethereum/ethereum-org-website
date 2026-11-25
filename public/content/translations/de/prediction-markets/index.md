---
title: "Prognosemärkte"
lang: de
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Handeln Sie auf den Ausgang zukünftiger Ereignisse"
  - "Preise dienen als eine öffentliche Live-Einschätzung der Wahrscheinlichkeit eines Ereignisses"
buttons:
  - content: Mehr erfahren
    toId: how-prediction-markets-work
  - content: Apps entdecken
    toId: find-a-prediction-market
    isSecondary: false
---

Prognosemärkte ermöglichen es Menschen, Anteile am Ausgang zukünftiger Ereignisse zu kaufen und zu verkaufen. Der Preis eines Anteils zeigt, für wie wahrscheinlich der Markt als Ganzes dieses Ergebnis hält. Sie erregten während der US-Wahlen 2024 große Aufmerksamkeit.

## Wie Prognosemärkte funktionieren {#how-prediction-markets-work}

Jeder Markt stellt eine Frage mit einer klaren Antwort, wie zum Beispiel „Wird es morgen in Lissabon regnen?“. Ein **Ja**-Anteil zahlt 1 $ aus, wenn die Antwort ja lautet, und nichts, wenn dies nicht der Fall ist. Ein **Nein**-Anteil funktioniert genau umgekehrt.

Wenn Ja-Anteile bei 67 Cent gehandelt werden, sagt der Markt, dass es eine etwa 67-prozentige Regenwahrscheinlichkeit gibt. Jeder, der glaubt, dass die tatsächliche Wahrscheinlichkeit anders ist, kann kaufen oder verkaufen, und das bewegt den Preis. Da Personen mit mehr Wissen einen Grund zum Handeln haben, spiegeln sich neue Informationen tendenziell schnell im Preis wider. Deshalb können Prognosemärkte nützliche Vorhersagen sein. Sie sind jedoch nicht perfekt.

Jeder gewinnende Anteil wird von jemandem bezahlt, der die verlierende Seite hielt. Prognosemärkte sind **Nullsummenspiele**: Abgesehen von Gebühren verlieren die Verlierer genau das, was die Gewinner verdienen.

## Warum ist das wichtig? {#why-does-this-matter}

Blockchain-basierte Prognosemärkte bieten einige Dinge, die traditionelle Wettanbieter und Börsen nicht haben:

<Grid>
  <Card title="Offene Daten" emoji="🔍" description="Jeder Trade wird Onchain aufgezeichnet, sodass jeder Preise, Volumina und wer gewonnen oder verloren hat, überprüfen kann."/>
  <Card title="Onchain-Abwicklung" emoji="🌎" description="Positionen sind Token in Ihrer eigenen Wallet, und Smart Contracts zahlen gewinnende Anteile aus, sobald das Ergebnis gemeldet wird." />
  <Card title="Marktgesteuerte Quoten" emoji="🤝" description="Preise werden von Tradern festgelegt, die Ergebnisanteile kaufen und verkaufen, anstatt von einem zentralisierten Buchmacher vorgegeben zu werden." />
</Grid>

Offene Daten sind in der Praxis wichtig. Forscher konnten [jeden Trade auf Polymarket untersuchen](https://cepr.org/publications/dp21615), was über 2,4 Millionen Nutzer von November 2022 bis März 2026 abdeckte, da die Trades auf einer öffentlichen Blockchain abgewickelt werden. Eine solche unabhängige Überprüfung ist auf zentralisierten Plattformen wie Kalshi nicht möglich, wo Handel und Auszahlungen auf den unternehmenseigenen Systemen stattfinden. Es gibt keine öffentlichen Aufzeichnungen zur Überprüfung und keinen Smart Contract, der garantiert, dass gewinnende Positionen ausgezahlt werden.

So läuft ein Markt von Anfang bis Ende ab:

1. Ein Markt wird um eine Frage herum erstellt, mit klaren Regeln, wie darüber entschieden wird.
2. Trader kaufen und verkaufen Ja- und Nein-Anteile, und der Preis bewegt sich entsprechend.
3. Sobald das Ereignis eintritt, meldet ein [Orakel](/developers/docs/oracles/) das Ergebnis Onchain. Auf Polymarket kann jeder das Ergebnis vorschlagen, indem er eine Kaution hinterlegt, und jeder andere kann es anfechten. Wenn ein Streitfall nicht beigelegt wird, stimmen die Inhaber des UMA-Tokens über das Ergebnis ab.
4. Jeder gewinnende Anteil kann gegen 1 $ eingelöst werden. Verlierende Anteile sind wertlos.
5. Jeder kann die Preishistorie und Handelsdaten für Forschung oder Diskussionen nutzen.

## Finde einen Prognosemarkt {#find-a-prediction-market}

Diese Prognosemärkte wickeln Trades Onchain ab, sodass jeder Preise und die Handelshistorie überprüfen kann:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Behalten Sie die Risiken im Hinterkopf</strong></p>
  <p className="mt-2">Die meisten Menschen, die auf Prognosemärkten handeln, verlieren Geld. Handeln Sie nur mit dem, was Sie sich leisten können zu verlieren, und seien Sie sich möglicher Suchtgefahren bewusst.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Herausforderungen & Risiken {#challenges-and-risks}

Prognosemärkte stehen vor echten Herausforderungen, die Fairness, Legalität und Genauigkeit beeinträchtigen.

📉 **Die meisten Trader verlieren** – Eine [Studie über jeden Polymarket-Trade](https://cepr.org/publications/dp21615) von November 2022 bis März 2026 ergab, dass etwa 69 % der Nutzer mit einem Verlust endeten. Unter den Nutzern, die Geld verdienten, strichen die obersten 1 % 76,5 % der Gewinne ein. Die größten Gewinner waren meist Trader, die Liquidität mit Limit-Orders bereitstellen, oft professionell und mit hohem Volumen.

🕵️ **Insiderhandel** – Personen, die das Ergebnis im Voraus kennen, können auf Kosten anderer Trader profitieren. [Forscher der Columbia Law School und der Universität Haifa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) schätzten, dass mutmaßlich informierte Trader zwischen Februar 2024 und Februar 2026 auf Polymarket etwa 143 Millionen Dollar verdienten.

⚖️ **Umstrittene Ergebnisse** – Smart Contracts können automatisch auszahlen, aber jemand muss immer noch melden, was passiert ist. Wenn eine Frage ungenau formuliert ist oder die Fakten unklar sind, kann das gemeldete Ergebnis angefochten werden.

⚠️ **Marktmanipulation** – Trader mit viel Geld können Preise bewegen, besonders in kleinen Märkten. Wash Trading (Handel mit sich selbst) kann einen Markt geschäftiger aussehen lassen, als er ist.

💧 **Liquiditätsprobleme** – Geringe Beteiligung ([geringe Liquidität](https://www.investopedia.com/terms/t/thinmarket.asp)) kann Preise weniger zuverlässig machen.

🏛 **Regulatorische Unsicherheit** – Die Regeln unterscheiden sich je nach Land und ändern sich schnell. In den USA entscheiden Aufsichtsbehörden und Gerichte noch darüber, ob einige Ereignisverträge, insbesondere im Sport, als Finanzprodukte oder Glücksspiel gelten. Viele Plattformen blockieren Nutzer in bestimmten Ländern.

## Experimentieren mit Prognosemärkten {#experimenting-with-prediction-markets}

Prognosemärkte können über den Handel mit Gewinnabsicht hinaus nützlich sein. Eine Idee, genannt Futarchy, geht noch weiter und nutzt Märkte, um bei der Entscheidungsfindung zu helfen, anstatt sie nur vorherzusagen.

Zum Beispiel schlug ein [Devcon Improvement Proposal](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) vor, dass die Devcon-Organisatoren Prognosemärkte nutzen, um die Teilnehmerzahl an möglichen zukünftigen Standorten vorherzusagen. Dies könnte ihnen helfen abzuwägen, welche Stadt die größte Veranstaltung anziehen würde und welche international am besten erreichbar wäre. Es könnte auch Zeit sparen, die sonst für den Vergleich von Visabestimmungen, Flughafenanbindungen und Lebenshaltungskosten aufgewendet wird, und gleichzeitig zeigen, wohin potenzielle Teilnehmer gerne reisen würden.

## Weiterführende Literatur {#further-reading}

[From prediction markets to info finance](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) – Vitalik Buterin  
[Who wins and who loses in prediction markets? Evidence from Polymarket](https://cepr.org/publications/dp21615) – Akey, Grégoire, Harvie und Martineau  
[The Augur Project Whitepaper](https://github.com/AugurProject/whitepaper)
