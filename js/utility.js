export function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min
}

export function hexToRGB(hex, returnType, opacity) {
    const newHex = hex.slice(1, hex.length);
    if (returnType) {
        if (returnType === 'obj') {
            return {
                r: parseInt(newHex.slice(0, 2), 16),
                g: parseInt(newHex.slice(2, 4), 16),
                b: parseInt(newHex.slice(4, 6), 16),
            }
        }
        if (returnType === 'str') {
            if (opacity)
                return `rgba(${parseInt(newHex.slice(0, 2), 16)},${parseInt(newHex.slice(2, 4), 16)},${parseInt(newHex.slice(4, 6), 16)},${opacity})`
            else
                return `rgb(${parseInt(newHex.slice(0, 2), 16)},${parseInt(newHex.slice(2, 4), 16)},${parseInt(newHex.slice(4, 6), 16)})`
        }
    }

    return [parseInt(newHex.slice(0, 2), 16), parseInt(newHex.slice(2, 4), 16), parseInt(newHex.slice(4, 6), 16)];
}