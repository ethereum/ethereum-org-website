---
title: Formale Verifizierung von Smart Contracts
description: Ein Überblick über die formale Verifizierung von Ethereum-Smart-Contracts
lang: de
---

[Smart Contracts](/developers/docs/smart-contracts/) machen es möglich, dezentrale, vertrauenslose und robuste Anwendungen zu entwickeln, die neue Einsatzmöglichkeiten bieten und den Nutzern einen Mehrwert verschaffen. Da mit Smart Contracts große Mengen an Wert verwaltet werden, ist die Sicherheit ein wichtiger Aspekt für die Entwickler.

Die formale Verifizierung ist eine der empfohlenen Techniken zur Verbesserung der [Smart-Contract-Sicherheit](/developers/docs/smart-contracts/security/). Die formale Verifizierung, die auf [formale Methoden](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) für die Spezifizierung, den Entwurf und die Verifizierung von Programmen zurückgreift, wird seit Jahren eingesetzt, um die Korrektheit von kritischen Hardware- und Softwaresystemen zu gewährleisten.

Wenn die formale Verifizierung in Smart Contracts implementiert wird, lässt sich mit ihr beweisen, dass die Geschäftslogik eines Vertrags einer vordefinierten Spezifizierung entspricht. Im Vergleich zu anderen Methoden zur Bewertung der Korrektheit des Vertragscodes, wie z. B. Tests, bietet die formale Verifizierung stärkere Garantien dafür, dass ein Smart Contract funktional korrekt ist.

## Was ist eine formale Verifizierung? {#what-is-formal-verification}

Unter einer formalen Verifizierung versteht man den Bewertungsprozess der Korrektheit eines Systems in Bezug auf eine formale Spezifizierung. Vereinfacht ausgedrückt, können wir mithilfe der formalen Verifizierung prüfen, ob das Verhalten eines Systems bestimmte Anforderungen erfüllt (d. h., ob es das tut, was wir wollen).

Die erwarteten Verhaltensweisen des Systems (in diesem Fall eines Smart Contracts) werden durch formale Modellierung beschrieben, wohingegen Spezifizierungssprachen die Erstellung formaler Eigenschaften ermöglichen. Mithilfe formaler Verifizierungstechniken lässt sich dann verifizieren, ob die Implementierung eines Vertrags mit seiner Spezifizierung übereinstimmt und es kann ein mathematischer Beweis für die Korrektheit des Vertrags erbracht werden. Entspricht ein Vertrag seiner Spezifizierung, wird er als „funktionell korrekt“, „bewusst korrekt“ oder „designbedingt korrekt“ bezeichnet.

### Was ist ein formales Modell? {#what-is-a-formal-model}

In der Informatik ist ein [formales Modell](https://en.wikipedia.org/wiki/Model_of_computation) eine mathematische Beschreibung eines Rechenprozesses. Programme werden in mathematische Funktionen (Gleichungen) abgetrennt, wobei das Modell beschreibt, wie die Ausgaben von Funktionen in Abhängigkeit von Eingaben berechnet werden.

Formale Modelle bieten eine Abstraktionsebene, auf der die Analyse des Verhaltens eines Programms bewertet werden kann. Das Vorhandensein von formalen Modellen ermöglicht die Erstellung einer _formalen Spezifizierung_, die die gewünschten Eigenschaften des betreffenden Modells beschreibt.

Für die Modellierung von Smart Contracts zur formalen Verifizierung kommen verschiedene Techniken zum Einsatz. Einige Modelle werden beispielsweise verwendet, um Aussagen über das High-Level-Verhalten eines Smart Contracts zu treffen. Diese Modellierungstechniken wenden eine Blackbox-Sichtweise auf Smart Contracts an und betrachten sie als Systeme, die Eingaben akzeptieren und Berechnungen auf der Grundlage dieser Eingaben ausführen.

High-Level-Modelle konzentrieren sich auf die Beziehung zwischen Smart Contracts und externen Agenten, wie z. B. extern geführten Konto (Externally Owned Accounts, EOAs), Vertragskonten und der Blockchain-Umgebung. Solche Modelle sind nützlich, um Eigenschaften zu definieren, die festlegen, wie sich ein Vertrag als Reaktion auf bestimmte Benutzerinteraktionen verhalten soll.

Im Gegensatz dazu konzentrieren sich andere formale Modelle auf das Low-Level-Verhalten eines Smart Contracts. High-Level-Modelle können zwar dabei helfen, Aussagen über die Funktionalität eines Vertrags zu treffen, aber sie erfassen möglicherweise keine Details über die interne Funktionsweise der Implementierung. Low-Level-Modelle wenden eine White-Box-Sicht auf die Programmanalyse an und stützen sich auf Lower-Level-Darstellungen von Smart-Contract-Anwendungen, wie z. B. Programmverläufe und [Kontrollflussdiagramme](https://en.wikipedia.org/wiki/Control-flow_graph), um Aussagen über Eigenschaften zu treffen, die für die Ausführung eines Vertrags relevant sind.

Low-Level-Modelle gelten als ideal, da sie die tatsächliche Ausführung eines Smart Contracts in der Ausführungsumgebung von Ethereum (d. h. der [EVM](/developers/docs/evm/)) darstellen. Low-Level-Modellierungstechniken sind besonders nützlich, um kritische Sicherheitseigenschaften in Smart Contracts festzulegen und potenzielle Schwachstellen zu erkennen.

### Was ist eine formale Spezifizierung? {#what-is-a-formal-specification}

Eine Spezifizierung ist einfach eine technische Anforderung, die ein bestimmtes System erfüllen muss. Beim Programmieren stellen Spezifizierungen allgemeine Vorstellungen über die Ausführung eines Programms dar (d. h., was das Programm tun soll).

Im Zusammenhang mit Smart Contracts beziehen sich die formalen Spezifizierungen auf _Eigenschaften_ – formale Beschreibungen der Anforderungen, die ein Vertrag erfüllen muss. Solche Eigenschaften werden als „Invarianten“ bezeichnet und stellen logische Behauptungen über die Ausführung eines Vertrags dar, die unter allen möglichen Umständen und ohne Ausnahmen wahr bleiben müssen.

Wir können uns eine formale Spezifizierung also als eine Sammlung von Aussagen vorstellen, die in einer formalen Sprache geschrieben sind und die beabsichtigte Ausführung eines Smart Contracts beschreiben. Spezifizierungen umfassen die Eigenschaften eines Vertrags und legen fest, wie sich der Vertrag unter verschiedenen Umständen verhalten soll. Der Zweck der formalen Verifizierung besteht darin, festzustellen, ob ein Smart Contract diese Eigenschaften (Invarianten) besitzt, und sicherzugehen, dass während der Ausführung nicht gegen diese Eigenschaften verstoßen wird.

Formale Spezifizierungen sind entscheidend für die Entwicklung sicherer Implementierungen von Smart Contracts. Verträge, für die eine Implementierung von Invarianten nicht gelingt, oder gegen deren Eigenschaften während der Ausführung verstoßen wird, sind anfällig für Sicherheitslücken, die die Funktionalität beeinträchtigen oder böswillige Angriffe ermöglichen können.

## Verschiedene Arten formaler Spezifizierungen für Smart Contracts {#formal-specifications-for-smart-contracts}

Formale Spezifizierungen ermöglichen mathematische Schlussfolgerungen über die Korrektheit der Programmausführung. Wie bei formalen Modellen können formale Spezifizierungen entweder die High-Level-Eigenschaften oder das Low-Level-Verhalten einer Vertragsimplementierung erfassen.

Formale Spezifizierungen werden aus Elementen der [Programmlogik](https://en.wikipedia.org/wiki/Logic_programming) abgeleitet, die formale Schlussfolgerungen über die Eigenschaften eines Programms ermöglichen. Eine Programmlogik enthält formale Regeln, die (in mathematischer Sprache) das erwartete Verhalten eines Programms ausdrücken. Verschiedene Programmlogiken werden zur Erstellung formaler Spezifizierungen verwendet, einschließlich [Erreichbarkeitslogik](https://en.wikipedia.org/wiki/Reachability_problem), [zeitliche Logik](https://en.wikipedia.org/wiki/Temporal_logic) und [Hoare-Logik](https://en.wikipedia.org/wiki/Hoare_logic).

Formale Spezifizierungen für Smart Contracts lassen sich grob als **High-Level-** oder **Low-Level-**Spezifizierungen klassifizieren. Unabhängig davon, zu welcher Kategorie eine Spezifizierung gehört, muss sie die Eigenschaft des zu analysierenden Systems angemessen und eindeutig beschreiben.

### High-Level-Spezifizierungen {#high-level-specifications}

Wie der Name schon sagt, beschreibt eine High-Level-Spezifizierung (auch „modellorientierte Spezifizierung“ genannt) das High-Level-Verhalten eines Programms. High-Level-Spezifizierungen simulieren einen Smart Contract als [Zustandsmaschine](https://en.wikipedia.org/wiki/Finite-state_machine) (Finite State Machine, FSM), die aufgrund der Durchführung von Operationen zwischen Zuständen wechseln kann. In diesem Zusammenhang werden Zeitlogiken verwendet, um formale Eigenschaften für das FSM-Modell zu definieren.

[Zeitlogiken](https://en.wikipedia.org/wiki/Temporal_logic) sind „Regeln für Schlussfolgerungen über Propositionen, die in Bezug auf die Zeit qualifiziert sind (z. B. „Ich bin _immer_ hungrig“ oder „Ich werde _letztendlich_ hungrig sein“).“ Werden Zeitlogiken auf die formale Verifizierung angewendet, werden mit ihnen Behauptungen über das korrekte Verhalten von Systemen aufgestellt, die als Zustandsmaschinen modelliert werden. Insbesondere beschreibt eine Zeitlogik die zukünftigen Zustände, die ein Smart Contract annehmen kann, und wie er zwischen den Zuständen wechselt.

High-Level-Spezifizierungen erfassen im Allgemeinen zwei kritische zeitliche Eigenschaften für Smart Contracts: **Sicherheit** und **Liveness**. Sicherheitseigenschaften stehen für die Vorstellung, dass „nie irgendetwas Schlimmes passiert“, und drücken in der Regel Invarianz aus. Eine Sicherheitseigenschaft kann allgemeine Softwareanforderungen definieren, wie z. B. Freiheit von [Deadlocks](https://www.techtarget.com/whatis/definition/deadlock), oder Domänen-spezifische Eigenschaften für Verträge ausdrücken (z. B. Invarianten der Zugriffskontrolle für Funktionen, zulässige Werte von Zustandsvariablen oder Bedingungen für Token-Transfers).

Nehmen Sie zum Beispiel diese Sicherheitsanforderung, die die Bedingungen für die Verwendung von `transfer()` oder `transferFrom()` in ERC-20-Token-Verträgen behandelt: _„Das Guthaben eines Absenders ist niemals niedriger als die angeforderte Menge der zu sendenden Token.“_. Diese Beschreibung einer Vertragsinvariante in natürlicher Sprache lässt sich in eine formale (mathematische) Spezifizierung übersetzen, die dann rigoros auf ihre Gültigkeit überprüft werden kann.

Liveness-Eigenschaften besagen, dass „irgendwann etwas Gutes passiert“ und betreffen die Fähigkeit eines Vertrags, verschiedene Zustände zu durchlaufen. Ein Beispiel für eine Liveness-Eigenschaft ist die „Liquidität“, die sich auf die Fähigkeit eines Vertrags bezieht, sein Guthaben auf Anfrage an die Benutzer zu übertragen. Würde diese Eigenschaft verletzt, könnten Benutzer die im Vertrag gespeicherten Assets nicht mehr abheben, wie es im Rahmen des [Parity-Wallet-Vorfalls](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html) geschah.

### Low-Level-Spezifizierungen {#low-level-specifications}

High-Level-Spezifizierungen nehmen als Ausgangspunkt ein endliches Zustandsmodell eines Vertrags und definieren gewünschte Eigenschaften für dieses Modell. Im Gegensatz dazu modellieren Low-Level-Spezifizierungen (auch „eigenschaftsorientierte Spezifizierungen“ genannt) häufig Programme (Smart Contracts) als Systeme, die sich aus einer Sammlung von mathematischen Funktionen zusammensetzen, und beschreiben das korrekte Verhalten solcher Systeme.

Einfacher ausgedrückt: Low-Level-Spezifizierungen analysieren _Programmabläufe_ und versuchen, Eigenschaften eines Smart Contracts über diese Abläufe zu definieren. Abläufe beziehen sich auf Sequenzen von Funktionsausführungen, die den Zustand eines Smart Contracts verändern; daher helfen Low-Level-Spezifizierungen bei der Festlegung von Anforderungen an die interne Ausführung eines Vertrags.

Formale Spezifizierungen auf Low-Level-Ebene können in Form von entweder Eigenschaften im Hoare-Stil oder Invarianten auf Ausführungspfaden angegeben werden.

### Hoare-Stil-Eigenschaften {#hoare-style-properties}

Die [Hoare-Logik](https://en.wikipedia.org/wiki/Hoare_logic) bietet eine Reihe von formalen Regeln für Schlussfolgerungen über die Korrektheit von Programmen, einschließlich der von Smart Contracts. Eine Eigenschaft im Hoare-Stil wird durch ein Hoare-Tripel {_P_}_c_{_Q_} dargestellt, wobei _c_ ein Programm ist und _P_ und _Q_ Prädikate über den Zustand von _c_ (d.h. das Programm) sind, die formal als _Präkonditionen_ bzw. _Postkonditionen_ beschrieben werden.

Eine Präkondition ist ein Prädikat, das die für die korrekte Ausführung einer Funktion erforderlichen Bedingungen beschreibt; Benutzer, die den Vertrag aufrufen, müssen diese Bedingung erfüllen. Eine Nachbedingung ist ein Prädikat, das die Bedingung beschreibt, die eine Funktion bei korrekter Ausführung festlegt; die Benutzer können davon ausgehen, dass diese Bedingung nach dem Aufruf der Funktion als erfüllt gilt. Eine _Invariante_ in der Hoare-Logik ist ein Prädikat, das durch die Ausführung einer Funktion erhalten bleibt (d. h. sich nicht verändert).

Spezifizierungen im Hoare-Stil können entweder _teilweise Korrektheit_ oder _vollständige Korrektheit_ garantieren. Die Implementierung einer Vertragsfunktion ist „teilweise korrekt“, wenn die Vorbedingung erfüllt ist, bevor die Funktion ausgeführt wird, und sobald die Ausführung beendet ist, auch die Nachbedingung erfüllt ist. Ein Beweis für vollständige Korrektheit liegt vor, wenn eine Vorbedingung vor der Ausführung der Funktion wahr ist, die Ausführung garantiert beendet wird und, wenn das der Fall ist, die Nachbedingung wahr ist.

Der Nachweis der vollständigen Korrektheit ist schwierig, da einige Ausführungen sich verzögern können, bevor sie beendet werden, oder überhaupt nicht beendet werden. Abgesehen davon ist die Frage, ob die Ausführung beendet wird, ein strittiger Punkt, da der Gas-Mechanismus von Ethereum unendliche Programmschleifen verhindert (die Ausführung wird entweder erfolgreich beendet oder endet aufgrund eines „Out-of-Gas“-Fehlers).

Die mit Hoare-Logik erstellten Spezifizierungen für Smart Contracts enthalten Vorbedingungen, Nachbedingungen und Invarianten für die Ausführung von Funktionen und Schleifen in einem Vertrag. Vorbedingungen beinhalten oft die Möglichkeit von fehlerhaften Eingaben für eine Funktion, wobei Nachbedingungen die erwartete Reaktion auf solche Eingaben beschreiben (z. B. das Auslösen einer bestimmten Ausnahme). Auf diese Weise sind Eigenschaften im Hoare-Stil eine wirksame Möglichkeit zur Gewährleistung der Korrektheit von Vertragsimplementierungen.

Viele formale Verifizierungs-Frameworks verwenden Spezifizierungen im Hoare-Stil, um die semantische Korrektheit von Funktionen zu beweisen. Es ist auch möglich, Eigenschaften im Hoare-Stil (als Behauptungen) direkt zum Vertragscode hinzuzufügen, indem die Aussagen `require` („erfordern“) und `assert` („behaupten“) in Solidity verwendet werden.

`require`-Aussagen drücken eine Vorbedingung oder Invariante aus und werden häufig zur Validierung von Benutzereingaben verwendet, wohingegen `assert` eine für die Sicherheit notwendige Nachbedingung erfasst. Zum Beispiel kann eine angemessene Zugriffskontrolle für Funktionen (ein Beispiel für eine Sicherheitseigenschaft) mithilfe von `require` als Vorbedingungsprüfung der Identität des aufrufenden Kontos erreicht werden. Auf ähnliche Weise kann eine Invariante über zulässige Werte von Zustandsvariablen in einem Vertrag (z. B. die Gesamtzahl der sich im Umlauf befindlichen Token) vor einem Verstoß geschützt werden, indem `assert` verwendet wird, um den Zustand des Vertrags nach der Funktionsausführung zu bestätigen.

### Eigenschaften auf Trace-Level {#trace-level-properties}

Trace-basierte Spezifizierungen beschreiben Vorgänge, die für den Wechsel eines Vertrag zwischen verschiedenen Zuständen sorgen, sowie die Beziehungen zwischen diesen Vorgängen. Wie bereits erläutert, handelt es sich bei Traces um Abfolgen von Vorgängen, die den Zustand eines Vertrags auf eine bestimmte Weise verändern.

Dieser Ansatz beruht auf einem Modell von Smart Contracts als Zustandswechselsystemen mit einigen vordefinierten Zuständen (beschrieben durch Zustandsvariablen) und einer Reihe von vordefinierten Wechseln (beschrieben durch Vertragsfunktionen). Darüber hinaus wird ein[Kontrollflussdiagramm](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) („Control Flow Graph“, CFG), eine grafische Darstellung des Ausführungsflusses eines Programms, häufig zur Beschreibung der operativen Semantik eines Vertrags verwendet. Hier wird jede Trace als ein Pfad im Kontrollflussdiagramm dargestellt.

In erster Linie werden Spezifizierungen auf Trace-Level eingesetzt, um Schlussfolgerungen über Muster bei der internen Ausführung von Smart Contracts zu ziehen. Durch die Erstellung von Spezifizierungen auf Trace-Level stellen wir die zulässigen Ausführungspfade (d. h. Zustandswechsel) für einen Smart Contract fest. Mithilfe von Techniken wie der symbolischen Ausführung können wir formal verifizieren, dass die Ausführung niemals einem Pfad folgt, der nicht im formalen Modell definiert ist.

Sehen wir uns das Beispiel eines [DAO](/dao/)-Vertrags an, der über einige öffentlich zugängliche Funktionen zur Beschreibung von Trace-Level-Eigenschaften verfügt. Hier gehen wir davon aus, dass der DAO-Vertrag den Benutzern die folgenden Vorgänge erlaubt:

- Geldmittel einzahlen

- Über einen Vorschlag nach Einzahlung der Geldmittel abstimmen

- Eine Rückerstattung beantragen, wenn nicht über einen Vorschlag abgestimmt wird

Beispiele für „Trace-Level“-Eigenschaften könnten folgendermaßen aussehen: _„Benutzer, die keine Geldmittel einzahlen, können nicht über einen Vorschlag abstimmen“_ oder _„Benutzer, die nicht über einen Vorschlag abstimmen, sollten immer die Möglichkeit haben, eine Rückerstattung zu beantragen“_. Beiden Eigenschaften liegen bevorzugte Ausführungsreihenfolgen zugrunde (die Abstimmung kann nicht _vor_ der Einzahlung von Geldmitteln erfolgen und die Beantragung einer Rückerstattung kann nicht _nach_ der Abstimmung über einen Vorschlag erfolgen).

## Techniken zur formalen Verifizierung von Smart Contracts {#formal-verification-techniques}

### Modellprüfung {#model-checking}

Die Modellprüfung ist eine formale Verifizierungstechnik, bei der ein Algorithmus ein formales Modell eines Smart Contracts gegen seine Spezifizierung prüft. Bei einer Modellprüfung werden Smart Contracts oft als Zustandsübergangssysteme dargestellt, wohingegen die Eigenschaften zulässiger Vertragszustände mithilfe der Zeitlogik definiert werden.

Die Modellprüfung erfordert die Erstellung einer abstrakten mathematischen Repräsentation eines Systems (z. B. eines Vertrags) und den Ausdruck von Eigenschaften dieses Systems durch Formeln, die in der [Aussagenlogik](https://www.baeldung.com/cs/propositional-logic) wurzeln. Dies vereinfacht die Aufgabe des Modellprüfungsalgorithmus, nämlich zu beweisen, dass ein mathematisches Modell eine gegebene logische Formel erfüllt.

Die Modellprüfung in der formalen Verifizierung dient in erster Linie der Bewertung zeitlicher Eigenschaften, die das Verhalten eines Vertrags im Lauf der Zeit beschreiben. Zu den zeitlichen Eigenschaften von Smart Contracts gehören _Sicherheit_ und _Liveness_, die wir bereits erläutert haben.

Zum Beispiel kann eine Sicherheitseigenschaft, die sich auf Zugriffskontrollen bezieht (z. B., _Nur der Eigentümer des Vertrags kann `selfdestruct` („Selbstzerstörung“) aufrufen_), in formaler Logik geschrieben werden. Danach kann der Modellprüfungsalgorithmus verifizieren, ob der Vertrag diese formale Spezifizierung erfüllt.

Bei der Modellprüfung wird der Zustandsraum erforscht, wobei alle möglichen Zustände eines Smart Contracts konstruiert werden und versucht wird, erreichbare Zustände zu finden, die zu Eigenschaftsverstößen führen. Dies kann jedoch zu einer unendlichen Anzahl von Zuständen führen (bekannt als „Problem der Zustandsexplosion“). Aus diesem Grund sind Modellprüfprogramme auf Abstraktionstechniken angewiesen, um eine effiziente Analyse von Smart Contracts zu ermöglichen.

### Theorembeweis {#theorem-proving}

Der Theorembeweis ist eine Methode, um mathematische Schlussfolgerungen über die Korrektheit von Programmen, einschließlich Smart Contracts, zu ziehen. Es geht darum, das Modell eines Vertragssystems und seine Spezifizierungen in mathematische Formeln (Logikaussagen) zu transformieren.

Das Ziel des Theorembeweises ist es, die logische Äquivalenz zwischen diesen Aussagen zu verifizieren. „Logische Äquivalenz“ (auch „logische Bi-Implikation“ genannt) ist eine Art von Beziehung zwischen zwei Aussagen, wobei die erste Aussage wahr ist, _wenn und nur wenn_ die zweite Aussage wahr ist.

Die geforderte Beziehung (logische Äquivalenz) zwischen Aussagen über das Modell eines Vertrages und seiner Eigenschaft wird als beweisbare Aussage (genannt „Theorem“) formuliert. Mithilfe eines formalen Inferenzsystems kann der automatisierte Theoremprüfer die Gültigkeit des Theorems verifizieren. Mit anderen Worten: Ein Theoremprüfer kann schlüssig beweisen, dass das Modell eines Smart Contracts genau seinen Spezifizierungen entspricht.

Die Modellprüfung modelliert Verträge als Übergangssysteme mit endlichen Zuständen. Mit Theorembeweisen hingegen gelingt die Analyse von Systemen mit unendlichen Zuständen. Das bedeutet jedoch, dass ein automatischer Theoremprüfer nicht immer wissen kann, ob ein Logikproblem „entscheidbar“ ist oder nicht.

Daher ist oft menschliche Hilfe erforderlich, um den Theoremprüfer bei der Ableitung von Korrektheitsbeweisen anzuleiten. Der Einsatz menschlicher Arbeitskraft bei Theorembeweisen macht seine Nutzung teurer als die der Modellprüfung, die vollständig automatisiert erfolgt.

### Symbolische Ausführung {#symbolic-execution}

Die symbolische Ausführung ist eine Methode zur Analyse eines Smart Contracts, bei der Funktionen mit _symbolischen Werten_ (z. B., `x > 5`) anstelle von _konkreten Werten_ (z. B., `x == 5`) ausgeführt werden. Als formale Verifizierungsstechnik wird die symbolische Ausführung eingesetzt, um auf formale Weise Schlussfolgerungen über die Trace-Level-Eigenschaften im Code eines Vertrags zu ziehen.

Die symbolische Ausführung stellt eine Ausführungs-Trace als mathematische Formel über symbolischen Eingabewerten dar, die auch als _Pfad-Prädikat_ bezeichnet werden. Ein [SMT Solver](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) wird verwendet, um zu prüfen, ob ein Pfadprädikat „erfüllbar“ ist (d. h. ob es einen Wert gibt, der die Formel erfüllen kann). Wenn ein anfälliger Pfad erfüllbar ist, erzeugt der SMT Solver einen konkreten Wert, der die Ausführung in Richtung dieses Pfades auslöst und lenkt.

Angenommen, eine Funktion eines Smart Contracts nimmt einen `uint`-Wert (`x`) als Eingabe an und macht dies rückgängig, wenn `x` größer als `5` und gleichzeitig kleiner als `10` ist. Damit ein Wert für `x` gefunden wird, der den Fehler im Rahmen eines normalen Testverfahrens auslöst, müssten Dutzende von Testfällen (oder mehr) durchlaufen werden, wobei keine Gewissheit besteht, dass tatsächlich eine fehlerauslösende Eingabe gefunden wird.

Umgekehrt würde ein Werkzeug zur symbolischen Ausführung die Funktion mit dem folgenden symbolischen Wert ausführen: `X > 5 ∧ X < 10` (d.h., `x` ist größer als 5 UND `x` ist kleiner als 10). Das zugehörige Pfadprädikat `x = X > 5 ∧ X < 10` würde dann an einen SMT Solver zur Lösung übergeben werden. Wenn ein bestimmter Wert die Formel `x = X > 5 ∧ X < 10` erfüllt, wird dieser vom SMT Solver berechnet – zum Beispiel könnte der Solver `7` als einen Wert für `x` berechnen.

Da die symbolische Ausführung auf Eingaben in ein Programm angewiesen ist und die Menge der Eingaben zur Erforschung aller erreichbaren Zustände potenziell unendlich ist, handelt es sich dabei dennoch um eine Form von Tests. Wie das Beispiel zeigt, ist die symbolische Ausführung jedoch effizienter als reguläre Tests, wenn es darum geht, Eingaben zu finden, die Eigenschaftsverstöße auslösen.

Außerdem führt die symbolische Ausführung zu weniger falsch-positiven Ergebnissen als andere eigenschaftsbasierte Techniken (z. B. Fuzzing), bei denen die Eingaben für eine Funktion zufällig generiert werden. Wird bei der symbolischen Ausführung ein Fehlerzustand ausgelöst, so kann ein konkreter Wert erzeugt werden, der den Fehler auslöst und das Problem reproduziert.

Die symbolische Ausführung kann auch einen gewissen mathematischen Beweis für die Korrektheit liefern. Betrachten Sie das folgende Beispiel für eine Vertragsfunktion mit Überlaufschutz:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

Eine Ausführungs-Trace, die zu einem Ganzzahlüberlauf führt, müsste die folgende Formel erfüllen: `z = x + y UND (z >= x) UND (z=>y) UND (z < x ODER z < y)` Es ist unwahrscheinlich, dass solch eine Formel gelöst wird, daher dient sie als mathematischer Beweis, dass die Funktion `safe_add` niemals überläuft.

### Warum die formale Verifizierung für Smart Contracts? {#benefits-of-formal-verification}

#### Notwendigkeit der Zuverlässigkeit {#need-for-reliability}

Die formale Verifizierung wird eingesetzt, um die Korrektheit sicherheitskritischer Systeme zu bewerten, deren Versagen verheerende Folgen haben kann, wie Tod, Verletzung oder finanziellen Ruin. Smart Contracts sind High-Value-Anwendungen, die enorme Werte kontrollieren, und einfache Fehler in ihrem Aufbau können zu [unwiederbringlichen Verlusten für die Benutzer](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/) führen. Die formale Verifizierung eines Vertrags vor der Veröffentlichung kann jedoch die Garantien erhöhen, dass er wie erwartet funktioniert, sobald er auf der Blockchain läuft.

Zuverlässigkeit ist eine äußerst wünschenswerte Eigenschaft eines jeden Smart Contracts, insbesondere weil Code, der in der Ethereum Virtual Machine (EVM) veröffentlicht wurde, in der Regel unveränderbar ist. Da Upgrades nach dem Launch nicht ohne weiteres möglich sind, ist eine formale Verifizierung erforderlich, um die Zuverlässigkeit der Verträge zu gewährleisten. Dank formaler Verifizierung können heikle Probleme wie Ganzzahlunterläufe und -überläufe, Wiedereintritte und schlechte Gasoptimierungen erkannt werden, die Auditoren und Testern möglicherweise entgehen.

#### Nachweis der funktionalen Korrektheit {#prove-functional-correctness}

Programmtests sind die gängigste Methode, um zu beweisen, dass ein Smart Contract bestimmte Anforderungen erfüllt. In diesem Zusammenhang wird ein Vertrag mit Beispieldaten, die verarbeitet werden sollen, ausgeführt und sein Verhalten analysiert. Wenn der Vertrag die erwarteten Ergebnisse für die Beispieldaten liefert, dann haben die Entwickler einen objektiven Beweis für seine Korrektheit.

Mit diesem Ansatz kann jedoch nicht die korrekte Ausführung für Eingabewerte bewiesen werden, die nicht Teil der Beispieldaten sind. Daher kann das Testen eines Vertrages dabei helfen, Bugs zu entdecken (z. B. wenn einige Codepfade während der Ausführung nicht die gewünschten Ergebnisse liefern), aber **es kann nicht schlüssig beweisen, dass keine Bugs vorhanden sind**.

Umgekehrt kann mithilfe der formalen Verifizierung formal bewiesen werden, dass ein Smart Contract die Anforderungen für einen unendlichen Bereich von Ausführungen _erfüllt, ohne_ den Vertrag überhaupt auszuführen. Dies erfordert die Erstellung einer formalen Spezifizierung, die das korrekte Verhalten von Verträgen genau beschreibt, und die Entwicklung eines formalen (mathematischen) Modells für das System des Vertrags. Dann können wir ein formales Beweisverfahren anwenden, um die Konsistenz zwischen dem Vertragsmodell und seiner Spezifizierung zu überprüfen.

Bei der formalen Verifizierung ist die Frage, ob die Geschäftslogik eines Vertrags den Anforderungen entspricht, eine mathematische Proposition, die bewiesen oder widerlegt werden kann. Durch den formalen Beweis einer Proposition können wir eine unendliche Anzahl von Testfällen mit einer endlichen Anzahl von Schritten verifizieren. Auf diese Weise bestehen bei der formalen Verifizierung bessere Aussichten darauf, zu beweisen, dass ein Vertrag in Bezug auf eine Spezifizierung funktional korrekt ist.

#### Ideale Verifizierungsziele {#ideal-verification-targets}

Ein Verifizierungssziel beschreibt das formal zu verifizierende System. Die formale Verifizierung eignet sich am besten für „eingebettete Systeme“ (kleine, einfache Teile einer Software, die zu einem größeren System gehören). Sie sind auch ideal für spezialisierte Domänen, die nur wenigen Regeln unterliegen, da dies die Anpassung von Werkzeugen zur Verifizierung von domänenspezifischen Eigenschaften erleichtert.

Smart Contracts erfüllen – zumindest bis zu einem gewissen Grad – beide Anforderungen. Die geringe Größe von Ethereum-Verträgen bedeutet zum Beispiel, dass sie für eine formale Verifizierung geeignet sind. Auf ähnliche Weise unterliegt die EVM einfachen Regeln, was das Festlegen und die Verifizierung semantischer Eigenschaften für Programme, die auf der EVM laufen, erleichtert.

### Schnellerer Entwicklungszyklus {#faster-development-cycle}

Formale Verifizierungstechniken wie die Modellprüfung und symbolische Ausführung sind in der Regel effizienter als die reguläre Analyse von Smart-Contract-Code (die im Rahmen von Tests oder Audits durchgeführt wird). Dies liegt daran, dass die formale Verifizierung auf symbolischen Werten beruht, um Behauptungen zu testen („Was, wenn ein Benutzer versucht, _n_ Ether abzuheben?“) – im Gegensatz zu Tests, bei denen konkrete Werte zum Einsatz kommen („Was, wenn ein Benutzer versucht, 5 Ether abzuheben?“).

Symbolische Eingabevariablen können mehrere Klassen konkreter Werte abdecken, sodass formale Verifizierungsansätze eine größere Codeabdeckung in kürzerer Zeit versprechen. Wenn sie effektiv eingesetzt wird, kann die formale Verifizierung den Entwicklungszyklus für Entwickler beschleunigen.

Die formale Verifizierung sorgt auch für einen besseren Prozess bei der Entwicklung dezentraler Anwendungen (DApps), indem sie kostspielige Designfehler reduziert. Die Aktualisierung von Verträgen (soweit möglich) zur Behebung von Schwachstellen erfordert eine umfangreiche Umschreibung der Codebasis und einen höheren Entwicklungsaufwand. Durch die formale Verifizierung können viele Fehler in der Vertragsimplementierung aufgedeckt werden, die den Testern und Auditoren entgehen könnten, und es besteht ausreichend Gelegenheit, diese Probleme zu beheben, bevor ein Vertrag veröffentlicht wird.

## Nachteile der formalen Verifizierung {#drawbacks-of-formal-verification}

### Kosten für manuelle Arbeit {#cost-of-manual-labor}

Für die formale Verifizierung, insbesondere die halbautomatische Verifizierung, bei der ein Mensch den Prüfer bei der Ableitung von Korrektheitsbeweisen anleitet, ist ein erhebliches Maß an manueller Arbeit erforderlich. Darüber hinaus ist die Erstellung formaler Spezifizierungen eine komplexe Tätigkeit, die ein hohes Maß an Fachwissen erfordert.

Aufgrund dieser Faktoren (Aufwand und Fähigkeiten) ist die formale Verifizierung anspruchsvoller und teurer als die üblichen Methoden zur Bewertung der Korrektheit von Verträgen, wie etwa Tests und Audits. Angesichts der Kosten von Fehlern bei der Implementierung von Smart Contracts ist es jedoch sinnvoll, die Kosten für ein vollständiges Verifizierungsaudit zu tragen.

### Falsch-negative Ergebnisse {#false-negatives}

Bei einer formalen Verifizierung kann nur geprüft werden, ob die Ausführung des Smart Contracts der formalen Spezifizierung entspricht. Daher muss sichergestellt werden, dass die Spezifizierung die erwarteten Verhaltensweisen eines Smart Contracts korrekt beschreibt.

Wenn Spezifizierungen schlecht geschrieben sind, können Verstöße gegen Eigenschaften – die auf anfällige Ausführungen hinweisen – durch das formale Verifizierungsaudit nicht entdeckt werden. In diesem Fall könnte der Entwickler irrtümlicherweise zur Annahme verleitet werden, dass der Vertrag keine Bugs enthält.

### Probleme mit der Leistungsfähigkeit {#performance-issues}

Bei der formalen Verifizierung kommt es zu einer Reihe von Leistungsproblemen. So können beispielsweise Probleme mit Zustands- und Pfadexplosionen, die bei der Modellprüfung bzw. der symbolischen Prüfung auftreten, die Verifizierungsverfahren beeinträchtigen. Außerdem kommen als Werkzeuge für formale Verifizierungen häufig SMT-Solver und andere Constraint-Solver auf ihrer zugrunde liegenden Ebene zum Einsatz, und diese Solver sind auf rechenintensive Verfahren angewiesen.

Außerdem ist es für Programm-Verifizierer nicht immer möglich, festzustellen, ob eine (als logische Formel beschriebene) Eigenschaft erfüllt werden kann oder nicht (das „[Entscheidbarkeitsproblem](https://en.wikipedia.org/wiki/Decision_problem)“), da ein Programm möglicherweise nie endet. Daher kann es unmöglich sein, einige Eigenschaften eines Vertrags nachzuweisen, selbst wenn er gut spezifiziert ist.

## Werkzeuge zur formalen Verifizierung von Ethereum-Smart-Contracts {#formal-verification-tools}

### Spezifizierungssprachen zur Erstellung formaler Spezifizierungen {#specification-languages}

**Act**: _*Act ermöglicht die Spezifizierung von Speicher-Updates, Vor- und Nachbedingungen und Vertragsinvarianten. Die Tool-Suite verfügt auch über Proof Backends, die viele Eigenschaften über Coq, SMT Solver oder hevm beweisen können.**

- [GitHub](https://github.com/ethereum/act)
- [Dokumentation](https://ethereum.github.io/act/)

**Scribble** - _*Scribble wandelt Code-Annotationen in der Scribble-Spezifizierungssprache in konkrete Behauptungen um, die die Spezifizierung überprüfen.**

- [Dokumentation](https://docs.scribble.codes/)

**Dafny** – _*Dafny ist eine verifizierungsbereite Programmiersprache, die sich auf High-Level-Annotationen stützt, um Schlussfolgerungen über den Code zu ziehen und dessen Korrektheit zu beweisen.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Programmverifizierer zur Überprüfung der Korrektheit {#program-verifiers}

**Certora Prover** – _Certora Prover ist ein automatisches, formales Verifizierungstool zur Überprüfung der Korrektheit von Code in Smart Contracts. Die Spezifizierungen werden in CVL (Certora Verification Language) geschrieben, wobei Verstöße gegen Eigenschaften durch eine Kombination aus statischer Analyse und Constraint Solving aufgedeckt werden._

- [Website](https://www.certora.com/)
- [Dokumentation](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** – _*Der SMTChecker von Solidity ist ein eingebauter Model Checker, der auf SMT (Satisfiability Modulo Theories) und Horn Solving basiert. Er bestätigt, ob der Quellcode eines Vertrags während der Kompilierung mit den Spezifizierungen übereinstimmt und prüft statisch auf Verstöße gegen die Sicherheitseigenschaften.**

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** – _*solc-verify ist eine erweiterte Version des Solidity-Compilers, die automatisierte formale Verifizierungen von Solidity-Code mithilfe von Annotationen und modularer Programmverifizierung durchführen kann.**

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** – _*KEVM ist eine formale Semantik der Ethereum Virtual Machine (EVM), die im K-Framework geschrieben wurde. KEVM ist ausführbar und kann bestimmte eigenschaftsbezogene Behauptungen mithilfe der Erreichbarkeitslogik beweisen.**

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentation](https://jellopaper.org/)

### Logische Frameworks für den Theorembeweis {#theorem-provers}

**Isabelle** – _Isabelle/HOL ist ein Beweisassistent, der es ermöglicht, mathematische Formeln in einer formalen Sprache auszudrücken, und Werkzeuge zum Beweisen dieser Formeln bereitstellt. Seine Hauptanwendung ist die Formalisierung mathematischer Beweise und insbesondere die formale Verifizierung, die den Nachweis der Korrektheit von Computerhardware oder -software und den Nachweis der Eigenschaften von Computersprachen und -protokollen umfasst._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentation](https://isabelle.in.tum.de/documentation.html)

**Coq** – _Coq ist ein interaktiver Theorem-Prüfer, mit dem sich Programme unter Verwendung von Theoremen definieren und interaktiv maschinengeprüfte Korrektheitsbeweise erzeugen lassen._

- [GitHub](https://github.com/coq/coq)
- [Dokumentation](https://coq.github.io/doc/v8.13/refman/index.html)

### Auf symbolischer Durchführung basierende Werkzeuge zur Erkennung anfälliger Muster in Smart Contracts {#symbolic-execution-tools}

**Manticore** – _*Ein Tool zur Analyse des EVM-Bytecodes basierend auf symbolischer Ausführung*.*

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentation](https://github.com/trailofbits/manticore/wiki)

**hevm** – _*hevm ist eine symbolische Ausführungsengine und ein Äquivalenzprüfer für EVM-Bytecode.**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Ein Werkzeug zur symbolischen Ausführung zum Erkennen von Schwachstellen in Ethereum-Smart-Contracts_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentation](https://mythril-classic.readthedocs.io/en/develop/)

## Weiterführende Informationen {#further-reading}

- [Wie die formale Verifizierung von Smart Contracts funktioniert](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Wie die formale Verifizierung fehlerfreie Smart Contracts sicherstellen kann](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Ein Überblick über Projekte zur formalen Verifizierung im Ethereum-Ökosystem](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Formale End-to-End-Verifizierung des Ethereum 2.0 Deposit Smart Contract](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Die formale Verifizierung der weltweit populärsten Smart Contracts](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker und formale Verifizierung](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
