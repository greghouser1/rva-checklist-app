import React, { useState, useEffect, useMemo } from 'react';

// --- Data: The list of 100 restaurants with coordinates for all entries ---
const initialRestaurantData = [
    { name: "The Roosevelt", lat: 37.5375, lng: -77.4206 }, { name: "Celladora", lat: 37.5422, lng: -77.4391 },
    { name: "Grisette", lat: 37.5369, lng: -77.4187 }, { name: "Restaurant Adarra", lat: 37.5495, lng: -77.4370 },
    { name: "Lost Letter", lat: 37.5583, lng: -77.4727 }, { name: "Metzger Bar & Butchery", lat: 37.5385, lng: -77.4172 },
    { name: "Lehja", lat: 37.6493, lng: -77.6212 }, { name: "Edo's Squid", lat: 37.5492, lng: -77.4528 },
    { name: "Penny's Wine Shop", lat: 37.5491, lng: -77.4371 }, { name: "Blue Atlas", lat: 37.5139, lng: -77.3872 },
    { name: "L'Opossum", lat: 37.5303, lng: -77.4501 }, { name: "Alewife", lat: 37.5372, lng: -77.4186 },
    { name: "Stella's", lat: 37.5587, lng: -77.4566 }, { name: "ZZQ", lat: 37.5670, lng: -77.4754 },
    { name: "Full Kee", lat: 37.6033, lng: -77.5147 }, { name: "1870", lat: 37.5029, lng: -77.6433 },
    { name: "8½", lat: 37.5459, lng: -77.4646 }, { name: "Abuelita's", lat: 37.4913, lng: -77.5255 },
    { name: "Acacia Midtown", lat: 37.5759, lng: -77.5173 }, { name: "Amuse", lat: 37.5539, lng: -77.4739 },
    { name: "Anokha", lat: 37.6534, lng: -77.5843 }, { name: "Bacchus", lat: 37.5488, lng: -77.4508 },
    { name: "Bamboo Cafe", lat: 37.5463, lng: -77.4627 }, { name: "Bar Solita", lat: 37.5475, lng: -77.4439 },
    { name: "Beaucoup", lat: 37.5472, lng: -77.4498 }, { name: "Birdie's", lat: 37.5471, lng: -77.4497 },
    { name: "Black Lodge", lat: 37.5684, lng: -77.4751 }, { name: "Brenner Pass", lat: 37.5701, lng: -77.4776 },
    { name: "Buckhead's Chop House", lat: 37.5873, lng: -77.5562 }, { name: "Buna Kurs", lat: 37.5441, lng: -77.4378 },
    { name: "Cafe Rustika", lat: 37.5398, lng: -77.4321 }, { name: "Cafe y Sabor", lat: 37.4701, lng: -77.5132 },
    { name: "Can Can Brasserie", lat: 37.5560, lng: -77.4795 }, { name: "Cheng Du", lat: 37.6539, lng: -77.6010 },
    { name: "Chewy's Bagels", lat: 37.5562, lng: -77.4805 }, { name: "Chez Max", lat: 37.5786, lng: -77.5746 },
    { name: "Chicken Fiesta", lat: 37.5601, lng: -77.4682 }, { name: "Cobra Burger", lat: 37.5377, lng: -77.4191 },
    { name: "Cochiloco", lat: 37.5378, lng: -77.4192 }, { name: "Conejo", lat: 37.5639, lng: -77.4693 },
    { name: "Con Salsa", lat: 37.4789, lng: -77.5369 }, { name: "Dinamo", lat: 37.5538, lng: -77.4704 },
    { name: "Dot's Back Inn", lat: 37.5732, lng: -77.4891 }, { name: "Eazzy Burger", lat: 37.5549, lng: -77.4851 },
    { name: "Elegant Cuizines", lat: 37.5184, lng: -77.4472 }, { name: "Enoteca Sogno", lat: 37.5645, lng: -77.5139 },
    { name: "FanBoy", lat: 37.5488, lng: -77.4508 }, { name: "Fighting Fish", lat: 37.5448, lng: -77.4373 },
    { name: "Floris", lat: 37.5293, lng: -77.4182 }, { name: "Garnett's Cafe", lat: 37.5522, lng: -77.4659 },
    { name: "Gelati Celesti", lat: 37.5670, lng: -77.4735 }, { name: "Gersi", lat: 37.5544, lng: -77.4729 },
    { name: "Helen's", lat: 37.5524, lng: -77.4640 }, { name: "Heritage", lat: 37.5501, lng: -77.4578 },
    { name: "The Hill Cafe", lat: 37.5378, lng: -77.4221 }, { name: "Hobnob", lat: 37.5487, lng: -77.4533 },
    { name: "Jamaica House", lat: 37.5511, lng: -77.4539 }, { name: "Joe's Inn", lat: 37.5516, lng: -77.4693 },
    { name: "Kuba Kuba", lat: 37.5511, lng: -77.4623 }, { name: "La Doña Cocina Mexicana", lat: 37.6416, lng: -77.5542 },
    { name: "Laura Lee's", lat: 37.5190, lng: -77.4244 }, { name: "Lemaire", lat: 37.5446, lng: -77.4468 },
    { name: "Lillian", lat: 37.5679, lng: -77.4764 }, { name: "Lillie Pearl", lat: 37.5415, lng: -77.4398 },
    { name: "Mama J's", lat: 37.5435, lng: -77.4363 }, { name: "The Mantu", lat: 37.5559, lng: -77.4795 },
    { name: "The Mayor Meats", lat: 37.5471, lng: -77.4560 }, { name: "Mekong", lat: 37.5925, lng: -77.5190 },
    { name: "Midlothian Chef's Kitchen", lat: 37.5244, lng: -77.6213 }, { name: "Millie's Diner", lat: 37.5284, lng: -77.4255 },
    { name: "Mr. Noodle", lat: 37.5554, lng: -77.4837 }, { name: "Moore Street Café", lat: 37.5670, lng: -77.4762 },
    { name: "Nami", lat: 37.5501, lng: -77.4597 }, { name: "Nate's Bagels", lat: 37.5510, lng: -77.4552 },
    { name: "Nokoribi", lat: 37.5625, lng: -77.4840 }, { name: "Oceano", lat: 37.5312, lng: -77.4293 },
    { name: "Original Ronnie's BBQ", lat: 37.5385, lng: -77.4347 }, { name: "Osaka Sushi & Steak", lat: 37.6620, lng: -77.5910 },
    { name: "Perly's", lat: 37.5429, lng: -77.4414 }, { name: "Peter Chang", lat: 37.5649, lng: -77.4727 },
    { name: "Pho Tay Do", lat: 37.6015, lng: -77.5147 }, { name: "Pinky's", lat: 37.5681, lng: -77.4769 },
    { name: "Pizza Bones", lat: 37.5388, lng: -77.4230 }, { name: "Proper Pie", lat: 37.5358, lng: -77.4170 },
    { name: "Rappahannock", lat: 37.5414, lng: -77.4407 }, { name: "Sabai", lat: 37.5639, lng: -77.4723 },
    { name: "Sally Bell's Kitchen", lat: 37.5606, lng: -77.4687 }, { name: "Scott's Shawarma", lat: 37.5539, lng: -77.4665 },
    { name: "Shagbark", lat: 37.5828, lng: -77.5857 }, { name: "Shyndigz Bakery & Cafe", lat: 37.5518, lng: -77.4594 },
    { name: "The Smoky Mug", lat: 37.5098, lng: -77.4497 }, { name: "The Stables at Belmont", lat: 37.5582, lng: -77.4601 },
    { name: "Stanley's", lat: 37.5529, lng: -77.4678 }, { name: "Stock Bistro & Bar", lat: 37.5303, lng: -77.4278 },
    { name: "Susie's", lat: 37.5377, lng: -77.4211 }, { name: "Tazza Kitchen", lat: 37.5638, lng: -77.4755 },
    { name: "TBT El Gallo", lat: 37.5537, lng: -77.4719 }, { name: "Trouvaille", lat: 37.5452, lng: -77.4377 },
    { name: "The Wine Whisperer", lat: 37.5499, lng: -77.4580 }, { name: "Zorch Pizza", lat: 37.5562, lng: -77.4782 },
].map((r, index) => ({
  id: index + 1,
  name: r.name,
  visited: false,
  review: '',
  rating: 0,
  visitedDate: null,
  lat: r.lat || null,
  lng: r.lng || null
}));

// --- Helper Icon Components ---
const CheckCircleIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
const CircleIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
const PencilIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg> );
const XIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> );
const MapIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.002 6.002 0 019.336 0L10 12.162l-5.668-4.135zM10 6a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg> );
const StarIcon = ({ className, solid }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={solid ? "currentColor" : "none"} stroke="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

// --- Star Rating Component ---
const StarRating = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <StarIcon
                        className={`h-8 w-8 transition-colors ${
                            (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        solid={(hoverRating || rating) >= star}
                    />
                </button>
            ))}
        </div>
    );
};


// --- Map Component ---
const MapComponent = ({ restaurants, onMarkerClick }) => {
    useEffect(() => {
        if (typeof L === 'undefined') return;
        const map = L.map('map').setView([37.55, -77.45], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
        const markers = L.featureGroup().addTo(map);

        restaurants.forEach(r => {
            if (r.lat && r.lng) {
                const customIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div class='marker-pin ${r.visited ? "visited" : ""}'></div><div class='marker-number'>${r.id}</div>`,
                    iconSize: [30, 42],
                    iconAnchor: [15, 42]
                });
                const marker = L.marker([r.lat, r.lng], { icon: customIcon });
                marker.bindPopup(`<b>${r.id}. ${r.name}</b>`).on('click', () => onMarkerClick(r));
                markers.addLayer(marker);
            }
        });
        if(markers.getLayers().length > 0) {
            map.fitBounds(markers.getBounds().pad(0.1));
        }
        return () => { map.remove(); };
    }, [restaurants, onMarkerClick]);
    return <div id="map" className="h-[500px] w-full rounded-lg shadow-lg mb-6 z-0"></div>;
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
    const [leafletLoaded, setLeafletLoaded] = useState(false);

    useEffect(() => {
        const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
        const script = document.createElement('script'); script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; script.onload = () => setLeafletLoaded(true); document.body.appendChild(script);
        return () => { document.head.removeChild(link); document.body.removeChild(script); }
    }, []);

    useEffect(() => {
        try {
            const savedData = localStorage.getItem('rtd100_checklist');
            const parsedData = savedData ? JSON.parse(savedData) : null;
            if (parsedData && Array.isArray(parsedData) && parsedData.length === initialRestaurantData.length) {
                const mergedData = initialRestaurantData.map(initialRestaurant => {
                    const savedRestaurant = parsedData.find(r => r.id === initialRestaurant.id);
                    return savedRestaurant ? { ...initialRestaurant, visited: savedRestaurant.visited, review: savedRestaurant.review, rating: savedRestaurant.rating || 0, visitedDate: savedRestaurant.visitedDate || null } : initialRestaurant;
                });
                setRestaurants(mergedData);
            } else {
                setRestaurants(initialRestaurantData);
            }
        } catch (error) {
            console.error("Failed to load or merge data from localStorage", error);
            setRestaurants(initialRestaurantData);
        }
    }, []);

    useEffect(() => { if (restaurants.length > 0) localStorage.setItem('rtd100_checklist', JSON.stringify(restaurants)); }, [restaurants]);

    const toggleVisited = (id) => {
        setRestaurants(prev => prev.map(r => r.id === id ? { ...r, visited: !r.visited } : r));
    };

    const openReviewModal = (restaurant) => {
        setCurrentRestaurant(restaurant);
        setReviewText(restaurant.review || '');
        setRating(restaurant.rating || 0);
        setVisitedDate(restaurant.visitedDate || '');
        setIsModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsModalOpen(false);
        setCurrentRestaurant(null);
        setReviewText('');
        setRating(0);
        setVisitedDate('');
    };

    const saveDetails = () => {
        if (!currentRestaurant) return;
        setRestaurants(prevRestaurants =>
            prevRestaurants.map(r => {
                if (r.id === currentRestaurant.id) {
                    const hasDetails = reviewText || rating > 0 || visitedDate;
                    return {
                        ...r,
                        review: reviewText,
                        rating: rating,
                        visitedDate: visitedDate,
                        visited: hasDetails ? true : r.visited // Auto-check if details are added
                    };
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

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800 antialiased">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-red-800 tracking-tight">RTD 100 Checklist</h1>
                    <p className="mt-2 text-lg text-gray-600">Your personal guide to the best restaurants in Richmond</p>
                </header>

                <div className="sticky top-0 bg-gray-50/95 backdrop-blur-sm z-20 py-4 mb-2">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"/>
                        <button onClick={() => setMapVisible(!mapVisible)} disabled={!leafletLoaded} className="flex items-center justify-center sm:w-auto px-4 py-3 bg-red-800 text-white font-semibold rounded-lg shadow-sm hover:bg-red-900 transition disabled:bg-gray-400">
                            <MapIcon className="h-5 w-5 mr-2" />{mapVisible ? 'Hide Map' : 'Show Map'}
                        </button>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between mb-1 text-gray-700"><span className="text-base font-semibold">Your Progress</span><span className="text-sm font-semibold">{visitedCount} of {restaurants.length} Visited</span></div>
                        <div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-red-700 h-4 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div></div>
                    </div>
                </div>

                {mapVisible && leafletLoaded && <MapComponent restaurants={restaurants} onMarkerClick={handleMarkerClick}/>}

                <div className="space-y-3">
                    {filteredRestaurants.map(restaurant => (
                        <div key={restaurant.id} id={`restaurant-${restaurant.id}`} className={`flex items-start p-4 rounded-lg shadow-md transition-all duration-300 ${ restaurant.visited ? 'bg-green-100 text-gray-500' : 'bg-white'}`}>
                            <div onClick={() => toggleVisited(restaurant.id)} className="cursor-pointer mr-4 pt-1">
                                {restaurant.visited ? (<CheckCircleIcon className="h-8 w-8 text-green-600" />) : (<CircleIcon className="h-8 w-8 text-gray-400 hover:text-green-500" />)}
                            </div>
                            <div className="flex-grow">
                                <p className={`text-lg font-semibold ${restaurant.visited ? 'line-through' : ''}`}>{restaurant.name}</p>
                                {(restaurant.rating > 0 || restaurant.visitedDate || restaurant.review) && (
                                    <div className="mt-2 space-y-2">
                                        {restaurant.rating > 0 && (
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-5 w-5 ${i < restaurant.rating ? 'text-yellow-400' : 'text-gray-300'}`} solid={i < restaurant.rating} />)}
                                            </div>
                                        )}
                                        {restaurant.visitedDate && (
                                            <p className="text-sm text-gray-600">Visited on: {new Date(restaurant.visitedDate).toLocaleDateString()}</p>
                                        )}
                                        {restaurant.review && (<p className="text-sm text-gray-600 italic pl-2 border-l-2 border-gray-300">"{restaurant.review}"</p>)}
                                    </div>
                                )}
                            </div>
                            <button onClick={() => openReviewModal(restaurant)} className="ml-4 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 transition" aria-label={`Review ${restaurant.name}`}><PencilIcon className="h-6 w-6 text-gray-500" /></button>
                        </div>
                    ))}
                    {filteredRestaurants.length === 0 && (<div className="text-center py-10"><p className="text-xl text-gray-500">No restaurants match your search.</p></div>)}
                </div>
            </div>

            {isModalOpen && currentRestaurant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg animate-fade-in-up">
                        <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold text-gray-800">Review for {currentRestaurant.name}</h2><button onClick={closeReviewModal} className="p-1 rounded-full hover:bg-gray-200"><XIcon className="h-6 w-6 text-gray-600" /></button></div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <StarRating rating={rating} setRating={setRating} />
                            </div>
                            <div>
                                <label htmlFor="visitedDate" className="block text-sm font-medium text-gray-700 mb-1">Date Visited</label>
                                <input type="date" id="visitedDate" value={visitedDate} onChange={(e) => setVisitedDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                            </div>
                            <div>
                                <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                                <textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="What did you think? Favorite dish? Vibe?" className="w-full p-2 border border-gray-300 rounded-md shadow-sm h-24 focus:ring-red-500 focus:border-red-500" rows="3"></textarea>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button onClick={closeReviewModal} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition">Cancel</button>
                            <button onClick={saveDetails} className="px-6 py-2 rounded-lg bg-red-800 text-white font-semibold hover:bg-red-900 transition shadow-sm">Save Details</button>
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
  @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
  @keyframes highlight { 0% { background-color: rgba(255, 235, 59, 0); } 50% { background-color: rgba(255, 235, 59, 0.7); } 100% { background-color: rgba(255, 235, 59, 0); } }
  .animate-highlight { animation: highlight 2s ease-in-out; }
  .custom-div-icon { display: flex; align-items: center; justify-content: center; }
  .marker-pin { width: 30px; height: 30px; border-radius: 50% 50% 50% 0; background: #c32b21; position: absolute; transform: rotate(-45deg); border: 2px solid #FFFFFF; transition: background-color 0.3s; }
  .marker-pin.visited { background: #16a34a; }
  .marker-number { position: relative; color: white; font-size: 14px; font-weight: bold; z-index: 1; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); line-height: 1; top: -6px; }
  .leaflet-popup-content-wrapper { border-radius: 8px; }
`;
document.head.appendChild(style);
