'use server';

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  if (!correctPassword) {
    console.error("ADMIN_PASSWORD is not set in environment variables.");
    return false;
  }
  
  return password === correctPassword;
}
