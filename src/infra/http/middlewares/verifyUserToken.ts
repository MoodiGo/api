import { Request, Response, NextFunction } from 'express';
import { authService } from '../../../../di';

export const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    res.status(401).send({ error: 'Token missing' })
    return;
  }

  try {
    const decoded = await authService.validateToken(token);
    req.user = { uid: decoded.uid }; // Pode acessar em rotas autenticadas
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid token' });
  }
};