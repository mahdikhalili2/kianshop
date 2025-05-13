import React, { useState } from 'react';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

function Header() {
  return (
    <header style={{
      background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
      color: '#fff',
      padding: '24px 0',
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      letterSpacing: '2px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      kianshop
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      background: '#222',
      color: '#fff',
      padding: '32px 0 16px 0',
      textAlign: 'center',
      marginTop: '40px'
    }}>
      <div style={{ marginBottom: '12px', fontSize: '1.1rem' }}>
        آدرس: تهران، خیابان مثال، پلاک ۱۲۳ | تلفن: ۰۲۱-۱۲۳۴۵۶۷۸
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '2rem' }}>
        <a href="https://wa.me/989123456789" target="_blank" rel="noopener noreferrer" title="واتساپ" style={{ color: '#25D366' }}>
          <FaWhatsapp />
        </a>
        <a href="https://t.me/kianshop" target="_blank" rel="noopener noreferrer" title="تلگرام" style={{ color: '#229ED9' }}>
          <FaTelegram />
        </a>
      </div>
      <div style={{ marginTop: '14px', fontSize: '0.9rem', color: '#aaa' }}>
        © {new Date().getFullYear()} kianshop. همه حقوق محفوظ است.
      </div>
    </footer>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('همه');
  const [compareList, setCompareList] = useState([]);
  const [expandedLaptopId, setExpandedLaptopId] = useState(null);

  const laptops = [
    {
      id: 1,
      name: "لپتاپ ایسوس مدل X509JA",
      brand: "ASUS",
      category: "کاربری عمومی",
      image: "https://picsum.photos/id/1018/600/400",
      specs: {
        processor: "Intel Core i5-1135G7",
        ram: "8GB DDR4",
        storage: "512GB SSD",
        display: "15.6\" Full HD",
        battery: "تا 8 ساعت"
      },
      summary: "طراحی ساده، مناسب برای استفاده‌های سبک و روزمره."
    },
    {
      id: 2,
      name: "لپتاپ لنوو ThinkPad E14",
      brand: "Lenovo",
      category: "بیزینس",
      image: "https://picsum.photos/id/1015/600/400",
      specs: {
        processor: "AMD Ryzen 5 5500U",
        ram: "16GB DDR4",
        storage: "512GB SSD",
        display: "14\" Full HD",
        battery: "تا 10 ساعت"
      },
      summary: "مناسب برای جلسات کاری و تایپ طولانی با صفحه کلید عالی."
    },
    {
      id: 3,
      name: "لپتاپ دل Inspiron 15",
      brand: "Dell",
      category: "کاربری عمومی",
      image: "https://picsum.photos/id/1016/600/400",
      specs: {
        processor: "Intel Core i7-1165G7",
        ram: "16GB DDR4",
        storage: "1TB HDD + 256GB SSD",
        display: "15.6\" Full HD",
        battery: "تا 6 ساعت"
      },
      summary: "فضای ذخیره‌سازی بالا با طراحی کلاسیک."
    }
  ];

  const toggleCompare = (laptop) => {
    setCompareList((prev) => {
      const exists = prev.find((item) => item.id === laptop.id);
      if (exists) return prev.filter((item) => item.id !== laptop.id);
      return [...prev, laptop];
    });
  };

  const toggleExpand = (id) => {
    setExpandedLaptopId(expandedLaptopId === id ? null : id);
  };

  const filteredLaptops = laptops.filter(laptop => {
    const matchCategory = activeCategory === 'همه' || laptop.category === activeCategory;
    const matchSearch = laptop.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      <Header />

      {/* --- محتوای اصلی سایت --- */}
      <div style={{ maxWidth: 900, margin: '32px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="جستجوی لپتاپ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: 8, width: 200, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            style={{ marginRight: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          >
            <option value="همه">همه</option>
            <option value="کاربری عمومی">کاربری عمومی</option>
            <option value="بیزینس">بیزینس</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {filteredLaptops.map(laptop => (
            <div key={laptop.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, width: 260, background: '#fafafa' }}>
              <img src={laptop.image} alt={laptop.name} style={{ width: '100%', borderRadius: 6 }} />
              <h3 style={{ margin: '12px 0 6px 0' }}>{laptop.name}</h3>
              <div style={{ fontSize: 14, color: '#555' }}>دسته‌بندی: {laptop.category}</div>
              <div style={{ margin: '8px 0', fontSize: 13 }}>{laptop.summary}</div>
              <button
                onClick={() => toggleExpand(laptop.id)}
                style={{ margin: '8px 0', padding: '6px 12px', borderRadius: 6, border: 'none', background: '#43cea2', color: '#fff', cursor: 'pointer' }}
              >
                {expandedLaptopId === laptop.id ? 'بستن توضیحات' : 'توضیحات'}
              </button>
              <button
                onClick={() => toggleCompare(laptop)}
                style={{
                  margin: '0 8px',
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: compareList.find(item => item.id === laptop.id) ? '2px solid #43cea2' : '1px solid #ccc',
                  background: compareList.find(item => item.id === laptop.id) ? '#e0f7f1' : '#fafafa',
                  color: '#185a9d',
                  cursor: 'pointer'
                }}
              >
                {compareList.find(item => item.id === laptop.id) ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
              </button>
              {/* توضیحات هر لپتاپ دقیقا زیر همان کارت */}
              {expandedLaptopId === laptop.id && (
                <div style={{ marginTop: 12, background: '#f4fffa', borderRadius: 8, padding: 10, border: '1px solid #43cea2' }}>
                  <ul style={{ textAlign: 'right', fontSize: 14 }}>
                    <li>پردازنده: {laptop.specs.processor}</li>
                    <li>رم: {laptop.specs.ram}</li>
                    <li>حافظه: {laptop.specs.storage}</li>
                    <li>نمایشگر: {laptop.specs.display}</li>
                    <li>باتری: {laptop.specs.battery}</li>
                  </ul>
                  <div style={{ marginTop: 8 }}>{laptop.summary}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* جدول مقایسه */}
        {compareList.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3>مقایسه لپتاپ‌ها</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
              <thead>
                <tr style={{ background: '#f0f0f0' }}>
                  <th>ویژگی</th>
                  {compareList.map((laptop) => (
                    <th key={laptop.id}>{laptop.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>پردازنده</td>
                  {compareList.map(l => <td key={l.id}>{l.specs.processor}</td>)}
                </tr>
                <tr>
                  <td>رم</td>
                  {compareList.map(l => <td key={l.id}>{l.specs.ram}</td>)}
                </tr>
                <tr>
                  <td>حافظه</td>
                  {compareList.map(l => <td key={l.id}>{l.specs.storage}</td>)}
                </tr>
                <tr>
                  <td>نمایشگر</td>
                  {compareList.map(l => <td key={l.id}>{l.specs.display}</td>)}
                </tr>
                <tr>
                  <td>باتری</td>
                  {compareList.map(l => <td key={l.id}>{l.specs.battery}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
