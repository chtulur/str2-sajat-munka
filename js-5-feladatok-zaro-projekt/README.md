Frontend
Az alkalmazás egy SPA (Single Page Application), tehát csak egy oldalad legyen. Mindenképp több modult használj!

A megvalósítandó funkciók a következők:

Az alkalmazás jelenítse meg egy táblázatban a felhasználók adatait. Mindegyik oszlopban legyen egy Szerkesztés és egy Törlés gomb is.

A Törlés gombra kattintva azonnal, megerősítés nélkül törlődjön ki az adott user adata a szerverről, és kerüljön eltávolításra a DOM-ból is.

A Szerkesztés gombra kattintva a user adatai az id kivételével módosíthatók lesznek a táblázaton belül. Egyszerű text inputmezőket használj. A Szerkesztés gombra kattintás után ez a gomb eltűnik, ugyanúgy, mint a Törlés gomb, helyette egy Mentés és Visszavonás gomb jelenjen meg.

A Mentés gombra kattintva validálni kell a beírt adatokat.
A validáláshoz reguláris kifejezéseket használj.
Amennyiben a beírt adatok nem validak, egy hibaüzenetet kell megjeleníteni, amely 5 másodperc után eltűnik.
Amennyiben az adatok validak, mind az adatbázisban, mind a DOM-ban kerüljenek mentésre. Ebben az esetben is meg kell jeleníteni egy üzenetet, amely 5 másodpercig látszódik.
Egyszerre több üzenet is látszódhat.
A hibáról és a sikeres módosításról szóló üzenetek dizájn alapján is legyenek megkülönböztethetők. A mentés után ne lehessen tovább szerkeszteni az adatokat.
Amíg egy user adatai szerkesztés alatt állnak, ne lehessen más user adatait szerkeszteni, sem törölni. Amennyiben valaki mégis rákattint valamelyik másik Törlés vagy Szerkesztés gombra, jelenlen meg 5 másodpercre az alábbi hibaüzenet: “Először be kell fejezned az aktuális szerkesztést”!

A Visszavonás gombra kattintva a user eredeti, tehát a szerkesztés előtti adatai íródjanak vissza. Újra a Szerkesztés és Törlés gomb látszódjon.

Legyen lehetőség új felhasználók létrehozására. Ehhez egy formot kell készíteni.

Új felhasználók adatainak felvitelekor legyen validálás. Itt ugyanazok a szabályok érvényesek, és ugyanúgy kell az üzeneteket is megjeleníteni, mint a szerkesztéskor.

Sikeres mentés esetén a felhasználó adatai jelenjenek meg a táblázat tetején. Innen kezdve szerkeszthető, törölhető az új user is.

Bónuszok
Ahol lehet, használj object destructuring-ot
Az adatok lekérése az inputokból dynamic properties segítségével történjen
Real-time validálás legyen, és jelezd is a felhasználó felé (pl. input border color-rel és a hibaüzenet megjelenítésével), hogy mikor valid, mikor nem valid a mező
Figyelj oda az accessibility-re, minimum annyit tegyél meg, hogy ahol click esemény működik, ott az Enter billentyűleütés is működjön
A hibaüzenetek legyenek kiszervezve, például egy JSON-fájlba, így többnyelvűvé teheted az alkalmazást. Készíts külön JSON-fájlt a magyar és (például) az angol nyelvhez. A felhasználó a menüben válassza ki, hogy melyik nyelvet szeretné használni, ez legyen localStorage-ban tárolva, és az ennek megfelelő JSON-fájlt használd
A form szerializálására írj egy új helper function-t
Használd az axios-t a natív fetch API helyett
