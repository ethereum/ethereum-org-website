---
title: "Optimism standart köprü sözleşmesi incelemesi"
description: "Optimism için standart köprü nasıl çalışır? Neden bu şekilde çalışır?"
author: Ori Pomerantz
tags: ["Solidity", "köprü", "katman 2"]
skill: intermediate
breadcrumb: "Optimism köprüsü"
published: 2022-03-30
lang: tr
---

[Optimism](https://www.optimism.io/) bir [İyimser rollup](/developers/docs/scaling/optimistic-rollups/)'tır.
İyimser toplamalar (optimistic rollups), işlemleri Ethereum Ana Ağı'ndan (katman 1 veya l1 olarak da bilinir) çok daha düşük bir fiyata işleyebilir çünkü işlemler ağdaki her düğüm yerine yalnızca birkaç düğüm tarafından işlenir.
Aynı zamanda, tüm veriler l1'e yazılır, böylece her şey Ana Ağ'ın tüm bütünlük ve erişilebilirlik garantileriyle kanıtlanabilir ve yeniden oluşturulabilir.

L1 varlıklarını Optimism'de (veya başka herhangi bir l2'de) kullanmak için varlıkların [köprülenmesi](/bridges/#prerequisites) gerekir.
Bunu başarmanın bir yolu, kullanıcıların varlıkları (ETH ve [ERC-20 token'ları](/developers/docs/standards/tokens/erc-20/) en yaygın olanlarıdır) l1'de kilitlemesi ve l2'de kullanmak üzere eşdeğer varlıklar almasıdır.
Sonunda, bunlara sahip olan kişi onları l1'e geri köprülemek isteyebilir.
Bunu yaparken, varlıklar l2'de yakılır ve ardından l1'de kullanıcıya geri verilir.

[Optimism standart köprüsü](https://docs.optimism.io/app-developers/bridging/standard-bridge) bu şekilde çalışır.
Bu makalede, nasıl çalıştığını görmek için bu köprünün kaynak kodunu inceliyor ve iyi yazılmış bir Solidity kodu örneği olarak çalışıyoruz.

## Kontrol akışları {#control-flows}

Köprünün iki ana akışı vardır:

- Yatırma (l1'den l2'ye)
- Çekim (l2'den l1'e)

### Yatırma akışı {#deposit-flow}

#### Katman 1 {#deposit-flow-layer-1}

1. Bir ERC-20 yatırılıyorsa, yatıran kişi köprüye yatırılan miktarı harcaması için bir harcama izni verir
2. Yatıran kişi l1 köprüsünü çağırır (`depositERC20`, `depositERC20To`, `depositETH` veya `depositETHTo`)
3. L1 köprüsü, köprülenen varlığın mülkiyetini alır
   - ETH: Varlık, çağrının bir parçası olarak yatıran kişi tarafından transfer edilir
   - ERC-20: Varlık, yatıran kişi tarafından sağlanan harcama izni kullanılarak köprü tarafından kendisine transfer edilir
4. L1 köprüsü, l2 köprüsündeki `finalizeDeposit` işlevini çağırmak için alanlar arası mesaj (cross-domain message) mekanizmasını kullanır

#### Katman 2 {#deposit-flow-layer-2}

5. L2 köprüsü, `finalizeDeposit` çağrısının meşru olduğunu doğrular:
   - Alanlar arası mesaj sözleşmesinden geldiğini
   - Orijinal olarak l1'deki köprüden geldiğini
6. L2 köprüsü, l2'deki ERC-20 token sözleşmesinin doğru olup olmadığını kontrol eder:
   - L2 sözleşmesi, l1 karşılığının l1'de token'ların geldiği sözleşmeyle aynı olduğunu bildirir
   - L2 sözleşmesi, doğru arayüzü desteklediğini bildirir ([ERC-165 kullanarak](https://eips.ethereum.org/EIPS/eip-165)).
7. L2 sözleşmesi doğruysa, uygun adrese uygun sayıda token basmak için onu çağırır. Değilse, kullanıcının l1'deki token'ları talep etmesine izin vermek için bir çekim işlemi başlatır.

### Çekim akışı {#withdrawal-flow}

#### Katman 2 {#withdrawal-flow-layer-2}

1. Çeken kişi l2 köprüsünü çağırır (`withdraw` veya `withdrawTo`)
2. L2 köprüsü, `msg.sender` adresine ait uygun sayıda token'ı yakar
3. L2 köprüsü, l1 köprüsündeki `finalizeETHWithdrawal` veya `finalizeERC20Withdrawal` işlevini çağırmak için alanlar arası mesaj mekanizmasını kullanır

#### Katman 1 {#withdrawal-flow-layer-1}

4. L1 köprüsü, `finalizeETHWithdrawal` veya `finalizeERC20Withdrawal` çağrısının meşru olduğunu doğrular:
   - Alanlar arası mesaj mekanizmasından geldiğini
   - Orijinal olarak l2'deki köprüden geldiğini
5. L1 köprüsü, uygun varlığı (ETH veya ERC-20) uygun adrese transfer eder

## Katman 1 kodu {#layer-1-code}

Bu, l1'de, yani Ethereum Ana Ağı'nda çalışan koddur.

### IL1ERC20Bridge {#il1erc20bridge}

[Bu arayüz burada tanımlanmıştır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
ERC-20 token'larını köprülemek için gereken işlevleri ve tanımları içerir.

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism'in kodunun çoğu MIT lisansı altında yayınlanmıştır](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Yazının yazıldığı sırada Solidity'nin en son sürümü 0.8.12'dir.
0.9.0 sürümü yayınlanana kadar bu kodun onunla uyumlu olup olmadığını bilmiyoruz.

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

Optimism köprü terminolojisinde _yatırma (deposit)_, l1'den l2'ye transfer anlamına gelir ve _çekim (withdrawal)_, l2'den l1'e transfer anlamına gelir.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Çoğu durumda l1'deki bir ERC-20'nin adresi, l2'deki eşdeğer ERC-20'nin adresiyle aynı değildir.
[Token adreslerinin listesini buradan görebilirsiniz](https://static.optimism.io/optimism.tokenlist.json).
`chainId` 1 olan adres l1'de (Ana Ağ) ve `chainId` 10 olan adres l2'dedir (Optimism).
Diğer iki `chainId` değeri, Kovan test ağı (42) ve Optimistic Kovan test ağı (69) içindir.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Transferlere not eklemek mümkündür, bu durumda bunları bildiren olaylara eklenirler.

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
L1 köprüsü durumunda bu, yatırma işlemlerinin başlatılması ve çekim işlemlerinin tamamlanması anlamına gelir.

```solidity

    /********************
     * Genel Fonksiyonlar *
     ********************/

    /**
     * @dev ilgili l2 köprü Sözleşmesinin Adresini getirir.
     * @return İlgili l2 köprü Sözleşmesinin Adresi.
     */
    function l2TokenBridge() external returns (address);
```

Bu işleve aslında gerek yoktur, çünkü l2'de önceden dağıtılmış bir sözleşmedir, bu nedenle her zaman `0x4200000000000000000000000000000000000010` adresindedir.
L2 köprüsüyle simetri sağlamak için buradadır, çünkü l1 köprüsünün adresini bilmek _kolay_ değildir.

```solidity
    /**
     * @dev l2 üzerindeki çağırıcının bakiyesine bir miktar ERC-20 yatırır.
     * @param _l1Token Yatırmakta olduğumuz l1 ERC-20 Adresi
     * @param _l2Token l1'in ilgili l2 ERC-20 Adresi
     * @param _amount Yatırılacak ERC-20 miktarı
     * @param _l2Gas l2 üzerinde yatırma işlemini tamamlamak için gereken Gaz limiti.
     * @param _data l2'ye iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici Sözleşmeler için bir kolaylık olarak sağlanır. Maksimum bir
     *        uzunluğu zorunlu kılmak dışında, bu Sözleşmeler içeriği hakkında hiçbir garanti vermez.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` parametresi, işlemin harcamasına izin verilen l2 gaz miktarıdır.
[Belirli bir (yüksek) sınıra kadar bu ücretsizdir](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), bu nedenle ERC-20 sözleşmesi basım sırasında gerçekten garip bir şey yapmadığı sürece bu bir sorun olmamalıdır.
Bu işlev, bir kullanıcının varlıkları farklı bir blokzincirdeki aynı adrese köprülediği yaygın senaryoyu ele alır.

```solidity
    /**
     * @dev l2 üzerindeki bir alıcının bakiyesine bir miktar ERC-20 yatırır.
     * @param _l1Token Yatırmakta olduğumuz l1 ERC-20 Adresi
     * @param _l2Token l1'in ilgili l2 ERC-20 Adresi
     * @param _to Çekim işleminin alacaklandırılacağı l2 Adresi.
     * @param _amount Yatırılacak ERC-20 miktarı.
     * @param _l2Gas l2 üzerinde yatırma işlemini tamamlamak için gereken Gaz limiti.
     * @param _data l2'ye iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici Sözleşmeler için bir kolaylık olarak sağlanır. Maksimum bir
     *        uzunluğu zorunlu kılmak dışında, bu Sözleşmeler içeriği hakkında hiçbir garanti vermez.
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

Bu işlev `depositERC20` ile neredeyse aynıdır, ancak ERC-20'yi farklı bir adrese göndermenize olanak tanır.

```solidity
    /*************************
     * Zincirler Arası Fonksiyonlar *
     *************************/

    /**
     * @dev l2'den l1'e bir çekim işlemini tamamlar ve fonları alıcının
     * l1 ERC-20 Token bakiyesine alacak kaydeder.
     * l2'den başlatılan çekim işlemi sonuçlandırılmamışsa bu çağrı başarısız olur.
     *
     * @param _l1Token finalizeWithdrawal yapılacak l1 Token Adresi.
     * @param _l2Token Çekim işleminin başlatıldığı l2 Token Adresi.
     * @param _from Transferi başlatan l2 Adresi.
     * @param _to Çekim işleminin alacaklandırılacağı l1 Adresi.
     * @param _amount Yatırılacak ERC-20 miktarı.
     * @param _data l2 üzerinde gönderici tarafından sağlanan veri. Bu veri yalnızca
     *   harici Sözleşmeler için bir kolaylık olarak sağlanır. Maksimum bir
     *   uzunluğu zorunlu kılmak dışında, bu Sözleşmeler içeriği hakkında hiçbir garanti vermez.
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

Optimism'de çekim işlemleri (ve l2'den l1'e giden diğer mesajlar) iki adımlı bir süreçtir:

1. L2'de başlatan bir işlem.
2. L1'de tamamlayan veya talep eden bir işlem.
   Bu işlemin, l2 işlemi için [hata itiraz süresi (fault challenge period)](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) sona erdikten sonra gerçekleşmesi gerekir.

### IL1StandardBridge {#il1standardbridge}

[Bu arayüz burada tanımlanmıştır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Bu dosya ETH için olay ve işlev tanımlarını içerir.
Bu tanımlar, yukarıda ERC-20 için `IL1ERC20Bridge` içinde tanımlananlara çok benzer.

Köprü arayüzü iki dosya arasında bölünmüştür çünkü bazı ERC-20 token'ları özel işlem gerektirir ve standart köprü tarafından işlenemez.
Bu şekilde, böyle bir token'ı işleyen özel köprü `IL1ERC20Bridge` uygulayabilir ve aynı zamanda ETH'yi köprülemek zorunda kalmaz.

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

Bu olay, l1 ve l2 token adresleri olmaması dışında ERC-20 sürümüyle (`ERC20DepositInitiated`) neredeyse aynıdır.
Aynı durum diğer olaylar ve işlevler için de geçerlidir.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Genel Fonksiyonlar *
     ********************/

    /**
     * @dev l2 üzerindeki çağırıcının bakiyesine bir miktar ETH yatırır.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev l2 üzerindeki bir alıcının bakiyesine bir miktar ETH yatırır.
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
     * @dev l2'den l1'e bir çekim işlemini tamamlar ve fonları alıcının
     * l1 ETH Token bakiyesine alacak kaydeder. Bu fonksiyonu yalnızca xDomainMessenger çağırabildiğinden, çekim işlemi sonuçlandırılmadan
     * önce asla çağrılmayacaktır.
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

[Bu sözleşme](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol), diğer katmana mesaj göndermek için her iki köprü ([l1](#the-l1-bridge-contract) ve [l2](#l2-bridge-code)) tarafından miras alınır.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Arayüz İçe Aktarımları */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Bu arayüz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol), alanlar arası mesajlaşma aracını (cross domain messenger) kullanarak sözleşmeye diğer katmana nasıl mesaj göndereceğini söyler.
Bu alanlar arası mesajlaşma aracı tamamen başka bir sistemdir ve gelecekte yazmayı umduğum kendi makalesini hak etmektedir.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Etki alanları arası iletişim gerçekleştiren Sözleşmeler için yardımcı Sözleşme
 *
 * Kullanılan derleyici: devralan Sözleşme tarafından tanımlanır
 */
contract CrossDomainEnabled {
    /*************
     * Değişkenler *
     *************/

    // Diğer etki alanından mesaj göndermek ve almak için kullanılan haberci Sözleşme.
    address public messenger;

    /***************
     * Kurucu *
     ***************/

    /**
     * @param _messenger Mevcut katmandaki CrossDomainMessenger Adresi.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Sözleşmenin bilmesi gereken tek parametre, bu katmandaki alanlar arası mesajlaşma aracının adresidir.
Bu parametre kurucu içinde bir kez ayarlanır ve asla değişmez.

```solidity

    /**********************
     * Fonksiyon Değiştiricileri *
     **********************/

    /**
     * Değiştirilen fonksiyonun yalnızca belirli bir etki alanları arası hesap tarafından çağrılabilmesini zorunlu kılar.
     * @param _sourceDomainAccount Kaynak etki alanında bu fonksiyonu çağırmak için
     *  kimliği doğrulanmış tek hesap.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Alanlar arası mesajlaşmaya, çalıştığı blokzincirdeki (Ethereum Ana Ağı veya Optimism) herhangi bir sözleşme tarafından erişilebilir.
Ancak her iki taraftaki köprünün _yalnızca_ diğer taraftaki köprüden gelmeleri durumunda belirli mesajlara güvenmesine ihtiyacımız var.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Yalnızca uygun alanlar arası mesajlaşma aracından (`messenger`, aşağıda gördüğünüz gibi) gelen mesajlara güvenilebilir.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Alanlar arası mesajlaşma aracının diğer katmanla mesaj gönderen adresi sağlama yolu [`.xDomainMessageSender()` işlevidir](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Mesaj tarafından başlatılan işlemde çağrıldığı sürece bu bilgiyi sağlayabilir.

Aldığımız mesajın diğer köprüden geldiğinden emin olmalıyız.

```solidity

        _;
    }

    /**********************
     * Dahili Fonksiyonlar *
     **********************/

    /**
     * Genellikle depolamadan haberciyi alır. Bu fonksiyon, bir alt Sözleşmenin
     * geçersiz kılması (override) gerekebileceği durumu için dışa aktarılmıştır.
     * @return Kullanılması gereken etki alanları arası haberci Sözleşme Adresi.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Bu işlev alanlar arası mesajlaşma aracını döndürür.
Bundan miras alan sözleşmelerin hangi alanlar arası mesajlaşma aracını kullanacağını belirlemek için bir algoritma kullanmasına izin vermek amacıyla `messenger` değişkeni yerine bir işlev kullanıyoruz.

```solidity

    /**
     * Başka bir etki alanındaki bir hesaba mesaj gönderir
     * @param _crossDomainTarget Hedef etki alanındaki amaçlanan alıcı
     * @param _message Hedefe gönderilecek veri (genellikle `onlyFromCrossDomainAccount()` içeren
     *  bir fonksiyona çağrı verisi)
     * @param _gasLimit Hedef etki alanında mesajın alınması için Gaz limiti.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Son olarak, diğer katmana mesaj gönderen işlev.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither), Optimism'in güvenlik açıklarını ve diğer olası sorunları aramak için her sözleşmede çalıştırdığı statik bir analizördür.
Bu durumda, aşağıdaki satır iki güvenlik açığını tetikler:

1. [Yeniden giriş olayları](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Zararsız yeniden giriş](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Bu durumda yeniden giriş konusunda endişelenmiyoruz, Slither'ın bunu bilmesinin bir yolu olmasa bile `getCrossDomainMessenger()` işlevinin güvenilir bir adres döndürdüğünü biliyoruz.

### L1 köprü sözleşmesi {#the-l1-bridge-contract}

[Bu sözleşmenin kaynak kodu buradadır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Arayüzler diğer sözleşmelerin bir parçası olabilir, bu nedenle çok çeşitli Solidity sürümlerini desteklemeleri gerekir.
Ancak köprünün kendisi bizim sözleşmemizdir ve hangi Solidity sürümünü kullandığı konusunda katı olabiliriz.

```solidity
/* Arayüz İçe Aktarımları */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) ve [IL1StandardBridge](#il1standardbridge) yukarıda açıklanmıştır.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Bu arayüz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol), l2'deki standart köprüyü kontrol etmek için mesajlar oluşturmamızı sağlar.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Bu arayüz](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), ERC-20 sözleşmelerini kontrol etmemizi sağlar.
[Bunun hakkında daha fazla bilgiyi buradan okuyabilirsiniz](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Kütüphane İçe Aktarımları */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Yukarıda açıklandığı gibi](#crossdomainenabled), bu sözleşme katmanlar arası mesajlaşma için kullanılır.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol), her zaman aynı adrese sahip olan l2 sözleşmelerinin adreslerine sahiptir. Buna l2'deki standart köprü de dahildir.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin'in Adres yardımcı programları](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Sözleşme adresleri ile harici olarak sahip olunan hesaplara (EOA) ait olanları ayırt etmek için kullanılır.

Bunun mükemmel bir çözüm olmadığını unutmayın, çünkü doğrudan çağrılar ile bir sözleşmenin kurucusundan yapılan çağrıları ayırt etmenin bir yolu yoktur, ancak en azından bu, bazı yaygın kullanıcı hatalarını belirlememize ve önlememize olanak tanır.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 standardı](https://eips.ethereum.org/EIPS/eip-20), bir sözleşmenin başarısızlığı bildirmesi için iki yolu destekler:

1. Geri al (Revert)
2. `false` döndür

Her iki durumu da ele almak kodumuzu daha karmaşık hale getirecektir, bu nedenle bunun yerine [tüm başarısızlıkların bir geri alma ile sonuçlanmasını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) sağlayan [OpenZeppelin'in `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) sarmalayıcısını kullanıyoruz.

```solidity
/**
 * @title L1StandardBridge
 * @dev l1 ETH ve ERC-20 köprüsü, yatırılan l1 fonlarını ve l2 üzerinde kullanımda olan standart
 * Token'ları depolayan bir Sözleşmedir. İlgili bir l2 köprüsünü senkronize eder, onu yatırma işlemleri hakkında bilgilendirir
 * ve yeni sonuçlandırılan çekim işlemleri için onu dinler.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Bu satır, `IERC20` arayüzünü her kullandığımızda `SafeERC20` sarmalayıcısını kullanmayı nasıl belirttiğimizdir.

```solidity

    /********************************
     * Harici Sözleşme Referansları *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#l2-bridge-code) adresi.

```solidity

    // Yatırılan l1 Token bakiyesi için l1 Token'ı l2 Token'a eşler
    mapping(address => mapping(address => uint256)) public deposits;
```

Bunun gibi çift bir [eşleme (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), [iki boyutlu seyrek bir dizi](https://en.wikipedia.org/wiki/Sparse_matrix) tanımlamanın yoludur.
Bu veri yapısındaki değerler `deposit[L1 token addr][L2 token addr]` olarak tanımlanır.
Varsayılan değer sıfırdır.
Yalnızca farklı bir değere ayarlanan hücreler depolamaya yazılır.

```solidity

    /***************
     * Kurucu *
     ***************/

    // Bu Sözleşme bir proxy arkasında yaşar, bu nedenle kurucu parametreleri kullanılmayacaktır.
    constructor() CrossDomainEnabled(address(0)) {}
```

Depolamadaki tüm değişkenleri kopyalamak zorunda kalmadan bu sözleşmeyi yükseltebilmek istiyoruz.
Bunu yapmak için, çağrıları adresi vekil kontrat tarafından saklanan ayrı bir sözleşmeye aktarmak için [`delegatecall`](https://solidity-by-example.org/delegatecall/) kullanan bir sözleşme olan [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) kullanıyoruz (yükseltme yaptığınızda vekile bu adresi değiştirmesini söylersiniz).
`delegatecall` kullandığınızda depolama, _çağıran_ sözleşmenin depolaması olarak kalır, bu nedenle tüm sözleşme durum değişkenlerinin değerleri etkilenmez.

Bu modelin bir etkisi, `delegatecall` tarafından _çağrılan_ sözleşmenin depolamasının kullanılmaması ve bu nedenle ona aktarılan kurucu değerlerinin önemli olmamasıdır.
Bu, `CrossDomainEnabled` kurucusuna anlamsız bir değer sağlayabilmemizin nedenidir.
Aşağıdaki başlatmanın kurucudan ayrı olmasının nedeni de budur.

```solidity
    /******************
     * Başlatma *
     ******************/

    /**
     * @param _l1messenger Zincirler arası iletişim için kullanılan l1 Haberci Adresi.
     * @param _l2TokenBridge l2 standart köprü Adresi.
     */
    // slither-disable-next-line external-function
```

Bu [Slither testi](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external), sözleşme kodundan çağrılmayan ve bu nedenle `public` yerine `external` olarak bildirilebilecek işlevleri tanımlar.
`external` işlevlerinin gaz maliyeti daha düşük olabilir, çünkü onlara çağrı verisinde (calldata) parametreler sağlanabilir.
`public` olarak bildirilen işlevlerin sözleşme içinden erişilebilir olması gerekir.
Sözleşmeler kendi çağrı verilerini değiştiremezler, bu nedenle parametrelerin bellekte olması gerekir.
Böyle bir işlev dışarıdan çağrıldığında, çağrı verisini belleğe kopyalamak gerekir, bu da gaza mal olur.
Bu durumda işlev yalnızca bir kez çağrılır, bu nedenle verimsizlik bizim için önemli değildir.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` işlevi yalnızca bir kez çağrılmalıdır.
L1 alanlar arası mesajlaşma aracının veya l2 token köprüsünün adresi değişirse, yeni bir vekil ve onu çağıran yeni bir köprü oluştururuz.
Tüm sistemin yükseltilmesi dışında bunun gerçekleşmesi pek olası değildir, bu çok nadir görülen bir durumdur.

Bu işlevin onu _kimin_ çağırabileceğini kısıtlayan herhangi bir mekanizması olmadığını unutmayın.
Bu, teorik olarak bir saldırganın vekili ve köprünün ilk sürümünü dağıtana kadar bekleyebileceği ve ardından meşru kullanıcıdan önce `initialize` işlevine ulaşmak için [önden koşma (front-run)](https://solidity-by-example.org/hacks/front-running/) yapabileceği anlamına gelir. Ancak bunu önlemenin iki yöntemi vardır:

1. Sözleşmeler doğrudan bir EOA tarafından değil, [başka bir sözleşmenin onları oluşturduğu bir işlemde](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) dağıtılırsa, tüm süreç atomik olabilir ve başka herhangi bir işlem yürütülmeden önce bitebilir.
2. `initialize` işlevine yapılan meşru çağrı başarısız olursa, yeni oluşturulan vekili ve köprüyü görmezden gelmek ve yenilerini oluşturmak her zaman mümkündür.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Bunlar köprünün bilmesi gereken iki parametredir.

```solidity

    /**************
     * Yatırma *
     **************/

    /** @dev Göndericinin EOA olmasını require eden değiştirici. Bu kontrol kötü niyetli bir
     *  Sözleşme tarafından initcode aracılığıyla atlanabilir, ancak kaçınmak istediğimiz kullanıcı hatasını halleder.
     */
    modifier onlyEOA() {
        // Sözleşmelerden gelen yatırma işlemlerini durdurmak için kullanılır (yanlışlıkla kaybolan Token'ları önlemek için)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

OpenZeppelin'in `Address` yardımcı programlarına ihtiyaç duymamızın nedeni budur.

```solidity
    /**
     * @dev Bu fonksiyon, l2 üzerindeki çağırıcının bakiyesine bir miktar ETH yatırmak için
     * veri olmadan çağrılabilir.
     * receive fonksiyonu veri almadığından, l2'ye muhafazakar bir
     * varsayılan miktar iletilir.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Bu işlev test amacıyla mevcuttur.
Arayüz tanımlarında görünmediğine dikkat edin - normal kullanım için değildir.

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

Bu iki işlev, asıl ETH yatırma işlemini gerçekleştiren işlev olan `_initiateETHDeposit` etrafındaki sarmalayıcılardır.

```solidity
    /**
     * @dev ETH'yi depolayarak ve l2 ETH Ağ Geçidini yatırma işlemi hakkında bilgilendirerek
     * yatırma işlemleri için mantığı gerçekleştirir.
     * @param _from l1 üzerinde yatırma işleminin çekileceği hesap.
     * @param _to l2 üzerinde yatırma işleminin verileceği hesap.
     * @param _l2Gas l2 üzerinde yatırma işlemini tamamlamak için gereken Gaz limiti.
     * @param _data l2'ye iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici Sözleşmeler için bir kolaylık olarak sağlanır. Maksimum bir
     *        uzunluğu zorunlu kılmak dışında, bu Sözleşmeler içeriği hakkında hiçbir garanti vermez.
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

Alanlar arası mesajların çalışma şekli, hedef sözleşmenin mesajla birlikte çağrı verisi olarak çağrılmasıdır.
Solidity sözleşmeleri çağrı verilerini her zaman
[ABI spesifikasyonlarına](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) uygun olarak yorumlar.
Solidity işlevi [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) bu çağrı verisini oluşturur.

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

Buradaki mesaj, şu parametrelerle [`finalizeDeposit` işlevini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) çağırmaktır:

| Parametre | Değer                          | Anlamı                                                                                                                                       |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | L1'de ETH'yi (bir ERC-20 token'ı olmayan) temsil eden özel değer                                                                             |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Optimism'de ETH'yi yöneten l2 sözleşmesi, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (bu sözleşme yalnızca dahili Optimism kullanımı içindir)          |
| \_from    | \_from                         | L1'de ETH'yi gönderen adres                                                                                                                  |
| \_to      | \_to                           | L2'de ETH'yi alan adres                                                                                                                      |
| amount    | msg.value                      | Gönderilen Wei miktarı (zaten köprüye gönderilmiş olan)                                                                                      |
| \_data    | \_data                         | Yatırma işlemine eklenecek ek veri                                                                                                           |

```solidity
        // çağrı verisini l2'ye gönder
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Mesajı alanlar arası mesajlaşma aracı üzerinden gönderin.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Dinleyen herhangi bir merkeziyetsiz uygulamayı (dapp) bu transfer hakkında bilgilendirmek için bir olay yayınlayın.

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

Bu iki işlev, asıl ERC-20 yatırma işlemini gerçekleştiren işlev olan `_initiateERC20Deposit` etrafındaki sarmalayıcılardır.

```solidity
    /**
     * @dev l2 Yatırılan Token Sözleşmesini yatırma işlemi hakkında bilgilendirerek
     * ve l1 fonlarını kilitlemek için bir işleyici çağırarak (örn. transferFrom) yatırma işlemleri için mantığı gerçekleştirir.
     *
     * @param _l1Token Yatırmakta olduğumuz l1 ERC-20 Adresi
     * @param _l2Token l1'in ilgili l2 ERC-20 Adresi
     * @param _from l1 üzerinde yatırma işleminin çekileceği hesap
     * @param _to l2 üzerinde yatırma işleminin verileceği hesap
     * @param _amount Yatırılacak ERC-20 miktarı.
     * @param _l2Gas l2 üzerinde yatırma işlemini tamamlamak için gereken Gaz limiti.
     * @param _data l2'ye iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici Sözleşmeler için bir kolaylık olarak sağlanır. Maksimum bir
     *        uzunluğu zorunlu kılmak dışında, bu Sözleşmeler içeriği hakkında hiçbir garanti vermez.
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

Bu işlev, birkaç önemli farkla yukarıdaki `_initiateETHDeposit` işlevine benzer.
İlk fark, bu işlevin token adreslerini ve transfer edilecek miktarı parametre olarak almasıdır.
ETH durumunda, köprüye yapılan çağrı zaten varlığın köprü hesabına transferini içerir (`msg.value`).

```solidity
        // l1 üzerinde bir yatırma işlemi başlatıldığında, l1 köprüsü gelecekteki
        // çekim işlemleri için fonları kendisine transfer eder. safeTransferFrom ayrıca Sözleşmenin koda sahip olup olmadığını da kontrol eder, bu nedenle
        // _from bir EOA veya address(0) ise bu başarısız olacaktır.
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 token transferleri ETH'den farklı bir süreç izler:

1. Kullanıcı (`_from`), uygun token'ları transfer etmesi için köprüye bir harcama izni verir.
2. Kullanıcı, token sözleşmesinin adresi, miktar vb. ile köprüyü çağırır.
3. Köprü, yatırma işleminin bir parçası olarak token'ları (kendisine) transfer eder.

İlk adım, son ikisinden ayrı bir işlemde gerçekleşebilir.
Ancak, önden koşma bir sorun değildir çünkü `_initiateERC20Deposit` işlevini çağıran iki işlev (`depositERC20` ve `depositERC20To`), bu işlevi yalnızca `_from` parametresi olarak `msg.sender` ile çağırır.

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

        // çağrı verisini l2'ye gönder
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Yatırılan token miktarını `deposits` veri yapısına ekleyin.
L2'de aynı l1 ERC-20 token'ına karşılık gelen birden fazla adres olabilir, bu nedenle yatırma işlemlerini takip etmek için köprünün l1 ERC-20 token bakiyesini kullanmak yeterli değildir.

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

L2 köprüsü, l2 alanlar arası mesajlaşma aracına bir mesaj gönderir ve bu da l1 alanlar arası mesajlaşma aracının bu işlevi çağırmasına neden olur (elbette [mesajı tamamlayan işlem](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) l1'de gönderildikten sonra).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Bunun alanlar arası mesajlaşma aracından gelen ve l2 token köprüsünden kaynaklanan _meşru_ bir mesaj olduğundan emin olun.
Bu işlev köprüden ETH çekmek için kullanılır, bu nedenle yalnızca yetkili arayan tarafından çağrıldığından emin olmalıyız.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH transfer etmenin yolu, alıcıyı `msg.value` içindeki Wei miktarıyla çağırmaktır.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Çekim işlemi hakkında bir olay yayınlayın.

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

Bu işlev, ERC-20 token'ları için gerekli değişikliklerle birlikte yukarıdaki `finalizeETHWithdrawal` işlevine benzer.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` veri yapısını güncelleyin.

```solidity

        // l1 üzerinde bir çekim işlemi sonuçlandırıldığında, l1 köprüsü fonları çeken kişiye transfer eder
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Geçici - ETH Taşıma *
     *****************************/

    /**
     * @dev Hesaba ETH bakiyesi ekler. Bu, ETH'nin eski bir ağ geçidinden
     * yeni bir ağ geçidine taşınmasına izin vermek içindir.
     * NOT: Bu yalnızca bir yükseltme için bırakılmıştır, böylece taşınan ETH'yi eski
     * Sözleşmeden alabiliriz
     */
    function donateETH() external payable {}
}
```

Köprünün daha eski bir uygulaması vardı.
O uygulamadan buna geçtiğimizde tüm varlıkları taşımak zorunda kaldık.
ERC-20 token'ları kolayca taşınabilir.
Ancak, bir sözleşmeye ETH transfer etmek için o sözleşmenin onayına ihtiyacınız vardır, `donateETH` bize bunu sağlar.

## L2'deki ERC-20 Token'ları {#erc-20-tokens-on-l2}

Bir ERC-20 token'ının standart köprüye uyması için, standart köprünün ve _yalnızca_ standart köprünün token basmasına izin vermesi gerekir.
Bu gereklidir çünkü köprülerin Optimism'de dolaşan token sayısının l1 köprü sözleşmesinde kilitli olan token sayısına eşit olduğundan emin olması gerekir.
L2'de çok fazla token varsa, bazı kullanıcılar varlıklarını l1'e geri köprüleyemezler.
Güvenilir bir köprü yerine, esasen [kısmi rezerv bankacılığını](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) yeniden yaratmış olurduk.
L1'de çok fazla token varsa, bu token'ların bazıları sonsuza kadar köprü sözleşmesinde kilitli kalacaktır çünkü l2 token'larını yakmadan onları serbest bırakmanın bir yolu yoktur.

### IL2StandardERC20 {#il2standarderc20}

Standart köprüyü kullanan l2'deki her ERC-20 token'ının, standart köprünün ihtiyaç duyduğu işlevlere ve olaylara sahip olan [bu arayüzü](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) sağlaması gerekir.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Standart ERC-20 arayüzü](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), `mint` ve `burn` işlevlerini içermez.
Bu yöntemler, token'ları oluşturma ve yok etme mekanizmalarını belirtmeyen [ERC-20 standardı](https://eips.ethereum.org/EIPS/eip-20) tarafından gerekli kılınmaz.

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 arayüzü](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol), bir sözleşmenin hangi işlevleri sağladığını belirtmek için kullanılır.
[Standardı buradan okuyabilirsiniz](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Bu işlev, bu sözleşmeye köprülenen l1 token'ının adresini sağlar.
Ters yönde benzer bir işlevimiz olmadığını unutmayın.
Uygulandığında l2 desteğinin planlanıp planlanmadığına bakılmaksızın herhangi bir l1 token'ını köprüleyebilmemiz gerekir.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Token'ları basmak (oluşturmak) ve yakmak (yok etmek) için işlevler ve olaylar.
Token sayısının doğru olduğundan (l1'de kilitli olan token sayısına eşit olduğundan) emin olmak için bu işlevleri çalıştırabilen tek varlık köprü olmalıdır.

### L2StandardERC20 {#l2standarderc20}

[Bu, `IL2StandardERC20` arayüzü uygulamamızdır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Bir tür özel mantığa ihtiyacınız yoksa, bunu kullanmalısınız.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 sözleşmesi](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism, özellikle tekerlek iyi denetlenmişse ve varlıkları tutacak kadar güvenilir olması gerekiyorsa, tekerleği yeniden icat etmeye inanmaz.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Bunlar, bizim gerektirdiğimiz ve ERC-20'nin normalde gerektirmediği iki ek yapılandırma parametresidir.

```solidity

    /**
     * @param _l2Bridge l2 standart köprü Adresi.
     * @param _l1Token İlgili l1 Token Adresi.
     * @param _name ERC-20 adı.
     * @param _symbol ERC-20 sembolü.
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

Önce miras aldığımız sözleşme için kurucuyu çağırın (`ERC20(_name, _symbol)`) ve ardından kendi değişkenlerimizi ayarlayın.

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

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) bu şekilde çalışır.
Her arayüz, desteklenen bir dizi işlevdir ve bu işlevlerin [ABI işlev seçicilerinin](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) [özel veya (exclusive or)](https://en.wikipedia.org/wiki/Exclusive_or) işlemi olarak tanımlanır.

L2 köprüsü, varlık gönderdiği ERC-20 sözleşmesinin bir `IL2StandardERC20` olduğundan emin olmak için bir mantık kontrolü (sanity check) olarak ERC-165'i kullanır.

**Not:** Kötü niyetli bir sözleşmenin `supportsInterface` işlevine yanlış yanıtlar vermesini engelleyecek hiçbir şey yoktur, bu nedenle bu bir mantık kontrolü mekanizmasıdır, bir güvenlik mekanizması _değildir_.

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

Yalnızca l2 köprüsünün varlıkları basmasına ve yakmasına izin verilir.

`_mint` ve `_burn` aslında [OpenZeppelin ERC-20 sözleşmesinde](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) tanımlanmıştır.
Bu sözleşme onları dışarıya açık hale getirmez, çünkü token'ları basma ve yakma koşulları, ERC-20'yi kullanma yollarının sayısı kadar çeşitlidir.

## L2 Köprü Kodu {#l2-bridge-code}

Bu, Optimism'de köprüyü çalıştıran koddur.
[Bu sözleşmenin kaynağı buradadır](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Arayüz İçe Aktarımları */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) arayüzü, yukarıda gördüğümüz [l1 karşılığına](#il1erc20bridge) çok benzer.
İki önemli fark vardır:

1. L1'de yatırma işlemlerini başlatır ve çekim işlemlerini tamamlarsınız.
   Burada çekim işlemlerini başlatır ve yatırma işlemlerini tamamlarsınız.
2. L1'de ETH ve ERC-20 token'ları arasında ayrım yapmak gerekir.
   L2'de her ikisi için de aynı işlevleri kullanabiliriz çünkü dahili olarak Optimism'deki ETH bakiyeleri [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) adresine sahip bir ERC-20 token'ı olarak işlenir.

```solidity
/* Kütüphane İçe Aktarımları */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Sözleşme İçe Aktarımları */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev l2 Standart köprü, l1 ve l2 arasında ETH ve ERC-20 geçişlerini sağlamak için
 * l1 Standart köprü ile birlikte çalışan bir Sözleşmedir.
 * Bu Sözleşme, l1 Standart köprüsüne yapılan yatırma işlemlerini duyduğunda yeni Token'ları basmak için görev yapar.
 * Bu Sözleşme ayrıca çekim işlemi için amaçlanan Token'ların yakımını gerçekleştirerek l1
 * köprüsünü l1 fonlarını serbest bırakması için bilgilendirir.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Harici Sözleşme Referansları *
     ********************************/

    address public l1TokenBridge;
```

L1 köprüsünün adresini takip edin.
L1 karşılığının aksine, burada bu değişkene _ihtiyacımız_ olduğunu unutmayın.
L1 köprüsünün adresi önceden bilinmemektedir.

```solidity

    /***************
     * Kurucu *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Bu Sözleşme tarafından kullanılan etki alanları arası haberci.
     * @param _l1TokenBridge Ana zincire dağıtılan l1 köprü Adresi.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Çekim İşlemi *
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

Bu iki işlev çekim işlemlerini başlatır.
L1 token adresini belirtmeye gerek olmadığını unutmayın.
L2 token'larının bize l1 karşılığının adresini söylemesi beklenir.

```solidity

    /**
     * @dev Token yakımı yaparak ve l1 Token Ağ Geçidini çekim işlemi hakkında bilgilendirerek
     *      çekim işlemleri için mantığı gerçekleştirir.
     * @param _l2Token Çekim işleminin başlatıldığı l2 Token Adresi.
     * @param _from l2 üzerinde çekim işleminin çekileceği hesap.
     * @param _to l1 üzerinde çekim işleminin verileceği hesap.
     * @param _amount Çekilecek Token miktarı.
     * @param _l1Gas Kullanılmaz, ancak olası ileriye dönük uyumluluk hususları için dahil edilmiştir.
     * @param _data l1'e iletilecek isteğe bağlı veri. Bu veri yalnızca
     *        harici Sözleşmeler için bir kolaylık olarak sağlanır. Maksimum bir
     *        uzunluğu zorunlu kılmak dışında, bu Sözleşmeler içeriği hakkında hiçbir garanti vermez.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Bir çekim işlemi başlatıldığında, sonraki l2
        // kullanımını önlemek için çeken kişinin fonlarının yakımını gerçekleştiririz
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

`_from` parametresine _değil_, sahtesini yapması çok daha zor olan (bildiğim kadarıyla imkansız) `msg.sender` parametresine güvendiğimize dikkat edin.

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) için çağrı verisi oluştur
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1'de ETH ve ERC-20 arasında ayrım yapmak gerekir.

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

        // l1 köprüsüne mesaj gönder
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Zincirler Arası Fonksiyon: Yatırma *
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

Bu işlev `L1StandardBridge` tarafından çağrılır.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Mesajın kaynağının meşru olduğundan emin olun.
Bu önemlidir çünkü bu işlev `_mint` işlevini çağırır ve köprünün l1'de sahip olduğu token'lar tarafından kapsanmayan token'lar vermek için kullanılabilir.

```solidity
        // Hedef Token'ın uyumlu olduğunu kontrol et ve
        // l1 üzerinde yatırılan Token'ın buradaki l2 yatırılan Token temsiliyle eşleştiğini doğrula
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Mantık kontrolleri:

1. Doğru arayüz destekleniyor
2. L2 ERC-20 sözleşmesinin l1 adresi, token'ların l1 kaynağıyla eşleşiyor

```solidity
        ) {
            // Bir yatırma işlemi sonuçlandırıldığında, l2 üzerindeki hesaba aynı miktarda
            // Token alacak kaydederiz.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Mantık kontrolleri geçerse, yatırma işlemini tamamlayın:

1. Token'ları basın
2. Uygun olayı yayınlayın

```solidity
        } else {
            // Ya yatırma işlemi yapılan l2 Token'ı, l1 Token'ının doğru Adresi
            // konusunda uyuşmuyor ya da doğru arayüzü desteklemiyor.
            // Bu yalnızca kötü niyetli bir l2 Token'ı varsa veya bir kullanıcı bir şekilde
            // yatırma işlemi yapmak için yanlış l2 Token Adresini belirtmişse gerçekleşmelidir.
            // Her iki durumda da, işlemi burada durdururuz ve bir çekim işlemi
            // mesajı oluştururuz, böylece kullanıcılar bazı durumlarda fonlarını geri alabilirler.
            // Kötü niyetli Token Sözleşmelerini tamamen önlemenin bir yolu yoktur, ancak bu
            // kullanıcı hatasını sınırlar ve bazı kötü niyetli Sözleşme davranış biçimlerini hafifletir.
```

Bir kullanıcı yanlış l2 token adresini kullanarak tespit edilebilir bir hata yaptıysa, yatırma işlemini iptal etmek ve token'ları l1'de iade etmek istiyoruz.
Bunu l2'den yapabilmemizin tek yolu, hata itiraz süresini beklemesi gerekecek bir mesaj göndermektir, ancak bu, kullanıcı için token'ları kalıcı olarak kaybetmekten çok daha iyidir.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // yatırılan miktarı göndericiye geri döndürmek için burada _to ve _from değiştirildi
                _from,
                _amount,
                _data
            );

            // l1 köprüsüne mesaj gönder
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Sonuç {#conclusion}

Standart köprü, varlık transferleri için en esnek mekanizmadır.
Ancak, çok genel olduğu için her zaman kullanımı en kolay mekanizma değildir.
Özellikle çekim işlemleri için çoğu kullanıcı, itiraz süresini beklemeyen ve çekim işlemini tamamlamak için bir Merkle kanıtı gerektirmeyen [üçüncü taraf köprüleri](https://optimism.io/apps#bridge) kullanmayı tercih eder.

Bu köprüler tipik olarak, küçük bir ücret karşılığında (genellikle standart bir köprü çekim işlemi için gereken gaz maliyetinden daha az) anında sağladıkları l1'deki varlıklara sahip olarak çalışır.
Köprü (veya onu çalıştıran kişiler) l1 varlıklarının yetersiz kalacağını öngördüğünde, l2'den yeterli varlık transfer eder. Bunlar çok büyük çekim işlemleri olduğundan, çekim maliyeti büyük bir miktar üzerinden amorti edilir ve çok daha küçük bir yüzdeye denk gelir.

Umarım bu makale, katman 2'nin nasıl çalıştığı ve açık ve güvenli Solidity kodunun nasıl yazılacağı hakkında daha fazla bilgi edinmenize yardımcı olmuştur.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).