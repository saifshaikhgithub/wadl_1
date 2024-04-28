import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        ele = 5;
        
        for x in range(10):
            prod = x*ele
            self.response.write("%s<br>" % prod)        

app = webapp2.WSGIApplication([('/', MainPage)], debug=True)
