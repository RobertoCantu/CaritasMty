import sql from 'mssql';

const dbSettings = {
    user: "root",
    password: "1234",
    server: "ROBERTOFIT",
    database: "Caritas",
    options: { 
        trustServerCertificate: true,
        } 
};

export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export {sql};