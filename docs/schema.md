# Schema

Our schema, used in the Gatsby GraphQL layer, is defined under the `src/schema` folder. These files are then grabbed by the createSchemaCustomization`Gatsby hook in`gatsby-node.ts`.
There are two ways to define a schema in Gatsby:

- GraphQL SDL, the traditional way using [template literals](https://graphql.org/learn/schema/)
- And a more "programmatic" approach, which has more flexibility, [Gatsby Type Builders](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#gatsby-type-builders) with `schema.buildObjectType`

That is why you see two folders in /schema

- `src/schema/sdls` for GraphQL SDL
- `src/schema/builders` for Gatsby Type Builders
