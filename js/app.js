$(function () {
  const STORAGE_KEY = "jquery_inventory_products";
  let products = loadProducts();
  let editingId = null;

  renderTable();

  $("#product-form").on("submit", function (event) {
    event.preventDefault();

    const payload = getFormValues();
    if (!payload) return;

    if (editingId) {
      products = products.map((item) => (item.id === editingId ? { ...item, ...payload } : item));
      showToast("Producto actualizado.");
    } else {
      products.push({ id: generateId(), ...payload });
      showToast("Producto creado.");
    }

    saveProducts(products);
    resetForm();
    renderTable($("#search").val().trim().toLowerCase());
  });

  $("#cancel-btn").on("click", function () {
    resetForm();
  });

  $("#search").on("input", function () {
    const term = $(this).val().trim().toLowerCase();
    renderTable(term);
  });

  $("#product-table-body").on("click", ".edit-btn", function () {
    const id = $(this).data("id");
    const product = products.find((item) => item.id === id);
    if (!product) return;

    editingId = id;
    $("#product-id").val(product.id);
    $("#name").val(product.name);
    $("#category").val(product.category);
    $("#price").val(product.price);
    $("#stock").val(product.stock);

    $("#form-title").text("Editar producto");
    $("#save-btn").text("Actualizar");
    $("#cancel-btn").removeClass("hidden");
    $("#name").trigger("focus");
  });

  $("#product-table-body").on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    const product = products.find((item) => item.id === id);
    if (!product) return;

    const accepted = window.confirm(`¿Eliminar "${product.name}"?`);
    if (!accepted) return;

    products = products.filter((item) => item.id !== id);
    saveProducts(products);

    if (editingId === id) {
      resetForm();
    }

    renderTable($("#search").val().trim().toLowerCase());
    showToast("Producto eliminado.");
  });

  function getFormValues() {
    const name = $("#name").val().trim();
    const category = $("#category").val().trim();
    const price = Number($("#price").val());
    const stock = Number($("#stock").val());

    if (!name || !category || Number.isNaN(price) || Number.isNaN(stock) || price < 0 || stock < 0) {
      showToast("Completa todos los campos con valores validos.");
      return null;
    }

    return {
      name,
      category,
      price: Number(price.toFixed(2)),
      stock: Math.floor(stock),
    };
  }

  function renderTable(searchTerm = "") {
    const filtered = products.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      );
    });

    const $body = $("#product-table-body");
    $body.empty();

    if (!filtered.length) {
      $("#empty-state").removeClass("hidden").text(
        searchTerm ? "No hay resultados para esa busqueda." : "No hay productos registrados."
      );
      return;
    }

    $("#empty-state").addClass("hidden");

    filtered.forEach((item) => {
      const row = `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.category)}</td>
          <td class="tag-price">$ ${item.price.toFixed(2)}</td>
          <td>${item.stock}</td>
          <td>
            <div class="table-actions">
              <button class="icon-btn edit-btn" data-id="${item.id}" type="button">Editar</button>
              <button class="icon-btn delete-btn" data-id="${item.id}" type="button">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
      $body.append(row);
    });
  }

  function resetForm() {
    editingId = null;
    $("#product-id").val("");
    $("#product-form")[0].reset();
    $("#form-title").text("Nuevo producto");
    $("#save-btn").text("Guardar");
    $("#cancel-btn").addClass("hidden");
  }

  function saveProducts(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function loadProducts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function generateId() {
    return `p_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  }

  function escapeHtml(value) {
    return $("<div>").text(value).html();
  }

  function showToast(message) {
    const $toast = $("#toast");
    $toast.text(message).addClass("show");

    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      $toast.removeClass("show");
    }, 1900);
  }
});
