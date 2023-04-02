const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const getFilteredProducts = async (selectedCategory, productsSetter) => {
  const endpoint = selectedCategory
    ? `${BE_URL}/products/search/?category=/${selectedCategory}/i&adopted=false`
    : `${BE_URL}/products`;

  try {
    const config = {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    const response = await fetch(endpoint, config);
    if (response.ok) {
      const data = await response.json();
      productsSetter?.(data);
      return data;
    }
  } catch (error) {
    console.log("error fetching data ... ", error);
  }
};

export default getFilteredProducts;
