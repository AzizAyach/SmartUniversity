


function addQuiz(){


        var date = $("#date").val();
        var duree = $("#duree").val();
        var module = $("#module").val();
        var niveau = $("#niveau").val();
        if (date && duree) {
            $.post(
                '/creatingQuiz',
                {Date: date, Duree:duree, Module:module, Niveau: niveau },
                function () {
                    window.location = "/Form";
                }
            ).fail(function(res){
                alert("Error: " + res.getResponseHeader("error"));
            });
        } else {
            alert("A filed is required");
        }
}

function getQuiz(){
var xmlhttp = new XMLHttpRequest();
var url = "/findAllQuiz";

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function myFunction(response) {
    var Jsonobject = JSON.parse(response);
   var out = '<table class="table table-hover"><thead> '+
   '<th>#</th><th>id</th><th>duree</th><th>Module</th><th>Date</th></tr></thead><tbody>';
   for(i = 0; i < Jsonobject.length; i++) {
     var id = Jsonobject[i].id;
     var Module= Jsonobject[i].Module;
     var duree = Jsonobject[i].Duree;
     var d = ""+Jsonobject[i].Date;
     var date = d.substring(0, 10);
 out += '<tr><td></td><td>'+id+'</td><td>'+duree+'</td><td>'+Module+'</td><td>'+date+'</td>'+
 '<td><a id="'+id+'" onclick="AttributQustion(id);">Generate</a></td><td><a id="'+id+'" onclick="DeleteQuiz(this.id);">Supprimer</a></td><td><a id="'+id+'" onclick="afficherQuiz(this.id);">Afficher</a></td></tr> ';
                              }
                              out+='</tbody> </table>'
      document.getElementById("affiche").innerHTML = out;
    console.log(Jsonobject);
  };

function displayQuiz(id){
 $.get(
                '/DisplayQuiz',
                {id: id},
                function (res) {
               console.log(res);
                }
            ).fail(function(res){
                alert("Error: " + res.getResponseHeader("error"));
                console.log(res);
            });


}

function afficherQuiz(id) {
  window.location="/PassQuest?id="+id;
}

function DeleteQuiz(id){
console.log(id);
            $.post(
                '/deleteQuiz',
                {id: id},
                function () {
                    window.location = "/Form";
                }
            ).fail(function(res){
                alert("Error: " + res.getResponseHeader("error"));
            });



}

function DeleteQuestion(id){
  console.log(id);
  $.post(
    '/DeleteQuestion',
    {id: id},
    function () {
      window.location = "/Quiz";
    }
  ).fail(function(res){
    alert("Error: " + res.getResponseHeader("error"));
  });



}


function addQuestion(){

        var niveau = $("#niveau").val();
        var titre = $("#titre").val();
        var module = $("#module").val();
        var rc1 = document.getElementById("RC1").checked;
        var R1 = $("#R1").val();
        var rc2 = document.getElementById("RC2").checked;
        var R2 = $("#R2").val();
        var rc3 = document.getElementById("RC3").checked;
        var R3 = $("#R3").val();
        var rc4 = document.getElementById("RC4").checked;
        var R4 = $("#R4").val();
        var rc5 = document.getElementById("RC5").checked;
        var R5 = $("#R5").val();
        if (niveau && titre && module && R1 && R2 && R3 && R4 && R5) {
            $.post(
                '/createQuestion',

                {Niveau: niveau, Titre:titre, Module:module, Reponses:[ { Reponse:R1, Type:rc1},{ Reponse:R2, Type:rc2},{ Reponse:R3, Type:rc3},{ Reponse:R4, Type:rc4},{ Reponse:R5, Type:rc5} ] },
                function () {
                    window.location = "/Question/find";
                }
            ).fail(function(res){
                alert("Error: " + res.getResponseHeader("error"));
            });
        } else {
            alert("A filed is required");
        }

}

function getQuestion(){
var xmlhttp = new XMLHttpRequest();
var url = "/Question/find";

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       myQuestion(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();
}


function AttributQustion(id){
console.log(id);
            $.post(
                '/AttributQuestion',
                {id: id},
                function () {
                    window.location = "/Form";
                }
            ).fail(function(res){
                alert("Error: " + res.getResponseHeader("error"));
            });
}


function myQuestion(response) {
    var Jsonobject = JSON.parse(response);

   var out = '<table class="table table-hover"><thead> '+
   '<th>#</th><th>id</th><th>Niveau</th><th>Module</th><th>titre</th><th>Rp1</th><th>Rp2</th><th>Rp3</th><th>Rp4</th><th>Rp5</th><th></th><th></th></tr></thead><tbody>';
   for(var i = 0; i < Jsonobject.length; i++) {
     var id = Jsonobject[i].id;
     var Module= Jsonobject[i].Module;
     var Niveau = Jsonobject[i].Niveau;
     var titre = Jsonobject[i].Titre;
     var array = Jsonobject[i].Reponses;
      out += '<tr><td></td><td>'+id+'</td><td>'+Niveau+'</td><td>'+Module+'</td><td>'+titre+'</td>';

for(var j = 0; j < array.length; j++) {
     var idrp = array[i].id;
     var rp= array[i].Reponse;
     var Niveau = array[i].Type;

out += '<td>'+rp+'</td>';

}

  out += '<td><a >Update</a></td><td><a id="'+id+'" onclick="DeleteQuestion(this.id);">Supprimer</a></td></tr> ';


                              }

                              out+='</tbody> </table>'
      document.getElementById("affiche").innerHTML = out;
    console.log(Jsonobject);
  };

