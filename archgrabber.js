function displayImages(images) {
  let index = 0;
  const container = document.getElementById('image-container');
  const img = document.createElement('img');
  container.appendChild(img);

  function resizeImage() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const maxWidth = windowWidth - 50; // Allow some padding
    const maxHeight = windowHeight - 50;
    const image = new Image();
    image.onload = () => {
      let width = image.width;
      let height = image.height;
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width *= ratio;
        height *= ratio;
      }
      if (height > maxHeight) {
        const ratio = maxHeight / height;
        width *= ratio;
        height *= ratio;
      }
      img.width = width;
      img.height = height;
    }
    image.src = images[index];
  }

  function showNextImage() {
    index++;
    if (index >= images.length) {
      index = 0;
    }
    img.src = images[index];
  }

  img.onload = () => {
    resizeImage();
    setInterval(() => {
      showNextImage();
      resizeImage();
    }, 3000);
  }
  
  img.src = images[index];
}
