---
title: ERC-1155 Çoklu Token Standardı
description: Değiştirilebilir ve değiştirilemez jetonları tek bir sözleşmede birleştiren çoklu jeton standardı olan ERC-1155 hakkında bilgi edinin.
lang: tr
---

## Giriş {#introduction}

Birden çok token türünü yöneten sözleşmeler için standart bir arayüz. Dağıtılmış tek bir sözleşme, değiştirilebilir jetonların, değiştirilemez jetonların veya diğer yapılandırmaların (ör. yarı-değiştirilebilir jetonlar) herhangi bir kombinasyonunu içerebilir.

**Çoklu-Token Standardı ne anlama geliyor?**

Basit bir fikirdir: Herhangi bir sayıda değiştirilebilir ve değiştirilemez token türünü temsil edebilen ve kontrol edebilen bir akıllı sözleşme arayüzü oluşturmayı amaçlar. Bu şekilde, ERC-1155 jetonu, bir [ERC-20](/developers/docs/standards/tokens/erc-20/) ve [ERC-721](/developers/docs/standards/tokens/erc-721/) jetonu ile aynı işlevleri ve hatta her ikisini aynı anda yapabilir. Bu, hem ERC-20 hem de ERC-721 standartlarının işlevselliğini iyileştirerek daha verimli kılar ve bariz uygulama hatalarını düzeltir.

ERC-1155 jetonu, [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) belgesinde tamamen açıklanmıştır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [jeton standartları](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) ve [ERC-721](/developers/docs/standards/tokens/erc-721/) hakkında bilgi edinmenizi öneririz.

## ERC-1155 Fonksiyonları ve Özellikleri: {#body}

- [Toplu Aktarım](#batch_transfers): Tek bir çağrıda birden çok varlığı aktarın.
- [Toplu Bakiye](#batch_balance): Tek bir çağrıda birden fazla varlığın bakiyesini alın.
- [Toplu Onay](#batch_approval): Bir adrese tüm jetonları onaylayın.
- [Kancalar](#receive_hook): Jeton alma kancası.
- [NFT Desteği](#nft_support): Arz yalnızca 1 ise bunu NFT olarak kabul edin.
- [Güvenli Aktarım Kuralları](#safe_transfer_rule): Güvenli aktarım için kurallar dizisi.

### Toplu Aktarımlar {#batch-transfers}

Toplu aktarım, normal ERC-20 aktarımlarına çok benzer şekilde çalışır. Normal ERC-20 transferFrom fonksiyonuna bakalım:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

ERC-1155'teki tek fark, değerleri bir dizi olarak geçirmemiz ve ayrıca bir dizi kimlik geçirmemizdir. Örneğin, `ids=[3, 6, 13]` ve `values=[100, 200, 5]` verildiğinde, sonuçta ortaya çıkan transferler şöyle olacaktır

1. 3 kimliğine sahip 100 jetonu `_from` adresinden `_to` adresine transfer edin.
2. 6 kimliğine sahip 200 jetonu `_from` adresinden `_to` adresine transfer edin.
3. 13 kimliğine sahip 5 jetonu `_from` adresinden `_to` adresine transfer edin.

ERC-1155'te yalnızca `transferFrom` vardır, `transfer` yoktur. Normal bir `transfer` gibi kullanmak için, gönderen adresini fonksiyonu çağıran adrese ayarlamanız yeterlidir.

### Toplu Bakiye {#batch-balance}

İlgili ERC-20 `balanceOf` çağrısı da benzer şekilde toplu destekli bir partner fonksiyona sahiptir. Bir hatırlatma olarak, ERC-20 sürümü şudur:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Bakiye çağrısı için daha da basit şekilde tek bir aramada birden fazla bakiye alabiliriz. Sahip dizisini ve ardından token kimlikleri dizisini geçiriyoruz.

Örneğin `_ids=[3, 6, 13]` ve `_owners=[0xbeef..., 0x1337..., 0x1111...]` verildiğinde, dönüş değeri şöyle olacaktır

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Toplu Onay {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Onaylar, ERC-20'den biraz farklıdır. Belirli tutarları onaylamak yerine, `setApprovalForAll` aracılığıyla bir operatörü onaylanmış veya onaylanmamış olarak ayarlarsınız.

Mevcut durumu okuma işlemi `isApprovedForAll` aracılığıyla yapılabilir. Gördüğünüz gibi, bir "ya hep ya hiç" işlemidir. Kaç token onaylanacağını ve hatta hangi token sınıflarının onaylanacağını tanımlayamazsınız.

Bu kasıtlı olarak basitlik göz önünde bulundurularak tasarlanmıştır. Her şeyi yalnızca bir adres için onaylayabilirsiniz.

### Alma Kancası {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

[EIP-165](https://eips.ethereum.org/EIPS/eip-165) desteği sayesinde ERC-1155, yalnızca akıllı sözleşmeler için alma kancalarını destekler. Kanca fonksiyonu, şu şekilde olan bir sihirli önceden tanımlanmış bytes4 değeri döndürmelidir:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Alıcı sözleşme bu değeri döndürdüğünde, sözleşmenin aktarımı kabul ettiği ve ERC-1155 token'larını nasıl kullanacağını bildiği varsayılır. Harika, artık bir sözleşmede sıkışmış token'lar yok!

### NFT Desteği {#nft-support}

Arz yalnızca bir olduğunda, token esasen bir değiştirilemez token'dır (NFT). Ve ERC-721 için standart olduğu gibi, bir meta veri URL'si tanımlayabilirsiniz. URL, istemciler tarafından okunabilir ve değiştirilebilir, [buraya](https://eips.ethereum.org/EIPS/eip-1155#metadata) bakın.

### Güvenli Aktarım Kuralı {#safe-transfer-rule}

Birkaç güvenli aktarım kuralına daha önceki açıklamalarda değinmiştik. Ama kuralların en önemlisine bir bakalım:

1. Çağıran, `_from` adresi için jetonları harcamak üzere onaylanmış olmalı veya çağıran `_from` ile aynı olmalıdır.
2. Transfer çağrısı şu durumlarda geri dönmelidir
   1. `_to` adresinin 0 olması.
   2. `_ids` uzunluğunun `_values` uzunluğu ile aynı olmaması.
   3. `_ids` içindeki jetonlar için sahiplerin bakiyelerinden herhangi birinin, alıcıya gönderilen `_values` içindeki ilgili tutarlardan daha düşük olması.
   4. başka herhangi bir hata gerçekleşirse.

_Not_: Kanca dâhil tüm toplu fonksiyonlar, toplu olmayan sürümler olarak da mevcuttur. Bu, yalnızca bir varlığın aktarılmasının muhtemelen hâlâ en yaygın kullanılan yol olacağı düşünülerek, gaz verimliliği için yapılır. Güvenli aktarım kuralları da dahil olmak üzere açıklamalarda basitlik için bunlardan bahsetmedik. İsimler aynıdır: Sadece "Batch"i kaldırın.

## Daha fazla kaynak {#further-reading}

- [EIP-1155: Çoklu Jeton Standardı](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Openzeppelin Dokümanları](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHub Deposu](https://github.com/enjin/erc-1155)
- [Alchemy NFT API'si](https://www.alchemy.com/docs/reference/nft-api-quickstart)
