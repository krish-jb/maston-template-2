
import React from 'react';
import { EditableText } from './EditableText';
import { useWedding } from '@/contexts/WeddingContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContactSection: React.FC = () => {
  const { weddingData, updateWeddingData } = useWedding();

  const updateContact = (field: 'phone' | 'email' | 'address', value: string) => {
    updateWeddingData({
      contact: { ...weddingData.contact, [field]: value }
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Contact Us
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-pink-600">
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong className="text-gray-800">Phone:</strong>
                <EditableText 
                  value={weddingData.contact.phone}
                  onSave={(value) => updateContact('phone', value)}
                  className="ml-2"
                >
                  <span className="ml-2 text-gray-600">
                    {weddingData.contact.phone}
                  </span>
                </EditableText>
              </div>
              
              <div>
                <strong className="text-gray-800">Email:</strong>
                <EditableText 
                  value={weddingData.contact.email}
                  onSave={(value) => updateContact('email', value)}
                  className="ml-2"
                >
                  <span className="ml-2 text-gray-600">
                    {weddingData.contact.email}
                  </span>
                </EditableText>
              </div>
              
              <div>
                <strong className="text-gray-800">Address:</strong>
                <EditableText 
                  value={weddingData.contact.address}
                  onSave={(value) => updateContact('address', value)}
                  multiline
                  className="ml-2"
                >
                  <span className="ml-2 text-gray-600">
                    {weddingData.contact.address}
                  </span>
                </EditableText>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
