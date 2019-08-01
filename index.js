var listOne = document.getElementById('listOne');
var listTwo = document.getElementById('listTwo');
var tbody = document.getElementById('tbody');
var tbodyClass = document.getElementById('tbodyClass');
var username = document.getElementById('username');
var sInfo = document.getElementsByClassName('sInfo');
var cInfo = document.getElementsByClassName('cInfo');
var classList = document.getElementById('classList');
var gradeList = document.getElementById('gradeList');
var tableList = document.getElementById('tableList');
var tbodyGrade = document.getElementById('tbodyGrade');
var inputGrade = document.getElementById('inputGrade');
var inputSinfo = document.getElementById('inputSinfo');
var inputClass = document.getElementById('inputClass');
var modifySinfo = document.getElementById('modifySinfo');
var modifyCinfo = document.getElementById('modifyCinfo');
var checkOne = false;
var checkTwo = false;
var x = document.cookie;
var t = x.split("=")[1];
if ( x && t ){
    var jsonData = JSON.parse(t);
    var loginName = jsonData.username;
    username.innerHTML = loginName;
}
listOne.onclick = function () {
    var ulOne = document.getElementById('ulOne');
    if(checkOne==false){
        ulOne.style.display = "block";
        checkOne=true;
    }else {
        ulOne.style.display = "none";
        tableList.style.visibility = "hidden";
        inputSinfo.style.visibility = 'hidden';
        modifySinfo.style.visibility = 'hidden';
        checkOne=false;
    }
};
listTwo.onclick = function () {
    tableList.style.visibility = "hidden";
    inputSinfo.style.visibility = 'hidden';
    modifySinfo.style.visibility = 'hidden';
    var ulTwo = document.getElementById('ulTwo');
    if(checkTwo==false){
        ulTwo.style.display = "block";
        checkTwo=true;
    }else {
        classList.style.visibility = 'hidden';
        ulTwo.style.display = "none";
        checkTwo=false;
    }
};
sInfo[0].onclick = function () {
    modifyCinfo.style.visibility = 'hidden';
    classList.style.visibility = 'hidden';
    inputClass.style.visibility = 'hidden';
    inputSinfo.style.visibility = 'hidden';
    tableList.style.visibility = "visible";
    modifySinfo.style.visibility = 'hidden';
    gradeList.style.visibility = 'hidden';
    inputGrade.style.visibility = 'hidden';
    ajaxIndex('http://127.0.0.1:9826','printSinfo','student');
};
sInfo[1].onclick = function () {
    modifyCinfo.style.visibility = 'hidden';
    classList.style.visibility = 'hidden';
    inputClass.style.visibility = 'hidden';
    tableList.style.visibility = "visible";
    modifySinfo.style.visibility = 'hidden';
    inputSinfo.style.visibility = 'visible';
    gradeList.style.visibility = 'hidden';
    inputGrade.style.visibility = 'hidden';
    ajaxIndex('http://127.0.0.1:9826','printSinfo','student');
    var inputSinfoBtn = document.getElementById('inputSinfoBtn');
    inputSinfoBtn.onclick = function () {
        var sname = document.getElementById('sname').value;
        var sage = document.getElementById('sage').value;
        var ssex = document.getElementById('sex').value;
        var sclass = document.getElementById('sclass').value;
        var sdept = document.getElementById('sdept').value;
        var sno = document.getElementById('sno').value;
        var spwd = document.getElementById('spwd').value;
        if ( sname != '' && sage != '' && ssex != '' && sclass != '' && sdept != '' && sno != '' && spwd != ''){
            ajaxSinfo('http://127.0.0.1:9826','inputSinfo',sname,sage,ssex,sclass,sdept,sno,spwd);
        }else {
            alert('请确认填写完整!!!');
        }
    }
};
sInfo[2].onclick = function () {
    modifyCinfo.style.visibility = 'hidden';
    classList.style.visibility = 'hidden';
    inputClass.style.visibility = 'hidden';
    tableList.style.visibility = "visible";
    inputSinfo.style.visibility = 'hidden';
    modifySinfo.style.visibility = 'visible';
    gradeList.style.visibility = 'hidden';
    inputGrade.style.visibility = 'hidden';
    ajaxIndex('http://127.0.0.1:9826','printSinfo','student');
    var modifySinfoBtn = document.getElementById('modifySinfoBtn');
    modifySinfoBtn.onclick = function () {
        var text;
        var mSno = document.getElementById('mSno').value;
        var modifyText = document.getElementById('modifyText').value;
        var modifyList = document.getElementById('modifyList');
        if ( mSno != '' && modifyText != ""){
            for ( var i = 0;i < 6;i++ ){
                if ( modifyList.children[i].selected == true ){
                    text = modifyList.children[i].value
                }
            }
            ajaxModify('http://127.0.0.1:9826',mSno,text,modifyText,'modify')
        }
        else {
            alert('无法提交空信息！!!');
        }
    }
};
cInfo[0].onclick = function () {
    modifyCinfo.style.visibility = 'hidden';
    classList.style.visibility = 'visible';
    inputClass.style.visibility = 'visible';
    inputSinfo.style.visibility = 'hidden';
    tableList.style.visibility = "hidden";
    modifySinfo.style.visibility = 'hidden';
    gradeList.style.visibility = 'hidden';
    inputGrade.style.visibility = 'hidden';
    ajaxIndex('http://127.0.0.1:9826','printCinfo','class');
    var inputCinfoBtn = document.getElementById('inputCinfoBtn');
    inputCinfoBtn.onclick = function () {
        var cno = document.getElementById('cno').value;
        var cname = document.getElementById('cname').value;
        var cth = document.getElementById('cth').value;
        var credit = document.getElementById('credit').value;
        if ( cno != '' && cname != '' && cth != '' && credit != ''){
            ajaxCinfo('http://127.0.0.1:9826','inputCinfo',cno,cname,cth,credit);
        }else {
            alert('请确认填写完整!!!');
        }
    }
};
cInfo[1].onclick = function () {
    modifyCinfo.style.visibility = 'visible';
    classList.style.visibility = 'visible';
    inputClass.style.visibility = 'hidden';
    inputSinfo.style.visibility = 'hidden';
    tableList.style.visibility = "hidden";
    modifySinfo.style.visibility = 'hidden';
    gradeList.style.visibility = 'hidden';
    inputGrade.style.visibility = 'hidden';
    ajaxIndex('http://127.0.0.1:9826','printCinfo','class');
    var modifyCinfoBtn = document.getElementById('modifyCinfoBtn');
    modifyCinfoBtn.onclick = function () {
        var text;
        var mCno = document.getElementById('mCno').value;
        var modifyCText = document.getElementById('modifyCText').value;
        var modifyCList = document.getElementById('modifyCList');
        if ( mCno != '' && modifyCText != ""){
            for ( var i = 0;i < 3;i++ ){
                if ( modifyCList.children[i].selected == true ){
                    text = modifyCList.children[i].value
                }
            }
            ajaxModifyC('http://127.0.0.1:9826',mCno,text,modifyCText,'modifyC');
        }
        else {
            alert('无法提交空信息！!!');
        }
    }
};
cInfo[2].onclick = function () {
    modifyCinfo.style.visibility = 'hidden';
    classList.style.visibility = 'hidden';
    inputClass.style.visibility = 'hidden';
    inputSinfo.style.visibility = 'hidden';
    tableList.style.visibility = "hidden";
    modifySinfo.style.visibility = 'hidden';
    gradeList.style.visibility = 'visible';
    inputGrade.style.visibility = 'visible';
    ajaxIndex('http://127.0.0.1:9826','printGinfo','gradeList');
    var inputGradeBtn = document.getElementById('inputGradeBtn');
    inputGradeBtn.onclick = function () {
        var gSno = document.getElementById('gSno').value;
        var gCno = document.getElementById('gCno').value;
        var gGrade = document.getElementById('gGrade').value;
        if ( gSno != "" && gCno != "" && gGrade != "" ){
            ajaxInputG('http://127.0.0.1:9826','inputSGrade',gSno,gCno,gGrade);
        }else {
            alert("请确保填写完整!!!")
        }
        ajaxIndex('http://127.0.0.1:9826','printGinfo','gradeList');
    }
};