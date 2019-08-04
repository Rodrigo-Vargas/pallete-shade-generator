import React, { Component } from "react";
import { hot } from "react-hot-loader";

import "../Styles/App.scss";

import colorConveterStore from "../Actions/ColorConveterStore";
import PalleteStore from "../Actions/PalleteStore";

import BrightnessGraph from "./BrightnessGraph";
import LightSaturationGraph from "./LightSaturationGraph";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: "#35aceb",
            pallete: [],
            palleteSize: 3
        };

        this.onColorChange = this.onColorChange.bind(this);
        this.onGenerateButtonClick = this.onGenerateButtonClick.bind(this);
        this.onPalleteColorStatChange = this.onPalleteColorStatChange.bind(this);
        this.onPalleteSizeChanged = this.onPalleteSizeChanged.bind(this);
    }

    onColorChange() {
        this.setState({
            color: event.target.value
        });
    }

    onPalleteColorStatChange(color, property, event) {
        var pallete = this.state.pallete;

        pallete.forEach(palleteColor => {
            if (palleteColor.hex == color.hex)
            {
                switch(property)
                {
                    case "saturation":
                    {
                        palleteColor.hsl.saturation = event.target.value;
                        break;
                    }

                    case "lightness":
                    {
                        palleteColor.hsl.lightness = event.target.value;
                        break;
                    }

                    case "hue":
                    {
                        palleteColor.hsl.hue = event.target.value;
                        break;
                    }
                }

                palleteColor.hex = colorConveterStore.HSLToHex(
                    palleteColor.hsl.hue, 
                    palleteColor.hsl.saturation, 
                    palleteColor.hsl.lightness
                );

                palleteColor.brightness = PalleteStore.getColorBrightness(palleteColor.hex);
            }
                
        });

        this.setState({
            pallete : pallete
        });
    }

    onGenerateButtonClick() {
        this.generatePallete();
    }

    onPalleteSizeChanged() {
        this.setState({
            palleteSize: event.target.value
        });
    }

    generatePallete() {
        let pallete = PalleteStore.generate(this.state.color, this.state.palleteSize);

        this.setState({
            pallete: pallete
        });
    }

    render() {
        let boxStyle, paragraphStyle, titleStyle;
        let pallete = [];

        this.state.pallete.forEach((color, index) => {
            let colorStyle = { 
                backgroundColor: color.hex
            };
            pallete.push(
                            <div key={index} className="square" style={colorStyle}>
                                <span className="colorHexDisplay">{ color.hex }</span>
                                <span className="colorHexDisplay">{ color.brightness.toFixed("2") }</span>
                                <input type="number" className="form-control" value={color.hsl.hue}        onChange={ (e) => this.onPalleteColorStatChange(color, "hue", e) } />
                                <input type="number" className="form-control" value={color.hsl.saturation} onChange={ (e) => this.onPalleteColorStatChange(color, "saturation", e) } />
                                <input type="number" className="form-control" value={color.hsl.lightness}  onChange={ (e) => this.onPalleteColorStatChange(color, "lightness", e) } />                                
                            </div>
            );
        });

        let availablePalleteSizes = [3, 5, 7, 9];

        let palleteSize = availablePalleteSizes.map((size, index) => {
            return (
                <div key={index}>
                    <label htmlFor="">{ size }</label>
                    <input type="radio" checked={this.state.palleteSize == size }
                                        onChange={ this.onPalleteSizeChanged }
                                        value={ size }/>
                </div>
            );
        })

        if (this.state.pallete.length)
        {
            boxStyle = {
                backgroundColor: this.state.pallete[this.state.pallete.length - 1].hex,
                border: "1px solid " + this.state.pallete[ Math.trunc(this.state.pallete.length / 2) ].hex
            };
    
            paragraphStyle = {
                color: this.state.pallete[ Math.trunc(this.state.pallete.length / 2) ].hex
            };
    
            titleStyle = {
                color: this.state.pallete[0].hex
            };
        }

        return (<div>

                    { palleteSize }
                    <input type="text" value={this.state.color} onChange={this.onColorChange}  />

                    <button onClick={this.onGenerateButtonClick}>Generate Pallete</button>

                    <div className="pallete">
                        {pallete}
                    </div>

                    <div className="testArea">
                        <h2>Test Area</h2>

                        <div className="box" style={boxStyle}>
                            <h4 style={titleStyle}>That is a title with darkest color</h4>
                            <p style={paragraphStyle}>This is a text with medium color. The background has the lightest color</p>
                        </div>
                    </div>

                    <LightSaturationGraph pallete={ this.state.pallete }></LightSaturationGraph>

                    <BrightnessGraph pallete={ this.state.pallete }></BrightnessGraph>
                </div> );
    }

}


export default hot(module)(App);