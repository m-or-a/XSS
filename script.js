function sendingRequest(msg, initiator, helper) {}

function responseReceived(msg, initiator, helper) {
    if (initiator != 1) { return; }

    var body = msg.getResponseBody();
    var bodyAsStr = body.toString();
    var header = msg.getResponseHeader();

    var xRequestedWith = msg.getRequestHeader().getHeader('X-Requested-With');
    var contentType = header.getHeader('Content-Type');
    var contentTypeRegex = new RegExp(/text\/html/g);
    var indexOfValue = bodyAsStr.indexOf('value=');

    if (!contentTypeRegex.test(contentType)
        || xRequestedWith == 'XMLHttpRequest'
        || indexOfValue == -1) {
        return;
    }

    var xss = '<iframe src=”javascript:alert(’xss’)”>';
    var index = indexOfValue + 'value='.length() + 1;

    var newBody = bodyAsStr.slice(0, index) + xss + bodyAsStr.slice(index);

    msg.setResponseBody(newBody);
    header.setContentLength(msg.getResponseBody().length());
}
