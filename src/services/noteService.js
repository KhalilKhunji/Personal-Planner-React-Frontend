const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/tasks/`;

const getNotes = async (taskId,note) => {
    try {
        const option = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
        };
        const res = await fetch(`${BASE_URL}/${taskId}/notes/`, option);
        return res.json();
    } catch (error) {
        console.error("Error", error);
    }
    };

    const updateNote = async (taskId,noteId,note) => {
        try {
            const option = {
            method: "PUT",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
            };
            const res = await fetch(`${BASE_URL}/${taskId}/notes/${noteId}`, option);
            return res.json();
        }
        catch (error) {
            console.error("Error", error);
        }
        };

        const deleteNote = async (taskId, noteId) => {
            try {
              const option = {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, 
              };
              const res = await fetch(`${BASE_URL}/${taskId}/notes/${noteId}`, option);
              return res.json();
            } catch (error) {
              console.error("Error", error);
            }
          }

export { getNotes , updateNote , deleteNote};