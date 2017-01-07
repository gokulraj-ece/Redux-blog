// it is actually a container
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
// Link is an actual component (an anchor tag)
// used to offer linking between different routes
import { fetchPosts } from '../actions/index';
// using React lifecycle methods to call action creators when page change occurs
// componentWillMount called by react whenever component about to be rendered to
// DOM for first time only and not subsequent ones
class PostsIndex extends Component {
  // dispatch an action when PostsIndex is rendered in the DOM
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"posts/" + post.id}>
            <span className="pull-xs-right">Category: {post.categories}</span>
            <strong>Title: {post.title}</strong>
          </Link> 
      </li>
    );
  });
  }

  render() {
    return(
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

//function mapDispatchToProps(dispatch) {
//  return bindActionCreators({ fetchPosts }, dispatch);
//}

//export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
