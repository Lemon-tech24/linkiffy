/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { DesignTypes, UrlTypes } from "./interfaces";

export async function getLinkDetails(link: string) {
  try {
    const details = await prisma.link.findUnique({
      where: {
        link: link,
      },

      include: {
        design: true,
        urls: true,
      },
    });

    if (!details) return { ok: false, msg: "Failed to Retrieve Link Data" };

    return { ok: true, data: details };
  } catch (err) {
    return { ok: false, msg: "Error Occurred" };
  }
}

export async function getDesignData(id: string) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) return { ok: false, msg: "Unauthorized!" };

    const user = await getUser();
    if (!user) return { ok: false, msg: "User not found" };
    const designData = await prisma.design.findUnique({
      where: {
        linkId: id,
      },
    });

    if (!designData)
      return { ok: false, msg: "Failed to Retrieve Design Data" };

    return { ok: true, data: designData };
  } catch (err) {
    console.error(err);
    return { ok: false, msg: "Error Occurred" };
  }
}

export async function getLinkList() {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) return { ok: false, msg: "Unauthorized!" };

    const user = await getUser();
    if (!user) return { ok: false, msg: "User not found" };

    const userLinkList = await prisma.link.findMany({
      where: { user: { email: user.email as string } },
    });

    if (!userLinkList)
      return { ok: false, msg: "Failed to Retrieve Link List" };

    if (!userLinkList.length) return { ok: false, msg: "User links not found" };

    return { ok: true, list: userLinkList };
  } catch (error) {
    console.error(error);
    return { ok: false, msg: "An error occurred" };
  }
}

export async function getShareLink(id: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) return { ok: false, msg: "Unauthorized!" };

  const user = await getUser();
  if (!user) return { ok: false, msg: "User not found" };

  const shareLink = await prisma.link.findUnique({
    where: {
      id: id,
    },
    select: {
      link: true,
    },
  });

  if (!shareLink)
    return { ok: false, msg: "Failed To Retrieve Link Information" };

  return { ok: true, link: shareLink.link };
}

export async function getUrlList(id: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const user = await getUser();

  try {
    if (isAllowed && user) {
      const userURLs = await prisma.url.findMany({
        where: {
          linkId: id,
        },

        include: {
          link: true,
        },
      });

      if (!userURLs) return { ok: false, msg: "Failed to Retrieved Url's" };

      return { ok: true, list: userURLs };
    } else {
      return { ok: false, msg: "Unauthorized!" };
    }
  } catch (error) {
    console.error(error);
    return { ok: false, msg: "Error Occurred" };
  }
}

export async function createUrl(data: UrlTypes, id: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const user = await getUser();

  try {
    if (!data.name || data.name.trim() === "")
      return { ok: false, msg: "Empty Platform" };

    const validateUrl = (url: string) => {
      try {
        new URL(url);

        return { ok: true };
      } catch {
        return { ok: false, msg: "Invalid URL format" };
      }
    };

    const result = validateUrl(data.url);

    if (!result.ok) return { ok: result.ok, msg: result.msg };

    if (isAllowed && user) {
      const urlCount = await prisma.url.count({
        where: {
          linkId: id,
        },
      });

      if (urlCount >= 5)
        return { ok: false, msg: "Url's Maximum Limit Reached: 5" };

      const NewUrl = await prisma.url.create({
        data: {
          linkId: id,
          name: data.name,
          url: data.url,
          description: data.description,
          disabled: false,
          displayIcon: true,
          views: 0,
        },
      });

      if (!NewUrl) return { ok: false, msg: "Failed to Create New Url" };

      return { ok: true, msg: "Successfully Created" };
    } else {
      return { ok: false, msg: "Unauthorized!" };
    }
  } catch (err) {
    console.error(err);
    return { ok: false, msg: "Error Occurred" };
  }
}

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

    const initialData = {
      image: "",
      title: "Untitled",
      titleColor: "#000000",
      bio: "Empty",
      colorType: "solid",
      colorOne: "#000000",
      colorTwo: "#ffffff",
      colorDirection: "to right",
      monoColor: "#ffffff",
    };

    const newLink = await prisma.link.create({
      data: {
        userId: user.id,
        link,
        views: 0,
        design: {
          create: {
            ...initialData,
          },
        },
      },
    });

    if (!newLink) return { ok: false, msg: "Failed to setup the link" };

    revalidatePath("/dashboard");
    return { ok: true, msg: "Link Created!", data: newLink };
  } catch (error) {
    console.error("Error:", error);
    return { ok: false, msg: "An unexpected error occurred." };
  }
}

export async function deleteLink(id: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const userData = await getUser();

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email as string,
    },
  });

  if (isAllowed && user) {
    const deleted = await prisma.link.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (deleted) {
      revalidatePath("/dashboard");
      return { ok: true, msg: "Successfully Deleted!" };
    } else {
      return { ok: false, msg: "Failed To Delete Link" };
    }
  } else {
    return { ok: false, msg: "Unauthorized!" };
  }
}

export async function deleteUrl(id: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const userData = await getUser();

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email as string,
    },
  });

  if (!isAllowed || !user) return { ok: false, msg: "Unauthorized" };

  const deleteUrl = await prisma.url.delete({
    where: {
      id: id,
    },
  });

  if (!deleteUrl) return { ok: false, msg: "Failed to Delete Url" };

  return { ok: true, msg: "URL Deleted" };
}

export async function updateUrl(data: UrlTypes, id: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const userData = await getUser();

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email as string,
    },
  });

  if (!isAllowed || !user) return { ok: false, msg: "Unauthorized" };

  if (!data.name || data.name.trim() === "")
    return { ok: false, msg: "Empty Platform" };

  const updateUrl = await prisma.url.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      url: data.url,
      description: data.description,
      displayIcon: data.displayIcon,
      disabled: data.disabled,
      views: data.views,
    },
  });

  if (!updateUrl) return { ok: false, msg: "Failed to Update Url" };

  return { ok: true, msg: "Successfully Updated the URL" };
}

export async function UpdateDesign(data: DesignTypes, id: string) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isAllowed = await isAuthenticated();
  const userData = await getUser();

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email as string,
    },
  });

  if (!isAllowed || !user) return { ok: false, msg: "Unauthorized" };

  const createDesign = await prisma.design.update({
    where: { linkId: id },
    data: {
      image: data.image,
      title: data.title,
      titleColor: data.titleColor,
      bio: data.bio,
      colorType: data.colorType,
      colorOne: data.colorOne,
      colorTwo: data.colorTwo,
      colorDirection: data.colorDirection,
      monoColor: data.monoColor,
    },
  });

  if (!createDesign) return { ok: false, msg: "Failed to Update the design" };

  return { ok: true, msg: "Design Updated Successfully", data: createDesign };
}

export async function AddViewsUrl(id: string) {
  try {
    const addView = await prisma.url.update({
      where: {
        id: id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    if (!addView) return { ok: false, msg: "Failed To Add View URl" };
    return { ok: true, msg: "Successfully added views in Url" };
  } catch (err) {
    return { ok: false, msg: "Error Occurred While Viewing Url" };
  }
}

export async function AddViewsLink(link: string) {
  try {
    const addView = await prisma.link.update({
      where: {
        link: link,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    if (!addView) return { ok: false, msg: "Failed To Add View Link" };
    return { ok: true, msg: "Successfully added views in link" };
  } catch (err) {
    return { ok: false, msg: "Error Occurred While Viewing Link" };
  }
}
