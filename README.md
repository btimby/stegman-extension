# Stegman
Stegman is a steganographic messaging browser extension. It allows you to hide messages inside text that you post to social media or send via email.

Specifically, this extension provides a button for any input fields it finds on various websites. When you click the button, you can then provide a secret message to embed in the content of the input field.

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
