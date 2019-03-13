
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://admin:<password>@cluster0-yuigw.gcp.mongodb.net/test?retryWrites=true";

let dbConnection;

let connect = () =>{
    return new Promise((resolve, reject) =>{
        MongoClient.connect(uri, function(err, dbInstance){
            if(err){
                return reject(new connectionError([err.name + " : " + err.message], {
                    message: 'Connection to MongoDB at ${uri}'
                }))
            }else{
                dbConnection = dbInstance;
                resolve('Mongo connected at ${uri}');
            }
        })
    });
};

let insertMongoData = (data) => {
    return new Promise((resolve, reject)=> {
        let collection = dbConnection.collection('users');
        collection.insert(data,(err,result)=> {
            if(err){
                return reject({message : "DB insert failed"});
            }
            else{
                return resolve({message : "Data inserted to DB"});
            }
        })
    })
};

let getUser = (dbQuery) =>{
    return new Promise((resolve, reject)=>{
        let collection = dbConnection.collection('users');
        collection.find(dbQuery).toArray((err, result)=> {
            if(err){
                return reject({message : "DB insert failed"});
            }
            else{
                return resolve(result);
            }
        })
    })
};

module.exports ={connect,insertMongoData,getUser}
