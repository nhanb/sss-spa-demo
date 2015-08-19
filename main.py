#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import os
import jinja2


jinja = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__) + '/templates'),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

def crawlable(func):
    """
    Render crawler-friendly html to serve search engine and Open Graph bots.
    If requester is an actual browser, simply serve the client app's static
    html.
    """
    def wrapped(handler):
        # If requester is a bot, serve custom "bot version"
        crawlers = ('Googlebot', 'facebookexternalhit', 'Slackbot',
                    'Google-Structured-Data-Testing-Tool')
        for crawler in crawlers:
            if crawler in handler.request.headers['User-Agent']:
                return func(handler)

        # Not a bot. Let's serve the js app!
        with open(os.getcwd() + '/frontend/app.html', 'r') as f:
            html = f.read()
        handler.response.write(html)
        return None

    return wrapped

class HomeHandler(webapp2.RequestHandler):
    @crawlable
    def get(self):
        template = jinja.get_template('common.html')

        self.response.write(template.render({
            'title': 'Home',
            'img': 'sss.jpg',
            'heading': 'Welcome to SSS!',
            'content': 'Nothing to see here. Move along.',
        }))

class AboutHandler(webapp2.RequestHandler):
    @crawlable
    def get(self):
        template = jinja.get_template('common.html')

        self.response.write(template.render({
            'title': 'About Nhan',
            'img': 'nhan.jpg',
            'heading': 'About Nhan',
            'content': 'Nothing here either',
        }))


app = webapp2.WSGIApplication([
    ('/', HomeHandler),
    ('/about', AboutHandler),
], debug=True)
