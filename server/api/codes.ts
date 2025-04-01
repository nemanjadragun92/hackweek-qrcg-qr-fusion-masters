const codes: string[] = [];

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === "GET") {
    return codes;
  } else if (method === "POST") {
    const { url } = await readBody(event);
    if (!url || typeof url !== "string") {
      return {
        statusCode: 400,
        message: "Invalid URL",
      };
    }
    if (!codes.includes(url)) {
      codes.push(url);
    }
    return {
      data: "Successfully added",
    };
  }
});
