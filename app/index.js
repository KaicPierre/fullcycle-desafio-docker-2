
const express = require('express');
const app = express();

const config = {
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`

connection.query(sqlTable)
const addNames = () => {
    connection.query(`INSERT INTO people(name) values ('John Doe')`)
    connection.query(`INSERT INTO people(name) values ('Mary Jane')`)
    connection.query(`INSERT INTO people(name) values ('Peter Parker')`)
}

app.get('/', (req, res) => {
    addNames()

    const select = `SELECT name FROM people`
    
    connection.query(select, (error, results, fields) => {
        if(error) throw error
        var names = results.map(result => `<li>${result.name}</li>`)
        connection.query('DELETE FROM people')
        res.send(`<h1>Full Cycle Rocks!</h1> </br> Lista de nomes: <ul>${names}</ul>`)
    })
    
})
app.listen(3000, () => console.log('Server is up and running'));