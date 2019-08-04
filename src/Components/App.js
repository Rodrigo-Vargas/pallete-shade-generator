import React, { Component } from "react";
import { hot } from "react-hot-loader";

import ColorConveterStore from "../Actions/ColorConveterStore";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "#35aceb",
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
        let hsl = ColorConveterStore.HexToHSL(this.state.color);

        let lighterColor = hsl.hue;
        let darkerColor = hsl;

        lighterColor.hue -= 20;
        darkerColor += 20;

        let hexLighterColor = ColorConveterStore.HSLToHex(lighterColor.hue, lighterColor.saturation, lighterColor.lightness);
        let hexDarkerColor = ColorConveterStore.HSLToHex(darkerColor.hue, darkerColor.saturation, darkerColor.lightness);

        this.setState({
            pallete: [
                hexLighterColor,
                this.state.color,
                darkerColor
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