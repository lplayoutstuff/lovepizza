## Должно быть установлено ##

node.js - https://nodejs.org/

npm

```bash
$ npm install npm -g
```

gulp

```bash
$ npm install gulp -g
```

## Настройка окружения ###

```bash
$ npm i
$ gulp
$ gulp browser-sync
```
Запустится сервер http://localhost:3000


## Как и где работаем ##

Вся работа ведется в src/

### Сборка ###

По дефолту сборка происходит в build/ с вотчером, вебсервер так же смотрит в эту папку.

Конечная верстка генерируется командой

```bash
$ gulp production
```

## Что есть ##

Для "шаблонизации" используется gulp-nunjucks-render

Вебсервер - browsersync.

Препроцессор стилей - sass