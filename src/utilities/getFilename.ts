export const getFilename = async (file: File, api_url: string) => {
  let filename = "";
  if (file && typeof (file as any).name === "string") {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(api_url, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    filename = result.filename;
  }
  return filename;
};
