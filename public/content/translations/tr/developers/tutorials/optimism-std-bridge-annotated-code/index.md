---
title: "Optimism standart köprü sözleşmesine genel bakış"
description: Optimism için standart köprü nasıl çalışır? Neden bu şekilde çalışıyor?
author: Ori Pomerantz
tags:
  - "solidity"
  - "köprü"
  - "katman 2"
skill: intermediate
published: 2022-03-30
lang: tr
---

[Optimism](https://www.optimism.io/), bir [İyimser Toplamadır](/developers/docs/scaling/optimistic-rollups/). İyimser toplamalar, işlemleri Ethereum Mainnet'ten (katman 1 veya K1 olarak da bilinir) çok daha düşük bir fiyata işleyebilir çünkü işlemler ağdaki her düğüm yerine yalnızca birkaç düğüm tarafından işlenir. Aynı zamanda, verilerin tümü K1'e yazılır, böylece her şey kanıtlanabilir ve Mainnet'in tüm bütünlük ve kullanılabilirlik garantileriyle yeniden yapılandırılabilir.

Optimism'de (veya başka herhangi bir K2'de) K1 varlıklarını kullanmak için varlıkların [köprülenmesi](/bridges/#prerequisites) gerekir. Kullanıcıların varlıkları (ETH ve [ERC-20 token'ları](/developers/docs/standards/tokens/erc-20/) en yaygın olanlardır) L1'de kilitlemesi ve L2'de eş değer varlıklar alması bunu başarmanın yollarından biridir. Nihayetinde bu varlıkları alan kişiler bunları tekrar K1'e köprülemek isteyebilir. Bunu yaparken, varlıklar K2'de yakılır ve ardından K1'de kullanıcıya geri verilir.

[Optimism standart köprüsü](https://community.optimism.io/docs/developers/bridge/standard-bridge) bu şekilde çalışır. Bu makalede, nasıl çalıştığını görmek için bu köprünün kaynak kodunu gözden geçireceğiz ve onu iyi yazılmış bir Solidity kodu örneği olarak inceleyeceğiz.

## Kontrol akışları {#control-flows}

Köprünün iki ana akışı vardır:

- Yatırma (K1'den K2'ye)
- Çekme (K2'den K1'e)

### Yatırma akışı {#deposit-flow}

#### Katman 1 {#deposit-flow-layer-1}

1. Bir ERC-20 yatırılıyorsa, yatırımcı köprüye yatırılan tutarı harcaması için bir ödenek verir
2. Yatıran, K1 köprüsünü (`depositERC20`, `depositERC20To`, `depositETH` veya `depositETHTo`) çağırır
3. K1 köprüsü, köprülenen varlığın sahibi olur
   - ETH: Varlık, çağrının bir parçası olarak yatıran tarafından aktarılır
   - ERC-20: Varlık, yatıran tarafından sağlanan ödenek kullanılarak köprü tarafından kendisine devredilir
4. K1 köprüsü, K2 köprüsünde `finalizeDeposit`'i çağırmak için etki alanları arası mesaj mekanizmasını kullanır

#### Katman 2 {#deposit-flow-layer-2}

5. Katman 2 köprüsü, `finalizeDeposit` çağrısının meşru olduğunu doğrular:
   - Etki alanları arası mesaj sözleşmesinden geldi
   - Aslen K1'deki köprüdendi
6. K2 köprüsü, K2 üzerindeki ERC-20 token sözleşmesinin doğru olup olmadığını kontrol eder:
   - K2 sözleşmesi, K1 karşılığının, token'ların K1'den geldiği ile aynı olduğunu bildiriyor
   - K2 sözleşmesi, doğru arayüzü ([ERC-165 kullanarak](https://eips.ethereum.org/EIPS/eip-165)) desteklediğini bildirir.
7. K2 sözleşmesi doğruysa, uygun adrese uygun sayıda token basması için onu çağırın. Değilse, kullanıcının K1'deki token'ları talep etmesine izin vermek için bir para çekme işlemi başlatın.

### Çekme akışı {#withdrawal-flow}

#### Katman 2 {#withdrawal-flow-layer-2}

1. Çeken kişi K2 köprüsünü çağırır (`draw` veya `withdrawTo`)
2. K2 köprüsü, `msg.sender`'a ait uygun sayıda token'ı yakar
3. K2 köprüsü, K1 köprüsünde `finalizeETHWithdrawal` veya `finalizeERC20Withdrawal`'ı çağırmak için etki alanları arası mesaj mekanizmasını kullanır

#### Katman 1 {#withdrawal-flow-layer-1}

4. K1 köprüsü, `finalizeETHWithdrawal` veya `finalizeERC20Withdrawal` çağrısının meşru olduğunu doğrular:
   - Etki alanları arası mesaj mekanizmasından geldi
   - Aslen K2'deki köprüdendi
5. K1 köprüsü, uygun varlığı (ETH veya ERC-20) uygun adrese aktarır

## Katman 1 kodu {#layer-1-code}

Bu, Ethereum Mainnet K1 üzerinde çalışan koddur.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Bu arayüz burada tanımlanmıştır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol). ERC-20 token'larını köprülemek için gereken fonksiyonları ve tanımları içerir.

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism'in kodunun çoğu MIT lisansı altında yayınlandı](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Yazım sırasında Solidity'nin en son sürümü 0.8.12'dir. Sürüm 0.9.0 yayınlanana kadar, bu kodun onunla uyumlu olup olmadığını bilemeyiz.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

Optimism köprü terminolojisinde _yatırmak_, K1'den K2'ye transfer anlamına, _çekmek_ K2'den K1'e transfer anlamına gelir.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Çoğu durumda K1 üzerindeki bir ERC-20 adresi aynı ERC-20'nin K2'deki adresinin aynısı değildir. [Burada token adreslerinin bir listesini görebilirsiniz](https://static.optimism.io/optimism.tokenlist.json). `chainId`'si 1 olan adres K1'de (Mainnet) ve `chainId`'si 10 olan ise K2'de (Optimism). Diğer iki `chainId` değerleri ise Kovan test ağı (42) ve Optimistic Kovan test ağı içindir (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Transferlere notlar eklemek mümkündür, bu durumda notlar onları rapor eden olaylara eklenirler.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Aynı köprü sözleşmesi her yönde transferleri idare eder. K1 köprüsünün durumunda ise bu, yatırımların başlatımı ve çekimlerin sonlandırılması anlamına gelir.

```solidity

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev get the address of the corresponding L2 bridge contract.
     * @return Address of the corresponding L2 bridge contract.
     */
    function l2TokenBridge() external returns (address);
```

Bu fonksiyona pek gerek duyulmaz, çünkü K2 üzerinde önden dağıtılmış bir sözleşmedir, yani her zaman `0x4200000000000000000000000000000000000010` adresindedir. Burada K2 köprüsüyle simetri için bulunur, çünkü K1 köprüsünün adresinin bilinmesi _önemlidir_.

```solidity
    /**
     * @dev deposit an amount of the ERC20 to the caller's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to deposit
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` parametresi işlemin harcamasına izin verilen K2 gaz miktarıdır. [Belirli (yüksek) bir limite kadar bu ücretsizdir](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), yani basım esnasında ERC-20 sözleşmesi gerçekten garip bir şey yapmazsa bu bir sorun olmamalı. Bu fonksiyon, yaygın bir senaryo olan kullanıcının farklı bir blok zincirindeki aynı adrese varlık köprülemesinin üstesinden gelir.

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Bu fonksiyon neredeyse `depositERC20` ile özdeştir, ama farklı bir adrese ERC-20 yollamanıza izin verir.

```solidity
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Optimism'de çekme işlemleri (ve K2'den K1'e diğer tüm mesajlar) iki adımlı bir süreçtir:

1. K2 üzerinde başlatıcı işlem.
2. K1 üzerinde sonlandırıcı veya talep eden bir işlem. Bu işlemin, biten K2 işlemi için olan [hata meydan okuması süresinden](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) sonra gerçekleşmesi gerekir.

### IL1StandardBridge {#il1standardbridge}

[Bu arayüz burada tanımlanmıştır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol). Bu dosya ETH için olay ve fonksiyon tanımlamalarını içerir. Bu tanımlamalar ERC-20 için yukarıdaki `IL1ERC20Bridge`'de belirlenenlere gayet benzerler.

Bazı ERC-20 token'ları özel işlem gerektirdiği ve standart köprü tarafından idare edilemedikleri için köprü arayüzü iki dosyaya bölünmüştür. Bu yolla bu tarz bir token'ı idare eden özel köprü `IL1ERC20Bridge`'i örnek alabilir ve ETH köprülemek zorunda kalmaz.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Bu olay ERC-20 versiyonunun (`ERC20DepositInitiated`) neredeyse aynısıdır, tek fark K1 ve K2 token adreslerinin olmamasıdır. Aynısı diğer olaylar ve fonksiyonlar için de geçerlidir.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Bu sözleşme](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) iki köprü tarafından da ([K1](#the-l1-bridge-contract) ve [K2](#the-l2-bridge-contract)) diğer katmana mesajlar göndermek için kalıtım ile alınmıştır.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Bu arayüz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol), sözleşmeye alan adları arası mesajcısını kullanarak nasıl diğer katmana mesaj göndereceğini anlatır. Alan adları arası mesajcısı tamamen başka bir sistemdir ve gelecekte yazmayı umduğum kendine özel bir makaleyi hak ediyor.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Diğer etki alanından mesaj göndermek ve almak için kullanılan Messenger sözleşmesi.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Sözleşmenin bilmesi gereken bir parametre, bu katmandaki alan adları arası mesajcısının adresidir. Bu parametre bir defa yapıcıda belirlenir ve asla değişmez.

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Alan adları arası mesajlaşması, çalıştığı blok zincirindeki (ya Ethereum ana ağı ya da Optimism) herhangi bir sözleşmeden erişilebilirdir. Ancak belirli mesajlara _sadece_ öbür taraftaki köprüden gelirse güvenmek için iki tarafta da köprüye ihtiyacımız vardır.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Sadece uygun alan adları arası mesajcısından (`messenger`, aşağıda gördüğünüz üzere) gelen mesajlara güvenilebilir.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Alan adları arası mesajcısının diğer katman ile mesaj gönderen adresi sağlama yolu, [`.xDomainMessageSender()` fonksiyonudur](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128). Mesaj tarafından başlatılan işlemde çağrıldığı sürece bu bilgiyi sağlayabilir.

Aldığımız mesajın öbür köprüden geldiğinden emin olmalıyız.

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Bu fonksiyon alan adları arası mesajcısını döndürür. Bundan kalıtım ile alan sözleşmelerin, hangi alan adı arası mesajcının kullanılacağını belirtmeleri için bir algoritma kullanmasına izin vermek için `messenger` değişkeni yerine bir fonksiyon kullanıyoruz.

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Son olarak, fonksiyon diğer katmana bir mesaj gönderir.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) Optimism'in güvenlik açığı ve diğer potansiyel problemleri bulmak için her sözleşmede çalıştırdığı bir statik analizcidir. Bu durumda, sıradaki satır iki açığı tetikler:

1. [Yeniden giriş olayları](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [İyi huylu yeniden giriş](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Bu durumda yeniden giriş hakkında kaygılı değiliz, Slither'ın bunu bilmesi mümkün olmasa bile `getCrossDomainMessenger()` öğesinin güvenilir bir adres döndürdüğünü biliyoruz.

### K1 köprü sözleşmesi {#the-l1-bridge-contract}

[Bu sözleşmenin kaynak kodu buradadır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Arayüzler diğer sözleşmelerin bir parçası olabilirler, yani geniş aralıkta Solidity sürümlerini desteklemeleri gerekir. Ancak köprü bizim sözleşmemizdir, ve hangi Solidity sürümünü kullandığı hakkında katı davranabiliriz.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) ve [IL1StandardBridge](#IL1StandardBridge) yukarıda açıklanmıştır.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Bu arayüz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) K2 üzerindeki standart köprüyü kontrol etmek için mesajlar oluşturmamızı sağlar.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Bu arayüz](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ERC-20 sözleşmelerini kontrol etmemizi sağlar. [Onun hakkında dahasını burada okuyabilirsiniz](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Yukarıda açıklandığı gibi](#crossdomainenabled), bu sözleşme katmanlar arası mesajlaşma için kullanılır.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) her zaman aynı adrese sahip olan K2 sözleşmelerinin adreslerine sahiptir. Buna K2 üzerindeki standart köprü de dahildir.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin'in Address yardımcı araçları](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Sözleşme adresleri ve harici olarak sahiplenilmiş hesapların (EOA) ayrımını yapmak için kullanılır.

Bunun mükemmel bir çözüm olmadığını unutmayın. Bir sözleşmenin yapıcısı tarafından yapılan çağrılar ve doğrudan çağrıların ayrımını yapmanın bir yolu yoktur ama bu en azından bazı yaygın kullanıcı hatalarını tespit etmemizi ve önlememizi sağlar.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 standardı](https://eips.ethereum.org/EIPS/eip-20) biz sözleşmenin hata bildirmesi için iki yolu destekler:

1. Geri döndür
2. `false` döndürme

Her iki durumu da ele almak kodumuzu daha karmaşık hâle getirecektir, bu nedenle [OpenZeppelin'in `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)'sini kullanıyoruz, bu da [tüm hataların bir geri dönüşle sonuçlanmasını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) sağlar.

```solidity
/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Bu satır `IERC20` arayüzünü her kullandığımızda `SafeERC20` paketleyicisini kullanmasını belirtme yöntemimizdir.

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) adresi.

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

Bunun gibi bir çift [eşleştirme](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), [iki boyutlu bir seyrek diziyi](https://en.wikipedia.org/wiki/Sparse_matrix) tanımlama şeklinizdir. Bu veri yapısındaki değerler `deposit[L1 token addr][L2 token addr]` olarak tanımlanır. Varsayılan değer sıfırdır. Yalnızca farklı bir değere ayarlanmış hücreler depolamaya yazılır.

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

Depodaki tüm değişkenleri kopyalamak zorunda kalmadan bu sözleşmeyi yükseltebilmek istiyoruz. Bunu yapmak için bir [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) kullanıyoruz. Bu, çağrıları adresi proxy sözleşmesi tarafından saklanan ayrı bir kişiye aktarmak için [`delegatecall`](https://solidity-by-example.org/delegatecall/) kullanan bir sözleşmedir (yükselttiğinizde proxy'ye bu adresi değiştirmesini söylersiniz). `delegatecall` kullandığınızda, depolama alanı _çağırma_ sözleşmesinin deposu olarak kalır, bu nedenle tüm sözleşme durumu değişkenlerinin değerleri etkilenmez.

`delegecall`'un _callee_'si olan sözleşmenin depolamasının kullanılmaması ve bu nedenle ona iletilen oluşturucu değerlerinin önemli olmaması, bu modelin etkilerinden birisidir. `CrossDomainEnabled` yapıcısına anlamsız bir değer sağlayabilmemizin nedeni budur. Aşağıdaki başlatmanın yapıcıdan ayrı olmasının nedeni de budur.

```solidity
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
```

Bu [Slither testi](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external), sözleşme kodundan çağrılır ve bu nedenle `public` yerine `external` olarak bildirilebilir. `external` fonksiyonların kullanım maliyeti, çağrı verilerinde parametrelerle sağlanabildikleri için daha düşük olabilir. `public` olarak tanımlanan fonksiyonlara sözleşme içinden erişilebilir olmalıdır. Sözleşmeler kendi çağrı verilerini değiştiremez, bu nedenle parametrelerin bellekte olması gerekir. Böyle bir fonksiyon harici olarak çağrıldığında, çağrı verilerini belleğe kopyalamak gerekir ve bu da gaz maliyetine neden olur. Bu durumda fonksiyon sadece bir kez çağrılır, bu nedenle verimsizlik bizim için önemli değildir.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` fonksiyonu yalnızca bir kez çağrılmalıdır. K1 alan adları arası mesajcısının veya K2 token köprüsünün adresi değişirse, yeni bir proxy ve onu çağıran yeni bir köprü oluştururuz. Bunun, çok nadir gerçekleşen tüm sistemin yükseltilmesi dışında gerçekleşmesi pek olası değildir.

Bu fonksiyonun, onu _kimin_ arayabileceğini kısıtlayan herhangi bir mekanizmaya sahip olmadığını unutmayın. Bu, teorik olarak bir saldırganın biz proxy'yi ve köprünün ilk sürümünü dağıtana kadar bekleyebileceği ve ardından meşru kullanıcıdan önce `initialize` fonksiyonuna ulaşmak için [front-run](https://solidity-by-example.org/hacks/front-running/) yapabileceği anlamına gelir. Ancak bunu önlemenin iki yöntemi vardır:

1. Sözleşmeler doğrudan bir EOA tarafından değil de [onları oluşturan başka bir sözleşmeye sahip olan bir işlemde](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) dağıtılırsa tüm süreç atomik olabilir ve başka herhangi bir işlem yürütülmeden önce tamamlanabilir.
2. Geçerli `initialize` çağrısı başarısız olursa, yeni oluşturulan proxy ve köprüyü yok saymak ve yenilerini oluşturmak her zaman mümkündür.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Bunlar, köprünün bilmesi gereken iki parametredir.

```solidity

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Bu, OpenZeppelin'in `Address` yardımcı araçlarına ihtiyaç duymamızın nedenidir.

```solidity
    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Bu fonksiyon test amaçlı mevcuttur. Arayüz tanımlarında görünmediğine dikkat edin: Normal kullanım için değildir.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Bu iki fonksiyon, gerçek ETH yatırma işlemini yöneten fonksiyon olan `_initiateETHDeposit` etrafındaki paketleyicilerdir.

```solidity
    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
```

Etki alanları arası mesajların çalışma şekli, hedef sözleşmenin çağrı verileri olarak mesajla birlikte çağrılmasıdır. Solidity sözleşmeleri, çağrı verilerini her zaman aşağıdaki [ABI özelliklerine](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) uygun olarak yorumlar. [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) Solidity fonksiyonu, bu çağrı verilerini oluşturur.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

Buradaki mesaj, şu parametrelerle [`finalizeDeposit` fonksiyonunu](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) çağırmaktır:

| Parametre | Değer                          | Anlam                                                                                                                                           |
| --------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | K1'de ETH'yi (ERC-20 token'ı değildir) temsil eden özel değer                                                                                   |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Optimism'de ETH'yi yöneten K2 sözleşmesi, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (bu sözleşme yalnızca dahili Optimism kullanımı içindir) |
| \_from    | \_from                         | ETH'yi gönderen K1 üzerindeki adres                                                                                                             |
| \_to      | \_to                           | ETH'yi alan K2'deki adres                                                                                                                       |
| amount    | msg.value                      | Gönderilen wei miktarı (zaten köprüye gönderildi)                                                                                               |
| \_data    | \_data                         | Yatırmaya eklenecek ek tarih                                                                                                                    |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Mesajı, alan adları arası mesajcısı ile gönderin.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Bu transferi dinleyen herhangi bir merkeziyetsiz uygulamayı bilgilendirmek için bir olay yayınlayın.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
        .
        .
        .
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
        .
        .
        .
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Bu iki fonksiyon, gerçek ERC-20 yatırma işlemini yöneten fonksiyon olan `_initiateERC20Deposit` etrafındaki paketleyicilerdir.

```solidity
    /**
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g. transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Bu fonksiyon, birkaç önemli farklılık dışında yukarıdaki `_initiateETHDeposit` fonksiyonuna benzer. İlk fark, bu fonksiyonun token adreslerini ve aktarılacak miktarı parametre olarak almasıdır. ETH söz konusu olduğunda köprüye yapılan çağrı, varlığın köprü hesabına (`msg.value`) transferini zaten içerir.

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 token transferleri, ETH'den farklı bir süreci takip eder:

1. Kullanıcı (`_from`), köprüye uygun token'ları aktarması için bir izin verir.
2. Kullanıcı, token sözleşmesinin adresi, miktarı vb. ile birlikte köprüyü çağırır.
3. Köprü, token'ları yatırma işleminin bir parçası olarak (kendisine) aktarır.

İlk adım, son ikisinden ayrı bir işlemde gerçekleşebilir. Ancak `_initiateERC20Deposit` çağıran iki fonksiyon, (`depositERC20` ve `DepositERC20To`), bu fonksiyonu `_from` parametresi olarak yalnızca `msg.sender` ile çağırdığından, front-running bir sorun olmaz.

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Yatırılan token miktarını `deposits` veri yapısına ekleyin. K2'de aynı K1 ERC-20 token'ına karşılık gelen birden fazla adres olabilir, bu nedenle yatırma işlemlerini takip etmek için köprünün K1 ERC-20 token bakiyesini kullanmak yeterli değildir.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

K2 köprüsü, K2 alan adları arası mesajcısına, K1 alan adları arası mesajcısının bu fonksiyonu çağırmasına neden olan bir mesaj gönderir (bir kez [mesajı sonlandıran işlem](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) elbette K1'de gönderilir).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Bunun _meşru_ bir mesaj olduğundan, alan adları arası mesajcısından gelen ve K2 token köprüsünden kaynaklanan bir mesaj olduğundan emin olun. Bu fonksiyon, ETH'yi köprüden çekmek için kullanılır, bu nedenle yalnızca yetkili arayan tarafından çağrıldığından emin olmalıyız.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH aktarmanın yolu, alıcıyı `msg.value` içindeki wei miktarıyla aramaktır.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Çekme işlemi ile ilgili bir olay yayınlayın.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Bu fonksiyon, ERC-20 token'ları için gerekli değişikliklerle birlikte yukarıdaki `finalizeETHWithdrawal` fonksiyonuna benzer.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` veri yapısını güncelleyin.

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

Köprünün daha önce bir uygulaması vardı. Uygulamadan buna geçtiğimizde, tüm varlıkları taşımak zorunda kaldık. ERC-20 token'ları sadece taşınabilir. Ancak, ETH'yi bir sözleşmeye aktarmak için o sözleşmenin onayına ihtiyacınız var ve bu da `donateETH`'in bize sağladığı şeydir.

## K2 üzerinde ERC-20 Token'ları {#erc-20-tokens-on-l2}

Bir ERC-20 token'ının standart köprüye sığması için standart köprünün, _sadece ama sadece_ standart köprünün token basmasına izin vermesi gerekir. Bu, köprülerin Optimism üzerinde dolaşan token sayısının K1 köprü sözleşmesi içinde kilitli token sayısına eşit olduğundan emin olması gerektiği için gereklidir. K2'de çok fazla token varsa, bazı kullanıcılar varlıklarını K1'e geri köprüleyemez. Güvenilir bir köprü yerine, esasen [kısmi rezerv bankacılığını](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) yeniden yaratmış olurduk. K1'de çok fazla token varsa, bu token'lardan bazıları köprü sözleşmesinin içinde sonsuza kadar kilitli kalır çünkü K2 token'larını yakmadan onları serbest bırakmanın bir yolu yoktur.

### IL2StandardERC20 {#il2standarderc20}

Standart köprüyü kullanan K2 üzerindeki her ERC-20 token'ının, standart köprünün ihtiyaç duyduğu fonksiyonlara ve olaylara sahip olan [bu arayüzü](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) sağlaması gerekir.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Standart ERC-20 arayüzü](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), `mint` ve `burn` fonksiyonlarını içermez. Bu yöntemler, token'ları oluşturma ve yok etme mekanizmalarını belirsiz bırakan [ERC-20 standardı](https://eips.ethereum.org/EIPS/eip-20) için gerekli değildir.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 arayüzü](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol), bir sözleşmenin hangi fonksiyonları sağladığını belirtmek için kullanılır. [Standardı buradan okuyabilirsiniz](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Bu fonksiyon, bu sözleşmeye köprülenen K1 token'ının adresini sağlar. Ters yönde benzer bir fonksiyonumuz olmadığını unutmayın. Uygulandığında K2 desteğinin planlanıp planlanmadığına bakılmaksızın herhangi bir K1 token'ını köprüleyebilmemiz gerekir.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Token'ları basmak (oluşturmak) ve yakmak (yok etmek) için fonksiyonlar ve olaylar. Köprü, token sayısının doğru (K1'de kilitli token sayısına eşit) olduğundan emin olmak için bu fonksiyonları çalıştırabilen tek varlık olmalıdır.

### L2StandardERC20 {#L2StandardERC20}

[Bu, `IL2StandardERC20` arayüzü uygulamamızdır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol). Bir tür özel mantığa ihtiyacınız yoksa, bunu kullanmalısınız.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 sözleşmesi](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Optimism, mevcut özellikler iyi denetlendiğinde ve varlıkları elinde tutacak kadar güvenilir olması gerektiğinde yeni özellikler icat edilmemesi gerektiğine inanır.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Bunlar, bizim ihtiyaç duyduğumuz ve normalde ERC-20'nin gerektirmediği iki ek yapılandırma parametresidir.

```solidity

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Önce kalıtım ile aldığımız sözleşmenin yapıcısını çağırın (`ERC20(_name, _symbol)`) ve sonra kendi değişkenlerimizi ayarlayın.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) bu şekilde çalışır. Her arayüz, desteklenen bir dizi fonksiyondur ve [özel](https://en.wikipedia.org/wiki/Exclusive_or) veya bu fonksiyonların [ABI fonksiyon seçicilerine](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) ait olarak tanımlanır.

K2 köprüsü, varlıkları gönderdiği ERC-20 sözleşmesinin bir `IL2StandardERC20` olduğundan emin olmak için doğruluk kontrolü olarak ERC-165'i kullanır.

**Not:** Hileli sözleşmenin `supportsInterface` için yanlış yanıtlar vermesini önleyecek hiçbir şey yoktur, bu nedenle bu bir güvenlik mekanizması _değil_, doğruluk kontrol mekanizmasıdır.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Yalnızca K2 köprüsünün varlıkları basmasına ve yakmasına izin verilir.

`_mint` ve `_burn` aslında [OpenZeppelin ERC-20 sözleşmesinde](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) tanımlanmıştır. Bu sözleşme onları harici olarak ifşa etmez, çünkü token'ları basma ve yakma koşulları, ERC-20'yi kullanma yollarının sayısı kadar çeşitlidir.

## K2 Köprü Kodu {#l2-bridge-code}

Bu, Optimism üzerindeki köprüyü çalıştıran koddur. [Bu sözleşmenin kaynağı buradadır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) arayüzü, yukarıda gördüğümüz [K1 eş değerine](#IL1ERC20Bridge) çok benzer. İki önemli fark vardır:

1. K1'de yatırma işlemini başlatır ve çekme işlemlerini sonlandırırsınız. Burada ise çekme işlemlerini başlatır ve yatırma işlemlerini sonlandırırsınız.
2. K1'de ETH ve ERC-20 token'ları arasında ayrım yapmak gerekir. K2'de aynı fonksiyonları her ikisi için de kullanabiliriz çünkü Optimism üzerindeki dahili ETH bakiyeleri, [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://optimistic.etherscan.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) adresiyle bir ERC-20 token'ı olarak işlenir.

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

K1 köprüsünün adresini takip edin. K1 eş değerinin aksine, burada bu değişkene _ihtiyacımız var_. K1 köprüsünün adresi önceden bilinmiyor.

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Bu iki fonksiyon çekme işlemlerini başlatır. K1 token adresini belirtmeye gerek olmadığını unutmayın. K2 token'larının bize K1 eş değerinin adresini söylemesi bekleniyor.

```solidity

    /**
     * @dev Performs the logic for withdrawals by burning the token and informing
     *      the L1 token Gateway of the withdrawal.
     * @param _l2Token Address of L2 token where withdrawal is initiated.
     * @param _from Account to pull the withdrawal from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * @param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

`_from` parametresine _değil_, sahte olması çok daha zor olan (bildiğim kadarıyla imkansız) `msg.sender` parametresine güvendiğimize dikkat edin.

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

K1'de ETH ve ERC-20 arasında ayrım yapmak gerekir.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Bu fonksiyon, `L1StandardBridge` tarafından çağrılır.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Mesajın kaynağının meşru olduğundan emin olun. Bu, fonksiyon `_mint`'i çağırdığı ve köprünün Katman 1'de sahip olduğu token'lar tarafından kapsanmayan token'ları vermek için kullanılabileceği için önemlidir.

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Doğruluk testleri:

1. Doğru arayüz destekleniyor
2. L2 ERC-20 sözleşmesinin Katman 1 adresi, token'ların Katman 1 kaynağıyla eşleşiyor

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Doğruluk testlerini geçerse yatırmayı tamamlayın:

1. Token'ları basma
2. Uygun olayı yayınlama

```solidity
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
```

Bir kullanıcı yanlış Katman 2 token adresini kullanarak tespit edilebilir bir hata yaptıysa, yatırmayı iptal etmek ve tokenları Katman 1'e iade etmek istiyoruz. Bunu Katman 2'den yapabilmemizin tek yolu, hata meydan okuma süresini beklemek zorunda kalacak bir mesaj göndermektir ancak bu, kullanıcı için token'ları kalıcı olarak kaybetmekten çok daha iyidir.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Sonuç {#conclusion}

Standart köprü, varlık aktarımları için en esnek mekanizmadır. Ancak çok genel olduğu için her zaman kullanması en kolay olan mekanizma değildir. Özellikle çekimler için, çoğu kullanıcı meydan okuma süresini beklemeyen ve çekimi sonlandırmak için bir Merkle ispatı gerektirmeyen [üçüncü parti köprüleri](https://www.optimism.io/apps/bridges) kullanmayı tercih eder.

Bu köprüler genellikle Katman 1 üzerinde küçük bir ücret (genelde bir standart köprü çekiminin gaz ücretinden daha azına) için anında sağladıkları varlıklara sahip olarak çalışırlar. Köprü (ya da onu çalıştıran insanlar) Katman 1 varlıklarının azaldığını sezdiğinde Katman 2'den yeteri kadar varlığı aktarır. Bunlar çok büyük çekimler olduğu için, çekim ücreti büyük bir miktar üzerinden amorti edilmiştir ve daha küçük bir yüzdeliktir.

Umarım bu makale katman 2'nin nasıl çalıştığı hakkında dahasını anlamanıza; temiz ve güvenli Solidity kodu yazmanıza yardımcı olmuştur.
