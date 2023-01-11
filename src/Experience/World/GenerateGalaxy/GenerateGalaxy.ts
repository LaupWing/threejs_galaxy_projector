import * as THREE from "three"
import Experience from "../../Experience"
import Debug from "../../Utils/Debug"

export default class GenerateGalaxy {
   amount: number
   geometry: THREE.BufferGeometry
   material: THREE.PointsMaterial
   scene: THREE.Scene
   debug: Debug
   randomness: number
   randomnessPower: number
   points?: THREE.Points
   radius: number
   branches: number
   spin: number
   size: number

   constructor(amount:number, experience: Experience){
      this.amount = amount
      this.size = 0.02
      this.radius = 5
      this.branches = 3
      this.randomness = 0.2
      this.randomnessPower = 3
      this.spin = 1
      this.geometry = new THREE.BufferGeometry()
      this.material = new THREE.PointsMaterial({
         size: this.size,
         sizeAttenuation: true,
         depthWrite: false,
         blending: THREE.AdditiveBlending
      })
      this.scene = experience.scene
      this.debug = experience.debug
      this.setDebug()
      this.generate()
   }

   setDebug(){
      if(this.debug.active){
         const debugFolder = this.debug.ui?.addFolder("galaxy")
         debugFolder?.add(this, "amount")
            .name("amount")
            .min(100)
            .max(100000)
            .step(100)
            .onFinishChange(this.generate.bind(this))
         debugFolder?.add(this, "size")
            .name("size")
            .min(0.001)
            .max(0.1)
            .step(0.001)
            .onFinishChange(this.generate.bind(this))
         debugFolder?.add(this, "radius")
            .name("radius")
            .min(0.01)
            .max(20)
            .step(0.01)
            .onFinishChange(this.generate.bind(this))
         debugFolder?.add(this, "branches")
            .name("branches")
            .min(2)
            .max(20)
            .step(1)
            .onFinishChange(this.generate.bind(this))
         debugFolder?.add(this, "spin")
            .name("spin")
            .min(-5)
            .max(5)
            .step(1)
            .onFinishChange(this.generate.bind(this))
         debugFolder?.add(this, "randomness")
            .name("randomness")
            .min(0)
            .max(2)
            .step(0.001)
            .onFinishChange(this.generate.bind(this))
         debugFolder?.add(this, "randomnessPower")
            .name("randomness")
            .min(1)
            .max(10)
            .step(0.001)
            .onFinishChange(this.generate.bind(this))
      }
   }

   generate(){
      if(this.points){
         this.geometry.dispose()
         this.material.dispose()
         this.scene.remove(this.points)
      }
      const positions = new Float32Array(this.amount * 3)
      
      const array = [...Array(this.amount)]
      array.forEach((_, i:number) => {
         const i3 = i * 3

         const radius = Math.random() * this.radius
         const spinAngle = radius * this.spin
         const branchAngle = (i % this.branches) / this.branches * Math.PI * 2

         const randomX = (Math.random() - 0.5) * this.randomness
         const randomY = (Math.random() - 0.5) * this.randomness
         const randomZ = (Math.random() - 0.5) * this.randomness

         positions[i3]     = Math.pow(Math.random(), this.randomnessPower)
         positions[i3 + 1] = Math.pow(Math.random(), this.randomnessPower)
         positions[i3 + 2] = Math.pow(Math.random(), this.randomnessPower)
      })
      this.material.size = this.size
      this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      this.points = new THREE.Points(this.geometry, this.material)
      this.scene.add(this.points)
   }
}