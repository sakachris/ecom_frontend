"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/authSlice";
import {
  getProfile,
  updateProfile,
  deleteAccount,
  //   ProfileResponse,
} from "@/lib/userApi";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Inputs } from "@/components/ui/inputs";
import { Buttons } from "@/components/ui/buttons";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { toast } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function AccountPage() {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //   const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (auth.hydrated && !auth.access) {
      router.push("/");
    }
  }, [auth.hydrated, auth.access, router]);

  //   useEffect(() => {
  //     if (!auth.access) {
  //       router.push("/");
  //     }
  //   }, [auth.access, router]);

  // Load profile
  useEffect(() => {
    async function load() {
      if (!auth.access) return;
      setLoading(true);
      try {
        const data = await getProfile(auth.access);
        // setProfile(data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhone(data.phone_number ?? "");
      } catch (err: unknown) {
        let message = "Failed to load account.";

        if (err instanceof Error && err.message) {
          message = err.message;
        }

        toast.error(message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [auth.access]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!auth.access) return;

    setSaving(true);

    try {
      await updateProfile(auth.access, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
      });

      //   setProfile(updated);
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      let message = "Failed to update profile.";

      if (err instanceof Error && err.message) {
        message = err.message;
      }
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    if (!auth.access) return;

    setDeleting(true);
    try {
      await deleteAccount(auth.access);
      dispatch(logout());
      toast.success("Account deleted.");
      router.push("/");
    } catch (err: unknown) {
      let message = "Failed to delete account.";

      if (err instanceof Error && err.message) {
        message = err.message;
      }
      toast.error(message);
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center text-gray-500">
        Loading account...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>My Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSave}>
            {/* First Name */}
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Inputs
                id="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Inputs
                id="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Inputs
                id="phone"
                placeholder="Optional"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <Buttons type="submit" className="w-full" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Buttons>
          </form>

          <Separator className="my-6" />

          {/* Delete Account Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Buttons variant="destructive" className="w-full">
                Delete Account
              </Buttons>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  This action is permanent and cannot be undone. Are you sure
                  you want to delete your account?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex justify-end gap-2">
                <Buttons
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </Buttons>

                <Buttons
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </Buttons>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { logout } from "@/store/authSlice";
// import {
//   getProfile,
//   updateProfile,
//   deleteAccount,
//   ProfileResponse,
// } from "@/lib/userApi";

// export default function AccountPage() {
//   const auth = useAppSelector((s) => s.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const [profile, setProfile] = useState<ProfileResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   // form fields
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");

//   // redirect if not logged in
//   useEffect(() => {
//     if (!auth.access) {
//       router.push("/");
//     }
//   }, [auth.access, router]);

//   // Load profile
//   useEffect(() => {
//     async function load() {
//       if (!auth.access) return;
//       setLoading(true);
//       try {
//         const data = await getProfile(auth.access);
//         setProfile(data);
//         setFirstName(data.first_name);
//         setLastName(data.last_name);
//         setPhone(data.phone_number ?? "");
//       } catch (err: any) {
//         setError(err?.message ?? "Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, [auth.access]);

//   async function handleSave(e: React.FormEvent) {
//     e.preventDefault();
//     if (!auth.access) return;

//     setSaving(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const updated = await updateProfile(auth.access, {
//         first_name: firstName,
//         last_name: lastName,
//         phone_number: phone,
//       });

//       setProfile(updated);
//       setSuccess("Profile updated successfully!");
//     } catch (err: any) {
//       setError(err?.message ?? "Failed to update.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function handleDelete() {
//     if (!auth.access) return;

//     const confirmDelete = window.confirm(
//       "Are you sure? This action will permanently delete your account."
//     );
//     if (!confirmDelete) return;

//     setDeleting(true);
//     setError(null);

//     try {
//       await deleteAccount(auth.access);
//       dispatch(logout());
//       router.push("/");
//     } catch (err: any) {
//       setError(err?.message ?? "Failed to delete account.");
//     } finally {
//       setDeleting(false);
//     }
//   }

//   if (loading)
//     return (
//       <div className="max-w-xl mx-auto p-6 text-center">
//         <div className="animate-pulse text-gray-500">Loading account...</div>
//       </div>
//     );

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">My Account</h1>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
//       )}
//       {success && (
//         <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
//           {success}
//         </div>
//       )}

//       <form onSubmit={handleSave} className="space-y-4">
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">First Name</label>
//           <input
//             required
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Last Name</label>
//           <input
//             required
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             placeholder="Optional"
//           />
//         </div>

//         <button
//           disabled={saving}
//           type="submit"
//           className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
//         >
//           {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </form>

//       <hr className="my-6" />

//       <button
//         onClick={handleDelete}
//         disabled={deleting}
//         className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
//       >
//         {deleting ? "Deleting account..." : "Delete Account"}
//       </button>
//     </div>
//   );
// }
