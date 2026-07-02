'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import { ShoppingCart, Plus, Minus, X, MessageCircle, ChevronLeft, Check, Search, Utensils, Pizza, Sandwich, Flame, Beef, Coffee, Star, Sparkles } from 'lucide-react'

interface MenuItem {
  id: string
  category: string
  name: string
  smallPrice: number
  largePrice?: number
  description?: string
  image?: string
}

const MENU_DATA: MenuItem[] = [
  { id: 'pizza-1', category: 'pizzas', name: 'Margarini', smallPrice: 250, largePrice: 800, description: 'Margherita authentique', image: '/products/pizza-margarini.png' },
  { id: 'pizza-2', category: 'pizzas', name: 'Versace', smallPrice: 300, largePrice: 1200, description: 'Viande hachée', image: '/products/pizza-versace.png' },
  { id: 'pizza-3', category: 'pizzas', name: 'Guccini', smallPrice: 350, largePrice: 1200, description: 'Poulet', image: '/products/pizza-guccini.png' },
  { id: 'pizza-4', category: 'pizzas', name: 'Armanzo', smallPrice: 350, largePrice: 1200, description: 'Thon', image: '/products/pizza-guccini.png' },
  { id: 'pizza-5', category: 'pizzas', name: 'Fumezio', smallPrice: 350, largePrice: 1300, description: 'Fumée', image: '/products/pizza-versace.png' },
  { id: 'pizza-6', category: 'pizzas', name: 'Dolce Mergana', smallPrice: 400, largePrice: 1300, description: 'Merguez', image: '/products/pizza-versace.png' },
  { id: 'pizza-7', category: 'pizzas', name: 'Louis Vittoni', smallPrice: 400, largePrice: 1300, description: 'Viande hachée + Poulet', image: '/products/pizza-versace.png' },
  { id: 'pizza-8', category: 'pizzas', name: 'Pradella', smallPrice: 550, largePrice: 1500, description: 'Saucisses', image: '/products/pizza-guccini.png' },
  { id: 'pizza-9', category: 'pizzas', name: 'Chanelli', smallPrice: 550, largePrice: 1500, description: 'Fromage saucisses', image: '/products/pizza-guccini.png' },
  { id: 'pizza-10', category: 'pizzas', name: 'Hermencio', smallPrice: 550, largePrice: 1500, description: 'Viande/Poulet/Thon', image: '/products/pizza-guccini.png' },
  { id: 'pizza-11', category: 'pizzas', name: 'Diorino', smallPrice: 800, largePrice: 2000, description: 'Spécialité du Chef', image: '/products/pizza-diorino.png' },
  { id: 'sandwich-1', category: 'sandwiches', name: 'Guccini', smallPrice: 300, description: 'Poulet', image: '/products/sandwich-guccini.png' },
  { id: 'sandwich-2', category: 'sandwiches', name: 'Fendino', smallPrice: 300, description: 'Kébda', image: '/products/sandwich-guccini.png' },
  { id: 'sandwich-3', category: 'sandwiches', name: 'Dolce Mergana', smallPrice: 350, description: 'Merguez', image: '/products/sandwich-guccini.png' },
  { id: 'sandwich-4', category: 'sandwiches', name: 'Versace', smallPrice: 350, description: 'Viande hachée', image: '/products/sandwich-guccini.png' },
  { id: 'tacos-1', category: 'tacos', name: 'Tacos Poulet', smallPrice: 400, largePrice: 650, description: '', image: '/products/tacos-premium.png' },
  { id: 'tacos-2', category: 'tacos', name: 'Tacos Viande Hachée', smallPrice: 550, largePrice: 700, description: '', image: '/products/tacos-premium.png' },
  { id: 'tacos-3', category: 'tacos', name: 'Tacos Kébda', smallPrice: 450, largePrice: 700, description: '', image: '/products/tacos-premium.png' },
  { id: 'tacos-4', category: 'tacos', name: 'Tacos Gratine', smallPrice: 500, largePrice: 800, description: '', image: '/products/tacos-premium.png' },
  { id: 'plate-1', category: 'plates', name: 'Plat Poulet', smallPrice: 500, description: '', image: '/products/plat-premium.png' },
  { id: 'plate-2', category: 'plates', name: 'Plat Kébab', smallPrice: 500, description: '', image: '/products/plat-premium.png' },
  { id: 'plate-3', category: 'plates', name: 'Plat Viande Hachée', smallPrice: 600, description: '', image: '/products/plat-premium.png' },
  { id: 'plate-4', category: 'plates', name: 'Plat Crispy', smallPrice: 600, description: '', image: '/products/plat-premium.png' },
  { id: 'special', category: 'special', name: 'Mega Poulet', smallPrice: 1000, description: 'Offre Limitée', image: '/products/pizza-margarini.png' },
  { id: 'frites-s', category: 'supplements', name: 'Frites', smallPrice: 100, description: 'Petit' },
  { id: 'frites-l', category: 'supplements', name: 'Frites', smallPrice: 150, description: 'Grand' },
  { id: 'drink-coca', category: 'supplements', name: 'Coca-Cola', smallPrice: 100, description: 'Petit' },
  { id: 'drink-fanta', category: 'supplements', name: 'Fanta', smallPrice: 100, description: 'Petit' },
  { id: 'fromage', category: 'supplements', name: 'Fromage', smallPrice: 200, description: '' },
]

const CATEGORIES = [
  { id: 'special', label: 'Offre Spéciale', background: '/backgrounds/pizzas-bg.png', icon: 'star' as const, color: 'from-red-500 to-orange-500' },
  { id: 'pizzas', label: 'Pizzas', background: '/backgrounds/pizzas-bg.png', icon: 'pizza' as const, color: 'from-amber-500 to-yellow-600' },
  { id: 'sandwiches', label: 'Sandwiches', background: '/backgrounds/sandwiches-bg.png', icon: 'sandwich' as const, color: 'from-emerald-500 to-green-600' },
  { id: 'tacos', label: 'Tacos', background: '/backgrounds/tacos-bg.png', icon: 'flame' as const, color: 'from-orange-500 to-red-600' },
  { id: 'plates', label: 'Plats', background: '/backgrounds/plates-bg.png', icon: 'beef' as const, color: 'from-violet-500 to-purple-600' },
  { id: 'supplements', label: 'Suppléments', background: '/backgrounds/supplements-bg.png', icon: 'coffee' as const, color: 'from-cyan-500 to-blue-600' },
]

function CategoryIcon({ icon, className = "w-6 h-6" }: { icon: string, className?: string }) {
  switch (icon) {
    case 'pizza': return <Pizza className={className} />
    case 'sandwich': return <Sandwich className={className} />
    case 'flame': return <Flame className={className} />
    case 'beef': return <Beef className={className} />
    case 'coffee': return <Coffee className={className} />
    case 'star': return <Star className={className} />
    default: return <Utensils className={className} />
  }
}

interface CartItem {
  item: MenuItem
  quantity: number
  size?: 'petit' | 'grand'
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', notes: '' })
  const [sizeModal, setSizeModal] = useState<{ item: MenuItem | null, show: boolean }>({ item: null, show: false })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [dishAddedId, setDishAddedId] = useState<string | null>(null)

  const menuByCategory = useMemo(() => {
    return MENU_DATA.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    }, {} as Record<string, MenuItem[]>)
  }, [])

  const totalPrice = cart.reduce((sum, { item, quantity, size }) => {
    const price = size === 'grand' ? (item.largePrice || item.smallPrice) : item.smallPrice
    return sum + price * quantity
  }, 0)

  const totalCartItems = cart.reduce((s, c) => s + c.quantity, 0)

  const filteredDishes = useMemo(() => {
    if (!activeCat) return []
    let items = menuByCategory[activeCat] || []
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        (i.description && i.description.toLowerCase().includes(q))
      )
    }
    return items
  }, [activeCat, searchQuery, menuByCategory])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (sizeModal.show) setSizeModal({ item: null, show: false })
        else if (showCheckout) setShowCheckout(false)
        else if (drawerOpen) setDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [drawerOpen, showCheckout, sizeModal.show])

  useEffect(() => {
    document.body.style.overflow = (drawerOpen || showCheckout || sizeModal.show) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen, showCheckout, sizeModal.show])

  const addToCart = useCallback((item: MenuItem, size?: 'petit' | 'grand') => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id && c.size === size)
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id && c.size === size ? { ...c, quantity: c.quantity + 1 } : c
        )
      }
      return [...prev, { item, quantity: 1, size }]
    })
    setSizeModal({ item: null, show: false })
    setDishAddedId(item.id)
    setTimeout(() => setDishAddedId(null), 1200)
  }, [])

  const updateQuantity = (itemId: string, size: 'petit' | 'grand' | undefined, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((c) => c.item.id !== itemId || c.size !== size))
    } else {
      setCart((prev) => prev.map((c) =>
        c.item.id === itemId && c.size === size ? { ...c, quantity } : c
      ))
    }
  }

  const handleAddClick = (item: MenuItem) => {
    if (item.largePrice) {
      setSizeModal({ item, show: true })
    } else {
      addToCart(item, 'petit')
    }
  }

  const openDrawerWithCategory = (catId: string) => {
    setActiveCat(catId)
    setSearchQuery('')
    setDrawerOpen(true)
  }

  /* ============================================================= */
  /* === واتساب — الرسالة تبني كنص عادي ثم تُرمّز مرة واحدة === */
  /* ============================================================= */
  const handleWhatsAppOrder = () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('الرجاء ملء جميع الحقول المطلوبة')
      return
    }

    /* بناء تفاصيل الطلب */
    const orderLines = cart.map((c) => {
      const price = c.size === 'grand' ? (c.item.largePrice || c.item.smallPrice) : c.item.smallPrice
      const sizeText = c.size ? ` (${c.size === 'grand' ? 'كبير' : 'صغير'})` : ''
      return `  • ${c.item.name}${sizeText} × ${c.quantity} = ${price * c.quantity} DA`
    }).join('\n')

    /* بناء الرسالة كنص عادي مع \n */
    let message = `*طلب جديد — LA MAISON Dj & Snouci*\n\n`
    message += `👤 *الاسم:* ${formData.name.trim()}\n`
    message += `📱 *الهاتف:* ${formData.phone.trim()}\n`
    message += `📍 *العنوان:* ${formData.address.trim()}\n\n`
    message += `*الطلب:*\n${orderLines}\n\n`
    message += `💰 *الإجمالي: ${totalPrice} DA*`

    if (formData.notes.trim()) {
      message += `\n\n📝 *ملاحظات:* ${formData.notes.trim()}`
    }

    message += `\n\nشكراً لاختيارك LA MAISON!`

    /* ترميز الرسالة كلها دفعة واحدة — هذا هو السر */
    window.open(`https://wa.me/213777277126?text=${encodeURIComponent(message)}`, '_blank')
    setCart([])
    setFormData({ name: '', phone: '', address: '', notes: '' })
    setShowCheckout(false)
  }

  /* ============================================================= */
  /* === SMS — نفس الطريقة الاحترافية === */
  /* ============================================================= */
    const handleSmsOrder = () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('الرجاء ملء جميع الحقول المطلوبة')
      return
    }

    /* تفاصيل الطلب — بدون رموز غريبة تتعطل على بعض الهواتف */
    const orderLines = cart.map((c) => {
      const price = c.size === 'grand' ? (c.item.largePrice || c.item.smallPrice) : c.item.smallPrice
      const sizeText = c.size ? `(${c.size === 'grand' ? 'كبير' : 'صغير'})` : ''
      return `- ${c.item.name} ${sizeText} x${c.quantity} = ${price * c.quantity}DA`
    }).join('\n')

    /* بناء الرسالة — نص بسيط بدون رموز خاصة */
    let message = `طلب جديد - LA MAISON Djialt & Snouci\n`
    message += `الاسم: ${formData.name.trim()}\n`
    message += `الهاتف: ${formData.phone.trim()}\n`
    message += `العنوان: ${formData.address.trim()}\n\n`
    message += `الطلب:\n${orderLines}\n\n`
    message += `المجموع: ${totalPrice}DA`

    if (formData.notes.trim()) {
      message += `\nملاحظات: ${formData.notes.trim()}`
    }

    /* إنشاء رابط مخفي والنقر عليه — الطريقة الأضمن عبر كل المتصفحات */
    const link = document.createElement('a')
    link.href = `sms:+213777277126?body=${encodeURIComponent(message)}`
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setCart([])
    setFormData({ name: '', phone: '', address: '', notes: '' })
    setShowCheckout(false)
  }
  const activeCatData = CATEGORIES.find(c => c.id === activeCat)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="min-h-screen">

        {/* === الصفحة الرئيسية === */}
        <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden px-5">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-accent/3 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3 font-medium">
                Bienvenue chez
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-[1.15] mb-2">
                <span className="text-foreground">LA MAISON</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-accent leading-tight mb-1.5">
                djalil &amp; Snouci
              </h2>
              <div className="flex items-center justify-center gap-3 my-4">
                <span className="block w-8 h-px bg-accent/40" />
                <span className="block w-1.5 h-1.5 rounded-full bg-accent/60" />
                <span className="block w-8 h-px bg-accent/40" />
              </div>
              <p className="text-[13px] sm:text-sm tracking-[0.5em] uppercase text-muted-foreground font-light">
                Pizzeria
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed px-2">
              أطيب البيتزا والساندويتشات والتاكوس محضّرة بحب وإتقان
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => { setActiveCat(null); setSearchQuery(''); setDrawerOpen(true) }}
                className="group relative overflow-hidden bg-accent text-black px-8 py-3.5 rounded-2xl font-bold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <Utensils className="w-5 h-5" />
                  تصفح القائمة
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <a
                href="https://wa.me/213777277126"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-card border border-border px-8 py-3.5 rounded-2xl font-bold text-base hover:border-accent hover:text-accent transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5" />
                تواصل معنا
              </a>
            </div>

            <div className="flex justify-center gap-8 sm:gap-12 mt-12">
              {[
                { num: '11+', label: 'بيتزا' },
                { num: '4+', label: 'تاكوس' },
                { num: '30+', label: 'طبق' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl sm:text-2xl font-playfair font-bold text-accent">{s.num}</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === بطاقات الفئات السريعة === */}
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-center mb-3">اكتشف قائمتنا</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">اختر فئة لاستكشاف الأطباق</p>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {CATEGORIES.map((cat) => {
                const count = (menuByCategory[cat.id] || []).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => openDrawerWithCategory(cat.id)}
                    className="group relative bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center hover:border-accent transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className={`w-9 h-9 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg`}>
                        <CategoryIcon icon={cat.icon} className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="font-bold text-[11px] sm:text-sm mb-0.5 leading-tight">{cat.label}</h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{count} طبق</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* === عرض خاص === */}
        <section className="py-10 sm:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-l from-accent/20 via-card to-card border border-accent/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 overflow-hidden">
              <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="flex-1 text-center sm:text-right">
                  <div className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-[11px] font-bold mb-3">
                    <Sparkles className="w-3 h-3" />
                    عرض محدود
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-playfair font-bold mb-2">
                    Mega Poulet <span className="text-accent">1000 DA</span>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5">لا تفوّت هذا العرض الاستثنائي!</p>
                  <button
                    onClick={() => openDrawerWithCategory('special')}
                    className="bg-accent text-black px-7 py-2.5 rounded-xl font-bold text-sm hover:bg-accent/90 transition-all transform hover:scale-105 active:scale-95"
                  >
                    اطلب الآن
                  </button>
                </div>
                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-[3px] border-accent/30 shadow-2xl flex-shrink-0">
                  <Image src="/products/pizza-margarini.png" alt="Mega Poulet" width={192} height={192} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* === النافذة المنبثقة === */}
      <>
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setDrawerOpen(false)}
        />

        <div
          className={`fixed top-0 right-0 h-full w-full sm:max-w-[560px] bg-card border-l border-border z-50 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex-shrink-0 border-b border-border px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-2xl font-playfair font-bold flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/15 flex items-center justify-center">
                  <Utensils className="w-4 h-4 sm:w-5 sm-h-5 text-accent" />
                </div>
                القائمة
              </h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-red-400 hover:border-red-400/30 transition-all duration-300 hover:rotate-90"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن طبق..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
                dir="rtl"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">

            {!activeCat ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {CATEGORIES.map((cat) => {
                  const count = (menuByCategory[cat.id] || []).length
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCat(cat.id); setSearchQuery('') }}
                      className="group relative bg-background border border-border rounded-xl sm:rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl text-right"
                    >
                      {cat.background && (
                        <div className="relative h-16 sm:h-24 overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
                            style={{ backgroundImage: `url('${cat.background}')` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                          <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-black/50 backdrop-blur-sm text-[10px] sm:text-xs text-white/80 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg font-medium">
                            {count} طبق
                          </span>
                        </div>
                      )}
                      <div className="p-3 sm:p-4 pt-1.5 sm:pt-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-white flex-shrink-0`}>
                            <CategoryIcon icon={cat.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <h3 className="font-bold text-xs sm:text-sm truncate">{cat.label}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-accent font-medium mr-9 sm:mr-10">
                          <ChevronLeft className="w-3 h-3" />
                          تصفح
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => { setActiveCat(null); setSearchQuery('') }}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-accent mb-4 transition-colors group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  الرجوع للفئات
                </button>

                <div className="flex items-center gap-2.5 mb-5">
                  {activeCatData && (
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${activeCatData.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      <CategoryIcon icon={activeCatData.icon} className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base sm:text-xl font-playfair font-bold leading-tight">
                      {activeCatData?.label}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-muted-foreground">
                      {filteredDishes.length} طبق
                    </p>
                  </div>
                </div>

                {filteredDishes.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">لا توجد أطباق مطابقة</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDishes.map((item) => {
                      const isAdded = dishAddedId === item.id
                      return (
                        <div
                          key={item.id}
                          className="bg-background border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:shadow-lg group"
                        >
                          {item.image ? (
                            <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-muted">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2">
                                <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm sm:text-base font-bold">
                                  {item.smallPrice} DA
                                </span>
                                {item.largePrice && (
                                  <span className="bg-accent/90 backdrop-blur-md text-primary px-3 py-1.5 rounded-lg text-sm sm:text-base font-bold">
                                    {item.largePrice} DA
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-32 sm:h-40 bg-muted/50 flex items-center justify-center">
                              <Utensils className="w-8 h-8 text-muted-foreground/20" />
                            </div>
                          )}

                          <div className="p-4 sm:p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-base sm:text-lg leading-tight mb-1">
                                  {item.name}
                                </h4>
                                {item.description && (
                                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                              <div className="flex items-center gap-2">
                                {item.largePrice ? (
                                  <>
                                    <span className="text-[11px] sm:text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                                      صغير: <span className="text-accent font-semibold">{item.smallPrice}</span>
                                    </span>
                                    <span className="text-[11px] sm:text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                                      كبير: <span className="text-accent font-semibold">{item.largePrice}</span>
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-[11px] sm:text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                                    سعر واحد: <span className="text-accent font-semibold">{item.smallPrice} DA</span>
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => handleAddClick(item)}
                                className={`flex-shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 transform active:scale-90 ${
                                  isAdded
                                    ? 'bg-green-500 text-black scale-105 shadow-lg shadow-green-500/30'
                                    : 'bg-accent text-black hover:scale-105 hover:shadow-lg hover:shadow-accent/20'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-4 h-4" />
                                    <span className="hidden sm:inline">تمت</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-4 h-4" />
                                    <span className="hidden sm:inline">أضف</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="flex-shrink-0 border-t border-border px-4 sm:px-5 py-4 sm:py-5 bg-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {totalCartItems} عنصر
                </span>
                <span className="text-lg sm:text-xl font-bold text-accent">{totalPrice} DA</span>
              </div>
              <button
                onClick={() => { setDrawerOpen(false); setShowCheckout(true) }}
                className="w-full bg-accent text-black px-3 py-3.5 rounded-xl font-bold text-sm sm:text-base hover:bg-accent/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
              >
                <ShoppingCart className="w-5 h-5" />
                إتمام الطلب
              </button>
            </div>
          )}
        </div>
      </>

      {/* === نافذة اختيار الحجم === */}
      {sizeModal.show && sizeModal.item && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-card rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full sm:max-w-md border-t sm:border border-border shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-playfair font-bold mb-5 text-center">اختر الحجم</h2>
            <div className="space-y-3 mb-5">
              <button
                onClick={() => addToCart(sizeModal.item!, 'petit')}
                className="w-full p-4 sm:p-5 bg-accent/10 border-2 border-accent/30 rounded-2xl hover:bg-accent/20 hover:border-accent transition-all transform hover:scale-[1.02] active:scale-[0.98] font-bold"
              >
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-sm sm:text-base mb-0.5">صغير</div>
                    <div className="text-xl sm:text-2xl text-accent">{sizeModal.item!.smallPrice} DA</div>
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
              </button>
              <button
                onClick={() => addToCart(sizeModal.item!, 'grand')}
                className="w-full p-4 sm:p-5 bg-accent/10 border-2 border-accent/30 rounded-2xl hover:bg-accent/20 hover:border-accent transition-all transform hover:scale-[1.02] active:scale-[0.98] font-bold"
              >
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-sm sm:text-base mb-0.5">كبير</div>
                    <div className="text-xl sm:text-2xl text-accent">{sizeModal.item!.largePrice} DA</div>
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
              </button>
            </div>
            <button
              onClick={() => setSizeModal({ item: null, show: false })}
              className="w-full bg-muted text-foreground py-3 rounded-xl font-bold hover:bg-muted/80 transition-colors text-sm"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* === زر السلة العائم === */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCheckout(true)}
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 bg-accent text-black px-6 py-3.5 sm:px-7 sm:py-4 rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(212,168,67,0.3)] transition-all transform hover:scale-105 active:scale-95 z-30 font-bold text-base sm:text-lg flex items-center gap-2.5"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">اطلب الآن</span>
          <span className="sm:hidden">اطلب</span>
          <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
            {totalCartItems}
          </span>
        </button>
      )}

      {/* === زر واتساب العائم === */}
      <a
        href="https://wa.me/213777277126"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 bg-green-500 hover:bg-green-600 text-black w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 z-30 flex items-center justify-center"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      {/* === نافذة إتمام الطلب === */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-card rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border-t sm:border border-border shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl sm:text-3xl font-playfair font-bold">طلبك</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-red-400 transition-all"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="mb-5 border-b border-border pb-5 space-y-2.5">
              {cart.map(({ item, quantity, size }) => {
                const price = size === 'grand' ? (item.largePrice || item.smallPrice) : item.smallPrice
                return (
                  <div key={`${item.id}-${size}`} className="flex justify-between items-center p-3 sm:p-4 bg-muted/50 rounded-xl gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base truncate">{item.name}</p>
                      <p className="text-[11px] sm:text-sm text-muted-foreground">
                        {size === 'grand' ? 'كبير' : 'صغير'} — {price} DA
                      </p>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                      <span className="font-bold text-accent text-sm sm:text-base whitespace-nowrap">{price * quantity} DA</span>
                      <div className="flex gap-0.5 sm:gap-1 bg-muted rounded-lg p-0.5 sm:p-1">
                        <button
                          onClick={() => updateQuantity(item.id, size, quantity - 1)}
                          className="p-1 sm:p-1.5 hover:bg-accent/20 rounded-md transition-colors"
                        >
                          <Minus size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-6 sm:w-7 text-center font-semibold text-xs sm:text-sm">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, size, quantity + 1)}
                          className="p-1 sm:p-1.5 hover:bg-accent/20 rounded-md transition-colors"
                        >
                          <Plus size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mb-5 p-4 sm:p-5 bg-accent/10 border border-accent/20 rounded-2xl text-right">
              <p className="text-2xl sm:text-3xl font-bold text-accent">الإجمالي: {totalPrice} DA</p>
            </div>

            <div className="space-y-3 mb-5">
              <input
                type="text"
                placeholder="اسمك الكامل"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-accent text-right text-sm transition-colors"
                dir="rtl"
              />
              <input
                type="tel"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-accent text-right text-sm transition-colors"
                dir="rtl"
              />
              <textarea
                placeholder="العنوان بالتفصيل"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-accent text-right text-sm transition-colors"
                rows={2}
                dir="rtl"
              />
              <div className="bg-accent/5 border border-accent/15 rounded-xl p-3 sm:p-4">
                <label className="block text-accent font-bold mb-1.5 text-right text-xs sm:text-sm">ملاحظات خاصة (اختيارية)</label>
                <textarea
                  placeholder="مثلاً: بدون بصل، صلصة إضافية..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-accent text-right text-xs sm:text-sm transition-colors"
                  rows={3}
                  dir="rtl"
                  maxLength={500}
                />
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 text-left">{formData.notes.length}/500</div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2.5">
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 bg-green-500 text-black py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base hover:bg-green-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  WhatsApp
                </button>
               
              </div>
              <button
                onClick={() => setShowCheckout(false)}
                className="w-full bg-muted text-foreground py-2.5 sm:py-3 rounded-xl font-bold text-sm hover:bg-muted/80 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}