install:
	npm ci
lint:
	npx eslint .
test:
	npx -n --experimental-vm-modules jest
test-watch:
	npx -n --experimental-vm-modules jest --watch
test-coverage:
	npx -n --experimental-vm-modules jest --coverage --coverageProvider=v8