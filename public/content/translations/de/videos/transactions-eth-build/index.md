---
title: "Transaktionen — ETH.BUILD"
description: "Eine Demonstration, wie Ethereum-Transaktionen mit dem Lerntool ETH.BUILD funktionieren. Erfahre, wie Transaktionen erstellt, signiert und im Ethereum-Netzwerk gesendet werden."
lang: de
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transactions"
format: tutorial
author: Austin Griffith
breadcrumb: "Transaktionen (ETH.BUILD)"
---

Ein Tutorial von **Austin Griffith**, das demonstriert, wie Ethereum-Transaktionen mit dem visuellen Programmiertool ETH.BUILD funktionieren — es behandelt die Transaktionsstruktur, Gaspreise, das Signieren, das Senden und den Transaktionspool.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=er-0ihqFQB0), das von Austin Griffith veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Transaktionsgebühren und Miner-Anreize (0:00) {#transaction-fees-and-miner-incentives-000}

Heute werden wir auf ETH.BUILD über Transaktionen sprechen. Bisher wurden diese Transaktionen in Blöcke gemint, in Blöcke verpackt und in eine Chain gemint. Wir wollen darüber sprechen, was den Miner – abgesehen von der Blockbelohnung – dazu anregt, unsere Transaktion aus dem Pool zu nehmen, sie in einen Block zu packen und sie auf die Chain zu minen, im Vergleich zu anderen Leuten im Pool. Es könnten Tausende von Leuten im Pool sein, die alle gewissermaßen bieten, und dieses Gebot erfolgt über diese Gebühr.

Ich könnte eine Gebühr in meiner Transaktion haben, die besagt: „Ich bin Alice und ich sende fünf an Bob, und meine Nonce ist eins als Replay-Schutz.“ Außerdem kann derjenige, der dies mint, die Gebühr für sich behalten. Im Grunde sendet Alice fünf an Bob, zahlt dem Miner aber auch einen kleinen Betrag, damit er sie in die Chain aufnimmt.

#### Anatomie einer Ethereum-Transaktion (1:10) {#anatomy-of-an-ethereum-transaction-110}

Wie sieht eine Transaktion auf Ethereum aus? Wir werden nicht mehr „Bob“ und „Alice“ haben – wir werden Adressen haben. Der Wert wäre in Wei, nicht in ETH. Und die Gebühr wäre ebenfalls in Wei.

Lass uns einsteigen und uns diese Transaktion ansehen. Ich habe ein Konto mit einer eingefügten Mnemonic und bin mit dem Ethereum Mainnet verbunden. Ich führe auch ein Modul aus, um Preisdaten von CoinMarketCap zu erhalten, sodass ich sehen kann, dass null-komma-eins-irgendwas ETH etwa dreiundzwanzig Dollar entsprechen.

#### Einrichten der Transaktion (2:25) {#setting-up-the-transaction-225}

Was ich tun werde, ist eine Transaktion zu erstellen und dem Miner einen Anreiz zu geben, sie aufzunehmen und Onchain zu bringen. Ich habe zwei Charaktere – Alice und Bob. Alice wird mit ihrem privaten Schlüssel einen bestimmten Wert an Bob senden. Es gibt hier kein „Von“-Adressfeld, weil – zur Erinnerung – wir mit unserem Schlüsselpaar signieren und wiederherstellen. Die Transaktion wird verpackt, signiert und dann über das Netzwerk gesendet. Niemand kann sie manipulieren, und auf der anderen Seite kann jemand sie wiederherstellen und feststellen, dass tatsächlich wir sie signiert haben. Die „Von“-Adresse wird abgeleitet.

#### Gaspreis-Strategie (4:20) {#gas-price-strategy-420}

Der Gaspreis ist standardmäßig auf etwa 4,1 Gwei eingestellt – das sind 4,1 Milliarden Wei. Aber wir wollen dabei strategischer vorgehen und sehen, was gerade Onchain passiert. Wir können sehen, dass der letzte Block 78 Transaktionen hatte und der Gaspreis von etwa 5 bis zu einem Minimum reichte. Im Grunde müssten wir über 5 liegen, um in diesen Block gemint zu werden. Also setzen wir den Gaspreis auf 5,001 – nur ein kleines bisschen mehr.

#### Umrechnung in Wei (5:20) {#converting-to-wei-520}

Wir müssen eine Umrechnung in Wei vornehmen. Auf Ethereum hat man es hauptsächlich mit zwei Stückelungen zu tun: ETH, worüber die Leute normalerweise sprechen, und dann Wei, was wie ein sehr winziger Bruchteil von ETH ist. Ein Gwei – was wir für Gaspreise verwenden – liegt dazwischen. Der Grund dafür ist ähnlich wie der, warum wir nicht herumlaufen und in Bruchteilen von Cents sprechen.

Alice hat 0,18 ETH, und wir werden 0,05 ETH an Bob senden. Wir geben einen Gaspreis von 5 Gwei ein.

#### Signieren und Senden (7:02) {#signing-and-broadcasting-702}

Wenn Alice sich entscheidet, die Transaktion zu signieren, wird sie als signierte Transaktion ausgegeben, die über das Netzwerk gesendet werden kann. Niemand kann sie manipulieren – auf der anderen Seite kann jemand ableiten, dass es Alice war, die sie signiert hat, und sie enthält alle Informationen darüber, an wen wir senden wollen, und das Gas, das an den Miner geht.

Wir nehmen diese signierte Transaktion und fügen sie in die Sendefunktion des Blockchain-Moduls ein. Wenn ich auf Senden klicke, gibt es uns einen Hash – den Transaktions-Hash. Im Grunde habe ich sie an das verteilte Netzwerk gesendet und sie haben mir einen Transaktions-Hash zurückgegeben. Sie geht in das Netzwerk hinaus, und dann gibt es diesen Transaktionspool – Leute, die alle bieten, um ihre Transaktion durchzubekommen.

#### Überprüfen des Blocks (8:41) {#checking-the-block-841}

Wir können die Blockchain nach unserer Transaktion abfragen. Tatsächlich wurde sie bereits gemint. Wir können uns den Block ansehen, nach Gaspreis sortieren und uns selbst finden. Da ist unsere Transaktion zum Gaspreis von 5,001 – Alice sendet an Bob, ohne zusätzliche Daten. Wir sind drin, etwa vier oder fünf Positionen von unten.

#### Senden von Daten mit einer Transaktion (9:54) {#sending-data-with-a-transaction-954}

Wir sind in der Lage, Werte zu senden und zu bieten, damit unsere Transaktion Onchain anerkannt wird. Aber lass uns noch eine Sache ansehen – das Datenfeld. Wir können Dinge zusammen mit unserer Transaktion senden. Das wird in hexadezimaler Form sein. Alice wird weitere sechs Dollar an Bob senden, und wir werden eine Nachricht anhängen: „hey Bob“. Wir können sehen, wie „hey Bob“ in Hexadezimal umgewandelt wird.

Wir signieren diese Transaktion, senden sie an einen Miner, sie geht an das Netzwerk, und wir bekommen einen Hash zurück. Wir beobachten, wie sie gemint wird, und das wird sie. Wenn wir diesen Block überprüfen, können wir unsere Transaktion mit den angehängten Daten sehen.

#### Transaktionspool und Gas-Erhöhung (12:43) {#transaction-pool-and-gas-bumping-1243}

Für eine letzte Demonstration lege ich eine Transaktion mit einem sehr niedrigen Gaspreis in den Pool – etwa 1,001 Gwei. Sie liegt dort ungemint, weil wir den Minern nicht genug Anreize bieten. Wir können sehen, dass die Transaktion im Transaktionspool aussteht. Der Pool hat zwischen ein- und dreihundert Transaktionen, aber die neuesten Blöcke, die gemint werden, zeigen, dass der kleinste Gaspreis bei etwa 5 liegt.

Also müssen wir diese Transaktion erneut einreichen – erhöhen wir ihn auf 10. Das ist viel mehr als nötig, aber wir reichen dieselbe Transaktion mit derselben Nonce, aber einem höheren Gaspreis erneut ein. Das Netzwerk sagt: „Gleiche Person, gleiche Transaktion, bereit, mehr zu zahlen.“ Sie wird aufgenommen und in den nächsten Block gemint.

#### Zusammenfassung (14:52) {#summary-1452}

Wir haben eine Transaktion gesendet, wir haben etwas Gas bezahlt, um dem Miner einen Anreiz zu geben, sie in die Chain von Blöcken aufzunehmen. Wir haben auch Daten zusammen mit einer Transaktion gesendet – es gibt alle möglichen wirklich coolen Dinge, die wir jetzt tun können, da wir diese Aufrufdaten mitliefern, und wir werden später auf Smart Contracts und viele lustige Dinge eingehen.