---
title: "Optimism standart köprü sözleşmesine genel bakış"
description: "Optimism için standart köprü nasıl çalışır? Neden bu şekilde çalışıyor?"
author: Ori Pomerantz
tags: [ "katılık", "köprü", "katman 2" ]
skill: intermediate
published: 2022-03-30
lang: tr
---

[Optimism](https://www.optimism.io/) bir [İyimser Toplama](/developers/docs/scaling/optimistic-rollups/) türüdür.
İyimser toplamalar, işlemler ağdaki her düğüm yerine yalnızca birkaç düğüm tarafından işlendiği için Ethereum Ana Ağı'ndan (katman 1 veya K1 olarak da bilinir) çok daha düşük bir fiyata işlem yapabilir.
Aynı zamanda, verilerin tümü K1'e yazılır, böylece her şey Ana Ağ'ın tüm bütünlük ve kullanılabilirlik garantileriyle kanıtlanabilir ve yeniden yapılandırılabilir.

Optimism'de (veya başka herhangi bir K2'de) K1 varlıklarını kullanmak için varlıkların [köprülenmesi](/bridges/#prerequisites) gerekir.
Bunu başarmanın yollarından biri, kullanıcıların K1'de varlıkları (en yaygın olanları ETH ve [ERC-20 token'larıdır](/developers/docs/standards/tokens/erc-20/)) kilitlemesi ve K2'de kullanmak üzere eşdeğer varlıklar almasıdır.
Nihayetinde, bu varlıkları elinde bulunduranlar onları K1'e geri köprülemek isteyebilir.
Bunu yaparken, varlıklar K2'de yakılır ve ardından K1'de kullanıcıya geri verilir.

[Optimism standart köprüsü](https://docs.optimism.io/app-developers/bridging/standard-bridge) bu şekilde çalışır.
Bu makalede, nasıl çalıştığını görmek için söz konusu köprünün kaynak kodunu gözden geçirecek ve onu, iyi yazılmış bir Solidity kodu örneği olarak inceleyeceğiz.

## Kontrol akışları {#control-flows}

Köprünün iki ana akışı vardır:

- Yatırma (K1'den K2'ye)
- Çekme (K2'den K1'e)

### Yatırma akışı {#deposit-flow}

#### Katman 1 {#deposit-flow-layer-1}

1. Bir ERC-20 yatırılırken, yatıran kişi köprüye yatırılan tutarı harcaması için bir izin verir.
2. Yatıran kişi K1 köprüsünü çağırır (`depositERC20`, `depositERC20To`, `depositETH` veya `depositETHTo`)
3. K1 köprüsü köprülenen varlığın mülkiyetini alır.
   - ETH: Varlık, çağrının bir parçası olarak yatıran kişi tarafından aktarılır.
   - ERC-20: Varlık, yatıran kişi tarafından sağlanan izni kullanarak köprü tarafından kendisine aktarılır.
4. K1 köprüsü, K2 köprüsünde `finalizeDeposit` fonksiyonunu çağırmak için alanlar arası mesaj mekanizmasını kullanır.

#### Katman 2 {#deposit-flow-layer-2}

5. K2 köprüsü, `finalizeDeposit` çağrısının meşru olduğunu doğrular:
   - Alanlar arası mesaj sözleşmesinden gelmiştir
   - Aslen K1'deki köprüden gelmiştir
6. K2 köprüsü, K2 üzerindeki ERC-20 token sözleşmesinin doğru olup olmadığını kontrol eder:
   - K2 sözleşmesi, K1'deki karşılığının, token'ların K1'den geldiği sözleşmeyle aynı olduğunu bildirir.
   - K2 sözleşmesi, doğru arayüzü desteklediğini bildirir ([ERC-165](https://eips.ethereum.org/EIPS/eip-165) kullanarak).
7. K2 sözleşmesi doğruysa, uygun adrese uygun sayıda token basması için bu sözleşme çağrılır. Değilse, kullanıcının K1'deki token'ları talep etmesine olanak tanıyan bir çekme işlemi başlatılır.

### Çekme akışı {#withdrawal-flow}

#### Katman 2 {#withdrawal-flow-layer-2}

1. Çekme işlemini yapan kişi K2 köprüsünü çağırır (`withdraw` veya `withdrawTo`)
2. K2 köprüsü, `msg.sender`'a ait uygun sayıda token'ı yakar.
3. K2 köprüsü, K1 köprüsünde `finalizeETHWithdrawal` veya `finalizeERC20Withdrawal` fonksiyonlarını çağırmak için alanlar arası mesaj mekanizmasını kullanır.

#### Katman 1 {#withdrawal-flow-layer-1}

4. K1 köprüsü, `finalizeETHWithdrawal` veya `finalizeERC20Withdrawal` çağrısının meşru olduğunu doğrular:
   - Alanlar arası mesaj mekanizmasından gelmiştir
   - Aslen K2'deki köprüden gelmiştir
5. K1 köprüsü, uygun varlığı (ETH veya ERC-20) uygun adrese aktarır.

## Katman 1 kodu {#layer-1-code}

Bu, K1'de, yani Ethereum Ana Ağı'nda çalışan koddur.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Bu arayüz burada tanımlanmıştır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
ERC-20 token'larını köprülemek için gereken fonksiyonları ve tanımları içerir.

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism'in kodlarının çoğu MIT lisansı altında yayınlanmıştır](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Bu yazı yazıldığı sırada Solidity'nin en son sürümü 0.8.12'dir.
Sürüm 0.9.0 yayınlanana kadar bu kodun onunla uyumlu olup olmadığını bilemeyiz.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Olaylar *
     **********/

    event ERC20DepositInitiated(
```

Optimism köprü terminolojisinde _yatırma_ işlemi K1'den K2'ye transfer, _çekme_ işlemi ise K2'den K1'e transfer anlamına gelir.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Çoğu durumda bir ERC-20'nin K1'deki adresi, K2'deki eşdeğer ERC-20'nin adresiyle aynı değildir.
[Token adreslerinin listesini buradan görebilirsiniz](https://static.optimism.io/optimism.tokenlist.json).
`chainId`'si 1 olan adres K1'de (Ana Ağ), `chainId`'si 10 olan adres ise K2'dedir (Optimism).
Diğer iki `chainId` değeri Kovan test ağı (42) ve Optimistic Kovan test ağı (69) içindir.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Transferlere not eklemek mümkündür, bu durumda bu notlar onları bildiren olaylara eklenir.

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

Aynı köprü sözleşmesi her iki yöndeki transferleri de yönetir.
K1 köprüsü söz konusu olduğunda bu, yatırma işlemlerinin başlatılması ve çekme işlemlerinin sonlandırılması anlamına gelir.

```solidity

    /********************
     * Herkese Açık Fonksiyonlar *
     ********************/

    /**
     * @dev ilgili K2 köprü sözleşmesinin adresini alır.
     * @return İlgili K2 köprü sözleşmesinin adresi.
     */
    function l2TokenBridge() external returns (address);
```

Bu fonksiyona aslında gerek yoktur çünkü K2'de bu, önceden dağıtılmış bir sözleşmedir ve bu nedenle her zaman `0x4200000000000000000000000000000000000010` adresindedir.
K1 köprüsünün adresini bilmek kolay olmadığından, bu fonksiyon K2 köprüsüyle simetri sağlamak için buradadır.

```solidity
    /**
     * @dev bir miktar ERC20'yi K2'deki arayanın bakiyesine yatırır.
     * @param _l1Token Yatırmakta olduğumuz K1 ERC20'sinin adresi
     * @param _l2Token İlgili K2 ERC20'sinin adresi
     * @param _amount Yatırılacak ERC20 miktarı
     * @param _l2Gas K2'de yatırma işlemini tamamlamak için gereken gaz limiti.
     * @param _data K2'ye iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici sözleşmeler için bir kolaylık olarak sağlanır. Maksimum
     *        uzunluğu zorunlu kılmanın yanı sıra, bu sözleşmeler içeriği hakkında hiçbir garanti vermez.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` parametresi, işlemin harcamasına izin verilen K2 gazı miktarıdır.
[Belirli bir (yüksek) sınıra kadar bu ücretsizdir](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), bu nedenle ERC-20 sözleşmesi basım sırasında gerçekten garip bir şey yapmadığı sürece bu bir sorun olmamalıdır.
Bu fonksiyon, bir kullanıcının varlıkları farklı bir blokzincirdeki aynı adrese köprülediği yaygın senaryoyu ele alır.

```solidity
    /**
     * @dev bir miktar ERC20'yi K2'deki bir alıcının bakiyesine yatırır.
     * @param _l1Token Yatırmakta olduğumuz K1 ERC20'sinin adresi
     * @param _l2Token İlgili K2 ERC20'sinin adresi
     * @param _to Çekme işleminin yatırılacağı K2 adresi.
     * @param _amount Yatırılacak ERC20 miktarı.
     * @param _l2Gas K2'de yatırma işlemini tamamlamak için gereken gaz limiti.
     * @param _data K2'ye iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici sözleşmeler için bir kolaylık olarak sağlanır. Maksimum
     *        uzunluğu zorunlu kılmanın yanı sıra, bu sözleşmeler içeriği hakkında hiçbir garanti vermez.
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

Bu fonksiyon `depositERC20` ile neredeyse aynıdır, ancak ERC-20'yi farklı bir adrese göndermenize olanak tanır.

```solidity
    /*************************
     * Zincirler Arası Fonksiyonlar *
     *************************/

    /**
     * @dev K2'den K1'e bir çekme işlemini tamamlar ve fonları alıcının
     * K1 ERC20 token bakiyesine yatırır.
     * K2'den başlatılan çekme işlemi sonlandırılmamışsa bu çağrı başarısız olur.
     *
     * @param _l1Token finalizeWithdrawal işleminin yapılacağı K1 token'ının adresi.
     * @param _l2Token Çekme işleminin başlatıldığı K2 token'ının adresi.
     * @param _from Transferi başlatan K2 adresi.
     * @param _to Çekme işleminin yatırılacağı K1 adresi.
     * @param _amount Yatırılacak ERC20 miktarı.
     * @param _data K2'deki gönderici tarafından sağlanan veri. Bu veri
     *   yalnızca harici sözleşmeler için bir kolaylık olarak sağlanır. Maksimum
     *   uzunluğu zorunlu kılmanın yanı sıra, bu sözleşmeler içeriği hakkında hiçbir garanti vermez.
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

Optimism'de çekme işlemleri (ve K2'den K1'e diğer mesajlar) iki adımlı bir süreçtir:

1. K2'de bir başlatma işlemi.
2. K1'de bir sonlandırma veya talep etme işlemi.
   Bu işlemin, K2 işlemi için [hata itiraz süresi](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) sona erdikten sonra gerçekleşmesi gerekir.

### IL1StandardBridge {#il1standardbridge}

[Bu arayüz burada tanımlanmıştır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Bu dosya, ETH için olay ve fonksiyon tanımlarını içerir.
Bu tanımlar, yukarıda ERC-20 için `IL1ERC20Bridge` içinde tanımlananlara çok benzer.

Köprü arayüzü iki dosyaya bölünmüştür çünkü bazı ERC-20 token'ları özel işlem gerektirir ve standart köprü tarafından işlenemez.
Bu şekilde, böyle bir token'ı işleyen özel köprü, `IL1ERC20Bridge`'i uygulayabilir ve ayrıca ETH köprülemek zorunda kalmaz.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Olaylar *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Bu olay, K1 ve K2 token adresleri dışında ERC-20 sürümüyle (`ERC20DepositInitiated`) neredeyse aynıdır.
Aynısı diğer olaylar ve fonksiyonlar için de geçerlidir.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Herkese Açık Fonksiyonlar *
     ********************/

    /**
     * @dev Bir miktar ETH'yi K2'deki çağıranın bakiyesine yatırır.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Bir miktar ETH'yi K2'deki bir alıcının bakiyesine yatırır.
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
     * Zincirler Arası Fonksiyonlar *
     *************************/

    /**
     * @dev K2'den K1'e bir çekme işlemini tamamlar ve fonları alıcının
     * K1 ETH token bakiyesine yatırır. Bu fonksiyonu yalnızca xDomainMessenger çağırabildiğinden, çekme işlemi
     * sonlandırılmadan asla çağrılmaz.
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

[Bu sözleşme](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol), diğer katmana mesaj göndermek için her iki köprü ([K1](#the-l1-bridge-contract) ve [K2](#the-l2-bridge-contract)) tarafından miras alınır.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Arayüz İçe Aktarmaları */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Bu arayüz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol), alanlar arası mesajcıyı kullanarak sözleşmeye diğer katmana nasıl mesaj gönderileceğini bildirir.
Bu alanlar arası mesajcı tamamen ayrı bir sistemdir ve gelecekte yazmayı umduğum kendi makalesini hak etmektedir.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Alanlar arası iletişim gerçekleştiren sözleşmeler için yardımcı sözleşme
 *
 * Kullanılan derleyici: miras alan sözleşme tarafından tanımlanır
 */
contract CrossDomainEnabled {
    /*************
     * Değişkenler *
     *************/

    // Diğer alandan mesaj göndermek ve almak için kullanılan Mesajcı sözleşmesi.
    address public messenger;

    /***************
     * Yapıcı *
     ***************/

    /**
     * @param _messenger Mevcut katmandaki CrossDomainMessenger'ın adresi.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Sözleşmenin bilmesi gereken tek parametre, bu katmandaki alanlar arası mesajcının adresidir.
Bu parametre yapılandırıcıda bir kez ayarlanır ve asla değişmez.

```solidity

    /**********************
     * Fonksiyon Değiştiricileri *
     **********************/

    /**
     * Değiştirilen fonksiyonun yalnızca belirli bir alanlar arası hesap tarafından çağrılabilir olmasını zorunlu kılar.
     * @param _sourceDomainAccount Kaynak alandaki, bu fonksiyonu çağırmak için
     *  doğrulanmış tek hesap.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Alanlar arası mesajlaşma, çalıştığı blokzincirdeki (Ethereum Ana Ağı veya Optimism) herhangi bir sözleşme tarafından erişilebilirdir.
Ancak her iki taraftaki köprünün de, belirli mesajlara _yalnızca_ diğer taraftaki köprüden geldiklerinde güvenmesi gerekir.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: mesajcı sözleşmesi doğrulanmadı"
        );
```

Yalnızca uygun alanlar arası mesajcıdan (`messenger`, aşağıda gördüğünüz gibi) gelen mesajlara güvenilebilir.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: alanlar arası mesajın yanlış göndericisi"
        );
```

Alanlar arası mesajcının, diğer katmandan bir mesaj gönderen adresi sağlama şekli, [`.xDomainMessageSender()` fonksiyonudur](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Mesaj tarafından başlatılan işlemde çağrıldığı sürece bu bilgiyi sağlayabilir.

Aldığımız mesajın diğer köprüden geldiğinden emin olmalıyız.

```solidity

        _;
    }

    /**********************
     * Dahili Fonksiyonlar *
     **********************/

    /**
     * Genellikle depolamadan mesajcıyı alır. Bu fonksiyon, bir alt sözleşmenin
     * geçersiz kılması gerekmesi durumunda kullanıma sunulur.
     * @return Kullanılması gereken alanlar arası mesajcı sözleşmesinin adresi.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Bu fonksiyon, alanlar arası mesajcıyı döndürür.
Bundan miras alan sözleşmelerin hangi alanlar arası mesajcıyı kullanacağını belirtmek için bir algoritma kullanmasına izin vermek amacıyla `messenger` değişkeni yerine bir fonksiyon kullanırız.

```solidity

    /**
     * Başka bir alandaki bir hesaba mesaj gönderir
     * @param _crossDomainTarget Hedef alandaki amaçlanan alıcı
     * @param _message Hedefe gönderilecek veri (genellikle `onlyFromCrossDomainAccount()` içeren bir fonksiyona
     *  çağrı verisi)
     * @param _gasLimit Hedef alandaki mesajın alınması için gaz limiti.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Son olarak, diğer katmana mesaj gönderen fonksiyon.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither), Optimism'in güvenlik açıklarını ve diğer potansiyel sorunları aramak için her sözleşmede çalıştırdığı bir statik analizördür.
Bu durumda, aşağıdaki satır iki güvenlik açığını tetikler:

1. [Yeniden giriş olayları](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Zararsız yeniden giriş](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Bu durumda yeniden giriş konusunda endişelenmiyoruz çünkü Slither'ın bunu bilmesinin bir yolu olmasa bile `getCrossDomainMessenger()`'ın güvenilir bir adres döndürdüğünü biliyoruz.

### K1 köprü sözleşmesi {#the-l1-bridge-contract}

[Bu sözleşmenin kaynak kodu buradadır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Arayüzler diğer sözleşmelerin bir parçası olabilir, bu nedenle çok çeşitli Solidity sürümlerini desteklemeleri gerekir.
Ancak köprünün kendisi bizim sözleşmemizdir ve hangi Solidity sürümünü kullandığı konusunda katı olabiliriz.

```solidity
/* Arayüz İçe Aktarmaları */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) ve [IL1StandardBridge](#IL1StandardBridge) yukarıda açıklanmıştır.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Bu arayüz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) K2'deki standart köprüyü kontrol etmek için mesajlar oluşturmamızı sağlar.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Bu arayüz](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ERC-20 sözleşmelerini kontrol etmemizi sağlar.
[Buradan daha fazlasını okuyabilirsiniz](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Kütüphane İçe Aktarmaları */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Yukarıda açıklandığı gibi](#crossdomainenabled), bu sözleşme katmanlar arası mesajlaşma için kullanılır.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) her zaman aynı adrese sahip olan K2 sözleşmelerinin adreslerini içerir. Buna K2'deki standart köprü de dahildir.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin'in Adres yardımcı programları](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Sözleşme adresleri ile harici olarak sahip olunan hesaplara (EOA) ait olanlar arasında ayrım yapmak için kullanılır.

Bunun mükemmel bir çözüm olmadığını unutmayın. Bir sözleşmenin yapıcısı tarafından yapılan çağrılar ve doğrudan çağrıların ayrımını yapmanın bir yolu yoktur ama bu en azından bazı yaygın kullanıcı hatalarını tespit etmemizi ve önlememizi sağlar.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 standardı](https://eips.ethereum.org/EIPS/eip-20) bir sözleşmenin hata bildirmesi için iki yolu destekler:

1. Geri Al
2. `false` döndür

Her iki durumu da ele almak kodumuzu daha karmaşık hale getirirdi, bu yüzden bunun yerine [tüm hataların bir geri almaya neden olmasını sağlayan](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) [OpenZeppelin'in `SafeERC20`'sini](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) kullanıyoruz.

```solidity
/**
 * @title L1StandardBridge
 * @dev L1 ETH ve ERC20 Köprüsü, yatırılan L1 fonlarını ve K2'de kullanımda olan standart
 * token'ları saklayan bir sözleşmedir. İlgili bir K2 Köprüsü ile senkronize olur, ona yatırma işlemleri hakkında bilgi verir
 * ve yeni sonuçlandırılan çekme işlemleri için onu dinler.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Bu satır, `IERC20` arayüzünü her kullandığımızda `SafeERC20` sarmalayıcısını kullanmayı nasıl belirlediğimizdir.

```solidity

    /********************************
     * Harici Sözleşme Referansları *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) adresi.

```solidity

    // K1 token'ını K2 token'ına, yatırılan K1 token bakiyesine eşler
    mapping(address => mapping(address => uint256)) public deposits;
```

Bunun gibi çift [eşleme](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), [iki boyutlu seyrek bir dizi](https://en.wikipedia.org/wiki/Sparse_matrix) tanımlama yöntemidir.
Bu veri yapısındaki değerler `deposit[K1 token adresi][K2 token adresi]` olarak tanımlanır.
Varsayılan değer sıfırdır.
Yalnızca farklı bir değere ayarlanmış hücreler depolamaya yazılır.

```solidity

    /***************
     * Yapıcı *
     ***************/

    // Bu sözleşme bir proxy arkasında bulunur, bu nedenle yapıcı parametreleri kullanılmayacaktır.
    constructor() CrossDomainEnabled(address(0)) {}
```

Depolamadaki tüm değişkenleri kopyalamak zorunda kalmadan bu sözleşmeyi yükseltebilmek istiyoruz.
Bunu yapmak için bir [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) kullanıyoruz. Bu, çağrıları adresi proxy sözleşmesi tarafından saklanan ayrı bir sözleşmeye aktarmak için [`delegatecall`](https://solidity-by-example.org/delegatecall/) kullanan bir sözleşmedir (yükselttiğinizde proxy'ye bu adresi değiştirmesini söylersiniz).
`delegatecall` kullandığınızda, depolama alanı çağırma sözleşmesinin deposu olarak kalır, bu nedenle tüm sözleşme durumu değişkenlerinin değerleri etkilenmez.

`delegatecall`'un çağrılanı olan sözleşmenin depolamasının kullanılmaması ve bu nedenle ona iletilen yapıcı değerlerinin önemli olmaması, bu modelin etkilerinden biridir.
`CrossDomainEnabled` yapıcısına anlamsız bir değer sağlayabilmemizin nedeni budur.
Aşağıdaki başlatmanın yapıcıdan ayrı olmasının nedeni de budur.

```solidity
    /******************
     * Başlatma *
     ******************/

    /**
     * @param _l1messenger Zincirler arası iletişim için kullanılan K1 Mesajcı adresi.
     * @param _l2TokenBridge K2 standart köprü adresi.
     */
    // slither-disable-next-line external-function
```

Bu [Slither testi](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external), sözleşme kodundan çağrılmayan ve bu nedenle `public` yerine `external` olarak bildirilebilecek fonksiyonları tanımlar.
`external` fonksiyonların gaz maliyeti, çağrı verilerinde parametrelerle sağlanabildikleri için daha düşük olabilir.
`public` olarak tanımlanan fonksiyonlara sözleşme içinden erişilebilir olmalıdır.
Sözleşmeler kendi çağrı verilerini değiştiremez, bu nedenle parametrelerin bellekte olması gerekir.
Böyle bir fonksiyon harici olarak çağrıldığında, çağrı verilerini belleğe kopyalamak gerekir ve bu da gaz maliyetine neden olur.
Bu durumda fonksiyon sadece bir kez çağrılır, bu nedenle verimsizlik bizim için önemli değildir.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Sözleşme zaten başlatıldı.");
```

`initialize` fonksiyonu yalnızca bir kez çağrılmalıdır.
K1 alanlar arası mesajcısının veya K2 token köprüsünün adresi değişirse, yeni bir proxy ve onu çağıran yeni bir köprü oluştururuz.
Bunun, çok nadir gerçekleşen tüm sistemin yükseltilmesi dışında gerçekleşmesi pek olası değildir.

Bu fonksiyonun, onu kimin arayabileceğini kısıtlayan herhangi bir mekanizmaya sahip olmadığını unutmayın.
Bu, teorik olarak bir saldırganın biz proxy'yi ve köprünün ilk sürümünü dağıtana kadar bekleyebileceği ve ardından meşru kullanıcıdan önce `initialize` fonksiyonuna ulaşmak için [front-run](https://solidity-by-example.org/hacks/front-running/) yapabileceği anlamına gelir. Ancak bunu önlemenin iki yöntemi vardır:

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
     * Yatırma *
     **************/

    /** @dev Göndericinin EOA olmasını gerektiren değiştirici.  Bu kontrol, kötü niyetli bir
     *  sözleşme tarafından initcode aracılığıyla atlatılabilir, ancak kaçınmak istediğimiz kullanıcı hatasını önler.
     */
    modifier onlyEOA() {
        // Sözleşmelerden yatırma işlemlerini durdurmak için kullanılır (yanlışlıkla kaybedilen token'ları önlemek için)
        require(!Address.isContract(msg.sender), "Hesap EOA değil");
        _;
    }
```

OpenZeppelin'in `Address` yardımcı programlarına ihtiyaç duymamızın nedeni budur.

```solidity
    /**
     * @dev Bu fonksiyon, bir miktar ETH'yi çağıranın K2'deki bakiyesine
     * yatırmak için veri olmadan çağrılabilir.
     * Alım fonksiyonu veri almadığından,
     * K2'ye muhafazakar bir varsayılan miktar iletilir.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Bu fonksiyon test amaçlı mevcuttur.
Arayüz tanımlarında görünmediğine dikkat edin: Normal kullanım için değildir.

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

Bu iki fonksiyon, gerçek ETH yatırma işlemini yöneten fonksiyon olan `_initiateETHDeposit` etrafındaki sarmalayıcılardır.

```solidity
    /**
     * @dev ETH'yi saklayarak ve K2 ETH Ağ Geçidi'ne yatırma hakkında bilgi vererek
     * para yatırma mantığını gerçekleştirir.
     * @param _from K1'de para yatırma işleminin çekileceği hesap.
     * @param _to K2'de para yatırma işleminin verileceği hesap.
     * @param _l2Gas K2'de para yatırma işlemini tamamlamak için gereken gaz limiti.
     * @param _data K2'ye iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici sözleşmeler için bir kolaylık olarak sağlanır. Maksimum
     *        uzunluğu zorunlu kılmanın yanı sıra, bu sözleşmeler içeriği hakkında hiçbir garanti vermez.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit çağrısı için çağrı verisi oluştur
        bytes memory message = abi.encodeWithSelector(
```

Alanlar arası mesajların çalışma şekli, hedef sözleşmenin çağrı verileri olarak mesajla birlikte çağrılmasıdır.
Solidity sözleşmeleri, çağrı verilerini her zaman
[ABI özelliklerine](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) uygun olarak yorumlar.
Solidity'nin [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) fonksiyonu bu çağrı verisini oluşturur.

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

Buradaki mesaj, bu parametrelerle [ `finalizeDeposit` fonksiyonunu](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) çağırmaktır:

| Parametre                       | Değer                                                                                    | Anlamı                                                                                                                                                             |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \_l1Token | address(0)                                                            | K1'de ETH'yi (bir ERC-20 token'ı değildir) temsil eden özel değer                                                                               |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Optimism'de ETH'yi yöneten K2 sözleşmesi, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (bu sözleşme yalnızca dahili Optimism kullanımı içindir) |
| \_from    | \_from                                                             | ETH'yi gönderen K1'deki adres                                                                                                                                      |
| \_to      | \_to                                                               | ETH'yi alan K2'deki adres                                                                                                                                          |
| miktar                          | msg.value                                                                | Gönderilen wei miktarı (zaten köprüye gönderildi)                                                                                               |
| \_data    | \_data                                                             | Yatırmaya eklenecek ek veri                                                                                                                                        |

```solidity
        // Çağrı verisini K2'ye gönder
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Mesajı, alanlar arası mesajcısı ile gönderin.

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

Bu iki fonksiyon, gerçek ERC-20 yatırma işlemini yöneten fonksiyon olan `_initiateERC20Deposit` etrafındaki sarmalayıcılardır.

```solidity
    /**
     * @dev K2 Yatırılan Token'ı bilgilendirerek yatırma mantığını gerçekleştirir
     * sözleşmesi ve K1 fonlarını kilitlemek için bir işleyici çağırır. (örneğin, transferFrom)
     *
     * @param _l1Token Yatırmakta olduğumuz K1 ERC20'sinin adresi
     * @param _l2Token İlgili K2 ERC20'sinin adresi
     * @param _from K1'de para yatırma işleminin çekileceği hesap.
     * @param _to K2'de para yatırma işleminin verileceği hesap.
     * @param _amount Yatırılacak ERC20 miktarı.
     * @param _l2Gas K2'de yatırma işlemini tamamlamak için gereken gaz limiti.
     * @param _data K2'ye iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici sözleşmeler için bir kolaylık olarak sağlanır. Maksimum
     *        uzunluğu zorunlu kılmanın yanı sıra, bu sözleşmeler içeriği hakkında hiçbir garanti vermez.
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

Bu fonksiyon, birkaç önemli farklılık dışında yukarıdaki `_initiateETHDeposit` fonksiyonuna benzer.
İlk fark, bu fonksiyonun token adreslerini ve aktarılacak miktarı parametre olarak almasıdır.
ETH söz konusu olduğunda köprüye yapılan çağrı, varlığın köprü hesabına (`msg.value`) transferini zaten içerir.

```solidity
        // K1'de bir yatırma başlatıldığında, K1 Köprüsü gelecekteki
        // para çekme işlemleri için fonları kendisine aktarır. safeTransferFrom ayrıca sözleşmede kod olup olmadığını
        // kontrol eder, bu nedenle _from bir EOA veya address(0) ise bu işlem başarısız olur.
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 token transferleri, ETH'den farklı bir süreci takip eder:

1. Kullanıcı (`_from`), köprüye uygun token'ları aktarması için bir izin verir.
2. Kullanıcı, token sözleşmesinin adresi, miktarı vb. ile birlikte köprüyü çağırır.
3. Köprü, token'ları yatırma işleminin bir parçası olarak (kendisine) aktarır.

İlk adım, son ikisinden ayrı bir işlemde gerçekleşebilir.
Ancak `_initiateERC20Deposit` çağıran iki fonksiyon (`depositERC20` ve `depositERC20To`), bu fonksiyonu `_from` parametresi olarak yalnızca `msg.sender` ile çağırdığından, front-running bir sorun olmaz.

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) için çağrı verisi oluştur
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Çağrı verisini K2'ye gönder
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Yatırılan token miktarını `deposits` veri yapısına ekleyin.
K2'de aynı K1 ERC-20 token'ına karşılık gelen birden fazla adres olabilir, bu nedenle yatırma işlemlerini takip etmek için köprünün K1 ERC-20 token bakiyesini kullanmak yeterli değildir.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Zincirler Arası Fonksiyonlar *
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

K2 köprüsü, K2 alanlar arası mesajcısına, K1 alanlar arası mesajcısının bu fonksiyonu çağırmasına neden olan bir mesaj gönderir (tabii ki, [mesajı sonlandıran işlem](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) K1'de gönderildikten sonra).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Bunun meşru bir mesaj olduğundan, alanlar arası mesajcısından gelen ve K2 token köprüsünden kaynaklanan bir mesaj olduğundan emin olun.
Bu fonksiyon, ETH'yi köprüden çekmek için kullanılır, bu nedenle yalnızca yetkili arayan tarafından çağrıldığından emin olmalıyız.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH aktarmanın yolu, alıcıyı `msg.value` içindeki wei miktarıyla aramaktır.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transferi başarısız");

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
        // K1'de bir çekme sonlandırıldığında, K1 Köprüsü fonları çekene aktarır
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Geçici - ETH Taşıma *
     *****************************/

    /**
     * @dev ETH bakiyesini hesaba ekler. Bu, ETH'nin
     * eski bir ağ geçidinden yeni bir ağ geçidine taşınmasına izin vermek içindir.
     * NOT: Bu, yalnızca bir yükseltme için bırakılmıştır, böylece taşınan ETH'yi
     * eski sözleşmeden alabiliriz
     */
    function donateETH() external payable {}
}
```

Köprünün daha önce bir uygulaması vardı.
Uygulamadan buna geçtiğimizde, tüm varlıkları taşımak zorunda kaldık.
ERC-20 token'ları sadece taşınabilir.
Ancak, ETH'yi bir sözleşmeye aktarmak için o sözleşmenin onayına ihtiyacınız var ve bu da `donateETH`'in bize sağladığı şeydir.

## K2'deki ERC-20 Token'ları {#erc-20-tokens-on-l2}

Bir ERC-20 token'ının standart köprüye sığması için standart köprünün ve _sadece_ standart köprünün token basmasına izin vermesi gerekir.
Bu, köprülerin Optimism üzerinde dolaşan token sayısının K1 köprü sözleşmesi içinde kilitli token sayısına eşit olduğundan emin olması gerektiği için gereklidir.
K2'de çok fazla token varsa, bazı kullanıcılar varlıklarını K1'e geri köprüleyemez.
Güvenilir bir köprü yerine, esasen [kısmi rezerv bankacılığını](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) yeniden yaratmış olurduk.
K1'de çok fazla token varsa, bu token'lardan bazıları köprü sözleşmesinin içinde sonsuza kadar kilitli kalır çünkü K2 token'larını yakmadan onları serbest bırakmanın bir yolu yoktur.

### IL2StandardERC20 {#il2standarderc20}

Standart köprüyü kullanan K2'deki her ERC-20 token'ı, standart köprünün ihtiyaç duyduğu fonksiyonları ve olayları içeren [bu arayüzü](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) sağlamalıdır.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Standart ERC-20 arayüzü](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), `mint` ve `burn` fonksiyonlarını içermez.
Bu yöntemler, token'ları oluşturma ve yok etme mekanizmalarını belirsiz bırakan [ERC-20 standardı](https://eips.ethereum.org/EIPS/eip-20) için gerekli değildir.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 arayüzü](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) bir sözleşmenin hangi fonksiyonları sağladığını belirtmek için kullanılır.
[Standardı buradan okuyabilirsiniz](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Bu fonksiyon, bu sözleşmeye köprülenen K1 token'ının adresini sağlar.
Ters yönde benzer bir fonksiyonumuz olmadığını unutmayın.
Uygulandığında K2 desteğinin planlanıp planlanmadığına bakılmaksızın herhangi bir K1 token'ını köprüleyebilmemiz gerekir.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Token'ları basmak (oluşturmak) ve yakmak (yok etmek) için fonksiyonlar ve olaylar.
Köprü, token sayısının doğru (K1'de kilitli token sayısına eşit) olduğundan emin olmak için bu fonksiyonları çalıştırabilen tek varlık olmalıdır.

### L2StandardERC20 {#L2StandardERC20}

[Bu, `IL2StandardERC20` arayüzünün bizim uygulamamızdır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Bir tür özel mantığa ihtiyacınız yoksa, bunu kullanmalısınız.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 sözleşmesi](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism, mevcut özellikler iyi denetlendiğinde ve varlıkları elinde tutacak kadar güvenilir olması gerektiğinde yeni özellikler icat edilmemesi gerektiğine inanır.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Bunlar, bizim ihtiyaç duyduğumuz ve normalde ERC-20'nin gerektirmediği iki ek yapılandırma parametresidir.

```solidity

    /**
     * @param _l2Bridge K2 standart köprüsünün adresi.
     * @param _l1Token İlgili K1 token'ının adresi.
     * @param _name ERC20 adı.
     * @param _symbol ERC20 sembolü.
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
        require(msg.sender == l2Bridge, "Yalnızca K2 Köprüsü basım ve yakım yapabilir");
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

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) bu şekilde çalışır.
Her arayüz bir dizi desteklenen fonksiyondur ve bu fonksiyonların [ABI fonksiyon seçicilerinin](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) [özel veya](https://en.wikipedia.org/wiki/Exclusive_or) işlemi olarak tanımlanır.

K2 köprüsü, varlıkları gönderdiği ERC-20 sözleşmesinin bir `IL2StandardERC20` olduğundan emin olmak için doğruluk kontrolü olarak ERC-165'i kullanır.

**Not:** Hileli sözleşmenin `supportsInterface` için yanlış yanıtlar vermesini önleyecek hiçbir şey yoktur, bu nedenle bu bir güvenlik mekanizması değil, doğruluk kontrol mekanizmasıdır.

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

`_mint` ve `_burn` aslında [OpenZeppelin ERC-20 sözleşmesinde](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) tanımlanmıştır.
Bu sözleşme onları harici olarak ifşa etmez, çünkü token'ları basma ve yakma koşulları, ERC-20'yi kullanma yollarının sayısı kadar çeşitlidir.

## K2 Köprü Kodu {#l2-bridge-code}

Bu, Optimism üzerindeki köprüyü çalıştıran koddur.
[Bu sözleşmenin kaynağı buradadır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Arayüz İçe Aktarmaları */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) arayüzü, yukarıda gördüğümüz [K1 eşdeğerine](#IL1ERC20Bridge) çok benzer.
İki önemli fark vardır:

1. K1'de yatırma işlemini başlatır ve çekme işlemlerini sonlandırırsınız.
   Burada ise çekme işlemlerini başlatır ve yatırma işlemlerini sonlandırırsınız.
2. K1'de ETH ve ERC-20 token'ları arasında ayrım yapmak gerekir.
   K2'de aynı fonksiyonları her ikisi için de kullanabiliriz çünkü Optimism üzerindeki dahili ETH bakiyeleri, [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) adresiyle bir ERC-20 token'ı olarak işlenir.

```solidity
/* Kütüphane İçe Aktarmaları */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Sözleşme İçe Aktarmaları */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev L2 Standart köprüsü, K1 ve K2 arasında ETH ve ERC20 geçişlerini sağlamak için
 * K1 Standart köprüsü ile birlikte çalışan bir sözleşmedir.
 * Bu sözleşme, K1 Standart köprüsüne yapılan yatırmaları duyduğunda yeni token'lar için bir basıcı olarak görev yapar.
 *
 * Bu sözleşme aynı zamanda çekme amaçlı token'ların yakıcısı olarak da görev yapar ve K1
 * köprüsüne K1 fonlarını serbest bırakması için bilgi verir.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Harici Sözleşme Referansları *
     ********************************/

    address public l1TokenBridge;
```

K1 köprüsünün adresini takip edin.
K1 eş değerinin aksine, burada bu değişkene ihtiyacımız _var_.
K1 köprüsünün adresi önceden bilinmiyor.

```solidity

    /***************
     * Yapıcı *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Bu sözleşme tarafından kullanılan alanlar arası mesajcı.
     * @param _l1TokenBridge Ana zincire dağıtılan K1 köprüsünün adresi.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Çekme *
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

Bu iki fonksiyon çekme işlemlerini başlatır.
K1 token adresini belirtmeye gerek olmadığını unutmayın.
K2 token'larının bize K1 eş değerinin adresini söylemesi bekleniyor.

```solidity

    /**
     * @dev Token'ı yakarak ve K1 token Ağ Geçidi'ne
     *      çekme hakkında bilgi vererek çekme mantığını gerçekleştirir.
     * @param _l2Token Çekme işleminin başlatıldığı K2 token adresi.
     * @param _from K2'de para çekme işleminin çekileceği hesap.
     * @param _to K1'de para çekme işleminin verileceği hesap.
     * @param _amount Çekilecek token miktarı.
     * @param _l1Gas Kullanılmıyor, ancak potansiyel ileriye dönük uyumluluk considerations için dahil edilmiştir.
     * @param _data K1'e iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici sözleşmeler için bir kolaylık olarak sağlanır. Maksimum
     *        uzunluğu zorunlu kılmanın yanı sıra, bu sözleşmeler içeriği hakkında hiçbir garanti vermez.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Bir çekme başlatıldığında, sonraki K2 kullanımını önlemek için
        // çekenin fonlarını yakarız
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

`_from` parametresine değil, sahte olması çok daha zor olan (bildiğim kadarıyla imkansız) `msg.sender`'a güvendiğimize dikkat edin.

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) için çağrı verisi oluştur
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

        // Mesajı K1 köprüsüne gönder
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Çapraz zincir Fonksiyonu: Yatırma *
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

Mesajın kaynağının meşru olduğundan emin olun.
Bu, fonksiyon `_mint`'i çağırdığı ve köprünün K1'de sahip olduğu token'lar tarafından kapsanmayan token'ları vermek için kullanılabileceği için önemlidir.

```solidity
        // Hedef token'ın uyumlu olup olmadığını kontrol edin ve
        // K1'de yatırılan token'ın buradaki K2 yatırılan token gösterimiyle eşleştiğini doğrulayın
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Doğruluk testleri:

1. Doğru arayüz destekleniyor
2. K2 ERC-20 sözleşmesinin K1 adresi, token'ların K1 kaynağıyla eşleşiyor

```solidity
        ) {
            // Bir yatırma sonlandırıldığında, K2'deki hesaba aynı miktarda
            // token yatırırız.
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
            // Yatırılan K2 token'ı, K1 token'ının doğru adresi
            // konusunda aynı fikirde değil veya doğru arayüzü desteklemiyor.
            // Bu yalnızca kötü niyetli bir K2 token'ı olduğunda veya bir kullanıcı bir şekilde
            // yatırmak için yanlış K2 token adresi belirttiğinde gerçekleşmelidir.
            // Her iki durumda da süreci burada durdurur ve bir çekme
            // mesajı oluştururuz, böylece kullanıcılar bazı durumlarda fonlarını geri alabilir.
            // Kötü niyetli token sözleşmelerini tamamen önlemenin bir yolu yoktur, ancak bu
            // kullanıcı hatasını sınırlar ve bazı kötü niyetli sözleşme davranışlarını azaltır.
```

Bir kullanıcı yanlış K2 token adresini kullanarak tespit edilebilir bir hata yaptıysa, yatırmayı iptal etmek ve token'ları K1'e iade etmek istiyoruz.
Bunu K2'den yapabilmemizin tek yolu, hata meydan okuma süresini beklemek zorunda kalacak bir mesaj göndermektir ancak bu, kullanıcı için token'ları kalıcı olarak kaybetmekten çok daha iyidir.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // yatırmayı gönderene geri göndermek için _to ve _from'u burada değiştirdik
                _from,
                _amount,
                _data
            );

            // Mesajı K1 köprüsüne gönder
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Sonuç {#conclusion}

Standart köprü, varlık aktarımları için en esnek mekanizmadır.
Ancak çok genel olduğu için her zaman kullanması en kolay olan mekanizma değildir.
Özellikle çekimler için, çoğu kullanıcı meydan okuma süresini beklemeyen ve çekimi sonlandırmak için bir Merkle ispatı gerektirmeyen [üçüncü parti köprüleri](https://optimism.io/apps#bridge) kullanmayı tercih eder.

Bu köprüler genellikle K1 üzerinde küçük bir ücret (genelde bir standart köprü çekiminin gaz ücretinden daha azına) için anında sağladıkları varlıklara sahip olarak çalışırlar.
Köprü (ya da onu çalıştıran insanlar) K1 varlıklarının azaldığını sezdiğinde K2'den yeteri kadar varlığı aktarır. Bunlar çok büyük çekimler olduğu için, çekim ücreti büyük bir miktar üzerinden amorti edilmiştir ve daha küçük bir yüzdeliktir.

Umarım bu makale katman 2'nin nasıl çalıştığı hakkında dahasını anlamanıza; temiz ve güvenli Solidity kodu yazmanıza yardımcı olmuştur.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).
