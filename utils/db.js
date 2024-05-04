var mysql = require('mysql');

// Create the connection pool
var pool = mysql.createPool({
    connectionLimit: 10,
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


export const getUsers = () => {
    return new Promise((resolve, reject) => {
        performQuery('select * from actor', (err, results) => {
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
        `,[data.title, data.content], (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(results)
        })
    })
}



export async function submitTodo(prevState, formData) {
    // const meal = {
    //   title: formData.get('title'),
    //   summary: formData.get('summary'),
    //   instructions: formData.get('instructions'),
    //   image: formData.get('image'),      
    //   creator: formData.get('name'),      
    //   creator_email: formData.get('email'),      
    // }

    // if(
    //   isInvalidText(meal.title) ||
    //   isInvalidText(meal.summary) ||
    //   isInvalidText(meal.instructions) || 
    //   isInvalidText(meal.creator) ||
    //   isInvalidText(meal.creator_email) ||
    //   !meal.creator_email.includes('@') ||
    //   !meal.image || meal.image.size === 0
    // ){
    //   return {
    //     message: 'Invalid input.'
    //   }
    // }

    //    await saveMeal(meal)

    //    revalidatePath('/meals');
    //    redirect('/meals');
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