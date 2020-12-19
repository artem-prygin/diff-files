install:
	npm ci
lint:
	npx eslint .
test:
	npx jest --watch
test-coverage:
	npm jest