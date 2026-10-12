import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, ChefHat, Clock3, Coffee, Leaf, Minus, Plus, Search, ShoppingBag, Sparkles, X } from 'lucide-react'

const API = 'http://localhost:8081/api'
const fallbackMenu = [
  { id: 1, name: 'Masala Dosa', description: 'Crispy dosa, potato masala & coconut chutney', category: 'Breakfast', price: 55, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85', tag: 'Canteen classic', vegetarian: true },
  { id: 2, name: 'Veg Fried Rice', description: 'Wok-tossed rice with vegetables and spring onion', category: 'Meals', price: 85, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85', tag: 'Popular', vegetarian: true },
  { id: 3, name: 'Paneer Wrap', description: 'Spiced paneer, crunchy salad & mint sauce', category: 'Snacks', price: 75, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85', tag: 'Fresh pick', vegetarian: true },
  { id: 4, name: 'Classic Veg Burger', description: 'Grilled veggie patty, lettuce & house sauce', category: 'Snacks', price: 65, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=85', tag: '', vegetarian: true },
  { id: 5, name: 'Chicken Biryani', description: 'Aromatic basmati rice, warm spices & raita', category: 'Meals', price: 120, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85', tag: 'Student favourite', vegetarian: false },
  { id: 6, name: 'Cold Coffee', description: 'Chilled creamy coffee with a cocoa finish', category: 'Drinks', price: 45, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85', tag: '', vegetarian: true },
  { id: 7, name: 'Idli Sambar', description: 'Soft steamed idlis with comforting sambar', category: 'Breakfast', price: 40, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=85', tag: 'Light & lovely', vegetarian: true },
  { id: 8, name: 'Choco Brownie', description: 'Fudgy chocolate brownie for your sweet break', category: 'Desserts', price: 50, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', tag: '', vegetarian: true },
  { id: 9, name: 'Lemon Mint Cooler', description: 'Fresh lime, mint and a little sparkle', category: 'Drinks', price: 35, image: 'https://images.unsplash.com/photo-1513558161293-cdacff720fc8?auto=format&fit=crop&w=900&q=85', tag: 'Refreshing', vegetarian: true },
]
const categories = ['All items', 'Breakfast', 'Meals', 'Snacks', 'Drinks', 'Desserts']
const money = n => `₹${Number(n).toFixed(0)}`

function App() {
  const [menu, setMenu] = useState(fallbackMenu)
  const [active, setActive] = useState('All items')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [pickupTime, setPickupTime] = useState('12:45 PM')
  const [placing, setPlacing] = useState(false)
  const [notice, setNotice] = useState('')
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fetch(`${API}/menu`).then(r => { if (!r.ok) throw new Error('API unavailable'); return r.json() })
      .then(setMenu).catch(() => {}) // Demo menu stays available if backend is not running.
  }, [])

  const shown = useMemo(() => menu.filter(item =>
    (active === 'All items' || item.category === active) &&
    `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(search.toLowerCase())
  ), [menu, active, search])
  const cartItems = menu.filter(item => cart[item.id] > 0)
  const count = cartItems.reduce((sum, item) => sum + cart[item.id], 0)
  const total = cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0)

  function changeQty(id, amount) {
    setCart(old => {
      const next = { ...old, [id]: Math.max(0, (old[id] || 0) + amount) }
      if (!next[id]) delete next[id]
      return next
    })
    setNotice('')
  }

  async function submitOrder(e) {
    e.preventDefault()
    if (!studentName.trim() || !count) return
    setPlacing(true)
    const payload = { studentName, pickupTime, items: cartItems.map(item => ({ menuItemId: item.id, quantity: cart[item.id] })) }
    try {
      const response = await fetch(`${API}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || 'Could not place your order. Please try again.')
      }
      setOrder(await response.json())
    } catch (err) {
      setNotice(err.message.includes('Failed to fetch') ? 'Start the Spring Boot backend to place a real demo order.' : err.message)
    } finally {
      setPlacing(false)
    }
  }

  function closeSuccess() {
    setOrder(null); setCart({}); setCartOpen(false); setStudentName(''); setNotice('')
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Campus Bites home">
          <span className="brand-mark"><ChefHat size={22} strokeWidth={2.2}/></span>
          <span>campus<span className="brand-accent">bites</span><small>YOUR CAMPUS. YOUR CRAVINGS.</small></span>
        </a>
        <nav className="top-links"><a href="#menu">Menu</a><a href="#how-it-works">How it works</a></nav>
        <button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>Your order</span><b>{count}</b></button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span> THE CAMPUS CANTEEN, REIMAGINED</div>
            <h1>Good food.<br/><em>Zero queue.</em></h1>
            <p>Your favourite canteen bites, ready when you are. Pick your plate, place your order, and make the most of your break.</p>
            <a className="primary-link" href="#menu">Explore the menu <ArrowRight size={17}/></a>
            <div className="hero-trust">
              <div className="trust-avatars"><span>🍜</span><span>🥪</span><span>☕</span></div>
              <div><strong>Made for your break</strong><small>Fresh picks · Student-friendly prices</small></div>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=90" alt="Colourful fresh meal bowl"/></div>
            <div className="floating-note note-top"><span className="note-icon"><Clock3 size={17}/></span><span><strong>Break-time sorted</strong><small>Order in a few clicks</small></span></div>
            <div className="floating-note note-bottom"><span className="note-icon green"><Leaf size={17}/></span><span><strong>Something for everyone</strong><small>Veg & non-veg favourites</small></span></div>
            <div className="hero-sun"></div>
          </div>
          <div className="hero-index"><span>01</span><i></i><span>GOOD FOOD, GOOD MOOD</span></div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-dot"></span> WHAT'S COOKING</div><h2>The canteen <em>edit.</em></h2><p>Little joys, served fresh. What's calling your name?</p></div>
            <div className="menu-count"><Sparkles size={16}/><span><b>{menu.length} picks</b><small>on today's menu</small></span></div>
          </div>

          <div className="menu-toolbar">
            <div className="category-list">{categories.map(cat => <button key={cat} className={`category-chip ${active === cat ? 'selected' : ''}`} onClick={() => setActive(cat)}>{cat}</button>)}</div>
            <label className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find your craving..." aria-label="Search menu"/></label>
          </div>

          <div className="food-grid">
            {shown.map((item, index) => (
              <article className="food-card" key={item.id} style={{'--delay': `${index * 45}ms`}}>
                <div className="food-photo">
                  <img src={item.image} alt={item.name} loading="lazy" onError={e => { e.currentTarget.style.opacity = '.2' }}/>
                  {item.tag && <span className="food-tag">{item.tag}</span>}
                  <span className={`veg-indicator ${item.vegetarian ? '' : 'nonveg'}`} title={item.vegetarian ? 'Vegetarian' : 'Non-vegetarian'}><i/></span>
                  <button className={`quick-add ${cart[item.id] ? 'has-item' : ''}`} onClick={() => changeQty(item.id, 1)} aria-label={`Add ${item.name}`}><Plus size={19}/></button>
                </div>
                <div className="food-info">
                  <div className="food-meta"><span>{item.category}</span><span className="dot-sep">·</span><span>{item.vegetarian ? 'Veg' : 'Non-veg'}</span></div>
                  <h3>{item.name}</h3><p>{item.description}</p>
                  <div className="food-bottom"><strong>{money(item.price)}</strong>
                    {cart[item.id] ? <div className="qty-control"><button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={13}/></button><b>{cart[item.id]}</b><button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity"><Plus size={13}/></button></div> : <button className="add-label" onClick={() => changeQty(item.id, 1)}>Add to order <Plus size={14}/></button>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {shown.length === 0 && <div className="empty-state"><span>🥣</span><h3>No bites found</h3><p>Try another search or category.</p><button className="text-button" onClick={() => {setSearch(''); setActive('All items')}}>Show everything</button></div>}
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-title"><div className="eyebrow"><span className="eyebrow-dot"></span> EASY AS ONE, TWO, EAT</div><h2>Your break,<br/><em>your way.</em></h2></div>
          <div className="how-steps">
            <div className="how-step"><span className="step-number">01</span><div className="step-icon"><Search size={21}/></div><h3>Find your favourite</h3><p>Browse the canteen menu and discover your next go-to.</p></div>
            <div className="how-step"><span className="step-number">02</span><div className="step-icon"><ShoppingBag size={21}/></div><h3>Build your order</h3><p>Add your picks, adjust quantities, and check your total.</p></div>
            <div className="how-step"><span className="step-number">03</span><div className="step-icon"><Coffee size={21}/></div><h3>Pick up & enjoy</h3><p>Send your order to the canteen and collect at your chosen time.</p></div>
          </div>
        </section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><ChefHat size={19}/></span><span>campus<span className="brand-accent">bites</span></span></a><span>Made for campus life, one bite at a time.</span><span className="footer-right">A STUDENT MINI PROJECT <span>✳</span></span></footer>

      {cartOpen && <div className="overlay" onMouseDown={e => {if(e.target === e.currentTarget) setCartOpen(false)}}><aside className="cart-drawer">
        <div className="drawer-head"><div><div className="eyebrow"><span className="eyebrow-dot"></span> YOUR PICKS</div><h2>Your order <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={21}/></button></div>
        {order ? <div className="success-panel"><div className="success-icon"><Check size={29}/></div><div className="eyebrow">ORDER CONFIRMED</div><h2>You're all set!</h2><p>Your order has been sent to the canteen.</p><div className="order-number">{order.orderNumber}</div><div className="success-detail"><span>Pickup time</span><strong>{order.pickupTime}</strong></div><div className="success-detail"><span>Total paid at pickup</span><strong>{money(order.total)}</strong></div><button className="checkout-button" onClick={closeSuccess}>Back to menu <ArrowRight size={17}/></button></div>
        : <>
          <div className="cart-content">
            {cartItems.length === 0 ? <div className="cart-empty"><span>🛍️</span><h3>Your bag is taking a break</h3><p>Add something delicious from the menu.</p><button className="checkout-button" onClick={() => setCartOpen(false)}>Explore menu <ArrowRight size={17}/></button></div> : cartItems.map(item => <div className="cart-line" key={item.id}><img src={item.image} alt=""/><div className="cart-line-info"><h3>{item.name}</h3><strong>{money(item.price * cart[item.id])}</strong><div className="qty-control"><button onClick={() => changeQty(item.id, -1)}><Minus size={13}/></button><b>{cart[item.id]}</b><button onClick={() => changeQty(item.id, 1)}><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => setCart(old => {const next={...old}; delete next[item.id]; return next})} aria-label={`Remove ${item.name}`}><X size={16}/></button></div>)}
          </div>
          {cartItems.length > 0 && <form className="checkout-form" onSubmit={submitOrder}>
            <label>Your name<input required value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Name for the order"/></label>
            <label>Preferred pickup time<select value={pickupTime} onChange={e => setPickupTime(e.target.value)}><option>As soon as possible</option><option>12:15 PM</option><option>12:30 PM</option><option>12:45 PM</option><option>1:00 PM</option><option>1:15 PM</option><option>4:00 PM</option></select></label>
            <div className="bill-row"><span>Subtotal</span><strong>{money(total)}</strong></div><div className="bill-row muted"><span>Campus Bites fee</span><span>Free</span></div><div className="bill-row bill-total"><span>Total</span><strong>{money(total)}</strong></div>
            {notice && <p className="form-notice">{notice}</p>}
            <button className="checkout-button" type="submit" disabled={placing}>{placing ? 'Sending order...' : 'Place my order'} <ArrowRight size={17}/></button><p className="checkout-note">No online payment needed · Pay at the canteen</p>
          </form>}
        </>}
      </aside></div>}
      <button className={`mobile-cart ${count ? 'visible' : ''}`} onClick={() => setCartOpen(true)}><ShoppingBag size={18}/> View order · {count} items <strong>{money(total)}</strong></button>
    </div>
  )
}

export default App
