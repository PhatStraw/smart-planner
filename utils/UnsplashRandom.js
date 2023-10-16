export async function getPhotos(query) {
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${process.env.NEXT_UNSPLASH_ACCESS}`);

  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  
  const data = await response.json();
  return data.urls.regular;
}