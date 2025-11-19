import React, { useState } from 'react';
import { ViewState, Property, BANGALORE_AREAS } from './types';
import { MOCK_PROPERTIES } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { UploadForm } from './components/UploadForm';
import { TTSButton } from './components/TTSButton';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [filterArea, setFilterArea] = useState<string>('All');
  const [filterBHK, setFilterBHK] = useState<string>('All');

  const handlePostProperty = (property: Property) => {
    setProperties([property, ...properties]);
    setView('home');
  };

  const filteredProperties = properties.filter(p => {
    const matchArea = filterArea === 'All' || p.location === filterArea;
    const matchBHK = filterBHK === 'All' || p.bhk.toString() === filterBHK;
    return matchArea && matchBHK;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setView('home')}
            >
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
              <h1 className="text-2xl font-bold text-teal-700 tracking-tight">RealNoBroker</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {view !== 'upload' && (
                <button 
                  onClick={() => setView('upload')}
                  className="hidden sm:flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Post Property
                </button>
              )}
              <button 
                 className="sm:hidden bg-teal-600 text-white p-2 rounded-lg"
                 onClick={() => setView('upload')}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'home' && (
          <div className="space-y-8">
            {/* Hero / Welcome */}
            <div className="bg-teal-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-800 rounded-full opacity-50 blur-3xl"></div>
               <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-800 rounded-full opacity-50 blur-3xl"></div>
               
               <div className="relative z-10 max-w-3xl">
                   <div className="flex items-center gap-4 mb-4">
                       <span className="px-3 py-1 bg-teal-800 rounded-full text-xs font-semibold uppercase tracking-wider text-teal-200">Bangalore's #1</span>
                       <TTSButton 
                            text="Welcome to Real No Broker. The easiest way to rent homes in Bangalore without paying any brokerage. Browse thousands of verified listings." 
                            label="Hear Welcome Message"
                            className="bg-white/10 text-white hover:bg-white/20"
                        />
                   </div>
                   <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                       Find your dream home <br/>
                       <span className="text-teal-400">without brokerage</span>
                   </h2>
                   <p className="text-lg text-teal-100 mb-8 max-w-xl">
                       Browse thousands of verified listings in Bangalore. Direct owner contact, no hidden fees.
                   </p>

                   {/* Search/Filter Bar */}
                   <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row gap-4 text-gray-800 max-w-4xl">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Location</label>
                            <select 
                                className="w-full bg-transparent font-semibold outline-none border-b border-gray-200 pb-1 focus:border-teal-500 transition-colors"
                                value={filterArea}
                                onChange={(e) => setFilterArea(e.target.value)}
                            >
                                <option value="All">All Areas</option>
                                {BANGALORE_AREAS.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 sm:border-l sm:border-gray-200 sm:pl-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">BHK Type</label>
                            <select 
                                className="w-full bg-transparent font-semibold outline-none border-b border-gray-200 pb-1 focus:border-teal-500 transition-colors"
                                value={filterBHK}
                                onChange={(e) => setFilterBHK(e.target.value)}
                            >
                                <option value="All">Any BHK</option>
                                <option value="1">1 BHK</option>
                                <option value="2">2 BHK</option>
                                <option value="3">3 BHK</option>
                            </select>
                        </div>
                        <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                            Search
                        </button>
                   </div>
               </div>
            </div>

            {/* Listings */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {filterArea === 'All' ? 'Featured Rentals' : `Rentals in ${filterArea}`}
                        <span className="ml-2 text-sm font-normal text-gray-500">({filteredProperties.length} found)</span>
                    </h3>
                </div>
                
                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                        <button 
                            onClick={() => { setFilterArea('All'); setFilterBHK('All'); }}
                            className="mt-2 text-teal-600 font-medium hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
          </div>
        )}

        {view === 'upload' && (
          <UploadForm 
            onCancel={() => setView('home')} 
            onSubmit={handlePostProperty}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center text-xl font-bold mx-auto mb-4">R</div>
              <p className="text-gray-500 mb-4">Made with ❤️ for Bangalore</p>
              <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} RealNoBroker Clone. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}