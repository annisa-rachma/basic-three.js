import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/9.png')
//texture use in map and matcap are supposed to be encoded in sRGB
matcapTexture.colorSpace = THREE.SRGBColorSpace


/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Hello ',
            {
                font : font,
                size : 0.5,
                height : 0.2,
                curveSegments : 5,
                bevelEnabled : true,
                bevelThickness : 0.03,
                bevelSize : 0.02,
                bevelOffset : 0,
                bevelSegments : 4
            }
        )
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )
        /**
         * move the bounding box to the center, by translate it to half of it each axis
         * but it's not precisely centered because of the bevel
         * in order to centered it, we need to substract with bevel size and bevel thickness
         */

        /**or simply, you can just use : */
        textGeometry.center()

        const textMaterial =  new THREE.MeshMatcapMaterial({matcap : matcapTexture})
        // textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        for(let i = 0; i < 100; i++) {
            const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
            const donutMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture})
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)

            donut.position.x = (Math.random() - 0.5) * 10 
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.x = scale
            donut.scale.y = scale
            donut.scale.z = scale

            scene.add(donut)
        }
    }
)
/**
 * creating a text geometry is hard for computer
 * keep the geometry as low poly as possible by reducing the curveSegments and bevelSegments
 */
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Using Bounding 
 * bounding is an information associated with the geometry that tells what space is taken by thhat geometry (kaya kotak/lingkarang mengelilingi object tersebut)
 * 
 * it helps three.js calculate if the object is on the screen(frustum culling)
 * frustum culling -> rendering or not rendering the object, if the object is behinf the camer it wont be rendered, same as when the object is behind another bigger object, it wont show on the camera
 * 
 * we can use it to recenter the geometry
 * by default, three.js using sphere bounding 
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()