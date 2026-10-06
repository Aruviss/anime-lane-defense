// Canvas 2D Anime Renderer with Parallax, Chibi Sprites, VFX, and Screen Shake

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.shakeTime = 0;
        this.shakeIntensity = 0;

        // Load LF2 Sprites & Anime Roster
        this.sprites = {};
        this.loadSprites([
            'goku', 'naruto', 'gon', 'killua', 'kirua', 'zoro', 'ichigo',
            'kenshin', 'gintoki', 'luffy', 'tanjiro', 'tsuna', 'yo', 'jinwoo',
            'firen', 'louisEX', 'knight', 'deep', 'bandit', 'hunter', 'monk', 'julian'
        ]);

        // Load Base & Background Artwork Assets
        this.playerBaseImg = new Image();
        this.playerBaseImg.src = './assets/bases/player_base.png';

        this.enemyBaseImg = new Image();
        this.enemyBaseImg.src = './assets/bases/enemy_base.png';

        this.bgImg = new Image();
        this.bgImg.src = './assets/bg/anime_bg.jpg';

        // Ambient Golden Desert Sand Motes & Wind Particles
        this.sandParticles = [];
        for (let i = 0; i < 45; i++) {
            this.sandParticles.push({
                x: Math.random() * 2400,
                y: Math.random() * 800,
                vx: Math.random() * 65 + 35,
                vy: (Math.random() - 0.25) * 16,
                size: Math.random() * 3 + 1.5,
                rot: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 3,
                wobble: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.45 + 0.35,
                color: Math.random() > 0.4 ? '#ffd54f' : '#ffb74d'
            });
        }
    }

    loadSprites(charList) {
        charList.forEach(char => {
            const img = new Image();
            img.src = `./assets/sprites/${char}_0.png`;
            img.onload = () => {
                this.sprites[char] = img;
            };
        });
    }

    triggerShake(intensity = 8, duration = 0.3) {
        this.shakeIntensity = intensity;
        this.shakeTime = duration;
    }

    render(gameState, dt) {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Update screen shake
        let offsetX = 0;
        let offsetY = 0;
        if (this.shakeTime > 0) {
            this.shakeTime -= dt;
            offsetX = (Math.random() - 0.5) * this.shakeIntensity;
            offsetY = (Math.random() - 0.5) * this.shakeIntensity;
        }

        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(offsetX, offsetY);

        // 1. Draw Parallax Background
        this.drawBackground(gameState.cameraX, width, height, gameState.groundY);

        // 2. Apply Camera Translation for World Objects
        ctx.save();
        ctx.translate(-gameState.cameraX, 0);

        // Draw bases
        this.drawBase(gameState.playerBase, gameState.groundY);
        this.drawBase(gameState.enemyBase, gameState.groundY);

        // Draw units (sorted by Y/X for slight depth)
        const allUnits = [...gameState.playerUnits, ...gameState.enemyUnits];
        for (const unit of allUnits) {
            this.drawUnit(unit);
        }

        // Draw projectiles & VFX
        for (const proj of gameState.projectiles) {
            this.drawProjectile(proj);
        }

        // Draw Aether Cannon Laser
        if (gameState.cannonLaserActive) {
            this.drawAetherLaser(gameState.playerBase.x + 80, gameState.groundY - 140, gameState.cannonLaserTimer);
        }

        // Draw Particles
        for (const p of gameState.particles) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Draw Floating Damage Texts
        for (const ft of gameState.floatingTexts) {
            ctx.save();
            const alpha = Math.max(0, ft.life / ft.maxLife);
            ctx.globalAlpha = alpha;
            ctx.font = ft.isCrit ? 'bold 20px "Segoe UI", sans-serif' : 'bold 15px "Segoe UI", sans-serif';
            ctx.fillStyle = ft.color;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.strokeText(ft.text, ft.x, ft.y);
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
        }

        // Draw Ambient Golden Desert Sand Motes in world space
        this.drawDesertSand(dt, gameState.worldWidth, gameState.groundY);

        ctx.restore(); // Restore world camera
        ctx.restore(); // Restore shake
    }

    drawDesertSand(dt, worldWidth, groundY) {
        const ctx = this.ctx;
        ctx.save();
        for (const p of this.sandParticles) {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.rot += p.vRot * dt;
            p.wobble += dt * 2.5;

            if (p.x > worldWidth + 50) p.x = -50;
            if (p.y > groundY + 80) p.y = Math.random() * (groundY * 0.7);
            if (p.y < -20) p.y = groundY * 0.5;

            ctx.save();
            ctx.translate(p.x + Math.sin(p.wobble) * 6, p.y);
            ctx.rotate(p.rot);
            ctx.globalAlpha = p.opacity;

            // Sparkling golden sand grain
            ctx.fillStyle = p.color;
            ctx.shadowColor = '#ffe082';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.7, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
        ctx.restore();
    }

    drawBackground(camX, width, height, groundY = height - 215) {
        const ctx = this.ctx;
        const groundTop = groundY - 14;

        // 1. Draw Desert & Mountain Artwork with Parallax
        if (this.bgImg && this.bgImg.complete && this.bgImg.naturalWidth > 0) {
            const scale = Math.max(height / this.bgImg.naturalHeight, width / this.bgImg.naturalWidth);
            const bgW = this.bgImg.naturalWidth * scale;
            const bgH = this.bgImg.naturalHeight * scale;
            const parallaxX = -(camX * 0.22) % bgW;
            let startX = parallaxX;
            if (startX > 0) startX -= bgW;
            while (startX < width) {
                ctx.drawImage(this.bgImg, Math.floor(startX), 0, Math.ceil(bgW) + 1, bgH);
                startX += bgW;
            }
        } else {
            // Fallback sunset gradient if loading
            const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
            skyGrad.addColorStop(0, '#f57c00');
            skyGrad.addColorStop(0.5, '#ffa726');
            skyGrad.addColorStop(0.8, '#ffcc80');
            skyGrad.addColorStop(1, '#ffe082');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, width, height);
        }

        // 2. Desert Sunset Atmospheric Horizon Glow
        ctx.save();
        const mistGrad = ctx.createLinearGradient(0, groundTop - 120, 0, groundTop);
        mistGrad.addColorStop(0, 'rgba(255, 160, 0, 0)');
        mistGrad.addColorStop(0.6, 'rgba(245, 124, 0, 0.22)');
        mistGrad.addColorStop(1, 'rgba(180, 80, 20, 0.55)');
        ctx.fillStyle = mistGrad;
        ctx.fillRect(0, groundTop - 120, width, 120);
        ctx.restore();

        // 3. Ground Lane (Desert Sandstone & Ancient Canyon Road extending to bottom)
        const groundGrad = ctx.createLinearGradient(0, groundTop, 0, height);
        groundGrad.addColorStop(0, '#3e2723');
        groundGrad.addColorStop(0.12, '#271714');
        groundGrad.addColorStop(0.5, '#1b0f0d');
        groundGrad.addColorStop(1, '#0e0706');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, groundTop, width, height - groundTop);

        // 4. Luminous Golden Sun-Stone Edge along Ground
        ctx.save();
        const edgeGrad = ctx.createLinearGradient(0, 0, width, 0);
        edgeGrad.addColorStop(0, '#00e5ff');
        edgeGrad.addColorStop(0.3, '#ffd54f');
        edgeGrad.addColorStop(0.7, '#ff9100');
        edgeGrad.addColorStop(1, '#ff1744');
        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#ffd54f';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, groundTop);
        ctx.lineTo(width, groundTop);
        ctx.stroke();
        ctx.restore();

        // 5. Glowing Solar Runic Dashed Lane Stripe
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 213, 79, 0.45)';
        ctx.shadowColor = '#ffd54f';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 3;
        ctx.setLineDash([32, 24]);
        ctx.lineDashOffset = -camX * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, groundY + 12);
        ctx.lineTo(width, groundY + 12);
        ctx.stroke();
        ctx.restore();
    }

    drawBase(base, groundY) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(base.x, groundY);

        if (base.hitFlash > 0) {
            ctx.filter = 'brightness(2.2) drop-shadow(0 0 25px #ff1744)';
        }

        const now = Date.now();

        if (base.isPlayer) {
            // Sanctuary of Light (Celestial Crystal Pagoda)
            const targetH = 290;
            const targetW = 230; // matches 752x951 aspect ratio
            const drawX = -targetW / 2;
            const drawY = -targetH + 12;

            // Ground contact shadow
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
            ctx.beginPath();
            ctx.ellipse(0, 8, targetW * 0.42, 14, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Celestial Crystal Spire Pulsing Aura
            ctx.save();
            const pulse = (Math.sin(now * 0.0035) + 1) * 0.5;
            const aura = ctx.createRadialGradient(0, drawY + targetH * 0.28, 15, 0, drawY + targetH * 0.28, 120);
            aura.addColorStop(0, `rgba(64, 196, 255, ${0.45 + pulse * 0.25})`);
            aura.addColorStop(0.5, `rgba(0, 229, 255, ${0.18 + pulse * 0.12})`);
            aura.addColorStop(1, 'rgba(0, 229, 255, 0)');
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(0, drawY + targetH * 0.28, 120, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Render Base Image
            if (this.playerBaseImg && this.playerBaseImg.complete && this.playerBaseImg.naturalWidth > 0) {
                const hover = Math.sin(now * 0.003) * 3;
                ctx.drawImage(this.playerBaseImg, drawX, drawY + hover, targetW, targetH);
            } else {
                ctx.fillStyle = '#eceff1';
                ctx.fillRect(drawX + 40, drawY + 80, targetW - 80, targetH - 80);
            }
        } else {
            // Abyssal Gate (Demonic Obsidian Castle)
            const targetH = 290;
            const targetW = 268; // matches 910x987 aspect ratio
            const drawX = -targetW / 2;
            const drawY = -targetH + 12;

            // Ground contact shadow
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.beginPath();
            ctx.ellipse(0, 8, targetW * 0.45, 15, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Abyssal Demon Eye Pulsing Crimson Core
            ctx.save();
            const pulse = (Math.sin(now * 0.0045) + 1) * 0.5;
            const darkAura = ctx.createRadialGradient(0, drawY + targetH * 0.42, 15, 0, drawY + targetH * 0.42, 130);
            darkAura.addColorStop(0, `rgba(255, 23, 68, ${0.5 + pulse * 0.3})`);
            darkAura.addColorStop(0.6, `rgba(186, 104, 200, ${0.2 + pulse * 0.15})`);
            darkAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = darkAura;
            ctx.beginPath();
            ctx.arc(0, drawY + targetH * 0.42, 130, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Render Base Image
            if (this.enemyBaseImg && this.enemyBaseImg.complete && this.enemyBaseImg.naturalWidth > 0) {
                ctx.drawImage(this.enemyBaseImg, drawX, drawY, targetW, targetH);
            } else {
                ctx.fillStyle = '#1c1524';
                ctx.fillRect(drawX + 40, drawY + 80, targetW - 80, targetH - 80);
            }
        }

        ctx.restore();

        // Base HP Bar
        this.drawBaseHpBar(base, groundY);
    }

    drawBaseHpBar(base, groundY) {
        const ctx = this.ctx;
        ctx.save();

        const barWidth = 160;
        const barHeight = 14;
        const barX = base.x - barWidth / 2;
        const barY = groundY - 305;

        // Container Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 3;

        // Dark background plate
        ctx.fillStyle = 'rgba(14, 11, 22, 0.9)';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4, 6);
        } else {
            ctx.rect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
        }
        ctx.fill();
        ctx.shadowColor = 'transparent';

        // Border with team accent
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = base.isPlayer ? '#00e5ff' : '#ff1744';
        ctx.stroke();

        // Inner health bar fill
        const pct = Math.max(0, Math.min(1, base.hp / base.maxHp));
        if (pct > 0) {
            const fillGrad = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
            if (base.isPlayer) {
                fillGrad.addColorStop(0, '#00b0ff');
                fillGrad.addColorStop(1, '#00e676');
            } else {
                fillGrad.addColorStop(0, '#aa00ff');
                fillGrad.addColorStop(1, '#ff1744');
            }
            ctx.fillStyle = fillGrad;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(barX, barY, barWidth * pct, barHeight, 4);
            } else {
                ctx.rect(barX, barY, barWidth * pct, barHeight);
            }
            ctx.fill();
        }

        // Header Title & Current HP text with glowing badge
        ctx.font = 'bold 12px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = base.isPlayer ? '#80d8ff' : '#ff8a80';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        const hpText = `${base.name} [${Math.round(base.hp)}/${base.maxHp}]`;
        ctx.strokeText(hpText, base.x, barY - 7);
        ctx.fillText(hpText, base.x, barY - 7);

        ctx.restore();
    }

    drawUnit(unit) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(unit.x, unit.y);

        if (unit.hitFlash > 0) {
            ctx.filter = 'brightness(2.2)';
        }

        // Direction facing: player faces right (+1), enemy faces left (-1)
        const dir = unit.isPlayer ? 1 : -1;
        ctx.scale(dir * unit.scale, unit.scale);

        // Soft drop shadow under feet
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 20, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        const spriteImg = this.sprites[unit.id];
        if (spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0) {
            const isAnimeHero = ['goku', 'naruto', 'gon', 'killua', 'kirua', 'zoro', 'ichigo', 'kenshin', 'gintoki', 'luffy', 'tanjiro', 'tsuna', 'yo', 'jinwoo'].includes(unit.id);

            if (isAnimeHero) {
                // High-Res 4-Row Raw Anime Hero Sprite (1200x1200, 300x300 per cell)
                // Row 0: ยืน (Idle 4 เฟรม)
                // Row 1: เดิน (Walk 4 เฟรม)
                // Row 2: โจมตีปกติ (Attack 4 เฟรม)
                // Row 3: โจมตีไม้ตายพร้อมเอฟเฟกต์ & กระเด็น (Special Attack with built-in VFX & Knockback)
                const cw = 300;
                const ch = 300;
                let row = 0;
                let col = 0;

                if (unit.state === 'WALK') {
                    row = 1;
                    // Natural 4-frame stride loop
                    col = Math.floor(unit.walkCycle) % 4;
                } else if (unit.state === 'ATTACK_WINDUP') {
                    // Multi-phase windup: ready stance -> energy charge
                    if (unit.stateTimer < 0.18) {
                        row = 2; col = 0; // Ready / windup stance
                    } else {
                        row = 3; col = 0; // Energy / aura charge stance
                    }
                } else if (unit.state === 'ATTACK_STRIKE') {
                    // Dynamic attack combo using ALL attack & special poses!
                    if (unit.stateTimer < 0.05) {
                        row = 2; col = 1; // Physical Strike 1 (punch/slash 1)
                    } else if (unit.stateTimer < 0.11) {
                        row = 2; col = 2; // Physical Strike 2 (punch/slash 2)
                    } else if (unit.stateTimer < 0.17) {
                        row = 3; col = 1; // Special Move Release (blast / dragon / flame launch!)
                    } else {
                        row = 3; col = 2; // Full Beam / Blast impact extension!
                    }
                } else if (unit.state === 'ATTACK_RECOVER') {
                    // Multi-phase recovery: impact finish -> stance return
                    if (unit.stateTimer < 0.14) {
                        row = 3; col = 3; // Impact finish / ground landing pose
                    } else {
                        row = 2; col = 3; // Stance recovery & return
                    }
                } else if (unit.state === 'KNOCKBACK') {
                    row = 3;
                    col = 0; // Airborne knockback pose
                } else {
                    // IDLE: 4-frame gentle breathing stance
                    row = 0;
                    col = Math.floor((Date.now() / 250) + unit.x * 0.05) % 4;
                }

                const sx = col * cw;
                const sy = row * ch;

                // Scale to match enemies: base height 68px scaled by unit.scale
                const baseH = 68;
                const drawScale = (baseH * unit.scale) / 240.0;
                const dw = cw * drawScale;
                const dh = ch * drawScale;
                const footOffset = 280 * drawScale;

                ctx.imageSmoothingEnabled = true; // High-res smooth filtering
                ctx.drawImage(spriteImg, sx, sy, cw, ch, -dw / 2, -footOffset, dw, dh);
            } else {
                // Classic Little Fighter 2 Sprite System (Enemies: Bandit, Monk, Julian, etc.)
                let frame = 0;
                const isTall = (unit.id === 'knight' || unit.id === 'julian');
                const fw = 80;
                const fh = isTall ? 100 : 80;
                const footOffsetY = isTall ? 99 : 79;

                if (unit.state === 'WALK') {
                    const walkFrames = [5, 6, 7, 6];
                    const walkIdx = Math.floor(unit.walkCycle) % walkFrames.length;
                    frame = walkFrames[walkIdx];
                } else if (unit.state === 'ATTACK_WINDUP') {
                    frame = 10;
                } else if (unit.state === 'ATTACK_STRIKE') {
                    frame = 11;
                } else if (unit.state === 'ATTACK_RECOVER') {
                    frame = 13;
                } else if (unit.state === 'KNOCKBACK') {
                    frame = unit.id === 'knight' ? 49 : (unit.id === 'julian' ? 24 : 60);
                } else {
                    frame = 0;
                }

                const col = frame % 10;
                const row = Math.floor(frame / 10);
                const sx = col * fw;
                const sy = row * fh;

                ctx.imageSmoothingEnabled = false; // crisp pixel art for LF2
                ctx.drawImage(spriteImg, sx, sy, fw, fh, -fw / 2, -footOffsetY, fw, fh);
            }
        } else {
            // Fallback drawing if image still loading
            ctx.fillStyle = unit.color || '#fff';
            ctx.fillRect(-15, -60, 30, 60);
        }

        ctx.restore();

        // Draw Unit HP Bar (small and clean)
        this.drawUnitHpBar(unit);
    }

    drawUnitHpBar(unit) {
        if (unit.isDead) return;
        const ctx = this.ctx;
        const width = 36 * unit.scale;
        const height = 4;
        const x = unit.x - width / 2;
        const y = unit.y - unit.height - 10;

        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(x, y, width, height);

        const pct = Math.max(0, unit.hp / unit.maxHp);
        ctx.fillStyle = unit.isPlayer ? '#4caf50' : '#e91e63';
        ctx.fillRect(x, y, width * pct, height);
    }

    // --- ANIME PLAYER CHARACTERS ---

    // 1. Neko Maid (Catgirl Meatshield)
    drawNekoMaid(ctx, unit, legAngle) {
        // Legs
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-6, -15);
        ctx.lineTo(-6 - legAngle * 12, 0);
        ctx.moveTo(6, -15);
        ctx.lineTo(6 + legAngle * 12, 0);
        ctx.stroke();

        // Maid Dress / Apron
        ctx.fillStyle = '#26262b';
        ctx.beginPath();
        ctx.moveTo(-14, -20);
        ctx.lineTo(14, -20);
        ctx.lineTo(18, -4);
        ctx.lineTo(-18, -4);
        ctx.closePath();
        ctx.fill();

        // White Apron
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-8, -20, 16, 15);

        // Head
        ctx.fillStyle = '#ffe0bd';
        ctx.beginPath();
        ctx.arc(0, -32, 14, 0, Math.PI * 2);
        ctx.fill();

        // Hair (Short blonde/cream with twintails)
        ctx.fillStyle = unit.hairColor;
        ctx.beginPath();
        ctx.arc(0, -35, 15, Math.PI, 0);
        ctx.fill();
        // Twintails
        ctx.beginPath();
        ctx.ellipse(-14, -30, 4, 10, -0.2, 0, Math.PI * 2);
        ctx.ellipse(14, -30, 4, 10, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Cat Ears
        ctx.fillStyle = '#26262b';
        ctx.beginPath();
        ctx.moveTo(-12, -42);
        ctx.lineTo(-4, -54);
        ctx.lineTo(0, -42);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(6, -54);
        ctx.lineTo(14, -42);
        ctx.fill();
        // Inner ears pink
        ctx.fillStyle = '#ff80ab';
        ctx.beginPath();
        ctx.moveTo(-10, -43);
        ctx.lineTo(-5, -51);
        ctx.lineTo(-2, -43);
        ctx.fill();

        // Eyes (Anime cute anime cat eyes)
        ctx.fillStyle = '#ff4081';
        ctx.beginPath();
        ctx.ellipse(4, -32, 2.5, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(4.5, -33.5, 1, 0, Math.PI * 2);
        ctx.fill();

        // Serving Tray Shield (Arm & Metal Tray)
        ctx.fillStyle = '#b0bec5';
        ctx.save();
        if (unit.state === 'ATTACK_STRIKE') {
            ctx.translate(16, -26);
            ctx.rotate(0.4);
            ctx.fillRect(-4, -20, 8, 40); // Slam tray!
        } else {
            ctx.fillRect(8, -40, 6, 32); // Defensive hold
        }
        ctx.restore();
    }

    // 2. Blade Maiden Aoi (Swordswoman DPS)
    drawBladeMaiden(ctx, unit, legAngle) {
        // Legs (Hakama boots)
        ctx.strokeStyle = '#1a237e';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-6, -18);
        ctx.lineTo(-6 - legAngle * 14, 0);
        ctx.moveTo(6, -18);
        ctx.lineTo(6 + legAngle * 14, 0);
        ctx.stroke();

        // Kimono Robe
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-12, -22);
        ctx.lineTo(12, -22);
        ctx.lineTo(15, -6);
        ctx.lineTo(-15, -6);
        ctx.closePath();
        ctx.fill();
        // Blue Obi sash
        ctx.fillStyle = '#0288d1';
        ctx.fillRect(-12, -23, 24, 7);

        // Head
        ctx.fillStyle = '#ffe0bd';
        ctx.beginPath();
        ctx.arc(0, -36, 14, 0, Math.PI * 2);
        ctx.fill();

        // Blue ponytail hair
        ctx.fillStyle = unit.hairColor;
        ctx.beginPath();
        ctx.arc(0, -38, 15, Math.PI, 0);
        ctx.fill();
        // High ponytail swooshing back
        ctx.beginPath();
        const swoosh = unit.state === 'WALK' ? Math.sin(unit.walkCycle) * 4 : 0;
        ctx.ellipse(-16 + swoosh, -44, 14, 6, 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Cool eyes
        ctx.fillStyle = '#0288d1';
        ctx.beginPath();
        ctx.ellipse(4, -36, 2.5, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Katana Sword
        ctx.save();
        if (unit.state === 'ATTACK_WINDUP') {
            ctx.translate(-10, -35);
            ctx.rotate(-1.2);
            ctx.fillStyle = '#cfd8dc';
            ctx.fillRect(0, -3, 38, 5);
        } else if (unit.state === 'ATTACK_STRIKE') {
            ctx.translate(14, -25);
            ctx.rotate(0.6);
            ctx.fillStyle = '#81d4fa';
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 15;
            ctx.fillRect(0, -3, 48, 6);
        } else {
            // Idle / Sheathed carry
            ctx.translate(6, -24);
            ctx.rotate(0.3);
            ctx.fillStyle = '#cfd8dc';
            ctx.fillRect(0, -2, 34, 4);
        }
        ctx.restore();
    }

    // 3. Mage Lily (Ranged AoE)
    drawMageLily(ctx, unit, legAngle) {
        // Robe skirt
        ctx.fillStyle = '#4a148c';
        ctx.beginPath();
        ctx.moveTo(-16, -18);
        ctx.lineTo(16, -18);
        ctx.lineTo(20, 0);
        ctx.lineTo(-20, 0);
        ctx.closePath();
        ctx.fill();

        // Capelet
        ctx.fillStyle = '#7b1fa2';
        ctx.fillRect(-12, -32, 24, 15);

        // Head
        ctx.fillStyle = '#ffe0bd';
        ctx.beginPath();
        ctx.arc(0, -38, 13, 0, Math.PI * 2);
        ctx.fill();

        // Purple anime hair
        ctx.fillStyle = unit.hairColor;
        ctx.beginPath();
        ctx.arc(0, -40, 14, Math.PI, 0);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-12, -32, 4, 12, 0, 0, Math.PI * 2);
        ctx.ellipse(12, -32, 4, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Witch Hat
        ctx.fillStyle = '#311b92';
        ctx.beginPath();
        ctx.ellipse(0, -46, 22, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-14, -46);
        ctx.lineTo(0, -74);
        ctx.lineTo(14, -46);
        ctx.closePath();
        ctx.fill();
        // Gold star ribbon
        ctx.fillStyle = '#ffd54f';
        ctx.fillRect(-10, -50, 20, 4);

        // Staff with floating magical star
        ctx.save();
        ctx.strokeStyle = '#8d6e63';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(14, -4);
        ctx.lineTo(18, -60);
        ctx.stroke();

        // Glowing star on staff tip
        ctx.translate(18, -65);
        ctx.rotate(Date.now() * 0.003);
        ctx.fillStyle = '#ea80fc';
        ctx.shadowColor = '#e040fb';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // 4. Valkyrie Freya (Uber Heavy Striker)
    drawValkyrieFreya(ctx, unit, legAngle) {
        // Angelic Feathered Wings (Flapping in wind)
        ctx.save();
        const wingFlap = Math.sin(Date.now() * 0.006) * 0.15;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffe082';
        ctx.shadowBlur = 16;
        // Left Wing
        ctx.save();
        ctx.translate(-15, -45);
        ctx.rotate(-0.4 + wingFlap);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-45, -45, -60, -10);
        ctx.quadraticCurveTo(-30, 20, 0, 0);
        ctx.fill();
        ctx.restore();
        // Right Wing
        ctx.save();
        ctx.translate(15, -45);
        ctx.rotate(0.4 - wingFlap);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(45, -45, 60, -10);
        ctx.quadraticCurveTo(30, 20, 0, 0);
        ctx.fill();
        ctx.restore();
        ctx.restore();

        // Armored Skirt
        ctx.fillStyle = '#c2185b';
        ctx.beginPath();
        ctx.moveTo(-16, -25);
        ctx.lineTo(16, -25);
        ctx.lineTo(22, -4);
        ctx.lineTo(-22, -4);
        ctx.closePath();
        ctx.fill();

        // Golden Breastplate
        ctx.fillStyle = '#ffd54f';
        ctx.fillRect(-12, -40, 24, 18);

        // Head
        ctx.fillStyle = '#ffe0bd';
        ctx.beginPath();
        ctx.arc(0, -48, 14, 0, Math.PI * 2);
        ctx.fill();

        // Long Golden Hair
        ctx.fillStyle = '#fff59d';
        ctx.beginPath();
        ctx.arc(0, -50, 16, Math.PI, 0);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-14, -36, 5, 18, 0.1, 0, Math.PI * 2);
        ctx.ellipse(14, -36, 5, 18, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Golden Winged Tiara / Halo
        ctx.strokeStyle = '#ffd54f';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(0, -68, 18, 5, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Light Spear of Destiny
        ctx.save();
        if (unit.state === 'ATTACK_STRIKE') {
            ctx.translate(30, -40);
            ctx.rotate(0.2);
            ctx.fillStyle = '#ffd54f';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 20;
            ctx.fillRect(-10, -4, 90, 8);
        } else {
            ctx.translate(12, -40);
            ctx.rotate(-0.3);
            ctx.fillStyle = '#fff59d';
            ctx.fillRect(-8, -4, 75, 6);
        }
        ctx.restore();
    }

    // --- ENEMY MONSTERS & BOSS ---

    // Shadow Slime
    drawShadowSlime(ctx, unit) {
        ctx.save();
        const squish = Math.sin(Date.now() * 0.008) * 0.15;
        ctx.scale(1 + squish, 1 - squish);
        ctx.fillStyle = '#7e57c2';
        ctx.shadowColor = '#b388ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, -18, 20, 0, Math.PI * 2);
        ctx.fill();

        // Big Anime Demon Eye
        ctx.fillStyle = '#ff1744';
        ctx.beginPath();
        ctx.arc(4, -18, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(4, -18, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(2, -20, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Abyss Hound
    drawAbyssHound(ctx, unit, legAngle) {
        ctx.fillStyle = '#261729';
        // Body
        ctx.beginPath();
        ctx.ellipse(0, -16, 24, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Glowing red spikes
        ctx.fillStyle = '#ff1744';
        ctx.beginPath();
        ctx.moveTo(-10, -26);
        ctx.lineTo(-4, -36);
        ctx.lineTo(2, -26);
        ctx.fill();

        // Head & Jaw
        ctx.fillStyle = '#1b101d';
        ctx.beginPath();
        ctx.arc(18, -22, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff1744';
        ctx.beginPath();
        ctx.arc(22, -24, 3, 0, Math.PI * 2);
        ctx.fill();

        // Running Legs
        ctx.strokeStyle = '#261729';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-12, -12);
        ctx.lineTo(-12 - legAngle * 18, 0);
        ctx.moveTo(12, -12);
        ctx.lineTo(12 + legAngle * 18, 0);
        ctx.stroke();
    }

    // Dark Sorceress
    drawDarkSorceress(ctx, unit, legAngle) {
        // Hood & Cloak
        ctx.fillStyle = '#311432';
        ctx.beginPath();
        ctx.moveTo(-14, -20);
        ctx.lineTo(14, -20);
        ctx.lineTo(18, 0);
        ctx.lineTo(-18, 0);
        ctx.closePath();
        ctx.fill();

        // Head & Horned Hood
        ctx.beginPath();
        ctx.arc(0, -36, 13, 0, Math.PI * 2);
        ctx.fill();

        // Glowing sinister red eyes
        ctx.fillStyle = '#ff1744';
        ctx.shadowColor = '#ff1744';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(4, -35, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Floating dark magic orb
        ctx.save();
        ctx.translate(18, -35 + Math.sin(Date.now() * 0.007) * 6);
        ctx.fillStyle = '#d500f9';
        ctx.shadowColor = '#d500f9';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Demon Overlord (Boss Titan)
    drawDemonOverlord(ctx, unit, legAngle) {
        // Giant Demonic Body
        ctx.fillStyle = '#1f0d1a';
        ctx.beginPath();
        ctx.ellipse(0, -45, 32, 45, 0, 0, Math.PI * 2);
        ctx.fill();

        // Lava Veins / Chest Core
        ctx.fillStyle = '#ff3d00';
        ctx.shadowColor = '#ff3d00';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.ellipse(4, -48, 12, 16, 0, 0, Math.PI * 2);
        ctx.fill();

        // Giant Horns
        ctx.fillStyle = '#3e1b32';
        ctx.beginPath();
        ctx.moveTo(-16, -70);
        ctx.quadraticCurveTo(-45, -110, -65, -95);
        ctx.quadraticCurveTo(-40, -80, -10, -65);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(16, -70);
        ctx.quadraticCurveTo(45, -110, 65, -95);
        ctx.quadraticCurveTo(40, -80, 10, -65);
        ctx.fill();

        // Burning Shoulders
        ctx.fillStyle = '#d50000';
        ctx.fillRect(-35, -75, 20, 20);
        ctx.fillRect(15, -75, 20, 20);

        // Huge Cleaver Weapon
        ctx.save();
        ctx.translate(28, -50);
        if (unit.state === 'ATTACK_STRIKE') {
            ctx.rotate(0.9);
        } else {
            ctx.rotate(-0.2);
        }
        ctx.fillStyle = '#212121';
        ctx.fillRect(-6, -60, 12, 110);
        ctx.fillStyle = '#ff1744';
        ctx.fillRect(4, -55, 18, 90);
        ctx.restore();
    }

    // --- PROJECTILES & VFX ---

    drawProjectile(proj) {
        const ctx = this.ctx;
        ctx.save();

        if (proj.constructor.name === 'SlashEffect') {
            const isHeroOwner = proj.owner && ['goku', 'naruto', 'gon', 'killua', 'kirua', 'zoro', 'ichigo', 'kenshin', 'gintoki', 'luffy', 'tanjiro', 'tsuna', 'yo', 'jinwoo'].includes(proj.owner.id);
            if (isHeroOwner) {
                // High-Impact Hit Burst on Enemy (lets hero's raw sprite art shine without being covered)
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const progress = 1 - (proj.life / proj.maxLife);
                const pulse = Math.sin(progress * Math.PI);
                const burstColor = proj.color || '#ffeb3b';

                // Expanding impact shockwave ring
                ctx.strokeStyle = burstColor;
                ctx.shadowColor = burstColor;
                ctx.shadowBlur = 25;
                ctx.lineWidth = Math.max(1, 4 * (1 - progress));
                ctx.beginPath();
                ctx.arc(0, 0, (proj.radius * 0.35) + progress * 28, 0, Math.PI * 2);
                ctx.stroke();

                // Bright center core impact flash
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, Math.max(0, 10 * pulse), 0, Math.PI * 2);
                ctx.fill();

                // Impact sparks
                for (let i = 0; i < 5; i++) {
                    const ang = (i * Math.PI * 2 / 5) + progress * 4;
                    const dist = 14 + progress * 26;
                    ctx.fillStyle = burstColor;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * dist, Math.sin(ang) * dist, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
                ctx.restore();
                return;
            }

            if (proj.isRasengan) {
                // Swirling Rasengan Chakra Sphere
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.025;
                ctx.rotate(rot);

                // Cyan Chakra Aura Glow
                ctx.shadowColor = '#00e5ff';
                ctx.shadowBlur = 25;
                ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(0, 0, 24 + Math.sin(rot * 2) * 3, 0, Math.PI * 2);
                ctx.fill();

                // Swirling Spiral Energy Arcs
                ctx.strokeStyle = '#e0f7fa';
                ctx.lineWidth = 3;
                for (let a = 0; a < 3; a++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, 16, a * (Math.PI * 2 / 3), a * (Math.PI * 2 / 3) + 1.8);
                    ctx.stroke();
                }

                // White Chakra Core
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            } else if (proj.isKamehameha) {
                // Golden Dragon Ball Ki Blast / Kamehameha Energy Sphere
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.03;

                // Golden Ki Aura Flare
                ctx.shadowColor = '#ffd54f';
                ctx.shadowBlur = 30;
                ctx.fillStyle = 'rgba(255, 215, 0, 0.45)';
                ctx.beginPath();
                ctx.arc(0, 0, 24 + Math.sin(rot * 2) * 3, 0, Math.PI * 2);
                ctx.fill();

                // Cyan / White Kamehameha Energy Core
                ctx.shadowColor = '#00e5ff';
                ctx.shadowBlur = 20;
                ctx.fillStyle = '#80d8ff';
                ctx.beginPath();
                ctx.arc(0, 0, 15, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, 8, 0, Math.PI * 2);
                ctx.fill();

                // Sparking Ki arcs
                ctx.strokeStyle = '#fff59d';
                ctx.lineWidth = 2.5;
                for (let a = 0; a < 4; a++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, 18, a * (Math.PI / 2) + rot, a * (Math.PI / 2) + rot + 0.8);
                    ctx.stroke();
                }
                ctx.restore();
            } else if (proj.isGomuGomu) {
                // Luffy: Gomu Gomu no Pistol Shockwave
                ctx.save();
                ctx.translate(proj.x, proj.y);
                ctx.shadowColor = '#ff5722';
                ctx.shadowBlur = 24;

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(0, 0, 22, 0, Math.PI * 2);
                ctx.stroke();

                ctx.strokeStyle = '#ff9800';
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.arc(0, 0, 32, 0, Math.PI * 2);
                ctx.stroke();

                ctx.fillStyle = '#ffeb3b';
                for (let a = 0; a < 6; a++) {
                    const ang = a * (Math.PI / 3);
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 28, Math.sin(ang) * 28, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else if (proj.isWaterBreathing) {
                // Tanjiro: Water Breathing Curved Wave Slash
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.02;

                ctx.shadowColor = '#00e5ff';
                ctx.shadowBlur = 25;
                ctx.strokeStyle = '#00b0ff';
                ctx.lineWidth = 8;
                ctx.beginPath();
                ctx.arc(0, 0, 30, -1.2, 1.2);
                ctx.stroke();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(0, 0, 26, -1.0, 1.0);
                ctx.stroke();

                ctx.fillStyle = '#e0f7fa';
                for (let a = 0; a < 5; a++) {
                    const ang = -1.0 + a * 0.5 + Math.sin(rot + a) * 0.2;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 34, Math.sin(ang) * 34, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else if (proj.isLightning) {
                // Killua: Godspeed Electric Lightning Sparks
                ctx.save();
                ctx.translate(proj.x, proj.y);
                ctx.shadowColor = '#00e5ff';
                ctx.shadowBlur = 30;

                ctx.fillStyle = 'rgba(0, 229, 255, 0.35)';
                ctx.beginPath();
                ctx.arc(0, 0, 26, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                for (let a = 0; a < 4; a++) {
                    const baseAng = a * (Math.PI / 2) + (Math.random() - 0.5) * 0.4;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(Math.cos(baseAng) * 15, Math.sin(baseAng) * 15 + (Math.random() - 0.5) * 6);
                    ctx.lineTo(Math.cos(baseAng) * 30, Math.sin(baseAng) * 30);
                    ctx.stroke();
                }
                ctx.restore();
            } else if (proj.isGetsuga) {
                // Ichigo: Getsuga Tensho (Black & Crimson Crescent Wave)
                ctx.save();
                ctx.translate(proj.x, proj.y);

                ctx.shadowColor = '#ff1744';
                ctx.shadowBlur = 35;
                ctx.strokeStyle = '#d50000';
                ctx.lineWidth = 14;
                ctx.beginPath();
                const dir = proj.isPlayer ? 1 : -1;
                ctx.arc(0, 0, 42, -1.1 * dir, 1.1 * dir);
                ctx.stroke();

                ctx.strokeStyle = '#111111';
                ctx.lineWidth = 8;
                ctx.beginPath();
                ctx.arc(0, 0, 40, -1.0 * dir, 1.0 * dir);
                ctx.stroke();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 38, -0.9 * dir, 0.9 * dir);
                ctx.stroke();
                ctx.restore();
            } else if (proj.isXBurner) {
                // Tsuna: Dying Will Flame / X-Burner Blast
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.015;

                ctx.shadowColor = '#ff6d00';
                ctx.shadowBlur = 45;

                // 1. Blazing Orange Hyper Dying Will Outer Flame
                const flameGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 44);
                flameGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
                flameGrad.addColorStop(0.3, 'rgba(255, 214, 0, 0.85)');
                flameGrad.addColorStop(0.7, 'rgba(255, 109, 0, 0.6)');
                flameGrad.addColorStop(1, 'rgba(216, 27, 96, 0)');
                ctx.fillStyle = flameGrad;
                ctx.beginPath();
                ctx.arc(0, 0, 44, 0, Math.PI * 2);
                ctx.fill();

                // 2. White-hot Core Blast Beam / Sphere
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ffe57f';
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(0, 0, 18, 0, Math.PI * 2);
                ctx.fill();

                // 3. Swirling Flame Rings
                ctx.strokeStyle = '#ffd54f';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.ellipse(0, 0, 34, 16, rot, 0, Math.PI * 2);
                ctx.stroke();

                ctx.strokeStyle = '#ff6d00';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.ellipse(0, 0, 36, 18, -rot * 1.3, 0, Math.PI * 2);
                ctx.stroke();

                // 4. Fiery Sparks
                ctx.fillStyle = '#ff9100';
                for (let a = 0; a < 6; a++) {
                    const ang = a * (Math.PI / 3) + rot * 2;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 38, Math.sin(ang) * 38, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else if (proj.isShadowStrike) {
                // Jinwoo: Shadow Monarch Dual Dagger Cross Slash
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const rot = Date.now() * 0.02;

                ctx.shadowColor = '#b388ff';
                ctx.shadowBlur = 35;

                // Purple shadow aura burst
                ctx.fillStyle = 'rgba(124, 77, 255, 0.25)';
                ctx.beginPath();
                ctx.arc(0, 0, 36, 0, Math.PI * 2);
                ctx.fill();

                // Dagger Slash 1 (diagonal +)
                ctx.save();
                ctx.rotate(0.4);
                ctx.strokeStyle = '#651fff';
                ctx.lineWidth = 9;
                ctx.beginPath();
                ctx.arc(0, 0, 38, -1.0, 1.0);
                ctx.stroke();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 37, -0.9, 0.9);
                ctx.stroke();
                ctx.restore();

                // Dagger Slash 2 (diagonal - cross)
                ctx.save();
                ctx.rotate(-0.4);
                ctx.strokeStyle = '#7c4dff';
                ctx.lineWidth = 9;
                ctx.beginPath();
                ctx.arc(0, 0, 38, -1.0, 1.0);
                ctx.stroke();

                ctx.strokeStyle = '#ede7f6';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 37, -0.9, 0.9);
                ctx.stroke();
                ctx.restore();

                // Shadow wisps
                ctx.fillStyle = '#b388ff';
                for (let a = 0; a < 6; a++) {
                    const ang = a * (Math.PI / 3) + rot;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 40, Math.sin(ang) * 40, 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else if (proj.isOverSoul) {
                // Yoh: Over Soul Harusame (Colossal Radiant Spirit Blade Cleave)
                ctx.save();
                ctx.translate(proj.x, proj.y);
                const dir = proj.isPlayer ? 1 : -1;

                ctx.shadowColor = '#00e676';
                ctx.shadowBlur = 40;

                // Spirit Flame Aura
                ctx.strokeStyle = '#00e676';
                ctx.lineWidth = 16;
                ctx.beginPath();
                ctx.arc(0, 0, 52, -1.15 * dir, 1.15 * dir);
                ctx.stroke();

                // Emerald Blade Energy
                ctx.strokeStyle = '#69f0ae';
                ctx.lineWidth = 8;
                ctx.beginPath();
                ctx.arc(0, 0, 50, -1.05 * dir, 1.05 * dir);
                ctx.stroke();

                // Core White Shaman Light
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 48, -0.95 * dir, 0.95 * dir);
                ctx.stroke();

                // Spirit Sparks
                ctx.fillStyle = '#b9f6ca';
                for (let a = 0; a < 6; a++) {
                    const ang = (-1.0 + a * 0.4) * dir;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * 58, Math.sin(ang) * 58, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            } else {
                ctx.strokeStyle = proj.color;
                ctx.shadowColor = proj.color;
                ctx.shadowBlur = 14;
                ctx.lineWidth = 6;
                ctx.beginPath();
                const sweep = proj.isPlayer ? 0.8 : -0.8;
                ctx.arc(proj.x, proj.y, proj.radius, -sweep, sweep);
                ctx.stroke();
            }
        } else if (proj.constructor.name === 'MagicOrb') {
            ctx.fillStyle = proj.color;
            ctx.shadowColor = proj.color;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, 14, 0, Math.PI * 2);
            ctx.fill();
        } else if (proj.constructor.name === 'SpearBeam') {
            ctx.strokeStyle = '#fff59d';
            ctx.shadowColor = '#ffd54f';
            ctx.shadowBlur = 25;
            ctx.lineWidth = 14;
            ctx.beginPath();
            ctx.moveTo(proj.x, proj.y);
            ctx.lineTo(proj.targetX, proj.y);
            ctx.stroke();
        } else if (proj.constructor.name === 'BossSlamEffect') {
            ctx.strokeStyle = '#d50000';
            ctx.shadowColor = '#ff1744';
            ctx.shadowBlur = 30;
            ctx.lineWidth = 12;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, proj.radius, Math.PI, 0);
            ctx.stroke();
        }

        ctx.restore();
    }

    // Full-lane Aether Cannon Beam (Anime Hyper Beam)
    drawAetherLaser(startX, startY, timer) {
        const ctx = this.ctx;
        ctx.save();

        const beamThickness = Math.sin((timer / 0.8) * Math.PI) * 70 + 20;

        // Outer glow beam
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.7)';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 40;
        ctx.lineWidth = beamThickness + 30;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + 3000, startY);
        ctx.stroke();

        // Inner white core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = beamThickness * 0.4;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + 3000, startY);
        ctx.stroke();

        ctx.restore();
    }
}
