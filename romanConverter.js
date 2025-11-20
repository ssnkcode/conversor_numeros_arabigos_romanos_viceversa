class RomanConverter {
    static arabicToRoman(arabic) {
        if (typeof arabic !== 'number' || !Number.isInteger(arabic) || arabic < 1 || arabic > 3999) {
            return null;
        }

        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

        let result = '';
        let num = arabic;

        for (let i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                result += symbols[i];
                num -= values[i];
            }
        }

        return result;
    }

    static romanToArabic(roman) {
        if (typeof roman !== 'string' || !roman) {
            return null;
        }

        // Validar formato romano válido
        const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        if (!validRomanRegex.test(roman.toUpperCase())) {
            return null;
        }

        const romanMap = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50,
            'C': 100, 'D': 500, 'M': 1000
        };

        let result = 0;
        const upperRoman = roman.toUpperCase();

        for (let i = 0; i < upperRoman.length; i++) {
            const current = romanMap[upperRoman[i]];
            const next = romanMap[upperRoman[i + 1]];

            if (next && current < next) {
                result += next - current;
                i++; // Saltar el siguiente carácter ya que fue procesado
            } else {
                result += current;
            }
        }

        // Validar que el resultado esté en el rango permitido
        return result >= 1 && result <= 3999 ? result : null;
    }

    static isValidArabic(number) {
        return typeof number === 'number' && 
               Number.isInteger(number) && 
               number >= 1 && 
               number <= 3999;
    }

    static isValidRoman(roman) {
        if (typeof roman !== 'string' || !roman) return false;
        
        const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        return validRomanRegex.test(roman.toUpperCase());
    }
}

module.exports = RomanConverter;
