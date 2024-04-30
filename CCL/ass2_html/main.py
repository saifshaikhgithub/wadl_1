import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.response.write("""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>Hello Every One</h1>
                <h1>My Name is saif shaikh</h1>
                <p>I am a student at Pune Institute of Computer Technology</p>
            </body>
            </html>
        """)

app = webapp2.WSGIApplication([('/', MainPage)], debug=True)
