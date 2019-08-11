import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { updateLike, updateUnlike, deletePost } from "../../actions/post";

const PostItem = ({ post, auth, updateLike, updateUnlike, deletePost }) => {
  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className="round-img" src={post.avatar} alt="" />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD"> {post.date}</Moment>
          </p>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => updateLike(post._id)}
          >
            <i className="fas fa-thumbs-up" />{" "}
            <span>
              {post.likes.length > 0 && <span>{post.likes.length}</span>}
            </span>
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => updateUnlike(post._id)}
          >
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`./posts/${post._id}`} className="btn btn-primary">
            Discussion{" "}
            {post.comments.length > 0 && (
              <span className="comment-count">{post.comments.length}</span>
            )}
          </Link>
          {!auth.loading && post.user === auth.user._id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deletePost(post._id);
              }}
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  updateUnlike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateLike, updateUnlike, deletePost }
)(PostItem);
