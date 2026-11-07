export const ok = (res, body = {}) => res.json({ success: true, ...body });
export const created = (res, data, message) => res.status(201).json({ success: true, data, message });
export const badRequest = (res, error) => res.status(400).json({ success: false, error });
export const notFound = (res, error) => res.status(404).json({ success: false, error });

export const handle =
  (fn, fallback = 'Server xatosi', status = 500) =>
  (req, res, next) => {
    const sendError = (error) => {
      if (res.headersSent) return next(error);
      console.error(error);
      return res.status(error.statusCode || status).json({
        success: false,
        error: error.expose === false ? fallback : (error.message || fallback),
      });
    };

    try {
      const result = fn(req, res, next);
      if (result && typeof result.then === 'function') {
        return result.catch(sendError);
      }
      return result;
    } catch (error) {
      return sendError(error);
    }
  };
