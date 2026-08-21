"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { AddressForm } from "@/components/checkout/address-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import { useAddressStore, type SavedAddress } from "@/store/addresses";
import type { AddressFormValues } from "@/lib/validations/checkout";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";

export default function AddressesPage() {
  const t = useTranslations("account");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { addresses, add, update, remove, setDefault } = useAddressStore();
  const [editing, setEditing] = useState<SavedAddress | null>(null);
  const [adding, setAdding] = useState(false);
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [router, user]);
  if (!user) return null;
  function save(data: AddressFormValues) {
    const value = { ...data, title: editing?.title ?? t("newAddress") };
    if (editing) update(editing.id, value);
    else add(value);
    setEditing(null);
    setAdding(false);
  }
  if (adding || editing)
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <h1 className="text-foreground mb-8 text-3xl font-bold">
          {editing ? t("editAddress") : t("newAddress")}
        </h1>
        <AddressForm
          key={editing?.id ?? "new"}
          defaultValues={editing ?? undefined}
          onSubmit={save}
          submitLabel={t("saveAddress")}
        />
        <Button
          variant="ghost"
          className="mt-3 w-full"
          onClick={() => {
            setEditing(null);
            setAdding(false);
          }}
        >
          {t("cancel")}
        </Button>
      </main>
    );
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            {t("addresses")}
          </h1>
          <p className="text-muted-foreground">{t("addressesIntro")}</p>
        </div>
        <Button onClick={() => setAdding(true)}>
          <Plus />
          {t("addAddress")}
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-foreground font-semibold">
                  {address.title}
                </h2>
                {address.isDefault && (
                  <span className="text-primary mt-1 inline-flex items-center gap-1 text-xs">
                    <Star className="size-3 fill-current" />
                    {t("defaultAddress")}
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setEditing(address)}
                  aria-label={t("editAddress")}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => remove(address.id)}
                  aria-label={t("deleteAddress")}
                >
                  <Trash2 className="text-destructive" />
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              {address.province}، {address.city}، {address.address}
            </p>
            {!address.isDefault && (
              <Button
                variant="outline"
                size="sm"
                className="border-primary/40 text-primary hover:bg-primary/10 mt-4 gap-1.5"
                onClick={() => setDefault(address.id)}
              >
                <Star className="size-3.5" />
                {t("makeDefault")}
              </Button>
            )}
          </Card>
        ))}
      </div>
    </main>
  );
}
