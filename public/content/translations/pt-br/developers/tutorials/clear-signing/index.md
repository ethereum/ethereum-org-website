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

A maioria das principais explorações no Ethereum teve a mesma etapa final: um usuário aprovando uma transação que não conseguia entender de forma significativa. Carteiras de hardware mostram dados de chamada hexadecimais brutos e, pior ainda, forçam você a manter a assinatura cega ativada. Carteiras de software mostram campos decodificados, mas apenas quando reconhecem o contrato. Quando não reconhecem, seja porque o protocolo é novo, o aplicativo está comprometido ou o dispositivo está offline, os usuários assinam às cegas.

O [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) define um formato JSON padrão para descrever o que as chamadas de função do seu contrato *significam*. 

Uma carteira que suporta o ERC-7730 lê o seu descritor e mostra:

> **Troca**  
> Enviar: 1.000 USDC  
> Receber mínimo: 0,42 WETH  
> Protocolo: Uniswap V2

Ou uma única frase construída, legível tanto por humanos quanto por agentes:

> Trocar 1.000 USDC por pelo menos 0,42 WETH

Em vez de um seletor de função e uma lista de valores inteiros brutos.

Isso é a [assinatura clara](https://clearsigning.org/) — "O que você vê é o que você assina" (What You See Is What You Sign). Este tutorial orienta você na escrita de um descritor para o seu próprio contrato, na validação dele com a ferramenta CLI oficial e no envio para o registro aberto.

## Pré-requisitos {#prerequisites}

- Familiaridade com Solidity e ABIs de contratos inteligentes
- Um contrato inteligente implantado com uma ABI verificada (a verificação no [Sourcify](https://sourcify.dev) é exigida antes que um descritor seja aceito no registro) 
- Python 3.12 para a CLI de validação (o pacote fixado `erc7730` não é instalado no Python 3.13 ou posterior). Se o Python do seu sistema for de uma versão diferente, o [uv](https://docs.astral.sh/uv/) pode baixar e executar o Python 3.12 para você
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

Crie um arquivo chamado `calldata-<ContractName>.json`, por exemplo `calldata-SwapRouter.json`. O prefixo `calldata-` informa ao registro que este descritor cobre chamadas de função de contrato, em oposição a `eip712-` para mensagens de dados tipados. Se você precisar descrever várias versões de um contrato, inclua a versão do contrato no nome, como no `calldata-UniswapV3Router02.json` do registro.

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
  "$id": "example-swap-router",
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
- `deployments[].chainId` — O ID da cadeia EVM para uma implantação. Inclua todas as cadeias onde seu contrato está implantado.
- `deployments[].address` — O endereço do contrato que as carteiras devem associar a este descritor. Este é o endereço para o qual os usuários realmente enviam transações. Se o seu contrato for atualizável, esse é o endereço do proxy, não o endereço da implementação, enquanto as assinaturas de função em `display.formats` vêm da ABI da implementação.

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
- `contractName` — O nome do contrato ou da implementação descrito por este arquivo, geralmente correspondendo ao código-fonte verificado ou à ABI.

Se o seu arquivo ERC-7730 descreve um contrato ERC-20, você também deve adicionar um objeto de token. 

## Passo 4: Escrever a seção de formatos de exibição {#step-4-write-the-displayformats-section}

O objeto `display.formats` mapeia assinaturas de função para instruções de assinatura legíveis por humanos. É assim que as carteiras mostram sua função aos usuários antes que eles aprovem uma transação!

Cada chave é um fragmento de ABI legível por humanos — a assinatura da função, incluindo os nomes e os tipos dos parâmetros exatamente como aparecem na sua ABI.


### Exemplo: Descrevendo uma troca de token {#eg-describing-token-swap}

Este exemplo descreve `swapExactTokensForTokens` do contrato `Router02` do Uniswap V2. O token de entrada é o primeiro elemento de `path`, e o token de saída é o último (`path` pode ter mais de dois elementos para uma troca de múltiplos saltos).

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

### Campos de exibição {#display-fields}

- **`intent`** — **(Obrigatório)** Uma descrição curta e amigável da ação, como "Troca".
- **`interpolatedIntent`** — **(Recomendado)** Um modelo de frase mais rico que incorpora valores de campo formatados, como `"Swap {amountIn} for at least {amountOutMin}"`. Inclua isso junto com `intent` para fornecer um descritor ainda mais amigável que as carteiras podem escolher mostrar, dadas quaisquer restrições de exibição.
- **`fields`** — **(Obrigatório)** A lista ordenada de campos de transação que as carteiras devem exibir aos usuários.
  - **`path`** — **(Obrigatório)** Uma referência aos dados da transação. `#.fieldName` aponta para um parâmetro de dados de chamada decodificado pelo nome na ABI. `@.value` refere-se ao valor em ETH enviado com a transação. Elementos de array são escritos com um `.` antes dos colchetes: `#.path.[0]` é o primeiro elemento e `#.path.[-1]` o último. `#.path[0]` (sem o ponto) é rejeitado pelo linter.
  - **`label`** — **(Obrigatório)** O rótulo legível por humanos mostrado ao lado do valor.
  - **`format`** — **(Recomendado)** Controla como o valor deve ser renderizado. Formatos comuns incluem:
    - `tokenAmount`
    - `addressName`
    - `date`

    Use `raw` quando nenhuma formatação adicional for necessária. Alguns formatos aceitam configuração adicional de **`params`**. Por exemplo:

    - `tokenAmount` pode usar `tokenPath` para identificar qual endereço de token fornece metadados de decimais e símbolo (ticker).
    - `date` pode usar `encoding` para descrever como o carimbo de data/hora (timestamp) é codificado.

    Se o formato selecionado não exigir informações extras, omita `params`.

## O descritor completo {#the-complete-descriptor}

Substitua os endereços de espaço reservado pelos endereços do seu contrato implantado. O linter verifica o descritor em relação à ABI verificada nesses endereços, portanto, ele relatará erros até que você faça isso.

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

## Passo 5: Enviar para o registro {#step-5-submit-to-the-registry}

O [registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) é um repositório aberto hospedado pela [Fundação Ethereum](/foundation/) como uma administradora neutra. Qualquer pessoa é livre para cloná-lo e hospedá-lo por conta própria — as carteiras decidem de forma independente em quais instâncias de registro confiam.

1. Faça uma bifurcação (fork) do repositório no GitHub
2. Crie uma pasta em `registry/<your-project-name>/`
3. Coloque seu arquivo dentro dela: `registry/myproject/calldata-SwapRouter.json`
4. Atualize o campo `$schema` para o caminho relativo usado dentro do repositório: `"../../specs/erc7730-v2.schema.json"`. A CI rejeita uma URL aqui.
5. Adicione um arquivo de teste (veja abaixo)
6. Valide seus arquivos localmente (veja abaixo)
7. Abra um pull request. Cada pull request pode alterar apenas uma pasta em `registry/`

### Adicionar um arquivo de teste {#add-a-test-file}

Todo descritor que você adicionar ou alterar precisa de um arquivo de teste, para que as implementações de assinatura clara possam ser verificadas em relação a ele. Crie `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` com pelo menos um caso de teste para cada função em `display.formats`. A CI deriva o seletor de função de cada formato e falha se nenhuma transação de teste o chamar.

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

- `rawTx` é a transação **não assinada** serializada completa (encurtada aqui), não apenas os dados de chamada. Transações reais para o seu contrato são os melhores casos de teste.
- `dataProvider` fornece os metadados do token (e opcionalmente endereços e nomes ENS) para que os testes não precisem de acesso à rede.
- `expected` é o que uma carteira deve exibir. A CI renderiza cada caso de teste com as implementações de assinatura clara e relata quaisquer diferenças no pull request.

Consulte [Casos de teste de referência](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) no README do registro para o formato completo, incluindo arquivos de teste para descritores EIP-712.

### Validar localmente {#validate-locally}

O registro verifica os descritores com a ferramenta de linha de comando [`erc7730`](https://github.com/sourcifyeth/python-erc7730), fixada em `.github/requirements.txt`. Execute-a a partir da raiz da sua bifurcação, em um ambiente Python 3.12:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Se você usar o [uv](https://docs.astral.sh/uv/), pode pular o ambiente virtual, e o uv baixa o Python 3.12 se necessário:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

O linter verifica o descritor em relação ao esquema e à ABI verificada do seu contrato. Corrija todos os erros. Avisos como `Missing display format` significam que o contrato tem funções que seu descritor ainda não descreve. Para verificar também os caminhos de `$schema` e o arquivo de teste da mesma forma que a CI faz, consulte [Como validar](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) no README do registro.

Quando você abre o PR, a CI executa automaticamente a validação do esquema, verifica se as assinaturas de função produzem seletores válidos, confirma se o endereço do contrato está verificado no Sourcify e sinaliza inconsistências na ABI. Os resultados da verificação aparecem em linha no PR. Os mantenedores do registro analisam os envios em busca de descritores malformados ou potencialmente maliciosos. A inclusão no registro não implica auditoria ou endosso.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Nota:** Seu contrato deve ser verificado no <a href="https://repo.sourcify.dev">Sourcify</a> antes que seu PR possa ser aceito. Se ainda não estiver verificado, <a href="https://verify.sourcify.dev/">envie a verificação</a> primeiro.
</AlertDescription>
</AlertContent>
</Alert>

## O que acontece após a mesclagem? {#what-happens-after-merging}

Todos os descritores no registro estão abertos a auditores. Após a mesclagem do seu PR, qualquer auditor pode revisar seu descritor e publicar uma atestação criptográfica (sob o [ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)) confirmando sua precisão. 

Esses sinais de atestação permitem que as carteiras apliquem suas próprias políticas de confiança — um descritor com várias atestações independentes tem mais peso do que um sem nenhuma. Você pode entrar em contato com a comunidade de auditores através do [clearsigning.org](https://clearsigning.org).

As carteiras escolhem qual registro irão suportar. Assim que seu descritor estiver no registro, as carteiras que suportam o ERC-7730 começarão a buscá-lo, caso esteja em seu registro, e exibirão dados legíveis por humanos quando os usuários interagirem com seu contrato.

## Leitura adicional {#further-reading}

- [Especificação do ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — ferramentas, status do ecossistema e governança  
- [Verificação de contrato no Sourcify](https://sourcify.dev)  
- [Iniciativa Trillion Dollar Security](https://trilliondollarsecurity.org)

