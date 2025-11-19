import React, { useState } from 'react';
import { BANGALORE_AREAS, Property } from '../types';
import { TTSButton } from './TTSButton';

interface UploadFormProps {
  onCancel: () => void;
  onSubmit: (property: Property) => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    type: 'Apartment',
    furnishing: 'Semi Furnished',
    location: BANGALORE_AREAS[0],
    bhk: 2,
    imageUrls: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'deposit' || name === 'bhk' ? Number(value) : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      const fileList = Array.from(files);
      
      const readers = fileList.map(file => {
        return new Promise<void>((resolve) => {
             const reader = new FileReader();
             reader.onloadend = () => {
                 if (typeof reader.result === 'string') {
                     newImages.push(reader.result);
                 }
                 resolve();
             };
             reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(() => {
         setFormData(prev => ({
             ...prev,
             imageUrls: [...(prev.imageUrls || []), ...newImages]
         }));
      });
    }
  };

  const removeImage = (index: number) => {
      setFormData(prev => ({
          ...prev,
          imageUrls: prev.imageUrls?.filter((_, i) => i !== index)
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.description || !formData.contactNumber) {
        alert("Please fill in all required fields");
        return;
    }

    const finalImages = formData.imageUrls && formData.imageUrls.length > 0 
        ? formData.imageUrls 
        : [`https://picsum.photos/800/600?random=${Date.now()}`];

    const newProperty: Property = {
        id: Date.now().toString(),
        title: formData.title!,
        description: formData.description!,
        price: Number(formData.price),
        deposit: Number(formData.deposit || 0),
        location: formData.location!,
        bhk: Number(formData.bhk),
        type: formData.type as any,
        furnishing: formData.furnishing as any,
        imageUrls: finalImages, 
        ownerName: 'Current User',
        contactNumber: formData.contactNumber,
        postedOn: new Date().toISOString().split('T')[0]
    };
    
    onSubmit(newProperty);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Post Your Property</h2>
            <p className="text-sm text-gray-500">Get your property rented out in Bangalore quickly.</p>
        </div>
        <TTSButton text="Please fill out the form details below to list your property. You can upload multiple photos of your property to attract more tenants." label="Assistant" className="bg-teal-50" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Image Upload Section */}
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
                
                {formData.imageUrls && formData.imageUrls.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-4">
                        {formData.imageUrls.map((url, index) => (
                            <div key={index} className="relative group aspect-square">
                                <img src={url} alt={`Upload ${index}`} className="w-full h-full object-cover rounded-lg border border-gray-200" />
                                <button 
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <div className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer relative">
                             <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                onChange={handleImageChange} 
                             />
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                             </svg>
                        </div>
                    </div>
                ) : (
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-teal-500 transition-colors relative bg-gray-50">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500 px-2">
                                    <span>Upload photos</span>
                                    <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange} />
                                </label>
                                <p className="pl-1 pt-0.5">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Title *</label>
                <input 
                    type="text" 
                    name="title"
                    required
                    placeholder="e.g., Spacious 2 BHK near Metro"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select 
                    name="type"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    onChange={handleChange}
                    value={formData.type}
                >
                    <option value="Apartment">Apartment</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Villa">Villa</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BHK Type</label>
                <select 
                    name="bhk"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    onChange={handleChange}
                    value={formData.bhk}
                >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4+ BHK</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Rent (₹/mo) *</label>
                <input 
                    type="number" 
                    name="price"
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    onChange={handleChange}
                />
            </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit (₹)</label>
                <input 
                    type="number" 
                    name="deposit"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (Bangalore)</label>
                <select 
                    name="location"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    onChange={handleChange}
                    value={formData.location}
                >
                    {BANGALORE_AREAS.map(area => (
                        <option key={area} value={area}>{area}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Furnishing</label>
                <select 
                    name="furnishing"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    onChange={handleChange}
                    value={formData.furnishing}
                >
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                </select>
            </div>

            <div className="col-span-2 md:col-span-1">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                 <input 
                    type="tel" 
                    name="contactNumber"
                    required
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    onChange={handleChange}
                />
            </div>

            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea 
                    name="description"
                    required
                    rows={4}
                    placeholder="Describe the property, amenities, and neighborhood..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
            <button 
                type="button" 
                onClick={onCancel}
                className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
                Cancel
            </button>
            <button 
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 shadow-md transition-all transform hover:scale-[1.02]"
            >
                Post Property
            </button>
        </div>
      </form>
    </div>
  );
};