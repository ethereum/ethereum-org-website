import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// การตั้งค่าสำหรับการเชื่อมต่อกระเป๋าเงิน Web3
export const config = createConfig({
  chains: [base], // กำหนดให้ใช้ Base Network เป็นหลัก
  connectors: [
    injected(), // รองรับ MetaMask, Coinbase Wallet และกระเป๋าในเบราว์เซอร์
  ],
  transports: {
    [base.id]: http(), // เชื่อมต่อผ่านโปรโตคอล HTTP
  },
})
