clean:
	rm -rf ./.next node_modules

install: clean
	yarn install

build: install
	yarn build

dev: install
	yarn dev

container: build
	docker-compose up --build 

test: build container