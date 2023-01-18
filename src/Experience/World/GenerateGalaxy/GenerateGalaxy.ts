import * as THREE from "three"
import Experience from "../../Experience"
import Debug from "../../Utils/Debug"

export default class GenerateGalaxy {
   amount: number
   geometry: THREE.BufferGeometry
   material: THREE.ShaderMaterial
   scene: THREE.Scene
   debug: Debug
   randomness: number
   randomnessPower: number
   insideColor: string
   outsideColor: string
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
      this.insideColor = "#ff6030"
      this.outsideColor = "#1b3984"
      this.spin = 1
      this.geometry = new THREE.BufferGeometry()
      this.material = new THREE.ShaderMaterial({
         depthWrite: false,
         blending: THREE.AdditiveBlending,
         vertexColors: true,
         vertexShader: `
            void main() {
               vec4 modelPosition = modelMatrix * vec4(position, 1.0);
               vec4 viewPosition = viewMatrix * modelPosition;
               vec4 projectionPosition = projectionMatrix * viewPosition;

               gl_Position = projectionPosition;
               gl_PointSize = 2.0;
            }
         `,
         fragmentShader: `
            void main(){
               gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
         `
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
         debugFolder?.addColor(this, "insideColor").onFinishChange(this.generate.bind(this))
         debugFolder?.addColor(this, "outsideColor").onFinishChange(this.generate.bind(this))
      }
   }

   generate(){
      if(this.points){
         this.geometry.dispose()
         this.material.dispose()
         this.scene.remove(this.points)
      }
      const positions = new Float32Array(this.amount * 3)
      const colors = new Float32Array(this.amount * 3)

      const colorInside = new THREE.Color(this.insideColor)
      const colorOutside = new THREE.Color(this.outsideColor)
      
      const array = [...Array(this.amount)]
      
      array.forEach((_, i:number) => {
         const i3 = i * 3

         const radius = Math.random() * this.radius
         const spinAngle = radius * this.spin
         const branchAngle = (i % this.branches) / this.branches * Math.PI * 2

         const randomX = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.randomness * radius
         const randomY = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.randomness * radius
         const randomZ = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.randomness * radius

         positions[i3]     = Math.cos(branchAngle + spinAngle) * radius + randomX
         positions[i3 + 1] = randomY
         positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

         const mixedColor = colorInside.clone()
         mixedColor.lerp(colorOutside, radius / this.radius)
         colors[i3 + 0] = mixedColor.r
         colors[i3 + 1] = mixedColor.g
         colors[i3 + 2] = mixedColor.b
      })
      
      this.material.size = this.size
      this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      this.points = new THREE.Points(this.geometry, this.material)
      this.scene.add(this.points)
   }
}