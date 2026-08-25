---
title: "Sicurezza tramite segretezza: usare i micropunti per conservare i segreti"
description: "Presentazione di un approccio non convenzionale alla custodia delle chiavi utilizzando la tecnologia fisica dei micropunti, offuscando le frasi seme in immagini stampate invisibili a occhio nudo."
lang: it
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "privacy-and-security"
  - "privacy"
  - "authentication"
format: presentation
author: Ethereum Foundation
breadcrumb: "Sicurezza dei micropunti"
---

Un intervento lampo di **jseam** alla Devcon SEA che esplora un approccio non convenzionale alla custodia delle chiavi utilizzando la tecnologia fisica dei micropunti, storicamente usata nello spionaggio per offuscare le frasi seme in immagini stampate che sono virtualmente invisibili a occhio nudo.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=k9Dfg19JPEw) pubblicata dalla Fondazione Ethereum. È stata leggermente modificata per facilitarne la lettura.*

#### Perché i micropunti? (0:00) {#why-microdots-000}

Ciao ragazzi, benvenuti in Thailandia. Nel mio intervento parlerò dei micropunti: cosa sono esattamente, perché dovreste volerli e come potete effettivamente realizzarli. Ho alcuni campioni, quindi dopo l'intervento potrete darci un'occhiata.

Ci sono molte domande sull'OpSec e su come nascondere le frasi seme. Molti dei processi esistenti sono tutti digitali. Ma cosa succederebbe se ci fossero processi fisici? E se si potessero offuscare le cose? La custodia delle chiavi rimane un problema enorme. Abbiamo la condivisione dei segreti, il recupero sociale, ma so che molte persone nel mondo cripto sono un po' asociali, quindi il recupero sociale potrebbe essere difficile.

Guardate questo grafico: in questo momento stiamo vivendo l'epidemia della solitudine. Quindi la custodia delle chiavi e il recupero sociale diventeranno problemi enormi. E se ci fossero approcci fisici per offuscare le informazioni?

#### La storia della steganografia con micropunti (2:00) {#the-history-of-microdot-steganography-200}

Questa è una tecnica di steganografia chiamata micropunti. Il motivo per cui la mostro oggi è perché storicamente è stata usata nello spionaggio. L'obiettivo è essenzialmente nascondere i messaggi in bella vista.

Tutta la documentazione al riguardo è molto limitata. Probabilmente lo state chiedendo a Claude e vi risponde: "Spiacente, nessuna informazione per te". Ho fatto io stesso il reverse engineering di queste informazioni. Le diapositive documentano tutto. Non riuscirò a coprire ogni dettaglio, ma esaminerò le parti interessanti. Ho anche creato una repository su GitHub che documenta i processi.

#### Fotografia analogica per la sicurezza (3:30) {#analog-photography-for-security-330}

Riporteremo in vita la fotografia analogica per questo caso d'uso. Perché analogica? Fondamentalmente non c'è alcuna possibilità che qualcuno hackerizzi una fotocamera analogica, a meno che non ve la rubi fisicamente.

Uno dei problemi principali della fotografia analogica è l'ISO. Su una fotocamera digitale, non è un grosso problema: si può regolare. Ma con la pellicola, l'ISO è in funzione della grana della pellicola. Questo diventa un problema quando si vuole miniaturizzare l'immagine. Più basso è l'ISO, più piccola è la grana in generale.

Ci sono due fasi. Per prima cosa, si scatta una foto, la si sviluppa e la si fissa. La seconda fase è quella in cui, invece di ingrandire l'immagine, facciamo l'opposto: la rimpiccioliamo su scala microscopica.

#### Il processo britannico (5:00) {#the-british-process-500}

Ecco come si fa. Scrivete la vostra frase seme. Normalmente un tutorial di MetaMask vi chiede di scrivere la frase seme, ma poi dove la mettete? Questo è un modo: scattate una foto della frase seme, caricate la pellicola, sviluppate la pellicola. La cosa interessante è che si tratta di metalli pesanti, metalli d'argento. Non dovreste buttarli nel water. Io ne ho versato accidentalmente un po' nel mio water, quindi potrei aver commesso qualche reato ambientale. Nel peggiore dei casi, probabilmente corroderà i miei tubi.

Scattate di nuovo la foto e, ecco fatto: avete questo minuscolo puntino. Questo è chiamato il processo britannico.

#### Il processo al bicromato (7:00) {#the-dichromated-process-700}

Il processo successivo, ancora più estremo, è il processo al bicromato. È così che si possono ottenere ingrandimenti microscopici come 1000x. L'obiettivo è trovare un substrato chimico per questo, ed è qui che entra in gioco quello che chiamo il "Succo d'Arancia Proibito": il bicromato di ammonio. È molto tossico. Ne ho versato un po' e sono quasi morto inalando la polvere. Probabilmente dovrò fare uno screening per il cancro dopo questo.

Si proietta l'immagine e si ottengono questi minuscoli puntini su un pezzo di carta. I puntini sono così piccoli che serve assolutamente un microscopio. Quello che usa il processo britannico si può vedere a occhio nudo, ma il processo al bicromato produce qualcosa di veramente minuscolo: non sono nemmeno sicuro che sia un'immagine reale senza un microscopio.

#### Domande e risposte (8:00) {#qa-800}

Quanto sono piccoli i micropunti? Si può vedere quello realizzato con il processo britannico a occhio nudo, ma il processo al bicromato produce qualcosa di veramente minuscolo: serve assolutamente un microscopio. È difficile dire se sia persino un'immagine reale senza di esso.

**Domanda:** Quanto dura? C'è un'emivita?

**jseam:** Non è radioattivo. Lo scopriremo tra 20 anni.

**Domanda:** Hai invertito il processo, codificando e poi decodificando per vedere se riesci a recuperarlo?

**jseam:** Penso di sì. Probabilmente servirebbe una sorta di configurazione di proiezione ottica.

Grazie mille. Se volete vedere i campioni, sarò da queste parti. Grazie per il vostro tempo, ragazzi.