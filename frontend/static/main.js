var MyApp = React.createClass({

  getInitialState: function() {
    return {
      route: 'home',
    };
  },

  componentDidMount: function() {
    var router = Router({
      '/': this.setState.bind(this, {route: 'home'}),
      '/about': this.setState.bind(this, {route: 'about'}),
    });
    router.init();
  },

  render: function() {
    var routeComponent = null;
    console.log('rendering///')
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
            <li><a href="#/">Home</a></li>
            <li><a href="#/about">About</a></li>
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
