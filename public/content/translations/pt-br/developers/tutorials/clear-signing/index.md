---
title: Adicione assinatura clara ao seu protocolo com o ERC-7730
description: "Aprenda a escrever um descritor ERC-7730 para que as interações do seu contrato inteligente exibam detalhes legíveis por humanos nas carteiras antes que os usuários assinem."
author: Hester Bruikman
lang: pt-br
tags: ["ERC-7730", "segurança", "assinatura", "contratos inteligentes", "carteiras"]
skill: intermediate
breadcrumb: Assinatura clara
published: 2026-05-11
---

A maioria das grandes explorações no Ethereum teve a mesma etapa final: um usuário aprovando uma transação que não conseguia entender de forma significativa. Carteiras de hardware mostram dados de chamada (calldata) em formato hexadecimal bruto e, pior ainda, forçam você a manter a assinatura cega ativada. Carteiras de software mostram campos decodificados, mas apenas quando reconhecem o contrato. Quando não reconhecem, seja porque o protocolo é novo, o aplicativo está comprometido ou o dispositivo está offline, os usuários assinam às cegas.

O [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) define um formato JSON padrão para descrever o que as chamadas de função do seu contrato *significam*. 

Uma carteira que suporta o ERC-7730 lê o seu descritor e mostra:

> **Swap**  
> Enviar: 1.000 USDC  
> Receber no mínimo: 0,42 WETH  
> Protocolo: Uniswap V3

Ou uma única frase construída, legível tanto por humanos quanto por agentes:

> Trocar 1.000 USDC por pelo menos 0,42 WETH

Em vez de um seletor de função e uma lista de valores inteiros brutos.

Isso é a [assinatura clara](https://clearsigning.org/) — "O que você vê é o que você assina" (What You See Is What You Sign). Este tutorial orienta você na escrita de um descritor para o seu próprio contrato, na validação dele com a ferramenta CLI oficial e no envio para o registro aberto.

## Pré-requisitos {#prerequisites}

- Familiaridade com Solidity e ABIs de contratos inteligentes
- Um contrato inteligente implantado com uma ABI verificada (a verificação no [Sourcify](https://sourcify.dev) é exigida antes que um descritor seja aceito no registro) 
- Python 3.12+ para a CLI de validação 
- Conhecimento básico de JSON

## O que é um descritor ERC-7730? {#what-is-an-erc-7730-descriptor}

Um descritor é um único arquivo JSON com três seções:

| Seção | Propósito |
| :---- | :---- |
| `context` | Vincula o descritor a implantações de contratos específicos por ID da cadeia (chain ID) e endereço |
| `metadata` | Nomeia o projeto e define constantes reutilizáveis |
| `display` | Mapeia cada assinatura de função para rótulos legíveis por humanos e formatos de campo |

Como o descritor é separado do próprio contrato, você pode adicionar suporte à assinatura clara a qualquer protocolo existente sem precisar de uma nova implantação. As carteiras recuperam os descritores do registro e os utilizam no momento da assinatura.

## Passo 1: Criar o esqueleto do arquivo {#step-1-create-the-file-skeleton}

Crie um arquivo chamado `calldata-<contractname>-<descriptorversion>.json`. O prefixo `calldata-` informa ao registro que este descritor cobre chamadas de função de contrato, em oposição a `eip712-` para mensagens de dados tipados. O `descriptorversion` informa ao registro a versão do arquivo do descritor, sendo 0 por padrão se nenhuma versão for fornecida.


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

## Passo 2: Escrever a seção de contexto {#step-2-write-the-context-section}

A seção `context` vincula o descritor a uma ou mais implantações de contrato. As carteiras usam isso para corresponder uma transação recebida ao descritor correto.

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

### Campos de contexto {#context-fields}

- `context.$id` — Um identificador exclusivo para este documento descritor ou configuração de implantação.
- `contract.deployments` — O conjunto de implantações ao qual este descritor se aplica.
- `deployments[].chainId` — O ID da cadeia (chain ID) EVM para uma implantação. Inclua todas as cadeias onde seu contrato está implantado.
- `deployments[].address` — O endereço do contrato que as carteiras devem associar a este descritor. Use o endereço de implantação que contém a lógica de execução.

## Passo 3: Escrever a seção de metadados {#step-3-write-the-metadata-section}

A seção de metadados fornece informações legíveis por humanos sobre o projeto e o contrato descritos por este arquivo. As carteiras podem usar essas informações para exibir nomes de protocolos, links e outros detalhes contextuais durante a assinatura.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Campos de metadados {#metadata-fields}

- `owner` — O projeto, protocolo, organização ou mantenedor responsável por este descritor.
- `info.url` — Uma URL canônica do projeto ou da documentação que as carteiras podem exibir aos usuários para contexto adicional.
- `contractName` — O nome do contrato ou da implantação descrito por este arquivo, geralmente correspondendo ao código-fonte verificado ou à ABI.

Se o seu arquivo ERC-7730 descreve um contrato ERC-20, você também deve adicionar um objeto de token. 

## Passo 4: Escrever a seção de formatos de exibição {#step-4-write-the-displayformats-section}

O objeto `display.formats` mapeia assinaturas de função para instruções de assinatura legíveis por humanos. É assim que as carteiras mostram sua função aos usuários antes que eles aprovem uma transação!

Cada chave é um fragmento de ABI legível por humanos — a assinatura da função, incluindo os nomes e os tipos dos parâmetros exatamente como aparecem na sua ABI.


### Exemplo: Descrevendo um swap de token {#eg-describing-token-swap}

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

### Campos de exibição {#display-fields}

- **`intent`** — **(Obrigatório)** Uma descrição curta e amigável da ação, como "Swap".
- **`interpolatedIntent`** — **(Recomendado)** Um modelo de frase mais rico que incorpora valores de campo formatados, como `"Swap {amountIn} for at least {amountOutMin}"`. Inclua isso junto com `intent` para fornecer um descritor ainda mais amigável que as carteiras podem escolher exibir, dadas quaisquer restrições de exibição.
- **`fields`** — **(Obrigatório)** A lista ordenada de campos de transação que as carteiras devem exibir aos usuários.
  - **`path`** — **(Obrigatório)** Uma referência aos dados da transação. `#.fieldName` aponta para um parâmetro de dados de chamada (calldata) decodificado pelo nome na ABI. `@.value` refere-se ao valor em ETH enviado com a transação.
  - **`label`** — **(Obrigatório)** O rótulo legível por humanos mostrado ao lado do valor.
  - **`format`** — **(Recomendado)** Controla como o valor deve ser renderizado. Formatos comuns incluem:
    - `tokenAmount`
    - `addressName`
    - `date`

    Use `raw` quando nenhuma formatação adicional for necessária. Alguns formatos aceitam configurações adicionais em **`params`**. Por exemplo:

    - `tokenAmount` pode usar `tokenPath` para identificar qual endereço de token fornece os metadados de decimais e ticker.
    - `date` pode usar `encoding` para descrever como o carimbo de data/hora (timestamp) é codificado.

    Se o formato selecionado não exigir informações extras, omita `params`.

## O descritor completo {#the-complete-descriptor}

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

## Passo 5: Enviar para o registro {#step-5-submit-to-the-registry}

O [registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) é um repositório aberto hospedado pela [Fundação Ethereum](/foundation/) como uma administradora neutra. Qualquer pessoa é livre para cloná-lo e hospedá-lo por conta própria — as carteiras decidem de forma independente em quais instâncias de registro confiam.

1. Faça um fork (bifurcação) do repositório no GitHub  
2. Crie uma pasta em `registry/<your-project-name>/`  
3. Coloque seu arquivo dentro dela: `registry/myproject/calldata-mycontract-0_0.json`  
4. Atualize o campo `$schema` para o caminho relativo usado dentro do repositório: `"../../specs/erc7730-v2.schema.json"`  
5. Abra um pull request

Quando você abre o PR, a CI executa automaticamente a validação do esquema, verifica se as assinaturas de função produzem seletores válidos, confirma se o endereço do contrato está verificado no Sourcify e sinaliza inconsistências na ABI. Os resultados da verificação aparecem diretamente no PR. Os mantenedores do registro analisam os envios em busca de descritores malformados ou potencialmente maliciosos. A inclusão no registro não implica auditoria ou endosso.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Nota:** Seu contrato deve ser verificado no <a href="https://repo.sourcify.dev">Sourcify</a> antes que seu PR possa ser aceito. Se ainda não estiver verificado, <a href="https://verify.sourcify.dev/">envie a verificação</a> primeiro.
</AlertDescription>
</AlertContent>
</Alert>

## O que acontece após a mesclagem? {#what-happens-after-merging}

Todos os descritores no registro estão abertos a auditores. Após a mesclagem do seu PR, qualquer auditor pode revisar seu descritor e publicar uma atestação criptográfica (sob o [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)) confirmando sua precisão. 

Esses sinais de atestação permitem que as carteiras apliquem suas próprias políticas de confiança — um descritor com várias atestações independentes tem mais peso do que um sem nenhuma. Você pode entrar em contato com a comunidade de auditores através do [clearsigning.org](https://clearsigning.org).

As carteiras escolhem qual registro irão suportar. Assim que seu descritor estiver no registro, as carteiras que suportam o ERC-7730 começarão a buscá-lo, caso esteja em seu registro, e exibirão dados legíveis por humanos quando os usuários interagirem com seu contrato.

## Leitura adicional {#further-reading}

- [Especificação do ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — ferramentas, status do ecossistema e governança  
- [Verificação de contrato no Sourcify](https://sourcify.dev)  
- [Iniciativa Trillion Dollar Security](https://trilliondollarsecurity.org)