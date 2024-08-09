var LastScrollTop = 0;
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > LastScrollTop) {
    // Scroll ke bawah, sembunyikan navbar
    navbar.style.top = '-100px';
  } else {
    // Scroll ke atas, tampilkan navbar dan tambahkan transparansi
    navbar.style.top = '0';

    if (scrollTop > 0) {
      navbar.classList.add('transparent');
    } else {
      navbar.classList.remove('transparent');
    }
  }

  LastScrollTop = scrollTop;
});

navbar.addEventListener('mouseover', function () {
  // Hilangkan transparansi saat di-hover
  navbar.classList.remove('transparent');
});

navbar.addEventListener('mouseout', function () {
  // Tambahkan kembali transparansi jika tidak di puncak halaman
  if (window.pageYOffset > 0) {
    navbar.classList.add('transparent');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  let items = generateItems(100); // Assuming you have 100 items to display
  let currentPage = 1;
  let itemsPerPage = 10;
  let currentSort = 'newest';

  const showPerPageSelect = document.getElementById('showPerPage');
  const sortBySelect = document.getElementById('sortBy');
  const gridContainer = document.getElementById('gridContainer');
  const paginationContainer = document.getElementById('pagination');
  const showingInfo = document.getElementById('showing-info');

  showPerPageSelect.addEventListener('change', updatePage);
  sortBySelect.addEventListener('change', updatePage);

  function updatePage() {
    itemsPerPage = parseInt(showPerPageSelect.value);
    currentSort = sortBySelect.value;
    currentPage = 1;
    displayItems();
  }

  function displayItems() {
    let sortedItems = [...items];

    if (currentSort === 'newest') {
      sortedItems.sort((a, b) => b.date - a.date);
    } else if (currentSort === 'oldest') {
      sortedItems.sort((a, b) => a.date - b.date);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

    gridContainer.innerHTML = '';
    paginatedItems.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('grid-item');
      itemElement.innerHTML = `
              <img src="${item.image}" alt="${item.title}" loading="lazy">
              <div class="grid-item-date">${item.date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div class="grid-item-title">${item.title}</div>
          `;
      gridContainer.appendChild(itemElement);
    });

    const totalItems = sortedItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    paginationContainer.innerHTML = generatePagination(totalPages);
    showingInfo.textContent = `Showing ${startIndex + 1} - ${Math.min(startIndex + itemsPerPage, totalItems)} of ${totalItems}`;
  }

  function generatePagination(totalPages) {
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<span class="${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</span>`;
    }
    return paginationHTML;
  }

  paginationContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'SPAN') {
      currentPage = parseInt(event.target.dataset.page);
      displayItems();
    }
  });

  function generateItems(count) {
    const items = [];
    for (let i = 1; i <= count; i++) {
      items.push({
        id: i,
        title: `Tittle ${i} - Kenali Tingkat Influencers berdasarkan jumlah Followers Jangan Asal Pilih Influencer, Berikut Cara Menyusun`,
        image: `https://via.placeholder.com/150?text=Image+${i}`,
        date: new Date(2024, 7, 1 + (i % 30)),
      });
    }
    return items;
  }

  // Initial display
  displayItems();
});
