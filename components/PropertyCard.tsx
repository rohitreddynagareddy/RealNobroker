import React, { useState } from 'react';
import { Property } from '../types';
import { TTSButton } from './TTSButton';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [showContact, setShowContact] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Construct a natural language description for the TTS
  const speechText = `Available for rent: A ${property.bhk} BHK ${property.type} in ${property.location}. The rent is ${property.price} rupees per month with a deposit of ${property.deposit}. ${property.description}`;

  const handleUnlockContact = () => {
      setShowPaymentModal(true);
  };

  const handleRazorpayPayment = () => {
      const options = {
          key: "rzp_test_1DP5mmOlF5G5ag", // Public Test Key
          amount: 1000, // ₹10
          currency: "INR",
          name: "RealNoBroker",
          description: "Unlock Owner Contact Details",
          image: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
          handler: function (response: any) {
              setShowPaymentModal(false);
              setIsProcessing(true);
              setTimeout(() => {
                  setIsProcessing(false);
                  setShowContact(true);
              }, 1000);
          },
          prefill: {
              name: "Tenant User",
              email: "tenant@example.com",
              contact: "9999999999"
          },
          theme: {
              color: "#0f766e"
          }
      };

      if ((window as any).Razorpay) {
          const rzp1 = new (window as any).Razorpay(options);
          rzp1.on('payment.failed', function (response: any){
              alert("Payment Failed: " + response.error.description);
          });
          rzp1.open();
      } else {
          alert("Razorpay SDK failed to load. Please check your internet connection.");
      }
  };

  const nextImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % property.imageUrls.length);
  };

  const prevImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + property.imageUrls.length) % property.imageUrls.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 relative group">
      
      {/* Payment Selection Modal Overlay */}
      {showPaymentModal && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-full max-w-xs bg-white shadow-xl rounded-xl p-4 border border-gray-100">
                <div className="mb-4">
                   <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                   </div>
                   <h4 className="text-lg font-bold text-gray-900">Unlock Contact</h4>
                   <p className="text-xs text-gray-500">Pay ₹10 securely via Razorpay</p>
                </div>
                
                <div className="space-y-2">
                    <button 
                        onClick={handleRazorpayPayment}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                         <span>Net Banking / Cards</span>
                    </button>
                    
                    <button 
                        onClick={handleRazorpayPayment}
                        className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <span>UPI / PhonePe / GPay</span>
                    </button>
                </div>

                <button 
                    onClick={() => setShowPaymentModal(false)}
                    className="mt-4 text-xs text-gray-400 hover:text-gray-600 font-medium underline"
                >
                    Cancel
                </button>
            </div>
        </div>
      )}

      <div className="relative h-48 bg-gray-200">
        <img 
          src={property.imageUrls[currentImageIndex]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Image Navigation */}
        {property.imageUrls.length > 1 && (
            <>
                <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
                <div className="absolute bottom-3 right-3 bg-black/50 px-2 py-0.5 rounded text-white text-[10px] font-medium z-10">
                    {currentImageIndex + 1} / {property.imageUrls.length}
                </div>
            </>
        )}

        <div className="absolute top-3 left-3 z-10">
            <TTSButton text={speechText} variant="icon" className="bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pointer-events-none">
           <p className="text-white font-semibold text-lg">{property.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })} / mo</p>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    {property.location}, Bangalore
                </p>
            </div>
            <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded uppercase tracking-wide">
                {property.type}
            </span>
        </div>

        <div className="grid grid-cols-2 gap-4 my-4 text-sm text-gray-600">
             <div className="flex flex-col">
                 <span className="text-xs text-gray-400 uppercase">Furnishing</span>
                 <span className="font-medium">{property.furnishing}</span>
             </div>
             <div className="flex flex-col">
                 <span className="text-xs text-gray-400 uppercase">BHK</span>
                 <span className="font-medium">{property.bhk} BHK</span>
             </div>
             <div className="flex flex-col">
                 <span className="text-xs text-gray-400 uppercase">Deposit</span>
                 <span className="font-medium">₹{property.deposit.toLocaleString('en-IN')}</span>
             </div>
             <div className="flex flex-col">
                 <span className="text-xs text-gray-400 uppercase">Available From</span>
                 <span className="font-medium">Immediate</span>
             </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {property.description}
        </p>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {property.ownerName.charAt(0)}
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-900">{property.ownerName}</span>
                    <span className="text-[10px] text-gray-400">Owner</span>
                </div>
            </div>
            {!showContact ? (
                <button 
                    onClick={handleUnlockContact}
                    disabled={isProcessing}
                    className={`px-4 py-2 text-white text-sm font-semibold rounded transition-all shadow-sm flex items-center gap-2 ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}
                >
                    {isProcessing ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                            </svg>
                            Get Contact (₹10)
                        </>
                    )}
                </button>
            ) : (
                <a 
                    href={`tel:${property.contactNumber}`}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition-colors shadow-sm flex items-center gap-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                    </svg>
                    {property.contactNumber}
                </a>
            )}
        </div>
      </div>
    </div>
  );
};