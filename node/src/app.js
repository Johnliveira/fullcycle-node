const express = require('express')
const mysql = require('mysql')

const app = express();
const port = 3000;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

app.get('/', async (req, res) => {
    try {
        insert();

        const names = await select();
        const response = `
            <h1>Full Cycle Rocks!</h1>
            <p>Nomes:</p>
            <pre>${names}</pre>
        `;
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao consultar os nomes." });
    }
});

app.listen(port, () => console.log(`Rodando na porta ${port}.`))

const select = async () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (err) {
                reject(err);
                return;
            }
            conn.query("SELECT * FROM people", function (err, result, fields) {
                conn.release();
                if (err) {
                    reject(err);
                } else {
                    let names = "";
                    result.forEach(line => {
                        names += `\n${line.fullname}`;
                    });
                    resolve(names);
                }
            });
        });
    });
};

const insert = () => {
    pool.getConnection(function(err, conn) {
        if (err) {
            console.error(err);
            return;
        }
        conn.query(`INSERT INTO people(fullname) values (?)`, [nameGen()], function (err, result, fields) {
            conn.release();
            if (err) {
                console.error(err);
            } else {
                console.log(`Registro inserido com sucesso.`);
            }
        });
    });
};

const nameGen = () => {
    let res = '';
    for (let i = 0; i < 8; i++) {
        const random = Math.floor(Math.random() * 27);
        res += String.fromCharCode(97 + random);
    };
    return res;
};