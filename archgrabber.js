const subredditName = 'ArchitecturePorn';
const numberOfPosts = 10;

async function getTopImages() {
  const response = await fetch(`https://www.reddit.com/r/${subredditName}/top.json?sort=top&t=day&limit=${numberOfPosts}`);
  const json = await response.json();
  const children = json.data.children;
  const images = children.filter(child => child.data.post_hint === 'image').map(child => child.data.url);

  displayImages(images);
}

function displayImages(images) {
  const container = document.getElementById('image-container');

  images.forEach(image => {
    const img = document.createElement('img');
    img.src = image;
    container.appendChild(img);
  });
}

getTopImages();
