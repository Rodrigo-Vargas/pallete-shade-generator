import React, { Component } from "react";

class Pallete extends Component {
    render(){
        let pallete = [];

        this.props.pallete.forEach((color, index) => {
            let colorStyle = { 
                backgroundColor: color.hex
            };
            pallete.push(
                        <div key={index} className="square" style={colorStyle}>
                            <span className="colorHexDisplay">{ color.hex }</span>
                            <span className="colorHexDisplay">{ color.brightness.toFixed("2") }</span>
                            <input type="number" className="form-control" value={color.hsl.hue}        onChange={ (e) => this.props.onPalleteColorStatChange(color, "hue", e) } />
                            <input type="number" className="form-control" value={color.hsl.saturation} onChange={ (e) => this.props.onPalleteColorStatChange(color, "saturation", e) } />
                            <input type="number" className="form-control" value={color.hsl.lightness}  onChange={ (e) => this.props.onPalleteColorStatChange(color, "lightness", e) } />                                
                        </div>
            );
        });

        return( <div className="pallete">
                    {pallete}
                </div>
        );
    }

}

export default Pallete;