
$(function (){
    var socket = io();

        socket.on("addcomplain", function (data){

        });


        $("#complain_socket").submit(function(e){//추가 버튼 눌렸을
            e.preventDefault();
           // var $complain = $("#complain");
            var $roomnum=$("#roomnum");
            var $complain_type=$("#complain_type");
            var $priorityx=$("#priorityx");
            var $contentx=$("#contentx");
            var date = new Date();
            var $st_time="2000-11-11 00:00:00";//need fix

           socket.emit("addcomplain",{
               roomnum:parseInt($roomnum.val()),
               complain_type:$complain_type.val(),
               priorityx:parseInt($priorityx.val()),
               contentx:$contentx.val(),
               employee_id:null,
               st_time:$st_time,
               // st_time:$st_time.val(),
               fin_time:null,
           });
           $roomnum.val("");
           $complain_type.val('');
           $priorityx.val("0");
           $contentx.val("");
        });
    });