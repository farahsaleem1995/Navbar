let vpWidth = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
let vpHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);

// DOM Selection
const navbar = document.querySelector("nav");
const navContainer = document.querySelector(".nav-container");
const logo = document.querySelector(".logo");
const navList = document.querySelector(".nav-list");
const navItems = navList.querySelectorAll(".nav-list-item");
const navLinks = navList.querySelectorAll(".nav-list-item .nav-list-item-link");
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar span");
const dropdownLists = document.querySelectorAll(".nav-list .nav-list-item ul");

const overlay = document.querySelector(".overlay");
const showcase = document.querySelector(".showcase");
const hamburgerBtn = document.querySelector(".hamburger");
const svg = hamburgerBtn.querySelector("svg");
const paths = hamburgerBtn.querySelectorAll("svg path");

// Check search bar activation
let isSearch = false;
let searchValue = "";
// Check navigation list activation
let isNavList = false;
let isNavSubMenu = false;

// Search bar input placeholder
const message = "Enter something to search...";

// Update search bar style on window resizing
const updateSearhBar = width => {
  if (width > 960) {
    searchInput.value = searchValue;

    searchInput.setAttribute("placeholder", message);

    hamburgerBtn.style.display = "none";
    logo.style.display = "block";
  }
  if (width <= 960 && width > 640) {
    searchInput.value = searchValue;

    searchInput.setAttribute("placeholder", message);

    hamburgerBtn.style.display = "block";
    logo.style.display = "block";
  }
  if (width <= 640) {
    if (isSearch) {
      searchInput.setAttribute("placeholder", message);

      hamburgerBtn.style.display = "none";
      logo.style.display = "none";
    } else {
      searchInput.setAttribute("placeholder", "");
      searchInput.value = "";
      searchInput.blur();

      hamburgerBtn.style.display = "block";
    }
  }
};

// Update nav list style on window resizing
const updateNavList = width => {
  if (width > 960) {
    navList.style.paddingTop = 0;
    navLinks.forEach(item => {
      item.parentElement.style.display = "block";
    });
  } else {
    navList.style.paddingTop = "3.5rem";

    if (isNavSubMenu) {
      navList.classList.add("active");
      overlay.classList.add("active");

      dropdownLists.forEach(dropdownlist => {
        if (dropdownlist.classList.contains("active")) {
          navItems.forEach(navItem => {
            navItem.style.display = "none";
          });
          dropdownlist.parentElement.style.display = "block";
          navList.style.paddingTop = 0;
        }
      });
    }
  }
};

// Search bar activation button action
searchBtn.addEventListener("click", () => {
  if (vpWidth <= 640) {
    if (!isSearch) {
      isSearch = true;
      searchBar.classList.add("active");

      searchInput.setAttribute("placeholder", message);

      searchInput.value = searchValue;

      setTimeout(() => {
        searchInput.focus();
      }, 500);

      hamburgerBtn.style.display = "none";
      logo.style.display = "none";
    } else {
      isSearch = false;
      searchBar.classList.remove("active");

      searchInput.value = "";

      searchInput.setAttribute("placeholder", "");

      hamburgerBtn.style.display = "block";
      logo.style.display = "block";
    }
  } else {
    if (searchInput.value) {
      console.log("Search Submitting: " + searchInput.value);
    } else {
      console.log("empty");
    }
  }
});

// Stor search input text value
searchInput.addEventListener("input", () => {
  searchValue = searchInput.value;
});

// Nav list activation on smaller divice
hamburgerBtn.addEventListener("click", () => {
  if (!navList.classList.contains("active")) {
    isNavList = true;
    paths[0].setAttribute("d", "M1,4 23,22");
    paths[1].style.display = "none";
    paths[2].setAttribute("d", "M1,22 23,4");
  } else {
    isNavList = false;
    paths[0].setAttribute("d", "M0,6 25,6");
    paths[1].style.display = "block";
    paths[2].setAttribute("d", "M0,20 25,20");
  }
  navList.classList.toggle("active");
  svg.classList.toggle("active");
  overlay.classList.toggle("active");
});

const dropdownCloseAll = () => {
  dropdownLists.forEach(dropdownList => {
    dropdownList.classList.remove("active");
  });
  navLinks.forEach(navLink => {
    navLink.classList.remove("active");
  });
};

document.addEventListener("click", e => {
  // Clicked element is not a navigation link
  if (!e.target.classList.contains("nav-list-item-link")) {
    if (vpWidth <= 960) {
      // Set default css style (nav list, nav sub list) if it changed previously
      navList.style.paddingTop = "3.5rem";
      navLinks.forEach(item => {
        item.parentElement.style.display = "block";
      });
    }
    // Close dropdown menus if it is open
    dropdownCloseAll();
    isNavSubMenu = false;
  }
  // Clicked element is a navigation link and active (has open sub list)
  if (
    e.target.classList.contains("nav-list-item-link") &&
    e.target.classList.contains("active")
  ) {
    // Close dropdown menus if it is open
    dropdownCloseAll();

    // Check element sub list existane to avoid any errors
    if (e.target.nextElementSibling) {
      // Close dropdown that realted to the clicked element
      e.target.classList.remove("active");
      e.target.nextElementSibling.classList.remove("active");

      // Set default css style (nav list, parent(of sub list) nav list item) if it changed previously
      if (vpWidth <= 960) {
        navList.style.paddingTop = "3.5rem";
        navLinks.forEach(item => {
          item.parentElement.style.display = "block";
        });
      }
    }
    isNavSubMenu = false;
  } else if (
    // Clicked element is a navigation link and not active (has closed sub list)
    e.target.classList.contains("nav-list-item-link") &&
    !e.target.classList.contains("active")
  ) {
    // CLose all open dropdown (including the targeted one if it was open)
    dropdownCloseAll();

    // Check element sub list existane to avoid any errors
    if (e.target.nextElementSibling) {
      e.target.classList.add("active");
      e.target.nextElementSibling.classList.add("active");

      isNavSubMenu = true;

      // Edite css style
      if (vpWidth <= 960) {
        navList.style.paddingTop = 0;
        navLinks.forEach(item => {
          if (!item.classList.contains("active")) {
            item.parentElement.style.display = "none";
          }
        });
      }
    }
  }
});

overlay.addEventListener("click", () => {
  // Close navigation list on overlay cilck
  isNavList = false;
  navList.classList.remove("active");
  svg.classList.remove("active");
  overlay.classList.remove("active");

  paths[0].setAttribute("d", "M0,6 25,6");
  paths[1].style.display = "block";
  paths[2].setAttribute("d", "M0,20 25,20");
});

// Showcase scroll effect
window.addEventListener("scroll", () => {
  // opacity = Math.round((1 - scrollY / vpHeight) * 100) / 100 + 0.2;
  opacity = Math.round((scrollY / vpHeight) * 100) / 100 + 0.1;
  if (opacity <= 1) {
    showcase.style.background = "rgba(133, 14, 60, " + opacity + ")";
  }
  if (window.scrollY < 100) {
    showcase.style.background = "rgba(133, 14, 60, 0.2)";
  }
});

// Resize window dimentions
window.addEventListener("resize", () => {
  vpWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  vpHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  // Update search bar style on window resize
  updateSearhBar(vpWidth);

  // Solve nav style problem on window resize
  updateNavList(vpWidth);
});

document.onload = onPageLoad();

function onPageLoad() {
  updateSearhBar(vpWidth);
}
