---
title: Akıllı sözleşme açıkları bulmak için Manticore nasıl kullanılır
description: Akıllı sözleşmeleri test etmek için Echidna otomatik olarak nasıl kullanılır
author: Trailofbits
lang: tr
tags:
  - "solidity"
  - "akıllı kontratlar"
  - "güvenlik"
  - "test etmek"
  - "resmi doğrulama"
skill: advanced
published: 2020-01-13
source: Güvenli sözleşmeler oluşturmak
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Bu öğreticinin amacı, akıllı sözleşmelerdeki hataları otomatik olarak bulmak için Manticore'un nasıl kullanılacağını göstermektir.

## Kurulum {#installation}

Manticore >= python 3.6 gerektirir. Pip veya docker kullanılarak kurulabilir.

### Docker aracılığıyla Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Son komut, geçerli dizininize erişimi olan bir docker'da eth-security-toolbox'ı çalıştırır. Dosyaları ana makinenizden değiştirebilir ve dosyalar üzerindeki araçları docker'dan çalıştırabilirsiniz_

Docker'ın içinde şunu çalıştırın:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Pip aracılığıyla Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 tavsiye edilir.

### Bir komut dosyası çalıştırma {#running-a-script}

Python 3 ile bir python komut dosyası çalıştırmak için:

```bash
python3 script.py
```

## Dinamik sembolik yürütmeye giriş {#introduction-to-dynamic-symbolic-execution}

### Özetle Dinamik Sembolik Yürütme {#dynamic-symbolic-execution-in-a-nutshell}

Dinamik sembolik yürütme (DSE), yüksek derecede semantik farkındalık ile bir durum uzayını araştıran bir program analiz tekniğidir. Bu teknik, `path predicates` (yol belirteçleri) olarak adlandırılan matematiksel formüller olarak temsil edilen "program yollarının" keşfine dayanır. Kavramsal olarak, bu teknik iki adımda yol belirteçleri üzerinde çalışır:

1. Programın girdisi üzerindeki kısıtlamalar kullanılarak oluşturulurlar.
2. İlişkili yolların yürütülmesine neden olacak program girdileri oluşturmak için kullanılırlar.

Bu yaklaşım, tanımlanmış tüm program durumlarının somut yürütme sırasında tetiklenmesi şeklinde yanlış pozitifler üretmez. Örneğin, analiz bir tamsayı taşması bulursa, bunun tekrarlanabilir olması garanti edilir.

### Yol Belirteci Örneği {#path-predicate-example}

DSE'nin nasıl çalıştığına dair bir fikir edinmek için aşağıdaki örneği göz önünde bulundurun:

```solidity
function f(uint a){

  if (a == 65) {
      // A bug is present
  }

}
```

`f()` iki yol içerdiği için, DSE iki farklı yol belirteci inşa eder:

- Path 1: `a == 65`
- Path 2: `Not (a == 65)`

Her yol belirteci, denklemi çözmeye çalışacak sözde [SMT çözücüsüne](https://wikipedia.org/wiki/Satisfiability_modulo_theories) verilebilecek matematiksel bir formüldür. `Path 1` için, çözücü yolun `a = 65` ile keşfedileceğini söyleyecektir. `Path 2` için, çözücü `a`'ya 65'ten farklı herhangi bir değer verebilir, örneğin `a = 0`.

### Özellikleri doğrulama {#verifying-properties}

Manticore, her yolun tüm yürütülmesi üzerinde tam kontrole izin verir. Sonuç olarak, hemen hemen her şeye keyfi kısıtlamalar eklemenize izin verir. Bu kontrol, sözleşmedeki özelliklerin oluşturulmasına izin verir.

Aşağıdaki örneği göz önünde bulundurun:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // no overflow protection
  return c;
}
```

Burada fonksiyonda keşfedilecek tek bir yol var:

- Path 1: `c = a + b`

Manticore'u kullanarak taşma olup olmadığını kontrol edebilir ve yol belirtecine kısıtlamalar ekleyebilirsiniz:

- `c = a + b AND (c < a OR c < b)`

`a` ve `b` için yukarıdaki yol belirtecinin uygun olduğu bir değerleme bulmak mümkünse, bir taşma bulmuşsunuz demektir. Örneğin çözücü `a = 10 , b = MAXUINT256` girdisini oluşturabilir.

Sabit bir versiyonu düşünürseniz:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Taşma denetimiyle ilişkili formül şöyle olacaktır:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Bu formül çözülemez; başka bir deyişle bu, `safe_add`'da `c`'nin her zaman artacağının **ispatıdır**.

Bu nedenle DSE, kodunuzdaki keyfi kısıtlamaları doğrulayabilen güçlü bir araçtır.

## Manticore altında çalışma {#running-under-manticore}

Manticore API ile akıllı bir sözleşmeyi nasıl keşfedeceğimizi göreceğiz. Hedef, aşağıdaki akıllı sözleşme [`example.sol`'dür](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Bağımsız bir keşif çalıştırın {#run-a-standalone-exploration}

Aşağıdaki komutla Manticore'u doğrudan akıllı sözleşme üzerinde çalıştırabilirsiniz (`project` bir Solidity Dosyası veya bir proje dizini olabilir):

```bash
$ manticore project
```

Bunun gibi test senaryolarının çıktısını alacaksınız (sıra değişebilir):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Ek bilgi olmadan Manticore, sözleşmede yeni yollar keşfetmeyene kadar sözleşmeyi yeni sembolik işlemlerle keşfedecektir. Manticore, başarısız bir işlemden sonra (örneğin: bir geri alma işleminden sonra) yeni işlemler çalıştırmaz.

Manticore, bilgileri bir `mcore_*` dizininde çıkaracaktır. Diğerlerinin yanı sıra bu dizinde şunları bulacaksınız:

- `global.summary`: kapsam ve derleme uyarıları
- `test_XXXXX.summary`: kapsam, son talimat, test durumu başına hesap bakiyeleri
- `test_XXXXX.tx`: test durumu başına detaylı işlem listesi

Burada Manticore, aşağıdakilere karşılık gelen 7 test senaryosu bulur (dosya adı sırası değişebilir):

|                      |      İşlem 0       |       İşlem 1       | İşlem 2             | Sonuç  |
| :------------------: | :----------------: | :-----------------: | ------------------- | :----: |
| **test_00000000.tx** | Sözleşme oluşturma |       f(!=65)       | f(!=65)             |  STOP  |
| **test_00000001.tx** | Sözleşme oluşturma | fallback fonksiyonu |                     | REVERT |
| **test_00000002.tx** | Sözleşme oluşturma |                     |                     | RETURN |
| **test_00000003.tx** | Sözleşme oluşturma |        f(65)        |                     | REVERT |
| **test_00000004.tx** | Sözleşme oluşturma |       f(!=65)       |                     |  STOP  |
| **test_00000005.tx** | Sözleşme oluşturma |       f(!=65)       | f(65)               | REVERT |
| **test_00000006.tx** | Sözleşme oluşturma |       f(!=65)       | fallback fonksiyonu | REVERT |

_Keşif özeti f(!=65), 65'ten farklı herhangi bir değerle çağrılan f'yi ifade eder._

Gördüğünüz üzere, Manticore her başarılı veya geri alınan işlem için benzersiz bir test senaryosu oluşturur.

Eğer hızlı kod keşfi istiyorsanız `--quick-mode` bayrağını kullanın (hata algılayıcıları, gaz hesaplamalarını vb. devre dışarı bırakır)

### API aracılığıyla bir akıllı sözleşmeyi değiştirin {#manipulate-a-smart-contract-through-the-api}

Bu bölüm, Manticore Python API aracılığıyla bir akıllı sözleşmenin nasıl değiştirileceğini açıklar. `*.py` python uzantılı yeni bir dosya oluşturabilir ve bu dosyaya API komutlarını (temelleri aşağıda anlatılacaktır) ekleyerek gerekli kodu yazabilir ve ardından `$ python3 *.py` komutu ile çalıştırabilirsiniz. Ayrıca aşağıdaki komutları doğrudan python konsolunda çalıştırabilirsiniz, konsolu çalıştırmak için `$ python3` komutunu kullanın.

### Hesap oluşturma {#creating-accounts}

Yapmanız gereken ilk şey, aşağıdaki komutlarla yeni bir blok zinciri başlatmaktır:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Sözleşme olmayan bir hesap [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) kullanılarak oluşturulur:

```python
user_account = m.create_account(balance=1000)
```

Bir Solidity sözleşmesi [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) kullanılarak dağıtılabilir:

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

- [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) ve [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) ile kullanıcı ve sözleşme hesapları oluşturabilirsiniz.

### İşlemleri yürütme {#executing-transactions}

Manticore iki tür işlemi destekler:

- Ham işlem: tüm fonksiyonlar keşfedilir
- Adlandırılmış işlem: yalnızca bir fonksiyon keşfedilir

#### Ham işlem {#raw-transaction}

Bir ham işlem [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) ile yürütülür:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Çağıran, adres, veri veya işlemin değeri somut veya sembolik olabilir:

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

Veriler sembolik ise, Manticore işlemin yürütülmesi sırasında sözleşmenin tüm fonksiyonlarını keşfedecektir. Fonksiyon seçiminin nasıl çalıştığını anlamak için [Ethernaut CTF Kullanımı](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) makalesindeki Fallback Function açıklamasına göz atmak faydalı olacaktır.

#### Adlandırılmış işlem {#named-transaction}

İşlevler, adları aracılığıyla yürütülebilir. `f(uint var)` komutunu user_account'tan sembolik bir değerle ve 0 ether ile yürütmek için şunu kullanın:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

İşlemin `value` değeri belirtilmemişse, varsayılan olarak 0'dır.

#### Özet {#summary-1}

- Bir işlemin argümanları somut veya sembolik olabilir
- Ham işlem tüm fonksiyonları keşfedecek
- Fonksiyonlar, isimleriyle çağrılabilir

### Çalışma Alanı {#workspace}

`m.workspace`, oluşturulan tüm dosyalar için çıktı dizini olarak kullanılan dizindir:

```python
print("Results are in {}".format(m.workspace))
```

### Keşfi Durdurma {#terminate-the-exploration}

Keşfi durdurmak için [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) kullanın. Bu yöntem çağrıldığında ve Manticore keşfedilen yolların her biri için test senaryoları oluşturduğunda başka işlem gönderilmeyecektir.

### Özet: Manticore altında çalışma {#summary-running-under-manticore}

Önceki tüm adımları bir araya getirerek şunu elde ederiz:

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
m.finalize() # stop the exploration
```

Yukarıdaki kodların tamamını [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) içinde bulabilirsiniz

## Atış yollarını alma {#getting-throwing-paths}

Şimdi `f()` içinde bir istisna belirten yollar için spesifik girdiler oluşturacağız. Hedef hâlâ şu akıllı sözleşmedir [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Durum bilgisini kullanmak {#using-state-information}

Yürütülen her yolun kendi blok zinciri durumu vardır. Bir durum ya hazırdır ya da öldürülmüştür, yani bir THROW veya REVERT komutuna ulaştığı anlamına gelir:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): hazır olan durumların listesi (REVERT/INVALID yürütmediler)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): öldürülmüş durumların listesi
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): tüm durumlar

```python
for state in m.all_states:
    # do something with state
```

Durum bilgisine erişebilirsiniz. Örneğin:

- `state.platform.get_balance(account.address)`: hesabın bakiyesi
- `state.platform.transactions`: işlem listesi
- `state.platform.transactions[-1].return_data`: son işlemden döndürülen veri

Son işlem tarafından döndürülen veriler, ABI.deserialize ile bir değere dönüştürülebilen bir dizidir, örneğin:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Test durumu nasıl oluşturulur {#how-to-generate-testcase}

Test durumu oluşturmak için [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) kullanın:

```python
m.generate_testcase(state, 'BugFound')
```

### Özet {#summary-2}

- m.all_states ile durumu yineleyebilirsiniz
- `state.platform.get_balance(account.address)` hesabın bakiyesini döndürür
- `state.platform.transactions` işlemlerin listesini döndürür
- `transaction.return_data` döndürülen veridir
- `m.generate_testcase(state, name)` durum için girdiler oluşturur

### Özet: Atış Yolunu Almak {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Yukarıdaki kodların tamamını [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) içinde bulabilirsiniz

_terminated_state tarafından döndürülen tüm durumların sonuçlarında REVERT veya INVALID olduğundan çok daha basit bir komut dosyası oluşturabileceğimizi unutmayın: Bu örnek yalnızca API'nin nasıl değiştirileceğini göstermek içindir._

## Kısıtlamalar ekleme {#adding-constraints}

Keşfi nasıl kısıtlayabileceğimizi göreceğiz. `f()` belgesinin, fonksiyonun hiçbir zaman `a == 65` ile çağrılmadığını belirttiği varsayımını yapacağız, bu nedenle `a == 65` ile herhangi bir hata gerçek bir hata değildir. Hedef hâlâ aşağıdaki akıllı sözleşmedir [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

[Operatörler](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) modülü, sağladığı diğer şeylerin yanı sıra kısıtlamaların değiştirilmesini kolaylaştırır:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

Modülü içe aktarmak için aşağıdakileri kullanın:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` bir diziyi bir değerle birleştirmek için kullanılır. Örneğin, bir işlemin return_data'sının başka bir değere karşı kontrol edilmesi için bir değerle değiştirilmesi gerekir:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Kısıtlamalar {#state-constraint}

Kısıtlamaları global olarak veya belirli bir durum için kullanabilirsiniz.

#### Global kısıtlama {#state-constraint}

Global bir kısıtlama eklemek için `m.constrain(constraint)` kullanın. Örneğin, sembolik bir adresten bir sözleşmeyi arayabilir ve bu adresi belirli değerlerle sınırlandırabilirsiniz:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Durum kısıtlaması {#state-constraint}

Belirli bir duruma kısıtlama eklemek için [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) kullanın. Üzerindeki bazı özellikleri kontrol etmek için keşfinden sonra durumu kısıtlamak için kullanılabilir.

### Kısıtlamaları kontrol etmek {#checking-constraint}

Eğer bir kısıtlamanın hâlâ mümkün olup olmadığını görmek istiyorsanız `solver.check(state.constraints)` kullanın. Örneğin, aşağıdakiler symbolic_value'yu 65'ten farklı olacak şekilde kısıtlar ve durumun hâlâ uygulanabilir olup olmadığını kontrol eder:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state is feasible
```

### Özet: Kısıtlamalar Ekleme {#summary-adding-constraints}

Önceki koda kısıtlama ekleyerek şunu elde ederiz:

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

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # we do not consider the path were a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Yukarıdaki kodların tamamını [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) içinde bulabilirsiniz
