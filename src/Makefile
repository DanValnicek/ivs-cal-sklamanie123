CC=node
CFLAGS=

PHONY. = clean all pack test doc run profile

#all# #(přeloží projekt – včetně programu pro profiling) – při zvolení skriptovacího jazyka využijte pro stažení závislostí, případně volte variantu níže
#pack #(zabalí projekt tak, aby mohl být odevzdán)
#clean# (smaže všechny soubory, co nemají být odevzdány)
#test #(spustí testy matematické knihovny)
#doc #(spustí generování dokumentace)
#run #(spustí program)
#profile #(spustí překlad programu pro výpočet směrodatné odchylky na profiling) – při zvolení skriptovacího jazyka využijte pro stažení závislostí, případně volte variantu níže

run: build-lib
	cp -r lib/dist app/src/renderer/src/lib/math-lib
	cd app && yarn && yarn dev

build-lib: lib/package.json
	cd lib && npm i && npm run build

build-app: build-lib app/src/renderer/src/lib/math-lib
	cp -r lib/dist app/src/renderer/src/lib/math-lib
	cd app && yarn && yarn build:win && yarn build:linux

app/src/renderer/src/lib/math-lib:
	mkdir -p app/src/renderer/src/lib/math-lib/

clean: lib/dist/ app/src/renderer/src/lib/math-lib/
	rm -r lib/dist/* app/src/renderer/src/lib/math-lib/*
	npm prune