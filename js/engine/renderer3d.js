export class Renderer3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rotY = 0.55;
    this.rotX = 0.42;
    this.zoom = 1.0;
    this.dragging = false;
    this.lastX = 0;
    this.lastY = 0;
    this.tick = 0;
    this.sceneState = {
      shop: 'kitchen',
      active: false,
      burnt: false,
      success: false,
      progress: 0,
      items: []
    };

    this._bindEvents();
    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._loop();
  }

  _resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = Math.max(300, rect.width);
    this.canvas.height = Math.max(220, rect.height);
  }

  _bindEvents() {
    const startDrag = (x, y) => {
      this.dragging = true;
      this.lastX = x;
      this.lastY = y;
    };
    const moveDrag = (x, y) => {
      if (!this.dragging) return;
      this.rotY += (x - this.lastX) * 0.01;
      this.rotX = Math.max(0.15, Math.min(1.15, this.rotX + (y - this.lastY) * 0.008));
      this.lastX = x;
      this.lastY = y;
    };
    const endDrag = () => { this.dragging = false; };

    this.canvas.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', endDrag);

    this.canvas.addEventListener('touchstart', e => {
      if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    this.canvas.addEventListener('touchmove', e => {
      if (e.touches[0]) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    this.canvas.addEventListener('touchend', endDrag);
  }

  setZoom(delta) {
    this.zoom = Math.max(0.65, Math.min(1.65, this.zoom + delta));
  }

  resetCamera() {
    this.rotY = 0.55;
    this.rotX = 0.42;
    this.zoom = 1.0;
  }

  updateScene(patch) {
    Object.assign(this.sceneState, patch);
  }

  project(x, y, z) {
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    const fov = 420 * this.zoom;
    const scale = fov / (fov + z2 + 260);
    return {
      x: this.canvas.width / 2 + x1 * scale,
      y: this.canvas.height / 2 + 25 - y2 * scale,
      scale,
      depth: z2
    };
  }

  drawBox(cx, cy, cz, w, h, d, colorTop, colorLeft, colorRight) {
    const hw = w / 2, hh = h / 2, hd = d / 2;
    const pts = [
      this.project(cx - hw, cy + hh, cz - hd),
      this.project(cx + hw, cy + hh, cz - hd),
      this.project(cx + hw, cy + hh, cz + hd),
      this.project(cx - hw, cy + hh, cz + hd),
      this.project(cx - hw, cy - hh, cz - hd),
      this.project(cx + hw, cy - hh, cz - hd),
      this.project(cx + hw, cy - hh, cz + hd),
      this.project(cx - hw, cy - hh, cz + hd)
    ];

    const poly = (indices, fill) => {
      this.ctx.beginPath();
      indices.forEach((idx, i) => {
        if (i === 0) this.ctx.moveTo(pts[idx].x, pts[idx].y);
        else this.ctx.lineTo(pts[idx].x, pts[idx].y);
      });
      this.ctx.closePath();
      this.ctx.fillStyle = fill;
      this.ctx.fill();
      this.ctx.strokeStyle = 'rgba(15,23,42,0.35)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    };

    // Top face
    poly([0, 1, 2, 3], colorTop);
    // Front/Side faces depending on rotation
    if (Math.cos(this.rotY) >= 0) poly([3, 2, 6, 7], colorLeft);
    else poly([0, 1, 5, 4], colorLeft);

    if (Math.sin(this.rotY) >= 0) poly([0, 3, 7, 4], colorRight);
    else poly([1, 2, 6, 5], colorRight);
  }

  _loop() {
    this.tick += 0.05;
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid Floor
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.lineWidth = 1;
    for (let i = -140; i <= 140; i += 35) {
      const a = this.project(i, -60, -140);
      const b = this.project(i, -60, 140);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();

      const c = this.project(-140, -60, i);
      const d = this.project(140, -60, i);
      ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.stroke();
    }

    const st = this.sceneState;
    // Counter Table
    this.drawBox(0, -45, 0, 210, 26, 150, '#334155', '#1e293b', '#0f172a');

    if (st.shop === 'kitchen') {
      // Gas Stove & Wok
      this.drawBox(-20, -24, 0, 80, 14, 80, '#475569', '#334155', '#1e293b');
      if (st.active) {
        const flicker = Math.sin(this.tick * 4) * 3;
        this.drawBox(-20, -14, 0, 52 + flicker, 8, 52 + flicker, '#f97316', '#ef4444', '#dc2626');
      }
      const wobble = st.active ? Math.sin(this.tick * 3) * 6 : 0;
      this.drawBox(-20 + wobble, -4, 0, 74, 16, 74, '#1e293b', '#0f172a', '#020617');
      // Handle
      this.drawBox(38 + wobble, 2, 0, 48, 7, 10, '#78350f', '#451a03', '#451a03');

      // Food Contents
      if (st.items.length > 0) {
        const foodColor = st.burnt ? '#18181b' : (st.success ? '#fbbf24' : '#f59e0b');
        this.drawBox(-20 + wobble, 7, 0, 46, 10, 46, foodColor, '#d97706', '#b45309');
      }
      // Serving Plate
      this.drawBox(68, -28, 25, 54, 6, 54, '#f8fafc', '#cbd5e1', '#94a3b8');
      if (st.success) {
        this.drawBox(68, -21, 25, 36, 10, 36, '#f59e0b', '#d97706', '#b45309');
      }
    } else if (st.shop === 'boba') {
      // Boba Station & Cup
      this.drawBox(-45, -18, 0, 55, 30, 55, '#0284c7', '#0369a1', '#075985');
      const shake = st.active ? Math.sin(this.tick * 5) * 8 : 0;
      // Cup body
      this.drawBox(18, -8 + Math.abs(shake), 0, 38, 48, 38, 'rgba(248,250,252,0.85)', 'rgba(203,213,225,0.75)', 'rgba(148,163,184,0.75)');
      if (st.items.length > 0) {
        const teaColor = st.burnt ? '#ef4444' : '#d97706';
        this.drawBox(18, -12 + Math.abs(shake), 0, 34, 34, 34, teaColor, '#b45309', '#92400e');
      }
      // Straw
      this.drawBox(18, 24 + Math.abs(shake), 0, 6, 26, 6, '#ec4899', '#db2777', '#be185d');
    } else if (st.shop === 'repair') {
      // Repair Mat & Smartphone
      this.drawBox(0, -30, 0, 140, 4, 100, '#0d9488', '#0f766e', '#115e59');
      const screenColor = st.burnt ? '#ef4444' : (st.success ? '#38bdf8' : '#1e293b');
      this.drawBox(0, -23, 0, 52, 8, 92, screenColor, '#334155', '#0f172a');
      // Diagnostic Tool Box
      this.drawBox(-65, -20, -20, 28, 18, 40, '#f59e0b', '#d97706', '#b45309');
    }

    // Smoke / Spark Particles on Error
    if (st.burnt) {
      for (let i = 0; i < 6; i++) {
        const py = 20 + ((this.tick * 18 + i * 16) % 70);
        const px = Math.sin(this.tick + i) * 18;
        const p = this.project(px, py, 0);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(30, 41, 59, 0.75)';
        ctx.fill();
      }
    }

    requestAnimationFrame(() => this._loop());
  }
}
