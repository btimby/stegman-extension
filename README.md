# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## development

### running application
Build the application using `make build`. Then you can install the extension into your browser using `manifest.json`. You can build continuously using `make build-watch` to ensure the `dist/` directory is up-to-date as you make changes.

### running tests
To run tests use `make test`. You can also use `make test-watch` to run tests continuously. Finally, you can produce a coverage report with `make test-coverage`.

### making a release
To make a release run `npm version`, the following example will increment the patch number `1.0.n` and commit a new tag.

```bash
$ npm version patch
```

This command will also increment the version number in `manifest.json`.

### build xpi

```bash
$ make build-xpi
```
