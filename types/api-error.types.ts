export type ApiError = {
  type: "NotFound" | "BadRequest";
  details: string;
};
