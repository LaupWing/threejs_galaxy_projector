import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import * as THREE from "three"
import Camera from "./Camera"
import Renderer from "./Renderer"

export default class Experience {
   canvas: HTMLCanvasElement
   sizes: Sizes
   time: Time
   scene: THREE.Scene
   camera: Camera
   renderer: Renderer

   constructor(canvas:HTMLCanvasElement){
      this.canvas = canvas
      this.sizes = new Sizes()
      this.time = new Time()
      this.scene = new THREE.Scene()
      this.camera = new Camera(this)
      this.renderer = new Renderer(this)
   }
}