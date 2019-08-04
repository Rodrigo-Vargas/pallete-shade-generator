import ColorConveterStore from "./ColorConveterStore";

class PalleteStore {
    generate(hexCode, numberOfShades) {
        let pallete = [];

        let hslColor = ColorConveterStore.HexToHSL(hexCode);
        
        let sideNumber = Math.trunc(numberOfShades / 2);

        // Generate darker shades
        for (let i = 0; i < sideNumber; i++)
        {
            let saturation, lightness;

            if (i == 0)
            {
                saturation = 100;
                lightness = 10;
            }
            else
            {
                saturation = hslColor.saturation  + (100 - hslColor.saturation) / sideNumber * (sideNumber - i);
                lightness = hslColor.lightness - ( -(10 - hslColor.lightness) / sideNumber ) * (sideNumber - i);
            }

            let newColorHex = ColorConveterStore.HSLToHex(hslColor.hue, saturation, lightness);

            pallete.push({
                brightness : this.getColorBrightness(newColorHex),
                hex: newColorHex,
                hsl: {
                    hue: hslColor.hue,
                    saturation: saturation,
                    lightness: lightness.toFixed("0")
                }
            });
        }

        pallete.push({
            brightness : this.getColorBrightness(hexCode),
            hex: hexCode,
            hsl: hslColor
        });

        // Generate lighter shades
        for (let i = sideNumber - 1; i >= 0; i--)
        {
            let saturation, lightness;

            if (i == 0)
            {
                saturation = 100;
                lightness = 90;
            }
            else
            {
                saturation = hslColor.saturation  + (100 - hslColor.saturation) / sideNumber * (sideNumber - i);
                lightness = hslColor.lightness + ( (90 - hslColor.lightness) / sideNumber ) * (sideNumber - i);
            }

            let newColorHex = ColorConveterStore.HSLToHex(hslColor.hue, saturation, lightness);

            pallete.push({
                brightness : this.getColorBrightness(newColorHex),
                hex: newColorHex,
                hsl: {
                    hue: hslColor.hue,
                    saturation: saturation,
                    lightness: lightness.toFixed("0")
                }
            });
        }

        return pallete;
    }

    getColorBrightness(colorHex) {
        let rgbColor = ColorConveterStore.HexToRGB(colorHex);

        return Math.sqrt( 
            (0.299 * Math.pow(rgbColor.red, 2)) + 
            (0.587 * Math.pow(rgbColor.green, 2)) + 
            (0.114 * Math.pow(rgbColor.red, 2))
        ) / 255;
    }
}

export default new PalleteStore();