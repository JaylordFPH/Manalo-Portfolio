"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/* ── Helper: create a floating pebble ── */
function createPebble(
  pos: [number, number, number],
  scale: number,
  color: string
): { mesh: THREE.Mesh; originY: number; phase: number; rotSpeed: number; floatSpeed: number } {
  const geo = new THREE.IcosahedronGeometry(1, 1)
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(...pos)
  mesh.scale.setScalar(scale)
  mesh.castShadow = true
  return {
    mesh,
    originY: pos[1],
    phase: pos[0] * 0.5 + pos[2] * 0.3,
    rotSpeed: 0.001 + Math.random() * 0.003,
    floatSpeed: 0.4 + Math.random() * 0.3,
  }
}

/* ── Helper: create a floating leaf ── */
function createLeaf(
  pos: [number, number, number],
  rot: [number, number, number],
  scale: number,
  color: string
): { group: THREE.Group; originY: number; phase: number; swaySpeed: number } {
  const group = new THREE.Group()
  group.position.set(...pos)
  group.rotation.set(...rot)
  group.scale.setScalar(scale)

  // Blade
  const bladeGeo = new THREE.BoxGeometry(0.08, 1.4, 0.55)
  const bladeMat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    metalness: 0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.82,
  })
  group.add(new THREE.Mesh(bladeGeo, bladeMat))

  // Midrib
  const ribGeo = new THREE.BoxGeometry(0.025, 1.35, 0.025)
  const ribMat = new THREE.MeshStandardMaterial({ color: "#2a4f3c", roughness: 1 })
  const rib = new THREE.Mesh(ribGeo, ribMat)
  rib.position.z = 0.01
  group.add(rib)

  return {
    group,
    originY: pos[1],
    phase: pos[0] * 0.8 + pos[2] * 0.6,
    swaySpeed: 0.35 + Math.random() * 0.2,
  }
}

/* ── Helper: create particle field ── */
function createParticles(count: number, spread: number, color: string) {
  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.7
    speeds[i] = 0.2 + Math.random() * 0.4
    phases[i] = Math.random() * Math.PI * 2
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({
    color,
    size: 0.045,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  })
  return { points: new THREE.Points(geo, mat), speeds, phases, count }
}

/* ── Config ── */
const PEBBLE_DATA: Array<{ pos: [number, number, number]; scale: number; color: string }> = [
  { pos: [-4.5, 0.2, -2.0], scale: 0.55, color: "#4a7a65" },
  { pos: [4.2, -0.4, -1.5], scale: 0.75, color: "#3d6355" },
  { pos: [-2.8, 0.8, -3.5], scale: 0.90, color: "#5e8a72" },
  { pos: [2.6, -0.1, -2.8], scale: 0.45, color: "#7aa08a" },
  { pos: [-6.0, 0.5, -1.0], scale: 0.65, color: "#3a5e50" },
  { pos: [5.8, 0.3, -3.0], scale: 0.50, color: "#628b78" },
  { pos: [0.4, 1.0, -4.0], scale: 1.10, color: "#2f5244" },
  { pos: [-1.5, -0.6, -1.8], scale: 0.38, color: "#8aaa96" },
  { pos: [3.5, 0.6, -5.0], scale: 0.60, color: "#4d7a68" },
  { pos: [-3.8, -0.2, -4.5], scale: 0.42, color: "#6e9882" },
]

const LEAF_DATA: Array<{ pos: [number, number, number]; rot: [number, number, number]; scale: number; color: string }> = [
  { pos: [-5.5, 1.8, -2.5], rot: [0.3, 0.8, 0.4], scale: 0.9, color: "#3d6b58" },
  { pos: [4.8, 2.2, -3.0], rot: [-0.2, -0.6, 0.5], scale: 1.1, color: "#2e5445" },
  { pos: [-2.0, 0.5, -3.8], rot: [0.5, 1.2, -0.3], scale: 0.75, color: "#4a7262" },
  { pos: [1.5, 1.5, -4.5], rot: [-0.4, 0.4, 0.6], scale: 0.85, color: "#527a68" },
  { pos: [-4.0, 2.5, -1.5], rot: [0.2, -0.9, -0.2], scale: 1.0, color: "#3a6050" },
  { pos: [6.5, 1.0, -2.0], rot: [0.6, 0.3, 0.8], scale: 0.65, color: "#5c8272" },
  { pos: [-0.8, 2.8, -5.0], rot: [-0.3, 1.0, -0.5], scale: 1.20, color: "#2b4e3e" },
  { pos: [3.0, -0.2, -1.2], rot: [0.8, 0.5, 0.3], scale: 0.55, color: "#638a78" },
]

/* ═══════ Main component ═══════ */
export function NatureScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    /* ── Scene ── */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#1a3028")
    scene.fog = new THREE.FogExp2("#1a3028", 0.045)

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0.5, 7)

    /* ── Lights ── */
    const ambient = new THREE.AmbientLight("#c8ddd5", 0.55)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight("#dff0e8", 1.2)
    dirLight.position.set(5, 10, 5)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.set(1024, 1024)
    scene.add(dirLight)

    const pt1 = new THREE.PointLight("#a8c8b8", 0.6)
    pt1.position.set(-8, 6, -4)
    scene.add(pt1)

    const pt2 = new THREE.PointLight("#c0d8ca", 0.4)
    pt2.position.set(8, 2, -6)
    scene.add(pt2)

    /* ── Ground ── */
    const groundGeo = new THREE.PlaneGeometry(40, 40)
    const groundMat = new THREE.MeshStandardMaterial({ color: "#1e3830", roughness: 1, metalness: 0 })
    const ground = new THREE.Mesh(groundGeo, groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -3.2
    ground.receiveShadow = true
    scene.add(ground)

    /* ── Pebbles ── */
    const pebbles = PEBBLE_DATA.map((d) => {
      const p = createPebble(d.pos, d.scale, d.color)
      scene.add(p.mesh)
      return p
    })

    /* ── Leaves ── */
    const leaves = LEAF_DATA.map((d) => {
      const l = createLeaf(d.pos, d.rot, d.scale, d.color)
      scene.add(l.group)
      return l
    })

    /* ── Particles ── */
    const particles = createParticles(160, 16, "#9abfaa")
    scene.add(particles.points)

    /* ── Clock ── */
    const clock = new THREE.Clock()

    /* ── Animate ── */
    let raf: number
    function animate() {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Camera drift
      camera.position.x = Math.sin(t * 0.07) * 0.6
      camera.position.y = 0.5 + Math.sin(t * 0.05) * 0.3
      camera.lookAt(0, 0, 0)

      // Pebbles
      for (const p of pebbles) {
        p.mesh.position.y = p.originY + Math.sin(t * p.floatSpeed + p.phase) * 0.18
        p.mesh.rotation.x += p.rotSpeed * 0.7
        p.mesh.rotation.y += p.rotSpeed
      }

      // Leaves
      for (const l of leaves) {
        l.group.position.y = l.originY + Math.sin(t * 0.5 + l.phase) * 0.22
        l.group.rotation.z += Math.sin(t * l.swaySpeed + l.phase) * 0.0008
        l.group.rotation.x += Math.sin(t * l.swaySpeed * 0.7 + l.phase) * 0.0004
      }

      // Particles
      const posArr = particles.points.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particles.count; i++) {
        posArr[i * 3 + 1] += Math.sin(t * particles.speeds[i] + particles.phases[i]) * 0.0015
      }
      particles.points.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    /* ── Resize ── */
    function onResize() {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", onResize)

    /* ── Cleanup ── */
    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    />
  )
}
