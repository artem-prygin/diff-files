install:
	npm ci
lint:
	npx eslint .
test:
	npx jest --watch
test-coverage:
	npm test -- --coverage --coverageProvider=v8