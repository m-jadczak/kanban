interface RGB {
    b: number;
    g: number;
    r: number;
}

function rgbToYIQ({ r, g, b }: RGB): number {
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

function hexToRgb(hex: string): RGB | undefined {
    if (!hex || hex === undefined || hex === '') {
        return undefined;
    }

    const result: RegExpExecArray | null =
          /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : undefined;
}

export default function contrast(colorHex: string | undefined,  color1:string | undefined, color2:string | undefined): string {
    const dark =color1 || '#000';
    const light = color2 || '#fff';

    if (colorHex === undefined) {
        return '#000';
    }

    const rgb: RGB | undefined = hexToRgb(colorHex);

    if (rgb === undefined) {
        return '#000';
    }
    return rgbToYIQ(rgb) >= 128 ? dark : light;
}


// Code By David Dal Busco, https://dev.to/daviddalbusco/generate-contrasting-text-for-your-random-background-color-g0m
