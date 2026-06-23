import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';

// Controllers
import * as auth from '../controllers/auth';
import * as products from '../controllers/products';
import * as categories from '../controllers/categories';
import * as brands from '../controllers/brands';
import * as orders from '../controllers/orders';
import * as blogs from '../controllers/blogs';
import * as admin from '../controllers/admin';
import * as uploadCtrl from '../controllers/upload';

const router = Router();

// ── Auth ──────────────────────────────────────────────────
router.post('/auth/login', auth.login);
router.get('/auth/me', requireAuth, auth.getMe);
router.patch('/auth/password', requireAuth, auth.changePassword);
router.patch('/auth/credentials', requireAuth, auth.changeCredentials);

// ── Products (public) ─────────────────────────────────────
router.get('/products', products.getProducts);
router.get('/products/featured', products.getFeaturedProducts);
router.get('/products/:slug', products.getProductBySlug);

// ── Products (admin) ──────────────────────────────────────
router.get('/admin/products/:id', requireAuth, products.getProductById);
router.post('/products', requireAuth, products.createProduct);
router.patch('/products/:id', requireAuth, products.updateProduct);
router.delete('/products/:id', requireAuth, products.deleteProduct);

// ── Categories ────────────────────────────────────────────
router.get('/categories', categories.getCategories);
router.post('/categories', requireAuth, categories.createCategory);
router.patch('/categories/:id', requireAuth, categories.updateCategory);
router.delete('/categories/:id', requireAuth, categories.deleteCategory);

// ── Brands ────────────────────────────────────────────────
router.get('/brands', brands.getBrands);
router.post('/brands', requireAuth, brands.createBrand);
router.patch('/brands/:id', requireAuth, brands.updateBrand);
router.delete('/brands/:id', requireAuth, brands.deleteBrand);

// ── Orders (public) ───────────────────────────────────────
router.post('/orders', orders.placeOrder);
router.get('/orders/track/:orderNumber', orders.trackOrder);

// ── Orders (admin) ────────────────────────────────────────
router.get('/orders', requireAuth, orders.getOrders);
router.get('/orders/:id', requireAuth, orders.getOrderById);
router.patch('/orders/:id/status', requireAuth, orders.updateOrderStatus);
router.patch('/orders/:id/payment', requireAuth, orders.markOrderPaid);

// ── Blog (public) ─────────────────────────────────────────
router.get('/blog', blogs.getBlogPosts);
router.get('/blog/:slug', blogs.getBlogPostBySlug);

// ── Blog (admin) ──────────────────────────────────────────
router.post('/blog', requireAuth, blogs.createBlogPost);
router.patch('/blog/:id', requireAuth, blogs.updateBlogPost);
router.delete('/blog/:id', requireAuth, blogs.deleteBlogPost);

// ── Admin dashboard & settings ────────────────────────────
router.get('/admin/dashboard', requireAuth, admin.getDashboardStats);
router.get('/admin/settings', requireAuth, admin.getSettings);
router.patch('/admin/settings', requireAuth, admin.updateSettings);
router.get('/admin/subscribers', requireAuth, admin.getSubscribers);

// ── Public settings & newsletter ─────────────────────────
router.get('/settings', admin.getSettings);
router.post('/subscribe', admin.subscribe);

// ── Image upload ──────────────────────────────────────────
router.post('/upload', requireAuth, upload.single('image'), uploadCtrl.uploadImage);
router.delete('/upload', requireAuth, uploadCtrl.deleteImage);

export default router;
