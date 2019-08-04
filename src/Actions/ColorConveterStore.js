class ColorConveterStore {
    HexToHSL(hexColor) {
        let rgbCode = this.HexToRGB(hexColor);

        rgbCode.red /= 255;
        rgbCode.green /= 255;
        rgbCode.blue /= 255;
      
        let cmin = Math.min(rgbCode.red, rgbCode.green, rgbCode.blue),
            cmax = Math.max(rgbCode.red, rgbCode.green, rgbCode.blue),
            delta = cmax - cmin,
            saturation = 0,
            lightness = 0;       

        let hue = this.calculateHue(rgbCode, delta, cmax);

        lightness = (cmax + cmin) / 2;

        if (delta == 0)
            saturation = 0;
        else if (lightness < 0.5)
            saturation = (cmax - cmin) / (cmax + cmin);
        else
            saturation = (cmax - cmin) / (2 - cmax - cmin);
        
        saturation = +(saturation * 100).toFixed(1);
        lightness = +(lightness * 100).toFixed(0);
            
        return {
            hue: hue,
            lightness: lightness,
            saturation: saturation
        };
    }

    calculateHue(rgbCode, delta, cmax) {
        let hue = 0;

        if (delta == 0)
            hue = 0;
        else if (cmax == rgbCode.red)
            hue = ((rgbCode.green - rgbCode.blue) / delta) % 6;
        else if (cmax == rgbCode.green)
            hue = (rgbCode.blue - rgbCode.red) / delta + 2;
        else
            hue = (rgbCode.red - rgbCode.green) / delta + 4;

        hue = Math.round(hue * 60);
        
        if (hue < 0)
            hue += 360;

        return hue;
    }

    HexToRGB(hexColor) {
        let red = 0, green = 0, blue = 0;

        if (hexColor.length === 4) {
            red =   parseInt(hexColor[1] + hexColor[1], 16);
            green = parseInt(hexColor[2] + hexColor[2], 16);
            blue =  parseInt(hexColor[3] + hexColor[3], 16);
        } else if (hexColor.length == 7) {
            red = parseInt(hexColor[1] + hexColor[2], 16);
            green = parseInt(hexColor[3] + hexColor[4], 16);
            blue = parseInt(hexColor[5] + hexColor[6], 16);
        }

        return {
            red: red,
            green: green,
            blue: blue
        };
    }    

    HSLToHex(h,s,l) {
        s /= 100;
        l /= 100;
      
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0,
            b = 0;
      
        if (0 <= h && h < 60) {
          r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
          r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
          r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
          r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
          r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
          r = c; g = 0; b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);
      
        // Prepend 0s, if necessary
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
      
        return "#" + r + g + b;
    }
}

const colorConveterStore = new ColorConveterStore();
export default colorConveterStore;