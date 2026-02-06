import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { Lock, Trash2, UserPlus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizeEmail } from "@/lib/admin-auth";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      {
        title: "Admin | BTG Gutters",
      },
    ],
  }),
});

function AdminPage() {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const signedInEmail = session?.user?.email ?? null;
  const access = useQuery(
    api.adminAccess.isCurrentUserAllowed,
    signedInEmail ? {} : "skip"
  );

  if (isSessionPending || (signedInEmail && access === undefined)) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="text-muted-foreground">Checking authentication...</div>
      </div>
    );
  }

  if (!signedInEmail) {
    return <AuthGate />;
  }

  if (!access?.allowed) {
    return <UnauthorizedState />;
  }

  const isAdminRoot = pathname === "/admin" || pathname === "/admin/";

  if (!isAdminRoot) {
    return <Outlet />;
  }

  return (
    <AdminControlCenter currentUserEmail={access.email ?? signedInEmail} />
  );
}

function AuthGate() {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const allowedEmails = useQuery(api.adminAccess.getAllowedSignupEmails) ?? [];
  const allowedSet = useMemo(
    () => new Set(allowedEmails.map((email) => normalizeEmail(email))),
    [allowedEmails]
  );

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-bold text-2xl">Admin Access</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Sign in or create your admin account.
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <Button
            onClick={() => {
              setMode("sign-in");
            }}
            type="button"
            variant={mode === "sign-in" ? "default" : "outline"}
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              setMode("sign-up");
            }}
            type="button"
            variant={mode === "sign-up" ? "default" : "outline"}
          >
            Sign Up
          </Button>
        </div>

        {mode === "sign-in" ? (
          <SignInForm />
        ) : (
          <SignUpForm allowedEmails={allowedSet} />
        )}

        <p className="mt-4 text-center text-muted-foreground text-xs">
          If your email is not on the allowlist, ask an admin to add you first.
        </p>
      </div>
    </div>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsSubmitting(true);

        authClient.signIn.email(
          {
            email,
            password,
          },
          {
            onSuccess: () => {
              setIsSubmitting(false);
              toast.success("Signed in");
              window.location.assign("/admin/section");
            },
            onError: (error) => {
              setIsSubmitting(false);
              toast.error(error.error.message || "Sign in failed");
            },
          }
        );
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="admin-signin-email">Email</Label>
        <Input
          autoComplete="username"
          id="admin-signin-email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="you@company.com"
          type="email"
          value={email}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-signin-password">Password</Label>
        <Input
          autoComplete="current-password"
          id="admin-signin-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="********"
          type="password"
          value={password}
        />
      </div>

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}

function SignUpForm({ allowedEmails }: { allowedEmails: Set<string> }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        const normalizedEmail = normalizeEmail(email);
        if (!allowedEmails.has(normalizedEmail)) {
          toast.error("This email is not allowlisted for admin signup.");
          return;
        }

        setIsSubmitting(true);
        authClient.signUp.email(
          {
            name,
            email: normalizedEmail,
            password,
          },
          {
            onSuccess: () => {
              setIsSubmitting(false);
              toast.success("Account created and signed in");
              window.location.assign("/admin/section");
            },
            onError: (error) => {
              setIsSubmitting(false);
              toast.error(error.error.message || "Sign up failed");
            },
          }
        );
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="admin-signup-name">Name</Label>
        <Input
          id="admin-signup-name"
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Your name"
          value={name}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-signup-email">Email</Label>
        <Input
          autoComplete="username"
          id="admin-signup-email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="you@company.com"
          type="email"
          value={email}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-signup-password">Password</Label>
        <Input
          autoComplete="new-password"
          id="admin-signup-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Minimum 8 characters"
          type="password"
          value={password}
        />
      </div>

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}

function UnauthorizedState() {
  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="font-bold text-2xl">Not authorized</h1>
        <p className="mt-2 text-muted-foreground">
          This account is signed in but is not on the admin allowlist.
        </p>
        <div className="mt-5 flex gap-3">
          <Button
            onClick={() => {
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Signed out");
                  },
                },
              });
            }}
            type="button"
            variant="outline"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

function AdminControlCenter({
  currentUserEmail,
}: {
  currentUserEmail: string;
}) {
  const allowedAdmins = useQuery(api.adminAccess.listAllowedAdmins) ?? [];
  const addAllowedAdmin = useMutation(api.adminAccess.addAllowedAdmin);
  const removeAllowedAdmin = useMutation(api.adminAccess.removeAllowedAdmin);
  const [newEmail, setNewEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isRemovingSelf, setIsRemovingSelf] = useState(false);
  const [isDeletingLogin, setIsDeletingLogin] = useState(false);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h1 className="font-bold text-2xl">Admin Control Center</h1>
          <p className="mt-2 text-muted-foreground">
            You are signed in as{" "}
            <span className="font-medium">{currentUserEmail}</span>. Open any
            public page and click "Edit Slot" on images.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground"
              href="/admin/section"
            >
              Open Section Editor
            </a>
            <a
              className="inline-flex items-center rounded-md border px-4 py-2 font-medium"
              href="/admin/gallery"
            >
              Open Gallery Manager
            </a>
            <a
              className="inline-flex items-center rounded-md border px-4 py-2 font-medium"
              href="/"
            >
              Go to Home
            </a>
            <a
              className="inline-flex items-center rounded-md border px-4 py-2 font-medium"
              href="/about"
            >
              Go to About
            </a>
            <Button
              onClick={() => {
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success("Signed out");
                    },
                  },
                });
              }}
              type="button"
              variant="outline"
            >
              Sign Out
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h2 className="font-semibold text-lg">Add Person</h2>
          </div>
          <p className="mb-4 text-muted-foreground text-sm">
            Add an email to allow admin signup/login access.
          </p>
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={async (event) => {
              event.preventDefault();
              event.stopPropagation();
              setIsAdding(true);
              try {
                await addAllowedAdmin({ email: newEmail });
                setNewEmail("");
                toast.success("Person added to allowlist");
              } catch (error) {
                const message =
                  error instanceof Error
                    ? error.message
                    : "Could not add person";
                toast.error(message);
              } finally {
                setIsAdding(false);
              }
            }}
          >
            <Input
              onChange={(event) => {
                setNewEmail(event.target.value);
              }}
              placeholder="person@company.com"
              type="email"
              value={newEmail}
            />
            <Button disabled={isAdding} type="submit">
              <UserPlus className="mr-2 h-4 w-4" />
              {isAdding ? "Adding..." : "Add Person"}
            </Button>
          </form>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-lg">Allowed Admins</h2>
          <div className="space-y-2">
            {allowedAdmins.map((admin) => (
              <div
                className="flex items-center justify-between rounded-lg border px-3 py-2"
                key={admin.email}
              >
                <div>
                  <p className="font-medium">{admin.email}</p>
                  <p className="text-muted-foreground text-xs">
                    {admin.isRoot ? "Root admin" : "Allowlisted"}
                  </p>
                </div>
                {admin.isRoot ? null : (
                  <Button
                    onClick={async () => {
                      try {
                        await removeAllowedAdmin({ email: admin.email });
                        toast.success("Person removed");
                      } catch (error) {
                        const message =
                          error instanceof Error
                            ? error.message
                            : "Could not remove person";
                        toast.error(message);
                      }
                    }}
                    type="button"
                    variant="outline"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <h2 className="font-semibold text-lg text-red-800">
            Delete Account Access
          </h2>
          <p className="mt-2 text-red-700 text-sm">
            Removes your admin access and signs you out.
          </p>
          <Button
            className="mt-4"
            disabled={isRemovingSelf}
            onClick={async () => {
              setIsRemovingSelf(true);
              try {
                await removeAllowedAdmin({ email: currentUserEmail });
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success(
                        "Your access was deleted and you were signed out"
                      );
                    },
                  },
                });
              } catch (error) {
                const message =
                  error instanceof Error
                    ? error.message
                    : "Could not delete your account access";
                toast.error(message);
                setIsRemovingSelf(false);
              }
            }}
            type="button"
            variant="destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isRemovingSelf ? "Deleting..." : "Delete My Access"}
          </Button>

          <p className="mt-4 text-red-700 text-sm">
            Delete your actual Better Auth login account.
          </p>
          <Button
            className="mt-3"
            disabled={isDeletingLogin}
            onClick={async () => {
              if (!("deleteUser" in authClient)) {
                toast.error(
                  "Delete account is not enabled in this auth client."
                );
                return;
              }

              const deleteUser = authClient.deleteUser;
              if (typeof deleteUser !== "function") {
                toast.error(
                  "Delete account is not enabled in this auth client."
                );
                return;
              }

              setIsDeletingLogin(true);
              try {
                await deleteUser({
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success("Login account deleted");
                    },
                  },
                });
              } catch (error) {
                const message =
                  error instanceof Error
                    ? error.message
                    : "Could not delete login account";
                toast.error(message);
              } finally {
                setIsDeletingLogin(false);
              }
            }}
            type="button"
            variant="outline"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeletingLogin ? "Deleting login..." : "Delete Login Account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
