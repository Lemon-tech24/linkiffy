"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUser() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) return { ok: false, msg: "Error while processing user details" };

    if (!user?.email) return { ok: false, msg: "Invalid user details" };

    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existing) return { ok: true, msg: "User already exists" };

    await prisma.user.create({
      data: {
        name: `${user.given_name || ""} ${user.family_name || ""}`.trim(),
        email: user.email,
      },
    });

    return { ok: true, msg: "Created successfully" };
  } catch (error) {
    console.error(error);
    return { ok: false, msg: "An error occurred" };
  }
}

export async function getLinkList() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const user = await getUser();

  try {
    if (isAllowed && user) {
      const UserLinkList = await prisma.link.findMany({
        where: {
          user: {
            email: user.email as string,
          },
        },
      });

      if (UserLinkList) {
        return { ok: true, list: UserLinkList };
      } else {
        return { ok: false, msg: "User Links Not Found!" };
      }
    } else {
      return { ok: false, msg: "Unauthorized!" };
    }
  } catch (error) {
    throw new Error("Error Occurred");
  }
}

// export async function getUrlList(id: string) {
//   const { getUser, isAuthenticated } = getKindeServerSession();
//   const isAllowed = await isAuthenticated();
//   const user = await getUser();

//   try {
//     if (isAllowed && user) {
//       const userURLs = prisma.link.findMany({
//         where: {
//           id: id,
//         },

//         include: {},
//       });

//       //not done yet
//     } else {
//       return { ok: false, msg: "Unauthorized!" };
//     }
//   } catch (error) {
//     throw new Error("Error Occurred");
//   }
// }

// OPERATIONS
export async function createLink(link: string) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) return { ok: false, msg: "Unauthorized!" };

    const userData = await getUser();
    const user = await prisma.user.findUnique({
      where: { email: userData.email as string },
    });

    if (!link || link === null) return { ok: false, msg: "Empty Input" };

    const value = link.trim();
    const regex = /^[a-zA-Z0-9\s]*$/;

    if (!regex.test(value)) return { ok: false, msg: "Invalid Input" };

    if (!user) return { ok: false, msg: "User Not Found" };

    if (link.length < 3) return { ok: false, msg: "Minimum Characters: 3" };

    if (link.length > 20) return { ok: false, msg: "Maximum Characters: 20" };

    const linkCount = await prisma.link.count({ where: { userId: user.id } });
    if (linkCount >= 5) return { ok: false, msg: "Maximum Links: 5" };

    const existingLink = await prisma.link.findUnique({ where: { link } });
    if (existingLink) return { ok: false, msg: "Link Already Exists!" };

    const newLink = await prisma.link.create({
      data: { userId: user.id, link, views: 0, clicks: 0 },
    });

    if (!newLink) return { ok: false, msg: "Failed to Create Link" };

    revalidatePath("/dashboard");
    return { ok: true, msg: "Link Created!", data: newLink };
  } catch (error) {
    console.error("Error:", error);
    return { ok: false, msg: "An unexpected error occurred." };
  }
}

// export async function deleteLink(id: string) {
//   const { getUser, isAuthenticated } = getKindeServerSession();
//   const isAllowed = await isAuthenticated();
//   const userData = await getUser();

//   const user = await prisma.user.findUnique({
//     where: {
//       email: userData.email as string,
//     },
//   });

//   if (isAllowed && user) {
//     const deleted = await prisma.link.delete({
//       where: {
//         id: id,
//         userId: user.id,
//       },
//     });
//     if (deleted) {
//       return { ok: true, msg: "Successfully Deleted!" };
//     } else {
//       return { ok: false, msg: "Failed To Delete Link" };
//     }
//   } else {
//     return { ok: false, msg: "Unauthorized!" };
//   }
// }
