exports.createCategory = async (user_id, token, category) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/category/create/${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};
