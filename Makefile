npm/install:
	npm install

npm/build:
	REACT_APP_VERSION=$(shell git describe --tags) REACT_APP_BUILD_TIME=$(shell date +%F) npm run build
