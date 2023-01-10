import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import * as THREE from "three"
import Camera from "./Camera"
import Renderer from "./Renderer"
import World from "./World/World"

export default class Experience {
   canvas: HTMLCanvasElement
   sizes: Sizes
   time: Time
   scene: THREE.Scene
   camera: Camera
   renderer: Renderer
   world: World

   constructor(canvas:HTMLCanvasElement){
      this.canvas = canvas
      this.sizes = new Sizes()
      this.time = new Time()
      this.scene = new THREE.Scene()
      this.camera = new Camera(this)
      this.renderer = new Renderer(this)
      this.world = new World(this)

      this.sizes.on("resize", () =>{
         this.resize()
      })

      this.time.on("tick", () =>{
         this.update()
      })
   }

   resize(){
      this.camera.resize()
      this.renderer.resize()
   }

   update() {
      this.camera.update()
      this.renderer.update()
   }
}