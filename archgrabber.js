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
  img.src = images[index];
  container.appendChild(img);

  setInterval(() => {
    index++;
    if (index >= images.length) {
      index = 0;
    }
    img.src = images[index];
  }, 3000);
}

getTopImages();
