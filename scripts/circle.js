// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('circleCanvas');
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
    
    // Create a magical glowing bubble with sparkles
    function drawMagicalBubble() {
        // Outer glow
        ctx.beginPath();
        const outerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 120);
        outerGradient.addColorStop(0, 'rgba(255, 182, 193, 0.8)');
        outerGradient.addColorStop(0.3, 'rgba(147, 112, 219, 0.6)');
        outerGradient.addColorStop(0.7, 'rgba(100, 149, 237, 0.4)');
        outerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx.fillStyle = outerGradient;
        ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
        ctx.fill();
        
        // Main bubble body
        ctx.beginPath();
        const mainGradient = ctx.createRadialGradient(centerX - 30, centerY - 30, 0, centerX, centerY, 90);
        mainGradient.addColorStop(0, '#FFE4E1');
        mainGradient.addColorStop(0.3, '#FFB6C1');
        mainGradient.addColorStop(0.6, '#DDA0DD');
        mainGradient.addColorStop(1, '#9370DB');
        ctx.fillStyle = mainGradient;
        ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight for 3D effect
        ctx.beginPath();
        const highlightGradient = ctx.createRadialGradient(centerX - 25, centerY - 25, 0, centerX - 25, centerY - 25, 40);
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = highlightGradient;
        ctx.arc(centerX - 25, centerY - 25, 40, 0, Math.PI * 2);
        ctx.fill();
        
        // Add sparkles around the bubble
        drawSparkles();
        
        // Add a subtle face for character
        drawBubbleFace();
    }
    
    function drawSparkles() {
        const sparkleColors = ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#98FB98'];
        
        for (let i = 0; i < 15; i++) {
            const angle = (Math.PI * 2 * i) / 15;
            const radius = 110 + Math.random() * 20;
            const sparkleX = centerX + Math.cos(angle) * radius;
            const sparkleY = centerY + Math.sin(angle) * radius;
            
            ctx.save();
            ctx.translate(sparkleX, sparkleY);
            ctx.rotate(angle + Math.PI / 4);
            
            // Draw star sparkle
            ctx.beginPath();
            ctx.fillStyle = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
            
            for (let j = 0; j < 4; j++) {
                ctx.rotate(Math.PI / 2);
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -8);
                ctx.lineTo(2, -2);
                ctx.lineTo(8, 0);
                ctx.lineTo(2, 2);
                ctx.lineTo(0, 8);
                ctx.lineTo(-2, 2);
                ctx.lineTo(-8, 0);
                ctx.lineTo(-2, -2);
                ctx.closePath();
            }
            ctx.fill();
            ctx.restore();
        }
    }
    
    function drawBubbleFace() {
        // Eyes
        ctx.fillStyle = 'rgba(75, 0, 130, 0.7)';
        ctx.beginPath();
        ctx.arc(centerX - 20, centerY - 15, 5, 0, Math.PI * 2);
        ctx.arc(centerX + 20, centerY - 15, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye highlights
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(centerX - 18, centerY - 17, 2, 0, Math.PI * 2);
        ctx.arc(centerX + 22, centerY - 17, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Smile
        ctx.strokeStyle = 'rgba(75, 0, 130, 0.6)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(centerX, centerY + 5, 15, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
    }
    

    drawMagicalBubble();
    

    let isAnimating = false;
    
    canvas.addEventListener('mouseenter', function() {
        if (!isAnimating) {
            isAnimating = true;
            animateBubble();
        }
    });
    
    function animateBubble() {
        let frame = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
            
            // Create floating effect
            const offsetY = Math.sin(frame * 0.1) * 5;
            
            ctx.save();
            ctx.translate(0, offsetY);
            drawMagicalBubble();
            ctx.restore();
            
            frame++;
            
            if (frame < 100) {
                requestAnimationFrame(animate);
            } else {
                isAnimating = false;
                ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
                drawMagicalBubble();
            }
        };
        animate();
    }
});