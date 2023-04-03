const BE_URL = process.env.REACT_APP_BE_DEV_URL;

const getAllUsers = async (usersSetter) => {
  const endpoint = `${BE_URL}/users`;

  try {
    const config = {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    const response = await fetch(endpoint, config);
    if (response.ok) {
      const data = await response.json();
      usersSetter?.(data);
      return data;
    }
  } catch (error) {
    console.log("error fetching users ... ", error);
  }
};

export default getAllUsers;
