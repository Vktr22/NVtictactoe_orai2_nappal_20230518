/**megjelenít egyetlen elemet */
class Elem {
  #index;
  constructor( index,szuloElem) {
    this.#index = index;
    szuloElem.append("<div class='elem'><p></p></div>");
    //megfogom a html elemeket
    this.divElem = $("article div:last-child");
                                                  //csinál egy "fogóckodót" az adott div elemen bellül a p elemhez, h tudjunk vele dolgozni. itt a kattintást akarjuk megfogni
    // this.pElem = this.divElem.children("p");
    this.pElem = $("article div:last-child p");

    this.divElem.on("click", () => {      //ekkor váltódik ki a kattintás trigger
      //this.setElem("X");
    
      //létrehozunk egy saját eseményt : elemKattintas
      this.kattintasTrigger()
    });
  }
  getIndex() {
    return this.#index;
  }
  setElem(adat) {
    this.pElem.html(adat);    //itt akarjuk módosítani a p elemet
  }
  setSzin(szin){
    this.divElem.css("background-color", szin)
    this.divElem.addClass("szegely")
  }

  kattintasTrigger() {
//létrehozza a saját eseményünket
    const esemeny=new CustomEvent("elemKattintas", {detail:this}) //két paramétert így adok át pl: {detail:(id:this.#index, pelem: pElem)}
    window.dispatchEvent(esemeny)   //itt azt tudod megmondani, h az esemény mire vonatkozzon (itt az ablakra)

  }
}

export default Elem;
