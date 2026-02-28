import { useState } from 'react';
import { Card, Button, Input, Modal, Drawer, Badge } from 'antd';
import { Heart, ShoppingBag, Plus, Upload, Trash2, CheckCircle2 } from 'lucide-react';

export default function BabyLibraryTab() {
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    const initialProducts = [
        { id: 1, name: "Uppababy Vista V2 Stroller", price: 650, condition: "Like New", category: "Gear", image: "https://images.unsplash.com/photo-1596489839955-f213945bd1b9?auto=format&fit=crop&q=80&w=400" },
        { id: 2, name: "Snuggle Me Organic Lounger", price: 85, condition: "Excellent", category: "Gear", image: "https://images.unsplash.com/photo-1522771930-78848d92871d?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "Kyte Baby Onesie Bundle (0-3m)", price: 40, condition: "Good", category: "Clothing", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400" },
        { id: 4, name: "Lovevery Play Gym", price: 95, condition: "Like New", category: "Toys", image: "https://images.unsplash.com/photo-1581553680321-4fffae59f724?auto=format&fit=crop&q=80&w=400" },
        { id: 5, name: "BabyBjorn Bouncer", price: 120, condition: "Excellent", category: "Gear", image: "https://images.unsplash.com/photo-1544483769-d41edc8ff0e3?auto=format&fit=crop&q=80&w=400" },
        { id: 6, name: "Hatch Rest Sound Machine", price: 45, condition: "Like New", category: "Nursery", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400" },
    ];

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(f => f !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

    const handleCheckoutSubmit = () => {
        setIsCheckoutOpen(false);
        setIsSuccessOpen(true);
        setCart([]);
    };

    const FilterPill = ({ label }) => (
        <button
            onClick={() => setActiveCategory(label)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${activeCategory === label
                    ? 'bg-sage text-white shadow-sm'
                    : 'bg-white text-slate-500 hover:bg-cream border border-slate-200'
                }`}
        >
            {label}
        </button>
    );

    const displayedProducts = activeCategory === 'All'
        ? initialProducts
        : initialProducts.filter(p => p.category === activeCategory);

    return (
        <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-fade-in">
            {/* Header Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-[32px] shadow-portal-card gap-6">
                <div>
                    <h2 className="text-3xl font-bold font-serif text-slate-800">Baby Library</h2>
                    <p className="text-muted font-medium">Sustainable marketplace for Mamas</p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                    <FilterPill label="All" />
                    <FilterPill label="Gear" />
                    <FilterPill label="Clothing" />
                    <FilterPill label="Nursery" />
                    <FilterPill label="Toys" />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Button
                        className="flex-1 md:flex-none rounded-full border-sage text-sage hover:!text-sage-btn hover:!border-sage-btn font-bold h-12 px-6 flex items-center justify-center gap-2"
                        onClick={() => setIsSellModalOpen(true)}
                    >
                        <Plus className="w-5 h-5" />
                        Sell Item
                    </Button>
                    <div
                        className="bg-cream border border-sage/20 p-3 rounded-full cursor-pointer hover:bg-sage/10 transition-colors relative"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <Badge count={cart.length} color="#A3B18A" className="absolute -top-1 -right-1" />
                        <ShoppingBag className="w-6 h-6 text-slate-700" />
                    </div>
                </div>
            </div>

            {/* Product Grid (Masonry Style handled by columns) */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {displayedProducts.map(product => (
                    <Card
                        key={product.id}
                        className="break-inside-avoid rounded-[32px] overflow-hidden border-none shadow-portal-card hover:shadow-soft-hover transition-all group"
                        styles={{ body: { padding: '24px' } }}
                        cover={
                            <div className="relative overflow-hidden bg-slate-50 min-h-[220px]">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full hover:bg-white transition-colors"
                                >
                                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-sage text-sage' : 'text-slate-400'}`} />
                                </button>
                            </div>
                        }
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold font-serif text-lg text-slate-800 leading-tight pr-2">{product.name}</h3>
                            <span className="font-bold text-xl text-sage">${product.price}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="bg-cream text-sage text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide border border-sage/20">{product.condition}</span>
                            <span className="text-muted text-sm">{product.category}</span>
                        </div>
                        <Button
                            type="primary"
                            className="w-full bg-sage hover:!bg-sage-btn !text-white !border-none rounded-full h-12 font-bold shadow-soft"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </Button>
                    </Card>
                ))}
            </div>

            {/* Cart Drawer */}
            <Drawer
                title={<span className="text-2xl font-bold font-serif text-slate-800">Your Cart</span>}
                placement="right"
                onClose={() => setIsCartOpen(false)}
                open={isCartOpen}
                width={400}
                closeIcon={<Trash2 className="hidden" />}
                className="custom-drawer"
            >
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {cart.length === 0 ? (
                            <div className="text-center text-muted mt-20">Your cart is empty, Mama!</div>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="flex gap-4 bg-cream p-4 rounded-[24px] relative border border-slate-100">
                                    <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt={item.name} />
                                    <div>
                                        <h4 className="font-bold text-slate-800 leading-tight mb-1 pr-6">{item.name}</h4>
                                        <p className="text-sage font-bold">${item.price}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(index)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-400 transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                        <div className="flex justify-between mb-6 text-xl font-bold font-serif text-slate-800">
                            <span>Total:</span>
                            <span>${cartTotal}</span>
                        </div>
                        <Button
                            type="primary"
                            className="w-full bg-sage hover:!bg-sage-btn !border-none rounded-full h-14 text-lg font-bold shadow-soft disabled:opacity-50"
                            disabled={cart.length === 0}
                            onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                        >
                            Finalize Purchase
                        </Button>
                    </div>
                </div>
            </Drawer>

            {/* Checkout Modal */}
            <Modal open={isCheckoutOpen} onCancel={() => setIsCheckoutOpen(false)} footer={null} centered width={500}>
                <div className="text-center mb-6 pt-4">
                    <h2 className="text-2xl font-bold font-serif text-slate-800">Final Checkout</h2>
                    <p className="text-muted">Review your details to finalize the order.</p>
                </div>
                <div className="space-y-4 mb-8 bg-cream p-6 rounded-[24px] border border-slate-200/50">
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">Subtotal</span><span className="font-bold">${cartTotal}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">Mama's Shipping</span><span className="font-bold text-sage">Free</span></div>
                    <div className="border-t border-slate-200 pt-4 flex justify-between text-xl"><span className="font-bold text-slate-800">Total</span><span className="font-bold">${cartTotal}</span></div>
                </div>
                <Button type="primary" className="w-full bg-sage hover:!bg-sage-btn !border-none rounded-full h-14 text-lg font-bold text-white shadow-soft" onClick={handleCheckoutSubmit}>
                    Confirm & Pay ${cartTotal}
                </Button>
            </Modal>

            {/* Success Modal */}
            <Modal open={isSuccessOpen} onCancel={() => setIsSuccessOpen(false)} footer={null} centered>
                <div className="text-center py-8">
                    <CheckCircle2 className="w-20 h-20 text-sage mx-auto mb-4" />
                    <h2 className="text-3xl font-bold font-serif text-slate-800 mb-2">Order Confirmed!</h2>
                    <p className="text-muted text-lg">Your items are beautifully packaged and on the way.</p>
                    <Button className="mt-8 rounded-full h-12 px-8 font-bold border-sage text-sage hover:!text-sage hover:!border-sage-btn" onClick={() => setIsSuccessOpen(false)}>Back to Market</Button>
                </div>
            </Modal>

            {/* Sell Modal */}
            <Modal open={isSellModalOpen} onCancel={() => setIsSellModalOpen(false)} footer={null} centered title={<span className="text-2xl font-bold font-serif pt-2 block text-slate-800">List an Item</span>}>
                <div className="space-y-4 mt-6">
                    <div className="border-2 border-dashed border-slate-200 rounded-[24px] p-8 text-center hover:border-sage transition-colors cursor-pointer bg-cream">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <span className="text-slate-500 font-medium block">Upload photos</span>
                        <span className="text-slate-400 text-sm mt-1 block">Help other Mamas see what you loved!</span>
                    </div>
                    <Input placeholder="Item Name" size="large" className="rounded-2xl p-4 border-slate-200 hover:border-sage focus:border-sage" />
                    <div className="flex gap-4">
                        <Input placeholder="Category" size="large" className="rounded-2xl p-4 border-slate-200 hover:border-sage focus:border-sage" />
                        <Input placeholder="Condition" size="large" className="rounded-2xl p-4 border-slate-200 hover:border-sage focus:border-sage" />
                    </div>
                    <Input placeholder="Price ($)" type="number" size="large" className="rounded-2xl p-4 border-slate-200 hover:border-sage focus:border-sage" />
                    <Button type="primary" className="w-full bg-sage hover:!bg-sage-btn !border-none rounded-full h-14 text-lg font-bold text-white mt-4 shadow-soft" onClick={() => setIsSellModalOpen(false)}>
                        Publish Listing
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
