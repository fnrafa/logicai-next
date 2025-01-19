const MESH_STORAGE_KEY = "mesh_models";

export const saveMeshData = (data: object) => {
    const existingData = localStorage.getItem(MESH_STORAGE_KEY);
    const meshArray = existingData ? JSON.parse(existingData) : [];
    meshArray.unshift(data);
    localStorage.setItem(MESH_STORAGE_KEY, JSON.stringify(meshArray));
};

export const getMeshData = () => {
    const data = localStorage.getItem(MESH_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};
