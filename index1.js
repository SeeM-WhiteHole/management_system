var listOne = document.getElementById('listOne');
var checkOne = false;
var stuInfo = document.getElementsByClassName('stuInfo');
var tableList = document.getElementById('tableList');
var classList = document.getElementById('classList');
var sGradeList = document.getElementById('sGradeList');
var chooseClass = document.getElementById('chooseClass');
var ClassChoose = document.getElementById('ClassChoose');
var tbodySGrade = document.getElementById('tbodySGrade');
var gradeWarning = document.getElementById('gradeWarning');
var classWarning = document.getElementById('classWarning');
var cCbtn = document.getElementById('cCBtn');
var classChoose = document.getElementsByClassName('classChoose');
var loginName;
var loginUid;
var loginUno;
var x = document.cookie;
var t = x.split("=")[1];
if ( x && t ){
    var jsonData = JSON.parse(t);
    loginName = jsonData.username;
    loginUid = jsonData.uid;
    loginUno = jsonData.uno;
    username.innerHTML = loginName;
}
listOne.onclick = function () {
    var ulOne = document.getElementById('ulOne');
    if(checkOne==false){
        ulOne.style.display = "block";
        checkOne=true;
    }else {
        tableList.style.visibility = "hidden";
        classList.style.visibility = "hidden";
        cCbtn.style.visibility = "hidden";
        chooseClass.style.visibility = "hidden";
        sGradeList.style.visibility = "hidden";
        gradeWarning.style.visibility = "hidden";
        classWarning.style.visibility = "hidden";
        ulOne.style.display = "none";
        checkOne=false;
    }
};
stuInfo[0].onclick = function () {
    tableList.style.visibility = "visible";
    classList.style.visibility = "hidden";
    cCbtn.style.visibility = "hidden";
    chooseClass.style.visibility = "hidden";
    sGradeList.style.visibility = "hidden";
    gradeWarning.style.visibility = "hidden";
    classWarning.style.visibility = "hidden";
    ajaxFstu('http://127.0.0.1:9826','findStu',loginUno);
};
stuInfo[1].onclick = function () {
    tableList.style.visibility = "hidden";
    classList.style.visibility = "hidden";
    cCbtn.style.visibility = "hidden";
    chooseClass.style.visibility = "hidden";
    sGradeList.style.visibility = "visible";
    gradeWarning.style.visibility = "visible";
    classWarning.style.visibility = "hidden";
    ajaxFindSG('http://127.0.0.1:9826','findSG',loginUno);
};
stuInfo[2].onclick = function () {
    tableList.style.visibility = "hidden";
    classList.style.visibility = "visible";
    cCbtn.style.visibility = "visible";
    chooseClass.style.visibility = "visible";
    sGradeList.style.visibility = "hidden";
    gradeWarning.style.visibility = "hidden";
    classWarning.style.visibility = "visible";
    ajaxIndex('http://127.0.0.1:9826','printCinfo','classList');
    ajaxStuCC('http://127.0.0.1:9826','stuClassC',loginUno);
    cCbtn.onclick = function () {
        var numC;
        var nameC;
        var Obj = {};
        for ( var i = 0;i < classChoose.length;i++ ){
            if ( classChoose[i].checked == true ){
                numC = classChoose[i].parentNode.children[0].innerHTML;
                nameC = classChoose[i].parentNode.children[1].innerHTML;
                ajaxInputC('http://127.0.0.1:9826','inputSClass',numC,nameC,loginUno);
            }
        }
        ajaxStuCC('http://127.0.0.1:9826','stuClassC',loginUno);
    }
};