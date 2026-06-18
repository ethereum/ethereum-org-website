---
title: "ERC-1155 Çoklu Token Standardı"
description: "Tek bir sözleşmede misli ve misli olmayan token'ları birleştiren çoklu token standardı ERC-1155 hakkında bilgi edinin."
lang: tr
---

## Giriş {#introduction}

Birden fazla Token türünü yöneten sözleşmeler için standart bir arayüz. Dağıtılan tek bir sözleşme; misli token'lar, misli olmayan token'lar veya diğer yapılandırmaların (ör. yarı misli token'lar) herhangi bir kombinasyonunu içerebilir.

**Çoklu Token Standardı ile ne kastedilmektedir?**

Fikir basittir ve herhangi bir sayıda misli ve misli olmayan Token türünü temsil edebilen ve kontrol edebilen bir akıllı sözleşme arayüzü oluşturmayı amaçlar. Bu şekilde, ERC-1155 Token'ı bir [ERC-20](/developers/docs/standards/tokens/erc-20/) ve [ERC-721](/developers/docs/standards/tokens/erc-721/) Token'ı ile aynı işlevleri ve hatta her ikisini aynı anda yerine getirebilir. Hem ERC-20 hem de ERC-721 standartlarının işlevselliğini geliştirerek daha verimli hale getirir ve bariz uygulama hatalarını düzeltir.

ERC-1155 Token'ı, [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) içinde tam olarak açıklanmıştır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [Token standartları](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) ve [ERC-721](/developers/docs/standards/tokens/erc-721/) hakkında okumanızı öneririz.

## ERC-1155 İşlevleri ve Özellikleri: {#body}

- [Toplu Transfer](#batch-transfers): Tek bir çağrıda birden fazla varlığı transfer edin.
- [Toplu Bakiye](#batch-balance): Tek bir çağrıda birden fazla varlığın bakiyesini alın.
- [Toplu Onay](#batch-approval): Tüm Token'ları bir adrese onaylayın.
- [Kancalar (Hooks)](#receive-hook): Token alma kancası.
- [NFT Desteği](#nft-support): Arz sadece 1 ise, onu NFT olarak ele alın.
- [Güvenli Transfer Kuralları](#safe-transfer-rule): Güvenli transfer için kurallar dizisi.

### Toplu Transferler {#batch-transfers}

Toplu transfer, normal ERC-20 transferlerine çok benzer şekilde çalışır. Normal ERC-20 `transferFrom` işlevine bakalım:

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

ERC-1155'teki tek fark, değerleri bir dizi olarak geçirmemiz ve ayrıca bir kimlik (id) dizisi geçirmemizdir. Örneğin `ids=[3, 6, 13]` ve `values=[100, 200, 5]` verildiğinde, ortaya çıkan transferler şunlar olacaktır:

1. `_from` adresinden `_to` adresine 3 kimlikli 100 Token transfer edilir.
2. `_from` adresinden `_to` adresine 6 kimlikli 200 Token transfer edilir.
3. `_from` adresinden `_to` adresine 13 kimlikli 5 Token transfer edilir.

ERC-1155'te sadece `transferFrom` vardır, `transfer` yoktur. Normal bir `transfer` gibi kullanmak için, gönderen (from) adresini işlevi çağıran adrese ayarlamanız yeterlidir.

### Toplu Bakiye {#batch-balance}

İlgili ERC-20 `balanceOf` çağrısı da benzer şekilde toplu işlem desteğine sahip bir ortak işleve sahiptir. Hatırlatmak gerekirse, ERC-20 sürümü şöyledir:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Bakiye çağrısı için daha da basiti, tek bir çağrıda birden fazla bakiyeyi alabiliriz. Sahipler dizisini ve ardından Token kimlikleri dizisini geçiririz.

Örneğin `_ids=[3, 6, 13]` ve `_owners=[0xbeef..., 0x1337..., 0x1111...]` verildiğinde, dönüş değeri şu olacaktır:

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

Onaylar ERC-20'den biraz farklıdır. Belirli miktarları onaylamak yerine, `setApprovalForAll` aracılığıyla bir operatörü onaylanmış veya onaylanmamış olarak ayarlarsınız.

Mevcut durumu okumak `isApprovedForAll` aracılığıyla yapılabilir. Görebileceğiniz gibi, bu ya hep ya hiç işlemidir. Kaç Token'ın onaylanacağını veya hangi Token sınıfının onaylanacağını tanımlayamazsınız.

Bu, kasıtlı olarak basitlik göz önünde bulundurularak tasarlanmıştır. Bir adres için yalnızca her şeyi onaylayabilirsiniz.

### Alma Kancası (Receive Hook) {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

[EIP-165](https://eips.ethereum.org/EIPS/eip-165) desteği göz önüne alındığında, ERC-1155 yalnızca akıllı sözleşmeler için alma kancalarını destekler. Kanca işlevi, şu şekilde verilen sihirli, önceden tanımlanmış bir bytes4 değeri döndürmelidir:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Alıcı sözleşme bu değeri döndürdüğünde, sözleşmenin transferi kabul ettiği ve ERC-1155 Token'larını nasıl işleyeceğini bildiği varsayılır. Harika, artık bir sözleşmede sıkışmış Token'lar yok!

### NFT Desteği {#nft-support}

Arz sadece bir olduğunda, Token esasen misli olmayan bir token'dır (NFT). Ve ERC-721 için standart olduğu gibi, bir meta veri URL'si tanımlayabilirsiniz. URL istemciler tarafından okunabilir ve değiştirilebilir, [buraya](https://eips.ethereum.org/EIPS/eip-1155#metadata) bakın.

### Güvenli Transfer Kuralı {#safe-transfer-rule}

Önceki açıklamalarda zaten birkaç güvenli transfer kuralına değindik. Ancak kuralların en önemlilerine bakalım:

1. Çağıranın, `_from` adresi için Token'ları harcaması onaylanmış olmalıdır veya çağıran `_from` adresine eşit olmalıdır.
2. Transfer çağrısı şu durumlarda geri alınmalıdır:
   1. `_to` adresi 0 ise.
   2. `_ids` uzunluğu, `_values` uzunluğu ile aynı değilse.
   3. `_ids` içindeki Token(lar) için sahip(ler)in bakiyelerinden herhangi biri, alıcıya gönderilen `_values` içindeki ilgili miktar(lar)dan düşükse.
   4. Başka herhangi bir hata oluşursa.

_Not_: Kanca dahil tüm toplu işlevler, toplu olmayan sürümler olarak da mevcuttur. Bu, yalnızca bir varlığı transfer etmenin muhtemelen hala en yaygın kullanılan yol olacağı göz önüne alınarak gaz verimliliği için yapılır. Güvenli transfer kuralları da dahil olmak üzere açıklamalarda basitlik sağlamak için bunları dışarıda bıraktık. İsimler aynıdır, sadece 'Batch' (Toplu) kelimesini çıkarın.

## Daha fazla bilgi {#further-reading}

- [EIP-1155: Çoklu Token Standardı](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: OpenZeppelin Belgeleri](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHub Deposu](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)