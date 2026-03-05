/**
 * Time slot generation and availability checking utilities
 * Uses native JavaScript Date for time operations
 */

export interface TimeSlot {
  time: string; // 24-hour format "HH:MM"
  available: boolean;
  displayTime: string; // 12-hour format "h:MM AM/PM"
}

export interface AvailabilityWindow {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  isAvailable: boolean;
}

export interface Booking {
  date: string;
  time: string;
  staffId?: string;
  professionalId?: string;
}

/**
 * Generate time slots between start and end time
 * @param startTime - Start time in "HH:MM" format
 * @param endTime - End time in "HH:MM" format
 * @param interval - Interval in minutes (default 15)
 * @returns Array of time strings in "HH:MM" format
 */
export function generateTimeSlots(
  startTime: string,
  endTime: string,
  interval: number = 15
): string[] {
  const slots: string[] = [];

  // Parse start time
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // Create date objects for easier manipulation
  const current = new Date();
  current.setHours(startHour, startMinute, 0, 0);

  const end = new Date();
  end.setHours(endHour, endMinute, 0, 0);

  // Generate slots
  while (current < end) {
    const hours = current.getHours().toString().padStart(2, '0');
    const minutes = current.getMinutes().toString().padStart(2, '0');
    slots.push(`${hours}:${minutes}`);

    // Add interval
    current.setMinutes(current.getMinutes() + interval);
  }

  return slots;
}

/**
 * Convert 24-hour time to 12-hour format with AM/PM
 * @param time24 - Time in "HH:MM" format
 * @returns Time in "h:MM AM/PM" format
 */
export function formatTime(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Get day of week from date string (0=Sunday, 6=Saturday)
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Day of week number (0-6)
 */
export function getDayOfWeek(dateString: string): number {
  const date = new Date(dateString + 'T00:00:00');
  return date.getDay();
}

/**
 * Get default availability windows (9AM-5PM, Mon-Fri)
 * @returns Array of availability windows
 */
export function getDefaultAvailability(): AvailabilityWindow[] {
  const windows: AvailabilityWindow[] = [];

  // Monday through Friday (1-5)
  for (let day = 1; day <= 5; day++) {
    windows.push({
      dayOfWeek: day,
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: true,
    });
  }

  return windows;
}

/**
 * Check if a specific time slot is available
 * @param date - Date in YYYY-MM-DD format
 * @param time - Time in HH:MM format
 * @param bookings - Existing bookings
 * @returns True if slot is available
 */
export function isTimeSlotAvailable(
  date: string,
  time: string,
  bookings: Booking[]
): boolean {
  // Check if slot is in the past
  const slotDateTime = new Date(`${date}T${time}:00`);
  const now = new Date();

  if (slotDateTime <= now) {
    return false;
  }

  // Check if slot is already booked
  const isBooked = bookings.some(
    (booking) => booking.date === date && booking.time === time
  );

  return !isBooked;
}

/**
 * Get available time slots for a specific date and staff/professional
 * @param date - Date in YYYY-MM-DD format
 * @param availability - Availability windows
 * @param existingBookings - Existing bookings
 * @returns Array of TimeSlot objects
 */
export function getAvailableSlots(
  date: string,
  availability: AvailabilityWindow[] | null,
  existingBookings: Booking[]
): TimeSlot[] {
  // Use default availability if none provided
  const windows = availability && availability.length > 0
    ? availability
    : getDefaultAvailability();

  // Get day of week for the selected date
  const dayOfWeek = getDayOfWeek(date);

  // Find availability windows for this day
  const dayWindows = windows.filter(
    (w) => w.dayOfWeek === dayOfWeek && w.isAvailable
  );

  // If no availability for this day, return empty array
  if (dayWindows.length === 0) {
    return [];
  }

  // Generate all possible time slots for the day
  const allSlots: string[] = [];

  dayWindows.forEach((window) => {
    const windowSlots = generateTimeSlots(window.startTime, window.endTime);
    allSlots.push(...windowSlots);
  });

  // Remove duplicates and sort
  const uniqueSlots = Array.from(new Set(allSlots)).sort();

  // Create TimeSlot objects with availability status
  const timeSlots: TimeSlot[] = uniqueSlots.map((time) => ({
    time,
    available: isTimeSlotAvailable(date, time, existingBookings),
    displayTime: formatTime(time),
  }));

  return timeSlots;
}

/**
 * Filter bookings for a specific date and staff/professional
 * @param bookings - All bookings
 * @param date - Date to filter by
 * @param staffId - Optional staff ID to filter by
 * @param professionalId - Optional professional ID to filter by
 * @returns Filtered bookings
 */
export function filterBookingsForDate(
  bookings: Booking[],
  date: string,
  staffId?: string,
  professionalId?: string
): Booking[] {
  return bookings.filter((booking) => {
    if (booking.date !== date) return false;
    if (staffId && booking.staffId !== staffId) return false;
    if (professionalId && booking.professionalId !== professionalId) return false;
    return true;
  });
}

/**
 * Get today's date in YYYY-MM-DD format
 * @returns Today's date string
 */
export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
