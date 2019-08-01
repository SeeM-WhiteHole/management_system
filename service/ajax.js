function ajax(url,uname,upwd,identity,operation){
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var falg = xmlhttp.responseText;
            if ( falg == 'true' ){
                var x = document.cookie;
                if ( x ){
                    var t = x.split('=')[1];
                    var jsonData = JSON.parse(t);
                    if ( jsonData.uid == upwd ){
                        window.location.href = 'index.html'
                    }
                }
            }else if ( falg == 'false' ){
                alert('用户名或密码错误，请注意选择身份类型')
            }else if ( falg == 'strue'){
                var x = document.cookie;
                if ( x ){
                    var t = x.split('=')[1];
                    var jsonData = JSON.parse(t);
                    if ( jsonData.uid == upwd ){
                        window.location.href = 'index1.html'
                    }
                }
            }
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("username=" + uname + "&userpwd=" + upwd + "&useridentity=" + identity + "&operation=" + operation);
}
function ajaxIndex(url,operation,node) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var list = xmlhttp.responseText;
            var newList = JSON.parse(list);

            if ( node == 'student'){
                tbody.innerHTML = '';
                for( var i = 0;i < newList.length;i++ ) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
                    var td5 = document.createElement("td");
                    var td6 = document.createElement("td");
                    var td7 = document.createElement("td");

                    td1.innerHTML = newList[i].sname;
                    td2.innerHTML = newList[i].sage;
                    td3.innerHTML = newList[i].ssex;
                    td4.innerHTML = newList[i].class;
                    td5.innerHTML = newList[i].dept;
                    td6.innerHTML = newList[i].sno;
                    td7.innerHTML = newList[i].spwd;

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    tr.appendChild(td7);
                    tbody.appendChild(tr);
                }
            }
            else if ( node == 'class'){
                tbodyClass.innerHTML = '';
                for( var j = 0;j < newList.length;j++ ) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");

                    td1.innerHTML = newList[j].cno;
                    td2.innerHTML = newList[j].cname;
                    td3.innerHTML = newList[j].cth;
                    td4.innerHTML = newList[j].credit;

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tbodyClass.appendChild(tr);
                }
            }
            else if ( node == 'classList'){
                tbodyClass.innerHTML = '';
                for( var k = 0;k < newList.length;k++ ) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var input = document.createElement("input");

                    td1.innerHTML = newList[k].cno;
                    td2.innerHTML = newList[k].cname;
                    input.type="Checkbox";
                    input.name="classChoose";
                    input.setAttribute('class','classChoose');

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(input);
                    tbodyClass.appendChild(tr);
                }
            }
            else if ( node == 'gradeList'){
                tbodyGrade.innerHTML = '';
                for( var l = 0;l < newList.length;l++ ) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");

                    td1.innerHTML = newList[l].sno;
                    td2.innerHTML = newList[l].cno;
                    td3.innerHTML = newList[l].grade;

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tbodyGrade.appendChild(tr);
                }
            }
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation);
}
function ajaxStuCC(url,operation,sno) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var list = xmlhttp.responseText;
            var newList = JSON.parse(list);
            ClassChoose.innerHTML = '';
            for( var i = 0;i < newList.length;i++ ) {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");

                td1.innerHTML = newList[i].cno;
                td2.innerHTML = newList[i].cname;

                tr.appendChild(td1);
                tr.appendChild(td2);
                ClassChoose.appendChild(tr);
            }
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation + "&sno=" + sno);
}
function ajaxSinfo(url,operation,sname,sage,ssex,scalss,sdept,sno,spwd) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var list = xmlhttp.responseText;
            if ( list == 'false' ){
                ajaxIndex('http://127.0.0.1:9826','printSinfo','student');
                alert('此学生信息已经存在');
            }else {
                var newList = JSON.parse(list);
                tbody.innerHTML = '';
                for( var i = 0;i < newList.length;i++ ) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
                    var td5 = document.createElement("td");
                    var td6 = document.createElement("td");
                    var td7 = document.createElement("td");

                    td1.innerHTML = newList[i].sname;
                    td2.innerHTML = newList[i].sage;
                    td3.innerHTML = newList[i].ssex;
                    td4.innerHTML = newList[i].class;
                    td5.innerHTML = newList[i].dept;
                    td6.innerHTML = newList[i].sno;
                    td7.innerHTML = newList[i].spwd;

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    tr.appendChild(td7);
                    tbody.appendChild(tr);
                }
            }

        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation + "&sname=" + sname + "&sage=" + sage + "&ssex=" + ssex +
                 "&scalss=" + scalss + "&sdept=" + sdept + "&sno=" + sno + "&spwd=" + spwd);
}
function ajaxModify(url,mSno,modifyName,modifyText,operation) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var list = xmlhttp.responseText;
            var newList = JSON.parse(list);
            tbody.innerHTML = '';
            for( var i = 0;i < newList.length;i++ ) {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var td4 = document.createElement("td");
                var td5 = document.createElement("td");
                var td6 = document.createElement("td");
                var td7 = document.createElement("td");

                td1.innerHTML = newList[i].sname;
                td2.innerHTML = newList[i].sage;
                td3.innerHTML = newList[i].ssex;
                td4.innerHTML = newList[i].class;
                td5.innerHTML = newList[i].dept;
                td6.innerHTML = newList[i].sno;
                td7.innerHTML = newList[i].spwd;

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tbody.appendChild(tr);
            }
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation + "&modifyname=" + modifyName +"&modifyText=" + modifyText + "&mSno=" + mSno);
}
function ajaxModifyC(url,mCno,modifyName,modifyText,operation) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var list = xmlhttp.responseText;
            var newList = JSON.parse(list);
            tbodyClass.innerHTML = '';
            for( var j = 0;j < newList.length;j++ ) {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var td4 = document.createElement("td");

                td1.innerHTML = newList[j].cno;
                td2.innerHTML = newList[j].cname;
                td3.innerHTML = newList[j].cth;
                td4.innerHTML = newList[j].credit;

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tbodyClass.appendChild(tr);
            }
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation + "&modifyname=" + modifyName +"&modifyText=" + modifyText + "&mCno=" + mCno);
}
function ajaxCinfo(url,operation,cno,cname,cth,creait) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var list = xmlhttp.responseText;
            if ( list == 'false' ){
                ajaxIndex('http://127.0.0.1:9826','printCinfo','class');
                alert('此课程信息已经存在');
            }else {
                var newList = JSON.parse(list);
                console.log(newList);
                tbodyClass.innerHTML = '';
                for( var i = 0;i < newList.length;i++ ) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");

                    td1.innerHTML = newList[i].cno;
                    td2.innerHTML = newList[i].cname;
                    td3.innerHTML = newList[i].cth;
                    td4.innerHTML = newList[i].credit;

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tbodyClass.appendChild(tr);
                }
            }

        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation + "&cno=" + cno + "&cname=" + cname + "&cth=" + cth + "&creait=" + creait);
}
function ajaxFstu(url,operation,sno) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var list = xmlhttp.responseText;
            var newList = JSON.parse(list);
            tbody.innerHTML = '';
            for( var i = 0;i < newList.length;i++ ) {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var td4 = document.createElement("td");
                var td5 = document.createElement("td");
                var td6 = document.createElement("td");
                var td7 = document.createElement("td");

                td1.innerHTML = newList[i].sname;
                td2.innerHTML = newList[i].sage;
                td3.innerHTML = newList[i].ssex;
                td4.innerHTML = newList[i].class;
                td5.innerHTML = newList[i].dept;
                td6.innerHTML = newList[i].sno;
                td7.innerHTML = newList[i].spwd;

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tbody.appendChild(tr);
            }
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation + "&sno=" + sno);
}
function ajaxInputC(url,operation,cno,cname,sno) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var list = xmlhttp.responseText;
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation + "&cno=" + cno + "&cname=" + cname + "&sno=" + sno);
}
function ajaxInputG(url,operation,sno,cno,grade) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var list = xmlhttp.responseText;
            if (list == 'stuMiss') {
                alert("信息填写错误,请检查学号与科目编号,注意空格!!!");
            }
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation + "&sno=" + sno + "&cno=" + cno + "&grade=" + grade);
}
function ajaxFindSG(url,operation,sno) {
    var xmlhttp;
    if ( window.XMLHttpRequest ){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.withCredentials = true;
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var list = xmlhttp.responseText;
            var newList = JSON.parse(list);
            tbodySGrade.innerHTML = '';
            for( var i = 0;i < newList.length;i++ ) {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var td4 = document.createElement("td");

                td1.innerHTML = newList[i].sno;
                td2.innerHTML = newList[i].cno;
                td3.innerHTML = newList[i].cname;
                td4.innerHTML = newList[i].grade;

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tbodySGrade.appendChild(tr);
            }
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.send("operation=" + operation + "&sno=" + sno);
}