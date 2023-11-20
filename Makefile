SOURCES = $(shell find src/ public/ index.html -type f)
VERSION = $(shell jq '.version' package.json)

.PHONY: build build-xpi build-watch run test test-watch test-coverage

/usr/bin/sponge:
	sudo apt install -y sponge

/usr/bin/jq:
	sudo apt install -y jq

deps: /usr/bin/sponge /usr/bin/jq

node_modules: package-lock.json
	npm i

dist/index.html: node_modules $(SOURCES)
	npm run build

stegman-extension-$(VERSION).xpi: dist/index.html
	zip -o stegman-extension-$(VERSION).xpi -r dist manifest.json

build: dist/index.html

build-watch: node_modules 
	npm run build:watch

build-xpi: stegman-extension-$(VERSION).xpi

run: node_modules 
	npm run dev

test: node_modules 
	npm run test

test-watch: node_modules 
	npm run test:watch

test-coverage: node_modules 
	npm run test:coverage

clean:
	rm -rf dist/ coverage/ node_modules/ stegman-extension-*.xpi
