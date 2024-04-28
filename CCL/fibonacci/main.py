import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.write("""
            <form method="post">
                Enter the value of n: <input type="number" name="n">
                <input type="submit" value="Submit">
            </form>
        """)
        
    def post(self):
        n = int(self.request.get('n'))
        
        a = 1
        b = 1
        for i in range(n):
            c = a + b
            a = b
            b = c
            self.response.write("%s<br>" % c)

app = webapp2.WSGIApplication([
    ('/', MainPage)
], debug=True)
