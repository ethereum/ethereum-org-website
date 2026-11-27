---
title: Registro de datos de contratos inteligentes con eventos
description: "Una introducción a los eventos de los contratos inteligentes y cómo puede usarlos para registrar datos"
author: "jdourlens"
tags: ["contratos inteligentes", "Remix", "Solidity", "eventos"]
skill: intermediate
breadcrumb: Registro de eventos
lang: es
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En Solidity, los [eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs) son señales emitidas que los contratos inteligentes pueden disparar. Las aplicaciones descentralizadas (dapp), o cualquier cosa conectada a la API JSON-RPC de Ethereum, pueden escuchar estos eventos y actuar en consecuencia. Un evento también puede ser indexado para que el historial de eventos se pueda buscar más tarde.

## Eventos {#events}

Uno de los eventos más comunes en la cadena de bloques de Ethereum es el evento `Transfer` que emiten los tokens ERC-20 cuando alguien transfiere tokens.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La firma del evento se declara dentro del código del contrato y se puede emitir con la palabra clave emit. Por ejemplo, el evento transfer registra quién envió la transferencia (_from_), a quién (_to_) y cuántos tokens se transfirieron (_value_).

Volvamos al contrato inteligente `Counter` de [desplegar tu primer contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) y registremos cada vez que cambie el valor. Se vería así:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Variable pública de tipo unsigned int para mantener el número de conteos
    uint256 public count = 0;

    // Función que incrementa nuestro contador
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter innecesario para obtener el valor del conteo
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Observa que:

- **Línea 6**: declaramos nuestro evento y lo que contiene, el valor antiguo y el valor nuevo.

- **Línea 14**: Cuando incrementamos nuestra variable count, emitimos el evento.

Si ahora desplegamos el contrato y llamamos a la función increment, veremos que Remix lo mostrará automáticamente si haces clic en la nueva transacción dentro de un arreglo llamado logs.

![Captura de pantalla de Remix](./remix-screenshot.png)

Los registros son realmente útiles para depurar tus contratos inteligentes, pero también son importantes si construyes aplicaciones utilizadas por diferentes personas y facilitan la realización de análisis para rastrear y comprender cómo se utiliza tu contrato inteligente. Los registros generados por las transacciones se muestran en exploradores de bloques populares y también puedes, por ejemplo, usarlos para crear scripts fuera de la cadena para escuchar eventos específicos y tomar medidas cuando ocurran.
