import Jatekter from "./Jatekter.js";
console.log("valami");
QUnit.module(
  "játéktér ellenőrzés metódusaihoz tartozó tagfüggvények létezésének ellenőrzése tesztelése",

  function (hooks) {
    let jatekter;
    hooks.before(() => {
      //itt állíthatjuk be azokat a változókat, melyeket minden teszteset előtt le akarunk
      jatekter = new Jatekter();
    });

    QUnit.test("ellenőrzés létezik-e?", function (assert) {
      assert.ok(jatekter.ellenorzes, "létezik az ellenőrzés metódus");
    });

    /*
        üres tábla
        csak x
        csak o       
        */

    QUnit.test("Üres lista", function (assert) {
      jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      assert.equal(jatekter.ellenorzes(), "   @   @   @");
    });

    QUnit.test("Csak x", function (assert) {
      jatekter.lista = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];
      assert.equal(jatekter.ellenorzes(), "XXX@XXX@XXX@");
    });

    QUnit.test("Csak x", function (assert) {
      jatekter.lista = ["O", "O", "O", "O", "O", "O", "O", "O", "O"];
      assert.equal(jatekter.ellenorzes(), "OOO@OOO@OOO@");
    });
  });

QUnit.module("játéktér getVízszintes metódus tesztelése"),
  function (hooks) {
    let jatekter;
    hooks.before(() => {
      //itt állíthatjuk be azokat a változókat, melyeket minden teszteset előtt le akarunk
      jatekter = new Jatekter();
    });

    /*
        üres tábla
        egymás mellett 3 x
        egymás mellett 3 o
        egymás mellett 3 space
        véletlen elrendezés, de nincs nyerés
        minden ki van töltve, de nincs nyerés
        minden ki van töltve, de van nyerés
        az utolsó oszlopban és a következő sor elején van 2 elem        
        */

    QUnit.test("Üres lista", function (assert) {
      jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      assert.equal(jatekter.getVizszintes(), "   @   @   @");
    });
    QUnit.test("X győzelem?", function (assert) {
      jatekter.lista = ["X", "X", "X", " ", " ", " ", " ", " ", " "];
      assert.equal(jatekter.getVizszintes(), "XXX@   @   @");
    });
    QUnit.test("O győzelem?", function (assert) {
      jatekter.lista = ["O", "O", "O", " ", " ", " ", " ", " ", " "];
      assert.equal(jatekter.getVizszintes(), "OOO@   @   @");
    });
    QUnit.test("egymás mellett 3 space?", function (assert) {
      jatekter.lista = ["O", "X", "O", " ", " ", " ", "X", " ", " "];
      assert.equal(jatekter.getVizszintes(), "OXO@   @X  @");
    });
    QUnit.test("véletlen elrendezés, de nincs nyerés?", function (assert) {
      jatekter.lista = ["O", "X", " ", "O", "O", " ", "O", " ", " "];
      assert.equal(jatekter.getVizszintes(), "OX @O O@O  @");
    });
    QUnit.test("minden ki van töltve, de nincs nyerés?", function (assert) {
      jatekter.lista = ["O", "X", "O", "O", "X", "O", "O", "O", "X"]; //vízszintesen bár van nyerés, de az itt nem számít!
      assert.equal(jatekter.getVizszintes(), "OXO@OXO@OOX@");
    });
    QUnit.test("minden ki van töltve, de van nyerés?", function (assert) {
      jatekter.lista = ["O", "O", "O", "O", "X", "O", "X", "O", "X"];
      assert.equal(jatekter.getVizszintes(), "OOO@OXO@XOX@");
    });
    QUnit.test(
      "az utolsó oszlopban és a következő sor elején van 2 elem?",
      function (assert) {
        jatekter.lista = [" ", " ", "X", "X", "X", " ", " ", " ", " "];
        assert.equal(jatekter.getVizszintes(), "  X@XX @   @");
      }
    );
  };

QUnit.module("játéktér getFüggőleges metódus tesztelése"),
  function (hooks) {
    let jatekter;
    hooks.before(() => {
      //itt állíthatjuk be azokat a változókat, melyeket minden teszteset előtt le akarunk
      jatekter = new Jatekter();
    });

    /*
        üres tábla
        egymás alatt 3 x
        egymás alatt 3 o
        egymás alatt 3 space
        véletlen elrendezés, de nincs nyerés
        minden ki van töltve, de nincs nyerés
        minden ki van töltve, de van nyerés
        az utolsó oszlopban és a következő sor elején van 2 elem        
        */

    QUnit.test("Üres lista", function (assert) {
      jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      assert.equal(jatekter.getFuggoleges(), "   @   @   @");
    });
    QUnit.test("X győzelem?", function (assert) {
      jatekter.lista = ["X", "X", "X", "X", " ", " ", "X", " ", " "];
      assert.equal(jatekter.getFuggoleges(), "XXX@X  @X  @");
    });
    QUnit.test("O győzelem?", function (assert) {
      jatekter.lista = [" ", "O", "O", " ", "O", " ", " ", "O", " "];
      assert.equal(jatekter.getFuggoleges(), " OO@ O @ O @");
    });
    QUnit.test("egymás alatt 3 space?", function (assert) {
      jatekter.lista = [" ", "X", "O", " ", "O", " ", " ", "X", "O"];
      assert.equal(jatekter.getFuggoleges(), " XO@ O @ XO@");
    });
    QUnit.test("véletlen elrendezés, de nincs nyerés?", function (assert) {
      jatekter.lista = ["O", "O", "O", " ", "O", " ", "X", " ", " "];
      assert.equal(jatekter.getFuggoleges(), "OOO@ O @X  @");
    });
    QUnit.test("minden ki van töltve, de nincs nyerés?", function (assert) {
      jatekter.lista = ["X", "X", "X", "O", "X", "O", "X", "O", "X"];
      assert.equal(jatekter.getFuggoleges(), "XXX@OXO@XOX@");
    });
    QUnit.test("minden ki van töltve, de van nyerés?", function (assert) {
      jatekter.lista = ["O", "O", "X", "O", "X", "X", "X", "O", "X"];
      assert.equal(jatekter.getFuggoleges(), "OOX@OXX@XOX@");
    });
    QUnit.test(
      "az utolsó oszlopban és a következő sor elején van 2 elem?",
      function (assert) {
        jatekter.lista = [" ", " ", "X", "X", "X", " ", " ", " ", " "];
        assert.equal(jatekter.getFuggoleges(), "  X@XX @   @");
      }
    );
  };

QUnit.module("játéktér getAtlo metódus tesztelése"),
  function (hooks) {
    let jatekter;
    hooks.before(() => {
      //itt állíthatjuk be azokat a változókat, melyeket minden teszteset előtt le akarunk
      jatekter = new Jatekter();
    });

    /*
        üres tábla
        átlóban 3 x
        átlóban 3 o
        átlóban 3 space
        véletlen elrendezés, de nincs nyerés
        minden ki van töltve, de nincs nyerés
        minden ki van töltve, de van nyerés
        az utolsó oszlopban és a következő sor elején van 2 elem        
        */

    QUnit.test("Üres lista", function (assert) {
      jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      assert.equal(jatekter.getAtlo(), "   @   @   @");
    });
    QUnit.test("X győzelem?", function (assert) {
      jatekter.lista = ["X", " ", " ", " ", "X", " ", " ", " ", "X"];
      assert.equal(jatekter.getAtlo(), "X  @ X @  X@");
    });
    QUnit.test("O győzelem?", function (assert) {
      jatekter.lista = ["Q", " ", " ", " ", "O", " ", " ", " ", "O"];
      assert.equal(jatekter.getAtlo(), "O  @ O @  O@");
    });
    QUnit.test("átlósan 3 space?", function (assert) {
      jatekter.lista = [" ", "X", "O", "X", " ", "O", "X", "O", " "];
      assert.equal(jatekter.getAtlo(), " XO@X O@XO @");
    });
    QUnit.test("véletlen elrendezés, de nincs nyerés?", function (assert) {
      jatekter.lista = ["O", "O", "O", " ", "O", " ", "X", " ", " "];
      assert.equal(jatekter.getAtlo(), "OOO@ O @X  @");
    });
    QUnit.test("minden ki van töltve, de nincs nyerés?", function (assert) {
      jatekter.lista = ["X", "X", "X", "O", "X", "O", "X", "O", "X"];
      assert.equal(jatekter.getAtlo(), "XXX@XOX@OOX@");
    });
    QUnit.test("minden ki van töltve, de van nyerés?", function (assert) {
      jatekter.lista = ["O", "O", "X", "O", "X", "X", "X", "O", "O"];
      assert.equal(jatekter.getAtlo(), "OOX@OXX@XOO@");
    });
  };
