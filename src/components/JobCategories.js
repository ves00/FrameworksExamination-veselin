import React, { Component } from "react";
import { Link } from "react-router-dom";

class JobCategories extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: [
                {
                    url: "/alljobs",
                    name: "All"
                },
                {
                    url: "/accounting",
                    name: "Accounting"
                },
                {
                    url: "/it",
                    name: "Information technology"
                },
                {
                    url: "/sales",
                    name: "Sales"
                },
                {
                    url: "/realestate",
                    name: "Real estate"
                },
                {
                    url: "/insurance",
                    name: "Insurance"
                },
                {
                    url: "/marketing",
                    name: "Marketing"
                },
                {
                    url: "/finance",
                    name: "Finance"
                }
            ] };
    }
    CategoryList() {
        return this.state.categories.map(function(category, i) {
            return <Link to={"/category" + category.url} key={i} className="list-group-item list-group-item-action">{category.name}</Link>
        });
    }

    render() {
        return (
            <div>


                <h3>Categories</h3>
                <div className="list-group">
                    {this.CategoryList()}
                </div>
            </div>
        );
    }
}
export default JobCategories;

