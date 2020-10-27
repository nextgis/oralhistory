# oralhistory

Устная память

Demo: https://nextgis.ru/demo/oralhistory/dist/

Production: https://pastandnow.ru

## Install

```bash
# clone repo with ssh
git clone git@github.com:nextgis/oralhistory.git
# use https
git clone https://github.com/nextgis/oralhistory.git

git submodule update --init
```

```bash
yarn install

```

## Dev

```bash
# to run dev server
yarn start
# to build dist with with sourcemap and not minified
yarn run dev
# to start watching changes for updating dist folder
yarn run watch
```

To add new comoponents, you can use a command line tool called vue-ts-cli

```vue-ts-cli
npm install -g vue-ts-cli
vt g components/Foo
```

For more help/guidelines, check README in [vue-ts-cli](https://github.com/wingland/vue-ts-cli)

## Build

```bash
yarn run prod
```

## Docker

```bash
docker build -t registry.nextgis.com/pastandnow:0.0.0 .
docker build -t registry.nextgis.com/pastandnow:latest . && docker push registry.nextgis.com/pastandnow:latest
docker run -it -p 8080:8080 --rm --name pastandnow registry.nextgis.com/pastandnow:latest

docker push registry.nextgis.com/pastandnow:0.0.0
docker push registry.nextgis.com/pastandnow:latest
```
