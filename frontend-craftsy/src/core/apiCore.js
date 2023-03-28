exports.getProducts = async (sortBy) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/products?sortBy=sold&order=desc&limit=10`,
      {
        method: "POST",
      }
    );
    return response.json();
  } catch (e) {
    return console.log(e);
  }
};
