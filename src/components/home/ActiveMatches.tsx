import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Match {
  id: number;
  name: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  time: string;
  unread: number;
}

interface ActiveMatchesProps {
  matches: Match[];
}

const ActiveMatches = ({ matches }: ActiveMatchesProps) => {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Matches Ativos</h2>
        <Button variant="link" className="text-tydrapi-red">Ver todos</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map(match => (
          <Card key={match.id} className="tydrapi-card hover:border-tydrapi-red/50 transition-colors">
            <CardContent className="pt-4">
              <div className="flex items-start">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={match.avatar} />
                    <AvatarFallback>{match.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {match.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-tydrapi-black"></span>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{match.name}</h3>
                    <span className="text-xs text-tydrapi-gray">{match.time}</span>
                  </div>
                  <p className="text-sm text-tydrapi-gray truncate">{match.lastMessage}</p>
                </div>
                {match.unread > 0 && (
                  <Badge className="ml-2 bg-tydrapi-red">{match.unread}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ActiveMatches;
