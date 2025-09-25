import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import GUI from 'lil-gui'


const gui = new GUI()

const scene = new THREE.Scene() 
scene.background = new THREE.Color("black")


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.z = 500;


// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({
//   color : "yellow"
// })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

const loader = new FontLoader()

loader.load('public/font/helvetiker_regular.typeface.json' ,(font)=>{
  const textGeo = new TextGeometry("MTR-BRAND!" , {
    font : font,
    size: 100,
    height: 0.05,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.02
 
  });

  textGeo.center()
  const material = new THREE.MeshStandardMaterial({
    color : 'red' ,
    roughness : 0, metalness : 1,
    // wireframe : true
  })
  const text  = new THREE.Mesh(textGeo,material)
  scene.add(text)


  const textFolder = gui.addFolder("TextFolder")
  textFolder.add(material , 'wireframe')
  textFolder.addColor(material ,'color')
})


const LightA = new THREE.AmbientLight('white', 50)
scene.add(LightA)

const LightD = new THREE.DirectionalLight('white' , 4500)
LightD.position.set(0,2,9)
scene.add(LightD)












const canvas = document.querySelector('#myCanvas')
const renderer = new THREE.WebGLRenderer({canvas : canvas , antialias : true})
renderer.setSize(window.innerWidth, window.innerHeight)

const control = new OrbitControls(camera , canvas)
control.enableDamping = true;
control.dampingFactor = 0.04;

function run(){
  requestAnimationFrame(run)
  control.update()
  renderer.render(scene , camera)
  

}

run()

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth , window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


