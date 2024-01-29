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
        this.fragment = document.createDocumentFragment()
        this.ctdImg = []
    }
    setClone(templade){
        this.clone = templade.content.firstElementChild.cloneNode(true)
        this.slideTrack = this.clone.querySelector(".slide-track")
        this.fragment.appendChild(this.clone)
        this.contenedor.appendChild(this.fragment)
    }
    CreateElementoCarrusel(i,img,reverse){
        let contenedorImg = document.createElement("div")
        contenedorImg.id = `contenedorImg${i}`
        contenedorImg.className = "slide"
        if (reverse) {
            this.slideTrack.style.animation = "scroll2 50s linear infinite"
        }
        let imagen = document.createElement("img")
        imagen.src = `./img/${img.img}`
        imagen.alt = `imagen ${img.img}`
        contenedorImg.appendChild(imagen)

        this.slideTrack.appendChild(contenedorImg)
        this.ctdImg.push(contenedorImg)

    }
    // agregando el drag and drop
    aggSortable(){
        Sortable.create(this.slideTrack, {
            animation: 150,
            group: "listGroup"
          });
    }
    

   

 
}


function init(Artefactos,reverse = false){
    const tmp = document.querySelector("#tmp")
    const carrusel = new Carrusel("contenedor",Artefactos)
    carrusel.setClone(tmp)
    Artefactos.forEach(async (img,i) => {
        await carrusel.CreateElementoCarrusel(i+1,img,reverse)
        carrusel.CreateElementoCarrusel(i+1,img,reverse)
    });
    // agg Sortable
    carrusel.aggSortable()

}
init(ubicaImg,)
init(ubicaImg,true)
init(ubicaImg,)
