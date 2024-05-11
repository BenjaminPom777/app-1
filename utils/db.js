const mysql = require('mysql2');

// Create the connection pool
export const pool = mysql.createPool({
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


export const getTodos = (userId) => {
    return new Promise((resolve, reject) => {
        performQuery('select * from todos where user_id = ?', [userId], (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(results)
        })
    })
}


export const saveTodo = async (data, userid) => {
    return new Promise((resolve, reject) => {
        performQuery(`
        INSERT INTO todos
        (title, content, user_id)
        VALUES
        (?, ?, ?)
        `, [data.title, data.content, userid], (err, results) => {
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


export const saveUser = (email, userName, password) => {
    return new Promise((resolve, reject) => {
        performQuery(`
        INSERT INTO users
        (email, username, password)
        VALUES
        (?, ?, ?);
        `,
            [email, userName, password], (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
    })
}

export const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        performQuery(`
        SELECT * from users where email = ?         
        `, [email], (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(results)
        })
    })
}

// export const saveUser = (email, password) => {
//     return new Promise((resolve, reject) => {
//         performQuery(`
//         INSERT INTO users
//         (email, password)
//         VALUES
//         (? , ?);
//         `, 
//         [email, password], (err, results) => {
//             if (err) {
//                 reject(err)
//             }
//             resolve(results)
//         })
//     })
// }


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