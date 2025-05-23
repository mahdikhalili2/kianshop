import React, { useState } from 'react';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import laptop1 from './images/laptop1.png';
import laptop2 from './images/laptop1.png';
import laptop3 from './images/laptop1.png';
import './App.css';

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
    <footer>
      <div className="footer-contact">
        آدرس: تهران، دکان کیانی وافع در مجتمع تجاری نور | تلفن: ۰۲۱-۱۲۳۴۵۶۷۸
      </div>
      <div className="footer-icons">
        <a href="https://wa.me/989123456789" target="_blank" rel="noopener noreferrer" title="واتساپ" style={{ color: '#25D366' }}>
          <FaWhatsapp />
        </a>
        <a href="https://t.me/kianshop" target="_blank" rel="noopener noreferrer" title="تلگرام" style={{ color: '#229ED9' }}>
          <FaTelegram />
        </a>
      </div>
      <div className="footer-copy">
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
      image: laptop1,
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
      image: laptop2,
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
      image: laptop3,
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
    <div style={{ direction: 'rtl', minHeight: '100vh', background: '#f5f5f5' }}>
      <Header />

      <div className="kianshop-container">
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="text"
            placeholder="جستجوی لپتاپ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: 8, width: 200, borderRadius: 6, border: '1px solid #ccc', fontFamily: 'inherit' }}
          />
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', fontFamily: 'inherit' }}
          >
            <option value="همه">همه</option>
            <option value="کاربری عمومی">کاربری عمومی</option>
            <option value="بیزینس">بیزینس</option>
          </select>
        </div>

        <div className="kianshop-products">
          {filteredLaptops.map(laptop => (
            <div className="kianshop-card" key={laptop.id}>
              <img src={laptop.image} alt={laptop.name} />
              <h3>{laptop.name}</h3>
              <div className="category">دسته‌بندی: {laptop.category}</div>
              <div className="summary">{laptop.summary}</div>
              <div className="actions">
                <button
                  onClick={() => toggleExpand(laptop.id)}
                  style={{ background: '#43cea2', color: '#fff' }}
                >
                  {expandedLaptopId === laptop.id ? 'بستن توضیحات' : 'توضیحات'}
                </button>
                <button
                  onClick={() => toggleCompare(laptop)}
                  className={compareList.find(item => item.id === laptop.id) ? 'selected' : ''}
                >
                  {compareList.find(item => item.id === laptop.id) ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
                </button>
              </div>
              {expandedLaptopId === laptop.id && (
                <div className="kianshop-details">
                  <ul>
                    <li>پردازنده: {laptop.specs.processor}</li>
                    <li>رم: {laptop.specs.ram}</li>
                    <li>حافظه: {laptop.specs.storage}</li>
                    <li>نمایشگر: {laptop.specs.display}</li>
                    <li>باتری: {laptop.specs.battery}</li>
                  </ul>
                  <div>{laptop.summary}</div>
                </div>
              )}
            </div>
          ))}
        </div>

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
