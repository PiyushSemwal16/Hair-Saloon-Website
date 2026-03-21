'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

interface AdminAuthProps {
  onAuthSuccess: () => void;
}

export function AdminAuth({ onAuthSuccess }: AdminAuthProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error('Please enter a password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 401) {
        toast.error('Invalid password');
        return;
      }

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      toast.success('Authentication successful!');
      onAuthSuccess();
    } catch (error: any) {
      toast.error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <Lock className="h-6 w-6 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Admin Panel</h1>
        <p className="text-muted-foreground text-center mb-6">
          Enter your admin password to access the panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? 'Verifying...' : 'Access Admin Panel'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-lg text-xs text-muted-foreground">
          <p className="font-semibold mb-2">Note:</p>
          <p>
            Only authorized personnel with the admin password can access this
            panel.
          </p>
        </div>
      </Card>
    </div>
  );
}
