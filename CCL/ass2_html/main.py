import webapp2
import os

from google.appengine.ext.webapp import template

class MainPage(webapp2.RequestHandler):
    def get(self):
        path=os.path.join(os.path.dirname(__file__),"index.html")
        context={}
        self.response.out.write(template.render(path,context))


        

app = webapp2.WSGIApplication([('/', MainPage)],debug=True)