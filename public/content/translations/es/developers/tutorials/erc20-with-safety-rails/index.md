---
title: ERC-20 con mecanismos de seguridad
description: Cómo ayudar a las personas a evitar errores tontos
author: Ori Pomerantz
lang: es
tags:
  - "erc-20"
skill: beginner
published: 2022-08-15
---

## Introducción {#introduction}

Una de las cosas más positivas de Ethereum es que no hay una autoridad central que pueda modificar o deshacer sus transacciones. Y, sin embargo, una de las grandes trabas de Ethereum es que no hay una autoridad central con el poder de deshacer los errores del usuario o las transacciones ilícitas. En este artículo, descubrirá algunos de los errores comunes que los usuarios cometen con los tókenes [ERC-20](/developers/docs/standards/tokens/erc-20/), al igual que cómo crear contratos ERC-20 que ayuden a los usuarios a evitar esos errores, o le otorguen algo de poder a una autoridad central (por ejemplo, para congelar cuentas).

Observe que aunque utilizaremos el contrato del token ERC-20 [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), este artículo no lo explica en gran detalle. Puede encontrar [aquí](/developers/tutorials/erc20-annotated-code) esta información.

Si quieres ver el código fuente completo:

1. Abre el [IDE Remix](https://remix.ethereum.org/).
2. Haga click en el ícono github de clonar (![clone github icon](icon-clone.png)).
3. Cone el repositorio de GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Abre **contratos > erc20-safety-rails.sol**.

## Creando un contrato ERC-20 {#creating-an-erc-20-contract}

Antes de agregar la funcionalidad del riel de seguridad, necesitamos un contrato ERC-20. En este artículo usaremos [el Asistente de Contratos de OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/wizard). Ábrelo en otra ventana del navegador y sigue estas instrucciones:

1. Selecciona **ERC-20**.
2. Ingresa estos ajustes:

   | Parámetro         | Valor            |
   | ----------------- | ---------------- |
   | Nombre            | SafetyRailsToken |
   | Símbolo           | SAFE             |
   | Premint           | 1.000            |
   | Características   | Ninguno          |
   | Control de acceso | Ownable          |
   | Upgradability     | Ninguno          |

3. Desplácese hasta arriba y haga click en **Open in Remix** (Abrir en Remix, para Remix) o en **Download** (Descargar) para utilizar un entorno diferente. Doy por sentado que está usando Remix, si usa algo diferente, realice únicamente los cambios apropiados.
4. Ahora tenemos un contrato ERC-20 totalmente funcional. Puedes expandir `.deps` > `npm` para ver el código importado.
5. Compile, despliegue y familiarícese con el contrato para ver si funciona como un contrato ERC-20. Si necesitas aprender cómo utilizar Remix, [usa este tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Errores comunes {#common-mistakes}

### Los errores {#the-mistakes}

Los usuarios algunas veces envían tokens a la dirección incorrecta. Como no podemos leer sus mentes para saber lo que hacían, hay dos tipos de error que suceden mucho y son fácilmente detectables:

1. Envianr los tókenes a la dirección propia del contrato. Por ejemplo, [el token OP de Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) gestionado para acumular [más de 120.000](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042#tokentxns) tókenes OP en menos de dos meses. Esto representa una cantidad significativa de poder que, supuestamente, las personas perdieron.

2. Enviar los tókenes a una dirección vacía, que no corresponde a una [cuenta de propiedad externa](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) o a un [contrato inteligente](/developers/docs/smart-contracts). Como no tenemos las estadísticas de la frecuencia con la que esto sucede, [un incidente podría haber costado 20.000.000 tókenes](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Evitar transferencias {#preventing-transfers}

El contrato ERC-20 de OpenZeppelin incluye [ un gancho `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), que se invoca antes de transferir un token. Por defecto, este gancho no hace nada, pero podemos dotarle de nuestra propia funcionalidad, como los chequeos que revierten si hay algún problema.

Para usar este gancho, añada esta función antes de la constructora:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Algunas partes de esta función pueden resultarle nuevas si no está muy familiarizado con Solidity:

```solidity
        internal virtual
```

La palabra clave `virtual` significa que como hemos heredado funcionalidades de `ERC-20` y anulado esta función, otros contratos pueden heredarla de nosotros y anular esta función.

```solidity
        override(ERC20)
```

Debemos especificar de manera explícita que estamos [anulando](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) la definición del token ERC20 de `_beforeTokenTransfer`. Por lo general, las definiciones explícitas son mucho mejores, desde una perspectiva de seguridad, que las implícitas. No podemos olvidar que hemos hecho algo si lo tenemos a la vista. Esta es también la razon por la que necesitamos especificar qué `_beforeTokenTransfer` de la superclase estamos anulando.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Esta línea llama la función de `_beforeTokenTransfer` del contrato o los contratos heredados que la tienen. En este caso, eso es solo `ERC20`, `Ownable` no tiene este gancho. Aunque actualmente `ERC20._beforeTokenTransfer` no hace nada, lo invocamos en caso de que se le añada alguna funcionalidad en el futuro (y así decidimos implementar nuevamente el contrato, porque los contratos no cambian una vez implementados).

### Codificar los requisitos {#coding-the-requirements}

Queremos añadir estos requisitos a la función:

- La dirección `to` no puede ser igual a `address(this)`, la dirección propia del contrato ERC-20.
- La dirección `to` no puede estar vacía, esta debe ser:
  - Unas cuentas de propiedad externa (EOA). No podemos revisar si una dirección es una EOA directamente, pero podemos revisar el saldo de ETH de una dirección. Las EOAs casi siempre tienen un balance, incluso si ya no se encuentran en uso - es difícil vaciarlas hasta el último wei.
  - Un contrato inteligente. Probar si una dirección es un contrato inteligente es un poco complicado. Hay un código de operación que revisa la longitud externa del código, llamado [`EXTCODESIZE`](https://www.evm.codes/#3b), pero no está disponible directamente en Solidity. Debemos usar [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), que es un ensamblaje de EVM, para tal fin. Hay otros valores que podemos usar desde Solidity ([`<address>.code` y `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), pero cuestan más.

Repasemos el nuevo código línea por línea:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Este es el primer requisito, revisa que `to` y `this(address)` no sean lo mismo.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Así es como revisamos si una dirección es un contrato. No podemos recibir salidas directamente de Yul, en vez de esto, definimos una variable para almacenar el resultado (`isToContract` en este caso). Según el funcionamiento de Yul, cada código de operación se considera una función. Por tanto, primero invocamos [`EXTCODESIZE`](https://www.evm.codes/#3b) para obtener el tamaño del contrato y después [`GT`](https://www.evm.codes/#11) para revisar que no sea cero (estamos trabajando con números enteros sin firmar, por lo que no puede ser negativo). Luego escribimos el resultado en `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Finalmente, tenemos la revisión verdadera para direcciones vacías.

## Acceso administrativo {#admin-access}

Algunas veces es útil tener un administrador que puede deshacer los errores. Para reducir el potencial de abuso, este administrador puede ser una [multifirma](https://blog.logrocket.com/security-choices-multi-signature-wallets/), por lo que varias personas deben estar de acuerdo con una acción. En este artículo tenemos dos características administrativas:

1. Congelar y descongelar cuentas. Esto puede ser útil, por ejemplo, cuando una cuenta puede verse afectada.
2. Limpieza de activos.

   Los fraudes algunas veces envían tókenes fraudulentos al contrato de un token real para obtener la legitimidad. Por ejemplo, [consulte aquí](https://optimistic.etherscan.io/token/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe?a=0x4200000000000000000000000000000000000042). El contrato ERC-20 legítimo es [0x4200....0042](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042). El fraude que pretende ser legítimo es [0x234....bbe](https://optimistic.etherscan.io/address/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe).

   También puede que las personas envíen tókenes ERC-20 legítimos a nuestro contrato por error, lo cual es otra razón para querer tener una manera de eliminarlos.

OpenZeppelin proporciona dos mecanismos para activar el acceso administrativo:

- Los contratos [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/access-control#ownership-and-ownable) tienen un único dueño. Las funciones que tiene el [modificador](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` sólo las puede activar el propietario. Los dueños pueden transferir la propiedad a otra persona o renunciar a esta completamente. Los derechos de todas las otras cuentas son generalmente idénticos.
- Los contratos [`AccessControl`](https://docs.openzeppelin.com/contracts/4.x/access-control#role-based-access-control) tienen [control de acceso basado en roles (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Para simplificar la explicación, en este artículo utilizaremos `Ownable`.

### Congelar y descongelar contratos {#freezing-and-thawing-contracts}

Congelar y descongelar contratos requiere varios cambios:

- El [mapeo](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) de direcciones a [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) para hacer un seguimiento de las direcciones que están congeladas. Todos los valores son inicialmente cero, el cual interpretan como falso los booleanos. Esto es precisamente lo que queremos; ya que, por defecto, las cuentas no están congeladas.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Eventos](https://www.tutorialspoint.com/solidity/solidity_events.htm) para informar a cualquier interesado cuando una cuenta se congela o descongela. Desde un punto de vista técnico, no se requieren eventos para estas acciones, aunque le ayudan al código fuera de la cadena a ser capaz de escuchar estos eventos y saber lo que está ocurriendo. Se considera una buena práctica en contratos inteligentes, emitirlos cuando sucede algo que puede ser relevante para alguien más.

  Los eventos están indexados, por tanto, es posible buscar totas las veces que una cuenta se ha congelado o descongelado.

  ```solidity
    // When accounts are frozen or unfrozen
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funciones para el congelamiento y descongelamiento de cuentas. Al ser estas dos funciones son prácticamente idénticas, solo hablaremos de la función para congelar.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Las funciones marcadas como [`públicas`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) pueden activarse desde otros contratos inteligentes o directamente mediante una transacción.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Si la cuenta ya está congelada, revierte. De lo contrario, congélela y `emit` un evento.

- Cambie `_beforeTokenTransfer` para evitar que el dinero pase desde una cuenta congelada. Tenga en cuenta que el dinero todavía puede transferirse a la cuenta congelada.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Limpieza de activos {#asset-cleanup}

Para publicar tókenes ERC-20 retenidos por este contrato, necesitamos activar una función en el contrato del token al que pertenece, siendo [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) o [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). En este caso no tiene sentido el gasto de gas en asignaciones, también podemos transferir directamente.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

Esta es la sintaxis necesaria para crear un objeto para un contrato cuando recibimos la dirección. Podemos hacer esto porque tenemos la definición para tokens ERC20 como parte del código fuente (ver la línea 4) y ese archivo incluye [la definición para IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), la interfaz para un contrato ERC20 de OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Se trata de una función de limpieza, por lo que supuestamente no queremos dejar ningún token. En lugar de obtener el saldo del usuario manualmente, también podríamos automatizar el proceso.

## Conclusión {#conclusion}

Esta no es una solución perfecta, ya que no existe una solución perfecta para un problema ocurrido cuando un usuario hace un fallo. Sin embargo, usar este tipo de comprobaciones puede al menos prevenir algunos errores. La capacidad de congelar cuentas, a pesar de ser peligrosa, puede utilizarse para limitar el daño de ciertos actos de piratería, negando al hacker los fondos robados.
