import { Request, Response } from 'express';
import { GetUserProfileResponse } from '../../../domain/use-cases/GetUserProfile';

// export const getProfile = async (req: Request, res: Response) => {
//   const user = req.user;
//   const uid = user.uid;

//   // fazer requisicao pro bd supabase para pegar o usuario (User)

//   return res.json({ message: `Olá, ${user?.uid}!`, uid: user?.uid });
// };