import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await userRepository.findOneBy({ id: parseInt(id, 10) });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await userRepository.remove(user);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
