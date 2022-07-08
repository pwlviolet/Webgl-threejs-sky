import * as THREE from "three";
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入水面
import { Water } from "three/examples/jsm/objects/Water";
// 导入gltf载入库
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 初始化场景
const scene = new THREE.Scene();

// 初始化相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.y=50;
camera.lookAt(0,0,0);
// 更新摄像头宽高比例
camera.aspect = window.innerWidth / window.innerHeight;
// 更新摄像头投影矩阵
camera.updateProjectionMatrix();

scene.add(camera);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  // 设置抗锯齿
  antialias: true,
  //   对数深度缓冲区
  logarithmicDepthBuffer: true,
});
renderer.outputEncoding = THREE.sRGBEncoding;

// 设置渲染器宽高
renderer.setSize(window.innerWidth, window.innerHeight);

// 监听屏幕的大小改变，修改渲染器的宽高，相机的比例
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 将渲染器添加到页面
document.body.appendChild(renderer.domElement);

// 实例化控制器
const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  // 渲染场景
  renderer.render(scene, camera);
  // 引擎自动更新渲染器
  requestAnimationFrame(render);
}
render();



const boxWidth = 2000;
const boxHeight = 2000;
const boxDepth = 2000;
const skyGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const cubes = [];  // just an array we can use to rotate the cubes
const loader = new THREE.TextureLoader();  //加载材质

const skymaterials = [

        new THREE.MeshBasicMaterial({map: loader.load('./textures/px.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('./textures/nx.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('./textures/py.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('./textures/ny.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('./textures/nz.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('./textures/pz.jpg')}),
];
const cube = new THREE.Mesh(skyGeometry, skymaterials);
cube.position.z=0
skyGeometry.scale(1, 1, -1);
scene.add(cube);
cubes.push(cube); 