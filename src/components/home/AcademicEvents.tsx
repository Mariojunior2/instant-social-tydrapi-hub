
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, GraduationCap, CalendarCheck } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  subject: string;
  date: string;
  type: 'deadline' | 'exam' | 'homework';
  priority: 'high' | 'medium' | 'low';
}

interface AcademicEventsProps {
  events: Event[];
}

const AcademicEvents = ({ events }: AcademicEventsProps) => {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <GraduationCap className="mr-2" /> 
          Eventos Acadêmicos
        </h2>
        <Button variant="link" className="text-tydrapi-red">Ver todos</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map(event => (
          <Card key={event.id} className={`tydrapi-card border-l-4 ${
            event.priority === 'high' ? 'border-l-red-500' :
            event.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-base">{event.title}</h3>
                  <p className="text-sm text-tydrapi-gray">{event.subject}</p>
                  <div className="flex items-center mt-2 text-xs text-tydrapi-gray">
                    <CalendarCheck size={14} className="mr-1" />
                    <span>{event.date}</span>
                  </div>
                </div>
                <div>
                  {event.type === 'deadline' && <Book className="text-red-500" size={20} />}
                  {event.type === 'exam' && <GraduationCap className="text-yellow-500" size={20} />}
                  {event.type === 'homework' && <Book className="text-green-500" size={20} />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AcademicEvents;
