---
title: "Dolandırıcı token'ların kullandığı bazı hileler ve bunları tespit etme yöntemleri"
description: "Bu eğitimde, dolandırıcıların oynadığı bazı hileleri, bunları nasıl uyguladıklarını ve nasıl tespit edebileceğimizi görmek için dolandırıcı bir token'ı inceliyoruz."
author: Ori Pomerantz
tags: ["dolandırıcılık", "Solidity", "erc-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: "Dolandırıcı token hileleri"
published: 2023-09-15
lang: tr
---

Bu eğitimde, dolandırıcıların oynadığı bazı hileleri ve bunları nasıl uyguladıklarını görmek için [dolandırıcı bir token'ı](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) inceliyoruz. Eğitimin sonunda, ERC-20 token sözleşmeleri, yetenekleri ve şüpheciliğin neden gerekli olduğu hakkında daha kapsamlı bir görüşe sahip olacaksınız. Ardından, bu dolandırıcı token tarafından yayımlanan olaylara bakıyor ve bunun meşru olmadığını otomatik olarak nasıl belirleyebileceğimizi görüyoruz.

## Dolandırıcı token'lar - nedir, insanlar neden bunları yapar ve bunlardan nasıl kaçınılır {#scam-tokens}

Ethereum'un en yaygın kullanımlarından biri, bir grubun ticareti yapılabilir bir token, bir anlamda kendi para birimini yaratmasıdır. Ancak, değer getiren meşru kullanım durumlarının olduğu her yerde, bu değeri kendileri için çalmaya çalışan suçlular da vardır.

Bu konu hakkında daha fazla bilgiyi kullanıcı perspektifinden [ethereum.org'un başka bir yerinde](/guides/how-to-id-scam-tokens/) okuyabilirsiniz. Bu eğitim, bunun nasıl yapıldığını ve nasıl tespit edilebileceğini görmek için dolandırıcı bir token'ı incelemeye odaklanmaktadır.

### wARB'ın bir dolandırıcılık olduğunu nasıl anlarım? {#warb-scam}

İncelediğimiz token, meşru [ARB token'ına](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) eşdeğermiş gibi davranan [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)'tır.

Hangisinin meşru token olduğunu anlamanın en kolay yolu, onu oluşturan organizasyona, yani [Arbitrum](https://arbitrum.foundation/)'a bakmaktır. Meşru adresler [kendi belgelerinde](https://docs.arbitrum.foundation/deployment-addresses#token) belirtilmiştir.

### Kaynak kodu neden mevcut? {#why-source}

Normalde başkalarını dolandırmaya çalışan kişilerin gizli olmasını bekleriz ve gerçekten de birçok dolandırıcı token'ın kodu mevcut değildir (örneğin, [bu](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) ve [bu](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Ancak, meşru token'lar genellikle kaynak kodlarını yayımlar, bu nedenle meşru görünmek için dolandırıcı token yazarları da bazen aynısını yapar. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), kaynak kodu mevcut olan bu token'lardan biridir ve bu da onu anlamayı kolaylaştırır.

Sözleşme dağıtıcıları kaynak kodunu yayımlayıp yayımlamamayı seçebilseler de, yanlış kaynak kodunu _yayımlayamazlar_. Blok gezgini, sağlanan kaynak kodunu bağımsız olarak derler ve tam olarak aynı baytkodu elde edemezse, o kaynak kodunu reddeder. [Bu konu hakkında daha fazla bilgiyi Etherscan sitesinde okuyabilirsiniz](https://etherscan.io/verifyContract).

## Meşru ERC-20 token'ları ile karşılaştırma {#compare-legit-erc20}

Bu token'ı meşru ERC-20 token'ları ile karşılaştıracağız. Meşru ERC-20 token'larının tipik olarak nasıl yazıldığına aşina değilseniz, [bu eğitime bakın](/developers/tutorials/erc20-annotated-code/).

### Ayrıcalıklı adresler için sabitler {#constants-for-privileged-addresses}

Sözleşmeler bazen ayrıcalıklı adreslere ihtiyaç duyar. Uzun vadeli kullanım için tasarlanmış sözleşmeler, örneğin yeni bir çoklu imza sözleşmesinin kullanımını sağlamak için bazı ayrıcalıklı adreslerin bu adresleri değiştirmesine izin verir. Bunu yapmanın birkaç yolu vardır.

[`HOP` token sözleşmesi](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code), [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) modelini kullanır. Ayrıcalıklı adres, depolamada `_owner` adlı bir alanda tutulur (üçüncü dosyaya, `Ownable.sol`'ye bakın).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` token sözleşmesinin](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) doğrudan ayrıcalıklı bir adresi yoktur. Ancak, buna ihtiyacı da yoktur. [`0xb50721bcf8d664c30412cfbc6cf7a15145234ad1` adresindeki](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) bir [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy)'nin arkasında yer alır. Bu sözleşmenin yükseltmeler için kullanılabilecek ayrıcalıklı bir adresi vardır (dördüncü dosyaya, `ERC1967Upgrade.sol`'ye bakın).

```solidity
    /**
     * @dev EIP1967 admin yuvasında yeni bir Adres depolar.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Buna karşılık, `wARB` sözleşmesinin koda gömülü (hard coded) bir `contract_owner`'i vardır.

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

[Bu sözleşme sahibi](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33), farklı zamanlarda farklı hesaplar tarafından kontrol edilebilecek bir sözleşme değil, [harici olarak sahip olunan bir hesaptır](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Bu, muhtemelen değerli kalacak bir ERC-20'yi kontrol etmek için uzun vadeli bir çözümden ziyade, bir birey tarafından kısa vadeli kullanım için tasarlandığı anlamına gelir.

Ve gerçekten de, Etherscan'e bakarsak, dolandırıcının bu sözleşmeyi 19 Mayıs 2023'te yalnızca 12 saat boyunca ([ilk işlemden](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) [son işleme](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b) kadar) kullandığını görürüz.

### Sahte `_transfer` işlevi {#the-fake-transfer-function}

Gerçek transferlerin [dahili bir `_transfer` işlevi](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) kullanılarak gerçekleşmesi standarttır.

`wARB` içinde bu işlev neredeyse meşru görünür:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
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

Sözleşme sahibi token gönderiyorsa, `Transfer` olayı neden bunların `deployer`'den geldiğini gösteriyor?

Ancak, daha önemli bir sorun var. Bu `_transfer` işlevini kim çağırıyor? Dışarıdan çağrılamaz, `internal` olarak işaretlenmiştir. Ve elimizdeki kod `_transfer`'ye herhangi bir çağrı içermiyor. Açıkçası, burada bir yem olarak bulunuyor.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Token'ları transfer etmek için çağrılan işlevlere, yani `transfer` ve `transferFrom`'ye baktığımızda, tamamen farklı bir işlevi, `_f_`'yi çağırdıklarını görüyoruz.

### Gerçek `_f_` işlevi {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Bu işlevde iki potansiyel tehlike işareti (red flag) vardır.

- [İşlev değiştiricisinin (function modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` kullanımı. Ancak, kaynak koduna baktığımızda `_mod_`'ün aslında zararsız olduğunu görüyoruz.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- `_transfer`'de gördüğümüz aynı sorun, yani `contract_owner` token gönderdiğinde bunların `deployer`'den geliyormuş gibi görünmesi.

### Sahte olaylar işlevi `dropNewTokens` {#the-fake-events-function-dropnewtokens}

Şimdi gerçek bir dolandırıcılığa benzeyen bir şeye geliyoruz. Okunabilirlik için işlevi biraz düzenledim, ancak işlevsel olarak eşdeğerdir.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Bu işlev, yalnızca sözleşme sahibi tarafından çağrılabileceği anlamına gelen `auth()` değiştiricisine sahiptir.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Bu kısıtlama son derece mantıklıdır, çünkü rastgele hesapların token dağıtmasını istemeyiz. Ancak, işlevin geri kalanı şüphelidir.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Bir havuz hesabından bir alıcı dizisine bir miktar dizisi transfer eden bir işlev son derece mantıklıdır. Maaş bordrosu, airdrop'lar vb. gibi tek bir kaynaktan birden fazla hedefe token dağıtmak isteyeceğiniz birçok kullanım durumu vardır. Bunu birden fazla işlem yapmak veya hatta aynı işlemin bir parçası olarak farklı bir sözleşmeden ERC-20'yi birden çok kez çağırmak yerine tek bir işlemde yapmak (Gaz açısından) daha ucuzdur.

Ancak, `dropNewTokens` bunu yapmaz. [`Transfer` olayları](https://eips.ethereum.org/EIPS/eip-20#transfer-1) yayımlar, ancak aslında hiçbir token transfer etmez. Zincir dışı uygulamalara gerçekten gerçekleşmemiş bir transferden bahsederek kafalarını karıştırmak için meşru bir neden yoktur.

### Yakım yapan `Approve` işlevi {#the-burning-approve-function}

ERC-20 sözleşmelerinin harcama izinleri için [bir `approve` işlevine](/developers/tutorials/erc20-annotated-code/#approve) sahip olması gerekir ve gerçekten de dolandırıcı token'ımızın böyle bir işlevi vardır ve hatta doğrudur. Ancak, Solidity C'den türediği için büyük/küçük harf duyarlıdır. "Approve" ve "approve" farklı dizelerdir.

Ayrıca, işlevsellik `approve` ile ilgili değildir.

```solidity
    function Approve(
        address[] memory holders)
```

Bu işlev, token sahiplerinin adreslerinden oluşan bir dizi ile çağrılır.

```solidity
    public approver() {
```

`approver()` değiştiricisi, yalnızca `contract_owner`'in bu işlevi çağırmasına izin verildiğinden emin olur (aşağıya bakın).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Her sahip adresi için işlev, sahibinin tüm bakiyesini `0x00...01` adresine taşır ve etkili bir şekilde yakım işlemini gerçekleştirir (standarttaki gerçek `burn` ayrıca toplam arzı değiştirir ve token'ları `0x00...00` adresine transfer eder). Bu, `contract_owner`'in herhangi bir kullanıcının varlıklarını kaldırabileceği anlamına gelir. Bu, bir yönetişim token'ında isteyeceğiniz bir özellik gibi görünmüyor.

### Kod kalitesi sorunları {#code-quality-issues}

Bu kod kalitesi sorunları, bu kodun bir dolandırıcılık olduğunu _kanıtlamaz_, ancak şüpheli görünmesine neden olur. Arbitrum gibi organize şirketler genellikle bu kadar kötü kod yayımlamazlar.

#### `mount` işlevi {#the-mount-function}

[Standartta](https://eips.ethereum.org/EIPS/eip-20) belirtilmemiş olsa da, genel olarak yeni token'lar oluşturan işleve [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) adı verilir.

`wARB` kurucusuna bakarsak, basım işlevinin bir nedenden dolayı `mount` olarak yeniden adlandırıldığını ve verimlilik için tüm miktar için bir kez çağrılmak yerine, ilk arzın beşte biri ile beş kez çağrıldığını görürüz.

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

`mount` işlevinin kendisi de şüphelidir.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

`require`'ye baktığımızda, yalnızca sözleşme sahibinin basım yapmasına izin verildiğini görüyoruz. Bu meşrudur. Ancak hata mesajı _only owner is allowed to mint_ (yalnızca sahibin basım yapmasına izin verilir) veya buna benzer bir şey olmalıdır. Bunun yerine, alakasız bir şekilde _ERC20: mint to the zero address_ (ERC20: sıfır adresine basım) mesajı verilmektedir. Sıfır adresine basım yapmak için doğru test `require(account != address(0), "<error message>")`'dir ve sözleşme bunu kontrol etme zahmetine bile girmez.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Doğrudan basım ile ilgili iki şüpheli gerçek daha vardır:

- Muhtemelen basılan miktarı alması gereken hesap olan bir `account` parametresi vardır. Ancak artan bakiye aslında `contract_owner`'indir.

- Artan bakiye `contract_owner`'e aitken, yayımlanan olay `account`'a bir transfer gösterir.

### Neden hem `auth` hem de `approver`? Neden hiçbir şey yapmayan `mod`? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Bu sözleşme üç değiştirici içerir: `_mod_`, `auth` ve `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` üç parametre alır ve bunlarla hiçbir şey yapmaz. Neden var?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` ve `approver` daha mantıklıdır, çünkü sözleşmenin `contract_owner` tarafından çağrıldığını kontrol ederler. Basım gibi belirli ayrıcalıklı eylemlerin o hesapla sınırlandırılmasını bekleriz. Ancak, _tam olarak aynı şeyi_ yapan iki ayrı işleve sahip olmanın amacı nedir?

## Otomatik olarak neyi tespit edebiliriz? {#what-can-we-detect-automatically}

Etherscan'e bakarak `wARB`'ın dolandırıcı bir token olduğunu görebiliriz. Ancak bu merkezi bir çözümdür. Teorik olarak, Etherscan çökertilebilir veya hacklenebilir. Bir token'ın meşru olup olmadığını bağımsız olarak anlayabilmek daha iyidir.

Yayımladıkları olaylara bakarak bir ERC-20 token'ının şüpheli (ya bir dolandırıcılık ya da çok kötü yazılmış) olduğunu belirlemek için kullanabileceğimiz bazı hileler vardır.

## Şüpheli `Approval` olayları {#suspicious-approval-events}

[`Approval` olayları](https://eips.ethereum.org/EIPS/eip-20#approval) yalnızca doğrudan bir istekle gerçekleşmelidir (bir harcama izni sonucunda gerçekleşebilen [`Transfer` olaylarının](https://eips.ethereum.org/EIPS/eip-20#transfer-1) aksine). Bu sorunun ayrıntılı bir açıklaması ve isteklerin neden bir sözleşme aracılığıyla değil de doğrudan olması gerektiği hakkında [Solidity belgelerine bakın](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin).

Bu, [harici olarak sahip olunan bir hesaptan](/developers/docs/accounts/#types-of-account) harcamayı onaylayan `Approval` olaylarının, o hesaptan kaynaklanan ve hedefi ERC-20 sözleşmesi olan işlemlerden gelmesi gerektiği anlamına gelir. Harici olarak sahip olunan bir hesaptan gelen diğer her türlü onay şüphelidir.

İşte [Viem](https://viem.sh/) ve tip güvenliğine sahip bir JavaScript varyantı olan [TypeScript](https://www.typescriptlang.org/docs/) kullanarak [bu tür bir olayı tanımlayan bir program](https://github.com/qbzzt/20230915-scam-token-detection). Çalıştırmak için:

1. `.env.example` dosyasını `.env` olarak kopyalayın.
2. Bir Ethereum Ana Ağı düğümüne URL sağlamak için `.env` dosyasını düzenleyin.
3. Gerekli paketleri kurmak için `pnpm install` komutunu çalıştırın.
4. Şüpheli onayları aramak için `pnpm susApproval` komutunu çalıştırın.

İşte satır satır açıklaması:

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

Tip tanımlarını, işlevleri ve zincir tanımını `viem`'den içe aktarın.

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

Bir Viem istemcisi oluşturun. Yalnızca Blokzincir'den okuma yapmamız gerekiyor, bu nedenle bu istemcinin özel bir anahtara ihtiyacı yoktur.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Şüpheli ERC-20 sözleşmesinin adresi ve olayları arayacağımız bloklar. Düğüm sağlayıcıları, bant genişliği pahalı olabileceğinden genellikle olayları okuma yeteneğimizi sınırlar. Neyse ki `wARB` on sekiz saatlik bir süre boyunca kullanımda değildi, bu yüzden tüm olayları arayabiliriz (toplamda sadece 13 tane vardı).

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

Viem'den olay bilgilerini istemenin yolu budur. Alan adları da dahil olmak üzere tam olay imzasını sağladığımızda, olayı bizim için ayrıştırır.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Algoritmamız yalnızca harici olarak sahip olunan hesaplar için geçerlidir. `client.getBytecode` tarafından döndürülen herhangi bir baytkod varsa, bu bir sözleşme olduğu anlamına gelir ve bunu atlamalıyız.

Daha önce TypeScript kullanmadıysanız, işlev tanımı biraz garip görünebilir. Sadece ilk (ve tek) parametrenin `addr` olarak adlandırıldığını değil, aynı zamanda `Address` tipinde olduğunu da söylüyoruz. Benzer şekilde, `: boolean` kısmı TypeScript'e işlevin dönüş değerinin bir boolean olduğunu söyler.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Bu işlev, bir olaydan işlem makbuzunu alır. İşlem hedefinin ne olduğunu bildiğimizden emin olmak için makbuza ihtiyacımız var.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Bu en önemli işlevdir, bir olayın şüpheli olup olmadığına gerçekten karar veren işlevdir. Dönüş tipi olan `(Event | null)`, TypeScript'e bu işlevin bir `Event` veya `null` döndürebileceğini söyler. Olay şüpheli değilse `null` döndürürüz.

```typescript
const owner = ev.args._owner
```

Viem alan adlarına sahiptir, bu yüzden olayı bizim için ayrıştırdı. `_owner`, harcanacak token'ların sahibidir.

```typescript
// Sözleşmeler tarafından yapılan onaylar şüpheli değildir
if (await isContract(owner)) return null
```

Sahip bir sözleşme ise, bu onayın şüpheli olmadığını varsayın. Bir sözleşmenin onayının şüpheli olup olmadığını kontrol etmek için, sahip sözleşmesine ulaşıp ulaşmadığını ve o sözleşmenin doğrudan ERC-20 sözleşmesini çağırıp çağırmadığını görmek üzere işlemin tam yürütülmesini izlememiz gerekir. Bu, yapmak isteyeceğimizden çok daha fazla kaynak gerektirir.

```typescript
const txn = await getEventTxn(ev)
```

Onay harici olarak sahip olunan bir hesaptan geliyorsa, buna neden olan işlemi alın.

```typescript
// Onay, işlemin `from` adresi olmayan bir EOA sahibinden geliyorsa şüphelidir
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Adresler onaltılık (hexadecimal) olduğu ve harfler içerdiği için sadece dize eşitliğini kontrol edemeyiz. Bazen, örneğin `txn.from`'te, bu harflerin tümü küçük harftir. Diğer durumlarda, örneğin `ev.args._owner`'de, adres [hata tespiti için büyük/küçük harf karışık](https://eips.ethereum.org/EIPS/eip-55) şeklindedir.

Ancak işlem sahibinden gelmiyorsa ve bu sahip harici olarak sahip olunan bir hesapsa, o zaman şüpheli bir işlemimiz var demektir.

```typescript
// Ayrıca işlem hedefi, incelediğimiz ERC-20 Sözleşmesi
// değilse de şüphelidir
if (txn.to.toLowerCase() != testedAddress) return ev
```

Benzer şekilde, işlemin `to` adresi, yani çağrılan ilk sözleşme, incelenen ERC-20 sözleşmesi değilse, o zaman şüphelidir.

```typescript
    // Şüphelenmek için bir neden yoksa, null döndürün.
    return null
}
```

Her iki koşul da doğru değilse, `Approval` olayı şüpheli değildir.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Bir `async` işlevi](https://www.w3schools.com/js/js_async.asp) bir `Promise` nesnesi döndürür. Yaygın sözdizimi olan `await x()` ile, işlemeye devam etmeden önce bu `Promise` nesnesinin yerine getirilmesini bekleriz. Bunu programlamak ve takip etmek basittir, ancak aynı zamanda verimsizdir. Belirli bir olay için `Promise` nesnesinin yerine getirilmesini beklerken, bir sonraki olay üzerinde çalışmaya başlayabiliriz.

Burada bir `Promise` nesneleri dizisi oluşturmak için [`map`](https://www.w3schools.com/jsref/jsref_map.asp) kullanıyoruz. Ardından, tüm bu sözlerin (promises) çözülmesini beklemek için [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) kullanıyoruz. Daha sonra şüpheli olmayan olayları kaldırmak için bu sonuçları [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) ile filtreliyoruz.

### Şüpheli `Transfer` olayları {#suspicious-transfer-events}

Dolandırıcı token'ları belirlemenin bir başka olası yolu da şüpheli transferleri olup olmadığını görmektir. Örneğin, o kadar fazla token'ı olmayan hesaplardan yapılan transferler. [Bu testin nasıl uygulanacağını](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts) görebilirsiniz, ancak `wARB`'ın böyle bir sorunu yoktur.

## Sonuç {#conclusion}

ERC-20 dolandırıcılıklarının otomatik tespiti [yanlış negatiflerden (false negatives)](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) muzdariptir, çünkü bir dolandırıcılık, gerçek hiçbir şeyi temsil etmeyen tamamen normal bir ERC-20 token sözleşmesi kullanabilir. Bu nedenle her zaman _token adresini güvenilir bir kaynaktan almaya_ çalışmalısınız.

Otomatik tespit, birçok token'ın bulunduğu ve bunların otomatik olarak işlenmesi gereken DeFi parçaları gibi belirli durumlarda yardımcı olabilir. Ancak her zaman olduğu gibi [alıcı dikkatli olmalıdır (caveat emptor)](https://www.investopedia.com/terms/c/caveatemptor.asp), kendi araştırmanızı yapın ve kullanıcılarınızı da aynısını yapmaya teşvik edin.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).