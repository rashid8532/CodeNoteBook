
export const Fetchfiles = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://127.0.0.1:8000/get_files?project_id=${project.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

