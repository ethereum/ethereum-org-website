---
title: Pengantar ke Bootnode Ethereum
description: Informasi dasar yang Anda perlukan untuk memahami bootnode
lang: id
---

Ketika sebuah node baru bergabung dengan jaringan Ethereum, node tersebut harus terhubung ke node yang sudah ada di jaringan untuk kemudian menemukan rekan-rekan baru. Titik masuk ke dalam jaringan Ethereum ini disebut bootnode. Klien biasanya memiliki daftar bootnode yang dikodekan ke dalamnya. Bootnode ini biasanya dijalankan oleh tim devops Ethereum Foundation atau tim klien sendiri. Perhatikan bahwa bootnode tidak sama dengan node statis. Node statis dipanggil berulang kali, sedangkan bootnode hanya dipanggil jika tidak ada cukup peer untuk terhubung dan sebuah node perlu melakukan bootstrap pada beberapa koneksi baru.

## Hubungkan ke sebuah bootnode {#connect-to-a-bootnode}

Sebagian besar klien memiliki daftar bootnode bawaan, tetapi Anda mungkin juga ingin menjalankan bootnode Anda sendiri, atau menggunakan salah satu yang bukan bagian dari daftar yang di-hardcode oleh klien. Dalam hal ini, Anda dapat menentukannya saat memulai klien Anda, sebagai berikut (contohnya untuk Geth, silakan periksa dokumentasi klien Anda):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Jalankan sebuah bootnode {#run-a-bootnode}

Bootnode adalah node penuh yang tidak berada di belakang NAT ([Terjemahan Alamat Jaringan](https://www.geeksforgeeks.org/network-address-translation-nat/)). Setiap node penuh dapat bertindak sebagai bootnode selama tersedia secara publik.

Ketika Anda memulai sebuah node, node tersebut akan mencatat [enode](/developers/docs/networking-layer/network-addresses/#enode) Anda, yang merupakan pengenal publik yang dapat digunakan oleh orang lain untuk terhubung ke node Anda.

Enode biasanya dibuat ulang setiap kali restart, jadi pastikan untuk melihat dokumentasi klien Anda tentang cara membuat enode persisten untuk bootnode Anda.

Untuk menjadi bootnode yang baik, ada baiknya Anda meningkatkan jumlah maksimum peer yang dapat terhubung dengannya. Menjalankan bootnode dengan banyak peer akan meningkatkan kebutuhan bandwidth secara signifikan.

## Bootnode yang tersedia {#available-bootnodes}

Daftar bootnode bawaan dalam go-ethereum dapat ditemukan [di sini](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Bootnode ini dikelola oleh Ethereum Foundation dan tim go-ethereum.

Ada daftar bootnode lain yang dikelola oleh sukarelawan yang tersedia. Pastikan untuk selalu menyertakan setidaknya satu bootnode resmi, jika tidak, Anda bisa diserang eclipse.
