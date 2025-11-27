---
title: Cómo implementar un mercado ERC-721
description: Cómo poner a la venta artículos tokenizados en un tablón de anuncios clasificados descentralizado
author: "Alberto Cuesta Cañada"
tags: [ "smart contracts", "erc-721", "solidity", "tokens" ]
skill: intermedio
lang: es
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

En este artículo, voy a mostrarle cómo programar un Craigslist para la blockchain de Ethereum.

Antes de Gumtree, Ebay y Craigslist, los tablones de anuncios clasificados estaban hechos principalmente de corcho o papel. Había tablones de anuncios clasificados en los pasillos de las escuelas, en los periódicos, en las farolas y en los escaparates.

Todo eso cambió con internet. El número de personas que podían ver un tablón de anuncios clasificados específico se multiplicó por varios órdenes de magnitud. Con ello, los mercados que representaban se volvieron mucho más eficientes y escalaron a un tamaño global. Ebay es un negocio masivo cuyos orígenes se remontan a estos tablones de anuncios clasificados físicos.

Con la blockchain, estos mercados están listos para cambiar una vez más, permítame mostrarle cómo.

## Monetización {#monetization}

El modelo de negocio de un tablón de anuncios clasificados de una blockchain pública tendrá que ser diferente al de Ebay y compañía.

En primer lugar, está [el ángulo de la descentralización](/developers/docs/web2-vs-web3/). Las plataformas existentes necesitan mantener sus propios servidores. Una plataforma descentralizada la mantienen sus usuarios, por lo que el coste de ejecutar la plataforma principal se reduce a cero para el propietario de la plataforma.

Luego está el front-end, el sitio web o la interfaz que da acceso a la plataforma. Aquí hay muchas opciones. Los propietarios de la plataforma pueden restringir el acceso y obligar a todos a usar su interfaz, cobrando una tarifa. Los propietarios de la plataforma también pueden decidir abrir el acceso (¡Poder para el pueblo!) y dejar que cualquiera construya interfaces para la plataforma. O los propietarios podrían decidir cualquier enfoque intermedio entre esos extremos.

_Los líderes empresariales con más visión que yo sabrán cómo monetizar esto. Todo lo que veo es que esto es diferente del statu quo y probablemente rentable._

Además, está el ángulo de la automatización y los pagos. Algunas cosas pueden ser [tokenizadas de forma muy efectiva](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) y negociarse en un tablón de anuncios clasificados. Los activos tokenizados se transfieren fácilmente en una blockchain. Métodos de pago muy complejos pueden implementarse fácilmente en una blockchain.

Simplemente intuyo aquí una oportunidad de negocio. Un tablón de anuncios clasificados sin costes de funcionamiento puede implementarse fácilmente, con rutas de pago complejas incluidas en cada transacción. Estoy seguro de que a alguien se le ocurrirá una idea sobre para qué usar esto.

Yo soy feliz construyéndolo. Echemos un vistazo al código.

## Implementación {#implementation}

Hace algún tiempo iniciamos un [repositorio de código abierto](https://github.com/HQ20/contracts?ref=hackernoon.com) con ejemplos de implementaciones de casos de negocio y otras cosas interesantes, por favor, échele un vistazo.

El código para este [Tablón de anuncios clasificados de Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) está ahí, por favor, úselo y abuse de él. Solo tenga en cuenta que el código no ha sido auditado y que necesita hacer su propia diligencia debida antes de invertir dinero en él.

Los fundamentos del tablón no son complejos. Todos los anuncios del tablón serán simplemente una estructura (`struct`) con unos pocos campos:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Abierto, Ejecutado, Cancelado
}
```

Así que hay alguien que publica el anuncio. Un artículo en venta. Un precio por el artículo. El estado de la operación, que puede ser abierta, ejecutada o cancelada.

Todas estas operaciones se guardarán en una asignación (`mapping`). Porque todo en Solidity parece ser una asignación (`mapping`). También porque es conveniente.

```solidity
mapping(uint256 => Trade) public trades;
```

Usar una asignación (`mapping`) solo significa que tenemos que idear un id para cada anuncio antes de publicarlo, y necesitaremos saber el id de un anuncio antes de que podamos operar con él. Hay varias maneras de lidiar con esto, ya sea en el contrato inteligente o en el front-end. Por favor, pregunte si necesita algunas indicaciones.

A continuación, surge la pregunta de cuáles son esos artículos con los que tratamos y cuál es esta moneda que se utiliza para pagar la transacción.

Para los artículos, solo vamos a pedir que implementen la interfaz [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), que en realidad es solo una forma de representar artículos del mundo real en una blockchain, aunque [funciona mejor con activos digitales](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Vamos a especificar nuestro propio contrato ERC721 en el constructor, lo que significa que cualquier activo en nuestro tablón de anuncios clasificados necesita haber sido tokenizado de antemano.

Para los pagos, vamos a hacer algo similar. La mayoría de los proyectos de blockchain definen su propia criptomoneda [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Algunos otros prefieren utilizar una de las principales como DAI. En este tablón de anuncios clasificados, solo necesita decidir al construirlo cuál será su moneda. Fácil.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Ya casi llegamos. Tenemos anuncios, artículos para intercambiar y una moneda para los pagos. Hacer un anuncio significa poner un artículo en custodia (escrow) para demostrar que lo tiene y que no lo ha publicado dos veces, posiblemente en un tablón diferente.

El código de abajo hace exactamente eso. Pone el artículo en custodia (escrow), crea el anuncio, hace algunas tareas de mantenimiento.

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

Aceptar la operación significa elegir un anuncio (operación), pagar el precio y recibir el artículo. El siguiente código recupera una operación. Comprueba que esté disponible. Paga el artículo. Recupera el artículo. Actualiza el anuncio.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "La operación no está abierta.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Finalmente, tenemos una opción para que los vendedores se retracten de una operación antes de que un comprador la acepte. En algunos modelos, los anuncios estarían activos durante un período de tiempo antes de que expiren. Es su elección, dependiendo del diseño de su mercado.

El código es muy similar al utilizado para ejecutar una operación, solo que no hay moneda que cambie de manos y el artículo vuelve al anunciante.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "La operación solo puede ser cancelada por el anunciante."
  );
  require(trade.status == "Open", "La operación no está abierta.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

Eso es todo. Ha llegado al final de la implementación. Es bastante sorprendente lo compactos que son algunos conceptos de negocio cuando se expresan en código, y este es uno de esos casos. Consulte el contrato completo [en nuestro repositorio](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusión {#conclusion}

Los tablones de anuncios clasificados son una configuración de mercado común que escaló masivamente con internet, convirtiéndose en un modelo de negocio enormemente popular con unos pocos ganadores monopolísticos.

Los tablones de anuncios clasificados también resultan ser una herramienta fácil de replicar en un entorno de blockchain, con características muy específicas que harán posible un desafío a los gigantes existentes.

En este artículo, he intentado tender un puente entre la realidad empresarial de un negocio de tablones de anuncios clasificados y la implementación tecnológica. Este conocimiento debería ayudarle a crear una visión y una hoja de ruta para la implementación si tiene las habilidades adecuadas.

Como siempre, si está construyendo algo divertido y agradecería algún consejo, por favor, ¡[escríbame](https://albertocuesta.es/)! Siempre estoy feliz de ayudar.
