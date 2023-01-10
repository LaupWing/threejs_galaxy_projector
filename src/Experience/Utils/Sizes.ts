import { EventEmitter } from "./EventEmitter"

export default class Sizes extends EventEmitter {
   width: number
   height: number
   pixel_ratio: number

   constructor(){
      super()
      this.width = window.innerWidth
      this.height = window.innerHeight
      // Cap the pixel ratio for mobile. In order to produce the same frame rate for each device
      this.pixel_ratio = Math.min(window.devicePixelRatio, 2)
      
      window.addEventListener("resize", () => {
         this.width = window.innerWidth
         this.height = window.innerHeight
         this.pixel_ratio = Math.min(window.devicePixelRatio, 2)

         this.trigger("resize")
      })
   }
}