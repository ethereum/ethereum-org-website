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

La maggior parte dei principali exploit su Ethereum ha avuto lo stesso passaggio finale: un utente che approvava una transazione che non poteva comprendere in modo significativo. I portafogli hardware mostrano i dati di chiamata esadecimali grezzi e, peggio ancora, ti costringono ad avere la firma cieca (blind signing) attivata. I portafogli software mostrano i campi decodificati, ma solo quando riconoscono il contratto. Quando non lo fanno, sia perché il protocollo è nuovo, l'app è compromessa o il dispositivo è offline, gli utenti firmano alla cieca.

L'[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) definisce un formato JSON standard per descrivere cosa *significano* le chiamate di funzione del tuo contratto.

Un portafoglio che supporta l'ERC-7730 legge il tuo descrittore e mostra:

> **Swap**  
> Invia: 1.000 USDC  
> Ricevi minimo: 0,42 WETH  
> Protocollo: Uniswap V2

Oppure una singola frase costruita leggibile sia dagli esseri umani che dagli agenti:

> Swap di 1.000 USDC per almeno 0,42 WETH

Invece di un selettore di funzione e un elenco di valori interi grezzi.

Questa è la [firma in chiaro](https://clearsigning.org/) (clear signing) — "Quello che vedi è quello che firmi". Questo tutorial ti guida attraverso la scrittura di un descrittore per il tuo contratto, la sua convalida con lo strumento CLI ufficiale e l'invio al registro aperto.

## Prerequisiti {#prerequisites}

- Familiarità con Solidity e le ABI degli smart contract
- Uno smart contract distribuito con un'ABI verificata (la verifica su [Sourcify](https://sourcify.dev) è richiesta prima che un descrittore venga accettato nel registro)
- Python 3.12 per la CLI di convalida (il pacchetto `erc7730` fissato non si installa su Python 3.13 o versioni successive). Se il Python del tuo sistema è di una versione diversa, [uv](https://docs.astral.sh/uv/) può scaricare ed eseguire Python 3.12 per te
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

Crea un file chiamato `calldata-<ContractName>.json`, ad esempio `calldata-SwapRouter.json`. Il prefisso `calldata-` indica al registro che questo descrittore copre le chiamate di funzione del contratto, a differenza di `eip712-` per i messaggi di dati tipizzati. Se hai bisogno di descrivere diverse versioni di un contratto, includi la versione del contratto nel nome, come in `calldata-UniswapV3Router02.json` del registro.

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

La sezione `context` associa il descrittore a una o più distribuzioni del contratto. I portafogli la utilizzano per abbinare una transazione in entrata al descrittore corretto.

```json
"context": {
  "$id": "example-swap-router",
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
- `deployments[].address` — L'indirizzo del contratto che i portafogli dovrebbero associare a questo descrittore. Questo è l'indirizzo a cui gli utenti inviano effettivamente le transazioni. Se il tuo contratto è aggiornabile, questo è l'indirizzo del proxy, non l'indirizzo dell'implementazione, mentre le firme delle funzioni in `display.formats` provengono dall'ABI dell'implementazione.

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

Questo esempio descrive `swapExactTokensForTokens` dal contratto `Router02` di Uniswap V2. Il token di input è il primo elemento di `path` e il token di output è l'ultimo (`path` può avere più di due elementi per uno swap multi-hop).

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
            "tokenPath": "#.path.[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[-1]"
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
- **`interpolatedIntent`** — **(Consigliato)** Un modello di frase più ricco che incorpora i valori dei campi formattati, come `"Swap {amountIn} for at least {amountOutMin}"`. Includilo insieme a `intent` per fornire un descrittore ancora più intuitivo che i portafogli possono scegliere di mostrare in base a eventuali vincoli di visualizzazione.
- **`fields`** — **(Obbligatorio)** L'elenco ordinato dei campi della transazione che i portafogli dovrebbero mostrare agli utenti.
  - **`path`** — **(Obbligatorio)** Un riferimento ai dati della transazione. `#.fieldName` punta a un parametro dei dati di chiamata decodificato in base al nome nell'ABI. `@.value` si riferisce al valore in ETH inviato con la transazione. Gli elementi dell'array sono scritti con un `.` prima delle parentesi: `#.path.[0]` è il primo elemento e `#.path.[-1]` l'ultimo. `#.path[0]` (senza il punto) viene rifiutato dal linter.
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

Sostituisci gli indirizzi segnaposto con gli indirizzi del tuo contratto distribuito. Il linter controlla il descrittore rispetto all'ABI verificata a quegli indirizzi, quindi segnalerà errori finché non lo farai.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "example-swap-router",
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
              "tokenPath": "#.path.[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[-1]"
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

Il [registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) è un repository aperto ospitato dalla [Fondazione Ethereum](/foundation/) in qualità di amministratore neutrale. Chiunque è libero di clonarlo e ospitarlo autonomamente — i portafogli decidono in modo indipendente di quali istanze del registro fidarsi.

1. Fai un fork del repository su GitHub
2. Crea una cartella in `registry/<your-project-name>/`
3. Posiziona il tuo file al suo interno: `registry/myproject/calldata-SwapRouter.json`
4. Aggiorna il campo `$schema` al percorso relativo utilizzato all'interno del repository: `"../../specs/erc7730-v2.schema.json"`. La CI rifiuta un URL in questo punto.
5. Aggiungi un file di test (vedi sotto)
6. Convalida i tuoi file localmente (vedi sotto)
7. Apri una pull request. Ogni pull request può modificare solo una cartella sotto `registry/`

### Aggiungere un file di test {#add-a-test-file}

Ogni descrittore che aggiungi o modifichi necessita di un file di test, in modo che le implementazioni della firma in chiaro possano essere verificate rispetto ad esso. Crea `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` con almeno un caso di test per ogni funzione in `display.formats`. La CI deriva il selettore di funzione di ogni formato e fallisce se nessuna transazione di test lo chiama.

```json
{
  "$schema": "../../../specs/erc7730-tests-v2.schema.json",
  "descriptor": "../calldata-SwapRouter.json",
  "dataProvider": {
    "tokens": {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { "symbol": "USDC", "decimals": 6, "name": "USD Coin" },
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { "symbol": "WETH", "decimals": 18, "name": "Wrapped Ether" }
    }
  },
  "tests": [
    {
      "description": "Swap 1,000 USDC for at least 0.42 WETH",
      "rawTx": "0x02f9012f0180843b9aca00...",
      "expected": {
        "intent": "Swap",
        "interpolatedIntent": "Swap 1000 USDC for at least 0.42 WETH",
        "owner": "Example Swap Protocol",
        "fields": [
          { "label": "Send", "value": "1000 USDC" },
          { "label": "Receive minimum", "value": "0.42 WETH" },
          { "label": "Recipient", "value": "0x1234567890123456789012345678901234567890" },
          { "label": "Expires", "value": "2026-01-01 00:00:00Z" }
        ]
      }
    }
  ]
}
```

- `rawTx` è l'intera transazione **non firmata** serializzata (qui abbreviata), non solo i dati di chiamata. Le transazioni reali verso il tuo contratto sono i migliori casi di test.
- `dataProvider` fornisce i metadati del token (e facoltativamente l'indirizzo e i nomi ENS) in modo che i test non necessitino di accesso alla rete.
- `expected` è ciò che un portafoglio dovrebbe visualizzare. La CI esegue il rendering di ogni caso di test con le implementazioni della firma in chiaro e segnala eventuali differenze sulla pull request.

Consulta i [Casi di test di riferimento](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) nel README del registro per il formato completo, inclusi i file di test per i descrittori EIP-712.

### Convalidare localmente {#validate-locally}

Il registro controlla i descrittori con lo strumento a riga di comando [`erc7730`](https://github.com/sourcifyeth/python-erc7730), fissato in `.github/requirements.txt`. Eseguilo dalla radice del tuo fork, in un ambiente Python 3.12:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Se usi [uv](https://docs.astral.sh/uv/), puoi saltare l'ambiente virtuale e uv scaricherà Python 3.12 se necessario:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Il linter controlla il descrittore rispetto allo schema e rispetto all'ABI verificata del tuo contratto. Correggi ogni errore. Avvisi come `Missing display format` significano che il contratto ha funzioni che il tuo descrittore non descrive ancora. Per controllare anche i percorsi `$schema` e il file di test nel modo in cui lo fa la CI, consulta [Come convalidare](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) nel README del registro.

Quando apri la PR, la CI esegue automaticamente la convalida dello schema, controlla che le firme delle funzioni producano selettori validi, conferma che l'indirizzo del contratto sia verificato su Sourcify e segnala le incongruenze dell'ABI. I risultati del controllo appaiono in linea sulla PR. I manutentori del registro esaminano gli invii per individuare descrittori malformati o potenzialmente dannosi. L'inclusione nel registro non implica un audit o un'approvazione.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Nota:** Il tuo contratto deve essere verificato su <a href="https://repo.sourcify.dev">Sourcify</a> prima che la tua PR possa essere accettata. Se non è ancora verificato, <a href="https://verify.sourcify.dev/">invia la verifica</a> prima.
</AlertDescription>
</AlertContent>
</Alert>

## Cosa succede dopo l'unione (merge)? {#what-happens-after-merging}

Tutti i descrittori nel registro sono aperti ai revisori. Dopo che la tua PR è stata unita, qualsiasi revisore può esaminare il tuo descrittore e pubblicare un'attestazione crittografica (ai sensi dell'[ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)) confermandone l'accuratezza. 

Questi segnali di attestazione consentono ai portafogli di applicare le proprie politiche di fiducia: un descrittore con più attestazioni indipendenti ha più peso di uno che ne è privo. Puoi raggiungere la community dei revisori tramite [clearsigning.org](https://clearsigning.org).

I portafogli scelgono quale registro supportare. Una volta che il tuo descrittore è nel registro, i portafogli che supportano l'ERC-7730 inizieranno a recuperarlo se è presente nel loro registro e mostreranno dati leggibili dall'uomo quando gli utenti interagiscono con il tuo contratto.

## Letture consigliate {#further-reading}

- [Specifica ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — strumenti, stato dell'ecosistema e governance  
- [Verifica dei contratti su Sourcify](https://sourcify.dev)  
- [Iniziativa Trillion Dollar Security](https://trilliondollarsecurity.org)

