function load() {
    var statusList = document.getElementsByClassName("status");
    for (var i = 0; i< statusList.length; i++) {
        var parent = statusList[i].parentNode;
        var statusButtonList = parent.getElementsByClassName("changeStatus");
        if (statusButtonList.length > 0) {
            if (statusList[i].innerText == "Error") {
                statusButtonList[0].disabled = true;
            }
        }
    }
}
function buttonStatusClick(e) {
    var button = e.target;
    var parent = button.parentNode;
    while (parent.className!= "table-row") {
        parent = parent.parentNode;
    }
    var status = parent.getElementsByClassName("status")[0];
    if (status.innerText === "Running") {
        button.innerText = "Start";
        status.innerText = "Stopped";
        status.className = status.className.replace("running", "stopped");
    }
    else if (status.innerText === "Stopped") {
        button.innerText = "Stop";
        status.innerText = "Running";
        status.className = status.className.replace("stopped", "running");
    }
}
function infoLinkClick() {
    alert("Not implemented");
}