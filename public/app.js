document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFEK MATRIX BACKGROUND
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0'; 
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 33);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // 2. EFEK TYPEWRITER (MENGETIK TEKS)
    const nameStr = "> Fadlan Rizky Lubis";
    const roleStr = "Computer Eng. | Cyber Security | Bug Bounty";
    let nameIndex = 0;
    let roleIndex = 0;
    const nameElement = document.getElementById('typewriter-name');
    const roleElement = document.getElementById('typewriter-role');

    function typeName() {
        if (nameIndex < nameStr.length) {
            nameElement.innerHTML += nameStr.charAt(nameIndex);
            nameIndex++;
            setTimeout(typeName, 100);
        } else {
            setTimeout(typeRole, 500);
        }
    }
    function typeRole() {
        if (roleIndex < roleStr.length) {
            roleElement.innerHTML += roleStr.charAt(roleIndex);
            roleIndex++;
            setTimeout(typeRole, 50);
        }
    }
    setTimeout(typeName, 800);

    // 3. EFEK SCROLL REVEAL
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal();

    // 4. CEK API PYTHON (Optional)
    async function loadAPI() {
        try {
            const response = await fetch('http://localhost:5000/api/projects');
            const data = await response.json();
            console.log("[+] Berhasil terhubung ke Backend Python.");
        } catch (e) {
            console.log("[-] Server API Python mati, tapi website tetap berjalan.");
        }
    }
    loadAPI();
});