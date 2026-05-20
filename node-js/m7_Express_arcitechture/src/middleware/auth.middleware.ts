import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

// auth middleware
const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log("This is protected route");
      // console.log(req.headers.authorization);

      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;

      const userData = await pool.query(
        `
            SELECT * FROM users WHERE email = $1
            `,
        [decoded.email],
      );

      const user = userData.rows[0];
      // console.log(user)

      if (user.rows.length === 0) {
        res.status(401).json({
          success: false,
          message: "user not found",
        });
      }

      if (!user.is_active) {
        res.status(401).json({
          success: false,
          message: "forbidden",
        });
      }

      // if(!user) {
      //     res.status(401).json({
      //         success: false,
      //         message: "user not found"
      //     })
      // }

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
