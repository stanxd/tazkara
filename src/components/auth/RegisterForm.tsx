
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const RegisterForm = () => {
  const { signUp, user } = useAuth();
  const [userType, setUserType] = useState<'fan' | 'team'>('fan');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Fan form fields
  const [fanName, setFanName] = useState('');
  const [fanId, setFanId] = useState('');
  const [fanMobile, setFanMobile] = useState('');
  const [fanEmail, setFanEmail] = useState('');
  const [fanPassword, setFanPassword] = useState('');
  const [fanConfirmPassword, setFanConfirmPassword] = useState('');
  const [fanTeam, setFanTeam] = useState('');
  
  // Team form fields
  const [teamName, setTeamName] = useState('');
  const [teamRegistration, setTeamRegistration] = useState('');
  const [teamEmail, setTeamEmail] = useState('');
  const [teamMobile, setTeamMobile] = useState('');
  const [teamPassword, setTeamPassword] = useState('');
  const [teamConfirmPassword, setTeamConfirmPassword] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (userType === 'fan') {
        // Validate passwords match
        if (fanPassword !== fanConfirmPassword) {
          throw new Error('كلمات المرور غير متطابقة');
        }

        await signUp({
          email: fanEmail,
          password: fanPassword,
          userType: 'fan',
          metadata: {
            name: fanName,
            id_number: fanId,
            mobile: fanMobile,
            favorite_team: fanTeam
          }
        });
      } else {
        // Validate passwords match
        if (teamPassword !== teamConfirmPassword) {
          throw new Error('كلمات المرور غير متطابقة');
        }

        await signUp({
          email: teamEmail,
          password: teamPassword,
          userType: 'team',
          metadata: {
            team_name: teamName,
            registration_number: teamRegistration,
            email: teamEmail,
            mobile: teamMobile
          }
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold rtl">إنشاء حساب جديد</CardTitle>
          <CardDescription className="rtl">أدخل بياناتك لإنشاء حسابك</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fan" onValueChange={(value) => setUserType(value as 'fan' | 'team')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="fan" className="text-center rtl">مشجع</TabsTrigger>
              <TabsTrigger value="team" className="text-center rtl">فريق</TabsTrigger>
            </TabsList>

            <TabsContent value="fan">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 rtl">
                  <div className="space-y-2">
                    <Label htmlFor="fan-name">الاسم</Label>
                    <Input 
                      id="fan-name" 
                      placeholder="الاسم الكامل" 
                      required 
                      value={fanName}
                      onChange={(e) => setFanName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-id">رقم الهوية</Label>
                    <Input 
                      id="fan-id" 
                      placeholder="رقم الهوية" 
                      required 
                      value={fanId}
                      onChange={(e) => setFanId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-mobile">رقم الجوال</Label>
                    <Input 
                      id="fan-mobile" 
                      type="tel" 
                      placeholder="05XXXXXXXX" 
                      required 
                      value={fanMobile}
                      onChange={(e) => setFanMobile(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-email">البريد الإلكتروني</Label>
                    <Input 
                      id="fan-email" 
                      type="email" 
                      placeholder="example@mail.com" 
                      required 
                      value={fanEmail}
                      onChange={(e) => setFanEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-team">الفريق المفضل</Label>
                    <Select required value={fanTeam} onValueChange={setFanTeam}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفريق المفضل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alhilal">الهلال</SelectItem>
                        <SelectItem value="alnassir">النصر</SelectItem>
                        <SelectItem value="alahli">الأهلي</SelectItem>
                        <SelectItem value="alittihad">الاتحاد</SelectItem>
                        <SelectItem value="alshabab">الشباب</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-password">كلمة المرور</Label>
                    <Input 
                      id="fan-password" 
                      type="password" 
                      required 
                      value={fanPassword}
                      onChange={(e) => setFanPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-confirm-password">تأكيد كلمة المرور</Label>
                    <Input 
                      id="fan-confirm-password" 
                      type="password" 
                      required 
                      value={fanConfirmPassword}
                      onChange={(e) => setFanConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-tazkara-green hover:bg-tazkara-green/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'جاري التسجيل...' : 'تسجيل'}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="team">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 rtl">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">اسم الفريق</Label>
                    <Input 
                      id="team-name" 
                      placeholder="اسم الفريق" 
                      required 
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-registration">رقم السجل التجاري</Label>
                    <Input 
                      id="team-registration" 
                      placeholder="رقم السجل التجاري" 
                      required 
                      value={teamRegistration}
                      onChange={(e) => setTeamRegistration(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-email">البريد الإلكتروني الرسمي</Label>
                    <Input 
                      id="team-email" 
                      type="email" 
                      placeholder="example@team.com" 
                      required 
                      value={teamEmail}
                      onChange={(e) => setTeamEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-mobile">رقم الجوال</Label>
                    <Input 
                      id="team-mobile" 
                      type="tel" 
                      placeholder="05XXXXXXXX" 
                      required 
                      value={teamMobile}
                      onChange={(e) => setTeamMobile(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-password">كلمة المرور</Label>
                    <Input 
                      id="team-password" 
                      type="password" 
                      required 
                      value={teamPassword}
                      onChange={(e) => setTeamPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-confirm-password">تأكيد كلمة المرور</Label>
                    <Input 
                      id="team-confirm-password" 
                      type="password" 
                      required 
                      value={teamConfirmPassword}
                      onChange={(e) => setTeamConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-tazkara-green hover:bg-tazkara-green/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'جاري التسجيل...' : 'تسجيل'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center rtl">
          <p>
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-tazkara-green hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
