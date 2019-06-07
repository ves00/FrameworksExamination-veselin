import React, {Component} from "react";
import axios from "axios";

class JobPost extends Component {
    constructor() {
        super();
        this.state = {
            message: 'Loading...',
            auth: false,
            job_title: "",
            job_description: "",
            job_area: "North Denmark",
            job_category: "Accounting"

        };

    }

    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        const URL_REGJOB = process.env.REACT_APP_API_REGISTERJOB;
        const a = this.state;
        axios({
            method: 'post',
            url: URL_REGJOB,
            data: JSON.stringify({
                job_title: a.job_title,
                job_description: a.job_description,
                job_area: a.job_area,
                job_category: a.job_category
            }),
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        message: "Job stored"
                    });
                } else {
                    throw new Error(res.error);
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error');
            });
    };

    ShowJobPosting() {
        if (this.state.auth === true) {
            return <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Job Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="job_title"
                        placeholder="Enter job title"
                        value={this.state.job_title}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    < label> Select area </label>
                    <select value={this.state.job_area} className="form-control" name="job_area"
                            onChange={this.handleInputChange}>
                        <option value="North Denmark">North Denmark</option>
                        <option value="Zealand">Zealand</option>
                        <option value="Central Denmark">Central Denmark</option>
                        <option value="Capital Region">Capital Region</option>
                        <option value="Southern Denmark">Southern Denmark</option>
                    </select>
                </div>
                <div className="form-group">
                    < label> Select category </label>
                    <select value={this.state.job_category} className="form-control" name="job_category"
                            onChange={this.handleInputChange}>
                        <option value="Accounting">Accounting</option>
                        <option value="Information technology">Information technology</option>
                        <option value="Sales">Sales</option>
                        <option value="Real estate">Real estate</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>
                < div
                    className="form-group">
                    < label> Job description </label>
                    <textarea
                        rows={3}
                        className="form-control"
                        name="job_description"
                        placeholder="Enter job description"
                        value={this.state.job_description}
                        onChange={this.handleInputChange}
                        required/>
                </div>
                <input className="btn btn-primary mb-2" type="submit" value="Submit"/>

            </form>
        }
    }

    componentDidMount() {

        const URL_LOGINPAGE = process.env.REACT_APP_API_LOGINPAGE;
        axios.get(URL_LOGINPAGE, {headers: {'x-access-token': localStorage.getItem('token')}})
            .then(response => {
                this.setState({
                    message: response.data
                });
                if (response.data === "Success, please post your AD!") {
                    this.setState({
                        auth: true
                    });
                }
            });

    }

    render() {
        return (
            <div>
                <h1>Create new AD</h1>
                <p>{this.state.message}</p>
                <div>
                    {this.ShowJobPosting()}
                </div>
            </div>
        );
    }
}

export default JobPost;

