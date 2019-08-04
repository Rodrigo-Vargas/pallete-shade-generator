import React, { Component } from "react";

class BrightnessGraph extends Component {
    render() {
        let tableRows = [];
        let brightnessPoints = [];
        
        for(let i = 0; i < 9; i++)
        {
            let tableCells = [];

            for(let x = 0; x < 9; x++)
                tableCells.push(<td key={x}></td>);

            tableRows.push(<tr key={i}>{ tableCells }</tr>);
        }

        this.props.pallete.forEach((color, index) => {

            let brightnessPointStyle = {
                backgroundColor: color.hex,
                bottom: (color.brightness * 100) * 2.71 - 11 + "px",
                left: 50 + (index * 210 / this.props.pallete.length  ) + "px"
            };

            brightnessPoints.push(<div key={index} className="point" 
                                        style={brightnessPointStyle}
                                        brightness={ color.brightness }>


            </div>);
        });

        return(<div className="brightnessGraph">
                <table>
                    <tbody>
                        { tableRows }
                    </tbody>
                </table>

                <div className="points">
                    { brightnessPoints }
                </div>
            </div>);        
    }
}

export default BrightnessGraph;