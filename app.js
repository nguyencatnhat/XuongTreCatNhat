const products = [
  {
    name: "Giường & thang tre",
    category: "do-tre",
    description: "Giường và thang tre làm tại xưởng; trao đổi mẫu, kích thước khi đặt.",
    alt: "Hình ảnh giường và thang tre sẽ được cập nhật",
    label: "GIƯỜNG & THANG",
  },
  {
    name: "Nôi tre",
    category: "do-tre",
    description: "Xưởng có nhận đóng nôi tre. Hình ảnh sản phẩm sẽ được cập nhật sau.",
    label: "ĐANG CẬP NHẬT ẢNH",
  },
  {
    name: "Bàn ghế tre",
    category: "do-tre",
    description: "Bàn ghế tre dùng cho gia đình, sân vườn và quán.",
    images: [
      {
        src: "images/1793514628648_2302248318093158072_8414925042818070924_faf610fb0ae1437bdadcbadafabccfb0.jpg",
        alt: "Bộ bàn ghế tre tại xưởng",
      },
      {
        src: "images/1793514628611_2302248318093158072_8414925042818070924_bbc98dd63fa89bb948191620b139f778.jpg",
        alt: "Ghế tre làm tại xưởng",
      },
    ],
    label: "BÀN GHẾ TRE",
  },
  {
    name: "Tre cây",
    category: "tre-cay",
    description: "Liên hệ xưởng để hỏi loại tre, quy cách và số lượng hiện có.",
    image: "images/1793514628563_2302248318093158072_8414925042818070924_aedded32623b53c413bf5d4d743a442a.jpg",
    alt: "Tre cây được vận chuyển đến xưởng",
    label: "TRE NGUYÊN LIỆU",
  },
  {
    name: "Thi công nhà lá, quán",
    category: "thi-cong",
    description: "Nhận trao đổi thi công mái lá, chòi nghỉ, quán và không gian sân vườn.",
    image: "images/1793514628657_2302248318093158072_8414925042818070924_f6bd788562dd0f237fe60cd14b8ffb95.jpg",
    alt: "Không gian công trình tre đã hoàn thiện",
    label: "NHẬN THI CÔNG",
  },
];

const productGrid = document.querySelector("#product-grid");
const emptyState = document.querySelector(".empty-state");
const searchInput = document.querySelector(".catalog-search input");
const filterButtons = document.querySelectorAll(".filter-chip");
let activeFilter = "all";

function renderProducts() {
  if (!productGrid) return;

  const searchTerm = searchInput?.value.trim().toLocaleLowerCase("vi") || "";
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeFilter === "all" || product.category === activeFilter;
    const matchesSearch = `${product.name} ${product.description}`
      .toLocaleLowerCase("vi")
      .includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => {
        const hasImage = Boolean(product.image || product.images);
        const imageContent = product.image
          ? `<img src="${product.image}" alt="${product.alt}" loading="lazy" />`
          : product.images
            ? `<img src="${product.images[0].src}" alt="${product.images[0].alt}" loading="lazy" />`
          : `<span class="image-placeholder" aria-hidden="true"><span>竹</span><small>HÌNH ẢNH ĐANG CẬP NHẬT</small></span>`;
        const carouselControls = product.images?.length > 1
          ? `<button class="image-carousel-control image-carousel-prev" type="button" data-carousel-step="-1" aria-label="Xem ảnh trước">‹</button>
             <span class="image-carousel-count" aria-live="polite">1 / ${product.images.length}</span>
             <button class="image-carousel-control image-carousel-next" type="button" data-carousel-step="1" aria-label="Xem ảnh tiếp theo">›</button>`
          : "";

        return `
        <article class="product-card">
          <div class="product-media" data-product-name="${product.name}">
            <a class="product-image${hasImage ? "" : " product-image--placeholder"}" href="tel:+84973475757" aria-label="Gọi hỏi về ${product.name}">
              ${imageContent}
              <span class="product-label">${product.label}</span>
              <span class="image-arrow" aria-hidden="true">↗</span>
            </a>
            ${carouselControls}
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <a class="product-link" href="tel:+84973475757">Gọi hỏi giá <span>→</span></a>
          </div>
        </article>`;
      },
    )
    .join("");

  emptyState.hidden = visibleProducts.length > 0;
  productGrid.hidden = visibleProducts.length === 0;
}

productGrid?.addEventListener("click", (event) => {
  const control = event.target.closest("[data-carousel-step]");
  if (!control) return;

  event.preventDefault();
  event.stopPropagation();

  const media = control.closest(".product-media");
  const product = products.find((item) => item.name === media.dataset.productName);
  const image = media.querySelector(".product-image img");
  const currentIndex = Number(media.dataset.imageIndex || 0);
  const step = Number(control.dataset.carouselStep);
  const nextIndex = (currentIndex + step + product.images.length) % product.images.length;

  media.dataset.imageIndex = String(nextIndex);
  image.src = product.images[nextIndex].src;
  image.alt = product.images[nextIndex].alt;
  media.querySelector(".image-carousel-count").textContent =
    `${nextIndex + 1} / ${product.images.length}`;
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelector(".filter-chip.is-active").classList.remove("is-active");
    button.classList.add("is-active");
    renderProducts();
  });
});

searchInput?.addEventListener("input", renderProducts);

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  mainNav.classList.toggle("is-open", isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  });
});

const contactToggle = document.querySelector(".mobile-contact-toggle");
const contactOptions = document.querySelector(".mobile-contact-options");

contactToggle.addEventListener("click", () => {
  const isOpen = contactToggle.getAttribute("aria-expanded") !== "true";
  contactToggle.setAttribute("aria-expanded", String(isOpen));
  contactToggle.setAttribute("aria-label", isOpen ? "Đóng tùy chọn liên hệ" : "Mở tùy chọn liên hệ");
  contactOptions.hidden = !isOpen;
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".mobile-contact")) {
    contactToggle.setAttribute("aria-expanded", "false");
    contactToggle.setAttribute("aria-label", "Mở tùy chọn liên hệ");
    contactOptions.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    contactToggle.setAttribute("aria-expanded", "false");
    contactToggle.setAttribute("aria-label", "Mở tùy chọn liên hệ");
    contactOptions.hidden = true;
  }
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const lightboxLinks = document.querySelectorAll("[data-lightbox]");
if (lightboxLinks.length > 0) {
  const lightbox = document.createElement("dialog");
  lightbox.className = "lightbox";
  lightbox.setAttribute("aria-label", "Xem ảnh");
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Đóng ảnh">×</button>
    <img class="lightbox-image" alt="" />
    <p class="lightbox-caption"></p>`;
  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");

  lightboxLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      lightboxImage.src = link.href;
      lightboxImage.alt = link.querySelector("img")?.alt || "";
      lightboxCaption.textContent = link.dataset.caption || lightboxImage.alt;
      lightbox.showModal();
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

renderProducts();
