import React, { Component } from "react";
import axios from "axios";

class JobPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentJob: {}
        };
    }
    componentDidMount() {
        const URL_JOBS = process.env.REACT_APP_API_JOBS;
        axios.get(URL_JOBS).then(response => {
            this.setState({
                currentJob: response.data.find(
                    elm => elm._id === this.props.match.params.id
                )
            });
        });

    }

    render() {
        return (
            <duv className="row">
            <div className="col-lg-8" style={{backgroundColor: "#fff"}}>
                <h3>{this.state.currentJob.job_title}</h3>
                <p>{this.state.currentJob.job_description}</p>
            </div>
            <div className = "col-lg-1"/>
                <div className="col-lg-3" style={{backgroundColor: "#fff"}}>
                    <h4>Job Area</h4>
                    <p className="job-detail__company-description">{this.state.currentJob.job_area}</p>
                    <h4>Job Category</h4>
                    <p className="job-detail__company-description">{this.state.currentJob.job_category}</p>
                </div>
            </duv>
        );
    }
}
export default JobPage;