---
title: Akıllı sözleşme güvenliği
description: Ethereum geliştiricileri için güvenlik değerlendirmeleri
lang: tr
---

Ethereum akıllı sözleşmeleri aşırı esnektirler; hem büyük miktarlarda token tutabilirler (genelde 1 milyar ABD Dolarından fazla) hem de önceden dağıtılmış akıllı sözleşme kodunu esas alarak değişmez mantık çalıştırabilirler. Bu; güvene gerek olmayan ve birbirine bağlı akıllı sözleşmelerden oluşan renkli ve yaratıcı bir ekosistem oluşturmuş olsa da; akıllı sözleşmelerdeki güvenlik açıklarından ve Ethereum'daki beklenmedik davranışlardan faydalanarak kâr elde etmek isteyen saldırganları cezbetmek için mükemmel bir ekosistemdir. Akıllı sözleşme kodu _genellikle_ güvenlik açıklarını onarmak için değiştirilemez; akıllı sözleşmelerden çalınan varlıklar kurtarılamaz ve çalınan varlıkların takibini yapmak aşırı derecede zordur. Akıllı sözleşme sorunlarına bağlı olarak çalınan veya kaybolan toplam değer miktarı, kuşkusuz 1 milyar ABD dolarının üzerindedir. Akıllı sözleşme kodlama hatalarına bağlı bazı büyük kayıplar:

- [Parity çoklu imza sorunu #1 - 30 milyon ABD Doları kaybedildi](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Parity çoklu imza sorunu #2 - 300 milyon ABD Doları kilitlendi](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [TheDAO saldırısı, 3,6 milyon ETH! Günümüz ETH fiyatları ile 1 milyar ABD Dolarının üstünde](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Ön koşullar {#prerequisites}

Bu, akıllı sözleşme güvenliğini kapsadığı için güvenlik ile uğraşmadan önce [akıllı sözleşmeler](/developers/docs/smart-contracts/) ile aşina olduğunuza emin olun.

## Daha güvenli akıllı sözleşme kodu nasıl yazılır {#how-to-write-more-secure-smart-contract-code}

Mainnet'e herhangi bir kod yüklemeden önce, akıllı sözleşmenize emanet edilen herhangi bir değerin korunması için yeterli önlem almak önemlidir. Bu makalede, birkaç özel saldırı hakkında konuşacağız, saldırı türleri hakkında bilgi edinmek için kaynaklar sağlayacağız ve sözleşmelerinizin doğru ve güvenli şekilde çalıştığından emin olmanız için size bazı temel araçlar ve en iyi yöntemleri sunacağız.

## Denetimler gümüş bir kurşun değillerdir {#audits-are-not-a-silver-bullet}

Yıllar öncesinde akıllı sözleşmeleri yazma, derleme, test etme ve dağıtma araçları çok gelişmemişti, bu da birçok projenin gelişigüzel yollarla Solidity kodu yazmasına ve kodu, onun güvenli ve beklenen şekilde çalışıp çalışmadığını soruşturacak rastgele bir denetleyiciye atmasına yol açtı. 2020'de, Solidity yazımını destekleyen geliştirme süreçleri ve araçlar önemli ölçüde daha iyi; bu en iyi yöntemlerden faydalanmak sadece projenizin yönetiminin kolay olmasını sağlamakla kalmıyor, ayrıca projenizin güvenliği için hayati bir rol oynuyor. Akıllı sözleşmenizin yazımının sonundaki bir denetim, artık projenizin yapacağı tek güvenlik değerlendirmesi olarak yeterli değildir. Güvenlik, siz akıllı sözleşme kodunuzun ilk satırını yazmadan önce; **doğru dizayn ve geliştirme süreçleri ile başlar**.

## Akıllı sözleşme geliştirme süreci {#smart-contract-development-process}

En az:

- Tüm kod, git gibi bir sürüm denetimi sisteminde depolanır
- Tüm kod değişiklikleri Çekme Talepleri aracılığıyla yapılır
- Tüm Çekme Talepleri en az bir yorumcuya sahiptir. _Eğer tek kişilik bir projeyseniz, başka bir tek yazar bulup kod değerlendirmeleri takas etmeyi göz önünde bulundurun!_
- Tek bir komut, bir Ethereum geliştirme ortamı (Bakınız: Truffle) kullanarak kodunuzu derler, dağıtır ve kodunuza karşı birtakım testler çalıştırır
- Kodunuzu, ideal olarak her çekme talebi birleştirilmeden önce Mythril ve Slither gibi temel kod analizi araçlarından geçirerek, çıktıdaki farklılıkları karşılaştırdınız
- Solidity HİÇBİR derleyici hatası vermez
- Kodunuz iyi belgelenmiştir

Geliştirme süreci için daha denecek çok şey vardır, ama bu maddeler başlamak için iyi bir yerdir. Daha çok madde ve detaylı açıklamalar için, [DeFiSafety tarafından sağlanan süreç kalite kontrol listesine](https://docs.defisafety.com/review-process-documentation/process-quality-audit-process) bakınız. [DefiSafety](https://defisafety.com/), çeşitli büyük ve halka açık Ethereum dApp'lerinin incelemelerini yayınlayan gayriresmî halka açık bir hizmettir. DeFiSafety derecelendirme sisteminin bir parçası, projenin süreç kalite kontrol listesine ne seviyede uyabildiğini kapsar. Bu süreçleri takip ederek:

- Tekrarlanabilir, otomatikleştirilmiş testlerle daha güvenli kodlar ortaya çıkaracaksınız
- Denetimciler projenizi daha verimli bir şekilde inceleyebilecek
- Yeni geliştiriciler için daha kolay alışma süreci
- Geliştiricilerin, değişiklikler üzerinde hızlıca tekrar yapmasını, test yapmasını ve geri bildirim almasını sağlayacaksınız
- Projenizin gerilemeler yaşaması ihtimali düşer

## Saldırılar ve güvenlik açıkları {#attacks-and-vulnerabilities}

Artık verimli bir geliştirme süreci kullanarak Solidity kodu yazdığınıza göre, nelerin yanlış gidebileceğini görmek için bazı yaygın Solidity zaafiyetlerine bakalım.

### Yeniden giriş {#re-entrancy}

Yeniden giriş, Akıllı Sözleşmeler geliştirirken göz önünde bulundurulması gereken en büyük ve en kayda değer güvenlik sorunlarından biridir. EVM'nin birden fazla sözleşmeyi aynı anda çalıştıramamasına rağmen, bir sözleşmenin farklı bir sözleşmeyi çağırması, çağrıyı yapan sözleşmenin yürütülmesini ve bellek durumunu çağrı dönene kadar durdurur, çağrı döndükten sonra da yürütme normal olarak devam eder. Bu durdurma ve yeniden başlatma, "yeniden giriş" olarak bilinen bir zaafiyeti oluşturabilir.

Burada yeniden girişe zaafı olan bir sözleşmenin basit bir versiyonu bulunuyor:

```solidity
// THIS CONTRACT HAS INTENTIONAL VULNERABILITY, DO NOT COPY
contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Bir kullanıcının sözleşmeye daha önce depoladığı ETH'yi çekmesine izin vermek için, bu fonksiyon

1. Bir kullanıcının ne kadar bakiyeye sahip olduğunu okur
2. Ona o bakiye miktarını ETH olarak gönderir
3. Onun bakiyesini, tekrar çekim yapamaması için sıfırlar.

Eğer sıradan bir hesaptan çağrılırsa (sizin kendi MetaMask hesabınız gibi), bu beklendiği gibi çalışır: msg.sender.call.value() sadece hesabınıza ETH gönderir. Ancak, akıllı sözleşmeler de çağrı yapabilir. Eğer özel, kötü amaçlı bir sözleşme `withdraw()` çağırıyorsa, msg.sender.call.value() sadece `amount` miktarında ETH göndermez, bunun yanında dolaylı olarak sözleşmeyi kod yürütmeye başlaması için çağırır. Bu kötü amaçlı sözleşmeyi hayal edin:

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Attacker.beginAttack() çağrısı yapmak, şöyle bir döngü başlatır:

```
0.) Attacker's EOA calls Attacker.beginAttack() with 1 ETH
0.) Attacker.beginAttack() deposits 1 ETH into Victim

  1.) Attacker -> Victim.withdraw()
  1.) Victim reads balances[msg.sender]
  1.) Victim sends ETH to Attacker (which executes default function)
    2.) Attacker -> Victim.withdraw()
    2.) Victim reads balances[msg.sender]
    2.) Victim sends ETH to Attacker (which executes default function)
      3.) Attacker -> Victim.withdraw()
      3.) Victim reads balances[msg.sender]
      3.) Victim sends ETH to Attacker (which executes default function)
        4.) Attacker no longer has enough gas, returns without calling again
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (it was already 0)
  1.) balances[msg.sender] = 0; (it was already 0)
```

1 ETH ile Attacker.beginAttack çağrısı yapmak, saldırı Kurban'ına yeniden giriş saldırısı yapacaktır, bu da Kurban'ın sağladığından daha çok ETH çekecektir (diğer kullanıcıların bakiyelerinden alınır, Kurban sözleşmenin gerektiğinden az teminat göstermesine sebep olur)

### Yeniden girişle nasıl başa çıkılır (yanlış yol) {#how-to-deal-with-re-entrancy-the-wrong-way}

Basitçe herhangi bir akıllı sözleşmenin kodunuzla etkileşime geçmesini engelleyerek yeniden giriş saldırısıyla başa çıkabileceğinizi düşünebilirsiniz. Stackoverflow'da arama yapıp, tonla beğeni almış olan bu kod parçacığını bulursunuz:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Görünüşte mantıklıdır: Sözleşmelerde kod bulunur, eğer çağıranda herhangi bir kod varsa yatırmasına izin verme. Hadi ekleyelim:

```solidity
// THIS CONTRACT HAS INTENTIONAL VULNERABILITY, DO NOT COPY
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- NEW LINE
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Artık ETH yatırmak için, adresinizde akıllı sözleşme kodu bulunmaması gerekir. Ancak bu, aşağıdaki Saldırgan sözleşmesiyle kolayca yenilebilir:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- New line
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

İlk saldırı, sözleşme mantığına yönelik bir saldırı iken bu, Ethereum sözleşme dağıtım davranışına yönelik bir saldırıdır. İnşa esnasında, bir sözleşme henüz kodunu adresinde dağıtılması için döndürmemiştir, ancak bu süreç ESNASINDA tam EVM kontrolünü elinde tutar.

Teknik olarak akıllı sözleşmelerin kodunuzu çağırmasını engellemek bu satırı kullanarak mümkündür:

```solidity
require(tx.origin == msg.sender)
```

Ancak, bu hâlâ iyi bir çözüm değildir. Ethereum'un en heyecan verici yönlerinden biri birleştirilebilirliğidir, akıllı sözleşmeler birbiriyle entegre olur ve birbirinin üzerinde inşa olurlar. Yukarıdaki satırı kullanarak, projenizin kullanılabilirliğini kısıtlıyorsunuz.

### Yeniden girişle nasıl başa çıkılır (doğru yol) {#how-to-deal-with-re-entrancy-the-right-way}

Depolama güncelleme ve dış çağrının sırasını basitçe değiştirerek, saldırıya yol açan yeniden giriş durumunu engelliyoruz. Geri withdraw çağrısı yapmak, mümkün olsa da, `balances` depolaması hâlihazırda 0'a ayarlandığı için saldırgana katkı sağlamayacaktır.

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Yukarıdaki kod, yeniden girişe karşı koruyan "Kontroller-Tesirler-Etkileşimler" dizayn desenini takip eder. [Burada Kontroller-Tesirler-Etkileşimler hakkında daha fazlasını](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html) okuyabilirsiniz

### Yeniden girişle nasıl başa çıkılır (nükleer seçenek) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Güvenilmeyen bir adrese ETH gönderdiğiniz veya bilinmeyen bir sözleşme ile etkileşime geçtiğiniz (kullanıcı tarafından sağlanan bir token adresine `transfer()` çağrısı yapmak gibi) her zaman, kendinizi yeniden giriş ihtimaline açık hâle getiriyorsunuz. **ETH göndermeyen veya güvenilmeyen sözleşmelere çağrı yapmayan sözleşmeler dizayn ederek, yeniden giriş ihtimalini engelliyorsunuz!**

## Daha fazla saldırı türü {#more-attack-types}

Yukarıdaki saldırı türleri akıllı sözleşme kodlama problemlerini (yeniden giriş) ve Ethereum garipliklerini (kod sözleşme adresinde mevcut olmadan önce sözleşme constructor'ları içinde kod çalıştırmak) kapsar. Farkında olunması gereken daha birçok saldırı türü bulunmaktadır, örneğin:

- Front-running
- ETH gönderim reddi
- Tam sayı taşması/yetersizliği

Daha fazla bilgi:

- [Consensys Akıllı Sözleşme Bilinen Saldırılar](https://consensys.github.io/smart-contract-best-practices/attacks/) - Çoğunluğunda örnek kod olacak şekilde, en önemli zafiyetlerin gayet okunabilir bir açıklaması.
- [SWC Registry](https://swcregistry.io/docs/SWC-128) - Ethereum'a ve akıllı sözleşmelere uygulanan CWE'lerin düzenlenmiş bir listesi

## Güvenlik araçları {#security-tools}

Ethereum güvenlik temellerini anlamanın ve profesyonel bir denetleme firmasına kodunuzu incelemeleri için ulaşmanın bir dengi olmasa da, kodunuzdaki potansiyel sorunları belirtmek için birçok araç bulunmaktadır.

### Akıllı sözleşme güvenliği {#smart-contract-security}

**Slither -** **_Python 3'te yazılmış Solidity statik analiz altyapısıdır._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_Ethereum akıllı sözleşmeleri için bir güvenlik analizi API'si._**

- [mythx.io](https://mythx.io/)
- [Belgeler](https://docs.mythx.io/)

**Mythril -** **_EVM bayt kodu için güvenlik analiz aracı._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Belgeler](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_Akıllı sözleşmeler ve ikili dosyalar üzerinde sembolik bir yürütüm aracı kullanan bir komut satırı arabirimi._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Belgeler](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_Ethereum akıllı sözleşmeleri için güvenlik tarayıcısı._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_Bir sözleşmenin ERC20 standardına uygun olup olmadığını kontrol etmek için kullanılan bir doğrulama aracı._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Resmi Doğrulama {#formal-verification}

**Resmi Doğrulama Hakkında Bilgi**

- [Akıllı sözleşmelerin resmi doğrulaması nasıl çalışır](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _20 Temmuz 2018 - Brian Marick_
- [Resmi Doğrulama Nasıl Akıllı Sözleşmelerin Kusursuz Olmasını Sağlayabilir](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _29 Ocak 2018 - Bernard Mueller_

### Araç kullanmak {#using-tools}

Akıllı sözleşme güvenlik analizi için en popüler araçların ikisi şunlardır:

- [Trail of Bits](https://www.trailofbits.com/) tarafından [Slither](https://github.com/crytic/slither) (sunulan sürüm: [Crytic](https://crytic.io/))
- [ConsenSys](https://consensys.net/) tarafından [Mythril](https://github.com/ConsenSys/mythril) (sunulan sürüm: [MythX](https://mythx.io/))

İkisi de kodunuzu analiz eden ve sorunları rapor eden kullanışlı araçlardır. Her biri [commercial] olarak sunulan sürümlere sahiptir ancak yerel olarak çalıştırmak için de ücretsiz sürümleri de bulunur. Aşağıda, kolay bir Docket imajı olan `trailofbits/eth-security-toolbox` ile kullanılabilir olan Slither'ın nasıl kullanılacağına dair kısa bir açıklama bulunuyor. [Eğer henüz kurulu değilse Docker kurmanız](https://docs.docker.com/get-docker/) gerekecektir.

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Şu çıktıyı oluşturacaktır:

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Slither, bu konuda yeniden giriş için bir potansiyel tespit ederek sorunun gerçekleşebileceği önemli satırları tanımladı ve sorun hakkında daha fazla detay için bize bir bağlantı verdi:

> Referans: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

Böylece kodunuzla ilgili potansiyel sıkıntıları hızlıca öğrenebilmenizi sağladı. Tüm otomatikleştirilmiş test araçları gibi, Slither mükemmel değildir ve aşırı rapor etmeye meyillidir. Suistimal edilebilir bir zaafiyet olmadığında bile sizi potansiyel bir yeniden giriş hakkında uyarabilir. Genelde kod değişiklikleri arasında Slither çıktısındaki FARKLARI incelemek aşırı derecede aydınlatıcıdır: Projenizin kodu tamamlanıncaya kadar beklemektense ortaya çıkan zaafiyetleri çok daha erken keşfetmeye yardımcı olur.

## Daha fazla bilgi {#further-reading}

**Akıllı sözleşme güvenliği için en iyi yöntemlere dair kılavuzlar**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Güvenlik tavsiyelerinin ve en iyi yöntemlerin toplu koleksiyonu](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Akıllı sözleşme güvenlik doğrulama standardı (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili öğreticiler {#related-tutorials}

- [Güvenli geliştirme iş akışı](/developers/tutorials/secure-development-workflow/)
- [Akıllı sözleşme açıkları bulmak için Slither nasıl kullanılır](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Akıllı sözleşme açıkları bulmak için Manticore nasıl kullanılır](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Güvenlik kuralları](/developers/tutorials/smart-contract-security-guidelines/)
- [Token güvenliği](/developers/tutorials/token-integration-checklist/)
