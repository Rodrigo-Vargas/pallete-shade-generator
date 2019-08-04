import { expect }  from "chai";
import ColorConveterStore from "../Actions/ColorConveterStore";

describe('Color Converter Store Testes', function () {
    it('Should convert HEX #FFF to RGB correctly', function () {
        let rgb = ColorConveterStore.HexToRGB("#ffffff");

        expect(rgb.red).equal(255);
        expect(rgb.green).equal(255);
        expect(rgb.blue).equal(255);
    });

    it('Should convert HEX #000 to RGB correctly', function () {
        let rgb = ColorConveterStore.HexToRGB("#000");

        expect(rgb.red).equal(0);
        expect(rgb.green).equal(0);
        expect(rgb.blue).equal(0);
    });

    it('Should convert HEX #FFF to RGB correctly', function () {
        let rgb = ColorConveterStore.HexToRGB("#35aceb");

        expect(rgb.red).equal(53);
        expect(rgb.green).equal(172);
        expect(rgb.blue).equal(235);
    });

    it('Should convert HEX #FFF to HSL correctly', function () {
        let hsl = ColorConveterStore.HexToHSL("#fff");

        expect(hsl.hue).equal(0);
        expect(hsl.lightness).equal(100);
        expect(hsl.saturation).equal(0);
    });

    it('Should convert HEX #35aceb to HSL correctly', function () {
        let hsl = ColorConveterStore.HexToHSL("#35aceb");

        expect(hsl.hue).equal(201);
        expect(hsl.saturation).equal(82);
        expect(hsl.lightness).equal(56);
    });
});