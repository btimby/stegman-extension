SOURCES = $(shell find src/ public/ index.html -type f)
VERSION = $(shell npx json -f package.json version)

.PHONY: build build-xpi run test

dist/index.html: $(SOURCES)
	npm run build

stegman-extension-$(VERSION).xpi: dist/index.html
	zip -o stegman-extension-$(VERSION).xpi -r dist manifest.json

build: dist/index.html

build-xpi: stegman-extension-$(VERSION).xpi

run:
	npm run dev

test:
	npm run test

clean:
	rm -rf dist/ stegman-extension-*.xpi
