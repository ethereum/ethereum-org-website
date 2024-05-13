---
title: Registrar datos de contratos inteligentes con eventos
description: Una introducción eventos en contratos inteligentes y cómo pueden utilizarse para registrar datos.
author: "jdourlens"
tags:
  - "contratos inteligentes"
  - "remix"
  - "solidity"
  - "eventos"
skill: intermediate
lang: es
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En Solidity, los contratos inteligentes pueden envíar [eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs). Las DApps o cualquier aplicación conectada a la API JSON-RPC de Ethereum, puede escuchar estos eventos y obrar según corresponda. El evento también puede indexarse, para que el historial de eventos se pueda buscar más adelante.

## Events {#events}

El evento más común en la cadena de bloques de Ethereum en el cierre de redacción de este artículo es el evento de transferencia que emiten los tókenes ERC20 cuando alguien transfiere tókenes.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

La firma del evento se declara dentro del código del contrato y se puede emitir con la palabra clave emitida. Por ejemplo, el evento de transferencia registra quién envió la transferencia (_de_), a quién (_para_) y cuántos tókenes se transfirieron (_valor_).

Si regresamos a nuestro programa contador del contrato inteligente y decidimos registrar el valor cada vez que cambie. Dado que este contrato no pretende ejecutarse, sino que sirve de base para construir otro contrato ampliándolo, se le llama contrato abstracto. En el caso de nuestro ejemplo de contador, sería de la manera siguiente:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Private variable of type unsigned int to keep the number of counts
    uint256 private count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Tenga en cuenta que:

- **Línea 5**: declaramos nuestro evento y su contenido, el valor antiguo y el nuevo.

- **Línea 13**: cuando incrementamos nuestra variable de conteo, emitimos el evento.

Si ahora desplegamos el contrato y seleccionamos la función de incremento, veremos que Remix lo mostrará automáticamente, si hace clic en la nueva transacción dentro de los registros con nombre.

![Captura de pantalla de Remix](./remix-screenshot.png)

Los registros son realmente útiles a la hora de depurar sus contratos inteligentes, pero también son importantes si construye aplicaciones utilizadas por diferentes personas. También facilitan los análisis para averiguar y entender cómo se utiliza su contrato inteligente. Los registros generados por transacciones se muestran en exploradores de bloques populares y también puede utilizarlos, por ejemplo, para crear scripts fuera de la cadena para escuchar eventos específicos y emprender acciones cuando ocurran.
