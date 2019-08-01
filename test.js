var MongoCilent = require('mongodb').MongoClient;
var mongoUrl = "mongodb://admin:123456@127.0.0.1:27017/admin";

MongoCilent.connect(mongoUrl,{useNewUrlParser:true},function (err,db) {
    if ( err ){
        console.log(err);
    }
    var dbase = db.db("management");
    dbase.collection('classinfo').find().toArray(function (err,result) {
        if ( err ) throw  err;
        console.log(result);
        db.close();
    })
});