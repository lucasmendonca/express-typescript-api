export const NotFoundHandler = (req: any, res: any) => {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
      data: null,
    });
}
