# Minimal Google App Engine python project template

Create a new Google App Engine project at https://console.developers.google.com/project, Then edit
`application` value in **app.yaml** to match the name of the project you just created.

Now run (assuming you have `cd`-ed into this project's root dir and you have the GAE Python SDK
extracted to your `$HOME`):

```bash
python2 ~/google_appengine/appcfg.py --oauth2 update .
```

Your app should now be live at `http://your-project-name.appspot.com`
