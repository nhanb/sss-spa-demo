// Declare router globally (yuck) to allow access for the click event hijacking
// code later
var router;

var MyApp = React.createClass({

  getInitialState: function() {
    return {
      route: 'home',
    };
  },

  componentDidMount: function() {
    router = Router({
      '/': this.setState.bind(this, {route: 'home'}),
      '/about': this.setState.bind(this, {route: 'about'}),
    }).configure({html5history: true});
    router.init();
  },

  render: function() {
    var routeComponent = null;
    switch(this.state.route) {
      case 'home':
        routeComponent = <Home />;
        break;
      case 'about':
        routeComponent = <About />;
        break;
    }

    return (
      <div>
        <nav role="navigation">
          <ul id="navlist">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>

        {{routeComponent}}
      </div>
    );
  }

});

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <img src="/static/sss.jpg" />
        <h1>Welcome to SSS!</h1>
        <p>Nothing to see here. Move along.</p>
      </div>
    );
  }
});

var About = React.createClass({
  render: function() {
    return (
      <div>
        <img src="/static/nhan.jpg" />
        <h1>About Nhan</h1>
        <p>Nothing here either...</p>
      </div>
    );
  }
});

React.render(<MyApp />, document.getElementById('app'));

// Hijack href clicks so that the browser won't reload
$(document).on('click', 'a', function (e) {

    // don't hijack external links or mod-key clicks
    if (this.className === 'external' ||
        e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return true;
    }

    // remove the "http://domain.com" part:
    var route = this.href.replace(/^.*\/\/[^\/]+/, '');

    router.setRoute(route);
    e.preventDefault();
});
