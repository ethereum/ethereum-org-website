---
title: ERC-20 con mecanismos de seguridad
description: "Cómo ayudar a la gente a evitar errores tontos"
author: Ori Pomerantz
lang: es
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## Introducción {#introduction}

Una de las grandes ventajas de Ethereum es que no hay una autoridad central que pueda modificar o deshacer sus transacciones. Uno de los grandes problemas con Ethereum es que no hay una autoridad central con el poder de deshacer los errores de los usuarios o las transacciones ilícitas. En este artículo aprenderá sobre algunos de los errores comunes que los usuarios cometen con los tokens [ERC-20](/developers/docs/standards/tokens/erc-20/), así como la forma de crear contratos ERC-20 que ayuden a los usuarios a evitar esos errores o que den a una autoridad central algo de poder (por ejemplo, para congelar cuentas).

Tenga en cuenta que aunque utilizaremos el [contrato de token ERC-20 de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), este artículo no lo explica en gran detalle. Puede encontrar esta información [aquí](/developers/tutorials/erc20-annotated-code).

Si desea ver el código fuente completo:

1. Abra el [IDE de Remix](https://remix.ethereum.org/)
2. Haga clic en el icono para clonar de GitHub (![icono para clonar de github](icon-clone.png)).
3. Clone el repositorio de GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Abra **contracts > erc20-safety-rails.sol**.

## Creación de un contrato ERC-20 {#creating-an-erc-20-contract}

Antes de que podamos añadir la funcionalidad de mecanismo de seguridad, necesitamos un contrato ERC-20. En este artículo usaremos [el Asistente de Contratos de OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Ábralo en otro navegador y siga estas instrucciones:

1. Seleccione **ERC20**.

2. Introduzca estos ajustes:

   | Parámetro         | Valor            |
   | ----------------- | ---------------- |
   | Nombre            | SafetyRailsToken |
   | Símbolo           | SAFE             |
   | Premint           | 1000             |
   | Funciones         | Ninguno          |
   | Control de acceso | Ownable          |
   | Upgradability     | Ninguno          |

3. Desplácese hacia arriba y haga clic en **Abrir en Remix** (para Remix) o en **Descargar** para usar un entorno diferente. Voy a suponer que está usando Remix; si usa otra cosa, simplemente haga los cambios apropiados.

4. Ahora tenemos un contrato ERC-20 totalmente funcional. Puede expandir `.deps` > `npm` para ver el código importado.

5. Compile, despliegue e interactúe con el contrato para ver que funciona como un contrato ERC-20. Si necesita aprender a usar Remix, [use este tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Errores comunes {#common-mistakes}

### Los errores {#the-mistakes}

Los usuarios a veces envían tokens a la dirección equivocada. Aunque no podemos leerles la mente para saber qué querían hacer, hay dos tipos de errores que ocurren con frecuencia y son fáciles de detectar:

1. Enviar los tokens a la propia dirección del contrato. Por ejemplo, el [token OP de Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) llegó a acumular [más de 120 000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) tokens OP en menos de dos meses. Esto representa una cantidad significativa de riqueza que la gente presumiblemente acaba de perder.

2. Enviar los tokens a una dirección vacía, una que no corresponde a una [cuenta de propiedad externa](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) o a un [contrato inteligente](/developers/docs/smart-contracts). Aunque no tengo estadísticas sobre la frecuencia con que esto ocurre, [un incidente podría haber costado 20 000 000 de tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Prevención de transferencias {#preventing-transfers}

El contrato ERC-20 de OpenZeppelin incluye [un hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), que se llama antes de que se transfiera un token. Por defecto, este hook no hace nada, pero podemos añadirle nuestra propia funcionalidad, como comprobaciones que se revierten si hay un problema.

Para usar el hook, añada esta función después del constructor:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Algunas partes de esta función pueden ser nuevas para usted si no está muy familiarizado con Solidity:

```solidity
        internal virtual
```

La palabra clave `virtual` significa que, al igual que heredamos la funcionalidad de `ERC20` y sobrescribimos esta función, otros contratos pueden heredar de nosotros y sobrescribir esta función.

```solidity
        override(ERC20)
```

Tenemos que especificar explícitamente que estamos [sobrescribiendo](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) la definición del token ERC20 de `_beforeTokenTransfer`. En general, las definiciones explícitas son mucho mejores, desde el punto de vista de la seguridad, que las implícitas: no puede olvidar que ha hecho algo si lo tiene justo delante. Esa es también la razón por la que necesitamos especificar qué `_beforeTokenTransfer` de la superclase estamos sobrescribiendo.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Esta línea llama a la función `_beforeTokenTransfer` del contrato o contratos de los que heredamos que la tienen. En este caso, solo es `ERC20`, ya que `Ownable` no tiene este hook. Aunque actualmente `ERC20._beforeTokenTransfer` no hace nada, la llamamos por si se añade funcionalidad en el futuro (y entonces decidimos volver a desplegar el contrato, porque los contratos no cambian después del despliegue).

### Codificación de los requisitos {#coding-the-requirements}

Queremos añadir estos requisitos a la función:

- La dirección `to` no puede ser igual a `address(this)`, la dirección del propio contrato ERC-20.
- La dirección `to` no puede estar vacía, tiene que ser una de estas dos:
  - Una cuenta de propiedad externa (EOA). No podemos comprobar directamente si una dirección es una EOA, pero podemos comprobar el saldo de ETH de una dirección. Las EOA casi siempre tienen saldo, incluso si ya no se usan; es difícil vaciarlas hasta el último wei.
  - Un contrato inteligente. Comprobar si una dirección es un contrato inteligente es un poco más difícil. Hay un código de operación que comprueba la longitud del código externo, llamado [`EXTCODESIZE`](https://www.evm.codes/#3b), pero no está disponible directamente en Solidity. Tenemos que usar [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), que es el ensamblador de la EVM, para ello. Hay otros valores que podríamos usar de Solidity ([`<address>.code` y `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), pero cuestan más.

Repasemos el nuevo código línea por línea:

```solidity
        require(to != address(this), "No se pueden enviar tokens a la dirección del contrato");
```

Este es el primer requisito: comprobar que `to` y `this(address)` no son lo mismo.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Así es como comprobamos si una dirección es un contrato. No podemos recibir la salida directamente de Yul, así que en su lugar definimos una variable para guardar el resultado (`isToContract` en este caso). La forma en que funciona Yul es que cada código de operación se considera una función. Así que primero llamamos a [`EXTCODESIZE`](https://www.evm.codes/#3b) para obtener el tamaño del contrato, y luego usamos [`GT`](https://www.evm.codes/#11) para comprobar que no es cero (estamos tratando con enteros sin signo, así que, por supuesto, no puede ser negativo). Luego escribimos el resultado en `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "No se pueden enviar tokens a una dirección vacía");
```

Y finalmente, tenemos la comprobación real para las direcciones vacías.

## Acceso administrativo {#admin-access}

A veces es útil tener un administrador que pueda deshacer errores. Para reducir el potencial de abuso, este administrador puede ser una [multifirma](https://blog.logrocket.com/security-choices-multi-signature-wallets/) para que varias personas tengan que estar de acuerdo en una acción. En este artículo tendremos dos características administrativas:

1. Congelar y descongelar cuentas. Esto puede ser útil, por ejemplo, cuando una cuenta puede estar comprometida.
2. Limpieza de activos.

   A veces los estafadores envían tokens fraudulentos al contrato del token real para ganar legitimidad. Por ejemplo, [véase aquí](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). El contrato ERC-20 legítimo es [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). La estafa que pretende serlo es [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   También es posible que la gente envíe tokens ERC-20 legítimos a nuestro contrato por error, que es otra razón para querer tener una forma de sacarlos.

OpenZeppelin proporciona dos mecanismos para habilitar el acceso administrativo:

- Los contratos [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) tienen un único propietario. Las funciones que tienen el [modificador](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` solo pueden ser llamadas por ese propietario. Los propietarios pueden transferir la propiedad a otra persona o renunciar a ella por completo. Los derechos de todas las demás cuentas suelen ser idénticos.
- Los contratos [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) tienen [control de acceso basado en roles (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Para simplificar, en este artículo usamos `Ownable`.

### Congelar y descongelar contratos {#freezing-and-thawing-contracts}

Congelar y descongelar contratos requiere varios cambios:

- Un [mapeo](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) de direcciones a [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) para hacer un seguimiento de qué direcciones están congeladas. Todos los valores son inicialmente cero, que para los valores booleanos se interpreta como falso. Esto es lo que queremos porque, por defecto, las cuentas no están congeladas.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Eventos](https://www.tutorialspoint.com/solidity/solidity_events.htm) para informar a cualquier persona interesada cuando una cuenta se congela o descongela. Técnicamente, no se requieren eventos para estas acciones, pero ayuda al código fuera de la cadena a poder escuchar estos eventos y saber qué está pasando. Se considera una buena práctica que un contrato inteligente los emita cuando sucede algo que podría ser relevante para otra persona.

  Los eventos están indexados, por lo que será posible buscar todas las veces que una cuenta ha sido congelada o descongelada.

  ```solidity
    // Cuando las cuentas se congelan o descongelan
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funciones para congelar y descongelar cuentas. Estas dos funciones son casi idénticas, por lo que solo repasaremos la función de congelación.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Las funciones marcadas como [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) pueden ser llamadas desde otros contratos inteligentes o directamente mediante una transacción.

  ```solidity
    {
        require(!frozenAccounts[addr], "La cuenta ya está congelada");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Si la cuenta ya está congelada, se revierte. De lo contrario, la congela y `emit`e un evento.

- Cambie `_beforeTokenTransfer` para evitar que se mueva dinero de una cuenta congelada. Tenga en cuenta que todavía se puede transferir dinero a la cuenta congelada.

  ```solidity
       require(!frozenAccounts[from], "La cuenta está congelada");
  ```

### Limpieza de activos {#asset-cleanup}

Para liberar los tokens ERC-20 que posee este contrato, debemos llamar a una función en el contrato del token al que pertenecen, ya sea [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) o [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). No tiene sentido gastar gas en asignaciones en este caso, es mejor que transfiramos directamente.

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

Esta es la sintaxis para crear un objeto para un contrato cuando recibimos la dirección. Podemos hacer esto porque tenemos la definición para los tokens ERC20 como parte del código fuente (véase la línea 4), y ese archivo incluye [la definición para IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), la interfaz para un contrato ERC-20 de OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Esta es una función de limpieza, por lo que presumiblemente no queremos dejar ningún token. En lugar de obtener el saldo del usuario manualmente, también podemos automatizar el proceso.

## Conclusión {#conclusion}

Esta no es una solución perfecta; no hay una solución perfecta para el problema de «el usuario cometió un error». Sin embargo, usar este tipo de comprobaciones puede, al menos, evitar algunos errores. La capacidad de congelar cuentas, aunque es peligrosa, puede utilizarse para limitar el daño de ciertos hackeos al denegar al hacker los fondos robados.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
