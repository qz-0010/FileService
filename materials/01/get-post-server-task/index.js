/**
 ЗАДАЧА - научиться работать с потоками (streams)
 Написать HTTP-сервер для загрузки и получения файлов
 - Все файлы находятся в директории files
 - Структура файлов НЕ вложенная.

 - Виды запросов к серверу
 GET /file.ext
 - выдаёт файл file.ext из директории files,

 POST /file.ext
 - пишет всё тело запроса в файл files/file.ext и выдаёт ОК
 - если файл уже есть, то выдаёт ошибку 409
 - при превышении файлом размера 1MB выдаёт ошибку 413

 DELETE /file
 - удаляет файл
 - выводит 200 OK
 - если файла нет, то ошибка 404

 Вместо file может быть любое имя файла.
 Так как поддиректорий нет, то при наличии / или .. в пути сервер должен выдавать ошибку 400.

 - Сервер должен корректно обрабатывать ошибки "файл не найден" и другие (ошибка чтения файла)
 - index.html или curl для тестирования

 */

// Пример простого сервера в качестве основы

'use strict';

let url = require('url');
let fs = require('fs');
let mime = require('mime');

function send(path, res) {
    var file = new fs.ReadStream(path)
        .on('error', function (err) {
            res.statusCode = 500;
            res.end("Server Error");
            console.error(err);
        })
        .on('open', function () {
            res.setHeader('Content-Type', mime.getType(path));
        })
        .pipe(res)
        .on('close', function () {
            res.end();
        });

    res.on('close', function () {
        file.destroy();
    });
}

module.exports = require('http').createServer(async function (req, res) {

    let pathname = decodeURI(url.parse(req.url).pathname);

    switch (req.method) {
        case 'GET':
            switch (pathname) {
                case '/':
                    send(url.normalize(__dirname + '/public/index.html'), res);
                    break;

                default:
                    send(url.normalize(__dirname + `files/${path}`), res);
                    break;
            }
            break;

        case 'POST':
            let size = 0;

            var file = new fs.WriteStream('files/file.ext', {flags: 'wx'})
                .on('error', function (err) {
                    if (err.code === "EEXIST") {
                        res.statusCode = 409;
                        res.end('file already exist');
                    } else {
                        res.statusCode = 500;
                        res.end('Server Error.');
                        console.error(err)
                    }
                })
                .on('close', function () {
                    res.statusCode = 200;
                    res.end('OK');
                });


            req.on('data', function (data) {
                size += data.length;

                if (size > 1024 * 1024) {
                    res.statusCode = 413;

                    res.setHeader('Connection', 'close');

                    res.end('limit');

                    file.destroy();

                    fs.unlink('files/file.ext', function (err) {
                        if (err) {
                            console.error(err);
                        }
                    })
                }
            })
                .pipe('files/file.ext')
            break;

        default:
            res.statusCode = 502;
            res.end("Not implemented");
    }

});
