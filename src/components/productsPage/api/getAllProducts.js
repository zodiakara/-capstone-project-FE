const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const getAllProducts = async (productsSetter) => {
  try {
    const config = {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    const response = await fetch(`${BE_URL}/products`, config);
    if (response.ok) {
      const data = await response.json();
      productsSetter?.(data);
    }
  } catch (error) {
    console.log("error fetching data ... ", error);
  }
};

export default getAllProducts;
