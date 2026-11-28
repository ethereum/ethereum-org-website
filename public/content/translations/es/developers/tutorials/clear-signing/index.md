---
title: "Añade la firma clara a tu protocolo con ERC-7730"
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
> Protocolo: Uniswap V2

O una sola oración construida legible tanto por humanos como por agentes:

> Intercambiar 1,000 USDC por al menos 0.42 WETH

En lugar de un selector de función y una lista de valores enteros sin procesar.

Esto es la [firma clara](https://clearsigning.org/) (clear signing): "Lo que ves es lo que firmas". Este tutorial te guía a través de la redacción de un descriptor para tu propio contrato, su validación con la herramienta CLI oficial y su envío al registro abierto.

## Requisitos previos {#prerequisites}

- Familiaridad con Solidity y las ABI de contratos inteligentes
- Un contrato inteligente desplegado con una ABI verificada (se requiere la verificación en [Sourcify](https://sourcify.dev) antes de que se acepte un descriptor en el registro)
- Python 3.12 para la CLI de validación (el paquete fijado `erc7730` no se instala en Python 3.13 o posterior). Si el Python de tu sistema es de una versión diferente, [uv](https://docs.astral.sh/uv/) puede descargar y ejecutar Python 3.12 por ti
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

Crea un archivo llamado `calldata-<ContractName>.json`, por ejemplo `calldata-SwapRouter.json`. El prefijo `calldata-` le indica al registro que este descriptor cubre llamadas a funciones de contratos, a diferencia de `eip712-` para mensajes de datos tipados. Si necesitas describir varias versiones de un contrato, incluye la versión del contrato en el nombre, como en `calldata-UniswapV3Router02.json` del registro.

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

- `context.$id` — Un identificador único para este documento descriptor o configuración de despliegue.
- `contract.deployments` — El conjunto de despliegues a los que se aplica este descriptor.
- `deployments[].chainId` — El ID de la cadena EVM para un despliegue. Incluye cada cadena donde esté desplegado tu contrato.
- `deployments[].address` — La dirección del contrato que las billeteras deberían asociar con este descriptor. Esta es la dirección a la que los usuarios realmente envían transacciones. Si tu contrato es actualizable, esa es la dirección del proxy, no la dirección de implementación, mientras que las firmas de funciones en `display.formats` provienen de la ABI de la implementación.

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

Este ejemplo describe `swapExactTokensForTokens` del contrato `Router02` de Uniswap V2. El token de entrada es el primer elemento de `path`, y el token de salida es el último (`path` puede tener más de dos elementos para un intercambio de múltiples saltos).

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

### Campos de visualización {#display-fields}

- **`intent`** — **(Requerido)** Una descripción breve y fácil de usar de la acción, como "Intercambio".
- **`interpolatedIntent`** — **(Recomendado)** Una plantilla de oración más rica que incrusta valores de campo formateados, como `"Swap {amountIn} for at least {amountOutMin}"`. Incluye esto junto con `intent` para proporcionar un descriptor aún más amigable para el usuario que las billeteras pueden elegir mostrar según las restricciones de visualización.
- **`fields`** — **(Requerido)** La lista ordenada de campos de transacción que las billeteras deberían mostrar a los usuarios.
  - **`path`** — **(Requerido)** Una referencia a los datos de la transacción. `#.fieldName` apunta a un parámetro de datos de llamada decodificado por el nombre en la ABI. `@.value` se refiere al valor de ETH enviado con la transacción. Los elementos de matriz se escriben con un `.` antes de los corchetes: `#.path.[0]` es el primer elemento y `#.path.[-1]` el último. `#.path[0]` (sin el punto) es rechazado por el linter.
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

Reemplaza las direcciones de marcador de posición con las direcciones de tu contrato desplegado. El linter verifica el descriptor contra la ABI verificada en esas direcciones, por lo que informará errores hasta que lo hagas.

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

## Paso 5: Enviar al registro {#step-5-submit-to-the-registry}

El [registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) es un repositorio abierto alojado por la [Fundación Ethereum](/foundation/) como un administrador neutral. Cualquiera es libre de clonarlo y autoalojarlo: las billeteras deciden de forma independiente en qué instancias de registro confían.

1. Haz una bifurcación (fork) del repositorio en GitHub
2. Crea una carpeta en `registry/<your-project-name>/`
3. Coloca tu archivo dentro de ella: `registry/myproject/calldata-SwapRouter.json`
4. Actualiza el campo `$schema` a la ruta relativa utilizada dentro del repositorio: `"../../specs/erc7730-v2.schema.json"`. La CI rechaza una URL aquí.
5. Añade un archivo de prueba (ver a continuación)
6. Valida tus archivos localmente (ver a continuación)
7. Abre un pull request. Cada pull request puede cambiar solo una carpeta bajo `registry/`

### Añadir un archivo de prueba {#add-a-test-file}

Cada descriptor que añadas o cambies necesita un archivo de prueba, para que las implementaciones de firma clara puedan verificarse contra él. Crea `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` con al menos un caso de prueba para cada función en `display.formats`. La CI deriva el selector de función de cada formato y falla si ninguna transacción de prueba lo llama.

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

- `rawTx` es la transacción **no firmada** serializada completa (acortada aquí), no solo los datos de llamada. Las transacciones reales a tu contrato son los mejores casos de prueba.
- `dataProvider` proporciona los metadatos del token (y opcionalmente la dirección y los nombres de ENS) para que las pruebas no necesiten acceso a la red.
- `expected` es lo que debería mostrar una billetera. La CI renderiza cada caso de prueba con las implementaciones de firma clara e informa cualquier diferencia en el pull request.

Consulta los [Casos de prueba de referencia](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) en el README del registro para ver el formato completo, incluyendo archivos de prueba para descriptores EIP-712.

### Validar localmente {#validate-locally}

El registro verifica los descriptores con la herramienta de línea de comandos [`erc7730`](https://github.com/sourcifyeth/python-erc7730), fijada en `.github/requirements.txt`. Ejecútala desde la raíz de tu bifurcación, en un entorno de Python 3.12:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Si usas [uv](https://docs.astral.sh/uv/), puedes omitir el entorno virtual, y uv descarga Python 3.12 si es necesario:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

El linter verifica el descriptor contra el esquema y contra la ABI verificada de tu contrato. Corrige cada error. Las advertencias como `Missing display format` significan que el contrato tiene funciones que tu descriptor aún no describe. Para verificar también las rutas de `$schema` y el archivo de prueba de la misma manera que lo hace la CI, consulta [Cómo validar](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) en el README del registro.

Cuando abres el PR, la CI ejecuta automáticamente la validación del esquema, verifica que las firmas de funciones produzcan selectores válidos, confirma que la dirección del contrato esté verificada en Sourcify y señala inconsistencias en la ABI. Los resultados de la verificación aparecen en línea en el PR. Los mantenedores del registro revisan los envíos en busca de descriptores malformados o potencialmente maliciosos. La inclusión en el registro no implica auditoría ni respaldo.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Nota:** Tu contrato debe estar verificado en <a href="https://repo.sourcify.dev">Sourcify</a> antes de que tu PR pueda ser aceptado. Si aún no está verificado, <a href="https://verify.sourcify.dev/">envía la verificación</a> primero.
</AlertDescription>
</AlertContent>
</Alert>

## ¿Qué sucede después de la fusión (merge)? {#what-happens-after-merging}

Todos los descriptores en el registro están abiertos a los auditores. Después de que se fusione tu PR, cualquier auditor puede revisar tu descriptor y publicar una atestación criptográfica (bajo [ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)) confirmando su precisión. 

Estas señales de atestación permiten a las billeteras aplicar sus propias políticas de confianza: un descriptor con múltiples atestaciones independientes tiene más peso que uno sin ellas. Puedes comunicarte con la comunidad de auditores a través de [clearsigning.org](https://clearsigning.org).

Las billeteras eligen qué registro soportarán. Una vez que tu descriptor esté en el registro, las billeteras que soportan ERC-7730 comenzarán a obtenerlo si está en su registro y mostrarán datos legibles por humanos cuando los usuarios interactúen con tu contrato.

## Lecturas adicionales {#further-reading}

- [Especificación ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registro ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — herramientas, estado del ecosistema y gobernanza  
- [Verificación de contratos en Sourcify](https://sourcify.dev)  
- [Iniciativa Trillion Dollar Security](https://trilliondollarsecurity.org)

