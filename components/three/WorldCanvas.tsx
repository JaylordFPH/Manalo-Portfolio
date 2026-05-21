"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

// ── Camera keyframes (scroll 0–1 → camera position) ──────────────────────────
type KF = { t: number; pos: [number,number,number]; look: [number,number,number] }
const KEYFRAMES: KF[] = [
  { t: 0,    pos: [0,  1,   7],  look: [0, 0,   0] },  // Hero
  { t: 0.16, pos: [0,  4,  -8],  look: [0, 1, -18] },  // About
  { t: 0.33, pos: [-1, 2, -23],  look: [0, 1, -35] },  // Projects
  { t: 0.52, pos: [1,  1, -40],  look: [0, 1, -48] },  // Services
  { t: 0.70, pos: [0,  1, -55],  look: [0, 1, -63] },  // Certs
  { t: 0.87, pos: [0,  2, -70],  look: [0, 0, -78] },  // Footer
  { t: 1,    pos: [0,  3, -70],  look: [0, 0, -78] },
]

function lerpKF(t: number) {
  let a = KEYFRAMES[0], b = KEYFRAMES[1]
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (t >= KEYFRAMES[i].t && t <= KEYFRAMES[i+1].t) { a = KEYFRAMES[i]; b = KEYFRAMES[i+1]; break }
  }
  const s = a.t === b.t ? 0 : (t - a.t) / (b.t - a.t)
  return {
    pos:  new THREE.Vector3().lerpVectors(new THREE.Vector3(...a.pos),  new THREE.Vector3(...b.pos),  s),
    look: new THREE.Vector3().lerpVectors(new THREE.Vector3(...a.look), new THREE.Vector3(...b.look), s),
  }
}

function wireframe(geo: THREE.BufferGeometry, color: string, opacity = 0.65) {
  return new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export function WorldCanvas() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mobile = window.innerWidth < 768

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: false })
    renderer.setPixelRatio(mobile ? 1 : Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = !mobile
    el.appendChild(renderer.domElement)

    /* ── Scene / fog ── */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#16291f")
    scene.fog = new THREE.FogExp2("#16291f", 0.030)

    /* ── Camera ── */
    const cam = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200)
    cam.position.set(0, 1, 7)

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight("#b8d8cc", 0.65))
    const sun = new THREE.DirectionalLight("#dff0e8", 1.3)
    sun.position.set(5, 12, 5); sun.castShadow = !mobile
    scene.add(sun)
    ;[[- 8, 6, -4, "#a8c8b8", 0.7],[8, 2, -6, "#c0d8ca", 0.45]].forEach(([x,y,z,c,i]) => {
      const p = new THREE.PointLight(c as string, i as number); p.position.set(x as number, y as number, z as number); scene.add(p)
    })

    /* ── Infinite ground strip ── */
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 220), new THREE.MeshStandardMaterial({ color: "#182e22", roughness: 1 }))
    ground.rotation.x = -Math.PI / 2; ground.position.set(0, -3.3, -44); ground.receiveShadow = true
    scene.add(ground)

    /* ── Floater tracking ── */
    type Floater = { obj: THREE.Object3D; oy: number; ph: number; fs: number; rs?: number; sw?: number; brz?: number; brx?: number }
    const floaters: Floater[] = []

    /* ══ HERO ZONE  (z ≈  0) ══════════════════════════════════════════════════ */
    const hero = new THREE.Group(); scene.add(hero)
    if (!mobile) {
      const pebCols = ["#4a7a65","#3d6355","#5e8a72","#7aa08a","#3a5e50","#628b78","#2f5244","#8aaa96","#4d7a68","#6e9882"]
      ;[[-4.5,0.2,-2,0.55],[4.2,-0.4,-1.5,0.75],[-2.8,0.8,-3.5,0.9],[2.6,-0.1,-2.8,0.45],
        [-6,0.5,-1,0.65],[5.8,0.3,-3,0.5],[0.4,1,-4,1.1],[-1.5,-0.6,-1.8,0.38],[3.5,0.6,-5,0.6],[-3.8,-0.2,-4.5,0.42]
      ].forEach(([x,y,z,s],i) => {
        const m = new THREE.Mesh(new THREE.IcosahedronGeometry(1,1), new THREE.MeshStandardMaterial({ color: pebCols[i], roughness:0.85, metalness:0.05, flatShading:true }))
        m.position.set(x,y,z); m.scale.setScalar(s); m.castShadow=true; hero.add(m)
        floaters.push({ obj:m, oy:y, ph:x*0.5+z*0.3, fs:0.4+Math.random()*0.3, rs:0.002+Math.random()*0.003 })
      })
    }
    ;[[-5.5,1.8,-2.5,0.3,0.8,0.4,0.9,"#3d6b58"],[4.8,2.2,-3,-0.2,-0.6,0.5,1.1,"#2e5445"],
      [-2,0.5,-3.8,0.5,1.2,-0.3,0.75,"#4a7262"],[1.5,1.5,-4.5,-0.4,0.4,0.6,0.85,"#527a68"],
      [-4,2.5,-1.5,0.2,-0.9,-0.2,1,"#3a6050"],[6.5,1,-2,0.6,0.3,0.8,0.65,"#5c8272"]
    ].forEach(([x,y,z,rx,ry,rz,s,col]) => {
      const g = new THREE.Group(); g.position.set(x as number,y as number,z as number); g.rotation.set(rx as number,ry as number,rz as number); g.scale.setScalar(s as number)
      g.add(new THREE.Mesh(new THREE.BoxGeometry(0.08,1.4,0.55), new THREE.MeshStandardMaterial({ color:col as string, roughness:0.9, side:THREE.DoubleSide, transparent:true, opacity:0.82 })))
      hero.add(g); floaters.push({ obj:g, oy:y as number, ph:(x as number)*0.8+(z as number)*0.6, fs:0.5, sw:0.35+Math.random()*0.2, brz:rz as number, brx:rx as number })
    })

    /* ══ ABOUT ZONE  (z ≈ -18) ════════════════════════════════════════════════ */
    const about = new THREE.Group(); about.position.z = -18; scene.add(about)
    const stoneN = mobile ? 6 : 9
    for (let i=0; i<stoneN; i++) {
      const ang = (i/stoneN)*Math.PI*2
      const st = new THREE.Mesh(new THREE.IcosahedronGeometry(0.35+Math.random()*0.25,1), new THREE.MeshStandardMaterial({ color:"#3d5f50", roughness:0.9, flatShading:true }))
      st.position.set(Math.cos(ang)*3.8, -2.9, Math.sin(ang)*2.4); st.rotation.set(Math.random(),Math.random(),0); about.add(st)
      floaters.push({ obj:st, oy:-2.9, ph:i*0.7, fs:0.28, rs:0.0008 })
    }
    const cst = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85,1), new THREE.MeshStandardMaterial({ color:"#2f4e42", roughness:0.85, flatShading:true }))
    cst.position.set(0,-2.5,0); about.add(cst); floaters.push({ obj:cst, oy:-2.5, ph:0, fs:0.22, rs:0.0006 })

    /* ══ PROJECTS ZONE  (z ≈ -35) ════════════════════════════════════════════ */
    const proj = new THREE.Group(); proj.position.z = -35; scene.add(proj)
    ;[[-3.5,1.2,-0.5,0],[0.5,2.5,0.5,1],[3.5,0.3,-1,2],[0,-1.2,-1.5,3]].forEach(([x,y,z,i]) => {
      const planeGeo = new THREE.PlaneGeometry(3.8, 2.4)
      const pl = new THREE.Mesh(planeGeo, new THREE.MeshStandardMaterial({ color:"#243d30", transparent:true, opacity:0.5, side:THREE.DoubleSide, roughness:0.4, metalness:0.15 }))
      pl.position.set(x,y,z); pl.rotation.y = ((i as number)%2===0?1:-1)*0.18
      pl.add(new THREE.LineSegments(new THREE.EdgesGeometry(planeGeo), new THREE.LineBasicMaterial({ color:"#7dcba8", transparent:true, opacity:0.9 })))
      proj.add(pl); floaters.push({ obj:pl, oy:y, ph:(i as number)*1.3, fs:0.32+(i as number)*0.04, rs:0.0004 })
    })

    /* ══ SERVICES ZONE  (z ≈ -48) ════════════════════════════════════════════ */
    const svc = new THREE.Group(); svc.position.z = -48; scene.add(svc)
    const wfGeos = [new THREE.TetrahedronGeometry(0.75),new THREE.OctahedronGeometry(0.75),new THREE.BoxGeometry(1.1,1.1,1.1),new THREE.IcosahedronGeometry(0.75,0),new THREE.DodecahedronGeometry(0.75),new THREE.SphereGeometry(0.7,5,4)]
    const wfCols = ["#6aaa8a","#3d7a62","#7dcba8","#4a7a65","#2a4a3e","#8abaa0"]
    ;[[-3.5,0.8,0],[-1.2,1.8,-0.8],[1.3,0.3,-0.3],[3.5,1.2,0.4],[-0.4,-1.1,-0.8],[1,-0.5,0.6]].forEach(([x,y,z],i) => {
      const wf = wireframe(wfGeos[i], wfCols[i])
      wf.position.set(x,y,z); svc.add(wf); floaters.push({ obj:wf, oy:y, ph:i*0.9, fs:0.26+i*0.04, rs:0.006+i*0.002 })
    })

    /* ══ CERTS ZONE  (z ≈ -63) ═══════════════════════════════════════════════ */
    const certs = new THREE.Group(); certs.position.z = -63; scene.add(certs)
    ;[[-4.2,0],[-2.8,0.4],[-1.1,-0.2],[0.6,0.3],[2.1,-0.4],[3.6,0.2],[4.9,-0.1],[-3.4,-0.3]].forEach(([x,xo]) => {
      const h = 4+Math.random()*3
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.055,0.08,h,6), new THREE.MeshStandardMaterial({ color:"#2a4a3e", roughness:0.9 }))
      b.position.set(x+(xo as number)*0.3, h/2-3.2, (Math.random()-0.5)*1.8); certs.add(b)
      floaters.push({ obj:b, oy:b.position.y, ph:(x as number)*0.4, fs:0.18+Math.random()*0.12 })
    })

    /* ══ PARTICLES (spans all zones) ════════════════════════════════════════════ */
    const ptN = mobile ? 80 : 220
    const ptPos = new Float32Array(ptN*3), ptSp = new Float32Array(ptN), ptPh = new Float32Array(ptN)
    for (let i=0;i<ptN;i++) {
      ptPos[i*3]=(Math.random()-.5)*22; ptPos[i*3+1]=(Math.random()-.5)*9; ptPos[i*3+2]=-(Math.random()*180)
      ptSp[i]=0.2+Math.random()*0.4; ptPh[i]=Math.random()*Math.PI*2
    }
    const ptGeo = new THREE.BufferGeometry(); ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos,3))
    const pts = new THREE.Points(ptGeo, new THREE.PointsMaterial({ color:"#9abfaa", size:0.045, sizeAttenuation:true, transparent:true, opacity:0.5, depthWrite:false }))
    scene.add(pts)

    /* ── Scroll → camera target ── */
    const camPos  = new THREE.Vector3(0,1,7), camLook = new THREE.Vector3(0,0,0)
    const tgtPos  = new THREE.Vector3(0,1,7), tgtLook = new THREE.Vector3(0,0,0)
    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight
      const { pos, look } = lerpKF(max>0 ? Math.min(window.scrollY/max,1) : 0)
      tgtPos.copy(pos); tgtLook.copy(look)
    }
    window.addEventListener("scroll", onScroll, { passive:true }); onScroll()

    /* ── Animate ── */
    const clock = new THREE.Clock(); let raf: number
    function animate() {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      camPos.lerp(tgtPos, 0.042); camLook.lerp(tgtLook, 0.042)
      cam.position.set(camPos.x + Math.sin(t*0.07)*0.4, camPos.y + Math.sin(t*0.05)*0.2, camPos.z)
      cam.lookAt(camLook)
      for (const f of floaters) {
        f.obj.position.y = f.oy + Math.sin(t*f.fs+f.ph)*0.18
        if (f.rs) { f.obj.rotation.x += f.rs*0.7; f.obj.rotation.y += f.rs }
        if (f.sw && f.brz!==undefined) f.obj.rotation.z = f.brz + Math.sin(t*f.sw+f.ph)*0.12
      }
      const pa = ptGeo.attributes.position.array as Float32Array
      for (let i=0;i<ptN;i++) pa[i*3+1] += Math.sin(t*ptSp[i]+ptPh[i])*0.0015
      ptGeo.attributes.position.needsUpdate = true
      renderer.render(scene, cam)
    }
    animate()

    function onResize() {
      cam.aspect = window.innerWidth/window.innerHeight; cam.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
      scene.traverse(o => {
        const m = o as THREE.Mesh; if (m.geometry) m.geometry.dispose()
        if (m.material) Array.isArray(m.material) ? m.material.forEach(x=>x.dispose()) : m.material.dispose()
      })
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={ref} style={{ position:"fixed", inset:0, zIndex:0 }} aria-hidden="true" />
}
