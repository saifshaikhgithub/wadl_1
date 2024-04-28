import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        name = "Your Name"
        seat_number = "Your Seat Number"
        department = "Your Department"

        for _ in range(5):
            self.response.write("Name: %s<br>" % name)
            self.response.write("Seat Number: %s<br>" % seat_number)
            self.response.write("Department: %s<br>" % department)
            self.response.write("<br>")

app = webapp2.WSGIApplication([('/', MainPage)], debug=True)
