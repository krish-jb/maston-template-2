
import React from 'react';
import { EditableText } from './EditableText';
import { useWedding } from '@/contexts/WeddingContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const WeddingDetailsSection: React.FC = () => {
  const { weddingData, updateWeddingData } = useWedding();

  const updateEventDetail = (eventKey: 'event1' | 'event2', field: string, value: string) => {
    updateWeddingData({
      weddingDetails: {
        ...weddingData.weddingDetails,
        [eventKey]: {
          ...weddingData.weddingDetails[eventKey],
          [field]: value
        }
      }
    });
  };

  const updateToKnow = (toKnowKey: 'toKnow1' | 'toKnow2' | 'toKnow3', field: string, value: string) => {
    updateWeddingData({
      weddingDetails: {
        ...weddingData.weddingDetails,
        [toKnowKey]: {
          ...weddingData.weddingDetails[toKnowKey],
          [field]: value
        }
      }
    });
  };

  return (
    <section id="details" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Wedding Details
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Event 1 */}
          <Card>
            <CardHeader>
              <EditableText 
                value={weddingData.weddingDetails.event1.title}
                onSave={(value) => updateEventDetail('event1', 'title', value)}
              >
                <CardTitle className="text-pink-600">
                  {weddingData.weddingDetails.event1.title}
                </CardTitle>
              </EditableText>
            </CardHeader>
            <CardContent className="space-y-2">
              <EditableText 
                value={weddingData.weddingDetails.event1.date}
                onSave={(value) => updateEventDetail('event1', 'date', value)}
              >
                <p><strong>Date:</strong> {weddingData.weddingDetails.event1.date}</p>
              </EditableText>
              <EditableText 
                value={weddingData.weddingDetails.event1.time}
                onSave={(value) => updateEventDetail('event1', 'time', value)}
              >
                <p><strong>Time:</strong> {weddingData.weddingDetails.event1.time}</p>
              </EditableText>
              <EditableText 
                value={weddingData.weddingDetails.event1.venue}
                onSave={(value) => updateEventDetail('event1', 'venue', value)}
              >
                <p><strong>Venue:</strong> {weddingData.weddingDetails.event1.venue}</p>
              </EditableText>
              <EditableText 
                value={weddingData.weddingDetails.event1.address}
                onSave={(value) => updateEventDetail('event1', 'address', value)}
                multiline
              >
                <p><strong>Address:</strong> {weddingData.weddingDetails.event1.address}</p>
              </EditableText>
            </CardContent>
          </Card>

          {/* Event 2 */}
          <Card>
            <CardHeader>
              <EditableText 
                value={weddingData.weddingDetails.event2.title}
                onSave={(value) => updateEventDetail('event2', 'title', value)}
              >
                <CardTitle className="text-pink-600">
                  {weddingData.weddingDetails.event2.title}
                </CardTitle>
              </EditableText>
            </CardHeader>
            <CardContent className="space-y-2">
              <EditableText 
                value={weddingData.weddingDetails.event2.date}
                onSave={(value) => updateEventDetail('event2', 'date', value)}
              >
                <p><strong>Date:</strong> {weddingData.weddingDetails.event2.date}</p>
              </EditableText>
              <EditableText 
                value={weddingData.weddingDetails.event2.time}
                onSave={(value) => updateEventDetail('event2', 'time', value)}
              >
                <p><strong>Time:</strong> {weddingData.weddingDetails.event2.time}</p>
              </EditableText>
              <EditableText 
                value={weddingData.weddingDetails.event2.venue}
                onSave={(value) => updateEventDetail('event2', 'venue', value)}
              >
                <p><strong>Venue:</strong> {weddingData.weddingDetails.event2.venue}</p>
              </EditableText>
              <EditableText 
                value={weddingData.weddingDetails.event2.address}
                onSave={(value) => updateEventDetail('event2', 'address', value)}
                multiline
              >
                <p><strong>Address:</strong> {weddingData.weddingDetails.event2.address}</p>
              </EditableText>
            </CardContent>
          </Card>
        </div>

        {/* Things to Know */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <EditableText 
                value={weddingData.weddingDetails.toKnow1.title}
                onSave={(value) => updateToKnow('toKnow1', 'title', value)}
              >
                <CardTitle className="text-gray-800">
                  {weddingData.weddingDetails.toKnow1.title}
                </CardTitle>
              </EditableText>
            </CardHeader>
            <CardContent>
              <EditableText 
                value={weddingData.weddingDetails.toKnow1.description}
                onSave={(value) => updateToKnow('toKnow1', 'description', value)}
                multiline
              >
                <p className="text-gray-600">
                  {weddingData.weddingDetails.toKnow1.description}
                </p>
              </EditableText>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <EditableText 
                value={weddingData.weddingDetails.toKnow2.title}
                onSave={(value) => updateToKnow('toKnow2', 'title', value)}
              >
                <CardTitle className="text-gray-800">
                  {weddingData.weddingDetails.toKnow2.title}
                </CardTitle>
              </EditableText>
            </CardHeader>
            <CardContent>
              <EditableText 
                value={weddingData.weddingDetails.toKnow2.description}
                onSave={(value) => updateToKnow('toKnow2', 'description', value)}
                multiline
              >
                <p className="text-gray-600">
                  {weddingData.weddingDetails.toKnow2.description}
                </p>
              </EditableText>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <EditableText 
                value={weddingData.weddingDetails.toKnow3.title}
                onSave={(value) => updateToKnow('toKnow3', 'title', value)}
              >
                <CardTitle className="text-gray-800">
                  {weddingData.weddingDetails.toKnow3.title}
                </CardTitle>
              </EditableText>
            </CardHeader>
            <CardContent>
              <EditableText 
                value={weddingData.weddingDetails.toKnow3.description}
                onSave={(value) => updateToKnow('toKnow3', 'description', value)}
                multiline
              >
                <p className="text-gray-600">
                  {weddingData.weddingDetails.toKnow3.description}
                </p>
              </EditableText>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
