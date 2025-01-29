import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { eq, and } from 'drizzle-orm';

import "server-only";

import { db } from "~/server/db";
import { images } from './db/schema';

export async function getDataCurrentUser() {
  const user = await currentUser();
  
  if(user) {
    return user;
  }

  return [];
}

export async function getCurrentUserId() {
  const user = await currentUser();
  const userId = user?.id || '';
  
  if(userId) {
    return userId;
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

export async function getAllImages() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}


export async function getImage( id: number ) {
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

	return image;
}

export async function getMyImages() {
  const userId = await getCurrentUserId();

  if (userId) {
    const images = await db.query.images.findMany({
      where: (model, { eq }) => eq(model.userId, userId),
      orderBy: (model, { desc }) => desc(model.id),
    });

    return images;
  }

  return [];
}

export async function deleteImage(imageId: number) {
  const userId = await getCurrentUserId();
	
  if(userId) {
    await db.delete(images).where(
      and(
        eq (images.id, imageId),
        eq(images.userId, userId)
      ) 
    );
    
    redirect("/");
  }  
}

export async function updateImage(imageId: number, imageName: string) {
  const userId = await getCurrentUserId();

  if (userId) {
    await db.update(images)
      .set({ name: imageName })
      .where(
        and(
          eq(images.id, imageId),
          eq(images.userId, userId)
        )
      );

    redirect("/");
  }
}
