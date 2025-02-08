
document.addEventListener("DOMContentLoaded", function() {
    const botaoCriarPagina = document.getElementById("criarPaginaBtn");

    // Garantir que o evento de clique seja tratado
    if (botaoCriarPagina) {
        botaoCriarPagina.addEventListener("click", function (event) {
            event.preventDefault();  // Impede o envio do formulário e o recarregamento da página

            // Atualiza a pré-visualização com as informações do formulário
            atualizarPrevisualizacao();

            // Simula o pagamento Pix
            mostrarLinkPagamentoSimulado();
        });
    }

    // Função para atualizar a pré-visualização
    function atualizarPrevisualizacao() {
        // Nome do casal
        document.getElementById("preview-names").textContent = document.getElementById("names").value;
        
        // Mensagem romântica
        document.getElementById("preview-message").textContent = document.getElementById("romanticMessage").value;

        // Fotos do casal
        let photos = document.getElementById("photos").files;
        let slider = document.getElementById("photo-slider");
        slider.innerHTML = "";
        if (photos.length > 0) {
            for (let i = 0; i < photos.length; i++) {
                let img = document.createElement("img");
                img.src = URL.createObjectURL(photos[i]);
                slider.appendChild(img);
            }
            slider.firstChild.style.display = "block";  // Mostra a primeira foto
            let index = 0;
            setInterval(() => {
                slider.children[index].style.display = "none";
                index = (index + 1) % photos.length;
                slider.children[index].style.display = "block";
            }, 3000);
        }

        // Música do YouTube
        let youtubeURL = document.getElementById("youtubeLink").value;
        let match = youtubeURL.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&]+)/);
        if (match) {
            document.getElementById("preview-video").src = `https://www.youtube.com/embed/${match[1]}`;
            document.getElementById("preview-video").style.display = "block";  // Exibe o vídeo
        }

        // Data de início do namoro e contador de tempo
        let startDate = new Date(document.getElementById("startDate").value);
        let now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        if (months < 0) {
            years--;
            months += 12;
        }

        let lastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        if (days < 0) {
            months--;
            days += lastMonth;
        }

        document.getElementById("countdown").textContent = 
            `🕰️ ${years} anos, ${months} meses, ${days} dias, ${hours}h ${minutes}m ${seconds}s`;
    }

    // Função para simular o pagamento Pix
    function mostrarLinkPagamentoSimulado() {
        alert("Simulação: A cobrança via Pix foi criada!");
        const pixLink = "https://pagamento-pix-simulado.com";  // Link simulado de pagamento
        const qrCodeSimulado = "https://via.placeholder.com/150";  // Imagem simulada do QR Code

        // Exibir o link de pagamento simulado
        let pagamentoDiv = document.createElement("div");
        pagamentoDiv.innerHTML = `<p>Clique para pagar via Pix: <a href="${pixLink}" target="_blank">${pixLink}</a></p>`;
        document.body.appendChild(pagamentoDiv);

        // Exibir o QR Code simulado
        let imgQrCode = document.createElement("img");
        imgQrCode.src = qrCodeSimulado;
        document.body.appendChild(imgQrCode);
    }
});
