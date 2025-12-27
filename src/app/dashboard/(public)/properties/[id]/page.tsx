'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitLead } from '@/actions/properties';

function ContactForm({ propertyId }: { propertyId: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      await submitLead({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        message: formData.get('message') as string,
        propertyId,
      });

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" required />
      </div>

      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea id="message" name="message" rows={3} />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : success ? 'Sent!' : 'Contact Owner'}
      </Button>

      {success && (
        <p className="text-center text-sm text-emerald-600">
          Your inquiry has been sent successfully!
        </p>
      )}
    </form>
  );
}


export default ContactForm;