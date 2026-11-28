---
title: ERC-20 con medidas de seguridad
description: "Cómo ayudar a las personas a evitar errores tontos"
author: Ori Pomerantz
lang: es
tags: ["erc-20"]
skill: beginner
breadcrumb: Seguridad de ERC-20
published: 2022-08-15
---

## Introducción {#introduction}

Una de las grandes ventajas de Ethereum es que no hay una autoridad central que pueda modificar o deshacer sus transacciones. Uno de los grandes problemas de Ethereum es que no hay una autoridad central con el poder de deshacer los errores de los usuarios o las transacciones ilícitas. En este artículo aprenderá sobre algunos de los errores comunes que cometen los usuarios con los tokens [ERC-20](/developers/docs/standards/tokens/erc-20/), así como a crear contratos ERC-20 que ayuden a los usuarios a evitar esos errores, o que otorguen a una autoridad central cierto poder (por ejemplo, para congelar cuentas).

Tenga en cuenta que, aunque usaremos el [contrato de token ERC-20 de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), este artículo no lo explica con gran detalle. Puede encontrar esta información [aquí](/developers/tutorials/erc20-annotated-code).

Si desea ver el código fuente completo:

1. Abra el [IDE de Remix](https://remix.ethereum.org/).
2. Haga clic en el icono de clonar de GitHub (![icono de clonar de GitHub](icon-clone.png)).
3. Clone el repositorio de GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Abra **contracts > erc20-safety-rails.sol**.

Tenga en cuenta que el repositorio se escribió para OpenZeppelin Contracts 4.7.2, donde la función que este artículo sobrescribe se llama `_beforeTokenTransfer`. Este artículo utiliza el actual OpenZeppelin Contracts 5.x, donde en su lugar se sobrescribe `_update`, por lo que el código de este artículo difiere ligeramente del código del repositorio.

## Creación de un contrato ERC-20 {#creating-an-erc-20-contract}

Antes de que podamos agregar la funcionalidad de medidas de seguridad, necesitamos un contrato ERC-20. En este artículo usaremos [el asistente de contratos de OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Ábralo en otro navegador y siga estas instrucciones:

1. Seleccione **ERC20**.
2. Ingrese esta configuración:

   | Parámetro      | Valor                     |
   | -------------- | ------------------------- |
   | Name           | SafetyRailsToken          |
   | Symbol         | SAFE                      |
   | Premint        | 1000                      |
   | Features       | None (desmarque **Permit**) |
   | Access Control | Ownable                   |
   | Upgradability  | None                      |

3. Desplácese hacia arriba y haga clic en **Open in Remix** (para Remix) o en **Download** para usar un entorno diferente. Asumiré que está usando Remix; si usa otra cosa, simplemente haga los cambios apropiados.
4. Ahora tenemos un contrato ERC-20 completamente funcional. Puede expandir `.deps` > `npm` para ver el código importado.
5. Compile, despliegue y juegue con el contrato para ver que funciona como un contrato ERC-20. Si necesita aprender a usar Remix, [use este tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Errores comunes {#common-mistakes}

### Los errores {#the-mistakes}

A veces, los usuarios envían tokens a la dirección equivocada. Aunque no podemos leer sus mentes para saber qué querían hacer, hay dos tipos de errores que ocurren a menudo y son fáciles de detectar:

1. Enviar los tokens a la propia dirección del contrato. Por ejemplo, el [token OP de Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) logró acumular [más de 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) tokens OP en menos de dos meses. Esto representa una cantidad significativa de riqueza que presumiblemente la gente simplemente perdió.

2. Enviar los tokens a una dirección vacía, una que no corresponde a una [cuenta de propiedad externa (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) o a un [contrato inteligente](/developers/docs/smart-contracts). Aunque no tengo estadísticas sobre la frecuencia con la que esto sucede, [un incidente podría haber costado 20.000.000 de tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Prevención de transferencias {#preventing-transfers}

En el contrato ERC-20 de OpenZeppelin, cada cambio en los saldos, ya sea una transferencia, una acuñación o una quema, pasa por [una función interna, `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-). Podemos sobrescribirla para agregarle nuestra propia funcionalidad, como comprobaciones que reviertan si hay un problema.

Para hacerlo, agregue esta función después del constructor:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

Algunas partes de esta función pueden ser nuevas si no está muy familiarizado con Solidity:

```solidity
        internal virtual
```

La palabra clave `virtual` significa que, al igual que heredamos la funcionalidad de `ERC20` y sobrescribimos esta función, otros contratos pueden heredar de nosotros y sobrescribir esta función.

```solidity
        override(ERC20)
```

Tenemos que especificar explícitamente que estamos [sobrescribiendo](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) la definición del token ERC20 de `_update`. En general, las definiciones explícitas son mucho mejores, desde el punto de vista de la seguridad, que las implícitas: no puede olvidar que ha hecho algo si lo tiene justo enfrente. Esa es también la razón por la que necesitamos especificar qué `_update` de la superclase estamos sobrescribiendo.

```solidity
        super._update(from, to, value);
```

Esta línea llama a la función `_update` del contrato o contratos de los que heredamos que la tienen. En este caso, es solo `ERC20`, `Ownable` no tiene esta función. A diferencia de un gancho (hook) vacío, `ERC20._update` es lo que realmente mueve los tokens, por lo que es esencial llamarlo. Nuestras comprobaciones van antes de esta llamada, por lo que pueden revertir antes de cualquier cambio de saldo.

### Codificación de los requisitos {#coding-the-requirements}

Queremos agregar estos requisitos a la función. Debido a que `_update` también se llama cuando se queman tokens, con `to` establecido en `address(0)`, solo comprobamos `to` cuando no es `address(0)`:

- La dirección `to` no puede ser igual a `address(this)`, la dirección del propio contrato ERC-20.
- La dirección `to` no puede estar vacía, tiene que ser:
  - Una cuenta de propiedad externa (EOA). No podemos comprobar si una dirección es una EOA directamente, pero podemos comprobar el saldo de ETH de una dirección. Las EOA casi siempre tienen un saldo, incluso si ya no se usan: es difícil vaciarlas hasta el último Wei.
  - Un contrato inteligente. Comprobar si una dirección es un contrato inteligente es un poco más difícil. Hay un código de operación que comprueba la longitud del código externo, llamado [`EXTCODESIZE`](https://www.evm.codes/#3b). En Solidity puede obtenerlo con [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types), que el compilador convierte en `EXTCODESIZE`. Aquí usamos [Yul](https://docs.soliditylang.org/en/latest/yul.html), que es ensamblador de la EVM, para mostrar cómo llamar al código de operación directamente. Tenga en cuenta que desde el [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) una EOA también puede tener código (una delegación a un contrato), por lo que esta comprobación identifica cuentas con código, no estrictamente contratos. Para nuestro propósito, rechazar direcciones vacías, eso está bien.

Aquí está la función completa:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // Quemar envía token (Universally adopted anglicism in the crypto ecosystem.)s a la dirección (A unique hexadecimal identifier (0x...) for an Ethereum account. NOT a physical location.)(0), no lo bloque (A unit of bundled transactions added to the blockchain. NOT a physical block or obstruction.)
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

Repasemos el nuevo código línea por línea:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Este es el primer requisito, comprobar que `to` y `this(address)` no son lo mismo.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Así es como comprobamos si una dirección es un contrato. No podemos recibir la salida directamente de Yul, por lo que en su lugar definimos una variable para almacenar el resultado (`isToContract` en este caso). La forma en que funciona Yul es que cada código de operación se considera una función. Así que primero llamamos a [`EXTCODESIZE`](https://www.evm.codes/#3b) para obtener el tamaño del contrato, y luego usamos [`GT`](https://www.evm.codes/#11) para comprobar que no es cero (estamos tratando con enteros sin signo, así que por supuesto no puede ser negativo). Luego escribimos el resultado en `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Y finalmente, tenemos la comprobación real de direcciones vacías.

## Acceso administrativo {#admin-access}

A veces es útil tener un administrador que pueda deshacer errores. Para reducir el potencial de abuso, este administrador puede ser una [multifirma](https://blog.logrocket.com/security-choices-multi-signature-wallets/) para que varias personas tengan que estar de acuerdo en una acción. En este artículo tendremos dos características administrativas:

1. Congelar y descongelar cuentas. Esto puede ser útil, por ejemplo, cuando una cuenta podría estar comprometida.
2. Limpieza de activos.

   A veces, los estafadores envían tokens fraudulentos al contrato del token real para ganar legitimidad. Por ejemplo, [vea aquí](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). El contrato ERC-20 legítimo es [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). La estafa que pretende serlo es [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   También es posible que la gente envíe tokens ERC-20 legítimos a nuestro contrato por error, lo cual es otra razón para querer tener una forma de sacarlos.

OpenZeppelin proporciona dos mecanismos para habilitar el acceso administrativo:

- Los contratos [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) tienen un único propietario. Las funciones que tienen el [modificador](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) `onlyOwner` solo pueden ser llamadas por ese propietario. Los propietarios pueden transferir la propiedad a otra persona o renunciar a ella por completo. Los derechos de todas las demás cuentas suelen ser idénticos.
- Los contratos [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) tienen [control de acceso basado en roles (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

En aras de la simplicidad, en este artículo usamos `Ownable`.

### Congelación y descongelación de contratos {#freezing-and-thawing-contracts}

Congelar y descongelar contratos requiere varios cambios:

- Un [mapeo](https://docs.soliditylang.org/en/latest/types.html#mapping-types) de direcciones a [booleanos](https://en.wikipedia.org/wiki/Boolean_data_type) para realizar un seguimiento de qué direcciones están congeladas. Todos los valores son inicialmente cero, lo que para los valores booleanos se interpreta como falso. Esto es lo que queremos porque, por defecto, las cuentas no están congeladas.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Eventos](https://docs.soliditylang.org/en/latest/contracts.html#events) para informar a cualquier interesado cuando una cuenta se congela o descongela. Técnicamente hablando, los eventos no son necesarios para estas acciones, pero ayuda al código fuera de la cadena a poder escuchar estos eventos y saber qué está sucediendo. Se considera de buena educación que un contrato inteligente los emita cuando sucede algo que podría ser relevante para otra persona.

  Los eventos están indexados, por lo que será posible buscar todas las veces que una cuenta ha sido congelada o descongelada.

  ```solidity
    // Cuando las cuenta (A digital identity on Ethereum with an address, balance, and optional code.)s están congeladas o descongeladas
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funciones para congelar y descongelar cuentas. Estas dos funciones son casi idénticas, por lo que solo repasaremos la función de congelación.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Las funciones marcadas como [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) pueden ser llamadas desde otros contratos inteligentes o directamente por una transacción.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // congelarCuenta (A digital identity on Ethereum with an address, balance, and optional code.)
  ```

  Si la cuenta ya está congelada, revertir. De lo contrario, congélela y `emit` un evento.

- Cambie `_update` para evitar que se mueva dinero de una cuenta congelada. Tenga en cuenta que aún se puede transferir dinero a la cuenta congelada. Coloque esta línea al comienzo de la función, fuera del bloque `if`, para que también evite quemar tokens de una cuenta congelada.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Limpieza de activos {#asset-cleanup}

Para liberar los tokens ERC-20 en poder de este contrato, necesitamos llamar a una función en el contrato del token al que pertenecen, ya sea [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) o [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). No tiene sentido desperdiciar gas en este caso en asignaciones (allowances), bien podríamos transferir directamente.

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

Esta es la sintaxis para crear un objeto para un contrato cuando recibimos la dirección. Para usarlo necesitamos [la definición de IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), la interfaz para un contrato ERC-20 de OpenZeppelin. La línea `import {ERC20} from ...` del asistente solo trae `ERC20`, así que agregue esta línea junto a las otras importaciones en la parte superior del archivo:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Esta es una función de limpieza, por lo que presumiblemente no queremos dejar ningún token. En lugar de obtener el saldo del usuario manualmente, bien podríamos automatizar el proceso.

## Conclusión {#conclusion}

Esta no es una solución perfecta: no hay una solución perfecta para el problema de "el usuario cometió un error". Sin embargo, el uso de este tipo de comprobaciones puede al menos evitar algunos errores. La capacidad de congelar cuentas, aunque peligrosa, se puede utilizar para limitar el daño de ciertos hackeos al negar al hacker los fondos robados.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
