const express = require('express')
const router = require('./routes/restaurant')
const app = express()
// const http = require('http');

// http.get('http://localhost:8080/initialize_all_tables?table=10', (res) => {
//     let data = '';
//     res.on('data', (chunk) => {
//         data += chunk;
//     });
//     res.on('end', () => {
//         console.log(JSON.parse(data));
//     });
// }).on("error", (err) => {
//     console.log("Error: " + err.message);
// });

app.use(router)

app.listen(8080, () => {
    console.log("run server at port 8080")
})