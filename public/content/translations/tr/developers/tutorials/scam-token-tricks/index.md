---
title: "Dolandırıcı jetonlar tarafından kullanılan bazı hileler ve bunların nasıl tespit edileceği"
description: Bu öğreticide, dolandırıcıların oynadığı bazı hileleri, bunları nasıl uyguladıklarını ve nasıl tespit edebileceğimizi görmek için bir dolandırıcılık jetonunu inceliyoruz.
author: Ori Pomerantz
tags:
  [
    "dolandırıcılık",
    "solidity",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 15/09/2023
lang: tr
---

Bu öğreticide, dolandırıcıların oynadığı bazı hileleri ve bunları nasıl uyguladıklarını görmek için [bir dolandırıcılık jetonunu](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) inceliyoruz. Öğreticinin sonunda, ERC-20 jeton sözleşmeleri, yetenekleri ve şüpheciliğin neden gerekli olduğu hakkında daha kapsamlı bir bakış açısına sahip olacaksınız. Ardından, o dolandırıcı jeton tarafından yayılan olaylara bakıyoruz ve yasal olmadığını otomatik olarak nasıl belirleyebileceğimizi görüyoruz.

## Dolandırıcı jetonlar - nedirler, insanlar neden onları yapar ve onlardan nasıl kaçınılır {#scam-tokens}

Ethereum'un en yaygın kullanımlarından biri, bir grubun bir anlamda kendi para birimi olan ticareti yapılabilen bir token oluşturmasıdır. Ancak, değer getiren meşru kullanım şekilleri bulunan her yerde, söz konusu değeri kendisi için çalmaya çalışan suçlular bulunur.

Bu konu hakkında bir kullanıcı perspektifinden [ethereum.org'un başka bir yerinde](/guides/how-to-id-scam-tokens/) daha fazla bilgi edinebilirsiniz. Bu öğretici, nasıl yapıldığını ve nasıl tespit edilebileceğini görmek için bir dolandırıcılık jetonunu incelemeye odaklanmaktadır.

### wARB'nin bir dolandırıcılık olduğunu nasıl anlarım? {#warb-scam}

İncelediğimiz jeton, yasal [ARB jetonuna](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) eşdeğermiş gibi davranan [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)'dir.

Hangisinin yasal jeton olduğunu bilmenin en kolay yolu, kurucu kuruluş olan [Arbitrum](https://arbitrum.foundation/)'a bakmaktır. Yasal adresler [dokümanlarında](https://docs.arbitrum.foundation/deployment-addresses#token) belirtilmiştir.

### Kaynak kodu neden mevcut? {#why-source}

Normalde başkalarını dolandırmaya çalışan insanların gizli olmasını bekleriz ve gerçekten de birçok dolandırıcı jetonun kodu mevcut değildir (örneğin, [bu](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) ve [bu](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Ancak, yasal jetonlar genellikle kaynak kodlarını yayınlarlar, bu nedenle yasal görünmek için dolandırıcı jetonların yazarları da bazen aynısını yapar. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), kaynak kodu mevcut olan ve bu sayede anlaşılması daha kolay olan jetonlardan biridir.

Sözleşme dağıtıcıları kaynak kodunu yayınlayıp yayınlamamayı seçebilse de, yanlış kaynak kodunu yayınlayamazlar. Blok gezgini, sağlanan kaynak kodunu bağımsız olarak derler ve tam olarak aynı bit kodunu elde etmezse, o kaynak kodunu reddeder. [Bu konu hakkında Etherscan sitesinde daha fazla bilgi edinebilirsiniz](https://etherscan.io/verifyContract).

## Yasal ERC-20 jetonlarıyla karşılaştırma {#compare-legit-erc20}

Bu jetonu yasal ERC-20 jetonlarıyla karşılaştıracağız. Yasal ERC-20 jetonlarının tipik olarak nasıl yazıldığına aşina değilseniz, [bu öğreticiye bakın](/developers/tutorials/erc20-annotated-code/).

### Ayrıcalıklı adresler için sabitler {#constants-for-privileged-addresses}

Sözleşmeler bazen ayrıcalıklı adreslere ihtiyaç duyar. Uzun süreli kullanım için tasarlanan sözleşmeler, örneğin yeni bir çoklu imza sözleşmesinin kullanımını sağlamak için bazı ayrıcalıklı adreslerin bu adresleri değiştirmesine izin verir. Bunu yapmanın birkaç yolu vardır.

[`HOP` jeton sözleşmesi](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code), [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) modelini kullanır. Ayrıcalıklı adres, `_owner` adlı bir alanda depolamada tutulur (üçüncü dosyaya bakın, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` jeton sözleşmesi](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) doğrudan ayrıcalıklı bir adrese sahip değildir. Ancak, bir tanesine ihtiyacı yoktur. [`0xb50721bcf8d664c30412cfbc6cf7a15145234ad1` adresindeki](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) bir [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy)'nin arkasında yer alır. Bu sözleşmenin yükseltmeler için kullanılabilecek ayrıcalıklı bir adresi vardır (dördüncü dosyaya bakın, `ERC1967Upgrade.sol`).

```solidity
    /**
     * @dev EIP1967 yönetici yuvasında yeni bir adres saklar.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: yeni yönetici sıfır adresidir");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Buna karşılık, `wARB` sözleşmesi sabit kodlanmış bir `contract_owner`'a sahiptir.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Bu sözleşme sahibi](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33), farklı zamanlarda farklı hesaplar tarafından kontrol edilebilecek bir sözleşme değil, [harici olarak sahip olunan bir hesaptır](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Bu, muhtemelen değerli kalacak bir ERC-20'yi kontrol etmek için uzun vadeli bir çözümden ziyade, bir birey tarafından kısa süreli kullanım için tasarlandığı anlamına gelir.

Ve gerçekten de, Etherscan'e baktığımızda, dolandırıcının bu sözleşmeyi 19 Mayıs 2023'te yalnızca 12 saat boyunca kullandığını görüyoruz ([ilk işlem](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2)'den [son işleme](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)).

### Sahte `_transfer` fonksiyonu {#the-fake-transfer-function}

Gerçek transferlerin [dahili bir `_transfer` fonksiyonu](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) kullanılarak yapılması standarttır.

`wARB`'de bu fonksiyon neredeyse yasal görünüyor:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: sıfır adresten transfer");
        require(recipient != address(0), "ERC20: sıfır adrese transfer");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer tutarı bakiyeyi aşıyor");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Şüpheli kısım şudur:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Sözleşme sahibi jeton gönderirse, `Transfer` olayı neden `deployer`'dan geldiklerini gösteriyor?

Ancak, daha önemli bir sorun var. Bu `_transfer` fonksiyonunu kim çağırıyor? Dışarıdan çağrılamaz, `internal` olarak işaretlenmiştir. Ve elimizdeki kod, `_transfer`'a herhangi bir çağrı içermiyor. Açıkçası, bu bir yem olarak burada.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer tutarı yetkiyi aşıyor"));
        return true;
    }
```

Jetonları transfer etmek için çağrılan fonksiyonlara, `transfer` ve `transferFrom`'a baktığımızda, tamamen farklı bir fonksiyon olan `_f_`'yi çağırdıklarını görüyoruz.

### Gerçek `_f_` fonksiyonu {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: sıfır adresten transfer");
        require(recipient != address(0), "ERC20: sıfır adrese transfer");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer tutarı bakiyeyi aşıyor");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Bu fonksiyonda iki potansiyel tehlike işareti var.

- [Fonksiyon değiştirici](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` kullanımı. Ancak, kaynak koduna baktığımızda `_mod_`'un aslında zararsız olduğunu görüyoruz.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- `_transfer`'de gördüğümüz aynı sorun, yani `contract_owner` jeton gönderdiğinde, jetonların `deployer`'dan geliyormuş gibi görünmesi.

### Sahte olaylar fonksiyonu `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Şimdi gerçek bir dolandırıcılığa benzeyen bir şeye geldik. Okunabilirlik için fonksiyonu biraz düzenledim, ancak işlevsel olarak eşdeğerdir.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Bu fonksiyon, yalnızca sözleşme sahibi tarafından çağrılabileceği anlamına gelen `auth()` değiştiricisine sahiptir.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Etkileşime izin verilmiyor");
    _;
}
```

Bu kısıtlama son derece mantıklıdır, çünkü rastgele hesapların jeton dağıtmasını istemeyiz. Ancak, fonksiyonun geri kalanı şüphelidir.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Bir havuz hesabından bir alıcı dizisine bir miktar dizisi transfer etmek için bir fonksiyon son derece mantıklıdır. Maaş bordrosu, airdrop'lar vb. gibi tek bir kaynaktan birden çok hedefe jeton dağıtmak isteyeceğiniz birçok kullanım durumu vardır. Birden çok işlem yayınlamak veya hatta aynı işlemin bir parçası olarak farklı bir sözleşmeden ERC-20'yi birden çok kez çağırmak yerine bunu tek bir işlemde yapmak (gaz açısından) daha ucuzdur.

Ancak, `dropNewTokens` bunu yapmaz. [`Transfer` olayları](https://eips.ethereum.org/EIPS/eip-20#transfer-1) yayar, ancak aslında herhangi bir jeton transfer etmez. Zincir dışı uygulamaların kafasını gerçekten gerçekleşmemiş bir transferden bahsederek karıştırmak için meşru bir neden yoktur.

### Yakan `Approve` fonksiyonu {#the-burning-approve-function}

ERC-20 sözleşmelerinin yetkiler için [bir `approve` fonksiyonuna](/developers/tutorials/erc20-annotated-code/#approve) sahip olması gerekir ve gerçekten de dolandırıcı jetonumuzun böyle bir fonksiyonu vardır ve hatta doğrudur. Ancak, Solidity C'den türediği için büyük/küçük harfe duyarlıdır. `Approve` ve `approve` farklı dizelerdir.

Ayrıca, işlevsellik `approve` ile ilgili değildir.

```solidity
    function Approve(
        address[] memory holders)
```

Bu fonksiyon, jeton sahiplerinin adreslerinden oluşan bir dizi ile çağrılır.

```solidity
    public approver() {
```

`approver()` değiştiricisi, bu fonksiyonu yalnızca `contract_owner`'ın çağırmasına izin verildiğinden emin olur (aşağıya bakın).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: yakma miktarı bakiyeyi aşıyor");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Her sahip adresi için fonksiyon, sahibin tüm bakiyesini `0x00...01` adresine taşır ve etkin bir şekilde yakar (standarttaki gerçek `burn` aynı zamanda toplam arzı da değiştirir ve jetonları `0x00...00`'a transfer eder). Bu, `contract_owner`'ın herhangi bir kullanıcının varlıklarını kaldırabileceği anlamına gelir. Bu, bir yönetişim jetonunda isteyeceğiniz bir özellik gibi görünmüyor.

### Kod kalitesi sorunları {#code-quality-issues}

Bu kod kalitesi sorunları, bu kodun bir dolandırıcılık olduğunu _kanıtlamaz_, ancak şüpheli görünmesini sağlar. Arbitrum gibi organize şirketler genellikle bu kadar kötü kod yayınlamazlar.

#### `mount` fonksiyonu {#the-mount-function}

[Standartta](https://eips.ethereum.org/EIPS/eip-20) belirtilmemiş olsa da, genel olarak yeni jetonlar oluşturan fonksiyon [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) olarak adlandırılır.

`wARB` yapıcısına bakarsak, mint (basma) fonksiyonunun bir nedenle `mount` olarak yeniden adlandırıldığını ve verimlilik için tüm miktar için bir kez yerine, ilk arzın beşte biri ile beş kez çağrıldığını görüyoruz.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

`mount` fonksiyonunun kendisi de şüphelidir.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: sıfır adrese basım");
```

`require`'a baktığımızda, yalnızca sözleşme sahibinin basım yapmasına izin verildiğini görüyoruz. Bu yasal. Ancak hata mesajı _yalnızca sahip basım yapabilir_ veya buna benzer bir şey olmalıdır. Bunun yerine, alakasız _ERC20: sıfır adrese basım_ şeklindedir. Sıfır adrese basım için doğru test, `require(account != address(0), "<hata mesajı>")` şeklindedir ki sözleşme bunu kontrol etme zahmetine girmez.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Basımla doğrudan ilgili iki şüpheli gerçek daha var:

- Bir `account` parametresi var, ki bu muhtemelen basılan miktarı alması gereken hesaptır. Ancak artan bakiye aslında `contract_owner`'ın.

- Artan bakiye `contract_owner`'a aitken, yayılan olay `account`'a bir transfer gösterir.

### Neden hem `auth` hem de `approver`? Neden hiçbir şey yapmayan `mod`? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Bu sözleşme üç değiştirici içerir: `_mod_`, `auth` ve `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` üç parametre alır ve onlarla hiçbir şey yapmaz. Neden var?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Etkileşime izin verilmiyor");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Etkileşime izin verilmiyor");
        _;
    }
```

`auth` ve `approver` daha mantıklıdır, çünkü sözleşmenin `contract_owner` tarafından çağrıldığını kontrol ederler. Basım gibi belirli ayrıcalıklı eylemlerin o hesapla sınırlı olmasını bekleriz. Ancak, _tam olarak aynı şeyi yapan_ iki ayrı fonksiyona sahip olmanın ne anlamı var?

## Otomatik olarak ne tespit edebiliriz? {#what-can-we-detect-automatically}

Etherscan'e bakarak `wARB`'nin bir dolandırıcılık jetonu olduğunu görebiliriz. Ancak, bu merkezi bir çözümdür. Teorik olarak, Etherscan altüst edilebilir veya hacklenebilir. Bir jetonun yasal olup olmadığını bağımsız olarak anlayabilmek daha iyidir.

Bir ERC-20 jetonunun şüpheli olduğunu (ya bir dolandırıcılık ya da çok kötü yazılmış) yaydıkları olaylara bakarak belirlemek için kullanabileceğimiz bazı hileler vardır.

## Şüpheli `Approval` olayları {#suspicious-approval-events}

[`Approval` olayları](https://eips.ethereum.org/EIPS/eip-20#approval) yalnızca doğrudan bir istekle gerçekleşmelidir ([`Transfer` olaylarının](https://eips.ethereum.org/EIPS/eip-20#transfer-1) aksine, bir yetkinin sonucu olarak gerçekleşebilir). Bu sorunun ayrıntılı bir açıklaması ve isteklerin neden bir sözleşme aracılığıyla değil de doğrudan olması gerektiği için [Solidity belgelerine bakın](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin).

Bu, [harici olarak sahip olunan bir hesaptan](/developers/docs/accounts/#types-of-account) harcamayı onaylayan `Approval` olaylarının, o hesapta başlayan ve hedefi ERC-20 sözleşmesi olan işlemlerden gelmesi gerektiği anlamına gelir. Harici olarak sahip olunan bir hesaptan gelen diğer her türlü onay şüphelidir.

İşte tür güvenliğine sahip bir JavaScript çeşidi olan [viem](https://viem.sh/) ve [TypeScript](https://www.typescriptlang.org/docs/) kullanarak [bu tür bir olayı tanımlayan bir program](https://github.com/qbzzt/20230915-scam-token-detection). Çalıştırmak için:

1. `.env.example` dosyasını `.env` olarak kopyalayın.
2. Bir Ethereum ana ağ düğümünün URL'sini sağlamak için `.env` dosyasını düzenleyin.
3. Gerekli paketleri kurmak için `pnpm install` komutunu çalıştırın.
4. Şüpheli onayları aramak için `pnpm susApproval` komutunu çalıştırın.

İşte satır satır bir açıklama:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

`viem`'den tür tanımlarını, fonksiyonları ve zincir tanımını içe aktarın.

```typescript
import { config } from "dotenv"
config()
```

URL'yi almak için `.env` dosyasını okuyun.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Bir Viem istemcisi oluşturun. Yalnızca blokzincirden okuma yapmamız gerekiyor, bu nedenle bu istemcinin bir özel anahtara ihtiyacı yok.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Şüpheli ERC-20 sözleşmesinin adresi ve olayları arayacağımız bloklar. Düğüm sağlayıcıları, bant genişliği pahalı olabileceğinden olayları okuma yeteneğimizi genellikle sınırlar. Neyse ki `wARB` on sekiz saatlik bir süre boyunca kullanılmadı, bu yüzden tüm olaylara bakabiliriz (toplamda sadece 13 tane vardı).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Bu, Viem'den olay bilgisi istemenin yoludur. Alan adları da dahil olmak üzere tam olay imzasını sağladığımızda, olayı bizim için ayrıştırır.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Algoritmamız yalnızca harici olarak sahip olunan hesaplar için geçerlidir. `client.getBytecode` tarafından döndürülen herhangi bir bit kodu varsa, bu bir sözleşme olduğu anlamına gelir ve onu atlamalıyız.

Daha önce TypeScript kullanmadıysanız, fonksiyon tanımı biraz garip görünebilir. Sadece ilk (ve tek) parametrenin `addr` olarak adlandırıldığını değil, aynı zamanda `Address` türünde olduğunu da söylüyoruz. Benzer şekilde, `: boolean` kısmı TypeScript'e fonksiyonun dönüş değerinin bir boole değeri olduğunu söyler.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Bu fonksiyon, bir olaydan işlem makbuzunu alır. İşlem hedefinin ne olduğunu bildiğimizden emin olmak için makbuza ihtiyacımız var.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Bu, bir olayın şüpheli olup olmadığına gerçekten karar veren en önemli fonksiyondur. Dönüş türü, `(Event | null)`, TypeScript'e bu fonksiyonun bir `Event` veya `null` döndürebileceğini söyler. Olay şüpheli değilse `null` döndürürüz.

```typescript
const owner = ev.args._owner
```

Viem'de alan adları var, bu yüzden olayı bizim için ayrıştırdı. `_owner`, harcanacak jetonların sahibidir.

```typescript
// Sözleşmeler tarafından yapılan onaylar şüpheli değildir
if (await isContract(owner)) return null
```

Sahip bir sözleşme ise, bu onayın şüpheli olmadığını varsayın. Bir sözleşmenin onayının şüpheli olup olmadığını kontrol etmek için, işlemin tam yürütmesini takip ederek sahip sözleşmesine ulaşıp ulaşmadığını ve bu sözleşmenin doğrudan ERC-20 sözleşmesini çağırıp çağırmadığını görmemiz gerekecek. Bu, yapmak istediğimizden çok daha fazla kaynak gerektirir.

```typescript
const txn = await getEventTxn(ev)
```

Onay harici olarak sahip olunan bir hesaptan geliyorsa, buna neden olan işlemi alın.

```typescript
// Onay, işlemin `from`'u olmayan bir EOA sahibinden geliyorsa şüphelidir
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Sadece dize eşitliğini kontrol edemeyiz çünkü adresler onaltılıktır, bu yüzden harf içerirler. Bazen, örneğin `txn.from`'da, bu harflerin hepsi küçük harftir. Diğer durumlarda, örneğin `ev.args._owner`'da, adres [hata tespiti için karışık büyük/küçük harf](https://eips.ethereum.org/EIPS/eip-55) şeklindedir.

Ancak işlem sahibinden değilse ve bu sahip harici olarak sahip olunuyorsa, şüpheli bir işlemimiz var demektir.

```typescript
// İşlem hedefi, araştırdığımız ERC-20 sözleşmesi değilse de şüphelidir
// 
if (txn.to.toLowerCase() != testedAddress) return ev
```

Benzer şekilde, işlemin `to` adresi, yani çağrılan ilk sözleşme, araştırılan ERC-20 sözleşmesi değilse, şüphelidir.

```typescript
    // Şüphelenmek için bir neden yoksa null döndürün.
    return null
}
```

Her iki koşul da doğru değilse `Approval` olayı şüpheli değildir.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Bir `async` fonksiyonu](https://www.w3schools.com/js/js_async.asp) bir `Promise` nesnesi döndürür. Yaygın sözdizimi olan `await x()` ile, işlemeye devam etmeden önce o `Promise`'in yerine getirilmesini bekleriz. Bunu programlamak ve takip etmek basittir, ancak aynı zamanda verimsizdir. Belirli bir olay için `Promise`'in yerine getirilmesini beklerken, bir sonraki olay üzerinde çalışmaya başlayabiliriz.

Burada bir `Promise` nesneleri dizisi oluşturmak için [`map`](https://www.w3schools.com/jsref/jsref_map.asp) kullanıyoruz. Ardından, tüm bu sözlerin çözülmesini beklemek için [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) kullanırız. Daha sonra şüpheli olmayan olayları kaldırmak için bu sonuçları [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) ederiz.

### Şüpheli `Transfer` olayları {#suspicious-transfer-events}

Dolandırıcı jetonları belirlemenin bir başka olası yolu da şüpheli transferleri olup olmadığına bakmaktır. Örneğin, o kadar çok jetonu olmayan hesaplardan yapılan transferler. [Bu testin nasıl uygulanacağını](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts) görebilirsiniz, ancak `wARB`'de bu sorun yoktur.

## Sonuç {#conclusion}

ERC-20 dolandırıcılıklarının otomatik olarak tespiti [yanlış negatiflerden](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) muzdariptir, çünkü bir dolandırıcılık, sadece gerçek bir şeyi temsil etmeyen tamamen normal bir ERC-20 jeton sözleşmesi kullanabilir. Bu yüzden her zaman _jeton adresini güvenilir bir kaynaktan almayı_ denemelisiniz.

Otomatik algılama, çok sayıda jetonun bulunduğu ve otomatik olarak işlenmesi gereken DeFi parçaları gibi belirli durumlarda yardımcı olabilir. Ancak her zaman olduğu gibi [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), kendi araştırmanızı yapın ve kullanıcılarınızı da aynısını yapmaya teşvik edin.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).
