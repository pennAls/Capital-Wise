window.onload = function () {
    const canvas = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');

    // Define a largura e altura do canvas com base nas dimensões da caixa
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight - 30; // Reduz altura para acomodar o título

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffa500';
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Ponto inicial do gráfico
    ctx.moveTo(0, Math.random() * canvas.height);

    // Gerar linhas aleatórias para o gráfico
    for (let x = 20; x < canvas.width; x += 60) {
        const y = Math.random() * canvas.height;
        ctx.lineTo(x, y);
    }
    
    ctx.stroke();
};