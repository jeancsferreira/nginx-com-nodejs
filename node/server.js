const express = require('express')
const mysql   = require('mysql')
const app     = express()
const name    = "Nome Completo"
const port    = process.env.APP_PORT || 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'MinhaSenha',
  database: 'banco',
}

const conexao = mysql.createConnection(config)

app.get('/', (req, res) => {
  
  conexao.query(`INSERT INTO people (nome) VALUES ('${name}')`)

  conexao.query(`SELECT nome FROM people`, (error, rs, fields) => {
    res.send(`
      <p><h1>Full Cycle Rocks!</h1></p>
      <p>- Lista de nomes cadastrada no banco de dados.</p>
        ${!!rs.length ? rs.map(el => `<p>${el.nome}</p>`).join('') : ''}
    `)
  })
})

app.listen(port, () => {
  console.log('Porta Liberada:', port);
})
