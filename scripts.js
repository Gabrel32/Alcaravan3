const ubicaImg = [
    {img:"1.jpeg"},
    {img:"2.jpeg"},
    {img:"3.jpeg"},
    {img:"4.jpeg"},
    {img:"5.jpeg"},
    {img:"6.jpeg"},
    {img:"7.jpeg"},
    {img:"8.jpeg"},
    {img:"9.jpeg"},
    {img:"10.jpeg"},
    {img:"11.jpeg"},
    {img:"12.jpeg"},
    {img:"13.jpeg"},
    {img:"14.jpeg"},
    {img:"15.jpeg"},
    {img:"16.jpeg"}
]


class Carrusel {
    constructor(contenedor,ubicaImg){
        this.contenedor = document.querySelector(`.${contenedor}`)
        this.ubicaImg = ubicaImg
        this.clone = null
        this.ctdImg = []
        this.contenedorSlideTrack = []
        this.Artefactos = null
    }
    setClone(templade){
        this.clone = templade.content.firstElementChild.cloneNode(true)
    }
    createCarrusel(Artefactos,reverse = false){
        this.Artefactos = Artefactos
        this.CreateElementoCarrusel(reverse,2)
        
    }
    CreateElementoCarrusel(reverse,repetir){
        this.fragment = document.createDocumentFragment()
        this.slideTrack = document.createElement("div")
        this.slideTrack.className = "slide-track"
        this.slideTrack.id = this.generarId()
        this.setProperty(this.slideTrack,32)
           if (reverse) {
                    this.slideTrack.style.animation = `scroll2 40s linear infinite`
                }
        for (let a = 0; a < repetir; a++) {
            this.Artefactos.forEach((e,i)=>{
                this.contenedorImg = document.createElement(`div`)
                this.contenedorImg.id = `contenedorImg${i+1 + this.generarId()}`
                this.contenedorImg.className = "slide"
                let imagen = document.createElement("img")
                imagen.src = `./img/${e.img}`
                imagen.alt = `imagen ${e.img}`
                imagen.title = `imagen del carrusel numero"${e.img}`
                imagen.id = this.generarId()
                this.contenedorImg.appendChild(imagen)
                this.slideTrack.appendChild(this.contenedorImg)
                this.ctdImg.push(imagen)
              })
            }
        this.clone.appendChild(this.slideTrack)
        this.fragment.appendChild(this.clone)
        this.contenedor.appendChild(this.fragment)
        this.contenedorSlideTrack.push(this.slideTrack)
        this.addDragAndDrop()


    }
    generarId(){
      const ramdom = Math.random().toString(36).substring(2)
      const fecha = Date.now().toString(36)
  
      return ramdom + fecha
  }
    // agregando el drag and drop

    setProperty(contenedor = false,x = 0){
        contenedor.style.width = `${250 * x}`
        contenedor.style.setProperty("--scroll-distance", `${-250 * x / 2}px`);
    }


    addDragAndDrop() {
        this.ctdImg.forEach((img) => {
          img.parentNode.draggable = true;
          img.addEventListener("dragstart", event =>{
            this.dragStart(event)
          });
          this.slideTrack.addEventListener("dragover", event=>{
            this.dragOver(event)
          });
          this.slideTrack.addEventListener("drop", event=>{
            this.drop(event)
          });
        });
      }
    
      dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
      }
    
      dragOver(event) {
        event.preventDefault();
      }
    
      drop(event) {
        event.preventDefault();
        const elementoId = event.dataTransfer.getData("text/plain");
        const elemento = document.getElementById(elementoId);
        const carruselOrigen =  elemento.closest(".slide-track");
        const carruselDestino = event.currentTarget;
        let cantidadElementosD = carruselDestino.querySelectorAll(".slide")
        
        
        if (carruselOrigen !== carruselDestino) {
            carruselDestino.appendChild(elemento.parentElement);
            this.setProperty( carruselDestino,cantidadElementosD.length + 1)
            this.reordenarElementos(carruselDestino);            
          }
        
      }
      reordenarElementos(contenedor) {
        const elementos = Array.from(contenedor.getElementsByClassName("slide"));
        elementos.forEach((elemento, index) => {
            elemento.style.order = index + 1;
          });
      }
    }
    

    // aggSortable(){
    //     this.contenedorSlideTrack.forEach(e=>{
    //         Sortable.create(e, {
    //             animation: 150,
    //             group: "listGroup"
    //           });
    //     })
    // }
    




function init(Artefactos,reverse = false){
    const tmp = document.querySelector("#tmp")
    const carrusel = new Carrusel("contenedor",Artefactos)
    carrusel.setClone(tmp)
    carrusel.createCarrusel(Artefactos)
    carrusel.createCarrusel(Artefactos,true)
    // carrusel.aggSortable()
    
}
const carrusel1 = init(ubicaImg,)

