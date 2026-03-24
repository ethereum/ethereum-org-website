---
title: Pengantar Bootnode Ethereum
description: Informasi dasar yang Anda butuhkan untuk memahami bootnode
lang: id
---

Ketika sebuah node baru bergabung dengan jaringan Ethereum, node tersebut perlu terhubung ke node yang sudah ada di jaringan untuk kemudian menemukan peer baru. Titik masuk ke jaringan Ethereum ini disebut bootnode. Klien biasanya memiliki daftar bootnode yang di-hardcode di dalamnya. Bootnode ini biasanya dijalankan oleh tim devops Ethereum Foundation atau tim klien itu sendiri. Perhatikan bahwa bootnode tidak sama dengan node statis. Node statis dipanggil berulang kali, sedangkan bootnode hanya dipanggil jika tidak ada cukup peer untuk terhubung dan sebuah node perlu melakukan bootstrap pada beberapa koneksi baru.

## Terhubung ke bootnode {#connect-to-a-bootnode}

Sebagian besar klien memiliki daftar bootnode bawaan, tetapi Anda mungkin juga ingin menjalankan bootnode Anda sendiri, atau menggunakan salah satu yang bukan bagian dari daftar hardcode klien. Dalam hal ini, Anda dapat menentukannya saat memulai klien Anda, sebagai berikut (contoh ini untuk Geth, silakan periksa dokumentasi klien Anda):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Menjalankan bootnode {#run-a-bootnode}

Bootnode adalah node penuh yang tidak berada di belakang NAT ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)). Setiap node penuh dapat bertindak sebagai bootnode selama tersedia untuk publik.

Saat Anda memulai sebuah node, node tersebut akan mencatat [enode](/developers/docs/networking-layer/network-addresses/#enode) Anda, yang merupakan pengidentifikasi publik yang dapat digunakan orang lain untuk terhubung ke node Anda.

Enode biasanya dibuat ulang pada setiap restart, jadi pastikan untuk melihat dokumentasi klien Anda tentang cara menghasilkan enode persisten untuk bootnode Anda.

Agar menjadi bootnode yang baik, ada baiknya untuk meningkatkan jumlah maksimum peer yang dapat terhubung dengannya. Menjalankan bootnode dengan banyak peer akan meningkatkan kebutuhan bandwidth secara signifikan.

## Bootnode yang tersedia {#available-bootnodes}

Daftar bootnode bawaan di dalam go-ethereum dapat ditemukan [di sini](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Bootnode ini dikelola oleh Ethereum Foundation dan tim go-ethereum.

Terdapat daftar bootnode lain yang dikelola oleh sukarelawan yang tersedia. Pastikan untuk selalu menyertakan setidaknya satu bootnode resmi, jika tidak, Anda bisa terkena serangan eclipse.