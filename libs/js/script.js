//global var
var btn;

//onload operations
$(window).on('load', function() {
    
    //load data
    getAllDepartments();
    getAllStaff();
    getAllLocations();

});


//copy button

$(document).on("click",".copyBtn", function(){

    if (btn) {
        $(btn).removeClass("btn-success");
        $(btn).addClass("btn-outline-info");
    }
    
    var $txt = $('<textarea />');
    $txt.val($(this).siblings("div:hidden").text()).appendTo('body');;
    $txt.select();
    document.execCommand("copy");
    $txt.remove();

    btn = $(this);
    $(btn).removeClass("btn-outline-info");
    $(btn).addClass("btn-success");

    
});

//insert Person

$('#addPerson').submit(function (e) {
    
    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to add a new person?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/insert/insertPerson.php',
                    data: $('#addPerson').serialize(),
                    success: function (result) {
                        $('#insertNewPerson').modal("toggle");
                        getAllStaff();
                        $('#addPerson')[0].reset();
                    }
                });
            }     
        }
    });

    return false;
    
});

//update and delete person

$(document).on("click",".updatePer", function(){
    
    var perDepId = $(this).next().next().next().val();

    globalThis.personIdtoUpdate = $(this).next().next().val();
    
    $('#editPerson select').val(perDepId).trigger('change');

    var fullName = $($(this).closest("tr").find("td")[0]).children("div").text().split(/(?=[A-Z])/);
    
    $('#editPerson input[name="firstName"]').attr("value", fullName[0]);
    $('#editPerson input[name="lastName"]').attr("value", fullName[1]);
    $('#editPerson input[name="email"]').attr("value", $($(this).closest("tr").find("td")[3]).children("div").text());
    
});


$(document).on("click",".deletePerson", function (e) {   

    e.preventDefault();

    var personIdtoDelete = $(this).next().val();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to delete person\'s details?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
        
                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/delete/deletePerson.php',
                    data: {id: personIdtoDelete},
                    success: function (result) {
                        getAllStaff();
                    }
                });
            }            
        }
    });

    return false;

});

$('#editPerson').submit(function (e) {

    e.preventDefault();
    
    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to update the staff details?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
    
                e.preventDefault();
            
                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/update/updatePerson.php',
                    data: $('#editPerson').serialize() + "&id=" + personIdtoUpdate,
                    success: function (result) {
                       
                        $('#updatePerson').modal("toggle");
                        $('#editPerson')[0].reset();
                        getAllStaff();
                    }
                });
            }    
        }
    });

    return false;

});


//insert department

$('#insertDepartment').submit(function (e) {

    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to add a new department?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {
    
                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/insert/insertDepartment.php',
                    data: $('#insertDepartment').serialize(),
                    success: function (result) {
                        
                        getAllDepartments();
                        $('#insertDepartment')[0].reset();
                    }
                });
           }    
        }
    });

    return false;

});

//delete department

$('#deleteDepartment select').change(function() {

    $.ajax({
        type: 'post',
        url: window.location.href + 'libs/php/get/getAllbyDepID.php',
        data: {departmentID: $(this).val(), p_code: 2},
        success: function (result) {
            if (result.data.length !== 0) {
                $('#deleteDepartment')[0].reset();

                bootbox.alert({
                    title: "Attention",
                    message: "<strong>Imposible to delete department with allocated staff within!<strong>",
                    backdrop: true
                });

                return false;
            }
            
        }
    });

});

$('#deleteDepartment').submit(function (e) {

    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to delete selected department?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
    },
        callback: function (result) {
            
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/delete/deleteDepartmentByID.php',
                    data: $('#deleteDepartment').serialize(),
                    success: function (result) {
                      
                        getAllDepartments();
                        $('#deleteDepartment')[0].reset();
                    }
                });
            }      
        }
    });

    return false;

});


//update department

$('#editDepartment select.deparments').change(function() {

    $.ajax({
        type: 'post',
        url: window.location.href + 'libs/php/get/getDepartmentByid.php',
        data: {id: $(this).val()},
        success: function (result) {
           var locId = result.data[0].locationID;
           $(`#editDepartment select.locations option[value=${locId}]`).prop('selected', true)
            
        }
    });

    var location = $( "#editDepartment select.deparments option:selected" ).text();
    $('#editDepartment input').attr("value", location);

});


$('#editDepartment').submit(function (e) {

    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to update the department name?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/update/updateDepartment.php',
                    data: $('#editDepartment').serialize(),
                    success: function (result) {
                        
                        getAllDepartments();
                        $('#editDepartment')[0].reset();
                        $('#editDepartment input').attr("value", "");
                    }
                });
            }     
        }
    });

    return false;

});



//insert location

$('#insertLocation').submit(function (e) {

    e.preventDefault();
    
    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to add a new location?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/insert/insertLocation.php',
                    data: $('#insertLocation').serialize(),
                    success: function (result) {
                    
                    getAllLocations();
                    $('#insertLocation')[0].reset();
                    }
                });
        
            }
            
        }
    });

    return false;

});

//delete location

$('#deleteLocation select').change(function() {

    $.ajax({
        type: 'post',
        url: window.location.href + 'libs/php/get/getAllByLocID.php',
        data: {locationID: $(this).val(), p_code: 2},
        success: function (result) {
           
            if (result.data.length !== 0) {
                $('#deleteLocation')[0].reset();

                bootbox.alert({
                    title: "Attention",
                    message: "<strong>Imposible to delete location with allocated staff within!</strong>",
                    backdrop: true
                });

                return false;
            }
        }
    });

});

$('#deleteLocation').submit(function (e) {
    
    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "<strong>Do you want to delete the selected location?</strong>",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {

            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/delete/deleteLocationbyID.php',
                    data: $('#deleteLocation').serialize(),
                    success: function (result) {
                        
                        getAllLocations();
                        $('#deleteLocation')[0].reset();
                    }
                });
        
            }       
        }
    });

    return false;

});

//update location

$('#editLocation select').change(function() {
    
    var location = $( "#editLocation select option:selected" ).text();
    $('#editLocation input').attr("value", location);
});

$('#editLocation').submit(function (e) {
    
    e.preventDefault();

    bootbox.confirm({
        title: "Action Required",
        message: "Do you want to change the location name?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
           
            if (result) {

                $.ajax({
                    type: 'post',
                    url: window.location.href + 'libs/php/update/updateLocation.php',
                    data: $('#editLocation').serialize(),
                    success: function (result) {
                  
                    getAllLocations();
                    $('#editLocation')[0].reset();
                    $('#editLocation input').attr("value", "");
                    }
                });
            }
            
        }
    });

    return false;

});



//select by department

$('#selectDepartmens').change(function(){ 
   
    $('#tableBody').text("");

    $.post(window.location.href +"libs/php/get/getAllbyDepID.php", 
    {
        departmentID: $(this).val(), 
        locationID: $('#selectLocation option:selected').val(),
        p_code: 1

    }, function(result) {
  
        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><i class="my-auto bi bi-file-person"></i><div class='d-inline-flex filterSearch'>${person.firstName + " " + person.lastName}</div></td>
            <td><i class="my-auto bi bi-briefcase"></i><div class='d-inline-flex'>${person.department}</div></td>
            <td><i class="my-auto bi bi-building"></i><div class='d-inline-flex'>${person.location}</div></td>
            <td><i class="d-none d-md-inline ms-auto my-auto bi bi-envelope"></i><div class='d-none d-md-inline-flex filterSearch'>${person.email}</div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
            <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatePer  mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-outline-danger deletePerson mx-auto"><i class="bi bi-x-circle"></i></button>
            <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></div></td></tr>`);
        });

        $('#tableBody').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBody .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBody .hideDataRow').addClass("d-none");
        }
          
    });
    
});

//select by location

$('#selectLocation').change(function(){ 
    
    $('#tableBody').text("");
    
    $.post( window.location.href + "libs/php/get/getAllByLocID.php", 
        {
            locationID: $(this).val(), 
            name: $("#selectDepartmens option:selected").text(),
            departmentID: $("#selectDepartmens option:selected").val(),
            p_code: 1
        }, function(result) {

                result.data.forEach(person => {
                    $('#tableBody').append(`<tr><td><i class="my-auto bi bi-file-person"></i><div class='d-inline-flex filterSearch'>${person.firstName + " " + person.lastName}</div></td>
                    <td><i class="my-auto bi bi-briefcase"></i><div class='d-inline-flex'>${person.department}</div></td>
                    <td><i class="my-auto bi bi-building"></i><div class='d-inline-flex'>${person.location}</div></td>
                    <td><i class="d-none d-md-inline ms-auto my-auto bi bi-envelope"></i><div class='d-none d-md-inline-flex filterSearch'>${person.email}</div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
                    <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatePer  mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson"><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn btn-outline-danger deletePerson mx-auto"><i class="bi bi-x-circle"></i></button>
                    <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></div></td></tr>`);
                });

                $('#tableBody').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

                if (result.data.length == 0 ) {
                    $('#tableBody .hideDataRow').removeClass("d-none");
                } else {
                    $('#tableBody .hideDataRow').addClass("d-none");
                }    
    });

});




//reset button

$("#reset").on("click", function() {

    getAllStaff();
    getAllDepartments();
    getAllLocations();

});


//sort table by columns

$('.sortTab').wrapInner('<span title="sort this column"/>').click(function(){
    var table = $('table');
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).closest('th').index()));
    this.asc = !this.asc;
    if (!this.asc){rows = rows.reverse()};
    for (var i = 0; i < rows.length; i++){table.append(rows[i])};
})
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).text() }


//search engine

function searchTable() {

    var table = $('#tableBody');

    table.find('tr').each(function(index, row) {
        var allCells = $(row).find('.filterSearch');
        if(allCells.length > 0) {
            var found = false;
            allCells.each(function(index, td) {
                var regExp = new RegExp($(".searchInput").val(), 'i');
                if(regExp.test($(td).text())) {
                    found = true;
                    return false;
                }
            });

        if(found == true)$(row).show();else $(row).hide();

        };
        
    }); 


    if ($('#tableBody').find('tr:visible').length === 0 && $('.hideDataRow').is(":hidden")) { 
        $('#tableBody .hideDataRow').removeClass("d-none");
    }else if ($('#tableBody').find('tr:visible').length === 1 && $('.hideDataRow').is(":visible")) {
        $('#tableBody .hideDataRow').removeClass("d-none");
    }else{
        $('#tableBody .hideDataRow').addClass("d-none");
    }
}
    


//functions 

//get all staff

function getAllStaff() {

    $('#tableBody').text("");

    $.get("libs//php/get/getAll.php",   function(result) {
      

        result.data.forEach(person => {
            $('#tableBody').append(`<tr><td><i class="my-auto bi bi-file-person"></i><div class='d-inline-flex w-75 overflow-hidden filterSearch'>${person.firstName + " " + person.lastName}</div></td>
            <td><i class="my-auto bi bi-briefcase"></i><div class='d-inline-flex w-75 overflow-hidden'>${person.department}</div></td>
            <td><i class="my-auto bi bi-building"></i><div class='d-inline-flex w-75'>${person.location}</div></td>
            <td><i class="d-none d-md-inline ms-auto my-auto bi bi-envelope"></i><div class='d-none d-md-inline-flex filterSearch'>${person.email}</div><button type="button" class="btn btn-outline-info btn-sm d-sm-block d-md-none mx-auto copyBtn">Copy</button></td>
            <td><div class="d-flex"><button type="button" class="btn btn-outline-info updatePer  mx-auto" data-bs-toggle="modal" data-bs-target="#updatePerson"><i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-outline-danger deletePerson mx-auto"><i class="bi bi-x-circle"></i></button>
            <input class="d-none perIdVal" type="number" value=${person.id} /><input class="d-none perIdDep" type="number" value=${person.departmentId} /></div></td></tr>`);
        });

        $('#tableBody').append("<tr class='hideDataRow d-none'><td class='text-center' colspan=5>No Results</td></tr>");

        if (result.data.length == 0 ) {
            $('#tableBody .hideDataRow').removeClass("d-none");
        } else {
            $('#tableBody .hideDataRow').addClass("d-none");
        }
        
    });
}

//get all departments 

function getAllDepartments() {

    $('.deparments').text("");
    $('.deparments').append(`<option value="getAll" selected>All Departments</option>`);
    $.get("libs//php/get/getAllDepartments.php",  function(result) {

        result.data.forEach(dep => {
            $('.deparments').append(`<option value=${dep.id}>${dep.name}</option>`);
        });

    });

    $('#insertNewPerson select option[value="getAll"]').attr("value", "");
    $('#departmentModal select option[value="getAll"]').attr("value", "");
    $('#locationModal select option[value="getAll"]').attr("value", "");

}



//get all locations

function getAllLocations() {

    $('.locations').text("");
    $('.locations').append(`<option value="getAll" selected>All Locations</option>`);

    $.get("libs//php/get/getAllLocations.php",  function(result) {

        result.data.forEach(loc => {
            $('.locations').append(`<option value=${loc.id}>${loc.name}</option>`);
        });

    });

    $('#insertNewPerson select option[value="getAll"]').attr("value", "");
    $('#departmentModal select option[value="getAll"]').attr("value", "");
    $('#locationModal select option[value="getAll"]').attr("value", ""); 

}
