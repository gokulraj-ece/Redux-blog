// it is actually a container
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'; // identical to connect
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for post'
  },
  categories: {
    type: 'input',
    label: 'Enter categories for post'
  },
  content: {
    type: 'textarea',
    label: 'Enter contents of post'
  }
}
//['title', 'categories', 'content'];

class PostsNew extends Component {
  // const handleSubmit = this.props.handleSubmit;
  // handleSubmit needs an action creator so that it can absorb all the properties
  // const title = this.props.fields.title;
  // assign the handler from reduxForm
  // pass configuration objects (title, categories, content) into the input!

  // component has a property called 'context' from which the 'push' method can be obtained
  // context is like props except that it doesn't have to be deliberately passed into a child component
  static contextTypes = { // to require access to property 'router' from parent component
    router: PropTypes.object // gives access to this.context.router inside our component
  // property of PostsNew! searches for router in all parents (here in routes.js) to get the context
  }

  // helper function to handleSubmit
  onSubmit(props) {
    this.props.createPost(props) // returns a promise, resolved when the post is submitted
      .then(() => {
        //blogpost created, navigate user to index using this.context.router.push with the new path to go to
        this.context.router.push('/');
      });
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : '' }`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error: ''}
        </div>
      </div>
    );
  }

  render() {
    // const { fields: { title, categories, content }, handleSubmit } = this.props;
    const { handleSubmit } = this.props;
    // touched comes with reduxform
    // {...title} ensures that every property on the 'title' object shows up in the input field of form

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post</h3>
        {_.map(FIELDS, this.renderField.bind(this))}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
  // destructuring of objects => all properties of object are passed as props
  // eg. all the handlers on obj title are associated with form 'title'
}
// called whenever we want to validate a function
// if an attribute of the returned value matches with the properties injected
// and if the RHS is a truthy value (true/string/what not), that field is invalid
// and validate doesn't let us to submit invalid forms (mostly coz of handleSubmit)
// and adds some properties to the field objects as well (eg) invalid
function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if(!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}

// passing configuration to redux form (so that it can watch for these inputs)
// reduxForm pulls up the state from the component level to the application level
// injects some props into component (has the exact same behaviour as connect)
// has one additional argument (the configuration obj)
export default reduxForm({ // injecting helpers into PostsNew
  form: 'PostsNewForm', // telling reduxForm the name of this form and fields
  fields: _.keys(FIELDS), // 3 properties injected into PostsNew as props
  validate                                    // createPost injected into PostsNew as props
}, null, { createPost })(PostsNew); // shorthand for mapDispatchToProps
// connect: 1st arg - mapStateToProps , 2nd arg - mapDispatchToProps
// reduxForm: 1st arg - configuration object , 2nd arg - msp , 3rd arg - mdp

// behind the scenes done by reduxForm
// state === {
//  form: {
//    PostsNewForm: {
//      title: '...',
//      categories: '...',
//      content: '...'
//    }
//  }
//}
