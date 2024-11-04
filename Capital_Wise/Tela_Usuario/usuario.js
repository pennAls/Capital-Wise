window.onload = function () {
    const canvas = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.strokeStyle = '#ffa500';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Ponto inicial
    ctx.moveTo(0, Math.random() * canvas.height);
    
    // Gerar linhas aleatórias
    for (let x = 20; x < canvas.width; x += 60) {
        const y = Math.random() * canvas.height;
        ctx.lineTo(x, y);
    }
    
    ctx.stroke();
};
