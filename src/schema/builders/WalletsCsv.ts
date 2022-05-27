import path from "path"

// Expand the WalletsCsv type to have a new `image` field with its corresponding
// asset image
export const WalletsCsv = {
  name: "WalletsCsv",
  interfaces: ["Node"],
  extensions: {
    infer: true,
  },
  fields: {
    image: {
      type: "File",
      resolve: async (source, _args, context) => {
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
