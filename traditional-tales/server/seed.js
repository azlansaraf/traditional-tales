const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  { name: 'Open Front Abaya', description: 'A flowing open-front abaya crafted from premium matte crepe. Effortlessly elegant with a relaxed silhouette that drapes beautifully.', category: 'Classic Abayas', price: 3850, badge: 'New', images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=85'], sizes: ['XS','S','M','L','XL','2XL','3XL'], colors: ['Black','Deep Brown','Navy'], countInStock: 50, featured: true, material: 'Premium Matte Crepe', sku: 'TT-001' },
  { name: 'Gold Embroidered Abaya', description: 'Intricate gold threadwork adorns the cuffs and hem. Perfect for special occasions and Eid gatherings. Lined with soft satin.', category: 'Embroidered', price: 6200, badge: null, images: ['https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=600&q=85'], sizes: ['XS','S','M','L','XL','2XL'], colors: ['Midnight Blue','Black'], countInStock: 30, featured: true, material: 'Satin with Gold Threadwork', sku: 'TT-002' },
  { name: 'Floral Printed Burkha', description: 'A delicate dusty rose burkha featuring an all-over botanical print. Made from breathable georgette.', category: 'Burkhas', price: 3100, oldPrice: 4500, badge: 'Sale', images: ['https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=85'], sizes: ['S','M','L','XL'], colors: ['Dusty Rose'], countInStock: 20, featured: true, material: 'Georgette', sku: 'TT-003' },
  { name: 'Kaftan Style Abaya', description: 'A relaxed kaftan-inspired abaya in flowy ivory chiffon. Wide sleeves and a soft waist tie.', category: 'Classic Abayas', price: 4950, badge: 'New', images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=85'], sizes: ['XS','S','M','L','XL','2XL','3XL'], colors: ['Ivory','White','Beige'], countInStock: 40, featured: true, material: 'Chiffon', sku: 'TT-004' },
  { name: 'Occasion Abaya Set', description: 'An opulent two-piece set in blush pink with gold embellished borders. Comes with a matching hijab pin.', category: 'Occasion Wear', price: 8400, badge: null, images: ['https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?w=600&q=85'], sizes: ['S','M','L','XL','2XL'], colors: ['Blush Pink'], countInStock: 15, featured: true, material: 'Silk Blend', sku: 'TT-005' },
  { name: 'Everyday Burkha', description: 'A practical yet stylish everyday burkha in wrinkle-resistant charcoal fabric. Button-down front and roomy fit.', category: 'Burkhas', price: 2990, badge: null, images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=85'], sizes: ['XS','S','M','L','XL','2XL','3XL'], colors: ['Charcoal','Black','Navy'], countInStock: 60, featured: false, material: 'Wrinkle-Resistant Crepe', sku: 'TT-006' },
  { name: 'Lace Trim Abaya', description: 'Delicate French lace trims the sleeves and hem. Feminine and refined, transitions from daywear to evening elegance.', category: 'Embroidered', price: 5300, badge: 'New', images: ['https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=600&q=85'], sizes: ['XS','S','M','L','XL','2XL'], colors: ['Pearl White','Ivory'], countInStock: 25, featured: true, material: 'Crepe with French Lace', sku: 'TT-007' },
  { name: 'Premium Hijab Set', description: 'A set of 3 premium modal hijabs in complementary tones. Soft, breathable, and colour-fast.', category: 'Accessories', price: 1200, badge: null, images: ['https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=85'], sizes: ['One Size'], colors: ['Multi'], countInStock: 100, featured: false, material: 'Modal', sku: 'TT-008' },
  { name: 'Velvet Occasion Burkha', description: 'Rich velvet in deep burgundy. Crystal buttons and flared hem make it a standout at any gathering.', category: 'Occasion Wear', price: 7200, oldPrice: 9000, badge: 'Sale', images: ['https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?w=600&q=85'], sizes: ['S','M','L','XL'], colors: ['Deep Burgundy'], countInStock: 12, featured: false, material: 'Velvet', sku: 'TT-009' },
  { name: 'Satin Sash Abaya', description: 'A modern abaya with a detachable satin sash at the waist. Clean-cut and contemporary with a slight A-line silhouette.', category: 'Classic Abayas', price: 4400, badge: null, images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=85'], sizes: ['XS','S','M','L','XL','2XL'], colors: ['Olive Green','Black'], countInStock: 35, featured: false, material: 'Crepe with Satin', sku: 'TT-010' },
  { name: 'Silk Embroidered Burkha', description: 'Silk fabric with fine silver embroidery on the yoke and cuffs. Fully lined for comfort.', category: 'Embroidered', price: 6800, badge: 'New', images: ['https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=600&q=85'], sizes: ['S','M','L','XL','2XL','3XL'], colors: ['Royal Blue'], countInStock: 18, featured: false, material: 'Silk', sku: 'TT-011' },
  { name: 'Niqab & Hijab Set', description: 'A coordinated niqab and hijab set in matte black. Magnetic closure on the niqab for ease of use.', category: 'Accessories', price: 850, badge: null, images: ['https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=85'], sizes: ['One Size'], colors: ['Black'], countInStock: 80, featured: false, material: 'Matte Jersey', sku: 'TT-012' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded`);

    // Create admin user
    await User.deleteMany({ email: 'admin@traditionaltales.in' });
    await User.create({ firstName: 'Admin', lastName: 'User', email: 'admin@traditionaltales.in', password: 'admin123', role: 'admin' });
    console.log('✅ Admin user created: admin@traditionaltales.in / admin123');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
