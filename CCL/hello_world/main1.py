import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.write('Welcome');

app = webapp2.WSGIApplication([('/'), MainPage], debug=True);