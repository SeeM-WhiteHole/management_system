var http = require('http');
var querystring = require('querystring');
var MongoCilent = require('mongodb').MongoClient;
var mongoUrl = "mongodb://admin:123456@127.0.0.1:27017/admin";
var server = http.createServer(function (req,res) {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:63342');
    res.setHeader('Access-Control-Allow-Credentials','true');//允许跨域发送cookie
    var post = '';
    var dataArr = [];
    req.on('data',function (chunk) {
        post += chunk;
    });
    req.on('end',function () {
        post = querystring.parse(post);
        dataArr.push(post);
        var dataTime = new Date();
        MongoCilent.connect(mongoUrl,{useNewUrlParser:true},function (err,db) {
            if ( err ){
                console.log(err);
            }
            else {
                var dbase = db.db("management");
                if ( dataArr[0].operation == 'login'){
                    if ( dataArr[0].useridentity == 'teacher' ){
                        whereStr = {tno:dataArr[0].username};
                        dbase.collection('teacherinfo').find(whereStr).toArray(function (err,result) {
                            if ( err ){
                                console.log(err);
                            }
                            if ( result.length > 0 ){
                                var tname = result[0].tname;
                                var tpwd = result[0].tpwd;
                                if ( tpwd == dataArr[0].userpwd ){
                                    dataTime.setTime(dataTime.getTime() + 5 * 60 * 1000);
                                    res.setHeader('Set-Cookie','data={"username":"'+ tname +'","uid":"'+ tpwd +'"};expires=' + dataTime.toGMTString());
                                    res.end('true');
                                }else {
                                    res.end('false');
                                }
                            }else {
                                res.end('false')
                            }
                            db.close();
                        })
                    }
                    else if ( dataArr[0].useridentity == 'student' ){
                        whereStr = {sno:dataArr[0].username};
                        dbase.collection('studentinfo').find(whereStr).toArray(function (err,result) {
                            if ( err ){
                                console.log(err);
                            }
                            if ( result.length > 0 ){
                                var sname = result[0].sname;
                                var spwd = result[0].spwd;
                                var sno = result[0].sno
                                if ( spwd == dataArr[0].userpwd ){
                                    dataTime.setTime(dataTime.getTime() + 5 * 60 * 1000);
                                    res.setHeader('Set-Cookie','data={"username":"'+ sname +'","uid":"'+ spwd +'","uno":"'+ sno +'"};expires=' + dataTime.toGMTString());
                                    res.end('strue');
                                }else {
                                    res.end('false');
                                }
                            }else {
                                res.end('false')
                            }
                            db.close();
                        })
                    }
                }
                else if ( dataArr[0].operation == 'printSinfo'){
                    var whereStr1 = {sno:1};
                    dbase.collection('studentinfo').find().sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        res.end(JSON.stringify(result));
                        db.close();
                    })
                }
                else if ( dataArr[0].operation == 'printCinfo'){
                    var whereStr1 = {cno:1}
                    dbase.collection('classinfo').find().sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        res.end(JSON.stringify(result));
                        db.close();
                    })
                }
                else if ( dataArr[0].operation == 'printGinfo'){
                    var whereStr = {sno:1,cno:1};
                    dbase.collection('gradeinfo').find().sort(whereStr).toArray(function (err,result) {
                        if ( err ) throw  err;
                        res.end(JSON.stringify(result));
                        db.close();
                    })
                }
                else if ( dataArr[0].operation == 'stuClassC'){
                    var whereStr = {sno:dataArr[0].sno};
                    var whereStr1 = {sno:1,cno:1};
                    dbase.collection('gradeinfo').find(whereStr).sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        res.end(JSON.stringify(result));
                        db.close();
                    })
                }
                else if ( dataArr[0].operation == 'inputSinfo'){
                    var inputStu;
                    var whereStr = {sno:dataArr[0].sno};
                    var whereStr1 = {sno:1};
                    dbase.collection('studentinfo').find(whereStr).sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        if ( result.length > 0 ){
                            inputStu = false;
                        }else {
                            inputStu = true;
                        }
                        if ( inputStu == true ){
                            var data = {sno:dataArr[0].sno,sname:dataArr[0].sname,spwd:dataArr[0].spwd,sage:dataArr[0].sage,
                                ssex:dataArr[0].ssex,dept:dataArr[0].sdept,class:dataArr[0].scalss};
                            dbase.collection('studentinfo').insertOne(data,function (err,res) {
                                if ( err ) throw err;
                                console.log("插入成功");
                                db.close();
                            });
                            dbase.collection('studentinfo').find().sort(whereStr1).toArray(function (err,result) {
                                if ( err ) throw  err;
                                res.end(JSON.stringify(result));
                                db.close();
                            })
                        }else {
                            res.end('false');
                        }
                        db.close();
                    });
                }
                else if ( dataArr[0].operation == 'modify'){
                    var whereStr = {sno:dataArr[0].mSno};
                    var whereStr1 = {sno:1};
                    if ( dataArr[0].modifyname == 'sname' ){
                        var updateStr = {$set:{sname:dataArr[0].modifyText}};
                    }
                    else if ( dataArr[0].modifyname == 'sage' ){
                        var updateStr = {$set:{sage:dataArr[0].modifyText}};
                    }
                    else if ( dataArr[0].modifyname == 'ssex' ){
                        var updateStr = {$set:{ssex:dataArr[0].modifyText}};
                    }
                    else if ( dataArr[0].modifyname == 'class' ){
                        var updateStr = {$set:{class:dataArr[0].modifyText}};
                    }
                    else if ( dataArr[0].modifyname == 'dept' ){
                        var updateStr = {$set:{dept:dataArr[0].modifyText}};
                    }
                    else if ( dataArr[0].modifyname == 'spwd' ){
                        var updateStr = {$set:{spwd:dataArr[0].modifyText}};
                    }
                    dbase.collection('studentinfo').updateOne(whereStr,updateStr,function (err,res) {
                        if ( err ) throw err;
                        console.log("更新成功");
                        db.close();
                    });
                    dbase.collection('studentinfo').find().sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        res.end(JSON.stringify(result));
                        db.close();
                    });
                }
                else if ( dataArr[0].operation == 'modifyC'){
                    var whereStr = {cno:dataArr[0].mCno};
                    var whereStr1 = {cno:1};
                    if ( dataArr[0].modifyname == 'cname' ){
                        var updateStr = {$set:{cname:dataArr[0].modifyText}};
                    }
                    else if ( dataArr[0].modifyname == 'cth' ){
                        var updateStr = {$set:{cth:dataArr[0].modifyText}};
                    }
                    else if ( dataArr[0].modifyname == 'credit' ){
                        var updateStr = {$set:{credit:dataArr[0].modifyText}};
                    }
                    dbase.collection('classinfo').updateOne(whereStr,updateStr,function (err,res) {
                        if ( err ) throw err;
                        console.log("更新成功");
                        db.close();
                    });
                    dbase.collection('classinfo').find().sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        res.end(JSON.stringify(result));
                        db.close();
                    });
                }
                else if ( dataArr[0].operation == 'inputCinfo'){
                    var inputCtu;
                    var whereStr = {cno:dataArr[0].cno};
                    var whereStr1 = {cno:1};
                    dbase.collection('classinfo').find(whereStr).sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        if ( result.length > 0 ){
                            inputCtu = false;
                        }else {
                            inputCtu = true;
                        }
                        if ( inputCtu == true ){
                            var data = {cno:dataArr[0].cno,cname:dataArr[0].cname,cth:dataArr[0].cth,
                                        credit:dataArr[0].creait};
                            dbase.collection('classinfo').insertOne(data,function (err,res) {
                                if ( err ) throw err;
                                console.log("插入成功");
                                db.close();
                            });
                            dbase.collection('classinfo').find().sort(whereStr1).toArray(function (err,result) {
                                if ( err ) throw  err;
                                res.end(JSON.stringify(result));
                                db.close();
                            })
                        }else {
                            res.end('false');
                        }
                        db.close();
                    });
                }
                else if ( dataArr[0].operation == 'findStu'){
                    var whereStr = {sno:dataArr[0].sno};
                    var whereStr1 = {sno:1};
                    dbase.collection('studentinfo').find(whereStr).sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        res.end(JSON.stringify(result));
                        db.close();
                    })
                }
                else if ( dataArr[0].operation == 'inputSClass'){
                    var whereStr = {sno:dataArr[0].sno,cno:dataArr[0].cno};
                    var whereStr1 = {sno:1,cno:1};
                    dbase.collection('gradeinfo').find(whereStr).sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        if ( result.length > 0 ){
                            res.end("false")
                        }else {
                            var data = {sno:dataArr[0].sno,cno:dataArr[0].cno,cname:dataArr[0].cname,grade:''};
                            dbase.collection('gradeinfo').insertOne(data,function (err,res) {
                                if ( err ) throw err;
                                console.log("插入成功");
                                db.close();
                            });
                            res.end("true");
                        }
                        db.close();
                    })
                }
                else if ( dataArr[0].operation == 'inputSGrade'){
                    var whereStr = {sno:dataArr[0].sno};
                    var whereStr1 = {sno:dataArr[0].sno,cno:dataArr[0].cno};
                    var updateStr1 = {$set:{grade:dataArr[0].grade}};
                    dbase.collection('gradeinfo').find(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        if ( result.length > 0 ){
                            dbase.collection('gradeinfo').updateOne(whereStr1,updateStr1,function (err,res) {
                                if ( err ) throw err;
                                console.log("更新成功");
                                db.close();
                            });
                        }else {
                            res.end("stuMiss");
                        }
                        db.close();
                    });
                }
                else if ( dataArr[0].operation == 'findSG'){
                    var whereStr = {sno:dataArr[0].sno};
                    var whereStr1 = {sno:1,cno:1}
                    dbase.collection('gradeinfo').find(whereStr).sort(whereStr1).toArray(function (err,result) {
                        if ( err ) throw  err;
                        res.end(JSON.stringify(result));
                        db.close();
                    })
                }
            }
        });
    })
}).listen(9826);