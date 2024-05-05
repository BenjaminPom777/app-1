const mysql = require('mysql2');

// Create the connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin1234',
    database: 'todo_app'
});

// Function to perform a database query
function performQuery(query, values, callback) {
    pool.query(query, values, function (error, results, fields) {
        if (error) {
            callback(error);
            return;
        }
        callback(null, results);
    });
}


export const getTodos = () => {
    return new Promise((resolve, reject) => {
        performQuery('select * from todos', (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(results)
        })
    })
}


export const saveTodo = async (data) => {
    return new Promise((resolve, reject) => {
        performQuery(`
        INSERT INTO todos
        (title, content)
        VALUES
        (?, ?)
        `, [data.title, data.content], (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(results)
        })
    })
}

export const updateTodo = async (data) => {
    return new Promise((resolve, reject) => {
        if (!data.id) {
            return reject('no id provided');
        }

        performQuery(`
        UPDATE todos
        SET                
        title = ?,
        content = ?
        WHERE id = ?;
        
        `, [data.title, data.content, data.id], (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}




export const getTodoById = (id) => {
    return new Promise((resolve, reject) => {
        performQuery('select * from todos where id = ?', [id], (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(results)
        })
    })
}


// Close the connection pool when the application is shutting down
process.on('SIGINT', function () {
    console.log('Closing connection pool');
    pool.end(function (err) {
        if (err) {
            console.error('Error closing connection pool:', err);
            return;
        }
        console.log('Connection pool closed');
        process.exit();
    });
});