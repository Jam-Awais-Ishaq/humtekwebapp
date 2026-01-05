import React, { useState } from 'react'
import CustomerForm from './CustomerForm/CustomerForm'
import CustomerBankDetails from './CustomerForm/CustomerBankDetails';

const CustomerPage = () => {
    const [bankCards, setBankCards] = useState([]);
    const [colorIndex, setColorIndex] = useState(0);

    const handleFormSubmit = (formData) => {
        // Add new bank card to the array
        setBankCards(prev => [...prev, formData]);
        setColorIndex(prev => (prev + 1) % 5); // Cycle through 5 colors
    };

    const handleDeleteCard = (id) => {
        setBankCards(prev => prev.filter(card => card.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Customer Form */}
                <div className="mb-8">
                    <CustomerForm onSubmit={handleFormSubmit} />
                </div>

                {/* Bank Cards Grid */}
                {bankCards.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Your Bank Cards ({bankCards.length})
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bankCards.map((card, index) => (
                                <div key={card.id} className="relative group">
                                    <CustomerBankDetails 
                                        data={card} 
                                        colorIndex={index % 5}
                                    />
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteCard(card.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-2 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 shadow-lg"
                                        title="Delete Card"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {bankCards.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No Bank Cards Yet
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Fill out the form above to create your first bank Customer First.
                            </p>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomerPage;