import React, { Component } from "react";

class ComponentsShowcase extends Component {

    render() {
        let boxStyle, paragraphStyle, titleStyle;

        if (this.props.pallete.length)
        {
            boxStyle = {
                backgroundColor: this.props.pallete[this.props.pallete.length - 1].hex,
                border: "1px solid " + this.props.pallete[ Math.trunc(this.props.pallete.length / 2) ].hex
            };
    
            paragraphStyle = {
                color: this.props.pallete[ Math.trunc(this.props.pallete.length / 2) ].hex
            };
    
            titleStyle = {
                color: this.props.pallete[0].hex
            };
        }

        return(
            <div className="componentsShowcase">
                <h2>Components Show Case</h2>

                <div className="box" style={boxStyle}>
                    <h4 style={titleStyle}>That is a title with darkest color</h4>
                    <p style={paragraphStyle}>This is a text with medium color. The background has the lightest color</p>
                </div>
            </div>

        );
    }
}

export default ComponentsShowcase;