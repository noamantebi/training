function Application(app){

    this.id = app.id;
    this.name = app.name;
    this.creationTime = new Date(app.creationTime);
    this.owner = app.owner;
    var status;
    var changeStatusButtonText;
    setStatus(app.deployment);


    function setStatus(dep){
        if (dep == null){
            status = 'Draft';
            changeStatusButtonText = 'Start';
        } else if(dep.totalErrorVms > 0) {
            status =  'Error';
            changeStatusButtonText = 'Start';
        } else if (dep.totalActiveVms > 0) {
            status =  'Running';
            changeStatusButtonText = 'Stop';
        } else {
            status = 'Stopped';
            changeStatusButtonText = 'Start';
        }
    }

    this.createDataRow = function(){

        var tableContainer = $('#table-container');
        var tableRow = jQuery('<div/>', {
            class: 'table-row'
        });
        var name = jQuery('<div/>', {
            class: 'table-data',
            text: this.name
        });
        var owner = jQuery('<div/>', {
            class: 'table-data',
            text: this.owner
        });
        var date = jQuery('<div/>', {
            class: 'table-data date',
            text: this.creationTime
        });

        var statusDiv = jQuery('<div/>', {
            class: 'table-data status ' + status.toLowerCase(),
            text: status
        });

        var changeStatusDiv = jQuery('<div/>', {
            class: 'table-data changeStatus'
        });

        var changeStatus = jQuery('<button/>', {
            type: 'button',
            class: 'tableDataButtons button',
            text: changeStatusButtonText,
            onclick: 'buttonStatusClick(event)'
        });

        var renameDiv = jQuery('<div/>', {
            class: 'table-data rename'
        });

        var rename = jQuery('<button/>', {
            type: 'button',
            class: 'tableDataButtons button',
            onclick: 'rename(event)',
            text: 'Rename',
            appid: this.id
        });


        //var deployment = app.deployment;
        //setStatus(deployment, changeStatus, status);

        changeStatusDiv.append(changeStatus);
        renameDiv.append(rename);
        //add everything under row
        tableRow.append(name);
        tableRow.append(statusDiv);
        tableRow.append(renameDiv);
        tableRow.append(changeStatusDiv);
        tableRow.append(owner);
        tableRow.append(date);

        tableContainer.append(tableRow);

    }

}

$(document).ready(
    loadApplications()
);

function loadApplications(){
        $.ajax({
            url: '/services/applications',
            type: 'GET',
            dataType: 'json',
            username: 'ravello@ravello.com',
            password: 'ravello',
            success: function (data) {
                for(var i = 0; i<data.length; i++){
                    addNewApp(data[i]);
                    disableErrorAndDraft();

                }
            }
        });
}

function addNewApp(app){
    var newApp = new Application(app);
    newApp.createDataRow();
}


function disableErrorAndDraft() {
    $('.status.error').siblings('.changeStatus').find('button').attr("disabled", true);
    $('.status.draft').siblings('.changeStatus').find('button').attr("disabled", true)
}

function refresh(){
    $('#table-container > div').not(".title").remove();
    loadApplications();
}

function rename(e){
    var newName = prompt('Enter a new name for the application:');
    var id = e.target.getAttribute('appID');
    $.ajax({
        url: '/services/applications/'+id,
        type: 'GET',
        dataType: 'json',
        username: 'ravello@ravello.com',
        password: 'ravello',
        success: function (data) {
            if(data.length > 1){
                alert("Error occurred: more than one application with ID" + id);
            } else{
                var appData = data;
                appData.name = newName;
                $.ajax({
                    url: '/services/applications/'+id,
                    type: 'PUT',
                    dataType: 'json',
                    username: 'ravello@ravello.com',
                    password: 'ravello',
                    data: appData,
                    success: function (data) {
                        alert("Action succeeded - press Refresh to see the changes");
                    }
                });
            }
        }
    });
}