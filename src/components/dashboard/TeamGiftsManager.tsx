
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Users, Compass, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MatchesList from './matches/MatchesList';
import { Match, TeamProfile } from './matches/types';
import { getStoredMatches, saveMatchesToStorage } from './matches/matchUtils';

interface TeamGiftsManagerProps {
  teamProfile: TeamProfile;
}

const TeamGiftsManager: React.FC<TeamGiftsManagerProps> = ({ teamProfile }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [giftMatches, setGiftMatches] = useState<Match[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [selectedDistributionType, setSelectedDistributionType] = useState<'all-fans' | 'loyal-fans' | null>(null);
  const { toast } = useToast();
  const teamId = teamProfile?.id || 'default';

  // Load matches from localStorage on component mount
  useEffect(() => {
    const storedMatches = getStoredMatches(teamId);
    setMatches(storedMatches);
    
    // Filter only matches with gift tickets
    const matchesWithGifts = storedMatches.filter(match => 
      match.giftTickets && match.giftTickets > 0 && match.isFuture
    );
    setGiftMatches(matchesWithGifts);
  }, [teamId]);

  const handleDistribute = () => {
    if (!selectedMatchId || !selectedDistributionType) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار المباراة ونوع التوزيع",
        variant: "destructive"
      });
      return;
    }

    // Update the match to mark gifts as distributed
    const updatedMatches = matches.map(match => {
      if (match.id === selectedMatchId) {
        return { ...match, giftDistributed: true };
      }
      return match;
    });

    // Save updated matches to storage
    saveMatchesToStorage(updatedMatches, teamId);
    setMatches(updatedMatches);

    // Update gift matches display
    const updatedGiftMatches = giftMatches.map(match => {
      if (match.id === selectedMatchId) {
        return { ...match, giftDistributed: true };
      }
      return match;
    });
    setGiftMatches(updatedGiftMatches);

    // Show success toast
    const match = matches.find(m => m.id === selectedMatchId);
    const distributionTypeText = selectedDistributionType === 'all-fans' ? 
      'جميع المشجعين المفضلين' : 'المشجعين ذوي الولاء';

    toast({
      title: "تم توزيع الهدايا بنجاح",
      description: `تم توزيع ${match?.giftTickets} تذكرة كهدايا للمباراة ضد ${match?.opponent} على ${distributionTypeText}`
    });

    // Reset selections
    setSelectedMatchId(null);
    setSelectedDistributionType(null);
  };

  const handleSelectMatch = (matchId: number) => {
    setSelectedMatchId(matchId === selectedMatchId ? null : matchId);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">إدارة هدايا التذاكر</h2>

      <Card>
        <CardHeader>
          <CardTitle>المباريات المتاحة للتوزيع</CardTitle>
        </CardHeader>
        <CardContent>
          {giftMatches.length > 0 ? (
            <div className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-right">الفريق المنافس</th>
                      <th className="p-3 text-right">التاريخ</th>
                      <th className="p-3 text-right">عدد تذاكر الهدايا</th>
                      <th className="p-3 text-right">الحالة</th>
                      <th className="p-3 text-center">اختيار</th>
                    </tr>
                  </thead>
                  <tbody>
                    {giftMatches.map(match => (
                      <tr key={match.id} className={`border-t ${match.giftDistributed ? 'bg-gray-50' : ''}`}>
                        <td className="p-3">{match.opponent}</td>
                        <td className="p-3">{match.date}</td>
                        <td className="p-3">{match.giftTickets}</td>
                        <td className="p-3">
                          {match.giftDistributed ? (
                            <span className="text-green-500 flex items-center">
                              <Check size={16} className="ml-1" /> تم التوزيع
                            </span>
                          ) : (
                            <span className="text-amber-500">بانتظار التوزيع</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {!match.giftDistributed && (
                            <Button 
                              variant={selectedMatchId === match.id ? "default" : "outline"} 
                              onClick={() => handleSelectMatch(match.id)}
                              size="sm"
                            >
                              {selectedMatchId === match.id ? "تم الاختيار" : "اختيار"}
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedMatchId && (
                <Card className="border-2 border-dashed border-tazkara-green/40 bg-tazkara-green/5">
                  <CardHeader>
                    <CardTitle className="text-lg">اختر طريقة التوزيع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant={selectedDistributionType === 'all-fans' ? "default" : "outline"} 
                        onClick={() => setSelectedDistributionType('all-fans')}
                        className="h-auto py-4 justify-start"
                      >
                        <Users className="ml-3 h-5 w-5" />
                        <div className="text-right">
                          <div className="font-medium">جميع المشجعين المفضلين</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            توزيع على جميع المشجعين الذين يفضلون فريقك
                          </div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant={selectedDistributionType === 'loyal-fans' ? "default" : "outline"}
                        onClick={() => setSelectedDistributionType('loyal-fans')}
                        className="h-auto py-4 justify-start"
                      >
                        <Compass className="ml-3 h-5 w-5" />
                        <div className="text-right">
                          <div className="font-medium">المشجعين ذوي الولاء</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            توزيع على المشجعين المتواجدين في نفس مدينة المباراة
                          </div>
                        </div>
                      </Button>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <Button 
                        onClick={handleDistribute}
                        disabled={!selectedDistributionType}
                        className="bg-tazkara-green hover:bg-tazkara-green/90"
                      >
                        <Gift className="ml-2 h-4 w-4" />
                        توزيع الهدايا
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Gift className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">لا توجد مباريات لتوزيع هدايا التذاكر</p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                قم بإضافة مباريات جديدة مع تخصيص تذاكر كهدايا لتظهر هنا
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>جميع المباريات مع الهدايا</CardTitle>
        </CardHeader>
        <CardContent>
          <MatchesList 
            matches={matches.filter(match => match.giftTickets && match.giftTickets > 0)} 
            showGiftColumn={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamGiftsManager;
