---
title: Aggiungi la firma in chiaro al tuo protocollo con l'ERC-7730
description: Scopri come scrivere un descrittore ERC-7730 in modo che le interazioni con i tuoi smart contract mostrino dettagli leggibili dall'uomo nei portafogli prima che gli utenti firmino.
author: Hester Bruikman
lang: it
tags: ["ERC-7730", "sicurezza", "firma", "smart contract", "portafogli"]
skill: intermediate
breadcrumb: Firma in chiaro
published: 2026-05-11
---

La maggior parte dei principali exploit su Ethereum ha avuto lo stesso passaggio finale: un utente che approva una transazione che non poteva comprendere in modo significativo. I portafogli hardware mostrano i dati di chiamata esadecimali grezzi e, peggio ancora, costringono ad avere la firma cieca (blind signing) attivata. I portafogli software mostrano i campi decodificati, ma solo quando riconoscono il contratto. Quando non lo fanno, sia perché il protocollo è nuovo, l'app è compromessa o il dispositivo è offline, gli utenti firmano alla cieca.

[L'ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) definisce un formato JSON standard per descrivere cosa *significano* le chiamate di funzione del tuo contratto. 

Un portafoglio che supporta l'ERC-7730 legge il tuo descrittore e mostra:

> **Swap**  
> Invia: 1.000 USDC  
> Ricevi minimo: 0,42 WETH  
> Protocollo: Uniswap V3

Oppure una singola frase costruita leggibile sia dagli esseri umani che dagli agenti:

> Fai lo swap di 1.000 USDC per almeno 0,42 WETH

Invece di un selettore di funzione e un elenco di valori interi grezzi.

Questa è la [firma in chiaro](https://clearsigning.org/) — "Quello che vedi è quello che firmi" (What You See Is What You Sign). Questo tutorial ti guida attraverso la scrittura di un descrittore per il tuo contratto, la sua convalida con lo strumento CLI ufficiale e l'invio al registro aperto.

## Prerequisiti {#prerequisites}

- Familiarità con Solidity e le ABI degli smart contract
- Uno smart contract distribuito con un'ABI verificata (la verifica su [Sourcify](https://sourcify.dev) è richiesta prima che un descrittore venga accettato nel registro) 
- Python 3.12+ per la CLI di convalida 
- Conoscenza di base di JSON

## Cos'è un descrittore ERC-7730? {#what-is-an-erc-7730-descriptor}

Un descrittore è un singolo file JSON con tre sezioni:

| Sezione | Scopo |
| :---- | :---- |
| `context` | Associa il descrittore a distribuzioni di contratti specifiche tramite ID della catena e indirizzo |
| `metadata` | Dà un nome al progetto e definisce costanti riutilizzabili |
| `display` | Mappa ogni firma di funzione a etichette leggibili dall'uomo e formati di campo |

Poiché il descrittore è separato dal contratto stesso, puoi aggiungere il supporto per la firma in chiaro a qualsiasi protocollo esistente senza una nuova distribuzione. I portafogli recuperano i descrittori dal registro e li utilizzano al momento della firma.

## Passaggio 1: Creare lo scheletro del file {#step-1-create-the-file-skeleton}

Crea un file chiamato `calldata-<contractname>-<descriptorversion>.json`. Il prefisso `calldata-` indica al registro che questo descrittore copre le chiamate di funzione del contratto, a differenza di `eip712-` per i messaggi di dati tipizzati. `descriptorversion` indica al registro la versione del file descrittore, 0 per impostazione predefinita se non viene fornita alcuna versione.


```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## Passaggio 2: Scrivere la sezione del contesto {#step-2-write-the-context-section}

La sezione `context` associa il descrittore a una o più distribuzioni del contratto. I portafogli la utilizzano per far corrispondere una transazione in entrata al descrittore corretto.

```json
"context": {
  "$id": "uniswap-v3-router-mainnet",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### Campi del contesto {#context-fields}

- `context.$id` — Un identificatore univoco per questo documento descrittore o configurazione di distribuzione.
- `contract.deployments` — L'insieme di distribuzioni a cui si applica questo descrittore.
- `deployments[].chainId` — L'ID della catena EVM per una distribuzione. Includi ogni catena in cui è distribuito il tuo contratto.
- `deployments[].address` — L'indirizzo del contratto che i portafogli dovrebbero associare a questo descrittore. Usa l'indirizzo di implementazione che contiene la logica di esecuzione.

## Passaggio 3: Scrivere la sezione dei metadati {#step-3-write-the-metadata-section}

La sezione dei metadati fornisce informazioni leggibili dall'uomo sul progetto e sul contratto descritti da questo file. I portafogli possono utilizzare queste informazioni per visualizzare nomi di protocolli, link e altri dettagli contestuali durante la firma.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Campi dei metadati {#metadata-fields}

- `owner` — Il progetto, protocollo, organizzazione o manutentore responsabile di questo descrittore.
- `info.url` — Un URL canonico del progetto o della documentazione che i portafogli possono mostrare agli utenti per ulteriore contesto.
- `contractName` — Il nome del contratto o dell'implementazione descritto da questo file, che in genere corrisponde al codice sorgente verificato o all'ABI.

Se il tuo file ERC-7730 descrive un contratto ERC-20, dovresti aggiungere anche un oggetto token. 

## Passaggio 4: Scrivere la sezione dei formati di visualizzazione {#step-4-write-the-displayformats-section}

L'oggetto `display.formats` mappa le firme delle funzioni a istruzioni di firma leggibili dall'uomo. È così che i portafogli mostrano la tua funzione agli utenti prima che approvino una transazione!

Ogni chiave è un frammento di ABI leggibile dall'uomo: la firma della funzione che include sia i nomi che i tipi dei parametri esattamente come appaiono nella tua ABI.


### Esempio: Descrivere uno swap di token {#eg-describing-token-swap}

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}

```

### Campi di visualizzazione {#display-fields}

- **`intent`** — **(Obbligatorio)** Una breve descrizione intuitiva dell'azione, come "Swap".
- **`interpolatedIntent`** — **(Consigliato)** Un modello di frase più ricco che incorpora valori di campo formattati, come `"Swap {amountIn} for at least {amountOutMin}"`. Includilo insieme a `intent` per fornire un descrittore ancora più intuitivo che i portafogli possono scegliere di mostrare in base a eventuali vincoli di visualizzazione.
- **`fields`** — **(Obbligatorio)** L'elenco ordinato dei campi della transazione che i portafogli dovrebbero mostrare agli utenti.
  - **`path`** — **(Obbligatorio)** Un riferimento ai dati della transazione. `#.fieldName` punta a un parametro dei dati di chiamata decodificato in base al nome nell'ABI. `@.value` si riferisce al valore in ETH inviato con la transazione.
  - **`label`** — **(Obbligatorio)** L'etichetta leggibile dall'uomo mostrata accanto al valore.
  - **`format`** — **(Consigliato)** Controlla come dovrebbe essere reso il valore. I formati comuni includono:
    - `tokenAmount`
    - `addressName`
    - `date`

    Usa `raw` quando non è necessaria alcuna formattazione aggiuntiva. Alcuni formati accettano una configurazione **`params`** aggiuntiva. Ad esempio:

    - `tokenAmount` può usare `tokenPath` per identificare quale indirizzo del token fornisce i decimali e i metadati del ticker.
    - `date` può usare `encoding` per descrivere come è codificato il timestamp.

    Se il formato selezionato non richiede informazioni aggiuntive, ometti `params`.

## Il descrittore completo {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "uniswap-v3-router-mainnet",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## Passaggio 5: Inviare al registro {#step-5-submit-to-the-registry}

Il [registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) è un repository aperto ospitato dalla [Fondazione Ethereum](/foundation/) in qualità di amministratore neutrale. Chiunque è libero di clonarlo e ospitarlo autonomamente: i portafogli decidono in modo indipendente di quali istanze del registro fidarsi.

1. Fai un fork del repository su GitHub  
2. Crea una cartella in `registry/<your-project-name>/`  
3. Inserisci il tuo file al suo interno: `registry/myproject/calldata-mycontract-0_0.json`  
4. Aggiorna il campo `$schema` al percorso relativo utilizzato all'interno del repository: `"../../specs/erc7730-v2.schema.json"`  
5. Apri una pull request

Quando apri la PR, la CI esegue automaticamente la convalida dello schema, verifica che le firme delle funzioni producano selettori validi, conferma che l'indirizzo del contratto sia verificato su Sourcify e segnala le incongruenze dell'ABI. I risultati del controllo appaiono in linea sulla PR. I manutentori del registro esaminano gli invii per individuare descrittori malformati o potenzialmente dannosi. L'inclusione nel registro non implica un audit o un'approvazione.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Nota:** Il tuo contratto deve essere verificato su <a href="https://repo.sourcify.dev">Sourcify</a> prima che la tua PR possa essere accettata. Se non è ancora verificato, <a href="https://verify.sourcify.dev/">invia prima la verifica</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Cosa succede dopo l'unione (merge)? {#what-happens-after-merging}

Tutti i descrittori nel registro sono aperti ai revisori. Dopo che la tua PR è stata unita, qualsiasi revisore può esaminare il tuo descrittore e pubblicare un'attestazione crittografica (ai sensi dell'[ERC-8176](https://github.com/ethereum/ERCs/pull/1576)) confermandone l'accuratezza. 

Questi segnali di attestazione consentono ai portafogli di applicare le proprie politiche di fiducia: un descrittore con più attestazioni indipendenti ha più peso di uno che ne è privo. Puoi raggiungere la community dei revisori tramite [clearsigning.org](https://clearsigning.org).

I portafogli scelgono quale registro supportare. Una volta che il tuo descrittore è nel registro, i portafogli che supportano l'ERC-7730 inizieranno a recuperarlo se è presente nel loro registro e mostreranno dati leggibili dall'uomo quando gli utenti interagiscono con il tuo contratto.

## Letture consigliate {#further-reading}

- [Specifica ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — strumenti, stato dell'ecosistema e governance  
- [Verifica dei contratti su Sourcify](https://sourcify.dev)  
- [Iniziativa Trillion Dollar Security](https://trilliondollarsecurity.org)