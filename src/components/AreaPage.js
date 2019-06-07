import React, { Component } from "react";
import {Link} from "react-router-dom";


class AreaPage extends Component {
    constructor(props) {
        super(props);
            this.state = {
                currentcateg : props.match.params.categ,
                areas: [
                {
                    url: "/northdenmark",
                    name: "North Denmark"
                },
                {
                    url: "/zealand",
                    name: "Zealand"
                },
                {
                    url: "/centraldenmark",
                    name: "Central Denmark"
                },
                {
                    url: "/capitalregion",
                    name: "Capital Region"
                },
                {
                    url: "/southerndenmark",
                    name: "Southern Denmark"
                }
            ] };
        };

    AreaList() {
        let mk = this.state.currentcateg;
        return this.state.areas.map(function(area, i) {
            return <Link to={"/category/" + mk + area.url}
                         key={i} className="list-group-item list-group-item-action">{area.name}</Link>
        });
    }

    render() {

        return (
            <div>
                <h3>Area list</h3>
                <div className="list-group">
                    {this.AreaList()}
                </div>
            </div>
        );
    }
}
export default AreaPage;