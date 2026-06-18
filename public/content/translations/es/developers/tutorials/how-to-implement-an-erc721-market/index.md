---
title: Cómo implementar un mercado ERC-721
description: Cómo poner a la venta artículos tokenizados en un tablón de anuncios clasificados descentralizado
author: "Alberto Cuesta Cañada"
tags: ["contratos inteligentes", "erc-721", "solidity", "tokens"]
skill: intermediate
breadcrumb: Mercado ERC-721
lang: es
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

En este artículo, voy a mostrarte cómo programar Craigslist para la cadena de bloques de Ethereum.

Antes de Gumtree, Ebay y Craigslist, los tablones de anuncios clasificados estaban hechos principalmente de corcho o papel. Había tablones de anuncios en los pasillos de las escuelas, periódicos, farolas y escaparates.

Todo eso cambió con internet. El número de personas que podía ver un tablón de anuncios específico se multiplicó por muchos órdenes de magnitud. Con ello, los mercados que representan se volvieron mucho más eficientes y escalaron a un tamaño global. Ebay es un negocio masivo que remonta sus orígenes a estos tablones de anuncios físicos.

Con la cadena de bloques, estos mercados están a punto de cambiar una vez más; déjame mostrarte cómo.

## Monetización {#monetization}

El modelo de negocio de un tablón de anuncios clasificados en una cadena de bloques pública tendrá que ser diferente al de Ebay y compañía.

Primero, está [el enfoque de la descentralización](/developers/docs/web2-vs-web3/). Las plataformas existentes necesitan mantener sus propios servidores. Una plataforma descentralizada es mantenida por sus usuarios, por lo que el costo de ejecutar la plataforma principal se reduce a cero para el propietario de la misma.

Luego está el *front-end*, el sitio web o la interfaz que da acceso a la plataforma. Aquí hay muchas opciones. Los propietarios de la plataforma pueden restringir el acceso y obligar a todos a usar su interfaz, cobrando una tarifa. Los propietarios de la plataforma también pueden decidir abrir el acceso (¡Poder para el pueblo!) y permitir que cualquiera construya interfaces para la plataforma. O los propietarios podrían decidir cualquier enfoque intermedio entre esos extremos.

_Los líderes empresariales con más visión que yo sabrán cómo monetizar esto. Todo lo que veo es que esto es diferente del status quo y probablemente rentable._

Además, está el enfoque de la automatización y los pagos. Algunas cosas pueden ser [tokenizadas de manera muy efectiva](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) e intercambiadas en un tablón de anuncios. Los activos tokenizados se transfieren fácilmente en una cadena de bloques. Los métodos de pago altamente complejos se pueden implementar fácilmente en una cadena de bloques.

Simplemente huelo una oportunidad de negocio aquí. Un tablón de anuncios sin costos de funcionamiento se puede implementar fácilmente, con rutas de pago complejas incluidas en cada transacción. Estoy seguro de que a alguien se le ocurrirá una idea sobre para qué usar esto.

Yo me conformo con construirlo. Echemos un vistazo al código.

## Implementación {#implementation}

Hace algún tiempo comenzamos un [repositorio de código abierto](https://github.com/HQ20/contracts?ref=hackernoon.com) con implementaciones de ejemplos de casos de negocio y otras cosas interesantes, por favor échale un vistazo.

El código para este [Tablón de anuncios de Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) está ahí, por favor úsalo y abusa de él. Solo ten en cuenta que el código no ha sido auditado y necesitas hacer tu propia diligencia debida antes de invertir dinero en él.

Los conceptos básicos del tablón no son complejos. Todos los anuncios en el tablón serán solo un `struct` con unos pocos campos:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Abierto, Ejecutado, Cancelado
}
```

Así que hay alguien publicando el anuncio. Un artículo a la venta. Un precio para el artículo. El estado del intercambio que puede estar abierto, ejecutado o cancelado.

Todos estos intercambios se mantendrán en un `mapping`. Porque todo en Solidity parece ser un `mapping`. También porque es conveniente.

```solidity
mapping(uint256 => Trade) public trades;
```

Usar un `mapping` simplemente significa que tenemos que idear un identificador (id) para cada anuncio antes de publicarlo, y necesitaremos conocer el id de un anuncio antes de poder operar en él. Hay múltiples formas de lidiar con esto, ya sea en el contrato inteligente o en el *front-end*. Por favor, pregunta si necesitas algunas indicaciones.

A continuación surge la pregunta de cuáles son esos artículos con los que tratamos, y cuál es esta moneda que se utiliza para pagar la transacción.

Para los artículos, solo vamos a pedir que implementen la interfaz [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), que en realidad es solo una forma de representar artículos del mundo real en una cadena de bloques, aunque [funciona mejor con activos digitales](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Vamos a especificar nuestro propio contrato ERC-721 en el constructor, lo que significa que cualquier activo en nuestro tablón de anuncios debe haber sido tokenizado de antemano.

Para los pagos, vamos a hacer algo similar. La mayoría de los proyectos de cadena de bloques definen su propia criptomoneda [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Algunos otros prefieren usar una convencional como DAI. En este tablón de anuncios, solo necesitas decidir en la construcción cuál será tu moneda. Fácil.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Ya casi estamos. Tenemos anuncios, artículos para intercambiar y una moneda para los pagos. Hacer un anuncio significa poner un artículo en depósito de garantía (escrow) para demostrar tanto que lo tienes como que no lo has publicado dos veces, posiblemente en un tablón diferente.

El código a continuación hace exactamente eso. Pone el artículo en depósito de garantía, crea el anuncio y hace algunas tareas de mantenimiento.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

Aceptar el intercambio significa elegir un anuncio (intercambio), pagar el precio y recibir el artículo. El código a continuación recupera un intercambio. Comprueba que esté disponible. Paga el artículo. Recupera el artículo. Actualiza el anuncio.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Finalmente, tenemos una opción para que los vendedores se retiren de un intercambio antes de que un comprador lo acepte. En algunos modelos, los anuncios estarían activos durante un período de tiempo antes de que expiren. Es tu elección, dependiendo del diseño de tu mercado.

El código es muy similar al utilizado para ejecutar un intercambio, solo que no hay moneda cambiando de manos y el artículo vuelve al publicador del anuncio.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

Eso es todo. Llegaste al final de la implementación. Es bastante sorprendente lo compactos que son algunos conceptos de negocio cuando se expresan en código, y este es uno de esos casos. Revisa el contrato completo [en nuestro repositorio](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusión {#conclusion}

Los tablones de anuncios clasificados son una configuración de mercado común que escaló masivamente con internet, convirtiéndose en un modelo de negocio enormemente popular con unos pocos ganadores monopolísticos.

Los tablones de anuncios también resultan ser una herramienta fácil de replicar en un entorno de cadena de bloques, con características muy específicas que harán posible un desafío a los gigantes existentes.

En este artículo, hice un intento de tender un puente entre la realidad empresarial de un negocio de tablón de anuncios y la implementación tecnológica. Este conocimiento debería ayudarte a crear una visión y una hoja de ruta para la implementación si tienes las habilidades adecuadas.

Como siempre, si estás dispuesto a construir algo divertido y te gustaría recibir algún consejo, ¡por favor [escríbeme](https://albertocuesta.es/)! Siempre estoy feliz de ayudar.