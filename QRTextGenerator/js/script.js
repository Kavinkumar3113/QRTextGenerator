document.getElementById('qrInput').addEventListener('change', async function () {
    const file = this.files[0];

    if (file) {
        const canvas = document.getElementById('qrCanvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Using a QR code decoding library like jsQR
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                document.getElementById('result').value = code.data;
            } else {
                alert('No QR code detected. Please try again with a clear QR image.');
            }
        };

        img.src = URL.createObjectURL(file);
    } else {
        alert('Please upload a valid image.');
    }
});
