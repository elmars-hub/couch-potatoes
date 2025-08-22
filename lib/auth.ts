import { supabase } from "./supabase";

export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName },
    },
  });

  if (error) {
    console.error("Supabase signup error:", error.message);
    throw new Error(`Signup failed: ${error.message}`);
  }

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Supabase get user error:", error.message);
    throw new Error(`Get user failed: ${error.message}`);
  }

  return user;
}

// export async function requestPasswordReset(email: string) {
//   const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: "http://localhost:5173/reset-password",
//   });

//   if (error) {
//     console.error("Supabase password reset error:", error.message);
//     throw new Error(`Password reset failed: ${error.message}`);
//   }

//   return data;
// }

// export async function updatePassword(password: string) {
//   const { data, error } = await supabase.auth.updateUser({
//     password: password,
//   });

//   if (error) {
//     console.error("Supabase update password error:", error.message);
//     throw new Error(`Password update failed: ${error.message}`);
//   }

//   return data;
// }
