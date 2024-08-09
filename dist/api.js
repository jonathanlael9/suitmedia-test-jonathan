document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
  const params = {
    page: {
      number: 1,
      size: 10,
    },
    append: ['small_image', 'medium_image'],
    sort: 'published_at',
  };

  function fetchIdeas() {
    const url = new URL(apiUrl);
    url.search = new URLSearchParams({
      'page[number]': params.page.number,
      'page[size]': params.page.size,
      'append[]': params.append,
      sort: params.sort,
    }).toString();

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  fetchIdeas();
});
