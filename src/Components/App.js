import React, { Component } from "react";
import { hot } from "react-hot-loader";

import "../Styles/App.scss";

import colorConveterStore from "../Actions/ColorConveterStore";
import PalleteStore from "../Actions/PalleteStore";

import BrightnessGraph from "./BrightnessGraph";
import LightSaturationGraph from "./LightSaturationGraph";
import ComponentsShowcase from "./ComponentsShowcase";
import Pallete from "./Pallete";

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

        return (<div>
                    { palleteSize }
                    <input type="text" value={this.state.color} onChange={this.onColorChange}  />

                    <button onClick={this.onGenerateButtonClick}>Generate Pallete</button>

                    <Pallete pallete={ this.state.pallete } onPalleteColorStatChange={this.onPalleteColorStatChange}></Pallete>

                    <ComponentsShowcase pallete={ this.state.pallete }></ComponentsShowcase>

                    <LightSaturationGraph pallete={ this.state.pallete }></LightSaturationGraph>

                    <BrightnessGraph pallete={ this.state.pallete }></BrightnessGraph>
                </div> );
    }

}


export default hot(module)(App);