"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/button";
import ImageUploader, { type PendingImage } from "@/components/admin/image-uploader";
import { uploadImagesToImageKit } from "@/lib/uploadImages";
import { notify } from "@/components/toaster";
import type { IProduct } from "@/types";

const CATEGORIES = ["Furniture", "Lighting", "Decor", "Textiles"];

interface ProductFormProps {
  initialData?: Partial<IProduct>;
  productId?: string;
}

export default function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const isEdit = Boolean(productId);

  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    shortDescription: initialData?.shortDescription || "",
    price: initialData?.price?.toString() || "",
    compareAtPrice: initialData?.compareAtPrice?.toString() || "",
    category: initialData?.category || CATEGORIES[0],
    material: initialData?.material || "",
    color: initialData?.color || "",
    dimensions: initialData?.dimensions || "",
    stock: initialData?.stock?.toString() || "0",
    featured: initialData?.featured || false,
    tags: initialData?.tags?.join(", ") || "",
  });

  // Existing (already-uploaded) images keep their real URL as the id.
  // Newly selected images get a local blob: preview and carry their File
  // — nothing is uploaded to ImageKit until the form is submitted.
  const [images, setImages] = useState<PendingImage[]>(
    (initialData?.images || []).map((url) => ({ id: url, url }))
  );
  const [uploadingIds, setUploadingIds] = useState<Set<string>>(new Set());
  const [stage, setStage] = useState<"idle" | "uploading" | "saving">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!images.length) return notify.error("Add a product image.");

    const existing = images.filter((img) => !img.file);
    const pending = images.filter((img): img is PendingImage & { file: File } => !!img.file);

    try {
      let uploadedUrls: string[] = [];

      if (pending.length) {
        setStage("uploading");
        setUploadingIds(new Set(pending.map((p) => p.id)));
        uploadedUrls = await uploadImagesToImageKit(pending.map((p) => p.file));
        // Free the local blob previews now that we have real URLs.
        pending.forEach((p) => URL.revokeObjectURL(p.url));
      }

      setStage("saving");
      const finalImages = [...existing.map((e) => e.url), ...uploadedUrls];

      const payload = {
        ...form,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        stock: Number(form.stock),
        images: finalImages,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (isEdit) {
        await axios.put(`/api/products/${productId}`, payload);
        notify.success("Product updated.");
      } else {
        await axios.post("/api/products", payload);
        notify.success("Product created.");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      notify.error(
        err.response?.data?.error ||
          (stage === "uploading" ? "Image upload failed." : "Failed to save product.")
      );
    } finally {
      setStage("idle");
      setUploadingIds(new Set());
    }
  };

  const saving = stage !== "idle";
  const submitLabel =
    stage === "uploading"
      ? "Uploading images…"
      : stage === "saving"
        ? "Saving…"
        : isEdit
          ? "Save changes"
          : "Create product";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div>
        <label className="block text-xs text-ink-soft mb-1.5">Product images</label>
        <ImageUploader
          images={images}
          onChange={setImages}
          uploadingIds={uploadingIds}
          disabled={saving}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
        <div>
          <label className="block text-xs text-ink-soft mb-1.5">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-ink-soft mb-1.5">Short description</label>
        <input
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay"
        />
      </div>

      <div>
        <label className="block text-xs text-ink-soft mb-1.5">Full description</label>
        <textarea
          name="description"
          required
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay resize-none"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Price ($)" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
        <Field label="Compare-at price ($)" name="compareAtPrice" type="number" step="0.01" value={form.compareAtPrice} onChange={handleChange} />
        <Field label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} required />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Material" name="material" value={form.material} onChange={handleChange} />
        <Field label="Color" name="color" value={form.color} onChange={handleChange} />
        <Field label="Dimensions" name="dimensions" value={form.dimensions} onChange={handleChange} placeholder="e.g. 72×32×30 cm" />
      </div>

      <Field label="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} placeholder="oak, handmade, minimal" />

      <label className="flex items-center gap-2.5 text-sm text-ink cursor-pointer w-fit">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
          disabled={saving}
          className="h-4 w-4 accent-clay"
        />
        Feature on homepage
      </label>

      <Button type="submit" variant="primary" loading={saving} disabled={saving}>
        {submitLabel}
      </Button>
    </form>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs text-ink-soft mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay"
      />
    </div>
  );
}