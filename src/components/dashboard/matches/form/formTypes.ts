
import { z } from 'zod';

// Define the form schema
export const matchFormSchema = z.object({
  opponent: z.string().min(1, { message: 'يجب اختيار الفريق المنافس' }),
  city: z.string().min(1, { message: 'يجب اختيار المدينة' }),
  stadium: z.string().min(1, { message: 'يجب اختيار الملعب' }),
  date: z.string().min(1, { message: 'يجب إدخال التاريخ' }),
  time: z.string().min(1, { message: 'يجب إدخال الوقت' }),
  availableTickets: z.coerce.number().positive({ message: 'يجب أن يكون عدد التذاكر أكبر من 0' }),
  ticketPrice: z.coerce.number().positive({ message: 'يجب أن يكون سعر التذكرة أكبر من 0' }),
  giftTickets: z.coerce.number().min(0, { message: 'عدد تذاكر الهدايا لا يمكن أن يكون سالباً' }).optional().default(0),
});

// Type for the form data
export type MatchFormData = z.infer<typeof matchFormSchema>;
