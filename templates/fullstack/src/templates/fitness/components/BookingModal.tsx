import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/lib/auth';
import { useClassBookings } from '@/modules/classes/hooks/useClassBookings';
import type { ClassSession } from '@/modules/classes/types';

interface BookingModalProps {
  classSession: ClassSession;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingModal({ classSession, onClose, onSuccess }: BookingModalProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { createBooking, isLoading } = useClassBookings();

  const [bookingDate, setBookingDate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateDate = (): boolean => {
    if (!bookingDate) {
      setError('Please select a date');
      return false;
    }

    // Validate date is not in the past
    const selectedDate = new Date(bookingDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Cannot book classes in the past');
      return false;
    }

    // Validate date matches class day of week
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek !== classSession.dayOfWeek) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      setError(`This class is only available on ${daysOfWeek[classSession.dayOfWeek]}s`);
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      showToast('Please sign in to book a class', 'error');
      return;
    }

    if (!validateDate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createBooking({
        classSessionId: classSession.id,
        bookingDate: bookingDate,
      });

      showToast('Class booked successfully!', 'success');
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error booking class:', err);
      showToast('Failed to book class. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDayName = (dayOfWeek: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Book Class
          </h2>
          <div className="space-y-1 text-sm text-secondary-600">
            <p className="font-medium text-secondary-900">{classSession.name}</p>
            <p>{getDayName(classSession.dayOfWeek)}s at {formatTime(classSession.startTime)}</p>
            <p>Duration: {classSession.duration} minutes</p>
            {classSession.instructor && <p>Instructor: {classSession.instructor}</p>}
            {classSession.maxCapacity && (
              <p>Capacity: {classSession.maxCapacity} participants</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bookingDate" className="block text-sm font-medium text-secondary-900 mb-2">
              Select Date
            </label>
            <input
              type="date"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => {
                setBookingDate(e.target.value);
                setError('');
              }}
              min={getTodayDate()}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-secondary-300'
              }`}
              required
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
            <p className="mt-1 text-xs text-secondary-600">
              This class runs on {getDayName(classSession.dayOfWeek)}s
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting || isLoading}
              className="flex-1"
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
