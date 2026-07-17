---
title: "⁦EVM⁩ کے لیے آپ کوڈز"
description: "ایتھیریم ورچوئل مشین کے لیے تمام دستیاب آپ کوڈز کی فہرست۔"
lang: ur
---

## جائزہ {#overview}

یہ [<span dir="ltr">wolflo/evm-opcodes</span>](https://github.com/wolflo/evm-opcodes) پر موجود <span dir="ltr">EVM</span> حوالہ جاتی صفحہ کا اپ ڈیٹ شدہ ورژن ہے۔
اسے [یلو پیپر](https://ethereum.github.io/yellowpaper/paper.pdf)، [جیلو پیپر](https://jellopaper.org/evm/)، اور [<span dir="ltr">geth</span>](https://github.com/ethereum/go-ethereum) کی عمل درآمد سے بھی اخذ کیا گیا ہے۔
اس کا مقصد ایک قابل رسائی حوالہ فراہم کرنا ہے، لیکن یہ کوئی حتمی یا انتہائی تفصیلی دستاویز نہیں ہے۔
اگر آپ درستگی کا یقین کرنا چاہتے ہیں اور ہر ایک ایج کیس سے باخبر رہنا چاہتے ہیں، تو جیلو پیپر یا کسی کلائنٹ کی عمل درآمد کا استعمال کرنا مناسب ہے۔

کیا آپ ایک انٹرایکٹو حوالہ تلاش کر رہے ہیں؟ [<span dir="ltr">evm.codes</span>](https://www.evm.codes/) دیکھیں۔

متحرک گیس کی لاگت والے آپریشنز کے لیے، [<span dir="ltr">gas.md</span>](https://github.com/wolflo/evm-opcodes/blob/main/gas.md) دیکھیں۔

💡 فوری مشورہ: پوری لائنیں دیکھنے کے لیے، ڈیسک ٹاپ پر افقی طور پر اسکرول کرنے کے لیے `[shift] + scroll` کا استعمال کریں۔

| اسٹیک | نام | گیس | ابتدائی اسٹیک | نتیجتاً اسٹیک | میموری / اسٹوریج | نوٹس |
| :---: | :------------- | :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------- | :------------------------------ | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| <span dir="ltr">00</span> | <span dir="ltr">STOP</span> | 0 | | | | عمل درآمد روکیں |
| <span dir="ltr">01</span> | <span dir="ltr">ADD</span> | 3 | `a, b` | `a + b` | | <span dir="ltr">(u)int256</span> جمع موڈیولو <span dir="ltr">2\*\*256</span> |
| <span dir="ltr">02</span> | <span dir="ltr">MUL</span> | 5 | `a, b` | `a * b` | | <span dir="ltr">(u)int256</span> ضرب موڈیولو <span dir="ltr">2\*\*256</span> |
| <span dir="ltr">03</span> | <span dir="ltr">SUB</span> | 3 | `a, b` | `a - b` | | <span dir="ltr">(u)int256</span> تفریق موڈیولو <span dir="ltr">2\*\*256</span> |
| <span dir="ltr">04</span> | <span dir="ltr">DIV</span> | 5 | `a, b` | `a // b` | | <span dir="ltr">uint256</span> تقسیم |
| <span dir="ltr">05</span> | <span dir="ltr">SDIV</span> | 5 | `a, b` | `a // b` | | <span dir="ltr">int256</span> تقسیم |
| <span dir="ltr">06</span> | <span dir="ltr">MOD</span> | 5 | `a, b` | `a % b` | | <span dir="ltr">uint256</span> موڈیولس |
| <span dir="ltr">07</span> | <span dir="ltr">SMOD</span> | 5 | `a, b` | `a % b` | | <span dir="ltr">int256</span> موڈیولس |
| <span dir="ltr">08</span> | <span dir="ltr">ADDMOD</span> | 8 | `a, b, N` | `(a + b) % N` | | <span dir="ltr">(u)int256</span> جمع موڈیولو <span dir="ltr">N</span> |
| <span dir="ltr">09</span> | <span dir="ltr">MULMOD</span> | 8 | `a, b, N` | `(a * b) % N` | | <span dir="ltr">(u)int256</span> ضرب موڈیولو <span dir="ltr">N</span> |
| <span dir="ltr">0A</span> | <span dir="ltr">EXP</span> | [A1](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a1-exp) | `a, b` | `a ** b` | | <span dir="ltr">uint256</span> ایکسپونینشی ایشن موڈیولو <span dir="ltr">2\*\*256</span> |
| <span dir="ltr">0B</span> | <span dir="ltr">SIGNEXTEND</span> | 5 | `b, x` | `SIGNEXTEND(x, b)` | | [سائن ایکسٹینڈ](https://wikipedia.org/wiki/Sign_extension) کریں `x` کو `(b+1)` بائٹس سے <span dir="ltr">32</span> بائٹس تک |
| <span dir="ltr">0C-0F</span> | _غیر معتبر_ |
| <span dir="ltr">10</span> | <span dir="ltr">LT</span> | 3 | `a, b` | `a < b` | | <span dir="ltr">uint256</span> کم ہے (less-than) |
| <span dir="ltr">11</span> | <span dir="ltr">GT</span> | 3 | `a, b` | `a > b` | | <span dir="ltr">uint256</span> زیادہ ہے (greater-than) |
| <span dir="ltr">12</span> | <span dir="ltr">SLT</span> | 3 | `a, b` | `a < b` | | <span dir="ltr">int256</span> کم ہے (less-than) |
| <span dir="ltr">13</span> | <span dir="ltr">SGT</span> | 3 | `a, b` | `a > b` | | <span dir="ltr">int256</span> زیادہ ہے (greater-than) |
| <span dir="ltr">14</span> | <span dir="ltr">EQ</span> | 3 | `a, b` | `a == b` | | <span dir="ltr">(u)int256</span> برابری |
| <span dir="ltr">15</span> | <span dir="ltr">ISZERO</span> | 3 | `a` | `a == 0` | | <span dir="ltr">(u)int256</span> صفر ہے (iszero) |
| <span dir="ltr">16</span> | <span dir="ltr">AND</span> | 3 | `a, b` | `a && b` | | بٹ وائز <span dir="ltr">AND</span> |
| <span dir="ltr">17</span> | <span dir="ltr">OR</span> | 3 | `a, b` | `a \|\| b` | | بٹ وائز <span dir="ltr">OR</span> |
| <span dir="ltr">18</span> | <span dir="ltr">XOR</span> | 3 | `a, b` | `a ^ b` | | بٹ وائز <span dir="ltr">XOR</span> |
| <span dir="ltr">19</span> | <span dir="ltr">NOT</span> | 3 | `a` | `~a` | | بٹ وائز <span dir="ltr">NOT</span> |
| <span dir="ltr">1A</span> | <span dir="ltr">BYTE</span> | 3 | `i, x` | `(x >> (248 - i * 8)) && 0xFF` | | <span dir="ltr">(u)int256</span> `x` کا `i`واں بائٹ، بائیں طرف سے |
| <span dir="ltr">1B</span> | <span dir="ltr">SHL</span> | 3 | `shift, val` | `val << shift` | | بائیں شفٹ کریں |
| <span dir="ltr">1C</span> | <span dir="ltr">SHR</span> | 3 | `shift, val` | `val >> shift` | | منطقی دائیں شفٹ |
| <span dir="ltr">1D</span> | <span dir="ltr">SAR</span> | 3 | `shift, val` | `val >> shift` | | ریاضیاتی دائیں شفٹ |
| <span dir="ltr">1E-1F</span> | _غیر معتبر_ |
| <span dir="ltr">20</span> | <span dir="ltr">KECCAK256</span> | [A2](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a2-sha3) | `ost, len` | `keccak256(mem[ost:ost+len-1])` | | <span dir="ltr">keccak256</span> |
| <span dir="ltr">21-2F</span> | _غیر معتبر_ |
| <span dir="ltr">30</span> | <span dir="ltr">ADDRESS</span> | 2 | `.` | `address(this)` | | عمل درآمد کرنے والے کنٹریکٹ کا پتہ |
| <span dir="ltr">31</span> | <span dir="ltr">BALANCE</span> | [A5](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a5-balance-extcodesize-extcodehash) | `addr` | `addr.balance` | | بیلنس، <span dir="ltr">Wei</span> میں |
| <span dir="ltr">32</span> | <span dir="ltr">ORIGIN</span> | 2 | `.` | `tx.origin` | | وہ پتہ جس نے ٹرانزیکشن شروع کی |
| <span dir="ltr">33</span> | <span dir="ltr">CALLER</span> | 2 | `.` | `msg.sender` | | <span dir="ltr">msg</span> بھیجنے والے کا پتہ |
| <span dir="ltr">34</span> | <span dir="ltr">CALLVALUE</span> | 2 | `.` | `msg.value` | | <span dir="ltr">msg</span> کی قدر، <span dir="ltr">Wei</span> میں |
| <span dir="ltr">35</span> | <span dir="ltr">CALLDATALOAD</span> | 3 | `idx` | `msg.data[idx:idx+32]` | | اشاریہ `idx` پر <span dir="ltr">msg</span> ڈیٹا سے لفظ پڑھیں |
| <span dir="ltr">36</span> | <span dir="ltr">CALLDATASIZE</span> | 2 | `.` | `len(msg.data)` | | <span dir="ltr">msg</span> ڈیٹا کی لمبائی، بائٹس میں |
| <span dir="ltr">37</span> | <span dir="ltr">CALLDATACOPY</span> | [A3](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a3-copy-operations) | `dstOst, ost, len` | `.` | <span dir="ltr">mem[dstOst:dstOst+len-1] := msg.data[ost:ost+len-1]</span> | <span dir="ltr">msg</span> ڈیٹا کاپی کریں |
| <span dir="ltr">38</span> | <span dir="ltr">CODESIZE</span> | 2 | `.` | `len(this.code)` | | عمل درآمد کرنے والے کنٹریکٹ کے کوڈ کی لمبائی، بائٹس میں |
| <span dir="ltr">39</span> | <span dir="ltr">CODECOPY</span> | [A3](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a3-copy-operations) | `dstOst, ost, len` | `.` | <span dir="ltr">mem[dstOst:dstOst+len-1] := this.code[ost:ost+len-1]</span> | عمل درآمد کرنے والے کنٹریکٹ کا بائٹ کوڈ کاپی کریں |
| <span dir="ltr">3A</span> | <span dir="ltr">GASPRICE</span> | 2 | `.` | `tx.gasprice` | | ٹرانزیکشن کی گیس کی قیمت، <span dir="ltr">Wei</span> فی یونٹ گیس میں [\*\*](https://eips.ethereum.org/EIPS/eip-1559#gasprice) |
| <span dir="ltr">3B</span> | <span dir="ltr">EXTCODESIZE</span> | [A5](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a5-balance-extcodesize-extcodehash) | `addr` | `len(addr.code)` | | پتہ پر کوڈ کا سائز، بائٹس میں |
| <span dir="ltr">3C</span> | <span dir="ltr">EXTCODECOPY</span> | [A4](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a4-extcodecopy) | `addr, dstOst, ost, len` | `.` | <span dir="ltr">mem[dstOst:dstOst+len-1] := addr.code[ost:ost+len-1]</span> | `addr` سے کوڈ کاپی کریں |
| <span dir="ltr">3D</span> | <span dir="ltr">RETURNDATASIZE</span> | 2 | `.` | `size` | | آخری بیرونی کال سے واپس کیے گئے ڈیٹا کا سائز، بائٹس میں |
| <span dir="ltr">3E</span> | <span dir="ltr">RETURNDATACOPY</span> | [A3](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a3-copy-operations) | `dstOst, ost, len` | `.` | <span dir="ltr">mem[dstOst:dstOst+len-1] := returndata[ost:ost+len-1]</span> | آخری بیرونی کال سے واپس کیا گیا ڈیٹا کاپی کریں |
| <span dir="ltr">3F</span> | <span dir="ltr">EXTCODEHASH</span> | [A5](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a5-balance-extcodesize-extcodehash) | `addr` | `hash` | | <span dir="ltr">hash = addr.exists ? keccak256(addr.code) : 0</span> |
| <span dir="ltr">40</span> | <span dir="ltr">BLOCKHASH</span> | 20 | `blockNum` | `blockHash(blockNum)` | | |
| <span dir="ltr">41</span> | <span dir="ltr">COINBASE</span> | 2 | `.` | `block.coinbase` | | موجودہ بلاک کے تجویز کنندہ کا پتہ |
| <span dir="ltr">42</span> | <span dir="ltr">TIMESTAMP</span> | 2 | `.` | `block.timestamp` | | موجودہ بلاک کا ٹائم اسٹیمپ |
| <span dir="ltr">43</span> | <span dir="ltr">NUMBER</span> | 2 | `.` | `block.number` | | موجودہ بلاک کا نمبر |
| <span dir="ltr">44</span> | <span dir="ltr">PREVRANDAO</span> | 2 | `.` | `randomness beacon` | | بے ترتیبی بیکن |
| <span dir="ltr">45</span> | <span dir="ltr">GASLIMIT</span> | 2 | `.` | `block.gaslimit` | | موجودہ بلاک کی گیس کی حد |
| <span dir="ltr">46</span> | <span dir="ltr">CHAINID</span> | 2 | `.` | `chain_id` | | موجودہ [چین کی شناخت (chain id)](https://eips.ethereum.org/EIPS/eip-155) کو اسٹیک پر پش کریں |
| <span dir="ltr">47</span> | <span dir="ltr">SELFBALANCE</span> | 5 | `.` | `address(this).balance` | | عمل درآمد کرنے والے کنٹریکٹ کا بیلنس، <span dir="ltr">Wei</span> میں |
| <span dir="ltr">48</span> | <span dir="ltr">BASEFEE</span> | 2 | `.` | `block.basefee` | | موجودہ بلاک کی بنیادی فیس |
| <span dir="ltr">49</span> | <span dir="ltr">BLOBHASH</span> | 3 | `idx` | `tx.blob_versioned_hashes[idx]` | | [<span dir="ltr">EIP-4844</span>](https://eips.ethereum.org/EIPS/eip-4844) |
| <span dir="ltr">4A</span> | <span dir="ltr">BLOBBASEFEE</span> | 2 | `.` | `block.blobbasefee` | | موجودہ بلاک کی بلاب بنیادی فیس ([<span dir="ltr">EIP-7516</span>](https://eips.ethereum.org/EIPS/eip-7516)) |
| <span dir="ltr">4B-4F</span> | _غیر معتبر_ |
| <span dir="ltr">50</span> | <span dir="ltr">POP</span> | 2 | `_anon` | `.` | | اسٹیک کے اوپری حصے سے آئٹم ہٹائیں اور اسے ضائع کریں |
| <span dir="ltr">51</span> | <span dir="ltr">MLOAD</span> | 3[\*](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a0-1-memory-expansion) | `ost` | `mem[ost:ost+32]` | | آفسیٹ `ost` پر میموری سے لفظ پڑھیں |
| <span dir="ltr">52</span> | <span dir="ltr">MSTORE</span> | 3[\*](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a0-1-memory-expansion) | `ost, val` | `.` | <span dir="ltr">mem[ost:ost+32] := val</span> | میموری میں ایک لفظ لکھیں |
| <span dir="ltr">53</span> | <span dir="ltr">MSTORE8</span> | 3[\*](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a0-1-memory-expansion) | `ost, val` | `.` | <span dir="ltr">mem[ost] := val && 0xFF</span> | میموری میں ایک بائٹ لکھیں |
| <span dir="ltr">54</span> | <span dir="ltr">SLOAD</span> | [A6](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a6-sload) | `key` | `storage[key]` | | اسٹوریج سے لفظ پڑھیں |
| <span dir="ltr">55</span> | <span dir="ltr">SSTORE</span> | [A7](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a7-sstore) | `key, val` | `.` | <span dir="ltr">storage[key] := val</span> | اسٹوریج میں لفظ لکھیں |
| <span dir="ltr">56</span> | <span dir="ltr">JUMP</span> | 8 | `dst` | `.` | | `$pc := dst` نشان زد کرتا ہے کہ `pc` صرف تبھی تفویض کیا جاتا ہے اگر `dst` ایک درست <span dir="ltr">jumpdest</span> ہو |
| <span dir="ltr">57</span> | <span dir="ltr">JUMPI</span> | 10 | `dst, condition` | `.` | | `$pc := condition ? dst : $pc + 1` |
| <span dir="ltr">58</span> | <span dir="ltr">PC</span> | 2 | `.` | `$pc` | | پروگرام کاؤنٹر |
| <span dir="ltr">59</span> | <span dir="ltr">MSIZE</span> | 2 | `.` | `len(mem)` | | موجودہ عمل درآمد کے سیاق و سباق میں میموری کا سائز، بائٹس میں |
| <span dir="ltr">5A</span> | <span dir="ltr">GAS</span> | 2 | `.` | `gasRemaining` | | |
| <span dir="ltr">5B</span> | <span dir="ltr">JUMPDEST</span> | 1 | | | | ایک درست جمپ کی منزل، مثال کے طور پر ایک جمپ کی منزل جو پش ڈیٹا کے اندر نہ ہو |
| <span dir="ltr">5C</span> | <span dir="ltr">TLOAD</span> | 100 | `key` | `tstorage[key]` | | عارضی اسٹوریج سے لفظ پڑھیں ([<span dir="ltr">EIP-1153</span>](https://eips.ethereum.org/EIPS/eip-1153)) |
| <span dir="ltr">5D</span> | <span dir="ltr">TSTORE</span> | 100 | `key, val` | `.` | <span dir="ltr">tstorage[key] := val</span> | عارضی اسٹوریج میں لفظ لکھیں ([<span dir="ltr">EIP-1153</span>](https://eips.ethereum.org/EIPS/eip-1153)) |
| <span dir="ltr">5E</span> | <span dir="ltr">MCOPY</span> | <span dir="ltr">3+3\*words+</span>[A0](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a0-1-memory-expansion) | `dstOst, ost, len` | `.` | <span dir="ltr">mem[dstOst] := mem[ost:ost+len]</span> | میموری کو ایک جگہ سے دوسری جگہ کاپی کریں ([<span dir="ltr">EIP-5656</span>](https://eips.ethereum.org/EIPS/eip-5656)) |
| <span dir="ltr">5F</span> | <span dir="ltr">PUSH0</span> | 2 | `.` | `uint8` | | مستقل قدر <span dir="ltr">0</span> کو اسٹیک پر پش کریں |
| <span dir="ltr">60</span> | <span dir="ltr">PUSH1</span> | 3 | `.` | `uint8` | | <span dir="ltr">1</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">61</span> | <span dir="ltr">PUSH2</span> | 3 | `.` | `uint16` | | <span dir="ltr">2</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">62</span> | <span dir="ltr">PUSH3</span> | 3 | `.` | `uint24` | | <span dir="ltr">3</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">63</span> | <span dir="ltr">PUSH4</span> | 3 | `.` | `uint32` | | <span dir="ltr">4</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">64</span> | <span dir="ltr">PUSH5</span> | 3 | `.` | `uint40` | | <span dir="ltr">5</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">65</span> | <span dir="ltr">PUSH6</span> | 3 | `.` | `uint48` | | <span dir="ltr">6</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">66</span> | <span dir="ltr">PUSH7</span> | 3 | `.` | `uint56` | | <span dir="ltr">7</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">67</span> | <span dir="ltr">PUSH8</span> | 3 | `.` | `uint64` | | <span dir="ltr">8</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">68</span> | <span dir="ltr">PUSH9</span> | 3 | `.` | `uint72` | | <span dir="ltr">9</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">69</span> | <span dir="ltr">PUSH10</span> | 3 | `.` | `uint80` | | <span dir="ltr">10</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">6A</span> | <span dir="ltr">PUSH11</span> | 3 | `.` | `uint88` | | <span dir="ltr">11</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">6B</span> | <span dir="ltr">PUSH12</span> | 3 | `.` | `uint96` | | <span dir="ltr">12</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">6C</span> | <span dir="ltr">PUSH13</span> | 3 | `.` | `uint104` | | <span dir="ltr">13</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">6D</span> | <span dir="ltr">PUSH14</span> | 3 | `.` | `uint112` | | <span dir="ltr">14</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">6E</span> | <span dir="ltr">PUSH15</span> | 3 | `.` | `uint120` | | <span dir="ltr">15</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">6F</span> | <span dir="ltr">PUSH16</span> | 3 | `.` | `uint128` | | <span dir="ltr">16</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">70</span> | <span dir="ltr">PUSH17</span> | 3 | `.` | `uint136` | | <span dir="ltr">17</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">71</span> | <span dir="ltr">PUSH18</span> | 3 | `.` | `uint144` | | <span dir="ltr">18</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">72</span> | <span dir="ltr">PUSH19</span> | 3 | `.` | `uint152` | | <span dir="ltr">19</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">73</span> | <span dir="ltr">PUSH20</span> | 3 | `.` | `uint160` | | <span dir="ltr">20</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">74</span> | <span dir="ltr">PUSH21</span> | 3 | `.` | `uint168` | | <span dir="ltr">21</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">75</span> | <span dir="ltr">PUSH22</span> | 3 | `.` | `uint176` | | <span dir="ltr">22</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">76</span> | <span dir="ltr">PUSH23</span> | 3 | `.` | `uint184` | | <span dir="ltr">23</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">77</span> | <span dir="ltr">PUSH24</span> | 3 | `.` | `uint192` | | <span dir="ltr">24</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">78</span> | <span dir="ltr">PUSH25</span> | 3 | `.` | `uint200` | | <span dir="ltr">25</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">79</span> | <span dir="ltr">PUSH26</span> | 3 | `.` | `uint208` | | <span dir="ltr">26</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">7A</span> | <span dir="ltr">PUSH27</span> | 3 | `.` | `uint216` | | <span dir="ltr">27</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">7B</span> | <span dir="ltr">PUSH28</span> | 3 | `.` | `uint224` | | <span dir="ltr">28</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">7C</span> | <span dir="ltr">PUSH29</span> | 3 | `.` | `uint232` | | <span dir="ltr">29</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">7D</span> | <span dir="ltr">PUSH30</span> | 3 | `.` | `uint240` | | <span dir="ltr">30</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">7E</span> | <span dir="ltr">PUSH31</span> | 3 | `.` | `uint248` | | <span dir="ltr">31</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">7F</span> | <span dir="ltr">PUSH32</span> | 3 | `.` | `uint256` | | <span dir="ltr">32</span>-بائٹ کی قدر کو اسٹیک پر پش کریں |
| <span dir="ltr">80</span> | <span dir="ltr">DUP1</span> | 3 | `a` | `a, a` | | اسٹیک پر پہلی قدر کا کلون بنائیں |
| <span dir="ltr">81</span> | <span dir="ltr">DUP2</span> | 3 | `_, a` | `a, _, a` | | اسٹیک پر دوسری قدر کا کلون بنائیں |
| <span dir="ltr">82</span> | <span dir="ltr">DUP3</span> | 3 | `_, _, a` | `a, _, _, a` | | اسٹیک پر تیسری قدر کا کلون بنائیں |
| <span dir="ltr">83</span> | <span dir="ltr">DUP4</span> | 3 | `_, _, _, a` | `a, _, _, _, a` | | اسٹیک پر چوتھی قدر کا کلون بنائیں |
| <span dir="ltr">84</span> | <span dir="ltr">DUP5</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر پانچویں قدر کا کلون بنائیں |
| <span dir="ltr">85</span> | <span dir="ltr">DUP6</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر چھٹی قدر کا کلون بنائیں |
| <span dir="ltr">86</span> | <span dir="ltr">DUP7</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر ساتویں قدر کا کلون بنائیں |
| <span dir="ltr">87</span> | <span dir="ltr">DUP8</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر آٹھویں قدر کا کلون بنائیں |
| <span dir="ltr">88</span> | <span dir="ltr">DUP9</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر نویں قدر کا کلون بنائیں |
| <span dir="ltr">89</span> | <span dir="ltr">DUP10</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر دسویں قدر کا کلون بنائیں |
| <span dir="ltr">8A</span> | <span dir="ltr">DUP11</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر گیارہویں قدر کا کلون بنائیں |
| <span dir="ltr">8B</span> | <span dir="ltr">DUP12</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر بارہویں قدر کا کلون بنائیں |
| <span dir="ltr">8C</span> | <span dir="ltr">DUP13</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر تیرہویں قدر کا کلون بنائیں |
| <span dir="ltr">8D</span> | <span dir="ltr">DUP14</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر چودہویں قدر کا کلون بنائیں |
| <span dir="ltr">8E</span> | <span dir="ltr">DUP15</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر پندرہویں قدر کا کلون بنائیں |
| <span dir="ltr">8F</span> | <span dir="ltr">DUP16</span> | 3 | `..., a` | `a, ..., a` | | اسٹیک پر <span dir="ltr">16</span>ویں قدر کا کلون بنائیں |
| <span dir="ltr">90</span> | <span dir="ltr">SWAP1</span> | 3 | `a, b` | `b, a` | | |
| <span dir="ltr">91</span> | <span dir="ltr">SWAP2</span> | 3 | `a, _, b` | `b, _, a` | | |
| <span dir="ltr">92</span> | <span dir="ltr">SWAP3</span> | 3 | `a, _, _, b` | `b, _, _, a` | | |
| <span dir="ltr">93</span> | <span dir="ltr">SWAP4</span> | 3 | `a, _, _, _, b` | `b, _, _, _, a` | | |
| <span dir="ltr">94</span> | <span dir="ltr">SWAP5</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">95</span> | <span dir="ltr">SWAP6</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">96</span> | <span dir="ltr">SWAP7</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">97</span> | <span dir="ltr">SWAP8</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">98</span> | <span dir="ltr">SWAP9</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">99</span> | <span dir="ltr">SWAP10</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">9A</span> | <span dir="ltr">SWAP11</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">9B</span> | <span dir="ltr">SWAP12</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">9C</span> | <span dir="ltr">SWAP13</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">9D</span> | <span dir="ltr">SWAP14</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">9E</span> | <span dir="ltr">SWAP15</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">9F</span> | <span dir="ltr">SWAP16</span> | 3 | `a, ..., b` | `b, ..., a` | | |
| <span dir="ltr">A0</span> | <span dir="ltr">LOG0</span> | [A8](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a8-log-operations) | `ost, len` | `.` | | <span dir="ltr">LOG0(memory[ost:ost+len-1])</span> |
| <span dir="ltr">A1</span> | <span dir="ltr">LOG1</span> | [A8](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a8-log-operations) | `ost, len, topic0` | `.` | | <span dir="ltr">LOG1(memory[ost:ost+len-1], topic0)</span> |
| <span dir="ltr">A2</span> | <span dir="ltr">LOG2</span> | [A8](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a8-log-operations) | `ost, len, topic0, topic1` | `.` | | <span dir="ltr">LOG2(memory[ost:ost+len-1], topic0, topic1)</span> |
| <span dir="ltr">A3</span> | <span dir="ltr">LOG3</span> | [A8](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a8-log-operations) | `ost, len, topic0, topic1, topic2` | `.` | | <span dir="ltr">LOG3(memory[ost:ost+len-1], topic0, topic1, topic2)</span> |
| <span dir="ltr">A4</span> | <span dir="ltr">LOG4</span> | [A8](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a8-log-operations) | `ost, len, topic0, topic1, topic2, topic3` | `.` | | <span dir="ltr">LOG4(memory[ost:ost+len-1],&#160;topic0,&#160;topic1,&#160;topic2,&#160;topic3)</span> |
| <span dir="ltr">A5-EF</span> | _غیر معتبر_ |
| <span dir="ltr">F0</span> | <span dir="ltr">CREATE</span> | [A9](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a9-create-operations) | `val, ost, len` | `addr` | | <span dir="ltr">addr = keccak256(rlp([address(this), this.nonce]))</span> |
| <span dir="ltr">F1</span> | <span dir="ltr">CALL</span> | [AA](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#aa-call-operations) | <code>gas,&#160;addr,&#160;val,&#160;argOst,&#160;argLen,&#160;retOst,&#160;retLen</code> | `success` | <span dir="ltr">mem[retOst:retOst+retLen-1] := returndata</span> | |
| <span dir="ltr">F2</span> | <span dir="ltr">CALLCODE</span> | [AA](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#aa-call-operations) | `gas, addr, val, argOst, argLen, retOst, retLen` | `success` | <span dir="ltr">mem[retOst:retOst+retLen-1]&#160;=&#160;returndata</span> | <span dir="ltr">DELEGATECALL</span> کی طرح، لیکن اصل <span dir="ltr">msg.sender</span> اور <span dir="ltr">msg.value</span> کو آگے نہیں بڑھاتا |
| <span dir="ltr">F3</span> | <span dir="ltr">RETURN</span> | 0[\*](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a0-1-memory-expansion) | `ost, len` | `.` | | <span dir="ltr">return mem[ost:ost+len-1]</span> |
| <span dir="ltr">F4</span> | <span dir="ltr">DELEGATECALL</span> | [AA](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#aa-call-operations) | `gas, addr, argOst, argLen, retOst, retLen` | `success` | <span dir="ltr">mem[retOst:retOst+retLen-1] := returndata</span> | |
| <span dir="ltr">F5</span> | <span dir="ltr">CREATE2</span> | [A9](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a9-create-operations) | `val, ost, len, salt` | `addr` | | <span dir="ltr">addr = keccak256(0xff ++ address(this) ++ salt ++ keccak256(mem[ost:ost+len-1]))[12:]</span> |
| <span dir="ltr">F6-F9</span> | _غیر معتبر_ |
| <span dir="ltr">FA</span> | <span dir="ltr">STATICCALL</span> | [AA](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#aa-call-operations) | `gas, addr, argOst, argLen, retOst, retLen` | `success` | <span dir="ltr">mem[retOst:retOst+retLen-1] := returndata</span> | |
| <span dir="ltr">FB-FC</span> | _غیر معتبر_ |
| <span dir="ltr">FD</span> | <span dir="ltr">REVERT</span> | 0[\*](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#a0-1-memory-expansion) | `ost, len` | `.` | | <span dir="ltr">revert(mem[ost:ost+len-1])</span> |
| <span dir="ltr">FE</span> | <span dir="ltr">INVALID</span> | [AF](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#af-invalid) | | | | نامزد کردہ غیر معتبر آپ کوڈ - [<span dir="ltr">EIP-141</span>](https://eips.ethereum.org/EIPS/eip-141) |
| <span dir="ltr">FF</span> | <span dir="ltr">SELFDESTRUCT</span> | [AB](https://github.com/wolflo/evm-opcodes/blob/main/gas.md#ab-selfdestruct) | `addr` | `.` | | تمام <span dir="ltr">ETH</span> کو `addr` پر بھیجتا ہے؛ اگر اسی ٹرانزیکشن میں عمل درآمد کیا جائے جس میں کنٹریکٹ بنایا گیا تھا تو یہ کنٹریکٹ کو تباہ کر دیتا ہے |