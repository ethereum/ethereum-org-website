---
title: Arquitectura del nodo
description: Introducción al proceso de organización de los nodos de Ethereum.
lang: es
---

Un nodo de Ethereum se compone de dos clientes: un [cliente de ejecución](/developers/docs/nodes-and-clients/#execution-clients) y un [cliente de consenso](/developers/docs/nodes-and-clients/#consensus-clients).

Cuando Ethereum utilizaba la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/), con un cliente de ejecución era suficiente para ejecutar un nodo de Ethereum completo. Sin embargo, desde que se implementa la [prueba de participación](/developers/docs/consensus-mechanisms/pow/), el cliente de ejecución debe utilizarse junto con otra pieza de software denominada [«cliente de consenso»](/developers/docs/nodes-and-clients/#consensus-clients).

El siguiente diagrama muestra la relación entre los dos clientes Ethereum. Los dos clientes se conectan a sus respectivas redes entre pares (P2P). Se necesitan redes P2P separadas, ya que los clientes de ejecución envían transacciones con protocolo de intercambio de información (o Gossip) a través de su red P2P, lo que les permite administrar su reserva de transacciones local, mientras que los clientes de consenso envían por Gossip bloques de su red P2P, lo que permite el consenso y el crecimiento de la cadena.

![](node-architecture-text-background.png)

Para que esta estructura de dos clientes funcione, los clientes de consenso deben poder pasar grupos de transacciones al cliente de ejecución. Para comprobar y validar que las transacciones no infringen ninguna norma de Ethereum y que la actualización propuesta del estado de Ethereum es correcta, el cliente ejecuta las transacciones localmente. Asimismo, cuando se selecciona el nodo para producir bloques, el cliente de consenso debe poder solicitar a Geth grupos de transacciones para incluirlos en el nuevo bloque y ejecutarlos para actualizar el estado global. Esta comunicación entre clientes se gestiona mediante una conexión RPC local que utiliza la [ Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## ¿Qué hace el cliente de ejecución? {#execution-client}

El cliente de ejecución es responsable de la gestión de transacciones, el protocolo de intercambio de información de transacciones, la gestión de estados y el soporte de la máquina virtual de Ethereum ([EVM](/developers/docs/evm/)). Sin embargo, **no** es responsable de la construcción de bloques, del intercambio de información entre bloques o del manejo de la lógica de consenso. Son competencia del cliente de consenso.

El cliente de ejecución crea cargas útiles de ejecución: la lista de transacciones, el trie de estado actualizado y otros datos relacionados con la ejecución. Los clientes de consenso incluyen la carga útil de ejecución en cada bloque. El cliente de ejecución también es responsable de volver a ejecutar las transacciones en nuevos bloques para asegurarse de que son válidas. La ejecución de las transacciones se realiza en el ordenador integrado del cliente de ejecución, conocido como la [máquina virtual Ethereum (o EVM)](/developers/docs/evm).

El cliente de ejecución también ofrece una interfaz de usuario a Ethereum a través de [métodos RPC](/developers/docs/apis/json-rpc) que permiten a los usuarios consultar la cadena de bloques de Ethereum, enviar transacciones y desplegar contratos inteligentes. Es normal que las reuniones RPC las controle una biblioteca como [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), o una interfaz de usuario como la cartera de un navegador.

Resumiendo, el cliente de ejecución es:

- una puerta de acceso de los usuarios a Ethereum
- donde está la máquina virtual de Ethereum, el estado de Ethereum y el grupo de transacciones.

## ¿Qué hace el cliente de consenso? {#consensus-client}

El cliente de consenso se ocupa de toda la lógica que permite a un nodo mantenerse sincronizado con la red Ethereum. Esto incluye la recepción de bloques de pares y la ejecución de un algoritmo de elección de bifurcación para garantizar que el nodo siga siempre la cadena con mayor acumulación de certificaciones (ponderada por los saldos efectivos de los validadores). Al igual que el cliente de ejecución, los clientes de consenso tienen su propia red P2P a través de la cual comparten bloques y certificaciones.

El cliente de consenso no participa en la certificación ni en la propuesta de bloques; de ello se encarga un validador, un complemento opcional del cliente de consenso. Un cliente de consenso sin validador sólo se mantiene al día con la cabeza de la cadena, permitiendo que el nodo permanezca sincronizado. Esto permite a un usuario realizar transacciones con Ethereum utilizando su cliente de ejecución, con la seguridad de que se encuentre en la cadena correcta.

## Validadores {#validators}

Los operadores de nodos pueden añadir un validador a sus clientes de consenso depositando 32 ETH en el contrato de depósito. El cliente validador viene incluido con el cliente de consenso y puede añadirse a un nodo en cualquier momento. Los validadores se encargan de las certificaciones y las propuestas de bloques. Permiten a un nodo acumular recompensas o perder ETH mediante penalizaciones o recortes. La ejecución del software validador también hace que un nodo pueda seleccionarse para proponer un nuevo bloque.

[Más información sobre las participaciones](/staking/).

## Componentes de una comparación de nodos {#node-comparison}

| Cliente de ejecución                                               | Cliente de consenso                                                            | Validador                                      |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------- |
| Transacciones de intercambio de información a través de su red P2P | Bloques de intercambio de información y certificaciones a través de su red P2P | Propone bloques                                |
| Ejecuta/vuelve a ejecutar transacciones                            | Ejecuta el algoritmo de elección de la bifurcación                             | Acumula recompensas/penalizaciones             |
| Verifica los cambios de estado entrantes                           | Hace un seguimiento de la cabeza de la cadena                                  | Hace certificaciones                           |
| Gestiona los intentos de estado y recibos                          | Gestiona el estado de la baliza (contiene información de consenso y ejecución) | Requiere 32 ETH para iniciar una participación |
| Crea una carga útil de ejecución                                   | Realiza un seguimiento de la aleatoriedad acumulada en RANDAO                  | Se puede recortar                              |
| Expone la API JSON-RPC para interactuar con Ethereum               | Realiza un seguimiento de la justificación y la finalización                   |                                                |

## Más información {#further-reading}

- [Prueba de participación](/developers/docs/consensus-mechanisms/pos)
- [Propuesta de bloque](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Recompensas y sanciones del validador](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
