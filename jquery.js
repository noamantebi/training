$(document).ready(function() {
    $.ajax({
        url: "/services/applications",
        type: "GET",
        dataType: "json",
        success: function (data, status) {
            alert(data + ":" + status);
        }
    });
})