import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ListofJobs from "./components/ListofJobs";
import JobPage from "./components/JobPage";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import CompanyLogin from "./components/CompanyLogin";
import JobPost from "./components/JobPost";
import JobCategories from "./components/JobCategories";
import AreaPage from "./components/AreaPage";
import FilterJobs from "./components/FilterJobs";


function App() {
    return (
        <Router >
            <div className="App">
                Made by Veselin Veselinov
            </div>
            <div className="container" >

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/loginpage"} className="nav-link">LoginPage</Link>                            </li>
                            <li className="nav-item">
                                <Link to={"/postjob"} className="nav-link">Post New Job AD</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br />
                <Switch>
                    <Route exact path="/loginpage" render={props => <CompanyLogin/>} />
                    <Route exact path="/postjob" render={props => <JobPost/>} />
                    <Route exact path="/category/alljobs" render={props => <ListofJobs />} />
                    <Route exact path="/" render={props => <JobCategories />} />
                    <Route
                        path="/show-job/:id"
                        render={props => <JobPage {...props} />}
                    />
                    <Route
                        path="/category/:categ/:area"
                        render={props => <FilterJobs {...props} />}
                    />
                    <Route
                        path="/category/:categ"
                        render={props => <AreaPage {...props} />}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
