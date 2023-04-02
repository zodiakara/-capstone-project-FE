const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const getFilteredProducts = async (
  selectedCategory,
  filteredProductsSetter
) => {
  try {
    const config = {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    const response = await fetch(
      `${BE_URL}/products/search/?category=/${selectedCategory}/i&adopted=false`,
      config
    );
    if (response.ok) {
      const data = await response.json();
      filteredProductsSetter?.(data);
    }
  } catch (error) {
    console.log("error fetching data ... ", error);
  }
};

export default getFilteredProducts;
