---
title: Añade la firma clara a tu protocolo con ERC-7730
description: Aprende a escribir un descriptor ERC-7730 para que las interacciones de tu contrato inteligente muestren detalles legibles por humanos en las billeteras antes de que los usuarios firmen.
author: Hester Bruikman
lang: es
tags: ["ERC-7730", "seguridad", "firma", "contratos inteligentes", "billeteras"]
skill: intermediate
breadcrumb: Firma clara
published: 2026-05-11
---

La mayoría de los principales exploits de Ethereum tuvieron el mismo paso final: un usuario aprobando una transacción que no podía entender de manera significativa. Las billeteras de hardware muestran los datos de llamada (calldata) en formato hexadecimal sin procesar y, lo que es peor, te obligan a tener activada la firma a ciegas. Las billeteras de software muestran campos decodificados, pero solo cuando reconocen el contrato. Cuando no lo hacen, ya sea porque el protocolo es nuevo, la aplicación está comprometida o el dispositivo está desconectado, los usuarios firman a ciegas.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) define un formato JSON estándar para describir lo que *significan* las llamadas a funciones de tu contrato. 

Una billetera que soporta ERC-7730 lee tu descriptor y muestra:

> **Intercambio**  
> Enviar: 1,000 USDC  
> Recibir mínimo: 0.42 WETH  
> Protocolo: Uniswap V3

O una sola oración construida que sea legible tanto por humanos como por agentes:

> Intercambiar 1,000 USDC por al menos 0.42 WETH

En lugar de un selector de función y una lista de valores enteros sin procesar.

Esto es la [firma clara](https://clearsigning.org/): «Lo que ves es lo que firmas». Este tutorial te guía a través de la redacción de un descriptor para tu propio contrato, su validación con la herramienta CLI oficial y su envío al registro abierto.

## Requisitos previos {#prerequisites}

- Familiaridad con Solidity y las ABI de contratos inteligentes
- Un contrato inteligente desplegado con una ABI verificada (se requiere la verificación de [Sourcify](https://sourcify.dev) antes de que se acepte un descriptor en el registro) 
- Python 3.12+ para la CLI de validación 
- Conocimientos básicos de JSON

## ¿Qué es un descriptor ERC-7730? {#what-is-an-erc-7730-descriptor}

Un descriptor es un único archivo JSON con tres secciones:

| Sección | Propósito |
| :---- | :---- |
| `context` | Vincula el descriptor a despliegues de contratos específicos por ID de cadena y dirección |
| `metadata` | Nombra el proyecto y define constantes reutilizables |
| `display` | Asigna cada firma de función a etiquetas legibles por humanos y formatos de campo |

Debido a que el descriptor está separado del contrato en sí, puedes añadir soporte de firma clara a cualquier protocolo existente sin necesidad de un nuevo despliegue. Las billeteras recuperan los descriptores del registro y los utilizan en el momento de la firma.

## Paso 1: Crear el esqueleto del archivo {#step-1-create-the-file-skeleton}

Crea un archivo llamado `calldata-<contractname>-<descriptorversion>.json`. El prefijo `calldata-` le indica al registro que este descriptor cubre llamadas a funciones de contratos, a diferencia de `eip712-` para mensajes de datos tipados. El `descriptorversion` le indica al registro la versión del archivo descriptor, 0 por defecto si no se proporciona ninguna versión.


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

## Paso 2: Escribir la sección de contexto {#step-2-write-the-context-section}

La sección `context` vincula el descriptor a uno o más despliegues de contratos. Las billeteras utilizan esto para hacer coincidir una transacción entrante con el descriptor correcto.

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

- `context.$id` — Un identificador único para este documento descriptor o configuración de despliegue.
- `contract.deployments` — El conjunto de despliegues a los que se aplica este descriptor.
- `deployments[].chainId` — El ID de la cadena EVM para un despliegue. Incluye cada cadena donde esté desplegado tu contrato.
- `deployments[].address` — La dirección del contrato que las billeteras deben asociar con este descriptor. Utiliza la dirección de implementación que contiene la lógica de ejecución.

## Paso 3: Escribir la sección de metadatos {#step-3-write-the-metadata-section}

La sección de metadatos proporciona información legible por humanos sobre el proyecto y el contrato descritos en este archivo. Las billeteras pueden utilizar esta información para mostrar nombres de protocolos, enlaces y otros detalles contextuales durante la firma.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Campos de metadatos {#metadata-fields}

- `owner` — El proyecto, protocolo, organización o mantenedor responsable de este descriptor.
- `info.url` — Una URL canónica del proyecto o de la documentación que las billeteras pueden mostrar a los usuarios para obtener contexto adicional.
- `contractName` — El nombre del contrato o de la implementación descrito por este archivo, que normalmente coincide con el código fuente verificado o la ABI.

Si tu archivo ERC-7730 describe un contrato ERC-20, también deberías añadir un objeto de token. 

## Paso 4: Escribir la sección de formatos de visualización {#step-4-write-the-displayformats-section}

El objeto `display.formats` asigna firmas de funciones a instrucciones de firma legibles por humanos. ¡Así es como las billeteras muestran tu función a los usuarios antes de que aprueben una transacción!

Cada clave es un fragmento de ABI legible por humanos: la firma de la función que incluye tanto los nombres de los parámetros como los tipos de parámetros exactamente como aparecen en tu ABI.


### Ejemplo: Describir un intercambio de tokens {#eg-describing-token-swap}

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

### Campos de visualización {#display-fields}

- **`intent`** — **(Requerido)** Una descripción breve y fácil de usar de la acción, como «Intercambio».
- **`interpolatedIntent`** — **(Recomendado)** Una plantilla de oración más rica que incrusta valores de campo formateados, como `"Swap {amountIn} for at least {amountOutMin}"`. Incluye esto junto con `intent` para proporcionar un descriptor aún más fácil de usar que las billeteras pueden elegir mostrar dadas las restricciones de visualización.
- **`fields`** — **(Requerido)** La lista ordenada de campos de transacción que las billeteras deben mostrar a los usuarios.
  - **`path`** — **(Requerido)** Una referencia a los datos de la transacción. `#.fieldName` apunta a un parámetro de datos de llamada (calldata) decodificado por el nombre en la ABI. `@.value` se refiere al valor de ETH enviado con la transacción.
  - **`label`** — **(Requerido)** La etiqueta legible por humanos que se muestra junto al valor.
  - **`format`** — **(Recomendado)** Controla cómo se debe renderizar el valor. Los formatos comunes incluyen:
    - `tokenAmount`
    - `addressName`
    - `date`

    Usa `raw` cuando no se necesite formato adicional. Algunos formatos aceptan configuración adicional de **`params`**. Por ejemplo:

    - `tokenAmount` puede usar `tokenPath` para identificar qué dirección de token proporciona los metadatos de decimales y el símbolo (ticker).
    - `date` puede usar `encoding` para describir cómo está codificada la marca de tiempo.

    Si el formato seleccionado no requiere información adicional, omite `params`.

## El descriptor completo {#the-complete-descriptor}

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

## Paso 5: Enviar al registro {#step-5-submit-to-the-registry}

El [registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) es un repositorio abierto alojado por la [Fundación Ethereum](/foundation/) como administrador neutral. Cualquiera es libre de clonarlo y autoalojarlo: las billeteras deciden de forma independiente en qué instancias del registro confían.

1. Haz una bifurcación (fork) del repositorio en GitHub  
2. Crea una carpeta en `registry/<your-project-name>/`  
3. Coloca tu archivo dentro de ella: `registry/myproject/calldata-mycontract-0_0.json`  
4. Actualiza el campo `$schema` a la ruta relativa utilizada dentro del repositorio: `"../../specs/erc7730-v2.schema.json"`  
5. Abre un pull request

Cuando abres el PR, la integración continua (CI) ejecuta automáticamente la validación del esquema, comprueba que las firmas de las funciones producen selectores válidos, confirma que la dirección del contrato está verificada en Sourcify y señala las inconsistencias de la ABI. Los resultados de la comprobación aparecen en línea en el PR. Los mantenedores del registro revisan los envíos en busca de descriptores malformados o potencialmente maliciosos. La inclusión en el registro no implica auditoría ni respaldo.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Nota:** Tu contrato debe estar verificado en <a href="https://repo.sourcify.dev">Sourcify</a> antes de que se pueda aceptar tu PR. Si aún no está verificado, <a href="https://verify.sourcify.dev/">envía la verificación</a> primero.
</AlertDescription>
</AlertContent>
</Alert>

## ¿Qué sucede después de la fusión (merge)? {#what-happens-after-merging}

Todos los descriptores en el registro están abiertos a los auditores. Después de que se fusione tu PR, cualquier auditor puede revisar tu descriptor y publicar una atestación criptográfica (bajo [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)) confirmando su precisión. 

Estas señales de atestación permiten a las billeteras aplicar sus propias políticas de confianza: un descriptor con múltiples atestaciones independientes tiene más peso que uno sin ellas. Puedes comunicarte con la comunidad de auditores a través de [clearsigning.org](https://clearsigning.org).

Las billeteras eligen qué registro soportarán. Una vez que tu descriptor esté en el registro, las billeteras que soportan ERC-7730 comenzarán a obtenerlo si está en su registro y mostrarán datos legibles por humanos cuando los usuarios interactúen con tu contrato.

## Lecturas adicionales {#further-reading}

- [Especificación ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — herramientas, estado del ecosistema y gobernanza  
- [Verificación de contratos en Sourcify](https://sourcify.dev)  
- [Iniciativa Trillion Dollar Security](https://trilliondollarsecurity.org)