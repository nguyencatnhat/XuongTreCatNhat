const products = [
  {
    name: "Giường & thang tre",
    category: "do-tre",
    description: "Giường và thang tre làm tại xưởng; trao đổi mẫu, kích thước khi đặt.",
    image: "images/1793514628611_2302248318093158072_8414925042818070924_bbc98dd63fa89bb948191620b139f778.jpg",
    alt: "Giường tre và thang tre làm tại xưởng",
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
    image: "images/1793514628648_2302248318093158072_8414925042818070924_faf610fb0ae1437bdadcbadafabccfb0.jpg",
    alt: "Bộ bàn ghế tre tại xưởng",
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
  const searchTerm = searchInput.value.trim().toLocaleLowerCase("vi");
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
        const imageContent = product.image
          ? `<img src="${product.image}" alt="${product.alt}" loading="lazy" />`
          : `<span class="image-placeholder" aria-hidden="true"><span>竹</span><small>HÌNH ẢNH ĐANG CẬP NHẬT</small></span>`;

        return `
        <article class="product-card">
          <a class="product-image${product.image ? "" : " product-image--placeholder"}" href="tel:+84943567910" aria-label="Gọi hỏi về ${product.name}">
            ${imageContent}
            <span class="product-label">${product.label}</span>
            <span class="image-arrow" aria-hidden="true">↗</span>
          </a>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <a class="product-link" href="tel:+84943567910">Gọi hỏi giá <span>→</span></a>
          </div>
        </article>`;
      },
    )
    .join("");

  emptyState.hidden = visibleProducts.length > 0;
  productGrid.hidden = visibleProducts.length === 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelector(".filter-chip.is-active").classList.remove("is-active");
    button.classList.add("is-active");
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

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

renderProducts();
