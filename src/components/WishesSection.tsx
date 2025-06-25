
import React, { useState } from 'react';
import { useWedding } from '@/contexts/WeddingContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export const WishesSection: React.FC = () => {
  const { weddingWishes, addWish } = useWedding();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [wishMessage, setWishMessage] = useState('');

  const handleSubmitWish = async () => {
    if (!guestName.trim() || !wishMessage.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both name and message",
        variant: "destructive"
      });
      return;
    }

    try {
      await addWish({ id: "", name: guestName, message: wishMessage });
      setGuestName('');
      setWishMessage('');
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Your wish has been added!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add wish. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="wishes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Wedding Wishes
          </h2>
          <div className="space-x-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Add Your Wish</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Wedding Wish</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Your wish for the couple..."
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                    rows={4}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitWish}>
                      Submit Wish
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={() => window.location.href = '/wishes'}>
              View All Wishes
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {weddingWishes.slice(0, 3).map((wish) => (
            <Card key={wish.id}>
              <CardHeader>
                <CardTitle className="text-pink-600">{wish.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">"{wish.message}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
