---
title: Registrar datos de contratos inteligentes con eventos
description: "Una introducción a los eventos de contratos inteligentes y cómo puede usarlos para registrar datos"
author: "jdourlens"
tags:
  [
    "contratos Inteligentes",
    "remix",
    "Solidity",
    "eventos"
  ]
skill: intermediate
lang: es
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En Solidity, los [eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs) son señales que los contratos inteligentes pueden emitir. Las dapps, o cualquier elemento conectado a la API JSON-RPC de Ethereum, pueden escuchar estos eventos y actuar en consecuencia. Un evento también se puede indexar para que el historial de eventos se pueda buscar más adelante.

## Eventos {#events}

El evento más común en la blockchain de Ethereum en el momento de escribir este artículo es el evento Transfer que emiten los tokens ERC20 cuando alguien transfiere tokens.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La firma del evento se declara dentro del código del contrato y se puede emitir con la palabra clave `emit`. Por ejemplo, el evento de transferencia registra quién envió la transferencia (_from_), a quién (_to_) y cuántos tokens se transfirieron (_value_).

Si volvemos a nuestro contrato inteligente Counter y decidimos registrar cada vez que se cambia el valor. Como este contrato no está destinado a ser desplegado, sino a servir de base para construir otro contrato extendiéndolo, se le llama contrato abstracto. En el caso de nuestro ejemplo de contador, se vería así:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variable privada de tipo entero sin signo para mantener el número de cuentas
    uint256 private count = 0;

    // Función que incrementa nuestro contador
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter para obtener el valor del contador
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Tenga en cuenta que:

- **Línea 5**: declaramos nuestro evento y lo que contiene: el valor antiguo y el valor nuevo.

- **Línea 13**: cuando incrementamos nuestra variable de conteo, emitimos el evento.

Si ahora desplegamos el contrato y llamamos a la función de incremento, veremos que Remix lo mostrará automáticamente si hace clic en la nueva transacción dentro de un array llamado logs.

![Captura de pantalla de Remix](./remix-screenshot.png)

Los logs son muy útiles para depurar sus contratos inteligentes, pero también son importantes si crea aplicaciones para distintas personas, ya que facilitan el análisis para rastrear y comprender cómo se utiliza su contrato inteligente. Los logs generados por las transacciones se muestran en los exploradores de bloques populares y también puede, por ejemplo, utilizarlos para crear scripts fuera de la cadena para escuchar eventos específicos y emprender acciones cuando ocurran.
