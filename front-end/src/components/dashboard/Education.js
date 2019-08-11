import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profile";
import Moment from "react-moment";
import moment from "moment";

const Education = ({ education, deleteEducation }) => {
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.map(edu => (
            <tr key={edu._id}>
              <td>{edu.school}</td>
              <td className="hide-sm">{edu.degree}</td>
              <td>
                <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{" "}
                {edu.current ? (
                  "Now"
                ) : (
                  <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEducation(edu._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
