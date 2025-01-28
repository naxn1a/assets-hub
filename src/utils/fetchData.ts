const API_URL = `${process.env.API_URL}/api`;

export const fetchData = async (path: string, id?: string) => {
  const res = await fetch(`${API_URL}/${path}/${id ? id : ""}`);
  const data = await res.json();
  return data;
};
