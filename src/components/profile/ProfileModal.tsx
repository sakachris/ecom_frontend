// src/components/profile/ProfileModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getProfile, ProfileResponse } from "@/lib/userApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  open: boolean;
  onClose: () => void;
  accessToken?: string | null;
};

export default function ProfileModal({ open, onClose, accessToken }: Props) {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    let active = true;

    async function load() {
      if (!accessToken) {
        setError("No access token found");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getProfile(accessToken);
        if (!active) return;
        setProfile(data);
      } catch (err) {
        if (!active) return;
        const msg =
          err instanceof Error ? err.message : "Failed to load profile.";
        setError(msg);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [open, accessToken]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* FIX: remove overflow-hidden, apply padding directly */}
      <DialogContent className="max-w-lg rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl">Profile</DialogTitle>
          <DialogDescription>View your account information.</DialogDescription>
        </DialogHeader>

        {/* LOADING */}
        {loading && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Skeleton className="w-14 h-14 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-red-600 text-center py-8">{error}</div>
        )}

        {/* PROFILE */}
        {!loading && !error && profile && (
          <div className="space-y-6">
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-xl font-semibold">
                {profile.first_name?.[0] ?? "U"}
              </div>

              <div>
                <div className="font-semibold text-lg">
                  {profile.first_name} {profile.last_name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {profile.email}
                </div>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Card className="p-3">
                <p className="text-xs text-muted-foreground mb-1">Role</p>
                <p className="font-medium">{profile.role}</p>
              </Card>

              <Card className="p-3">
                <p className="text-xs text-muted-foreground mb-1">Phone</p>
                <p className="font-medium">
                  {profile.phone_number || "Not provided"}
                </p>
              </Card>

              <Card className="p-3">
                <p className="text-xs text-muted-foreground mb-1">User ID</p>
                <p className="text-xs break-all">{profile.user_id}</p>
              </Card>

              <Card className="p-3">
                <p className="text-xs text-muted-foreground mb-1">Joined</p>
                <p className="font-medium">
                  {new Date(profile.created_at).toLocaleString()}
                </p>
              </Card>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex flex-col gap-3 pt-2">
              <Button asChild variant="outline" className="w-full">
                <a href="/account">Manage account</a>
              </Button>

              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild variant="outline" className="w-full">
                <a href="/account">Manage account</a>
              </Button>

              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </div> */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import { getProfile, ProfileResponse } from "@/lib/userApi";
// import { Loader2 } from "lucide-react";

// // shadcn/ui
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "../ui/button";
// import { Card } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   accessToken?: string | null;
// };

// export default function ProfileModal({ open, onClose, accessToken }: Props) {
//   const [profile, setProfile] = useState<ProfileResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // fetch profile when modal opens
//   useEffect(() => {
//     if (!open) return;

//     let active = true;

//     async function fetchData() {
//       if (!accessToken) {
//         setError("No access token found");
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         const data = await getProfile(accessToken);
//         if (!active) return;

//         setProfile(data);
//       } catch (err) {
//         if (!active) return;

//         const message =
//           err instanceof Error ? err.message : "Failed to load profile.";
//         setError(message);
//       } finally {
//         if (active) setLoading(false);
//       }
//     }

//     fetchData();

//     return () => {
//       active = false;
//     };
//   }, [open, accessToken]);

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-lg">
//         <DialogHeader>
//           <DialogTitle>Profile</DialogTitle>
//           <DialogDescription>View your account information.</DialogDescription>
//         </DialogHeader>

//         {/* LOADING STATE */}
//         {loading && (
//           <div className="space-y-4 py-4">
//             <div className="flex items-center gap-4">
//               <Skeleton className="w-14 h-14 rounded-full" />
//               <div className="flex-1 space-y-2">
//                 <Skeleton className="h-4 w-40" />
//                 <Skeleton className="h-4 w-28" />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <Skeleton className="h-20" />
//               <Skeleton className="h-20" />
//               <Skeleton className="h-20" />
//               <Skeleton className="h-20" />
//             </div>
//           </div>
//         )}

//         {/* ERROR STATE */}
//         {!loading && error && (
//           <div className="text-sm text-red-600 py-6 text-center">{error}</div>
//         )}

//         {/* PROFILE UI */}
//         {!loading && !error && profile && (
//           <div className="space-y-5">
//             {/* Avatar + top info */}
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
//                 {profile.first_name?.[0] ?? "U"}
//               </div>

//               <div>
//                 <div className="text-lg font-medium">
//                   {profile.first_name} {profile.last_name}
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   {profile.email}
//                 </div>
//               </div>
//             </div>

//             {/* Info Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <Card className="p-3">
//                 <div className="text-xs text-muted-foreground">Role</div>
//                 <div className="mt-1 font-medium">{profile.role}</div>
//               </Card>

//               <Card className="p-3">
//                 <div className="text-xs text-muted-foreground">Phone</div>
//                 <div className="mt-1 font-medium">
//                   {profile.phone_number ?? "Not provided"}
//                 </div>
//               </Card>

//               <Card className="p-3">
//                 <div className="text-xs text-muted-foreground">User ID</div>
//                 <div className="mt-1 text-xs break-all">{profile.user_id}</div>
//               </Card>

//               <Card className="p-3">
//                 <div className="text-xs text-muted-foreground">Joined</div>
//                 <div className="mt-1 font-medium">
//                   {new Date(profile.created_at).toLocaleString()}
//                 </div>
//               </Card>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="flex flex-col sm:flex-row gap-2">
//               <Button asChild variant="outline" className="w-full">
//                 <a href="/account">Manage account</a>
//               </Button>

//               <Button onClick={onClose} className="w-full" variant="default">
//                 Close
//               </Button>
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { getProfile, ProfileResponse } from "@/lib/userApi";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   accessToken?: string | null;
// };

// export default function ProfileModal({ open, onClose, accessToken }: Props) {
//   const [profile, setProfile] = useState<ProfileResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // fetch profile when modal opens and we have a token
//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       if (!open) return;
//       if (!accessToken) {
//         setError("Not authenticated.");
//         return;
//       }
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await getProfile(accessToken);
//         if (!mounted) return;
//         setProfile(data);
//       } catch (err: unknown) {
//         let message = "Failed to load profile. Please try again.";

//         if (err instanceof Error && err.message) {
//           message = err.message;
//         }

//         if (mounted) setError(message);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [open, accessToken]);

//   if (!open) return null;

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//     >
//       {/* overlay */}
//       <div
//         onClick={onClose}
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//       />

//       {/* modal box */}
//       <div className="relative z-10 w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         {/* header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <h3 className="text-lg font-semibold">Profile</h3>
//           <button
//             aria-label="Close profile"
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-gray-100"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* content */}
//         <div className="p-4 md:p-6">
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="inline-block animate-pulse text-sm text-gray-500">
//                 Loading profile...
//               </div>
//             </div>
//           ) : error ? (
//             <div className="text-center py-8 text-sm text-red-600">{error}</div>
//           ) : profile ? (
//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold">
//                   {profile.first_name?.[0] ?? "U"}
//                 </div>
//                 <div>
//                   <div className="text-lg font-medium">
//                     {profile.first_name} {profile.last_name}
//                   </div>
//                   <div className="text-sm text-gray-500">{profile.email}</div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div className="p-3 border rounded-lg">
//                   <div className="text-xs text-gray-500">Role</div>
//                   <div className="mt-1 font-medium">{profile.role}</div>
//                 </div>

//                 <div className="p-3 border rounded-lg">
//                   <div className="text-xs text-gray-500">Phone</div>
//                   <div className="mt-1 font-medium">
//                     {profile.phone_number ?? "Not provided"}
//                   </div>
//                 </div>

//                 <div className="p-3 border rounded-lg">
//                   <div className="text-xs text-gray-500">User ID</div>
//                   <div className="mt-1 text-xs break-all">
//                     {profile.user_id}
//                   </div>
//                 </div>

//                 <div className="p-3 border rounded-lg">
//                   <div className="text-xs text-gray-500">Joined</div>
//                   <div className="mt-1 font-medium">
//                     {new Date(profile.created_at).toLocaleString()}
//                   </div>
//                 </div>
//               </div>

//               {/* action buttons */}
//               <div className="flex flex-col sm:flex-row gap-2 mt-3">
//                 <a
//                   href="/account"
//                   className="w-full sm:w-auto text-center px-4 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Manage account
//                 </a>

//                 <button
//                   onClick={onClose}
//                   className="w-full sm:w-auto px-4 py-2 rounded-lg bg-black text-white"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center text-sm text-gray-500 py-8">
//               No profile data.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
