---
title: Registro de datos de contratos inteligentes con eventos
description: "Una introducción a los eventos de los contratos inteligentes y cómo puede usarlos para registrar datos"
author: "jdourlens"
tags: ["contratos inteligentes", "Remix", "Solidity", "eventos"]
skill: intermediate
breadcrumb: Registro de eventos
lang: es
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En Solidity, los [eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs) son señales emitidas que los contratos inteligentes pueden disparar. Las aplicaciones descentralizadas (dapp), o cualquier cosa conectada a la API JSON-RPC de Ethereum, pueden escuchar estos eventos y actuar en consecuencia. Un evento también puede ser indexado para que el historial de eventos se pueda buscar más tarde.

## Eventos {#events}

El evento más común en la cadena de bloques de Ethereum al momento de escribir este artículo es el evento Transfer que emiten los tokens ERC-20 cuando alguien transfiere tokens.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La firma del evento se declara dentro del código del contrato y se puede emitir con la palabra clave emit. Por ejemplo, el evento de transferencia registra quién envió la transferencia (_from_), a quién (_to_) y cuántos tokens se transfirieron (_value_).

Si volvemos a nuestro contrato inteligente Counter y decidimos registrar cada vez que se cambia el valor. Como este contrato no está destinado a ser desplegado, sino a servir como base para construir otro contrato al extenderlo: se le llama contrato abstracto. En el caso de nuestro ejemplo de contador, se vería así:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variable privada de tipo unsigned int para mantener el número de conteos
    uint256 private count = 0;

    // Función que incrementa nuestro contador
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter para obtener el valor del conteo
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Observe que:

- **Línea 5**: declaramos nuestro evento y lo que contiene, el valor antiguo y el valor nuevo.

- **Línea 13**: Cuando incrementamos nuestra variable de conteo, emitimos el evento.

Si ahora desplegamos el contrato y llamamos a la función de incremento, veremos que Remix lo mostrará automáticamente si hace clic en la nueva transacción dentro de una matriz llamada logs.

![Remix screenshot](./remix-screenshot.png)

Los registros son realmente útiles para depurar sus contratos inteligentes, pero también son importantes si construye aplicaciones utilizadas por diferentes personas y facilitan la realización de análisis para rastrear y comprender cómo se utiliza su contrato inteligente. Los registros generados por las transacciones se muestran en los exploradores de bloques populares y también puede, por ejemplo, usarlos para crear scripts fuera de la cadena para escuchar eventos específicos y tomar medidas cuando ocurran.