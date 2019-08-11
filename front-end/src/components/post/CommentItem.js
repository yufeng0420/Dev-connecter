import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";
import { connect } from "react-redux";

const CommentItem = ({ comment, deleteComment, auth, postId }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${comment.user}`}>
          <img className="round-img" src={comment.avatar} alt="" />
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          Posted on {<Moment format="YYYY/MM/DD">{comment.date}</Moment>}
        </p>
        {!auth.loading && comment.user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deleteComment(postId, comment._id);
            }}
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
