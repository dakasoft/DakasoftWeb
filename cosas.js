//auto crear alerta
function showAlert(containerId, alertType, message,hide) {
    $("#" + containerId).append('<div class="alert alert-' + alertType + '" id="alert' + containerId + '">' + message + '</div>');
    $("#alert" + containerId).alert();
    window.setTimeout(function () { $("#alert" + containerId).alert('close'); }, hide);
}
