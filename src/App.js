import React, { useState, useEffect, useMemo } from 'react';

// --- Data: The list of 100 restaurants with coordinates and cuisine types ---
const initialRestaurantData = [
    { name: "The Roosevelt", lat: 37.5375, lng: -77.4206, cuisine: "American (New)" },
    { name: "Celladora", lat: 37.5422, lng: -77.4391, cuisine: "Wine Bar" },
    { name: "Grisette", lat: 37.5369, lng: -77.4187, cuisine: "French" },
    { name: "Restaurant Adarra", lat: 37.5495, lng: -77.4370, cuisine: "Spanish" },
    { name: "Lost Letter", lat: 37.5583, lng: -77.4727, cuisine: "Italian" },
    { name: "Metzger Bar & Butchery", lat: 37.5385, lng: -77.4172, cuisine: "German" },
    { name: "Lehja", lat: 37.6493, lng: -77.6212, cuisine: "Indian" },
    { name: "Edo's Squid", lat: 37.5492, lng: -77.4528, cuisine: "Italian" },
    { name: "Penny's Wine Shop", lat: 37.5491, lng: -77.4371, cuisine: "Wine Bar" },
    { name: "Blue Atlas", lat: 37.5139, lng: -77.3872, cuisine: "Global" },
    { name: "L'Opossum", lat: 37.5303, lng: -77.4501, cuisine: "French" },
    { name: "Alewife", lat: 37.5372, lng: -77.4186, cuisine: "Seafood" },
    { name: "Stella's", lat: 37.5587, lng: -77.4566, cuisine: "Greek" },
    { name: "ZZQ", lat: 37.5670, lng: -77.4754, cuisine: "BBQ" },
    { name: "Full Kee", lat: 37.6033, lng: -77.5147, cuisine: "Chinese" },
    { name: "1870", lat: 37.5029, lng: -77.6433, cuisine: "Steakhouse" },
    { name: "8½", lat: 37.5459, lng: -77.4646, cuisine: "Pizza" },
    { name: "Abuelita's", lat: 37.4913, lng: -77.5255, cuisine: "Mexican" },
    { name: "Acacia Midtown", lat: 37.5759, lng: -77.5173, cuisine: "American (New)" },
    { name: "Amuse", lat: 37.5539, lng: -77.4739, cuisine: "American (New)" },
    { name: "Anokha", lat: 37.6534, lng: -77.5843, cuisine: "Indian" },
    { name: "Bacchus", lat: 37.5488, lng: -77.4508, cuisine: "Italian" },
    { name: "Bamboo Cafe", lat: 37.5463, lng: -77.4627, cuisine: "American (Dive)" },
    { name: "Bar Solita", lat: 37.5475, lng: -77.4439, cuisine: "Mediterranean" },
    { name: "Beaucoup", lat: 37.5472, lng: -77.4498, cuisine: "French" },
    { name: "Birdie's", lat: 37.5471, lng: -77.4497, cuisine: "American (New)" },
    { name: "Black Lodge", lat: 37.5684, lng: -77.4751, cuisine: "Cocktail Bar" },
    { name: "Brenner Pass", lat: 37.5701, lng: -77.4776, cuisine: "Alpine" },
    { name: "Buckhead's Chop House", lat: 37.5873, lng: -77.5562, cuisine: "Steakhouse" },
    { name: "Buna Kurs", lat: 37.5441, lng: -77.4378, cuisine: "Ethiopian" },
    { name: "Cafe Rustika", lat: 37.5398, lng: -77.4321, cuisine: "German" },
    { name: "Cafe y Sabor", lat: 37.4701, lng: -77.5132, cuisine: "Colombian" },
    { name: "Can Can Brasserie", lat: 37.5560, lng: -77.4795, cuisine: "French" },
    { name: "Cheng Du", lat: 37.6539, lng: -77.6010, cuisine: "Chinese" },
    { name: "Chewy's Bagels", lat: 37.5562, lng: -77.4805, cuisine: "Cafe / Bagels" },
    { name: "Chez Max", lat: 37.5786, lng: -77.5746, cuisine: "French" },
    { name: "Chicken Fiesta", lat: 37.5601, lng: -77.4682, cuisine: "Peruvian" },
    { name: "Cobra Burger", lat: 37.5377, lng: -77.4191, cuisine: "Burgers" },
    { name: "Cochiloco", lat: 37.5378, lng: -77.4192, cuisine: "Mexican" },
    { name: "Conejo", lat: 37.5639, lng: -77.4693, cuisine: "Mexican" },
    { name: "Con Salsa", lat: 37.4789, lng: -77.5369, cuisine: "Latin" },
    { name: "Dinamo", lat: 37.5538, lng: -77.4704, cuisine: "Italian" },
    { name: "Dot's Back Inn", lat: 37.5732, lng: -77.4891, cuisine: "American (Diner)" },
    { name: "Eazzy Burger", lat: 37.5549, lng: -77.4851, cuisine: "Burgers" },
    { name: "Elegant Cuizines", lat: 37.5184, lng: -77.4472, cuisine: "Soul Food" },
    { name: "Enoteca Sogno", lat: 37.5645, lng: -77.5139, cuisine: "Italian" },
    { name: "FanBoy", lat: 37.5488, lng: -77.4508, cuisine: "Cocktail Bar" },
    { name: "Fighting Fish", lat: 37.5448, lng: -77.4373, cuisine: "Japanese / Sushi" },
    { name: "Floris", lat: 37.5293, lng: -77.4182, cuisine: "Tea Room" },
    { name: "Garnett's Cafe", lat: 37.5522, lng: -77.4659, cuisine: "Sandwiches" },
    { name: "Gelati Celesti", lat: 37.5670, lng: -77.4735, cuisine: "Dessert" },
    { name: "Gersi", lat: 37.5544, lng: -77.4729, cuisine: "Italian" },
    { name: "Helen's", lat: 37.5524, lng: -77.4640, cuisine: "American (New)" },
    { name: "Heritage", lat: 37.5501, lng: -77.4578, cuisine: "American (New)" },
    { name: "The Hill Cafe", lat: 37.5378, lng: -77.4221, cuisine: "American (Comfort)" },
    { name: "Hobnob", lat: 37.5487, lng: -77.4533, cuisine: "American (Comfort)" },
    { name: "Jamaica House", lat: 37.5511, lng: -77.4539, cuisine: "Caribbean" },
    { name: "Joe's Inn", lat: 37.5516, lng: -77.4693, cuisine: "Italian" },
    { name: "Kuba Kuba", lat: 37.5511, lng: -77.4623, cuisine: "Cuban" },
    { name: "La Doña Cocina Mexicana", lat: 37.6416, lng: -77.5542, cuisine: "Mexican" },
    { name: "Laura Lee's", lat: 37.5190, lng: -77.4244, cuisine: "American (New)" },
    { name: "Lemaire", lat: 37.5446, lng: -77.4468, cuisine: "American (Fine Dining)" },
    { name: "Lillian", lat: 37.5679, lng: -77.4764, cuisine: "Seafood" },
    { name: "Lillie Pearl", lat: 37.5415, lng: -77.4398, cuisine: "Soul Food" },
    { name: "Mama J's", lat: 37.5435, lng: -77.4363, cuisine: "Soul Food" },
    { name: "The Mantu", lat: 37.5559, lng: -77.4795, cuisine: "Afghan" },
    { name: "The Mayor Meats", lat: 37.5471, lng: -77.4560, cuisine: "Hot Dogs" },
    { name: "Mekong", lat: 37.5925, lng: -77.5190, cuisine: "Vietnamese" },
    { name: "Midlothian Chef's Kitchen", lat: 37.5244, lng: -77.6213, cuisine: "American (New)" },
    { name: "Millie's Diner", lat: 37.5284, lng: -77.4255, cuisine: "American (Diner)" },
    { name: "Mr. Noodle", lat: 37.5554, lng: -77.4837, cuisine: "Chinese" },
    { name: "Moore Street Café", lat: 37.5670, lng: -77.4762, cuisine: "American (Diner)" },
    { name: "Nami", lat: 37.5501, lng: -77.4597, cuisine: "Japanese / Sushi" },
    { name: "Nate's Bagels", lat: 37.5510, lng: -77.4552, cuisine: "Cafe / Bagels" },
    { name: "Nokoribi", lat: 37.5625, lng: -77.4840, cuisine: "Japanese / Yakitori" },
    { name: "Oceano", lat: 37.5312, lng: -77.4293, cuisine: "Seafood" },
    { name: "Original Ronnie's BBQ", lat: 37.5385, lng: -77.4347, cuisine: "BBQ" },
    { name: "Osaka Sushi & Steak", lat: 37.6620, lng: -77.5910, cuisine: "Japanese / Sushi" },
    { name: "Perly's", lat: 37.5429, lng: -77.4414, cuisine: "Jewish Deli" },
    { name: "Peter Chang", lat: 37.5649, lng: -77.4727, cuisine: "Chinese" },
    { name: "Pho Tay Do", lat: 37.6015, lng: -77.5147, cuisine: "Vietnamese" },
    { name: "Pinky's", lat: 37.5681, lng: -77.4769, cuisine: "Mediterranean" },
    { name: "Pizza Bones", lat: 37.5388, lng: -77.4230, cuisine: "Pizza" },
    { name: "Proper Pie", lat: 37.5358, lng: -77.4170, cuisine: "Pies" },
    { name: "Rappahannock", lat: 37.5414, lng: -77.4407, cuisine: "Seafood" },
    { name: "Sabai", lat: 37.5639, lng: -77.4723, cuisine: "Thai" },
    { name: "Sally Bell's Kitchen", lat: 37.5606, lng: -77.4687, cuisine: "American (Southern)" },
    { name: "Scott's Shawarma", lat: 37.5539, lng: -77.4665, cuisine: "Middle Eastern" },
    { name: "Shagbark", lat: 37.5828, lng: -77.5857, cuisine: "American (Southern)" },
    { name: "Shyndigz Bakery & Cafe", lat: 37.5518, lng: -77.4594, cuisine: "Dessert" },
    { name: "The Smoky Mug", lat: 37.5098, lng: -77.4497, cuisine: "BBQ" },
    { name: "The Stables at Belmont", lat: 37.5582, lng: -77.4601, cuisine: "American (New)" },
    { name: "Stanley's", lat: 37.5529, lng: -77.4678, cuisine: "Sandwiches" },
    { name: "Stock Bistro & Bar", lat: 37.5303, lng: -77.4278, cuisine: "Vietnamese" },
    { name: "Susie's", lat: 37.5377, lng: -77.4211, cuisine: "Sandwiches" },
    { name: "Tazza Kitchen", lat: 37.5638, lng: -77.4755, cuisine: "Pizza" },
    { name: "TBT El Gallo", lat: 37.5537, lng: -77.4719, cuisine: "Mexican" },
    { name: "Trouvaille", lat: 37.5452, lng: -77.4377, cuisine: "French" },
    { name: "The Wine Whisperer", lat: 37.5499, lng: -77.4580, cuisine: "Wine Bar" },
    { name: "Zorch Pizza", lat: 37.5562, lng: -77.4782, cuisine: "Pizza" },
].map((r, index) => ({
  id: index + 1, name: r.name, visited: false, review: '', rating: 0,
  visitedDate: null, lat: r.lat || null, lng: r.lng || null, cuisine: r.cuisine || "Uncategorized"
}));

// --- Data for recommendations (not on the RTD 100 list) ---
const recommendationData = {
    "American (New)": { name: "The Daily Kitchen & Bar", blurb: "A local favorite for healthy-ish bowls, juices, and a lively patio scene." },
    "Italian": { name: "La Grotta Ristorante", blurb: "Classic, upscale Northern Italian dining in a historic Shockoe Slip setting." },
    "French": { name: "Max's on Broad", blurb: "A bustling brasserie with Belgian-French classics and an extensive beer list." },
    "BBQ": { name: "Buz and Ned's Real Barbecue", blurb: "An RVA institution famous for its slow-smoked ribs and pulled pork." },
    "Mexican": { name: "En Su Boca", blurb: "A trendy taqueria known for unique tacos and strong margaritas." },
    "Seafood": { name: "East Coast Provisions", blurb: "A stylish spot in Carytown with fresh seafood, sushi, and steaks." },
    "Pizza": { name: "The Hop Craft Pizza & Beer", blurb: "Creative pizza toppings and a massive, well-curated list of craft beers." },
    "Japanese / Sushi": { name: "Akida Japanese", blurb: "A beloved, no-frills sushi spot praised for its fresh, high-quality fish." },
    "Vietnamese": { name: "Pho So 1", blurb: "An authentic spot on Horsepen Rd that many locals swear by for delicious pho." },
};

// --- Helper Icon Components ---
const CheckCircleIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> );
const CircleIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
const PencilIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg> );
const XIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> );
const MapPinIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> );
const SparklesIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg> );
const StarIcon = ({ className, solid }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={solid ? "currentColor" : "none"} stroke="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> );

const StarRating = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return ( <div className="flex items-center space-x-1">{[1, 2, 3, 4, 5].map((star) => (<button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"><StarIcon className={`h-8 w-8 transition-colors ${(hoverRating || rating) >= star ? 'text-amber-400' : 'text-gray-300'}`} solid={(hoverRating || rating) >= star} /></button>))}</div> );
};

const MapComponent = ({ restaurants, onMarkerClick }) => {
    useEffect(() => {
        if (typeof window.L === 'undefined') return;
        const map = window.L.map('map').setView([37.55, -77.45], 12);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
        const markers = window.L.featureGroup().addTo(map);
        restaurants.forEach(r => {
            if (r.lat && r.lng) {
                const customIcon = window.L.divIcon({ className: 'custom-div-icon', html: `<div class='marker-pin ${r.visited ? "visited" : ""}'></div><div class='marker-number'>${r.id}</div>`, iconSize: [30, 42], iconAnchor: [15, 42] });
                const marker = window.L.marker([r.lat, r.lng], { icon: customIcon });
                marker.bindPopup(`<b>${r.id}. ${r.name}</b>`).on('click', () => onMarkerClick(r));
                markers.addLayer(marker);
            }
        });
        if(markers.getLayers().length > 0) { map.fitBounds(markers.getBounds().pad(0.1)); }
        return () => { map.remove(); };
    }, [restaurants, onMarkerClick]);
    return <div id="map" className="h-[500px] w-full rounded-lg shadow-lg mb-6 z-0 border border-gray-200"></div>;
};

const Recommendations = ({ topCuisines }) => {
    if (!topCuisines || topCuisines.length === 0) {
        return null;
    }
    return (
        <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800">You Might Also Like...</h2>
                <p className="text-slate-500 mt-1">Based on your ratings, here are some other popular Richmond spots <span className="font-semibold">(not on the RTD 100 list)</span> you may enjoy.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topCuisines.map(cuisine => {
                    const recommendation = recommendationData[cuisine];
                    if (!recommendation) return null;
                    return (
                        <div key={cuisine} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-sm font-semibold text-rose-800">Because you like {cuisine}</p>
                            <h3 className="text-xl font-bold text-slate-900 mt-1">{recommendation.name}</h3>
                            <p className="text-slate-600 mt-2">{recommendation.blurb}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [visitedDate, setVisitedDate] = useState('');
    const [mapVisible, setMapVisible] = useState(false);
    const [recsVisible, setRecsVisible] = useState(false);
    const [scriptsLoaded, setScriptsLoaded] = useState({ leaflet: false });

    useEffect(() => {
        const fontLink = document.createElement('link'); fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'; fontLink.rel = 'stylesheet'; document.head.appendChild(fontLink);
        const leafletLink = document.createElement('link'); leafletLink.rel = 'stylesheet'; leafletLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(leafletLink);
        const leafletScript = document.createElement('script'); leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; leafletScript.onload = () => setScriptsLoaded(prev => ({...prev, leaflet: true })); document.body.appendChild(leafletScript);
        return () => { document.head.removeChild(fontLink); document.head.removeChild(leafletLink); document.body.removeChild(leafletScript); }
    }, []);

    useEffect(() => {
        try {
            const savedData = localStorage.getItem('rtd100_checklist');
            const parsedData = savedData ? JSON.parse(savedData) : null;
            if (parsedData && Array.isArray(parsedData) && parsedData.length === initialRestaurantData.length) {
                const mergedData = initialRestaurantData.map(initialRestaurant => {
                    const savedRestaurant = parsedData.find(r => r.id === initialRestaurant.id);
                    if (savedRestaurant) return { ...initialRestaurant, visited: savedRestaurant.visited, review: savedRestaurant.review, rating: savedRestaurant.rating || 0, visitedDate: savedRestaurant.visitedDate || null };
                    return initialRestaurant;
                });
                setRestaurants(mergedData);
            } else { setRestaurants(initialRestaurantData); }
        } catch (error) { console.error("Failed to load or merge data", error); setRestaurants(initialRestaurantData); }
    }, []);

    useEffect(() => { if (restaurants.length > 0) localStorage.setItem('rtd100_checklist', JSON.stringify(restaurants)); }, [restaurants]);

    const toggleVisited = (id) => { setRestaurants(prev => prev.map(r => r.id === id ? { ...r, visited: !r.visited } : r)); };
    const openReviewModal = (restaurant) => { setCurrentRestaurant(restaurant); setReviewText(restaurant.review || ''); setRating(restaurant.rating || 0); setVisitedDate(restaurant.visitedDate || ''); setIsModalOpen(true); };
    const closeReviewModal = () => { setIsModalOpen(false); setCurrentRestaurant(null); setReviewText(''); setRating(0); setVisitedDate(''); };
    const saveDetails = () => {
        if (!currentRestaurant) return;
        setRestaurants(prevRestaurants =>
            prevRestaurants.map(r => {
                if (r.id === currentRestaurant.id) {
                    const hasDetails = reviewText || rating > 0 || visitedDate;
                    return { ...r, review: reviewText, rating: rating, visitedDate: visitedDate, visited: hasDetails ? true : r.visited };
                }
                return r;
            })
        );
        closeReviewModal();
    };
    const handleMarkerClick = (restaurant) => {
        const element = document.getElementById(`restaurant-${restaurant.id}`);
        if(element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('animate-highlight');
            setTimeout(() => { element.classList.remove('animate-highlight'); }, 2000);
        }
    };

    const filteredRestaurants = useMemo(() => restaurants.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())), [restaurants, searchTerm]);
    const visitedCount = useMemo(() => restaurants.filter(r => r.visited).length, [restaurants]);
    const progressPercentage = (visitedCount / restaurants.length) * 100;

    const topCuisines = useMemo(() => {
        const highRated = restaurants.filter(r => r.rating >= 4);
        if (highRated.length < 3) return [];
        const counts = highRated.reduce((acc, r) => { const cuisine = r.cuisine || "Uncategorized"; acc[cuisine] = (acc[cuisine] || 0) + 1; return acc; }, {});
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name]) => name);
    }, [restaurants]);

    return (
        <div className="bg-slate-50 min-h-screen antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-5xl">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">RTD 100: Checklist for the Best Restaurants in Richmond, VA</h1>
                    <p className="mt-3 text-lg text-slate-600">Track your journey through the Richmond Times-Dispatch's official list of the top 100 places to eat. Discover, rate, and review the best food Richmond has to offer in 2025.</p>
                </header>
                <div className="sticky top-0 bg-slate-50/80 backdrop-blur-sm z-20 py-5 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="w-full sm:w-2/3">
                            <input type="text" placeholder="Search for a restaurant..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 text-lg border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"/>
                        </div>
                        <div className="w-full sm:w-1/3 grid grid-cols-1">
                            <button onClick={() => setMapVisible(prev => !prev)} disabled={!scriptsLoaded.leaflet} className="flex items-center justify-center p-3 bg-slate-800 text-white font-semibold rounded-xl shadow-sm hover:bg-slate-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
                                <MapPinIcon className="h-5 w-5 sm:mr-2" />
                                <span className="hidden sm:inline">{mapVisible ? 'Hide Map' : 'Show Map'}</span>
                            </button>
                        </div>
                    </div>
                     <div className="mt-6 text-center">
                         <button onClick={() => setRecsVisible(prev => !prev)} disabled={topCuisines.length === 0} className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl shadow-sm hover:bg-amber-600 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
                            <SparklesIcon className="h-5 w-5 mr-2" />
                            <span>{recsVisible ? 'Hide Recommendations' : 'Get Recommendations'}</span>
                        </button>
                        {topCuisines.length === 0 && (
                            <p className="text-sm text-slate-500 mt-2 animate-pulse">
                                ⭐ Rate 3 restaurants 4+ stars to unlock personalized recommendations!
                            </p>
                        )}
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between mb-1 text-slate-600"><span className="text-base font-medium">Progress</span><span className="text-sm font-medium">{visitedCount} of {restaurants.length} Visited</span></div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5"><div className="bg-rose-700 h-2.5 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div></div>
                    </div>
                </div>

                {mapVisible && scriptsLoaded.leaflet && <MapComponent restaurants={restaurants} onMarkerClick={handleMarkerClick}/>}
                {recsVisible && <Recommendations topCuisines={topCuisines} />}

                <div className="space-y-4">
                    {filteredRestaurants.map(restaurant => (
                        <div key={restaurant.id} id={`restaurant-${restaurant.id}`} className={`flex items-start p-4 rounded-xl shadow-sm transition-all duration-300 border ${ restaurant.visited ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}>
                            <div className="flex-shrink-0 w-12 text-center mr-2">
                                <p className="text-xl font-bold text-rose-800">{restaurant.id}</p>
                            </div>
                            <div className="flex-grow">
                                <p className={`text-xl font-semibold text-slate-800`}>{restaurant.name}</p>
                                <p className="text-sm text-slate-500">{restaurant.cuisine}</p>
                                {(restaurant.rating > 0 || restaurant.visitedDate || restaurant.review) && (
                                    <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                                        {restaurant.rating > 0 && (
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-5 w-5 ${i < restaurant.rating ? 'text-amber-400' : 'text-slate-300'}`} solid={i < restaurant.rating} />)}
                                            </div>
                                        )}
                                        {restaurant.visitedDate && ( <p className="text-sm text-slate-600">Visited: {new Date(restaurant.visitedDate).toLocaleDateString()}</p> )}
                                        {restaurant.review && (<p className="text-sm text-slate-600 italic">"{restaurant.review}"</p>)}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-center space-y-2 ml-4">
                                <div onClick={() => toggleVisited(restaurant.id)} className="cursor-pointer">
                                    {restaurant.visited ? (<CheckCircleIcon className="h-8 w-8 text-emerald-600" />) : (<CircleIcon className="h-8 w-8 text-slate-300 hover:text-emerald-500" />)}
                                </div>
                                <button onClick={() => openReviewModal(restaurant)} className="flex items-center space-x-1.5 mt-2 px-3 py-1 rounded-lg text-slate-600 hover:bg-slate-200 active:bg-slate-300 transition" aria-label={`Rate and Review ${restaurant.name}`}>
                                    <PencilIcon className="h-4 w-4" />
                                    <span className="text-sm font-medium">Rate/Review</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredRestaurants.length === 0 && (<div className="text-center py-16"><p className="text-xl text-slate-500">No restaurants match your search.</p></div>)}
                </div>
            </div>

            {isModalOpen && currentRestaurant && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg animate-pop-in">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200"><h2 className="text-2xl font-bold text-slate-800">Your Visit to {currentRestaurant.name}</h2><button onClick={closeReviewModal} className="p-1 rounded-full hover:bg-slate-200"><XIcon className="h-6 w-6 text-slate-500" /></button></div>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
                                <StarRating rating={rating} setRating={setRating} />
                            </div>
                            <div>
                                <label htmlFor="visitedDate" className="block text-sm font-medium text-slate-700 mb-2">Date Visited</label>
                                <input type="date" id="visitedDate" value={visitedDate} onChange={(e) => setVisitedDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg shadow-sm focus:ring-rose-500 focus:border-rose-500" />
                            </div>
                            <div>
                                <label htmlFor="reviewText" className="block text-sm font-medium text-slate-700 mb-2">Notes / Favorite Dish</label>
                                <textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="e.g., The fried catfish was amazing!" className="w-full p-2 border border-slate-300 rounded-lg shadow-sm h-24 focus:ring-rose-500 focus:border-rose-500" rows="3"></textarea>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end space-x-3">
                            <button onClick={closeReviewModal} className="px-5 py-2.5 rounded-lg bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition">Cancel</button>
                            <button onClick={saveDetails} className="px-5 py-2.5 rounded-lg bg-rose-800 text-white font-semibold hover:bg-rose-700 transition shadow-sm">Save Details</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Add some simple keyframe animations and map marker styles
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
  @keyframes pop-in { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  .animate-pop-in { animation: pop-in 0.3s ease-out forwards; }
  @keyframes highlight { 0% { background-color: rgba(253, 224, 71, 0); } 50% { background-color: rgba(253, 224, 71, 0.6); } 100% { background-color: rgba(253, 224, 71, 0); } }
  .animate-highlight { animation: highlight 2s ease-in-out; }
  .custom-div-icon { display: flex; align-items: center; justify-content: center; }
  .marker-pin { width: 30px; height: 30px; border-radius: 50% 50% 50% 0; background: #9f1239; position: absolute; transform: rotate(-45deg); border: 2px solid #FFFFFF; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: background-color 0.3s; }
  .marker-pin.visited { background: #16a34a; }
  .marker-number { position: relative; color: white; font-size: 14px; font-weight: bold; z-index: 1; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); line-height: 1; top: -6px; }
  .leaflet-popup-content-wrapper { border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
`;
document.head.appendChild(style);
