import React from 'react';
import { Route, IndexRoute } from 'react-router';
// Route to define a match between components and url
// IndexRoute shown whenever the url matches up with a parent but
// not one of the children
import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
//trial - nested routes
//const Greeting = () => {
  //return <div>Hello!!</div>;
//}

// if '/' is visited, shows {App} and {PostsIndex}
// if '/greet' is visited, shows {App} and {Greeting}
export default (
<Route path="/" component={App}>
  <IndexRoute component={PostsIndex} />
  <Route path="posts/new" component={PostsNew} />
  <Route path="posts/:id" component={PostsShow} />
</Route>
);
// ":id" - the param - (eg) posts/5 - react-router will automatically parse the
// url and pass into PostsShow a spl prop this.props.params.id
// <Route path="/" component={App}>
//  <Route path="greet" component={Greeting} />
// </Route>
// when /greet is visited, the child component {Greeting} is passed as child
// to App as this.props.children
