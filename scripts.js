const ubicaImg = [
    {img:"1.jpeg",descripcion:"astronauta deadspace la ostia"},
    {img:"2.jpeg",descripcion:"scaneo de rutina 2077"},
    {img:"3.jpeg",descripcion:"caracas/petare 12:33pm 2077"},
    {img:"4.jpeg",descripcion:"guarico/san juan 02:22am 2077"},
    {img:"5.jpeg",descripcion:"SBR Chronos 2077"},
    {img:"6.jpeg",descripcion:"Primera cita 2077"},
    {img:"7.jpeg",descripcion:"eliminacion de malware pirata"},
    {img:"8.jpeg",descripcion:"patriarcado 2077"},
    {img:"9.jpeg",descripcion:"ojo bionico/modelo chronos 2077"},
    {img:"10.jpeg",descripcion:"jonh wick 2077"},
    {img:"11.jpeg",descripcion:"ella me dejo 2077"},
    {img:"12.jpeg",descripcion:"yamaha chronos 2077"},
    {img:"13.jpeg",descripcion:"aragua/maracay 01:33am 2077"},
    {img:"14.jpeg",descripcion:"new game DeadSpace 20077"},
    {img:"15.jpeg",descripcion:"michi 2077"},
]


class Carrusel {
    constructor(contenedor,ubicaImg,tmp){
        this.contenedor = document.querySelector(`.${contenedor}`)
        this.ubicaImg = ubicaImg
        this.tmp = tmp
        this.clone = null
        this.ctdImg = []
        this.contenedorSlideTrack = []
        this.Artefactos = null
        this.slider = document.querySelector(".slider")
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
                this.contenedorImg.id = `contenedorImg${i+1}`
                this.contenedorImg.className = "slide"
                this.imagen = this.tmp.content.firstElementChild.cloneNode(true)
                this.imagen.src = `./img/${e.img}`
                this.imagen.alt = `imagen ${e.img}`
                this.imagen.title = e.descripcion
                this.imagen.id = this.generarId()
                this.imagen.className = i+1
                this.contenedorImg.appendChild(this.imagen)
                this.slideTrack.appendChild(this.contenedorImg)
                this.ctdImg.push(this.imagen)
              })
            }
        this.fragment.appendChild(this.slideTrack)
        this.slider.appendChild(this.fragment)
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
          img.parentElement.draggable = true;
          img.parentElement.addEventListener("dragstart", event =>{
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
        let imagenes = carruselOrigen.getElementsByClassName(elemento.className)
        const carruselDestino = event.currentTarget;
        let cantidadElementosD = carruselDestino.querySelectorAll(".slide")
        let cantidadElementosO = carruselOrigen.querySelectorAll(".slide")

        
        for (let i = 0; i < imagenes.length; i++) {
          let imagen = imagenes[i];
          if (carruselOrigen !== carruselDestino) {
              carruselDestino.appendChild(imagen.parentElement);
              this.setProperty(carruselDestino,cantidadElementosD.length + 2)
              this.setProperty(carruselOrigen,cantidadElementosO.length - 2)
            }
        }
        
      }
    }
    

    // aggSortable(){
    //     this.contenedorSlideTrack.forEach(elemento=>{
    //         Sortable.create(elemento, {
    //             animation: 150,
    //             group: "listGroup"
    //           });
    //     })
    // }
    




function init(Artefactos,reverse = false){
    const tmp = document.querySelector("#tmp")
    const carrusel = new Carrusel("contenedor",Artefactos,tmp)
    carrusel.createCarrusel(Artefactos)
    carrusel.createCarrusel(Artefactos,true)
    // carrusel.aggSortable()
    
}
const carrusel1 = init(ubicaImg,)

