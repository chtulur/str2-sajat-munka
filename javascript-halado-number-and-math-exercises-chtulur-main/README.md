# Feladatok

**Az 05-number-and-math mappán belül kell dolgoznod!**  
**A HTML-fájlokat ne módosítsd!**  
**Az export utasításokat hagyd a fájlok végén!**  
**Az `npm run test:number` parancs futtatásával tudod futtatni a teszteket!**

1. Írj egy függvényt `summarize` néven, amely a paraméterként kapott tetszőleges darabszámú, tetszőleges méretű egész számot összeadja, és visszatér az összeadás végeredményével!

Amennyiben bármelyik részeredmény meghaladja a biztonságos tartományt (safeInteger), automatikusan konvertáljad `BigInt`-be, és természetesen a visszatérési érték is `BigInt` legyen!

2. Írj egy függvényt `numericConverter` néven, amely a paraméterként megadott tízes számrendszerbeli számot átkonvertálja kettes, nyolcas és tizenhatos számrendszerbe is! Ezeket az értékeket pedig egy objectben adja vissza! A property-k neve legyen: `binary`, `octal`, `hexa`.
