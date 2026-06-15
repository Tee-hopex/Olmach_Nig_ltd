import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { z } from 'zod';
import { Plus, Trash2, ArrowLeft, Loader } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import { useAdminCategories } from '../../hooks/admin/useAdminCategories';
import { useAdminProduct, useCreateProduct, useUpdateProduct } from '../../hooks/admin/useAdminProducts';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  categoryId: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  price: z.coerce.number().positive('Price must be positive'),
  salePrice: z.coerce.number().positive().optional().nullable(),
  shortDescription: z.string().min(1, 'Short description is required'),
  description: z.string().min(1, 'Description is required'),
  inStock: z.boolean().default(true),
  stockCount: z.coerce.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isNew: z.boolean().default(false),
  badge: z.string().optional().nullable(),
  warranty: z.string().optional().nullable(),
  tags: z.string().optional(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  features: z.array(z.object({ value: z.string() })).default([]),
});

type FormData = z.infer<typeof schema>;

export default function AdminProductFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEditing = !!id && id !== 'new';
  const navigate = useNavigate();

  const { data: categories = [] } = useAdminCategories();
  const { data: existingProduct, isLoading: loadingProduct } = useAdminProduct(isEditing ? id! : '');
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct(id ?? '');

  const { register, control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: standardSchemaResolver(schema),
    defaultValues: {
      inStock: true,
      stockCount: 0,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      images: [],
      features: [],
    },
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'features',
  });

  const images = watch('images');

  useEffect(() => {
    if (existingProduct && isEditing) {
      reset({
        name: existingProduct.name ?? '',
        brand: existingProduct.brand ?? '',
        categoryId: existingProduct.categoryId ?? '',
        subcategory: existingProduct.subcategory ?? '',
        price: existingProduct.price ?? 0,
        salePrice: existingProduct.salePrice ?? null,
        shortDescription: existingProduct.shortDescription ?? '',
        description: existingProduct.description ?? '',
        inStock: existingProduct.inStock ?? true,
        stockCount: existingProduct.stockCount ?? 0,
        isFeatured: existingProduct.isFeatured ?? false,
        isBestSeller: existingProduct.isBestSeller ?? false,
        isNew: existingProduct.isNew ?? false,
        badge: existingProduct.badge ?? null,
        warranty: existingProduct.warranty ?? null,
        images: existingProduct.images ?? [],
        tags: (existingProduct.tags ?? []).join(', '),
        features: (existingProduct.features ?? []).map((v: string) => ({ value: v })),
      });
    }
  }, [existingProduct, isEditing, reset]);

  async function onSubmit(data: FormData) {
    const payload = {
      ...data,
      tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      features: data.features.map(f => f.value).filter(Boolean),
      salePrice: data.salePrice || null,
    };

    if (isEditing) {
      await updateProduct.mutateAsync(payload);
    } else {
      await createProduct.mutateAsync(payload);
    }
    navigate('/admin/products');
  }

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  if (isEditing && loadingProduct) {
    return (
      <AdminLayout title="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEditing ? 'Edit Product' : 'Add Product'}
      subtitle={isEditing ? 'Update product details' : 'Add a new product to your store'}
      actions={
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column — main fields */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic info */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3">Basic Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Product Name *</label>
                  <input {...register('name')} className="form-input" placeholder="e.g. Singer Heavy Duty 4432" />
                  {errors.name && <p className="err">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Brand *</label>
                  <input {...register('brand')} className="form-input" placeholder="e.g. Singer" />
                  {errors.brand && <p className="err">{errors.brand.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Category *</label>
                  <select {...register('categoryId')} className="form-input">
                    <option value="">Select category...</option>
                    {categories.map((c: { id: string; name: string }) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="err">{errors.categoryId.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Subcategory</label>
                  <input {...register('subcategory')} className="form-input" placeholder="Optional" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Short Description *</label>
                <input {...register('shortDescription')} className="form-input" placeholder="Brief one-line description" />
                {errors.shortDescription && <p className="err">{errors.shortDescription.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Description *</label>
                <textarea {...register('description')} rows={5} className="form-input resize-none" placeholder="Detailed product description..." />
                {errors.description && <p className="err">{errors.description.message}</p>}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3">Pricing & Inventory</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Price (₦) *</label>
                  <input {...register('price')} type="number" step="0.01" className="form-input" placeholder="0.00" />
                  {errors.price && <p className="err">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Sale Price (₦)</label>
                  <input {...register('salePrice')} type="number" step="0.01" className="form-input" placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Stock Count</label>
                  <input {...register('stockCount')} type="number" min="0" className="form-input" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Warranty</label>
                <input {...register('warranty')} className="form-input" placeholder="e.g. 1 Year Manufacturer Warranty" />
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-semibold text-navy-900 text-sm">Key Features</h3>
                <button
                  type="button"
                  onClick={() => appendFeature({ value: '' })}
                  className="flex items-center gap-1 text-xs text-gold-600 hover:text-gold-700 font-medium"
                >
                  <Plus className="w-3.5 h-3.5" /> Add feature
                </button>
              </div>
              <div className="space-y-2">
                {featureFields.map((f, i) => (
                  <div key={f.id} className="flex gap-2">
                    <input
                      {...register(`features.${i}.value`)}
                      className="form-input flex-1"
                      placeholder={`Feature ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {featureFields.length === 0 && (
                  <p className="text-xs text-gray-400">No features added yet.</p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3 mb-3">Tags</h3>
              <input {...register('tags')} className="form-input" placeholder="Comma-separated: sewing, industrial, singer" />
              <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Images */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3 mb-3">Product Images</h3>
              <ImageUploader
                value={images}
                onChange={(urls) => setValue('images', urls, { shouldValidate: true })}
              />
              {errors.images && <p className="err mt-2">{errors.images.message}</p>}
            </div>

            {/* Flags */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
              <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3">Product Flags</h3>
              {[
                { name: 'inStock', label: 'In Stock' },
                { name: 'isFeatured', label: 'Featured Product' },
                { name: 'isBestSeller', label: 'Best Seller' },
                { name: 'isNew', label: 'New Arrival' },
              ].map(({ name, label }) => (
                <label key={name} className="flex items-center gap-3 cursor-pointer">
                  <input
                    {...register(name as keyof FormData)}
                    type="checkbox"
                    className="w-4 h-4 rounded accent-red-600"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>

            {/* Badge */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3 mb-3">Badge</h3>
              <select {...register('badge')} className="form-input">
                <option value="">No badge</option>
                <option value="New">New</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Sale">Sale</option>
                <option value="Popular">Popular</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all shadow-sm"
            >
              {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
            </button>
          </div>
        </div>
      </form>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: #fff;
          color: #111;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input:focus {
          border-color: #EF4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }
        .err {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </AdminLayout>
  );
}
