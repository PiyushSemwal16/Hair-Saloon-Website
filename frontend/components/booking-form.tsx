"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appointmentServices } from "@/lib/data";
import { CheckCircle, User, Scissors, MessageSquare, ExternalLink } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/mgstudiosaloon/mg-studio";

export function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.service) {
      newErrors.style = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-primary/30 rounded-lg p-6 sm:p-10 lg:p-12 text-center max-w-xl mx-auto reveal-up transition-smooth">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
          Continue In Calendly
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Thanks, {formData.name}! We opened Calendly in a new tab. Please choose your slot there to confirm your appointment.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          If Calendly did not open, click the button below.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            type="button"
            onClick={() => window.open(CALENDLY_URL, "_blank", "noopener,noreferrer")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Open Calendly
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            className="border-border w-full sm:w-auto"
          >
            Edit Details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-5 sm:p-8 max-w-2xl mx-auto reveal-up transition-smooth">
      <div className="grid gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
            <User className="h-4 w-4 text-primary" />
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-input border-border focus:border-primary"
          />
          {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
        </div>

        {/* Service */}
        <div className="space-y-2">
          <Label htmlFor="service" className="flex items-center gap-2 text-foreground">
            <Scissors className="h-4 w-4 text-primary" />
            Service
          </Label>
          <Select
            value={formData.service}
            onValueChange={(value) => setFormData({ ...formData, service: value })}
          >
            <SelectTrigger className="bg-input border-border focus:border-primary">
              <SelectValue placeholder="Choose service" />
            </SelectTrigger>
            <SelectContent>
              {appointmentServices.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.name} ({service.category})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.style && <p className="text-destructive text-sm">{errors.style}</p>}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="flex items-center gap-2 text-foreground">
            <MessageSquare className="h-4 w-4 text-primary" />
            Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Any preference or special request"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="bg-input border-border focus:border-primary min-h-24"
          />
        </div>

        <div className="rounded-md border border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
          Slot selection happens in Calendly after you continue.
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4 h-11 sm:h-12 text-base sm:text-lg font-medium transition-smooth hover:-translate-y-0.5"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          Continue To Calendly
        </Button>

        <p className="text-xs text-muted-foreground text-center -mt-2">
          You will be redirected to Calendly to pick date and time.
        </p>
      </div>
    </form>
  );
}
