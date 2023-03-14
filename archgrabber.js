const subredditName = 'ArchitecturePorn';
const numberOfPosts = 20;

async function getTopImages() {
  const response = await fetch(`https://www.reddit.com/r/${subredditName}/top.json?sort=top&t=day&limit=${numberOfPosts}`);
  const json = await response.json();
  const children = json.data.children;
  const images = children.filter(child => child.data.post_hint === 'image').map(child => child.data.url);

  displayImages(images);
}

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
    resizeImage();
  }

getTopImages();
