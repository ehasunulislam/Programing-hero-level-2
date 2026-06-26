import config from "../../config";
import { prisma } from "../../lib/pirsma";
import { RegisterUserInterface } from "./user.interface";
import bcrypt from "bcrypt";

// register user into database
const registerIntoDB = async (payload: RegisterUserInterface) => {
  const { name, email, password, profilePhoto } = payload;

  const isUserExits = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExits) {
    throw new Error("User already exists");
  }

  const hasedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hasedPassword,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};


// get profile from database 
const getProfileFromDB =  async(userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  });

  return user
}

export const userService = {
  registerIntoDB,
  getProfileFromDB
};
