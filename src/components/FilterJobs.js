import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Jobs = props => (
    <tr>
        <td>{props.Jobs.job_title}</td>
        <td>{props.Jobs.job_category}</td>
        <td>{props.Jobs.job_area}</td>
        <td>
            <Link to={"/show-job/" + props.Jobs._id} className="btn btn-primary">Details</Link>
        </td>
    </tr>
);

class FilterJobs extends Component {
    constructor(props) {
        super(props);
        this.state = { Jobs: [] ,
            Nojobs : false,
        }
        }

    componentDidMount() {
        let area = this.props.match.params.area;
        let category = this.props.match.params.categ;
        switch (area) {
            case "northdenmark":
                area = "North Denmark";
                break;
            case "zealand":
                area = "Zealand";
                break;
            case "centraldenmark":
                area = "Central Denmark";
                break;
            case "capitalregion":
                area = "Capital Region";
                break;
            case "southerndenmark":
                area = "Southern Denmark";
                break;
            default :
                area = "North Denmark";
        }
        switch (category) {
            case "accounting":
                category = "Accounting";
                break;
            case "it":
                category = "Information technology";
                break;
            case "sales":
                category = "Sales";
                break;
            case "realestate":
                category = "Real estate";
                break;
            case "insurance":
                category = "Insurance";
                break;
            case "marketing":
                category = "Marketing";
                break;
            case "finance":
                category = "Finance";
                break;
            default :
                category = "North Denmark";
        }
        const URL_FILTERQUESTION = process.env.REACT_APP_API_FILTEREDJOBS;
        axios
            .get(URL_FILTERQUESTION, {
                params: {
                    area : area,
                    categ : category
                }
            })
            .then(response => {
                if (response.data && response.data.length > 0) {
                    this.setState({Jobs: response.data});
                }
                else {
                    this.setState({Nojobs: "Sorry, no jobs found"});
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    JobsList() {
            return this.state.Jobs.map(function (currentJob, i) {
                return <Jobs Jobs={currentJob} key={i}/>;

            })
    }
    ShowTable() {
        const nojobs = this.state.Nojobs;
        if (!nojobs) {
            return <table className="table table-striped" style={{ marginTop: 20 }}>
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
        }
        return <h1>{this.state.Nojobs}</h1>;
    }

    render() {
        return (
            <div>


                <h3>Job list</h3>
                {this.ShowTable()}
            </div>
        );
    }
}
export default FilterJobs;

