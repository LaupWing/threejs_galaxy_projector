import Experience from "../Experience"
import * as THREE from "three"

export default class World {
   experience: Experience
   scene: THREE.Scene

   constructor(experience: Experience){
      this.experience = experience
      this.scene = experience.scene
   }
}