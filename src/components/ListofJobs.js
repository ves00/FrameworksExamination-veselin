import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Jobs = props => (
    <tr>
        <td>{props.jobs.job_title}</td>
        <td>{props.jobs.job_category}</td>
        <td>{props.jobs.job_area}</td>
        <td>
            <Link to={"/show-job/" + props.jobs._id} className="btn btn-primary">Details</Link>
        </td>
    </tr>
);

class ListofJobs extends Component {
    constructor(props) {
        super(props);
        this.state = { jobs: [] };
    }

    componentDidMount() {
        const URL_ALLJOBS = process.env.REACT_APP_API_JOBS;
        console.log(URL_ALLJOBS);
        axios
            .get(URL_ALLJOBS)
            .then(response => {
                this.setState({ jobs: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    JobsList() {
        return this.state.jobs.map(function(currentjob, i) {
            return <Jobs jobs={currentjob} key={i} />;
        });
    }

    render() {
        return (
            <div>


                <h3>Job list</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Area</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>{this.JobsList()}</tbody>
                </table>
            </div>
        );
    }
}
export default ListofJobs;

