TEAMNAME=xvalni00_xbrazd26_xkaton00_xvodra01

PHONY. = clean all pack test doc run profile

all: build-app profile
	cp app/dist/ivs-calc-app-1.0.0.AppImage ./ivs-calc-app-1.0.0.AppImage
	cp app/dist/ivs-calc-app_1.0.0_amd64.deb ./ivs-calc-app_1.0.0_amd64.deb
	cp proriling/standardDeviation ./stddev

doc:
	cd lib && npm i -g jsdoc typedoc && npx --out typedoc

standardDeviation.js: profiling/standardDeviation.ts
	cd profiling && npm i && npm run build

profile: standardDeviation.js
	cd profiling && npm i -g pkg && pkg -t node18-linux-x64 $<
yarn:
	npm i -g yarn
run: build-lib yarn
	cp -r lib/dist app/src/renderer/src/lib/math-lib
	cd app && yarn && yarn dev

build-lib: lib/package.json
	cd lib && npm i && npm run build

build-app: build-lib app/src/renderer/src/lib/math-lib yarn
	cp -r lib/dist app/src/renderer/src/lib/math-lib
	cd app && yarn && yarn build:linux
	#cd app && yarn && yarn build:win && yarn build:linux

app/src/renderer/src/lib/math-lib:
	mkdir -p app/src/renderer/src/lib/math-lib/

test:
	cd lib && npm i && npm test

pack:build-app doc profile
	rm -fr /tmp/$(TEAMNAME)
	mkdir /tmp/$(TEAMNAME)
	mkdir /tmp/$(TEAMNAME)/install
	mv lib/docs /tmp/$(TEAMNAME)/doc
	mv app/dist/ivs-calc-app-1.0.0.AppImage /tmp/$(TEAMNAME)/install/ivs-calc-app-1.0.0.AppImage
	mv app/dist/ivs-calc-app_1.0.0_amd64.deb /tmp/$(TEAMNAME)/install/ivs-calc-app_1.0.0_amd64.deb
	mv proriling/standardDeviation /tmp/$(TEAMNAME)/install/stddev
	$(MAKE) clean
	cp -r .. /tmp/$(TEAMNAME)/repo
	cd /tmp/ && zip -r $(TEAMNAME).zip ./$(TEAMNAME)
	mv /tmp/$(TEAMNAME).zip ./$(TEAMNAME).zip
	rm -fr /tmp/$(TEAMNAME)

clean:
	rm -fr app/dist lib/dist/ app/src/renderer/src/lib/math-lib/ app/node_modules lib/node_modules profiling/node_modules