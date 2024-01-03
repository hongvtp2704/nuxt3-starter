# Nuxt 3 Starter

## Used library
- @antfu/eslint simple-git-hook lint-staged
- openapi-fetch openapi-typescript
- svg/sprite
- vee-validate + yup

## Configuration
- SCSS

## Concept
- Pinia: Setup Store (https://pinia.vuejs.org/core-concepts/#Setup-Stores)
- Open API
    - openapi-fetch: (https://openapi-ts.pages.dev/openapi-fetch/)
    - openapi-typescript: (https://openapi-ts.pages.dev/introduction) ** need to run open-api script in docker to generate schema.d.ts
- @antfu/eslint:
  - Overwrite default config (https://github.com/antfu/eslint-config?tab=readme-ov-file#rules-overrides)
  -  And function keyword is more semantically readable/distinguishable. I consider top-level arrow function is a bad practice.
