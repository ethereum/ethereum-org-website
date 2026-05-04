---
title: Formale Verifizierung von Smart Contracts
description: "Ein Überblick über die formale Verifizierung von Ethereum-Smart-Contracts"
lang: de
---

[Smart Contracts](/developers/docs/smart-contracts/) machen es möglich, dezentralisierte, vertrauenslose und robuste Anwendungen zu erstellen, die neue Anwendungsfälle einführen und Mehrwert für Benutzer freisetzen. Da Smart Contracts große Werte verwalten, ist Sicherheit ein kritischer Aspekt für Entwickler.

Die formale Verifizierung ist eine der empfohlenen Techniken zur Verbesserung der [Sicherheit von Smart Contracts](/developers/docs/smart-contracts/security/). Die formale Verifizierung, die [formale Methoden](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) zur Spezifikation, zum Entwurf und zur Verifizierung von Programmen verwendet, wird seit Jahren eingesetzt, um die Korrektheit kritischer Hardware- und Softwaresysteme sicherzustellen.

Wenn sie in Smart Contracts implementiert wird, kann die formale Verifizierung beweisen, dass die Geschäftslogik eines Vertrags einer vordefinierten Spezifikation entspricht. Im Vergleich zu anderen Methoden zur Beurteilung der Korrektheit von Vertragscode, wie z. B. Tests, bietet die formale Verifizierung stärkere Garantien dafür, dass ein Smart Contract funktional korrekt ist.

## Was ist formale Verifizierung? {#what-is-formal-verification}

Formale Verifizierung bezieht sich auf den Prozess der Bewertung der Korrektheit eines Systems in Bezug auf eine formale Spezifikation. Einfacher ausgedrückt ermöglicht uns die formale Verifizierung zu überprüfen, ob das Verhalten eines Systems bestimmte Anforderungen erfüllt (d. h. es tut, was wir wollen).

Erwartete Verhaltensweisen des Systems (in diesem Fall ein Smart Contract) werden mithilfe formaler Modellierung beschrieben, während Spezifikationssprachen die Erstellung formaler Eigenschaften ermöglichen. Techniken der formalen Verifizierung können dann überprüfen, ob die Implementierung eines Vertrags seiner Spezifikation entspricht, und einen mathematischen Beweis für die Korrektheit der ersteren ableiten. Wenn ein Vertrag seine Spezifikation erfüllt, wird er als „funktional korrekt“, „correct by design“ (korrekt durch Entwurf) oder „correct by construction“ (korrekt durch Konstruktion) beschrieben.

### Was ist ein formales Modell? {#what-is-a-formal-model}

In der Informatik ist ein [formales Modell](https://en.wikipedia.org/wiki/Model_of_computation) eine mathematische Beschreibung eines Rechenprozesses. Programme werden in mathematische Funktionen (Gleichungen) abstrahiert, wobei das Modell beschreibt, wie Ausgaben von Funktionen bei einer bestimmten Eingabe berechnet werden.

Formale Modelle bieten eine Abstraktionsebene, über die die Analyse des Verhaltens eines Programms bewertet werden kann. Die Existenz formaler Modelle ermöglicht die Erstellung einer _formalen Spezifikation_, die gewünschte Eigenschaften des betreffenden Modells beschreibt.

Für die Modellierung von Smart Contracts zur formalen Verifizierung werden verschiedene Techniken verwendet. Beispielsweise werden einige Modelle verwendet, um über das High-Level-Verhalten eines Smart Contracts nachzudenken. Diese Modellierungstechniken wenden eine Black-Box-Sicht auf Smart Contracts an und betrachten sie als Systeme, die Eingaben akzeptieren und basierend auf diesen Eingaben Berechnungen ausführen.

High-Level-Modelle konzentrieren sich auf die Beziehung zwischen Smart Contracts und externen Akteuren, wie z. B. extern verwalteten Konten (EOAs), Vertragskonten und der Blockchain-Umgebung. Solche Modelle sind nützlich, um Eigenschaften zu definieren, die festlegen, wie sich ein Vertrag als Reaktion auf bestimmte Benutzerinteraktionen verhalten soll.

Umgekehrt konzentrieren sich andere formale Modelle auf das Low-Level-Verhalten eines Smart Contracts. Während High-Level-Modelle beim Nachdenken über die Funktionalität eines Vertrags helfen können, erfassen sie möglicherweise keine Details über die internen Abläufe der Implementierung. Low-Level-Modelle wenden eine White-Box-Sicht auf die Programmanalyse an und stützen sich auf Low-Level-Darstellungen von Smart-Contract-Anwendungen, wie z. B. Programm-Traces und [Kontrollflussgraphen](https://en.wikipedia.org/wiki/Control-flow_graph), um über Eigenschaften nachzudenken, die für die Ausführung eines Vertrags relevant sind.

Low-Level-Modelle gelten als ideal, da sie die tatsächliche Ausführung eines Smart Contracts in der Ausführungsumgebung von Ethereum (d. h. der [EVM](/developers/docs/evm/)) darstellen. Low-Level-Modellierungstechniken sind besonders nützlich, um kritische Sicherheitseigenschaften in Smart Contracts zu etablieren und potenzielle Schwachstellen zu erkennen.

### Was ist eine formale Spezifikation? {#what-is-a-formal-specification}

Eine Spezifikation ist einfach eine technische Anforderung, die ein bestimmtes System erfüllen muss. In der Programmierung stellen Spezifikationen allgemeine Ideen über die Ausführung eines Programms dar (d. h. was das Programm tun soll).

Im Kontext von Smart Contracts beziehen sich formale Spezifikationen auf _Eigenschaften_ – formale Beschreibungen der Anforderungen, die ein Vertrag erfüllen muss. Solche Eigenschaften werden als „Invarianten“ beschrieben und stellen logische Behauptungen über die Ausführung eines Vertrags dar, die unter allen möglichen Umständen ohne Ausnahmen wahr bleiben müssen.

Somit können wir uns eine formale Spezifikation als eine Sammlung von in einer formalen Sprache geschriebenen Anweisungen vorstellen, die die beabsichtigte Ausführung eines Smart Contracts beschreiben. Spezifikationen decken die Eigenschaften eines Vertrags ab und definieren, wie sich der Vertrag unter verschiedenen Umständen verhalten soll. Der Zweck der formalen Verifizierung besteht darin, festzustellen, ob ein Smart Contract diese Eigenschaften (Invarianten) besitzt und dass diese Eigenschaften während der Ausführung nicht verletzt werden.

Formale Spezifikationen sind entscheidend für die Entwicklung sicherer Implementierungen von Smart Contracts. Verträge, die Invarianten nicht implementieren oder deren Eigenschaften während der Ausführung verletzt werden, sind anfällig für Schwachstellen, die die Funktionalität beeinträchtigen oder böswillige Exploits verursachen können.

## Arten formaler Spezifikationen für Smart Contracts {#formal-specifications-for-smart-contracts}

Formale Spezifikationen ermöglichen mathematisches Denken über die Korrektheit der Programmausführung. Wie bei formalen Modellen können formale Spezifikationen entweder High-Level-Eigenschaften oder das Low-Level-Verhalten einer Vertragsimplementierung erfassen.

Formale Spezifikationen werden unter Verwendung von Elementen der [Programmlogik](https://en.wikipedia.org/wiki/Logic_programming) abgeleitet, die ein formales Nachdenken über die Eigenschaften eines Programms ermöglichen. Eine Programmlogik hat formale Regeln, die (in mathematischer Sprache) das erwartete Verhalten eines Programms ausdrücken. Bei der Erstellung formaler Spezifikationen werden verschiedene Programmlogiken verwendet, darunter [Erreichbarkeitslogik](https://en.wikipedia.org/wiki/Reachability_problem), [Temporallogik](https://en.wikipedia.org/wiki/Temporal_logic) und [Hoare-Logik](https://en.wikipedia.org/wiki/Hoare_logic).

Formale Spezifikationen für Smart Contracts können grob in **High-Level**- oder **Low-Level**-Spezifikationen eingeteilt werden. Unabhängig davon, zu welcher Kategorie eine Spezifikation gehört, muss sie die Eigenschaft des zu analysierenden Systems angemessen und eindeutig beschreiben.

### High-Level-Spezifikationen {#high-level-specifications}

Wie der Name schon sagt, beschreibt eine High-Level-Spezifikation (auch „modellorientierte Spezifikation“ genannt) das High-Level-Verhalten eines Programms. High-Level-Spezifikationen modellieren einen Smart Contract als [endlichen Automaten](https://en.wikipedia.org/wiki/Finite-state_machine) (Finite State Machine, FSM), der durch Ausführen von Operationen zwischen Zuständen wechseln kann, wobei Temporallogik verwendet wird, um formale Eigenschaften für das FSM-Modell zu definieren.

[Temporallogiken](https://en.wikipedia.org/wiki/Temporal_logic) sind „Regeln für das Nachdenken über Aussagen, die in Bezug auf die Zeit qualifiziert sind (z. B. ‚Ich bin _immer_ hungrig‘ oder ‚Ich werde _irgendwann_ hungrig sein‘).“ Wenn sie auf die formale Verifizierung angewendet werden, werden Temporallogiken verwendet, um Behauptungen über das korrekte Verhalten von als Zustandsautomaten modellierten Systemen aufzustellen. Insbesondere beschreibt eine Temporallogik die zukünftigen Zustände, in denen sich ein Smart Contract befinden kann, und wie er zwischen Zuständen wechselt.

High-Level-Spezifikationen erfassen im Allgemeinen zwei kritische temporale Eigenschaften für Smart Contracts: **Sicherheit (Safety)** und **Lebendigkeit (Liveness)**. Sicherheitseigenschaften repräsentieren die Idee, dass „niemals etwas Schlimmes passiert“, und drücken normalerweise Invarianz aus. Eine Sicherheitseigenschaft kann allgemeine Softwareanforderungen definieren, wie z. B. die Freiheit von [Deadlocks](https://www.techtarget.com/whatis/definition/deadlock), oder domänenspezifische Eigenschaften für Verträge ausdrücken (z. B. Invarianten zur Zugriffskontrolle für Funktionen, zulässige Werte von Zustandsvariablen oder Bedingungen für Token-Transfers).

Nehmen wir zum Beispiel diese Sicherheitsanforderung, die Bedingungen für die Verwendung von `transfer()` oder `transferFrom()` in ERC-20-Token-Verträgen abdeckt: _„Der Kontostand eines Senders ist niemals niedriger als die angeforderte Menge an zu sendenden Token.“_ Diese natürlichsprachliche Beschreibung einer Vertragsinvariante kann in eine formale (mathematische) Spezifikation übersetzt werden, die dann streng auf Gültigkeit geprüft werden kann.

Lebendigkeitseigenschaften behaupten, dass „irgendwann etwas Gutes passiert“, und betreffen die Fähigkeit eines Vertrags, durch verschiedene Zustände voranzuschreiten. Ein Beispiel für eine Lebendigkeitseigenschaft ist „Liquidität“, die sich auf die Fähigkeit eines Vertrags bezieht, seine Guthaben auf Anfrage an Benutzer zu übertragen. Wenn diese Eigenschaft verletzt wird, könnten Benutzer keine im Vertrag gespeicherten Vermögenswerte abheben, wie es beim [Vorfall mit dem Parity-Wallet](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html) geschah.

### Low-Level-Spezifikationen {#low-level-specifications}

High-Level-Spezifikationen nehmen als Ausgangspunkt ein Finite-State-Modell eines Vertrags und definieren gewünschte Eigenschaften dieses Modells. Im Gegensatz dazu modellieren Low-Level-Spezifikationen (auch „eigenschaftsorientierte Spezifikationen“ genannt) Programme (Smart Contracts) oft als Systeme, die eine Sammlung mathematischer Funktionen umfassen, und beschreiben das korrekte Verhalten solcher Systeme.

Einfacher ausgedrückt analysieren Low-Level-Spezifikationen _Programm-Traces_ und versuchen, Eigenschaften eines Smart Contracts über diese Traces zu definieren. Traces beziehen sich auf Sequenzen von Funktionsausführungen, die den Zustand eines Smart Contracts ändern; daher helfen Low-Level-Spezifikationen dabei, Anforderungen für die interne Ausführung eines Vertrags zu spezifizieren.

Formale Low-Level-Spezifikationen können entweder als Eigenschaften im Hoare-Stil oder als Invarianten auf Ausführungspfaden angegeben werden.

### Eigenschaften im Hoare-Stil {#hoare-style-properties}

Die [Hoare-Logik](https://en.wikipedia.org/wiki/Hoare_logic) bietet eine Reihe formaler Regeln für das Nachdenken über die Korrektheit von Programmen, einschließlich Smart Contracts. Eine Eigenschaft im Hoare-Stil wird durch ein Hoare-Tripel `{P}c{Q}` dargestellt, wobei `c` ein Programm ist und `P` und `Q` Prädikate über den Zustand von `c` (d. h. dem Programm) sind, die formal als _Vorbedingungen_ bzw. _Nachbedingungen_ beschrieben werden.

Eine Vorbedingung ist ein Prädikat, das die für die korrekte Ausführung einer Funktion erforderlichen Bedingungen beschreibt; Benutzer, die den Vertrag aufrufen, müssen diese Anforderung erfüllen. Eine Nachbedingung ist ein Prädikat, das die Bedingung beschreibt, die eine Funktion bei korrekter Ausführung herstellt; Benutzer können erwarten, dass diese Bedingung nach dem Aufruf der Funktion wahr ist. Eine _Invariante_ in der Hoare-Logik ist ein Prädikat, das durch die Ausführung einer Funktion erhalten bleibt (d. h. es ändert sich nicht).

Spezifikationen im Hoare-Stil können entweder _partielle Korrektheit_ oder _totale Korrektheit_ garantieren. Die Implementierung einer Vertragsfunktion ist „partiell korrekt“, wenn die Vorbedingung vor der Ausführung der Funktion wahr ist und, falls die Ausführung beendet wird, auch die Nachbedingung wahr ist. Ein Beweis für die totale Korrektheit wird erbracht, wenn eine Vorbedingung vor der Ausführung der Funktion wahr ist, die Ausführung garantiert beendet wird und, wenn dies der Fall ist, die Nachbedingung wahr ist.

Den Beweis für die totale Korrektheit zu erbringen, ist schwierig, da sich einige Ausführungen vor der Beendigung verzögern oder überhaupt nicht beendet werden können. Allerdings ist die Frage, ob die Ausführung beendet wird, wohl ein strittiger Punkt, da der Gas-Mechanismus von Ethereum Endlosschleifen in Programmen verhindert (die Ausführung wird entweder erfolgreich beendet oder endet aufgrund eines „Out-of-Gas“-Fehlers).

Smart-Contract-Spezifikationen, die mithilfe der Hoare-Logik erstellt wurden, weisen Vorbedingungen, Nachbedingungen und Invarianten auf, die für die Ausführung von Funktionen und Schleifen in einem Vertrag definiert sind. Vorbedingungen beinhalten oft die Möglichkeit fehlerhafter Eingaben in eine Funktion, wobei Nachbedingungen die erwartete Reaktion auf solche Eingaben beschreiben (z. B. das Auslösen einer bestimmten Ausnahme). Auf diese Weise sind Eigenschaften im Hoare-Stil effektiv, um die Korrektheit von Vertragsimplementierungen sicherzustellen.

Viele Frameworks zur formalen Verifizierung verwenden Spezifikationen im Hoare-Stil, um die semantische Korrektheit von Funktionen zu beweisen. Es ist auch möglich, Eigenschaften im Hoare-Stil (als Zusicherungen) direkt zum Vertragscode hinzuzufügen, indem die Anweisungen `require` und `assert` in Solidity verwendet werden.

`require`-Anweisungen drücken eine Vorbedingung oder Invariante aus und werden oft verwendet, um Benutzereingaben zu validieren, während `assert` eine für die Sicherheit notwendige Nachbedingung erfasst. Beispielsweise kann eine ordnungsgemäße Zugriffskontrolle für Funktionen (ein Beispiel für eine Sicherheitseigenschaft) erreicht werden, indem `require` als Vorbedingungsprüfung der Identität des aufrufenden Kontos verwendet wird. In ähnlicher Weise kann eine Invariante für zulässige Werte von Zustandsvariablen in einem Vertrag (z. B. die Gesamtzahl der im Umlauf befindlichen Token) vor Verletzungen geschützt werden, indem `assert` verwendet wird, um den Zustand des Vertrags nach der Funktionsausführung zu bestätigen.

### Trace-Level-Eigenschaften {#trace-level-properties}

Trace-basierte Spezifikationen beschreiben Operationen, die einen Vertrag zwischen verschiedenen Zuständen überführen, und die Beziehungen zwischen diesen Operationen. Wie bereits erklärt, sind Traces Sequenzen von Operationen, die den Zustand eines Vertrags auf eine bestimmte Weise ändern.

Dieser Ansatz beruht auf dem Modell von Smart Contracts als Zustandsübergangssysteme mit einigen vordefinierten Zuständen (beschrieben durch Zustandsvariablen) zusammen mit einer Reihe vordefinierter Übergänge (beschrieben durch Vertragsfunktionen). Darüber hinaus wird häufig ein [Kontrollflussgraph](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (Control Flow Graph, CFG), der eine grafische Darstellung des Ausführungsflusses eines Programms ist, zur Beschreibung der operativen Semantik eines Vertrags verwendet. Hierbei wird jeder Trace als Pfad auf dem Kontrollflussgraphen dargestellt.

In erster Linie werden Trace-Level-Spezifikationen verwendet, um über Muster der internen Ausführung in Smart Contracts nachzudenken. Durch die Erstellung von Trace-Level-Spezifikationen behaupten wir die zulässigen Ausführungspfade (d. h. Zustandsübergänge) für einen Smart Contract. Mithilfe von Techniken wie der symbolischen Ausführung können wir formal verifizieren, dass die Ausführung niemals einem Pfad folgt, der nicht im formalen Modell definiert ist.

Verwenden wir ein Beispiel für einen [DAO](/dao/)-Vertrag, der über einige öffentlich zugängliche Funktionen verfügt, um Trace-Level-Eigenschaften zu beschreiben. Hier gehen wir davon aus, dass der DAO-Vertrag Benutzern die Ausführung der folgenden Operationen ermöglicht:

- Gelder einzahlen

- Über einen Vorschlag abstimmen, nachdem Gelder eingezahlt wurden

- Eine Rückerstattung fordern, wenn sie nicht über einen Vorschlag abstimmen

Beispielhafte Trace-Level-Eigenschaften könnten sein: _„Benutzer, die keine Gelder einzahlen, können nicht über einen Vorschlag abstimmen“_ oder _„Benutzer, die nicht über einen Vorschlag abstimmen, sollten immer in der Lage sein, eine Rückerstattung zu fordern“_. Beide Eigenschaften behaupten bevorzugte Ausführungssequenzen (eine Abstimmung kann nicht _vor_ der Einzahlung von Geldern erfolgen und die Forderung einer Rückerstattung kann nicht _nach_ der Abstimmung über einen Vorschlag erfolgen).

## Techniken zur formalen Verifizierung von Smart Contracts {#formal-verification-techniques}

### Model Checking {#model-checking}

Model Checking ist eine formale Verifizierungstechnik, bei der ein Algorithmus ein formales Modell eines Smart Contracts anhand seiner Spezifikation überprüft. Beim Model Checking werden Smart Contracts oft als Zustandsübergangssysteme dargestellt, während Eigenschaften zu zulässigen Vertragszuständen mithilfe von Temporallogik definiert werden.

Model Checking erfordert die Erstellung einer abstrakten mathematischen Darstellung eines Systems (d. h. eines Vertrags) und den Ausdruck von Eigenschaften dieses Systems mithilfe von Formeln, die in der [Aussagenlogik](https://www.baeldung.com/cs/propositional-logic) verwurzelt sind. Dies vereinfacht die Aufgabe des Model-Checking-Algorithmus, nämlich zu beweisen, dass ein mathematisches Modell eine gegebene logische Formel erfüllt.

Model Checking in der formalen Verifizierung wird in erster Linie verwendet, um temporale Eigenschaften zu bewerten, die das Verhalten eines Vertrags im Laufe der Zeit beschreiben. Temporale Eigenschaften für Smart Contracts umfassen _Sicherheit_ und _Lebendigkeit_, die wir zuvor erklärt haben.

Beispielsweise kann eine Sicherheitseigenschaft im Zusammenhang mit der Zugriffskontrolle (z. B. _Nur der Eigentümer des Vertrags kann `selfdestruct` aufrufen_) in formaler Logik geschrieben werden. Danach kann der Model-Checking-Algorithmus überprüfen, ob der Vertrag diese formale Spezifikation erfüllt.

Model Checking verwendet die Zustandsraumexploration, bei der alle möglichen Zustände eines Smart Contracts konstruiert und versucht wird, erreichbare Zustände zu finden, die zu Eigenschaftsverletzungen führen. Dies kann jedoch zu einer unendlichen Anzahl von Zuständen (bekannt als das „Zustandsexplosionsproblem“), weshalb Model Checker auf Abstraktionstechniken angewiesen sind, um eine effiziente Analyse von Smart Contracts zu ermöglichen.

### Theorembeweisen {#theorem-proving}

Theorembeweisen ist eine Methode des mathematischen Nachdenkens über die Korrektheit von Programmen, einschließlich Smart Contracts. Es beinhaltet die Transformation des Modells des Systems eines Vertrags und seiner Spezifikationen in mathematische Formeln (logische Aussagen).

Das Ziel des Theorembeweisens ist es, die logische Äquivalenz zwischen diesen Aussagen zu verifizieren. „Logische Äquivalenz“ (auch „logische Bi-Implikation“ genannt) ist eine Art von Beziehung zwischen zwei Aussagen, bei der die erste Aussage _genau dann_ wahr ist, wenn die zweite Aussage wahr ist.

Die erforderliche Beziehung (logische Äquivalenz) zwischen Aussagen über das Modell eines Vertrags und seine Eigenschaft wird als beweisbare Aussage (Theorem genannt) formuliert. Mithilfe eines formalen Inferenzsystems kann der automatisierte Theorembeweiser die Gültigkeit des Theorems verifizieren. Mit anderen Worten, ein Theorembeweiser kann schlüssig beweisen, dass das Modell eines Smart Contracts genau seinen Spezifikationen entspricht.

Während Model Checking Verträge als Übergangssysteme mit endlichen Zuständen modelliert, kann das Theorembeweisen die Analyse von Systemen mit unendlichen Zuständen handhaben. Dies bedeutet jedoch, dass ein automatisierter Theorembeweiser nicht immer wissen kann, ob ein logisches Problem „entscheidbar“ ist oder nicht.

Infolgedessen ist oft menschliche Unterstützung erforderlich, um den Theorembeweiser bei der Ableitung von Korrektheitsbeweisen zu leiten. Der Einsatz menschlicher Anstrengung beim Theorembeweisen macht die Verwendung teurer als das Model Checking, das vollständig automatisiert ist.

### Symbolische Ausführung {#symbolic-execution}

Die symbolische Ausführung ist eine Methode zur Analyse eines Smart Contracts durch Ausführen von Funktionen unter Verwendung _symbolischer Werte_ (z. B. `x > 5`) anstelle von _konkreten Werten_ (z. B. `x == 5`). Als formale Verifizierungstechnik wird die symbolische Ausführung verwendet, um formal über Trace-Level-Eigenschaften im Code eines Vertrags nachzudenken.

Die symbolische Ausführung stellt einen Ausführungs-Trace als mathematische Formel über symbolische Eingabewerte dar, die auch als _Pfadprädikat_ bezeichnet wird. Ein [SMT-Solver](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) wird verwendet, um zu überprüfen, ob ein Pfadprädikat „erfüllbar“ ist (d. h. es existiert ein Wert, der die Formel erfüllen kann). Wenn ein anfälliger Pfad erfüllbar ist, generiert der SMT-Solver einen konkreten Wert, der die Ausführung in Richtung dieses Pfades lenkt.

Angenommen, die Funktion eines Smart Contracts nimmt als Eingabe einen `uint`-Wert (`x`) und wird rückgängig gemacht (reverts), wenn `x` größer als `5` und gleichzeitig kleiner als `10` ist. Einen Wert für `x` zu finden, der den Fehler mithilfe eines normalen Testverfahrens auslöst, würde das Durchlaufen von Dutzenden von Testfällen (oder mehr) erfordern, ohne die Gewissheit, tatsächlich eine fehlerverursachende Eingabe zu finden.

Umgekehrt würde ein Tool zur symbolischen Ausführung die Funktion mit dem symbolischen Wert ausführen: `X > 5 ∧ X < 10` (d. h. `x` ist größer als 5 UND `x` ist kleiner als 10). Das zugehörige Pfadprädikat `x = X > 5 ∧ X < 10` würde dann einem SMT-Solver zur Lösung übergeben. Wenn ein bestimmter Wert die Formel `x = X > 5 ∧ X < 10` erfüllt, wird der SMT-Solver ihn berechnen – beispielsweise könnte der Solver `7` als Wert für `x` ausgeben.

Da die symbolische Ausführung auf Eingaben in ein Programm angewiesen ist und die Menge der Eingaben zur Erkundung aller erreichbaren Zustände potenziell unendlich ist, handelt es sich immer noch um eine Form des Testens. Wie im Beispiel gezeigt, ist die symbolische Ausführung jedoch effizienter als reguläres Testen, um Eingaben zu finden, die Eigenschaftsverletzungen auslösen.

Darüber hinaus erzeugt die symbolische Ausführung weniger falsch-positive Ergebnisse als andere eigenschaftsbasierte Techniken (z. B. Fuzzing), die zufällig Eingaben für eine Funktion generieren. Wenn während der symbolischen Ausführung ein Fehlerzustand ausgelöst wird, ist es möglich, einen konkreten Wert zu generieren, der den Fehler auslöst und das Problem reproduziert.

Die symbolische Ausführung kann auch ein gewisses Maß an mathematischem Korrektheitsbeweis liefern. Betrachten Sie das folgende Beispiel einer Vertragsfunktion mit Überlaufschutz:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Ein Ausführungs-Trace, der zu einem Integer-Überlauf führt, müsste die Formel erfüllen: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)`. Es ist unwahrscheinlich, dass eine solche Formel gelöst wird, daher dient sie als mathematischer Beweis dafür, dass die Funktion `safe_add` niemals überläuft.

### Warum formale Verifizierung für Smart Contracts verwenden? {#benefits-of-formal-verification}

#### Bedarf an Zuverlässigkeit {#need-for-reliability}

Die formale Verifizierung wird verwendet, um die Korrektheit sicherheitskritischer Systeme zu bewerten, deren Ausfall verheerende Folgen wie Tod, Verletzung oder finanziellen Ruin haben kann. Smart Contracts sind hochwertige Anwendungen, die enorme Werte kontrollieren, und einfache Designfehler können zu [unwiederbringlichen Verlusten für Benutzer](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/) führen. Die formale Verifizierung eines Vertrags vor der Bereitstellung kann jedoch die Garantien erhöhen, dass er wie erwartet funktioniert, sobald er auf der Blockchain läuft.

Zuverlässigkeit ist eine sehr erwünschte Eigenschaft in jedem Smart Contract, insbesondere weil Code, der in der [Ethereum](/) Virtual Machine (EVM) bereitgestellt wird, typischerweise unveränderlich ist. Da Upgrades nach dem Start nicht ohne Weiteres zugänglich sind, macht die Notwendigkeit, die Zuverlässigkeit von Verträgen zu garantieren, eine formale Verifizierung erforderlich. Die formale Verifizierung ist in der Lage, knifflige Probleme wie Integer-Unterläufe und -Überläufe, Re-Entrancy und schlechte Gas-Optimierungen zu erkennen, die Prüfern und Testern entgehen könnten.

#### Funktionale Korrektheit beweisen {#prove-functional-correctness}

Programmtests sind die häufigste Methode, um zu beweisen, dass ein Smart Contract bestimmte Anforderungen erfüllt. Dies beinhaltet die Ausführung eines Vertrags mit einer Stichprobe der Daten, die er voraussichtlich verarbeiten wird, und die Analyse seines Verhaltens. Wenn der Vertrag die erwarteten Ergebnisse für die Beispieldaten zurückgibt, haben Entwickler einen objektiven Beweis für seine Korrektheit.

Dieser Ansatz kann jedoch keine korrekte Ausführung für Eingabewerte beweisen, die nicht Teil der Stichprobe sind. Daher kann das Testen eines Vertrags helfen, Fehler zu erkennen (d. h. wenn einige Codepfade während der Ausführung nicht die gewünschten Ergebnisse liefern), aber **es kann nicht schlüssig die Abwesenheit von Fehlern beweisen**.

Umgekehrt kann die formale Verifizierung formal beweisen, dass ein Smart Contract Anforderungen für eine unendliche Reihe von Ausführungen erfüllt, _ohne_ den Vertrag überhaupt auszuführen. Dies erfordert die Erstellung einer formalen Spezifikation, die korrekte Vertragsverhaltensweisen präzise beschreibt, und die Entwicklung eines formalen (mathematischen) Modells des Vertragssystems. Dann können wir einem formalen Beweisverfahren folgen, um die Konsistenz zwischen dem Modell des Vertrags und seiner Spezifikation zu überprüfen.

Mit der formalen Verifizierung ist die Frage der Überprüfung, ob die Geschäftslogik eines Vertrags die Anforderungen erfüllt, eine mathematische Aussage, die bewiesen oder widerlegt werden kann. Durch den formalen Beweis einer Aussage können wir eine unendliche Anzahl von Testfällen mit einer endlichen Anzahl von Schritten verifizieren. Auf diese Weise hat die formale Verifizierung bessere Aussichten zu beweisen, dass ein Vertrag in Bezug auf eine Spezifikation funktional korrekt ist.

#### Ideale Verifizierungsziele {#ideal-verification-targets}

Ein Verifizierungsziel beschreibt das System, das formal verifiziert werden soll. Die formale Verifizierung wird am besten in „eingebetteten Systemen“ (kleine, einfache Softwareteile, die Teil eines größeren Systems sind) eingesetzt. Sie sind auch ideal für spezialisierte Domänen, die nur wenige Regeln haben, da dies die Anpassung von Tools zur Verifizierung domänenspezifischer Eigenschaften erleichtert.

Smart Contracts erfüllen – zumindest bis zu einem gewissen Grad – beide Anforderungen. Beispielsweise macht die geringe Größe von Ethereum-Verträgen sie für die formale Verifizierung zugänglich. Ebenso folgt die EVM einfachen Regeln, was die Spezifikation und Verifizierung semantischer Eigenschaften für Programme, die in der EVM ausgeführt werden, erleichtert.

### Schnellerer Entwicklungszyklus {#faster-development-cycle}

Techniken der formalen Verifizierung, wie Model Checking und symbolische Ausführung, sind im Allgemeinen effizienter als die reguläre Analyse von Smart-Contract-Code (die während des Testens oder Audits durchgeführt wird). Dies liegt daran, dass die formale Verifizierung auf symbolische Werte angewiesen ist, um Behauptungen zu testen („Was ist, wenn ein Benutzer versucht, _n_ Ether abzuheben?“), im Gegensatz zum Testen, das konkrete Werte verwendet („Was ist, wenn ein Benutzer versucht, 5 Ether abzuheben?“).

Symbolische Eingabevariablen können mehrere Klassen konkreter Werte abdecken, sodass formale Verifizierungsansätze mehr Codeabdeckung in einem kürzeren Zeitrahmen versprechen. Wenn sie effektiv eingesetzt wird, kann die formale Verifizierung den Entwicklungszyklus für Entwickler beschleunigen.

Die formale Verifizierung verbessert auch den Prozess der Erstellung dezentralisierter Anwendungen (Dapps), indem sie kostspielige Designfehler reduziert. Das Aktualisieren von Verträgen (wo möglich) zur Behebung von Schwachstellen erfordert ein umfangreiches Umschreiben von Codebasen und mehr Aufwand für die Entwicklung. Die formale Verifizierung kann viele Fehler in Vertragsimplementierungen erkennen, die Testern und Prüfern entgehen könnten, und bietet reichlich Gelegenheit, diese Probleme vor der Bereitstellung eines Vertrags zu beheben.

## Nachteile der formalen Verifizierung {#drawbacks-of-formal-verification}

### Kosten für manuelle Arbeit {#cost-of-manual-labor}

Die formale Verifizierung, insbesondere die halbautomatische Verifizierung, bei der ein Mensch den Beweiser anleitet, um Korrektheitsbeweise abzuleiten, erfordert erhebliche manuelle Arbeit. Darüber hinaus ist die Erstellung einer formalen Spezifikation eine komplexe Tätigkeit, die ein hohes Maß an Fähigkeiten erfordert.

Diese Faktoren (Aufwand und Fähigkeiten) machen die formale Verifizierung anspruchsvoller und teurer im Vergleich zu den üblichen Methoden zur Beurteilung der Korrektheit in Verträgen, wie Tests und Audits. Dennoch ist es praktisch, die Kosten für ein vollständiges Verifizierungs-Audit zu tragen, angesichts der Kosten von Fehlern in Smart-Contract-Implementierungen.

### Falsch-negative Ergebnisse {#false-negatives}

Die formale Verifizierung kann nur überprüfen, ob die Ausführung des Smart Contracts mit der formalen Spezifikation übereinstimmt. Daher ist es wichtig sicherzustellen, dass die Spezifikation die erwarteten Verhaltensweisen eines Smart Contracts richtig beschreibt.

Wenn Spezifikationen schlecht geschrieben sind, können Verletzungen von Eigenschaften – die auf anfällige Ausführungen hinweisen – durch das formale Verifizierungs-Audit nicht erkannt werden. In diesem Fall könnte ein Entwickler fälschlicherweise annehmen, dass der Vertrag fehlerfrei ist.

### Leistungsprobleme {#performance-issues}

Die formale Verifizierung stößt auf eine Reihe von Leistungsproblemen. Beispielsweise können Zustands- und Pfadexplosionsprobleme, die während des Model Checkings bzw. der symbolischen Überprüfung auftreten, Verifizierungsverfahren beeinträchtigen. Außerdem verwenden Tools zur formalen Verifizierung häufig SMT-Solver und andere Constraint-Solver in ihrer zugrunde liegenden Schicht, und diese Solver stützen sich auf rechenintensive Verfahren.

Außerdem ist es für Programmverifizierer nicht immer möglich zu bestimmen, ob eine Eigenschaft (beschrieben als logische Formel) erfüllt werden kann oder nicht (das „[Entscheidungsproblem](https://en.wikipedia.org/wiki/Decision_problem)“), da ein Programm möglicherweise nie beendet wird. Daher kann es unmöglich sein, einige Eigenschaften für einen Vertrag zu beweisen, selbst wenn er gut spezifiziert ist.

## Tools zur formalen Verifizierung für Ethereum-Smart-Contracts {#formal-verification-tools}

### Spezifikationssprachen zur Erstellung formaler Spezifikationen {#specification-languages}

**Act**: _*Act ermöglicht die Spezifikation von Speicheraktualisierungen, Vor-/Nachbedingungen und Vertragsinvarianten. Seine Tool-Suite verfügt auch über Beweis-Backends, die in der Lage sind, viele Eigenschaften über Coq, SMT-Solver oder hevm zu beweisen.*_

- [GitHub](https://github.com/ethereum/act)
- [Dokumentation](https://github.com/argotorg/act)

**Scribble** - _*Scribble wandelt Code-Annotationen in der Scribble-Spezifikationssprache in konkrete Zusicherungen um, die die Spezifikation überprüfen.*_

- [Dokumentation](https://docs.scribble.codes/)

**Dafny** - _*Dafny ist eine verifizierungsbereite Programmiersprache, die sich auf High-Level-Annotationen stützt, um über die Korrektheit von Code nachzudenken und diese zu beweisen.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Programmverifizierer zur Überprüfung der Korrektheit {#program-verifiers}

**Certora Prover** - _Certora Prover ist ein automatisches Tool zur formalen Verifizierung zur Überprüfung der Codekorrektheit in Smart Contracts. Spezifikationen werden in CVL (Certora Verification Language) geschrieben, wobei Eigenschaftsverletzungen mithilfe einer Kombination aus statischer Analyse und Constraint-Solving erkannt werden._

- [Website](https://www.certora.com/)
- [Dokumentation](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*Der SMTChecker von Solidity ist ein integrierter Model Checker, der auf SMT (Satisfiability Modulo Theories) und Horn-Solving basiert. Er bestätigt, ob der Quellcode eines Vertrags während der Kompilierung mit den Spezifikationen übereinstimmt, und prüft statisch auf Verletzungen von Sicherheitseigenschaften.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify ist eine erweiterte Version des Solidity-Compilers, die mithilfe von Annotationen und modularer Programmverifizierung eine automatisierte formale Verifizierung von Solidity-Code durchführen kann.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM ist eine formale Semantik der Ethereum Virtual Machine (EVM), die im K-Framework geschrieben ist. KEVM ist ausführbar und kann bestimmte eigenschaftsbezogene Behauptungen mithilfe von Erreichbarkeitslogik beweisen.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentation](https://jellopaper.org/)

### Logische Frameworks für das Theorembeweisen {#theorem-provers}

**Isabelle** - _Isabelle/HOL ist ein Beweisassistent, der es ermöglicht, mathematische Formeln in einer formalen Sprache auszudrücken, und Tools zum Beweisen dieser Formeln bereitstellt. Die Hauptanwendung ist die Formalisierung mathematischer Beweise und insbesondere die formale Verifizierung, die den Beweis der Korrektheit von Computerhardware oder -software und den Beweis von Eigenschaften von Computersprachen und Protokollen umfasst._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentation](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq ist ein interaktiver Theorembeweiser, mit dem Sie Programme mithilfe von Theoremen definieren und interaktiv maschinell geprüfte Korrektheitsbeweise generieren können._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Dokumentation](https://rocq-prover.org/docs)

### Auf symbolischer Ausführung basierende Tools zur Erkennung anfälliger Muster in Smart Contracts {#symbolic-execution-tools}

**Manticore** - _*Ein Tool zur Analyse von EVM-Bytecode, das auf symbolischer Ausführung basiert.*_

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentation](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm ist eine Engine für symbolische Ausführung und ein Äquivalenzprüfer für EVM-Bytecode.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Ein Tool zur symbolischen Ausführung zur Erkennung von Schwachstellen in Ethereum-Smart-Contracts_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentation](https://mythril-classic.readthedocs.io/en/develop/)

## Weiterführende Literatur {#further-reading}

- [Wie die formale Verifizierung von Smart Contracts funktioniert](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Wie formale Verifizierung fehlerfreie Smart Contracts sicherstellen kann](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Ein Überblick über Projekte zur formalen Verifizierung im Ethereum-Ökosystem](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [End-to-End formale Verifizierung des Ethereum 2.0 Einzahlungsvertrags](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Formale Verifizierung des weltweit beliebtesten Smart Contracts](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker und formale Verifizierung](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)