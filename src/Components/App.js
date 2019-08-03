import React, { Component } from "react";
import { hot } from "react-hot-loader";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "",
            pallete: []
        };

        this.onColorChange = this.onColorChange.bind(this);
        this.onGenerateButtonClick = this.onGenerateButtonClick.bind(this);
    }

    onColorChange() {
        this.setState({
            color: event.target.value
        });
    }

    onGenerateButtonClick() {
        this.generatePallete();
    }

    generatePallete() {
        this.setState({
            pallete: [
                "#b9e2f8",
                "#8bcff4",
                "#5dbcef"
            ]
        });
    }

    render() {
        let pallete = [];

        this.state.pallete.forEach(color => {
            let colorStyle = { 
                backgroundColor: color, 
                display: "block",
                height: "30px",
                width: "30px"
            };
            pallete.push(<div className="square" style={colorStyle}></div>);
        });

        return (<div>
                    <input type="text" value={this.state.color} onChange={this.onColorChange}  />
                    <button onClick={this.onGenerateButtonClick}>Generate Pallete</button>

                    <div className="pallete">
                        {pallete}
                    </div>
                </div> );
    }

}


export default hot(module)(App);