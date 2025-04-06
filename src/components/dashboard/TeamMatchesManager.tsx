
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface TeamMatchesManagerProps {
  teamProfile: any;
}

// Define the form schema
const formSchema = z.object({
  opponent: z.string().min(1, { message: 'يجب اختيار الفريق المنافس' }),
  city: z.string().min(1, { message: 'يجب اختيار المدينة' }),
  stadium: z.string().min(1, { message: 'يجب اختيار الملعب' }),
  date: z.string().min(1, { message: 'يجب إدخال التاريخ' }),
  time: z.string().min(1, { message: 'يجب إدخال الوقت' }),
  availableTickets: z.string().transform(val => Number(val)).pipe(
    z.number().positive({ message: 'يجب أن يكون عدد التذاكر أكبر من 0' })
  ),
  ticketPrice: z.string().transform(val => Number(val)).pipe(
    z.number().positive({ message: 'يجب أن يكون سعر التذكرة أكبر من 0' })
  ),
});

const TeamMatchesManager: React.FC<TeamMatchesManagerProps> = ({ teamProfile }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Placeholder data - in a real application this would come from the database
  const teams = ['الهلال', 'النصر', 'الأهلي', 'الاتحاد', 'الشباب'];
  const cities = ['الرياض', 'جدة', 'أبها'];
  const stadiums = {
    'الرياض': ['مملكة آرينا', 'استاد الملك فهد الدولي'],
    'جدة': ['الجوهرة', 'استاد الملك عبدالله'],
    'أبها': ['ملعب أبها', 'استاد الأمير سلطان'],
  };
  
  const matches = [
    { 
      id: 1, 
      opponent: 'الهلال', 
      city: 'الرياض', 
      stadium: 'مملكة آرينا', 
      date: '2025-04-15', 
      time: '20:00', 
      availableTickets: 1000, 
      ticketPrice: 100,
      isFuture: true
    },
    { 
      id: 2, 
      opponent: 'النصر', 
      city: 'جدة', 
      stadium: 'الجوهرة', 
      date: '2025-05-01', 
      time: '21:00', 
      availableTickets: 1500, 
      ticketPrice: 120,
      isFuture: true
    },
    { 
      id: 3, 
      opponent: 'الأهلي', 
      city: 'الرياض', 
      stadium: 'مملكة آرينا', 
      date: '2025-03-15', 
      time: '20:30', 
      availableTickets: 1200, 
      ticketPrice: 80,
      isFuture: false
    },
  ];

  const [citySelection, setCitySelection] = useState('الرياض');
  const [filteredStadiums, setFilteredStadiums] = useState(stadiums['الرياض']);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      opponent: '',
      city: 'الرياض',
      stadium: '',
      date: '',
      time: '',
      availableTickets: '',
      ticketPrice: '',
    },
  });

  const handleCityChange = (value: string) => {
    setCitySelection(value);
    form.setValue('city', value);
    form.setValue('stadium', '');
    setFilteredStadiums(stadiums[value as keyof typeof stadiums]);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your API
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة المباريات</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-tazkara-green hover:bg-tazkara-green/90">
              <Plus className="ml-2 h-4 w-4" />
              إضافة مباراة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg rtl">
            <DialogHeader>
              <DialogTitle>إضافة مباراة جديدة</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="opponent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الفريق المنافس</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الفريق المنافس" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams.map(team => (
                            <SelectItem key={team} value={team}>{team}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المدينة</FormLabel>
                      <Select 
                        onValueChange={(value) => handleCityChange(value)} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المدينة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stadium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الملعب</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الملعب" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredStadiums.map(stadium => (
                            <SelectItem key={stadium} value={stadium}>{stadium}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>التاريخ</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الوقت</FormLabel>
                        <FormControl>
                          <Input type="time" min="20:00" max="23:00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="availableTickets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عدد التذاكر المتاحة</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ticketPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سعر التذكرة (ر.س)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-tazkara-green hover:bg-tazkara-green/90">
                    حفظ المباراة
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المباريات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الفريق المنافس</TableHead>
                <TableHead>المدينة</TableHead>
                <TableHead>الملعب</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الوقت</TableHead>
                <TableHead>التذاكر المتاحة</TableHead>
                <TableHead>سعر التذكرة</TableHead>
                <TableHead>إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map(match => (
                <TableRow key={match.id}>
                  <TableCell>{match.opponent}</TableCell>
                  <TableCell>{match.city}</TableCell>
                  <TableCell>{match.stadium}</TableCell>
                  <TableCell>{match.date}</TableCell>
                  <TableCell>{match.time}</TableCell>
                  <TableCell>{match.availableTickets}</TableCell>
                  <TableCell>{match.ticketPrice} ر.س</TableCell>
                  <TableCell>
                    {match.isFuture && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamMatchesManager;
