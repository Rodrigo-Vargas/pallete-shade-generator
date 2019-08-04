import React, { Component } from "react";

class LightSaturationGraph extends Component {

    render() {        
        let points = [];

        this.props.pallete.forEach((color, index) => {
            let pointStyle = {
                backgroundColor: color.hex,
                bottom: (color.hsl.saturation) * 2.71 - 11 + "px",
                left: (color.hsl.lightness) * 2.71 - 11 + "px"
            };

            points.push(<div key={index} className="point" style={pointStyle}></div> );            
        });

        let tableRows = [];
        
        for(let i = 0; i < 9; i++)
        {
            let tableCells = [];

            for(let x = 0; x < 9; x++)
                tableCells.push(<td key={x}></td>);

            tableRows.push(<tr key={i}>{ tableCells }</tr>);
        }
        
        return(<div className="lightSaturationGraph">
                    <table>
                        <tbody>
                            { tableRows }
                        </tbody>
                    </table>
                    <div className="points">
                        { points }
                    </div>
                </div>
        );                
    }
}

export default LightSaturationGraph;