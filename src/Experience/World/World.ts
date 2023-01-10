import Experience from "../Experience"
import * as THREE from "three"
import GenerateGalaxy from "./GenerateGalaxy/GenerateGalaxy"

export default class World {
   experience: Experience
   scene: THREE.Scene

   constructor(experience: Experience){
      this.experience = experience
      this.scene = experience.scene

      new GenerateGalaxy(1000, this.experience)
   }
}