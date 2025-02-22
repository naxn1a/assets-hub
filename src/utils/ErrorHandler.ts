export const ErrorHandler = (error: unknown) => {
  return Response.json(
    {
      status: "error",
      message: error instanceof Error ? error.message : "An error occurred",
    },
    {
      status: error instanceof Error ? 400 : 500,
    }
  );
};

export const SendHandler = (data: Object) => {
  return Response.json(
    {
      status: "ok",
      data,
    },
    {
      status: 200,
    }
  );
};
