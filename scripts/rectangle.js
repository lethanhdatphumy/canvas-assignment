// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('rectangleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Center coordinates
    const centerX = canvas.width / (2 * dpr);
    const centerY = canvas.height / (2 * dpr);
    
    // Create a creative sticky note with details
    function drawCreativeStickyNote() {
        // Drop shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 8;
        
        // Main note body with gradient
        const noteWidth = 200;
        const noteHeight = 140;
        const noteX = centerX - noteWidth / 2;
        const noteY = centerY - noteHeight / 2;
        
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(noteX, noteY, noteX + noteWidth, noteY + noteHeight);
        gradient.addColorStop(0, '#FFEB3B');
        gradient.addColorStop(0.3, '#FFF176');
        gradient.addColorStop(0.7, '#FFEE58');
        gradient.addColorStop(1, '#FFD54F');
        ctx.fillStyle = gradient;
        
        // Create slightly curved corners
        ctx.roundRect(noteX, noteY, noteWidth, noteHeight, 8);
        ctx.fill();
        ctx.restore();
        
        // Add torn paper effect on top
        drawTornEdge(noteX, noteY, noteWidth);
        
        // Add decorative tape
        drawTape(noteX + noteWidth - 30, noteY - 10);
        
        // Add dotted pattern overlay
        drawDottedPattern(noteX, noteY, noteWidth, noteHeight);
        
        // Add lines like ruled paper
        drawRuledLines(noteX, noteY, noteWidth, noteHeight);
        
        // Add some "handwritten" text effect
        drawHandwrittenText(noteX, noteY, noteWidth, noteHeight);
        
        // Add a paper clip
        drawPaperClip(noteX - 15, noteY + 20);
    }
    
    function drawTornEdge(x, y, width) {
        ctx.fillStyle = '#F9C74F';
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // Create jagged torn effect
        for (let i = 0; i <= width; i += 8) {
            const jagHeight = Math.random() * 6 + 2;
            ctx.lineTo(x + i, y - jagHeight);
        }
        ctx.lineTo(x + width, y + 15);
        ctx.lineTo(x, y + 15);
        ctx.closePath();
        ctx.fill();
    }
    
    function drawTape(x, y) {
        // Tape shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;
        
        // Tape body
        ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.beginPath();
        ctx.roundRect(x, y, 40, 15, 2);
        ctx.fill();
        
        // Tape highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, 36, 4, 1);
        ctx.fill();
        
        ctx.restore();
    }
    
    function drawDottedPattern(x, y, width, height) {
        ctx.fillStyle = 'rgba(255, 193, 7, 0.3)';
        for (let i = 0; i < width; i += 12) {
            for (let j = 0; j < height; j += 12) {
                ctx.beginPath();
                ctx.arc(x + i + 6, y + j + 6, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    function drawRuledLines(x, y, width, height) {
        ctx.strokeStyle = 'rgba(33, 150, 243, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        
        for (let i = 25; i < height - 10; i += 18) {
            ctx.beginPath();
            ctx.moveTo(x + 15, y + i);
            ctx.lineTo(x + width - 15, y + i);
            ctx.stroke();
        }
        ctx.setLineDash([]);
    }
    
    function drawHandwrittenText(x, y, width, height) {
        ctx.strokeStyle = 'rgba(76, 175, 80, 0.8)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw some scribbled text lines
        const lines = [
            { y: 40, segments: [[20, 35], [45, 30], [70, 35], [95, 32]] },
            { y: 58, segments: [[20, 53], [55, 50], [90, 53], [125, 51]] },
            { y: 76, segments: [[20, 71], [40, 68], [65, 71]] },
            { y: 94, segments: [[20, 89], [75, 86], [120, 89]] }
        ];
        
        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(x + line.segments[0][0], y + line.segments[0][1]);
            line.segments.forEach(segment => {
                ctx.lineTo(x + segment[0], y + segment[1]);
            });
            ctx.stroke();
        });
        
        // Add a small doodle
        drawSmallDoodle(x + width - 40, y + height - 30);
    }
    
    function drawSmallDoodle(x, y) {
        // Draw a small heart doodle
        ctx.fillStyle = 'rgba(233, 30, 99, 0.7)';
        ctx.beginPath();
        ctx.arc(x - 5, y - 2, 4, 0, Math.PI * 2);
        ctx.arc(x + 5, y - 2, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(x - 8, y + 1);
        ctx.lineTo(x, y + 8);
        ctx.lineTo(x + 8, y + 1);
        ctx.closePath();
        ctx.fill();
    }
    
    function drawPaperClip(x, y) {
        ctx.strokeStyle = '#607D8B';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 25);
        ctx.lineTo(x + 8, y + 25);
        ctx.lineTo(x + 8, y + 5);
        ctx.lineTo(x + 15, y + 5);
        ctx.lineTo(x + 15, y + 30);
        ctx.lineTo(x - 5, y + 30);
        ctx.lineTo(x - 5, y - 5);
        ctx.stroke();
    }
    
    // Add roundRect method if not available
    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
            this.moveTo(x + radius, y);
            this.lineTo(x + width - radius, y);
            this.quadraticCurveTo(x + width, y, x + width, y + radius);
            this.lineTo(x + width, y + height - radius);
            this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            this.lineTo(x + radius, y + height);
            this.quadraticCurveTo(x, y + height, x, y + height - radius);
            this.lineTo(x, y + radius);
            this.quadraticCurveTo(x, y, x + radius, y);
            this.closePath();
        };
    }
    

    drawCreativeStickyNote();
    

    let isAnimating = false;
    
    canvas.addEventListener('mouseenter', function() {
        if (!isAnimating) {
            isAnimating = true;
            animateNote();
        }
    });
    
    function animateNote() {
        let frame = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
            

            const wiggleX = Math.sin(frame * 0.3) * 2;
            const wiggleY = Math.cos(frame * 0.2) * 1;
            
            ctx.save();
            ctx.translate(wiggleX, wiggleY);
            drawCreativeStickyNote();
            ctx.restore();
            
            frame++;
            
            if (frame < 60) {
                requestAnimationFrame(animate);
            } else {
                isAnimating = false;
                ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
                drawCreativeStickyNote();
            }
        };
        animate();
    }
});