import path from "path"

export const WalletsCsv = {
  name: "WalletsCsv",
  interfaces: ["Node"],
  extensions: {
    infer: true,
  },
  fields: {
    image: {
      type: "File",
      resolve: async (source, args, context) => {
        const absolutePath = path.resolve(
          "src",
          "assets",
          "wallets",
          `${source.id}.png`
        )

        return context.nodeModel.findOne({
          type: "File",
          query: {
            filter: {
              absolutePath: {
                eq: absolutePath,
              },
            },
          },
        })
      },
    },
  },
}
