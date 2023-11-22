SOURCES = $(shell find src/ public/ index.html -type f)
VERSION = $(shell jq '.version' package.json)

.PHONY: build build-xpi build-watch run test test-watch test-coverage

/usr/bin/sponge:
	sudo apt install -y sponge

/usr/bin/jq:
	sudo apt install -y jq

node_modules: package-lock.json
	npm i
	touch node_modules

deps: node_modules /usr/bin/sponge /usr/bin/jq

dist/index.html: deps $(SOURCES)
	npm run build

stegman-extension-$(VERSION).xpi: dist/index.html
	cd dist/ && \
	zip -o ../stegman-extension-$(VERSION).xpi -r . && \
	cd ..

build: dist/index.html

build-watch: deps 
	npm run build:watch

build-xpi: stegman-extension-$(VERSION).xpi

run: deps
	npm run dev

test: deps
	npm run test

test-watch: deps
	npm run test:watch

test-coverage: deps
	npm run test:coverage

clean:
	rm -rf dist/ coverage/ node_modules/ stegman-extension-*.xpi
