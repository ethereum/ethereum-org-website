---
title: Come tradurre
lang: it
description: Istruzioni per usare Crowdin per tradurre ethereum.org
---

## Guida visiva {#visual-guide}

Per chi preferisce l'apprendimento visivo, guarda Luka che illustra come configurare Crowdin. In alternativa, puoi trovare gli stessi passaggi in formato scritto nella sezione successiva.

<VideoWatch slug="crowdin-translation-guide" />

## Guida scritta {#written-guide}

### Unisciti al nostro progetto su Crowdin {#join-project}

Dovrai accedere al tuo account Crowdin o registrarti se non ne hai già uno. Tutto ciò che serve per registrarsi è un account e-mail e una password.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Unisciti al progetto
</ButtonLink>

### Apri la tua lingua {#open-language}

Dopo aver effettuato l'accesso a Crowdin, vedrai una descrizione del progetto e un elenco di tutte le lingue disponibili.
Ogni lingua contiene anche informazioni sulla quantità totale di parole traducibili e una panoramica di quanti contenuti sono stati tradotti e approvati in una lingua specifica.

Apri la lingua in cui desideri tradurre per vedere l'elenco dei file disponibili per la traduzione.

![List of languages in Crowdin](./list-of-languages.png)

### Trova un documento su cui lavorare {#find-document}

Il contenuto del sito web è diviso in una serie di documenti e gruppi di contenuti (bucket). Puoi controllare i progressi di ogni documento sulla destra: se il progresso della traduzione è inferiore al 100%, contribuisci!

Non vedi la tua lingua nell'elenco? [Apri una issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose) o chiedi nel nostro [Discord](https://discord.gg/ethereum-org)

![Translated and untranslated files in Crowdin](./crowdin-files.png)

Una nota sui gruppi di contenuti: utilizziamo i "content bucket" all'interno di Crowdin per rilasciare prima i contenuti con la priorità più alta. Quando selezioni una lingua, ad esempio il [Filippino](https://crowdin.com/project/ethereum-org/fil#), vedrai le cartelle per i gruppi di contenuti ("1. Homepage", "2. Essentials", "3. Exploring", ecc.).

Ti incoraggiamo a tradurre in questo ordine numerico (1 → 2 → 3 → ⋯) per assicurarti che le pagine con l'impatto maggiore vengano tradotte per prime.

### Traduci {#translate}

Dopo aver selezionato il file che desideri tradurre, si aprirà nell'editor online. Se non hai mai usato Crowdin prima, puoi usare questa guida rapida per ripassare le basi.

![Crowdin online editor](./online-editor.png)

**_1 – Barra laterale sinistra_**

- Non tradotto (rosso) – testo su cui non si è ancora lavorato. Queste sono le stringhe che dovresti tradurre.
- Tradotto (verde) – testo che è già stato tradotto, ma non ancora revisionato. Sei invitato a suggerire traduzioni alternative o a votare quelle esistenti usando i pulsanti "+" e "-" nell'editor.
- Approvato (segno di spunta) – testo che è già stato revisionato ed è attualmente online sul sito web.

Puoi anche usare i pulsanti in alto per cercare stringhe specifiche, filtrarle per stato o cambiare la visualizzazione.

**_2 – Area dell'editor_**

L'area di traduzione principale: il testo di origine viene visualizzato in alto, con contesto aggiuntivo e screenshot, se disponibili.
Per suggerire una nuova traduzione, inserisci la tua traduzione nel campo "Enter translation here" (Inserisci qui la traduzione) e fai clic su Salva.

In questa sezione puoi anche trovare le traduzioni esistenti della stringa e le traduzioni in altre lingue, oltre alle corrispondenze della memoria di traduzione e ai suggerimenti della traduzione automatica.

**_3 – Barra laterale destra_**

Qui è dove puoi trovare commenti, voci della memoria di traduzione e voci del glossario. La visualizzazione predefinita mostra i commenti e consente ai traduttori di comunicare, sollevare problemi o segnalare traduzioni errate.

Usando i pulsanti in alto, puoi anche passare alla Memoria di Traduzione, dove puoi cercare le traduzioni esistenti, o al Glossario, che contiene descrizioni e traduzioni standard dei termini chiave.

Vuoi saperne di più? Sentiti libero di consultare la [documentazione sull'uso dell'editor online di Crowdin](https://support.crowdin.com/online-editor/)

### Processo di revisione {#review-process}

Una volta completata la traduzione (ovvero, tutti i file per un gruppo di contenuti mostrano il 100%), il nostro servizio di traduzione professionale revisionerà (e potenzialmente modificherà) il contenuto. Una volta completata la revisione (ovvero, il progresso della revisione è al 100%), lo aggiungeremo al sito web.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Ti preghiamo di non utilizzare la traduzione automatica per tradurre il progetto. Tutte le traduzioni verranno revisionate prima di essere aggiunte al sito web. Se si scopre che le traduzioni suggerite sono state tradotte automaticamente, verranno scartate e i contributori che utilizzano spesso la traduzione automatica verranno rimossi dal progetto.
</AlertContent>
</Alert>

### Contattaci {#get-in-touch}

Hai delle domande? O vuoi collaborare con il nostro team e altri traduttori? Scrivi nel canale #translations del nostro [server Discord di ethereum.org](https://discord.gg/ethereum-org)

Puoi anche contattarci all'indirizzo translations@ethereum.org

Grazie per la tua partecipazione al Programma di Traduzione di ethereum.org!