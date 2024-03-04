---
title: Cómo implementar un mercado ERC-721
description: Cómo poner elementos tokenizados a la venta en un tablero descentralizado de avisos clasificados
author: "Alberto Cuesta Cañada"
tags:
  - "contratos inteligentes"
  - "erc-721"
  - "solidity"
  - "tókenes"
skill: intermediate
lang: es
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

En este articulo, les mostraré cómo codificar Craiglist para la cadena de bloques de Ethereum.

Antes de Gumtree, Ebay y Craigslist, los tableros de clasificados estaban hechos principalmente de corcho o papel. Había carteles de anuncios clasificados en los pasillos de las escuelas, periódicos, farolas, escaparates.

Todo eso cambió con Internet. El número de personas que podían ver un tablero, fue multiplicado por muchas órdenes de magnitud. Con eso, el mercado que representa se hizo mucho mas eficiente y escalable globalmente. Ebay es un negocio masivo que tiene sus orígenes en estos tableros de anuncios clasificados físicos.

Con la cadena de bloques, estos mercados están listos para cambiar de nuevo, permíteme mostrarte cómo.

## Monetización {#monetization}

El modelo de negocio de una junta pública de clasificaciones de blockchain tendrá que ser diferente del de Ebay y de la empresa.

Primero, esta [el ángulo de descentralización](/developers/docs/web2-vs-web3/). Las plataformas existentes necesitan mantener sus propios servidores. Una plataforma descentralizada es mantenida por sus usuarios, por lo que el costo de correr la plataforma central cae a cero para el propietario de la plataforma.

Luego está el front-end, el sitio web o interfaz que da acceso a la plataforma. Aquí hay muchas opciones. Los dueños de la plataforma pueden restringir el acceso y obligar a todos a utilizar su interfaz, cobrando una cuota. También pueden decidir abrir el acceso (Poder a la gente!) y dejar que cualquiera construya interfaces a la plataforma. O los dueños pueden decidir cualquier enfoque en medio de esos dos extremos.

_Los líderes empresariales con mayor visión a la mía, sabrán como monetizar esto. Todo lo que veo es que esto es diferente del status quo y probablemente rentable._

Además, existe el ángulo de automatización y pagos. Algunas cosas pueden ser muy [efectivamente tokenizadas](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) e intercambiadas en un tablero de clasificaciones. Los activos tokenizados se transfieren fácilmente en una cadena de bloques. Los métodos de pago altamente complejos se pueden implementar fácilmente en una cadena de bloques.

Sólo estoy aprovechando una oportunidad de negocio aquí. Una tabla clasificada sin gastos de funcionamiento puede ser implementada fácilmente, con complejas rutas de pago incluidas en cada transacción. Estoy seguro de que alguien saldrá con una idea sobre para que usar esto.

Estoy feliz contruyendolo. Echemos un vistazo al código.

## Implementación {#implementation}

Hace algún tiempo iniciamos un [repositorio de código abierto](https://github.com/HQ20/contracts?ref=hackernoon.com) con implementaciones de ejemplos de casos de negocio y otras cosas, por favor, eche un vistazo.

El código de este [Tablón de Clasificados de Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) está ahí, por favor úsalo y abusa de él. Solo hay que tener en cuenta que el código no ha sido auditado y hay que hacer la debida comprobación antes de dejar que el dinero entre en él.

Los fundamentos del tablero no son complejos. Todos los anuncios en el tablero serán sólo una estructura con unos pocos datos:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

Así que hay alguien que publica el anuncio. Un artículo a la venta. Un precio para el artículo. El estado de la operación, que puede ser abierta, ejecutada o cancelada.

Todas estas operaciones se guardarán en un mapeo. Porque todo en Solidity parece ser un mapeo. También porque es conveniente.

```solidity
mapping(uint256 => Trade) public trades;
```

El uso de un mapeo sólo significa que tenemos que llegar a una identificación para cada anuncio antes de publicarlo, y necesitaremos saber la identificación de un anuncio antes de poder operar en él. Hay múltiples maneras de tratar esto, ya sea en el contrato inteligente o en el front-end. Por favor, pregunte si necesita algunos datos.

A continuación se plantea la cuestión de cuáles son esos artículos con los que tratamos, y cuál es esa moneda que se utiliza para pagar la transacción.

Para los artículos, sólo vamos a pedir que implementen la interfaz [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), que realmente es sólo una forma de representar artículos del mundo real en una blockchain, aunque [funciona mejor con activos digitales](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Vamos a especificar nuestro propio contrato ERC721 en el constructor, lo que significa que cualquier activo en nuestro tablón de anuncios necesita haber sido tokenizado de forma anticipada.

Para los pagos, vamos a hacer algo parecido. La mayoría de los proyectos de blockchain definen su propia criptomoneda [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Otros prefieren utilizar uno convencional como el DAI. En este tablón de anuncios, sólo tienes que decidir en la construcción cuál será tu moneda. Fácil.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Ya lo estamos consiguiendo. Tenemos anuncios, artículos para comercializar y una moneda para hacer pagos. Hacer un anuncio significa poner un artículo en un depósito (escrow) para mostrar que lo tiene y que no lo ha publicado dos veces, posiblemente en un tablero diferente.

El siguiente código hace exactamente eso. Pone el artículo en depósito, crea el anuncio, hace algunas gestiones.

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

Aceptar la comercialización significa elegir un anuncio (comercializar), pagar el precio y recibir el objeto. El código de abajo recupera una operación. Comprueba su disponibilidad. Paga el objeto. Recupera el objeto. Actualiza el anuncio.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Abierto", "El comercio no está abierto.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Ejecutado";
  emit TradeStatusChange(_trade, "Ejecutado");
}
```

Por último, tenemos la opción de que los vendedores cancelen una operación antes de que el comprador la acepte. En algunos modelos, los anuncios estarían publicados en cambio durante un período de tiempo antes de que caduquen. Es su elección, dependiendo del diseño de su mercado.

El código es muy similar al usado para ejecutar una operación, solo que no hay moneda y el artículo vuelve a quien publicó el anuncio.

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

Eso es todo. Ha llegado al final de la implementación. Es bastante sorprendente lo compactos que son algunos conceptos de negocio cuando se expresan en código, y este es uno de esos casos. Revise el contrato completo [en nuestro repositorio](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusión {#conclusion}

Los tableros de anuncios clasificados son una configuración de mercado común que creció enormemente con Internet, convirtiéndose en un modelo de negocio altamente popular con unos pocos ganadores monopolísticos.

Los tableros de anuncios clasificados también resultan ser una herramienta fácil de replicar en un entorno de cadena de bloques, con características muy específicas que harán posible un desafío a los gigantes existentes.

En este artículo, he tratado de conectar la realidad del negocio de los tableros de anuncios clasificados con la implementación tecnológica. Este conocimiento debería ayudarle a crear una visión y un mapa de ruta para la implementación si tiene las habilidades adecuadas.

Como siempre, si quiere crear algo divertido y le gustaría recibir algún consejo, [envíeme un mensaje](https://albertocuesta.es/), será bienvenido. Siempre estoy encantado de ayudar.
