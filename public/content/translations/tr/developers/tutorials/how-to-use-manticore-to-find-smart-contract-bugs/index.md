---
title: Akıllı sözleşmelerdeki hataları bulmak için Manticore nasıl kullanılır
description: Akıllı sözleşmelerdeki hataları otomatik olarak bulmak için Manticore nasıl kullanılır
author: Trailofbits
lang: tr
tags:
  ["solidity", "akıllı sözleşmeler", "güvenlik", "test etme", "biçimsel doğrulama"]
skill: advanced
breadcrumb: Manticore
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Bu eğitimin amacı, akıllı sözleşmelerdeki hataları otomatik olarak bulmak için Manticore'un nasıl kullanılacağını göstermektir.

## Kurulum {#installation}

Manticore, >= Python 3.6 gerektirir. pip aracılığıyla veya Docker kullanılarak kurulabilir.

### Docker aracılığıyla Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Son komut, eth-security-toolbox'ı mevcut dizininize erişimi olan bir Docker içinde çalıştırır. Dosyaları ana makinenizden değiştirebilir ve araçları Docker'daki dosyalar üzerinde çalıştırabilirsiniz_

Docker içinde şunu çalıştırın:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip aracılığıyla Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 önerilir.

### Bir betik çalıştırma {#running-a-script}

Python 3 ile bir Python betiği çalıştırmak için:

```bash
python3 script.py
```

## Dinamik sembolik yürütmeye giriş {#introduction-to-dynamic-symbolic-execution}

### Kısaca Dinamik Sembolik Yürütme {#dynamic-symbolic-execution-in-a-nutshell}

Dinamik sembolik yürütme (DSE), bir durum uzayını yüksek derecede anlamsal farkındalıkla keşfeden bir program analiz tekniğidir. Bu teknik, `path predicates` adı verilen matematiksel formüller olarak temsil edilen "program yollarının" keşfine dayanır. Kavramsal olarak, bu teknik yol yüklemleri (path predicates) üzerinde iki adımda çalışır:

1. Programın girdisi üzerindeki kısıtlamalar kullanılarak oluşturulurlar.
2. İlişkili yolların yürütülmesine neden olacak program girdileri oluşturmak için kullanılırlar.

Bu yaklaşım, tanımlanan tüm program durumlarının somut yürütme sırasında tetiklenebilmesi anlamında hiçbir yanlış pozitif (false positive) üretmez. Örneğin, analiz bir tam sayı taşması (integer overflow) bulursa, bunun yeniden üretilebilir olması garanti edilir.

### Yol Yüklemi Örneği {#path-predicate-example}

DSE'nin nasıl çalıştığına dair bir fikir edinmek için aşağıdaki örneği inceleyin:

```solidity
function f(uint a){

  if (a == 65) {
      // Bir hata mevcut
  }

}
```

`f()` iki yol içerdiğinden, bir DSE iki farklı yol yüklemi oluşturacaktır:

- Yol 1: `a == 65`
- Yol 2: `Not (a == 65)`

Her yol yüklemi, denklemi çözmeye çalışacak olan [SMT çözücü](https://wikipedia.org/wiki/Satisfiability_modulo_theories) adı verilen bir araca verilebilecek matematiksel bir formüldür. `Path 1` için çözücü, yolun `a = 65` ile keşfedilebileceğini söyleyecektir. `Path 2` için çözücü, `a` değerine 65 dışında herhangi bir değer verebilir, örneğin `a = 0`.

### Özellikleri doğrulama {#verifying-properties}

Manticore, her yolun tüm yürütülmesi üzerinde tam bir kontrole izin verir. Sonuç olarak, hemen hemen her şeye keyfi kısıtlamalar eklemenize olanak tanır. Bu kontrol, sözleşme üzerinde özelliklerin oluşturulmasına izin verir.

Aşağıdaki örneği inceleyin:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // taşma koruması yok
  return c;
}
```

Burada fonksiyonda keşfedilecek tek bir yol vardır:

- Yol 1: `c = a + b`

Manticore kullanarak taşma olup olmadığını kontrol edebilir ve yol yüklemine kısıtlamalar ekleyebilirsiniz:

- `c = a + b AND (c < a OR c < b)`

Yukarıdaki yol yükleminin uygulanabilir olduğu bir `a` ve `b` değerlemesi bulmak mümkünse, bu bir taşma bulduğunuz anlamına gelir. Örneğin çözücü, `a = 10 , b = MAXUINT256` girdisini üretebilir.

Düzeltilmiş bir sürümü düşünürseniz:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Taşma kontrolü ile ilişkili formül şu şekilde olacaktır:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Bu formül çözülemez; başka bir deyişle bu, `safe_add` içinde `c` değerinin her zaman artacağının bir **kanıtıdır**.

DSE, bu nedenle kodunuzdaki keyfi kısıtlamaları doğrulayabilen güçlü bir araçtır.

## Manticore altında çalıştırma {#running-under-manticore}

Manticore API ile bir akıllı sözleşmenin nasıl keşfedileceğini göreceğiz. Hedef, aşağıdaki akıllı sözleşmedir [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Bağımsız bir keşif çalıştırma {#run-a-standalone-exploration}

Aşağıdaki komutla Manticore'u doğrudan akıllı sözleşme üzerinde çalıştırabilirsiniz (`project` bir Solidity Dosyası veya bir proje dizini olabilir):

```bash
$ manticore project
```

Bunun gibi test senaryolarının çıktısını alacaksınız (sıra değişebilir):

```
...
... m.c.manticore:INFO: Oluşturulan test senaryosu No. 0 - STOP
... m.c.manticore:INFO: Oluşturulan test senaryosu No. 1 - REVERT
... m.c.manticore:INFO: Oluşturulan test senaryosu No. 2 - RETURN
... m.c.manticore:INFO: Oluşturulan test senaryosu No. 3 - REVERT
... m.c.manticore:INFO: Oluşturulan test senaryosu No. 4 - STOP
... m.c.manticore:INFO: Oluşturulan test senaryosu No. 5 - REVERT
... m.c.manticore:INFO: Oluşturulan test senaryosu No. 6 - REVERT
... m.c.manticore:INFO: Sonuçlar şurada: /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Ek bilgi olmadan Manticore, sözleşme üzerinde yeni yollar keşfetmeyene kadar sözleşmeyi yeni sembolik işlemlerle keşfedecektir. Manticore, başarısız olan bir işlemden sonra (örneğin: bir geri al (revert) işleminden sonra) yeni işlemler çalıştırmaz.

Manticore, bilgileri bir `mcore_*` dizininde çıkaracaktır. Diğerlerinin yanı sıra, bu dizinde şunları bulacaksınız:

- `global.summary`: kapsam ve derleyici uyarıları
- `test_XXXXX.summary`: kapsam, son talimat, test senaryosu başına hesap bakiyeleri
- `test_XXXXX.tx`: test senaryosu başına işlemlerin ayrıntılı listesi

Burada Manticore, şunlara karşılık gelen 7 test senaryosu bulur (dosya adı sırası değişebilir):

|                      |      İşlem 0       |        İşlem 1        | İşlem 2               | Sonuç  |
| :------------------: | :----------------: | :-------------------: | --------------------- | :----: |
| **test_00000000.tx** | Sözleşme oluşturma |        f(!=65)        | f(!=65)               |  STOP  |
| **test_00000001.tx** | Sözleşme oluşturma | geri dönüş fonksiyonu |                       | REVERT |
| **test_00000002.tx** | Sözleşme oluşturma |                       |                       | RETURN |
| **test_00000003.tx** | Sözleşme oluşturma |         f(65)         |                       | REVERT |
| **test_00000004.tx** | Sözleşme oluşturma |        f(!=65)        |                       |  STOP  |
| **test_00000005.tx** | Sözleşme oluşturma |        f(!=65)        | f(65)                 | REVERT |
| **test_00000006.tx** | Sözleşme oluşturma |        f(!=65)        | geri dönüş fonksiyonu | REVERT |

_Keşif özeti f(!=65), f'nin 65'ten farklı herhangi bir değerle çağrıldığını belirtir._

Fark edebileceğiniz gibi Manticore, her başarılı veya geri alınan işlem için benzersiz bir test senaryosu oluşturur.

Hızlı kod keşfi istiyorsanız `--quick-mode` bayrağını kullanın (hata dedektörlerini, Gaz hesaplamasını vb. devre dışı bırakır)

### API aracılığıyla bir akıllı sözleşmeyi manipüle etme {#manipulate-a-smart-contract-through-the-api}

Bu bölüm, Manticore Python API aracılığıyla bir akıllı sözleşmenin nasıl manipüle edileceğinin ayrıntılarını açıklar. Python uzantılı `*.py` yeni bir dosya oluşturabilir ve API komutlarını (temelleri aşağıda açıklanacaktır) bu dosyaya ekleyerek gerekli kodu yazabilir ve ardından `$ python3 *.py` komutuyla çalıştırabilirsiniz. Ayrıca aşağıdaki komutları doğrudan Python konsolunda da yürütebilirsiniz, konsolu çalıştırmak için `$ python3` komutunu kullanın.

### Hesap Oluşturma {#creating-accounts}

Yapmanız gereken ilk şey, aşağıdaki komutlarla yeni bir Blokzincir başlatmaktır:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Sözleşme olmayan bir hesap, [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) kullanılarak oluşturulur:

```python
user_account = m.create_account(balance=1000)
```

Bir Solidity sözleşmesi, [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) kullanılarak dağıtılabilir:

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Özet {#summary}

- [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) ve [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) ile kullanıcı ve kontrat hesapları oluşturabilirsiniz.

### İşlemleri yürütme {#executing-transactions}

Manticore iki tür işlemi destekler:

- Ham işlem: tüm fonksiyonlar keşfedilir
- İsimlendirilmiş işlem: yalnızca bir fonksiyon keşfedilir

#### Ham işlem {#raw-transaction}

Bir ham işlem, [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) kullanılarak yürütülür:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

İşlemin çağırıcısı, adresi, verisi veya değeri somut veya sembolik olabilir:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) sembolik bir değer oluşturur.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) sembolik bir bayt dizisi oluşturur.

Örneğin:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Veri sembolikse, Manticore işlem yürütmesi sırasında sözleşmenin tüm fonksiyonlarını keşfedecektir. Fonksiyon seçiminin nasıl çalıştığını anlamak için [Ethernaut CTF Uygulaması](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) makalesindeki Geri Dönüş Fonksiyonu (Fallback Function) açıklamasını görmek faydalı olacaktır.

#### İsimlendirilmiş işlem {#named-transaction}

Fonksiyonlar isimleri aracılığıyla yürütülebilir.
`f(uint var)` fonksiyonunu sembolik bir değerle, user_account üzerinden ve 0 Ether ile yürütmek için şunu kullanın:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

İşlemin `value` değeri belirtilmezse, varsayılan olarak 0'dır.

#### Özet {#summary-1}

- Bir işlemin argümanları somut veya sembolik olabilir
- Bir ham işlem tüm fonksiyonları keşfedecektir
- Fonksiyonlar isimleriyle çağrılabilir

### Çalışma Alanı {#workspace}

`m.workspace`, oluşturulan tüm dosyalar için çıktı dizini olarak kullanılan dizindir:

```python
print("Results are in {}".format(m.workspace))
```

### Keşfi Sonlandırma {#terminate-the-exploration}

Keşfi durdurmak için [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) kullanın. Bu yöntem çağrıldıktan sonra başka işlem gönderilmemelidir ve Manticore keşfedilen her yol için test senaryoları oluşturur.

### Özet: Manticore altında çalıştırma {#summary-running-under-manticore}

Önceki tüm adımları bir araya getirdiğimizde şunu elde ederiz:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # keşfi durdur
```

Yukarıdaki tüm kodları [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) içinde bulabilirsiniz

## Hata fırlatan yolları alma {#getting-throwing-paths}

Şimdi `f()` içinde bir istisna (exception) oluşturan yollar için belirli girdiler üreteceğiz. Hedef hala aşağıdaki akıllı sözleşmedir [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Durum bilgisini kullanma {#using-state-information}

Yürütülen her yolun kendi Blokzincir durumu vardır. Bir durum ya hazırdır ya da sonlandırılmıştır (killed), yani bir THROW veya REVERT talimatına ulaşmıştır:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): hazır olan durumların listesi (bir REVERT/INVALID yürütmediler)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): sonlandırılan durumların listesi
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): tüm durumlar

```python
for state in m.all_states:
    # durumla bir şeyler yap
```

Durum bilgisine erişebilirsiniz. Örneğin:

- `state.platform.get_balance(account.address)`: hesabın bakiyesi
- `state.platform.transactions`: işlemlerin listesi
- `state.platform.transactions[-1].return_data`: son işlem tarafından döndürülen veri

Son işlem tarafından döndürülen veri bir dizidir ve örneğin ABI.deserialize ile bir değere dönüştürülebilir:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Test senaryosu nasıl oluşturulur {#how-to-generate-testcase}

Test senaryosu oluşturmak için [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) kullanın:

```python
m.generate_testcase(state, 'BugFound')
```

### Özet {#summary-2}

- m.all_states ile durumlar üzerinde yineleme yapabilirsiniz
- `state.platform.get_balance(account.address)` hesabın bakiyesini döndürür
- `state.platform.transactions` işlemlerin listesini döndürür
- `transaction.return_data` döndürülen veridir
- `m.generate_testcase(state, name)` durum için girdiler oluşturur

### Özet: Hata Fırlatan Yolu Alma {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Bir yürütmenin GERİ AL veya GEÇERSİZ ile sonlanıp sonlanmadığını kontrol et
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Yukarıdaki tüm kodları [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) içinde bulabilirsiniz

_Not: terminated_state tarafından döndürülen tüm durumların sonucunda REVERT veya INVALID olduğundan çok daha basit bir betik oluşturabilirdik: bu örnek yalnızca API'nin nasıl manipüle edileceğini göstermek amacıyla verilmiştir._

## Kısıtlamalar ekleme {#adding-constraints}

Keşfi nasıl kısıtlayacağımızı göreceğiz. `f()` belgelerinin, fonksiyonun asla `a == 65` ile çağrılmadığını belirttiğini varsayacağız, bu nedenle `a == 65` ile ilgili herhangi bir hata gerçek bir hata değildir. Hedef hala aşağıdaki akıllı sözleşmedir [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Operatörler {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) modülü, kısıtlamaların manipülasyonunu kolaylaştırır, diğerlerinin yanı sıra şunları sağlar:

- Operators.AND,
- Operators.OR,
- Operators.UGT (işaretsiz büyüktür),
- Operators.UGE (işaretsiz büyük veya eşittir),
- Operators.ULT (işaretsiz küçüktür),
- Operators.ULE (işaretsiz küçük veya eşittir).

Modülü içe aktarmak için aşağıdakini kullanın:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT`, bir diziyi bir değere birleştirmek için kullanılır. Örneğin, bir işlemin return_data'sının başka bir değere karşı kontrol edilebilmesi için bir değere dönüştürülmesi gerekir:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Kısıtlamalar {#state-constraint}

Kısıtlamaları küresel olarak veya belirli bir durum için kullanabilirsiniz.

#### Küresel kısıtlama {#state-constraint-2}

Küresel bir kısıtlama eklemek için `m.constrain(constraint)` kullanın.
Örneğin, sembolik bir adresten bir sözleşme çağırabilir ve bu adresi belirli değerler olacak şekilde kısıtlayabilirsiniz:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Durum kısıtlaması {#state-constraint-3}

Belirli bir duruma kısıtlama eklemek için [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) kullanın.
Keşfinden sonra durum üzerinde bazı özellikleri kontrol etmek amacıyla durumu kısıtlamak için kullanılabilir.

### Kısıtlamayı Kontrol Etme {#checking-constraint}

Bir kısıtlamanın hala uygulanabilir olup olmadığını öğrenmek için `solver.check(state.constraints)` kullanın.
Örneğin, aşağıdaki kod symbolic_value değerini 65'ten farklı olacak şekilde kısıtlayacak ve durumun hala uygulanabilir olup olmadığını kontrol edecektir:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # durum uygulanabilir
```

### Özet: Kısıtlamalar Ekleme {#summary-adding-constraints}

Önceki koda kısıtlama eklediğimizde şunu elde ederiz:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## Bir yürütmenin GERİ AL veya GEÇERSİZ ile sonlanıp sonlanmadığını kontrol et
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # a == 65 olduğu yolu dikkate almıyoruz
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Yukarıdaki tüm kodları [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) içinde bulabilirsiniz