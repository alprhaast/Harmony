import { clerkClient } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server'

import "server-only";
import { db } from "~/server/db";

export async function getDataCurrentUser() {
  const user = await currentUser();
  
  if(user) {
    return user;
  }

  return [];
}

export async function getCurrentUserId() {
  const user = await currentUser();
  const id = user?.id || '';
  
  if(id) {
    return id;
  }

  return '';
}

export async function getCurrentUserRole() {
  const user = await currentUser();
  const role = user?.publicMetadata.role || '';

  if(role) {
    return role;
  }
  
  return '';
}

export async function getMyImages() {
  const id = await getCurrentUserId();

  if (id) {
    const images = await db.query.images.findMany({
      where: (model, { eq }) => eq(model.userId, id),
      orderBy: (model, { desc }) => desc(model.id),
    });

    return images;
  }

  return [];
}