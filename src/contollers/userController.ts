import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await userRepository.findOneBy({ id: parseInt(id, 10) });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ id: parseInt(id, 10) });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
