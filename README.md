# NodeJs CRUD MySQL

## Apa ini?
Contoh webapp CRUD data MySQL di NodeJs

## Setup
Import database dari database_dump/db_student.sql

Dependensi lainnya dapat dilihat di package.json

Buat file config/config.js, sisinya sebagai berikut

    const config = {
        development: {
            server: {
                host: 'http://[host]:[port]'
            },
            database: {
                host: '[db host]',
                port: '[db port]',
                username: '[db username]',
                password: '[db password]',
                db_name: '[db name]'
            }
        }
    };
    module.exports = config;