install: install-deps

develop:
	npm run-script build

install-deps:
	npm install --unsafe-perm

build:
	rm -rf dist
	NODE_ENV=production npx wp

test:
	npm test

lint:
	npm run lint
	
lintfix:
	npm run lintfix

publish:
	npm publish
