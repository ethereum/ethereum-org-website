---
title: "Comprendiendo los estándares de tokens"
description: "Una guía sobre los estándares de tokens más comunes en Ethereum y cómo funcionan."
image: /images/tokens/token-standards-hero.png
alt: "Diagrama de estándares de tokens"
template: tutorial
lang: es
skill: intermediate
published: 2025-08-15
---

# Comprendiendo los estándares de tokens {#understanding-token-standards}

Los estándares de tokens definen cómo se comportan los activos digitales en la red de Ethereum. Proporcionan una interfaz común en la que las billeteras, los intercambios y las aplicaciones pueden confiar para interactuar con los tokens de manera predecible.

## ¿Qué son los estándares de tokens? {#what-are-token-standards}

Un estándar de tokens es un conjunto de reglas implementadas como un [contrato inteligente](/glossary/#smart-contract) que define cómo se crean, transfieren y gestionan los tokens. El estándar más adoptado es el [ERC-20](/developers/docs/standards/tokens/erc-20/), que impulsa la mayoría de los tokens fungibles en Ethereum.

_Sin estándares_, cada token necesitaría un código de integración personalizado. Las funciones `approve` y `transferFrom`, por ejemplo, permiten a los intercambios descentralizados mover tokens en su nombre después de que usted otorgue el permiso.

Puede consultar el contrato de un token en <a href="https://eth.blockscout.com/tokens">Etherscan</a> para verificar qué estándar implementa.

![Token approval flow](/images/tokens/approval-flow.png)

## Estándares comunes {#common-standards}

### ERC-20: Tokens fungibles {#erc-20}

El ERC-20 define una interfaz estándar para los **tokens fungibles**. Cada unidad es idéntica e intercambiable, de manera muy similar a cómo un billete de un dólar es igual a cualquier otro.

```solidity
// Transferencia de tokens a un destinatario
function transfer(address to, uint256 amount) public returns (bool) {
    require(balanceOf(msg.sender) >= amount, "Insufficient balance");
    _balances[msg.sender] -= amount;
    _balances[to] += amount;
    return true;
}
```

El suministro total de un token ERC-20 generalmente se fija en el despliegue. Por ejemplo, un proyecto podría crear 1.000.000 de tokens con 18 decimales, lo que significa que la unidad más pequeña es de `0.000000000000000001` tokens. En la función `translate` anterior, si el remitente tiene 100 tokens y solicita enviar 10, terminará con 90 (100 - 10 = 90) y el destinatario terminará con 10 más.

Puede desplegar tokens usando [Remix](https://remix.ethereum.org/) en [Sepolia](https://sepolia.dev/), y verificar el código fuente en [Blockscout](https://eth.blockscout.com/).

### ERC-721: Tokens no fungibles {#erc-721}

A diferencia del ERC-20, cada token ERC-721 es único. Estos se conocen comúnmente como NFT y se utilizan para representar la propiedad de artículos distintos, como obras de arte digitales, nombres de dominio o activos dentro del juego.

```md
Metadatos de ejemplo para un NFT:
- Nombre: CryptoKitty #42
- Descripción: Un coleccionable digital raro
- Imagen: ipfs://QmXyz...
```

## Costos de gas {#gas-costs}

Las transferencias de tokens requieren tarifas de gas denominadas en Gwei. Una transferencia estándar de ERC-20 cuesta aproximadamente 21.000 unidades de gas, mientras que las transferencias de ERC-721 generalmente requieren de 50.000 a 100.000 unidades de gas dependiendo de la implementación del contrato.

La tarifa base fluctúa según la demanda de la red. Cuando la red está congestionada, las tarifas pueden aumentar hasta un 12,5% por bloque.

<ExpandableCard title="Why do NFT transfers cost more?" eventCategory="/test-drift" eventName="clicked Why do NFT transfers cost more?">

Las transferencias de NFT implican operaciones de almacenamiento más complejas. Cada token tiene un ID único que debe rastrearse individualmente, y el contrato debe verificar la propiedad antes de permitir la transferencia. Este cálculo adicional requiere más gas.

Consulte la [documentación sobre el gas de Ethereum](/developers/docs/gas/) para obtener una explicación detallada.

</ExpandableCard>

<ExpandableCard title="How to reduce gas costs" eventCategory="/test-drift" eventName="clicked How to reduce gas costs">

Considere usar soluciones de capa 2 (l2) como <a href="https://optimism.io">Optimism</a> o [Arbitrum](/developers/docs/scaling/optimistic-rollups/) para reducir significativamente los costos de transacción. Estos rollup agrupan múltiples transacciones y las envían a la red principal de Ethereum como una sola transacción.

</ExpandableCard>

## Herramientas y recursos {#tools-and-resources}

<InfoBanner emoji=":books:">
  La <a href="https://docs.openzeppelin.com/contracts">biblioteca de contratos de OpenZeppelin</a> proporciona implementaciones auditadas de todos los principales estándares de tokens.
</InfoBanner>

- [Especificación del ERC-20](https://eips.ethereum.org/EIPS/eip-20) en el sitio de Propuestas de Mejora de Ethereum
- [Guía de ERC-20 de OpenZeppelin](https://docs.openzeppelin.com/contracts/erc20)
- Explorador de tokens en [Blockscout](https://eth.blockscout.com/tokens)

<YouTube id="dQw4w9WgXcQ" />

## Sección vacía para pruebas {#empty-section}

## Lecturas adicionales {#further-reading}

_Diagrama adaptado de [Estándares de tokens ilustrados](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

_Diagrama adaptado de [Estándares de tokens ilustrados](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

| Estándar | Tipo | Costo de gas | Caso de uso |
|----------|------|----------|----------|
| [ERC-20](/developers/docs/standards/tokens/erc-20/) | Fungible | ~21.000 | Monedas, tokens de utilidad |
| [ERC-721](/developers/docs/standards/tokens/erc-721/) | No fungible | ~65.000 | Arte digital, coleccionables |
| [ERC-1155](/developers/docs/standards/tokens/erc-1155/) | Multitoken | ~35.000 | Artículos de juego, activos mixtos |