
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus, X } from 'lucide-react';

interface Connection {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  mutualInterests: string[];
}

interface PendingConnectionsProps {
  connections: Connection[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

const PendingConnections = ({ connections, onAccept, onReject }: PendingConnectionsProps) => {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Conexões Pendentes</h2>
      </div>
      
      <div className="space-y-4">
        {connections.map(connection => (
          <Card key={connection.id} className="tydrapi-card">
            <CardContent className="pt-4">
              <div className="flex items-start">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={connection.avatar} />
                  <AvatarFallback>{connection.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-grow">
                  <h3 className="font-medium">{connection.name}</h3>
                  <p className="text-xs text-tydrapi-gray">@{connection.username}</p>
                  <p className="text-sm mt-1">{connection.bio}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {connection.mutualInterests.map((interest, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-tydrapi-darkred/30 text-white">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-tydrapi-red h-10 w-10 hover:bg-tydrapi-darkred"
                    onClick={() => onAccept(connection.id)}
                  >
                    <UserPlus size={18} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-tydrapi-darkgray h-10 w-10 hover:bg-tydrapi-gray/30"
                    onClick={() => onReject(connection.id)}
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PendingConnections;
