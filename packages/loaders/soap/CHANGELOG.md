# @omnigraph/soap

## 0.1.2

### Patch Changes

- [#4765](https://github.com/Urigo/graphql-mesh/pull/4765) [`f26714af8`](https://github.com/Urigo/graphql-mesh/commit/f26714af8afff2eb5384f7294f5d8856eb5cf20a) Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:
  - Updated dependency [`@graphql-tools/utils@8.13.1` ↗︎](https://www.npmjs.com/package/@graphql-tools/utils/v/8.13.1) (from `8.13.0`, in `dependencies`)
- Updated dependencies [[`f26714af8`](https://github.com/Urigo/graphql-mesh/commit/f26714af8afff2eb5384f7294f5d8856eb5cf20a), [`f26714af8`](https://github.com/Urigo/graphql-mesh/commit/f26714af8afff2eb5384f7294f5d8856eb5cf20a)]:
  - @graphql-mesh/types@0.85.6
  - @graphql-mesh/utils@0.42.5

## 0.1.1

### Patch Changes

- [#4758](https://github.com/Urigo/graphql-mesh/pull/4758) [`6b4b83fdc`](https://github.com/Urigo/graphql-mesh/commit/6b4b83fdc3b6360de5f6fc2e26eefbff4c4173a8) Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:
  - Updated dependency [`@graphql-tools/utils@8.13.0` ↗︎](https://www.npmjs.com/package/@graphql-tools/utils/v/8.13.0) (from `8.12.0`, in `dependencies`)
  - Updated dependency [`graphql-compose@9.0.10` ↗︎](https://www.npmjs.com/package/graphql-compose/v/9.0.10) (from `9.0.9`, in `dependencies`)
  - Updated dependency [`graphql-scalars@1.20.0` ↗︎](https://www.npmjs.com/package/graphql-scalars/v/1.20.0) (from `1.19.0`, in `dependencies`)

## 0.1.0

### Minor Changes

- [#3137](https://github.com/Urigo/graphql-mesh/pull/3137) [`672c62d50`](https://github.com/Urigo/graphql-mesh/commit/672c62d50526d0a076d18305be5b61dbb3018f62) Thanks [@ardatan](https://github.com/ardatan)! - **BREAKING**
  Rewrite SOAP Handler

  The generated API is completely different now because of the new handler. The new handler is based on the new `@omnigraph/soap` package.
  The fields in the generated schema now follows the XML structure.

### Patch Changes

- Updated dependencies [[`d5f2d950e`](https://github.com/Urigo/graphql-mesh/commit/d5f2d950e6318a74c062c9dbc436d5e9c0e8d59d)]:
  - @graphql-mesh/utils@0.42.4
  - @graphql-mesh/types@0.85.5