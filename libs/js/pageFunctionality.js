$(window).on('load', function() {

  //preloader
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
        $(this).remove();
    });
  }

  functionality();
      
});

//rotation

if(window.innerHeight > window.innerWidth){ //portrait
  functionality();
}
if(window.innerWidth > window.innerHeight){ //landscape
  functionality();
}

function functionality() {
  //department modal
  $('#btnradioAddDep').click(function() {
    //divisions
    $(".aadDep").removeClass("d-none");
    $(".aadDep").addClass("d-block");
    $(".editDep").addClass("d-none");
    $(".delDep").addClass("d-none");

    //buttons
    $('#addDepBtn').removeClass("d-none");
    $("#addDepBtn").addClass("d-block");
    $("#editDepBtn").addClass("d-none");
    $("#delDepBtn").addClass("d-none");
  });
  
  $('#btnradioEditDep').click(function() {
    //divisions
    $(".editDep").removeClass("d-none");
    $(".editDep").addClass("d-block");
    $(".delDep").addClass("d-none");
    $(".aadDep").addClass("d-none");

    //buttons
    $('#editDepBtn').removeClass("d-none");
    $("#editDepBtn").addClass("d-block");
    $("#addDepBtn").addClass("d-none");
    $("#delDepBtn").addClass("d-none");
  });
  
  $('#btnradioDeleteDep').click(function() {
    //divisions
    $(".delDep").removeClass("d-none");
    $(".delDep").addClass("d-block");
    $(".editDep").addClass("d-none");
    $(".aadDep").addClass("d-none");

    //buttons
    $('#delDepBtn').removeClass("d-none");
    $("#delDepBtn").addClass("d-block");
    $("#editDepBtn").addClass("d-none");
    $("#addDepBtn").addClass("d-none");
  });
  
  
  //location modal
  $('#btnradioAddLoc').click(function() {
    //divisions
    $(".aadLoc").removeClass("d-none");
    $(".aadLoc").addClass("d-block");
    $(".editLoc").addClass("d-none");
    $(".delLoc").addClass("d-none");

    //buttons
    $('#aadLocBtn').removeClass("d-none");
    $("#aadLocBtn").addClass("d-block");
    $("#editLocBtn").addClass("d-none");
    $("#delLocBtn").addClass("d-none");
  });
  
  $('#btnradioEditLoc').click(function() {
    //divisions
    $(".editLoc").removeClass("d-none");
    $(".editLoc").addClass("d-block");
    $(".delLoc").addClass("d-none");
    $(".aadLoc").addClass("d-none");

    //buttons
    $('#editLocBtn').removeClass("d-none");
    $("#editLocBtn").addClass("d-block");
    $("#aadLocBtn").addClass("d-none");
    $("#delLocBtn").addClass("d-none");
  });
  
  $('#btnradioDeleteLoc').click(function() {
    //divisions
    $(".delLoc").removeClass("d-none");
    $(".delLoc").addClass("d-block");
    $(".editLoc").addClass("d-none");
    $(".aadLoc").addClass("d-none");

    //buttons
    $('#delLocBtn').removeClass("d-none");
    $("#delLocBtn").addClass("d-block");
    $("#aadLocBtn").addClass("d-none");
    $("#editLocBtn").addClass("d-none");
  });


  //table size

  if (window.matchMedia('(max-width: 991px)').matches) {
    $('table').addClass("table-sm");
  } else {
    $('table').removeClass("table-sm");
  }

  $(window).resize(function() {
      if (window.matchMedia('(max-width: 991px)').matches) {
        $('table').addClass("table-sm");
      } else {
        $('table').removeClass("table-sm");
      }
  });

  //table scroll

  var $th = $('#tableDiv').find('thead th')
  $('#tableDiv').on('scroll', function() {
    if ($(this).scrollTop()) {
      $th.css('transform', 'translateY('+ -1 +'px)');
  } else {
      $th.css('transform', 'translateY('+ 0 +'px)');
  }
  });


  //back to top button

  $('#tableDiv').scroll(function() {
    var height = $('#tableDiv').scrollTop();
    if (height > 100) {
        $('#scrollBack').fadeIn();
    } else {
        $('#scrollBack').fadeOut();
    }
  });

  $("#scrollBack").click(function(event) {
        $('#tableDiv').animate({ scrollTop: 0 }, "slow");
  });


 
}