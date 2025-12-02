const menuItems = [
  {
    id: 1,
    name: "Grilled Salmon",
    price: "$24.00",
    category: "mains",
    image: "menu1.jpg",
    desc: "Fresh Atlantic salmon with herbs"
  },
  {
    id: 2,
    name: "Bruschetta",
    price: "$12.00",
    category: "starters",
    image: "menu2.jpg",
    desc: "Toasted bread with tomatoes & basil"
  },
  {
    id: 3,
    name: "Tiramisu",
    price: "$10.00",
    category: "desserts",
    image: "menu3.jpg",
    desc: "Classic Italian coffee-flavored dessert"
  },
  {
    id: 4,
    name: "Lamb Chops",
    price: "$32.00",
    category: "mains",
    image: "menu4.jpg",
    desc: "Tender lamb chops with mint sauce"
  },
  {
    id: 5,
    name: "Caesar Salad",
    price: "$14.00",
    category: "starters",
    image: "menu5.jpg",
    desc: "Crispy romaine with parmesan"
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    price: "$11.00",
    category: "desserts",
    image: "menu6.jpg",
    desc: "Warm chocolate cake with liquid center"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');

  mobileBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    // Animate hamburger to X
    const spans = mobileBtn.querySelectorAll('span');
    if (navList.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      const spans = mobileBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Populate Menu
  const menuGrid = document.getElementById('menu-grid');
  const categoryBtns = document.querySelectorAll('.category-btn');

  function renderMenu(category = 'all') {
    menuGrid.innerHTML = '';
    const filteredItems = category === 'all'
      ? menuItems
      : menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'menu-item fade-in-up';
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-info">
          <div class="menu-header">
            <span class="menu-title">${item.name}</span>
            <span class="menu-price">${item.price}</span>
          </div>
          <p class="menu-desc">${item.desc}</p>
        </div>
      `;
      menuGrid.appendChild(itemEl);
    });

    // Re-trigger observer for new elements
    observeElements();
  }

  renderMenu();

  // Category Filtering
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.category);
    });
  });

  // Scroll Animations (Intersection Observer)
  function observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
      observer.observe(el);
    });
  }

  observeElements();

  // Form Submission
  const form = document.getElementById('orderForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your order! We will contact you shortly to confirm.');
    form.reset();
  });
});
