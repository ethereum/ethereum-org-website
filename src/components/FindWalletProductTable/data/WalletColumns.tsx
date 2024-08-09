// "use client"

// import { StaticImageData } from "next/image"
// import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5"
// import { ColumnDef } from "@tanstack/react-table"

// import { WalletData } from "@/lib/types"

// import { Image } from "@/components/Image"

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type WalletColumns = {
//   id: string
//   logo: StaticImageData
//   walletInfo: WalletData
// }

// export const columns: ColumnDef<WalletColumns>[] = [
//   {
//     accessorKey: "logo",
//     header: () => null,
//     size: 56,
//     cell: ({ row }) => {
//       return <Image src={row.original.image} alt="" objectFit="contain" />
//     },
//   },
//   {
//     accessorKey: "walletInfo",
//     header: () => null,
//     size: 56,
//     cell: ({ row }) => {
//       return `${row.original.name}`
//     },
//   },
//   {
//     id: "expander",
//     header: () => null,
//     cell: ({ row }) => {
//       {
//         row.getIsExpanded() ? <IoChevronUpSharp /> : <IoChevronDownSharp />
//       }
//     },
//   },
// ]
