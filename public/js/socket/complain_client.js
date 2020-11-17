
$(function (){
        var socket = io();
        //database 점속 후 있는거 받아오기

        socket.on("addcomplain", function (data){
            $("#x").append("<p>"+data+"</p>");
        });


        $("#myform").submit(function(e){
           e.preventDefault();
           var $complain = $("#complain");
           console.log($complain.val());
           socket.emit("addcomplain",{complaintext : $complain.val()});
           $complain = "";
        });
    });