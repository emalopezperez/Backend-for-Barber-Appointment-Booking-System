import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../service/userService";
import { error } from "console";

const registerUser = async (req: Request, res: Response) => {
  const dataUser = req.body;

  try {
    const result = await registerUserService(dataUser);

    if (result.success) {
      res.status(201).json({
        message: "User registered successfully",
        token: result.token,
        dataUser: dataUser,
      });
    } else {
      res.status(400).json({
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: (error as Error).message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginUserService(email, password);

    if (result.success) {
      res.status(200).json({
        message: "Logged in successfully",
        token: result.token,
      });
    } else {
      res.status(401).json({
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: (error as Error).message,
    });
  }
};

export { loginUser, registerUser };
