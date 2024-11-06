function toggleVisibility(amountId, eyeIcon) {
    const amountElement = document.getElementById(amountId);
    if (amountElement.style.display === "none") {
        amountElement.style.display = "block"; 
        eyeIcon.src = "../imgs/olho.png"; 
    } else {
        amountElement.style.display = "none"; 
        eyeIcon.src = "../imgs/olho.png"; 
    }
}

